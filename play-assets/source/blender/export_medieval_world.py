import argparse
import math
from pathlib import Path

import bpy


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", required=True, choices=["visual", "physics", "props"])
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    reset_scene()
    mats = materials()
    if args.kind == "visual":
      create_visual_world(mats)
    elif args.kind == "physics":
      create_physics_world(mats)
    else:
      create_props(mats)

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(output), export_format="GLB", export_apply=True, export_yup=False)


def get_script_args():
    import sys
    return sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []


def reset_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    bpy.context.scene.render.engine = "CYCLES"
    bpy.context.scene.view_settings.view_transform = "Filmic"
    bpy.context.scene.view_settings.look = "Medium High Contrast"


def materials():
    return {
        "grass": mat("medieval_grass", (0.22, 0.48, 0.20, 1), 0.94),
        "grass_light": mat("medieval_meadow_highlight", (0.42, 0.62, 0.25, 1), 0.9),
        "sand": mat("warm_beach_sand", (0.72, 0.55, 0.31, 1), 0.95),
        "cliff": mat("weathered_cliff_stone", (0.38, 0.34, 0.29, 1), 0.92),
        "stone": mat("hand_cut_stone", (0.54, 0.50, 0.43, 1), 0.86),
        "stone_light": mat("old_limestone", (0.76, 0.70, 0.58, 1), 0.82),
        "wood": mat("dark_oak", (0.38, 0.22, 0.12, 1), 0.84),
        "wood_light": mat("sunlit_oak", (0.62, 0.38, 0.19, 1), 0.82),
        "roof": mat("slate_roof", (0.14, 0.20, 0.25, 1), 0.78),
        "leaf": mat("oak_leaf", (0.18, 0.45, 0.20, 1), 0.88),
        "cypress": mat("cypress_leaf", (0.08, 0.34, 0.22, 1), 0.88),
        "blossom": mat("soft_blossom", (0.98, 0.61, 0.68, 1), 0.86),
        "glow": mat("warm_lantern_glow", (1.0, 0.72, 0.34, 1), 0.28, emission=(1.0, 0.48, 0.12, 1)),
        "water": mat("farm_water", (0.1, 0.42, 0.78, 0.72), 0.36, alpha=0.72),
        "crop": mat("potato_crop", (0.32, 0.66, 0.28, 1), 0.9),
        "potato": mat("voxel_potato", (0.72, 0.46, 0.18, 1), 0.94),
        "tkxel_glass": mat("tkxel_one_world_blue_green_glass", (0.04, 0.34, 0.44, 0.78), 0.18, metallic=0.05, alpha=0.78, emission=(0.01, 0.09, 0.12, 1)),
        "tkxel_dark_glass": mat("tkxel_one_world_dark_curtain_wall", (0.015, 0.045, 0.06, 0.92), 0.2, metallic=0.08, alpha=0.92),
        "tkxel_frame": mat("tkxel_one_world_black_aluminium_frame", (0.025, 0.035, 0.04, 1), 0.42, metallic=0.35),
        "tkxel_concrete": mat("tkxel_one_world_warm_concrete", (0.72, 0.69, 0.62, 1), 0.82),
        "tkxel_white": mat("tkxel_one_world_white_signage", (0.92, 0.96, 0.92, 1), 0.5, emission=(0.28, 0.38, 0.26, 1)),
        "tkxel_green": mat("tkxel_brand_green_signage", (0.12, 0.72, 0.42, 1), 0.42, emission=(0.0, 0.36, 0.12, 1)),
    }


def mat(name, color, roughness=0.5, metallic=0.0, alpha=1.0, emission=None):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    material.blend_method = "BLEND" if alpha < 1 else "OPAQUE"
    bsdf = material.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Alpha"].default_value = alpha
    if emission:
        bsdf.inputs["Emission Color"].default_value = emission
        bsdf.inputs["Emission Strength"].default_value = 0.7
    return material


def root(name):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    return obj


def cube(name, parent, loc, scale, material, rot=(0, 0, 0), bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    obj.parent = parent
    if bevel:
        modifier = obj.modifiers.new("soft_edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 2
        obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def text_mesh(name, parent, text, loc, size, material, rot=(math.pi / 2, 0, 0), align="CENTER"):
    bpy.ops.object.text_add(location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = align
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.extrude = 0.012
    obj.data.materials.append(material)
    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.object
    obj.parent = parent
    obj.modifiers.new("text_weighted_normals", "WEIGHTED_NORMAL")
    return obj


def cyl(name, parent, loc, radius, depth, material, vertices=18, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc, rotation=axis_to_game_y(rot))
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    obj.parent = parent
    obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def cone(name, parent, loc, r1, r2, depth, material, vertices=18, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=r1, radius2=r2, depth=depth, location=loc, rotation=axis_to_game_y(rot))
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    obj.parent = parent
    obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def axis_to_game_y(rot):
    return (rot[0] - math.pi / 2, rot[1], rot[2])


def ico(name, parent, loc, radius, material, scale=(1, 1, 1), rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=radius, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    obj.parent = parent
    return obj


def create_visual_world(mats):
    group = root("VIS_MedievalIsland")
    create_island_mesh("VIS_IslandTerrain", group, mats)
    create_ring("VIS_BeachRing", group, 146, 162, mats["sand"], y=0.035)
    create_ring("VIS_CliffRing", group, 156, 169, mats["cliff"], y=-0.08)
    for name, x, z, color in [
        ("SPAWN_landing", 2, 5.5, mats["stone_light"]),
        ("ZONE_watchtower_marker", 18, 106, mats["stone"]),
        ("ZONE_harbor_marker", 132, 54, mats["wood"]),
        ("WATER_shore_marker", 0, 162, mats["water"]),
    ]:
        marker = cube(name, group, (x, 0.1, z), (1.2, 0.2, 1.2), color)
        marker.hide_render = True


def create_physics_world(mats):
    group = root("PHY_MedievalIsland")
    floor = cube("PHY_IslandFloor", group, (0, -0.45, 0), (330, 0.9, 330), mats["grass"])
    floor.hide_render = True
    for index in range(16):
        angle = index / 16 * math.tau
        x = math.cos(angle) * 166
        z = math.sin(angle) * 166
        wall = cube(f"PHY_CliffGuard_{index:02}", group, (x, 1.2, z), (18, 4.0, 3.0), mats["cliff"], rot=(0, -angle, 0))
        wall.hide_render = True


def create_props(mats):
    create_oak_tree(mats)
    create_cypress_tree(mats)
    create_blossom_tree(mats)
    create_grass_tuft(mats)
    create_lantern(mats)
    create_rock(mats)
    create_barrel(mats)
    create_crate(mats)
    create_bench(mats)
    create_fence_post(mats)
    create_ruin_fragment(mats)
    create_potato_crop(mats)
    create_potato(mats)
    create_potato_farm(mats)
    create_tkxel_one_world_tower(mats)


def create_island_mesh(name, parent, mats, radius=158, rings=56, segments=220):
    verts = [(0, 0.04, 0)]
    faces = []
    for ring in range(1, rings + 1):
        ratio = ring / rings
        for i in range(segments):
            a = i / segments * math.tau
            wobble = math.sin(a * 3.0 + ring * 0.18) * 2.2 + math.sin(a * 7.0) * 0.9
            r = radius * ratio + wobble * ratio
            y = 0.025 + math.sin(a * 2.0 + ratio * 1.4) * 0.035 * ratio + math.cos(a * 5.0) * 0.025 * ratio
            verts.append((math.cos(a) * r, y, math.sin(a) * r))
    for i in range(segments):
        faces.append((0, 1 + i, 1 + ((i + 1) % segments)))
    for ring in range(1, rings):
        start = 1 + (ring - 1) * segments
        next_start = 1 + ring * segments
        for i in range(segments):
            faces.append((start + i, start + (i + 1) % segments, next_start + (i + 1) % segments, next_start + i))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    assign_planar_uv(mesh, radius)
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mats["grass"])
    obj.parent = parent
    obj.modifiers.new("terrain_normals", "WEIGHTED_NORMAL")
    return obj


def create_ring(name, parent, inner, outer, material, y=0.0, segments=160):
    verts = []
    faces = []
    for i in range(segments):
        a = i / segments * math.tau
        wobble = math.sin(a * 3.0) * 2.0 + math.cos(a * 9.0) * 0.8
        verts.append((math.cos(a) * (outer + wobble), y, math.sin(a) * (outer + wobble)))
        verts.append((math.cos(a) * (inner + wobble * 0.4), y + 0.01, math.sin(a) * (inner + wobble * 0.4)))
    for i in range(segments):
        faces.append((i * 2, ((i + 1) % segments) * 2, ((i + 1) % segments) * 2 + 1, i * 2 + 1))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    assign_planar_uv(mesh, outer)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    obj.parent = parent
    return obj


def assign_planar_uv(mesh, scale):
    uv_layer = mesh.uv_layers.new(name="UVMap")
    span = max(scale * 2, 1)
    for polygon in mesh.polygons:
        for loop_index in polygon.loop_indices:
            vertex = mesh.vertices[mesh.loops[loop_index].vertex_index].co
            uv_layer.data[loop_index].uv = ((vertex.x + scale) / span, (vertex.z + scale) / span)


def create_oak_tree(mats):
    group = root("EnvOakTree")
    cyl("Oak_Trunk", group, (0, 1.45, 0), 0.32, 2.9, mats["wood"], 9)
    for i, (x, y, z, s) in enumerate([(-0.7, 3.0, 0.2, 1.25), (0.65, 3.12, -0.15, 1.2), (0, 3.6, 0, 1.35), (-0.15, 3.1, -0.75, 1.0)]):
        ico(f"Oak_Crown_{i}", group, (x, y, z), s, mats["leaf"], scale=(1.2, 0.82, 1.0))


def create_cypress_tree(mats):
    group = root("EnvCypressTree")
    cyl("Cypress_Trunk", group, (0, 1.05, 0), 0.18, 2.1, mats["wood"], 8)
    for i in range(4):
        cone(f"Cypress_Tier_{i}", group, (0, 1.45 + i * 0.72, 0), 0.95 - i * 0.12, 0.15, 1.35, mats["cypress"], 12)


def create_blossom_tree(mats):
    group = root("EnvBlossomTree")
    cyl("Blossom_Trunk", group, (0, 1.25, 0), 0.24, 2.5, mats["wood"], 8)
    for i, (x, y, z) in enumerate([(-0.45, 2.7, 0), (0.45, 2.85, 0.25), (0, 3.2, -0.3)]):
        ico(f"Blossom_Crown_{i}", group, (x, y, z), 1.15, mats["blossom"], scale=(1.2, 0.75, 1.0))


def create_grass_tuft(mats):
    group = root("EnvGrassTuft")
    for i in range(7):
        angle = i / 7 * math.tau
        cube(f"GrassBlade_{i}", group, (math.cos(angle) * 0.08, 0.42, math.sin(angle) * 0.08), (0.08, 0.85, 0.05), mats["grass_light"], rot=(0.25, angle, 0.1), bevel=0.01)


def create_lantern(mats):
    group = root("EnvMedievalLantern")
    cyl("Lantern_Post", group, (0, 1.6, 0), 0.09, 3.2, mats["wood"], 8)
    cube("Lantern_Arm", group, (0.36, 3.0, 0), (0.8, 0.08, 0.08), mats["wood"])
    cyl("Lantern_Glow", group, (0.82, 2.72, 0), 0.22, 0.32, mats["glow"], 10)


def create_rock(mats):
    group = root("EnvShoreRock")
    ico("Rock_Body", group, (0, 0.4, 0), 0.9, mats["cliff"], scale=(1.25, 0.58, 0.86), rot=(0.2, 0.4, 0.1))


def create_barrel(mats):
    group = root("EnvBarrel")
    cyl("Barrel_Body", group, (0, 0.55, 0), 0.48, 1.1, mats["wood_light"], 12)
    for y in [0.18, 0.92]:
        cyl("Barrel_Band", group, (0, y, 0), 0.5, 0.08, mats["stone"], 12)


def create_crate(mats):
    group = root("EnvCrate")
    cube("Crate_Box", group, (0, 0.45, 0), (1.0, 0.9, 1.0), mats["wood_light"], bevel=0.025)
    cube("Crate_Brace_A", group, (0, 0.92, 0), (1.08, 0.08, 1.08), mats["wood"])


def create_bench(mats):
    group = root("EnvBench")
    cube("Bench_Seat", group, (0, 0.55, 0), (2.1, 0.2, 0.52), mats["wood_light"], bevel=0.02)
    cube("Bench_Back", group, (0, 1.0, -0.28), (2.1, 0.72, 0.16), mats["wood"], bevel=0.02)


def create_fence_post(mats):
    group = root("EnvFencePost")
    cube("Fence_Post", group, (0, 0.75, 0), (0.24, 1.5, 0.24), mats["wood"], bevel=0.015)
    cube("Fence_Rail", group, (0, 0.88, 0), (1.35, 0.18, 0.18), mats["wood_light"], bevel=0.01)


def create_ruin_fragment(mats):
    group = root("EnvRuinFragment")
    cyl("Ruin_Column", group, (0, 0.95, 0), 0.32, 1.9, mats["stone_light"], 12, rot=(0.08, 0, -0.18))
    cube("Ruin_Base", group, (0, 0.12, 0), (1.25, 0.24, 1.25), mats["stone"], bevel=0.03)


def create_potato_crop(mats):
    group = root("EnvPotatoCrop")
    for i in range(4):
        cube(f"PotatoCrop_Leaf_{i}", group, (math.cos(i) * 0.18, 0.3 + i * 0.04, math.sin(i) * 0.18), (0.35, 0.28, 0.08), mats["crop"], rot=(0.25, i, 0.15), bevel=0.01)


def create_potato(mats):
    group = root("EnvMinecraftPotato")
    cube("Potato_BlockyBody", group, (0, 0.32, 0), (0.9, 0.62, 0.7), mats["potato"], bevel=0.04)
    for x, z in [(-0.22, 0.36), (0.16, 0.37), (0.28, -0.22)]:
        cube("Potato_Eye", group, (x, 0.46, z), (0.09, 0.08, 0.04), mats["wood"])


def create_potato_farm(mats):
    group = root("EnvPotatoFarm")
    cube("Farm_BlockyGrass_Base", group, (0, 0.08, 0), (15.8, 0.18, 12.8), mats["grass"], bevel=0.02)
    for row in range(-3, 4):
        for col in range(-4, 5):
            x = col * 1.36
            z = row * 1.36
            if col == 0:
                cube(f"Farm_Water_{row}_{col}", group, (x, 0.34, z), (1.24, 0.32, 1.24), mats["water"], bevel=0.01)
            else:
                cube(f"Farm_Tilled_Block_{row}_{col}", group, (x, 0.34, z), (1.24, 0.32, 1.24), mats["wood"], bevel=0.01)
                if (row + col) % 2 == 0:
                    crop = bpy.data.objects.get("EnvPotatoCrop")
                    # Build a small crop locally so this GLB remains self-contained.
                    for i in range(3):
                        cube(
                            f"Farm_Crop_{row}_{col}_{i}",
                            group,
                            (x + math.cos(i * 2.1) * 0.16, 0.72 + i * 0.04, z + math.sin(i * 2.1) * 0.16),
                            (0.32, 0.26, 0.08),
                            mats["crop"],
                            rot=(0.25, i * 1.7, 0.12),
                            bevel=0.008,
                        )
    for x in [-7.6, 7.6]:
        cube("Farm_Fence_LongPost", group, (x, 0.8, 0), (0.28, 1.5, 12.9), mats["wood_light"], bevel=0.02)
    for z in [-6.2, 6.2]:
        cube("Farm_Fence_Rail", group, (0, 0.78, z), (15.6, 0.28, 0.28), mats["wood_light"], bevel=0.02)
        for x in [-7.2, -4.8, -2.4, 0, 2.4, 4.8, 7.2]:
            cube("Farm_Fence_Post", group, (x, 0.88, z), (0.28, 1.75, 0.28), mats["wood"], bevel=0.02)
    for z in [-5.0, -2.5, 0, 2.5, 5.0]:
        cube("Farm_Fence_SidePost", group, (-7.6, 0.88, z), (0.28, 1.75, 0.28), mats["wood"], bevel=0.02)
        cube("Farm_Fence_SidePost", group, (7.6, 0.88, z), (0.28, 1.75, 0.28), mats["wood"], bevel=0.02)


def create_tkxel_one_world_tower(mats):
    group = root("EnvLandmark_office")

    # Tkxel's One World reference reads as a tall blue-green glass tower with a dark vertical
    # curtain-wall face, concrete podium, rooftop frame, and a visible roadside welcome sign.
    cube("OneWorld_SitePlinth", group, (0, 0.12, 0), (11.8, 0.24, 8.2), mats["tkxel_concrete"], bevel=0.035)
    cube("OneWorld_FrontSteps", group, (0, 0.26, -4.85), (5.8, 0.28, 1.0), mats["stone_light"], bevel=0.03)
    for i in range(6):
        x = -2.55 + i * 1.02
        cube(f"OneWorld_ParkingStripe_{i}", group, (x, 0.44, -5.1), (0.12, 0.045, 0.92), mats["tkxel_white"], bevel=0.004)

    cube("OneWorld_Podium", group, (0, 1.0, -0.2), (9.6, 1.78, 6.6), mats["tkxel_concrete"], bevel=0.055)
    cube("OneWorld_PodiumGlassFront", group, (0, 1.18, -3.54), (8.7, 1.08, 0.12), mats["tkxel_dark_glass"], bevel=0.015)
    cube("OneWorld_EntranceCanopy", group, (0, 2.12, -4.08), (5.8, 0.22, 1.18), mats["tkxel_frame"], bevel=0.025)
    cube("OneWorld_GlassDoors", group, (0, 1.12, -4.14), (2.3, 1.78, 0.1), mats["tkxel_glass"], bevel=0.012)

    cube("OneWorld_MainGlassTower", group, (0.34, 9.15, 0.05), (7.9, 15.7, 5.45), mats["tkxel_glass"], bevel=0.06)
    cube("OneWorld_LeftDarkCurtainWall", group, (-4.05, 9.15, -0.02), (1.34, 15.9, 5.7), mats["tkxel_dark_glass"], bevel=0.035)
    cube("OneWorld_RightConcreteCore", group, (4.95, 8.7, 0.22), (1.28, 14.2, 5.35), mats["tkxel_concrete"], bevel=0.04)
    cube("OneWorld_RearServiceCore", group, (0.65, 8.0, 3.18), (7.6, 13.0, 0.72), mats["tkxel_concrete"], bevel=0.035)

    for floor in range(10):
        y = 2.95 + floor * 1.25
        cube(f"OneWorld_FrontFloorBand_{floor}", group, (0.34, y, -2.73), (8.1, 0.07, 0.11), mats["tkxel_frame"], bevel=0.004)
        cube(f"OneWorld_LeftFloorBand_{floor}", group, (-4.08, y, -0.02), (0.11, 0.07, 5.72), mats["tkxel_frame"], bevel=0.004)
        cube(f"OneWorld_RightWindowBand_{floor}", group, (4.28, y, -0.42), (0.12, 0.07, 4.2), mats["tkxel_frame"], bevel=0.004)

    for column, x in enumerate([-2.72, -1.36, 0.0, 1.36, 2.72]):
        cube(f"OneWorld_FrontMullion_{column}", group, (x, 9.15, -2.78), (0.08, 15.15, 0.12), mats["tkxel_frame"], bevel=0.004)
    for column, x in enumerate([-3.3, -2.7]):
        cube(f"OneWorld_DarkFaceVerticalLine_{column}", group, (x, 9.15, -2.9), (0.06, 14.7, 0.16), mats["tkxel_glass"], bevel=0.004)
    for column, x in enumerate([4.42, 4.9]):
        cube(f"OneWorld_CoreWindowStack_{column}", group, (x, 8.2, -2.58), (0.32, 11.2, 0.1), mats["tkxel_dark_glass"], bevel=0.01)

    # Detail all drive-by angles. The tower is viewed from every side in-game, so the pale
    # service/core faces need curtain-wall rhythm instead of reading as blank slabs.
    cube("OneWorld_LeftSideGlassFace", group, (-4.77, 9.18, 0.02), (0.12, 14.9, 5.28), mats["tkxel_glass"], bevel=0.012)
    cube("OneWorld_RightSideGlassFace", group, (5.66, 9.18, 0.02), (0.12, 13.3, 4.92), mats["tkxel_glass"], bevel=0.012)
    cube("OneWorld_RearGlassFace", group, (0.65, 8.05, 3.65), (7.25, 12.6, 0.12), mats["tkxel_glass"], bevel=0.012)

    for floor in range(9):
        y = 3.15 + floor * 1.25
        cube(f"OneWorld_LeftSideFloorBand_{floor}", group, (-4.84, y, 0.0), (0.13, 0.07, 5.22), mats["tkxel_frame"], bevel=0.004)
        cube(f"OneWorld_RightSideFloorBand_{floor}", group, (5.73, y, 0.0), (0.13, 0.07, 4.82), mats["tkxel_frame"], bevel=0.004)
        cube(f"OneWorld_RearFloorBand_{floor}", group, (0.65, y, 3.72), (7.05, 0.07, 0.13), mats["tkxel_frame"], bevel=0.004)

    for idx, z in enumerate([-1.9, -0.95, 0.0, 0.95, 1.9]):
        cube(f"OneWorld_LeftSideMullion_{idx}", group, (-4.86, 9.15, z), (0.14, 14.45, 0.07), mats["tkxel_frame"], bevel=0.004)
        cube(f"OneWorld_RightSideMullion_{idx}", group, (5.75, 9.15, z), (0.14, 12.9, 0.07), mats["tkxel_frame"], bevel=0.004)
    for idx, x in enumerate([-2.55, -1.28, 0.0, 1.28, 2.55]):
        cube(f"OneWorld_RearMullion_{idx}", group, (x, 8.05, 3.74), (0.07, 12.15, 0.14), mats["tkxel_frame"], bevel=0.004)

    for floor in range(8):
        y = 3.35 + floor * 1.34
        for z in [-1.62, -0.38, 0.86, 2.1]:
            cube(f"OneWorld_RightCoreSideWindow_{floor}_{z}", group, (5.79, y, z), (0.035, 0.5, 0.34), mats["tkxel_dark_glass"], bevel=0.004)
            cube(f"OneWorld_LeftCoreSideWindow_{floor}_{z}", group, (-4.9, y, z), (0.035, 0.5, 0.34), mats["tkxel_dark_glass"], bevel=0.004)
    for floor in range(7):
        y = 3.55 + floor * 1.48
        for x in [-2.4, -0.8, 0.8, 2.4]:
            cube(f"OneWorld_RearWindow_{floor}_{x}", group, (x, y, 3.82), (0.84, 0.62, 0.1), mats["tkxel_dark_glass"], bevel=0.008)

    cube("OneWorld_RoofSlab", group, (0.3, 17.15, 0), (8.8, 0.34, 5.9), mats["tkxel_frame"], bevel=0.025)
    cube("OneWorld_RoofMachineRoom", group, (2.6, 17.82, 1.4), (2.35, 1.08, 2.0), mats["tkxel_concrete"], bevel=0.025)
    cube("OneWorld_TopFrontBeam", group, (0.1, 18.25, -2.85), (7.8, 0.18, 0.18), mats["tkxel_frame"], bevel=0.008)
    cube("OneWorld_TopRearBeam", group, (0.1, 18.25, 2.85), (7.8, 0.18, 0.18), mats["tkxel_frame"], bevel=0.008)
    cube("OneWorld_RoofTrussLeft", group, (-2.65, 18.0, 0), (0.16, 2.0, 6.1), mats["tkxel_frame"], rot=(0, 0, -0.36), bevel=0.008)
    cube("OneWorld_RoofTrussRight", group, (2.85, 18.0, 0), (0.16, 2.0, 6.1), mats["tkxel_frame"], rot=(0, 0, 0.36), bevel=0.008)

    cube("OneWorld_TkxelSignPanel", group, (0, 2.72, -4.24), (4.8, 0.72, 0.08), mats["tkxel_frame"], bevel=0.015)
    text_mesh("OneWorld_TkxelSignText", group, "tkxel", (-0.7, 2.74, -4.31), 0.62, mats["tkxel_green"], rot=(math.pi / 2, 0, 0))
    text_mesh("OneWorld_WelcomeText", group, "WELCOME", (1.35, 2.74, -4.31), 0.23, mats["tkxel_white"], rot=(math.pi / 2, 0, 0))
    text_mesh("OneWorld_NameText", group, "THE ONE WORLD", (0.2, 1.76, -4.18), 0.24, mats["tkxel_white"], rot=(math.pi / 2, 0, 0))

    cube("OneWorld_RoadsideSignPost", group, (-5.5, 2.25, -5.05), (0.16, 3.35, 0.16), mats["tkxel_frame"], bevel=0.008)
    cube("OneWorld_RoadsideSignBoard", group, (-5.5, 3.62, -5.05), (1.62, 1.1, 0.12), mats["tkxel_dark_glass"], bevel=0.02)
    text_mesh("OneWorld_Roadside50", group, "50", (-5.5, 3.62, -5.13), 0.58, mats["tkxel_green"], rot=(math.pi / 2, 0, 0))

    for x in [-4.2, -1.4, 1.4, 4.2]:
        cube("OneWorld_GroundPlanter", group, (x, 0.54, -4.02), (1.15, 0.48, 0.62), mats["stone"], bevel=0.025)
        ico("OneWorld_PlanterShrub", group, (x, 1.0, -4.02), 0.46, mats["leaf"], scale=(1.25, 0.62, 0.9))


if __name__ == "__main__":
    main()
