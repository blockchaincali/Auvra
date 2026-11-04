// Writes one prompt file per setup image into ../setup/prompts. Locked text is copied word for word from the series bible.
import { mkdirSync, writeFileSync } from "node:fs";
const STYLE = "cinematic photoreal film still, 35mm lens, shallow depth of field, soft film grain, high detail, 9:16 vertical.";
const STYLE_SHEET = "cinematic photoreal, 35mm lens, soft film grain, high detail, even studio lighting, 16:9 horizontal character reference sheet.";
const NEG = "no text, no letters, no watermark, no modern objects, no extra fingers, no extra people, no glowing eyes, no mirrored features.";
const CAST = {
  "elara-maid": "a 22-year-old woman with fair porcelain skin, a delicate oval face, high cheekbones, pale grey-blue eyes, soft pink lips, a small dark crescent-moon-shaped birthmark just under her LEFT eye; her hair is completely hidden under a plain brown linen headscarf tied at the back of her neck; she wears a plain grey wool servant’s dress with long sleeves and a white linen apron.",
  "elara-queen": "the same woman, the same face and crescent birthmark under her LEFT eye, with long straight silver-white hair falling to her waist, an ice-crystal crown of sharp clear spikes, and a fitted ice-white gown with pale blue frost patterns and a long translucent silver cape.",
  "cassian": "a 27-year-old man, tall and broad-shouldered, light olive skin, black wavy hair to his collar, dark brown eyes, a sharp jaw with short dark stubble, a thin pale scar along the LEFT side of his jaw; he wears a fitted navy-blue military doublet with silver buttons, a black cloak with a dark fur collar fastened by a silver wolf-head pin, and a sword at his hip.",
  "isolde": "a 55-year-old woman, pale skin, sharp high cheekbones, cold green eyes, thin red lips, auburn-red hair streaked with grey, worn in a tall braided crown; she wears a deep emerald-green velvet gown with gold embroidery, black lace gloves, and a heavy gold collar necklace set with one large emerald.",
  "seraphine": "a 23-year-old woman, fair rosy skin, bright blue eyes, a small beauty mark above the RIGHT corner of her lip, golden-blonde hair in long ringlet curls; she wears a rose-pink silk gown with puffed sleeves and a pearl choker necklace.",
  "rowan": "a 60-year-old Black man, dark brown skin, weathered face, short grey hair, a full short grey beard, a black leather eyepatch over his RIGHT eye; he wears worn steel armour under a hooded brown wool cloak, with a faded snowflake crest on his chest plate.",
  "vorn": "a 45-year-old man, olive skin, shaved head, a long braided black beard, burn scars on the left side of his neck, amber eyes; he wears heavy black-and-crimson plate armour, a tattered crimson cape, and black gauntlets with glowing molten-orange cracks.",
  "maren": "a 45-year-old South Asian woman, warm brown skin, sharp dark eyes, black hair streaked with grey in a tight low bun; she wears a dark blue servant’s dress with a white collar and a ring of iron keys on her belt.",
  "aldric": "a 72-year-old man, pale gaunt face, long white beard and white hair, tired blue eyes, a thin gold circlet; he wears a deep purple velvet robe and lies in a canopied bed with heavy gold-and-purple curtains.",
  "pip": "a 12-year-old boy, freckled pale skin, messy ginger hair under a brown flat cap, big green eyes, a gap-toothed grin; he wears a patched moss-green tunic, brown trousers and muddy boots."
};
const LOC = {
  L1: "A vast pale-stone Renaissance palace with tall spires and copper-green domes, every window glowing warm gold, at night, heavy snow falling, a snowy courtyard and iron gates in front",
  L2: "A long candlelit banquet hall with a high vaulted stone ceiling, gold chandeliers full of candles, a long table with silver plates and red wine, a raised high table under navy-and-gold banners with no writing, polished grey stone floor",
  L3: "A low stone kitchen with a big open hearth fire, copper pots on hooks, wooden tables with bread and vegetables, steam, warm orange firelight",
  L4: "An open stone courtyard inside the palace walls, snow on the ground, iron torches on posts, a stone fountain frozen in the middle, the palace walls rising behind, blue moonlight",
  L5: "A dark luxurious bedchamber in emerald-green velvet and gold, a carved fireplace, a tall gilded mirror, a dressing table with glass perfume bottles, candlelight",
  L6: "A dim royal bedroom with a huge canopied bed in purple and gold, a single window with snow outside, a bedside table with a silver cup and a small green glass vial, low candlelight",
  L7: "A cold stone dungeon cell, wet black walls, a narrow barred window with falling snow, black iron chains fixed to the wall, a single torch outside the bars",
  L8: "A wide frozen lake under a pale grey sky, snowy pine forest around it, the black burnt ruins of a white ice palace on the far shore, broken frozen towers",
  L9: "A wooden stable at night, horses in stalls, hay, hanging lanterns, a wide door open to falling snow"
};
const dir = new URL("../setup/prompts/", import.meta.url);
mkdirSync(dir, { recursive: true });
const write = (name, text) => writeFileSync(new URL(`${name}.txt`, dir), text + "\n");
for (const [id, desc] of Object.entries(CAST)) {
  const portraitSubject = id === "aldric"
    ? `${desc} Framed as a front head-and-shoulders portrait; the bed curtains are only a dark soft blur behind him`
    : `${desc}`;
  write(`portrait-${id}`, `Front head-and-shoulders portrait, exactly one person, looking straight into the camera, on a plain dark grey background, of ${portraitSubject} The face is evenly lit by soft warm candlelight; eyes normal and human. ${STYLE} ${NEG}`);
  write(`sheet-${id}`, `Full-body character costume sheet on a plain dark grey background showing the same single person three times side by side: front view, three-quarter view and side view, full figure from head to feet, identical face and costume in every view, matching the face in the reference portrait. The person is ${desc} ${STYLE_SHEET} ${NEG}`);
}
for (const [id, desc] of Object.entries(LOC)) {
  write(`location-${id}`, `Empty location plate, no people anywhere. ${desc}. ${STYLE} ${NEG}`);
}
console.log("prompts written");
