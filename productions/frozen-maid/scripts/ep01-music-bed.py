"""Placeholder 30s score bed for Ep 1, synthesised locally (Lyria on Orbio returned 'pricing unavailable').
Follows the edit beats: courtly D-minor pad (0-6s), tension pulse under the humiliation (6-13s), unease (13-19.5s),
icy celesta shimmer as the frost spreads (19.5-23s), low ominous drone (23-29.5s), boom on the cut to black.
Usage: python3 ep01-music-bed.py out.wav"""
import sys, numpy as np, wave
SR = 48000; T = 30.0; n = int(SR * T); t = np.arange(n) / SR
rng = np.random.default_rng(7)
def hz(note):  # MIDI -> Hz
    return 440.0 * 2 ** ((note - 69) / 12)
def env(a, b, att=1.5, rel=1.5):
    e = np.zeros(n); i0, i1 = int(a * SR), int(b * SR)
    seg = np.arange(i1 - i0) / SR; d = b - a
    e[i0:i1] = np.clip(np.minimum(seg / att, (d - seg) / rel), 0, 1)
    return e
def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc = (1 - a) * x[i] + a * acc; y[i] = acc
    return y
def strings(notes, a, b, gain=0.12):
    out = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0.0, 0.11):  # detuned ensemble
            f = hz(m + det) * (1 + 0.003 * np.sin(2 * np.pi * 5.2 * t + rng.random() * 6))
            ph = np.cumsum(f) / SR
            out += (2 * (ph % 1) - 1) * 0.33
    return out * env(a, b) * gain / len(notes)
L = np.zeros(n)
# chords: Dm, Bb, Gm/D, Dm(add9) ; drones
L += strings([50, 57, 62, 65], 0.0, 6.6)
L += strings([46, 53, 58, 62], 6.0, 13.6)
L += strings([43, 50, 55, 58], 13.0, 19.9, gain=0.10)
L += strings([38, 45, 62, 64], 19.5, 23.6, gain=0.07)
L = lowpass(L, 1800.0)
# tension pulse (soft low heartbeat) 6-19.5s
for k, s in enumerate(np.arange(6.5, 19.5, 0.9)):
    i = int(s * SR); m = int(0.35 * SR); tt = np.arange(m) / SR
    L[i:i + m] += 0.22 * np.sin(2 * np.pi * 52 * tt) * np.exp(-tt * 11) * (0.6 + 0.4 * (k % 2 == 0))
# celesta / ice shimmer 19.3-23.5s
notes = [86, 89, 93, 96, 98, 93, 89, 101, 96, 93, 98, 105]
for k, m in enumerate(notes):
    s = 19.3 + k * 0.33 + rng.random() * 0.05; i = int(s * SR); dur = int(1.6 * SR)
    tt = np.arange(min(dur, n - i)) / SR; f = hz(m)
    L[i:i + len(tt)] += 0.06 * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2.01 * f * tt)) * np.exp(-tt * 3.2)
# ominous low drone 23-30s (D1 + A1, slow beating), brass-ish swell
dr = sum(np.sin(2 * np.pi * hz(m) * t + p) for m, p in ((26, 0), (33, 1.1), (38.07, 2.0)))
brass = lowpass(strings([38, 45, 50], 25.0, 29.6, gain=0.5), 600.0)
L += 0.16 * dr * env(23.0, 30.0, att=2.5, rel=0.5) + brass
# boom at 29.5
i = int(29.48 * SR); tt = np.arange(n - i) / SR
L[i:] += 0.6 * np.sin(2 * np.pi * (38 + 30 * np.exp(-tt * 18)) * tt) * np.exp(-tt * 4)
L += 0.004 * lowpass(rng.standard_normal(n), 400.0)  # room air
L /= np.max(np.abs(L)) * 1.12
R = np.roll(L, int(0.011 * SR))  # slight stereo width
pcm = (np.stack([L, R], 1) * 32767).astype("<i2")
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
