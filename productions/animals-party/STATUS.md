# The Night the Animals Held the Party: status

**At the route choice (Nov 10):** the plates and voice are approved, narration N0–N14 is generated, and the 1b A/B test is done. Nothing else has been animated. The next step is the user's choice of route (all Kling or hybrid).

## Spend so far: about $4.73 of the $45 cap

| Item | Cost | Source |
| --- | --- | --- |
| 27 clean plates (26 by Nano Banana, including failed calls and the 12b remake; 3b cropped directly for free) | $1.03 | provider-reported |
| Narration N0–N14 (ElevenLabs eleven-v3, 3,530 chars) | about $1.60 | balance drop; about 5–6× the catalogue list price of $0.00008/char |
| A/B 1b: Kling 3.0 Pro 10 s | $1.68 | provider-reported ($0.168/s) |
| A/B 1b: Veo 3.1 Lite 720p 8 s | $0.40 | provider-reported ($0.05/s) |
| Transcription QA (gpt-4o-mini-transcribe) and key test | about $0.02 | |

Orbio balance after all of this: $128.43.

## Plates (`plates/`, `contact-sheet.jpg`): approved

- **3b** was blocked twice by Gemini moderation (`PROHIBITED_CONTENT`), so it is a direct 16:9 crop of page 4 with no model (`crops-direct.tsv`). The fold and book edge are out of frame and the crop has no text.
- **12b** was remade from a tighter crop (`13 805 8 974 250`) with one extra prompt sentence (`prompts/plate-12b.txt`): moon, lake and trees only, no animals.

## Narration (`narration/`): generated, verified

- Approved settings for every line: `elevenlabs/eleven-v3`, voice `Lily`, the plan's style instruction, and the text prefixed with `[warm, gentle]` (`scripts/tts.mjs`). N0 is the approved test, with an extra `[softly]` before "Written by".
- QA (`narration/qa-transcripts.tsv`): every line was transcribed. No tag is spoken, and every line matches the script word for word.
- Lengths (s): N0 5.96 · N1 16.93 · N2 15.88 · N3 20.11 · N4 17.24 · N5 16.27 · N6 30.59 · N7 16.67 · N8 18.05 · N9 16.51 · N10 22.44 · N11 25.47 · N12 20.43 · N13 13.87 · N14 1.57.
- **Total 258 s (4:18) before pauses**, against the plan's 2:50–3:10 estimate. The reading pace is about 105 wpm. With 0.6 s sentence pauses and 1.5 s scene gaps the film runs about 4:40, so the picture has to cover more time than the 27 planned shot lengths (about 3:15).

## A/B test, shot 1b (`ab/`)

- `ab/1b-AB-side-by-side.mp4`: A is Kling (left ear), B is Veo Lite (right ear).
- Kling: stays on model (face, ears and fur match the plate); breath and head lift as prompted; 1936×1080; very quiet ambient audio, no voices.
- Veo Lite: Milo turns to face the camera and his face changes (smaller eyes, rounder head). Two large glowing firefly blobs appear by the tree. 1280×720; ambient audio, no voices.
- By the plan's rule ("if it drifts, use all Kling"), this points to **all Kling**.

## Next, after the route choice

1. Re-time the shot list to the measured narration (extend holds or slow clips in the edit, or make some shots 10 s).
2. Animate all shots, then edit with captions and title cards, and export.
