#!/usr/bin/env bash
# Crop each shot's region from the 300-dpi spreads, then make a clean 16:9 plate with Nano Banana 2.1 (/images).
# Usage: make-plates.sh [shot ...]   (default: all shots in crops.tsv; existing plates are skipped)
set -u
cd "$(dirname "$0")/.."
PROMPT='Remove all text and the dark text panel. Repaint that area as a seamless continuation of the same painting, same style, same lighting. Output 16:9. Do not change any character. Also remove the edges of the open book and the centre fold line, so the picture is one continuous painting.'
mkdir -p plates crops prompts; printf '%s\n' "$PROMPT" > prompts/plate.txt
want=" $* "
while IFS=$'\t' read -r id pg x0 y0 x1 y1; do
  [[ "$id" == \#* ]] && continue
  [[ $# -gt 0 && "$want" != *" $id "* ]] && continue
  [[ -f plates/plate-$id.png ]] && continue
  g=$(awk "BEGIN{printf \"%dx%d+%d+%d\", ($x1-$x0)*4.132, ($y1-$y0)*4.132, $x0*4.132, $y0*4.132}")
  convert source/page-$pg.png -crop $g +repage -resize '2400x2400>' -quality 92 crops/crop-$id.jpg
  node scripts/gen-image.mjs plates/plate-$id.png 16:9 prompts/plate.txt crops/crop-$id.jpg >> costs-plates.jsonl || echo "FAIL $id" &
  while (( $(jobs -r | wc -l) >= 9 )); do sleep 1; done
done < crops.tsv
wait
