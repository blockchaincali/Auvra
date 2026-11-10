#!/usr/bin/env bash
# Animate every shot in timeline.json (skips shots whose clip already exists). Kling 3.0 Pro for characters, Veo 3.1 Lite 720p for scenery.
cd "$(dirname "$0")/.."
python3 -c "
import json
for sc in json.load(open('timeline.json'))['scenes']:
    for s in sc['shots']:
        if s['model'] in ('kling','veo'): print(s['shot'], s['model'], s['clip'])" | while read -r id model secs; do
  [[ -f clips/$id.mp4 ]] && continue
  if [[ $id == 1b && -f ab/1b-kling-10s.mp4 ]]; then cp ab/1b-kling-10s.mp4 clips/1b.mp4; continue; fi
  if [[ $model == kling ]]; then m=kwaivgi/kling-v3.0-pro; res=""; else m=google/veo-3.1-lite; res=720p; fi
  node scripts/gen-video.mjs $m clips/$id.mp4 motion/$id.txt plates/plate-$id.png $secs $res >> costs-video.jsonl 2> logs/$id.log || echo "FAIL $id" &
  while (( $(jobs -r | wc -l) >= 8 )); do sleep 2; done
done
wait
echo ALL DONE
