import argparse
import math
from pathlib import Path

import bpy


CAR_LENGTH = 5.8
CAR_WIDTH = 2.28
EPS = 0.006


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    reset_scene()
    mats = create_materials()

    root = bpy.data.objects.new("SabreTurbo_OriginalInspired", None)
    bpy.context.collection.objects.link(root)

    body = create_extruded_profile(
        "Body_AttachedMuscleShell",
        [
            (-2.88, 0.34),
            (-2.78, 0.67),
            (-2.34, 0.82),
            (-1.62, 0.9),
            (-0.64, 0.97),
            (1.42, 0.98),
            (2.34, 0.86),
            (2.78, 0.66),
            (2.88, 0.4),
            (2.46, 0.3),
            (-2.42, 0.3),
        ],
        width=CAR_WIDTH,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(body, 0.055, 3)

    hood = create_tapered_box(
        "Hood_IntegratedLongMuscleHood",
        z_min=0.64,
        z_max=2.58,
        y_bottom=0.9,
        y_top=1.04,
        width_bottom=2.08,
        width_top=1.96,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(hood, 0.035, 2)

    trunk = create_tapered_box(
        "Trunk_IntegratedSlopedDeck",
        z_min=-2.5,
        z_max=-1.18,
        y_bottom=0.84,
        y_top=1.02,
        width_bottom=2.02,
        width_top=1.88,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(trunk, 0.035, 2)

    cabin = create_extruded_profile(
        "Cabin_AttachedFastbackGreenhouse",
        [
            (-1.42, 0.98),
            (-1.12, 1.23),
            (-0.66, 1.62),
            (0.5, 1.66),
            (0.94, 1.18),
            (1.04, 1.0),
        ],
        width=1.56,
        mat=mats["paint_dark"],
        parent=root,
    )
    add_bevel(cabin, 0.035, 2)

    add_glass_and_frames(root, mats)
    add_stripes(root, mats)
    add_front_and_rear_detail(root, mats)
    add_side_trim(root, mats)
    add_wheels(root, mats)
    add_shadow_helpers(root, mats)

    set_origin(root)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(output),
        export_format="GLB",
        export_apply=True,
        export_yup=False,
    )


def get_script_args():
    import sys

    if "--" not in sys.argv:
        return []
    return sys.argv[sys.argv.index("--") + 1 :]


def reset_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    bpy.context.scene.render.engine = "CYCLES"
    bpy.context.scene.view_settings.view_transform = "Filmic"
    bpy.context.scene.view_settings.look = "Medium High Contrast"


def create_materials():
    return {
        "paint": material("burnt_candy_red_metallic_paint", (0.55, 0.13, 0.045, 1), metallic=0.55, roughness=0.24),
        "paint_dark": material("dark_red_shadowed_cabin_paint", (0.32, 0.055, 0.025, 1), metallic=0.5, roughness=0.28),
        "stripe": material("warm_white_center_racing_stripe", (0.88, 0.84, 0.71, 1), metallic=0.12, roughness=0.36),
        "glass": material("attached_smoked_black_glass", (0.015, 0.035, 0.05, 0.86), metallic=0.0, roughness=0.08, alpha=0.86),
        "rubber": material("deep_black_rubber", (0.006, 0.006, 0.007, 1), metallic=0.0, roughness=0.78),
        "chrome": material("aged_brushed_chrome", (0.74, 0.75, 0.72, 1), metallic=0.88, roughness=0.18),
        "dark_chrome": material("dark_recessed_chrome", (0.08, 0.09, 0.09, 1), metallic=0.62, roughness=0.25),
        "light": material("warm_round_headlight_glass", (1.0, 0.94, 0.78, 1), metallic=0.05, roughness=0.08, emission=(1.0, 0.82, 0.5), emission_strength=0.55),
        "tail": material("flush_red_tail_lamp", (1.0, 0.12, 0.065, 1), metallic=0.0, roughness=0.25, emission=(1.0, 0.05, 0.02), emission_strength=0.38),
        "amber": material("flush_amber_marker_lamp", (1.0, 0.55, 0.1, 1), metallic=0.0, roughness=0.25, emission=(1.0, 0.38, 0.03), emission_strength=0.28),
    }


def material(name, color, metallic=0.0, roughness=0.5, alpha=1.0, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    mat.blend_method = "BLEND" if alpha < 1 else "OPAQUE"
    mat.use_screen_refraction = alpha < 1
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Alpha"].default_value = alpha
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def create_extruded_profile(name, profile, width, mat, parent):
    half = width / 2
    verts = []
    for x in (-half, half):
        for z, y in profile:
            verts.append((x, y, z))

    count = len(profile)
    faces = [tuple(range(count - 1, -1, -1)), tuple(range(count, count * 2))]
    for i in range(count):
        j = (i + 1) % count
        faces.append((i, j, j + count, i + count))

    mesh = bpy.data.meshes.new(f"{name}Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    shade_smooth(obj)
    return obj


def create_tapered_box(name, z_min, z_max, y_bottom, y_top, width_bottom, width_top, mat, parent):
    wb = width_bottom / 2
    wt = width_top / 2
    verts = [
        (-wb, y_bottom, z_min),
        (wb, y_bottom, z_min),
        (wb, y_bottom, z_max),
        (-wb, y_bottom, z_max),
        (-wt, y_top, z_min + 0.08),
        (wt, y_top, z_min + 0.08),
        (wt, y_top, z_max - 0.08),
        (-wt, y_top, z_max - 0.08),
    ]
    faces = [
        (0, 1, 2, 3),
        (4, 7, 6, 5),
        (0, 4, 5, 1),
        (1, 5, 6, 2),
        (2, 6, 7, 3),
        (3, 7, 4, 0),
    ]
    return create_mesh(name, verts, faces, mat, parent)


def create_panel(name, verts, mat, parent):
    obj = create_mesh(name, verts, [(0, 1, 2, 3)], mat, parent)
    shade_smooth(obj)
    return obj


def create_mesh(name, verts, faces, mat, parent):
    mesh = bpy.data.meshes.new(f"{name}Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    shade_smooth(obj)
    return obj


def add_cube(name, location, scale, mat, parent, rotation=(0, 0, 0), bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    obj.parent = parent
    if bevel:
        add_bevel(obj, bevel, 2)
    shade_smooth(obj)
    return obj


def add_glass_and_frames(parent, mats):
    create_panel(
        "Glass_AttachedWindshield",
        [
            (-0.67, 1.08, 0.92 + EPS),
            (0.67, 1.08, 0.92 + EPS),
            (0.58, 1.55, 0.43 + EPS),
            (-0.58, 1.55, 0.43 + EPS),
        ],
        mats["glass"],
        parent,
    )
    create_panel(
        "Glass_AttachedRearWindow",
        [
            (-0.6, 1.5, -0.68 - EPS),
            (0.6, 1.5, -0.68 - EPS),
            (0.68, 1.08, -1.24 - EPS),
            (-0.68, 1.08, -1.24 - EPS),
        ],
        mats["glass"],
        parent,
    )

    for side, label in [(-1, "Left"), (1, "Right")]:
        x = side * (0.786 + EPS)
        side_window = [
            (x, 1.08, -1.14),
            (x, 1.5, -0.66),
            (x, 1.54, 0.38),
            (x, 1.06, 0.82),
        ]
        create_panel(f"Glass_AttachedSideWindow_{label}", side_window, mats["glass"], parent)
        add_polyline(f"Trim_WindowFrame_{label}", side_window, mats["chrome"], parent, thickness=0.026)
        add_cube(f"Mirror_Stem_Attached_{label}", (side * 1.06, 1.03, 0.7), (0.26, 0.045, 0.06), mats["dark_chrome"], parent, bevel=0.01)
        add_cube(f"Mirror_Case_Attached_{label}", (side * 1.24, 1.04, 0.72), (0.28, 0.14, 0.15), mats["chrome"], parent, bevel=0.025)

    add_cube("Trim_WindshieldTopChrome", (0, 1.57, 0.39), (1.28, 0.025, 0.035), mats["chrome"], parent, rotation=(0.0, 0.0, 0.0), bevel=0.004)
    add_cube("Trim_RearWindowTopChrome", (0, 1.52, -0.7), (1.28, 0.025, 0.035), mats["chrome"], parent, bevel=0.004)


def add_stripes(parent, mats):
    add_cube("Stripe_FlushHoodCenter", (0, 1.055, 1.58), (0.43, 0.018, 1.8), mats["stripe"], parent, bevel=0.006)
    add_cube("Stripe_FlushRoofCenter", (0, 1.685, -0.12), (0.38, 0.018, 0.8), mats["stripe"], parent, bevel=0.006)
    add_cube("Stripe_FlushTrunkCenter", (0, 1.035, -1.82), (0.43, 0.018, 1.24), mats["stripe"], parent, bevel=0.006)


def add_front_and_rear_detail(parent, mats):
    add_cube("Front_BlackInsetGrille", (0, 0.76, 2.86), (1.62, 0.32, 0.08), mats["rubber"], parent, bevel=0.01)
    add_cube("Front_ChromeBumper_Attached", (0, 0.5, 2.95), (2.34, 0.19, 0.18), mats["chrome"], parent, bevel=0.025)
    add_cube("Front_LowerLipChrome", (0, 0.38, 2.82), (2.08, 0.065, 0.08), mats["chrome"], parent, bevel=0.01)

    for x in [-0.74, -0.48, 0.48, 0.74]:
        add_cylinder(f"Front_RoundHeadlight_{x:+.2f}", (x, 0.83, 2.92), radius=0.12, depth=0.035, mat=mats["light"], parent=parent, rotation=(0, 0, 0))
    for x in [-1.0, 1.0]:
        add_cube(f"Front_AmberMarker_{x:+.1f}", (x, 0.63, 2.93), (0.18, 0.11, 0.028), mats["amber"], parent, bevel=0.005)

    add_cube("Rear_ChromeBumper_Attached", (0, 0.5, -2.94), (2.22, 0.18, 0.18), mats["chrome"], parent, bevel=0.025)
    add_cube("Rear_BlackInsetPanel", (0, 0.72, -2.9), (1.72, 0.24, 0.055), mats["rubber"], parent, bevel=0.008)
    for x in [-0.78, -0.54, 0.54, 0.78]:
        add_cube(f"Rear_FlushTailLamp_{x:+.2f}", (x, 0.72, -2.935), (0.17, 0.105, 0.03), mats["tail"], parent, bevel=0.006)
    add_cube("Rear_LicensePlateInset", (0, 0.53, -2.96), (0.34, 0.13, 0.026), mats["stripe"], parent, bevel=0.006)


def add_side_trim(parent, mats):
    for side, label in [(-1, "Left"), (1, "Right")]:
        add_cube(f"Trim_ChromeRocker_{label}", (side * 1.145, 0.55, -0.05), (0.035, 0.05, 4.25), mats["chrome"], parent, bevel=0.006)
        add_cube(f"Trim_DoorHandle_{label}", (side * 1.17, 0.88, 0.1), (0.035, 0.07, 0.25), mats["chrome"], parent, bevel=0.006)
        add_cube(f"Trim_DoorSeam_{label}", (side * 1.176, 0.72, -0.42), (0.022, 0.5, 0.025), mats["rubber"], parent)
        add_cube(f"Trim_WhiteSideAccent_{label}", (side * 1.18, 0.68, -0.58), (0.03, 0.045, 1.34), mats["stripe"], parent, bevel=0.006)


def add_wheels(parent, mats):
    for side, label in [(-1, "Left"), (1, "Right")]:
        add_wheel(f"WheelFront{label}", (side * 1.16, 0.39, 1.62), side, mats, parent)
        add_wheel(f"WheelRear{label}", (side * 1.16, 0.39, -1.65), side, mats, parent)
        for z, kind in [(1.62, "Front"), (-1.65, "Rear")]:
            add_cylinder(
                f"Fender_ChromeArch_{kind}_{label}",
                (side * 1.17, 0.52, z),
                radius=0.55,
                depth=0.045,
                mat=mats["chrome"],
                parent=parent,
                rotation=(0, math.radians(90), 0),
            )


def add_wheel(name, location, side, mats, parent):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    empty.location = location
    empty.parent = parent

    tire = add_cylinder(
        f"WheelMesh_{name}",
        location,
        radius=0.52,
        depth=0.42,
        mat=mats["rubber"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=56,
    )
    tire.location = (0, 0, 0)
    tire.rotation_euler = (0, math.radians(90), 0)

    hub_x = 0.235 * side
    cap = add_cylinder(
        f"Hubcap_{name}",
        (hub_x, 0, 0),
        radius=0.31,
        depth=0.05,
        mat=mats["chrome"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=42,
    )
    cap.rotation_euler = (0, math.radians(90), 0)
    add_cylinder(
        f"Hubcap_DarkInset_{name}",
        (hub_x + 0.028 * side, 0, 0),
        radius=0.22,
        depth=0.025,
        mat=mats["dark_chrome"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=40,
    )


def add_shadow_helpers(parent, mats):
    add_cube("Undercarriage_DarkRecess", (0, 0.34, -0.04), (1.86, 0.08, 4.35), mats["rubber"], parent, bevel=0.012)


def add_cylinder(name, location, radius, depth, mat, parent, rotation=(0, 0, 0), vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = parent
    shade_smooth(obj)
    return obj


def add_polyline(name, points, mat, parent, thickness=0.02):
    for index, start in enumerate(points):
        end = points[(index + 1) % len(points)]
        add_segment(f"{name}_{index}", start, end, mat, parent, thickness)


def add_segment(name, start, end, mat, parent, thickness):
    sx, sy, sz = start
    ex, ey, ez = end
    dx, dy, dz = ex - sx, ey - sy, ez - sz
    length = math.sqrt(dx * dx + dy * dy + dz * dz)
    if length <= 0:
        return
    center = ((sx + ex) / 2, (sy + ey) / 2, (sz + ez) / 2)
    bpy.ops.mesh.primitive_cube_add(size=1, location=center)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = (thickness, thickness, length)
    obj.rotation_euler = direction_to_euler((dx, dy, dz))
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    obj.parent = parent
    shade_smooth(obj)


def direction_to_euler(direction):
    import mathutils

    vector = mathutils.Vector(direction).normalized()
    quat = vector.to_track_quat("Z", "Y")
    return quat.to_euler()


def add_bevel(obj, width, segments):
    bevel = obj.modifiers.new(f"{obj.name}_edge_bevel", "BEVEL")
    bevel.width = width
    bevel.segments = segments
    bevel.affect = "EDGES"
    normal = obj.modifiers.new(f"{obj.name}_weighted_normals", "WEIGHTED_NORMAL")
    normal.keep_sharp = True


def shade_smooth(obj):
    if not hasattr(obj.data, "polygons"):
        return
    for poly in obj.data.polygons:
        poly.use_smooth = True


def set_origin(root):
    for obj in bpy.context.scene.objects:
        obj.select_set(False)
    root.select_set(True)
    bpy.context.view_layer.objects.active = root


if __name__ == "__main__":
    main()
