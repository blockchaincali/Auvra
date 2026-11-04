// Usage: node gen-video.mjs <model> <out.mp4> <promptFile> <firstFrame.png> [resolution]
// Submits one image-to-video job to Orbio /videos (4s, 9:16, audio on), polls until done, downloads it, logs the reported cost.
import { readFileSync, writeFileSync } from "node:fs";
const [model, out, promptFile, frame, resolution] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const headers = { Authorization: `Bearer ${process.env.ORBIO_API_KEY}`, "Content-Type": "application/json" };
const body = {
  model, prompt: readFileSync(promptFile, "utf8").trim(), duration: 4, aspect_ratio: "9:16", generate_audio: true,
  ...(resolution ? { resolution } : {}),
  frame_images: [{ type: "image_url", frame_type: "first_frame", image_url: { url: `data:image/png;base64,${readFileSync(frame).toString("base64")}` } }]
};
const log = (o) => console.error(JSON.stringify(o).slice(0, 700));
let res = await fetch(`${base}/videos`, { method: "POST", headers, body: JSON.stringify(body) });
let json = await res.json().catch(() => null);
if (!res.ok) { log({ status: res.status, json }); process.exit(1); }
log({ submitted: json });
const id = json.id || json.data?.id || json.job_id;
const findUrl = (j) => j?.video_url || j?.url || j?.output?.url || j?.data?.[0]?.url || j?.video?.url || j?.output?.[0] || j?.result?.url || j?.unsigned_urls?.[0] || j?.urls?.[0];
const done = (j) => /complete|succeed|success|done|finished/i.test(String(j?.status || j?.state || ""));
const failed = (j) => /fail|error|cancel/i.test(String(j?.status || j?.state || ""));
const pollUrl = json.polling_url || `${base}/videos/${id}`;
const t0 = Date.now();
while (!done(json) && !findUrl(json)) {
  if (failed(json)) { log({ failed: json }); process.exit(1); }
  if (Date.now() - t0 > 15 * 60e3) { log({ timeout: id }); process.exit(1); }
  await new Promise((r) => setTimeout(r, 10000));
  res = await fetch(pollUrl, { headers });
  json = await res.json().catch(() => ({}));
}
let url = findUrl(json);
if (!url) { // try content endpoint
  url = `${base}/videos/${id}/content`;
}
const vr = await fetch(url, { headers: url.startsWith(base) ? headers : {} });
if (!vr.ok) { log({ downloadStatus: vr.status, final: json }); process.exit(1); }
const buf = Buffer.from(await vr.arrayBuffer());
writeFileSync(out, buf);
const { ...meta } = json;
console.log(JSON.stringify({ out, model, bytes: buf.length, cost: json.usage?.cost ?? json.cost ?? null, meta }));
