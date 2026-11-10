// Usage: node word-times.mjs <audio.mp3> <out.json>   — word timestamps (Gemini transcribe) for read-along captions.
import { readFileSync, writeFileSync } from "node:fs";
const [file, out] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const fd = new FormData();
fd.append("model", "google/gemini-3.5-transcribe"); fd.append("response_format", "verbose_json"); fd.append("timestamp_granularities[]", "word");
fd.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), "a.mp3");
const r = await fetch(`${base}/audio/transcriptions`, { method: "POST", headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}` }, body: fd, signal: AbortSignal.timeout(120000) });
const t = await r.text(); if (!r.ok) { console.error(r.status, t.slice(0, 300)); process.exit(1); }
writeFileSync(out, t); const j = JSON.parse(t); console.log(out, j.words?.length, j.usage?.cost);
