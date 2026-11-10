// Usage: node transcribe.mjs <audio> [model]   — prints the transcript (QA: style tags must not be spoken).
import { readFileSync } from "node:fs";
const [file, model = "openai/gpt-4o-mini-transcribe"] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const fd = new FormData();
fd.append("model", model); fd.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), file.split("/").pop());
const res = await fetch(`${base}/audio/transcriptions`, { method: "POST", headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}` }, body: fd, signal: AbortSignal.timeout(120000) });
const t = await res.text();
if (!res.ok) { console.error(`HTTP ${res.status}: ${t.slice(0, 400)}`); process.exit(1); }
try { console.log(JSON.parse(t).text ?? t); } catch { console.log(t); }
