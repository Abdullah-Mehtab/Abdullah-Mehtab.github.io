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
        "armacost_brick": mat("fccu_armacost_warm_red_brick", (0.48, 0.19, 0.12, 1), 0.9),
        "armacost_brick_dark": mat("fccu_armacost_recessed_brick_shadow", (0.22, 0.075, 0.045, 1), 0.94),
        "armacost_brick_light": mat("fccu_armacost_sunlit_brick_edges", (0.63, 0.29, 0.18, 1), 0.88),
        "armacost_mortar": mat("fccu_armacost_mortar_lines", (0.25, 0.18, 0.14, 1), 0.96),
        "armacost_limestone": mat("fccu_armacost_pale_limestone_trim", (0.71, 0.62, 0.48, 1), 0.82),
        "armacost_window": mat("fccu_armacost_green_tinted_glass", (0.035, 0.42, 0.38, 1), 0.24, metallic=0.06, emission=(0.0, 0.035, 0.03, 1)),
        "armacost_shadow": mat("fccu_armacost_deep_arch_shadow", (0.028, 0.022, 0.018, 1), 0.8),
        "armacost_metal": mat("fccu_armacost_dark_railing_metal", (0.055, 0.05, 0.045, 1), 0.54, metallic=0.42),
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
    create_armacost_s_block_building(mats)
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


def create_armacost_s_block_building(mats):
    group = root("EnvLandmark_library")

    # FCCU S-block / Armacost Building identity:
    # long red-brick academic mass, central recessed entrance, stacked balconies,
    # green windows, brick jaali panels, and an octagonal S-octa courtyard core.
    cube("Armacost_SitePlinth", group, (0, 0.12, 0.35), (18.8, 0.24, 12.6), mats["armacost_limestone"], bevel=0.025)
    cube("Armacost_FrontSteps", group, (0, 0.24, -5.72), (6.0, 0.28, 1.15), mats["armacost_limestone"], bevel=0.018)
    for index, width in enumerate([5.5, 4.8, 4.1]):
        cube(f"Armacost_Step_{index}", group, (0, 0.18 + index * 0.16, -6.15 + index * 0.36), (width, 0.16, 0.34), mats["armacost_limestone"], bevel=0.012)

    cube("Armacost_LeftMainBlock", group, (-5.2, 5.62, -0.92), (6.55, 11.2, 2.55), mats["armacost_brick"], bevel=0.028)
    cube("Armacost_RightMainBlock", group, (5.2, 5.62, -0.92), (6.55, 11.2, 2.55), mats["armacost_brick"], bevel=0.028)
    cube("Armacost_CentralEntryTower", group, (0, 6.35, -1.02), (4.25, 12.65, 2.75), mats["armacost_brick"], bevel=0.028)
    cube("Armacost_LeftRearWing", group, (-7.2, 5.42, 2.8), (2.85, 10.85, 8.7), mats["armacost_brick"], bevel=0.026)
    cube("Armacost_RightRearWing", group, (7.2, 5.42, 2.8), (2.85, 10.85, 8.7), mats["armacost_brick"], bevel=0.026)
    cube("Armacost_RearBlock", group, (0, 5.3, 6.72), (12.0, 10.6, 2.55), mats["armacost_brick"], bevel=0.026)

    for x in [-8.88, -4.02, -2.16, 2.16, 4.02, 8.88]:
        cube(f"Armacost_FrontVerticalPier_{x:+.2f}", group, (x, 5.82, -2.42), (0.42, 11.45, 0.58), mats["armacost_brick_dark"], bevel=0.018)
        cube(f"Armacost_PierSunEdge_{x:+.2f}", group, (x - 0.16, 5.82, -2.74), (0.05, 10.8, 0.08), mats["armacost_brick_light"], bevel=0.004)

    for y in [1.12, 2.9, 4.72, 6.54, 8.36, 10.18]:
        cube(f"Armacost_FrontFloorBand_{y:.1f}", group, (0, y, -2.74), (17.2, 0.12, 0.18), mats["armacost_mortar"], bevel=0.003)
        cube(f"Armacost_BackFloorBand_{y:.1f}", group, (0, y, 8.04), (10.6, 0.1, 0.15), mats["armacost_mortar"], bevel=0.003)

    add_armacost_brick_texture(group, "Front", z=-2.76, x_center=0, width=17.25, y_min=0.72, y_max=11.15, mats=mats)
    add_armacost_brick_texture(group, "Rear", z=8.08, x_center=0, width=10.8, y_min=0.72, y_max=10.6, mats=mats)
    add_armacost_side_brick_texture(group, "Left", x=-8.74, z_center=2.58, depth=7.5, y_min=0.82, y_max=10.45, mats=mats)
    add_armacost_side_brick_texture(group, "Right", x=8.74, z_center=2.58, depth=7.5, y_min=0.82, y_max=10.45, mats=mats)

    for side, x_positions in [
        ("Left", [-7.2, -6.05, -4.85, -3.65]),
        ("Right", [3.65, 4.85, 6.05, 7.2]),
    ]:
        for floor, y in enumerate([2.0, 3.78, 5.58, 7.38, 9.18]):
            for x in x_positions:
                add_armacost_window(group, f"Armacost_{side}_Window_{floor}_{x:+.1f}", x, y, -2.88, 0.62, 0.92, mats)

    for floor, y in enumerate([2.12, 4.0, 5.88, 7.76, 9.64]):
        add_armacost_window(group, f"Armacost_CenterLeft_Window_{floor}", -1.42, y, -2.9, 0.54, 0.84, mats)
        add_armacost_window(group, f"Armacost_CenterRight_Window_{floor}", 1.42, y, -2.9, 0.54, 0.84, mats)
        add_armacost_balcony(group, floor, 0, y, -3.08, mats)

    for floor, y in enumerate([2.0, 3.76, 5.52, 7.28, 9.04]):
        for x in [-4.75, -3.45, -2.15, -0.85, 0.85, 2.15, 3.45, 4.75]:
            add_armacost_rear_window(group, f"Armacost_Rear_Window_{floor}_{x:+.1f}", x, y, 8.16, 0.56, 0.82, mats)
        for side, x in [("Left", -8.9), ("Right", 8.9)]:
            for z in [-0.2, 1.18, 2.56, 3.94, 5.32]:
                add_armacost_side_window(group, f"Armacost_{side}_SideWindow_{floor}_{z:+.1f}", x, y, z, side, mats)

    for x in [-2.7, 0, 2.7]:
        add_armacost_arch(group, f"Armacost_GroundArch_{x:+.1f}", x, 1.08, -3.08, 1.2, 1.82, mats)
    cube("Armacost_EntranceShadow", group, (0, 0.9, -3.2), (2.1, 1.65, 0.16), mats["armacost_shadow"], bevel=0.008)
    cube("Armacost_EntranceLintel", group, (0, 1.98, -3.16), (4.6, 0.22, 0.26), mats["armacost_limestone"], bevel=0.012)
    add_jaali_panel(group, "Armacost_EntranceJaaliLeft", -3.85, 1.58, -3.05, 1.12, 0.9, mats)
    add_jaali_panel(group, "Armacost_EntranceJaaliRight", 3.85, 1.58, -3.05, 1.12, 0.9, mats)

    for side, x in [("Left", -3.05), ("Right", 3.05)]:
        add_armacost_spiral_stair(group, f"Armacost_{side}_SpiralStair", x, 4.9, -3.04, mats)

    add_armacost_octa_courtyard(group, mats)

    for x in [-7.2, -4.8, -2.2, 2.2, 4.8, 7.2]:
        cube(f"Armacost_RoofParapetFront_{x:+.1f}", group, (x, 11.47, -2.58), (1.2, 0.52, 0.5), mats["armacost_brick_dark"], bevel=0.012)
    cube("Armacost_RoofLineFront", group, (0, 11.42, -2.55), (17.4, 0.22, 0.38), mats["armacost_limestone"], bevel=0.01)
    cube("Armacost_RoofLineRear", group, (0, 10.92, 8.02), (11.4, 0.22, 0.34), mats["armacost_limestone"], bevel=0.01)
    cube("Armacost_RooftopUtility_A", group, (-2.4, 11.88, 4.85), (2.2, 0.72, 1.25), mats["armacost_limestone"], bevel=0.014)
    cube("Armacost_RooftopUtility_B", group, (2.3, 11.82, 5.1), (1.65, 0.62, 1.1), mats["armacost_limestone"], bevel=0.014)


def add_armacost_window(group, name, x, y, z, width, height, mats):
    cube(f"{name}_ShadowBox", group, (x, y, z + 0.012), (width + 0.18, height + 0.18, 0.12), mats["armacost_shadow"], bevel=0.004)
    cube(f"{name}_Glass", group, (x, y, z - 0.055), (width, height, 0.08), mats["armacost_window"], bevel=0.004)
    cube(f"{name}_TopBrickLintel", group, (x, y + height / 2 + 0.13, z - 0.07), (width + 0.34, 0.08, 0.1), mats["armacost_brick_light"], bevel=0.004)
    cube(f"{name}_Sill", group, (x, y - height / 2 - 0.12, z - 0.08), (width + 0.28, 0.08, 0.14), mats["armacost_limestone"], bevel=0.004)


def add_armacost_rear_window(group, name, x, y, z, width, height, mats):
    cube(f"{name}_ShadowBox", group, (x, y, z - 0.012), (width + 0.18, height + 0.18, 0.12), mats["armacost_shadow"], bevel=0.004)
    cube(f"{name}_Glass", group, (x, y, z + 0.055), (width, height, 0.08), mats["armacost_window"], bevel=0.004)
    cube(f"{name}_TopBrickLintel", group, (x, y + height / 2 + 0.13, z + 0.07), (width + 0.34, 0.08, 0.1), mats["armacost_brick_light"], bevel=0.004)
    cube(f"{name}_Sill", group, (x, y - height / 2 - 0.12, z + 0.08), (width + 0.28, 0.08, 0.14), mats["armacost_limestone"], bevel=0.004)


def add_armacost_side_window(group, name, x, y, z, side, mats):
    sign = -1 if side == "Left" else 1
    cube(f"{name}_ShadowBox", group, (x, y, z), (0.12, 0.96, 0.76), mats["armacost_shadow"], bevel=0.004)
    cube(f"{name}_Glass", group, (x + sign * 0.052, y, z), (0.08, 0.78, 0.56), mats["armacost_window"], bevel=0.004)
    cube(f"{name}_Lintel", group, (x + sign * 0.07, y + 0.52, z), (0.1, 0.08, 0.76), mats["armacost_brick_light"], bevel=0.003)
    cube(f"{name}_Sill", group, (x + sign * 0.07, y - 0.52, z), (0.1, 0.08, 0.72), mats["armacost_limestone"], bevel=0.003)


def add_armacost_arch(group, name, x, y, z, width, height, mats):
    cube(f"{name}_RectShadow", group, (x, y - 0.16, z), (width, height * 0.78, 0.12), mats["armacost_shadow"], bevel=0.006)
    create_arch_plane(f"{name}_ArchShadow", group, x, y + height * 0.22, z - 0.055, width, height * 0.62, mats["armacost_shadow"])
    cube(f"{name}_LeftJamb", group, (x - width / 2 - 0.11, y - 0.1, z - 0.02), (0.16, height * 0.82, 0.18), mats["armacost_brick_light"], bevel=0.006)
    cube(f"{name}_RightJamb", group, (x + width / 2 + 0.11, y - 0.1, z - 0.02), (0.16, height * 0.82, 0.18), mats["armacost_brick_light"], bevel=0.006)


def create_arch_plane(name, group, x, y, z, width, height, material):
    half = width / 2
    radius = half
    base_h = max(0.01, height - radius)
    verts = [(-half, -height / 2, 0), (half, -height / 2, 0), (half, -height / 2 + base_h, 0)]
    for i in range(10):
        angle = math.pi * (i / 9)
        verts.append((math.cos(angle) * radius, -height / 2 + base_h + math.sin(angle) * radius, 0))
    verts.append((-half, -height / 2 + base_h, 0))
    faces = [tuple(range(len(verts)))]
    mesh = bpy.data.meshes.new(f"{name}Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.location = (x, y, z)
    obj.data.materials.append(material)
    obj.parent = group
    return obj


def add_armacost_balcony(group, floor, x, y, z, mats):
    cube(f"Armacost_CentralBalcony_{floor}_Slab", group, (x, y - 0.48, z - 0.28), (1.52, 0.12, 0.72), mats["armacost_limestone"], bevel=0.008)
    cube(f"Armacost_CentralBalcony_{floor}_BackShadow", group, (x, y, z - 0.03), (1.28, 1.05, 0.12), mats["armacost_shadow"], bevel=0.004)
    add_jaali_panel(group, f"Armacost_CentralBalcony_{floor}_Jaali", x, y - 0.08, z - 0.48, 1.28, 0.42, mats)
    for sx in [-0.68, 0.68]:
        cube(f"Armacost_CentralBalcony_{floor}_SidePier_{sx:+.1f}", group, (x + sx, y, z - 0.18), (0.12, 1.22, 0.28), mats["armacost_brick_light"], bevel=0.004)


def add_jaali_panel(group, name, x, y, z, width, height, mats):
    cube(f"{name}_Base", group, (x, y, z), (width, height, 0.08), mats["armacost_brick_dark"], bevel=0.004)
    cols = max(3, int(width / 0.18))
    rows = max(2, int(height / 0.16))
    for row in range(rows):
        for col in range(cols):
            if (row + col) % 2:
                px = x - width * 0.42 + col * (width * 0.84 / max(cols - 1, 1))
                py = y - height * 0.36 + row * (height * 0.72 / max(rows - 1, 1))
                cube(f"{name}_Vent_{row}_{col}", group, (px, py, z - 0.055), (0.06, 0.055, 0.035), mats["armacost_shadow"], bevel=0.002)


def add_armacost_spiral_stair(group, prefix, x, y, z, mats):
    cyl(f"{prefix}_Core", group, (x, y, z - 0.06), 0.18, 8.4, mats["armacost_brick_dark"], 14)
    for index in range(32):
        angle = index * 0.46
        sy = 1.0 + index * 0.25
        sx = x + math.cos(angle) * 0.42
        sz = z + math.sin(angle) * 0.42
        cube(f"{prefix}_Step_{index}", group, (sx, sy, sz), (0.5, 0.045, 0.18), mats["armacost_limestone"], rot=(0, angle, 0), bevel=0.003)
    for index in range(7):
        cube(f"{prefix}_Landing_{index}", group, (x, 1.25 + index * 1.22, z - 0.5), (1.25, 0.08, 0.24), mats["armacost_limestone"], bevel=0.004)


def add_armacost_octa_courtyard(group, mats):
    center_z = 3.35
    radius = 2.25
    for i in range(8):
        angle = i / 8 * math.tau + math.pi / 8
        x = math.cos(angle) * radius
        z = center_z + math.sin(angle) * radius
        length = 1.85
        cube(f"Armacost_SOCTA_Wall_{i}", group, (x, 4.92, z), (length, 8.65, 0.22), mats["armacost_brick"], rot=(0, -angle, 0), bevel=0.01)
        for level, y in enumerate([2.2, 3.9, 5.6, 7.3]):
            cube(f"Armacost_SOCTA_Opening_{i}_{level}", group, (x, y, z - 0.14), (0.82, 0.82, 0.08), mats["armacost_shadow"], rot=(0, -angle, 0), bevel=0.004)
    cube("Armacost_SOCTA_CourtyardGarden", group, (0, 0.22, center_z), (3.6, 0.12, 3.6), mats["grass"], bevel=0.02)
    cyl("Armacost_SOCTA_CentralPlanter", group, (0, 0.48, center_z), 0.62, 0.34, mats["armacost_limestone"], 18)
    for i in range(5):
        angle = i / 5 * math.tau
        ico(f"Armacost_SOCTA_Shrub_{i}", group, (math.cos(angle) * 1.1, 0.72, center_z + math.sin(angle) * 1.1), 0.32, mats["leaf"], scale=(1.2, 0.55, 0.85))


def add_armacost_brick_texture(group, prefix, z, x_center, width, y_min, y_max, mats):
    rows = int((y_max - y_min) / 0.34)
    for row in range(rows):
        y = y_min + row * 0.34
        cube(f"Armacost_{prefix}_MortarRow_{row}", group, (x_center, y, z), (width, 0.025, 0.028), mats["armacost_mortar"], bevel=0.001)
        if row % 3 == 0:
            bricks = 16
            for col in range(bricks):
                x = x_center - width * 0.46 + col * (width * 0.92 / (bricks - 1))
                if abs(x) < 2.3 and 1.4 < y < 10.4:
                    continue
                cube(f"Armacost_{prefix}_BrickTick_{row}_{col}", group, (x, y + 0.14, z - 0.018), (0.028, 0.18, 0.025), mats["armacost_brick_dark"], bevel=0.001)


def add_armacost_side_brick_texture(group, prefix, x, z_center, depth, y_min, y_max, mats):
    rows = int((y_max - y_min) / 0.38)
    for row in range(rows):
        y = y_min + row * 0.38
        cube(f"Armacost_{prefix}_SideMortarRow_{row}", group, (x, y, z_center), (0.03, 0.022, depth), mats["armacost_mortar"], bevel=0.001)
        if row % 4 == 0:
            for col in range(8):
                z = z_center - depth * 0.42 + col * (depth * 0.84 / 7)
                cube(f"Armacost_{prefix}_SideBrickTick_{row}_{col}", group, (x - 0.018 if x > 0 else x + 0.018, y + 0.14, z), (0.026, 0.17, 0.03), mats["armacost_brick_dark"], bevel=0.001)


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
