# ABOUTME: 15.6 inch Windows laptop, lid open 107 degrees. Metres, Z up, the screen faces -Y. Origin: desk plane, centre of the base footprint.
import math
import bpy, bmesh
from mathutils import Vector
from lib import *

STAGE_SCALE = 0.9
BW, BD = 360.0, 240.0
FOOT = 2.5
DECK = 18.0              # deck top height above the desk, mm
OPEN = math.radians(107.0)
V = Vector


def rrpts(w, d, r, z, cx=0.0, cy=0.0, seg=5):
    return [((x / MM + cx) * MM, (y / MM + cy) * MM, z * MM) for (x, y) in rounded_rect_pts(w * MM, d * MM, r * MM, seg)]


def slab_bm(w, d, r, levels, cx=0.0, cy=0.0):
    """levels: list of (z, inset). Closed solid with chamfered top and bottom."""
    bm = bmesh.new()
    rings = [[bm.verts.new(p) for p in rrpts(w - 2 * ins, d - 2 * ins, max(1.0, r - ins), z, cx, cy)] for (z, ins) in levels]
    n = len(rings[0])
    for a in range(len(rings) - 1):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((rings[a][i], rings[a][j], rings[a + 1][j], rings[a + 1][i]))
    bm.faces.new(list(reversed(rings[0])))
    bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm


def plane_uv(w, h, cx, cy, z, facing_down=False):
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    x0, x1 = (cx - w / 2) * MM, (cx + w / 2) * MM
    y0, y1 = (cy - h / 2) * MM, (cy + h / 2) * MM
    zz = z * MM
    vs = [bm.verts.new((x0, y0, zz)), bm.verts.new((x1, y0, zz)), bm.verts.new((x1, y1, zz)), bm.verts.new((x0, y1, zz))]
    # screen face looks toward -Z in the closed pose; v is up the screen, which is +Y in the lid frame (y=0 is the top edge)
    f = bm.faces.new((vs[0], vs[3], vs[2], vs[1])) if facing_down else bm.faces.new((vs[0], vs[1], vs[2], vs[3]))
    for lp in f.loops:
        lp[uvl].uv = ((lp.vert.co.x - x0) / (x1 - x0), (y1 - lp.vert.co.y) / (y1 - y0))
    return bm


def keys_bm():
    rows = [
        (92.0, 9.4, [1.07] * 14),
        (76.5, 16.6, [1] * 13 + [2]),
        (57.5, 16.6, [1.5] + [1] * 12 + [1.5]),
        (38.5, 16.6, [1.75] + [1] * 11 + [2.25]),
        (19.5, 16.6, [2.25] + [1] * 10 + [2.75]),
        (0.5, 16.6, [1.25, 1.25, 1.25, 6.25, 1, 1, 1, 1, 1]),
    ]
    caps, pads = [], []
    for (yc, kd, widths) in rows:
        total = sum(widths)
        pitch = 285.0 / total
        x = -142.5
        for w in widths:
            kw = w * pitch - 2.4
            cx = x + w * pitch / 2
            b = box_bm(kw * MM, kd * MM, 2.4 * MM, 0.8 * MM, 1, center=(cx * MM, yc * MM, (DECK + 1.2) * MM))
            caps.append(b)
            p = box_bm((kw + 1.4) * MM, (kd + 1.4) * MM, 0.2 * MM, 0.0, 1, center=(cx * MM, yc * MM, (DECK + 0.1) * MM))
            pads.append(p)
            x += w * pitch
    return join_bm(caps), join_bm(pads)


def build(preview=True, reset=True):
    if reset:
        reset_scene()
    alu = mat("Laptop_Alu", (0.105, 0.110, 0.130, 1), metal=1.0, rough=0.30)
    keym = mat("Laptop_Key", (0.012, 0.012, 0.017, 1), rough=0.46, spec=0.4)
    tray = mat("Laptop_Tray", (0.003, 0.003, 0.005, 1), rough=0.6)
    tp = mat("Laptop_Trackpad", (0.006, 0.006, 0.010, 1), rough=0.12, spec=1.0)
    bez = mat("Bezel_Black", (0.004, 0.004, 0.006, 1), rough=0.30, spec=0.6)
    hinge = mat("Hinge_Dark", (0.020, 0.020, 0.026, 1), metal=1.0, rough=0.45)
    portm = mat("Port_Dark", (0.002, 0.002, 0.003, 1), rough=0.9)
    rub = mat("Rubber_Black", (0.006, 0.006, 0.007, 1), rough=0.85)
    glow = glow_material()
    glow_soft = mat("Glow_Purple_Soft", (0, 0, 0, 1), rough=0.4, emit=PURPLE, emit_strength=0.9)
    scr = mat("Screen_Laptop", (0.0, 0.0, 0.0, 1), rough=0.5, emit=(1.0, 1.0, 1.0, 1.0), emit_strength=1.0)
    if preview:
        b = scr.node_tree.nodes["Principled BSDF"]
        tex = scr.node_tree.nodes.new('ShaderNodeTexImage')
        tex.image = bpy.data.images.load(PREVIEW + "/screen_laptop.png")
        scr.node_tree.links.new(tex.outputs['Color'], b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = 1.0

    root = empty("laptop")
    to_object("laptop_base", slab_bm(BW, BD, 11.0, [(FOOT, 2.6), (FOOT + 1.4, 0.7), (DECK - 1.6, 0.7), (DECK, 2.2)]), alu, parent=root, smooth_deg=50.0)
    to_object("laptop_keytray", box_bm(292 * MM, 112 * MM, 0.3 * MM, 1.5 * MM, 1, center=(0, 43 * MM, (DECK + 0.05) * MM)), tray, parent=root, smooth_deg=None)
    caps, pads = keys_bm()
    to_object("laptop_keys", caps, keym, parent=root, smooth_deg=60.0)
    to_object("laptop_key_glow", pads, glow_soft, parent=root, smooth_deg=None)
    to_object("laptop_trackpad", box_bm(112 * MM, 70 * MM, 0.5 * MM, 2.5 * MM, 2, center=(0, -63 * MM, (DECK + 0.1) * MM)), tp, parent=root, smooth_deg=50.0)
    # speaker grills either side of the keyboard
    gr = []
    for side in (-1, 1):
        for k in range(12):
            gr.append(box_bm(1.1 * MM, 80 * MM, 0.4 * MM, 0.0, 1, center=((side * (166 + k * 2.6 - 14)) * MM, 52 * MM, (DECK + 0.1) * MM)))
    to_object("laptop_grills", join_bm(gr), portm, parent=root, smooth_deg=None)
    # hinge barrels
    hb = [cylinder_bm(7.0 * MM, 56 * MM, 24, axis='X', center=(s * 118 * MM, 121 * MM, (DECK - 2.0) * MM), bevel=1.0 * MM) for s in (-1, 1)]
    to_object("laptop_hinge", join_bm(hb), hinge, parent=root, smooth_deg=50.0)
    # ports
    pt = []
    for yy, w, h in ((-40, 15, 6.0), (-10, 15, 6.0), (30, 18, 5.0)):
        pt.append(box_bm(0.8 * MM, w * MM, h * MM, 0.3 * MM, 1, center=(-180.2 * MM, yy * MM, (FOOT + 7.5) * MM)))
    for yy, w, h in ((-30, 15, 6.0), (10, 9, 3.4)):
        pt.append(box_bm(0.8 * MM, w * MM, h * MM, 0.3 * MM, 1, center=(180.2 * MM, yy * MM, (FOOT + 7.5) * MM)))
    to_object("laptop_ports", join_bm(pt), portm, parent=root, smooth_deg=None)
    # feet and power light
    ft = []
    for sx in (-150, 150):
        for sy in (-95, 95):
            ft.append(cylinder_bm(6.0 * MM, FOOT * MM, 14, center=(sx * MM, sy * MM, FOOT * 0.5 * MM)))
    to_object("laptop_feet", join_bm(ft), rub, parent=root, smooth_deg=None)
    to_object("led_laptop", box_bm(3.0 * MM, 1.0 * MM, 0.5 * MM, 0.2 * MM, 1, center=(150 * MM, -119.6 * MM, (DECK - 5.0) * MM)), glow, parent=root, smooth_deg=None)

    # lid: pivot on the hinge axis, built in the closed pose, then opened
    lid = empty("laptop_lid", parent=root, loc=(0, 121 * MM, (DECK - 1.5) * MM), rot=(-OPEN, 0, 0))
    to_object("lid_shell", slab_bm(BW, BD, 11.0, [(0.0, 2.2), (0.8, 0.6), (5.0, 0.6), (6.0, 2.4)], cx=0.0, cy=-120.0), alu, parent=lid, smooth_deg=50.0)
    to_object("lid_bezel", slab_bm(352.0, 230.0, 8.0, [(-0.1, 0.0), (0.1, 0.0)], cx=0.0, cy=-120.0), bez, parent=lid, smooth_deg=None)
    sc = to_object("screen", plane_uv(340.0, 212.5, 0.0, -122.25, -0.6, facing_down=True), scr, parent=lid, smooth_deg=None)
    to_object("lid_camera", cylinder_bm(1.7 * MM, 0.4 * MM, 16, center=(0, -234.3 * MM, -0.4 * MM)), tray, parent=lid, smooth_deg=None)
    return root


def setup_lights():
    add_area("key", (-0.6, -0.8, 0.8), (0, 0, 0.1), 0.6, 45, color=(0.82, 0.90, 1.0))
    add_area("rim", (0.7, 0.6, 0.4), (0, 0, 0.1), 0.4, 40, color=(0.45, 0.25, 1.0))
    add_area("rim2", (-0.8, 0.5, 0.3), (0, 0, 0.1), 0.4, 20, color=(0.40, 0.30, 1.0))


VIEWS = {
    "three": ((0.55, -0.70, 0.40), (0.0, 0.0, 0.12), 50),
    "top": ((0.0, -0.18, 0.75), (0.0, 0.0, 0.0), 50),
    "side": ((0.9, 0.0, 0.14), (0.0, 0.0, 0.12), 48),
    "close": ((0.18, -0.30, 0.20), (0.0, 0.0, 0.03), 52),
    "front": ((0.0, -0.9, 0.18), (0.0, 0.0, 0.12), 48),
}
