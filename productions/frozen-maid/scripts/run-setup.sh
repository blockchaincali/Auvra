#!/usr/bin/env bash
# Generates all setup images. Skips any that already exist. Logs costs to setup/costs.jsonl; halts at the $1.50 cap.
set -u
cd "$(dirname "$0")/.."
CAP=1.45
gen() { # out aspect prompt refs...
  [ -f "$1" ] && return 0
  spent=$(node -e 'const fs=require("fs");let s=0;try{for(const l of fs.readFileSync("setup/costs.jsonl","utf8").trim().split("\n"))s+=JSON.parse(l).meta?.usage?.cost||0}catch{};console.log(s.toFixed(4))')
  if node -e "process.exit(+$spent>=$CAP?0:1)"; then echo "CAP reached ($spent), skipping $1"; return 1; fi
  node scripts/gen-image.mjs "$@" >> setup/costs.jsonl || echo "FAILED $1"
}
CHARS="cassian isolde seraphine rowan vorn maren aldric pip"
# 1. portraits (parallel)
for c in $CHARS; do gen setup/portrait-$c.png 9:16 setup/prompts/portrait-$c.txt & done
gen setup/portrait-elara-queen.png 9:16 setup/prompts/portrait-elara-queen.txt setup/portrait-elara-maid.png &
for l in L1 L2 L3 L4 L5 L6 L7 L8 L9; do gen setup/location-$l.png 9:16 setup/prompts/location-$l.txt & done
wait
# 2. costume sheets, each anchored to its portrait
for c in elara-maid elara-queen $CHARS; do gen setup/sheet-$c.png 16:9 setup/prompts/sheet-$c.txt setup/portrait-$c.png & done
wait
