"""Build edit/captions.ass: read-along captions (book text, sentence by sentence, max 2 lines, gold key words),
the title card on shot T and "The End" on shot E. Times come from timeline.json + Gemini word timestamps."""
import json, re, difflib
TL = json.load(open("timeline.json"))
script = dict(l.rstrip("\n").split("\t", 1) for l in open("narration/script.tsv", encoding="utf8"))
GOLD = re.compile(r"^(Milo(’s)?|Rosie|Bear(’s)?|Big|Brown|Blink|blink|THUMP|Tap(-tap)?|Hop-hop|Swish-swish|Tick-tick|Tiptoe)[.,!?”]*$")
CREAM, GOLDC, DARK = "&H00DCF4FF", "&H003DB8F5", "&H00101A2A"
norm = lambda s: re.sub(r"[^a-z]", "", s.lower().replace("’", "'"))
def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"
def token_times(nid, text):
    toks = text.split()
    atoms = [(i, norm(p)) for i, t in enumerate(toks) for p in re.split(r"-", t) if norm(p)]
    words = json.load(open(f"narration/words/{nid}.json"))["words"]
    wn = [norm(w["word"]) for w in words]
    sm = difflib.SequenceMatcher(None, [a for _, a in atoms], wn, autojunk=False)
    st, en = [None] * len(toks), [None] * len(toks)
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            ti = atoms[a + k][0]; w = words[b + k]
            st[ti] = w["start"] if st[ti] is None else st[ti]; en[ti] = w["end"]
    known = [i for i in range(len(toks)) if st[i] is not None]
    for i in range(len(toks)):   # interpolate any unmatched token
        if st[i] is None:
            lo = max([k for k in known if k < i], default=None); hi = min([k for k in known if k > i], default=None)
            st[i] = en[lo] if lo is not None else (st[hi] if hi is not None else 0)
            en[i] = st[hi] if hi is not None else st[i] + 0.3
    return toks, st, en
def chunks(toks):
    """Sentences, merged when short (sound words), split at a comma when longer than two lines."""
    sents, cur = [], []
    for i, t in enumerate(toks):
        cur.append(i)
        if re.search(r"[.!?][”]?$", t) and not (i + 1 < len(toks) and re.match(r"^[a-z]", toks[i + 1])):
            sents.append(cur); cur = []
    if cur: sents.append(cur)
    out = []
    for s in sents:
        txt = " ".join(toks[i] for i in s)
        if out and len(" ".join(toks[i] for i in out[-1])) + len(txt) < 34: out[-1] += s; continue
        while len(" ".join(toks[i] for i in s)) > 92:
            commas = [k for k in range(len(s) - 1) if toks[s[k]].endswith(",")]
            if not commas: break
            k = min(commas, key=lambda k: abs(len(" ".join(toks[i] for i in s[:k + 1])) - len(txt) / 2))
            out.append(s[:k + 1]); s = s[k + 1:]; txt = " ".join(toks[i] for i in s)
        out.append(s)
    return out
def wrap(words, width=46):
    """One line if it fits, else two lines balanced by length (no orphan words)."""
    if len(" ".join(words)) <= width: return [words]
    k = min(range(1, len(words)), key=lambda k: max(len(" ".join(words[:k])), len(" ".join(words[k:]))))
    return [words[:k], words[k:]]
def styled(w): return "{\\c" + GOLDC + "&}" + w + "{\\c" + CREAM + "&}" if GOLD.match(w) else w
ev = []
for sc in TL["scenes"]:
    nid = sc["narration"]
    if nid not in script: continue          # N0 title, N13 bonus page, N14 end card: no captions
    toks, st, en = token_times(nid, script[nid]); base = sc["narr_at"]
    cs = chunks(toks)
    for j, c in enumerate(cs):
        a = base + st[c[0]] - 0.12
        b = base + (st[cs[j + 1][0]] - 0.12 if j + 1 < len(cs) else en[c[-1]] + 0.7)
        txt = "\\N".join(" ".join(styled(w) for w in line) for line in wrap([toks[i] for i in c]))
        ev.append(f"Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\fad(120,120)}}{txt}")
# title card and end card
T = TL["scenes"][0]; E = TL["scenes"][-1]
BR, OR, GR, PB, AU = "&H00293A5B", "&H00174CD9", "&H00266437", "&H00043686", "&H00292A3B"
t0, t1 = T["start"] + 0.4, T["start"] + T["length"] - 0.3
ev.append(f"Dialogue: 1,{ts(t0)},{ts(t1)},Title,,0,0,0,,{{\\an5\\pos(1400,440)\\fad(700,500)}}{{\\c{BR}&\\fs92}}The Night the\\N{{\\c{OR}&\\fs150}}Animals\\N{{\\c{GR}&\\fs112}}Held the\\N{{\\c{PB}&\\fs150}}Party")
ev.append(f"Dialogue: 1,{ts(t0+1.6)},{ts(t1)},Byline,,0,0,0,,{{\\an5\\pos(1400,880)\\fad(600,500)}}Written by\\N{{\\fs64}}Chinwendu Blessing")
e0 = E["narr_at"] - 0.2
ev.append(f"Dialogue: 1,{ts(e0)},{ts(E['start']+E['length'])},End,,0,0,0,,{{\\an8\\pos(960,120)\\fad(800,0)}}The End")
hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Nunito ExtraLight,64,{CREAM},{CREAM},{DARK},&H96000000,-1,0,0,0,100,100,0.5,0,1,4.5,2.5,2,120,120,64,1
Style: Title,Fredoka Light,100,&H00293A5B,&H00293A5B,&H00E8F5FB,&H64000000,-1,0,0,0,100,100,1,0,1,9,4,5,40,40,40,1
Style: Byline,Fredoka Light,46,{AU},{AU},&H00E8F5FB,&H64000000,-1,0,0,0,100,100,0.5,0,1,7,3,5,40,40,40,1
Style: End,Dancing Script,190,&H0033B5F2,&H0033B5F2,&H00142440,&H78000000,-1,0,0,0,100,100,0,0,1,6,5,8,40,40,40,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
import os; os.makedirs("edit", exist_ok=True)
open("edit/captions.ass", "w", encoding="utf8").write(hdr + "\n".join(ev) + "\n")
print(len(ev), "events")
