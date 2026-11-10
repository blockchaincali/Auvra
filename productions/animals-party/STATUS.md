# The Night the Animals Held the Party: status

**At approval gate 1 (Nov 10):** 26 of 27 plates are made (`plates/`, `contact-sheet.jpg`), and the N0 voice test is done (`narration/N0-test.mp3`). Nothing is animated. Spend so far is about **$1.00** (plates $0.996 including failed calls, voice about $0.007, key test $0.000002).

Open items for the user:
- **3b** is blocked by Gemini moderation (`PROHIBITED_CONTENT`) on two tries. The crop has no text, so the likely cause is the fawn looking like a famous film character. Options: (a) crop locally to 16:9 with no model, (b) retry with a reworded prompt, or (c) drop 3b and hold 3a longer.
- **12b** is meant to be scenery-only (Veo), but the plate shows the back of a fawn at the bottom. Remake it with a tighter crop, or approve it as it is.
- The voice is ElevenLabs `eleven-v3`, voice **Lily** (British female), with the style instruction from the plan. The line runs 5.96 s.
- `/images` checks the request body before the key, so a malformed request returns 400 even with a bad key. Test the key with a real call.

## Done

- The PDF is rendered at 300 dpi (`source/`, gitignored; regenerate with `pdftoppm -r 300 -png <pdf> source/page`).
- All 27 shot crops are defined in `crops.tsv`, as coordinates on a 1000-px-wide preview of each spread, scaled ×4.132. Each one was checked visually:
  - **E** starts right of the author's photo on page 15, so the photo is never sent to a model.
  - **10b** is tightened onto the rabbit and squirrel, so the text panel doesn't dominate.
  - **12b** is trimmed so that no animal enters the scenery-only Veo shot.
- `scripts/make-plates.sh` crops each region and sends it to Nano Banana 2.1 (`/images`, 16:9) with the plan's instruction word for word, plus one sentence: "Also remove the edges of the open book and the centre fold line, so the picture is one continuous painting." The spreads are photographed inside an open-book mockup, so without that sentence the border and fold would survive.

## Next, after approval

1. Resolve 3b and 12b, then get the contact sheet approved.
2. Get the N0 voice approved, then generate N1–N14.
3. A/B test on shot 1b (Kling 10s vs Veo Lite 8s, about $3).
