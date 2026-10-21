# ABOUTME: Entry point. blender --background --factory-startup --python run.py -- <obj> <views,comma> <w> <h> <samples> [export]
import sys, os, importlib
# No __pycache__ beside these scripts: this folder is inside the repository.
sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
import lib
from lib import *

args = argv_after_dashes()
objname = args[0]
views = args[1].split(",") if len(args) > 1 and args[1] != "none" else []
W = int(args[2]) if len(args) > 2 else 1280
H = int(args[3]) if len(args) > 3 else 800
S = int(args[4]) if len(args) > 4 else 64
do_export = "export" in args[5:]
tag = next((a[4:] for a in args[5:] if a.startswith("tag=")), "")

mod = importlib.import_module(objname)
root = mod.build(preview=True)

# stage
setup_world((0.004, 0.006, 0.016, 1.0))
scale = getattr(mod, "STAGE_SCALE", 1.0)
ground = box_bm(6 * scale, 6 * scale, 0.02, 0.0, 1, center=(0, 0, -0.01))
to_object("stage_ground", ground, mat("Stage_Ground", (0.004, 0.004, 0.006, 1), rough=0.7, spec=0.3))
if hasattr(mod, "setup_lights"):
    mod.setup_lights()
else:
    add_area("key", (-0.55 * scale, -0.7 * scale, 0.75 * scale), (0, 0, 0.05 * scale), 0.5 * scale, 38 * scale * scale, color=(0.80, 0.88, 1.0))
    add_area("rimR", (0.7 * scale, 0.55 * scale, 0.28 * scale), (0, 0, 0.05 * scale), 0.30 * scale, 12 * scale * scale, color=(0.50, 0.22, 1.0))
    add_area("rimL", (-0.6 * scale, 0.5 * scale, 0.22 * scale), (0, 0, 0.05 * scale), 0.25 * scale, 6 * scale * scale, color=(0.35, 0.30, 1.0))
setup_render(W, H, S)
bpy.context.scene.view_settings.exposure = float(os.environ.get("EXPO", "-0.35"))
os.makedirs(SP + "/renders", exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=SP + "/export/%s%s.blend" % (objname, tag))
for v in views:
    loc, tgt, lens = mod.VIEWS[v]
    cam = make_camera(loc, tgt, lens)
    render_to(SP + "/renders/%s%s-%s.png" % (objname, tag, v))
    bpy.data.objects.remove(cam, do_unlink=True)

if do_export:
    root2 = mod.build(preview=False)
    objs = [root2] + list(root2.children_recursive)
    export_glb(SP + "/export/%s.glb" % objname, objs)
print("RUN_DONE", objname, views)
