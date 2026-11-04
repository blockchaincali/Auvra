# Episode 1 — The Wine and the Frost: production report

Status: **delivered** (Nov 4). Stills were approved as is, with Shot 7 = v2.

## Deliverables (`export/`)

| File | Audio | Loudness |
| --- | --- | --- |
| `frozen-maid-ep01-sfx-dialogue.mp4` | SFX and dialogue only, for TikTok sounds | −14.0 LUFS, peak −1.4 dBFS |
| `frozen-maid-ep01-music.mp4` | Same mix, with the music bed ducked under the dialogue | −14.0 LUFS, peak −1.2 dBFS |

Both files: 1080×1920, 24 fps, H.264 High + AAC 192k, exactly 30.0 s, with burned-in hook overlay, subtitles and the Part 2 end card.

## Spend (provider-reported)

| Item | Cost |
| --- | --- |
| Stills (9 plus 5 redos) | $0.58 |
| Shot 1, Veo 3.1 Lite 720p, 4 s | $0.20 |
| Shots 2–8 including 4b, Kling 3.0 Pro, 4 s × 8 | $6.72 |
| One Kling re-run (Shot 4) | $0.84 |
| Dialogue transcription checks (Gemini Flash) | under $0.01 |
| **Total** | **$8.35** of the $9 cap |

## Pipeline as run

- `/videos` request: `{model, prompt, duration: 4, aspect_ratio: "9:16", generate_audio: true, frame_images: [{type: "image_url", frame_type: "first_frame", image_url: {url: data-URI}}]}`. The call returns an id and a `polling_url`; the finished result lists download `urls`. Script: `../scripts/gen-video.mjs`.
- Veo Lite at 720p cost exactly $0.20. Kling 3.0 Pro at its default resolution (about 1080×1920) cost exactly $0.84.
- Motion prompts (`motion/`) are word for word from the bible, except for one clause added on the Shot 4 re-run (below).

## QA and fixes

- **Shot 4, Kling v1, was rejected:** the wine turned into bright red streaks down her face and a soaked red apron, which read as blood (violence rule). The re-run motion prompt adds one clause after the bible text: "The wine is glossy translucent purple-red table wine that splashes in droplets and soaks the headscarf darker, and stays the same colour as in the first frame." v2 reads as wine. v1 is kept as `superseded/clip-04-v1.mp4`.
- **All five dialogue lines are present.** Each clip was checked by transcription: "Kneel and pour, servant." / "Serves the little rat right." / "Not yet." / "Who are you?" / "Impossible… the Frost blood is dead." The transcriber heard Cassian's line as an **American** accent, which is a minor miss against the British-accent rule. It was not re-run because no budget was left.
- Kling places most lines at the **end** of the 4 s clip, so trims are taken from the end where needed (`edit/edl.txt`) instead of from the start. The trim lengths match the bible's revised timing exactly: 3.0 + 3.0 + 3.5 + 3.5 + 3.0 + 3.5 + 3.5 + 3.0 + 3.5 + 0.5 black = 30.0 s.
- Shot 1 (Veo) is 720×1280 and is upscaled to 1080×1920. The other clips are cropped by a few pixels to fit exactly.

## Music bed

Lyria 3 (clip and pro) is listed on Orbio but returned `503 pricing_unavailable`, so no generated score was possible. The music version uses a **placeholder bed synthesised locally** (`../scripts/ep01-music-bed.py`) that follows the edit beats:
- a courtly D-minor string pad
- a low tension pulse under the humiliation
- icy celesta notes as the frost spreads (about 19.5–23 s)
- a low ominous drone under Isolde
- a boom on the cut to black

It is sidechain-ducked under the dialogue. Replace it with a Lyria or library cue once one is available; `../scripts/ep01-export.sh` rebuilds both exports from `music/bed.wav`.

## Rebuild

```bash
./scripts/ep01-assemble.sh
```

Then burn the subtitles: `ffmpeg -i ep01/edit/assembled.mov -vf ass=ep01/edit/ep01.ass … ep01/edit/subbed.mov`.

```bash
python3 scripts/ep01-music-bed.py ep01/music/bed-dry.wav
```

Then apply the reverb with `aecho` to make `ep01/music/bed.wav`.

```bash
./scripts/ep01-export.sh
```

Intermediates (`edit/*.mov`, `*.wav`) are gitignored.

## For the TikTok post

- Cover frame: Shot 6 (the goblet freezing). The best frame is at about 21.5 s.
- Pin this episode, and post Episodes 1–3 together per the release plan.
