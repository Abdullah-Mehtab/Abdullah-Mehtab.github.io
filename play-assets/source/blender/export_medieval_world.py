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
        "tkxel_glass": mat("tkxel_babar_block_blue_green_glass", (0.035, 0.30, 0.34, 1), 0.16, metallic=0.08, emission=(0.006, 0.055, 0.07, 1)),
        "tkxel_dark_glass": mat("tkxel_babar_block_dark_curtain_wall", (0.012, 0.035, 0.045, 1), 0.22, metallic=0.1),
        "tkxel_frame": mat("tkxel_babar_block_black_aluminium_frame", (0.025, 0.035, 0.04, 1), 0.42, metallic=0.35),
        "tkxel_concrete": mat("tkxel_babar_block_warm_concrete", (0.55, 0.53, 0.46, 1), 0.86),
        "tkxel_concrete_shadow": mat("tkxel_babar_block_recess_shadow", (0.32, 0.31, 0.27, 1), 0.88),
        "tkxel_interior": mat("tkxel_babar_block_occupied_shadow", (0.018, 0.025, 0.028, 1), 0.7, metallic=0.08),
        "tkxel_roof": mat("tkxel_babar_block_roof_parapet", (0.05, 0.07, 0.075, 1), 0.56, metallic=0.18),
        "tkxel_metal": mat("tkxel_babar_block_roof_metal", (0.64, 0.58, 0.43, 1), 0.44, metallic=0.36),
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
    create_tkxel_babar_block_building(mats)


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


def create_tkxel_babar_block_building(mats):
    group = root("EnvLandmark_office")

    # Current Babar Block reference: a rectangular blue-green glass front with a stepped
    # central curtain-wall bay, beige concrete side/rear wing, roof rails, and no readable labels.
    cube("BabarBlock_SitePlinth", group, (0.2, 0.11, -0.1), (12.2, 0.22, 10.8), mats["stone_light"], bevel=0.025)
    cube("BabarBlock_FrontTerrace", group, (-0.35, 0.24, -4.6), (9.4, 0.26, 1.2), mats["tkxel_concrete"], bevel=0.025)
    cube("BabarBlock_FrontStepLower", group, (-0.35, 0.12, -5.25), (7.4, 0.18, 0.58), mats["stone_light"], bevel=0.018)
    cube("BabarBlock_EntryShadow", group, (-0.35, 0.98, -4.16), (5.6, 1.55, 0.18), mats["tkxel_dark_glass"], bevel=0.01)
    cube("BabarBlock_EntryCanopy", group, (-0.35, 1.86, -4.36), (6.4, 0.22, 0.8), mats["tkxel_roof"], bevel=0.016)

    cube("BabarBlock_LeftConcreteReturn", group, (-4.78, 8.1, 0.72), (0.34, 15.7, 8.1), mats["tkxel_concrete"], bevel=0.012)
    cube("BabarBlock_RightBeigeWing", group, (5.08, 8.0, 1.58), (1.96, 15.6, 6.25), mats["tkxel_concrete"], bevel=0.025)
    cube("BabarBlock_RearBeigeWing", group, (0.18, 7.85, 4.55), (10.25, 15.2, 0.78), mats["tkxel_concrete"], bevel=0.018)
    cube("BabarBlock_LeftRearCornerClosure", group, (-4.42, 7.95, 3.62), (1.04, 15.35, 1.82), mats["tkxel_concrete"], bevel=0.016)
    cube("BabarBlock_RightRearCornerClosure", group, (4.64, 7.95, 3.62), (1.18, 15.35, 1.82), mats["tkxel_concrete"], bevel=0.016)
    cube("BabarBlock_RearInteriorBlocker", group, (0.08, 7.98, 2.72), (8.6, 15.25, 1.9), mats["tkxel_concrete_shadow"], bevel=0.006)

    # Opaque inner mass/floors keep the curtain wall from reading as a hollow shell at
    # close range while preserving the glass-tower silhouette.
    cube("BabarBlock_InteriorOccupiedCore", group, (-0.1, 8.25, -2.16), (8.25, 14.75, 3.08), mats["tkxel_interior"], bevel=0.012)
    cube("BabarBlock_InteriorLobbyShadow", group, (-0.35, 1.35, -2.95), (7.8, 1.85, 1.4), mats["tkxel_interior"], bevel=0.01)
    for floor in range(10):
        y = 2.35 + floor * 1.32
        cube(f"BabarBlock_InteriorFloorPlate_{floor}", group, (-0.05, y, -2.16), (8.12, 0.08, 2.86), mats["tkxel_concrete_shadow"], bevel=0.003)

    cube("BabarBlock_FrontGlassLeft", group, (-2.22, 8.75, -3.72), (5.05, 16.45, 0.26), mats["tkxel_glass"], bevel=0.018)
    cube("BabarBlock_FrontGlassRight", group, (2.24, 8.72, -3.68), (4.15, 16.35, 0.24), mats["tkxel_glass"], bevel=0.018)
    cube("BabarBlock_CentralSteppedGlassBay", group, (0.28, 8.78, -4.02), (1.54, 15.35, 0.34), mats["tkxel_glass"], bevel=0.016)
    cube("BabarBlock_RightEdgeGlassReturn", group, (4.65, 8.72, -0.2), (0.28, 16.25, 6.58), mats["tkxel_glass"], bevel=0.012)

    for floor in range(11):
        y = 1.95 + floor * 1.32
        cube(f"BabarBlock_FrontFloorBand_{floor}", group, (-0.22, y, -3.91), (8.75, 0.055, 0.14), mats["tkxel_frame"], bevel=0.003)
        cube(f"BabarBlock_CenterBayFloorBand_{floor}", group, (0.44, y + 0.18, -4.18), (1.52, 0.048, 0.12), mats["tkxel_frame"], bevel=0.003)

    for idx, x in enumerate([-4.28, -3.15, -2.02, -0.92, 0.04, 0.88, 1.74, 2.68, 3.58, 4.34]):
        cube(f"BabarBlock_FrontVerticalMullion_{idx}", group, (x, 8.75, -3.93), (0.055, 15.8, 0.16), mats["tkxel_frame"], bevel=0.003)
    for idx, x in enumerate([-0.28, 1.16]):
        cube(f"BabarBlock_CenterBaySideMullion_{idx}", group, (x, 8.8, -4.2), (0.07, 15.18, 0.16), mats["tkxel_frame"], bevel=0.003)

    for index, (x, y, sx, sy) in enumerate([
        (0.28, 5.6, 1.32, 1.0),
        (0.27, 8.25, 1.32, 1.08),
        (0.28, 11.1, 1.32, 0.96),
        (0.27, 13.95, 1.32, 1.0),
        (2.98, 12.55, 0.92, 1.12),
    ]):
        cube(f"BabarBlock_RecessedPanel_{index}", group, (x, y, -4.24), (sx, sy, 0.055), mats["tkxel_glass"], bevel=0.004)

    for floor in range(10):
        y = 2.45 + floor * 1.28
        for i, z in enumerate([-0.82, 0.18, 1.18, 2.18, 3.18]):
            cube(f"BabarBlock_RightWingWindow_{floor}_{i}", group, (6.09, y, z), (0.055, 0.34, 0.36), mats["tkxel_dark_glass"], bevel=0.003)
        cube(f"BabarBlock_RightWingFloorGroove_{floor}", group, (6.13, y + 0.55, 1.35), (0.03, 0.035, 5.15), mats["tkxel_concrete_shadow"], bevel=0.002)
        for i, z in enumerate([-2.25, -1.08, 0.1, 1.28, 2.46]):
            cube(f"BabarBlock_LeftReturnWindow_{floor}_{i}", group, (-4.96, y, z), (0.06, 0.34, 0.34), mats["tkxel_dark_glass"], bevel=0.003)
        cube(f"BabarBlock_LeftReturnFloorGroove_{floor}", group, (-5.0, y + 0.55, 0.05), (0.035, 0.035, 5.45), mats["tkxel_concrete_shadow"], bevel=0.002)

    for floor in range(9):
        y = 2.7 + floor * 1.34
        for i, x in enumerate([-4.15, -2.8, -1.45, -0.1, 1.25, 2.6, 3.95]):
            cube(f"BabarBlock_RearWindow_{floor}_{i}", group, (x, y, 4.72), (0.52, 0.38, 0.07), mats["tkxel_dark_glass"], bevel=0.004)
        cube(f"BabarBlock_RearFloorGroove_{floor}", group, (0.2, y + 0.55, 4.96), (9.2, 0.035, 0.035), mats["tkxel_concrete_shadow"], bevel=0.002)

    for floor in range(8):
        y = 3.0 + floor * 1.48
        cube(f"BabarBlock_FrontWingSideWindow_{floor}", group, (4.78, y, -3.28), (0.06, 0.46, 0.34), mats["tkxel_dark_glass"], bevel=0.004)

    cube("BabarBlock_RoofSlab", group, (-0.1, 16.72, -0.2), (10.25, 0.3, 8.75), mats["tkxel_roof"], bevel=0.018)
    cube("BabarBlock_RoofGlassParapetFront", group, (-0.1, 17.12, -3.8), (9.65, 0.38, 0.16), mats["tkxel_glass"], bevel=0.006)
    cube("BabarBlock_RoofConcreteService", group, (3.35, 17.32, 1.7), (2.05, 0.82, 2.1), mats["tkxel_concrete"], bevel=0.018)
    for i, x in enumerate([-4.0, -2.2, 0.0, 2.2, 4.0]):
        cube(f"BabarBlock_RoofRailPost_{i}", group, (x, 17.72, -3.52), (0.08, 0.78, 0.08), mats["tkxel_metal"], bevel=0.004)
    cube("BabarBlock_RoofRailFront", group, (0, 17.92, -3.52), (8.6, 0.08, 0.08), mats["tkxel_metal"], bevel=0.004)
    cube("BabarBlock_RoofCraneArmLeft", group, (-3.15, 17.95, -0.5), (0.08, 1.55, 3.8), mats["tkxel_metal"], rot=(0.0, 0.36, 0.0), bevel=0.004)
    cube("BabarBlock_RoofCraneArmRight", group, (2.8, 17.98, -0.65), (0.08, 1.45, 3.4), mats["tkxel_metal"], rot=(0.0, -0.32, 0.0), bevel=0.004)

    for x in [-3.65, -1.25, 1.25, 3.65]:
        cube("BabarBlock_LowPlanter", group, (x, 0.52, -4.18), (1.0, 0.44, 0.56), mats["stone"], bevel=0.02)
        ico("BabarBlock_PlanterShrub", group, (x, 0.96, -4.18), 0.42, mats["leaf"], scale=(1.18, 0.58, 0.88))


if __name__ == "__main__":
    main()
