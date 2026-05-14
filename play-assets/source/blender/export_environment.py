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
    create_sakura_tree("EnvTreeSakuraLarge", mats, scale=1.08, bend=0.12)
    create_sakura_tree("EnvTreeSakuraMedium", mats, scale=0.9, bend=-0.08)
    create_sakura_tree("EnvTreeSakuraSmall", mats, scale=0.72, bend=0.04)
    create_city_tree("EnvCityTreeNeem", mats, scale=1.0, crown="round")
    create_city_tree("EnvCityTreeKikar", mats, scale=0.92, crown="wide")
    create_street_light(mats)
    create_bench(mats)
    create_market_stall(mats)
    create_campus_block(mats)
    create_office_block(mats)
    create_security_gate(mats)
    create_archive_kiosk(mats)
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
        "leaf_dark": material("sakura_leaf_shadow_pink", (0.76, 0.34, 0.48, 1), roughness=0.88),
        "leaf_mid": material("sakura_leaf_soft_pink", (0.96, 0.55, 0.68, 1), roughness=0.86),
        "leaf_light": material("sakura_leaf_pale_blossom", (1.0, 0.78, 0.84, 1), roughness=0.84),
        "leaf_white": material("sakura_leaf_near_white", (1.0, 0.9, 0.92, 1), roughness=0.84),
        "grass_blade_mid": material("grass_blade_mid_green", (0.22, 0.6, 0.28, 1), roughness=0.88),
        "grass_blade_light": material("grass_blade_light_green", (0.46, 0.82, 0.42, 1), roughness=0.86),
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
        "concrete": material("city_warm_concrete", (0.58, 0.61, 0.56, 1), roughness=0.82),
        "lamp": material("warm_lamp_glow", (1.0, 0.82, 0.44, 1), metallic=0.15, roughness=0.34),
        "canvas": material("bazaar_canvas_awning", (0.84, 0.62, 0.24, 1), roughness=0.76),
        "campus_brick": material("campus_warm_brick", (0.58, 0.34, 0.24, 1), roughness=0.82),
        "campus_trim": material("campus_limestone_trim", (0.76, 0.7, 0.58, 1), roughness=0.74),
        "office_glass": material("office_blue_green_glass", (0.09, 0.2, 0.28, 0.82), metallic=0.08, roughness=0.22, alpha=0.82),
        "office_frame": material("office_dark_frame", (0.08, 0.11, 0.13, 1), metallic=0.35, roughness=0.42),
        "security_panel": material("security_dark_panel", (0.05, 0.12, 0.16, 1), metallic=0.12, roughness=0.55),
        "archive_gold": material("archive_soft_gold", (0.9, 0.68, 0.3, 1), metallic=0.35, roughness=0.42),
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


def create_sakura_tree(name, mats, scale=1.0, bend=0.0):
    group = root(name)
    trunk_segments = [
        (0, 0.78, 0, 0.48, 1.56, 0.42, bend * 0.35),
        (bend * 0.45, 1.88, 0.02, 0.38, 1.45, 0.34, bend * 0.75),
        (bend * 0.9, 2.86, -0.05, 0.28, 1.08, 0.26, bend),
    ]
    for index, (x, y, z, sx, sy, sz, rot) in enumerate(trunk_segments):
        cube(
            f"Sakura_Trunk_{index}",
            group,
            (x * scale, y * scale, z * scale),
            (sx * scale, sy * scale, sz * scale),
            mats["bark"],
            rotation=(0.04 * index, 0.18 * index, rot),
            bevel=0.035 * scale,
        )

    branch_data = [
        (-0.82, 2.62, 0.18, 1.46, 0.18, 0.18, -0.56, -0.24),
        (0.76, 2.78, -0.18, 1.32, 0.16, 0.16, 0.48, 0.18),
        (-0.42, 3.22, -0.58, 1.05, 0.14, 0.14, -0.22, 0.56),
        (0.5, 3.36, 0.5, 1.08, 0.14, 0.14, 0.26, -0.52),
    ]
    for index, (x, y, z, sx, sy, sz, rz, ry) in enumerate(branch_data):
        cube(
            f"Sakura_Branch_{index}",
            group,
            (x * scale, y * scale, z * scale),
            (sx * scale, sy * scale, sz * scale),
            mats["bark"],
            rotation=(0.06, ry, rz),
            bevel=0.025 * scale,
        )

    blossom_data = [
        (0.0, 3.65, 0.0, 1.42, mats["leaf_mid"], (1.28, 0.82, 1.08)),
        (-0.95, 3.46, 0.18, 1.1, mats["leaf_light"], (1.2, 0.78, 1.0)),
        (0.92, 3.58, -0.12, 1.12, mats["leaf_dark"], (1.18, 0.78, 0.98)),
        (-0.28, 4.18, -0.45, 1.02, mats["leaf_light"], (1.1, 0.76, 0.92)),
        (0.34, 4.06, 0.58, 0.96, mats["leaf_white"], (1.04, 0.72, 0.88)),
        (-0.62, 3.9, 0.74, 0.84, mats["leaf_mid"], (0.98, 0.7, 0.9)),
        (0.72, 3.92, 0.58, 0.82, mats["leaf_light"], (0.95, 0.68, 0.88)),
    ]
    for index, (x, y, z, radius, mat, blob_scale) in enumerate(blossom_data):
        ico(
            f"Sakura_BlossomCluster_{index}",
            group,
            ((x + bend * 0.6) * scale, y * scale, z * scale),
            radius * scale,
            mat,
            scale=blob_scale,
            rotation=(0.1 * index, 0.46 * index, 0.08 * index),
        )


def create_city_tree(name, mats, scale=1.0, crown="round"):
    group = root(name)
    cube("CityTree_Trunk", group, (0, 1.25 * scale, 0), (0.42 * scale, 2.5 * scale, 0.38 * scale), mats["bark"], bevel=0.03 * scale)
    branch_specs = [
        (-0.46, 2.35, 0.1, 0.9, 0.14, 0.14, -0.42),
        (0.48, 2.55, -0.12, 0.9, 0.14, 0.14, 0.42),
        (0.05, 2.8, 0.42, 0.82, 0.12, 0.12, 0.08),
    ]
    for index, (x, y, z, sx, sy, sz, rz) in enumerate(branch_specs):
        cube(f"CityTree_Branch_{index}", group, (x * scale, y * scale, z * scale), (sx * scale, sy * scale, sz * scale), mats["bark"], rotation=(0.08, index * 0.7, rz), bevel=0.018 * scale)
    if crown == "wide":
        canopy_specs = [
            (0, 3.25, 0, 1.18, (1.45, 0.72, 1.05), mats["leaf_mid"]),
            (-0.82, 3.14, 0.16, 0.88, (1.15, 0.62, 0.9), mats["leaf_dark"]),
            (0.82, 3.2, -0.12, 0.92, (1.2, 0.62, 0.92), mats["leaf_light"]),
            (0.05, 3.72, 0.22, 0.78, (1.08, 0.6, 0.8), mats["leaf_mid"]),
        ]
    else:
        canopy_specs = [
            (0, 3.25, 0, 1.12, (1.05, 0.9, 1.05), mats["leaf_mid"]),
            (-0.55, 3.5, 0.18, 0.78, (0.9, 0.72, 0.82), mats["leaf_dark"]),
            (0.58, 3.46, -0.2, 0.82, (0.9, 0.72, 0.82), mats["leaf_light"]),
            (0.04, 3.9, 0.12, 0.72, (0.82, 0.68, 0.78), mats["leaf_mid"]),
        ]
    for index, (x, y, z, radius, blob_scale, mat) in enumerate(canopy_specs):
        ico(f"CityTree_Canopy_{index}", group, (x * scale, y * scale, z * scale), radius * scale, mat, scale=blob_scale, rotation=(index * 0.2, index * 0.5, 0.1))


def create_street_light(mats):
    group = root("EnvStreetLight")
    cyl("StreetLight_Pole", group, (0, 2.15, 0), 0.075, 4.3, mats["concrete"], vertices=10, bevel=True)
    cube("StreetLight_Arm", group, (0.58, 4.08, 0), (1.25, 0.1, 0.1), mats["concrete"], bevel=0.015)
    cube("StreetLight_LampHousing", group, (1.24, 3.95, 0), (0.42, 0.2, 0.34), mats["office_frame"], bevel=0.025)
    ico("StreetLight_Glow", group, (1.24, 3.78, 0), 0.18, mats["lamp"], scale=(1.1, 0.58, 1.0))


def create_bench(mats):
    group = root("EnvBench")
    cube("Bench_Seat", group, (0, 0.58, 0), (2.6, 0.22, 0.72), mats["wood"], bevel=0.025)
    cube("Bench_Back", group, (0, 1.0, 0.34), (2.6, 0.82, 0.18), mats["wood_dark"], bevel=0.018)
    for x in [-1.0, 1.0]:
        cube("Bench_Leg", group, (x, 0.28, -0.18), (0.16, 0.56, 0.16), mats["office_frame"], bevel=0.01)
        cube("Bench_LegBack", group, (x, 0.34, 0.3), (0.16, 0.68, 0.16), mats["office_frame"], bevel=0.01)


def create_market_stall(mats):
    group = root("EnvMarketStall")
    cube("Market_Counter", group, (0, 0.74, 0), (3.8, 1.48, 2.5), mats["wood"], bevel=0.035)
    cube("Market_FrontPlank", group, (0, 1.26, -1.31), (4.0, 0.34, 0.16), mats["wood_dark"], bevel=0.018)
    cube("Market_Awning", group, (0, 2.08, -0.1), (4.6, 0.24, 3.3), mats["canvas"], bevel=0.035)
    for x in [-1.65, 1.65]:
        cube("Market_Post", group, (x, 1.42, -1.12), (0.16, 2.2, 0.16), mats["wood_dark"], bevel=0.012)
        cube("Market_BackPost", group, (x, 1.42, 1.0), (0.16, 2.2, 0.16), mats["wood_dark"], bevel=0.012)
    for x in [-1.0, 0.0, 1.0]:
        cube("Market_Crate", group, (x, 1.62, -1.02), (0.7, 0.28, 0.54), mats["potato"], bevel=0.018)


def create_campus_block(mats):
    group = root("EnvCampusBlock")
    cube("Campus_Base", group, (0, 0.35, 0), (11.5, 0.7, 13.0), mats["campus_trim"], bevel=0.035)
    cube("Campus_Main", group, (0, 3.4, 0), (9.8, 6.4, 10.8), mats["campus_brick"], bevel=0.045)
    cube("Campus_RoofTrim", group, (0, 6.82, 0), (10.6, 0.42, 11.6), mats["campus_trim"], bevel=0.025)
    for x in [-3.4, -1.7, 0, 1.7, 3.4]:
        cube("Campus_Column", group, (x, 2.8, -5.55), (0.34, 4.5, 0.34), mats["campus_trim"], bevel=0.018)
        cube("Campus_Window", group, (x, 4.1, -5.62), (0.76, 1.1, 0.08), mats["office_glass"], bevel=0.01)
    cube("Campus_Door", group, (0, 1.38, -5.64), (1.35, 2.1, 0.1), mats["office_frame"], bevel=0.012)


def create_office_block(mats):
    group = root("EnvOfficeBlock")
    cube("Office_Podium", group, (0, 0.55, 0), (11.5, 1.1, 9.4), mats["concrete"], bevel=0.035)
    cube("Office_Tower", group, (0, 7.4, 0), (8.5, 13.4, 7.2), mats["office_glass"], bevel=0.04)
    for x in [-3.2, -1.6, 0, 1.6, 3.2]:
        cube("Office_Mullion_Front", group, (x, 7.4, -3.68), (0.08, 12.8, 0.1), mats["office_frame"], bevel=0.006)
        cube("Office_Mullion_Back", group, (x, 7.4, 3.68), (0.08, 12.8, 0.1), mats["office_frame"], bevel=0.006)
    for y in [3.5, 6.2, 8.9, 11.6]:
        cube("Office_HorizontalBand", group, (0, y, -3.72), (8.8, 0.12, 0.12), mats["office_frame"], bevel=0.004)
    cube("Office_RoofSign", group, (0, 14.35, -3.9), (6.2, 0.65, 0.16), mats["lamp"], bevel=0.012)


def create_security_gate(mats):
    group = root("EnvSecurityGate")
    cube("Security_Base", group, (0, 0.35, 0), (10.4, 0.7, 7.2), mats["concrete"], bevel=0.035)
    cube("Security_Left", group, (-3.25, 2.65, 0), (2.1, 4.6, 5.6), mats["security_panel"], bevel=0.035)
    cube("Security_Right", group, (3.25, 2.65, 0), (2.1, 4.6, 5.6), mats["security_panel"], bevel=0.035)
    cube("Security_Bridge", group, (0, 5.0, 0), (8.2, 1.0, 5.0), mats["office_glass"], bevel=0.03)
    for x in [-4.5, 4.5]:
        cyl("Security_Antenna", group, (x, 6.9, 0), 0.06, 2.2, mats["lamp"], vertices=8)
    cube("Security_GlowLine", group, (0, 4.25, -2.9), (8.6, 0.12, 0.12), mats["lamp"], bevel=0.006)


def create_archive_kiosk(mats):
    group = root("EnvArchiveKiosk")
    cyl("Archive_Base", group, (0, 0.35, 0), 3.2, 0.7, mats["concrete"], vertices=20, bevel=True)
    cube("Archive_Core", group, (0, 2.2, 0), (4.8, 3.4, 4.8), mats["campus_trim"], bevel=0.04)
    cone("Archive_Roof", group, (0, 4.25, 0), 3.2, 0.8, 1.4, mats["archive_gold"], vertices=6)
    for angle in [0, math.pi / 2, math.pi, math.pi * 1.5]:
        cube("Archive_Window", group, (math.sin(angle) * 2.45, 2.35, math.cos(angle) * 2.45), (0.86, 1.0, 0.1), mats["office_glass"], rotation=(0, angle, 0), bevel=0.01)


def create_grass_tuft(mats):
    group = root("EnvGrassTuft")
    for index, angle in enumerate([0, 0.55, -0.55, 1.1, -1.1]):
        cube(
            f"GrassBlade_{index}",
            group,
            (math.sin(angle) * 0.08, 0.33, math.cos(angle) * 0.08),
            (0.055, 0.72 - abs(angle) * 0.1, 0.12),
            mats["grass_blade_light" if index % 2 else "grass_blade_mid"],
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

    cube("Farm_CounterBoardBack", group, (0, 2.48, -7.08), (5.2, 2.55, 0.28), mats["wood_dark"], bevel=0.035)
    cube("Farm_CounterBoardTop", group, (0, 3.87, -7.08), (5.6, 0.25, 0.34), mats["wood"], bevel=0.018)
    for x in [-2.25, 2.25]:
        cube("Farm_CounterBoardPost", group, (x, 1.35, -7.1), (0.32, 2.7, 0.32), mats["wood"], bevel=0.02)
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
