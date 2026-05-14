import argparse
import math
from pathlib import Path

import bpy


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    reset_scene()
    mats = create_materials()

    create_road_segment(mats)
    create_road_node(mats)
    create_oak_tree(mats)
    create_pine_tree(mats)
    create_palm_tree(mats)
    create_grass_tuft(mats)
    create_shore_rock(mats)
    create_potato_farm(mats)
    create_minecraft_potato(mats)

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
        "asphalt": material("asphalt_fine_grain", (0.018, 0.024, 0.025, 1), roughness=0.96),
        "road_edge": material("road_soft_shoulder", (0.075, 0.09, 0.083, 1), roughness=0.9),
        "road_line": material("faded_cool_lane_marking", (0.52, 0.74, 0.72, 1), roughness=0.72),
        "bark": material("warm_bark_ridges", (0.27, 0.14, 0.075, 1), roughness=0.92),
        "leaf_dark": material("leaf_canopy_deep_green", (0.055, 0.31, 0.12, 1), roughness=0.86),
        "leaf_mid": material("leaf_canopy_mid_green", (0.12, 0.48, 0.18, 1), roughness=0.84),
        "leaf_light": material("leaf_canopy_light_green", (0.35, 0.68, 0.32, 1), roughness=0.84),
        "palm": material("palm_leaf_warm_green", (0.15, 0.48, 0.18, 1), roughness=0.86),
        "sand": material("shoreline_sand", (0.63, 0.49, 0.29, 1), roughness=0.94),
        "rock": material("coastal_weathered_rock", (0.32, 0.38, 0.4, 1), roughness=0.88),
        "grass_top": material("minecraft_grass_top", (0.2, 0.57, 0.2, 1), roughness=0.9),
        "dirt": material("minecraft_farmland_dirt", (0.35, 0.2, 0.105, 1), roughness=0.96),
        "dirt_dark": material("minecraft_wet_farmland", (0.18, 0.1, 0.055, 1), roughness=0.98),
        "water": material("minecraft_farm_water", (0.07, 0.43, 0.88, 0.74), roughness=0.32, alpha=0.74),
        "crop": material("minecraft_potato_crop", (0.21, 0.62, 0.17, 1), roughness=0.9),
        "wood": material("minecraft_oak_fence", (0.52, 0.32, 0.16, 1), roughness=0.84),
        "wood_dark": material("minecraft_oak_dark_lines", (0.25, 0.14, 0.07, 1), roughness=0.88),
        "potato": material("minecraft_potato_body", (0.72, 0.46, 0.18, 1), roughness=0.94),
        "potato_eye": material("minecraft_potato_eye", (0.34, 0.2, 0.08, 1), roughness=0.96),
    }


def material(name, color, metallic=0.0, roughness=0.5, alpha=1.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    mat.blend_method = "BLEND" if alpha < 1 else "OPAQUE"
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Alpha"].default_value = alpha
    return mat


def root(name):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    return empty


def cube(name, parent, loc, scale, mat, rotation=(0, 0, 0), bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    obj.parent = parent
    if bevel:
        add_bevel(obj, bevel, 2)
    shade(obj)
    return obj


def cyl(name, parent, loc, radius, depth, mat, vertices=18, rotation=(0, 0, 0), bevel=False):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = parent
    if bevel:
      add_bevel(obj, radius * 0.04, 2)
    shade(obj)
    return obj


def cone(name, parent, loc, radius1, radius2, depth, mat, vertices=18, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius1, radius2=radius2, depth=depth, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = parent
    add_bevel(obj, 0.025, 2)
    shade(obj)
    return obj


def ico(name, parent, loc, radius, mat, scale=(1, 1, 1), rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=radius, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    obj.parent = parent
    shade(obj)
    return obj


def create_road_segment(mats):
    group = root("EnvRoadSegment")
    cube("RoadSegment_Shoulder", group, (0, -0.03, 0), (1.16, 0.065, 1.16), mats["road_edge"], bevel=0.012)
    cube("RoadSegment_Asphalt", group, (0, 0.02, 0), (1.0, 0.08, 1.0), mats["asphalt"], bevel=0.01)


def create_road_node(mats):
    group = root("EnvRoadNode")
    cyl("RoadNode_Shoulder", group, (0, -0.03, 0), 0.58, 0.065, mats["road_edge"], vertices=40)
    cyl("RoadNode_Asphalt", group, (0, 0.02, 0), 0.5, 0.08, mats["asphalt"], vertices=44)


def create_oak_tree(mats):
    group = root("EnvTreeOak")
    cyl("Oak_Trunk", group, (0, 1.25, 0), 0.32, 2.5, mats["bark"], vertices=12, bevel=True)
    for angle in [0.0, 2.1, 4.0]:
        cube(
            "Oak_LowerBranch",
            group,
            (math.sin(angle) * 0.38, 2.35, math.cos(angle) * 0.38),
            (0.16, 0.14, 1.25),
            mats["bark"],
            rotation=(0.38, angle, 0.1),
            bevel=0.02,
        )
    leaf_data = [
        (0, 3.15, 0, 1.28, mats["leaf_mid"], (1.25, 0.86, 1.12)),
        (-0.8, 3.25, 0.15, 1.05, mats["leaf_dark"], (1.12, 0.78, 1.0)),
        (0.78, 3.34, -0.08, 1.08, mats["leaf_light"], (1.08, 0.8, 1.03)),
        (0.08, 4.02, -0.16, 1.05, mats["leaf_mid"], (1.1, 0.78, 0.96)),
        (-0.22, 3.62, 0.78, 0.92, mats["leaf_dark"], (1.0, 0.72, 0.95)),
    ]
    for index, (x, y, z, radius, mat, scale) in enumerate(leaf_data):
        ico(f"Oak_Canopy_{index}", group, (x, y, z), radius, mat, scale=scale, rotation=(0.1 * index, 0.6 * index, 0))


def create_pine_tree(mats):
    group = root("EnvTreePine")
    cyl("Pine_Trunk", group, (0, 1.35, 0), 0.24, 2.7, mats["bark"], vertices=10, bevel=True)
    for index, y in enumerate([2.0, 2.78, 3.48, 4.05]):
        cone(f"Pine_Tier_{index}", group, (0, y, 0), 1.35 - index * 0.22, 0.22, 1.25, mats["leaf_dark" if index % 2 else "leaf_mid"], vertices=9)


def create_palm_tree(mats):
    group = root("EnvTreePalm")
    trunk = cyl("Palm_CurvedTrunk", group, (0, 1.85, 0), 0.22, 3.7, mats["bark"], vertices=10, rotation=(0.0, 0.0, 0.12), bevel=True)
    trunk.scale.x = 0.82
    for index in range(7):
        angle = index * math.tau / 7
        leaf = cube(
            f"Palm_Frond_{index}",
            group,
            (math.sin(angle) * 0.88, 3.88, math.cos(angle) * 0.88),
            (0.22, 0.075, 2.4),
            mats["palm"],
            rotation=(0.32, angle, 0.0),
            bevel=0.025,
        )
        leaf.scale.x = 0.75


def create_grass_tuft(mats):
    group = root("EnvGrassTuft")
    for index, angle in enumerate([0, 0.55, -0.55, 1.1, -1.1]):
        cube(
            f"GrassBlade_{index}",
            group,
            (math.sin(angle) * 0.08, 0.33, math.cos(angle) * 0.08),
            (0.055, 0.72 - abs(angle) * 0.1, 0.12),
            mats["leaf_light" if index % 2 else "leaf_mid"],
            rotation=(0.0, angle, angle * 0.18),
            bevel=0.008,
        )


def create_shore_rock(mats):
    group = root("EnvShoreRock")
    for index, (x, z, radius) in enumerate([(-0.2, 0.0, 0.58), (0.45, 0.1, 0.42), (0.12, -0.38, 0.36)]):
        ico(f"ShoreRock_Lobe_{index}", group, (x, 0.28 + index * 0.04, z), radius, mats["rock"], scale=(1.25, 0.62, 0.92), rotation=(0.2, index, 0.1))


def create_potato_farm(mats):
    group = root("EnvPotatoFarm")
    for x in range(-6, 7):
        for z in range(-5, 6):
            edge = abs(x) == 6 or abs(z) == 5
            channel = z in [-1, 1]
            mat = mats["grass_top"] if edge else mats["water"] if channel else mats["dirt_dark"] if (x + z) % 3 == 0 else mats["dirt"]
            y = 0.18 if channel else 0.25
            cube(f"Farm_Block_{x}_{z}", group, (x, y, z), (0.96, 0.5, 0.96), mat, bevel=0.015)
            if not edge and not channel and (x + z) % 2 == 0:
                cube(f"Farm_CropStem_{x}_{z}", group, (x - 0.16, 0.7, z - 0.12), (0.16, 0.42, 0.16), mats["crop"], bevel=0.005)
                cube(f"Farm_CropLeaf_{x}_{z}", group, (x + 0.08, 0.96, z + 0.08), (0.62, 0.22, 0.62), mats["crop"], bevel=0.01)

    for z in [-5.65, 5.65]:
        cube("Farm_FenceRail_Long_Low", group, (0, 1.05, z), (13.4, 0.18, 0.18), mats["wood"], bevel=0.015)
        cube("Farm_FenceRail_Long_High", group, (0, 1.58, z), (13.4, 0.18, 0.18), mats["wood"], bevel=0.015)
    for x in [-6.65, 6.65]:
        cube("Farm_FenceRail_Side_Low", group, (x, 1.05, 0), (0.18, 0.18, 11.4), mats["wood"], bevel=0.015)
        cube("Farm_FenceRail_Side_High", group, (x, 1.58, 0), (0.18, 0.18, 11.4), mats["wood"], bevel=0.015)
    for x in [-6.65, -3.4, 0, 3.4, 6.65]:
        for z in [-5.65, 5.65]:
            cube("Farm_FencePost", group, (x, 0.94, z), (0.36, 1.88, 0.36), mats["wood"], bevel=0.02)
    for z in [-2.8, 0, 2.8]:
        for x in [-6.65, 6.65]:
            cube("Farm_FencePostSide", group, (x, 0.94, z), (0.32, 1.72, 0.32), mats["wood"], bevel=0.02)

    cube("Farm_CounterBoardBack", group, (0, 2.48, 7.08), (5.2, 2.55, 0.28), mats["wood_dark"], bevel=0.035)
    cube("Farm_CounterBoardTop", group, (0, 3.87, 7.08), (5.6, 0.25, 0.34), mats["wood"], bevel=0.018)
    for x in [-2.25, 2.25]:
        cube("Farm_CounterBoardPost", group, (x, 1.35, 7.1), (0.32, 2.7, 0.32), mats["wood"], bevel=0.02)
    cube("Farm_GateLeft", group, (-0.7, 1.04, 5.75), (1.22, 1.18, 0.18), mats["wood"], bevel=0.018)
    cube("Farm_GateRight", group, (0.7, 1.04, 5.75), (1.22, 1.18, 0.18), mats["wood"], bevel=0.018)


def create_minecraft_potato(mats):
    group = root("EnvMinecraftPotato")
    cube("Potato_MainBlock", group, (0, 0.06, 0), (0.72, 0.48, 0.9), mats["potato"], rotation=(0.08, 0.18, -0.06), bevel=0.035)
    for index, (x, y, z) in enumerate([(-0.22, 0.2, 0.28), (0.18, 0.24, -0.18), (0.25, -0.02, 0.15), (-0.12, 0.06, -0.34)]):
        cube(f"Potato_Eye_{index}", group, (x, y, z), (0.11, 0.08, 0.11), mats["potato_eye"], bevel=0.01)
    cube("Potato_SproutStem", group, (0.12, 0.42, -0.08), (0.12, 0.42, 0.12), mats["crop"], bevel=0.006)
    cube("Potato_SproutLeaf", group, (0.26, 0.62, -0.08), (0.34, 0.13, 0.18), mats["crop"], rotation=(0, 0, 0.25), bevel=0.006)


def add_bevel(obj, width, segments):
    bevel = obj.modifiers.new(f"{obj.name}_soft_bevel", "BEVEL")
    bevel.width = width
    bevel.segments = segments
    normal = obj.modifiers.new(f"{obj.name}_weighted_normals", "WEIGHTED_NORMAL")
    normal.keep_sharp = True


def shade(obj):
    if not hasattr(obj.data, "polygons"):
        return
    for poly in obj.data.polygons:
        poly.use_smooth = True


if __name__ == "__main__":
    main()
