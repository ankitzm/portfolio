#!/usr/bin/env python3
"""Engraved postage-stamp illustrations for the project cards.

    python3 design/stamps/stamps.py              # every stamp
    python3 design/stamps/stamps.py clarity      # just one

Writes svg/<name>.svg (viewBox 400x300) and png/<name>.png (1200x900, via
headless Chrome), plus preview.html showing them side by side.
One ink per stamp on #ECE0C4 paper; all tone is hatching.
"""
import math
import random
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAPER = "#ECE0C4"
INKS = {"burgundy": "#64282D", "navy": "#2B3F8F", "olive": "#4F5A2E", "orange": "#A5601F"}
OUTLINE, HATCH, FINE = 1.25, 0.6, 0.5
BOX = (60, 52, 340, 248)  # subject area: 70% of the width, even margins


def n(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def poly_d(ps, closed=True):
    return "M" + " L".join(f"{n(x)} {n(y)}" for x, y in ps) + (" Z" if closed else "")


def smooth_d(ps, closed=False, t=1 / 6):
    """Catmull-Rom spline through the points, as cubic beziers."""
    P = [ps[-1]] + ps + ps[:2] if closed else [ps[0]] + ps + [ps[-1]]
    d = f"M{n(P[1][0])} {n(P[1][1])}"
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t)
        c2 = (p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t)
        d += f" C{n(c1[0])} {n(c1[1])} {n(c2[0])} {n(c2[1])} {n(p2[0])} {n(p2[1])}"
    return d + (" Z" if closed else "")


def ell(cx, cy, rx, ry, a0=0.0, a1=2 * math.pi, k=64, rot=0.0):
    c, s = math.cos(rot), math.sin(rot)
    out = []
    for i in range(k + 1):
        a = a0 + (a1 - a0) * i / k
        x, y = rx * math.cos(a), ry * math.sin(a)
        out.append((cx + x * c - y * s, cy + x * s + y * c))
    return out


def ribbon(center, w0, w1):
    """Closed outline of a tapered stroke along a polyline."""
    L, R = [], []
    for i, (x, y) in enumerate(center):
        a, b = center[max(i - 1, 0)], center[min(i + 1, len(center) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        m = math.hypot(dx, dy)
        w = (w0 + (w1 - w0) * i / (len(center) - 1)) / 2
        L.append((x - dy / m * w, y + dx / m * w))
        R.append((x + dy / m * w, y - dx / m * w))
    return L + R[::-1]


def hull(ps):
    ps = sorted(set((round(x, 3), round(y, 3)) for x, y in ps))
    cross = lambda o, a, b: (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, hi = [], []
    for p in ps:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(ps):
        while len(hi) >= 2 and cross(hi[-2], hi[-1], p) <= 0:
            hi.pop()
        hi.append(p)
    return lo[:-1] + hi[:-1]


class Stamp:
    def __init__(self, ink):
        self.ink_name, self.ink = ink, INKS[ink]
        self.defs, self.els, self.ids = [], [], 0

    def path(self, d, w=OUTLINE, fill=None, extra=""):
        f = {None: "", "paper": f' fill="{PAPER}"', "ink": f' fill="{self.ink}"'}[fill]
        self.els.append(f'<path d="{d}" stroke-width="{n(w)}"{f}{extra}/>')

    def shape(self, ps, w=OUTLINE, fill="paper", closed=True):
        self.path(poly_d(ps, closed), w, fill if closed else None)

    def knock(self, d, w):
        """Cream knock-out under a line, so it stays clean over the sky."""
        self.els.append(f'<path d="{d}" stroke="{PAPER}" stroke-width="{n(w)}"/>')

    def halo(self, d, w, pad=1.1):
        self.knock(d, w + 2 * pad)
        self.path(d, w)

    def tube(self, d, w):
        """A rod drawn as two outlines: thick ink, cream core."""
        self.path(d, w)
        self.knock(d, w - 2 * 1.1)

    def clip(self, ps):
        self.ids += 1
        self.defs.append(f'<clipPath id="c{self.ids}"><path d="{poly_d(ps)}"/></clipPath>')
        return f' clip-path="url(#c{self.ids})"'

    def hatch(self, ps, angle, gap, w=HATCH, cross=None, cross_gap=None):
        """Parallel engraving lines (angle in degrees) clipped to a polygon."""
        xs, ys = [p[0] for p in ps], [p[1] for p in ps]
        cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
        R = math.hypot(max(xs) - min(xs), max(ys) - min(ys)) / 2 + 1
        clip = self.clip(ps)
        for a, g in [(angle, gap)] + ([(cross, cross_gap or gap)] if cross is not None else []):
            ux, uy = math.cos(math.radians(a)), math.sin(math.radians(a))
            d, t = [], -R + g / 2
            while t <= R:
                px, py = cx - uy * t, cy + ux * t
                d.append(f"M{n(px - ux * R)} {n(py - uy * R)} L{n(px + ux * R)} {n(py + uy * R)}")
                t += g
            self.path(" ".join(d), w, extra=clip)

    def sky(self, cx=200, cy=150, rx=158, ry=116, gap=3.2):
        """The shared oval: horizontal ruled lines that thin and break up toward the edge."""
        rows = int(ry // gap)
        for i in range(-rows, rows + 1):
            y, e = cy + i * gap, abs(i * gap) / ry
            L = rx * math.sqrt(max(0.0, 1 - e * e))
            w = 0.55 - 0.25 * e * e
            core = L * (0.6 - 0.45 * e * e)
            segs = [(-core, core)]
            for side in (1, -1):
                x = core
                while x < L:
                    f = (x - core) / max(L - core, 1e-6)
                    a = x + 1.2 + 5 * f
                    b = min(a + 7 * (1 - f) + 1.2, L)
                    if b > a:
                        segs.append((side * a, side * b))
                    x = b
            self.path(" ".join(f"M{n(cx + a)} {n(y)} L{n(cx + b)} {n(y)}" for a, b in segs), w)

    def svg(self):
        return (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">\n'
            f'<defs>{"".join(self.defs)}</defs>\n'
            f'<rect width="400" height="300" fill="{PAPER}"/>\n'
            f'<g fill="none" stroke="{self.ink}" stroke-linecap="round" stroke-linejoin="round">\n'
            + "\n".join(self.els)
            + "\n</g>\n</svg>\n"
        )


def fit3d(s, draw, ex, ez, box=BOX):
    """Run draw(s, P) with a projection P(x, y, z) scaled to fill the subject box.
    A first dry run records every projected point to measure the drawing."""
    raw = lambda x, y, z: (x * ex[0] + z * ez[0], x * ex[1] - y + z * ez[1])
    seen = []
    draw(Stamp(s.ink_name), lambda x, y, z: seen.append(raw(x, y, z)) or seen[-1])
    xs, ys = [p[0] for p in seen], [p[1] for p in seen]
    k = min((box[2] - box[0]) / (max(xs) - min(xs)), (box[3] - box[1]) / (max(ys) - min(ys)))
    ox = (box[0] + box[2]) / 2 - k * (min(xs) + max(xs)) / 2
    oy = (box[1] + box[3]) / 2 - k * (min(ys) + max(ys)) / 2
    draw(s, lambda x, y, z: (ox + k * raw(x, y, z)[0], oy + k * raw(x, y, z)[1]))


# --------------------------------------------------------------------------
# 1. spinneret: orb web, one torn patch, spider spinning across the gap


def spinneret(s):
    rnd = random.Random(7)
    cx, cy, N = 200, 157, 16
    ang = [2 * math.pi * (i + 0.5) / N + rnd.uniform(-0.05, 0.05) for i in range(N)]
    ends = []
    for a in ang:
        r = rnd.uniform(0.95, 1.03)
        ends.append((cx + 124 * r * math.cos(a), cy + 84 * r * math.sin(a)))
    P = lambda i, f: (cx + f * (ends[i % N][0] - cx), cy + f * (ends[i % N][1] - cy))
    rings = [0.15 + 0.058 * k for k in range(14)]

    # the twig the web hangs from
    twig = [(x, 58 - 5 * math.sin((x - 60) / 280 * math.pi) + 1.4 * math.sin(x / 19)) for x in range(60, 343, 4)]
    tw = ribbon(twig, 9, 3)
    s.halo(poly_d(tw), OUTLINE)
    s.shape(tw)
    s.hatch(tw, 70, 1.5, cross=-20, cross_gap=2.6)
    s.shape(tw, fill=None)

    i0 = min(range(N), key=lambda i: abs(ang[i] - 0.22))  # tear starts just below 3 o'clock
    torn_spoke, torn = (i0 + 1) % N, lambda i, k: i in (i0, (i0 + 1) % N) and 3 <= k <= 10

    # anchors: up to the twig, down out of the picture
    web = []
    for i in range(N):
        x, y = ends[i]
        if math.sin(ang[i]) < -0.75:
            web.append(f"M{n(x)} {n(y)} L{n(x + (x - cx) * 0.05)} {n(56)}")
    for i in (max(range(N), key=lambda i: math.sin(ang[i]) - math.cos(ang[i])),
              max(range(N), key=lambda i: math.sin(ang[i]) + math.cos(ang[i]))):
        x, y = ends[i]
        web.append(f"M{n(x)} {n(y)} L{n(x + (x - cx) * 0.22)} {n(250)}")
    web.append(poly_d(ends))  # frame thread
    for i in range(N):
        if i == torn_spoke:
            web.append(f"M{n(cx)} {n(cy)} L{n(P(i, rings[2])[0])} {n(P(i, rings[2])[1])}")
            web.append(f"M{n(P(i, rings[11])[0])} {n(P(i, rings[11])[1])} L{n(ends[i][0])} {n(ends[i][1])}")
        else:
            web.append(f"M{n(cx)} {n(cy)} L{n(ends[i][0])} {n(ends[i][1])}")
    s.halo(" ".join(web), 0.9)

    spiral = []
    for k, f in enumerate(rings):
        for i in range(N):
            if torn(i, k):
                continue
            a, b = P(i, f), P(i + 1, f)
            m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
            c = (cx + (m[0] - cx) * 0.95, cy + (m[1] - cy) * 0.95)
            spiral.append(f"M{n(a[0])} {n(a[1])} Q{n(c[0])} {n(c[1])} {n(b[0])} {n(b[1])}")
    hub = [P(i, 0.07) for i in range(N)]
    s.halo(" ".join(spiral) + " " + poly_d(hub), 0.6)

    # loose ends hanging down from the tear
    loose = []
    for i, ks in ((i0, (4, 9)), ((i0 + 2) % N, (3, 6, 10)), (torn_spoke, (2, 11))):
        for k in ks:
            x, y = P(i, rings[k])
            dx = 7 if i == i0 else -7
            loose.append(smooth_d([(x, y), (x + dx * 0.9, y + 6), (x + dx * 0.7, y + 13), (x + dx * 0.1, y + 16), (x - dx * 0.3, y + 13)]))
    s.halo(" ".join(loose), 0.75)

    # the spider, at ring 7, heading across the gap; new thread trails back to the far spoke
    a, b = P(i0, rings[7]), P(i0 + 2, rings[7])
    ux, uy = b[0] - a[0], b[1] - a[1]
    m = math.hypot(ux, uy)
    ux, uy = ux / m, uy / m
    sx, sy = a[0] + (b[0] - a[0]) * 0.55, a[1] + (b[1] - a[1]) * 0.55
    head = math.atan2(uy, ux)
    K = 1.6  # spider scale
    tail = (sx - ux * 15 * K, sy - uy * 15 * K)
    s.halo(f"M{n(a[0])} {n(a[1])} L{n(tail[0])} {n(tail[1])}", 0.75)
    legs = []
    for side in (1, -1):
        for k, base in enumerate((35, 70, 110, 150)):
            t = head + side * math.radians(base)
            kx, ky = sx + ux * 3 * K + math.cos(t) * 10 * K, sy + uy * 3 * K + math.sin(t) * 10 * K
            t2 = t + side * math.radians(-25 if k < 2 else 25)
            legs.append(f"M{n(sx + ux * 3 * K)} {n(sy + uy * 3 * K)} L{n(kx)} {n(ky)} L{n(kx + math.cos(t2) * 10 * K)} {n(ky + math.sin(t2) * 10 * K)}")
    s.halo(" ".join(legs), 1.1)
    abd = ell(sx - ux * 6 * K, sy - uy * 6 * K, 9 * K, 7 * K, rot=head)
    ceph = ell(sx + ux * 5 * K, sy + uy * 5 * K, 5.2 * K, 4.4 * K, rot=head)
    for body, (a1, g1, a2, g2) in ((abd, (math.degrees(head) + 45, 1.5, math.degrees(head) - 45, 1.9)),
                                   (ceph, (math.degrees(head) + 90, 1.3, None, None))):
        s.halo(poly_d(body), OUTLINE)
        s.shape(body)
        s.hatch(body, a1, g1, cross=a2, cross_gap=g2)
        s.shape(body, fill=None)


# --------------------------------------------------------------------------
# 3. clarity: tangle -> lens -> neat tree


def clarity(s):
    cx, cy, ri, ro = 205, 126, 52, 61
    dx, dy = -0.42, 0.91
    m = math.hypot(dx, dy)
    dx, dy = dx / m, dy / m
    px, py = -dy, dx  # perpendicular
    at = lambda t, h: (cx + dx * t + px * h, cy + dy * t + py * h)

    # handle and brass collar
    prof = [(76, 6.2), (80, 7.4), (84, 6.4), (100, 6.9), (116, 7.6), (126, 7.4), (131, 5.6), (133, 2.5)]
    left = [at(t, -h) for t, h in prof]
    right = [at(t, h) for t, h in prof]
    handle = left + [at(134, 0)] + right[::-1]
    s.halo(poly_d(handle), OUTLINE)
    s.shape(handle)
    s.hatch([at(t, h * 0.05) for t, h in prof] + [at(t, h) for t, h in prof][::-1], math.degrees(math.atan2(dy, dx)), 1.4)
    s.hatch([at(t, h * 0.55) for t, h in prof] + [at(t, h) for t, h in prof][::-1], math.degrees(math.atan2(dy, dx)) + 70, 1.8)
    s.shape(handle, fill=None)
    s.path(poly_d([at(82, -7.2), at(82, 7.2)], False), HATCH)
    collar = [at(ro - 2, -8.5), at(76, -7.5), at(76, 7.5), at(ro - 2, 8.5)]
    s.halo(poly_d(collar), OUTLINE)
    s.shape(collar)
    s.hatch([at(ro - 2, 2), at(76, 2), at(76, 7.5), at(ro - 2, 8.5)], math.degrees(math.atan2(dy, dx)), 1.3)
    s.path(" ".join(poly_d([at(t, -8.2), at(t, 8.2)], False) for t in (66, 71)), HATCH)
    s.shape(collar, fill=None)

    # glass
    glass = ell(cx, cy, ri, ri)
    s.shape(glass, w=0, fill="paper")
    s.path(" ".join(poly_d(ell(cx, cy, r, r, math.radians(10), math.radians(80), 16), False) for r in (47, 44, 41)), FINE)
    s.path(" ".join(poly_d(ell(cx, cy, r, r, math.radians(200), math.radians(235), 10), False) for r in (45, 41.5)), FINE)

    # the thread: a tangle on the left, smoothing out inside the lens
    rnd = random.Random(11)
    tangle = [(62, 152), (72, 146)]
    for _ in range(30):
        a, r = rnd.uniform(0, 2 * math.pi), rnd.uniform(10, 34)
        tangle.append((102 + r * math.cos(a) * 1.15, 126 + r * math.sin(a)))
    tangle += [(132, 136), (142, 129), (cx - ri, cy + 1)]
    s.halo(smooth_d(tangle), 1.0)
    inside = [(x, cy + 7 * math.sin((x - cx + ri) / 6) * max(0, 1 - (x - cx + ri) / 70)) for x in range(cx - ri, cx + ri + 1, 2)]
    s.path(smooth_d(inside), OUTLINE)

    # rim: contour lines on the shadow side
    rim = ell(cx, cy, ro, ro)
    s.path(poly_d(rim) + " " + poly_d(ell(cx, cy, ri, ri)), OUTLINE, "paper", ' fill-rule="evenodd"')
    s.path(" ".join(poly_d(ell(cx, cy, r, r, math.radians(-40), math.radians(150), 48), False) for r in (54, 56, 58)), HATCH)
    s.path(poly_d(ell(cx, cy, 56, 56, math.radians(150), math.radians(320), 48), False), FINE)
    s.halo(poly_d(rim), OUTLINE, pad=0.9)

    # the tree it comes out as
    root = (283, cy)
    kids = [(309, cy - 26), (309, cy + 26)]
    leaves = [(334, cy - 40), (334, cy - 13), (334, cy + 13), (334, cy + 40)]
    edges = [((cx + ro, cy), root)] + [(root, k) for k in kids] + [(kids[i // 2], l) for i, l in enumerate(leaves)]
    s.halo(" ".join(poly_d([a, b], False) for a, b in edges), 1.0)
    for p, r in [(root, 5.5)] + [(k, 4.6) for k in kids] + [(l, 4.2) for l in leaves]:
        dot = ell(p[0], p[1], r, r, k=24)
        s.halo(poly_d(dot), 0.6)
        s.shape(dot, w=0.6, fill="ink")


# --------------------------------------------------------------------------
# 10. type-it-all: manual typewriter, three-quarter view


def typewriter(s, P):
    X = 110
    ex_deg = math.degrees(math.atan2(-0.17, 0.95))
    Lt = (0.45, 0.75, -0.5)  # light from upper right, front
    lm = math.sqrt(sum(c * c for c in Lt))

    def cyl(x0, x1, yc, zc, r, step=0.11, knurl=False, cap=True):
        ts = [2 * math.pi * i / 48 for i in range(48)]
        body = hull([P(x, yc + r * math.cos(t), zc + r * math.sin(t)) for x in (x0, x1) for t in ts])
        s.shape(body)
        acc, lines = 0.0, []
        for i in range(720):
            t = 2 * math.pi * i / 720
            if 0.333 * math.cos(t) - 0.95 * math.sin(t) <= 0.05:  # facing the viewer
                continue
            shade = 1 - max(0.0, (0.75 * math.cos(t) - 0.5 * math.sin(t)) / lm)
            acc += (0.6 if knurl else shade ** 1.6) * 2 * math.pi / 720
            if acc >= step:
                acc = 0.0
                a = P(x0, yc + r * math.cos(t), zc + r * math.sin(t))
                b = P(x1, yc + r * math.cos(t), zc + r * math.sin(t))
                lines.append(poly_d([a, b], False))
        s.path(" ".join(lines), HATCH)
        if cap:
            end = [P(x0, yc + r * math.cos(t), zc + r * math.sin(t)) for t in ts]
            s.shape(end)
            s.shape([P(x0, yc + r * 0.3 * math.cos(t), zc + r * 0.3 * math.sin(t)) for t in ts], w=HATCH)

    # body: a side profile (z, y) extruded across the width
    prof = [(0, 0), (64, 0), (64, 40), (56, 46), (40, 44), (30, 28), (0, 8)]
    q = lambda a, b: [P(0, a[1], a[0]), P(0, b[1], b[0]), P(X, b[1], b[0]), P(X, a[1], a[0])]
    faces = [(prof[2], prof[3], 2.0), (prof[3], prof[4], None), (prof[4], prof[5], 2.6),
             (prof[5], prof[6], 4.0), (prof[6], prof[0], 1.4)]
    for a, b, gap in faces:
        f = q(a, b)
        s.shape(f)
        if gap:
            s.hatch(f, ex_deg, gap)
        s.shape(f, fill=None)
    side = [P(0, y, z) for z, y in prof]
    s.shape(side)
    s.hatch(side, 90, 1.5)
    s.hatch([P(0, y, z) for z, y in prof[:2]] + [P(0, 20, 64), P(0, 4, 0)], 90, 1.5, cross=-30, cross_gap=2.2)
    s.shape(side, fill=None)

    # typebar segment showing through the arched window
    F = lambda u, v: P(u, 28 + 16 * v, 30 + 10 * v)
    arch = [F(55 + 30 * math.cos(t), 0.1 + 0.78 * math.sin(t)) for t in [math.pi * i / 32 for i in range(33)]]
    s.shape(arch, w=1.0)
    o = F(55, 0.1)
    bars = [arch[i] for i in range(1, 32, 2)]
    s.path(" ".join(poly_d([o, (o[0] + (b[0] - o[0]) * 0.94, o[1] + (b[1] - o[1]) * 0.94)], False) for b in bars), HATCH)

    # paper rising from behind the platen
    paper = [P(26, 60, 62), P(90, 60, 62), P(90, 94, 68), P(26, 94, 68)]
    s.shape(paper)
    s.hatch([P(24, 60, 62), P(92, 60, 62), P(92, 72, 64), P(24, 72, 64)], ex_deg, 1.6)
    s.shape(paper, fill=None)

    # carriage, far knob, platen, near knob
    for f in ([P(-6, 51, 44), P(116, 51, 44), P(116, 51, 66), P(-6, 51, 66)],
              [P(-6, 46, 44), P(116, 46, 44), P(116, 51, 44), P(-6, 51, 44)],
              [P(-6, 46, 44), P(-6, 51, 44), P(-6, 51, 66), P(-6, 46, 66)]):
        s.shape(f)
    s.hatch([P(-6, 46, 44), P(116, 46, 44), P(116, 51, 44), P(-6, 51, 44)], ex_deg, 1.3)
    cyl(114, 124, 60, 56, 11, knurl=True, cap=False)
    cyl(-4, 114, 60, 56, 9.5)
    cyl(-15, -4, 60, 56, 11, step=0.1, knurl=True)

    # carriage return lever
    lever = [P(4, 70, 48), P(-6, 77, 40), P(-18, 80, 32), P(-32, 78, 27)]
    s.tube(smooth_d(lever), 3.6)

    # keys, back row first; space bar in front
    for r in range(3, -1, -1):
        z = 5 + r * 6.6
        yd = 8 + 20 * z / 30
        for j in range(11):
            x = 9 + j * 8.8 + (r % 2) * 2.2
            s.path(poly_d([P(x, yd, z), P(x, yd + 3.5, z)], False), 0.75)
            cap = [P(x + 3.2 * math.cos(t), yd + 3.5, z + 3.2 * math.sin(t)) for t in [2 * math.pi * i / 20 for i in range(20)]]
            s.shape(cap, w=0.9)
            s.shape([P(x + 1.7 * math.cos(t), yd + 3.5, z + 1.7 * math.sin(t)) for t in [2 * math.pi * i / 16 for i in range(16)]], w=FINE)
    s.path(" ".join(poly_d([P(x, 6, -2), P(x, 9, 2)], False) for x in (30, 80)), 0.9)
    top = [P(22, 7, -5), P(88, 7, -5), P(88, 7, -1), P(22, 7, -1)]
    front = [P(22, 4, -5), P(88, 4, -5), P(88, 7, -5), P(22, 7, -5)]
    s.shape(top, w=1.0)
    s.shape(front, w=1.0)
    s.hatch(front, ex_deg, 1.2)


def type_it_all(s):
    fit3d(s, typewriter, (0.95, -0.17), (-0.45, -0.27))


# --------------------------------------------------------------------------

STAMPS = {
    "spinneret": (spinneret, "burgundy"),
    "clarity": (clarity, "olive"),
    "type-it-all": (type_it_all, "burgundy"),
}


def main(names):
    (HERE / "svg").mkdir(exist_ok=True)
    (HERE / "png").mkdir(exist_ok=True)
    for name in names or STAMPS:
        draw, ink = STAMPS[name]
        s = Stamp(ink)
        s.sky()
        draw(s)
        svg = HERE / "svg" / f"{name}.svg"
        svg.write_text(s.svg())
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
             "--window-size=1200,900", f"--screenshot={HERE / 'png' / name}.png", svg.as_uri()],
            check=True, capture_output=True,
        )
        print(name, svg.stat().st_size // 1024, "KB")
    cells = "".join(f'<figure><img src="svg/{k}.svg"><figcaption>{k}</figcaption></figure>' for k in STAMPS)
    small = "".join(f'<img class="s" src="svg/{k}.svg">' for k in STAMPS)
    (HERE / "preview.html").write_text(
        "<!doctype html><meta charset=utf-8><title>stamps</title><style>"
        "body{background:#d9cfb8;font:12px ui-monospace,monospace;margin:24px}"
        "figure{display:inline-block;margin:0 16px 16px 0}img{width:400px;display:block}"
        "img.s{width:220px;display:inline-block;margin:0 16px 16px 0}</style>"
        f"<div>{cells}</div><p>at 220px</p><div>{small}</div>"
    )


if __name__ == "__main__":
    main(sys.argv[1:])
