import { describe, expect, it } from "vitest";
import { buildSubmitBody, OrbioVideoProvider } from "./video-provider.js";

const base = "https://api.orbio.test/api/v1";
const provider = (handler: (url: string, init: RequestInit | undefined, call: number) => Response) => {
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];
  const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => { calls.push({ url: String(input), init }); return handler(String(input), init, calls.length); }) as typeof fetch;
  return { calls, video: new OrbioVideoProvider({ apiKey: "sk-secret", baseUrl: base, timeoutMs: 5000 }, fetcher) };
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

describe("Orbio video provider", () => {
  it("surfaces the provider's reason when an accepted job later fails", async () => {
    const { video } = provider(() => json({ id: "job_1", status: "failed", error: "Unsupported duration for this model" }));
    await expect(video.getVideoJob("job_1")).resolves.toMatchObject({ status: "failed", error: { code: "PROVIDER_JOB_FAILED", message: "Unsupported duration for this model" } });
  });

  it("redacts credentials in structured job errors and falls back when no reason is given", async () => {
    const structured = provider(() => json({ id: "job_1", status: "failed", error: { code: 400, message: "rejected Bearer abc123" } }));
    const result = await structured.video.getVideoJob("job_1");
    expect(result.error?.code).toBe("PROVIDER_400"); expect(result.error?.message).not.toContain("abc123");
    const bare = provider(() => json({ id: "job_1", status: "expired" }));
    await expect(bare.video.getVideoJob("job_1")).resolves.toMatchObject({ error: { code: "PROVIDER_JOB_FAILED" } });
  });

  it("counts unsigned_urls outputs and reports usage cost for completed jobs", async () => {
    const { video } = provider(() => json({ id: "job_1", status: "completed", unsigned_urls: ["https://a.test/1", "https://a.test/2"], usage: { cost: 0.5 } }));
    const result = await video.getVideoJob("job_1");
    expect(result).toMatchObject({ outputs: 2, usageCostUsd: 0.5 }); expect(result.error).toBeUndefined();
  });

  it("follows a single https content redirect without forwarding the API key", async () => {
    const { video, calls } = provider((_url, _init, call) => call === 1 ? new Response(null, { status: 302, headers: { location: "https://storage.example.com/v.mp4?sig=1" } }) : new Response("MP4", { status: 200 }));
    const response = await video.downloadVideo("job_1", 0);
    expect(await response.text()).toBe("MP4");
    expect(calls.map((call) => call.url)).toEqual([`${base}/videos/job_1/content?index=0`, "https://storage.example.com/v.mp4?sig=1"]);
    expect(calls[0]?.init?.redirect).toBe("manual"); expect(calls[1]?.init?.headers).toBeUndefined();
  });

  it("refuses non-https content redirects", async () => {
    const { video } = provider(() => new Response(null, { status: 302, headers: { location: "http://insecure.example.com/v.mp4" } }));
    await expect(video.downloadVideo("job_1", 0)).rejects.toMatchObject({ code: "CONTENT_REDIRECT_INVALID" });
  });

  it("keeps text-only submissions unchanged and maps image conditioning to OpenRouter fields", () => {
    const textOnly = { model: "kwaivgi/kling-v3.0-pro", prompt: "p", durationSeconds: 5, aspectRatio: "9:16", resolution: "720p", audio: true };
    expect(buildSubmitBody(textOnly)).toEqual({ model: "kwaivgi/kling-v3.0-pro", prompt: "p", duration: 5, aspect_ratio: "9:16", resolution: "720p", generate_audio: true });
    const conditioned = buildSubmitBody({ ...textOnly, firstFrame: { url: "data:image/png;base64,AAAA" }, references: [{ url: "https://cdn.example.com/elena.png" }] });
    expect(conditioned.frame_images).toEqual([{ type: "image_url", image_url: { url: "data:image/png;base64,AAAA" }, frame_type: "first_frame" }]);
    expect(conditioned.input_references).toEqual([{ type: "image_url", image_url: { url: "https://cdn.example.com/elena.png" } }]);
    expect(() => buildSubmitBody({ ...textOnly, firstFrame: { url: "file:///etc/passwd" } })).toThrow(/https URLs or PNG\/JPEG\/WEBP data URLs/);
  });
});
