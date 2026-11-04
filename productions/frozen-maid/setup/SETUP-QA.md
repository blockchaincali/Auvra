# The Frozen Maid Is the Ice Queen — Season 1 setup (Step 1)

Status: **approved** (Nov 4) after two redos: Cassian portrait and sheet, and L4 courtyard. Old versions are in `superseded/`.

- Model: `google/gemini-nano-banana-2.1` via the Orbio `/images` endpoint
- Images: 29 (10 portraits, 10 costume sheets, 9 location plates)
- Provider-reported spend: **$1.25** of the $1.50 cap including redos, logged per image in `costs.jsonl`
- Prompts: `prompts/*.txt`, built by `../scripts/setup-prompts.mjs` with each locked description pasted word for word, plus the style line and negative list
- Contact sheets: `contact/01-portraits.jpg`, `contact/02-costume-sheets.jpg`, `contact/03-locations.jpg`

## How each image was made

- Portraits: 9:16, front head-and-shoulders on plain dark grey. Elara (queen) used Elara (maid) as a reference so the face matches.
- Costume sheets: 16:9 (three full-body views will not fit in 9:16), each with that character's portrait as its reference.
- Location plates: 9:16, empty, no references.

## QA results

| Check | Result |
| --- | --- |
| Elara birthmark under LEFT eye (maid and queen) | Pass |
| Rowan eyepatch over RIGHT eye | Pass |
| Vorn burn scars on LEFT side of neck | Pass |
| Seraphine beauty mark above RIGHT lip corner | **Failed, then mirrored** (free). Now passes |
| Cassian scar on LEFT jaw | **Failed, then mirrored** (free). Now on his left, but faint and low on the neck rather than along the jaw |
| Elara hair hidden under headscarf (maid) | Pass |
| Colour codes and signature items | Pass: wolf pin, emerald collar, pearl choker, iron keys, gold circlet, glowing gauntlets, ice crown |
| No text, no modern objects, no glowing eyes, correct people count | Pass |

The mirrored files replaced the originals. The originals are kept as `*-unmirrored.png`. The Cassian and Seraphine costume sheets were mirrored too, so the pin and sword stay on the same side as in the portraits.

## Notes for the approver

1. **Cassian's scar** is the weakest item. Option: one portrait redo with "clearly visible" scar wording (about $0.04).
2. **L2 Great Hall:** the banners carry heraldic crests but no writing, which meets the rule.
3. **L8 frozen lake:** the ruins read as frosted white with burnt black patches. If you want more charred black, redo it (about $0.04). The Ep 4 night-burning flashback will use this plate as a reference.

Next step after approval: Episode 1 stills (8 images, about $0.30) as one numbered contact sheet, then animation, all within the $8 cap.

## Redos after review

- **Cassian portrait v3:** generated without a reference (the v1 reference kept carrying a faint scar low on the neck), with wording that places the scar along his LEFT jaw. The scar is now clearly visible on his left. The costume sheet was re-derived from it.
- **L4 courtyard v2:** generated with L1 as the reference. It shows the same pale-stone Renaissance palace with copper-green domes, no battlements, and keeps the frozen fountain, torches and snow.
- **L8:** kept as is.
