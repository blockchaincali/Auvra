// Usage: node tts.mjs <out.mp3> <text>   — one narration line, using the approved N0 settings.
import { writeFileSync } from "node:fs";
const [out, text] = process.argv.slice(2);
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
const body = {
  model: "elevenlabs/eleven-v3", voice: "Lily", response_format: "mp3", input: text,
  instructions: "Warm, gentle bedtime storyteller reading to a young child. Unhurried, smiling, expressive on the sound words, soft on the quiet moments."
};
const res = await fetch(`${base}/audio/speech`, { method: "POST", headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(240000) });
if (!res.ok) { console.error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`); process.exit(1); }
writeFileSync(out, Buffer.from(await res.arrayBuffer()));
console.log(JSON.stringify({ out, chars: text.length, list_cost: +(text.length * 0.00008).toFixed(5), gen: res.headers.get("x-generation-id"), balance: res.headers.get("x-orbio-balance") }));
