import type { VideoGenerationStatus } from "@auvra/shared";

type Fetch = typeof fetch;
type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue | undefined => value !== null && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : undefined;
const cost = (value: unknown): number | undefined => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : typeof value === "string" && value.trim() && Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : undefined;
const JOB_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{2,127}$/;
const MAX_REFERENCES = 8;
const isHttpsUrl = (value: string) => { try { return new URL(value).protocol === "https:"; } catch { return false; } };
const isImageDataUrl = (value: string) => /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
const imagePart = (input: VideoImageInput) => {
  if (!isHttpsUrl(input.url) && !isImageDataUrl(input.url)) throw new VideoProviderError("Video image inputs must be https URLs or PNG/JPEG/WEBP data URLs.", "INVALID_IMAGE_INPUT");
  return { type: "image_url", image_url: { url: input.url } };
};
const redact = (raw: string) => raw.replace(/Bearer\s+\S+/gi, "Bearer [redacted]").replace(/sk-[\w-]+/gi, "[redacted]").slice(0, 240);
/** Provider job errors arrive as a string or as { code, message }. */
const jobError = (value: unknown): { code: string; message: string } | undefined => {
  if (typeof value === "string" && value.trim()) return { code: "PROVIDER_JOB_FAILED", message: redact(value.trim()) };
  const nested = record(value); if (!nested) return undefined;
  const message = typeof nested.message === "string" && nested.message.trim() ? redact(nested.message.trim()) : "The provider did not explain the failure.";
  const code = typeof nested.code === "string" && nested.code.trim() ? nested.code.trim().slice(0, 64) : typeof nested.code === "number" ? `PROVIDER_${nested.code}` : "PROVIDER_JOB_FAILED";
  return { code, message };
};

/** An image passed to the provider as an https URL or a base64 data URL. */
export type VideoImageInput = { url: string };
export interface SubmitVideoRequest {
  model: string; prompt: string; durationSeconds: number; aspectRatio: string; resolution: string; audio: boolean;
  /** Optional first/last frame conditioning (image-to-video). */
  firstFrame?: VideoImageInput; lastFrame?: VideoImageInput;
  /** Optional character/style reference images (keeps faces consistent across shots). */
  references?: VideoImageInput[];
}
export interface VideoJobResult { id: string; status: VideoGenerationStatus; usageCostUsd?: number; outputs: number; error?: { code: string; message: string }; }
export interface VideoProvider {
  submitVideo(request: SubmitVideoRequest): Promise<{ jobId: string; status: VideoGenerationStatus }>;
  getVideoJob(jobId: string): Promise<VideoJobResult>;
  downloadVideo(jobId: string, index: number): Promise<Response>;
}

export class VideoProviderError extends Error {
  constructor(message: string, readonly code: string, readonly retryable = false) { super(message); this.name = "VideoProviderError"; }
}

export function validateJobId(jobId: string): string {
  if (!JOB_ID.test(jobId)) throw new VideoProviderError("Provider returned an invalid video job identifier.", "INVALID_JOB_ID");
  return jobId;
}

export function normalizeVideoProviderError(status: number, payload: unknown): VideoProviderError {
  const root = record(payload); const nested = record(root?.error); const raw = typeof nested?.message === "string" ? nested.message : typeof root?.message === "string" ? root.message : "";
  const message = redact(raw);
  if (status === 401 || status === 403) return new VideoProviderError("Orbio rejected the server credentials.", "AUTHENTICATION_ERROR");
  if (status === 402 || /credit|balance|payment/i.test(message)) return new VideoProviderError("The Orbio account has insufficient video-generation credit.", "INSUFFICIENT_CREDITS");
  if (/pricing_unavailable/i.test(message)) return new VideoProviderError("Orbio has no usable price for this video configuration.", "PRICING_UNAVAILABLE");
  if (status === 429) return new VideoProviderError("Orbio rate-limited video status access.", "RATE_LIMITED", true);
  if (status >= 500) return new VideoProviderError("The Orbio video gateway is temporarily unavailable.", "GATEWAY_ERROR", true);
  return new VideoProviderError(message ? `Orbio rejected the video request: ${message}` : `Orbio video request failed with HTTP ${status}.`, "VIDEO_PROVIDER_ERROR");
}

const normalizeStatus = (value: unknown): VideoGenerationStatus => {
  const normalized = typeof value === "string" ? value.toLowerCase() : "";
  if (["pending", "queued"].includes(normalized)) return "pending";
  if (["in_progress", "processing", "running"].includes(normalized)) return "in_progress";
  if (["completed", "succeeded", "success"].includes(normalized)) return "completed";
  if (["failed", "cancelled", "expired"].includes(normalized)) return normalized as VideoGenerationStatus;
  return "pending";
};

/** Builds the OpenRouter-compatible POST /videos body that Orbio forwards upstream. */
export function buildSubmitBody(request: SubmitVideoRequest): RecordValue {
  const body: RecordValue = { model: request.model, prompt: request.prompt, duration: request.durationSeconds, aspect_ratio: request.aspectRatio, resolution: request.resolution, generate_audio: request.audio };
  const frames = [
    ...(request.firstFrame ? [{ ...imagePart(request.firstFrame), frame_type: "first_frame" }] : []),
    ...(request.lastFrame ? [{ ...imagePart(request.lastFrame), frame_type: "last_frame" }] : [])
  ];
  if (frames.length) body.frame_images = frames;
  if (request.references?.length) {
    if (request.references.length > MAX_REFERENCES) throw new VideoProviderError(`At most ${MAX_REFERENCES} reference images are supported.`, "TOO_MANY_REFERENCES");
    body.input_references = request.references.map(imagePart);
  }
  return body;
}

export class OrbioVideoProvider implements VideoProvider {
  private readonly baseUrl: string;
  constructor(private readonly configuration: { apiKey: string; baseUrl: string; timeoutMs: number }, private readonly fetcher: Fetch = fetch) {
    this.baseUrl = configuration.baseUrl.replace(/\/$/, "");
  }
  private headers(json = false) { return { Authorization: `Bearer ${this.configuration.apiKey}`, Accept: "application/json", ...(json ? { "Content-Type": "application/json" } : {}) }; }
  async submitVideo(request: SubmitVideoRequest) {
    if (!this.configuration.apiKey) throw new VideoProviderError("Orbio video generation is not configured.", "NOT_CONFIGURED");
    const response = await this.fetcher(`${this.baseUrl}/videos`, { method: "POST", headers: this.headers(true), body: JSON.stringify(buildSubmitBody(request)), signal: AbortSignal.timeout(this.configuration.timeoutMs) });
    const payload = await response.json().catch(() => undefined); if (!response.ok) throw normalizeVideoProviderError(response.status, payload);
    const root = record(payload); const job = record(root?.data) ?? root; const rawId = job?.id ?? job?.job_id;
    if (typeof rawId !== "string") throw new VideoProviderError("Orbio returned no persistent video job identifier.", "INVALID_RESPONSE");
    return { jobId: validateJobId(rawId), status: normalizeStatus(job?.status) };
  }
  async getVideoJob(jobId: string): Promise<VideoJobResult> {
    const id = validateJobId(jobId);
    // Provider-returned polling URLs are intentionally ignored.
    const response = await this.fetcher(`${this.baseUrl}/videos/${encodeURIComponent(id)}`, { headers: this.headers(), signal: AbortSignal.timeout(this.configuration.timeoutMs) });
    const payload = await response.json().catch(() => undefined); if (!response.ok) throw normalizeVideoProviderError(response.status, payload);
    const root = record(payload); const job = record(root?.data) ?? root; const usage = record(job?.usage) ?? record(root?.usage); const outputs = Array.isArray(job?.unsigned_urls) ? job.unsigned_urls.length : Array.isArray(job?.outputs) ? job.outputs.length : Array.isArray(job?.videos) ? job.videos.length : 1;
    const usageCostUsd = cost(usage?.cost); const status = normalizeStatus(job?.status);
    // A job that fails after acceptance reports its reason in the body, not as an HTTP error.
    const error = ["failed", "cancelled", "expired"].includes(status) ? jobError(job?.error ?? root?.error) ?? { code: "PROVIDER_JOB_FAILED", message: `The provider reported the job as ${status} without a reason.` } : undefined;
    return { id, status, ...(usageCostUsd === undefined ? {} : { usageCostUsd }), outputs, ...(error ? { error } : {}) };
  }
  async downloadVideo(jobId: string, index: number) {
    const id = validateJobId(jobId); if (!Number.isInteger(index) || index < 0 || index > 20) throw new VideoProviderError("Invalid video output index.", "INVALID_OUTPUT_INDEX");
    // Always reconstruct against the configured gateway; never follow arbitrary content_url fields from job bodies.
    const response = await this.fetcher(`${this.baseUrl}/videos/${encodeURIComponent(id)}/content?index=${index}`, { headers: this.headers(), redirect: "manual", signal: AbortSignal.timeout(this.configuration.timeoutMs) });
    // Gateways commonly answer with a 302 to signed storage. Follow exactly one https hop,
    // without the Authorization header, so the API key never reaches storage hosts.
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new VideoProviderError("Orbio redirected the video download without a location.", "CONTENT_REDIRECT_INVALID");
      const target = new URL(location, `${this.baseUrl}/`);
      if (target.protocol !== "https:") throw new VideoProviderError("Orbio redirected the video download to a non-https location.", "CONTENT_REDIRECT_INVALID");
      const stored = await this.fetcher(target.toString(), { redirect: "error", signal: AbortSignal.timeout(this.configuration.timeoutMs) });
      if (!stored.ok) throw new VideoProviderError(`Video storage download failed with HTTP ${stored.status}.`, "CONTENT_DOWNLOAD_FAILED", stored.status >= 500);
      return stored;
    }
    if (!response.ok) { const payload = await response.json().catch(() => undefined); throw normalizeVideoProviderError(response.status, payload); }
    return response;
  }
}
