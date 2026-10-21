# ABOUTME: Ergonomic right handed wireless gaming mouse. Metres, Z up. Nose points to +Y (away from the user), tail to -Y.
import math
from bisect import bisect_right
import bpy, bmesh
from mathutils import Vector
from lib import *

STAGE_SCALE = 0.30
LEN = 125.0
Z0 = 1.2          # shell bottom above the desk (skates)
N_RING = 64
N_TOP, N_BOT = 2.5, 3.6


def pchip(pts):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    n = len(xs)
    h = [xs[i + 1] - xs[i] for i in range(n - 1)]
    d = [(ys[i + 1] - ys[i]) / h[i] for i in range(n - 1)]
    m = [0.0] * n
    m[0], m[-1] = d[0], d[-1]
    for i in range(1, n - 1):
        if d[i - 1] * d[i] <= 0:
            m[i] = 0.0
        else:
            w1, w2 = 2 * h[i] + h[i - 1], h[i] + 2 * h[i - 1]
            m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i])

    def f(x):
        if x <= xs[0]:
            return ys[0]
        if x >= xs[-1]:
            return ys[-1]
        i = bisect_right(xs, x) - 1
        t = (x - xs[i]) / h[i]
        return ((2 * t ** 3 - 3 * t ** 2 + 1) * ys[i] + (t ** 3 - 2 * t ** 2 + t) * h[i] * m[i]
                + (-2 * t ** 3 + 3 * t ** 2) * ys[i + 1] + (t ** 3 - t ** 2) * h[i] * m[i + 1])
    return f


H_T = pchip([(0, 22), (0.06, 25), (0.12, 30), (0.20, 36), (0.30, 39.5), (0.38, 40), (0.48, 38.2),
             (0.58, 33.8), (0.68, 29.2), (0.78, 25.2), (0.88, 21.8), (0.96, 19.2), (1, 17.5)])
R_T = pchip([(0, 21), (0.08, 27), (0.14, 30.5), (0.26, 34.5), (0.42, 35.2), (0.56, 33.8), (0.70, 33.0),
             (0.84, 33.4), (0.94, 31.5), (1, 24)])
L_T = pchip([(0, 20), (0.08, 26), (0.14, 28.8), (0.26, 31), (0.40, 29.6), (0.52, 26.6), (0.62, 25.6),
             (0.74, 28.4), (0.86, 30.2), (0.94, 29.0), (1, 23.5)])


def taper(u):
    tt, tn = 0.11, 0.07
    if u < tt:
        return math.sqrt(max(0.0, 1 - (1 - u / tt) ** 2))
    if u > 1 - tn:
        v = (1 - u) / tn
        return math.sqrt(max(0.0, 1 - (1 - v) ** 2))
    return 1.0


def ypos(u):
    return (u - 0.5) * LEN


def sgnpow(v, e):
    return math.copysign(abs(v) ** e, v)


def section(u):
    tp = taper(u)
    R, L, h = R_T(u), L_T(u), H_T(u)
    return (R - L) * 0.5, (R + L) * 0.5 * tp, h * tp


def pt(u, th):
    cx, hw, hh = section(u)
    c, s = math.cos(th), math.sin(th)
    ex = 2.0 / (N_TOP if s >= 0 else N_BOT)
    return Vector((cx + hw * sgnpow(c, ex), ypos(u), Z0 + (hh / 2) * (1 + sgnpow(s, ex))))


def surf(u, th, off=0.0):
    p = pt(u, th)
    if off == 0.0:
        return p
    e = 1e-3
    n = (pt(u + e, th) - pt(u - e, th)).cross(pt(u, th + e) - pt(u, th - e))
    cx, hw, hh = section(u)
    if n.dot(p - Vector((cx, ypos(u), Z0 + hh / 2))) < 0:
        n = -n
    n.normalize()
    return p + n * off


def mmv(v):
    return (v.x * MM, v.y * MM, v.z * MM)


def shell_bm():
    us = [0.004, 0.012, 0.022, 0.035, 0.05, 0.07] + [round(0.09 + 0.0235 * k, 4) for k in range(0, 36)] + [0.945, 0.965, 0.98, 0.99, 0.997]
    bm = bmesh.new()
    rings = []
    for u in us:
        rings.append([bm.verts.new(mmv(pt(u, 2 * math.pi * k / N_RING))) for k in range(N_RING)])
    tail = bm.verts.new(mmv(Vector((section(0.004)[0], ypos(0), Z0 + section(0.004)[2] * 0.5))))
    nose = bm.verts.new(mmv(Vector((section(0.997)[0], ypos(1), Z0 + section(0.997)[2] * 0.5))))
    for a in range(len(rings) - 1):
        for i in range(N_RING):
            j = (i + 1) % N_RING
            bm.faces.new((rings[a][i], rings[a + 1][i], rings[a + 1][j], rings[a][j]))
    for i in range(N_RING):
        j = (i + 1) % N_RING
        bm.faces.new((rings[0][j], rings[0][i], tail))
        bm.faces.new((rings[-1][i], rings[-1][j], nose))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm


def line_band(path_ut, half_th, lift=0.08):
    """Thin dark band along a path of (u, theta) pairs on the shell."""
    bm = bmesh.new()
    prev = None
    for k, (u, th) in enumerate(path_ut):
        if k + 1 < len(path_ut):
            du, dth = path_ut[k + 1][0] - u, path_ut[k + 1][1] - th
        else:
            du, dth = u - path_ut[k - 1][0], th - path_ut[k - 1][1]
        # widen across the line direction: if the line runs along u, widen in theta, else in u
        if abs(du) * LEN > abs(dth) * 18:
            a, b = (u, th - half_th), (u, th + half_th)
        else:
            a, b = (u - half_th * 18 / LEN, th), (u + half_th * 18 / LEN, th)
        row = [bm.verts.new(mmv(surf(a[0], a[1], lift))), bm.verts.new(mmv(surf(b[0], b[1], lift)))]
        if prev:
            bm.faces.new((prev[0], prev[1], row[1], row[0]))
        prev = row
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm


def squircle(a, b, n=5.0):
    m = max(abs(a), abs(b))
    if m == 0:
        return 0.0, 0.0
    r = (abs(a) ** n + abs(b) ** n) ** (1.0 / n)
    return a * m / r, b * m / r


def patch_bm(um, du, thm, dth, lift, nu, nt, bevel=0.35, bump=0.0, sink=0.6, sq=5.0):
    """Raised rounded pad that follows the shell wall. (u, theta) rectangle with rounded corners."""
    bm = bmesh.new()
    top, bot = {}, {}
    for i in range(nu + 1):
        for j in range(nt + 1):
            a, b = squircle(-1 + 2 * i / nu, -1 + 2 * j / nt, sq)
            u, th = um + a * du, thm + b * dth
            edge = i in (0, nu) or j in (0, nt)
            lf = lift + (0.0 if edge or not bump else bump * (1 if i % 2 else -1))
            top[(i, j)] = bm.verts.new(mmv(surf(u, th, lf)))
            if edge:
                bot[(i, j)] = bm.verts.new(mmv(surf(u, th, -sink)))
    for i in range(nu):
        for j in range(nt):
            bm.faces.new((top[(i, j)], top[(i + 1, j)], top[(i + 1, j + 1)], top[(i, j + 1)]))
    loop = [(i, 0) for i in range(nu)] + [(nu, j) for j in range(nt)] + [(i, nt) for i in range(nu, 0, -1)] + [(0, j) for j in range(nt, 0, -1)]
    for k in range(len(loop)):
        a, b = loop[k], loop[(k + 1) % len(loop)]
        bm.faces.new((top[a], top[b], bot[b], bot[a]))
    bm.faces.new([bot[p] for p in reversed(loop)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    if bevel > 0:
        tv = set(top[p] for p in loop)
        edges = [e for e in bm.edges if e.verts[0] in tv and e.verts[1] in tv
                 and len(e.link_faces) == 2 and e.calc_face_angle(0.0) > 0.5]
        if edges:
            bmesh.ops.bevel(bm, geom=edges, offset=bevel * MM, segments=2, profile=0.5, affect='EDGES')
    return bm


def build(preview=True, reset=True):
    if reset:
        reset_scene()
    shell_m = mat("Mouse_Shell", (0.020, 0.020, 0.028, 1), rough=0.66, spec=0.32)
    grip_m = mat("Mouse_Grip", (0.034, 0.034, 0.040, 1), rough=0.95, spec=0.25)
    seam_m = mat("Mouse_Seam", (0.001, 0.001, 0.002, 1), rough=0.9, spec=0.1)
    wheel_m = mat("Mouse_Wheel", (0.045, 0.045, 0.052, 1), rough=0.8, spec=0.3)
    skate_m = mat("Skate_Grey", (0.012, 0.012, 0.014, 1), rough=0.5)
    btn_m = mat("Mouse_Button", (0.032, 0.032, 0.042, 1), rough=0.45, spec=0.5)
    glow = glow_material()
    glow_soft = mat("Glow_Purple_Soft", (0, 0, 0, 1), rough=0.4, emit=PURPLE, emit_strength=0.9)

    root = empty("mouse")
    sh = shell_bm()
    sh.faces.ensure_lookup_table()
    for f in sh.faces:
        c = f.calc_center_median()
        yu = c.y / MM / LEN + 0.5
        f.material_index = 1 if (c.z / MM < Z0 + 1.7 and 0.07 < yu < 0.975 and len(f.verts) == 4) else 0
    to_object("mouse_shell", sh, [shell_m, glow], parent=root, smooth_deg=120.0)

    # parting line round the body, and the seams between the buttons and the palm shell
    us_all = [0.0 + i * 0.01 for i in range(1, 100)]
    seams = []
    seams.append(line_band([(u, math.pi + 0.5) for u in us_all], 0.020))
    seams.append(line_band([(u, -0.5) for u in us_all], 0.020))
    seams.append(line_band([(0.605, math.pi + 0.28 - 0.044 * k) for k in range(0, 40)], 0.020))
    top_th = math.pi / 2
    seams.append(line_band([(0.605 + i * 0.0045, top_th) for i in range(0, 17)], 0.020))
    seams.append(line_band([(0.815 + i * 0.0075, top_th) for i in range(0, 20)], 0.020))
    to_object("mouse_seams", join_bm(seams), seam_m, parent=root, smooth_deg=None)
    rear = line_band([(0.135, 1.05 + 0.04 * k) for k in range(0, 28)], 0.05, lift=0.1)
    to_object("mouse_rear_light", rear, glow, parent=root, smooth_deg=None)

    # grips and thumb buttons
    to_object("mouse_grip_right", patch_bm(0.37, 0.215, 0.0, 0.34, 0.45, 46, 10, bump=0.07), grip_m, parent=root, smooth_deg=60.0)
    to_object("mouse_grip_left", patch_bm(0.40, 0.15, math.pi, 0.30, 0.45, 32, 10, bump=0.07), grip_m, parent=root, smooth_deg=60.0)
    to_object("mouse_thumb_1", patch_bm(0.625, 0.058, math.pi, 0.095, 0.5, 8, 4, bevel=0.3, sq=6.0), btn_m, parent=root, smooth_deg=60.0)
    to_object("mouse_thumb_2", patch_bm(0.735, 0.050, math.pi, 0.088, 0.5, 8, 4, bevel=0.3, sq=6.0), btn_m, parent=root, smooth_deg=60.0)

    # scroll wheel slot (lit from below) and the wheel itself, origin on its axis
    uw = 0.752
    cxw = section(uw)[0]
    top = surf(uw, top_th).z
    slope = math.atan2(surf(uw + 0.04, top_th).z - surf(uw - 0.04, top_th).z, 0.08 * LEN)
    slot = box_bm(9.6 * MM, 21.0 * MM, 0.5 * MM, 0.25 * MM, 1, center=(0, 0, 0))
    to_object("mouse_wheel_slot", slot, glow_soft, parent=root, loc=(cxw * MM, ypos(uw) * MM, (top + 0.15) * MM), rot=(slope, 0, 0), smooth_deg=None)
    wb = bmesh.new()
    seg, rr, ri, wd = 60, 8.6, 7.7, 6.4
    levels = (-wd / 2, -wd / 2 + 0.8, wd / 2 - 0.8, wd / 2)
    vr = []
    for zz in levels:
        edge = abs(zz) == wd / 2
        ring = []
        for k in range(seg):
            a = 2 * math.pi * k / seg
            r = 7.4 if edge else (rr if k % 2 == 0 else ri)
            ring.append(wb.verts.new((zz * MM, r * math.cos(a) * MM, r * math.sin(a) * MM)))
        vr.append(ring)
    for a in range(3):
        for i in range(seg):
            j = (i + 1) % seg
            wb.faces.new((vr[a][i], vr[a][j], vr[a + 1][j], vr[a + 1][i]))
    wb.faces.new(vr[0])
    wb.faces.new(list(reversed(vr[-1])))
    bmesh.ops.recalc_face_normals(wb, faces=wb.faces[:])
    to_object("wheel", wb, wheel_m, parent=root, loc=(cxw * MM, ypos(uw) * MM, (top + 3.2 - rr) * MM), smooth_deg=50.0)

    sk = []
    for (x, y, w, l) in ((0, -40, 20, 18), (-8, 26, 7, 26), (8, 26, 7, 26)):
        sk.append(box_bm(w * MM, l * MM, (Z0 + 0.9) * MM, 0.3 * MM, 1, center=(x * MM, y * MM, (Z0 + 0.9) * 0.5 * MM)))
    to_object("mouse_skates", join_bm(sk), skate_m, parent=root, smooth_deg=None)
    return root


VIEWS = {
    "three": ((0.16, -0.20, 0.14), (0.0, 0.0, 0.018), 62),
    "close": ((0.05, -0.10, 0.075), (0.0, 0.006, 0.026), 62),
    "side": ((0.22, 0.0, 0.04), (0.0, 0.0, 0.02), 60),
    "left": ((-0.20, -0.06, 0.05), (0.0, 0.0, 0.02), 60),
    "top": ((0.0, -0.02, 0.28), (0.0, 0.0, 0.02), 60),
    "front": ((0.0, -0.22, 0.05), (0.0, 0.0, 0.02), 60),
}
