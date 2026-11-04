// Usage: node gen-music.mjs <out-basename> "<prompt>"  — one Lyria 3 clip via Orbio chat completions (streamed audio output).
import { writeFileSync } from "node:fs";
const [out, prompt] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const res = await fetch(`${base}/chat/completions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "" + (process.env.MUSIC_MODEL || "google/lyria-3-clip-preview") + "", modalities: ["text", "audio"], audio: { format: "mp3" }, stream: true, messages: [{ role: "user", content: prompt }] })
});
if (!res.ok) { console.error(res.status, (await res.text()).slice(0, 500)); process.exit(1); }
const text = await res.text();
let b64 = "", fmt = "mp3", usage = null, other = [];
for (const line of text.split("\n")) {
  if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
  let j; try { j = JSON.parse(line.slice(6)); } catch { continue; }
  if (j.usage) usage = j.usage;
  const d = j.choices?.[0]?.delta || j.choices?.[0]?.message || {};
  if (d.audio?.data) b64 += d.audio.data;
  if (d.audio?.format) fmt = d.audio.format;
  if (d.content) other.push(d.content);
}
if (!b64) { console.error("no audio; sample:", text.slice(0, 800)); process.exit(1); }
writeFileSync(`${out}.${fmt}`, Buffer.from(b64, "base64"));
console.log(JSON.stringify({ out: `${out}.${fmt}`, cost: usage?.cost ?? null, text: other.join("").slice(0, 200) }));
