"""Assemble the finished film from timeline.json.
 shots  : clip scaled to 1920x1080@24; spare time = hold on the clip's first frame (the clean plate) with a slow push-in
          over the whole shot; ambient = clip audio (filler from its own start during the hold), normalised to AMB_LUFS.
 scenes : shots cut together; scenes joined by 0.5 s dissolves (video and ambient).
 mix    : narration lines placed at their times (NARR_LUFS), ambient ~18 dB under, final loudnorm -14 LUFS / -1.5 dBTP,
          read-along captions + title/end cards burned in, fade from/to black.
Usage: assemble.py [shots|scenes|final|all] [only-shot-ids...]"""
import json, math, os, subprocess, sys
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
TL = json.load(open("timeline.json")); FPS = 24; XF = 0.5
AMB_LUFS, NARR_LUFS, FINAL_LUFS = -34.0, -16.0, -14.0
def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(" ".join(cmd)[:600], "\n", r.stderr[-1500:]); sys.exit(1)
    return r.stderr
def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
def has_audio(f): return bool(subprocess.check_output(["ffprobe","-v","error","-select_streams","a","-show_entries","stream=index","-of","csv=p=0",f]).strip())
def lufs(f):
    out = run(["ffmpeg","-hide_banner","-i",f,"-af","ebur128","-f","null","-"])
    i = [l for l in out.splitlines() if l.strip().startswith("I:")][-1]
    return float(i.split()[1])
os.makedirs("edit/shots", exist_ok=True); os.makedirs("edit/scenes", exist_ok=True)

def make_shot(s):
    sid, slot, hold = s["shot"], s["slot"], s["hold"]
    vout, aout = f"edit/shots/{sid}.mp4", f"edit/shots/{sid}.wav"
    if s["model"] == "page14":   # bonus: ease-in-out pan across page 14, left page -> right page
        W, H, Y, X0, X1 = 2822, 1587, 33, 62, 1248
        x = f"{X0}+({X1-X0})*(0.5-0.5*cos(PI*min(t/{slot},1)))"
        run(["ffmpeg","-y","-v","error","-loop","1","-framerate",str(FPS),"-t",f"{slot}","-i","source/page-14.png",
             "-vf",f"crop={W}:{H}:'{x}':{Y},scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p","-r",str(FPS),
             "-c:v","libx264","-crf","14","-preset","fast",vout])
        amb_src, hold_a = "clips/1b.mp4", slot   # quiet crickets bed from shot 1b, looped
    else:
        clip = f"clips/{sid}.mp4"
        vf = f"scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,fps={FPS},setsar=1"
        if hold > 0: vf += f",tpad=start_mode=clone:start_duration={hold:.3f}"
        vf += f",trim=duration={slot:.3f},setpts=PTS-STARTPTS"
        if hold > 0.25:   # slow push-in across the whole shot so the hold flows into the motion
            zend = 1 + min(0.08, 0.005 * slot); n = round(slot * FPS)
            vf += (f",scale=3840:2160:flags=lanczos,zoompan=z='1+{zend-1:.4f}*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                   f":d=1:s=1920x1080:fps={FPS}")
        vf += ",format=yuv420p"
        run(["ffmpeg","-y","-v","error","-i",clip,"-vf",vf,"-an","-c:v","libx264","-crf","14","-preset","fast",vout])
        amb_src, hold_a = clip, hold
    # ambient: [filler from the clip's own start, looped, for the hold] + [clip audio], trimmed to the slot
    tmp = f"edit/shots/{sid}.raw.wav"
    if not has_audio(amb_src):
        run(["ffmpeg","-y","-v","error","-f","lavfi","-t",f"{slot}","-i","anullsrc=r=48000:cl=stereo",tmp])
    elif hold_a > 0.05:
        main = max(0.0, slot - hold_a)
        fc = (f"[0:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{hold_a:.3f},asetpts=PTS-STARTPTS,afade=t=out:st={max(0,hold_a-0.25):.3f}:d=0.25[f];"
              f"[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{max(main,0.01):.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.25[m];"
              f"[f][m]concat=n=2:v=0:a=1,apad,atrim=0:{slot:.3f}[a]")
        run(["ffmpeg","-y","-v","error","-stream_loop","-1","-i",amb_src,"-i",amb_src,"-filter_complex",fc,"-map","[a]",tmp])
    else:
        run(["ffmpeg","-y","-v","error","-i",amb_src,"-af",f"aresample=48000,aformat=channel_layouts=stereo,apad,atrim=0:{slot:.3f}",tmp])
    try: L = lufs(tmp)
    except Exception: L = -70
    gain = 0 if L < -69 else min(AMB_LUFS - L, 24.0)
    run(["ffmpeg","-y","-v","error","-i",tmp,"-af",f"volume={gain:.2f}dB",aout]); os.remove(tmp)
    print(f"shot {sid}: slot {slot:.2f} hold {hold:.2f} | video {dur(vout):.2f} audio {dur(aout):.2f} | ambient {L:.1f} LUFS, gain {gain:+.1f} dB")

def make_scene(sc):
    sh = sc["shots"]; n = len(sh); out = f"edit/scenes/{sc['scene']}"
    ins = sum([["-i", f"edit/shots/{s['shot']}.mp4"] for s in sh], []); ains = sum([["-i", f"edit/shots/{s['shot']}.wav"] for s in sh], [])
    run(["ffmpeg","-y","-v","error",*ins,"-filter_complex","".join(f"[{i}:v]" for i in range(n))+f"concat=n={n}:v=1:a=0[v]","-map","[v]","-c:v","libx264","-crf","14","-preset","fast",out+".mp4"])
    run(["ffmpeg","-y","-v","error",*ains,"-filter_complex","".join(f"[{i}:a]" for i in range(n))+f"concat=n={n}:v=0:a=1[a]","-map","[a]",out+".wav"])
    print(f"scene {sc['scene']}: {dur(out+'.mp4'):.2f}s (planned {sc['length']:.2f})")

def final():
    scs = TL["scenes"]; n = len(scs); total = TL["total"]
    # picture: dissolve chain
    ins = sum([["-i", f"edit/scenes/{s['scene']}.mp4"] for s in scs], [])
    fc, last = [], "[0:v]"
    for k in range(1, n):
        fc.append(f"{last}[{k}:v]xfade=transition=fade:duration={XF}:offset={scs[k]['start']:.3f}[x{k}]"); last = f"[x{k}]"
    run(["ffmpeg","-y","-v","error",*ins,"-filter_complex",";".join(fc),"-map",last,"-c:v","libx264","-crf","14","-preset","fast","edit/picture.mp4"])
    # ambient bed: crossfade chain
    ains = sum([["-i", f"edit/scenes/{s['scene']}.wav"] for s in scs], [])
    fc, last = [], "[0:a]"
    for k in range(1, n):
        fc.append(f"{last}[{k}:a]acrossfade=d={XF}[c{k}]"); last = f"[c{k}]"
    run(["ffmpeg","-y","-v","error",*ains,"-filter_complex",";".join(fc),"-map",last,"edit/ambient.wav"])
    # narration: each line at its time, normalised as a whole to NARR_LUFS
    nins = sum([["-i", f"narration/{s['narration']}.mp3"] for s in scs], [])
    fc = [f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={int(s['narr_at']*1000)}:all=1[n{k}]" for k, s in enumerate(scs)]
    fc.append("".join(f"[n{k}]" for k in range(n)) + f"amix=inputs={n}:normalize=0,apad,atrim=0:{total:.3f}[a]")
    run(["ffmpeg","-y","-v","error",*nins,"-filter_complex",";".join(fc),"-map","[a]","edit/narration-raw.wav"])
    g = NARR_LUFS - lufs("edit/narration-raw.wav")
    run(["ffmpeg","-y","-v","error","-i","edit/narration-raw.wav","-af",f"volume={g:.2f}dB","edit/narration.wav"])
    # mix, then two-pass loudnorm to FINAL_LUFS
    run(["ffmpeg","-y","-v","error","-i","edit/narration.wav","-i","edit/ambient.wav","-filter_complex",
         f"[1:a]apad,atrim=0:{total:.3f}[b];[0:a][b]amix=inputs=2:normalize=0,afade=t=in:d=0.5,afade=t=out:st={total-1.8:.3f}:d=1.8[a]","-map","[a]","edit/mix-raw.wav"])
    st = run(["ffmpeg","-hide_banner","-i","edit/mix-raw.wav","-af",f"loudnorm=I={FINAL_LUFS}:TP=-1.5:LRA=11:print_format=json","-f","null","-"])
    m = json.loads(st[st.rindex("{"):st.rindex("}")+1])
    ln = (f"loudnorm=I={FINAL_LUFS}:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
          f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    run(["ffmpeg","-y","-v","error","-i","edit/mix-raw.wav","-af",ln+",aresample=48000","edit/mix.wav"])
    # final picture: captions + cards, fades, encode
    os.makedirs("export", exist_ok=True)
    vf = f"ass=edit/captions.ass:fontsdir=fonts,fade=t=in:d=0.6,fade=t=out:st={total-1.8:.3f}:d=1.8,format=yuv420p"
    run(["ffmpeg","-y","-v","error","-i","edit/picture.mp4","-i","edit/mix.wav","-vf",vf,"-map","0:v","-map","1:a","-t",f"{total:.3f}",
         "-c:v","libx264","-profile:v","high","-crf","18","-preset","slow","-r",str(FPS),"-c:a","aac","-b:a","192k","-ar","48000",
         "-movflags","+faststart","export/the-night-the-animals-held-the-party.mp4"])
    print("final", dur("export/the-night-the-animals-held-the-party.mp4"), "planned", total)

if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"; only = set(sys.argv[2:])
    if what in ("shots", "all"):
        for sc in TL["scenes"]:
            for s in sc["shots"]:
                if not only or s["shot"] in only: make_shot(s)
    if what in ("scenes", "all"):
        for sc in TL["scenes"]: make_scene(sc)
    if what in ("final", "all"): final()
