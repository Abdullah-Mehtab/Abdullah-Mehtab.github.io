# ABOUTME: 27 inch 16:9 monitor. Metres, Z up, screen faces -Y. Origin: desk plane, centre of the base footprint line under the panel.
import math
import bpy, bmesh
from mathutils import Vector
from lib import *

STAGE_SCALE = 1.3
PW, PH = 612.0, 350.0      # outer panel, mm
SW, SH = 598.0, 336.0      # active screen
ZC = 282.0                 # panel centre height
V = Vector


def ring3d(w, h, r, y, seg=5):
    return [(x * MM, y * MM, (ZC + z) * MM) for (x, z) in rounded_rect_pts(w * MM, h * MM, r * MM, seg)]


def ring_pts_mm(w, h, r, y, seg=5):
    return [(x / MM * MM, y * MM, ZC * MM + z) for (x, z) in rounded_rect_pts(w * MM, h * MM, r * MM, seg)]


def rr(w, h, r, y, seg=5):
    return [(x, y * MM, ZC * MM + z) for (x, z) in rounded_rect_pts(w * MM, h * MM, r * MM, seg)]


def bezel_bm():
    bm = bmesh.new()
    loops = [rr(SW, SH, 2.5, -5.0), rr(PW, PH, 7.0, -5.0), rr(PW, PH, 7.0, 10.0), rr(SW, SH, 2.5, 10.0)]
    vr = [[bm.verts.new(p) for p in ring] for ring in loops]
    n = len(vr[0])
    for k in range(4):
        a, b = vr[k], vr[(k + 1) % 4]
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a[i], a[j], b[j], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bevel_all(bm, 0.9 * MM, 2, angle_deg=35)
    return bm


def back_bm():
    specs = [(0, 10.0), (3, 13.0), (10, 18.5), (24, 23.0), (48, 26.0), (80, 27.6), (112, 28.3), (140, 28.6)]
    bm = bmesh.new()
    rings = []
    for s, y in specs:
        w, h = PW - 2 * s, PH - 2 * s
        r = min(7.0 + 0.8 * s, min(w, h) / 2 - 1)
        rings.append([bm.verts.new(p) for p in rr(w, h, r, y)])
    n = len(rings[0])
    for a in range(len(rings) - 1):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((rings[a][i], rings[a][j], rings[a + 1][j], rings[a + 1][i]))
    bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm


def plane_bm(w, h, y, flip=False):
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    x0, x1 = -w / 2 * MM, w / 2 * MM
    z0, z1 = (ZC - h / 2) * MM, (ZC + h / 2) * MM
    yy = y * MM
    vs = [bm.verts.new((x0, yy, z0)), bm.verts.new((x1, yy, z0)), bm.verts.new((x1, yy, z1)), bm.verts.new((x0, yy, z1))]
    f = bm.faces.new((vs[0], vs[1], vs[2], vs[3]))     # normal toward -Y, the viewer
    for lp in f.loops:
        lp[uvl].uv = ((lp.vert.co.x - x0) / (x1 - x0), (lp.vert.co.z - z0) / (z1 - z0))
    return bm


def oval_base_bm(w, d, t, cy):
    bm = cylinder_bm(0.5, t * MM, 56, center=(0, 0, 0), bevel=0.0)
    for v in bm.verts:
        v.co.x *= w * MM
        v.co.y = v.co.y * d * MM + cy * MM
        v.co.z += t * MM * 0.5
    bevel_all(bm, 2.2 * MM, 2, angle_deg=30)
    return bm


def build(preview=True, reset=True):
    if reset:
        reset_scene()
    bez = mat("Bezel_Black", (0.004, 0.004, 0.006, 1), rough=0.30, spec=0.6)
    back = mat("Monitor_Back", (0.020, 0.020, 0.026, 1), rough=0.62, spec=0.4)
    stand = mat("Stand_Gunmetal", (0.085, 0.088, 0.105, 1), metal=1.0, rough=0.34)
    rub = mat("Rubber_Black", (0.006, 0.006, 0.007, 1), rough=0.85)
    glass = mat("Glass_Clear", (0.0, 0.0, 0.0, 1), rough=0.02, spec=1.0, alpha=0.05)
    try:
        glass.surface_render_method = 'BLENDED'
    except Exception:
        pass
    glow = glow_material()
    scr = mat("Screen_Monitor", (0.0, 0.0, 0.0, 1), rough=0.5, emit=(1.0, 1.0, 1.0, 1.0), emit_strength=1.0)
    if preview:
        b = scr.node_tree.nodes["Principled BSDF"]
        tex = scr.node_tree.nodes.new('ShaderNodeTexImage')
        tex.image = bpy.data.images.load(PREVIEW + "/screen_monitor.png")
        scr.node_tree.links.new(tex.outputs['Color'], b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = 1.0

    root = empty("monitor")
    to_object("monitor_bezel", bezel_bm(), bez, parent=root, smooth_deg=45.0)
    to_object("monitor_back", back_bm(), back, parent=root, smooth_deg=70.0)
    to_object("screen", plane_bm(SW, SH, -2.6), scr, parent=root, smooth_deg=None)
    g = to_object("monitor_glass", plane_bm(SW, SH, -3.4), glass, parent=root, smooth_deg=None)
    g.visible_shadow = False
    # stand: hinge block, neck, oval foot, rubber pad
    to_object("stand_hinge", box_bm(96 * MM, 42 * MM, 84 * MM, 5 * MM, 2, center=(0, 44 * MM, (ZC - 38) * MM)), stand, parent=root, smooth_deg=45.0)
    to_object("stand_neck", box_bm(70 * MM, 16 * MM, 270 * MM, 4 * MM, 2, center=(0, 64 * MM, 150 * MM)), stand, parent=root, smooth_deg=45.0)
    to_object("stand_foot", oval_base_bm(270, 215, 12, 70), stand, parent=root, smooth_deg=45.0)
    to_object("stand_pad", oval_base_bm(250, 195, 1.2, 70), rub, parent=root, smooth_deg=45.0)
    # power light on the bottom bezel
    to_object("led_monitor", box_bm(4.0 * MM, 0.8 * MM, 1.6 * MM, 0.3 * MM, 1, center=(262 * MM, -5.4 * MM, (ZC - PH / 2 + 3.4) * MM)), glow, parent=root, smooth_deg=None)
    return root


def setup_lights():
    add_area("key", (-0.9, -1.2, 1.2), (0, 0, 0.3), 0.8, 55, color=(0.82, 0.90, 1.0))
    add_area("rim", (0.9, 0.9, 0.7), (0, 0, 0.3), 0.6, 50, color=(0.45, 0.25, 1.0))
    add_area("rim2", (-1.0, 0.6, 0.5), (0, 0, 0.3), 0.5, 30, color=(0.40, 0.30, 1.0))


VIEWS = {
    "three": ((0.95, -1.15, 0.62), (0.0, 0.0, 0.27), 50),
    "front": ((0.0, -1.6, 0.30), (0.0, 0.0, 0.29), 50),
    "back": ((0.95, 1.2, 0.55), (0.0, 0.0, 0.26), 50),
    "side": ((1.6, 0.0, 0.26), (0.0, 0.05, 0.24), 48),
    "close": ((0.20, -0.55, 0.20), (0.18, 0.0, 0.12), 55),
}
