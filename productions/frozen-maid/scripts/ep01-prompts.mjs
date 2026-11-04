// Episode 1 still prompts. Shot-list text is word for word from SERIES_BIBLE.md; each [TAG] is replaced with its locked text
// (characters as "Name (locked description)" so the sentence still reads), then the style line and negative list are appended.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const STYLE = "cinematic photoreal film still, 35mm lens, shallow depth of field, soft film grain, high detail, 9:16 vertical.";
const NEG = "no text, no letters, no watermark, no modern objects, no extra fingers, no extra people, no glowing eyes, no mirrored features.";
const locked = (file) => readFileSync(new URL(`../setup/prompts/${file}.txt`, import.meta.url), "utf8");
const castText = (id) => locked(`portrait-${id}`).match(/, of (.*?\.) (The|Framed)/s)[1].replace(/\.$/, "");
const locText = (id) => locked(`location-${id}`).replace(/^Empty location plate, no people anywhere\. /, "").split(". cinematic")[0];
const TAGS = {
  "[ELARA-MAID]": `Elara (${castText("elara-maid")})`,
  "[SERAPHINE]": `Lady Seraphine (${castText("seraphine")})`,
  "[CASSIAN]": `Prince Cassian (${castText("cassian")})`,
  "[ISOLDE]": `Queen Mother Isolde (${castText("isolde")})`,
  "[L1]": locText("L1"),
  "[L2]": locText("L2")
};
const SHOTS = {
  "01": { refs: ["location-L1"], text: "[L1]. Low-angle view across the snowy courtyard toward the palace, heavy snowfall, warm gold light from every window, cold blue night sky, no people." },
  "02": { refs: ["portrait-elara-maid", "location-L2"], text: "[L2]. Wide shot down the long banquet table; nobles in velvet and silk laughing and drinking, blurred and out of focus. In the sharp foreground, [ELARA-MAID] walks toward the camera with her head bowed, holding a silver wine jug in both hands." },
  "03": { refs: ["portrait-seraphine", "portrait-elara-maid", "location-L2"], text: "[L2]. Medium shot. [SERAPHINE] stands up from her chair at the banquet table holding a gold goblet, looking down with a cruel smile at [ELARA-MAID], who has stopped in front of her with her head bowed, holding the silver wine jug." },
  "04": { refs: ["portrait-elara-maid", "portrait-seraphine", "location-L2"], text: "[L2]. [ELARA-MAID] kneels on the polished stone floor, eyes closed, as [SERAPHINE] stands over her and tips a gold goblet, pouring red wine over Elara’s headscarf and face. Blurred nobles laughing behind them." },
  "04b": { refs: ["location-L2"], text: "[L2]. Medium shot of two young noble ladies at the banquet table, one in dark red velvet and one in mustard-yellow silk, leaning close together, one whispering behind an open black lace fan while the other covers a smile; candlelight; more guests blurred behind them." },
  "05": { refs: ["portrait-elara-maid", "location-L2"], text: "[L2]. Close-up of [ELARA-MAID], kneeling, red wine dripping from her headscarf and chin, eyes lowered, calm. Her right hand rests flat on the stone floor; thin white frost spreads outward from her fingertips in fern-like patterns. Her eyes are normal and human." },
  "06": { refs: ["portrait-seraphine", "location-L2"], text: "[L2]. Medium close-up of [SERAPHINE] laughing as she raises her gold goblet in a toast; white frost is starting to form at the base of the goblet in her hand." },
  "07": { refs: ["portrait-cassian", "location-L2"], text: "[L2]. At the raised high table under the navy-and-gold banners, [CASSIAN] rises slowly from his carved chair, staring down the hall with intense suspicion; candlelight on his face; blurred guests around him turning to look where he looks." },
  "08": { refs: ["portrait-isolde", "location-L2"], text: "[L2]. Close-up of [ISOLDE] seated at the high table, holding a gold goblet in her black-lace-gloved hand; her polite smile is fading; white frost is beginning to cover her goblet." }
};
const BG = {
  "02": "Exactly one main character in sharp focus; blurred courtiers in the background, no more than five, small and out of focus, two of them leaning together and glancing at her.",
  "04": "Exactly two main characters in sharp focus; blurred courtiers in the background, no more than five, small and out of focus, covering laughs; none of them wears a crown. The wine is translucent purple-red table wine: it splashes from the tilted goblet across the front of her headscarf and her face in a wide glossy splash with droplets in mid-air, soaking the headscarf darker and running off her chin; it reads clearly as spilled wine, with no thin streaks from the scalp and nothing that looks like blood.",
  "07": "Medium shot: exactly one main character in sharp focus, Prince Cassian large in the frame from the waist up; blurred courtiers seated beside him at the high table, no more than four, out of focus, heads turning; nobody in the foreground in front of him. His face is turned so the LEFT side of his jaw faces the camera, and the thin pale scar along it is clearly visible through the stubble."
};
const dir = new URL("../ep01/prompts/", import.meta.url);
mkdirSync(dir, { recursive: true });
const plan = {};
for (const [id, { refs, text }] of Object.entries(SHOTS)) {
  let p = text;
  for (const [tag, val] of Object.entries(TAGS)) p = p.split(tag).join(val);
  // Background life rule (added after the word-for-word shot text, only where a v1 still failed QA).
  if (BG[id]) p = `${p} ${BG[id]}`;
  writeFileSync(new URL(`shot-${id}.txt`, dir), `${p} ${STYLE} ${NEG}\n`);
  plan[id] = refs.map((r) => `setup/${r}.png`);
}
writeFileSync(new URL("../ep01/refs.json", import.meta.url), JSON.stringify(plan, null, 2) + "\n");
console.log("ok");
