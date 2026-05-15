import argparse
import math
from pathlib import Path

import bpy


CAR_LENGTH = 5.92
CAR_WIDTH = 2.46
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
            (-2.96, 0.31),
            (-2.78, 0.66),
            (-2.3, 0.84),
            (-1.42, 0.94),
            (-0.52, 1.0),
            (1.64, 1.0),
            (2.46, 0.83),
            (2.88, 0.62),
            (2.99, 0.35),
            (2.56, 0.25),
            (-2.54, 0.25),
        ],
        width=CAR_WIDTH,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(body, 0.045, 3)

    hood = create_tapered_box(
        "Hood_IntegratedLongMuscleHood",
        z_min=0.64,
        z_max=2.64,
        y_bottom=0.88,
        y_top=1.035,
        width_bottom=2.14,
        width_top=1.98,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(hood, 0.035, 2)

    trunk = create_tapered_box(
        "Trunk_IntegratedSlopedDeck",
        z_min=-2.58,
        z_max=-1.18,
        y_bottom=0.82,
        y_top=1.015,
        width_bottom=2.12,
        width_top=1.92,
        mat=mats["paint"],
        parent=root,
    )
    add_bevel(trunk, 0.035, 2)

    cabin = create_extruded_profile(
        "Cabin_AttachedFastbackGreenhouse",
        [
            (-1.48, 0.98),
            (-1.12, 1.09),
            (-0.68, 1.39),
            (0.26, 1.45),
            (0.66, 1.11),
            (0.84, 1.0),
        ],
        width=1.54,
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
        "paint": material("deep_burnt_red_metallic_paint", (0.48, 0.06, 0.022, 1), metallic=0.62, roughness=0.32),
        "paint_dark": material("dark_red_shadowed_cabin_paint", (0.18, 0.018, 0.014, 1), metallic=0.48, roughness=0.34),
        "stripe": material("aged_ivory_center_racing_stripe", (0.72, 0.68, 0.54, 1), metallic=0.03, roughness=0.62),
        "glass": material("attached_smoked_black_glass", (0.012, 0.028, 0.038, 0.88), metallic=0.0, roughness=0.26, alpha=0.88),
        "interior": material("visible_black_leather_interior", (0.01, 0.009, 0.008, 1), metallic=0.0, roughness=0.66),
        "rubber": material("deep_black_rubber", (0.006, 0.006, 0.007, 1), metallic=0.0, roughness=0.78),
        "sidewall": material("satin_tire_sidewall", (0.012, 0.012, 0.014, 1), metallic=0.0, roughness=0.88),
        "chrome": material("aged_brushed_chrome", (0.62, 0.64, 0.62, 1), metallic=0.82, roughness=0.31),
        "hubcap": material("muted_silver_wheel_hubcap", (0.42, 0.43, 0.42, 1), metallic=0.36, roughness=0.62),
        "dark_chrome": material("dark_recessed_chrome", (0.055, 0.062, 0.064, 1), metallic=0.58, roughness=0.36),
        "light": material("warm_round_headlight_glass", (1.0, 0.94, 0.78, 1), metallic=0.05, roughness=0.08, emission=(1.0, 0.82, 0.5), emission_strength=0.22),
        "tail": material("flush_red_tail_lamp", (1.0, 0.12, 0.065, 1), metallic=0.0, roughness=0.25, emission=(1.0, 0.05, 0.02), emission_strength=0.2),
        "amber": material("flush_amber_marker_lamp", (1.0, 0.55, 0.1, 1), metallic=0.0, roughness=0.25, emission=(1.0, 0.38, 0.03), emission_strength=0.16),
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
            (-0.66, 1.065, 0.82 + EPS),
            (0.66, 1.065, 0.82 + EPS),
            (0.55, 1.405, 0.26 + EPS),
            (-0.55, 1.405, 0.26 + EPS),
        ],
        mats["glass"],
        parent,
    )
    create_panel(
        "Glass_AttachedRearWindow",
        [
            (-0.57, 1.37, -0.72 - EPS),
            (0.57, 1.37, -0.72 - EPS),
            (0.66, 1.055, -1.3 - EPS),
            (-0.66, 1.055, -1.3 - EPS),
        ],
        mats["glass"],
        parent,
    )

    add_cube("Interior_DashboardVisibleThroughGlass", (0, 0.99, 0.58), (1.22, 0.14, 0.28), mats["interior"], parent, bevel=0.018)
    add_cube("Interior_FrontBenchSeat", (0, 0.89, -0.2), (1.24, 0.24, 0.4), mats["interior"], parent, bevel=0.02)
    add_cube("Interior_RearBenchSeat", (0, 0.86, -0.94), (1.18, 0.22, 0.34), mats["interior"], parent, bevel=0.02)
    add_cube("Interior_SteeringWheel", (-0.38, 1.03, 0.45), (0.11, 0.11, 0.11), mats["dark_chrome"], parent, rotation=(0.4, 0.1, 0.0), bevel=0.035)
    add_cube("Glass_WindshieldWiper_Left", (-0.23, 1.075, 0.73), (0.03, 0.032, 0.52), mats["rubber"], parent, rotation=(0.16, 0.0, -0.18), bevel=0.003)
    add_cube("Glass_WindshieldWiper_Right", (0.23, 1.075, 0.73), (0.03, 0.032, 0.52), mats["rubber"], parent, rotation=(0.16, 0.0, 0.18), bevel=0.003)
    for index, z in enumerate([-0.84, -0.98, -1.12]):
        add_cube(f"Glass_RearWindowLouver_{index}", (0, 1.36 - index * 0.045, z), (1.16, 0.035, 0.04), mats["dark_chrome"], parent, bevel=0.004)

    for side, label in [(-1, "Left"), (1, "Right")]:
        x = side * (0.796 + EPS)
        side_window = [
            (x, 1.04, -1.22),
            (x, 1.36, -0.74),
            (x, 1.42, 0.24),
            (x, 1.03, 0.74),
        ]
        create_panel(f"Glass_AttachedSideWindow_{label}", side_window, mats["glass"], parent)
        add_polyline(f"Trim_WindowFrame_{label}", side_window, mats["chrome"], parent, thickness=0.026)
        add_cube(f"Trim_BPillar_{label}", (side * 0.812, 1.2, -0.22), (0.03, 0.48, 0.04), mats["dark_chrome"], parent, bevel=0.004)
        add_cube(f"Mirror_Stem_Attached_{label}", (side * 1.16, 0.94, 0.69), (0.2, 0.038, 0.055), mats["dark_chrome"], parent, bevel=0.008)
        add_cube(f"Mirror_Case_Attached_{label}", (side * 1.31, 0.965, 0.71), (0.24, 0.13, 0.145), mats["chrome"], parent, bevel=0.022)

    add_cube("Trim_WindshieldTopChrome", (0, 1.43, 0.28), (1.26, 0.024, 0.033), mats["chrome"], parent, bevel=0.004)
    add_cube("Trim_WindshieldBaseChrome", (0, 1.075, 0.8), (1.38, 0.024, 0.033), mats["chrome"], parent, bevel=0.004)
    add_cube("Trim_RearWindowTopChrome", (0, 1.385, -0.74), (1.18, 0.024, 0.033), mats["chrome"], parent, bevel=0.004)
    add_cube("Trim_RearWindowBaseChrome", (0, 1.08, -1.25), (1.38, 0.024, 0.033), mats["chrome"], parent, bevel=0.004)


def add_stripes(parent, mats):
    add_cube("Stripe_FlushHoodCenter", (0, 1.067, 1.6), (0.42, 0.017, 1.96), mats["stripe"], parent, bevel=0.004)
    add_cube("Stripe_FlushRoofCenter", (0, 1.505, -0.12), (0.34, 0.017, 0.78), mats["stripe"], parent, bevel=0.004)
    add_cube("Stripe_FlushRearDeckCenter", (0, 1.045, -1.86), (0.42, 0.017, 1.36), mats["stripe"], parent, bevel=0.004)
    add_cube("Stripe_FrontNoseReturn", (0, 0.9, 2.66), (0.42, 0.018, 0.34), mats["stripe"], parent, bevel=0.004)


def add_front_and_rear_detail(parent, mats):
    add_cube("Front_BlackInsetGrille", (0, 0.75, 2.91), (1.68, 0.31, 0.075), mats["rubber"], parent, bevel=0.01)
    for x in [-0.28, -0.12, 0.04, 0.2, 0.36]:
        add_cube(f"Front_ChromeGrilleBar_{x:+.2f}", (x, 0.775, 2.95), (0.032, 0.24, 0.022), mats["chrome"], parent, bevel=0.003)
    add_cube("Front_ChromeGrilleTopRail", (0, 0.9, 2.95), (1.72, 0.034, 0.024), mats["chrome"], parent, bevel=0.004)
    add_cube("Front_ChromeGrilleBottomRail", (0, 0.62, 2.95), (1.72, 0.034, 0.024), mats["chrome"], parent, bevel=0.004)
    add_cube("Front_ChromeBumper_Attached", (0, 0.48, 3.0), (2.42, 0.18, 0.18), mats["chrome"], parent, bevel=0.024)
    add_cube("Front_LowerLipChrome", (0, 0.37, 2.86), (2.12, 0.06, 0.075), mats["chrome"], parent, bevel=0.01)

    for x in [-0.74, -0.48, 0.48, 0.74]:
        add_cylinder(f"Front_ChromeHeadlightBezel_{x:+.2f}", (x, 0.82, 2.965), radius=0.14, depth=0.022, mat=mats["chrome"], parent=parent, rotation=(0, 0, 0), vertices=34)
        add_cylinder(f"Front_RoundHeadlight_{x:+.2f}", (x, 0.82, 2.97), radius=0.116, depth=0.034, mat=mats["light"], parent=parent, rotation=(0, 0, 0))
    for x in [-1.0, 1.0]:
        add_cube(f"Front_AmberMarker_{x:+.1f}", (x, 0.62, 2.98), (0.17, 0.1, 0.026), mats["amber"], parent, bevel=0.005)

    add_cube("Rear_ChromeBumper_Attached", (0, 0.48, -3.0), (2.34, 0.18, 0.19), mats["chrome"], parent, bevel=0.026)
    add_cube("Rear_LowerChromeRollPan", (0, 0.35, -2.85), (1.92, 0.075, 0.08), mats["chrome"], parent, bevel=0.012)
    add_cube("Rear_BlackInsetPanel", (0, 0.7, -2.965), (1.84, 0.24, 0.052), mats["rubber"], parent, bevel=0.008)
    for x in [-0.78, -0.54, 0.54, 0.78]:
        add_cube(f"Rear_FlushTailLamp_{x:+.2f}", (x, 0.7, -3.0), (0.18, 0.105, 0.03), mats["tail"], parent, bevel=0.006)
    add_cube("Rear_LicensePlateInset", (0, 0.51, -3.01), (0.32, 0.12, 0.026), mats["stripe"], parent, bevel=0.006)
    add_cylinder("Rear_ExhaustPipe_Attached", (-0.52, 0.27, -3.0), radius=0.04, depth=0.34, mat=mats["dark_chrome"], parent=parent, vertices=16)


def add_side_trim(parent, mats):
    for side, label in [(-1, "Left"), (1, "Right")]:
        add_cube(f"Fender_FrontShoulder_{label}", (side * 1.14, 0.7, 1.6), (0.2, 0.28, 1.08), mats["paint"], parent, bevel=0.052)
        add_cube(f"Fender_RearShoulder_{label}", (side * 1.14, 0.7, -1.66), (0.2, 0.29, 1.12), mats["paint"], parent, bevel=0.052)
        add_cube(f"QuarterPanel_FrontLower_{label}", (side * 1.18, 0.48, 1.6), (0.08, 0.26, 1.02), mats["paint_dark"], parent, bevel=0.026)
        add_cube(f"QuarterPanel_RearLower_{label}", (side * 1.18, 0.48, -1.66), (0.08, 0.26, 1.04), mats["paint_dark"], parent, bevel=0.026)
        add_arch_strip(f"WheelArch_FrontBodyLip_{label}", side, 1.6, 0.41, 0.51, mats["paint"], parent)
        add_arch_strip(f"WheelArch_RearBodyLip_{label}", side, -1.66, 0.41, 0.52, mats["paint"], parent)
        add_arch_strip(f"WheelArch_FrontShadow_{label}", side, 1.6, 0.37, 0.405, mats["rubber"], parent)
        add_arch_strip(f"WheelArch_RearShadow_{label}", side, -1.66, 0.37, 0.405, mats["rubber"], parent)
        add_cube(f"Trim_ChromeRocker_{label}", (side * 1.235, 0.52, -0.05), (0.03, 0.045, 4.35), mats["chrome"], parent, bevel=0.006)
        add_cube(f"Trim_MidBodyChromeLine_{label}", (side * 1.238, 0.74, -0.08), (0.022, 0.03, 4.62), mats["chrome"], parent, bevel=0.004)
        add_cube(f"Trim_DoorHandle_{label}", (side * 1.242, 0.85, 0.1), (0.03, 0.06, 0.22), mats["chrome"], parent, bevel=0.006)
        add_cube(f"Trim_DoorSeam_{label}", (side * 1.245, 0.69, -0.42), (0.018, 0.45, 0.023), mats["rubber"], parent)
        add_cube(f"Trim_FuelDoor_{label}", (side * 1.242, 0.79, -1.64), (0.022, 0.28, 0.22), mats["dark_chrome"], parent, bevel=0.006)
        add_cube(f"Trim_LowerRearVent_{label}", (side * 1.242, 0.56, -1.14), (0.022, 0.1, 0.42), mats["dark_chrome"], parent, bevel=0.006)


def add_wheels(parent, mats):
    for side, label in [(-1, "Left"), (1, "Right")]:
        add_wheel(f"WheelFront{label}", (side * 1.105, 0.37, 1.6), side, mats, parent)
        add_wheel(f"WheelRear{label}", (side * 1.105, 0.37, -1.66), side, mats, parent)


def add_wheel(name, location, side, mats, parent):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    empty.location = location
    empty.parent = parent

    tire = add_cylinder(
        f"WheelMesh_{name}",
        location,
        radius=0.39,
        depth=0.31,
        mat=mats["sidewall"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=56,
    )
    tire.location = (0, 0, 0)
    tire.rotation_euler = (0, math.radians(90), 0)

    hub_x = 0.18 * side
    cap = add_cylinder(
        f"Hubcap_{name}",
        (hub_x, 0, 0),
        radius=0.275,
        depth=0.04,
        mat=mats["hubcap"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=42,
    )
    cap.rotation_euler = (0, math.radians(90), 0)
    add_cylinder(
        f"Hubcap_DarkInset_{name}",
        (hub_x + 0.024 * side, 0, 0),
        radius=0.17,
        depth=0.022,
        mat=mats["dark_chrome"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=40,
    )
    add_cylinder(
        f"Hubcap_CenterButton_{name}",
        (hub_x + 0.048 * side, 0, 0),
        radius=0.055,
        depth=0.018,
        mat=mats["hubcap"],
        parent=empty,
        rotation=(0, math.radians(90), 0),
        vertices=24,
    )


def add_arch_strip(name, side, z_center, inner_radius, outer_radius, mat, parent):
    x = side * 1.252
    y_center = 0.38
    verts = []
    steps = 18
    for index in range(steps + 1):
        theta = math.pi * index / steps
        for radius in (inner_radius, outer_radius):
            verts.append((
                x,
                y_center + math.sin(theta) * radius,
                z_center + math.cos(theta) * radius,
            ))
    faces = []
    for index in range(steps):
        a = index * 2
        if side < 0:
            faces.append((a, a + 1, a + 3, a + 2))
        else:
            faces.append((a + 2, a + 3, a + 1, a))
    obj = create_mesh(name, verts, faces, mat, parent)
    return obj


def add_shadow_helpers(parent, mats):
    add_cube("Undercarriage_DarkRecess", (0, 0.32, -0.04), (1.78, 0.07, 4.42), mats["rubber"], parent, bevel=0.012)


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
