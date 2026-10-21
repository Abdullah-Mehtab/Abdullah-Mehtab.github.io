# ABOUTME: The whole Act 1 desk in the demo layout, for judging scale and readability. Metres; demo units are 111 per metre.
import math
import bpy
from mathutils import Vector
from lib import *
import kbd, mouse, tower, monitor, laptop

STAGE_SCALE = 2.4
D = math.radians


def place(root, x, y, rz=0.0, z=0.0):
    root.location = (x, y, z)
    root.rotation_euler = (0, 0, D(rz))


def build(preview=True, reset=True):
    reset_scene()
    # per object builds share one scene; each module's materials are created by name once
    tw = tower.build(preview, reset=False)
    place(tw, -0.973, 0.03, -12)
    m1 = monitor.build(preview, reset=False)
    place(m1, -0.468, 0.13, 8)
    m1.name = "monitor_kali"
    m2 = monitor.build(preview, reset=False)
    place(m2, 0.18, 0.13, -8)
    m2.name = "monitor_targets"
    # the second monitor shows a different picture
    for ch in m2.children_recursive:
        if ch.name.startswith("screen"):
            mt = bpy.data.materials["Screen_Monitor"].copy()
            mt.name = "Screen_Targets"
            for n in mt.node_tree.nodes:
                if n.type == 'TEX_IMAGE':
                    n.image = bpy.data.images.load(PREVIEW + "/screen_targets.png")
            ch.data.materials.clear()
            ch.data.materials.append(mt)
    kb = kbd.build(preview, reset=False)
    place(kb, -0.144, -0.19)
    ms = mouse.build(preview, reset=False)
    place(ms, 0.225, -0.185)
    lp = laptop.build(preview, reset=False)
    place(lp, 0.865, -0.06, -14)
    # desk mat under the keyboard and mouse
    pad = box_bm(0.92, 0.40, 0.003, 0.004, 2, center=(0.0, 0.0, 0.0015))
    to_object("desk_mat", pad, mat("Desk_Mat", (0.006, 0.006, 0.010, 1), rough=0.9, spec=0.2), loc=(0.03, -0.19, 0.0), smooth_deg=45.0)
    return tw


def setup_lights():
    add_area("key", (-1.4, -2.0, 2.0), (-0.05, 0, 0.2), 1.6, 160, color=(0.82, 0.90, 1.0))
    add_area("rimR", (2.0, 1.2, 1.0), (-0.05, 0, 0.2), 1.2, 110, color=(0.50, 0.22, 1.0))
    add_area("rimL", (-2.0, 1.4, 0.8), (-0.05, 0, 0.2), 1.0, 80, color=(0.40, 0.25, 1.0))
    add_area("wall", (0.0, 1.6, 0.9), (0.0, 0.0, 0.3), 2.0, 90, color=(0.45, 0.22, 1.0))


VIEWS = {
    "wide": ((1.65, -1.85, 1.05), (-0.05, 0.0, 0.2), 32),
    "laptopstop": ((0.80, -0.55, 0.30), (0.865, -0.06, 0.14), 40),
    "monitors": ((-0.15, -1.0, 0.44), (-0.15, 0.1, 0.30), 32),
    "front": ((0.0, -2.2, 0.55), (0.0, 0.0, 0.25), 30),
    "top": ((0.0, -0.3, 2.6), (0.0, -0.05, 0.0), 30),
}
