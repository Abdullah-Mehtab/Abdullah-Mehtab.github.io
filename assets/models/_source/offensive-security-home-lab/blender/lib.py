# ABOUTME: Shared helpers for the Act 1 desk models. Runs inside Blender (bpy). Everything is written under SP only.
import bpy, bmesh, math, os, sys, json
from mathutils import Vector, Matrix, Euler, Quaternion

# Where renders, .blend files and exported GLBs go. It must be set, and it must be outside the repository: the repository root is the
# published site, so a build written into it would be published.
SP = os.environ.get("HOMELAB_BLENDER_OUT", "").replace("\\", "/").rstrip("/")
if not SP:
    raise SystemExit("Set HOMELAB_BLENDER_OUT to a folder outside the repository for renders and exports.")
os.makedirs(SP + "/export", exist_ok=True)
# The pictures the preview renders put on the screens and keycaps. Only the renders use them; the page draws its own at run time.
PREVIEW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "preview").replace("\\", "/")
PURPLE = (0.42, 0.12, 1.0, 1.0)     # the one accent colour, linear RGB
PURPLE_HOT = (0.62, 0.30, 1.0, 1.0)

MM = 0.001


def reset_scene():
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.images, bpy.data.cameras,
                 bpy.data.lights, bpy.data.curves, bpy.data.collections):
        for b in list(coll):
            coll.remove(b)
    _mats.clear()


_mats = {}


def mat(name, color=(0.02, 0.02, 0.025, 1.0), metal=0.0, rough=0.5, emit=None, emit_strength=0.0,
        alpha=None, coat=0.0, coat_rough=0.1, transmission=0.0, ior=1.45, aniso=0.0, spec=0.5):
    if name in _mats:
        return _mats[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = color
    b.inputs["Metallic"].default_value = metal
    b.inputs["Roughness"].default_value = rough
    b.inputs["IOR"].default_value = ior
    b.inputs["Specular IOR Level"].default_value = spec
    if coat > 0:
        b.inputs["Coat Weight"].default_value = coat
        b.inputs["Coat Roughness"].default_value = coat_rough
    if transmission > 0:
        b.inputs["Transmission Weight"].default_value = transmission
    if aniso > 0:
        b.inputs["Anisotropic"].default_value = aniso
    if emit is not None:
        b.inputs["Emission Color"].default_value = emit
        b.inputs["Emission Strength"].default_value = emit_strength
    if alpha is not None:
        b.inputs["Alpha"].default_value = alpha
        m.blend_method = 'BLEND'
    _mats[name] = m
    return m


def glow_material():
    return mat("Glow_Purple", color=(0.0, 0.0, 0.0, 1.0), rough=0.4, emit=PURPLE, emit_strength=6.0)


def set_smooth(bm, angle_deg=38.0):
    thr = math.radians(angle_deg)
    for f in bm.faces:
        f.smooth = True
    for e in bm.edges:
        if len(e.link_faces) == 2:
            if e.calc_face_angle(0.0) > thr:
                e.smooth = False
        else:
            e.smooth = False


def to_object(name, bm, material=None, parent=None, loc=(0, 0, 0), rot=(0, 0, 0), smooth_deg=38.0,
              collection=None, scale=(1, 1, 1)):
    if smooth_deg is not None:
        set_smooth(bm, smooth_deg)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    (collection or bpy.context.scene.collection).objects.link(ob)
    if material is not None:
        if isinstance(material, (list, tuple)):
            for m in material:
                me.materials.append(m)
        else:
            me.materials.append(material)
    ob.location = loc
    ob.rotation_euler = Euler(rot, 'XYZ')
    ob.scale = scale
    if parent is not None:
        ob.parent = parent
    return ob


def empty(name, parent=None, loc=(0, 0, 0), rot=(0, 0, 0), collection=None):
    ob = bpy.data.objects.new(name, None)
    ob.empty_display_type = 'PLAIN_AXES'
    ob.empty_display_size = 0.01
    (collection or bpy.context.scene.collection).objects.link(ob)
    ob.location = loc
    ob.rotation_euler = Euler(rot, 'XYZ')
    if parent is not None:
        ob.parent = parent
    return ob


def bevel_all(bm, r, seg=2, angle_deg=None):
    edges = bm.edges[:]
    if angle_deg is not None:
        thr = math.radians(angle_deg)
        edges = [e for e in edges if len(e.link_faces) == 2 and e.calc_face_angle(0.0) > thr]
    if not edges:
        return
    bmesh.ops.bevel(bm, geom=edges, offset=r, offset_type='OFFSET', segments=seg, profile=0.5,
                    affect='EDGES', clamp_overlap=True)


def box_bm(sx, sy, sz, r=0.0, seg=2, center=(0, 0, 0), bottom_origin=False):
    """Box with size in metres, bevel radius r. Centered unless bottom_origin."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= sx
        v.co.y *= sy
        v.co.z *= sz
    if r > 0:
        bevel_all(bm, min(r, min(sx, sy, sz) * 0.49), seg)
    off = Vector(center)
    if bottom_origin:
        off += Vector((0, 0, sz * 0.5))
    for v in bm.verts:
        v.co += off
    return bm


def rounded_rect_pts(w, d, r, seg=3):
    """Points of a rounded rectangle (counter clockwise seen from +Z), w along X, d along Y."""
    r = min(r, w * 0.5 - 1e-6, d * 0.5 - 1e-6)
    pts = []
    hx, hy = w * 0.5, d * 0.5
    centers = [(hx - r, hy - r, 0), (-hx + r, hy - r, 90), (-hx + r, -hy + r, 180), (hx - r, -hy + r, 270)]
    for cx, cy, a0 in centers:
        for i in range(seg + 1):
            a = math.radians(a0 + 90.0 * i / seg)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def loft_rings(bm, rings, close_bottom=False, close_top=False):
    """rings: list of lists of 3D points (same count). Builds quads between consecutive rings."""
    vr = [[bm.verts.new(p) for p in ring] for ring in rings]
    n = len(rings[0])
    for a in range(len(vr) - 1):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((vr[a][i], vr[a][j], vr[a + 1][j], vr[a + 1][i]))
    top = None
    if close_top:
        top = bm.faces.new(vr[-1])
    if close_bottom:
        bm.faces.new(list(reversed(vr[0])))
    return vr, top


def cylinder_bm(r, h, seg=32, r2=None, center=(0, 0, 0), axis='Z', cap=True, bevel=0.0, bevel_seg=1):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=seg, radius1=r,
                          radius2=(r if r2 is None else r2), depth=h)
    if bevel > 0:
        bevel_all(bm, bevel, bevel_seg, angle_deg=30)
    rot = None
    if axis == 'X':
        rot = Matrix.Rotation(math.radians(90), 4, 'Y')
    elif axis == 'Y':
        rot = Matrix.Rotation(math.radians(90), 4, 'X')
    if rot is not None:
        bmesh.ops.transform(bm, matrix=rot, verts=bm.verts)
    for v in bm.verts:
        v.co += Vector(center)
    return bm


def join_bm(bms):
    out = bmesh.new()
    for b in bms:
        me = bpy.data.meshes.new("tmp")
        b.to_mesh(me)
        out.from_mesh(me)
        bpy.data.meshes.remove(me)
        b.free()
    return out


def transform_bm(bm, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    m = Matrix.Translation(loc) @ Euler(rot, 'XYZ').to_matrix().to_4x4() @ Matrix.Diagonal((scale[0], scale[1], scale[2], 1))
    bmesh.ops.transform(bm, matrix=m, verts=bm.verts)
    return bm


# ---------------------------------------------------------------- stage and render

def look_at(ob, target, up_hint='Y'):
    d = Vector(target) - ob.location
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


def add_area(name, loc, target, size, energy, color=(1, 1, 1), shape='RECTANGLE', size_y=None):
    ld = bpy.data.lights.new(name, 'AREA')
    ld.energy = energy
    ld.color = color
    ld.shape = shape
    ld.size = size
    if shape == 'RECTANGLE':
        ld.size_y = size_y or size
    ob = bpy.data.objects.new(name, ld)
    bpy.context.scene.collection.objects.link(ob)
    ob.location = loc
    look_at(ob, target)
    return ob


def setup_world(color=(0.004, 0.006, 0.016, 1.0), strength=1.0):
    sc = bpy.context.scene
    w = bpy.data.worlds.new("World")
    w.use_nodes = True
    bg = w.node_tree.nodes["Background"]
    bg.inputs[0].default_value = color
    bg.inputs[1].default_value = strength
    sc.world = w


def setup_render(w, h, samples, glare=True, glare_threshold=1.0, glare_size=6, glare_mix=0.0):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_adaptive_sampling = True
    sc.cycles.adaptive_threshold = 0.02
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    sc.cycles.max_bounces = 8
    sc.cycles.caustics_reflective = False
    sc.cycles.caustics_refractive = False
    sc.cycles.sample_clamp_indirect = 10.0
    sc.render.resolution_x = w
    sc.render.resolution_y = h
    sc.render.resolution_percentage = 100
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_depth = '8'
    sc.view_settings.view_transform = 'AgX'
    try:
        sc.view_settings.look = 'AgX - Medium High Contrast'
    except Exception:
        pass
    sc.view_settings.exposure = 0.0
    sc.render.film_transparent = False
    if glare:
        sc.use_nodes = True
        nt = sc.node_tree
        nt.nodes.clear()
        rl = nt.nodes.new('CompositorNodeRLayers')
        gl = nt.nodes.new('CompositorNodeGlare')
        out = nt.nodes.new('CompositorNodeComposite')
        gl.glare_type = 'BLOOM'
        gl.inputs['Threshold'].default_value = glare_threshold
        gl.inputs['Smoothness'].default_value = 0.4
        gl.inputs['Strength'].default_value = 0.7
        gl.inputs['Size'].default_value = 0.55
        gl.inputs['Saturation'].default_value = 1.0
        nt.links.new(rl.outputs['Image'], gl.inputs['Image'])
        nt.links.new(gl.outputs['Image'], out.inputs['Image'])


def make_camera(loc, target, lens=50, name="Cam"):
    cd = bpy.data.cameras.new(name)
    cd.lens = lens
    cd.clip_start = 0.01
    cd.clip_end = 20
    ob = bpy.data.objects.new(name, cd)
    bpy.context.scene.collection.objects.link(ob)
    ob.location = loc
    look_at(ob, target)
    bpy.context.scene.camera = ob
    return ob


def render_to(path):
    sc = bpy.context.scene
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


def export_glb(path, selection_objs=None):
    kw = dict(filepath=path, export_format='GLB', export_apply=True, export_yup=True,
              export_cameras=False, export_lights=False, export_extras=False,
              export_image_format='WEBP', export_materials='EXPORT')
    if selection_objs is not None:
        bpy.ops.object.select_all(action='DESELECT')
        for o in selection_objs:
            o.select_set(True)
        kw['use_selection'] = True
    props = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    for opt in ('export_attributes', 'export_texcoords', 'export_normals', 'export_animations'):
        if opt in props:
            kw[opt] = True if opt != 'export_animations' else False
    kw = {k: v for k, v in kw.items() if k in props}
    bpy.ops.export_scene.gltf(**kw)


def argv_after_dashes():
    a = sys.argv
    return a[a.index('--') + 1:] if '--' in a else []
