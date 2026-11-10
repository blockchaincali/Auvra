# The Night the Animals Held the Party: status

**Blocked (Nov 10, later):** the new Orbio key works (a 1-token chat call returned 200 and cost $0.000002). But the source PDF is not in this container, because `source/` is gitignored and the PDF was never committed. A new session needs the PDF uploaded again, then `pdftoppm -r 300 -png <pdf> source/page`. Spend so far: **$0.000002**.

Note: `/images` checks the request body before the key, so a malformed request returns 400 even with a bad key. Test the key with a real call.

## Done

- The PDF is rendered at 300 dpi (`source/`, gitignored; regenerate with `pdftoppm -r 300 -png <pdf> source/page`).
- All 27 shot crops are defined in `crops.tsv`, as coordinates on a 1000-px-wide preview of each spread, scaled ×4.132. Each one was checked visually:
  - **E** starts right of the author's photo on page 15, so the photo is never sent to a model.
  - **10b** is tightened onto the rabbit and squirrel, so the text panel doesn't dominate.
  - **12b** is trimmed so that no animal enters the scenery-only Veo shot.
- `scripts/make-plates.sh` crops each region and sends it to Nano Banana 2.1 (`/images`, 16:9) with the plan's instruction word for word, plus one sentence: "Also remove the edges of the open book and the centre fold line, so the picture is one continuous painting." The spreads are photographed inside an open-book mockup, so without that sentence the border and fold would survive.

## Next, once the key works

1. `./scripts/make-plates.sh` (27 plates, about $1.10, cap $2), then a numbered contact sheet for approval.
2. TTS check (ElevenLabs → Gemini TTS → gpt-4o-mini-tts), with a voice test of line N0 only (cap $1).
