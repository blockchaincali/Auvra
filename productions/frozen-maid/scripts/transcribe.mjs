// Usage: node transcribe.mjs clip.mp4...  Sends each clip's audio (mp3) to an audio-capable Gemini model on Orbio and
// prints any spoken English with approximate start/end times. Used to verify dialogue and time subtitles.
import { execFileSync } from "node:child_process";
const base = (process.env.ORBIO_BASE_URL || "https://api.orbio.so/api/v1").replace(/\/+$/, "");
for (const f of process.argv.slice(2)) {
  const mp3 = execFileSync("ffmpeg", ["-v", "error", "-i", f, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "48k", "-f", "mp3", "pipe:1"], { maxBuffer: 1 << 26 });
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.ORBIO_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "google/gemini-3.8-flash", max_tokens: 300, temperature: 0, messages: [{ role: "user", content: [
      { type: "input_audio", input_audio: { data: mp3.toString("base64"), format: "mp3" } },
      { type: "text", text: 'This is a 4-second film clip. Transcribe any clearly spoken English words exactly, ignoring crowd murmur. Reply only with JSON: {"speech":"...","start":seconds,"end":seconds,"accent":"..."} or {"speech":""} if none.' }
    ] }] })
  });
  const j = await res.json();
  console.log(f, res.status, (j.choices?.[0]?.message?.content || JSON.stringify(j.error)).replace(/\s+/g, " ").slice(0, 300), "cost", j.usage?.cost);
}
