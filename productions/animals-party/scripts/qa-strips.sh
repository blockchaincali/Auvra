#!/usr/bin/env bash
# Usage: qa-strips.sh <out.jpg> <shot...>  — 4 frames per clip (start, 1/3, 2/3, end), one labelled row per clip.
out=$1; shift; tmp=$(mktemp -d)
for id in "$@"; do f=clips/$id.mp4; d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
  for i in 0 1 2 3; do ffmpeg -v error -y -ss $(python3 -c "print(max(0,$d*$i/3-0.1))") -i $f -frames:v 1 -vf scale=420:-2 $tmp/$id-$i.png; done
  convert $tmp/$id-[0-3].png +append -gravity northwest -fill '#000a' -draw 'rectangle 0,0 70,34' -fill white -pointsize 26 -annotate +6+3 "$id" $tmp/row-$id.png
done
convert $(for id in "$@"; do echo $tmp/row-$id.png; done) -append -quality 85 $out; rm -rf $tmp
