#!/usr/bin/env bash
# Final exports: (A) SFX/dialogue mix only, (B) with music bed ducked under the mix. Both -14 LUFS integrated, -1.5 dBTP,
# 1080x1920, 24 fps, H.264 + AAC.
set -euo pipefail
cd "$(dirname "$0")/../ep01"
mkdir -p export
norm() { # in.wav out.wav  (two-pass loudnorm)
  local m; m=$(ffmpeg -nostdin -hide_banner -i "$1" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  local ii tp lra th off
  ii=$(jq -r .input_i <<<"$m"); tp=$(jq -r .input_tp <<<"$m"); lra=$(jq -r .input_lra <<<"$m"); th=$(jq -r .input_thresh <<<"$m"); off=$(jq -r .target_offset <<<"$m")
  ffmpeg -nostdin -v error -y -i "$1" -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$ii:measured_TP=$tp:measured_LRA=$lra:measured_thresh=$th:offset=$off:linear=true,aresample=48000" -c:a pcm_s16le "$2"
}
ffmpeg -nostdin -v error -y -i edit/subbed.mov -vn -c:a pcm_s16le edit/mix-dx.wav
ffmpeg -nostdin -v error -y -i edit/mix-dx.wav -i music/bed.wav -filter_complex \
  "[1:a]volume=-4dB[bed];[0:a]asplit=2[dx][key];[bed][key]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=350[ducked];[dx][ducked]amix=inputs=2:duration=first:normalize=0[m]" \
  -map "[m]" -c:a pcm_s16le edit/mix-music.wav
norm edit/mix-dx.wav edit/mix-dx-norm.wav
norm edit/mix-music.wav edit/mix-music-norm.wav
for v in dx music; do
  out=$([[ $v == dx ]] && echo "export/frozen-maid-ep01-sfx-dialogue.mp4" || echo "export/frozen-maid-ep01-music.mp4")
  ffmpeg -nostdin -v error -y -i edit/subbed.mov -i edit/mix-$v-norm.wav -map 0:v -map 1:a -c:v libx264 -profile:v high -crf 18 -preset slow -pix_fmt yuv420p -r 24 -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$out"
done
for f in export/*.mp4; do
  echo "$f $(ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration,size -of compact=p=0:nk=1 "$f" | tr '\n' ' ')"
  ffmpeg -nostdin -hide_banner -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)" | tr -s ' ' | tr '\n' ' '; echo
done
