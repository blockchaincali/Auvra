"""Re-time the 27 shots to the measured narration. Writes timeline.json and prints the timing table.
Scene = LEAD s of air + narration + TAIL s; scenes overlap by a 0.5 s dissolve (so 1.5 s between lines).
Each shot starts at a cue word in its scene's narration; its slot runs to the next cue (or scene end).
Clip = Kling 10 s if slot >= 8.5 s else 5 s (Veo Lite 8 s for scenery). Spare time = slow push-in hold on the plate."""
import json, re, subprocess
LEAD, TAIL, XF = 0.5, 1.5, 0.5
dur = lambda f: float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
# scene: (id, narration, lead, tail, [(shot, model, cue phrase or None for start)])
SCENES = [
 ("T","N0",1.0,1.5,[("T","kling",None)]),
 ("1","N1",LEAD,TAIL,[("1a","veo",None),("1b","kling","@-10.0")]),
 ("2","N2",LEAD,TAIL,[("2a","kling",None),("2b","kling","She wrote")]),
 ("3","N3",LEAD,TAIL,[("3a","kling",None),("3b","kling","Everyone was excited")]),
 ("4","N4",LEAD,TAIL,[("4a","kling",None),("4b","kling","Everyone worked")]),
 ("5","N5",LEAD,TAIL,[("5a","kling",None),("5b","kling","Tap tap hop")]),
 ("6","N6",LEAD,TAIL,[("6a","kling",None),("6b","kling","THUMP")]),
 ("7","N7",LEAD,TAIL,[("7a","kling",None),("7b","kling","The music")]),
 ("8","N8",LEAD,TAIL,[("8a","kling",None),("8b","kling","Milo stared")]),
 ("9","N9",LEAD,TAIL,[("9a","kling",None),("9b","kling","Milo’s whiskers")]),
 ("10","N10",LEAD,TAIL,[("10a","kling",None),("10b","kling","A little rabbit"),("10c","kling","The frogs made")]),
 ("11","N11",LEAD,TAIL,[("11a","kling",None),("11b","kling","Milo’s tiny rhythm")]),
 ("12","N12",LEAD,TAIL,[("12a","kling",None),("12b","veo","And the forest")]),
 ("B","N13",LEAD,TAIL,[("B","page14",None)]),
 ("E","N14",1.0,4.5,[("E","kling",None)]),
]
norm = lambda s: re.sub(r"[^a-z]", "", s.lower())
def cue_time(nid, phrase):
    words = json.load(open(f"narration/words/{nid}.json"))["words"]
    key = [norm(x) for x in phrase.split()]
    for i in range(len(words)):
        if all(i+k < len(words) and norm(words[i+k]["word"]).startswith(key[k][:5]) for k in range(len(key))):
            prev_end = words[i-1]["end"] if i else 0
            return (prev_end + words[i]["start"]) / 2
    raise SystemExit(f"cue not found: {nid} {phrase}")
tl, t0, rows = [], 0.0, []
for sid, nid, lead, tail, shots in SCENES:
    nd = dur(f"narration/{nid}.mp3"); S = lead + nd + tail
    starts = []
    for shot, model, cue in shots:
        if cue is None: starts.append(0.0)
        elif cue.startswith("@-"): starts.append(S - float(cue[2:]))
        else: starts.append(lead + cue_time(nid, cue))
    starts.append(S)
    sc = {"scene": sid, "narration": nid, "start": round(t0, 3), "length": round(S, 3), "narr_at": round(t0 + lead, 3), "narr_len": nd, "shots": []}
    for (shot, model, cue), a, b in zip(shots, starts, starts[1:]):
        slot = b - a
        clip = 0 if model == "page14" else 8 if model == "veo" else (10 if slot >= 8.5 else 5)
        if shot == "1b": clip = 10
        hold = max(0.0, slot - clip)
        sc["shots"].append({"shot": shot, "model": model, "slot": round(slot, 3), "clip": clip, "hold": round(hold, 3), "trim": round(max(0, clip - slot), 3) if clip else 0})
        rows.append((sid, nid, shot, model, slot, clip, hold, max(0, clip - slot) if clip else 0))
    tl.append(sc); t0 += S - XF
total = t0 + XF
json.dump({"scenes": tl, "total": round(total, 3)}, open("timeline.json", "w"), indent=1)
print("| Scene | Line (s) | Shot | Model | Slot (s) | Clip (s) | Edit hold (s) | Clip trimmed (s) |")
print("| --- | --- | --- | --- | --- | --- | --- | --- |")
for sc in tl:
    for k, s in enumerate(sc["shots"]):
        print(f"| {sc['scene'] if k==0 else ''} | {sc['narration']+' '+format(sc['narr_len'],'.1f') if k==0 else ''} | {s['shot']} | {'Kling 3.0 Pro' if s['model']=='kling' else 'Veo 3.1 Lite' if s['model']=='veo' else 'page 14 pan (free)'} | {s['slot']:.1f} | {s['clip'] or '–'} | {s['hold']:.1f} | {s['trim']:.1f} |")
k_new = sum(s["clip"] for sc in tl for s in sc["shots"] if s["model"]=="kling" and s["shot"]!="1b")
v_new = sum(s["clip"] for sc in tl for s in sc["shots"] if s["model"]=="veo")
print(f"\nRuntime {total:.1f} s = {int(total//60)}:{total%60:04.1f}")
print(f"New Kling seconds {k_new} x $0.168 = ${k_new*0.168:.2f}; Veo Lite {v_new} s x $0.05 = ${v_new*0.05:.2f}; new total ${k_new*0.168+v_new*0.05:.2f}")
print(f"Holds total {sum(s['hold'] for sc in tl for s in sc['shots'] if s['model']!='page14'):.1f} s")
