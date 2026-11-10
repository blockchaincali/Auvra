# The Night the Animals Held the Party: status

**Delivered (Nov 10):** `export/the-night-the-animals-held-the-party.mp4`. It is 1920×1080, 24 fps, H.264 High + AAC 48 kHz stereo, 4:45, −14.1 LUFS integrated, peak −1.4 dBFS. The 317 MB master is over GitHub's 100 MB limit, so it is not in git; it was sent to the user directly. `export/…-review.mp4` (93 MB, 2.45 Mb/s) is the copy in the repo.

## Spend: about $37.74 of the $45 cap (Orbio balance about $133.15 → $95.41)

| Item | Cost |
| --- | --- |
| Plates (Nano Banana; 3b cropped directly for free) | $1.03 |
| Narration N0–N14 (ElevenLabs eleven-v3, Lily) | about $1.60 |
| A/B test on 1b (Kling 10 s $1.68, used in the film; Veo Lite 8 s $0.40) | $2.08 |
| Animation: 24 Kling 3.0 Pro shots (185 s at $0.168/s) | $31.08 |
| Kling re-runs: 3b ($0.84), 6a ($1.68) | $2.52 |
| Veo 3.1 Lite 720p: 1a, 12b | $0.80 |
| Transcription QA, word timestamps, key test | about $0.05 |

## How it was cut

- Route: all Kling for character shots, as in the plan's table. The two scenery-only shots (1a, 12b) use Veo Lite.
- Timing: `scripts/plan-timeline.py` → `timeline.json` / `timeline-table.md`. Each shot starts on the narration word its picture matches (for example, 6b on "THUMP!"). A shot gets a 10 s clip if its slot is at least 8.5 s, otherwise 5 s. Spare time (71 s in total) is a hold on the clip's first frame (the clean plate), with a slow push-in that runs through the motion without a visible join. The voice is never sped up.
- Narration runs at its natural pace: 0.5 s lead, 1.5 s between lines, 0.5 s dissolves between scenes.
- Captions (`scripts/build-captions.py` → `edit/captions.ass`): the book text, sentence by sentence, Nunito Bold in cream with a dark outline, in the bottom fifth, at most two lines (46 characters each). Milo, Rosie, Bear, Big Brown Bear and the sound words are in gold. Times come from Gemini word timestamps, checked against the audio pauses to within about 0.3 s. There are no captions on the title (title card), the bonus page (its text is on the page) or The End.
- Title card: Fredoka in the cover's colours (brown, orange "Animals", green "Held the"), with a cream outline. End card: "The End" in gold Dancing Script. Fonts are in `fonts/` (OFL, from @fontsource).
- Bonus: a free ease-in-out pan across page 14, from "Let's Talk" to "Let's Play".
- Mix (`scripts/assemble.py`): narration at −16 LUFS, ambient at −34 LUFS (18 dB under), final two-pass loudnorm to −14 LUFS / −1.5 dBTP, with fades from and to black.

## QA notes

- Every clip was checked frame by frame against the book designs (`scripts/qa-strips.sh`).
- **3b v1** was rejected because the fawn and squirrel lost their shapes. **6a v1** was rejected because the fawn grew antlers. Each was re-run once with a design-lock sentence and passed. The rejected clips are in `clips/rejected/`.
- Voice check (`logs/audio-voice-check.txt`): 2a, 3a, 8b and E had short voice-like sounds in Kling's audio. Their ambient was replaced with clean ambient from a neighbouring clip (2b, 3b, 8a, 1b; `AMB_OVERRIDE` in `assemble.py`). No Kling audio with voices is in the mix.
- Known softness: Bear's spin in 6a and Rosie's twirl in 11b blur a little mid-motion. Every character stays on model.

## Rebuild

`python3 scripts/assemble.py all` (needs `source/` rendered from the PDF, plus the clips in `clips/`).
