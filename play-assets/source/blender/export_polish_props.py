# ABOUTME: Exports supplemental low-poly world props for the Portfolio Drive island.
# ABOUTME: Keeps these props separate from protected car and FCC building assets.
import argparse
import math
from pathlib import Path

import bpy


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    reset_scene()
    mats = materials()
    create_info_kiosk(mats)
    create_security_scanner(mats)
    create_terminal_pillar(mats)
    create_road_barrier(mats)
    create_palm_cluster(mats)
    create_bench_planter(mats)
    create_signal_totem(mats)
    create_shore_buoy(mats)
    create_dock_float(mats)
    create_wave_marker(mats)
    create_distant_islet(mats)
    create_project_forge(mats)
    create_project_gantry(mats)
    create_project_display_rack(mats)
    create_project_parts_cart(mats)
    create_project_cable_reel(mats)
    create_campus_fountain(mats)
    create_campus_notice_board(mats)
    create_campus_walkway_pavilion(mats)
    create_campus_study_bench(mats)
    create_cv_vault(mats)
    create_skills_array(mats)
    create_career_office(mats)
    create_awards_monument(mats)
    create_todo_board(mats)
    create_document_arcade(mats)
    create_terminal_canopy(mats)
    create_queue_marquee(mats)
    create_process_crane(mats)
    create_circuit_gate(mats)
    create_stunt_checkpoint(mats)
    create_stunt_score_tower(mats)
    create_stunt_arrow_fence(mats)
    create_build_workbench(mats)
    create_farm_irrigator(mats)
    create_harbor_signal(mats)
    create_harbor_pier(mats)
    create_harbor_antenna(mats)
    create_harbor_cargo_stack(mats)
    create_harbor_shade(mats)
    create_district_gateway(mats)
    create_route_lantern(mats)
    create_coast_rock_cluster(mats)
    create_beach_grass_clump(mats)
    create_build_crate_stack(mats)
    create_terminal_bank(mats)
    create_archive_step_cluster(mats)
    create_todo_card_stack(mats)
    create_yard_edge_trim(mats)
    create_yard_surface_marks(mats)
    create_workshop_process_rail(mats)
    create_signal_spire(mats)
    create_workshop_canopy(mats)
    create_garden_arch(mats)
    create_route_splitter_island(mats)
    create_plaza_edge_kit(mats)
    create_chevron_bollard_run(mats)
    create_route_story_marker(mats)

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
        "stone": mat("polish_warm_limestone", (0.78, 0.69, 0.52, 1), 0.86),
        "stone_shadow": mat("polish_stone_shadow", (0.38, 0.32, 0.24, 1), 0.9),
        "wood": mat("polish_sunlit_wood", (0.58, 0.34, 0.17, 1), 0.82),
        "dark": mat("polish_charcoal_metal", (0.04, 0.052, 0.058, 1), 0.48, metallic=0.24),
        "rubber": mat("polish_tire_rubber", (0.012, 0.014, 0.015, 1), 0.78),
        "glass": mat("polish_blue_green_glass", (0.04, 0.36, 0.38, 0.78), 0.18, metallic=0.04, alpha=0.78, emission=(0.01, 0.12, 0.12, 1)),
        "screen": mat("polish_terminal_screen", (0.04, 0.68, 0.78, 1), 0.2, emission=(0.02, 0.62, 0.72, 1)),
        "mint": mat("polish_mint_light", (0.44, 1.0, 0.7, 1), 0.34, emission=(0.28, 0.9, 0.44, 1)),
        "amber": mat("polish_amber_light", (1.0, 0.62, 0.2, 1), 0.34, emission=(1.0, 0.42, 0.08, 1)),
        "pink": mat("polish_warning_pink", (1.0, 0.28, 0.46, 1), 0.34, emission=(0.9, 0.12, 0.26, 1)),
        "leaf": mat("polish_palm_leaf", (0.18, 0.58, 0.25, 1), 0.88),
        "flower": mat("polish_planter_flower", (0.88, 0.36, 0.86, 1), 0.82, emission=(0.08, 0.02, 0.06, 1)),
        "foam": mat("polish_seafoam_white", (0.82, 1.0, 0.94, 1), 0.58, emission=(0.08, 0.16, 0.12, 1)),
        "aqua": mat("polish_aqua_marker", (0.08, 0.55, 0.62, 1), 0.5, metallic=0.05, emission=(0.01, 0.18, 0.22, 1)),
        "rope": mat("polish_salt_rope", (0.72, 0.58, 0.36, 1), 0.9),
        "paper": mat("polish_cv_paper", (0.92, 0.86, 0.68, 1), 0.78),
        "purple": mat("polish_soft_purple_light", (0.48, 0.36, 0.95, 1), 0.38, emission=(0.28, 0.16, 0.72, 1)),
        "gold": mat("polish_award_gold", (0.95, 0.68, 0.22, 1), 0.44, metallic=0.36, emission=(0.18, 0.1, 0.02, 1)),
        "crop": mat("polish_crop_green", (0.32, 0.68, 0.22, 1), 0.9),
        "brick": mat("polish_campus_brick", (0.58, 0.22, 0.13, 1), 0.86),
        "islet_sand": mat("polish_distant_islet_sand", (0.78, 0.50, 0.24, 1), 0.94),
        "islet_meadow": mat("polish_distant_islet_meadow", (0.22, 0.48, 0.25, 1), 0.92),
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
        bsdf.inputs["Emission Strength"].default_value = 0.85
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
        modifier.segments = 1
        obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def rock_blob(name, parent, loc, scale, material, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    obj.parent = parent
    obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def cone(name, parent, loc, radius, depth, material, vertices=5, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius, radius2=0.0, depth=depth, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    obj.parent = parent
    return obj


def create_info_kiosk(mats):
    group = root("EnvPolishInfoKiosk")
    cube("InfoKiosk_Base", group, (0, 0.16, 0), (2.8, 0.32, 1.7), mats["stone"], bevel=0.035)
    cube("InfoKiosk_BackWall", group, (0, 1.42, 0.32), (2.45, 2.1, 0.24), mats["dark"], bevel=0.025)
    cube("InfoKiosk_Screen", group, (0, 1.5, 0.17), (1.9, 1.16, 0.08), mats["screen"], bevel=0.015)
    cube("InfoKiosk_Roof", group, (0, 2.66, 0.1), (3.1, 0.28, 1.95), mats["wood"], bevel=0.035)
    cube("InfoKiosk_RoofGlow", group, (0, 2.44, -0.72), (2.45, 0.08, 0.08), mats["amber"], bevel=0.01)
    for x in [-1.05, 1.05]:
        cube("InfoKiosk_Post", group, (x, 1.34, -0.68), (0.14, 2.26, 0.14), mats["wood"], bevel=0.012)
    for y in [1.22, 1.5, 1.78]:
        cube("InfoKiosk_ScreenLine", group, (0, y, 0.11), (1.42, 0.045, 0.06), mats["mint"], bevel=0.004)


def create_security_scanner(mats):
    group = root("EnvPolishSecurityScanner")
    cube("PolishScanner_Base", group, (0, 0.12, 0), (5.8, 0.24, 1.15), mats["stone_shadow"], bevel=0.025)
    for x in [-2.35, 2.35]:
        cube("PolishScanner_Pillar", group, (x, 2.05, 0), (0.48, 3.9, 0.62), mats["dark"], bevel=0.035)
        cube("PolishScanner_SideGlow", group, (x, 2.05, -0.36), (0.18, 2.8, 0.06), mats["screen"], bevel=0.008)
    cube("PolishScanner_TopBeam", group, (0, 4.12, 0), (5.25, 0.44, 0.72), mats["dark"], bevel=0.035)
    cube("PolishScanner_TopGlow", group, (0, 3.86, -0.42), (4.3, 0.12, 0.08), mats["pink"], bevel=0.01)
    for x in [-1.4, -0.7, 0.0, 0.7, 1.4]:
        cube("PolishScanner_LightCurtain", group, (x, 2.08, -0.1), (0.055, 3.25, 0.08), mats["glass"], bevel=0.004)


def create_terminal_pillar(mats):
    group = root("EnvPolishTerminalPillar")
    cube("TerminalPillar_Foot", group, (0, 0.12, 0), (1.5, 0.24, 1.5), mats["stone"], bevel=0.03)
    cube("TerminalPillar_Core", group, (0, 1.65, 0), (0.86, 3.1, 0.86), mats["dark"], bevel=0.035)
    for index, (z, rot) in enumerate([(-0.46, 0), (0.46, math.pi)]):
        cube(f"TerminalPillar_Screen_{index}", group, (0, 1.72, z), (0.62, 1.72, 0.06), mats["screen"], rot=(0, rot, 0), bevel=0.01)
        for line in range(4):
            cube(f"TerminalPillar_Line_{index}_{line}", group, (0, 1.1 + line * 0.36, z - 0.035 if z < 0 else z + 0.035), (0.42, 0.035, 0.035), mats["mint"], rot=(0, rot, 0), bevel=0.003)
    cube("TerminalPillar_Cap", group, (0, 3.36, 0), (1.16, 0.34, 1.16), mats["wood"], bevel=0.025)


def create_road_barrier(mats):
    group = root("EnvPolishRoadBarrier")
    cube("RoadBarrier_LeftFoot", group, (-1.7, 0.18, 0), (0.72, 0.36, 0.72), mats["rubber"], bevel=0.025)
    cube("RoadBarrier_RightFoot", group, (1.7, 0.18, 0), (0.72, 0.36, 0.72), mats["rubber"], bevel=0.025)
    cube("RoadBarrier_Beam", group, (0, 1.08, 0), (4.45, 0.42, 0.32), mats["stone"], bevel=0.025)
    for x in [-1.45, -0.45, 0.55, 1.55]:
        cube("RoadBarrier_Stripe", group, (x, 1.11, -0.18), (0.52, 0.48, 0.055), mats["amber"], rot=(0, 0, -0.26), bevel=0.004)
    for x in [-2.35, 2.35]:
        cube("RoadBarrier_ConeBase", group, (x, 0.13, -0.74), (0.74, 0.26, 0.74), mats["rubber"], bevel=0.02)
        cube("RoadBarrier_ConeBody", group, (x, 0.55, -0.74), (0.44, 0.75, 0.44), mats["amber"], bevel=0.025)


def create_palm_cluster(mats):
    group = root("EnvPolishPalm")
    for i, (x, z, height, lean) in enumerate([(-0.72, 0.18, 3.6, 0.15), (0.55, -0.2, 3.05, -0.1)]):
        for segment in range(5):
            y = 0.42 + segment * height / 5
            cube(f"Palm_{i}_Trunk_{segment}", group, (x + lean * segment * 0.14, y, z), (0.36 - segment * 0.026, height / 5 + 0.06, 0.36 - segment * 0.026), mats["wood"], rot=(0, lean * 0.12, 0), bevel=0.045)
        crown_y = height + 0.4
        crown_x = x + lean * 0.74
        for leaf in range(7):
            angle = leaf / 7 * math.tau
            lx = math.cos(angle) * 0.72
            lz = math.sin(angle) * 0.72
            cube(f"Palm_{i}_Leaf_{leaf}", group, (crown_x + lx * 0.55, crown_y, z + lz * 0.55), (1.7, 0.12, 0.42), mats["leaf"], rot=(0.18, -angle, 0.22), bevel=0.035)
        cube(f"Palm_{i}_CrownGlow", group, (crown_x, crown_y - 0.08, z), (0.42, 0.24, 0.42), mats["mint"], bevel=0.04)


def create_bench_planter(mats):
    group = root("EnvPolishBenchPlanter")
    cube("BenchPlanter_Box", group, (0, 0.28, 0), (3.5, 0.56, 1.15), mats["stone"], bevel=0.035)
    cube("BenchPlanter_Seat", group, (0, 0.78, -0.22), (3.15, 0.22, 0.52), mats["wood"], bevel=0.025)
    for x in [-1.24, -0.62, 0.0, 0.62, 1.24]:
        cube("BenchPlanter_GrassBlade", group, (x, 0.92, 0.26), (0.16, 0.62, 0.16), mats["leaf"], rot=(0.18, x * 0.18, 0.08), bevel=0.01)
        cube("BenchPlanter_Flower", group, (x, 1.26, 0.3), (0.26, 0.2, 0.26), mats["flower"], bevel=0.03)


def create_signal_totem(mats):
    group = root("EnvPolishSignalTotem")
    cube("SignalTotem_Base", group, (0, 0.14, 0), (1.2, 0.28, 1.2), mats["stone_shadow"], bevel=0.025)
    cube("SignalTotem_Post", group, (0, 1.55, 0), (0.32, 2.85, 0.32), mats["dark"], bevel=0.025)
    for index, y in enumerate([0.82, 1.52, 2.22]):
        cube(f"SignalTotem_Light_{index}", group, (0, y, -0.22), (0.7, 0.34, 0.08), [mats["pink"], mats["amber"], mats["mint"]][index], bevel=0.012)
    cube("SignalTotem_Cap", group, (0, 3.12, 0), (0.84, 0.28, 0.84), mats["wood"], bevel=0.02)


def create_shore_buoy(mats):
    group = root("EnvPolishShoreBuoy")
    cube("ShoreBuoy_Float", group, (0, 0.42, 0), (1.15, 0.84, 1.15), mats["foam"], bevel=0.16)
    cube("ShoreBuoy_Band", group, (0, 0.44, 0), (1.28, 0.22, 1.28), mats["aqua"], bevel=0.055)
    cube("ShoreBuoy_Stem", group, (0, 1.18, 0), (0.18, 1.18, 0.18), mats["dark"], bevel=0.018)
    cube("ShoreBuoy_Light", group, (0, 1.84, -0.02), (0.48, 0.26, 0.48), mats["amber"], bevel=0.04)
    cube("ShoreBuoy_Flag", group, (0.34, 1.58, -0.04), (0.66, 0.32, 0.055), mats["pink"], bevel=0.006)
    for x in [-0.46, 0.46]:
        cube("ShoreBuoy_Rope", group, (x, 0.26, -0.52), (0.12, 0.12, 0.78), mats["rope"], rot=(0, x * 0.32, 0), bevel=0.015)


def create_dock_float(mats):
    group = root("EnvPolishDockFloat")
    cube("DockFloat_PontoonLeft", group, (-0.72, 0.24, 0), (0.38, 0.48, 2.7), mats["foam"], bevel=0.08)
    cube("DockFloat_PontoonRight", group, (0.72, 0.24, 0), (0.38, 0.48, 2.7), mats["foam"], bevel=0.08)
    for z in [-0.86, 0, 0.86]:
        cube("DockFloat_Plank", group, (0, 0.58, z), (2.08, 0.18, 0.32), mats["wood"], bevel=0.025)
    cube("DockFloat_GlowStrip", group, (0, 0.74, -1.18), (1.72, 0.06, 0.06), mats["mint"], bevel=0.006)
    for x in [-1.04, 1.04]:
        cube("DockFloat_RopePost", group, (x, 0.98, 1.04), (0.14, 0.74, 0.14), mats["rope"], bevel=0.014)


def create_wave_marker(mats):
    group = root("EnvPolishWaveMarker")
    cube("WaveMarker_Base", group, (0, 0.18, 0), (1.6, 0.36, 0.52), mats["aqua"], bevel=0.055)
    cube("WaveMarker_Top", group, (0, 0.62, 0), (1.06, 0.36, 0.36), mats["foam"], bevel=0.045)
    cube("WaveMarker_Amber", group, (-0.42, 0.86, -0.02), (0.22, 0.18, 0.3), mats["amber"], bevel=0.012)
    cube("WaveMarker_Mint", group, (0.42, 0.86, -0.02), (0.22, 0.18, 0.3), mats["mint"], bevel=0.012)


def create_distant_islet(mats):
    group = root("EnvPolishDistantIslet")
    rock_blob("DistantIslet_SandBase", group, (0, 0.18, 0), (3.9, 0.34, 1.2), mats["islet_sand"], rot=(0.0, 0.12, -0.03))
    rock_blob("DistantIslet_MeadowCap", group, (-0.18, 0.42, -0.03), (2.35, 0.22, 0.72), mats["islet_meadow"], rot=(0.0, -0.18, 0.02))
    cone("DistantIslet_LeftHill", group, (-0.72, 0.93, -0.04), 0.54, 1.05, mats["islet_meadow"], vertices=6, rot=(0.0, 0.18, 0.0))
    cone("DistantIslet_RightHill", group, (0.44, 0.78, 0.08), 0.42, 0.76, mats["leaf"], vertices=5, rot=(0.0, -0.28, 0.0))
    rock_blob("DistantIslet_RockA", group, (1.46, 0.36, -0.12), (0.34, 0.22, 0.18), mats["stone_shadow"], rot=(0.2, 0.0, -0.16))
    rock_blob("DistantIslet_RockB", group, (-1.48, 0.33, 0.2), (0.42, 0.18, 0.2), mats["stone"], rot=(-0.12, 0.35, 0.08))
    cube("DistantIslet_TinyMarker", group, (1.08, 0.68, 0.0), (0.08, 0.72, 0.08), mats["dark"], bevel=0.004)
    cube("DistantIslet_TinyFlag", group, (1.22, 0.98, -0.03), (0.32, 0.16, 0.04), mats["amber"], bevel=0.004)


def create_project_forge(mats):
    group = root("EnvPolishProjectForge")
    cube("ProjectForge_Floor", group, (0, 0.08, 0), (5.2, 0.16, 3.4), mats["stone_shadow"], bevel=0.035)
    cube("ProjectForge_BackWall", group, (0, 1.45, 1.18), (4.6, 2.5, 0.28), mats["dark"], bevel=0.03)
    cube("ProjectForge_Anvil", group, (-1.35, 0.82, -0.35), (1.3, 0.7, 0.86), mats["stone"], bevel=0.045)
    cube("ProjectForge_Worktop", group, (1.15, 0.82, -0.38), (2.0, 0.32, 1.0), mats["wood"], bevel=0.035)
    cube("ProjectForge_Screen", group, (0.86, 1.72, 1.0), (1.8, 1.0, 0.08), mats["screen"], bevel=0.012)
    cube("ProjectForge_FireBox", group, (-1.35, 0.56, 0.54), (1.34, 0.48, 0.86), mats["amber"], bevel=0.03)
    for x in [-1.5, -0.5, 0.55, 1.55]:
        cube("ProjectForge_ToolRack", group, (x, 2.42, 1.0), (0.12, 0.9, 0.08), mats["mint" if x > 0 else "amber"], bevel=0.006)


def create_project_gantry(mats):
    group = root("EnvPolishProjectGantry")
    cube("ProjectGantry_BaseLeft", group, (-2.95, 0.18, 0), (1.05, 0.36, 1.3), mats["stone_shadow"], bevel=0.04)
    cube("ProjectGantry_BaseRight", group, (2.95, 0.18, 0), (1.05, 0.36, 1.3), mats["stone_shadow"], bevel=0.04)
    for x in [-2.95, 2.95]:
        cube("ProjectGantry_PostA", group, (x, 1.72, -0.42), (0.22, 3.08, 0.22), mats["dark"], bevel=0.018)
        cube("ProjectGantry_PostB", group, (x, 1.72, 0.42), (0.22, 3.08, 0.22), mats["dark"], bevel=0.018)
        cube("ProjectGantry_PostGlow", group, (x, 1.78, -0.58), (0.09, 2.2, 0.055), mats["amber"], bevel=0.004)
    cube("ProjectGantry_TopBeam", group, (0, 3.34, 0), (6.55, 0.34, 0.5), mats["wood"], bevel=0.03)
    cube("ProjectGantry_RunwayGlow", group, (0, 3.08, -0.32), (5.6, 0.08, 0.065), mats["mint"], bevel=0.004)
    cube("ProjectGantry_Trolley", group, (-0.55, 2.82, -0.02), (0.9, 0.34, 0.66), mats["dark"], bevel=0.025)
    cube("ProjectGantry_Cable", group, (-0.55, 2.12, -0.02), (0.08, 1.3, 0.08), mats["rope"], bevel=0.006)
    cube("ProjectGantry_Hook", group, (-0.55, 1.36, -0.02), (0.48, 0.36, 0.18), mats["gold"], bevel=0.018)
    cube("ProjectGantry_Payload", group, (-0.55, 0.84, 0.28), (1.3, 0.72, 0.86), mats["stone"], rot=(0, -0.12, 0), bevel=0.035)
    for x in [-1.8, -0.9, 0.0, 0.9, 1.8]:
        cube("ProjectGantry_Checker", group, (x, 3.45, -0.31), (0.46, 0.22, 0.055), mats["paper" if x == 0 else "rubber"], bevel=0.004)


def create_project_display_rack(mats):
    group = root("EnvPolishProjectDisplayRack")
    cube("ProjectDisplayRack_Base", group, (0, 0.14, 0), (5.8, 0.28, 1.55), mats["stone"], bevel=0.04)
    cube("ProjectDisplayRack_BackRail", group, (0, 1.82, 0.42), (5.4, 2.9, 0.18), mats["dark"], bevel=0.025)
    for index, x in enumerate([-1.9, 0, 1.9]):
        cube(f"ProjectDisplayRack_Screen_{index}", group, (x, 1.82, 0.22), (1.34, 1.12, 0.08), [mats["screen"], mats["mint"], mats["purple"]][index], bevel=0.012)
        cube(f"ProjectDisplayRack_LowerCard_{index}", group, (x, 0.86, -0.42), (1.12, 0.42, 0.08), [mats["paper"], mats["amber"], mats["aqua"]][index], bevel=0.008)
        for line in range(3):
            cube(f"ProjectDisplayRack_Line_{index}_{line}", group, (x, 1.48 + line * 0.22, 0.16), (0.78 - line * 0.12, 0.045, 0.055), mats["paper" if line == 1 else "aqua"], bevel=0.004)
    cube("ProjectDisplayRack_Header", group, (0, 3.34, 0.36), (4.7, 0.18, 0.18), mats["wood"], bevel=0.018)
    cube("ProjectDisplayRack_HeaderGlow", group, (0, 3.18, 0.18), (3.9, 0.08, 0.055), mats["amber"], bevel=0.004)
    for x in [-2.7, 2.7]:
        cube("ProjectDisplayRack_SideLamp", group, (x, 2.62, 0.16), (0.32, 0.28, 0.08), mats["mint"], bevel=0.018)


def create_project_parts_cart(mats):
    group = root("EnvPolishProjectPartsCart")
    cube("ProjectPartsCart_Deck", group, (0, 0.58, 0), (3.9, 0.28, 2.15), mats["wood"], bevel=0.035)
    for x in [-1.45, 1.45]:
        for z in [-0.75, 0.75]:
            cube("ProjectPartsCart_Wheel", group, (x, 0.24, z), (0.44, 0.44, 0.2), mats["rubber"], rot=(0, 0.28, 0), bevel=0.05)
    cube("ProjectPartsCart_Handle", group, (-2.12, 1.08, 0), (0.14, 1.28, 1.6), mats["dark"], bevel=0.014)
    cube("ProjectPartsCart_LongBox", group, (-0.82, 1.02, -0.24), (1.38, 0.62, 0.82), mats["stone"], rot=(0, 0.12, 0), bevel=0.03)
    cube("ProjectPartsCart_ToolBox", group, (0.72, 1.02, 0.18), (1.24, 0.58, 0.78), mats["pink"], rot=(0, -0.16, 0), bevel=0.03)
    cube("ProjectPartsCart_ScreenCase", group, (1.32, 1.42, -0.46), (0.78, 0.52, 0.08), mats["screen"], bevel=0.01)
    for x in [-1.15, -0.35, 0.48, 1.2]:
        cube("ProjectPartsCart_Tool", group, (x, 1.36, 0.84), (0.54, 0.08, 0.08), mats["mint" if x > 0 else "amber"], bevel=0.004)


def create_project_cable_reel(mats):
    group = root("EnvPolishProjectCableReel")
    cube("ProjectCableReel_Axle", group, (0, 0.72, 0), (2.2, 0.18, 0.18), mats["dark"], bevel=0.018)
    for x in [-1.12, 1.12]:
        cube("ProjectCableReel_Side", group, (x, 0.72, 0), (0.18, 1.62, 1.62), mats["wood"], bevel=0.08)
    for y in [0.36, 0.72, 1.08]:
        cube("ProjectCableReel_CableBand", group, (0, y, 0), (2.0, 0.18, 1.1), mats["rope"], bevel=0.055)
    cube("ProjectCableReel_GlowTag", group, (0, 1.48, -0.62), (1.1, 0.18, 0.08), mats["mint"], bevel=0.006)
    cube("ProjectCableReel_LooseCableA", group, (-0.15, 0.2, -1.18), (2.6, 0.1, 0.12), mats["rope"], rot=(0, 0.18, 0), bevel=0.014)
    cube("ProjectCableReel_LooseCableB", group, (1.18, 0.18, -1.55), (1.4, 0.1, 0.12), mats["rope"], rot=(0, -0.42, 0), bevel=0.014)


def create_campus_fountain(mats):
    group = root("EnvPolishCampusFountain")
    cube("CampusFountain_Base", group, (0, 0.14, 0), (4.6, 0.28, 4.6), mats["stone"], bevel=0.08)
    cube("CampusFountain_Basin", group, (0, 0.48, 0), (3.6, 0.52, 3.6), mats["stone"], bevel=0.12)
    cube("CampusFountain_Water", group, (0, 0.78, 0), (3.05, 0.08, 3.05), mats["glass"], bevel=0.06)
    cube("CampusFountain_Platform", group, (0, 0.92, 0), (1.26, 0.28, 1.26), mats["stone_shadow"], bevel=0.05)
    cube("CampusFountain_Core", group, (0, 1.55, 0), (0.52, 1.28, 0.52), mats["brick"], bevel=0.035)
    cube("CampusFountain_Top", group, (0, 2.3, 0), (1.1, 0.24, 1.1), mats["stone"], bevel=0.05)
    for angle in [0, math.pi * 0.5, math.pi, math.pi * 1.5]:
        x = math.sin(angle) * 1.02
        z = math.cos(angle) * 1.02
        cube("CampusFountain_WaterJet", group, (x, 1.38, z), (0.08, 1.02, 0.08), mats["aqua"], rot=(0.18, angle, 0), bevel=0.005)
        cube("CampusFountain_GlowTile", group, (x * 1.72, 0.94, z * 1.72), (0.52, 0.08, 0.12), mats["mint"], rot=(0, angle, 0), bevel=0.006)


def create_campus_notice_board(mats):
    group = root("EnvPolishCampusNoticeBoard")
    cube("CampusNoticeBoard_Base", group, (0, 0.12, 0), (4.7, 0.24, 1.1), mats["stone"], bevel=0.035)
    for x in [-1.85, 1.85]:
        cube("CampusNoticeBoard_Post", group, (x, 1.48, 0), (0.2, 2.7, 0.2), mats["dark"], bevel=0.014)
    cube("CampusNoticeBoard_Back", group, (0, 1.75, -0.06), (4.25, 2.05, 0.16), mats["brick"], bevel=0.026)
    cube("CampusNoticeBoard_Header", group, (0, 2.92, -0.12), (4.65, 0.28, 0.26), mats["wood"], bevel=0.025)
    cube("CampusNoticeBoard_HeaderGlow", group, (0, 2.7, -0.23), (3.6, 0.08, 0.055), mats["mint"], bevel=0.004)
    for index, (x, y, material) in enumerate([(-1.18, 1.45, "paper"), (-0.28, 1.78, "screen"), (0.62, 1.42, "amber"), (1.28, 1.86, "paper")]):
        cube(f"CampusNoticeBoard_Card_{index}", group, (x, y, -0.18), (0.72, 0.5, 0.055), mats[material], rot=(0, 0, 0.08 - index * 0.05), bevel=0.006)
    cube("CampusNoticeBoard_PathArrow", group, (0, 0.42, -0.62), (1.4, 0.08, 0.16), mats["aqua"], bevel=0.006)


def create_campus_walkway_pavilion(mats):
    group = root("EnvPolishCampusWalkwayPavilion")
    cube("CampusPavilion_Deck", group, (0, 0.12, 0), (6.8, 0.24, 3.0), mats["paper"], bevel=0.04)
    for x in [-2.7, -0.9, 0.9, 2.7]:
        cube("CampusPavilion_Column", group, (x, 1.58, 0), (0.28, 2.9, 0.28), mats["brick"], bevel=0.025)
        cube("CampusPavilion_Lantern", group, (x, 2.38, -0.34), (0.3, 0.24, 0.08), mats["amber"], bevel=0.014)
    cube("CampusPavilion_Beam", group, (0, 3.08, 0), (7.25, 0.36, 0.42), mats["wood"], bevel=0.035)
    cube("CampusPavilion_GlowStrip", group, (0, 2.82, -0.26), (5.8, 0.08, 0.06), mats["mint"], bevel=0.004)
    for x in [-2.05, 0, 2.05]:
        cube("CampusPavilion_PathStone", group, (x, 0.25, -1.15), (1.15, 0.08, 0.58), mats["stone"], rot=(0, 0.12 * x, 0), bevel=0.025)


def create_campus_study_bench(mats):
    group = root("EnvPolishCampusStudyBench")
    cube("CampusStudyBench_Planter", group, (0, 0.28, 0), (4.9, 0.56, 1.35), mats["stone"], bevel=0.04)
    cube("CampusStudyBench_SeatA", group, (-1.25, 0.78, -0.36), (1.8, 0.22, 0.52), mats["wood"], bevel=0.025)
    cube("CampusStudyBench_SeatB", group, (1.25, 0.78, 0.36), (1.8, 0.22, 0.52), mats["wood"], bevel=0.025)
    cube("CampusStudyBench_Table", group, (0, 0.94, 0), (1.05, 0.2, 0.82), mats["paper"], bevel=0.022)
    cube("CampusStudyBench_OpenBook", group, (-0.2, 1.1, -0.05), (0.68, 0.08, 0.44), mats["paper"], rot=(0, 0.14, 0), bevel=0.006)
    cube("CampusStudyBench_Screen", group, (0.56, 1.18, 0.08), (0.5, 0.34, 0.055), mats["screen"], rot=(0, -0.18, 0), bevel=0.006)
    for x in [-1.9, -1.32, 1.32, 1.9]:
        cone("CampusStudyBench_GrassBlade", group, (x, 0.92, 0.08), 0.08, 0.7, mats["leaf"], vertices=5, rot=(0.18, x * 0.24, 0.05))
        cube("CampusStudyBench_Flower", group, (x, 1.25, -0.14), (0.16, 0.12, 0.14), mats["flower"], bevel=0.016)


def create_cv_vault(mats):
    group = root("EnvPolishCvVault")
    cube("CvVault_Base", group, (0, 0.12, 0), (4.4, 0.24, 3.2), mats["stone"], bevel=0.045)
    cube("CvVault_Back", group, (0, 1.4, 1.15), (4.0, 2.3, 0.32), mats["stone_shadow"], bevel=0.04)
    cube("CvVault_Door", group, (0, 1.08, -0.48), (1.55, 1.8, 0.18), mats["dark"], bevel=0.035)
    cube("CvVault_DoorGlow", group, (0, 1.08, -0.59), (1.18, 1.36, 0.06), mats["screen"], bevel=0.012)
    for i, x in enumerate([-1.38, -0.46, 0.46, 1.38]):
        cube(f"CvVault_File_{i}", group, (x, 1.82, 0.92), (0.54, 0.72, 0.08), mats["paper"], rot=(0, 0, 0.08 - i * 0.04), bevel=0.008)
    cube("CvVault_HeaderGlow", group, (0, 2.64, 0.98), (3.2, 0.1, 0.08), mats["mint"], bevel=0.006)


def create_skills_array(mats):
    group = root("EnvPolishSkillsArray")
    cube("SkillsArray_Base", group, (0, 0.12, 0), (5.0, 0.24, 2.2), mats["stone_shadow"], bevel=0.035)
    for i, x in enumerate([-1.9, -0.95, 0, 0.95, 1.9]):
        cube(f"SkillsArray_Pillar_{i}", group, (x, 1.12 + i * 0.08, 0), (0.46, 1.95 + i * 0.16, 0.46), mats["dark"], bevel=0.025)
        cube(f"SkillsArray_Screen_{i}", group, (x, 1.18 + i * 0.08, -0.27), (0.34, 1.22, 0.06), [mats["screen"], mats["mint"], mats["purple"], mats["aqua"], mats["screen"]][i], bevel=0.006)
    cube("SkillsArray_CableRun", group, (0, 0.44, 0.76), (4.4, 0.12, 0.16), mats["rope"], bevel=0.015)


def create_career_office(mats):
    group = root("EnvPolishCareerOffice")
    cube("CareerOffice_Deck", group, (0, 0.14, 0), (4.8, 0.28, 3.2), mats["stone"], bevel=0.04)
    cube("CareerOffice_Core", group, (0, 1.22, 0.22), (3.4, 2.1, 1.74), mats["stone_shadow"], bevel=0.035)
    cube("CareerOffice_Window", group, (0, 1.38, -0.68), (2.48, 1.08, 0.08), mats["glass"], bevel=0.012)
    cube("CareerOffice_Roof", group, (0, 2.42, 0.18), (3.9, 0.28, 2.12), mats["wood"], bevel=0.035)
    cube("CareerOffice_SignalMast", group, (1.72, 3.05, -0.24), (0.16, 1.62, 0.16), mats["dark"], bevel=0.012)
    cube("CareerOffice_SignalBar", group, (1.72, 3.68, -0.24), (1.08, 0.1, 0.1), mats["purple"], bevel=0.008)


def create_awards_monument(mats):
    group = root("EnvPolishAwardsMonument")
    cube("AwardsMonument_Step0", group, (0, 0.14, 0), (4.8, 0.28, 3.4), mats["stone"], bevel=0.04)
    cube("AwardsMonument_Step1", group, (0, 0.42, 0), (3.6, 0.28, 2.42), mats["paper"], bevel=0.035)
    cube("AwardsMonument_Plinth", group, (0, 0.92, 0), (1.42, 0.74, 1.22), mats["stone_shadow"], bevel=0.035)
    cube("AwardsMonument_Cup", group, (0, 1.55, 0), (1.05, 0.8, 0.72), mats["gold"], bevel=0.08)
    cube("AwardsMonument_Stem", group, (0, 2.15, 0), (0.28, 0.66, 0.28), mats["gold"], bevel=0.035)
    cube("AwardsMonument_Glow", group, (0, 2.54, -0.08), (1.2, 0.18, 0.18), mats["amber"], bevel=0.018)


def create_todo_board(mats):
    group = root("EnvPolishTodoBoard")
    cube("TodoBoard_Base", group, (0, 0.14, 0), (4.5, 0.28, 1.4), mats["stone"], bevel=0.035)
    cube("TodoBoard_Back", group, (0, 1.48, 0.32), (4.0, 2.35, 0.28), mats["dark"], bevel=0.03)
    for i, (x, y) in enumerate([(-1.2, 1.05), (0, 1.3), (1.18, 1.05), (-0.58, 1.86), (0.88, 1.9)]):
        cube(f"TodoBoard_Card_{i}", group, (x, y, 0.12), (0.82, 0.48, 0.06), [mats["paper"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][i], rot=(0, 0, 0.08 - i * 0.04), bevel=0.008)
    cube("TodoBoard_Header", group, (0, 2.72, 0.18), (3.2, 0.1, 0.08), mats["purple"], bevel=0.006)


def create_document_arcade(mats):
    group = root("EnvPolishDocumentArcade")
    cube("DocumentArcade_Floor", group, (0, 0.14, 0), (8.6, 0.28, 3.4), mats["stone"], bevel=0.045)
    for x in [-3.55, -1.18, 1.18, 3.55]:
        cube("DocumentArcade_Column", group, (x, 1.55, -0.88), (0.34, 2.82, 0.34), mats["stone_shadow"], bevel=0.025)
        cube("DocumentArcade_Lamp", group, (x, 2.66, -1.1), (0.36, 0.26, 0.08), mats["mint"], bevel=0.014)
    cube("DocumentArcade_BackWall", group, (0, 1.52, 1.12), (8.3, 2.55, 0.28), mats["stone_shadow"], bevel=0.04)
    cube("DocumentArcade_Roof", group, (0, 3.08, 0.06), (9.1, 0.34, 3.92), mats["wood"], bevel=0.045)
    cube("DocumentArcade_HeaderGlow", group, (0, 2.84, -1.94), (7.2, 0.09, 0.075), mats["screen"], bevel=0.006)
    for index, x in enumerate([-2.95, -1.78, -0.58, 0.58, 1.78, 2.95]):
        material = [mats["paper"], mats["foam"], mats["paper"], mats["amber"], mats["paper"], mats["mint"]][index]
        cube(f"DocumentArcade_File_{index}", group, (x, 1.5 + (index % 2) * 0.26, 0.88), (0.72, 0.78, 0.07), material, rot=(0, 0, 0.08 - index * 0.025), bevel=0.006)
    for x in [-3.1, 3.1]:
        cube("DocumentArcade_Step", group, (x, 0.36, -1.72), (1.8, 0.18, 0.56), mats["paper"], bevel=0.025)


def create_terminal_canopy(mats):
    group = root("EnvPolishTerminalCanopy")
    cube("TerminalCanopy_Deck", group, (0, 0.14, 0), (7.8, 0.28, 4.2), mats["stone_shadow"], bevel=0.045)
    for x in [-3.25, 3.25]:
        for z in [-1.55, 1.55]:
            cube("TerminalCanopy_Post", group, (x, 1.72, z), (0.26, 3.15, 0.26), mats["dark"], bevel=0.018)
            cube("TerminalCanopy_PostGlow", group, (x, 1.72, z - 0.16), (0.08, 2.35, 0.055), mats["screen"], bevel=0.004)
    cube("TerminalCanopy_Roof", group, (0, 3.34, 0), (8.6, 0.32, 4.82), mats["dark"], bevel=0.04)
    cube("TerminalCanopy_RimGlow", group, (0, 3.12, -2.42), (7.0, 0.08, 0.07), mats["aqua"], bevel=0.004)
    for index, x in enumerate([-2.2, 0, 2.2]):
        cube(f"TerminalCanopy_HangingScreen_{index}", group, (x, 2.08, -0.52), (1.3, 1.15, 0.08), [mats["screen"], mats["purple"], mats["mint"]][index], bevel=0.012)
        cube(f"TerminalCanopy_Cable_{index}", group, (x, 2.78, -0.52), (0.08, 0.92, 0.08), mats["rope"], bevel=0.006)
    for z in [-1.35, 1.35]:
        cube("TerminalCanopy_CableRun", group, (0, 0.45, z), (6.5, 0.1, 0.12), mats["rope"], bevel=0.012)
    cube("TerminalCanopy_InputDesk", group, (0, 0.82, 1.1), (3.2, 0.42, 0.86), mats["wood"], bevel=0.025)


def create_queue_marquee(mats):
    group = root("EnvPolishQueueMarquee")
    cube("QueueMarquee_Base", group, (0, 0.16, 0), (6.2, 0.32, 2.2), mats["stone"], bevel=0.04)
    for x in [-2.65, 2.65]:
        cube("QueueMarquee_Post", group, (x, 1.86, 0), (0.3, 3.36, 0.3), mats["dark"], bevel=0.02)
        cube("QueueMarquee_FootLight", group, (x, 0.48, -0.82), (0.46, 0.18, 0.08), mats["pink"], bevel=0.012)
    cube("QueueMarquee_Board", group, (0, 2.05, -0.1), (5.55, 2.26, 0.24), mats["dark"], bevel=0.03)
    cube("QueueMarquee_Header", group, (0, 3.38, -0.18), (6.0, 0.32, 0.32), mats["wood"], bevel=0.025)
    cube("QueueMarquee_HeaderGlow", group, (0, 3.14, -0.34), (4.9, 0.08, 0.06), mats["purple"], bevel=0.004)
    card_specs = [(-1.8, 2.32, "paper"), (-0.6, 2.08, "mint"), (0.62, 2.38, "amber"), (1.82, 2.0, "aqua"), (-1.08, 1.34, "purple"), (1.06, 1.28, "paper")]
    for index, (x, y, material) in enumerate(card_specs):
        cube(f"QueueMarquee_Card_{index}", group, (x, y, -0.28), (0.88, 0.5, 0.06), mats[material], rot=(0, 0, 0.06 - index * 0.025), bevel=0.006)
    cube("QueueMarquee_Arrow", group, (0, 0.48, -1.04), (1.8, 0.1, 0.16), mats["mint"], bevel=0.006)


def create_process_crane(mats):
    group = root("EnvPolishProcessCrane")
    for x in [-3.2, 3.2]:
        cube("ProcessCrane_Foot", group, (x, 0.18, 0), (0.9, 0.36, 1.1), mats["stone_shadow"], bevel=0.035)
        cube("ProcessCrane_Post", group, (x, 2.0, 0), (0.32, 3.55, 0.32), mats["dark"], bevel=0.022)
        cube("ProcessCrane_PostGlow", group, (x, 2.0, -0.2), (0.1, 2.6, 0.055), mats["amber"], bevel=0.005)
    cube("ProcessCrane_TopBeam", group, (0, 3.76, 0), (7.1, 0.36, 0.42), mats["dark"], bevel=0.03)
    cube("ProcessCrane_RailGlow", group, (0, 3.48, -0.26), (5.8, 0.08, 0.07), mats["mint"], bevel=0.004)
    cube("ProcessCrane_Trolley", group, (0.85, 3.24, -0.02), (0.92, 0.42, 0.72), mats["wood"], bevel=0.025)
    cube("ProcessCrane_Cable", group, (0.85, 2.12, -0.02), (0.08, 1.88, 0.08), mats["rope"], bevel=0.006)
    cube("ProcessCrane_Hook", group, (0.85, 1.08, -0.02), (0.58, 0.34, 0.18), mats["amber"], bevel=0.025)
    cube("ProcessCrane_Load", group, (0.85, 0.62, 0.26), (1.5, 0.62, 0.95), mats["stone"], rot=(0, -0.18, 0), bevel=0.035)
    for x in [-1.7, 0, 1.7]:
        cube("ProcessCrane_FloorGuide", group, (x, 0.26, -1.18), (1.05, 0.08, 0.16), mats["screen"], bevel=0.004)


def create_circuit_gate(mats):
    group = root("EnvPolishCircuitGate")
    cube("CircuitGate_LeftBase", group, (-2.4, 0.2, 0), (0.74, 0.4, 0.74), mats["rubber"], bevel=0.035)
    cube("CircuitGate_RightBase", group, (2.4, 0.2, 0), (0.74, 0.4, 0.74), mats["rubber"], bevel=0.035)
    cube("CircuitGate_LeftPost", group, (-2.4, 1.9, 0), (0.34, 3.3, 0.34), mats["dark"], bevel=0.02)
    cube("CircuitGate_RightPost", group, (2.4, 1.9, 0), (0.34, 3.3, 0.34), mats["dark"], bevel=0.02)
    cube("CircuitGate_Top", group, (0, 3.55, 0), (5.35, 0.38, 0.42), mats["dark"], bevel=0.026)
    for i, x in enumerate([-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8]):
        cube(f"CircuitGate_Checker_{i}", group, (x, 3.3, -0.25), (0.48, 0.36, 0.06), mats["paper" if i % 2 else "rubber"], bevel=0.004)
    cube("CircuitGate_Glow", group, (0, 3.86, -0.28), (4.2, 0.08, 0.08), mats["amber"], bevel=0.006)


def create_stunt_checkpoint(mats):
    group = root("EnvPolishStuntCheckpoint")
    cube("StuntCheckpoint_LeftBase", group, (-3.1, 0.2, 0), (0.9, 0.4, 0.9), mats["rubber"], bevel=0.04)
    cube("StuntCheckpoint_RightBase", group, (3.1, 0.2, 0), (0.9, 0.4, 0.9), mats["rubber"], bevel=0.04)
    for x in [-3.1, 3.1]:
        cube("StuntCheckpoint_Post", group, (x, 2.0, 0), (0.42, 3.55, 0.42), mats["dark"], bevel=0.025)
        cube("StuntCheckpoint_PostGlow", group, (x, 2.0, -0.27), (0.16, 2.7, 0.055), mats["amber"], bevel=0.006)
    cube("StuntCheckpoint_Header", group, (0, 3.72, 0), (6.7, 0.48, 0.52), mats["dark"], bevel=0.03)
    for i, x in enumerate([-2.55, -1.7, -0.85, 0, 0.85, 1.7, 2.55]):
        cube(f"StuntCheckpoint_Checker_{i}", group, (x, 3.37, -0.3), (0.62, 0.38, 0.06), mats["paper" if i % 2 else "rubber"], bevel=0.004)
    cube("StuntCheckpoint_LaunchGlow", group, (0, 4.08, -0.31), (5.4, 0.09, 0.08), mats["amber"], bevel=0.006)
    for x in [-1.7, 0, 1.7]:
        cube("StuntCheckpoint_StartLamp", group, (x, 2.84, -0.32), (0.34, 0.34, 0.08), mats["pink" if x == 0 else "mint"], bevel=0.018)


def create_stunt_score_tower(mats):
    group = root("EnvPolishStuntScoreTower")
    cube("StuntScoreTower_Base", group, (0, 0.2, 0), (2.2, 0.4, 1.7), mats["stone_shadow"], bevel=0.04)
    cube("StuntScoreTower_Mast", group, (0, 2.0, 0.35), (0.42, 3.25, 0.42), mats["dark"], bevel=0.025)
    cube("StuntScoreTower_Board", group, (0, 2.75, -0.18), (4.4, 1.7, 0.22), mats["dark"], bevel=0.035)
    cube("StuntScoreTower_Screen", group, (0, 2.78, -0.34), (3.7, 1.12, 0.08), mats["screen"], bevel=0.012)
    for i, y in enumerate([2.4, 2.75, 3.1]):
        cube(f"StuntScoreTower_Line_{i}", group, (0, y, -0.4), (2.5 - i * 0.36, 0.06, 0.055), mats["mint" if i % 2 else "amber"], bevel=0.004)
    cube("StuntScoreTower_Roof", group, (0, 3.74, -0.12), (4.9, 0.26, 0.56), mats["wood"], bevel=0.025)
    for x in [-2.3, 2.3]:
        cube("StuntScoreTower_FlagPole", group, (x, 4.18, -0.12), (0.08, 0.86, 0.08), mats["dark"], bevel=0.006)
        cube("StuntScoreTower_Flag", group, (x + 0.34, 4.36, -0.12), (0.62, 0.34, 0.05), mats["pink" if x < 0 else "amber"], bevel=0.004)


def create_stunt_arrow_fence(mats):
    group = root("EnvPolishStuntArrowFence")
    cube("StuntArrowFence_LeftFoot", group, (-2.4, 0.16, 0), (0.76, 0.32, 0.76), mats["rubber"], bevel=0.03)
    cube("StuntArrowFence_RightFoot", group, (2.4, 0.16, 0), (0.76, 0.32, 0.76), mats["rubber"], bevel=0.03)
    cube("StuntArrowFence_Rail", group, (0, 0.86, 0), (5.7, 0.28, 0.28), mats["wood"], bevel=0.025)
    cube("StuntArrowFence_Back", group, (0, 1.42, -0.04), (4.8, 0.78, 0.16), mats["dark"], bevel=0.025)
    for i, x in enumerate([-1.56, -0.52, 0.52, 1.56]):
        cube(f"StuntArrowFence_Arrow_{i}", group, (x, 1.42, -0.16), (0.64, 0.46, 0.055), mats["amber" if i % 2 else "mint"], rot=(0, 0, -0.32), bevel=0.006)
    for x in [-2.9, 2.9]:
        cube("StuntArrowFence_Cone", group, (x, 0.52, -0.62), (0.42, 0.78, 0.42), mats["amber"], bevel=0.025)


def create_build_workbench(mats):
    group = root("EnvPolishBuildWorkbench")
    cube("BuildWorkbench_Table", group, (0, 0.82, 0), (4.4, 0.32, 1.8), mats["wood"], bevel=0.035)
    for x in [-1.72, 1.72]:
        cube("BuildWorkbench_Leg", group, (x, 0.42, -0.58), (0.2, 0.82, 0.2), mats["dark"], bevel=0.012)
        cube("BuildWorkbench_Leg", group, (x, 0.42, 0.58), (0.2, 0.82, 0.2), mats["dark"], bevel=0.012)
    cube("BuildWorkbench_Monitor", group, (-1.05, 1.54, -0.35), (1.36, 0.88, 0.08), mats["screen"], bevel=0.012)
    cube("BuildWorkbench_Toolbox", group, (1.15, 1.1, 0.1), (1.1, 0.52, 0.72), mats["pink"], bevel=0.025)
    for i, x in enumerate([-1.78, -0.72, 0.48, 1.78]):
        cube(f"BuildWorkbench_Tool_{i}", group, (x, 1.12, 0.72), (0.52, 0.08, 0.08), mats["mint" if i % 2 else "amber"], bevel=0.004)


def create_build_crate_stack(mats):
    group = root("EnvPolishBuildCrateStack")
    cube("BuildCrateStack_Pallet", group, (0, 0.12, 0), (3.8, 0.24, 1.9), mats["wood"], bevel=0.028)
    crate_specs = [
        (-1.15, 0.6, -0.25, 1.25, 0.92, 1.05, -0.08, "stone_shadow"),
        (0.08, 0.52, 0.22, 1.08, 0.78, 0.92, 0.16, "wood"),
        (1.05, 0.72, -0.18, 1.32, 1.12, 1.0, -0.18, "stone"),
        (0.28, 1.32, -0.16, 0.86, 0.62, 0.82, 0.12, "dark"),
    ]
    for index, (x, y, z, sx, sy, sz, rot, material) in enumerate(crate_specs):
        cube(f"BuildCrateStack_Crate_{index}", group, (x, y, z), (sx, sy, sz), mats[material], rot=(0, rot, 0), bevel=0.035)
    cube("BuildCrateStack_StripeAmber", group, (-1.15, 1.08, -0.82), (1.0, 0.08, 0.065), mats["amber"], rot=(0, -0.08, 0), bevel=0.004)
    cube("BuildCrateStack_StripeMint", group, (1.05, 1.26, -0.76), (1.08, 0.08, 0.065), mats["mint"], rot=(0, -0.18, 0), bevel=0.004)
    cube("BuildCrateStack_Cable", group, (0.1, 0.32, 0.84), (3.05, 0.1, 0.12), mats["rope"], rot=(0, 0.06, 0), bevel=0.014)
    for x in [-1.62, -0.54, 0.54, 1.62]:
        cube("BuildCrateStack_FootGlow", group, (x, 0.28, -1.02), (0.34, 0.12, 0.08), mats["screen"], bevel=0.006)


def create_farm_irrigator(mats):
    group = root("EnvPolishFarmIrrigator")
    cube("FarmIrrigator_PumpBase", group, (0, 0.24, 0), (1.5, 0.48, 1.1), mats["stone_shadow"], bevel=0.035)
    cube("FarmIrrigator_Tank", group, (0, 1.02, 0), (1.0, 1.0, 0.82), mats["aqua"], bevel=0.08)
    cube("FarmIrrigator_Boom", group, (0, 1.62, -0.02), (5.2, 0.12, 0.12), mats["rope"], bevel=0.012)
    for x in [-2.2, -1.1, 0, 1.1, 2.2]:
        cube("FarmIrrigator_Spray", group, (x, 1.28, -0.12), (0.08, 0.64, 0.08), mats["glass"], bevel=0.004)
        cube("FarmIrrigator_Crop", group, (x, 0.45, 0.58), (0.28, 0.72, 0.28), mats["crop"], bevel=0.012)


def create_harbor_signal(mats):
    group = root("EnvPolishHarborSignal")
    cube("HarborSignal_Base", group, (0, 0.18, 0), (2.0, 0.36, 1.6), mats["stone"], bevel=0.04)
    cube("HarborSignal_Tower", group, (0, 1.45, 0), (0.72, 2.5, 0.72), mats["stone_shadow"], bevel=0.035)
    cube("HarborSignal_Lantern", group, (0, 2.88, -0.08), (1.08, 0.62, 0.82), mats["glass"], bevel=0.035)
    cube("HarborSignal_Roof", group, (0, 3.32, 0), (1.42, 0.26, 1.12), mats["wood"], bevel=0.03)
    cube("HarborSignal_Beam", group, (0, 2.88, -0.58), (2.5, 0.08, 0.08), mats["mint"], bevel=0.006)


def create_harbor_pier(mats):
    group = root("EnvPolishHarborPier")
    cube("HarborPier_Spine", group, (0, 0.34, 0), (2.2, 0.26, 8.4), mats["wood"], bevel=0.035)
    for index, z in enumerate([-3.45, -2.3, -1.15, 0.0, 1.15, 2.3, 3.45]):
        cube(f"HarborPier_Plank_{index}", group, (0, 0.54, z), (3.3, 0.16, 0.42), mats["wood"], bevel=0.025)
    for x in [-1.82, 1.82]:
        cube("HarborPier_Pontoon", group, (x, 0.2, 0), (0.46, 0.4, 7.8), mats["foam"], bevel=0.08)
        for z in [-3.2, -1.05, 1.05, 3.2]:
            cube("HarborPier_RopePost", group, (x, 1.03, z), (0.16, 0.9, 0.16), mats["rope"], bevel=0.014)
            cube("HarborPier_RopeLight", group, (x, 1.52, z), (0.34, 0.18, 0.34), mats["screen"], bevel=0.018)
    for z in [-2.3, 0.0, 2.3]:
        cube("HarborPier_LeftRope", group, (-1.82, 1.18, z), (0.12, 0.1, 1.55), mats["rope"], bevel=0.01)
        cube("HarborPier_RightRope", group, (1.82, 1.18, z), (0.12, 0.1, 1.55), mats["rope"], bevel=0.01)
    cube("HarborPier_EndGlow", group, (0, 0.72, -4.35), (2.55, 0.08, 0.08), mats["mint"], bevel=0.006)
    cube("HarborPier_DockSign", group, (0, 1.25, 3.72), (2.65, 0.62, 0.12), mats["dark"], bevel=0.018)
    cube("HarborPier_DockSignLine", group, (0, 1.25, 3.63), (1.72, 0.08, 0.06), mats["amber"], bevel=0.004)


def create_harbor_antenna(mats):
    group = root("EnvPolishHarborAntenna")
    cube("HarborAntenna_Base", group, (0, 0.18, 0), (1.8, 0.36, 1.8), mats["stone_shadow"], bevel=0.04)
    cube("HarborAntenna_Mast", group, (0, 2.15, 0), (0.22, 3.85, 0.22), mats["dark"], bevel=0.018)
    cube("HarborAntenna_Crossbar", group, (0, 3.45, 0), (2.5, 0.12, 0.12), mats["dark"], bevel=0.008)
    cube("HarborAntenna_SignalPanel", group, (-0.72, 2.4, -0.18), (0.9, 1.0, 0.08), mats["screen"], rot=(0, 0.22, 0), bevel=0.012)
    cone("HarborAntenna_Dish", group, (0.94, 2.62, -0.16), 0.78, 0.3, mats["foam"], vertices=16, rot=(math.pi / 2, 0.0, -0.35))
    cube("HarborAntenna_DishCore", group, (0.94, 2.62, -0.42), (0.22, 0.22, 0.2), mats["mint"], bevel=0.02)
    for index, y in enumerate([1.1, 1.7, 2.3, 2.9, 3.5]):
        cube(f"HarborAntenna_Ladder_{index}", group, (0, y, 0.18), (0.76, 0.08, 0.08), mats["rope"], bevel=0.004)
    cube("HarborAntenna_TopBeacon", group, (0, 4.22, 0), (0.46, 0.28, 0.46), mats["amber"], bevel=0.04)


def create_harbor_cargo_stack(mats):
    group = root("EnvPolishHarborCargoStack")
    cube("HarborCargo_Pallet", group, (0, 0.12, 0), (3.6, 0.24, 2.0), mats["wood"], bevel=0.028)
    cargo = [
        (-0.95, 0.56, -0.32, 1.1, 0.88, 0.92, "aqua", -0.08),
        (0.18, 0.5, 0.2, 1.24, 0.74, 0.9, "stone", 0.14),
        (1.08, 0.76, -0.2, 1.0, 1.12, 0.86, "screen", -0.12),
        (-0.1, 1.18, -0.32, 0.82, 0.6, 0.76, "dark", 0.06),
    ]
    for index, (x, y, z, sx, sy, sz, material, rot_y) in enumerate(cargo):
        cube(f"HarborCargo_Crate_{index}", group, (x, y, z), (sx, sy, sz), mats[material], rot=(0, rot_y, 0), bevel=0.035)
    cube("HarborCargo_RopeCoilA", group, (-1.42, 0.52, 0.78), (0.74, 0.16, 0.74), mats["rope"], bevel=0.08)
    cube("HarborCargo_RopeCoilB", group, (-1.42, 0.72, 0.78), (0.5, 0.12, 0.5), mats["rope"], bevel=0.06)
    cube("HarborCargo_Buoy", group, (1.42, 0.62, 0.72), (0.54, 0.74, 0.54), mats["foam"], bevel=0.08)
    cube("HarborCargo_BuoyBand", group, (1.42, 0.62, 0.72), (0.62, 0.16, 0.62), mats["pink"], bevel=0.025)


def create_harbor_shade(mats):
    group = root("EnvPolishHarborShade")
    cube("HarborShade_Deck", group, (0, 0.14, 0), (4.6, 0.28, 2.7), mats["stone"], bevel=0.04)
    for x in [-1.82, 1.82]:
        for z in [-0.92, 0.92]:
            cube("HarborShade_Post", group, (x, 1.35, z), (0.18, 2.35, 0.18), mats["wood"], bevel=0.014)
    cube("HarborShade_Roof", group, (0, 2.62, 0), (5.05, 0.26, 3.05), mats["wood"], bevel=0.035)
    cube("HarborShade_Terminal", group, (-0.92, 1.05, -0.72), (1.25, 1.35, 0.1), mats["screen"], rot=(0, -0.12, 0), bevel=0.012)
    cube("HarborShade_Bench", group, (1.05, 0.68, 0.62), (2.05, 0.22, 0.52), mats["wood"], bevel=0.025)
    cube("HarborShade_GlowStrip", group, (0, 2.42, -1.58), (3.8, 0.08, 0.08), mats["mint"], bevel=0.006)


def create_district_gateway(mats):
    group = root("EnvPolishDistrictGateway")
    for x in [-3.9, 3.9]:
        cube("DistrictGateway_Foot", group, (x, 0.18, 0), (1.02, 0.36, 1.18), mats["stone_shadow"], bevel=0.045)
        cube("DistrictGateway_Pillar", group, (x, 1.9, 0), (0.42, 3.35, 0.42), mats["dark"], bevel=0.03)
        cube("DistrictGateway_SideGlow", group, (x, 1.95, -0.25), (0.15, 2.55, 0.055), mats["screen"], bevel=0.006)
        cube("DistrictGateway_Lamp", group, (x, 3.7, -0.04), (0.62, 0.28, 0.62), mats["amber"], bevel=0.05)
    cube("DistrictGateway_Header", group, (0, 3.78, 0), (8.2, 0.42, 0.52), mats["dark"], bevel=0.035)
    cube("DistrictGateway_HeaderGlow", group, (0, 3.48, -0.3), (6.7, 0.09, 0.075), mats["mint"], bevel=0.006)
    cube("DistrictGateway_Crest", group, (0, 4.18, -0.02), (1.0, 0.45, 0.32), mats["gold"], bevel=0.04)
    for i, x in enumerate([-2.8, -1.88, -0.94, 0, 0.94, 1.88, 2.8]):
        cube(f"DistrictGateway_Tile_{i}", group, (x, 3.83, -0.31), (0.55, 0.26, 0.055), mats["paper" if i % 2 else "rubber"], bevel=0.004)
    for x in [-2.25, 2.25]:
        cube("DistrictGateway_RoadEdgeMarker", group, (x, 0.33, -0.9), (0.42, 0.24, 1.15), mats["foam"], bevel=0.025)


def create_route_lantern(mats):
    group = root("EnvPolishRouteLantern")
    cube("RouteLantern_Base", group, (0, 0.14, 0), (1.15, 0.28, 1.15), mats["stone"], bevel=0.035)
    cube("RouteLantern_Post", group, (0, 1.32, 0), (0.18, 2.36, 0.18), mats["dark"], bevel=0.018)
    cube("RouteLantern_SignArm", group, (0.54, 2.24, 0), (1.18, 0.12, 0.12), mats["dark"], bevel=0.008)
    cube("RouteLantern_Panel", group, (1.05, 2.24, -0.02), (0.86, 0.42, 0.06), mats["screen"], bevel=0.012)
    cube("RouteLantern_Lamp", group, (0, 2.72, 0), (0.52, 0.34, 0.52), mats["amber"], bevel=0.05)
    cube("RouteLantern_Halo", group, (0, 2.72, -0.02), (0.76, 0.08, 0.76), mats["mint"], bevel=0.035)
    for y in [0.78, 1.16, 1.54]:
        cube("RouteLantern_CableRing", group, (0, y, 0), (0.38, 0.055, 0.38), mats["rope"], bevel=0.012)


def create_coast_rock_cluster(mats):
    group = root("EnvPolishCoastRockCluster")
    rock_specs = [
        ("CoastRock_Main", (-0.38, 0.34, 0.0), (0.92, 0.46, 0.62), (0.1, 0.35, -0.08), mats["stone_shadow"]),
        ("CoastRock_Left", (-1.08, 0.26, 0.32), (0.54, 0.34, 0.44), (-0.16, -0.22, 0.14), mats["stone"]),
        ("CoastRock_Right", (0.54, 0.24, -0.42), (0.62, 0.3, 0.42), (0.08, 0.72, 0.2), mats["stone_shadow"]),
        ("CoastRock_Front", (0.86, 0.18, 0.3), (0.42, 0.22, 0.32), (-0.12, -0.4, 0.06), mats["stone"]),
        ("CoastRock_Pebble", (-0.18, 0.13, -0.72), (0.3, 0.16, 0.22), (0.22, 0.2, -0.18), mats["stone"]),
    ]
    for name, loc, scale, rot, material in rock_specs:
        rock_blob(name, group, loc, scale, material, rot)
    cube("CoastRock_FoamLine", group, (0.12, 0.08, -0.98), (2.1, 0.055, 0.14), mats["foam"], rot=(0, 0.1, 0), bevel=0.012)
    for x in [-0.72, -0.28, 0.28, 0.72]:
        cone("CoastRock_GrassBlade", group, (x, 0.36, 0.82), 0.09, 0.72, mats["leaf"], vertices=5, rot=(0.16, x * 0.24, 0.05))


def create_beach_grass_clump(mats):
    group = root("EnvPolishBeachGrassClump")
    cube("BeachGrass_SandBase", group, (0, 0.06, 0), (1.8, 0.12, 0.82), mats["stone"], bevel=0.035)
    for index, x in enumerate([-0.72, -0.42, -0.16, 0.12, 0.38, 0.68]):
        cone("BeachGrass_Blade", group, (x, 0.42 + index * 0.015, 0.02 + math.sin(index) * 0.16), 0.095, 0.74 + index * 0.035, mats["leaf"], vertices=5, rot=(0.2, x * 0.35, -0.06 + index * 0.02))
    for x in [-0.5, 0.05, 0.54]:
        cube("BeachGrass_Flower", group, (x, 0.82, -0.18), (0.14, 0.12, 0.14), mats["flower"], bevel=0.018)


def create_terminal_bank(mats):
    group = root("EnvPolishTerminalBank")
    cube("TerminalBank_Base", group, (0, 0.14, 0), (5.4, 0.28, 1.45), mats["stone_shadow"], bevel=0.04)
    for index, x in enumerate([-1.75, 0, 1.75]):
        cube(f"TerminalBank_Post_{index}", group, (x, 1.42, 0.18), (0.22, 2.42, 0.22), mats["dark"], bevel=0.018)
        cube(f"TerminalBank_Screen_{index}", group, (x, 1.52, -0.2), (1.28, 1.56, 0.08), [mats["screen"], mats["mint"], mats["purple"]][index], rot=(0, 0.04 * (index - 1), 0), bevel=0.012)
        for line in range(3):
            cube(f"TerminalBank_Line_{index}_{line}", group, (x, 1.12 + line * 0.33, -0.255), (0.72 - line * 0.08, 0.045, 0.055), mats["paper" if line == 1 else "aqua"], bevel=0.004)
    cube("TerminalBank_Header", group, (0, 2.68, -0.08), (4.8, 0.22, 0.22), mats["dark"], bevel=0.018)
    cube("TerminalBank_HeaderGlow", group, (0, 2.48, -0.22), (4.1, 0.08, 0.06), mats["mint"], bevel=0.004)
    cube("TerminalBank_CableRun", group, (0, 0.42, 0.62), (4.6, 0.1, 0.13), mats["rope"], bevel=0.012)
    for x in [-2.25, 2.25]:
        cube("TerminalBank_SideLamp", group, (x, 2.2, -0.18), (0.32, 0.28, 0.08), mats["amber"], bevel=0.018)


def create_archive_step_cluster(mats):
    group = root("EnvPolishArchiveStepCluster")
    step_specs = [
        (0, 0.14, 0.62, 5.8, 0.28, 2.4, "stone"),
        (0, 0.42, 0.18, 4.6, 0.28, 1.75, "paper"),
        (0, 0.7, -0.16, 3.3, 0.28, 1.22, "stone_shadow"),
    ]
    for index, (x, y, z, sx, sy, sz, material) in enumerate(step_specs):
        cube(f"ArchiveStepCluster_Step_{index}", group, (x, y, z), (sx, sy, sz), mats[material], bevel=0.035)
    for index, x in enumerate([-1.55, -0.52, 0.52, 1.55]):
        cube(f"ArchiveStepCluster_Card_{index}", group, (x, 1.06 + index * 0.04, -0.82), (0.64, 0.52, 0.08), [mats["gold"], mats["paper"], mats["mint"], mats["amber"]][index], rot=(0, 0, 0.08 - index * 0.05), bevel=0.008)
    cube("ArchiveStepCluster_Trophy", group, (0, 1.38, -0.06), (0.92, 0.78, 0.66), mats["gold"], bevel=0.07)
    cube("ArchiveStepCluster_Glow", group, (0, 1.88, -0.46), (1.55, 0.12, 0.08), mats["amber"], bevel=0.006)
    for x in [-2.5, 2.5]:
        cube("ArchiveStepCluster_SideLight", group, (x, 0.9, -0.64), (0.24, 0.42, 0.08), mats["purple"], bevel=0.014)


def create_todo_card_stack(mats):
    group = root("EnvPolishTodoCardStack")
    cube("TodoCardStack_Base", group, (0, 0.12, 0), (4.2, 0.24, 1.3), mats["stone"], bevel=0.035)
    card_specs = [
        (-1.4, 0.84, -0.08, 0.96, 1.12, "paper", -0.12),
        (-0.48, 1.02, -0.04, 0.96, 1.36, "mint", 0.06),
        (0.48, 0.88, -0.06, 0.96, 1.18, "purple", -0.04),
        (1.42, 1.06, -0.08, 0.96, 1.42, "amber", 0.12),
    ]
    for index, (x, y, z, sx, sy, material, rot) in enumerate(card_specs):
        cube(f"TodoCardStack_Card_{index}", group, (x, y, z), (sx, sy, 0.08), mats[material], rot=(0, rot, 0), bevel=0.012)
        cube(f"TodoCardStack_Pin_{index}", group, (x, y + sy * 0.32, z - 0.055), (0.18, 0.12, 0.04), mats["pink" if index % 2 else "aqua"], rot=(0, rot, 0), bevel=0.006)
    cube("TodoCardStack_HeaderGlow", group, (0, 1.84, -0.12), (3.5, 0.08, 0.06), mats["purple"], bevel=0.004)
    cube("TodoCardStack_Cable", group, (0, 0.38, 0.58), (3.65, 0.08, 0.1), mats["rope"], bevel=0.012)


def create_yard_edge_trim(mats):
    group = root("EnvPolishYardEdgeTrim")
    cube("YardEdgeTrim_Curb", group, (0, 0.14, 0), (5.6, 0.28, 0.42), mats["stone"], bevel=0.03)
    cube("YardEdgeTrim_ShadowLip", group, (0, 0.32, 0.24), (5.35, 0.12, 0.12), mats["stone_shadow"], bevel=0.012)
    for index, x in enumerate([-2.18, -1.1, 0, 1.1, 2.18]):
        cube(f"YardEdgeTrim_GlowChip_{index}", group, (x, 0.41, -0.24), (0.36, 0.08, 0.07), mats["mint" if index % 2 else "amber"], bevel=0.004)
    for x in [-2.82, 2.82]:
        cube("YardEdgeTrim_EndPost", group, (x, 0.62, 0), (0.18, 0.82, 0.18), mats["dark"], bevel=0.014)
        cube("YardEdgeTrim_EndLamp", group, (x, 1.1, -0.02), (0.3, 0.18, 0.3), mats["screen"], bevel=0.018)


def create_yard_surface_marks(mats):
    group = root("EnvPolishYardSurfaceMarks")
    cube("YardSurfaceMarks_BaseShadow", group, (0, 0.025, 0), (4.4, 0.05, 2.2), mats["stone_shadow"], bevel=0.01)
    mark_specs = [
        (-1.45, 0.06, -0.62, 1.2, 0.06, 0.08, -0.18, "mint"),
        (-0.3, 0.07, -0.18, 1.6, 0.06, 0.08, 0.12, "paper"),
        (1.1, 0.08, 0.32, 1.34, 0.06, 0.08, -0.1, "aqua"),
        (0.05, 0.09, 0.78, 2.8, 0.06, 0.08, 0.04, "amber"),
    ]
    for index, (x, y, z, sx, sy, sz, rot, material) in enumerate(mark_specs):
        cube(f"YardSurfaceMarks_Paint_{index}", group, (x, y, z), (sx, sy, sz), mats[material], rot=(0, rot, 0), bevel=0.004)
    for x in [-1.8, 1.8]:
        cube("YardSurfaceMarks_CornerTick", group, (x, 0.1, -0.96), (0.6, 0.065, 0.1), mats["pink"], rot=(0, -0.3 if x < 0 else 0.3, 0), bevel=0.004)


def create_workshop_process_rail(mats):
    group = root("EnvPolishWorkshopProcessRail")
    cube("WorkshopProcessRail_Base", group, (0, 0.12, 0), (4.8, 0.24, 0.72), mats["stone_shadow"], bevel=0.03)
    for x in [-2.1, -0.7, 0.7, 2.1]:
        cube("WorkshopProcessRail_Post", group, (x, 0.86, 0), (0.16, 1.42, 0.16), mats["dark"], bevel=0.012)
    cube("WorkshopProcessRail_TopCable", group, (0, 1.52, -0.08), (4.75, 0.09, 0.09), mats["rope"], bevel=0.01)
    cube("WorkshopProcessRail_LowerCable", group, (0, 0.94, -0.08), (4.55, 0.08, 0.08), mats["rope"], bevel=0.01)
    for index, x in enumerate([-1.38, 0, 1.38]):
        cube(f"WorkshopProcessRail_Tag_{index}", group, (x, 1.22, -0.15), (0.58, 0.34, 0.06), [mats["mint"], mats["amber"], mats["screen"]][index], bevel=0.006)


def create_signal_spire(mats):
    group = root("EnvPolishSignalSpire")
    cube("SignalSpire_PlazaBase", group, (0, 0.14, 0), (3.3, 0.28, 3.3), mats["stone_shadow"], bevel=0.05)
    cube("SignalSpire_Core", group, (0, 2.3, 0), (0.38, 4.15, 0.38), mats["dark"], bevel=0.025)
    for index, y in enumerate([0.95, 1.8, 2.65, 3.5]):
        radius = 1.42 - index * 0.16
        cube(f"SignalSpire_RingX_{index}", group, (0, y, 0), (radius * 2, 0.08, 0.12), mats["rope"], bevel=0.01)
        cube(f"SignalSpire_RingZ_{index}", group, (0, y, 0), (0.12, 0.08, radius * 2), mats["rope"], bevel=0.01)
        cube(f"SignalSpire_GlowX_{index}", group, (0, y + 0.08, -radius), (radius * 1.5, 0.05, 0.055), [mats["screen"], mats["mint"], mats["purple"], mats["amber"]][index], bevel=0.004)
    cube("SignalSpire_BeaconStem", group, (0, 4.85, 0), (0.18, 1.05, 0.18), mats["dark"], bevel=0.012)
    cube("SignalSpire_Beacon", group, (0, 5.48, 0), (0.72, 0.42, 0.72), mats["amber"], bevel=0.06)
    cube("SignalSpire_ScreenNorth", group, (0, 2.6, -0.48), (1.08, 1.26, 0.07), mats["screen"], bevel=0.01)
    cube("SignalSpire_ScreenSouth", group, (0, 1.55, 0.48), (0.92, 1.0, 0.07), mats["purple"], rot=(0, math.pi, 0), bevel=0.01)
    for angle in [0, math.pi * 0.5, math.pi, math.pi * 1.5]:
        x = math.sin(angle) * 1.38
        z = math.cos(angle) * 1.38
        cube("SignalSpire_FootLamp", group, (x, 0.58, z), (0.36, 0.36, 0.36), mats["mint"], rot=(0, angle, 0), bevel=0.035)


def create_workshop_canopy(mats):
    group = root("EnvPolishWorkshopCanopy")
    cube("WorkshopCanopy_Deck", group, (0, 0.12, 0), (6.6, 0.24, 4.4), mats["stone_shadow"], bevel=0.045)
    for x in [-2.65, 2.65]:
        for z in [-1.65, 1.65]:
            cube("WorkshopCanopy_Post", group, (x, 1.58, z), (0.22, 2.9, 0.22), mats["dark"], bevel=0.016)
            cube("WorkshopCanopy_PostLamp", group, (x, 2.58, z - 0.08), (0.3, 0.26, 0.08), mats["amber"], bevel=0.015)
    cube("WorkshopCanopy_Roof", group, (0, 3.1, 0), (7.35, 0.32, 4.95), mats["wood"], bevel=0.05)
    cube("WorkshopCanopy_RoofGlow", group, (0, 2.88, -2.54), (5.9, 0.08, 0.08), mats["mint"], bevel=0.006)
    cube("WorkshopCanopy_BackPanel", group, (0, 1.72, 1.82), (5.4, 1.65, 0.16), mats["dark"], bevel=0.025)
    cube("WorkshopCanopy_MainScreen", group, (-1.25, 1.78, 1.68), (2.05, 1.04, 0.08), mats["screen"], bevel=0.012)
    cube("WorkshopCanopy_SideScreen", group, (1.48, 1.55, 1.68), (1.42, 0.78, 0.08), mats["purple"], bevel=0.012)
    cube("WorkshopCanopy_Bench", group, (-1.35, 0.78, -0.58), (2.25, 0.3, 1.1), mats["wood"], bevel=0.035)
    cube("WorkshopCanopy_ToolCrate", group, (1.8, 0.64, -0.52), (1.35, 0.92, 1.02), mats["stone"], rot=(0, -0.16, 0), bevel=0.035)
    for x in [-2.2, -0.75, 0.75, 2.2]:
        cube("WorkshopCanopy_CableDrop", group, (x, 2.24, -1.46), (0.08, 1.12, 0.08), mats["rope"], bevel=0.006)
        cube("WorkshopCanopy_HangingLamp", group, (x, 1.62, -1.46), (0.4, 0.26, 0.4), mats["amber"], bevel=0.03)


def create_garden_arch(mats):
    group = root("EnvPolishGardenArch")
    cube("GardenArch_LeftFoot", group, (-2.35, 0.16, 0), (0.9, 0.32, 1.05), mats["stone"], bevel=0.04)
    cube("GardenArch_RightFoot", group, (2.35, 0.16, 0), (0.9, 0.32, 1.05), mats["stone"], bevel=0.04)
    cube("GardenArch_LeftPost", group, (-2.35, 1.75, 0), (0.38, 3.05, 0.38), mats["wood"], bevel=0.03)
    cube("GardenArch_RightPost", group, (2.35, 1.75, 0), (0.38, 3.05, 0.38), mats["wood"], bevel=0.03)
    cube("GardenArch_TopBeam", group, (0, 3.34, 0), (5.45, 0.42, 0.48), mats["wood"], bevel=0.035)
    cube("GardenArch_GlowStrip", group, (0, 3.08, -0.28), (4.3, 0.08, 0.06), mats["mint"], bevel=0.005)
    for index, x in enumerate([-1.75, -1.05, -0.35, 0.35, 1.05, 1.75]):
        cone("GardenArch_VineBlade", group, (x, 2.92 + math.sin(index) * 0.12, -0.16), 0.12, 0.82, mats["leaf"], vertices=5, rot=(0.12, x * 0.35, 0.25))
        cube("GardenArch_Blossom", group, (x, 2.5 + math.cos(index) * 0.16, -0.28), (0.2, 0.16, 0.08), [mats["flower"], mats["amber"], mats["purple"]][index % 3], bevel=0.015)
    for x in [-1.35, 1.35]:
        cube("GardenArch_LampStem", group, (x, 2.35, -0.34), (0.08, 0.7, 0.08), mats["dark"], bevel=0.006)
        cube("GardenArch_Lamp", group, (x, 1.92, -0.34), (0.34, 0.24, 0.34), mats["amber"], bevel=0.025)
    cube("GardenArch_PathStone", group, (0, 0.08, -0.85), (4.55, 0.12, 0.72), mats["paper"], bevel=0.025)


def create_route_splitter_island(mats):
    group = root("EnvPolishRouteSplitterIsland")
    cube("RouteSplitter_Base", group, (0, 0.12, 0), (5.2, 0.24, 1.42), mats["stone"], bevel=0.08)
    cube("RouteSplitter_ShadowLip", group, (0, 0.28, 0.36), (4.75, 0.1, 0.14), mats["stone_shadow"], bevel=0.015)
    cube("RouteSplitter_FrontGlow", group, (0, 0.34, -0.78), (4.45, 0.08, 0.08), mats["mint"], bevel=0.006)
    for index, x in enumerate([-1.86, -0.93, 0, 0.93, 1.86]):
        cube(f"RouteSplitter_Reflector_{index}", group, (x, 0.44, -0.28), (0.34, 0.12, 0.12), mats["amber" if index % 2 else "foam"], bevel=0.012)
    for x in [-2.32, 2.32]:
        cube("RouteSplitter_EndBollard", group, (x, 0.72, 0), (0.28, 0.92, 0.28), mats["dark"], bevel=0.035)
        cube("RouteSplitter_EndLamp", group, (x, 1.28, -0.04), (0.42, 0.22, 0.42), mats["screen"], bevel=0.025)
    cube("RouteSplitter_CenterPlanter", group, (0, 0.54, 0.25), (1.36, 0.34, 0.46), mats["wood"], bevel=0.035)
    for x in [-0.44, 0, 0.44]:
        cube("RouteSplitter_GrassTuft", group, (x, 0.88, 0.25), (0.16, 0.58, 0.16), mats["leaf"], rot=(0.12, x * 0.45, 0.08), bevel=0.01)


def create_plaza_edge_kit(mats):
    group = root("EnvPolishPlazaEdgeKit")
    cube("PlazaEdge_Curb", group, (0, 0.13, 0), (6.4, 0.26, 0.46), mats["stone"], bevel=0.035)
    cube("PlazaEdge_AsphaltLip", group, (0, 0.23, -0.34), (6.08, 0.08, 0.12), mats["stone_shadow"], bevel=0.012)
    cube("PlazaEdge_GardenLip", group, (0, 0.28, 0.33), (5.72, 0.12, 0.18), mats["wood"], bevel=0.012)
    for index, x in enumerate([-2.55, -1.28, 0, 1.28, 2.55]):
        cube(f"PlazaEdge_GlowChip_{index}", group, (x, 0.4, -0.32), (0.42, 0.08, 0.07), mats["mint" if index % 2 else "amber"], bevel=0.004)
    for x in [-2.9, 2.9]:
        cube("PlazaEdge_EndPost", group, (x, 0.68, 0.08), (0.18, 0.92, 0.18), mats["dark"], bevel=0.014)
        cube("PlazaEdge_EndLamp", group, (x, 1.18, -0.04), (0.32, 0.18, 0.32), mats["screen"], bevel=0.018)


def create_chevron_bollard_run(mats):
    group = root("EnvPolishChevronBollardRun")
    cube("ChevronBollard_BaseStrip", group, (0, 0.08, 0), (5.4, 0.16, 0.38), mats["stone_shadow"], bevel=0.03)
    for index, x in enumerate([-2.16, -1.08, 0, 1.08, 2.16]):
        cube(f"ChevronBollard_Post_{index}", group, (x, 0.58, 0.02), (0.18, 0.92, 0.18), mats["dark"], bevel=0.018)
        cube(f"ChevronBollard_Light_{index}", group, (x, 1.12, -0.06), (0.32, 0.18, 0.1), mats["amber" if index % 2 else "mint"], bevel=0.012)
    for index, x in enumerate([-1.62, -0.54, 0.54, 1.62]):
        cube(f"ChevronBollard_Arrow_{index}", group, (x, 0.27, -0.3), (0.72, 0.08, 0.08), mats["foam"], rot=(0, 0.46, 0), bevel=0.004)
        cube(f"ChevronBollard_ArrowGlow_{index}", group, (x + 0.22, 0.32, -0.36), (0.38, 0.055, 0.055), mats["screen"], rot=(0, 0.46, 0), bevel=0.004)


def create_route_story_marker(mats):
    group = root("EnvPolishRouteStoryMarker")
    cube("RouteStoryMarker_BaseStone", group, (0, 0.13, 0), (3.25, 0.26, 1.45), mats["stone"], bevel=0.055)
    cube("RouteStoryMarker_BaseShadow", group, (0, 0.31, 0.34), (2.9, 0.1, 0.16), mats["stone_shadow"], bevel=0.012)
    for x in [-1.08, 1.08]:
        cube("RouteStoryMarker_Post", group, (x, 1.75, 0), (0.22, 3.05, 0.22), mats["dark"], bevel=0.018)
        cube("RouteStoryMarker_PostGlow", group, (x, 1.64, -0.16), (0.07, 2.1, 0.05), mats["screen"], bevel=0.004)
    cube("RouteStoryMarker_Header", group, (0, 3.12, 0), (2.75, 0.26, 0.3), mats["wood"], bevel=0.026)
    cube("RouteStoryMarker_HeaderGlow", group, (0, 2.93, -0.18), (2.08, 0.07, 0.055), mats["amber"], bevel=0.004)
    cube("RouteStoryMarker_MainPanel", group, (0, 2.1, -0.12), (1.95, 0.98, 0.08), mats["dark"], bevel=0.018)
    cube("RouteStoryMarker_MapScreen", group, (-0.34, 2.12, -0.18), (0.96, 0.64, 0.055), mats["screen"], bevel=0.008)
    for index, y in enumerate([1.84, 2.08, 2.32]):
        cube(f"RouteStoryMarker_ScreenLine_{index}", group, (-0.34, y, -0.225), (0.62 - index * 0.08, 0.04, 0.035), mats["mint"], bevel=0.003)
    cube("RouteStoryMarker_ArrowPlate", group, (0.72, 2.12, -0.18), (0.58, 0.48, 0.055), mats["amber"], rot=(0, 0, -0.14), bevel=0.01)
    cube("RouteStoryMarker_ArrowHead", group, (0.9, 2.12, -0.225), (0.22, 0.28, 0.04), mats["foam"], rot=(0, 0, -0.14), bevel=0.006)
    cube("RouteStoryMarker_HangingTag", group, (0.42, 1.38, -0.16), (0.82, 0.34, 0.055), mats["paper"], rot=(0, 0, 0.08), bevel=0.006)
    cube("RouteStoryMarker_TagPin", group, (0.04, 1.58, -0.2), (0.14, 0.1, 0.04), mats["pink"], bevel=0.004)
    for x in [-1.42, -0.88, 0.88, 1.42]:
        cube("RouteStoryMarker_FootReflector", group, (x, 0.52, -0.68), (0.26, 0.16, 0.08), mats["mint" if x < 0 else "amber"], bevel=0.008)
    for x in [-1.42, 1.42]:
        cube("RouteStoryMarker_SidePlanter", group, (x, 0.54, 0.46), (0.72, 0.38, 0.42), mats["wood"], bevel=0.026)
        for blade in [-0.18, 0.0, 0.18]:
            cone("RouteStoryMarker_PlanterBlade", group, (x + blade, 0.96, 0.48), 0.07, 0.58, mats["leaf"], vertices=5, rot=(0.12, blade * 1.8, 0.04))
    rock_blob("RouteStoryMarker_LeftPebble", group, (-1.78, 0.16, -0.22), (0.25, 0.14, 0.18), mats["stone_shadow"], rot=(0.16, 0.3, -0.08))
    rock_blob("RouteStoryMarker_RightPebble", group, (1.78, 0.15, 0.2), (0.3, 0.13, 0.18), mats["stone_shadow"], rot=(-0.12, -0.35, 0.06))


if __name__ == "__main__":
    main()
