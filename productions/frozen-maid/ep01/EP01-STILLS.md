# Episode 1 — The Wine and the Frost: stills for approval

Status: **awaiting approval**. Nothing has been animated.

- Contact sheet: `contact/ep01-stills.jpg` (numbered 1–9 plus one alternate)
- Prompts: `prompts/shot-*.txt`, built by `../scripts/ep01-prompts.mjs`. Each prompt is the shot-list text word for word, with each [TAG] replaced by its locked text written as "Name (locked description)", then the style line and negative list
- References per still: `refs.json` (the portraits of everyone in frame plus the location plate; Shot 1 uses L1 only, Shot 4b uses L2 only)
- Spend: **$0.58** for 14 images (9 stills plus 5 redos), logged in `costs.jsonl`. Episode cap: $8

## Background life

Where a v1 still failed QA on the crowd, one extra sentence from the Background life rule follows the word-for-word shot text. It says how many main characters are in sharp focus, how many blurred courtiers there are (at most 4–6) and what they are doing. This applies to Shots 2, 4 and 7 (see `BG` in the script).

## QA per shot

| # | Shot | Result | Notes |
| --- | --- | --- | --- |
| 1 | 01 Establishing | Pass | Very close to the L1 plate; not a strong low angle. Fine as a Veo push-in start frame |
| 2 | 02 Maid in the hall | Pass (v2) | v1: the nobles were sharp and there were too many. v2: about 5 softer extras, two leaning together. Birthmark on her LEFT, hair hidden |
| 3 | 03 "Kneel and pour" | Pass with notes | Seraphine's smile reads sweet rather than cruel, she is standing rather than rising from a chair, and Elara is already pouring. The motion prompt (smirk) can sharpen it |
| 4 | 04 The wine | Pass (v3) | v1 and v2: the wine ran from the scalp in thin lines and **read as blood** (violence rule), and v1 had a crowned extra who could be mistaken for King Aldric. v3: a visible stream from a gold goblet, a soaked headscarf, translucent drips, 4 extras covering laughs |
| 5 | 04b Gossip | Pass | Two ladies in red velvet and mustard silk, black lace fan, one covering a smile |
| 6 | 05 "Not yet" | Pass with note | Fern-like frost from her fingertips, wine on her headscarf, eyes normal. Framed medium-wide rather than as a close-up |
| 7 | 06 Frozen goblet | Pass | Gold goblet raised, thin white frost on the stem and base, pearl choker |
| 8 | 07 The prince stands | Pass except the scar | v1: Cassian was tiny behind sharp extras. v2 (chosen): waist-up in front of the banners, 4 extras turning. **The jaw scar is not visible** in v2 or v3, because his face is too small in the frame for a thin scar to render |
| 9 | 08 The Queen Mother | Pass | Frost forming on her goblet, black lace glove, emerald collar |
| alt | 07 v3 | Alternate | Rising at the table, scar still not visible. Kept for comparison |

## Decisions needed

1. **Shot 7 scar.** Options: (a) accept, since the scar will not show at this size in a 9:16 video either; (b) reframe the still as a chest-up close-up so the scar can render (about $0.04).
2. **Shot 3:** accept, or redo for a more visibly cruel smile (about $0.04).

## Animation plan after approval (not yet tested)

- Shot 1: Veo 3.1 Lite, 4s, audio on, budget $0.20
- Shots 2–8 including 4b: Kling 3.0 Pro, first frame = the approved still, `generate_audio: true`, 4s, budget $0.84 each (8 clips, $6.72)
- Estimated total so far: $0.58 stills + $6.92 video = **$7.50**, under the $8 cap. The rule of one re-run without asking still applies, but a Kling re-run ($0.84) would push the total past $8, so I will ask before any re-run.
