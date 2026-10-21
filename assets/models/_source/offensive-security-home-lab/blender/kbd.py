# ABOUTME: TKL ANSI keyboard, 87 keys. Metres, Z up, front faces -Y. Origin: desk plane, centre of the case.
import json, os, math
import bpy, bmesh
from lib import *

U = 19.05
CAP_D = 18.0
HEIGHTS = [8.4, 10.4, 9.4, 8.7, 8.9, 9.0]     # keycap height at the top centre, per row
TILTS = [4, 9, 6, 2, -2, -5]                  # degrees, positive means the back edge is higher
ROW_OF_Y = {0: 0, 1.5: 1, 2.5: 2, 3.5: 3, 4.5: 4, 5.5: 5}
WEDGE = math.radians(6.0)
PLATE_Z = 20.0          # height of the plate plane centre above the desk, mm
CAP_LIFT = 2.4          # keycap base above the plate, mm
CASE_W, CASE_D = 358.0, 140.0

KEYS = json.load(open(os.path.dirname(os.path.abspath(__file__)) + "/keys.json", encoding="utf-8"))


def keycap_bm(w_u, H, tilt_deg, idx, dish=0.8):
    base_w = w_u * U - 1.05
    zs = [0.0, 0.42 * H, H - 1.3, H - 0.5, H]
    ins = [0.0, 1.0, 1.9, 2.3, 2.8]
    rad = [1.8, 2.0, 2.3, 2.5, 2.8]
    tan_t = math.tan(math.radians(tilt_deg))
    rings = []
    for z, i_, r in zip(zs, ins, rad):
        pts2 = rounded_rect_pts((base_w - 2 * i_) * MM, (CAP_D - 2 * i_) * MM, r * MM, 2)
        rings.append([(x, y, z * MM + (z / H) * tan_t * y) for (x, y) in pts2])
    bm = bmesh.new()
    loft_rings(bm, rings, close_bottom=True, close_top=True)
    hy = (CAP_D - 2 * 2.8) * 0.5 * MM
    for yy in (-hy * 0.5, 0.0, hy * 0.5):
        bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:],
                               plane_co=(0, yy, 0), plane_no=(0, 1, 0))
    bm.normal_update()
    top_faces = [f for f in bm.faces if f.normal.z > 0.9 and f.calc_center_median().z > 0.5 * H * MM]
    top_verts = set(v for f in top_faces for v in f.verts)
    for v in top_verts:
        v.co.z -= dish * MM * max(0.0, 1.0 - (v.co.y / hy) ** 2)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    # UV: top face fills the key's cell of a 16 x 8 atlas, everything else samples the cell corner
    uvl = bm.loops.layers.uv.new("UVMap")
    xs = [v.co.x for v in top_verts]
    ys = [v.co.y for v in top_verts]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    col, row = idx % 16, idx // 16
    tops = set(top_faces)
    for f in bm.faces:
        for lp in f.loops:
            if f in tops:
                uu = 0.04 + 0.92 * (lp.vert.co.x - x0) / (x1 - x0)
                vv = 0.04 + 0.92 * (lp.vert.co.y - y0) / (y1 - y0)
            else:
                uu, vv = 0.015, 0.015
            lp[uvl].uv = ((col + uu) / 16.0, 1.0 - (row + 1) / 8.0 + vv / 8.0)
    return bm


def case_bm():
    w, d = CASE_W * MM, CASE_D * MM
    tan_w = math.tan(WEDGE)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    top_front = (PLATE_Z - (CASE_D / 2) * tan_w + 1.2) * MM
    top_back = (PLATE_Z + (CASE_D / 2) * tan_w + 1.2) * MM
    for v in bm.verts:
        sx = 1 if v.co.x > 0 else -1
        sy = 1 if v.co.y > 0 else -1
        sz = 1 if v.co.z > 0 else -1
        z = (top_back if sy > 0 else top_front) if sz > 0 else 2.0 * MM
        v.co = (sx * w / 2, sy * d / 2, z)
    bevel_all(bm, 2.0 * MM, 2)
    bm.normal_update()
    # pocket for the plate: the highest face pointing up and tilted
    top = max((f for f in bm.faces if f.normal.z > 0.9), key=lambda f: f.calc_area())
    res = bmesh.ops.inset_region(bm, faces=[top], thickness=4.2 * MM, depth=0.0, use_even_offset=True)
    inner = res['faces'][0]
    n = inner.normal.copy()
    for v in inner.verts:
        v.co -= n * 3.0 * MM
    return bm


def build(preview=True, reset=True):
    if reset:
        reset_scene()
    gm = mat("Case_Gunmetal", (0.085, 0.088, 0.105, 1), metal=1.0, rough=0.30)
    pl = mat("Plate_Black", (0.008, 0.008, 0.011, 1), metal=0.9, rough=0.5)
    rub = mat("Rubber_Black", (0.006, 0.006, 0.007, 1), rough=0.85)
    glow = glow_material()
    cap = mat("Keycap_Black", (0.013, 0.013, 0.018, 1), rough=0.52, spec=0.45)
    if preview:
        b = cap.node_tree.nodes["Principled BSDF"]
        tex = cap.node_tree.nodes.new('ShaderNodeTexImage')
        tex.image = bpy.data.images.load(PREVIEW + "/legends.png")
        tex.interpolation = 'Linear'
        cap.node_tree.links.new(tex.outputs['Color'], b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = 1.7

    root = empty("keyboard")
    to_object("kb_case", case_bm(), gm, parent=root)
    tilt = empty("kb_tilt", parent=root, loc=(0, 0, PLATE_Z * MM), rot=(WEDGE, 0, 0))

    # plate (inside the tilted frame, top face at local z = 0)
    pbm = box_bm(350.0 * MM, 126.5 * MM, 1.8 * MM, 0.5 * MM, 1, center=(0, 0, -0.9 * MM))
    to_object("kb_plate", pbm, pl, parent=tilt)

    # underglow pads, one per key, merged
    pads = []
    for k in KEYS:
        cx = (k["x"] + k["w"] / 2 - 18.25 / 2) * U
        cy = (3.25 - (k["y"] + 0.5)) * U
        pad = box_bm((k["w"] * U - 3.4) * MM, 15.4 * MM, 0.2 * MM, 0.0, 1, center=(cx * MM, cy * MM, 0.1 * MM))
        pads.append(pad)
    pg = join_bm(pads)
    pg_mat = mat("Glow_Purple_Soft", (0, 0, 0, 1), rough=0.4, emit=PURPLE, emit_strength=0.9)
    to_object("kb_underglow", pg, pg_mat, parent=tilt, smooth_deg=None)

    # three status lights in the empty spot under Delete, End, Page Down
    leds = []
    for i in range(3):
        cx = (15.25 + 0.5 + i * 1.0 - 18.25 / 2) * U
        cy = (3.25 - (3.5 + 0.5)) * U
        leds.append(cylinder_bm(1.1 * MM, 0.6 * MM, 12, center=(cx * MM, cy * MM, 0.3 * MM)))
    to_object("kb_status_leds", join_bm(leds), glow, parent=tilt)

    # keycaps, one node each
    for i, k in enumerate(KEYS):
        row = ROW_OF_Y[k["y"]]
        bm = keycap_bm(k["w"], HEIGHTS[row], TILTS[row], i)
        cx = (k["x"] + k["w"] / 2 - 18.25 / 2) * U
        cy = (3.25 - (k["y"] + 0.5)) * U
        to_object("key_" + k["code"], bm, cap, parent=tilt, loc=(cx * MM, cy * MM, CAP_LIFT * MM), smooth_deg=55.0)

    # front light bar and rubber feet
    strip = box_bm(330 * MM, 1.0 * MM, 1.7 * MM, 0.4 * MM, 1, center=(0, (-CASE_D / 2 - 0.1) * MM, 6.8 * MM))
    to_object("kb_light_bar", strip, glow, parent=root)
    feet = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            feet.append(box_bm(30 * MM, 12 * MM, 2.0 * MM, 0.6 * MM, 1, center=(sx * 148 * MM, sy * 52 * MM, 1.0 * MM)))
    to_object("kb_feet", join_bm(feet), rub, parent=root)
    return root


VIEWS = {
    "three": ((0.30, -0.42, 0.30), (0.0, -0.01, 0.02), 55),
    "close": ((0.04, -0.20, 0.13), (-0.05, -0.02, 0.03), 60),
    "side": ((0.60, -0.05, 0.05), (0.0, 0.0, 0.025), 60),
    "top": ((0.0, -0.20, 0.60), (0.0, -0.01, 0.02), 55),
    "front": ((0.0, -0.45, 0.07), (0.0, 0.0, 0.025), 55),
}
