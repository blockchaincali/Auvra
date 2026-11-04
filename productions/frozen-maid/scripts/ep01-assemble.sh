#!/usr/bin/env bash
# Conform each trimmed shot to 1080x1920/24fps/48k stereo and concatenate with the 0.5s black tail.
set -euo pipefail
cd "$(dirname "$0")/../ep01"
list=edit/concat.txt; : > $list
while read -r id start dur; do
  [[ -z "$id" || "$id" == \#* ]] && continue
  fo=$(awk "BEGIN{print $dur-0.06}")
  ffmpeg -nostdin -v error -y -ss "$start" -t "$dur" -i "clips/shot-$id.mp4" -filter_complex \
    "[0:v]scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,fps=24,format=yuv420p,setsar=1[v];[0:a]aresample=48000,aformat=channel_layouts=stereo,apad,atrim=0:$dur,afade=t=in:d=0.04,afade=t=out:st=$fo:d=0.06[a]" \
    -map "[v]" -map "[a]" -t "$dur" -c:v libx264 -crf 16 -preset medium -c:a pcm_s16le "edit/seg-$id.mov"
  echo "file 'seg-$id.mov'" >> $list
done < edit/edl.txt
ffmpeg -nostdin -v error -y -f lavfi -i color=black:s=1080x1920:r=24:d=0.5 -f lavfi -i anullsrc=r=48000:cl=stereo -t 0.5 -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a pcm_s16le edit/seg-black.mov
echo "file 'seg-black.mov'" >> $list
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $list -c copy edit/assembled.mov
ffprobe -v error -show_entries format=duration -of csv=p=0 edit/assembled.mov
