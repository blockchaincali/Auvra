// Usage: node --env-file=../../.env gen-image.mjs <out.png> <aspect> <promptFile> [refImage...]
// One Nano Banana 2.1 image via the Orbio /images endpoint; prints the provider-reported cost.
import { readFileSync, writeFileSync } from "node:fs";
const [out, aspect, promptFile, ...refs] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const mime = (p) => (p.endsWith(".png") ? "image/png" : "image/jpeg");
const body = {
  model: "google/gemini-nano-banana-2.1",
  prompt: readFileSync(promptFile, "utf8").trim(),
  n: 1,
  aspect_ratio: aspect,
  ...(refs.length ? { input_references: refs.map((p) => ({ type: "image_url", image_url: { url: `data:${mime(p)};base64,${readFileSync(p).toString("base64")}` } })) } : {})
};
const res = await fetch(`${base}/images`, {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(240000)
});
const json = await res.json().catch(() => null);
if (!res.ok) { console.error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 400)}`); process.exit(1); }
const item = json?.data?.[0] ?? json?.images?.[0];
let buf;
if (item?.b64_json) buf = Buffer.from(item.b64_json, "base64");
else if (item?.url?.startsWith("data:")) buf = Buffer.from(item.url.split(",")[1], "base64");
else if (item?.url) buf = Buffer.from(await (await fetch(item.url)).arrayBuffer());
else { console.error("Unrecognised response:", JSON.stringify(json).slice(0, 600)); process.exit(1); }
writeFileSync(out, buf);
const { data, images, ...meta } = json;
console.log(JSON.stringify({ out, bytes: buf.length, meta }));
