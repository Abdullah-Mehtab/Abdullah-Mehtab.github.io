# ABOUTME: Gaming PC tower. Metres, Z up, front faces -Y, tinted glass side on +X. Origin: desk plane, centre of the footprint.
import math, os
import numpy as np
import bpy, bmesh
from mathutils import Vector, Matrix, Euler
from lib import *

STAGE_SCALE = 1.7
V = Vector


def M(v):
    return v * MM


def obox(name, sx, sy, sz, cx, cy, cz, material, parent, r=1.0, seg=2, smooth=45.0):
    return to_object(name, box_bm(M(sx), M(sy), M(sz), M(r), seg, center=(M(cx), M(cy), M(cz))), material, parent=parent, smooth_deg=smooth)


def bx(sx, sy, sz, cx, cy, cz, r=1.0, seg=2):
    return box_bm(M(sx), M(sy), M(sz), M(r), seg, center=(M(cx), M(cy), M(cz)))


def sgnpow(v, e):
    return math.copysign(abs(v) ** e, v)


def torus_bm(R, r, nmaj=48, nmin=8, axis='Z', center=(0, 0, 0)):
    bm = bmesh.new()
    rings = []
    for i in range(nmaj):
        a = 2 * math.pi * i / nmaj
        ring = []
        for j in range(nmin):
            b = 2 * math.pi * j / nmin
            rr = R + r * math.cos(b)
            ring.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), r * math.sin(b))))
        rings.append(ring)
    for i in range(nmaj):
        i2 = (i + 1) % nmaj
        for j in range(nmin):
            j2 = (j + 1) % nmin
            bm.faces.new((rings[i][j], rings[i2][j], rings[i2][j2], rings[i][j2]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    rot = {'Z': None, 'X': Matrix.Rotation(math.radians(90), 4, 'Y'), 'Y': Matrix.Rotation(math.radians(90), 4, 'X')}[axis]
    if rot is not None:
        bmesh.ops.transform(bm, matrix=rot, verts=bm.verts)
    for v in bm.verts:
        v.co += V(center)
    return bm


def annulus_bm(r_in, r_out, z, seg=48, flip=False):
    bm = bmesh.new()
    a = [bm.verts.new((r_in * math.cos(2 * math.pi * i / seg), r_in * math.sin(2 * math.pi * i / seg), z)) for i in range(seg)]
    b = [bm.verts.new((r_out * math.cos(2 * math.pi * i / seg), r_out * math.sin(2 * math.pi * i / seg), z)) for i in range(seg)]
    for i in range(seg):
        j = (i + 1) % seg
        f = (a[i], b[i], b[j], a[j]) if not flip else (a[i], a[j], b[j], b[i])
        bm.faces.new(f)
    return bm


def sweep_bm(path, w, t, nring=12, side0=V((0, 1, 0)), cap=True, expo=2.0):
    """Sweep a superellipse (w by t) along a list of 3D points (metres). Used for hoses and cables."""
    bm = bmesh.new()
    pts = [V(p) for p in path]
    rings = []
    for k, p in enumerate(pts):
        if k == 0:
            T = (pts[1] - pts[0]).normalized()
        elif k == len(pts) - 1:
            T = (pts[-1] - pts[-2]).normalized()
        else:
            T = (pts[k + 1] - pts[k - 1]).normalized()
        up = T.cross(side0)
        if up.length < 1e-4:
            up = T.cross(V((1, 0, 0)))
        up.normalize()
        side = up.cross(T).normalized()
        ring = []
        for j in range(nring):
            a = 2 * math.pi * j / nring
            c, s = math.cos(a), math.sin(a)
            ring.append(bm.verts.new(p + side * (w / 2) * sgnpow(c, 2.0 / expo) + up * (t / 2) * sgnpow(s, 2.0 / expo)))
        rings.append(ring)
    for a in range(len(rings) - 1):
        for j in range(nring):
            j2 = (j + 1) % nring
            bm.faces.new((rings[a][j], rings[a][j2], rings[a + 1][j2], rings[a + 1][j]))
    if cap:
        bm.faces.new(list(reversed(rings[0])))
        bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm


def bezier(p0, p1, p2, p3, n=18):
    out = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        out.append(u ** 3 * V(p0) + 3 * u * u * t * V(p1) + 3 * u * t * t * V(p2) + t ** 3 * V(p3))
    return out


def fan_parts(kind, size, thick, blades=9, r_in=None, edge_light=False):
    """Fan about the Z axis, front face (with the light ring) toward +Z. Returns (frame, rotor): the frame is static (material 0 frame, 1 glow), the rotor (blades and hub) is the spinning node."""
    mm = MM
    half = size / 2.0
    r_in = r_in or (half - 3.0 if kind == 'square' else half - 5.0)
    nseg = 40
    t2 = thick / 2.0
    parts = []
    # frame ring
    bm = bmesh.new()

    def outer_pt(a):
        if kind == 'square':
            return (half * sgnpow(math.cos(a), 2.0 / 7.0), half * sgnpow(math.sin(a), 2.0 / 7.0))
        return (half * math.cos(a), half * math.sin(a))

    A, B, C, D = [], [], [], []
    for i in range(nseg):
        a = 2 * math.pi * i / nseg
        ix, iy = r_in * math.cos(a), r_in * math.sin(a)
        ox, oy = outer_pt(a)
        A.append(bm.verts.new((ix * mm, iy * mm, -t2 * mm)))
        B.append(bm.verts.new((ix * mm, iy * mm, t2 * mm)))
        C.append(bm.verts.new((ox * mm, oy * mm, t2 * mm)))
        D.append(bm.verts.new((ox * mm, oy * mm, -t2 * mm)))
    loops = [A, B, C, D]
    for k in range(4):
        L1, L2 = loops[k], loops[(k + 1) % 4]
        for i in range(nseg):
            j = (i + 1) % nseg
            bm.faces.new((L1[i], L1[j], L2[j], L2[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bevel_all(bm, 0.6 * mm, 1, angle_deg=40)
    for f in bm.faces:
        f.material_index = 0
    frame_parts = [bm]

    # blades
    rh, rt = 17.0, r_in - 1.2
    nst = 7
    bl = bmesh.new()
    for k in range(blades):
        base = 2 * math.pi * k / blades
        rings = []
        for s in range(nst):
            f = s / (nst - 1)
            r = rh + (rt - rh) * f
            th = base + 0.75 * f ** 1.3
            alpha = math.radians(40 - 22 * f)
            chord = 15 + 17 * f
            er = V((math.cos(th), math.sin(th), 0))
            et = V((-math.sin(th), math.cos(th), 0))
            cd = et * math.cos(alpha) + V((0, 0, 1)) * math.sin(alpha)
            bn = -et * math.sin(alpha) + V((0, 0, 1)) * math.cos(alpha)
            c = er * r
            tk = 1.3
            le, te = c - cd * chord / 2, c + cd * chord / 2
            pts = [le + bn * tk / 2, te + bn * tk / 2, te - bn * tk / 2, le - bn * tk / 2]
            rings.append([bl.verts.new((p.x * mm, p.y * mm, p.z * mm)) for p in pts])
        for s in range(nst - 1):
            for j in range(4):
                j2 = (j + 1) % 4
                bl.faces.new((rings[s][j], rings[s][j2], rings[s + 1][j2], rings[s + 1][j]))
        bl.faces.new(list(reversed(rings[0])))
        bl.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bl, faces=bl.faces[:])
    for f in bl.faces:
        f.material_index = 0
    parts.append(bl)

    # hub
    hub = cylinder_bm(rh * mm, thick * 0.62 * mm, 28, bevel=0.8 * mm, bevel_seg=1)
    for f in hub.faces:
        f.material_index = 0
    parts.append(hub)
    cap = cylinder_bm((rh - 4) * mm, 1.0 * mm, 24, center=(0, 0, thick * 0.31 * mm + 0.4 * mm))
    for f in cap.faces:
        f.material_index = 0
    parts.append(cap)

    # light ring on the front face
    rl = annulus_bm((r_in + 1.1) * mm, (r_in + 2.9) * mm, (t2 + 0.06) * mm, 56)
    for f in rl.faces:
        f.material_index = 1
    frame_parts.append(rl)
    if edge_light:
        eb = bx(1.2, size * 0.7, 3.0, half + 0.05, 0, 0, r=0.4, seg=1)
        for f in eb.faces:
            f.material_index = 1
        frame_parts.append(eb)
    return join_bm(frame_parts), join_bm(parts)


def mesh_front_image(path, px_w=128, px_h=128):
    """One tile of the hexagonal perforation: 5 holes wide and 3 hole rows tall, so it repeats without a seam."""
    p = 6.3
    q = p * math.sqrt(3.0)
    w_mm, h_mm = 5 * p, 3 * q
    xs = (np.arange(px_w) + 0.5) / px_w * w_mm
    ys = (np.arange(px_h) + 0.5) / px_h * h_mm
    X, Y = np.meshgrid(xs, ys)
    dxA = ((X + p / 2) % p) - p / 2
    dyA = ((Y + q / 2) % q) - q / 2
    dxB = (X % p) - p / 2
    dyB = (Y % q) - q / 2
    d = np.minimum(np.hypot(dxA, dyA), np.hypot(dxB, dyB))
    alpha = np.clip((d - 2.5) / 0.35, 0.0, 1.0)
    img = bpy.data.images.new("MeshAlpha", px_w, px_h, alpha=True)
    px = np.zeros((px_h, px_w, 4), dtype=np.float32)
    px[..., 0:3] = 0.015
    px[..., 3] = alpha
    img.pixels.foreach_set(px.ravel())
    img.filepath_raw = path
    img.file_format = 'PNG'
    img.save()
    return img


def build(preview=True, reset=True):
    if reset:
        reset_scene()
    steel = mat("Steel_Black", (0.014, 0.014, 0.019, 1), metal=0.55, rough=0.62)
    wall = mat("Panel_Steel", (0.022, 0.022, 0.028, 1), metal=0.6, rough=0.55)
    pcb = mat("PCB_Black", (0.010, 0.011, 0.016, 1), metal=0.1, rough=0.5)
    sink = mat("Heatsink_Gunmetal", (0.085, 0.09, 0.11, 1), metal=1.0, rough=0.34)
    sink_d = mat("Heatsink_Dark", (0.030, 0.032, 0.040, 1), metal=1.0, rough=0.40)
    pump_cap = mat("Pump_Cap", (0.004, 0.004, 0.007, 1), rough=0.07, spec=1.0)
    shroud = mat("Shroud_Dark", (0.034, 0.036, 0.047, 1), metal=0.9, rough=0.40)
    fan_frame = mat("Fan_Frame", (0.016, 0.016, 0.022, 1), rough=0.5)
    fan_blade = mat("Fan_Blade", (0.030, 0.030, 0.040, 1), rough=0.38)
    hose = mat("Hose_Sleeve", (0.012, 0.012, 0.016, 1), rough=0.75)
    screw = mat("Screw_Steel", (0.10, 0.10, 0.11, 1), metal=1.0, rough=0.32)
    rubber = mat("Rubber_Black", (0.006, 0.006, 0.007, 1), rough=0.85)
    slotm = mat("Slot_Dark", (0.002, 0.002, 0.003, 1), rough=0.9)
    glass = mat("Glass_Tinted", (0.008, 0.010, 0.016, 1), rough=0.03, spec=0.8, alpha=0.20)
    try:
        glass.surface_render_method = 'BLENDED'
    except Exception:
        pass
    glow = glow_material()

    root = empty("tower")

    # ---- case shell
    frame = [
        bx(230, 460, 12, 0, 0, 20),                      # bottom tray
        bx(230, 460, 10, 0, 0, 475),                     # roof
        bx(230, 8, 456, 0, 226, 242),                    # rear panel
        bx(16, 460, 14, 107, 0, 468, 1.2),               # glass frame: top bar (the +X side)
        bx(16, 460, 18, 107, 0, 35, 1.2),                # bottom bar
        bx(16, 18, 456, 107, 221, 242, 1.2),             # rear post
        bx(16, 18, 456, 107, -221, 242, 1.2),            # front post
        bx(15, 8, 424, -107.5, -226, 245, 1.2),          # front frame left bar (-X)
        bx(15, 8, 424, 107.5, -226, 245, 1.2),           # front frame right bar
        bx(230, 8, 20, 0, -226, 36, 1.2),                # front frame bottom bar
        bx(230, 8, 20, 0, -226, 458, 1.2),               # front frame top bar
    ]
    to_object("tw_frame", join_bm(frame), steel, parent=root, smooth_deg=45.0)
    to_object("tw_wall_left", bx(6, 456, 458, -112, 0, 243, 1.2), wall, parent=root, smooth_deg=45.0)
    gl = to_object("tw_glass", box_bm(M(3.0), M(428), M(424), M(2.0), 2, center=(M(109.5), 0, M(252))), glass, parent=root, smooth_deg=45.0)
    gl.visible_shadow = False
    # glass thumbscrews
    scr = []
    for yy in (-205, 205):
        for zz in (52, 452):
            scr.append(cylinder_bm(M(3.6), M(3.0), 16, axis='X', center=(M(112.2), M(yy), M(zz)), bevel=M(0.6)))
    to_object("tw_screws", join_bm(scr), screw, parent=root, smooth_deg=45.0)

    # feet
    ft = []
    for sx in (-86, 86):
        for sy in (-185, 185):
            ft.append(cylinder_bm(M(15), M(14), 20, center=(M(sx), M(sy), M(7)), bevel=M(2.0), bevel_seg=2))
    to_object("tw_feet", join_bm(ft), rubber, parent=root, smooth_deg=45.0)

    # ---- front mesh panel (alpha texture) and the fans behind it
    img_path = SP + "/export/mesh_front.png"
    img = mesh_front_image(img_path)
    tile_w, tile_h = 5 * 6.3, 3 * 6.3 * math.sqrt(3.0)
    mm_ = mat("Mesh_Front", (0.015, 0.015, 0.019, 1), metal=0.8, rough=0.5)
    nt = mm_.node_tree
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = img
    tex.interpolation = 'Linear'
    tex.extension = 'REPEAT'
    b = nt.nodes["Principled BSDF"]
    nt.links.new(tex.outputs['Alpha'], b.inputs['Alpha'])
    try:
        mm_.surface_render_method = 'BLENDED'
        mm_.blend_method = 'CLIP'
    except Exception:
        pass
    pbm = bmesh.new()
    uvl = pbm.loops.layers.uv.new("UVMap")
    v00 = pbm.verts.new((M(-100), M(-227), M(33)))
    v10 = pbm.verts.new((M(100), M(-227), M(33)))
    v11 = pbm.verts.new((M(100), M(-227), M(457)))
    v01 = pbm.verts.new((M(-100), M(-227), M(457)))
    f = pbm.faces.new((v00, v01, v11, v10))
    for lp in f.loops:
        lp[uvl].uv = ((lp.vert.co.x / MM + 100) / tile_w, (lp.vert.co.z / MM - 33) / tile_h)
    to_object("tw_front_mesh", pbm, mm_, parent=root, smooth_deg=None)

    # ---- front header: power ring, ports, drive light
    to_object("tw_header", bx(150, 3, 16, 0, -231.5, 458, 1.2), sink_d, parent=root, smooth_deg=45.0)
    to_object("led_power", torus_bm(M(7.5), M(1.1), 40, 8, axis='Y', center=(M(-52), M(-233.2), M(458))), glow, parent=root, smooth_deg=None)
    ports = [bx(14, 1.0, 5.6, -8, -233.1, 458, 0.8, 1), bx(14, 1.0, 5.6, 10, -233.1, 458, 0.8, 1), bx(9, 1.0, 3.2, 28, -233.1, 458, 0.8, 1),
             cylinder_bm(M(3.2), M(1.0), 16, axis='Y', center=(M(42), M(-233.1), M(458)))]
    ports.append(cylinder_bm(M(5.2), M(1.0), 24, axis='Y', center=(M(-52), M(-233.2), M(458))))
    to_object("tw_ports", join_bm(ports), slotm, parent=root, smooth_deg=None)
    to_object("led_drive", bx(4.2, 0.8, 1.6, 56, -233.3, 458, 0.3, 1), glow, parent=root, smooth_deg=None)

    # ---- PSU shroud with vent slots and a light along its top edge
    to_object("tw_shroud", bx(216, 446, 74, 0, -1, 63, 2.0), shroud, parent=root, smooth_deg=45.0)
    slots = [bx(0.7, 330, 3.0, 108.2, -20, 38 + k * 5.4, 0.3, 1) for k in range(9)]
    to_object("tw_shroud_vents", join_bm(slots), slotm, parent=root, smooth_deg=None)
    to_object("tw_shroud_light", bx(1.2, 410, 2.2, 108.4, -2, 98.0, 0.5, 1), glow, parent=root, smooth_deg=None)

    # ---- motherboard and parts
    to_object("tw_board", bx(4, 305, 244, -104, 59.5, 242, 1.0, 1), pcb, parent=root, smooth_deg=45.0)
    vrm = [bx(26, 84, 28, -89, 164, 336, 3.0, 2), bx(22, 28, 70, -91, 192, 290, 3.0, 2)]
    to_object("tw_vrm", join_bm(vrm), sink, parent=root, smooth_deg=45.0)
    fins = [bx(0.6, 1.6, 24, -75.8, 132 + 11 * k, 336, 0.3, 1) for k in range(7)]
    fins += [bx(0.6, 24, 1.6, -79.8, 192, 262 + 11 * k, 0.3, 1) for k in range(6)]
    to_object("tw_vrm_fins", join_bm(fins), sink_d, parent=root, smooth_deg=None)
    to_object("tw_eps_socket", bx(10, 28, 12, -97, 156, 357, 0.8, 1), sink_d, parent=root, smooth_deg=45.0)
    # standoff screws
    sc = []
    for (yy, zz) in ((-86, 130), (-86, 355), (205, 130), (205, 355), (60, 242)):
        sc.append(cylinder_bm(M(2.8), M(1.8), 10, axis='X', center=(M(-101.1), M(yy), M(zz))))
    to_object("tw_board_screws", join_bm(sc), screw, parent=root, smooth_deg=None)

    # memory: two sticks, light bar on the visible edge
    ram_body, ram_light = [], []
    for yy in (29.0, 43.2):
        ram_body.append(bx(34, 7.4, 133, -85, yy, 298, 1.2, 2))
        ram_light.append(bx(0.8, 5.0, 120, -67.6, yy, 298, 0.3, 1))
    to_object("tw_ram", join_bm(ram_body), sink_d, parent=root, smooth_deg=45.0)
    to_object("tw_ram_light", join_bm(ram_light), glow, parent=root, smooth_deg=None)

    # cpu pump head with a ring light
    py, pz = 84.0, 292.0
    pump = [cylinder_bm(M(38), M(26), 56, axis='X', center=(M(-86), M(py), M(pz)), bevel=M(2.5), bevel_seg=2)]
    to_object("tw_pump", join_bm(pump), sink, parent=root, smooth_deg=45.0)
    to_object("tw_pump_cap", cylinder_bm(M(29), M(1.6), 48, axis='X', center=(M(-72.6), M(py), M(pz))), pump_cap, parent=root, smooth_deg=45.0)
    to_object("led_pump", torus_bm(M(33.0), M(1.1), 56, 8, axis='X', center=(M(-72.3), M(py), M(pz))), glow, parent=root, smooth_deg=None)
    ports = [cylinder_bm(M(7.5), M(10), 16, center=(M(-90), M(py - 8), M(pz + 38 + 3))), cylinder_bm(M(7.5), M(10), 16, center=(M(-90), M(py + 8), M(pz + 38 + 3)))]
    to_object("tw_pump_ports", join_bm(ports), screw, parent=root, smooth_deg=45.0)

    # top radiator and its hoses
    rad = [bx(120, 394, 27, 0, 4, 456.5, 2.0, 2), bx(120, 20, 27, 0, 194, 456.5, 4.0, 2)]
    to_object("tw_radiator", join_bm(rad), sink_d, parent=root, smooth_deg=45.0)
    rp = [cylinder_bm(M(7.5), M(10), 16, center=(M(-40), M(196), M(441))), cylinder_bm(M(7.5), M(10), 16, center=(M(-18), M(196), M(441)))]
    to_object("tw_rad_ports", join_bm(rp), screw, parent=root, smooth_deg=45.0)
    h1 = sweep_bm([M(1) * p for p in bezier((-90, 76, 338), (-90, 76, 410), (-40, 150, 398), (-40, 196, 444))], M(12), M(12), 12)
    h2 = sweep_bm([M(1) * p for p in bezier((-90, 92, 338), (-90, 92, 396), (-18, 170, 386), (-18, 196, 444))], M(12), M(12), 12)
    to_object("tw_hoses", join_bm([h1, h2]), hose, parent=root, smooth_deg=60.0)

    # cpu power cable: from the socket up into the cut out in the board tray
    to_object("tw_tray_cutout", bx(1.0, 66, 24, -108.6, 156, 396, 1.0, 1), slotm, parent=root, smooth_deg=None)
    cab = []
    for k in range(3):
        yo = 156 + (k - 1) * 8
        cab.append(sweep_bm([M(1) * p for p in bezier((-97, yo, 364), (-97, yo, 380), (-104, yo, 384), (-108, yo, 394))], M(6.6), M(4.0), 10, side0=V((0, 1, 0))))
    to_object("tw_cpu_cable", join_bm(cab), hose, parent=root, smooth_deg=60.0)

    # graphics card, mounted upright so its fans face the glass
    to_object("tw_gpu", bx(50, 250, 130, 73, 25, 190, 4.0, 2), shroud, parent=root, smooth_deg=45.0)
    gstrip = [bx(1.2, 232, 2.2, 98.4, 25, 250, 0.5, 1)]
    to_object("tw_gpu_light", join_bm(gstrip), glow, parent=root, smooth_deg=None)
    to_object("tw_gpu_trim", bx(1.0, 246, 3.0, 98.2, 25, 241.5, 0.5, 1), sink, parent=root, smooth_deg=None)
    # a plain dark plate behind the perforated front, so the holes show a dark panel and not the inside of the case
    to_object("tw_front_backing", bx(200, 2, 424, 0, -219.5, 245, 0.5, 1), slotm, parent=root, smooth_deg=None)

    # fans, each its own node with the origin on its spin axis
    def add_fan(name, kind, size, thick, loc, rot, edge_light=False):
        frame_bm, rotor_bm = fan_parts(kind, size, thick, 9 if kind == 'square' else 11, edge_light=edge_light)
        p = (M(loc[0]), M(loc[1]), M(loc[2]))
        to_object("frame_" + name[4:], frame_bm, [fan_frame, glow], parent=root, loc=p, rot=rot, smooth_deg=50.0)
        return to_object(name, rotor_bm, fan_blade, parent=root, loc=p, rot=rot, smooth_deg=50.0)

    for i, yy in enumerate((-38, 67)):
        add_fan("fan_gpu_%d" % (i + 1), 'round', 100, 12, (100, yy, 190), (0, math.radians(90), 0))
    for i, yy in enumerate((-112, 8, 128)):
        add_fan("fan_rad_%d" % (i + 1), 'square', 120, 25, (0, yy, 430.5), (math.radians(180), 0, 0), edge_light=True)
    add_fan("fan_rear", 'square', 120, 25, (0, 211, 380), (math.radians(90), 0, 0), edge_light=True)
    return root


def setup_lights():
    add_area("key", (0.9, -0.9, 1.1), (0, 0, 0.25), 0.7, 38, color=(0.82, 0.90, 1.0))
    add_area("fill", (1.2, 0.3, 1.4), (0, 0, 0.25), 0.4, 18, color=(0.60, 0.45, 1.0))
    add_area("rim", (-0.9, 0.8, 0.6), (0, 0, 0.25), 0.5, 40, color=(0.45, 0.30, 1.0))


VIEWS = {
    "three": ((1.05, -0.85, 0.62), (0.0, 0.0, 0.25), 48),
    "side": ((1.55, 0.0, 0.28), (0.0, 0.0, 0.25), 45),
    "front": ((0.0, -1.55, 0.28), (0.0, 0.0, 0.25), 45),
    "close": ((0.62, -0.30, 0.36), (0.1, 0.02, 0.26), 55),
    "wide": ((1.6, -1.35, 0.9), (0.0, 0.0, 0.22), 40),
}
