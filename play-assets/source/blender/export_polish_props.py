# ABOUTME: Exports supplemental low-poly world props for the Portfolio Drive island.
# ABOUTME: Keeps these props separate from protected car and FCC building assets.
import argparse
import math
from pathlib import Path

import bpy
from mathutils import Euler, Vector


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    reset_scene()
    mats = materials()
    create_info_kiosk(mats)
    create_launch_hub_gateway(mats)
    create_security_scanner(mats)
    create_security_operations_gate(mats)
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
    create_projects_public_build_hall(mats)
    create_campus_fountain(mats)
    create_campus_notice_board(mats)
    create_campus_walkway_pavilion(mats)
    create_campus_study_bench(mats)
    create_cv_vault(mats)
    create_cv_archive_spine(mats)
    create_cv_records_archive_civic_vault(mats)
    create_skills_array(mats)
    create_skills_data_center(mats)
    create_behind_engineering_garage_workshop_hall(mats)
    create_career_office(mats)
    create_awards_monument(mats)
    create_career_software_campus(mats)
    create_awards_museum_hall(mats)
    create_todo_board(mats)
    create_todo_planning_studio(mats)
    create_document_arcade(mats)
    create_terminal_canopy(mats)
    create_queue_marquee(mats)
    create_process_crane(mats)
    create_circuit_gate(mats)
    create_circuit_time_trial_gate(mats)
    create_stunt_checkpoint(mats)
    create_stunt_score_tower(mats)
    create_stunt_arrow_fence(mats)
    create_build_workbench(mats)
    create_farm_irrigator(mats)
    create_potato_farm_stand(mats)
    create_sentinel_soc_tower(mats)
    create_harbor_signal(mats)
    create_signal_harbor_communications_station(mats)
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
    create_route_vista_kit(mats)
    create_shoreline_tide_pool(mats)
    create_shoreline_breakwater(mats)

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
    sx, sy, sz = scale
    hx, hy, hz = sx * 0.5, sy * 0.5, sz * 0.5
    rotation = Euler(rot, "XYZ").to_matrix()
    origin = Vector(loc)
    verts = [
        (-hx, -hy, -hz),
        (hx, -hy, -hz),
        (hx, hy, -hz),
        (-hx, hy, -hz),
        (-hx, -hy, hz),
        (hx, -hy, hz),
        (hx, hy, hz),
        (-hx, hy, hz),
    ]
    verts = [origin + rotation @ Vector(vertex) for vertex in verts]
    faces = [
        (0, 1, 2, 3),
        (4, 7, 6, 5),
        (0, 4, 5, 1),
        (1, 5, 6, 2),
        (2, 6, 7, 3),
        (3, 7, 4, 0),
    ]
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.name = name
    obj.data.materials.append(material)
    obj.parent = parent
    if bevel:
        modifier = obj.modifiers.new("soft_edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 1
        obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    return obj


def multi_cube(name, parent, boxes, material, bevel=0.0):
    verts = []
    faces = []
    for loc, scale, rot in boxes:
        sx, sy, sz = scale
        hx, hy, hz = sx * 0.5, sy * 0.5, sz * 0.5
        rotation = Euler(rot, "XYZ").to_matrix()
        origin = Vector(loc)
        base = len(verts)
        verts.extend([
            origin + rotation @ Vector((-hx, -hy, -hz)),
            origin + rotation @ Vector((hx, -hy, -hz)),
            origin + rotation @ Vector((hx, hy, -hz)),
            origin + rotation @ Vector((-hx, hy, -hz)),
            origin + rotation @ Vector((-hx, -hy, hz)),
            origin + rotation @ Vector((hx, -hy, hz)),
            origin + rotation @ Vector((hx, hy, hz)),
            origin + rotation @ Vector((-hx, hy, hz)),
        ])
        faces.extend([
            (base + 0, base + 1, base + 2, base + 3),
            (base + 4, base + 7, base + 6, base + 5),
            (base + 0, base + 4, base + 5, base + 1),
            (base + 1, base + 5, base + 6, base + 2),
            (base + 2, base + 6, base + 7, base + 3),
            (base + 3, base + 7, base + 4, base + 0),
        ])
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
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


def cylinder(name, parent, loc, radius, depth, material, vertices=16, rot=(0, 0, 0), bevel=0.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    obj.parent = parent
    if bevel:
        modifier = obj.modifiers.new("soft_edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 1
        obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
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


def create_launch_hub_gateway(mats):
    mats = {
        **mats,
        "stone_shadow": mats["stone"],
        "wood": mats["stone"],
        "rubber": mats["dark"],
        "paper": mats["stone"],
        "mint": mats["screen"],
        "aqua": mats["screen"],
        "leaf": mats["stone"],
        "foam": mats["stone"],
    }
    group = root("EnvPolishLaunchHubGateway")
    cube("LaunchHub_ServiceCourt", group, (0, 0.08, 0.1), (15.8, 0.16, 8.2), mats["stone"], bevel=0.065)
    cube("LaunchHub_AsphaltApron", group, (0, 0.18, -3.15), (12.4, 0.09, 1.18), mats["rubber"], bevel=0.022)
    cube("LaunchHub_CourtWarmInset", group, (0, 0.205, 0.72), (10.6, 0.055, 4.8), mats["paper"], bevel=0.035)
    cube("LaunchHub_VisitorHall", group, (-2.8, 1.78, 0.86), (6.6, 3.16, 3.8), mats["dark"], bevel=0.055)
    cube("LaunchHub_GlassLobby", group, (2.6, 1.72, 0.72), (4.3, 2.88, 3.36), mats["glass"], bevel=0.04)
    cube("LaunchHub_RouteFacade", group, (0.0, 1.7, -2.2), (9.8, 2.6, 0.18), mats["dark"], bevel=0.032)
    cube("LaunchHub_RouteGlass", group, (0.0, 1.68, -2.32), (8.1, 1.72, 0.08), mats["glass"], bevel=0.01)
    cube("LaunchHub_RouteHeader", group, (0.0, 3.28, -2.28), (10.7, 0.32, 0.22), mats["screen"], bevel=0.014)
    cube("LaunchHub_WarmFooter", group, (0.0, 0.66, -2.33), (8.9, 0.18, 0.12), mats["amber"], bevel=0.008)
    for index, x in enumerate([-3.45, -2.3, -1.15, 0, 1.15, 2.3, 3.45]):
        cube(f"LaunchHub_PortfolioBay_{index}", group, (x, 1.66, -2.42), (0.68, 0.92, 0.07), [mats["screen"], mats["mint"], mats["glass"], mats["amber"]][index % 4], bevel=0.006)
    for x in [-6.35, 6.35]:
        cube("LaunchHub_GatewayFoot", group, (x, 0.32, -2.86), (0.96, 0.48, 0.96), mats["stone_shadow"], bevel=0.04)
        cube("LaunchHub_GatewayPylon", group, (x, 2.45, -2.86), (0.42, 4.25, 0.42), mats["dark"], bevel=0.024)
        cube("LaunchHub_PylonGlow", group, (x, 2.48, -3.18), (0.1, 3.34, 0.065), mats["mint" if x < 0 else "amber"], bevel=0.004)
    cube("LaunchHub_GatewayBeam", group, (0, 4.68, -2.86), (13.35, 0.46, 0.5), mats["dark"], bevel=0.03)
    cube("LaunchHub_GatewayBeamGlow", group, (0, 4.38, -3.16), (10.4, 0.1, 0.08), mats["screen"], bevel=0.006)
    for x, mat in [(-7.28, mats["mint"]), (7.28, mats["amber"])]:
        cube("LaunchHub_ArrivalPortalFoot", group, (x, 0.36, -3.78), (1.2, 0.56, 1.18), mats["stone_shadow"], bevel=0.045)
        cube("LaunchHub_ArrivalPortalPylon", group, (x, 3.18, -3.78), (0.56, 5.42, 0.58), mats["dark"], bevel=0.032)
        cube("LaunchHub_ArrivalPortalSignal", group, (x, 3.26, -4.12), (0.12, 4.15, 0.07), mat, bevel=0.004)
    cube("LaunchHub_ArrivalPortalCrown", group, (0, 5.92, -3.78), (16.5, 0.62, 0.66), mats["dark"], bevel=0.035)
    cube("LaunchHub_ArrivalPortalCrownGlow", group, (0, 5.58, -4.18), (12.8, 0.12, 0.08), mats["screen"], bevel=0.006)
    cube("LaunchHub_DriveUnderCanopy", group, (0.0, 4.72, -3.58), (12.9, 0.22, 1.42), mats["glass"], bevel=0.018)
    cube("LaunchHub_RouteIntentRail", group, (0.0, 1.05, -4.02), (9.2, 0.18, 0.16), mats["amber"], bevel=0.008)
    for index, x in enumerate([-3.2, 0.0, 3.2]):
        cube(f"LaunchHub_DestinationTile_{index}", group, (x, 1.32, -4.1), (1.28, 0.18, 0.11), [mats["mint"], mats["screen"], mats["amber"]][index], bevel=0.006)
    cube("LaunchHub_FirstFrameForecourt", group, (0.0, 0.19, -6.58), (14.9, 0.09, 4.82), mats["stone"], bevel=0.055)
    cube("LaunchHub_WorldEntryDeck", group, (0.0, 0.28, -8.92), (12.8, 0.18, 0.86), mats["stone_shadow"])
    multi_cube("LaunchHub_WorldEntryPortal", group, [
        ((-6.1, 1.92, -8.96), (0.46, 3.3, 0.5), (0, 0, 0)),
        ((6.1, 1.92, -8.96), (0.46, 3.3, 0.5), (0, 0, 0)),
        ((0.0, 3.54, -8.96), (12.7, 0.42, 0.58), (0, 0, 0)),
    ], mats["dark"], bevel=0.012)
    multi_cube("LaunchHub_RouteEntrySignalFrame", group, [
        ((-3.25, 2.02, -9.24), (0.24, 2.22, 0.09), (0, 0, 0)),
        ((3.25, 2.02, -9.24), (0.24, 2.22, 0.09), (0, 0, 0)),
        ((0.0, 3.12, -9.24), (6.72, 0.24, 0.1), (0, 0, 0)),
    ], mats["screen"])
    for index, x in enumerate([-2.2, 0.0, 2.2]):
        cube(f"LaunchHub_PortfolioThresholdPanel_{index}", group, (x, 1.72, -9.34), (1.05, 1.28, 0.08), [mats["mint"], mats["screen"], mats["amber"]][index])
    cube("LaunchHub_ForecourtThresholdCanopy", group, (0.0, 2.82, -6.18), (11.8, 0.28, 0.62), mats["dark"], bevel=0.024)
    cube("LaunchHub_ForecourtThresholdGlow", group, (0.0, 2.58, -6.5), (9.6, 0.08, 0.07), mats["screen"], bevel=0.004)
    for x, mat in [(-6.88, mats["mint"]), (6.88, mats["amber"])]:
        cube("LaunchHub_ForecourtSideWall", group, (x, 0.9, -6.64), (0.36, 1.38, 4.35), mats["stone_shadow"], bevel=0.032)
        cube("LaunchHub_ForecourtSideWallGlow", group, (x, 1.42, -6.64), (0.08, 0.14, 3.55), mat, bevel=0.004)
    for index, z in enumerate([-8.3, -7.72, -7.14, -5.58, -5.0, -4.42]):
        x = -3.55 if index < 3 else 3.55
        material = [mats["mint"], mats["screen"], mats["amber"], mats["amber"], mats["screen"], mats["mint"]][index]
        cube(f"LaunchHub_FirstFrameDestinationBand_{index}", group, (x, 0.265, z), (3.25, 0.045, 0.14), material, bevel=0.004)
    cube("LaunchHub_ForecourtCenterSeam", group, (0.0, 0.268, -6.55), (0.18, 0.045, 3.5), mats["paper"], bevel=0.004)
    cube("LaunchHub_CanopyDeck", group, (0.0, 3.84, 0.58), (11.2, 0.34, 4.9), mats["wood"], bevel=0.035)
    cube("LaunchHub_CanopyGlassSlot", group, (2.4, 3.62, 0.62), (4.6, 0.12, 3.5), mats["glass"], bevel=0.012)
    cube("LaunchHub_LeftTower", group, (-6.1, 2.28, 1.22), (1.22, 4.18, 1.28), mats["stone_shadow"], bevel=0.036)
    cube("LaunchHub_LeftTowerCap", group, (-6.1, 4.66, 1.22), (1.64, 0.32, 1.66), mats["wood"], bevel=0.024)
    cube("LaunchHub_RightBeaconBase", group, (6.1, 1.42, 1.34), (1.26, 2.38, 1.24), mats["stone_shadow"], bevel=0.034)
    cube("LaunchHub_RightBeaconGlass", group, (6.1, 2.38, 0.68), (0.84, 1.58, 0.08), mats["screen"], bevel=0.008)
    cube("LaunchHub_RightBeaconCrown", group, (6.1, 3.78, 1.34), (1.56, 0.36, 1.58), mats["amber"], bevel=0.024)
    for index, y in enumerate([1.1, 1.62, 2.14, 2.66, 3.18]):
        cube(f"LaunchHub_TowerTrace_{index}", group, (-6.78, y, 0.62), (0.08, 0.32, 0.5), [mats["mint"], mats["screen"], mats["amber"], mats["aqua"]][index % 4], bevel=0.004)
    cube("LaunchHub_MapTable", group, (2.25, 0.84, 1.78), (2.8, 0.42, 1.55), mats["stone_shadow"], bevel=0.034)
    cube("LaunchHub_MapGlow", group, (2.25, 1.08, 1.72), (2.12, 0.08, 1.02), mats["screen"], bevel=0.006)
    cube("LaunchHub_ControlDesk", group, (-2.75, 0.88, 2.08), (3.2, 0.56, 1.24), mats["stone_shadow"], bevel=0.034)
    for index, x in enumerate([-3.55, -2.75, -1.95]):
        cube(f"LaunchHub_ControlChip_{index}", group, (x, 1.2, 1.58), (0.46, 0.08, 0.07), [mats["mint"], mats["amber"], mats["screen"]][index], bevel=0.004)
    for x in [-4.9, 4.9]:
        cube("LaunchHub_SidePlanter", group, (x, 0.42, 3.3), (1.76, 0.48, 0.78), mats["wood"], bevel=0.025)
        for blade in [-0.54, -0.18, 0.18, 0.54]:
            cone("LaunchHub_PlanterBlade", group, (x + blade, 0.96, 3.32), 0.09, 0.76, mats["leaf"], vertices=5, rot=(0.18, blade * 1.6, 0.06))
    cube("LaunchHub_PhotoFrame_Left", group, (-5.1, 1.64, -0.58), (0.16, 2.42, 0.14), mats["dark"], bevel=0.01)
    cube("LaunchHub_PhotoFrame_Right", group, (-3.65, 1.64, -0.58), (0.16, 2.42, 0.14), mats["dark"], bevel=0.01)
    cube("LaunchHub_PhotoFrame_Top", group, (-4.38, 2.76, -0.58), (1.7, 0.16, 0.14), mats["screen"], bevel=0.006)
    cube("LaunchHub_WitnessRail", group, (4.15, 0.82, -0.8), (3.15, 0.18, 0.16), mats["amber"], bevel=0.008)
    for x in [3.0, 5.3]:
        cube("LaunchHub_WitnessRailPost", group, (x, 0.72, -0.8), (0.16, 1.04, 0.16), mats["dark"], bevel=0.012)
    rock_blob("LaunchHub_LeftPebble", group, (-6.8, 0.18, 3.0), (0.34, 0.16, 0.22), mats["stone_shadow"], rot=(0.12, 0.24, -0.08))
    rock_blob("LaunchHub_RightPebble", group, (6.9, 0.16, 2.74), (0.28, 0.13, 0.18), mats["stone_shadow"], rot=(-0.1, -0.32, 0.06))


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


def create_security_operations_gate(mats):
    group = root("EnvPolishSecurityOperationsGate")
    cube("SecurityOps_ServiceCourt", group, (0, 0.08, 0.1), (17.6, 0.16, 10.4), mats["dark"], bevel=0.055)
    cube("SecurityOps_OperationsHall", group, (-2.35, 2.72, 1.12), (10.8, 5.1, 5.75), mats["dark"], bevel=0.052)
    cube("SecurityOps_IncidentResponseHall", group, (2.3, 2.44, -1.24), (9.7, 4.42, 4.2), mats["stone_shadow"], bevel=0.048)
    cube("SecurityOps_SecureCampusShell", group, (0.35, 3.12, -1.78), (13.4, 5.75, 5.55), mats["stone_shadow"], bevel=0.07)
    cube("SecurityOps_SecureCampusRoof", group, (0.35, 6.22, -1.78), (14.2, 0.42, 6.05), mats["dark"], bevel=0.032)
    cube("SecurityOps_SecureCampusFrontFrame", group, (0.35, 3.05, -4.72), (12.2, 5.2, 0.38), mats["dark"], bevel=0.032)
    cube("SecurityOps_SecureCampusFrontGlass", group, (0.35, 2.95, -4.98), (9.8, 3.46, 0.08), mats["glass"], bevel=0.008)
    for index, x in enumerate([-4.25, -2.12, 0.0, 2.12, 4.25]):
        cube(f"SecurityOps_SecureCampusFacadeMullion_{index}", group, (x, 3.0, -5.06), (0.16, 4.05, 0.08), mats["paper"], bevel=0.004)
    for index, y in enumerate([1.82, 2.58, 3.34, 4.1]):
        cube(f"SecurityOps_SecureCampusStatusBand_{index}", group, (0.35, y, -5.12), (9.0 - index * 0.4, 0.08, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"]][index], bevel=0.003)
    cube("SecurityOps_CommandFloor", group, (-2.05, 5.36, 0.9), (9.6, 2.04, 4.46), mats["dark"], bevel=0.038)
    cube("SecurityOps_CommandDeck", group, (-2.05, 6.48, 0.82), (8.2, 0.62, 3.82), mats["rubber"], bevel=0.03)
    cube("SecurityOps_GlassWarRoom", group, (4.95, 2.24, 0.08), (3.65, 4.1, 4.95), mats["glass"], bevel=0.035)
    cube("SecurityOps_GlassCommandStack", group, (4.92, 5.2, 0.02), (2.82, 2.72, 4.05), mats["glass"], bevel=0.028)
    cube("SecurityOps_ThreatTowerBase", group, (-7.35, 3.52, 1.0), (2.08, 6.7, 2.02), mats["stone_shadow"], bevel=0.04)
    cube("SecurityOps_ThreatTowerStoneCore", group, (-7.35, 5.3, -1.92), (2.65, 9.8, 2.2), mats["stone_shadow"], bevel=0.04)
    cube("SecurityOps_ThreatTowerGlassSlot", group, (-7.35, 5.0, -3.06), (1.65, 6.8, 0.08), mats["glass"], bevel=0.006)
    cube("SecurityOps_ThreatTowerControlCrown", group, (-7.35, 10.42, -1.92), (3.3, 0.44, 2.72), mats["pink"], bevel=0.018)
    cube("SecurityOps_ThreatTowerCrown", group, (-7.35, 7.12, 1.0), (3.08, 0.48, 2.72), mats["dark"], bevel=0.028)
    cube("SecurityOps_ThreatMast", group, (-7.35, 9.15, 1.0), (0.26, 4.05, 0.26), mats["dark"], bevel=0.008)
    cube("SecurityOps_ThreatArray", group, (-7.35, 10.28, 1.0), (3.1, 0.13, 0.13), mats["pink"], bevel=0.006)
    cube("SecurityOps_RouteShieldAtrium", group, (0.1, 3.08, -5.7), (11.6, 5.36, 0.42), mats["glass"], bevel=0.026)
    cube("SecurityOps_ShieldGateLeft", group, (-5.65, 3.12, -5.54), (0.54, 5.75, 0.5), mats["dark"], bevel=0.018)
    cube("SecurityOps_ShieldGateRight", group, (5.85, 3.12, -5.54), (0.54, 5.75, 0.5), mats["dark"], bevel=0.018)
    cube("SecurityOps_ShieldGateBeam", group, (0.1, 5.86, -5.54), (11.95, 0.54, 0.56), mats["dark"], bevel=0.026)
    cube("SecurityOps_ShieldGlass", group, (0.1, 3.02, -5.84), (9.25, 3.82, 0.08), mats["glass"], bevel=0.008)
    cube("SecurityOps_RouteAccessControlCore", group, (0.1, 2.62, -6.14), (7.05, 3.6, 0.18), mats["dark"], bevel=0.022)
    cube("SecurityOps_RouteAccessControlGlass", group, (0.1, 2.72, -6.27), (5.55, 2.38, 0.08), mats["glass"], bevel=0.008)
    cube("SecurityOps_RouteShieldDoorLeft", group, (-2.95, 2.72, -6.34), (0.22, 3.22, 0.12), mats["paper"], bevel=0.006)
    cube("SecurityOps_RouteShieldDoorRight", group, (3.15, 2.72, -6.34), (0.22, 3.22, 0.12), mats["paper"], bevel=0.006)
    cube("SecurityOps_RouteShieldDoorHeader", group, (0.1, 4.28, -6.34), (6.35, 0.22, 0.12), mats["paper"], bevel=0.006)
    cube("SecurityOps_RouteShieldDoorSill", group, (0.1, 1.14, -6.34), (5.75, 0.18, 0.12), mats["paper"], bevel=0.006)
    cube("SecurityOps_RouteIncidentCommandScreen", group, (-3.94, 2.8, -6.36), (1.52, 1.92, 0.08), mats["screen"], bevel=0.006)
    cube("SecurityOps_RouteIncidentCommandHeader", group, (-3.94, 3.88, -6.42), (1.24, 0.12, 0.06), mats["pink"], bevel=0.003)
    for index, y in enumerate([2.08, 2.44, 2.8, 3.16]):
        cube(f"SecurityOps_RouteIncidentCommandTrace_{index}", group, (-3.94, y, -6.43), (1.02 - index * 0.1, 0.06, 0.055), [mats["screen"], mats["mint"], mats["pink"], mats["aqua"]][index], bevel=0.002)
    for index, x in enumerate([-1.7, -0.55, 0.6, 1.75]):
        cube(f"SecurityOps_RoutePacketInspectionLane_{index}", group, (x, 1.62, -6.42), (0.58, 0.1, 0.08), [mats["mint"], mats["screen"], mats["aqua"], mats["pink"]][index], bevel=0.003)
    cube("SecurityOps_RouteSocEntryVestibuleFrame", group, (1.18, 2.86, -6.58), (7.82, 3.9, 0.16), mats["dark"], bevel=0.018)
    cube("SecurityOps_RouteSocEntryVestibuleGlass", group, (1.18, 2.72, -6.68), (6.44, 2.7, 0.07), mats["glass"], bevel=0.008)
    cube("SecurityOps_RouteScanCanopy", group, (1.18, 4.92, -6.5), (8.72, 0.32, 0.42), mats["screen"], bevel=0.012)
    cube("SecurityOps_RouteScanCanopyUnderglow", group, (1.18, 4.62, -6.68), (7.3, 0.08, 0.05), mats["mint"], bevel=0.003)
    cube("SecurityOps_RouteTriageDesk", group, (1.18, 1.42, -6.68), (4.95, 0.54, 0.24), mats["stone_shadow"], bevel=0.014)
    cube("SecurityOps_RouteTriageWindow", group, (1.18, 2.54, -6.74), (3.8, 1.18, 0.06), mats["screen"], bevel=0.006)
    for index, x in enumerate([-2.8, -1.46, 3.86, 5.2]):
        cube(f"SecurityOps_RouteClearancePillar_{index}", group, (x, 2.7, -6.56), (0.26, 3.65, 0.28), mats["paper"], bevel=0.008)
        cube(f"SecurityOps_RouteClearancePillarGlow_{index}", group, (x, 2.72, -6.73), (0.09, 2.45, 0.05), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"]][index], bevel=0.002)
    for index, x in enumerate([-1.15, -0.35, 0.45, 1.25, 2.05, 2.85]):
        cube(f"SecurityOps_RoutePacketQueueTick_{index}", group, (x, 0.9, -6.74), (0.45, 0.08, 0.055), [mats["screen"], mats["mint"], mats["aqua"]][index % 3], bevel=0.002)
    cube("SecurityOps_RouteCampusArrivalArchDeck", group, (0.1, 0.58, -7.08), (12.6, 0.22, 0.52), mats["stone"], bevel=0.022)
    for x in [-6.48, 6.68]:
        cube("SecurityOps_RouteCampusArrivalArchPylon", group, (x, 3.55, -6.92), (0.56, 6.18, 0.46), mats["dark"], bevel=0.018)
        cube("SecurityOps_RouteCampusArrivalArchTrace", group, (x, 3.48, -7.22), (0.08, 4.42, 0.06), mats["mint"], bevel=0.003)
    cube("SecurityOps_RouteCampusArrivalArchBeam", group, (0.1, 6.46, -6.92), (13.72, 0.42, 0.48), mats["dark"], bevel=0.02)
    cube("SecurityOps_RouteCampusArrivalArchGlow", group, (0.1, 6.16, -7.24), (11.2, 0.1, 0.06), mats["screen"], bevel=0.003)
    cube("SecurityOps_RouteCommandFrontageHall", group, (0.1, 3.2, -7.18), (8.6, 4.8, 0.22), mats["glass"], bevel=0.016)
    cube("SecurityOps_RouteCommandFrontageHeader", group, (0.1, 5.72, -7.34), (9.35, 0.32, 0.18), mats["screen"], bevel=0.008)
    cube("SecurityOps_RouteCommandFrontageDesk", group, (0.1, 1.36, -7.34), (5.35, 0.24, 0.12), mats["stone_shadow"], bevel=0.01)
    cube("SecurityOps_RouteScanCourtFrame", group, (0.1, 0.66, -7.72), (10.8, 0.12, 0.34), mats["mint"], bevel=0.006)
    for index, x in enumerate([-4.0, -2.4, -0.8, 0.8, 2.4, 4.0]):
        cube(f"SecurityOps_RouteScanCourtLane_{index}", group, (x, 0.78, -7.92), (0.58, 0.08, 0.08), [mats["mint"], mats["screen"], mats["aqua"], mats["pink"], mats["screen"], mats["mint"]][index], bevel=0.003)
    cube("SecurityOps_RouteIncidentResponseWing", group, (5.32, 3.2, -7.06), (2.34, 4.72, 0.28), mats["stone_shadow"], bevel=0.018)
    cube("SecurityOps_RouteIncidentResponseWingGlass", group, (5.32, 3.18, -7.28), (1.42, 2.8, 0.08), mats["glass"], bevel=0.006)
    cube("SecurityOps_RouteThreatWatchTower", group, (-5.35, 4.32, -7.0), (1.42, 7.0, 0.42), mats["dark"], bevel=0.018)
    for index, y in enumerate([1.78, 2.48, 3.18, 3.88, 4.58, 5.28, 5.98]):
        cube(f"SecurityOps_RouteThreatWatchPulse_{index}", group, (-5.35, y, -7.28), (0.58, 0.08, 0.06), [mats["pink"], mats["screen"], mats["mint"], mats["aqua"]][index % 4], bevel=0.003)
    cube("SecurityOps_RouteThreatWatchCrown", group, (-5.35, 8.0, -7.02), (2.24, 0.32, 0.58), mats["pink"], bevel=0.01)
    cube("SecurityOps_RouteShieldCourtFrame", group, (0.1, 4.05, -7.54), (12.8, 0.16, 0.12), mats["mint"], bevel=0.004)
    cube("SecurityOps_RouteShieldCourtCore", group, (0.1, 2.82, -7.62), (1.86, 2.52, 0.1), mats["screen"], bevel=0.006)
    cube("SecurityOps_RouteOperationsThresholdDeck", group, (0.1, 0.72, -7.86), (14.2, 0.28, 0.72), mats["stone"], bevel=0.024)
    for x in [-6.95, 7.15]:
        cube("SecurityOps_RouteOperationsThresholdPylon", group, (x, 4.85, -7.56), (0.68, 8.25, 0.7), mats["dark"], bevel=0.024)
        cube("SecurityOps_RouteOperationsThresholdTrace", group, (x, 4.85, -7.96), (0.09, 6.4, 0.06), mats["screen"], bevel=0.003)
    cube("SecurityOps_RouteOperationsThresholdBeam", group, (0.1, 8.86, -7.56), (14.82, 0.48, 0.62), mats["dark"], bevel=0.022)
    cube("SecurityOps_RouteScanCanopyBridge", group, (0.1, 7.45, -7.86), (11.6, 0.34, 0.42), mats["screen"], bevel=0.012)
    cube("SecurityOps_RouteScanCanopyPulse", group, (0.1, 7.15, -8.12), (9.8, 0.09, 0.06), mats["mint"], bevel=0.003)
    cube("SecurityOps_RouteThreatReviewGallery", group, (-2.1, 4.24, -8.02), (5.3, 3.4, 0.16), mats["glass"], bevel=0.012)
    cube("SecurityOps_RouteThreatReviewHeader", group, (-2.1, 6.12, -8.16), (5.8, 0.24, 0.1), mats["pink"], bevel=0.005)
    for index, x in enumerate([1.25, 2.55, 3.85, 5.15]):
        cube(f"SecurityOps_RouteAccessReviewBay_{index}", group, (x, 3.18, -8.06), (0.84, 2.75, 0.12), mats["dark"], bevel=0.008)
        cube(f"SecurityOps_RouteAccessReviewScreen_{index}", group, (x, 3.18, -8.16), (0.54, 1.72, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"]][index], bevel=0.003)
    for index, x in enumerate([-4.85, -3.25, -1.65, -0.05, 1.55, 3.15]):
        cube(f"SecurityOps_RouteScanStatusBand_{index}", group, (x, 1.18, -8.18), (0.92, 0.1, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"], mats["screen"], mats["mint"]][index], bevel=0.003)
    cube("SecurityOps_ShieldGateLeftFin", group, (-6.42, 3.18, -5.48), (0.24, 4.85, 1.02), mats["screen"], rot=(0, 0, -0.14), bevel=0.01)
    cube("SecurityOps_ShieldGateRightFin", group, (6.62, 3.18, -5.48), (0.24, 4.85, 1.02), mats["screen"], rot=(0, 0, 0.14), bevel=0.01)
    cube("SecurityOps_ScanThreshold", group, (0.1, 0.2, -6.14), (9.4, 0.08, 0.92), mats["pink"], bevel=0.006)
    cube("SecurityOps_EntryCanopy", group, (0.25, 3.1, -3.98), (8.65, 0.38, 1.34), mats["dark"], bevel=0.024)
    for index, z in enumerate([-4.18, -3.76, -3.34]):
        cube(f"SecurityOps_EntryStep_{index}", group, (0.3, 0.16 + index * 0.05, z), (5.45 - index * 0.62, 0.12, 0.34), mats["paper"], bevel=0.018)
    cube("SecurityOps_StatusWall", group, (-1.0, 2.2, -1.54), (6.2, 1.82, 0.14), mats["rubber"], bevel=0.022)
    cube("SecurityOps_StatusScreen", group, (-1.0, 2.24, -1.64), (5.24, 1.18, 0.06), mats["screen"], bevel=0.006)
    cube("SecurityOps_RedTeamTrace", group, (-1.0, 2.92, -1.68), (4.65, 0.08, 0.05), mats["pink"], bevel=0.004)
    cube("SecurityOps_BlueTeamBridge", group, (0.85, 5.9, 3.38), (11.4, 0.22, 0.34), mats["screen"], bevel=0.008)
    cube("SecurityOps_ScannerBridge", group, (0.45, 5.92, -3.35), (11.5, 0.26, 0.38), mats["pink"], bevel=0.01)
    cube("SecurityOps_ScannerBridgeLower", group, (0.45, 5.48, -3.26), (9.8, 0.13, 0.26), mats["screen"], bevel=0.008)
    cube("SecurityOps_CommandCatwalk", group, (0.6, 6.66, 3.08), (11.9, 0.17, 0.28), mats["mint"], bevel=0.008)
    cube("SecurityOps_CommandDeckRailFront", group, (-2.05, 6.86, -1.32), (8.45, 0.14, 0.12), mats["screen"], bevel=0.006)
    cube("SecurityOps_CommandDeckRailBack", group, (-2.05, 6.86, 2.88), (8.45, 0.14, 0.12), mats["mint"], bevel=0.006)
    cube("SecurityOps_RearOpsWindowBand", group, (-2.0, 3.45, 4.08), (8.6, 1.56, 0.08), mats["glass"], bevel=0.008)
    cube("SecurityOps_SideShieldWallLeft", group, (-6.7, 3.12, -1.1), (0.08, 3.32, 4.6), mats["screen"], bevel=0.006)
    cube("SecurityOps_SideShieldWallRight", group, (7.14, 3.12, -1.1), (0.08, 3.32, 4.6), mats["mint"], bevel=0.006)
    for index, x in enumerate([-4.45, -3.35, 2.2, 3.3]):
        cube(f"SecurityOps_ServerRack_{index}", group, (x, 1.1 + (index % 2) * 0.16, 3.1), (0.72, 1.6, 0.68), mats["stone_shadow"], bevel=0.018)
        cube(f"SecurityOps_ServerGlow_{index}", group, (x, 1.46 + (index % 2) * 0.16, 2.72), (0.46, 0.08, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"]][index], bevel=0.003)
    for index, y in enumerate([1.18, 1.7, 2.22, 2.74, 3.26, 3.78, 4.3]):
        cube(f"SecurityOps_TowerTrace_{index}", group, (-6.86, y, -0.05), (0.08, 0.32, 0.58), [mats["screen"], mats["mint"], mats["pink"], mats["aqua"]][index % 4], bevel=0.004)
    for index, x in enumerate([-5.8, -4.2, -2.6, -1.0, 0.6, 2.2]):
        cube(f"SecurityOps_CommandTick_{index}", group, (x, 4.36, -1.1), (0.72, 0.08, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"], mats["screen"], mats["mint"]][index], bevel=0.003)
    for index, x in enumerate([-7.0, 7.0]):
        cube(f"SecurityOps_PerimeterPylon_{index}", group, (x, 1.16, -3.4), (0.36, 2.08, 0.36), mats["dark"], bevel=0.018)
        cube(f"SecurityOps_PerimeterGlow_{index}", group, (x, 1.86, -3.62), (0.18, 0.68, 0.06), mats["mint"], bevel=0.004)


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


def create_projects_public_build_hall(mats):
    group = root("EnvPolishProjectsFoundryBuilding")

    cube("ProjectsBuildHall_GroundedPlinth", group, (0, 0.12, -0.16), (19.8, 0.24, 12.6), mats["stone_shadow"], bevel=0.08)
    cube("ProjectsBuildHall_RoadArrivalWalk", group, (0, 0.3, -6.78), (13.8, 0.16, 1.55), mats["paper"], bevel=0.04)
    cube("ProjectsBuildHall_MainBuildVolume", group, (-0.4, 3.05, 0.25), (14.9, 5.85, 7.75), mats["brick"], bevel=0.075)
    cube("ProjectsBuildHall_LeftRepositoryWing", group, (-7.9, 2.72, 0.38), (3.3, 5.2, 7.1), mats["stone"], bevel=0.06)
    cube("ProjectsBuildHall_RightFabricationWing", group, (7.45, 2.56, 0.34), (3.55, 4.85, 6.7), mats["wood"], bevel=0.062)

    cube("ProjectsBuildHall_PublicBuildFrame", group, (-0.4, 2.56, -4.16), (11.85, 4.08, 0.42), mats["dark"], bevel=0.036)
    cube("ProjectsBuildHall_PublicBuildGlass", group, (-0.4, 2.6, -4.44), (9.5, 2.84, 0.1), mats["glass"], bevel=0.012)
    cube("ProjectsBuildHall_BuildBayPortal", group, (-0.4, 1.58, -4.82), (5.55, 2.58, 0.36), mats["dark"], bevel=0.03)
    cube("ProjectsBuildHall_BuildBayDoor", group, (-0.4, 1.48, -5.08), (4.1, 1.86, 0.1), mats["amber"], bevel=0.014)
    cube("ProjectsBuildHall_BuildBayThreshold", group, (-0.4, 0.52, -5.58), (5.1, 0.12, 0.7), mats["stone"], bevel=0.018)
    cube("ProjectsBuildHall_EntryCanopy", group, (-0.4, 3.88, -5.62), (8.9, 0.34, 1.12), mats["dark"], bevel=0.028)
    cube("ProjectsBuildHall_EntryCanopySoffit", group, (-0.4, 3.62, -5.74), (8.05, 0.08, 0.82), mats["stone"], bevel=0.01)
    cube("ProjectsBuildHall_BuildBayGlow", group, (-0.4, 1.46, -5.18), (3.1, 0.08, 0.05), mats["screen"], bevel=0.004)

    for index, x in enumerate([-4.4, -2.9, -1.4, 1.2, 2.7, 4.2]):
        cube(f"ProjectsBuildHall_GalleryWindow_{index}", group, (x, 2.82, -4.58), (0.72, 0.96, 0.07), mats["glass"], bevel=0.006)
    for index, x in enumerate([-3.0, -1.0, 1.0, 3.0]):
        cube(f"ProjectsBuildHall_ReviewPod_{index}", group, (x, 1.1, -4.64), (0.94, 0.32, 0.07), [mats["mint"], mats["screen"], mats["amber"], mats["mint"]][index], bevel=0.004)

    cube("ProjectsBuildHall_LeftSideWall", group, (-9.8, 2.82, 0.16), (0.28, 5.28, 6.5), mats["stone_shadow"], bevel=0.026)
    cube("ProjectsBuildHall_RightSideWall", group, (9.5, 2.72, 0.14), (0.28, 5.08, 6.28), mats["stone_shadow"], bevel=0.026)
    for side, x, material in [("Left", -9.96, mats["mint"]), ("Right", 9.66, mats["amber"])]:
        cube(f"ProjectsBuildHall_{side}_SideCanopy", group, (x, 4.72, 0.0), (0.22, 0.28, 5.5), mats["dark"], bevel=0.014)
        for row, y in enumerate([1.42, 2.22, 3.02, 3.82]):
            for col, z in enumerate([-2.08, -0.68, 0.72, 2.12]):
                cube(f"ProjectsBuildHall_{side}_SideWindow_{row}_{col}", group, (x, y, z), (0.065, 0.42, 0.62), mats["glass"], bevel=0.005)
        cube(f"ProjectsBuildHall_{side}_BuildTrace", group, (x, 2.0, -3.0), (0.06, 0.08, 1.36), material, bevel=0.003)

    cube("ProjectsBuildHall_RearReleaseFacade", group, (-0.2, 2.82, 4.08), (14.2, 5.0, 0.28), mats["stone_shadow"], bevel=0.026)
    cube("ProjectsBuildHall_RearReleaseGlass", group, (1.6, 2.68, 4.28), (5.7, 2.1, 0.1), mats["glass"], bevel=0.008)
    cube("ProjectsBuildHall_RearReleaseDoor", group, (-4.6, 1.5, 4.28), (1.35, 2.22, 0.12), mats["wood"], bevel=0.014)
    cube("ProjectsBuildHall_RearDockApron", group, (-4.6, 0.34, 5.0), (3.7, 0.12, 1.22), mats["stone"], bevel=0.02)
    cube("ProjectsBuildHall_RearHeader", group, (-0.2, 5.52, 4.36), (14.5, 0.28, 0.28), mats["dark"], bevel=0.014)
    for index, x in enumerate([-0.9, 0.45, 1.8, 3.15]):
        cube(f"ProjectsBuildHall_RearReleaseStatus_{index}", group, (x, 2.72, 4.42), (0.1, 1.8, 0.07), [mats["screen"], mats["mint"], mats["amber"], mats["aqua"]][index], bevel=0.003)

    for index, x in enumerate([-5.8, -2.9, 0.0, 2.9, 5.8]):
        cube(f"ProjectsBuildHall_SawtoothRoofBay_{index}", group, (x, 5.9, -0.14), (2.48, 0.3, 8.1), mats["dark"], rot=(0.11, 0, 0), bevel=0.022)
        cube(f"ProjectsBuildHall_SkylightStrip_{index}", group, (x + 0.54, 6.18, -1.34), (1.18, 0.16, 2.28), mats["glass"], rot=(0.11, 0, 0), bevel=0.008)

    cube("ProjectsBuildHall_CentralAssemblyFloor", group, (-0.4, 0.54, 0.02), (9.6, 0.28, 4.75), mats["stone"], bevel=0.04)
    cube("ProjectsBuildHall_CentralBuildTable", group, (-0.4, 1.02, -0.18), (5.2, 0.54, 1.78), mats["stone_shadow"], bevel=0.038)
    for index, x in enumerate([-2.2, -0.35, 1.5]):
        cube(f"ProjectsBuildHall_PrototypeModule_{index}", group, (x, 1.54, -0.18 + index * 0.18), (0.86, 0.68, 0.6), [mats["screen"], mats["amber"], mats["mint"]][index], bevel=0.026)
        cube(f"ProjectsBuildHall_PrototypeBase_{index}", group, (x, 0.86, -1.28), (1.12, 0.18, 0.46), mats["paper"], bevel=0.014)

    for x in [-4.95, 3.85]:
        cube("ProjectsBuildHall_CranePost", group, (x, 2.9, 2.72), (0.22, 4.9, 0.22), mats["dark"], bevel=0.012)
    cube("ProjectsBuildHall_CraneBridge", group, (-0.55, 5.16, 2.72), (9.2, 0.28, 0.3), mats["dark"], bevel=0.016)
    cube("ProjectsBuildHall_CraneWorkLight", group, (-0.55, 4.9, 2.44), (6.7, 0.06, 0.05), mats["amber"], bevel=0.003)
    cube("ProjectsBuildHall_CraneCable", group, (1.2, 3.64, 2.42), (0.08, 2.18, 0.08), mats["rope"], bevel=0.004)
    cube("ProjectsBuildHall_CraneLoad", group, (1.2, 2.42, 2.08), (0.92, 0.52, 0.62), mats["amber"], bevel=0.02)

    cube("ProjectsBuildHall_FurnaceStack", group, (6.55, 5.15, 2.68), (1.02, 5.5, 1.02), mats["dark"], bevel=0.034)
    cube("ProjectsBuildHall_FurnaceStackCap", group, (6.55, 8.02, 2.68), (1.42, 0.32, 1.42), mats["amber"], bevel=0.024)
    cube("ProjectsBuildHall_FurnaceHeatLine", group, (6.55, 4.02, 2.05), (1.12, 0.08, 0.06), mats["screen"], bevel=0.003)

    cube("ProjectsBuildHall_PublicShowcaseAtrium", group, (-7.28, 2.22, -3.66), (2.18, 3.34, 1.18), mats["glass"], bevel=0.022)
    cube("ProjectsBuildHall_ShowcaseRoof", group, (-7.28, 4.04, -3.66), (2.48, 0.26, 1.44), mats["dark"], bevel=0.018)
    cube("ProjectsBuildHall_RepositorySpine", group, (-8.34, 2.56, 3.6), (0.56, 4.18, 2.52), mats["dark"], bevel=0.026)
    for index, y in enumerate([1.28, 1.98, 2.68, 3.38]):
        cube(f"ProjectsBuildHall_RepositoryTrace_{index}", group, (-8.68, y, 2.88), (0.08, 0.07, 1.28), [mats["screen"], mats["mint"], mats["amber"], mats["aqua"]][index], bevel=0.003)


def create_projects_foundry_building(mats):
    group = root("EnvPolishProjectsFoundryBuilding")
    cube("ProjectsFoundry_ServiceYard", group, (0, 0.09, -0.28), (14.2, 0.18, 7.7), mats["stone_shadow"], bevel=0.055)
    cube("ProjectsFoundry_MainHall", group, (-0.85, 2.34, 0.34), (12.8, 4.34, 5.7), mats["wood"], bevel=0.052)
    cube("ProjectsFoundry_UpperAssemblyHall", group, (-0.85, 4.76, 0.3), (11.2, 1.28, 4.35), mats["wood"], bevel=0.044)
    cube("ProjectsFoundry_FabricationBay", group, (5.42, 0.94, 0.18), (1.36, 1.34, 2.25), mats["wood"], bevel=0.034)
    cube("ProjectsFoundry_FabricationStack", group, (5.58, 1.78, 0.36), (0.48, 0.78, 0.96), mats["stone_shadow"], bevel=0.014)
    cube("ProjectsFoundry_SideWorkshop", group, (-6.1, 0.88, 0.74), (1.0, 1.18, 2.15), mats["stone"], bevel=0.034)
    cube("ProjectsFoundry_MaterialArchiveWing", group, (-6.24, 1.62, 0.74), (0.54, 0.78, 1.32), mats["stone"], bevel=0.014)
    cube("ProjectsFoundry_RoofMonitor", group, (-0.85, 4.62, 0.16), (11.8, 0.28, 5.25), mats["dark"], bevel=0.036)
    cube("ProjectsFoundry_RoofLantern", group, (0.2, 5.0, -0.55), (4.4, 0.48, 0.7), mats["glass"], bevel=0.024)
    cube("ProjectsFoundry_SawtoothRoofLine", group, (-0.85, 5.36, -0.56), (8.1, 0.18, 2.82), mats["stone_shadow"], bevel=0.022)
    for index, x in enumerate([-3.9, -0.85, 2.2]):
        cube(f"ProjectsFoundry_SawtoothGlass_{index}", group, (x, 5.98, -2.2), (1.12, 0.1, 0.08), mats["glass"], bevel=0.005)
    cube("ProjectsFoundry_EntryCanopy", group, (-2.0, 2.42, -3.72), (5.9, 0.34, 1.4), mats["dark"], bevel=0.03)
    cube("ProjectsFoundry_FrontForgePortal", group, (-2.0, 1.74, -3.52), (4.72, 2.8, 0.18), mats["dark"], bevel=0.026)
    cube("ProjectsFoundry_FurnaceMouth", group, (-2.0, 1.34, -3.64), (2.8, 1.34, 0.08), mats["amber"], bevel=0.018)
    cube("ProjectsFoundry_FurnaceCore", group, (-2.0, 1.36, -3.7), (1.82, 0.84, 0.06), mats["screen"], bevel=0.008)
    for index, z in enumerate([-5.05, -4.58, -4.11]):
        cube(f"ProjectsFoundry_EntryStep_{index}", group, (-2.0, 0.18 + index * 0.05, z), (5.8 - index * 0.74, 0.14, 0.42), mats["paper"], bevel=0.024)
    for row, y in enumerate([1.18, 2.06, 2.94]):
        cube(f"ProjectsFoundry_FloorBand_{row}", group, (-1.16, y + 0.34, -2.64), (10.25, 0.08, 0.08), mats["dark"], bevel=0.004)
        for col, x in enumerate([-4.75, -3.0, -1.25, 0.5, 2.25]):
            mat_key = "screen" if (row + col) % 3 == 0 else "glass"
            cube(f"ProjectsFoundry_ProjectWindow_{row}_{col}", group, (x, y, -2.72), (0.76, 0.42, 0.07), mats[mat_key], bevel=0.007)
    cube("ProjectsFoundry_BuildFloor", group, (2.6, 0.32, -0.76), (6.1, 0.22, 3.25), mats["stone"], bevel=0.035)
    cube("ProjectsFoundry_BuildTable", group, (2.42, 0.84, -0.88), (3.9, 0.48, 1.55), mats["stone_shadow"], bevel=0.035)
    for index, x in enumerate([0.95, 2.42, 3.88]):
        cube(f"ProjectsFoundry_Artifact_{index}", group, (x, 1.28, -0.94 + (index % 2) * 0.42), (0.72, 0.64, 0.48), [mats["screen"], mats["amber"], mats["mint"]][index], bevel=0.03)
    for x in [4.4, 5.4, 6.4]:
        cube("ProjectsFoundry_BayMullion", group, (x, 1.88, -2.68), (0.1, 2.65, 0.08), mats["screen"], bevel=0.004)
    for y in [1.16, 2.28]:
        cube("ProjectsFoundry_BayLine", group, (5.4, y, -2.74), (2.8, 0.06, 0.07), mats["aqua"], bevel=0.004)
    for x in [-7.0, -5.7]:
        for y in [1.12, 1.92]:
            cube("ProjectsFoundry_ToolWindow", group, (x, y, -1.84), (0.42, 0.36, 0.07), mats["amber"], bevel=0.006)
    for x in [-6.6, 6.28]:
        cube("ProjectsFoundry_ServiceRack", group, (x, 0.95, 3.45), (0.82, 1.32, 0.42), mats["dark"], bevel=0.025)
        cube("ProjectsFoundry_ServiceRackGlow", group, (x, 1.34, 3.2), (0.56, 0.08, 0.07), mats["mint"], bevel=0.004)
    for x in [-2.8, 0, 2.8]:
        cube("ProjectsFoundry_CranePost", group, (x, 2.18, 2.72), (0.2, 3.65, 0.2), mats["dark"], bevel=0.012)
    cube("ProjectsFoundry_CraneBeam", group, (0, 3.7, 2.72), (5.8, 0.18, 0.24), mats["dark"], bevel=0.018)
    cube("ProjectsFoundry_OverheadCraneRail", group, (0, 5.1, 2.74), (8.4, 0.12, 0.2), mats["wood"], bevel=0.01)
    cube("ProjectsFoundry_OverheadCraneGlow", group, (0, 4.94, 2.5), (6.8, 0.06, 0.06), mats["amber"], bevel=0.003)
    cube("ProjectsFoundry_CraneHook", group, (1.2, 2.44, 2.48), (0.16, 1.05, 0.12), mats["rope"], bevel=0.004)
    cube("ProjectsFoundry_LoadBlock", group, (1.2, 1.66, 2.12), (0.8, 0.42, 0.46), mats["amber"], bevel=0.022)
    cube("ProjectsFoundry_HeaderGlow", group, (-2.0, 2.18, -4.48), (4.8, 0.09, 0.08), mats["screen"], bevel=0.006)
    cube("ProjectsFoundry_RouteGalleryGlass", group, (-1.05, 2.0, 3.18), (6.2, 1.05, 0.06), mats["glass"], bevel=0.008)
    cube("ProjectsFoundry_RouteGalleryHeader", group, (-1.05, 2.72, 3.1), (6.8, 0.14, 0.1), mats["screen"], bevel=0.004)
    cube("ProjectsFoundry_RouteForgeBand", group, (-1.05, 1.18, 3.1), (6.8, 0.16, 0.08), mats["amber"], bevel=0.006)
    for index, x in enumerate([-4.45, -2.35, -0.25, 1.85]):
        cube(f"ProjectsFoundry_RouteDisplayBay_{index}", group, (x, 1.92, 3.04), (0.46, 0.52, 0.05), [mats["screen"], mats["glass"], mats["mint"], mats["amber"]][index % 4], bevel=0.004)
    for index, x in enumerate([-3.8, -0.85, 2.1]):
        cube(f"ProjectsFoundry_WarmFacadeBand_{index}", group, (x, 3.2, 3.08), (0.74, 0.08, 0.05), [mats["amber"], mats["paper"], mats["screen"], mats["mint"]][index % 4], bevel=0.003)
    cube("ProjectsFoundry_SideBuildGallery", group, (6.78, 1.42, -0.12), (0.06, 1.04, 2.65), mats["glass"], bevel=0.008)
    cube("ProjectsFoundry_SideGalleryHeader", group, (6.84, 2.1, -0.12), (0.06, 0.12, 2.92), mats["screen"], bevel=0.004)
    cube("ProjectsFoundry_SideForgeLintel", group, (6.84, 0.84, -0.12), (0.06, 0.16, 2.92), mats["amber"], bevel=0.004)
    for index, z in enumerate([-2.0, -0.72, 0.56, 1.84]):
        cube(f"ProjectsFoundry_SideBuildCell_{index}", group, (6.9, 1.42, z), (0.05, 0.5, 0.42), [mats["screen"], mats["mint"], mats["aqua"], mats["amber"]][index], bevel=0.003)
    cube("ProjectsFoundry_PublicCanopy", group, (-0.85, 3.12, 3.56), (8.6, 0.2, 0.58), mats["dark"], bevel=0.018)
    cube("ProjectsFoundry_SideCanopy", group, (6.98, 2.36, -0.12), (0.42, 0.16, 3.0), mats["dark"], bevel=0.016)
    cube("ProjectsFoundry_MakerTower", group, (-5.68, 4.76, 1.15), (0.82, 1.82, 0.9), mats["stone_shadow"], bevel=0.028)
    cube("ProjectsFoundry_MakerTowerCap", group, (-5.68, 5.78, 1.15), (1.1, 0.22, 1.14), mats["dark"], bevel=0.024)
    cube("ProjectsFoundry_CompileStack", group, (4.86, 4.5, 1.45), (0.72, 1.56, 0.72), mats["dark"], bevel=0.028)
    cube("ProjectsFoundry_CompileBeacon", group, (4.86, 5.4, 1.45), (0.48, 0.26, 0.48), mats["mint"], bevel=0.035)
    cube("ProjectsFoundry_FurnaceChimney", group, (2.75, 5.14, 1.62), (0.58, 2.7, 0.58), mats["dark"], bevel=0.026)
    cube("ProjectsFoundry_FurnaceChimneyCap", group, (2.75, 6.6, 1.62), (0.86, 0.18, 0.86), mats["amber"], bevel=0.02)
    cube("ProjectsFoundry_HotMetalVent", group, (2.75, 5.88, 0.9), (0.62, 0.06, 0.05), mats["screen"], bevel=0.003)
    cube("ProjectsFoundry_SecondChimney", group, (4.22, 4.58, 2.06), (0.34, 2.02, 0.34), mats["dark"], bevel=0.018)
    cube("ProjectsFoundry_SecondChimneyCap", group, (4.22, 5.64, 2.06), (0.54, 0.15, 0.54), mats["mint"], bevel=0.012)
    cube("ProjectsFoundry_RoofCraneBridge", group, (0.4, 5.42, 2.54), (6.8, 0.1, 0.12), mats["amber"], bevel=0.006)
    cube("ProjectsFoundry_RoofCraneCounter", group, (-4.0, 5.4, 2.54), (0.82, 0.34, 0.34), mats["stone_shadow"], bevel=0.016)
    for index, y in enumerate([4.92, 5.38, 5.84, 6.3]):
        cube(f"ProjectsFoundry_TowerSignal_{index}", group, (-6.04, y, 0.46), (0.08, 0.08, 0.72), [mats["screen"], mats["amber"], mats["mint"], mats["aqua"]][index], bevel=0.003)
    cube("ProjectsFoundry_TestBridge", group, (0.3, 4.46, 2.78), (7.2, 0.12, 0.24), mats["rope"], bevel=0.01)
    for x in [-3.2, 0.0, 3.2]:
        cube("ProjectsFoundry_BridgeLamp", group, (x, 5.14, 2.68), (0.38, 0.2, 0.08), mats["amber"], bevel=0.012)
    cube("ProjectsFoundry_PublicBuildTheater", group, (-1.05, 1.82, 4.0), (6.2, 0.82, 0.08), mats["wood"], bevel=0.012)
    cube("ProjectsFoundry_PublicBuildGlass", group, (-1.05, 1.82, 4.06), (4.4, 0.46, 0.04), mats["glass"], bevel=0.006)
    cube("ProjectsFoundry_PublicBuildHeader", group, (-1.05, 2.44, 4.1), (6.45, 0.1, 0.06), mats["screen"], bevel=0.004)
    cube("ProjectsFoundry_PublicBuildFooter", group, (-1.05, 1.18, 4.1), (4.7, 0.08, 0.06), mats["amber"], bevel=0.004)
    cube("ProjectsFoundry_RouteAssemblyHallLeftPier", group, (-4.42, 1.82, 4.28), (0.16, 1.26, 0.08), mats["stone_shadow"], bevel=0.014)
    cube("ProjectsFoundry_RouteAssemblyHallRightPier", group, (2.32, 1.82, 4.28), (0.16, 1.26, 0.08), mats["stone_shadow"], bevel=0.014)
    cube("ProjectsFoundry_RouteAssemblyHallSill", group, (-1.05, 1.12, 4.28), (6.92, 0.1, 0.08), mats["stone_shadow"], bevel=0.01)
    cube("ProjectsFoundry_RouteAssemblyHallGlass", group, (-1.05, 1.84, 4.34), (4.82, 0.62, 0.04), mats["glass"], bevel=0.006)
    for index, x in enumerate([-4.0, -2.4, -0.8, 0.8, 2.4]):
        cube(f"ProjectsFoundry_RouteAssemblyHallMullion_{index}", group, (x, 1.84, 4.4), (0.05, 0.58, 0.04), mats["paper"], bevel=0.002)
    cube("ProjectsFoundry_RouteAssemblyHallHeader", group, (-1.05, 2.48, 4.4), (6.95, 0.1, 0.07), mats["wood"], bevel=0.008)
    cube("ProjectsFoundry_RouteAssemblyHallForgeCore", group, (-1.05, 1.28, 4.42), (3.9, 0.1, 0.05), mats["amber"], bevel=0.004)
    cube("ProjectsFoundry_RouteAssemblyHallCompileGlow", group, (-1.05, 2.28, 4.44), (3.2, 0.04, 0.04), mats["mint"], bevel=0.002)
    cube("ProjectsFoundry_RouteCranePortalLeft", group, (-4.56, 1.78, 4.38), (0.1, 1.5, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteCranePortalRight", group, (2.46, 1.78, 4.38), (0.1, 1.5, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteCranePortalBeam", group, (-1.05, 2.62, 4.38), (7.12, 0.1, 0.08), mats["stone_shadow"])
    for index, x in enumerate([-4.15, -1.05, 2.05]):
        cube(f"ProjectsFoundry_ShowcaseProjectPod_{index}", group, (x, 1.82, 4.18), (1.12, 0.72, 0.06), [mats["screen"], mats["mint"], mats["amber"]][index], bevel=0.008)
        cube(f"ProjectsFoundry_ShowcaseProjectFrame_{index}", group, (x, 1.82, 4.15), (1.36, 0.92, 0.05), mats["paper"], bevel=0.004)
        cube(f"ProjectsFoundry_ShowcaseProjectDock_{index}", group, (x, 1.04, 4.22), (1.18, 0.14, 0.26), mats["stone_shadow"], bevel=0.014)
    cube("ProjectsFoundry_CompilePipelineBridge", group, (1.15, 3.12, 4.1), (3.4, 0.08, 0.1), mats["amber"], bevel=0.006)
    cube("ProjectsFoundry_CompilePipelineGlow", group, (1.15, 3.02, 4.2), (2.7, 0.035, 0.035), mats["mint"], bevel=0.002)
    for index, x in enumerate([-1.8, 0.0, 1.8]):
        cube(f"ProjectsFoundry_CompilePipelineNode_{index}", group, (x, 3.36, 4.28), (0.24, 0.22, 0.06), [mats["screen"], mats["mint"], mats["amber"]][index], bevel=0.008)
    for side, x in [("Left", -5.92), ("Right", 3.84)]:
        cube(f"ProjectsFoundry_RepoBranchFrame_{side}_PostA", group, (x, 1.54, 4.32), (0.1, 1.42, 0.08), mats["stone_shadow"])
        cube(f"ProjectsFoundry_RepoBranchFrame_{side}_PostB", group, (x + 0.62, 1.54, 4.32), (0.1, 1.42, 0.08), mats["stone_shadow"])
        cube(f"ProjectsFoundry_RepoBranchFrame_{side}_Top", group, (x + 0.31, 2.36, 4.36), (0.78, 0.1, 0.08), mats["screen"], bevel=0.006)
        cube(f"ProjectsFoundry_RepoBranchFrame_{side}_Merge", group, (x + 0.31, 1.84, 4.4), (0.48, 0.08, 0.05), mats["mint"], rot=(0, 0, 0.24 * (1 if side == "Left" else -1)), bevel=0.004)
    cube("ProjectsFoundry_RouteBuildCraneBeam", group, (3.04, 2.46, 4.0), (1.24, 0.06, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildCranePost", group, (3.58, 1.52, 4.0), (0.08, 1.28, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildTheaterPortalDeck", group, (-1.05, 0.8, 4.62), (6.4, 0.08, 0.14), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildTheaterPortalLeftPier", group, (-4.18, 1.88, 4.66), (0.12, 1.58, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildTheaterPortalRightPier", group, (2.08, 1.88, 4.66), (0.12, 1.58, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildTheaterPortalHeader", group, (-1.05, 2.72, 4.66), (6.48, 0.1, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteBuildTheaterPortalGlass", group, (-1.05, 1.9, 4.72), (4.75, 0.62, 0.04), mats["glass"])
    cube("ProjectsFoundry_RouteReleasePipelineSpine", group, (-0.62, 2.42, 4.78), (3.6, 0.06, 0.04), mats["mint"])
    for index, x in enumerate([-4.22, -1.05, 2.12]):
        cube(f"ProjectsFoundry_RouteProjectStoryBay_{index}", group, (x, 1.84, 4.9), (1.24, 0.68, 0.05), [mats["screen"], mats["glass"], mats["mint"]][index])
    cube("ProjectsFoundry_RouteCompileGantryFrame", group, (-1.05, 3.04, 4.86), (6.2, 0.08, 0.07), mats["stone_shadow"])
    cube("ProjectsFoundry_RoutePublicShowcaseAtriumFrame", group, (-1.05, 1.92, 5.08), (5.7, 0.96, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RoutePublicShowcaseAtriumGlass", group, (-1.05, 1.92, 5.14), (4.3, 0.52, 0.04), mats["glass"], bevel=0.005)
    cube("ProjectsFoundry_RoutePublicShowcaseAtriumHeader", group, (-1.05, 2.52, 5.18), (5.9, 0.1, 0.08), mats["wood"], bevel=0.008)
    cube("ProjectsFoundry_RouteReleaseTheaterScreen", group, (-3.68, 1.92, 5.24), (0.96, 0.62, 0.05), mats["screen"], bevel=0.004)
    cube("ProjectsFoundry_RouteReleaseTheaterStage", group, (-3.68, 1.04, 5.24), (1.08, 0.14, 0.22), mats["stone_shadow"], bevel=0.008)
    for index, x in enumerate([-1.9, -0.6, 0.7]):
        cube(f"ProjectsFoundry_RoutePrototypeGalleryPod_{index}", group, (x, 1.98, 5.3), (0.58, 0.66, 0.06), [mats["mint"], mats["glass"], mats["amber"]][index], bevel=0.006)
        cube(f"ProjectsFoundry_RoutePrototypeGalleryDock_{index}", group, (x, 1.0, 5.28), (0.72, 0.14, 0.28), mats["paper"], bevel=0.008)
    cube("ProjectsFoundry_RouteCompilePipelineStageRail", group, (2.54, 2.14, 5.3), (1.84, 0.06, 0.05), mats["mint"], bevel=0.003)
    for index, (x, y, material) in enumerate([(2.18, 1.66, mats["screen"]), (3.08, 2.22, mats["amber"]), (3.98, 2.78, mats["mint"])]):
        cube(f"ProjectsFoundry_RouteCompilePipelineStage_{index}", group, (x, y, 5.36), (0.32, 0.24, 0.05), material, bevel=0.003)
    cube("ProjectsFoundry_RouteBuildReviewBalcony", group, (2.12, 2.48, 5.28), (1.72, 0.08, 0.1), mats["paper"], bevel=0.006)
    cube("ProjectsFoundry_RouteBuildReviewCanopy", group, (2.12, 2.7, 5.22), (1.94, 0.08, 0.12), mats["dark"], bevel=0.006)
    cube("ProjectsFoundry_RouteReleaseGantryLeftFrame", group, (-4.22, 1.9, 5.42), (0.1, 1.58, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseGantryRightFrame", group, (2.12, 1.9, 5.42), (0.1, 1.58, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseGantryHeader", group, (-1.05, 2.76, 5.4), (6.45, 0.1, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseGantryStatusGlow", group, (-1.05, 2.94, 5.52), (4.6, 0.04, 0.04), mats["mint"], bevel=0.002)
    cube("ProjectsFoundry_RoutePrototypeLaunchPortalDeck", group, (-2.0, 0.78, 5.58), (4.35, 0.18, 0.38), mats["stone_shadow"], bevel=0.018)
    cube("ProjectsFoundry_RoutePrototypeLaunchPortalLeft", group, (-4.08, 1.86, 5.62), (0.16, 1.8, 0.12), mats["screen"], bevel=0.01)
    cube("ProjectsFoundry_RoutePrototypeLaunchPortalRight", group, (0.08, 1.86, 5.62), (0.16, 1.8, 0.12), mats["screen"], bevel=0.01)
    cube("ProjectsFoundry_RoutePrototypeLaunchPortalBeam", group, (-2.0, 2.78, 5.64), (4.32, 0.14, 0.1), mats["amber"], bevel=0.008)
    for index, x in enumerate([-3.72, -2.0, -0.28]):
        cube(f"ProjectsFoundry_RoutePrototypeLaunchPod_{index}", group, (x, 1.42, 5.7), (0.48, 0.48, 0.06), [mats["glass"], mats["mint"], mats["aqua"]][index], bevel=0.006)
    cube("ProjectsFoundry_RouteBuildReviewCourtRail", group, (2.74, 1.02, 5.58), (2.6, 0.1, 0.08), mats["paper"], bevel=0.006)
    cube("ProjectsFoundry_RouteBuildReviewCourtBack", group, (2.74, 1.84, 5.66), (2.28, 0.95, 0.06), mats["glass"], bevel=0.006)
    for index, x in enumerate([2.12, 3.22, 4.32]):
        cube(f"ProjectsFoundry_RouteBuildReviewCourtPanel_{index}", group, (x, 1.86, 5.72), (0.42, 0.48, 0.05), [mats["screen"], mats["amber"], mats["mint"]][index], bevel=0.004)
    cube("ProjectsFoundry_RouteDeployBeaconStackCore", group, (5.18, 2.86, 4.78), (0.42, 1.55, 0.42), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteDeployBeaconStackCap", group, (5.18, 3.72, 4.78), (0.72, 0.2, 0.72), mats["mint"])
    cube("ProjectsFoundry_RouteRepositoryAtriumFaceFrame", group, (-1.05, 2.08, 5.86), (5.3, 1.18, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteRepositoryAtriumFaceGlass", group, (-1.05, 2.06, 5.92), (4.0, 0.58, 0.04), mats["glass"], bevel=0.005)
    cube("ProjectsFoundry_RouteRepositoryAtriumFaceHeader", group, (-1.05, 2.76, 5.96), (5.45, 0.1, 0.08), mats["wood"], bevel=0.008)
    cube("ProjectsFoundry_RouteRepositoryAtriumFaceSill", group, (-1.05, 1.34, 5.96), (4.9, 0.08, 0.08), mats["stone_shadow"], bevel=0.008)
    for index, x in enumerate([-3.4, -1.05, 1.3]):
        cube(f"ProjectsFoundry_RouteRepositoryCommitColumn_{index}", group, (x, 2.14, 6.02), (0.06, 0.98, 0.04), mats["paper"], bevel=0.003)
        cube(f"ProjectsFoundry_RouteRepositoryCommitNode_{index}", group, (x, 1.62 + index * 0.22, 6.06), (0.2, 0.09, 0.04), [mats["screen"], mats["mint"], mats["amber"]][index], bevel=0.004)
    for index, (x, y) in enumerate([(-3.0, 2.02), (1.15, 2.68)]):
        cube(f"ProjectsFoundry_RouteRepositoryBranchTrace_{index}", group, (x, y, 6.1), (0.48, 0.04, 0.04), mats["mint" if index % 2 else "amber"], rot=(0, 0, 0.16 if index % 2 else -0.14), bevel=0.002)
    cube("ProjectsFoundry_RouteBuildPipelineRunwayDeck", group, (-1.05, 0.58, 6.34), (6.7, 0.1, 0.48), mats["stone_shadow"], bevel=0.014)
    cube("ProjectsFoundry_RouteBuildPipelineRunwayCenterGlow", group, (-1.05, 0.66, 6.58), (4.7, 0.04, 0.04), mats["mint"], bevel=0.003)
    for index, x in enumerate([-4.65, -2.25, 0.15, 2.55]):
        cube(f"ProjectsFoundry_RouteBuildPipelineRunwayStage_{index}", group, (x, 0.66, 6.34), (0.34, 0.06, 0.34), [mats["screen"], mats["amber"], mats["mint"], mats["paper"]][index % 4], bevel=0.006)
    for index, x in enumerate([-4.25, -1.05, 2.15]):
        cube(f"ProjectsFoundry_RoutePrototypeReviewWindowFrame_{index}", group, (x, 2.22, 6.5), (1.58, 1.0, 0.06), mats["paper"], bevel=0.006)
        cube(f"ProjectsFoundry_RoutePrototypeReviewWindowGlass_{index}", group, (x, 2.22, 6.55), (1.18, 0.58, 0.04), [mats["glass"], mats["screen"], mats["mint"]][index], bevel=0.004)
        cube(f"ProjectsFoundry_RoutePrototypeReviewBench_{index}", group, (x, 1.32, 6.58), (1.22, 0.16, 0.24), mats["stone_shadow"], bevel=0.012)
    cube("ProjectsFoundry_RouteReleaseCraneCrownLeft", group, (-4.12, 3.28, 5.92), (0.1, 0.46, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseCraneCrownRight", group, (2.02, 3.28, 5.92), (0.1, 0.46, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseCraneCrownBeam", group, (-1.05, 3.56, 5.92), (6.25, 0.1, 0.08), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteReleaseCraneCrownGlow", group, (-1.05, 3.7, 6.04), (4.4, 0.04, 0.04), mats["amber"], bevel=0.002)
    cube("ProjectsFoundry_RoutePublicBuildForecourt", group, (-1.05, 0.34, 6.88), (9.4, 0.12, 0.5), mats["stone_shadow"])
    multi_cube("ProjectsFoundry_RouteVehicleScaleBuildArch", group, [
        ((-5.0, 2.18, 7.0), (0.24, 3.05, 0.2), (0, 0, 0)),
        ((2.9, 2.18, 7.0), (0.24, 3.05, 0.2), (0, 0, 0)),
        ((-1.05, 3.74, 7.0), (8.15, 0.24, 0.2), (0, 0, 0)),
    ], mats["dark"])
    cube("ProjectsFoundry_RouteOpenWorkshopDoor", group, (-1.05, 2.2, 7.18), (7.7, 2.18, 0.08), mats["dark"])
    cube("ProjectsFoundry_RouteOpenWorkshopGlow", group, (-1.05, 2.2, 7.24), (5.35, 1.04, 0.04), mats["glass"])
    cube("ProjectsFoundry_RouteBuildFlowThreshold", group, (-1.05, 0.72, 7.34), (6.8, 0.08, 0.08), mats["amber"])
    for index, x in enumerate([-3.95, -1.05, 1.85]):
        cube(f"ProjectsFoundry_RouteReleaseReviewBay_{index}", group, (x, 2.12, 7.38), (1.02, 0.62, 0.05), [mats["screen"], mats["mint"], mats["amber"]][index])
        cube(f"ProjectsFoundry_RouteReleaseReviewDock_{index}", group, (x, 1.18, 7.34), (1.08, 0.12, 0.2), mats["paper"])
    cube("ProjectsFoundry_RouteSideRepositoryFaceFrame", group, (6.42, 2.34, 0.88), (0.08, 1.42, 1.3), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteSideRepositoryFaceGlass", group, (6.48, 2.34, 0.88), (0.05, 1.02, 0.92), mats["glass"], bevel=0.006)
    for index, z in enumerate([-0.05, 0.68, 1.41, 2.14]):
        cube(f"ProjectsFoundry_RouteSideRepositoryLane_{index}", group, (6.54, 2.38, z), (0.05, 0.08, 0.28), [mats["screen"], mats["mint"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("ProjectsFoundry_RouteFabricationStackPublicFace", group, (5.56, 2.82, -1.02), (0.9, 0.9, 0.05), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteFabricationStackReviewGlass", group, (5.56, 3.0, -1.06), (0.68, 0.56, 0.04), mats["glass"], bevel=0.005)
    cube("ProjectsFoundry_RouteFabricationStackReviewHeader", group, (5.56, 3.42, -1.1), (0.86, 0.1, 0.04), mats["screen"], bevel=0.003)
    cube("ProjectsFoundry_RouteFabricationStackDeployLine", group, (5.56, 2.46, -1.12), (0.68, 0.05, 0.04), mats["amber"], bevel=0.003)
    for index, y in enumerate([3.72, 4.28, 4.84, 5.4]):
        cube(f"ProjectsFoundry_RouteFabricationStackStatus_{index}", group, (6.2, y - 0.45, -1.18), (0.2, 0.08, 0.05), [mats["mint"], mats["screen"], mats["amber"], mats["aqua"]][index], bevel=0.004)
    cube("ProjectsFoundry_RouteFabricationStackSideFace", group, (6.42, 2.82, 0.48), (0.06, 1.28, 1.22), mats["stone_shadow"])
    cube("ProjectsFoundry_RouteFabricationStackSideGlass", group, (6.48, 3.02, 0.48), (0.05, 1.02, 0.92), mats["glass"], bevel=0.006)
    for index, z in enumerate([-0.16, 0.58, 1.32]):
        cube(f"ProjectsFoundry_RouteFabricationStackSideStatus_{index}", group, (6.54, 3.36, z), (0.04, 0.1, 0.28), [mats["screen"], mats["mint"], mats["amber"]][index], bevel=0.003)


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


def create_cv_archive_spine(mats):
    group = root("EnvPolishCvArchiveSpine")
    cube("CvArchiveSpine_Floor", group, (0, 0.12, 0), (10.8, 0.24, 5.4), mats["stone"], bevel=0.05)
    cube("CvArchiveSpine_BackShelf", group, (0, 1.58, 2.24), (10.2, 2.6, 0.34), mats["stone_shadow"], bevel=0.045)
    cube("CvArchiveSpine_Roof", group, (0, 3.08, 0.36), (11.4, 0.34, 5.9), mats["wood"], bevel=0.055)
    cube("CvArchiveSpine_HeaderGlow", group, (0, 2.82, -2.66), (8.7, 0.09, 0.08), mats["screen"], bevel=0.006)
    for x in [-4.72, 4.72]:
        cube("CvArchiveSpine_EndPier", group, (x, 1.68, 0.08), (0.42, 2.9, 4.7), mats["stone_shadow"], bevel=0.035)
        cube("CvArchiveSpine_PierGlow", group, (x, 1.86, -2.12), (0.1, 2.18, 0.07), mats["mint"], bevel=0.004)
    for x in [-3.4, -1.7, 0, 1.7, 3.4]:
        cube("CvArchiveSpine_ShelfDivider", group, (x, 1.42, 2.0), (0.18, 2.0, 0.22), mats["dark"], bevel=0.012)
    for index, (x, y, material, tilt) in enumerate([
        (-3.85, 1.02, "paper", -0.08),
        (-2.72, 1.36, "foam", 0.04),
        (-1.52, 1.12, "paper", 0.09),
        (-0.34, 1.58, "amber", -0.05),
        (0.86, 1.28, "paper", 0.02),
        (2.08, 1.62, "mint", 0.06),
        (3.34, 1.18, "paper", -0.1),
    ]):
        cube(f"CvArchiveSpine_File_{index}", group, (x, y, 1.78), (0.66, 0.82, 0.08), mats[material], rot=(0, 0, tilt), bevel=0.008)
    for side in [-1, 1]:
        cube("CvArchiveSpine_EndDisplay", group, (side * 4.94, 1.7, -0.48), (0.07, 1.12, 2.15), mats["dark"], bevel=0.012)
        cube("CvArchiveSpine_EndDisplayGlow", group, (side * 4.98, 1.92, -0.62), (0.055, 0.78, 1.42), mats["screen"], bevel=0.004)
        cube("CvArchiveSpine_EndFileCard", group, (side * 4.99, 1.18, 0.68), (0.055, 0.46, 0.86), mats["paper"], bevel=0.004)
    for x in [-3.55, -1.18, 1.18, 3.55]:
        cube("CvArchiveSpine_FrontColumn", group, (x, 1.55, -2.04), (0.32, 2.72, 0.32), mats["dark"], bevel=0.022)
        cube("CvArchiveSpine_ColumnLamp", group, (x, 2.5, -2.26), (0.34, 0.24, 0.08), mats["screen"], bevel=0.014)
    cube("CvArchiveSpine_ServiceDesk", group, (0, 0.76, -0.88), (4.3, 0.5, 1.12), mats["wood"], bevel=0.035)
    cube("CvArchiveSpine_DeskScreen", group, (-1.28, 1.28, -1.48), (1.15, 0.76, 0.08), mats["screen"], rot=(0, 0.12, 0), bevel=0.012)
    cube("CvArchiveSpine_DeskLamp", group, (1.48, 1.36, -1.36), (0.46, 0.34, 0.46), mats["amber"], bevel=0.035)
    for x in [-4.1, 4.1]:
        cube("CvArchiveSpine_SideBench", group, (x, 0.68, -0.72), (1.72, 0.22, 0.58), mats["wood"], bevel=0.025)
    cube("CvArchiveSpine_FloorTrace", group, (0, 0.31, -2.48), (8.4, 0.06, 0.08), mats["screen"], bevel=0.004)


def create_cv_records_archive(mats):
    group = root("EnvPolishCvRecordsArchive")
    cube("CvRecordsArchive_Plaza", group, (0, 0.09, -0.34), (15.8, 0.18, 9.2), mats["paper"], bevel=0.055)
    cube("CvRecordsArchive_MainHall", group, (-0.6, 2.05, 0.35), (10.6, 3.9, 4.95), mats["stone"], bevel=0.05)
    cube("CvRecordsArchive_ShelfWing", group, (5.25, 1.7, 0.52), (3.65, 3.2, 4.65), mats["stone_shadow"], bevel=0.045)
    cube("CvRecordsArchive_CertificateWing", group, (-5.95, 1.48, 0.68), (2.7, 2.8, 4.25), mats["stone_shadow"], bevel=0.045)
    cube("CvRecordsArchive_RoofSlab", group, (-0.45, 4.08, 0.24), (12.9, 0.36, 5.8), mats["wood"], bevel=0.04)
    cube("CvRecordsArchive_RoofArchiveBox", group, (0.95, 4.58, 0.18), (5.8, 0.62, 2.3), mats["stone_shadow"], bevel=0.035)
    cube("CvRecordsArchive_CentralAtrium", group, (-0.6, 5.72, -0.18), (3.6, 2.32, 2.2), mats["glass"], bevel=0.026)
    cube("CvRecordsArchive_AtriumCap", group, (-0.6, 7.02, -0.18), (4.2, 0.28, 2.72), mats["wood"], bevel=0.026)
    cube("CvRecordsArchive_AtriumSpine", group, (-0.6, 5.88, -1.36), (0.2, 2.24, 0.16), mats["gold"], bevel=0.008)
    cube("CvRecordsArchive_AtriumBeacon", group, (-0.6, 7.36, -0.18), (0.82, 0.18, 0.82), mats["mint"], bevel=0.018)
    cube("CvRecordsArchive_SecureDoor", group, (-0.6, 1.36, -2.34), (2.25, 2.42, 0.16), mats["dark"], bevel=0.035)
    cube("CvRecordsArchive_DoorGlow", group, (-0.6, 1.58, -2.48), (1.62, 1.62, 0.06), mats["screen"], bevel=0.008)
    cube("CvRecordsArchive_DoorHandle", group, (0.42, 1.42, -2.54), (0.16, 0.62, 0.08), mats["gold"], bevel=0.01)
    cube("CvRecordsArchive_PublicVaultPortal", group, (-0.6, 2.16, -2.62), (4.15, 3.72, 0.28), mats["dark"], bevel=0.045)
    cylinder("CvRecordsArchive_PublicVaultSeal", group, (-0.6, 2.18, -2.82), 1.18, 0.12, mats["gold"], vertices=12, bevel=0.012)
    cylinder("CvRecordsArchive_PublicVaultGlass", group, (-0.6, 2.18, -2.9), 0.72, 0.08, mats["screen"], vertices=12, bevel=0.008)
    cube("CvRecordsArchive_VaultSealHandle_H", group, (-0.6, 2.18, -2.96), (1.54, 0.1, 0.07), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_VaultSealHandle_V", group, (-0.6, 2.18, -2.97), (0.1, 1.54, 0.07), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_PublicLedgerHeader", group, (-0.6, 3.92, -2.84), (5.15, 0.18, 0.12), mats["paper"], bevel=0.008)
    cube("CvRecordsArchive_PublicLedgerFooter", group, (-0.6, 0.42, -2.84), (4.55, 0.18, 0.12), mats["paper"], bevel=0.008)
    for index, x in enumerate([-2.35, -1.75, 1.15, 1.75]):
        cube(f"CvRecordsArchive_PublicCatalogLight_{index}", group, (x, 2.18, -2.98), (0.12, 1.92, 0.07), [mats["paper"], mats["mint"], mats["screen"], mats["paper"]][index], bevel=0.004)
    for index, z in enumerate([-4.58, -4.14, -3.7]):
        cube(f"CvRecordsArchive_EntryStep_{index}", group, (-0.6, 0.17 + index * 0.052, z), (5.6 - index * 0.64, 0.13, 0.38), mats["stone"], bevel=0.024)
    cube("CvRecordsArchive_PorticoBeam", group, (-0.6, 3.42, -3.0), (12.2, 0.28, 0.32), mats["wood"], bevel=0.024)
    cube("CvRecordsArchive_PorticoGlass", group, (-0.6, 2.56, -3.08), (9.2, 1.04, 0.08), mats["glass"], bevel=0.008)
    for x in [-5.4, -3.7, -1.95, 0.75, 2.5, 4.2]:
        cube("CvRecordsArchive_PorticoColumn", group, (x, 1.82, -3.08), (0.3, 3.05, 0.3), mats["stone_shadow"], bevel=0.018)
    for x in [-4.2, -2.75, 1.55, 3.0]:
        cube("CvRecordsArchive_ArchivePilaster", group, (x, 2.15, -2.36), (0.18, 3.6, 0.18), mats["gold"], bevel=0.008)
    for row, y in enumerate([1.08, 1.72, 2.36, 3.0]):
        cube(f"CvRecordsArchive_FacadeBand_{row}", group, (-0.65, y + 0.3, -2.18), (9.9, 0.075, 0.08), mats["wood"], bevel=0.004)
        for col, x in enumerate([-4.1, -2.9, 1.7, 2.9, 4.1]):
            mat_key = "paper" if col < 2 else "glass"
            cube(f"CvRecordsArchive_FacadeRecord_{row}_{col}", group, (x, y, -2.25), (0.7, 0.42, 0.07), mats[mat_key], bevel=0.006)
    for x in [4.3, 5.05, 5.8, 6.55]:
        for y in [1.0, 1.58, 2.16, 2.74]:
            cube("CvRecordsArchive_ShelfFile", group, (x, y, -1.72), (0.38, 0.34, 0.07), mats["paper" if y < 2 else "foam"], bevel=0.004)
    for index, x in enumerate([-6.58, -5.95, -5.32]):
        for y in [1.08, 1.82, 2.56]:
            cube(f"CvRecordsArchive_Certificate_{index}", group, (x, y, -1.64), (0.42, 0.52, 0.07), mats["gold" if index == 1 else "paper"], bevel=0.006)
    for row, y in enumerate([1.08, 1.72, 2.36, 3.0]):
        cube(f"CvRecordsArchive_BackShelfBand_{row}", group, (-0.35, y + 0.28, 2.88), (10.2, 0.08, 0.08), mats["wood"], bevel=0.004)
        for col, x in enumerate([-4.62, -3.42, -2.22, -1.02, 0.18, 1.38, 2.58, 3.78, 4.98]):
            material = [mats["paper"], mats["foam"], mats["screen"], mats["paper"], mats["gold"], mats["paper"], mats["mint"], mats["paper"], mats["foam"]][col]
            cube(f"CvRecordsArchive_BackRecord_{row}_{col}", group, (x, y, 3.02), (0.62, 0.38, 0.07), material, bevel=0.006)
    cube("CvRecordsArchive_RouteVaultFace", group, (-0.6, 2.28, 3.12), (5.35, 3.9, 0.24), mats["dark"], bevel=0.04)
    cylinder("CvRecordsArchive_RouteVaultSeal", group, (-0.6, 2.34, 3.32), 1.28, 0.12, mats["gold"], vertices=12, bevel=0.012)
    cylinder("CvRecordsArchive_RouteVaultCore", group, (-0.6, 2.34, 3.4), 0.78, 0.08, mats["mint"], vertices=12, bevel=0.008)
    cube("CvRecordsArchive_RouteVaultHandle_H", group, (-0.6, 2.34, 3.48), (1.64, 0.1, 0.07), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_RouteVaultHandle_V", group, (-0.6, 2.34, 3.49), (0.1, 1.64, 0.07), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_RouteVaultLintel", group, (-0.6, 4.35, 3.36), (6.15, 0.26, 0.2), mats["paper"], bevel=0.012)
    cube("CvRecordsArchive_RouteLedgerSteps", group, (-0.6, 0.58, 3.42), (4.85, 0.22, 0.28), mats["paper"], bevel=0.012)
    for index, x in enumerate([-4.35, -3.25, 2.05, 3.15]):
        cube(f"CvRecordsArchive_RouteCatalogPillar_{index}", group, (x, 2.46, 3.34), (0.22, 3.35, 0.12), [mats["paper"], mats["screen"], mats["mint"], mats["paper"]][index], bevel=0.006)
    cube("CvRecordsArchive_RouteArchivePortalFrame", group, (-0.6, 2.86, 3.56), (7.7, 4.85, 0.34), mats["stone_shadow"], bevel=0.042)
    cube("CvRecordsArchive_RouteArchivePortalVoid", group, (-0.6, 2.7, 3.78), (5.52, 3.55, 0.18), mats["dark"], bevel=0.026)
    cube("CvRecordsArchive_RouteArchivePortalHeader", group, (-0.6, 5.38, 3.86), (8.3, 0.34, 0.32), mats["wood"], bevel=0.022)
    cube("CvRecordsArchive_RouteDocumentSpine", group, (-0.6, 5.42, 4.04), (6.35, 0.26, 0.14), mats["paper"], bevel=0.008)
    cube("CvRecordsArchive_RouteDocumentSpineGlow", group, (-0.6, 5.66, 4.12), (5.45, 0.08, 0.07), mats["mint"], bevel=0.004)
    for index, x in enumerate([-3.72, -2.92, -2.12, 0.92, 1.72, 2.52]):
        height = 2.65 if index % 3 else 3.05
        material = [mats["paper"], mats["foam"], mats["screen"], mats["gold"], mats["paper"], mats["mint"]][index]
        cube(f"CvRecordsArchive_RouteClassificationShelf_{index}", group, (x, 2.52, 4.02), (0.48, height, 0.12), material, bevel=0.006)
    for index, x in enumerate([-2.94, -2.1, -1.26, -0.42, 0.42, 1.26, 2.1]):
        material = [mats["paper"], mats["screen"], mats["gold"], mats["foam"], mats["mint"], mats["paper"], mats["screen"]][index]
        cube(f"CvRecordsArchive_RouteFileCapsule_{index}", group, (x, 1.0 + (index % 3) * 0.44, 4.13), (0.62, 0.24, 0.1), material, bevel=0.014)
    cube("CvRecordsArchive_RouteResumeSealBackplate", group, (-0.6, 3.02, 4.18), (1.72, 1.96, 0.12), mats["stone"], bevel=0.018)
    cylinder("CvRecordsArchive_RouteResumeSeal", group, (-0.6, 3.02, 4.28), 0.74, 0.08, mats["gold"], vertices=12, bevel=0.008)
    cube("CvRecordsArchive_RouteResumePageMark", group, (-0.6, 3.02, 4.36), (0.56, 0.78, 0.06), mats["paper"], bevel=0.006)
    for side, x in [(-1, -7.18), (1, 7.18)]:
        cube(f"CvRecordsArchive_SideFacade_{side}", group, (x, 2.02, 0.25), (0.08, 3.2, 3.72), mats["stone_shadow"], bevel=0.012)
        for z in [-1.1, 0.05, 1.2]:
            for y in [1.16, 1.86, 2.56]:
                cube(f"CvRecordsArchive_SideRecord_{side}_{z}_{y}", group, (x + side * 0.05, y, z), (0.06, 0.42, 0.62), mats["glass" if y > 2 else "paper"], bevel=0.004)
    for side, x in [(-1, -8.56), (1, 8.56)]:
        cube(f"CvRecordsArchive_RouteSideArchiveFacade_{side}", group, (x, 3.02, 0.42), (0.12, 4.72, 3.15), mats["dark"], bevel=0.028)
        cube(f"CvRecordsArchive_RouteSideArchiveLintel_{side}", group, (x + side * 0.16, 5.48, 0.42), (0.08, 0.24, 3.6), mats["stone_shadow"], bevel=0.012)
        cube(f"CvRecordsArchive_RouteSideArchiveSill_{side}", group, (x + side * 0.16, 0.58, 0.42), (0.08, 0.22, 3.35), mats["stone_shadow"], bevel=0.012)
        for z in [-1.24, 2.08]:
            cube(f"CvRecordsArchive_RouteSideArchiveJamb_{side}_{z}", group, (x + side * 0.16, 3.02, z), (0.08, 4.52, 0.18), mats["stone_shadow"], bevel=0.01)
        cube(f"CvRecordsArchive_RouteSideDocumentSpine_{side}", group, (x + side * 0.13, 5.62, 0.42), (0.08, 0.24, 2.78), mats["paper"], bevel=0.006)
        cube(f"CvRecordsArchive_RouteSideDocumentGlow_{side}", group, (x + side * 0.18, 5.86, 0.42), (0.06, 0.08, 2.36), mats["mint"], bevel=0.004)
        cylinder(f"CvRecordsArchive_RouteSideResumeSeal_{side}", group, (x + side * 0.2, 3.18, 0.42), 0.82, 0.12, mats["gold"], vertices=12, rot=(0, math.pi / 2, 0), bevel=0.008)
        cube(f"CvRecordsArchive_RouteSideResumePage_{side}", group, (x + side * 0.28, 3.18, 0.42), (0.06, 0.72, 0.52), mats["paper"], bevel=0.006)
        for index, z in enumerate([-0.94, -0.44, 0.06, 0.56, 1.06]):
            material = [mats["paper"], mats["screen"], mats["gold"], mats["foam"], mats["mint"]][index]
            cube(f"CvRecordsArchive_RouteSideShelf_{side}_{index}", group, (x + side * 0.21, 2.12 + (index % 2) * 0.46, z), (0.06, 0.16, 0.36), material, bevel=0.004)
        for index, z in enumerate([-1.18, -0.7, 0.74, 1.22]):
            cube(f"CvRecordsArchive_RouteSideCatalogLine_{side}_{index}", group, (x + side * 0.22, 1.28 + index * 0.36, z), (0.05, 0.08, 0.62), mats["paper" if index % 2 else "screen"], bevel=0.003)
    cube("CvRecordsArchive_AccessKiosk", group, (3.05, 0.78, -3.52), (1.25, 1.18, 0.72), mats["dark"], bevel=0.035)
    cube("CvRecordsArchive_KioskScreen", group, (3.05, 1.18, -3.9), (0.86, 0.46, 0.06), mats["mint"], bevel=0.006)
    cube("CvRecordsArchive_PdfBeacon", group, (4.4, 1.42, -3.45), (0.5, 1.6, 0.5), mats["screen"], bevel=0.04)
    for x in [-4.7, -3.35, 2.3, 3.65]:
        cube("CvRecordsArchive_FrontColumn", group, (x, 1.72, -2.26), (0.26, 3.16, 0.26), mats["dark"], bevel=0.018)
    for x in [-6.9, 6.9]:
        cube("CvRecordsArchive_SideArchiveLight", group, (x, 2.55, -1.28), (0.18, 0.58, 0.14), mats["amber"], bevel=0.014)
    cube("CvRecordsArchive_HeaderGlow", group, (-0.6, 3.7, -2.48), (7.4, 0.09, 0.08), mats["mint"], bevel=0.006)
    cube("CvRecordsArchive_RecordTower", group, (-5.1, 5.08, 1.18), (1.35, 2.55, 1.45), mats["stone_shadow"], bevel=0.035)
    cube("CvRecordsArchive_RecordTowerCap", group, (-5.1, 6.52, 1.18), (1.85, 0.32, 1.85), mats["wood"], bevel=0.03)
    cube("CvRecordsArchive_SignatureStack", group, (4.9, 5.02, 1.08), (1.28, 2.4, 1.32), mats["stone"], bevel=0.035)
    cube("CvRecordsArchive_SignatureGlow", group, (4.9, 6.34, 0.34), (0.86, 0.1, 0.08), mats["gold"], bevel=0.004)
    cube("CvRecordsArchive_LeftArchiveSpineTower", group, (-8.15, 4.34, 0.68), (0.88, 5.9, 3.68), mats["stone_shadow"], bevel=0.034)
    cube("CvRecordsArchive_RightArchiveSpineTower", group, (6.95, 4.34, 0.68), (0.88, 5.9, 3.68), mats["stone_shadow"], bevel=0.034)
    cube("CvRecordsArchive_LeftSpineCap", group, (-8.15, 7.42, 0.68), (1.26, 0.3, 4.0), mats["wood"], bevel=0.022)
    cube("CvRecordsArchive_RightSpineCap", group, (6.95, 7.42, 0.68), (1.26, 0.3, 4.0), mats["wood"], bevel=0.022)
    for index, y in enumerate([2.3, 3.05, 3.8, 4.55, 5.3, 6.05]):
        material = [mats["paper"], mats["foam"], mats["screen"], mats["gold"], mats["paper"], mats["mint"]][index]
        cube(f"CvRecordsArchive_LeftSpineRecord_{index}", group, (-7.64, y, -0.76), (0.08, 0.42, 1.18), material, bevel=0.004)
        cube(f"CvRecordsArchive_RightSpineRecord_{index}", group, (6.44, y, -0.76), (0.08, 0.42, 1.18), material, bevel=0.004)
        cube(f"CvRecordsArchive_LeftSpineLedger_{index}", group, (-7.64, y, 1.44), (0.08, 0.1, 1.38), material, bevel=0.003)
        cube(f"CvRecordsArchive_RightSpineLedger_{index}", group, (6.44, y, 1.44), (0.08, 0.1, 1.38), material, bevel=0.003)
    cube("CvRecordsArchive_LeftReadingHall", group, (-6.2, 3.98, 0.72), (2.35, 2.0, 3.7), mats["stone"], bevel=0.035)
    cube("CvRecordsArchive_RightDigitalHall", group, (6.2, 3.98, 0.72), (2.35, 2.0, 3.7), mats["glass"], bevel=0.02)
    cube("CvRecordsArchive_LeftHallCap", group, (-6.2, 5.12, 0.72), (2.72, 0.28, 4.05), mats["wood"], bevel=0.022)
    cube("CvRecordsArchive_RightHallCap", group, (6.2, 5.12, 0.72), (2.72, 0.28, 4.05), mats["wood"], bevel=0.022)
    cube("CvRecordsArchive_VaultStack", group, (-0.6, 6.34, 0.68), (6.8, 2.5, 3.9), mats["stone_shadow"], bevel=0.034)
    cube("CvRecordsArchive_VaultCrown", group, (-0.6, 7.78, 0.68), (7.55, 0.34, 4.45), mats["wood"], bevel=0.026)
    cube("CvRecordsArchive_ProtectedGlassCore", group, (-0.6, 6.28, -1.48), (4.3, 1.72, 0.08), mats["glass"], bevel=0.008)
    cube("CvRecordsArchive_RecordsBridge", group, (-0.6, 5.86, 2.94), (12.7, 0.2, 0.32), mats["gold"], bevel=0.008)
    cube("CvRecordsArchive_DocumentCrownBridge", group, (-0.6, 8.34, 0.78), (8.6, 0.28, 2.9), mats["wood"], bevel=0.022)
    for index, x in enumerate([-3.3, -2.2, -1.1, 0.0, 1.1, 2.2, 3.3]):
        material = [mats["paper"], mats["foam"], mats["gold"], mats["paper"], mats["mint"], mats["paper"], mats["foam"]][index]
        cube(f"CvRecordsArchive_CrownDocumentStack_{index}", group, (x, 8.72 + (index % 3) * 0.12, 0.72), (0.72, 0.18, 2.42), material, rot=(0, 0, 0.035 - index * 0.01), bevel=0.006)
    for row, y in enumerate([5.52, 6.12, 6.72]):
        cube(f"CvRecordsArchive_UpperLedgerBand_{row}", group, (-0.6, y, -1.32), (5.8, 0.075, 0.08), mats["gold"], bevel=0.004)
        for col, x in enumerate([-2.75, -1.35, 0.05, 1.45, 2.85]):
            cube(f"CvRecordsArchive_UpperLedgerCard_{row}_{col}", group, (x, y - 0.2, -1.4), (0.74, 0.34, 0.07), [mats["paper"], mats["foam"], mats["screen"], mats["gold"], mats["paper"]][(row + col) % 5], bevel=0.005)
    for row, y in enumerate([5.52, 6.12, 6.72]):
        cube(f"CvRecordsArchive_RearLedgerBand_{row}", group, (-0.6, y, 2.74), (5.8, 0.075, 0.08), mats["gold"], bevel=0.004)
        for col, x in enumerate([-2.75, -1.35, 0.05, 1.45, 2.85]):
            cube(f"CvRecordsArchive_RearLedgerCard_{row}_{col}", group, (x, y - 0.2, 2.82), (0.74, 0.34, 0.07), [mats["paper"], mats["foam"], mats["screen"], mats["gold"], mats["paper"]][(row + col + 2) % 5], bevel=0.005)
    cube("CvRecordsArchive_RearVaultSeal", group, (-0.6, 6.06, 2.9), (1.1, 1.1, 0.06), mats["mint"], bevel=0.02)
    cube("CvRecordsArchive_UpperVaultDoor", group, (-0.6, 5.92, -1.5), (1.72, 1.44, 0.06), mats["dark"], bevel=0.014)
    cube("CvRecordsArchive_UpperVaultSeal", group, (-0.6, 6.06, -1.56), (0.72, 0.72, 0.045), mats["mint"], bevel=0.018)
    for side, x in [(-1, -7.78), (1, 7.78)]:
        cube(f"CvRecordsArchive_SecureStack_{side}", group, (x, 4.72, 0.68), (1.08, 4.7, 3.2), mats["stone_shadow"], bevel=0.03)
        cube(f"CvRecordsArchive_SecureStackCap_{side}", group, (x, 7.18, 0.68), (1.5, 0.3, 3.7), mats["wood"], bevel=0.022)
        for index, y in enumerate([3.64, 4.24, 4.84, 5.44, 6.04]):
            cube(f"CvRecordsArchive_SecureStackRecord_{side}_{index}", group, (x - side * 0.58, y, -0.78), (0.08, 0.08, 1.36), [mats["paper"], mats["screen"], mats["gold"], mats["foam"], mats["mint"]][index], bevel=0.003)
    for index, x in enumerate([-3.2, -1.6, 0, 1.6, 3.2]):
        cube(f"CvRecordsArchive_RoofLedger_{index}", group, (x, 8.06 + (index % 2) * 0.12, -0.58), (0.78, 0.12, 3.6), mats["paper" if index % 2 else "foam"], rot=(0, 0, 0.06 - index * 0.025), bevel=0.006)
    cube("CvRecordsArchive_DocumentStairAxis", group, (-0.6, 0.34, -5.16), (7.9, 0.08, 0.52), mats["screen"], bevel=0.006)
    for side, x in [(-1, -6.2), (1, 6.2)]:
        for y in [3.54, 4.18]:
            cube(f"CvRecordsArchive_UpperGallery_{side}_{y}", group, (x, y, -1.36), (1.58, 0.42, 0.08), mats["paper" if side < 0 else "screen"], bevel=0.006)
    for index, y in enumerate([4.52, 4.98, 5.44, 5.9]):
        cube(f"CvRecordsArchive_TowerFileLight_{index}", group, (-5.74, y, 0.48), (0.08, 0.08, 0.64), [mats["paper"], mats["screen"], mats["gold"], mats["foam"]][index], bevel=0.003)
        cube(f"CvRecordsArchive_SignatureFileLight_{index}", group, (4.32, y, 0.48), (0.08, 0.08, 0.64), [mats["screen"], mats["paper"], mats["mint"], mats["paper"]][index], bevel=0.003)


def create_skills_array(mats):
    group = root("EnvPolishSkillsArray")
    cube("SkillsArray_Base", group, (0, 0.12, 0), (5.0, 0.24, 2.2), mats["stone_shadow"], bevel=0.035)
    for i, x in enumerate([-1.9, -0.95, 0, 0.95, 1.9]):
        cube(f"SkillsArray_Pillar_{i}", group, (x, 1.12 + i * 0.08, 0), (0.46, 1.95 + i * 0.16, 0.46), mats["dark"], bevel=0.025)
        cube(f"SkillsArray_Screen_{i}", group, (x, 1.18 + i * 0.08, -0.27), (0.34, 1.22, 0.06), [mats["screen"], mats["mint"], mats["purple"], mats["aqua"], mats["screen"]][i], bevel=0.006)
    cube("SkillsArray_CableRun", group, (0, 0.44, 0.76), (4.4, 0.12, 0.16), mats["rope"], bevel=0.015)


def create_skills_data_center(mats):
    group = root("EnvPolishSkillsDataCenter")
    cube("SkillsDataCenter_ServiceCourt", group, (0, 0.09, -0.34), (14.4, 0.18, 8.8), mats["dark"], bevel=0.055)
    cube("SkillsDataCenter_LearningCampusBase", group, (-0.48, 2.95, -0.22), (13.8, 5.55, 6.65), mats["stone_shadow"], bevel=0.074)
    cube("SkillsDataCenter_LearningCampusRoof", group, (-0.48, 5.98, -0.22), (14.5, 0.44, 7.15), mats["dark"], bevel=0.036)
    cube("SkillsDataCenter_LearningCampusRouteFacade", group, (-0.48, 3.1, -3.9), (12.9, 5.36, 0.42), mats["stone_shadow"], bevel=0.038)
    cube("SkillsDataCenter_LearningCampusGlassBand", group, (-0.48, 3.16, -4.18), (9.75, 3.62, 0.08), mats["glass"], bevel=0.008)
    for index, x in enumerate([-4.85, -3.25, -1.65, -0.05, 1.55, 3.15, 4.75]):
        cube(f"SkillsDataCenter_LearningFacadePier_{index}", group, (x, 3.1, -4.28), (0.16, 4.54, 0.08), mats["paper"], bevel=0.004)
    for index, y in enumerate([1.52, 2.16, 2.8, 3.44, 4.08]):
        cube(f"SkillsDataCenter_LearningProgressBand_{index}", group, (-0.48, y, -4.36), (8.8 - index * 0.45, 0.08, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["screen"]][index], bevel=0.003)
    cube("SkillsDataCenter_ServerHall", group, (-1.05, 2.25, 0.38), (10.8, 4.3, 5.15), mats["dark"], bevel=0.048)
    cube("SkillsDataCenter_UpperServerFloor", group, (-1.04, 4.95, 0.35), (9.45, 1.82, 4.25), mats["dark"], bevel=0.04)
    cube("SkillsDataCenter_CommandRoom", group, (4.9, 1.7, -0.16), (3.55, 3.15, 4.22), mats["glass"], bevel=0.035)
    cube("SkillsDataCenter_CommandStack", group, (4.98, 4.0, -0.14), (2.65, 3.86, 3.28), mats["glass"], bevel=0.03)
    cube("SkillsDataCenter_CurriculumTowerCore", group, (-6.95, 5.25, -1.85), (2.28, 9.55, 2.35), mats["stone_shadow"], bevel=0.042)
    cube("SkillsDataCenter_CurriculumTowerGlass", group, (-6.95, 5.0, -3.05), (1.42, 6.7, 0.08), mats["glass"], bevel=0.006)
    cube("SkillsDataCenter_CurriculumTowerCrown", group, (-6.95, 10.18, -1.85), (3.1, 0.42, 2.9), mats["aqua"], bevel=0.018)
    for index, y in enumerate([2.1, 2.85, 3.6, 4.35, 5.1, 5.85, 6.6, 7.35]):
        cube(f"SkillsDataCenter_CurriculumTowerLessonSlot_{index}", group, (-7.78, y, -2.3), (0.08, 0.32, 0.74), [mats["screen"], mats["mint"], mats["paper"], mats["aqua"]][index % 4], bevel=0.003)
    cube("SkillsDataCenter_CoolingPlant", group, (-6.35, 1.38, 0.78), (2.92, 2.56, 4.3), mats["stone"], bevel=0.04)
    cube("SkillsDataCenter_CoolingArchiveTower", group, (-6.48, 3.74, 0.72), (2.08, 4.3, 3.42), mats["stone"], bevel=0.032)
    cube("SkillsDataCenter_RoofSlab", group, (-0.85, 4.42, 0.32), (12.45, 0.36, 5.85), mats["stone"], bevel=0.035)
    cube("SkillsDataCenter_UpperRoofSlab", group, (-0.9, 5.88, 0.24), (10.4, 0.3, 4.5), mats["stone"], bevel=0.028)
    cube("SkillsDataCenter_RoofSpine", group, (-0.85, 4.84, -1.95), (13.05, 0.24, 0.38), mats["aqua"], bevel=0.018)
    cube("SkillsDataCenter_CoreFiberSpine", group, (-0.85, 6.32, -1.62), (9.95, 0.18, 0.22), mats["screen"], bevel=0.008)
    cube("SkillsDataCenter_EntryCanopy", group, (0.2, 2.28, -3.35), (6.05, 0.32, 1.35), mats["dark"], bevel=0.026)
    cube("SkillsDataCenter_EntryPortal", group, (0.2, 1.9, -3.92), (5.55, 3.0, 0.18), mats["dark"], bevel=0.022)
    cube("SkillsDataCenter_EntryGlass", group, (0.2, 1.86, -4.02), (3.85, 1.94, 0.08), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_SkillStackPortalFrame", group, (0.2, 2.55, -4.18), (6.62, 3.35, 0.12), mats["screen"], bevel=0.012)
    cube("SkillsDataCenter_SkillStackPortalCutout", group, (0.2, 2.42, -4.25), (5.4, 2.42, 0.12), mats["dark"], bevel=0.008)
    cube("SkillsDataCenter_SkillStackHeader", group, (0.2, 3.84, -4.34), (6.15, 0.32, 0.14), mats["aqua"], bevel=0.01)
    cube("SkillsDataCenter_SkillStackThreshold", group, (0.2, 0.92, -4.34), (5.75, 0.26, 0.16), mats["paper"], bevel=0.012)
    for index, y in enumerate([1.34, 1.78, 2.22, 2.66, 3.1]):
        material = [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["screen"]][index]
        cube(f"SkillsDataCenter_SkillStackLevel_{index}", group, (0.2, y, -4.42), (4.78 - index * 0.42, 0.1, 0.1), material, bevel=0.004)
    cube("SkillsDataCenter_LearningAtrium", group, (-5.55, 2.22, -3.18), (2.55, 3.85, 1.62), mats["glass"], bevel=0.026)
    cube("SkillsDataCenter_AtriumFrame", group, (-5.55, 4.28, -3.18), (2.9, 0.28, 1.88), mats["screen"], bevel=0.014)
    cube("SkillsDataCenter_AtriumBeacon", group, (-5.55, 5.46, -3.18), (1.7, 2.2, 0.28), mats["mint"], bevel=0.018)
    cube("SkillsDataCenter_RouteDataCanopy", group, (-0.52, 5.98, -3.02), (11.7, 0.18, 0.34), mats["screen"], bevel=0.01)
    cube("SkillsDataCenter_RouteDataCanopyGlow", group, (-0.52, 5.82, -3.25), (10.6, 0.08, 0.1), mats["mint"], bevel=0.006)
    cube("SkillsDataCenter_RouteLearningAtriumFrame", group, (0.15, 2.55, -4.72), (7.2, 3.85, 0.16), mats["screen"], bevel=0.014)
    cube("SkillsDataCenter_RouteLearningAtriumGlass", group, (0.15, 2.42, -4.83), (5.85, 2.72, 0.08), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_RouteSkillTreeTrunk", group, (0.15, 2.48, -4.93), (0.12, 2.1, 0.08), mats["mint"], bevel=0.004)
    for index, (y, width, material) in enumerate([(1.62, 2.25, mats["screen"]), (2.12, 3.45, mats["aqua"]), (2.68, 4.35, mats["purple"]), (3.22, 5.1, mats["mint"])]):
        cube(f"SkillsDataCenter_RouteSkillTreeBranch_{index}", group, (0.15, y, -4.98), (width, 0.09, 0.08), material, bevel=0.003)
    cube("SkillsDataCenter_RouteCertificationVault", group, (-5.48, 2.38, -4.74), (1.55, 2.95, 0.12), mats["stone_shadow"], bevel=0.012)
    for index, y in enumerate([1.28, 1.82, 2.36, 2.9, 3.44]):
        cube(f"SkillsDataCenter_RouteCertificationSlot_{index}", group, (-5.48, y, -4.86), (1.05, 0.18, 0.08), [mats["paper"], mats["screen"], mats["mint"], mats["aqua"], mats["paper"]][index], bevel=0.003)
    cube("SkillsDataCenter_RouteDisciplineLaneSpine", group, (4.9, 1.16, -4.74), (1.8, 0.22, 0.12), mats["stone_shadow"], bevel=0.008)
    for index, y in enumerate([1.58, 1.98, 2.38, 2.78]):
        cube(f"SkillsDataCenter_RouteDisciplineLane_{index}", group, (4.9, y, -4.88), (1.34, 0.08, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"]][index], bevel=0.003)
    cube("SkillsDataCenter_RouteCurriculumPortalDeck", group, (0.2, 0.36, -5.02), (7.6, 0.18, 0.46), mats["stone_shadow"], bevel=0.018)
    cube("SkillsDataCenter_RouteCurriculumPortalLeftPier", group, (-3.58, 2.35, -5.06), (0.34, 3.4, 0.22), mats["dark"], bevel=0.014)
    cube("SkillsDataCenter_RouteCurriculumPortalRightPier", group, (3.98, 2.35, -5.06), (0.34, 3.4, 0.22), mats["dark"], bevel=0.014)
    cube("SkillsDataCenter_RouteCurriculumPortalHeader", group, (0.2, 4.18, -5.08), (7.92, 0.34, 0.26), mats["screen"], bevel=0.012)
    cube("SkillsDataCenter_RouteCurriculumHeaderGlow", group, (0.2, 4.0, -5.22), (6.8, 0.08, 0.08), mats["mint"], bevel=0.004)
    cube("SkillsDataCenter_RouteCurriculumSpine", group, (-1.42, 2.32, -5.24), (0.16, 2.56, 0.08), mats["mint"], bevel=0.004)
    for index, (y, width, material) in enumerate([(1.28, 1.8, mats["screen"]), (1.72, 2.3, mats["aqua"]), (2.16, 2.85, mats["mint"]), (2.6, 3.35, mats["purple"]), (3.04, 3.85, mats["screen"])]):
        cube(f"SkillsDataCenter_RouteCurriculumStep_{index}", group, (-0.05 + index * 0.2, y, -5.32), (width, 0.13, 0.08), material, bevel=0.004)
    cube("SkillsDataCenter_RouteSkillLadderLeftRail", group, (1.52, 2.34, -5.28), (0.08, 2.48, 0.08), mats["aqua"], bevel=0.003)
    cube("SkillsDataCenter_RouteSkillLadderRightRail", group, (2.62, 2.34, -5.28), (0.08, 2.48, 0.08), mats["aqua"], bevel=0.003)
    for index, y in enumerate([1.24, 1.68, 2.12, 2.56, 3.0, 3.44]):
        cube(f"SkillsDataCenter_RouteSkillLadderRung_{index}", group, (2.07, y, -5.34), (1.18, 0.07, 0.07), [mats["paper"], mats["mint"], mats["screen"]][index % 3], bevel=0.003)
    cube("SkillsDataCenter_RouteClassroomWingLeft", group, (-4.95, 2.78, -4.7), (2.2, 3.56, 0.24), mats["stone_shadow"], bevel=0.018)
    cube("SkillsDataCenter_RouteClassroomWingRight", group, (5.25, 2.78, -4.7), (2.2, 3.56, 0.24), mats["stone_shadow"], bevel=0.018)
    for side, x in enumerate([-4.95, 5.25]):
        for row, y in enumerate([1.82, 2.64, 3.46]):
            cube(f"SkillsDataCenter_RouteClassroomWindow_{side}_{row}", group, (x, y, -4.88), (1.18, 0.46, 0.08), [mats["screen"], mats["mint"], mats["aqua"]][row], bevel=0.004)
        cube(f"SkillsDataCenter_RouteClassroomHeader_{side}", group, (x, 4.66, -4.88), (1.66, 0.18, 0.08), mats["paper"], bevel=0.004)
    cube("SkillsDataCenter_RouteCertificationGallery", group, (-5.92, 2.42, -5.02), (1.8, 3.06, 0.16), mats["dark"], bevel=0.014)
    cube("SkillsDataCenter_RouteCertificationGalleryHeader", group, (-5.92, 3.96, -5.18), (1.94, 0.16, 0.08), mats["paper"], bevel=0.004)
    for index, y in enumerate([1.36, 1.88, 2.4, 2.92, 3.44]):
        cube(f"SkillsDataCenter_RouteCertificationFrame_{index}", group, (-5.92, y, -5.2), (1.12, 0.26, 0.08), [mats["paper"], mats["screen"], mats["aqua"], mats["mint"], mats["paper"]][index], bevel=0.004)
    for index, (x, y, material) in enumerate([(4.65, 1.42, mats["screen"]), (5.58, 1.42, mats["mint"]), (4.65, 2.46, mats["aqua"]), (5.58, 2.46, mats["purple"])]):
        cube(f"SkillsDataCenter_RoutePracticeLabPod_{index}", group, (x, y, -5.04), (0.74, 0.62, 0.28), mats["dark"], bevel=0.014)
        cube(f"SkillsDataCenter_RoutePracticeLabWindow_{index}", group, (x, y, -5.23), (0.5, 0.36, 0.08), material, bevel=0.004)
    cube("SkillsDataCenter_RoutePracticeLabCanopy", group, (5.12, 3.1, -5.06), (2.4, 0.18, 0.18), mats["screen"], bevel=0.006)
    cube("SkillsDataCenter_RouteLearningCourtDeck", group, (0.18, 0.32, -5.42), (8.9, 0.16, 0.74), mats["stone"], bevel=0.018)
    cube("SkillsDataCenter_RouteLearningCourtWarmInlay", group, (0.18, 0.43, -5.48), (7.72, 0.07, 0.36), mats["paper"], bevel=0.012)
    cube("SkillsDataCenter_RouteLearningCommonsGlass", group, (0.18, 2.38, -5.54), (6.72, 2.52, 0.08), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_RouteLearningCommonsHeader", group, (0.18, 3.78, -5.62), (7.24, 0.28, 0.14), mats["screen"], bevel=0.01)
    cube("SkillsDataCenter_RouteLearningCommonsLeftPier", group, (-3.62, 2.38, -5.58), (0.3, 3.04, 0.18), mats["dark"], bevel=0.012)
    cube("SkillsDataCenter_RouteLearningCommonsRightPier", group, (3.98, 2.38, -5.58), (0.3, 3.04, 0.18), mats["dark"], bevel=0.012)
    cube("SkillsDataCenter_RoutePracticeAtriumWing", group, (5.25, 2.0, -5.44), (2.45, 2.75, 0.12), mats["glass"], bevel=0.012)
    cube("SkillsDataCenter_RoutePracticeAtriumHeader", group, (5.25, 3.55, -5.58), (2.82, 0.22, 0.12), mats["aqua"], bevel=0.006)
    cube("SkillsDataCenter_RouteCertificationBeaconFrame", group, (-5.92, 2.62, -5.48), (2.04, 3.52, 0.14), mats["dark"], bevel=0.014)
    cube("SkillsDataCenter_RouteCertificationBeaconCore", group, (-5.92, 2.72, -5.62), (1.18, 2.4, 0.08), mats["paper"], bevel=0.006)
    for index, y in enumerate([1.62, 2.18, 2.74, 3.3]):
        cube(f"SkillsDataCenter_RouteCertificationBeaconMark_{index}", group, (-5.92, y, -5.7), (0.82, 0.1, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["paper"]][index], bevel=0.003)
    for index, x in enumerate([-2.58, -1.36, -0.14, 1.08, 2.3]):
        cube(f"SkillsDataCenter_RouteMentorReviewStep_{index}", group, (x, 0.72 + index * 0.1, -5.86), (0.96, 0.14, 0.32), mats["paper" if index % 2 else "stone"], bevel=0.006)
        cube(f"SkillsDataCenter_RouteMentorReviewScreen_{index}", group, (x, 1.02 + index * 0.1, -5.98), (0.68, 0.18, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["screen"]][index], bevel=0.003)
    cube("SkillsDataCenter_RouteLearningProgressBeam", group, (0.18, 4.28, -5.6), (7.92, 0.14, 0.12), mats["mint"], bevel=0.004)
    cube("SkillsDataCenter_RouteLearningSystemsFacadeFrame", group, (0.18, 2.82, -6.04), (8.86, 3.72, 0.16), mats["dark"], bevel=0.018)
    cube("SkillsDataCenter_RouteLearningSystemsGlass", group, (0.18, 2.72, -6.16), (7.38, 2.6, 0.08), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_RouteLearningSystemsHeader", group, (0.18, 4.68, -6.16), (8.16, 0.34, 0.12), mats["screen"], bevel=0.008)
    cube("SkillsDataCenter_RouteLearningSystemsThreshold", group, (0.18, 0.88, -6.16), (7.6, 0.26, 0.14), mats["paper"], bevel=0.008)
    for index, y in enumerate([1.46, 1.88, 2.3, 2.72, 3.14, 3.56]):
        width = 5.7 + (index % 3) * 0.58
        x = 0.18 + (index - 2.5) * 0.12
        cube(f"SkillsDataCenter_RouteCurriculumRibbon_{index}", group, (x, y, -6.26), (width, 0.1, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["paper"], mats["screen"]][index], bevel=0.003)
    for index, (x, y, material) in enumerate([
        (-2.78, 1.52, mats["screen"]),
        (-1.36, 1.52, mats["mint"]),
        (0.06, 1.52, mats["aqua"]),
        (1.48, 2.56, mats["purple"]),
        (2.9, 2.56, mats["screen"]),
        (4.32, 2.56, mats["mint"]),
    ]):
        cube(f"SkillsDataCenter_RoutePracticeWindow_{index}", group, (x, y, -6.32), (0.82, 0.52, 0.08), material, bevel=0.004)
    cube("SkillsDataCenter_RouteCertificationBeaconCrown", group, (-5.72, 5.16, -5.96), (1.34, 0.28, 0.34), mats["paper"], bevel=0.012)
    cube("SkillsDataCenter_RouteCertificationBeaconGlow", group, (-5.72, 4.9, -6.18), (0.92, 0.12, 0.08), mats["mint"], bevel=0.004)
    cube("SkillsDataCenter_SideLearningSystemsFacadeFrame", group, (6.98, 2.72, -2.42), (0.16, 3.42, 4.76), mats["dark"], bevel=0.016)
    cube("SkillsDataCenter_SideLearningSystemsGlass", group, (7.08, 2.56, -2.42), (0.08, 2.48, 3.74), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_SideLearningSystemsHeader", group, (7.1, 4.42, -2.42), (0.1, 0.28, 4.24), mats["screen"], bevel=0.006)
    for index, z in enumerate([-4.0, -3.28, -2.56, -1.84, -1.12, -0.4]):
        cube(f"SkillsDataCenter_SideCurriculumRibbon_{index}", group, (7.18, 1.42 + (index % 3) * 0.48, z), (0.08, 0.1, 0.56), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["paper"], mats["screen"]][index], bevel=0.003)
    for index, (z, y, material) in enumerate([
        (-3.76, 2.28, mats["screen"]),
        (-3.04, 2.28, mats["mint"]),
        (-2.32, 2.28, mats["aqua"]),
        (-1.6, 3.1, mats["purple"]),
        (-0.88, 3.1, mats["screen"]),
        (-0.16, 3.1, mats["mint"]),
    ]):
        cube(f"SkillsDataCenter_SidePracticeWindow_{index}", group, (7.22, y, z), (0.08, 0.46, 0.48), material, bevel=0.004)
    cube("SkillsDataCenter_SideAcademyPortal", group, (7.42, 2.72, -2.44), (0.18, 3.92, 5.42), mats["dark"], bevel=0.018)
    cube("SkillsDataCenter_SideAcademyPortalGlass", group, (7.56, 2.64, -2.44), (0.08, 2.74, 4.28), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_SideCurriculumHall", group, (7.64, 3.02, -2.44), (0.14, 3.28, 3.78), mats["stone_shadow"], bevel=0.014)
    cube("SkillsDataCenter_SideCurriculumHallHeader", group, (7.74, 4.86, -2.44), (0.09, 0.34, 4.26), mats["screen"], bevel=0.006)
    for index, z in enumerate([-3.78, -3.08, -2.38, -1.68, -0.98, -0.28]):
        cube(f"SkillsDataCenter_SideCurriculumHallRibbon_{index}", group, (7.82, 1.72 + (index % 3) * 0.46, z), (0.08, 0.1, 0.56), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["paper"], mats["screen"]][index], bevel=0.003)
    for index, (z, y, material) in enumerate([(-3.72, 1.42, mats["screen"]), (-2.78, 1.42, mats["mint"]), (-1.84, 2.42, mats["aqua"]), (-0.9, 2.42, mats["purple"])]):
        cube(f"SkillsDataCenter_SidePracticeStudioBay_{index}", group, (7.94, y, z), (0.1, 0.64, 0.7), mats["dark"], bevel=0.01)
        cube(f"SkillsDataCenter_SidePracticeStudioWindow_{index}", group, (8.02, y, z), (0.08, 0.42, 0.48), material, bevel=0.004)
    cube("SkillsDataCenter_SideSkillLadderLeftRail", group, (8.06, 2.62, -1.34), (0.08, 2.86, 0.08), mats["aqua"], bevel=0.003)
    cube("SkillsDataCenter_SideSkillLadderRightRail", group, (8.06, 2.62, 0.02), (0.08, 2.86, 0.08), mats["aqua"], bevel=0.003)
    for index, y in enumerate([1.36, 1.82, 2.28, 2.74, 3.2, 3.66]):
        cube(f"SkillsDataCenter_SideSkillLadderRung_{index}", group, (8.14, y, -0.66), (0.08, 0.07, 1.48), [mats["paper"], mats["mint"], mats["screen"]][index % 3], bevel=0.003)
    cube("SkillsDataCenter_SideCertificationCrown", group, (7.84, 5.36, -4.0), (0.14, 0.34, 1.52), mats["paper"], bevel=0.012)
    cube("SkillsDataCenter_SideCertificationCrownGlow", group, (8.0, 5.08, -4.0), (0.08, 0.12, 1.06), mats["mint"], bevel=0.004)
    for index, z in enumerate([-3.72, -2.84, -1.96, -1.08]):
        cube(f"SkillsDataCenter_SideMentorReviewStep_{index}", group, (8.08, 0.76 + index * 0.12, z), (0.42, 0.12, 0.74), mats["paper" if index % 2 else "stone"], bevel=0.006)
    cube("SkillsDataCenter_RearLearningSystemsFacadeFrame", group, (-0.78, 2.92, 3.12), (9.96, 3.64, 0.16), mats["dark"], bevel=0.018)
    cube("SkillsDataCenter_RearLearningSystemsGlass", group, (-0.78, 2.74, 3.22), (8.32, 2.42, 0.08), mats["glass"], bevel=0.008)
    cube("SkillsDataCenter_RearLearningSystemsHeader", group, (-0.78, 4.76, 3.24), (9.18, 0.32, 0.12), mats["screen"], bevel=0.008)
    cube("SkillsDataCenter_RearLearningSystemsThreshold", group, (-0.78, 0.9, 3.24), (8.58, 0.24, 0.14), mats["paper"], bevel=0.008)
    cube("SkillsDataCenter_RearKnowledgeCore", group, (-5.2, 2.78, 3.34), (1.28, 2.82, 0.08), mats["mint"], bevel=0.006)
    cube("SkillsDataCenter_RearPracticeLabCore", group, (3.28, 2.78, 3.34), (1.42, 2.82, 0.08), mats["aqua"], bevel=0.006)
    for index, y in enumerate([1.48, 1.9, 2.32, 2.74, 3.16, 3.58]):
        cube(f"SkillsDataCenter_RearCurriculumRibbon_{index}", group, (-0.78, y, 3.4), (5.7 + index * 0.22, 0.1, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["paper"], mats["screen"]][index], bevel=0.003)
    for index, (x, y, material) in enumerate([
        (-3.72, 1.42, mats["screen"]),
        (-2.34, 1.42, mats["mint"]),
        (-0.96, 1.42, mats["aqua"]),
        (0.42, 2.5, mats["purple"]),
        (1.8, 2.5, mats["screen"]),
        (3.18, 2.5, mats["mint"]),
    ]):
        cube(f"SkillsDataCenter_RearPracticeWindow_{index}", group, (x, y, 3.48), (0.86, 0.5, 0.08), material, bevel=0.004)
    for index, x in enumerate([-2.8, -1.7, -0.6, 0.5, 1.6, 2.7]):
        cube(f"SkillsDataCenter_RouteCurriculumModule_{index}", group, (x, 2.18 + (index % 3) * 0.36, -5.72), (0.72, 0.34, 0.08), [mats["screen"], mats["paper"], mats["mint"], mats["aqua"], mats["purple"], mats["paper"]][index], bevel=0.004)
    for index, z in enumerate([-4.05, -3.62, -3.19]):
        cube(f"SkillsDataCenter_EntryStep_{index}", group, (0.2, 0.17 + index * 0.05, z), (5.4 - index * 0.66, 0.13, 0.38), mats["paper"], bevel=0.023)
    cube("SkillsDataCenter_RoofAcademyParapetFront", group, (-0.1, 6.28, -2.92), (12.85, 0.54, 0.4), mats["stone_shadow"], bevel=0.02)
    cube("SkillsDataCenter_RoofAcademyParapetBack", group, (-0.1, 6.24, 2.42), (12.15, 0.42, 0.34), mats["stone_shadow"], bevel=0.018)
    cube("SkillsDataCenter_RoofAcademyParapetLeft", group, (-6.38, 6.24, -0.22), (0.38, 0.42, 5.3), mats["stone_shadow"], bevel=0.018)
    cube("SkillsDataCenter_RoofAcademyParapetRight", group, (6.05, 6.24, -0.22), (0.38, 0.42, 5.3), mats["stone_shadow"], bevel=0.018)
    for index, (x, material, height) in enumerate([
        (-3.9, mats["screen"], 0.86),
        (-1.3, mats["mint"], 1.02),
        (1.3, mats["purple"], 0.9),
        (3.9, mats["aqua"], 0.96),
    ]):
        cube(f"SkillsDataCenter_DisciplinePodium_{index}", group, (x, 6.42, 1.38), (1.46, 0.3, 0.86), mats["stone_shadow"], bevel=0.018)
        cube(f"SkillsDataCenter_DisciplineCore_{index}", group, (x, 6.46 + height * 0.5, 1.38), (0.92, height, 0.64), mats["stone_shadow"], bevel=0.026)
        cube(f"SkillsDataCenter_DisciplineGlow_{index}", group, (x, 6.46 + height * 0.5, 1.0), (0.56, height * 0.66, 0.07), material, bevel=0.006)
        cube(f"SkillsDataCenter_DisciplineCap_{index}", group, (x, 6.52 + height, 1.38), (1.28, 0.18, 0.9), mats["dark"], bevel=0.012)
    cube("SkillsDataCenter_DisciplineBridge", group, (0.0, 6.82, 1.38), (9.4, 0.16, 0.22), mats["aqua"], bevel=0.008)
    cube("SkillsDataCenter_DisciplineBridgeGlow", group, (0.0, 6.98, 1.05), (8.35, 0.07, 0.07), mats["screen"], bevel=0.004)
    cube("SkillsDataCenter_DataSpineBridge", group, (0.0, 6.74, -2.92), (11.45, 0.2, 0.28), mats["screen"], bevel=0.01)
    cube("SkillsDataCenter_DataSpineBridgeGlow", group, (0.0, 6.92, -3.14), (10.35, 0.07, 0.07), mats["mint"], bevel=0.004)
    for index, (x, material, height) in enumerate([
        (-4.45, mats["screen"], 0.96),
        (-1.48, mats["mint"], 1.1),
        (1.48, mats["aqua"], 1.0),
        (4.45, mats["purple"], 1.06),
    ]):
        cube(f"SkillsDataCenter_LearningCoreTower_{index}", group, (x, 6.42 + height * 0.5, -2.2), (0.88, height, 0.72), mats["stone_shadow"], bevel=0.024)
        cube(f"SkillsDataCenter_LearningCoreLight_{index}", group, (x, 6.42 + height * 0.5, -2.62), (0.48, height * 0.64, 0.07), material, bevel=0.004)
        cube(f"SkillsDataCenter_LearningCoreCap_{index}", group, (x, 6.5 + height, -2.2), (1.18, 0.18, 0.96), mats["dark"], bevel=0.012)
    for row, y in enumerate([0.98, 1.56, 2.14, 2.72]):
        cube(f"SkillsDataCenter_RackBand_{row}", group, (-1.25, y + 0.28, -2.1), (9.6, 0.07, 0.08), mats["aqua"], bevel=0.004)
        for col, x in enumerate([-4.65, -3.45, -2.25, -1.05, 0.15, 1.35, 2.55]):
            material = [mats["screen"], mats["mint"], mats["purple"], mats["aqua"]][(row + col) % 4]
            cube(f"SkillsDataCenter_RackLight_{row}_{col}", group, (x, y, -2.18), (0.52, 0.34, 0.07), material, bevel=0.005)
    for column, x in enumerate([-5.0, -3.35, -1.7, -0.05, 1.6, 3.25]):
        cube(f"SkillsDataCenter_TrainingRackColumn_{column}", group, (x, 2.25, -4.52), (0.22, 2.52, 0.1), mats["stone_shadow"], bevel=0.006)
        for row, y in enumerate([1.28, 1.82, 2.36, 2.9]):
            material = [mats["screen"], mats["mint"], mats["aqua"], mats["purple"]][(row + column) % 4]
            cube(f"SkillsDataCenter_TrainingRackBadge_{column}_{row}", group, (x, y, -4.62), (0.72, 0.12, 0.07), material, bevel=0.003)
    for row, y in enumerate([3.38, 3.72, 4.06]):
        cube(f"SkillsDataCenter_ArchiveFacadeBand_{row}", group, (-1.25, y, -2.22), (9.85, 0.1, 0.08), mats["paper" if row == 1 else "aqua"], bevel=0.004)
        for col, x in enumerate([-4.95, -3.85, -2.75, -1.65, -0.55, 0.55, 1.65, 2.75]):
            cube(f"SkillsDataCenter_ArchiveSlot_{row}_{col}", group, (x, y + 0.16, -2.28), (0.62, 0.16, 0.06), [mats["paper"], mats["screen"], mats["mint"], mats["paper"]][(row + col) % 4], bevel=0.004)
    for index, x in enumerate([3.7, 4.45, 5.2, 5.95]):
        cube(f"SkillsDataCenter_CommandMullion_{index}", group, (x, 1.7, -2.1), (0.08, 2.55, 0.08), mats["screen"], bevel=0.004)
    for row, y in enumerate([1.02, 1.64, 2.26]):
        cube(f"SkillsDataCenter_CommandLine_{row}", group, (4.92, y, -2.16), (2.55, 0.06, 0.07), [mats["screen"], mats["mint"], mats["purple"]][row], bevel=0.004)
    for index, x in enumerate([-7.05, -6.35, -5.65]):
        cube(f"SkillsDataCenter_CoolingTower_{index}", group, (x, 2.7, -0.7 + index * 0.62), (0.58, 2.25, 0.58), mats["stone_shadow"], bevel=0.04)
        cube(f"SkillsDataCenter_CoolingGlow_{index}", group, (x, 3.62, -1.02 + index * 0.62), (0.42, 0.08, 0.08), mats["mint"], bevel=0.004)
    for index, x in enumerate([-4.6, -2.35, -0.1, 2.15]):
        cube(f"SkillsDataCenter_RoofUnit_{index}", group, (x, 5.15, 0.82), (1.28, 0.58, 0.9), mats["stone_shadow"], bevel=0.026)
        cube(f"SkillsDataCenter_RoofUnitGlow_{index}", group, (x, 5.36, 0.36), (0.88, 0.08, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"]][index], bevel=0.004)
    cube("SkillsDataCenter_CoolingRoofline", group, (-1.15, 6.12, 2.32), (10.8, 0.2, 0.22), mats["stone_shadow"], bevel=0.012)
    for index, x in enumerate([-4.7, -3.18, -1.66, -0.14, 1.38, 2.9]):
        cube(f"SkillsDataCenter_RoofCoolingFin_{index}", group, (x, 6.48, 2.34), (0.24, 0.38, 0.18), mats["foam" if index % 2 else "aqua"], bevel=0.006)
    for index, x in enumerate([-4.2, -1.4, 1.4, 4.2]):
        cube(f"SkillsDataCenter_CableTrench_{index}", group, (x, 0.22, -3.28), (1.6, 0.08, 1.15), mats["aqua" if index % 2 else "screen"], bevel=0.006)
    cube("SkillsDataCenter_StatusSpine", group, (6.65, 2.28, 0.88), (0.18, 3.2, 2.8), mats["dark"], bevel=0.018)
    for index, y in enumerate([1.05, 1.55, 2.05, 2.55, 3.05]):
        cube(f"SkillsDataCenter_StatusPulse_{index}", group, (6.55, y, -0.22 + (index % 2) * 0.52), (0.08, 0.08, 1.35), [mats["screen"], mats["mint"], mats["purple"], mats["screen"], mats["aqua"]][index], bevel=0.003)
    cube("SkillsDataCenter_NetworkTower", group, (-5.2, 5.58, 1.42), (1.18, 3.0, 1.18), mats["dark"], bevel=0.035)
    cube("SkillsDataCenter_NetworkMegaCore", group, (-5.2, 7.42, 1.42), (0.86, 3.2, 0.86), mats["dark"], bevel=0.026)
    cube("SkillsDataCenter_NetworkCap", group, (-5.2, 7.24, 1.42), (1.65, 0.34, 1.65), mats["aqua"], bevel=0.025)
    cube("SkillsDataCenter_NetworkCrown", group, (-5.2, 9.2, 1.42), (1.38, 0.28, 1.38), mats["mint"], bevel=0.022)
    cube("SkillsDataCenter_OperationsBridge", group, (-0.4, 4.72, 2.92), (8.6, 0.22, 0.34), mats["screen"], bevel=0.01)
    cube("SkillsDataCenter_CoolingCatwalk", group, (-0.55, 5.92, 2.62), (10.4, 0.16, 0.26), mats["aqua"], bevel=0.008)
    for index, x in enumerate([-3.2, 0, 3.2]):
        cube(f"SkillsDataCenter_RoofAntenna_{index}", group, (x, 6.42, -1.25), (0.12, 1.12, 0.12), mats["dark"], bevel=0.006)
        cube(f"SkillsDataCenter_AntennaBlink_{index}", group, (x, 7.04, -1.25), (0.26, 0.14, 0.26), [mats["mint"], mats["screen"], mats["aqua"]][index], bevel=0.018)
    for index, y in enumerate([4.58, 5.08, 5.58, 6.08]):
        cube(f"SkillsDataCenter_TowerTrace_{index}", group, (-5.78, y, 0.8), (0.08, 0.08, 0.7), [mats["screen"], mats["mint"], mats["purple"], mats["aqua"]][index], bevel=0.003)


def create_behind_engineering_garage(mats):
    group = root("EnvPolishBehindEngineeringGarage")
    cube("BehindEngineeringGarage_ServiceYard", group, (0, 0.09, -0.18), (17.8, 0.18, 10.2), mats["stone"], bevel=0.055)
    cube("BehindEngineeringGarage_MainBay", group, (-0.7, 2.03, 0.42), (10.9, 3.85, 5.2), mats["stone_shadow"], bevel=0.05)
    cube("BehindEngineeringGarage_UpperAssemblyHall", group, (-0.88, 4.48, 0.36), (8.9, 1.72, 4.18), mats["stone_shadow"], bevel=0.04)
    cube("BehindEngineeringGarage_PrototypeWing", group, (5.85, 1.52, 0.48), (3.55, 2.85, 4.65), mats["stone_shadow"], bevel=0.04)
    cube("BehindEngineeringGarage_PrototypeTower", group, (5.92, 3.6, 0.52), (2.28, 3.72, 3.44), mats["stone_shadow"], bevel=0.035)
    cube("BehindEngineeringGarage_SideServiceFacade", group, (7.68, 2.12, 0.46), (0.16, 3.42, 4.12), mats["glass"], bevel=0.012)
    cube("BehindEngineeringGarage_SideServiceBase", group, (7.78, 0.58, 0.46), (0.22, 0.86, 4.36), mats["paper"], bevel=0.02)
    cube("BehindEngineeringGarage_SideServiceHeader", group, (7.78, 3.9, 0.46), (0.22, 0.28, 4.38), mats["amber"], bevel=0.014)
    for row, y in enumerate([1.18, 1.76, 2.34, 2.92]):
        cube(f"BehindEngineeringGarage_SideServiceFloorBand_{row}", group, (7.84, y + 0.28, 0.46), (0.08, 0.06, 3.65), mats["screen"], bevel=0.003)
        for col, z in enumerate([-1.28, -0.32, 0.64, 1.6]):
            cube(f"BehindEngineeringGarage_SideServiceWindow_{row}_{col}", group, (7.86, y, z), (0.08, 0.38, 0.5), [mats["glass"], mats["mint"], mats["aqua"], mats["glass"]][col], bevel=0.004)
    cube("BehindEngineeringGarage_RouteServiceFacade", group, (-0.52, 3.04, 3.08), (7.3, 1.62, 0.12), mats["glass"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteServiceHeader", group, (-0.52, 3.9, 3.18), (7.72, 0.28, 0.2), mats["amber"], bevel=0.012)
    for index, x in enumerate([-3.68, -2.36, -1.04, 0.28, 1.6, 2.92]):
        cube(f"BehindEngineeringGarage_RouteFacadeBay_{index}", group, (x, 2.82, 3.2), (0.7, 0.82, 0.08), [mats["glass"], mats["screen"], mats["mint"], mats["glass"], mats["aqua"], mats["screen"]][index], bevel=0.004)
    cube("BehindEngineeringGarage_RoutePrototypeBayVoid", group, (-1.12, 1.9, -2.78), (7.2, 3.05, 0.12), mats["dark"], bevel=0.028)
    cube("BehindEngineeringGarage_RoutePrototypeBayLeftPier", group, (-5.1, 2.1, -2.88), (0.46, 3.58, 0.2), mats["paper"], bevel=0.016)
    cube("BehindEngineeringGarage_RoutePrototypeBayRightPier", group, (2.82, 2.1, -2.88), (0.46, 3.58, 0.2), mats["paper"], bevel=0.016)
    cube("BehindEngineeringGarage_RoutePrototypeBayHeader", group, (-1.12, 3.84, -2.88), (8.35, 0.38, 0.22), mats["amber"], bevel=0.016)
    cube("BehindEngineeringGarage_RoutePrototypeBaySill", group, (-1.12, 0.5, -2.88), (7.65, 0.22, 0.2), mats["stone"], bevel=0.016)
    cube("BehindEngineeringGarage_RoutePrototypeLiftDeck", group, (-1.12, 0.96, -3.04), (5.15, 0.34, 0.64), mats["stone"], bevel=0.02)
    cube("BehindEngineeringGarage_RoutePrototypeChassisBuck", group, (-1.12, 1.6, -3.12), (3.95, 0.78, 0.5), mats["amber"], bevel=0.026)
    cube("BehindEngineeringGarage_RouteInnerBuildCell", group, (-1.18, 2.24, -3.28), (5.36, 2.78, 0.14), mats["glass"], bevel=0.014)
    cube("BehindEngineeringGarage_RouteInnerBuildCellTopFrame", group, (-1.18, 3.68, -3.38), (5.8, 0.18, 0.16), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RouteInnerBuildCellBottomFrame", group, (-1.18, 0.86, -3.38), (5.42, 0.16, 0.14), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RouteInnerBuildCellLeftFrame", group, (-4.04, 2.24, -3.38), (0.18, 2.76, 0.16), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RouteInnerBuildCellRightFrame", group, (1.68, 2.24, -3.38), (0.18, 2.76, 0.16), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RoutePrototypeRigFrame", group, (-1.18, 1.52, -3.58), (4.12, 0.22, 0.2), mats["dark"], bevel=0.008)
    cube("BehindEngineeringGarage_RoutePrototypeRigCore", group, (-1.18, 1.9, -3.66), (3.05, 0.72, 0.28), mats["amber"], bevel=0.018)
    cube("BehindEngineeringGarage_RoutePrototypeRigCab", group, (-0.26, 2.38, -3.7), (1.12, 0.7, 0.22), mats["glass"], bevel=0.014)
    cube("BehindEngineeringGarage_RoutePrototypeRigNose", group, (-2.52, 1.83, -3.7), (1.08, 0.46, 0.2), mats["paper"], bevel=0.012)
    cube("BehindEngineeringGarage_RoutePrototypeRigTail", group, (1.04, 1.82, -3.7), (0.82, 0.48, 0.2), mats["screen"], bevel=0.012)
    cube("BehindEngineeringGarage_RoutePrototypeRigAxleFront", group, (-2.78, 1.3, -3.72), (0.32, 0.54, 0.22), mats["rubber"], bevel=0.012)
    cube("BehindEngineeringGarage_RoutePrototypeRigAxleRear", group, (0.52, 1.3, -3.72), (0.32, 0.54, 0.22), mats["rubber"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteDiagnosticsWall", group, (4.42, 2.52, -3.24), (2.42, 3.0, 0.14), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteDiagnosticsHeader", group, (4.42, 3.9, -3.36), (2.0, 0.2, 0.12), mats["aqua"], bevel=0.004)
    for index, y in enumerate([1.38, 1.78, 2.18, 2.58, 2.98]):
        cube(f"BehindEngineeringGarage_RouteDiagnosticsTrace_{index}", group, (4.42, y + 0.14, -3.38), (1.78 - index * 0.14, 0.08, 0.08), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_RouteSourceControlSpine", group, (-5.62, 2.46, -3.2), (0.72, 3.12, 0.18), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteSourceControlCap", group, (-5.62, 4.1, -3.28), (0.94, 0.2, 0.22), mats["screen"], bevel=0.006)
    for index, y in enumerate([1.28, 1.72, 2.16, 2.6, 3.04]):
        cube(f"BehindEngineeringGarage_RouteSourceBranch_{index}", group, (-5.2 + index * 0.2, y + 0.18, -3.34), (0.76 + index * 0.12, 0.08, 0.09), [mats["mint"], mats["screen"], mats["purple"], mats["aqua"], mats["amber"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_RouteGantryLeftPost", group, (-5.9, 2.88, -3.04), (0.28, 4.82, 0.28), mats["dark"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteGantryRightPost", group, (3.55, 2.88, -3.04), (0.28, 4.82, 0.28), mats["dark"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteGantryBeam", group, (-1.18, 5.16, -3.04), (9.78, 0.3, 0.34), mats["dark"], bevel=0.016)
    cube("BehindEngineeringGarage_RouteGantryTrolley", group, (0.82, 4.68, -3.18), (0.88, 0.38, 0.38), mats["stone_shadow"], bevel=0.014)
    cube("BehindEngineeringGarage_RouteGantryHook", group, (0.82, 3.7, -3.28), (0.14, 1.42, 0.12), mats["rope"], bevel=0.004)
    cube("BehindEngineeringGarage_RouteToolProcessWall", group, (5.18, 2.18, -2.92), (2.3, 2.95, 0.12), mats["wood"], bevel=0.026)
    for index, y in enumerate([1.16, 1.66, 2.16, 2.66, 3.16]):
        cube(f"BehindEngineeringGarage_RouteProcessTrace_{index}", group, (5.18, y, -3.04), (1.62 - index * 0.16, 0.08, 0.07), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_DiagnosticsTowerCore", group, (7.05, 6.05, -1.62), (1.16, 4.95, 1.16), mats["stone_shadow"], bevel=0.028)
    cube("BehindEngineeringGarage_DiagnosticsTowerGlass", group, (7.05, 6.04, -2.24), (0.82, 3.58, 0.1), mats["glass"], bevel=0.006)
    cube("BehindEngineeringGarage_DiagnosticsTowerCap", group, (7.05, 8.7, -1.62), (1.58, 0.32, 1.58), mats["screen"], bevel=0.022)
    cube("BehindEngineeringGarage_DiagnosticsSignalSpire", group, (7.05, 10.0, -1.62), (0.42, 2.35, 0.42), mats["dark"], bevel=0.014)
    cube("BehindEngineeringGarage_DiagnosticsBeacon", group, (7.05, 11.23, -1.62), (0.78, 0.22, 0.78), mats["mint"], bevel=0.018)
    cube("BehindEngineeringGarage_ToolWallWing", group, (-6.35, 1.42, 0.68), (3.05, 2.65, 4.45), mats["wood"], bevel=0.04)
    cube("BehindEngineeringGarage_ToolArchiveTower", group, (-6.52, 3.28, 0.62), (1.82, 3.62, 3.58), mats["wood"], bevel=0.035)
    cube("BehindEngineeringGarage_RoofDeck", group, (-0.55, 4.04, 0.32), (13.2, 0.34, 5.88), mats["dark"], bevel=0.034)
    cube("BehindEngineeringGarage_RoofVentLine", group, (-0.55, 4.35, -2.18), (12.2, 0.18, 0.34), mats["amber"], bevel=0.014)
    for index, x in enumerate([-4.9, -2.45, 0, 2.45, 4.9]):
        cube(f"BehindEngineeringGarage_SawtoothRoof_{index}", group, (x, 5.44, -0.92), (1.62, 0.5, 3.2), mats["stone"], rot=(0, 0, 0.16 if index % 2 else -0.16), bevel=0.022)
        cube(f"BehindEngineeringGarage_SawtoothGlass_{index}", group, (x, 5.55, -2.38), (1.16, 0.12, 0.08), mats["glass"], bevel=0.006)
    cube("BehindEngineeringGarage_OpenBayDoor", group, (-1.2, 1.42, -2.45), (4.1, 2.62, 0.18), mats["dark"], bevel=0.03)
    cube("BehindEngineeringGarage_BayInteriorGlow", group, (-1.2, 1.4, -2.56), (3.25, 1.82, 0.06), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_LeftBayDoor", group, (-4.95, 1.36, -2.44), (1.72, 2.48, 0.16), mats["dark"], bevel=0.022)
    cube("BehindEngineeringGarage_RightBayDoor", group, (2.45, 1.36, -2.44), (1.72, 2.48, 0.16), mats["dark"], bevel=0.022)
    cube("BehindEngineeringGarage_LeftBayGlow", group, (-4.95, 1.54, -2.55), (1.14, 1.28, 0.06), mats["aqua"], bevel=0.006)
    cube("BehindEngineeringGarage_RightBayGlow", group, (2.45, 1.54, -2.55), (1.14, 1.28, 0.06), mats["amber"], bevel=0.006)
    for index, y in enumerate([0.72, 1.02, 1.32, 1.62, 1.92, 2.22]):
        cube(f"BehindEngineeringGarage_RollupDoorSlat_{index}", group, (-1.2, y, -2.62), (3.36, 0.055, 0.08), mats["paper"], bevel=0.003)
    cube("BehindEngineeringGarage_BaySafetyStripe_Left", group, (-3.24, 1.45, -2.62), (0.16, 2.34, 0.08), mats["amber"], bevel=0.006)
    cube("BehindEngineeringGarage_BaySafetyStripe_Right", group, (0.84, 1.45, -2.62), (0.16, 2.34, 0.08), mats["amber"], bevel=0.006)
    cube("BehindEngineeringGarage_ServiceDoor", group, (3.35, 1.18, -2.44), (1.22, 2.05, 0.12), mats["wood"], bevel=0.018)
    for index, z in enumerate([-4.28, -3.82, -3.36]):
        cube(f"BehindEngineeringGarage_EntryStep_{index}", group, (-1.2, 0.17 + index * 0.05, z), (6.0 - index * 0.7, 0.13, 0.4), mats["paper"], bevel=0.024)
    for row, y in enumerate([1.02, 1.64, 2.26]):
        cube(f"BehindEngineeringGarage_ToolRail_{row}", group, (-6.42, y, -1.72), (0.08, 0.08, 2.7), mats["rope"], bevel=0.004)
        for col, z in enumerate([-2.42, -1.52, -0.62, 0.28, 1.18]):
            cube(f"BehindEngineeringGarage_Tool_{row}_{col}", group, (-6.52, y + 0.08, z), (0.07, 0.34, 0.38), [mats["amber"], mats["screen"], mats["paper"], mats["mint"], mats["aqua"]][col], bevel=0.004)
    cube("BehindEngineeringGarage_PrototypeLift", group, (4.75, 0.55, -0.82), (3.3, 0.42, 2.15), mats["stone"], bevel=0.035)
    cube("BehindEngineeringGarage_PrototypeBlock", group, (4.75, 1.12, -0.82), (2.15, 0.74, 1.28), mats["amber"], bevel=0.035)
    for index, x in enumerate([3.0, 6.5]):
        cube(f"BehindEngineeringGarage_LiftGuide_{index}", group, (x, 1.16, -2.28), (0.16, 1.58, 0.12), mats["screen"], bevel=0.006)
    for index, x in enumerate([2.2, 7.2]):
        cube(f"BehindEngineeringGarage_GantryPost_{index}", group, (x, 2.12, 2.45), (0.22, 3.55, 0.22), mats["dark"], bevel=0.012)
    cube("BehindEngineeringGarage_GantryBeam", group, (4.7, 3.82, 2.45), (5.35, 0.24, 0.3), mats["dark"], bevel=0.02)
    cube("BehindEngineeringGarage_HoistCable", group, (4.1, 2.72, 2.15), (0.12, 1.62, 0.12), mats["rope"], bevel=0.006)
    cube("BehindEngineeringGarage_HoistHook", group, (4.1, 1.78, 2.04), (0.48, 0.34, 0.34), mats["amber"], bevel=0.018)
    cube("BehindEngineeringGarage_PipelineBoard", group, (-1.0, 2.18, 2.88), (6.8, 2.15, 0.18), mats["dark"], bevel=0.026)
    for index, y in enumerate([1.42, 1.82, 2.22, 2.62]):
        cube(f"BehindEngineeringGarage_PipelineTrace_{index}", group, (-1.0 + (index % 2) * 0.42, y, 2.72), (4.9 - index * 0.38, 0.06, 0.07), [mats["screen"], mats["mint"], mats["purple"], mats["amber"]][index], bevel=0.004)
    cube("BehindEngineeringGarage_RouteProcessAtriumFrame", group, (-1.0, 2.42, 3.42), (7.75, 3.12, 0.22), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteProcessAtriumGlass", group, (-1.0, 2.42, 3.58), (6.72, 2.42, 0.1), mats["glass"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteProcessAtriumHeader", group, (-1.0, 3.92, 3.66), (7.2, 0.22, 0.14), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RouteProcessAtriumSill", group, (-1.0, 0.92, 3.66), (6.95, 0.18, 0.14), mats["amber"], bevel=0.006)
    for index, x in enumerate([-3.62, -2.36, -1.1, 0.16, 1.42, 2.68]):
        cube(f"BehindEngineeringGarage_RouteProcessStageLane_{index}", group, (x, 1.86, 3.76), (0.1, 1.62, 0.08), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"], mats["paper"]][index], bevel=0.003)
        cube(f"BehindEngineeringGarage_RouteProcessStageCard_{index}", group, (x, 2.76, 3.78), (0.58, 0.26, 0.08), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"], mats["paper"]][index], bevel=0.004)
    cube("BehindEngineeringGarage_RouteCutawayPrototypeDeck", group, (1.72, 1.3, 3.9), (2.95, 0.22, 0.28), mats["dark"], bevel=0.01)
    cube("BehindEngineeringGarage_RouteCutawayPrototypeBody", group, (1.72, 1.68, 3.98), (2.18, 0.46, 0.18), mats["amber"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteCutawayPrototypeCab", group, (2.18, 2.02, 4.04), (0.74, 0.42, 0.12), mats["glass"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteCutawayPrototypeWheelFront", group, (0.72, 1.24, 4.06), (0.28, 0.42, 0.1), mats["rubber"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteCutawayPrototypeWheelRear", group, (2.72, 1.24, 4.06), (0.28, 0.42, 0.1), mats["rubber"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteSourceFlowBridge", group, (-4.78, 2.42, 3.82), (0.32, 2.68, 0.16), mats["dark"], bevel=0.012)
    for index, y in enumerate([1.36, 1.86, 2.36, 2.86, 3.36]):
        cube(f"BehindEngineeringGarage_RouteSourceFlowBranch_{index}", group, (-4.36 + index * 0.16, y, 3.94), (0.72 + index * 0.1, 0.08, 0.08), [mats["mint"], mats["screen"], mats["purple"], mats["aqua"], mats["amber"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_RouteBuildPortalDeck", group, (-0.6, 0.62, 4.34), (10.6, 0.32, 0.72), mats["stone"], bevel=0.028)
    for x in [-5.7, 4.55]:
        cube("BehindEngineeringGarage_RouteBuildPortalPylon", group, (x, 3.25, 4.28), (0.46, 5.24, 0.42), mats["dark"], bevel=0.018)
        cube("BehindEngineeringGarage_RouteBuildPortalTrace", group, (x, 3.22, 4.58), (0.08, 3.82, 0.08), mats["screen"], bevel=0.003)
    cube("BehindEngineeringGarage_RouteBuildPortalBeam", group, (-0.6, 5.78, 4.28), (10.72, 0.32, 0.48), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteBuildPortalGlow", group, (-0.6, 5.52, 4.62), (8.7, 0.1, 0.08), mats["amber"], bevel=0.004)
    cube("BehindEngineeringGarage_RouteAssemblyCatwalk", group, (-0.55, 4.58, 4.54), (8.85, 0.22, 0.28), mats["wood"], bevel=0.012)
    for index, x in enumerate([-4.05, -2.7, -1.35, 0.0, 1.35, 2.7, 4.05]):
        cube(f"BehindEngineeringGarage_RouteAssemblyCatwalkPost_{index}", group, (x, 3.64, 4.64), (0.08, 1.8, 0.08), mats["screen"], bevel=0.003)
        cube(f"BehindEngineeringGarage_RouteAssemblyPacket_{index}", group, (x, 4.84, 4.7), (0.42, 0.18, 0.08), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"], mats["paper"], mats["screen"]][index], bevel=0.004)
    cube("BehindEngineeringGarage_RoutePrototypeTestCell", group, (2.72, 2.2, 4.74), (3.28, 2.95, 0.14), mats["glass"], bevel=0.014)
    cube("BehindEngineeringGarage_RoutePrototypeTestCellFrame", group, (2.72, 3.78, 4.84), (3.72, 0.22, 0.16), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RoutePrototypeTestCellDeck", group, (2.72, 0.98, 4.88), (2.8, 0.22, 0.28), mats["stone_shadow"], bevel=0.012)
    cube("BehindEngineeringGarage_RouteDiagnosticsBeaconStack", group, (5.85, 4.18, 4.38), (0.72, 5.84, 0.58), mats["dark"], bevel=0.02)
    for index, y in enumerate([2.0, 2.68, 3.36, 4.04, 4.72, 5.4, 6.08]):
        cube(f"BehindEngineeringGarage_RouteDiagnosticsBeaconPulse_{index}", group, (5.48, y, 4.74), (0.08, 0.12, 0.42), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"], mats["paper"], mats["screen"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_RouteSourceControlCrownMast", group, (-5.1, 5.58, 4.42), (0.5, 4.9, 0.5), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_RouteSourceControlCrown", group, (-5.1, 8.02, 4.42), (2.0, 0.3, 1.1), mats["screen"], bevel=0.018)
    for index, x in enumerate([-5.72, -5.31, -4.9, -4.49]):
        cube(f"BehindEngineeringGarage_RouteSourceControlCrownBranch_{index}", group, (x, 7.58 - index * 0.28, 4.94), (0.08, 0.08, 0.62 + index * 0.12), [mats["mint"], mats["screen"], mats["purple"], mats["aqua"]][index], bevel=0.003)
    for index, x in enumerate([-4.8, -2.6, -0.4, 1.8]):
        cube(f"BehindEngineeringGarage_RoofVent_{index}", group, (x, 4.56, 0.86 + (index % 2) * 0.46), (1.0, 0.42, 0.72), mats["stone_shadow"], bevel=0.024)
    for index, x in enumerate([-4.7, -3.35, -2.0, -0.65, 0.7]):
        cube(f"BehindEngineeringGarage_BayWindow_{index}", group, (x, 2.82, -2.32), (0.8, 0.44, 0.08), [mats["glass"], mats["screen"], mats["mint"], mats["glass"], mats["aqua"]][index], bevel=0.006)
    cube("BehindEngineeringGarage_CraneTower_Left", group, (-5.9, 5.72, 2.62), (0.52, 3.32, 0.52), mats["dark"], bevel=0.025)
    cube("BehindEngineeringGarage_CraneTower_Right", group, (5.1, 5.72, 2.62), (0.52, 3.32, 0.52), mats["dark"], bevel=0.025)
    cube("BehindEngineeringGarage_OverheadCraneBeam", group, (-0.4, 7.32, 2.62), (11.8, 0.3, 0.42), mats["amber"], bevel=0.018)
    cube("BehindEngineeringGarage_CraneTrolley", group, (1.8, 6.82, 2.34), (1.1, 0.44, 0.5), mats["stone_shadow"], bevel=0.025)
    cube("BehindEngineeringGarage_CraneCable", group, (1.8, 5.64, 2.18), (0.12, 2.0, 0.12), mats["rope"], bevel=0.004)
    cube("BehindEngineeringGarage_RouteAssemblyTrussA", group, (-4.4, 7.92, -0.45), (0.18, 0.24, 5.1), mats["amber"], rot=(0, 0, -0.22), bevel=0.006)
    cube("BehindEngineeringGarage_RouteAssemblyTrussB", group, (3.15, 7.92, -0.45), (0.18, 0.24, 5.1), mats["amber"], rot=(0, 0, 0.22), bevel=0.006)
    cube("BehindEngineeringGarage_RoofAssemblyRailFront", group, (-0.62, 8.12, -2.32), (8.8, 0.18, 0.18), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_RoofAssemblyRailRear", group, (-0.62, 8.12, 1.42), (8.8, 0.18, 0.18), mats["screen"], bevel=0.006)
    cube("BehindEngineeringGarage_DiagnosticsLoft", group, (-1.3, 5.28, -0.82), (4.8, 1.72, 1.32), mats["glass"], bevel=0.025)
    cube("BehindEngineeringGarage_DiagnosticsRoof", group, (-1.3, 6.28, -0.82), (5.3, 0.24, 1.56), mats["wood"], bevel=0.022)
    cube("BehindEngineeringGarage_SourceControlTower", group, (-4.55, 6.02, 1.18), (1.22, 2.9, 1.18), mats["dark"], bevel=0.03)
    cube("BehindEngineeringGarage_SourceControlCap", group, (-4.55, 7.58, 1.18), (1.66, 0.3, 1.52), mats["screen"], bevel=0.024)
    cube("BehindEngineeringGarage_AssemblyBridge", group, (-0.2, 5.72, 2.82), (8.6, 0.2, 0.32), mats["amber"], bevel=0.01)
    cube("BehindEngineeringGarage_AssemblyCathedral", group, (-0.65, 6.05, 0.44), (7.8, 2.85, 3.42), mats["stone_shadow"], bevel=0.032)
    cube("BehindEngineeringGarage_ControlRoomStack", group, (3.72, 5.72, -0.98), (2.2, 3.55, 2.3), mats["glass"], bevel=0.026)
    cube("BehindEngineeringGarage_ControlRoomCap", group, (3.72, 7.66, -0.98), (2.72, 0.28, 2.74), mats["wood"], bevel=0.02)
    cube("BehindEngineeringGarage_SourceSpireCore", group, (-4.55, 8.92, 1.18), (0.7, 2.65, 0.7), mats["dark"], bevel=0.02)
    cube("BehindEngineeringGarage_SourceSpireCap", group, (-4.55, 10.34, 1.18), (1.08, 0.2, 1.08), mats["screen"], bevel=0.016)
    cube("BehindEngineeringGarage_TestRigDeck", group, (4.9, 3.15, -3.18), (4.8, 0.22, 1.05), mats["dark"], bevel=0.018)
    cube("BehindEngineeringGarage_TestRigGlow", group, (4.9, 3.32, -3.78), (3.82, 0.08, 0.07), mats["amber"], bevel=0.004)
    for index, x in enumerate([-5.8, -3.0, -0.2, 2.6, 5.4]):
        cube(f"BehindEngineeringGarage_RoofTruss_{index}", group, (x, 7.88, 0.74), (0.16, 0.24, 4.25), mats["amber"], rot=(0, 0, -0.12 + index * 0.06), bevel=0.006)
    for index, x in enumerate([-5.8, -3.0, -0.2, 2.6, 5.4]):
        cube(f"BehindEngineeringGarage_ControlPulse_{index}", group, (x, 6.72, -2.34), (0.7, 0.08, 0.07), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    for index, x in enumerate([-3.2, -1.6, 0, 1.6, 3.2]):
        cube(f"BehindEngineeringGarage_ServiceMezzanine_{index}", group, (x, 4.72, 3.04), (0.8, 0.18, 0.24), mats["screen" if index % 2 else "amber"], bevel=0.004)
    for index, x in enumerate([-2.8, -1.6, -0.4, 0.8]):
        cube(f"BehindEngineeringGarage_LoftTrace_{index}", group, (x, 5.36, -1.52), (0.62, 0.08, 0.07), [mats["screen"], mats["mint"], mats["purple"], mats["amber"]][index], bevel=0.003)
    for index, y in enumerate([5.08, 5.58, 6.08, 6.58]):
        cube(f"BehindEngineeringGarage_SourceTrace_{index}", group, (-5.18, y, 0.56), (0.08, 0.08, 0.72), [mats["screen"], mats["mint"], mats["purple"], mats["aqua"]][index], bevel=0.003)


def create_cv_records_archive_civic_vault(mats):
    group = root("EnvPolishCvRecordsArchive")

    cube("CvRecordsArchive_CivicPlinth", group, (0, 0.12, -0.04), (15.8, 0.24, 9.8), mats["stone_shadow"], bevel=0.075)
    cube("CvRecordsArchive_PublicSteps", group, (0, 0.32, -4.62), (9.6, 0.2, 0.62), mats["paper"], bevel=0.045)
    cube("CvRecordsArchive_ArchiveHall", group, (-0.18, 3.5, 0.24), (10.35, 6.65, 5.35), mats["stone"], bevel=0.075)
    cube("CvRecordsArchive_RecordsWingLeft", group, (-6.42, 3.92, 0.2), (1.62, 7.35, 5.95), mats["stone_shadow"], bevel=0.065)
    cube("CvRecordsArchive_RecordsWingRight", group, (6.08, 3.92, 0.2), (1.62, 7.35, 5.95), mats["stone_shadow"], bevel=0.065)
    cube("CvRecordsArchive_VaultStack", group, (-0.18, 7.82, 0.24), (8.3, 2.95, 4.28), mats["stone_shadow"], bevel=0.06)
    cube("CvRecordsArchive_CrownLintel", group, (-0.18, 9.52, 0.2), (10.55, 0.42, 4.85), mats["wood"], bevel=0.04)
    cube("CvRecordsArchive_ProtectedGlassAtrium", group, (-0.22, 6.18, -2.82), (5.0, 2.35, 0.12), mats["glass"], bevel=0.012)
    cube("CvRecordsArchive_MainVaultFrame", group, (-0.22, 2.56, -3.42), (6.6, 4.55, 0.34), mats["dark"], bevel=0.048)
    cube("CvRecordsArchive_MainVaultVoid", group, (-0.22, 2.42, -3.65), (4.8, 3.25, 0.16), mats["stone_shadow"], bevel=0.026)
    cylinder("CvRecordsArchive_MainVaultSeal", group, (-0.22, 2.46, -3.82), 1.24, 0.14, mats["gold"], vertices=16, bevel=0.012)
    cylinder("CvRecordsArchive_MainVaultCore", group, (-0.22, 2.46, -3.93), 0.74, 0.09, mats["screen"], vertices=16, bevel=0.008)
    cube("CvRecordsArchive_VaultHandleHorizontal", group, (-0.22, 2.46, -4.0), (1.62, 0.11, 0.08), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_VaultHandleVertical", group, (-0.22, 2.46, -4.01), (0.11, 1.62, 0.08), mats["dark"], bevel=0.004)
    cube("CvRecordsArchive_PublicPorticoBeam", group, (-0.22, 5.02, -3.62), (10.3, 0.34, 0.4), mats["wood"], bevel=0.024)
    for x in [-4.45, -2.65, 2.1, 3.9]:
        cube("CvRecordsArchive_PublicPorticoColumn", group, (x, 2.42, -4.2), (0.36, 4.55, 0.32), mats["stone_shadow"], bevel=0.02)
    for side, x in [(-1, -6.92), (1, 6.58)]:
        cube(f"CvRecordsArchive_ArchiveSpine_{side}", group, (x, 4.92, -0.02), (0.62, 8.35, 5.78), mats["stone_shadow"], bevel=0.035)
        cube(f"CvRecordsArchive_ArchiveSpineCap_{side}", group, (x, 9.3, -0.02), (0.92, 0.36, 6.08), mats["wood"], bevel=0.022)
        cube(f"CvRecordsArchive_ArchiveSpineReaderBand_{side}", group, (x + side * 0.34, 4.88, -0.02), (0.08, 6.35, 4.25), mats["dark"], bevel=0.018)
        cube(f"CvRecordsArchive_ArchiveSpineGlassCore_{side}", group, (x + side * 0.41, 4.88, -0.02), (0.06, 4.92, 3.28), mats["glass"], bevel=0.006)
        for index, y in enumerate([1.54, 2.24, 2.94, 3.64, 4.34, 5.04, 5.74, 6.44]):
            z = -2.15 + (index % 4) * 1.28
            material = [mats["paper"], mats["screen"], mats["gold"], mats["foam"]][index % 4]
            cube(f"CvRecordsArchive_SpineRecord_{side}_{index}", group, (x + side * 0.5, y, z), (0.06, 0.34, 0.82), material, bevel=0.004)
            cube(f"CvRecordsArchive_SpineLedgerLine_{side}_{index}", group, (x + side * 0.52, y + 0.3, z), (0.05, 0.08, 0.96), material, bevel=0.003)
    for row, y in enumerate([1.42, 2.18, 2.94, 3.7]):
        cube(f"CvRecordsArchive_FacadeLedgerBand_{row}", group, (-0.22, y + 0.34, -3.22), (9.3, 0.08, 0.08), mats["wood"], bevel=0.004)
        for col, x in enumerate([-4.35, -3.12, -1.9, 1.45, 2.68, 3.9]):
            material = mats["paper"] if col < 3 else mats["glass"]
            cube(f"CvRecordsArchive_FacadeRecordSlot_{row}_{col}", group, (x, y, -3.32), (0.74, 0.48, 0.07), material, bevel=0.006)
    cube("CvRecordsArchive_RouteArchiveFace", group, (-0.22, 3.35, 3.28), (8.0, 5.45, 0.28), mats["dark"], bevel=0.042)
    cube("CvRecordsArchive_RouteArchiveGlass", group, (-0.22, 3.22, 3.48), (6.15, 3.65, 0.1), mats["glass"], bevel=0.012)
    cylinder("CvRecordsArchive_RouteSeal", group, (-0.22, 3.28, 3.62), 0.86, 0.1, mats["gold"], vertices=16, bevel=0.008)
    cube("CvRecordsArchive_RouteDocumentHeader", group, (-0.22, 5.98, 3.56), (7.1, 0.28, 0.22), mats["paper"], bevel=0.01)
    for index, x in enumerate([-2.75, -1.82, -0.89, 0.04, 0.97, 1.9, 2.83]):
        height = 2.4 + (index % 3) * 0.42
        material = [mats["paper"], mats["foam"], mats["screen"], mats["gold"], mats["mint"], mats["paper"], mats["screen"]][index]
        cube(f"CvRecordsArchive_RouteDocumentStack_{index}", group, (x, 2.78, 3.72), (0.42, height, 0.11), material, bevel=0.006)
    cube("CvRecordsArchive_ReadersGallery", group, (-4.85, 1.78, 2.7), (2.45, 2.55, 1.05), mats["stone"], bevel=0.035)
    cube("CvRecordsArchive_DigitalRecordsGallery", group, (4.35, 1.78, 2.7), (2.45, 2.55, 1.05), mats["glass"], bevel=0.02)
    cube("CvRecordsArchive_ReadersGalleryGlow", group, (-4.85, 2.28, 3.26), (1.8, 0.08, 0.07), mats["amber"], bevel=0.004)
    cube("CvRecordsArchive_DigitalGalleryGlow", group, (4.35, 2.28, 3.26), (1.8, 0.08, 0.07), mats["mint"], bevel=0.004)
    cube("CvRecordsArchive_DocumentCrownBridge", group, (-0.22, 9.95, 0.16), (7.4, 0.25, 3.55), mats["paper"], bevel=0.018)
    for index, x in enumerate([-2.95, -1.96, -0.97, 0.02, 1.01, 2.0, 2.99]):
        cube(f"CvRecordsArchive_CrownLedger_{index}", group, (x, 10.26 + (index % 2) * 0.12, 0.18), (0.6, 0.16, 2.65), [mats["paper"], mats["foam"], mats["gold"], mats["mint"], mats["paper"], mats["screen"], mats["foam"]][index], rot=(0, 0, 0.045 - index * 0.012), bevel=0.006)
    cube("CvRecordsArchive_IndexLanternCore", group, (-0.18, 11.2, 0.04), (3.1, 2.1, 2.25), mats["stone_shadow"], bevel=0.045)
    cube("CvRecordsArchive_IndexLanternGlassFront", group, (-0.18, 11.18, -1.1), (2.42, 1.34, 0.08), mats["glass"], bevel=0.006)
    cube("CvRecordsArchive_IndexLanternGlassBack", group, (-0.18, 11.18, 1.18), (2.42, 1.34, 0.08), mats["glass"], bevel=0.006)
    cube("CvRecordsArchive_IndexLanternCrown", group, (-0.18, 12.4, 0.04), (3.55, 0.34, 2.62), mats["wood"], bevel=0.018)
    for index, x in enumerate([-1.05, -0.35, 0.35, 1.05]):
        cube(f"CvRecordsArchive_IndexLanternRecordLight_{index}", group, (x, 11.1, -1.18), (0.18, 1.05, 0.06), [mats["paper"], mats["mint"], mats["gold"], mats["screen"]][index], bevel=0.003)
    for side, x in [(-1, -4.55), (1, 4.22)]:
        cube(f"CvRecordsArchive_CivicFacadePier_{side}", group, (x, 4.42, -3.48), (0.36, 6.2, 0.32), mats["stone_shadow"], bevel=0.016)
        cube(f"CvRecordsArchive_CivicFacadePierCap_{side}", group, (x, 7.72, -3.48), (0.78, 0.28, 0.44), mats["wood"], bevel=0.01)
    cube("CvRecordsArchive_StatusBeacon", group, (4.0, 8.68, -2.06), (0.6, 1.85, 0.6), mats["mint"], bevel=0.02)
    cube("CvRecordsArchive_AccessKiosk", group, (3.72, 0.95, -4.42), (0.86, 1.3, 0.52), mats["dark"], bevel=0.03)
    cube("CvRecordsArchive_AccessKioskScreen", group, (3.72, 1.38, -4.72), (0.62, 0.5, 0.06), mats["screen"], bevel=0.006)


def create_behind_engineering_garage_workshop_hall(mats):
    group = root("EnvPolishBehindEngineeringGarage")

    cube("BehindEngineeringGarage_IntegratedApron", group, (0, 0.12, -1.18), (20.4, 0.24, 12.8), mats["stone_shadow"], bevel=0.075)
    cube("BehindEngineeringGarage_RoadFacingThreshold", group, (0, 0.27, -7.55), (13.8, 0.16, 1.25), mats["paper"], bevel=0.04)
    cube("BehindEngineeringGarage_MainWorkshopHall", group, (-0.7, 3.18, 0.12), (14.7, 6.05, 7.55), mats["stone_shadow"], bevel=0.072)
    cube("BehindEngineeringGarage_ToolArchiveWing", group, (-8.6, 2.52, 0.15), (3.7, 4.82, 6.72), mats["wood"], bevel=0.06)
    cube("BehindEngineeringGarage_ServiceWing", group, (7.25, 2.68, 0.05), (4.5, 5.12, 6.88), mats["stone"], bevel=0.06)
    cube("BehindEngineeringGarage_MainRoof", group, (-0.7, 6.4, 0.12), (15.8, 0.44, 8.15), mats["dark"], bevel=0.04)
    cube("BehindEngineeringGarage_ArchiveRoof", group, (-8.6, 5.18, 0.15), (4.1, 0.36, 7.15), mats["dark"], bevel=0.034)
    cube("BehindEngineeringGarage_ServiceRoof", group, (7.25, 5.42, 0.05), (4.85, 0.36, 7.32), mats["dark"], bevel=0.034)
    cube("BehindEngineeringGarage_RoofServiceBlock", group, (-1.2, 7.06, -0.7), (5.6, 0.82, 1.85), mats["stone"], bevel=0.038)
    cube("BehindEngineeringGarage_RoofServiceWindow", group, (-1.2, 7.08, -1.68), (4.65, 0.42, 0.08), mats["glass"], bevel=0.006)
    for index, x in enumerate([-5.2, -3.4, 3.0, 4.8]):
        cube(f"BehindEngineeringGarage_RoofExhaustBox_{index}", group, (x, 6.88, 2.58), (0.94, 0.62, 0.82), mats["stone"], bevel=0.024)
        cube(f"BehindEngineeringGarage_RoofExhaustCap_{index}", group, (x, 7.22, 2.58), (1.14, 0.12, 0.98), mats["dark"], bevel=0.012)

    cube("BehindEngineeringGarage_RollupBayFrame", group, (-1.12, 2.82, -4.02), (9.9, 4.7, 0.34), mats["dark"], bevel=0.038)
    cube("BehindEngineeringGarage_RollupDoor", group, (-1.12, 2.45, -4.25), (7.85, 3.45, 0.12), mats["stone"], bevel=0.022)
    for index, y in enumerate([1.0, 1.42, 1.84, 2.26, 2.68, 3.1, 3.52]):
        cube(f"BehindEngineeringGarage_RollupDoorRib_{index}", group, (-1.12, y, -4.34), (7.72, 0.055, 0.07), mats["paper"], bevel=0.003)
    cube("BehindEngineeringGarage_BuildBayCanopy", group, (-1.12, 5.35, -4.58), (10.8, 0.42, 1.08), mats["dark"], bevel=0.03)
    cube("BehindEngineeringGarage_BuildBayGlow", group, (-1.12, 5.02, -5.12), (8.9, 0.08, 0.08), mats["screen"], bevel=0.004)
    cube("BehindEngineeringGarage_ServiceDoor", group, (5.65, 1.76, -4.24), (1.35, 2.78, 0.14), mats["wood"], bevel=0.018)
    cube("BehindEngineeringGarage_ServiceDoorLight", group, (5.65, 3.35, -4.36), (1.05, 0.1, 0.07), mats["mint"], bevel=0.004)

    cube("BehindEngineeringGarage_PrototypeLiftDeck", group, (-1.22, 0.88, -5.17), (6.3, 0.3, 0.9), mats["dark"], bevel=0.02)
    cube("BehindEngineeringGarage_PrototypeBodyBuck", group, (-1.22, 1.47, -5.32), (4.35, 0.74, 0.44), mats["amber"], bevel=0.026)
    cube("BehindEngineeringGarage_PrototypeCabinBuck", group, (0.0, 1.98, -5.42), (1.22, 0.62, 0.2), mats["glass"], bevel=0.014)
    for index, x in enumerate([-3.12, 0.9]):
        cube(f"BehindEngineeringGarage_PrototypeWheelBuck_{index}", group, (x, 1.08, -5.45), (0.46, 0.56, 0.12), mats["rubber"], bevel=0.012)

    cube("BehindEngineeringGarage_DiagnosticsWall", group, (6.2, 2.95, -4.28), (2.5, 3.58, 0.16), mats["dark"], bevel=0.024)
    for index, y in enumerate([1.55, 2.1, 2.65, 3.2]):
        cube(f"BehindEngineeringGarage_DiagnosticsStrip_{index}", group, (6.2, y, -4.42), (1.78 - index * 0.12, 0.08, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["paper"]][index], bevel=0.003)
    cube("BehindEngineeringGarage_SourceControlWall", group, (-6.65, 2.78, -4.24), (1.0, 3.45, 0.16), mats["dark"], bevel=0.02)
    for index, y in enumerate([1.48, 2.0, 2.52, 3.04]):
        cube(f"BehindEngineeringGarage_SourceBranch_{index}", group, (-6.65, y, -4.38), (0.76 + index * 0.14, 0.08, 0.07), [mats["mint"], mats["screen"], mats["aqua"], mats["paper"]][index], bevel=0.003)

    for index, x in enumerate([-4.6, -2.3, 0.0, 2.3, 4.6]):
        cube(f"BehindEngineeringGarage_RoofVentRun_{index}", group, (x, 6.78, 2.35), (1.22, 0.18, 2.4), mats["dark"], bevel=0.012)
        cube(f"BehindEngineeringGarage_RoofVentGlow_{index}", group, (x, 6.92, 1.24), (0.82, 0.06, 0.06), mats["aqua"], bevel=0.003)

    cube("BehindEngineeringGarage_RearWall", group, (-0.7, 3.08, 4.0), (12.9, 4.9, 0.24), mats["stone_shadow"], bevel=0.03)
    cube("BehindEngineeringGarage_RearInspectionWindow", group, (-2.0, 3.18, 4.18), (5.4, 2.2, 0.1), mats["glass"], bevel=0.01)
    cube("BehindEngineeringGarage_RearDispatchDoor", group, (4.65, 1.72, 4.18), (1.25, 2.55, 0.12), mats["wood"], bevel=0.014)
    cube("BehindEngineeringGarage_RearHeader", group, (-0.7, 5.78, 4.2), (12.8, 0.32, 0.36), mats["dark"], bevel=0.014)
    for index, x in enumerate([-4.0, -2.6, -1.2, 0.2]):
        cube(f"BehindEngineeringGarage_RearProcessLane_{index}", group, (x, 2.8, 4.32), (0.1, 2.1, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["paper"]][index], bevel=0.003)

    for index, z in enumerate([-2.2, -0.7, 0.8, 2.3]):
        cube(f"BehindEngineeringGarage_ServiceWingWindow_{index}", group, (9.54, 2.85, z), (0.08, 0.78, 0.82), mats["glass"], bevel=0.006)
        cube(f"BehindEngineeringGarage_ArchiveWingWindow_{index}", group, (-10.48, 2.55, z), (0.08, 0.68, 0.72), mats["glass"], bevel=0.006)
    cube("BehindEngineeringGarage_WorkshopStatusBeacon", group, (4.75, 7.28, -2.42), (0.68, 1.35, 0.68), mats["mint"], bevel=0.018)


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


def create_career_software_campus(mats):
    group = root("EnvPolishCareerSoftwareHouse")

    cube("CareerCampus_GroundedPlinth", group, (0, 0.12, -0.22), (19.0, 0.24, 12.0), mats["stone_shadow"], bevel=0.08)
    cube("CareerCampus_RoadArrivalWalk", group, (0, 0.3, -6.36), (13.4, 0.16, 1.45), mats["paper"], bevel=0.04)
    cube("CareerCampus_MainOfficeBar", group, (0, 3.08, 0.05), (13.65, 5.82, 7.0), mats["stone_shadow"], bevel=0.075)
    cube("CareerCampus_DeliveryWing", group, (-5.9, 3.28, -0.05), (4.55, 6.18, 7.45), mats["stone"], bevel=0.064)
    cube("CareerCampus_EngineeringWing", group, (5.9, 3.28, -0.05), (4.55, 6.18, 7.45), mats["stone"], bevel=0.064)
    cube("CareerCampus_CentralAtriumFrame", group, (0, 3.42, -3.4), (5.4, 6.55, 0.34), mats["dark"], bevel=0.03)
    cube("CareerCampus_CentralAtriumGlass", group, (0, 3.32, -3.65), (4.36, 5.1, 0.09), mats["glass"], bevel=0.008)
    cube("CareerCampus_ReceptionPortico", group, (0, 2.08, -4.78), (6.05, 3.44, 0.38), mats["dark"], bevel=0.028)
    cube("CareerCampus_ReceptionWarmBackWall", group, (0, 1.86, -4.94), (4.38, 2.42, 0.08), mats["stone"], bevel=0.01)
    cube("CareerCampus_ReceptionDoorGlassLeft", group, (-1.04, 1.7, -5.04), (1.72, 2.02, 0.08), mats["glass"], bevel=0.008)
    cube("CareerCampus_ReceptionDoorGlassRight", group, (1.04, 1.7, -5.04), (1.72, 2.02, 0.08), mats["glass"], bevel=0.008)
    cube("CareerCampus_ReceptionDoorCenterMullion", group, (0, 1.7, -5.1), (0.08, 2.1, 0.07), mats["dark"], bevel=0.003)
    cube("CareerCampus_ReceptionDoorHandleLeft", group, (-0.18, 1.62, -5.16), (0.05, 0.46, 0.035), mats["paper"], bevel=0.002)
    cube("CareerCampus_ReceptionDoorHandleRight", group, (0.18, 1.62, -5.16), (0.05, 0.46, 0.035), mats["paper"], bevel=0.002)
    cube("CareerCampus_EntryCanopy", group, (0, 3.8, -5.32), (8.5, 0.34, 1.28), mats["dark"], bevel=0.028)
    cube("CareerCampus_EntryCanopySoffit", group, (0, 3.56, -5.46), (7.72, 0.08, 0.92), mats["stone"], bevel=0.01)
    cube("CareerCampus_EntryLight", group, (0, 3.52, -5.98), (6.3, 0.08, 0.06), mats["screen"], bevel=0.004)
    cube("CareerCampus_PublicLobbyMat", group, (0, 0.38, -5.62), (4.8, 0.06, 0.72), mats["stone_shadow"], bevel=0.018)
    for index, z in enumerate([-6.72, -7.1, -7.48]):
        cube(f"CareerCampus_EntryStep_{index}", group, (0, 0.2 + index * 0.045, z), (5.6 - index * 0.62, 0.12, 0.34), mats["paper"], bevel=0.022)

    for side, x_center, accent in [("Delivery", -5.9, mats["screen"]), ("Engineering", 5.9, mats["mint"])]:
        cube(f"CareerCampus_{side}_RoofCap", group, (x_center, 6.52, -0.05), (5.05, 0.36, 7.9), mats["dark"], bevel=0.024)
        cube(f"CareerCampus_{side}_EntrancePier", group, (x_center, 2.96, -4.0), (4.65, 5.45, 0.32), mats["dark"], bevel=0.022)
        cube(f"CareerCampus_{side}_VerticalIdentityBand", group, (x_center, 3.22, -4.2), (0.18, 4.55, 0.08), accent, bevel=0.004)
        for row, y in enumerate([1.34, 2.18, 3.02, 3.86, 4.7]):
            cube(f"CareerCampus_{side}_FrontFloorBand_{row}", group, (x_center, y + 0.32, -4.08), (3.75, 0.07, 0.07), mats["dark"], bevel=0.003)
            for col, x_offset in enumerate([-1.35, -0.45, 0.45, 1.35]):
                cube(f"CareerCampus_{side}_FrontWindow_{row}_{col}", group, (x_center + x_offset, y, -4.16), (0.58, 0.44, 0.07), mats["glass"], bevel=0.005)

    for index, x in enumerate([-1.6, -0.8, 0.0, 0.8, 1.6]):
        cube(f"CareerCampus_AtriumMullion_{index}", group, (x, 3.32, -3.75), (0.075, 4.7, 0.06), mats["dark"], bevel=0.003)
    for index, y in enumerate([1.48, 2.18, 2.88, 3.58, 4.28]):
        cube(f"CareerCampus_AtriumWorkLine_{index}", group, (0, y, -3.83), (3.2 - (index % 2) * 0.36, 0.052, 0.045), [mats["screen"], mats["mint"], mats["aqua"], mats["screen"], mats["mint"]][index], bevel=0.002)
    for index, x in enumerate([-1.18, -0.38, 0.42, 1.22]):
        cube(f"CareerCampus_LobbyTurnstile_{index}", group, (x, 0.86, -4.98), (0.12, 0.62, 0.18), mats["dark"], bevel=0.006)
        cube(f"CareerCampus_LobbyTurnstileLight_{index}", group, (x, 1.22, -5.08), (0.14, 0.08, 0.035), [mats["screen"], mats["mint"], mats["aqua"], mats["screen"]][index], bevel=0.002)

    cube("CareerCampus_SideWallLeft", group, (-8.35, 3.0, -0.05), (0.28, 5.45, 6.6), mats["stone_shadow"], bevel=0.028)
    cube("CareerCampus_SideWallRight", group, (8.35, 3.0, -0.05), (0.28, 5.45, 6.6), mats["stone_shadow"], bevel=0.028)
    for side, x, material in [("Left", -8.52, mats["screen"]), ("Right", 8.52, mats["mint"])]:
        cube(f"CareerCampus_{side}_SideCanopy", group, (x, 4.86, -0.05), (0.2, 0.28, 5.4), mats["dark"], bevel=0.014)
        for row, y in enumerate([1.44, 2.28, 3.12, 3.96]):
            for col, z in enumerate([-2.18, -0.72, 0.74, 2.2]):
                cube(f"CareerCampus_{side}_SideWindow_{row}_{col}", group, (x, y, z), (0.065, 0.46, 0.68), mats["glass"], bevel=0.005)
        cube(f"CareerCampus_{side}_TeamTrace", group, (x, 2.15, -3.06), (0.065, 0.08, 1.42), material, bevel=0.003)

    cube("CareerCampus_RearServiceFacade", group, (0, 2.92, 3.72), (13.3, 5.25, 0.28), mats["stone_shadow"], bevel=0.026)
    cube("CareerCampus_RearServiceApron", group, (-4.1, 0.32, 4.72), (3.4, 0.12, 1.34), mats["stone"], bevel=0.02)
    cube("CareerCampus_RearDeliveryDoor", group, (-4.1, 1.55, 3.92), (1.22, 2.35, 0.12), mats["wood"], bevel=0.014)
    cube("CareerCampus_RearDeliveryHeader", group, (-4.1, 2.78, 4.0), (1.62, 0.18, 0.08), mats["paper"], bevel=0.004)
    cube("CareerCampus_RearTeamGlass", group, (1.7, 2.75, 3.94), (5.7, 2.15, 0.1), mats["glass"], bevel=0.008)
    cube("CareerCampus_RearTeamBench", group, (1.7, 1.16, 4.08), (4.8, 0.18, 0.16), mats["wood"], bevel=0.008)
    cube("CareerCampus_RearHeader", group, (0, 5.65, 3.98), (13.6, 0.28, 0.32), mats["dark"], bevel=0.014)
    for index, x in enumerate([-1.0, 0.4, 1.8, 3.2]):
        cube(f"CareerCampus_RearSprintBoard_{index}", group, (x, 2.78, 4.08), (0.1, 1.92, 0.07), [mats["screen"], mats["mint"], mats["aqua"], mats["paper"]][index], bevel=0.003)

    cube("CareerCampus_RoofDeck", group, (0, 6.86, -0.18), (14.5, 0.32, 7.9), mats["dark"], bevel=0.026)
    cube("CareerCampus_RooftopBoardroom", group, (0, 7.92, -1.35), (5.75, 1.64, 2.12), mats["glass"], bevel=0.022)
    cube("CareerCampus_BoardroomRoof", group, (0, 8.86, -1.35), (6.2, 0.3, 2.5), mats["dark"], bevel=0.018)
    cube("CareerCampus_RooftopTerraceDeck", group, (0, 7.08, 2.82), (6.2, 0.12, 1.55), mats["stone"], bevel=0.018)
    for index, x in enumerate([-2.55, -1.35, -0.15, 1.05, 2.25]):
        cube(f"CareerCampus_RooftopSprintStandup_{index}", group, (x, 7.42, 2.78), (0.42, 0.56, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["paper"], mats["screen"]][index], bevel=0.004)
    cube("CareerCampus_DeliveryTower", group, (-7.35, 7.0, 0.82), (1.22, 7.15, 2.55), mats["stone_shadow"], bevel=0.034)
    cube("CareerCampus_EngineeringTower", group, (7.35, 7.0, 0.82), (1.22, 7.15, 2.55), mats["stone_shadow"], bevel=0.034)
    cube("CareerCampus_DeliveryTowerCap", group, (-7.35, 10.78, 0.82), (1.65, 0.32, 2.92), mats["dark"], bevel=0.022)
    cube("CareerCampus_EngineeringTowerCap", group, (7.35, 10.78, 0.82), (1.65, 0.32, 2.92), mats["dark"], bevel=0.022)
    for side, x, material in [("Delivery", -7.98, mats["screen"]), ("Engineering", 7.98, mats["mint"])]:
        for index, y in enumerate([4.6, 5.55, 6.5, 7.45, 8.4]):
            cube(f"CareerCampus_{side}_TowerWindow_{index}", group, (x, y, 0.05), (0.06, 0.08, 1.05), material, bevel=0.003)

    cube("CareerCampus_AttachedSkywalk", group, (0, 5.6, 1.28), (9.8, 0.36, 0.72), mats["glass"], bevel=0.016)
    cube("CareerCampus_SkywalkRail", group, (0, 5.88, 0.86), (10.2, 0.1, 0.08), mats["mint"], bevel=0.004)
    cube("CareerCampus_ForecourtBenchWall", group, (0, 0.72, -6.0), (8.6, 0.72, 0.18), mats["stone"], bevel=0.018)


def create_career_software_house(mats):
    group = root("EnvPolishCareerSoftwareHouse")
    cube("CareerSoftwareHouse_Plaza", group, (0, 0.09, -0.52), (17.8, 0.18, 10.6), mats["stone"], bevel=0.055)
    cube("CareerSoftwareHouse_MainBlock", group, (-1.15, 2.42, 0.45), (10.2, 4.65, 5.28), mats["stone_shadow"], bevel=0.05)
    cube("CareerSoftwareHouse_UpperDeliveryFloor", group, (-1.16, 5.12, 0.42), (9.6, 1.72, 4.52), mats["stone_shadow"], bevel=0.042)
    cube("CareerSoftwareHouse_GlassAtrium", group, (4.25, 2.18, -0.12), (3.95, 4.05, 4.48), mats["glass"], bevel=0.04)
    cube("CareerSoftwareHouse_TallAtriumStack", group, (4.38, 4.84, -0.12), (2.82, 4.55, 3.72), mats["glass"], bevel=0.032)
    cube("CareerSoftwareHouse_SideStudio", group, (-5.82, 1.62, 0.92), (2.62, 3.05, 4.62), mats["stone"], bevel=0.045)
    cube("CareerSoftwareHouse_CollaborationWing", group, (-6.08, 3.98, 0.88), (2.35, 4.42, 3.84), mats["stone"], bevel=0.034)
    cube("CareerSoftwareHouse_RoofSlab", group, (-0.74, 4.82, 0.35), (13.85, 0.36, 5.95), mats["wood"], bevel=0.04)
    cube("CareerSoftwareHouse_RoofLip", group, (-0.74, 5.1, -2.68), (14.6, 0.25, 0.4), mats["dark"], bevel=0.025)
    cube("CareerSoftwareHouse_LobbyGlass", group, (0.15, 1.38, -2.54), (3.75, 2.45, 0.12), mats["glass"], bevel=0.012)
    cube("CareerSoftwareHouse_EntryCanopy", group, (0.15, 2.62, -3.35), (5.6, 0.3, 1.52), mats["dark"], bevel=0.03)
    cube("CareerSoftwareHouse_ReceptionPortal", group, (0.15, 2.08, -4.0), (6.38, 3.36, 0.2), mats["dark"], bevel=0.022)
    cube("CareerSoftwareHouse_ReceptionGlass", group, (0.15, 2.02, -4.14), (4.28, 2.24, 0.08), mats["glass"], bevel=0.008)
    cube("CareerSoftwareHouse_EntryGlow", group, (0.15, 2.52, -4.1), (4.65, 0.08, 0.08), mats["screen"], bevel=0.006)
    cube("CareerSoftwareHouse_RoadsideLobbyWing", group, (0.15, 2.9, -4.82), (10.6, 5.35, 0.44), mats["glass"], bevel=0.026)
    cube("CareerSoftwareHouse_RoadsideLobbyFrameTop", group, (0.15, 5.72, -5.1), (11.55, 0.34, 0.24), mats["dark"], bevel=0.02)
    cube("CareerSoftwareHouse_RoadsideLobbyFrameBase", group, (0.15, 0.2, -5.1), (11.55, 0.32, 0.24), mats["dark"], bevel=0.02)
    cube("CareerSoftwareHouse_RoadsideLobbyFrameLeft", group, (-5.72, 2.86, -5.1), (0.34, 5.36, 0.24), mats["dark"], bevel=0.02)
    cube("CareerSoftwareHouse_RoadsideLobbyFrameRight", group, (6.02, 2.86, -5.1), (0.34, 5.36, 0.24), mats["dark"], bevel=0.02)
    cube("CareerSoftwareHouse_CampusGatewayLintel", group, (0.15, 5.72, -5.22), (12.35, 0.34, 0.34), mats["screen"], bevel=0.012)
    cube("CareerSoftwareHouse_CampusGatewayLeftPier", group, (-6.25, 2.82, -5.05), (0.42, 5.42, 0.5), mats["stone_shadow"], bevel=0.02)
    cube("CareerSoftwareHouse_CampusGatewayRightPier", group, (6.55, 2.82, -5.05), (0.42, 5.42, 0.5), mats["stone_shadow"], bevel=0.02)
    cube("CareerSoftwareHouse_TeamAtriumBeacon", group, (0.15, 7.18, -5.02), (1.42, 3.05, 0.32), mats["mint"], bevel=0.02)
    cube("CareerSoftwareHouse_ProductOpsBeacon", group, (2.35, 6.92, -5.0), (0.92, 2.35, 0.28), mats["screen"], bevel=0.018)
    cube("CareerSoftwareHouse_DeliveryOpsBeacon", group, (-2.05, 6.78, -5.0), (0.92, 2.1, 0.28), mats["purple"], bevel=0.018)
    for index, z in enumerate([-4.25, -3.78, -3.31]):
        cube(f"CareerSoftwareHouse_EntryStep_{index}", group, (0.15, 0.18 + index * 0.05, z), (4.9 - index * 0.7, 0.14, 0.42), mats["paper"], bevel=0.025)
    cube("CareerSoftwareHouse_CampusPromenade", group, (0.15, 0.28, -4.35), (12.4, 0.08, 0.86), mats["paper"], bevel=0.035)
    cube("CareerSoftwareHouse_PromenadeCodeSpine", group, (0.15, 0.36, -4.84), (10.8, 0.07, 0.08), mats["screen"], bevel=0.004)
    cube("CareerSoftwareHouse_RouteHiringPortalDeck", group, (0.15, 0.38, -5.55), (11.4, 0.12, 1.08), mats["paper"], bevel=0.03)
    cube("CareerSoftwareHouse_RouteHiringPortalHeader", group, (0.15, 4.68, -5.62), (9.85, 0.42, 0.3), mats["dark"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteHiringPortalLeft", group, (-5.08, 2.46, -5.6), (0.34, 4.12, 0.36), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteHiringPortalRight", group, (5.38, 2.46, -5.6), (0.34, 4.12, 0.36), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteTeamBoardroomGlass", group, (0.15, 3.08, -5.78), (4.72, 2.42, 0.12), mats["glass"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteTeamBoardroomTable", group, (0.15, 2.04, -5.87), (2.88, 0.16, 0.08), mats["wood"], bevel=0.006)
    cube("CareerSoftwareHouse_RouteCodeReviewWall", group, (-3.52, 2.34, -5.76), (1.42, 2.32, 0.14), mats["dark"], bevel=0.014)
    for index, y in enumerate([1.42, 1.88, 2.34, 2.8, 3.26]):
        cube(f"CareerSoftwareHouse_RouteCodeReviewLine_{index}", group, (-3.52, y, -5.87), (0.98 - (index % 2) * 0.18, 0.055, 0.055), [mats["screen"], mats["mint"], mats["aqua"], mats["screen"], mats["purple"]][index], bevel=0.003)
    for index, x in enumerate([-4.25, -1.4, 1.4, 4.25]):
        cube(f"CareerSoftwareHouse_RouteDeliverySprintLane_{index}", group, (x, 0.48, -5.98), (1.58, 0.06, 0.08), [mats["screen"], mats["mint"], mats["paper"], mats["purple"]][index], bevel=0.004)
    cube("CareerSoftwareHouse_RouteArrivalCourtFrame", group, (0.15, 0.46, -6.32), (12.95, 0.16, 0.34), mats["dark"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteArrivalCourtThreshold", group, (0.15, 0.42, -6.72), (10.75, 0.08, 0.38), mats["paper"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteHiringArcadeBeam", group, (0.15, 4.05, -6.46), (12.6, 0.36, 0.34), mats["dark"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteHiringArcadeLeftPier", group, (-6.42, 2.18, -6.44), (0.42, 3.56, 0.36), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteHiringArcadeRightPier", group, (6.72, 2.18, -6.44), (0.42, 3.56, 0.36), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteTeamPortal", group, (0.15, 2.36, -6.58), (2.8, 2.72, 0.12), mats["glass"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteReviewTheater", group, (3.25, 2.38, -6.62), (3.48, 2.58, 0.12), mats["glass"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteReviewDesk", group, (3.25, 1.44, -6.72), (2.42, 0.18, 0.1), mats["wood"], bevel=0.006)
    cube("CareerSoftwareHouse_RouteHiringBoard", group, (-3.02, 2.32, -6.62), (2.48, 2.48, 0.13), mats["dark"], bevel=0.012)
    for index, y in enumerate([1.42, 1.84, 2.26, 2.68, 3.1]):
        cube(f"CareerSoftwareHouse_RouteHiringBoardLine_{index}", group, (-3.02, y, -6.72), (1.82 - index * 0.12, 0.055, 0.055), [mats["mint"], mats["screen"], mats["aqua"], mats["paper"], mats["purple"]][index], bevel=0.003)
    for index, x in enumerate([-4.9, -2.45, 0, 2.45, 4.9]):
        cube(f"CareerSoftwareHouse_RouteCandidateFlowStep_{index}", group, (x, 0.58, -6.98), (0.78, 0.08, 0.16), [mats["paper"], mats["mint"], mats["screen"], mats["aqua"], mats["paper"]][index], bevel=0.004)
    cube("CareerSoftwareHouse_RouteForecourtLeftWing", group, (-3.95, 0.52, -7.18), (3.35, 0.16, 0.52), mats["paper"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteForecourtRightWing", group, (4.25, 0.52, -7.18), (3.35, 0.16, 0.52), mats["paper"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteSoftwareHouseThreshold", group, (0.15, 1.18, -7.26), (4.15, 1.38, 0.18), mats["glass"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteThresholdLintel", group, (0.15, 2.02, -7.32), (4.72, 0.22, 0.18), mats["screen"], bevel=0.006)
    cube("CareerSoftwareHouse_RouteTeamReviewBayLeft", group, (-2.98, 1.08, -7.36), (1.32, 1.02, 0.12), mats["dark"], bevel=0.01)
    cube("CareerSoftwareHouse_RouteTeamReviewBayRight", group, (3.28, 1.08, -7.36), (1.32, 1.02, 0.12), mats["dark"], bevel=0.01)
    for index, x in enumerate([-3.3, -1.1, 1.4, 3.55]):
        cube(f"CareerSoftwareHouse_RouteDeliveryFlowBar_{index}", group, (x, 0.68, -7.48), (1.26, 0.07, 0.12), [mats["mint"], mats["screen"], mats["paper"], mats["aqua"]][index], bevel=0.004)
    cube("CareerSoftwareHouse_RouteCampusEntryBeaconLeft", group, (-5.72, 1.22, -7.05), (0.18, 1.75, 0.18), mats["mint"], bevel=0.006)
    cube("CareerSoftwareHouse_RouteCampusEntryBeaconRight", group, (6.02, 1.22, -7.05), (0.18, 1.75, 0.18), mats["screen"], bevel=0.006)
    cube("CareerSoftwareHouse_RouteArrivalBoulevardLeft", group, (-6.58, 0.72, -8.18), (0.44, 0.92, 2.58), mats["stone_shadow"], bevel=0.022)
    cube("CareerSoftwareHouse_RouteArrivalBoulevardRight", group, (6.88, 0.72, -8.18), (0.44, 0.92, 2.58), mats["stone_shadow"], bevel=0.022)
    cube("CareerSoftwareHouse_RouteBoulevardCapLeft", group, (-6.58, 1.24, -8.18), (0.58, 0.12, 2.82), mats["paper"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteBoulevardCapRight", group, (6.88, 1.24, -8.18), (0.58, 0.12, 2.82), mats["paper"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteReceptionCanopy", group, (0.15, 3.08, -8.28), (8.95, 0.34, 1.32), mats["dark"], bevel=0.028)
    cube("CareerSoftwareHouse_RouteReceptionCanopyGlow", group, (0.15, 2.82, -8.96), (7.4, 0.09, 0.08), mats["screen"], bevel=0.004)
    cube("CareerSoftwareHouse_RouteReceptionLeftPier", group, (-4.52, 1.64, -8.3), (0.34, 2.72, 0.34), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteReceptionRightPier", group, (4.82, 1.64, -8.3), (0.34, 2.72, 0.34), mats["stone_shadow"], bevel=0.016)
    cube("CareerSoftwareHouse_RouteHiringReviewPavilionLeft", group, (-3.2, 1.52, -8.72), (2.35, 2.38, 0.24), mats["glass"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteHiringReviewPavilionRight", group, (3.5, 1.52, -8.72), (2.35, 2.38, 0.24), mats["glass"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteHiringReviewRoofLeft", group, (-3.2, 2.85, -8.78), (2.72, 0.22, 0.32), mats["wood"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteHiringReviewRoofRight", group, (3.5, 2.85, -8.78), (2.72, 0.22, 0.32), mats["wood"], bevel=0.012)
    cube("CareerSoftwareHouse_RouteTeamFlowBridge", group, (0.15, 3.88, -8.88), (8.55, 0.42, 0.46), mats["glass"], bevel=0.018)
    cube("CareerSoftwareHouse_RouteTeamFlowBridgeRail", group, (0.15, 4.18, -9.18), (8.96, 0.1, 0.08), mats["mint"], bevel=0.004)
    cube("CareerSoftwareHouse_RouteSprintBeaconStackLeft", group, (-5.72, 2.14, -8.88), (0.44, 3.08, 0.32), mats["screen"], bevel=0.014)
    cube("CareerSoftwareHouse_RouteSprintBeaconStackRight", group, (6.02, 2.14, -8.88), (0.44, 3.08, 0.32), mats["purple"], bevel=0.014)
    for index, y in enumerate([1.18, 1.78, 2.38, 2.98]):
        material = [mats["mint"], mats["screen"], mats["paper"], mats["aqua"]][index]
        cube(f"CareerSoftwareHouse_RouteSprintBeaconLineLeft_{index}", group, (-5.72, y, -9.08), (0.3, 0.055, 0.055), material, bevel=0.003)
        cube(f"CareerSoftwareHouse_RouteSprintBeaconLineRight_{index}", group, (6.02, y, -9.08), (0.3, 0.055, 0.055), material, bevel=0.003)
    cube("CareerSoftwareHouse_PublicCampusAtrium", group, (0.15, 3.78, -3.88), (6.85, 6.65, 0.3), mats["glass"], bevel=0.024)
    cube("CareerSoftwareHouse_AtriumTopCodeBand", group, (0.15, 6.98, -4.08), (7.4, 0.17, 0.1), mats["screen"], bevel=0.006)
    cube("CareerSoftwareHouse_AtriumLowerCodeBand", group, (0.15, 3.42, -4.12), (6.1, 0.11, 0.08), mats["mint"], bevel=0.005)
    for index, x in enumerate([-2.7, -1.35, 0, 1.35, 2.7]):
        cube(f"CareerSoftwareHouse_AtriumVerticalFrame_{index}", group, (x, 3.46, -3.86), (0.11, 5.4, 0.08), mats["dark"], bevel=0.004)
    for index, y in enumerate([1.48, 2.2, 2.92, 3.64, 4.36, 5.08]):
        cube(f"CareerSoftwareHouse_AtriumCodePulse_{index}", group, (0.15, y, -3.9), (3.85 - (index % 3) * 0.38, 0.055, 0.055), [mats["screen"], mats["mint"], mats["aqua"], mats["purple"], mats["screen"], mats["mint"]][index], bevel=0.003)
    cube("CareerSoftwareHouse_CollaborationBridgeFront", group, (0.15, 5.26, -3.48), (11.75, 0.46, 0.54), mats["glass"], bevel=0.018)
    cube("CareerSoftwareHouse_CollaborationBridgeRail", group, (0.15, 5.58, -3.82), (12.2, 0.12, 0.08), mats["mint"], bevel=0.004)
    cube("CareerSoftwareHouse_DeliveryTower", group, (-7.1, 4.82, -0.52), (1.88, 8.7, 2.82), mats["stone_shadow"], bevel=0.038)
    cube("CareerSoftwareHouse_DeliveryTowerGlass", group, (-5.78, 4.18, -1.72), (0.08, 5.88, 0.82), mats["glass"], bevel=0.006)
    cube("CareerSoftwareHouse_DeliveryTowerCap", group, (-7.1, 9.28, -0.52), (2.28, 0.36, 3.24), mats["dark"], bevel=0.026)
    cube("CareerSoftwareHouse_EngineeringTower", group, (6.88, 4.72, -0.26), (1.96, 8.45, 3.28), mats["stone"], bevel=0.038)
    cube("CareerSoftwareHouse_EngineeringTowerGlass", group, (5.45, 4.08, -1.52), (0.08, 5.7, 0.95), mats["glass"], bevel=0.006)
    cube("CareerSoftwareHouse_EngineeringTowerCap", group, (6.88, 9.02, -0.26), (2.36, 0.36, 3.54), mats["dark"], bevel=0.026)
    cube("CareerSoftwareHouse_ProductBoardroom", group, (0.15, 7.96, -1.94), (6.42, 1.52, 1.62), mats["glass"], bevel=0.022)
    cube("CareerSoftwareHouse_ProductBoardroomRoof", group, (0.15, 8.86, -1.94), (6.82, 0.3, 2.04), mats["dark"], bevel=0.018)
    for index, x in enumerate([-4.55, -2.25, 2.25, 4.55]):
        cube(f"CareerSoftwareHouse_InterviewPod_{index}", group, (x, 1.02, -3.42), (0.86, 0.84, 0.72), [mats["glass"], mats["screen"], mats["mint"], mats["glass"]][index], bevel=0.018)
        cube(f"CareerSoftwareHouse_InterviewPodSeat_{index}", group, (x, 0.64, -3.06), (0.54, 0.18, 0.26), mats["wood"], bevel=0.012)
    for row, y in enumerate([1.05, 1.78, 2.51, 3.24]):
        cube(f"CareerSoftwareHouse_FloorBand_{row}", group, (-1.12, y + 0.34, -2.07), (8.85, 0.08, 0.1), mats["wood"], bevel=0.004)
        for col, x in enumerate([-4.48, -3.12, -1.76, -0.4, 0.96, 2.32]):
            cube(f"CareerSoftwareHouse_Window_{row}_{col}", group, (x, y, -2.14), (0.82, 0.46, 0.08), mats["glass"], bevel=0.008)
    for col, x in enumerate([3.05, 3.75, 4.45, 5.15]):
        cube(f"CareerSoftwareHouse_AtriumMullion_{col}", group, (x, 1.95, -2.2), (0.08, 2.9, 0.08), mats["screen"], bevel=0.004)
    for row, y in enumerate([1.0, 1.62, 2.24, 2.86]):
        cube(f"CareerSoftwareHouse_AtriumLine_{row}", group, (4.1, y, -2.25), (2.62, 0.055, 0.07), mats["mint"], bevel=0.004)
    for col, x in enumerate([-6.0, -5.42, -4.84]):
        for row, y in enumerate([1.0, 1.65, 2.3]):
            cube(f"CareerSoftwareHouse_StudioWindow_{row}_{col}", group, (x, y, -1.62), (0.34, 0.38, 0.08), mats["aqua"], bevel=0.006)
    for index, x in enumerate([-4.8, -1.45, 1.9]):
        cube(f"CareerSoftwareHouse_RoofUnit_{index}", group, (x, 4.95, 0.75 + index * 0.38), (1.2, 0.44, 0.82), mats["dark"], bevel=0.025)
        cube(f"CareerSoftwareHouse_RoofUnitGlow_{index}", group, (x, 5.12, 0.29 + index * 0.38), (0.88, 0.08, 0.08), [mats["screen"], mats["purple"], mats["mint"]][index], bevel=0.004)
    cube("CareerSoftwareHouse_CodeWall", group, (5.85, 1.82, 1.56), (0.12, 2.55, 2.55), mats["dark"], bevel=0.025)
    for index, y in enumerate([0.98, 1.38, 1.78, 2.18, 2.58]):
        cube(f"CareerSoftwareHouse_CodeLine_{index}", group, (5.77, y, 0.52 + (index % 2) * 0.36), (0.08, 0.05, 1.38 - (index % 2) * 0.28), [mats["screen"], mats["mint"], mats["purple"], mats["screen"], mats["aqua"]][index], bevel=0.003)
    cube("CareerSoftwareHouse_SignalMast", group, (5.9, 5.18, -1.4), (0.14, 1.46, 0.14), mats["dark"], bevel=0.01)
    cube("CareerSoftwareHouse_SignalBar", group, (5.42, 5.82, -1.4), (1.14, 0.1, 0.1), mats["purple"], bevel=0.006)
    cube("CareerSoftwareHouse_ProductTower", group, (-4.7, 5.78, 1.18), (1.45, 2.65, 1.35), mats["stone_shadow"], bevel=0.035)
    cube("CareerSoftwareHouse_ProductTowerCap", group, (-4.7, 7.22, 1.18), (1.86, 0.32, 1.72), mats["dark"], bevel=0.028)
    cube("CareerSoftwareHouse_PeopleOpsTower", group, (2.85, 5.64, 1.26), (1.35, 2.38, 1.28), mats["stone"], bevel=0.035)
    cube("CareerSoftwareHouse_Skywalk", group, (-0.9, 5.28, 1.26), (6.05, 0.34, 0.56), mats["glass"], bevel=0.018)
    cube("CareerSoftwareHouse_SkywalkLowerRail", group, (-0.9, 5.04, 0.88), (6.35, 0.12, 0.08), mats["screen"], bevel=0.004)
    cube("CareerSoftwareHouse_RoofBoardroom", group, (-0.9, 6.02, -0.98), (4.7, 1.36, 1.28), mats["glass"], bevel=0.02)
    cube("CareerSoftwareHouse_BoardroomCap", group, (-0.9, 6.82, -0.98), (5.18, 0.28, 1.64), mats["dark"], bevel=0.018)
    cube("CareerSoftwareHouse_RooftopCourt", group, (-0.88, 5.08, -0.95), (5.4, 0.14, 1.05), mats["paper"], bevel=0.016)
    for index, x in enumerate([-3.3, -1.65, 0, 1.65, 3.3]):
        cube(f"CareerSoftwareHouse_RooftopTeamPod_{index}", group, (x, 5.42, -0.95), (0.62, 0.42, 0.48), [mats["screen"], mats["mint"], mats["paper"], mats["purple"], mats["aqua"]][index], bevel=0.022)
    for index, x in enumerate([-4.8, -3.2, -1.6, 0, 1.6, 3.2, 4.8]):
        cube(f"CareerSoftwareHouse_FacadeFin_{index}", group, (x, 3.18, -2.36), (0.12, 3.2, 0.08), mats["screen" if index % 2 else "mint"], bevel=0.004)
    cube("CareerSoftwareHouse_CampusSpine", group, (-0.55, 5.86, 2.74), (9.8, 0.18, 0.3), mats["wood"], bevel=0.012)
    for index, y in enumerate([4.9, 5.34, 5.78, 6.22]):
        cube(f"CareerSoftwareHouse_TowerWindow_{index}", group, (-5.38, y, 0.5), (0.08, 0.08, 0.66), [mats["screen"], mats["mint"], mats["glass"], mats["purple"]][index], bevel=0.003)
        cube(f"CareerSoftwareHouse_OpsTowerWindow_{index}", group, (2.24, y, 0.58), (0.08, 0.08, 0.58), [mats["mint"], mats["screen"], mats["aqua"], mats["glass"]][index], bevel=0.003)
    for index, y in enumerate([2.0, 3.0, 4.0, 5.0, 6.0]):
        material = [mats["screen"], mats["mint"], mats["aqua"], mats["screen"], mats["purple"]][index]
        cube(f"CareerSoftwareHouse_DeliveryTrace_{index}", group, (-5.75, y, -0.34), (0.08, 0.08, 1.28), material, bevel=0.003)
        cube(f"CareerSoftwareHouse_EngineeringTrace_{index}", group, (5.5, y, -0.34), (0.08, 0.08, 1.28), material, bevel=0.003)
    for index, x in enumerate([-2.4, -1.2, 0, 1.2, 2.4]):
        cube(f"CareerSoftwareHouse_BoardroomTeamGlow_{index}", group, (x, 7.16, -2.64), (0.52, 0.08, 0.06), [mats["mint"], mats["screen"], mats["paper"], mats["screen"], mats["mint"]][index], bevel=0.003)


def create_awards_museum_hall(mats):
    group = root("EnvPolishAwardsMuseumHall")
    cube("AwardsMuseum_SiteTerrace", group, (0, 0.1, -0.25), (14.4, 0.2, 8.9), mats["paper"], bevel=0.055)
    cube("AwardsMuseum_GalleryHall", group, (0, 2.25, 0.2), (11.2, 4.2, 5.6), mats["stone"], bevel=0.06)
    cube("AwardsMuseum_LeftArchiveWing", group, (-4.75, 2.1, 0.34), (3.05, 3.75, 5.25), mats["stone_shadow"], bevel=0.055)
    cube("AwardsMuseum_RightArchiveWing", group, (4.75, 2.1, 0.34), (3.05, 3.75, 5.25), mats["stone_shadow"], bevel=0.055)
    cube("AwardsMuseum_RearArchiveWall", group, (0, 2.18, 3.18), (11.75, 3.75, 0.5), mats["stone_shadow"], bevel=0.045)
    cube("AwardsMuseum_FrontPorticoVolume", group, (0, 2.12, -3.02), (8.95, 3.72, 1.18), mats["stone_shadow"], bevel=0.05)
    cube("AwardsMuseum_FrontGalleryInset", group, (0, 2.15, -3.68), (5.2, 2.85, 0.14), mats["glass"], bevel=0.014)
    cube("AwardsMuseum_RoadFacingDoor", group, (0, 1.1, -3.78), (1.6, 1.74, 0.14), mats["dark"], bevel=0.012)
    cube("AwardsMuseum_DoorGlow", group, (0, 2.1, -3.88), (2.2, 0.1, 0.06), mats["amber"], bevel=0.004)
    cube("AwardsMuseum_EntryLintel", group, (0, 3.95, -3.64), (9.55, 0.42, 0.52), mats["paper"], bevel=0.026)
    cube("AwardsMuseum_GoldEntablature", group, (0, 4.28, -3.78), (9.2, 0.16, 0.1), mats["gold"], bevel=0.006)
    for index, x in enumerate([-3.75, -1.25, 1.25, 3.75]):
        cube(f"AwardsMuseum_PorticoColumn_{index}", group, (x, 1.78, -3.58), (0.46, 3.2, 0.46), mats["paper"], bevel=0.034)
        cube(f"AwardsMuseum_PorticoBase_{index}", group, (x, 0.34, -3.58), (0.82, 0.28, 0.78), mats["stone_shadow"], bevel=0.024)
        cube(f"AwardsMuseum_PorticoCapital_{index}", group, (x, 3.3, -3.58), (0.88, 0.26, 0.74), mats["stone_shadow"], bevel=0.024)
    for index, z in enumerate([-5.18, -4.68, -4.18, -3.68]):
        cube(f"AwardsMuseum_EntryStep_{index}", group, (0, 0.16 + index * 0.052, z), (8.3 - index * 0.66, 0.13, 0.42), mats["stone"], bevel=0.024)

    cube("AwardsMuseum_RoofSlab", group, (0, 4.52, 0.12), (12.5, 0.46, 6.25), mats["wood"], bevel=0.045)
    cube("AwardsMuseum_RoofStoneCap", group, (0, 4.88, 0.12), (11.4, 0.34, 5.35), mats["stone_shadow"], bevel=0.04)
    cube("AwardsMuseum_GoldRoofLineFront", group, (0, 5.08, -2.72), (10.8, 0.1, 0.08), mats["gold"], bevel=0.004)
    cube("AwardsMuseum_GoldRoofLineRear", group, (0, 5.08, 2.86), (10.8, 0.1, 0.08), mats["gold"], bevel=0.004)
    cube("AwardsMuseum_GoldRoofLineLeft", group, (-6.0, 5.08, 0.08), (0.08, 0.1, 5.25), mats["gold"], bevel=0.004)
    cube("AwardsMuseum_GoldRoofLineRight", group, (6.0, 5.08, 0.08), (0.08, 0.1, 5.25), mats["gold"], bevel=0.004)

    cube("AwardsMuseum_TrophyRotundaBase", group, (0, 5.72, 0.0), (3.55, 1.5, 2.55), mats["stone"], bevel=0.045)
    cube("AwardsMuseum_TrophyRotundaGlassFront", group, (0, 5.72, -1.34), (2.42, 0.9, 0.08), mats["glass"], bevel=0.008)
    cube("AwardsMuseum_TrophyRotundaGlassRear", group, (0, 5.72, 1.34), (2.42, 0.9, 0.08), mats["glass"], bevel=0.008)
    cube("AwardsMuseum_TrophyRotundaRoof", group, (0, 6.62, 0.0), (4.2, 0.34, 3.05), mats["gold"], bevel=0.04)
    cube("AwardsMuseum_TrophyCupBowl", group, (0, 7.16, 0.0), (1.45, 0.52, 0.92), mats["gold"], bevel=0.08)
    cube("AwardsMuseum_TrophyCupStem", group, (0, 6.78, 0.0), (0.28, 0.58, 0.28), mats["gold"], bevel=0.025)
    cube("AwardsMuseum_TrophyCupBase", group, (0, 6.48, 0.0), (0.92, 0.22, 0.62), mats["stone_shadow"], bevel=0.024)

    for index, x in enumerate([-4.05, -2.7, 2.7, 4.05]):
        cube(f"AwardsMuseum_FrontCertificateCase_{index}", group, (x, 2.42, -3.72), (0.86, 1.2, 0.08), [mats["paper"], mats["gold"], mats["gold"], mats["paper"]][index], bevel=0.008)
        cube(f"AwardsMuseum_FrontCertificateGlow_{index}", group, (x, 3.18, -3.8), (0.68, 0.08, 0.06), mats["amber"], bevel=0.004)
    for side, x in [("Left", -6.28), ("Right", 6.28)]:
        cube(f"AwardsMuseum_{side}SideMuseumWall", group, (x, 2.18, 0.12), (0.44, 3.7, 5.4), mats["stone_shadow"], bevel=0.04)
        for index, z in enumerate([-1.72, -0.42, 0.88, 2.18]):
            cube(f"AwardsMuseum_{side}CertificateBay_{index}", group, (x, 2.08, z), (0.08, 0.88, 0.78), [mats["paper"], mats["glass"], mats["gold"], mats["paper"]][index], bevel=0.008)
            cube(f"AwardsMuseum_{side}GalleryLight_{index}", group, (x, 2.82, z), (0.08, 0.06, 0.58), mats["amber"], bevel=0.003)
        cube(f"AwardsMuseum_{side}SideCornice", group, (x, 4.1, 0.12), (0.54, 0.22, 5.7), mats["paper"], bevel=0.018)
    for index, x in enumerate([-4.6, -2.75, -0.9, 0.9, 2.75, 4.6]):
        cube(f"AwardsMuseum_RearArchiveCase_{index}", group, (x, 2.08, 3.5), (0.9, 1.05, 0.08), [mats["paper"], mats["gold"], mats["glass"], mats["glass"], mats["gold"], mats["paper"]][index], bevel=0.008)
        cube(f"AwardsMuseum_RearArchiveGlow_{index}", group, (x, 2.86, 3.58), (0.68, 0.08, 0.06), mats["amber"], bevel=0.004)
    cube("AwardsMuseum_RearServiceDoor", group, (0, 0.92, 3.58), (1.32, 1.35, 0.12), mats["dark"], bevel=0.012)
    cube("AwardsMuseum_RearCertificateHeader", group, (0, 3.76, 3.56), (7.8, 0.16, 0.08), mats["gold"], bevel=0.004)

    cube("AwardsMuseum_CeremonialWalk", group, (0, 0.24, -6.05), (9.6, 0.14, 1.55), mats["stone"], bevel=0.035)
    for index, x in enumerate([-3.6, -1.8, 0, 1.8, 3.6]):
        cube(f"AwardsMuseum_WalkInlay_{index}", group, (x, 0.36, -6.08), (0.82, 0.08, 0.92), [mats["paper"], mats["gold"], mats["amber"], mats["gold"], mats["paper"]][index], bevel=0.01)
    cube("AwardsMuseum_FrontMedalSealBackplate", group, (0, 3.02, -3.86), (2.3, 1.92, 0.12), mats["stone_shadow"], bevel=0.018)
    cylinder("AwardsMuseum_FrontMedalSeal", group, (0, 3.26, -3.95), 0.76, 0.1, mats["gold"], vertices=24, bevel=0.012)
    cube("AwardsMuseum_FrontRibbonLeft", group, (-0.28, 2.34, -4.02), (0.22, 0.98, 0.08), mats["amber"], rot=(0, 0, -0.14), bevel=0.004)
    cube("AwardsMuseum_FrontRibbonRight", group, (0.28, 2.34, -4.02), (0.22, 0.98, 0.08), mats["paper"], rot=(0, 0, 0.14), bevel=0.004)


def create_todo_board(mats):
    group = root("EnvPolishTodoBoard")
    cube("TodoBoard_Base", group, (0, 0.14, 0), (4.5, 0.28, 1.4), mats["stone"], bevel=0.035)
    cube("TodoBoard_Back", group, (0, 1.48, 0.32), (4.0, 2.35, 0.28), mats["dark"], bevel=0.03)
    for i, (x, y) in enumerate([(-1.2, 1.05), (0, 1.3), (1.18, 1.05), (-0.58, 1.86), (0.88, 1.9)]):
        cube(f"TodoBoard_Card_{i}", group, (x, y, 0.12), (0.82, 0.48, 0.06), [mats["paper"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][i], rot=(0, 0, 0.08 - i * 0.04), bevel=0.008)
    cube("TodoBoard_Header", group, (0, 2.72, 0.18), (3.2, 0.1, 0.08), mats["purple"], bevel=0.006)


def create_todo_planning_studio(mats):
    group = root("EnvPolishTodoPlanningStudio")
    cube("TodoPlanningStudio_ServiceCourt", group, (0, 0.09, -0.2), (17.4, 0.18, 10.4), mats["stone"], bevel=0.055)
    cube("TodoPlanningStudio_MainStudio", group, (-1.2, 1.86, 0.32), (9.8, 3.48, 5.0), mats["wood"], bevel=0.052)
    cube("TodoPlanningStudio_GlassWorkroom", group, (5.25, 1.45, -0.18), (3.55, 2.65, 4.18), mats["glass"], bevel=0.038)
    cube("TodoPlanningStudio_TaskArchive", group, (-6.65, 1.22, 0.74), (2.45, 2.22, 4.32), mats["stone_shadow"], bevel=0.04)
    cube("TodoPlanningStudio_RoofDeck", group, (-1.05, 3.74, 0.22), (11.4, 0.36, 5.78), mats["dark"], bevel=0.034)
    cube("TodoPlanningStudio_RoofScheduleBar", group, (-1.05, 4.04, -2.1), (11.8, 0.18, 0.34), mats["screen"], bevel=0.014)
    cube("TodoPlanningStudio_EntryCanopy", group, (0.0, 2.08, -3.28), (5.9, 0.26, 1.14), mats["dark"], bevel=0.024)
    cube("TodoPlanningStudio_EntryPortalHeader", group, (0.0, 2.9, -3.72), (6.8, 0.34, 0.28), mats["stone_shadow"], bevel=0.02)
    cube("TodoPlanningStudio_EntryPortalGlow", group, (0.0, 2.62, -3.9), (5.2, 0.08, 0.06), mats["mint"], bevel=0.004)
    for x in [-3.24, 3.24]:
        cube("TodoPlanningStudio_EntryPortalColumn", group, (x, 1.48, -3.82), (0.3, 2.72, 0.3), mats["stone_shadow"], bevel=0.018)
        cube("TodoPlanningStudio_EntryColumnLight", group, (x, 1.7, -4.0), (0.08, 1.72, 0.06), mats["screen"], bevel=0.004)
    for index, z in enumerate([-4.02, -3.58, -3.14]):
        cube(f"TodoPlanningStudio_EntryStep_{index}", group, (0.0, 0.17 + index * 0.05, z), (5.7 - index * 0.68, 0.13, 0.38), mats["paper"], bevel=0.023)
    cube("TodoPlanningStudio_PlanningWall", group, (-1.2, 1.78, -2.25), (6.95, 2.38, 0.12), mats["dark"], bevel=0.026)
    cube("TodoPlanningStudio_PlanningWallFrame", group, (-1.2, 3.04, -2.42), (7.4, 0.18, 0.12), mats["wood"], bevel=0.008)
    cube("TodoPlanningStudio_PlanningWallTopGallery", group, (-1.2, 3.44, -2.32), (7.15, 0.58, 0.1), mats["glass"], bevel=0.01)
    cube("TodoPlanningStudio_PlanningWallBottomRail", group, (-1.2, 0.62, -2.36), (7.3, 0.18, 0.12), mats["stone_shadow"], bevel=0.008)
    for column, x in enumerate([-3.95, -2.75, -1.55, -0.35, 0.85, 2.05]):
        for row, y in enumerate([1.06, 1.58, 2.1]):
            material = [mats["paper"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"], mats["foam"]][(column + row) % 6]
            cube(f"TodoPlanningStudio_KanbanCard_{column}_{row}", group, (x, y, -2.34), (0.62, 0.34, 0.07), material, bevel=0.005)
    cube("TodoPlanningStudio_RouteKanbanAtrium", group, (-2.72, 2.16, -4.34), (4.42, 2.28, 0.14), mats["dark"], bevel=0.032)
    cube("TodoPlanningStudio_RouteKanbanGlass", group, (-2.72, 2.12, -4.44), (3.82, 1.64, 0.08), mats["glass"], bevel=0.012)
    cube("TodoPlanningStudio_RouteKanbanHeader", group, (-2.72, 3.36, -4.5), (4.26, 0.22, 0.08), mats["wood"], bevel=0.01)
    cube("TodoPlanningStudio_RouteKanbanFooter", group, (-2.72, 0.94, -4.5), (4.18, 0.18, 0.08), mats["stone_shadow"], bevel=0.01)
    for index, x in enumerate([-3.72, -2.72, -1.72]):
        cube(f"TodoPlanningStudio_RouteKanbanColumn_{index}", group, (x, 2.12, -4.57), (0.72, 1.42, 0.06), [mats["screen"], mats["mint"], mats["purple"]][index], bevel=0.006)
        cube(f"TodoPlanningStudio_RouteKanbanColumnHeader_{index}", group, (x, 2.84, -4.64), (0.54, 0.14, 0.06), [mats["paper"], mats["amber"], mats["aqua"]][index], bevel=0.004)
        for row, y in enumerate([1.36, 1.86, 2.36, 2.86]):
            card_material = [mats["paper"], mats["foam"], mats["amber"], mats["mint"], mats["aqua"], mats["purple"]][(index * 2 + row) % 6]
            cube(f"TodoPlanningStudio_RouteKanbanTask_{index}_{row}", group, (x, y, -4.68), (0.46, 0.16, 0.06), card_material, bevel=0.004)
    cube("TodoPlanningStudio_RouteOperationsCore", group, (2.0, 2.64, -4.76), (5.42, 2.92, 0.96), mats["glass"], bevel=0.024)
    cube("TodoPlanningStudio_RouteOperationsCoreFrameTop", group, (2.0, 4.18, -4.78), (5.88, 0.24, 1.12), mats["dark"], bevel=0.018)
    cube("TodoPlanningStudio_RouteOperationsCoreFrameBase", group, (2.0, 1.05, -4.78), (5.72, 0.24, 1.0), mats["stone_shadow"], bevel=0.018)
    for x in [-0.28, 1.24, 2.76, 4.28]:
        cube("TodoPlanningStudio_RouteOperationsCoreMullion", group, (x, 2.58, -5.24), (0.08, 2.28, 0.08), mats["screen"], bevel=0.004)
    for index, x in enumerate([0.36, 1.72, 3.08]):
        cube(f"TodoPlanningStudio_RouteOperationsDesk_{index}", group, (x, 1.45, -5.2), (0.86, 0.18, 0.14), [mats["paper"], mats["mint"], mats["amber"]][index], bevel=0.006)
        cube(f"TodoPlanningStudio_RouteOperationsPulse_{index}", group, (x, 2.12, -5.24), (0.72, 0.1, 0.06), [mats["screen"], mats["aqua"], mats["purple"]][index], bevel=0.003)
    cylinder("TodoPlanningStudio_PlanningClockDisk", group, (-4.62, 4.46, -4.54), 0.48, 0.08, mats["amber"], vertices=20, bevel=0.01)
    cube("TodoPlanningStudio_PlanningClockHandVertical", group, (-4.62, 4.46, -4.62), (0.05, 0.62, 0.05), mats["dark"], bevel=0.003)
    cube("TodoPlanningStudio_PlanningClockHandHorizontal", group, (-4.62, 4.46, -4.63), (0.58, 0.05, 0.05), mats["dark"], bevel=0.003)
    cube("TodoPlanningStudio_SprintReviewCanopy", group, (0.0, 4.28, -4.08), (9.72, 0.28, 0.74), mats["stone_shadow"], bevel=0.018)
    cube("TodoPlanningStudio_SprintReviewCanopyGlow", group, (0.0, 4.13, -4.48), (8.2, 0.08, 0.06), mats["mint"], bevel=0.004)
    cube("TodoPlanningStudio_RouteReviewTheater", group, (0.0, 0.48, -5.1), (8.8, 0.24, 0.82), mats["stone"], bevel=0.03)
    for index, z in enumerate([-5.34, -5.08, -4.82]):
        cube(f"TodoPlanningStudio_RouteReviewTheaterStep_{index}", group, (0.0, 0.68 + index * 0.16, z), (7.5 - index * 0.68, 0.12, 0.18), mats["paper"], bevel=0.018)
    cube("TodoPlanningStudio_RouteDeliveryBridge", group, (1.0, 4.78, -5.04), (9.2, 0.24, 0.38), mats["wood"], bevel=0.014)
    cube("TodoPlanningStudio_RouteDeliveryBridgeGlow", group, (1.0, 4.94, -5.26), (7.2, 0.08, 0.06), mats["screen"], bevel=0.004)
    cube("TodoPlanningStudio_RouteDecisionBeaconMast", group, (5.2, 4.72, -4.84), (0.16, 1.82, 0.16), mats["dark"], bevel=0.008)
    cube("TodoPlanningStudio_RouteDecisionBeacon", group, (5.2, 5.84, -4.84), (0.58, 0.48, 0.58), mats["amber"], bevel=0.02)
    cube("TodoPlanningStudio_DeliveryLaneTower", group, (7.44, 3.16, -3.62), (0.88, 4.65, 1.08), mats["stone_shadow"], bevel=0.026)
    for index, y in enumerate([1.34, 1.9, 2.46, 3.02, 3.58, 4.14]):
        cube(f"TodoPlanningStudio_DeliveryLanePulse_{index}", group, (7.0, y, -4.18), (0.08, 0.12, 0.62), [mats["screen"], mats["paper"], mats["amber"], mats["mint"], mats["aqua"], mats["purple"]][index], bevel=0.003)
    for index, x in enumerate([-4.2, -1.35, 1.5]):
        cube(f"TodoPlanningStudio_ReviewTable_{index}", group, (x, 0.72, -0.78), (2.2, 0.22, 0.82), mats["stone_shadow"], bevel=0.025)
        cube(f"TodoPlanningStudio_ReviewLane_{index}", group, (x, 0.94, -0.78), (1.7, 0.08, 0.08), [mats["purple"], mats["screen"], mats["amber"]][index], bevel=0.004)
    for index, x in enumerate([4.25, 5.05, 5.85]):
        cube(f"TodoPlanningStudio_WorkroomMullion_{index}", group, (x, 1.58, -2.16), (0.08, 2.32, 0.08), mats["screen"], bevel=0.004)
    for index, y in enumerate([1.08, 1.68, 2.28]):
        cube(f"TodoPlanningStudio_WorkroomStatus_{index}", group, (5.18, y, -2.22), (2.6, 0.07, 0.07), [mats["screen"], mats["mint"], mats["purple"]][index], bevel=0.004)
    for index, z in enumerate([-1.44, -0.48, 0.48, 1.44]):
        cube(f"TodoPlanningStudio_ArchiveSlot_{index}", group, (-7.86, 1.18 + (index % 2) * 0.44, z), (0.08, 0.48, 0.62), [mats["paper"], mats["foam"], mats["amber"], mats["mint"]][index], bevel=0.006)
    cube("TodoPlanningStudio_ScheduleTower", group, (6.95, 2.42, 1.38), (0.34, 3.6, 1.18), mats["dark"], bevel=0.018)
    for index, y in enumerate([1.08, 1.56, 2.04, 2.52, 3.0]):
        cube(f"TodoPlanningStudio_SchedulePulse_{index}", group, (6.78, y, 0.9), (0.08, 0.08, 0.82), [mats["screen"], mats["mint"], mats["purple"], mats["amber"], mats["screen"]][index], bevel=0.003)
    cube("TodoPlanningStudio_RetrospectiveLoft", group, (-2.35, 4.82, 1.05), (5.2, 1.9, 1.42), mats["stone_shadow"], bevel=0.035)
    cube("TodoPlanningStudio_LoftGlass", group, (-2.35, 4.82, 0.28), (4.1, 1.14, 0.08), mats["glass"], bevel=0.01)
    cube("TodoPlanningStudio_CommandAtrium", group, (-1.15, 5.34, -1.32), (4.7, 2.32, 1.5), mats["glass"], bevel=0.02)
    cube("TodoPlanningStudio_CommandAtriumCap", group, (-1.15, 6.66, -1.32), (5.25, 0.3, 1.95), mats["dark"], bevel=0.018)
    cube("TodoPlanningStudio_CommandHallBody", group, (-1.15, 6.86, 0.42), (5.82, 2.36, 2.15), mats["stone_shadow"], bevel=0.035)
    cube("TodoPlanningStudio_CommandHallGlass", group, (-1.15, 6.82, -0.72), (4.3, 1.18, 0.08), mats["glass"], bevel=0.01)
    cube("TodoPlanningStudio_CommandHallCap", group, (-1.15, 8.22, 0.42), (6.46, 0.32, 2.58), mats["wood"], bevel=0.026)
    cube("TodoPlanningStudio_CommandHallFrontBand", group, (-1.15, 5.84, -0.76), (4.72, 0.12, 0.08), mats["screen"], bevel=0.004)
    cube("TodoPlanningStudio_CommandHallDecisionRail", group, (-1.15, 7.74, -0.76), (4.9, 0.1, 0.08), mats["mint"], bevel=0.004)
    for index, x in enumerate([-2.86, -1.72, -0.58, 0.56]):
        cube(f"TodoPlanningStudio_CommandHallStatus_{index}", group, (x, 6.42, -0.82), (0.62, 0.34, 0.07), [mats["paper"], mats["amber"], mats["aqua"], mats["purple"]][index], bevel=0.004)
    for index, x in enumerate([-5.05, -3.72, 2.0, 3.34, 4.68]):
        cube(f"TodoPlanningStudio_UpperStudioWindow_{index}", group, (x, 3.0, -2.28), (0.78, 0.6, 0.08), [mats["glass"], mats["screen"], mats["paper"], mats["mint"], mats["glass"]][index], bevel=0.006)
    for x in [-3.1, -1.96, -0.82, 0.32]:
        cube("TodoPlanningStudio_CommandAtriumMullion", group, (x, 5.34, -2.12), (0.08, 1.92, 0.08), mats["screen"], bevel=0.004)
    cube("TodoPlanningStudio_SprintTower", group, (5.9, 5.12, 1.48), (1.2, 2.72, 1.14), mats["dark"], bevel=0.03)
    cube("TodoPlanningStudio_SprintTowerCap", group, (5.9, 6.58, 1.48), (1.58, 0.28, 1.48), mats["dark"], bevel=0.024)
    cube("TodoPlanningStudio_SprintTowerLantern", group, (5.9, 7.1, 1.48), (0.72, 0.72, 0.72), mats["mint"], bevel=0.02)
    cube("TodoPlanningStudio_SprintTowerUpperStack", group, (5.9, 7.54, 1.48), (1.02, 1.54, 1.02), mats["stone_shadow"], bevel=0.026)
    cube("TodoPlanningStudio_SprintTowerSignalCap", group, (5.9, 8.44, 1.48), (1.42, 0.24, 1.36), mats["screen"], bevel=0.014)
    cube("TodoPlanningStudio_ScheduleMast", group, (6.95, 5.2, 1.38), (0.18, 3.1, 0.18), mats["dark"], bevel=0.01)
    cube("TodoPlanningStudio_ScheduleMastBeacon", group, (6.95, 6.92, 1.38), (0.54, 0.42, 0.54), mats["amber"], bevel=0.024)
    cube("TodoPlanningStudio_DeliveryWing", group, (-6.55, 3.5, -0.82), (2.1, 2.3, 2.4), mats["stone"], bevel=0.034)
    cube("TodoPlanningStudio_DeliveryWingCap", group, (-6.55, 4.78, -0.82), (2.48, 0.26, 2.76), mats["wood"], bevel=0.02)
    cube("TodoPlanningStudio_DeliveryWingUpper", group, (-6.55, 5.45, -0.82), (1.82, 1.16, 2.12), mats["stone_shadow"], bevel=0.03)
    cube("TodoPlanningStudio_DeliveryWingGlass", group, (-5.58, 5.42, -0.82), (0.08, 0.74, 1.32), mats["glass"], bevel=0.008)
    cube("TodoPlanningStudio_ReviewBalcony", group, (-1.25, 3.56, -3.12), (8.2, 0.18, 0.72), mats["stone_shadow"], bevel=0.012)
    cube("TodoPlanningStudio_DecisionBridge", group, (-0.2, 4.34, 2.78), (8.7, 0.2, 0.32), mats["wood"], bevel=0.012)
    cube("TodoPlanningStudio_OperationsBridge", group, (-0.25, 5.24, 2.66), (9.2, 0.24, 0.38), mats["dark"], bevel=0.014)
    cube("TodoPlanningStudio_OperationsBridgeGlow", group, (-0.25, 5.42, 2.42), (7.8, 0.08, 0.06), mats["screen"], bevel=0.004)
    for index, x in enumerate([-4.1, -2.45, -0.8, 0.85, 2.5]):
        cube(f"TodoPlanningStudio_BridgeStatus_{index}", group, (x, 4.52, 2.48), (0.58, 0.08, 0.07), [mats["mint"], mats["screen"], mats["amber"], mats["paper"], mats["aqua"]][index], bevel=0.003)
    for index, x in enumerate([-4.9, -3.25, 3.25, 4.9]):
        cube(f"TodoPlanningStudio_FacadeProcessFin_{index}", group, (x, 2.12, -2.5), (0.12, 2.36, 0.08), [mats["screen"], mats["mint"], mats["amber"], mats["screen"]][index], bevel=0.004)
    for index, x in enumerate([-3.2, -1.6, 0.0, 1.6, 3.2]):
        cube(f"TodoPlanningStudio_RoofSprintCard_{index}", group, (x, 4.18, -2.24), (0.7, 0.08, 0.08), [mats["paper"], mats["mint"], mats["purple"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("TodoPlanningStudio_ProductionControlHall", group, (0.0, 5.62, -3.44), (10.65, 2.12, 1.48), mats["stone_shadow"], bevel=0.04)
    cube("TodoPlanningStudio_ProductionControlAtrium", group, (0.0, 5.55, -4.26), (8.7, 1.28, 0.08), mats["glass"], bevel=0.01)
    cube("TodoPlanningStudio_ProductionControlCanopy", group, (0.0, 4.48, -4.28), (11.35, 0.32, 1.02), mats["dark"], bevel=0.024)
    cube("TodoPlanningStudio_ProductionControlRoof", group, (0.0, 6.86, -3.44), (11.25, 0.34, 1.86), mats["wood"], bevel=0.026)
    cube("TodoPlanningStudio_ProductionControlSignalBand", group, (0.0, 6.05, -4.38), (7.6, 0.1, 0.065), mats["screen"], bevel=0.004)
    for index, x in enumerate([-3.8, -2.28, -0.76, 0.76, 2.28, 3.8]):
        cube(f"TodoPlanningStudio_ControlRoomPulse_{index}", group, (x, 5.38, -4.43), (0.76, 0.34, 0.06), [mats["mint"], mats["paper"], mats["amber"], mats["aqua"], mats["screen"], mats["mint"]][index], bevel=0.004)
    cube("TodoPlanningStudio_BacklogArchiveTower", group, (-8.18, 4.38, -2.52), (1.74, 6.08, 1.58), mats["stone_shadow"], bevel=0.038)
    cube("TodoPlanningStudio_BacklogArchiveCrown", group, (-8.18, 7.64, -2.52), (2.18, 0.38, 1.96), mats["dark"], bevel=0.024)
    for index, y in enumerate([2.38, 3.04, 3.7, 4.36, 5.02, 5.68]):
        cube(f"TodoPlanningStudio_BacklogArchiveSlot_{index}", group, (-7.22, y, -2.98), (0.08, 0.28, 0.72), [mats["paper"], mats["foam"], mats["mint"], mats["amber"], mats["aqua"], mats["screen"]][index], bevel=0.004)
    cube("TodoPlanningStudio_SprintReviewBridge", group, (-0.2, 4.92, -4.92), (10.75, 0.24, 0.44), mats["wood"], bevel=0.014)
    cube("TodoPlanningStudio_SprintReviewBridgeGlow", group, (-0.2, 5.08, -5.18), (8.2, 0.08, 0.06), mats["mint"], bevel=0.004)
    cube("TodoPlanningStudio_DeliveryLaneSpine", group, (7.72, 5.52, -1.58), (1.06, 4.86, 1.18), mats["dark"], bevel=0.028)
    cube("TodoPlanningStudio_DeliveryLaneSpineGlass", group, (7.14, 5.46, -1.58), (0.08, 3.45, 0.82), mats["glass"], bevel=0.008)
    for index, y in enumerate([4.12, 4.7, 5.28, 5.86, 6.44]):
        cube(f"TodoPlanningStudio_DeliveryLaneSpineStep_{index}", group, (7.08, y, -2.05), (0.08, 0.14, 0.68), [mats["screen"], mats["mint"], mats["paper"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("TodoPlanningStudio_DecisionBeaconMast", group, (0.0, 8.18, -3.44), (0.2, 2.28, 0.2), mats["dark"], bevel=0.008)
    cylinder("TodoPlanningStudio_DecisionBeacon", group, (0.0, 9.48, -3.44), 0.5, 0.44, mats["amber"], vertices=20, bevel=0.012)
    cube("TodoPlanningStudio_RouteSprintBoardGateDeck", group, (0.0, 0.46, -5.92), (12.9, 0.26, 1.06), mats["stone"], bevel=0.04)
    for x in [-6.05, 6.05]:
        cube("TodoPlanningStudio_RouteSprintBoardGatePylon", group, (x, 3.58, -5.92), (0.62, 6.18, 0.72), mats["stone_shadow"], bevel=0.035)
        cube("TodoPlanningStudio_RouteSprintBoardGateLight", group, (x, 3.54, -6.34), (0.08, 4.58, 0.06), mats["screen"], bevel=0.004)
    cube("TodoPlanningStudio_RouteSprintBoardGateHeader", group, (0.0, 6.78, -5.92), (12.9, 0.46, 0.92), mats["dark"], bevel=0.026)
    cube("TodoPlanningStudio_RouteSprintBoardSignalBand", group, (0.0, 6.52, -6.42), (10.8, 0.1, 0.06), mats["mint"], bevel=0.004)
    cube("TodoPlanningStudio_RouteProductionPortalGlass", group, (0.0, 3.46, -6.38), (8.84, 3.72, 0.08), mats["glass"], bevel=0.014)
    for x in [-3.9, -1.95, 0.0, 1.95, 3.9]:
        cube("TodoPlanningStudio_RouteProductionPortalMullion", group, (x, 3.46, -6.46), (0.08, 3.42, 0.07), mats["screen"], bevel=0.003)
    for index, x in enumerate([-4.35, -2.9, -1.45, 0.0, 1.45, 2.9, 4.35]):
        cube(f"TodoPlanningStudio_RouteSprintBoardTile_{index}", group, (x, 2.64 + (index % 2) * 0.44, -6.5), (0.72, 0.34, 0.06), [mats["paper"], mats["amber"], mats["mint"], mats["aqua"]][index % 4], bevel=0.004)
    for x in [-4.95, 4.95]:
        cube("TodoPlanningStudio_RouteBacklogArchiveWing", group, (x, 2.58, -6.72), (1.12, 4.12, 0.86), mats["wood"], bevel=0.028)
        for index, y in enumerate([1.36, 1.96, 2.56, 3.16]):
            cube(f"TodoPlanningStudio_RouteBacklogArchiveSlot_{'L' if x < 0 else 'R'}_{index}", group, (x, y, -7.2), (0.68, 0.12, 0.08), [mats["paper"], mats["mint"], mats["amber"], mats["aqua"]][index], bevel=0.003)
    cube("TodoPlanningStudio_RouteDecisionStack", group, (6.98, 4.34, -5.86), (0.72, 5.88, 0.84), mats["dark"], bevel=0.026)
    for index, y in enumerate([2.0, 2.66, 3.32, 3.98, 4.64, 5.3, 5.96]):
        cube(f"TodoPlanningStudio_RouteDecisionStackPulse_{index}", group, (6.56, y, -6.34), (0.08, 0.12, 0.58), [mats["screen"], mats["mint"], mats["amber"], mats["paper"], mats["aqua"], mats["purple"], mats["screen"]][index], bevel=0.003)
    cube("TodoPlanningStudio_RouteDeliverySignalRun", group, (-0.2, 7.34, -6.46), (9.4, 0.16, 0.08), mats["screen"], bevel=0.004)
    for index, x in enumerate([-4.2, -2.8, -1.4, 0.0, 1.4, 2.8, 4.2]):
        cube(f"TodoPlanningStudio_RouteDeliverySignalPacket_{index}", group, (x, 7.34, -6.56), (0.38, 0.24, 0.08), [mats["mint"], mats["paper"], mats["amber"], mats["aqua"]][index % 4], bevel=0.004)
    cube("TodoPlanningStudio_RouteSprintBoardFacade", group, (0.0, 3.48, -7.12), (7.85, 2.78, 0.16), mats["dark"], bevel=0.032)
    cube("TodoPlanningStudio_RouteSprintBoardFacadeFrameTop", group, (0.0, 4.98, -7.24), (8.55, 0.26, 0.2), mats["wood"], bevel=0.014)
    cube("TodoPlanningStudio_RouteSprintBoardFacadeFrameBase", group, (0.0, 1.98, -7.24), (8.55, 0.24, 0.2), mats["stone_shadow"], bevel=0.014)
    for index, x in enumerate([-2.45, 0.0, 2.45]):
        column_material = [mats["screen"], mats["mint"], mats["purple"]][index]
        cube(f"TodoPlanningStudio_RouteSprintBoardColumn_{index}", group, (x, 3.48, -7.34), (1.55, 2.02, 0.1), column_material, bevel=0.01)
        cube(f"TodoPlanningStudio_RouteSprintBoardColumnHeader_{index}", group, (x, 4.34, -7.43), (1.18, 0.22, 0.08), [mats["paper"], mats["amber"], mats["aqua"]][index], bevel=0.006)
        for row, y in enumerate([2.78, 3.24, 3.7, 4.16]):
            card_material = [mats["paper"], mats["foam"], mats["amber"], mats["mint"], mats["aqua"], mats["purple"]][(index + row) % 6]
            cube(f"TodoPlanningStudio_RouteSprintBoardTask_{index}_{row}", group, (x - 0.28 + (row % 2) * 0.22, y, -7.48), (0.84, 0.22, 0.08), card_material, bevel=0.005)
    cube("TodoPlanningStudio_RouteChecklistSpine", group, (5.24, 3.5, -7.02), (0.7, 4.14, 0.32), mats["stone_shadow"], bevel=0.025)
    for index, y in enumerate([2.24, 3.0, 3.76, 4.52]):
        cube(f"TodoPlanningStudio_RouteChecklistBox_{index}", group, (5.24, y, -7.34), (0.3, 0.3, 0.08), [mats["paper"], mats["mint"], mats["paper"], mats["amber"]][index], bevel=0.004)
        cube(f"TodoPlanningStudio_RouteChecklistMarkA_{index}", group, (5.16, y + 0.02, -7.4), (0.05, 0.22, 0.05), mats["dark"], rot=(0, 0, -0.72), bevel=0.002)
        cube(f"TodoPlanningStudio_RouteChecklistMarkB_{index}", group, (5.31, y + 0.04, -7.4), (0.05, 0.36, 0.05), mats["dark"], rot=(0, 0, 0.66), bevel=0.002)
    cube("TodoPlanningStudio_RouteCalendarCrown", group, (-5.18, 5.98, -7.05), (1.9, 1.04, 0.26), mats["stone_shadow"], bevel=0.02)
    for column, x in enumerate([-5.72, -5.18, -4.64]):
        for row, y in enumerate([6.08, 6.48]):
            cube(f"TodoPlanningStudio_RouteCalendarTile_{column}_{row}", group, (x, y - 0.34, -7.34), (0.34, 0.18, 0.08), [mats["paper"], mats["mint"], mats["amber"], mats["aqua"]][(column + int(row * 10)) % 4], bevel=0.003)
    for x, material in [(-6.3, mats["stone_shadow"]), (6.3, mats["wood"])]:
        cube("TodoPlanningStudio_RoutePlanningHallSideWing", group, (x, 3.28, -6.9), (1.18, 4.96, 1.18), material, bevel=0.034)
        cube("TodoPlanningStudio_RoutePlanningHallSideWindow", group, (x, 3.22, -7.54), (0.72, 2.86, 0.08), mats["glass"], bevel=0.008)
        cube("TodoPlanningStudio_RoutePlanningHallSideGlow", group, (x, 4.64, -7.63), (0.58, 0.08, 0.06), mats["screen"], bevel=0.004)
    cube("TodoPlanningStudio_RoutePlanningHallHeaderBridge", group, (0.0, 5.78, -6.94), (12.85, 0.42, 1.12), mats["dark"], bevel=0.026)
    cube("TodoPlanningStudio_RoutePlanningHallGlassFacade", group, (0.0, 3.32, -7.58), (10.25, 3.24, 0.08), mats["glass"], bevel=0.012)
    cube("TodoPlanningStudio_RoutePlanningHallBaseArcade", group, (0.0, 1.2, -6.96), (12.45, 0.34, 1.18), mats["stone"], bevel=0.028)
    for x in [-4.1, -2.05, 0.0, 2.05, 4.1]:
        cube("TodoPlanningStudio_RouteWorkflowMullion", group, (x, 3.32, -7.66), (0.08, 3.08, 0.07), mats["screen"], bevel=0.003)
    cube("TodoPlanningStudio_RoutePlanningEntranceCanopy", group, (0.0, 2.08, -7.7), (4.85, 0.28, 0.86), mats["wood"], bevel=0.018)
    cube("TodoPlanningStudio_RoutePlanningEntranceGlow", group, (0.0, 2.24, -8.16), (3.86, 0.08, 0.06), mats["mint"], bevel=0.004)
    cube("TodoPlanningStudio_RouteWorkflowLightRun", group, (0.0, 5.48, -7.68), (8.9, 0.08, 0.06), mats["screen"], bevel=0.004)


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


def create_circuit_time_trial_gate(mats):
    group = root("EnvPolishCircuitTimeTrialGate")
    cube("CircuitTimeTrial_ApproachApron", group, (0, 0.08, 1.2), (13.8, 0.16, 8.6), mats["stone_shadow"], bevel=0.05)
    cube("CircuitTimeTrial_DriveLane", group, (0, 0.19, 1.1), (8.8, 0.1, 8.05), mats["rubber"], bevel=0.025)
    cube("CircuitTimeTrial_StartStripe", group, (0, 0.27, 3.04), (8.2, 0.045, 0.26), mats["paper"], bevel=0.004)
    cube("CircuitTimeTrial_FinishAmberStripe", group, (0, 0.29, 2.66), (8.2, 0.045, 0.12), mats["amber"], bevel=0.004)
    for index, x in enumerate([-3.3, -2.2, -1.1, 0, 1.1, 2.2, 3.3]):
        cube(f"CircuitTimeTrial_CheckerTile_{index}", group, (x, 0.33, 3.32), (0.58, 0.05, 0.34), mats["paper" if index % 2 else "rubber"], bevel=0.003)
    for index, z in enumerate([-1.55, 0.55, 2.65]):
        cube(f"CircuitTimeTrial_LaneGuide_{index}", group, (0, 0.31, z), (0.18, 0.045, 0.92), mats["paper"], bevel=0.003)
    for x in [-4.75, 4.75]:
        cube("CircuitTimeTrial_LowCurb", group, (x, 0.34, 0.92), (0.22, 0.2, 6.85), mats["paper"], bevel=0.012)
        cube("CircuitTimeTrial_CurbGlow", group, (x, 0.54, 0.92), (0.08, 0.08, 6.1), mats["amber" if x < 0 else "mint"], bevel=0.004)
        cube("CircuitTimeTrial_GantryFoot", group, (x, 0.36, 2.8), (0.95, 0.5, 0.95), mats["stone"], bevel=0.038)
        cube("CircuitTimeTrial_GantryPost", group, (x, 2.22, 2.8), (0.38, 3.55, 0.38), mats["dark"], bevel=0.022)
        cube("CircuitTimeTrial_GantryPostGlow", group, (x, 2.22, 2.47), (0.09, 2.72, 0.055), mats["mint" if x > 0 else "amber"], bevel=0.004)
    cube("CircuitTimeTrial_GantryHeader", group, (0, 3.96, 2.8), (10.6, 0.5, 0.58), mats["dark"], bevel=0.03)
    cube("CircuitTimeTrial_GantryTimingScreen", group, (0, 3.72, 2.44), (4.5, 0.7, 0.08), mats["screen"], bevel=0.008)
    for index, x in enumerate([-4.0, -3.2, -2.4, 2.4, 3.2, 4.0]):
        cube(f"CircuitTimeTrial_HeaderChecker_{index}", group, (x, 3.68, 2.36), (0.48, 0.36, 0.06), mats["paper" if index % 2 else "rubber"], bevel=0.003)
    for index, x in enumerate([-1.05, 0, 1.05]):
        cube(f"CircuitTimeTrial_StartLight_{index}", group, (x, 3.18, 2.36), (0.46, 0.28, 0.06), [mats["pink"], mats["amber"], mats["mint"]][index], bevel=0.01)
    cube("CircuitTimeTrial_ControlBoothShell", group, (-5.55, 1.48, -0.58), (3.1, 2.72, 3.35), mats["stone"], bevel=0.045)
    cube("CircuitTimeTrial_ControlBoothRearWall", group, (-5.55, 1.54, -2.34), (3.05, 2.42, 0.18), mats["stone_shadow"], bevel=0.025)
    cube("CircuitTimeTrial_ControlBoothSideWall", group, (-7.12, 1.48, -0.58), (0.18, 2.4, 3.2), mats["stone_shadow"], bevel=0.02)
    cube("CircuitTimeTrial_ControlBoothRoadWindow", group, (-3.96, 1.72, 0.18), (0.1, 1.26, 1.72), mats["glass"], bevel=0.01)
    cube("CircuitTimeTrial_ControlBoothFrontWindow", group, (-5.55, 1.78, 1.14), (2.1, 1.22, 0.09), mats["glass"], bevel=0.01)
    cube("CircuitTimeTrial_ControlBoothRoof", group, (-5.55, 3.0, -0.58), (3.62, 0.32, 3.82), mats["wood"], bevel=0.028)
    cube("CircuitTimeTrial_ControlBoothRoofGlow", group, (-5.55, 2.78, 1.34), (2.68, 0.08, 0.06), mats["amber"], bevel=0.004)
    cube("CircuitTimeTrial_TimingTower", group, (-5.55, 4.58, -0.72), (1.48, 3.0, 1.42), mats["dark"], bevel=0.03)
    cube("CircuitTimeTrial_TimingTowerGlass", group, (-5.55, 4.72, 0.03), (1.02, 1.68, 0.08), mats["screen"], bevel=0.008)
    cube("CircuitTimeTrial_TimingTowerCap", group, (-5.55, 6.24, -0.72), (2.08, 0.32, 1.88), mats["amber"], bevel=0.02)
    cube("CircuitTimeTrial_LapBoard", group, (5.38, 1.88, -1.2), (1.65, 2.55, 0.32), mats["dark"], bevel=0.026)
    cube("CircuitTimeTrial_LapBoardScreen", group, (5.38, 2.0, -1.39), (1.1, 1.4, 0.06), mats["screen"], bevel=0.006)
    for index, y in enumerate([1.42, 1.84, 2.26]):
        cube(f"CircuitTimeTrial_LapBoardLine_{index}", group, (5.38, y, -1.45), (0.8 - index * 0.1, 0.07, 0.045), [mats["mint"], mats["amber"], mats["paper"]][index], bevel=0.003)
    cube("CircuitTimeTrial_CountdownTreeMast", group, (5.34, 2.02, 1.52), (0.22, 3.35, 0.18), mats["dark"], bevel=0.012)
    for index, y in enumerate([1.25, 1.86, 2.47]):
        cube(f"CircuitTimeTrial_CountdownLamp_{index}", group, (5.34, y, 1.38), (0.55, 0.32, 0.06), [mats["pink"], mats["amber"], mats["mint"]][index], bevel=0.01)
    cylinder("CircuitTimeTrial_LapClockDisk", group, (-5.55, 4.72, 0.11), 0.5, 0.06, mats["amber"], vertices=20, bevel=0.006)
    cube("CircuitTimeTrial_LapClockHandVertical", group, (-5.55, 4.72, 0.06), (0.055, 0.72, 0.04), mats["dark"], bevel=0.002)
    cube("CircuitTimeTrial_LapClockHandHorizontal", group, (-5.55, 4.72, 0.05), (0.62, 0.055, 0.04), mats["dark"], bevel=0.002)
    for index, x in enumerate([-2.2, 0, 2.2]):
        cube(f"CircuitTimeTrial_GridBox_{index}", group, (x, 0.32, -2.05), (1.2, 0.055, 0.36), mats["paper"], bevel=0.004)
    cube("CircuitTimeTrial_RouteArrowShaft", group, (0, 0.34, -2.9), (0.22, 0.06, 1.26), mats["mint"], bevel=0.004)
    cube("CircuitTimeTrial_RouteArrowHead", group, (0, 0.36, -3.62), (1.0, 0.06, 0.36), mats["mint"], rot=(0, 0.76, 0), bevel=0.004)

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


def create_potato_farm_stand(mats):
    group = root("EnvPolishPotatoFarmStand")
    cube("PotatoFarmStand_Court", group, (0, 0.08, 0), (21.2, 0.16, 12.4), mats["stone"], bevel=0.055)
    cube("PotatoFarmStand_SoilPocket", group, (4.95, 0.18, 0.58), (9.1, 0.08, 7.7), mats["rope"], bevel=0.025)
    for index, x in enumerate([1.8, 3.35, 4.9, 6.45, 8.0]):
        cube(f"PotatoFarmStand_CropRow_{index}", group, (x, 0.34, 0.58), (0.82, 0.2, 6.95), mats["crop"], bevel=0.018)
        cube(f"PotatoFarmStand_RowSoil_{index}", group, (x, 0.24, 0.58), (1.08, 0.08, 7.18), mats["wood"], bevel=0.012)
    cube("PotatoFarmStand_CropCourtFrontFrame", group, (4.95, 0.66, -3.34), (9.45, 0.22, 0.2), mats["wood"], bevel=0.014)
    cube("PotatoFarmStand_CropCourtBackFrame", group, (4.95, 0.66, 4.5), (9.45, 0.22, 0.2), mats["wood"], bevel=0.014)
    for index, x in enumerate([1.05, 2.95, 4.85, 6.75, 8.65]):
        cube(f"PotatoFarmStand_CropCourtHoop_{index}", group, (x, 1.22, 0.58), (0.14, 1.72, 7.35), mats["foam"], bevel=0.006)
    cube("PotatoFarmStand_GreenhouseBody", group, (-4.7, 1.54, 0.82), (7.9, 2.82, 5.65), mats["glass"], bevel=0.045)
    cube("PotatoFarmStand_GreenhouseRearWall", group, (-4.7, 1.48, 3.72), (8.08, 2.48, 0.24), mats["stone_shadow"], bevel=0.025)
    cube("PotatoFarmStand_GreenhouseRouteBase", group, (-4.7, 0.72, -2.14), (8.0, 0.34, 0.18), mats["wood"], bevel=0.014)
    cube("PotatoFarmStand_GreenhouseRoofRidge", group, (-4.7, 3.14, 0.82), (8.25, 0.34, 0.5), mats["wood"], bevel=0.03)
    cube("PotatoFarmStand_GreenhouseRoofPanel_Left", group, (-4.7, 3.08, -0.6), (8.1, 0.16, 3.0), mats["glass"], rot=(0.18, 0, 0), bevel=0.012)
    cube("PotatoFarmStand_GreenhouseRoofPanel_Right", group, (-4.7, 3.08, 2.12), (8.1, 0.16, 3.0), mats["glass"], rot=(-0.18, 0, 0), bevel=0.012)
    cube("PotatoFarmStand_GreenhouseUpperAtrium", group, (-4.7, 3.72, 0.82), (6.9, 1.38, 4.1), mats["foam"], bevel=0.036)
    cube("PotatoFarmStand_GreenhouseUpperRidge", group, (-4.7, 4.54, 0.82), (7.2, 0.26, 0.42), mats["wood"], bevel=0.024)
    cube("PotatoFarmStand_GreenhouseVentLine", group, (-4.7, 4.72, -1.08), (6.4, 0.08, 0.07), mats["mint"], bevel=0.004)
    for index, x in enumerate([-7.1, -5.6, -4.1, -2.6, -1.1]):
        cube(f"PotatoFarmStand_GreenhouseRib_{index}", group, (x - 0.3, 2.92, 0.82), (0.12, 0.72, 5.75), mats["foam"], bevel=0.008)
        cube(f"PotatoFarmStand_UpperGreenhouseRib_{index}", group, (x - 0.3, 4.0, 0.82), (0.1, 0.98, 4.15), mats["foam"], bevel=0.006)
    cube("PotatoFarmStand_ProduceCounter", group, (-4.35, 0.8, -3.68), (6.9, 0.86, 1.22), mats["wood"], bevel=0.04)
    cube("PotatoFarmStand_CounterCanopy", group, (-4.35, 1.66, -3.86), (7.55, 0.26, 1.58), mats["stone_shadow"], bevel=0.03)
    cube("PotatoFarmStand_MarketHallBody", group, (-1.1, 2.56, -2.72), (4.85, 2.72, 2.02), mats["wood"], bevel=0.04)
    cube("PotatoFarmStand_MarketHallRoof", group, (-1.1, 4.08, -2.72), (5.34, 0.28, 2.48), mats["stone_shadow"], bevel=0.03)
    cube("PotatoFarmStand_MarketHallGlow", group, (-1.1, 3.56, -3.86), (3.4, 0.08, 0.06), mats["amber"], bevel=0.004)
    for index, x in enumerate([-6.3, -4.85, -3.4, -1.95]):
        cube(f"PotatoFarmStand_ProduceBin_{index}", group, (x, 1.18, -4.28), (0.92, 0.46, 0.6), [mats["crop"], mats["amber"], mats["paper"], mats["crop"]][index], bevel=0.025)
    cube("PotatoFarmStand_IrrigationTank", group, (8.55, 1.18, -2.78), (1.46, 1.72, 1.24), mats["aqua"], bevel=0.08)
    cube("PotatoFarmStand_IrrigationPump", group, (8.55, 0.44, -1.72), (1.76, 0.58, 0.92), mats["stone_shadow"], bevel=0.035)
    cube("PotatoFarmStand_IrrigationBoom", group, (5.25, 1.92, -2.22), (7.5, 0.13, 0.13), mats["rope"], bevel=0.012)
    for index, x in enumerate([-9.2, -6.1, -3.0, 0.1, 3.2, 6.3, 9.4]):
        cube(f"PotatoFarmStand_FencePost_{index}", group, (x, 0.68, 5.55), (0.16, 1.08, 0.16), mats["dark"], bevel=0.014)
    cube("PotatoFarmStand_BackFenceRail", group, (0.1, 0.88, 5.55), (18.8, 0.12, 0.12), mats["wood"], bevel=0.012)
    cube("PotatoFarmStand_EntryStep_A", group, (-4.2, 0.18, -5.12), (6.2, 0.12, 0.42), mats["paper"], bevel=0.018)
    cube("PotatoFarmStand_EntryStep_B", group, (-4.2, 0.26, -5.58), (5.2, 0.12, 0.38), mats["paper"], bevel=0.018)
    for index, x in enumerate([6.75, 7.9, 9.05]):
        cube(f"PotatoFarmStand_StorageCrate_{index}", group, (x, 0.58, 3.92), (0.9, 0.72, 0.86), [mats["wood"], mats["stone_shadow"], mats["wood"]][index], bevel=0.028)
    cube("PotatoFarmStand_FieldOffice", group, (-7.05, 2.4, -1.08), (2.1, 3.25, 2.0), mats["wood"], bevel=0.035)
    cube("PotatoFarmStand_FieldOfficeRoof", group, (-7.05, 4.18, -1.08), (2.7, 0.32, 2.55), mats["stone_shadow"], bevel=0.03)
    cube("PotatoFarmStand_FieldOfficeUpper", group, (-7.05, 5.0, -1.08), (1.72, 1.36, 1.72), mats["stone_shadow"], bevel=0.028)
    cube("PotatoFarmStand_FieldOfficeBeacon", group, (-7.05, 5.84, -1.08), (0.72, 0.32, 0.72), mats["amber"], bevel=0.04)
    cube("PotatoFarmStand_WaterTowerBase", group, (8.75, 2.42, 2.95), (1.58, 3.92, 1.34), mats["stone_shadow"], bevel=0.035)
    cube("PotatoFarmStand_WaterTowerTank", group, (8.75, 4.7, 2.95), (2.35, 1.24, 1.92), mats["aqua"], bevel=0.08)
    cube("PotatoFarmStand_WaterTowerCap", group, (8.75, 5.5, 2.95), (2.62, 0.26, 2.12), mats["wood"], bevel=0.02)
    cube("PotatoFarmStand_WindGaugeMast", group, (0.1, 3.25, 4.1), (0.16, 4.9, 0.16), mats["dark"], bevel=0.008)
    cube("PotatoFarmStand_WindGaugeArm", group, (0.1, 5.35, 4.1), (2.3, 0.1, 0.1), mats["rope"], bevel=0.006)
    for index, x in enumerate([-0.9, 1.1]):
        cube(f"PotatoFarmStand_WindGaugeBlade_{index}", group, (x, 5.35, 4.1), (0.82, 0.08, 0.32), mats["foam"], rot=(0, 0, 0.32 if index == 0 else -0.32), bevel=0.006)
    for index, y in enumerate([1.62, 2.22, 2.82]):
        cube(f"PotatoFarmStand_FieldOfficeWindow_{index}", group, (-7.92, y, -1.84), (0.08, 0.42, 0.58), [mats["screen"], mats["paper"], mats["mint"]][index], bevel=0.004)
    cube("PotatoFarmStand_RoutePortalHeader", group, (-4.35, 4.32, -4.72), (8.95, 0.42, 0.34), mats["wood"], bevel=0.032)
    cube("PotatoFarmStand_RoutePortalSill", group, (-4.35, 1.08, -4.72), (8.95, 0.36, 0.34), mats["wood"], bevel=0.03)
    cube("PotatoFarmStand_RoutePortalLeftPost", group, (-8.98, 2.62, -4.72), (0.42, 3.42, 0.34), mats["wood"], bevel=0.03)
    cube("PotatoFarmStand_RoutePortalRightPost", group, (0.28, 2.62, -4.72), (0.42, 3.42, 0.34), mats["wood"], bevel=0.03)
    cube("PotatoFarmStand_RoutePortalGlass", group, (-4.35, 2.64, -4.94), (7.35, 2.38, 0.08), mats["glass"], bevel=0.012)
    for index, x in enumerate([-7.25, -5.35, -3.35, -1.45]):
        cube(f"PotatoFarmStand_RoutePortalGreenhouseRib_{index}", group, (x, 2.7, -5.02), (0.12, 2.72, 0.1), mats["foam"], bevel=0.006)
    cube("PotatoFarmStand_RoutePortalGlassTopRail", group, (-4.35, 3.58, -5.04), (7.35, 0.1, 0.08), mats["foam"], bevel=0.004)
    cube("PotatoFarmStand_RoutePortalGlassLowerRail", group, (-4.35, 2.36, -5.04), (7.35, 0.08, 0.08), mats["foam"], bevel=0.004)
    cube("PotatoFarmStand_RouteProduceShelf", group, (-4.35, 1.32, -5.16), (7.65, 0.18, 0.52), mats["wood"], bevel=0.018)
    cube("PotatoFarmStand_RouteProduceBins", group, (-4.35, 1.56, -5.28), (6.8, 0.34, 0.42), mats["crop"], bevel=0.02)
    cube("PotatoFarmStand_RouteHarvestGateHeader", group, (2.55, 3.72, -5.82), (7.8, 0.34, 0.3), mats["wood"], bevel=0.024)
    cube("PotatoFarmStand_RouteHarvestGateLeft", group, (-1.5, 2.16, -5.82), (0.32, 3.05, 0.28), mats["wood"], bevel=0.02)
    cube("PotatoFarmStand_RouteHarvestGateRight", group, (6.6, 2.16, -5.82), (0.32, 3.05, 0.28), mats["wood"], bevel=0.02)
    cube("PotatoFarmStand_RouteHarvestGateGlow", group, (2.55, 3.46, -6.02), (6.6, 0.08, 0.06), mats["amber"], bevel=0.004)
    for index, x in enumerate([0.05, 1.25, 2.45, 3.65, 4.85, 6.05]):
        cube(f"PotatoFarmStand_RouteCropLaneSoil_{index}", group, (x, 0.36, -5.72), (0.68, 0.1, 1.0), mats["wood"], bevel=0.01)
        cube(f"PotatoFarmStand_RouteCropLaneLeaf_{index}", group, (x, 0.5, -5.72), (0.48, 0.18, 0.82), mats["crop"], bevel=0.012)
    cube("PotatoFarmStand_RouteProduceCartBed", group, (7.65, 0.72, -5.18), (2.24, 0.56, 1.08), mats["wood"], bevel=0.026)
    cube("PotatoFarmStand_RouteProduceCartHandle", group, (6.2, 0.92, -5.18), (0.12, 0.18, 1.32), mats["dark"], bevel=0.006)
    for index, x in enumerate([7.0, 7.62, 8.24]):
        cube(f"PotatoFarmStand_RoutePotatoCrate_{index}", group, (x, 1.14, -5.22), (0.52, 0.34, 0.48), [mats["amber"], mats["paper"], mats["amber"]][index], bevel=0.02)
    cube("PotatoFarmStand_RoutePotatoCrestBody", group, (-8.4, 3.2, -5.78), (1.14, 0.82, 0.36), mats["amber"], rot=(0.08, 0, -0.12), bevel=0.05)
    cube("PotatoFarmStand_RoutePotatoCrestEyeA", group, (-8.78, 3.24, -5.98), (0.12, 0.08, 0.05), mats["dark"], bevel=0.004)
    cube("PotatoFarmStand_RoutePotatoCrestEyeB", group, (-8.32, 3.1, -5.98), (0.1, 0.08, 0.05), mats["dark"], bevel=0.004)
    cube("PotatoFarmStand_RoutePotatoCrestStem", group, (-8.18, 3.8, -5.78), (0.1, 0.46, 0.1), mats["crop"], rot=(0, 0, -0.25), bevel=0.004)
    cube("PotatoFarmStand_RoutePotatoCrestLeaf", group, (-7.98, 4.06, -5.78), (0.42, 0.12, 0.24), mats["crop"], rot=(0, 0, 0.22), bevel=0.004)
    cube("PotatoFarmStand_RoutePortalCanopy", group, (-4.35, 4.74, -4.64), (9.72, 0.34, 1.04), mats["stone_shadow"], bevel=0.028)
    cube("PotatoFarmStand_GreenhouseMarketHall", group, (-4.5, 4.95, -1.92), (8.9, 2.12, 3.65), mats["glass"], bevel=0.04)
    cube("PotatoFarmStand_GreenhouseMarketRoofLeft", group, (-4.5, 6.18, -2.74), (9.18, 0.18, 1.98), mats["wood"], rot=(0.16, 0, 0), bevel=0.012)
    cube("PotatoFarmStand_GreenhouseMarketRoofRight", group, (-4.5, 6.18, -1.1), (9.18, 0.18, 1.98), mats["wood"], rot=(-0.16, 0, 0), bevel=0.012)
    cube("PotatoFarmStand_HarvestAtrium", group, (-1.0, 5.52, 0.98), (4.8, 2.24, 2.84), mats["glass"], bevel=0.032)
    cube("PotatoFarmStand_HarvestAtriumCap", group, (-1.0, 6.86, 0.98), (5.45, 0.32, 3.24), mats["wood"], bevel=0.024)
    cube("PotatoFarmStand_FieldCanopyFrame", group, (5.0, 2.72, 0.58), (10.1, 3.65, 8.28), mats["foam"], bevel=0.018)
    cube("PotatoFarmStand_FieldCanopyRidge", group, (5.0, 4.66, 0.58), (10.45, 0.22, 0.32), mats["wood"], bevel=0.014)
    for index, x in enumerate([1.0, 3.0, 5.0, 7.0, 9.0]):
        cube(f"PotatoFarmStand_FieldCanopyRib_{index}", group, (x, 2.86, 0.58), (0.12, 3.35, 8.05), mats["foam"], bevel=0.006)
    cube("PotatoFarmStand_SeedArchiveTower", group, (-8.75, 4.4, -3.22), (1.66, 5.78, 1.5), mats["stone_shadow"], bevel=0.038)
    cube("PotatoFarmStand_SeedArchiveCrown", group, (-8.75, 7.48, -3.22), (2.12, 0.36, 1.92), mats["wood"], bevel=0.024)
    for index, y in enumerate([2.2, 2.86, 3.52, 4.18, 4.84, 5.5]):
        cube(f"PotatoFarmStand_SeedArchivePacket_{index}", group, (-7.86, y, -3.68), (0.08, 0.28, 0.62), [mats["paper"], mats["crop"], mats["amber"], mats["mint"], mats["foam"], mats["paper"]][index], bevel=0.004)
    cube("PotatoFarmStand_HarvestBeaconMast", group, (8.75, 6.34, 2.95), (0.2, 2.78, 0.2), mats["dark"], bevel=0.008)
    cube("PotatoFarmStand_HarvestBeacon", group, (8.75, 7.94, 2.95), (0.72, 0.54, 0.72), mats["amber"], bevel=0.018)
    cube("PotatoFarmStand_RouteSideHarvestCanopyFrame", group, (4.95, 3.42, 6.02), (10.4, 4.35, 0.3), mats["foam"], bevel=0.018)
    cube("PotatoFarmStand_RouteSideHarvestCanopyRidge", group, (4.95, 5.76, 6.0), (10.7, 0.24, 0.42), mats["wood"], bevel=0.014)
    cube("PotatoFarmStand_RouteSideHarvestCanopyGlow", group, (4.95, 5.52, 5.78), (8.8, 0.08, 0.07), mats["mint"], bevel=0.004)
    for index, x in enumerate([1.1, 3.0, 4.9, 6.8, 8.7]):
        cube(f"PotatoFarmStand_RouteSideHarvestRib_{index}", group, (x, 3.38, 5.82), (0.12, 4.05, 0.1), mats["foam"], bevel=0.006)
    cube("PotatoFarmStand_RouteSideProduceArcadeDeck", group, (-4.45, 1.02, 5.96), (7.6, 0.44, 0.86), mats["wood"], bevel=0.025)
    cube("PotatoFarmStand_RouteSideProduceArcadeBack", group, (-4.45, 2.42, 6.18), (7.9, 2.1, 0.22), mats["stone_shadow"], bevel=0.03)
    cube("PotatoFarmStand_RouteSideProduceArcadeGlass", group, (-4.45, 2.54, 5.98), (6.5, 1.1, 0.08), mats["glass"], bevel=0.008)
    cube("PotatoFarmStand_RouteSideProduceArcadeCanopy", group, (-4.45, 3.68, 5.8), (8.2, 0.3, 1.02), mats["wood"], bevel=0.025)
    for index, x in enumerate([-7.0, -5.3, -3.6, -1.9]):
        cube(f"PotatoFarmStand_RouteSideProduceBin_{index}", group, (x, 1.28, 5.48), (0.82, 0.36, 0.42), [mats["crop"], mats["amber"], mats["paper"], mats["crop"]][index], bevel=0.018)
    cube("PotatoFarmStand_RouteSideIrrigationTowerBase", group, (8.85, 1.72, 6.02), (1.32, 2.78, 0.92), mats["stone_shadow"], bevel=0.03)
    cube("PotatoFarmStand_RouteSideIrrigationTank", group, (8.85, 3.58, 6.02), (1.84, 1.02, 1.18), mats["aqua"], bevel=0.065)
    cube("PotatoFarmStand_RouteSideIrrigationSpout", group, (7.3, 3.34, 5.86), (2.86, 0.12, 0.12), mats["rope"], bevel=0.01)
    for index, x in enumerate([1.45, 3.55, 5.65, 7.75]):
        cube(f"PotatoFarmStand_RouteSideCropRibbonSoil_{index}", group, (x, 0.48, 5.34), (1.36, 0.1, 0.44), mats["wood"], bevel=0.008)
        cube(f"PotatoFarmStand_RouteSideCropRibbonLeaf_{index}", group, (x, 0.64, 5.28), (1.1, 0.18, 0.34), mats["crop"], bevel=0.01)


def create_sentinel_soc_tower(mats):
    group = root("EnvPolishSentinelSocTower")
    cube("SentinelSoc_SitePlinth", group, (0, 0.08, 0), (15.2, 0.16, 9.6), mats["dark"], bevel=0.055)
    cube("SentinelSoc_RoadScanApron", group, (0, 0.22, -5.45), (10.4, 0.18, 2.25), mats["stone"], bevel=0.045)
    cube("SentinelSoc_OperationsHall", group, (-0.65, 2.65, -0.15), (10.7, 5.1, 5.9), mats["stone_shadow"], bevel=0.07)
    cube("SentinelSoc_IncidentResponseHall", group, (2.95, 1.95, 2.78), (6.6, 3.45, 2.45), mats["stone_shadow"], bevel=0.048)
    cube("SentinelSoc_SolidCommandWing", group, (4.65, 2.35, -0.72), (3.65, 4.15, 4.4), mats["stone_shadow"], bevel=0.048)
    cube("SentinelSoc_RearServiceWall", group, (-1.0, 2.0, 4.08), (9.6, 3.45, 0.38), mats["stone_shadow"], bevel=0.032)
    cube("SentinelSoc_LeftFinishedEnvelope", group, (-6.12, 2.34, -0.1), (0.42, 4.25, 5.85), mats["stone_shadow"], bevel=0.032)
    cube("SentinelSoc_RightFinishedEnvelope", group, (6.18, 2.24, -0.08), (0.42, 3.95, 5.72), mats["stone_shadow"], bevel=0.032)
    cube("SentinelSoc_RearOperationsEnvelope", group, (-0.42, 2.52, 4.72), (10.85, 3.95, 0.62), mats["stone_shadow"], bevel=0.036)
    cube("SentinelSoc_RearServiceEntry", group, (-4.25, 1.45, 5.06), (1.18, 2.1, 0.14), mats["dark"], bevel=0.014)
    cube("SentinelSoc_RearIncidentEntry", group, (4.05, 1.45, 5.06), (1.18, 2.1, 0.14), mats["dark"], bevel=0.014)
    cube("SentinelSoc_RearCommandBand", group, (-0.1, 3.12, 5.12), (6.8, 1.08, 0.08), mats["glass"], bevel=0.006)
    cube("SentinelSoc_LeftThreatReviewWindow", group, (-6.37, 2.62, -1.72), (0.08, 1.72, 2.2), mats["glass"], bevel=0.006)
    cube("SentinelSoc_LeftServerWindow", group, (-6.37, 2.25, 1.85), (0.08, 1.18, 2.45), mats["glass"], bevel=0.006)
    cube("SentinelSoc_RightCommandWindow", group, (6.43, 2.62, -1.62), (0.08, 1.74, 2.08), mats["glass"], bevel=0.006)
    cube("SentinelSoc_RightIncidentWindow", group, (6.43, 2.15, 1.82), (0.08, 1.12, 2.35), mats["glass"], bevel=0.006)
    cube("SentinelSoc_SideEnvelopeCrownLeft", group, (-6.12, 4.62, -0.1), (0.58, 0.34, 6.18), mats["dark"], bevel=0.02)
    cube("SentinelSoc_SideEnvelopeCrownRight", group, (6.18, 4.42, -0.08), (0.58, 0.34, 6.0), mats["dark"], bevel=0.02)
    cube("SentinelSoc_RearEnvelopeCrown", group, (-0.42, 4.78, 4.72), (11.3, 0.36, 0.74), mats["dark"], bevel=0.022)
    cube("SentinelSoc_CommandCampusRoof", group, (-0.35, 5.42, -0.15), (11.4, 0.42, 6.45), mats["dark"], bevel=0.034)
    cube("SentinelSoc_IncidentRoof", group, (2.95, 3.86, 2.78), (7.25, 0.34, 2.9), mats["dark"], bevel=0.026)

    cube("SentinelSoc_RoutePublicSocGatewayHall", group, (0, 2.32, -3.42), (9.6, 4.05, 1.38), mats["stone_shadow"], bevel=0.036)
    cube("SentinelSoc_RoutePublicSocGatewayFrame", group, (0, 2.78, -4.18), (10.35, 4.65, 0.32), mats["dark"], bevel=0.026)
    cube("SentinelSoc_RouteShieldControlEntry", group, (0, 2.7, -4.4), (7.25, 2.95, 0.08), mats["glass"], bevel=0.008)
    cube("SentinelSoc_RouteShieldControlHeader", group, (0, 4.32, -4.5), (7.95, 0.2, 0.08), mats["mint"], bevel=0.004)
    cube("SentinelSoc_ShieldGateFrame", group, (0, 2.82, -4.56), (8.35, 4.08, 0.22), mats["dark"], bevel=0.024)
    cube("SentinelSoc_ShieldGateGlass", group, (0, 2.58, -4.72), (6.55, 2.78, 0.08), mats["glass"], bevel=0.008)
    cube("SentinelSoc_ScanThreshold", group, (0, 0.36, -5.82), (7.2, 0.08, 0.64), mats["pink"], bevel=0.004)
    cube("SentinelSoc_ScanPortalLeftBase", group, (-4.75, 0.86, -4.88), (0.55, 1.5, 0.62), mats["dark"], bevel=0.018)
    cube("SentinelSoc_ScanPortalRightBase", group, (4.75, 0.86, -4.88), (0.55, 1.5, 0.62), mats["dark"], bevel=0.018)
    cube("SentinelSoc_ScanPortalBeam", group, (0, 4.72, -4.88), (10.35, 0.28, 0.34), mats["dark"], bevel=0.018)
    cube("SentinelSoc_ScanPortalBeamGlow", group, (0, 4.92, -5.1), (8.2, 0.08, 0.06), mats["pink"], bevel=0.004)
    cube("SentinelSoc_RouteShieldCrestTop", group, (0, 3.54, -4.82), (2.0, 0.16, 0.06), mats["mint"], bevel=0.004)
    cube("SentinelSoc_RouteShieldCrestLeft", group, (-0.72, 2.75, -4.85), (0.16, 1.45, 0.06), mats["mint"], rot=(0, 0, -0.25), bevel=0.004)
    cube("SentinelSoc_RouteShieldCrestRight", group, (0.72, 2.75, -4.85), (0.16, 1.45, 0.06), mats["mint"], rot=(0, 0, 0.25), bevel=0.004)
    cube("SentinelSoc_RouteShieldCore", group, (0, 2.62, -4.88), (0.82, 0.7, 0.05), mats["screen"], bevel=0.003)

    cube("SentinelSoc_OverwatchTowerPrimary", group, (-5.05, 6.45, -0.15), (2.9, 12.4, 2.7), mats["stone_shadow"], bevel=0.045)
    cube("SentinelSoc_OverwatchTowerGlassFront", group, (-5.05, 6.12, -1.58), (1.85, 7.55, 0.08), mats["glass"], bevel=0.006)
    cube("SentinelSoc_OverwatchTowerSideGlass", group, (-6.52, 5.85, -0.1), (0.08, 6.65, 1.55), mats["glass"], bevel=0.006)
    cube("SentinelSoc_TowerBase", group, (-5.05, 2.22, 0.0), (3.45, 3.8, 3.25), mats["stone_shadow"], bevel=0.045)
    cube("SentinelSoc_TowerCrown", group, (-5.05, 12.72, -0.15), (3.75, 0.52, 3.35), mats["dark"], bevel=0.028)
    cube("SentinelSoc_OverwatchCrown", group, (-5.05, 10.42, -0.15), (3.2, 0.34, 3.0), mats["dark"], bevel=0.024)
    cube("SentinelSoc_OverwatchSpire", group, (-5.05, 15.24, -0.15), (0.26, 4.5, 0.26), mats["dark"], bevel=0.008)
    cube("SentinelSoc_ThreatIntelArray", group, (-5.05, 14.12, -0.15), (3.85, 0.16, 0.16), mats["pink"], bevel=0.006)
    cube("SentinelSoc_ThreatIntelUpperArray", group, (-5.05, 15.38, -0.15), (2.6, 0.12, 0.12), mats["screen"], bevel=0.004)
    cube("SentinelSoc_RouteThreatIntelCrownMast", group, (-5.05, 13.82, -0.15), (0.24, 3.4, 0.24), mats["dark"], bevel=0.008)
    cube("SentinelSoc_RouteThreatIntelCrownBar", group, (-5.05, 15.2, -0.15), (3.6, 0.16, 0.16), mats["pink"], bevel=0.006)
    cube("SentinelSoc_RouteThreatIntelCrownUpperBar", group, (-5.05, 16.12, -0.15), (2.45, 0.12, 0.12), mats["screen"], bevel=0.004)

    cube("SentinelSoc_RouteCommandFacade", group, (4.82, 2.85, -2.96), (3.5, 3.12, 0.18), mats["dark"], bevel=0.018)
    cube("SentinelSoc_RouteCommandGlass", group, (4.82, 2.88, -3.08), (2.6, 1.85, 0.08), mats["glass"], bevel=0.006)
    cube("SentinelSoc_RouteCommandHeader", group, (4.82, 4.0, -3.14), (2.85, 0.12, 0.06), mats["screen"], bevel=0.003)
    cube("SentinelSoc_RouteCommandDeck", group, (4.82, 1.22, -3.14), (2.92, 0.12, 0.06), mats["paper"], bevel=0.003)
    cube("SentinelSoc_CommandWindowBand", group, (4.82, 2.2, 1.56), (0.08, 2.05, 2.9), mats["glass"], bevel=0.006)
    cube("SentinelSoc_RouteCommandWindowMassLeft", group, (5.42, 2.62, -1.62), (0.1, 1.75, 0.88), mats["screen"], bevel=0.004)
    cube("SentinelSoc_RouteCommandWindowMassRight", group, (5.42, 2.62, 1.32), (0.1, 1.75, 0.88), mats["screen"], bevel=0.004)
    cube("SentinelSoc_RouteThreatBoard", group, (2.0, 2.75, -3.24), (1.48, 1.55, 0.08), mats["pink"], bevel=0.006)
    for index, y in enumerate([2.25, 2.62, 2.99]):
        cube(f"SentinelSoc_RouteThreatTrace_{index}", group, (2.0, y, -3.31), (0.92 - index * 0.12, 0.06, 0.05), [mats["screen"], mats["mint"], mats["aqua"]][index], bevel=0.002)
    for index, x in enumerate([-3.05, -1.52, 0, 1.52, 3.05]):
        cube(f"SentinelSoc_RouteInspectionLaneMark_{index}", group, (x, 0.36, -5.3), (0.82, 0.06, 0.12), [mats["mint"], mats["screen"], mats["aqua"], mats["screen"], mats["mint"]][index], bevel=0.003)
    for index, x in enumerate([-2.5, -1.25, 0, 1.25, 2.5]):
        cube(f"SentinelSoc_RoutePacketQueueRail_{index}", group, (x, 0.72 + index * 0.04, -3.82), (0.08, 0.08, 0.54), [mats["mint"], mats["screen"], mats["aqua"], mats["pink"], mats["mint"]][index], bevel=0.003)
    for index, x in enumerate([-3.2, -1.6, 0, 1.6, 3.2]):
        cube(f"SentinelSoc_RouteStatusLane_{index}", group, (x, 4.78, -2.96), (0.72, 0.08, 0.06), [mats["screen"], mats["mint"], mats["pink"], mats["aqua"], mats["screen"]][index], bevel=0.003)

    cube("SentinelSoc_RouteWarRoomVolume", group, (-0.78, 3.18, -2.58), (5.45, 2.8, 0.82), mats["glass"], bevel=0.014)
    cube("SentinelSoc_RouteWarRoomFloor", group, (-0.78, 1.78, -2.58), (5.62, 0.22, 0.9), mats["stone_shadow"], bevel=0.012)
    cube("SentinelSoc_RouteWarRoomCommandDesk", group, (-0.78, 2.0, -3.05), (3.2, 0.42, 0.26), mats["dark"], bevel=0.01)
    cube("SentinelSoc_RouteDefenseCanopy", group, (0, 5.08, -3.52), (8.8, 0.24, 1.24), mats["screen"], bevel=0.01)
    cube("SentinelSoc_RouteDefenseCanopyGlow", group, (0, 5.24, -4.16), (7.4, 0.06, 0.06), mats["mint"], bevel=0.003)
    cube("SentinelSoc_RouteEntryPorticoDeck", group, (0, 0.68, -4.35), (8.8, 0.24, 1.25), mats["stone_shadow"], bevel=0.018)
    cube("SentinelSoc_RouteEntryPorticoLeftTower", group, (-4.95, 2.62, -4.18), (0.78, 4.2, 0.78), mats["stone_shadow"], bevel=0.024)
    cube("SentinelSoc_RouteEntryPorticoRightTower", group, (4.95, 2.62, -4.18), (0.78, 4.2, 0.78), mats["stone_shadow"], bevel=0.024)
    cube("SentinelSoc_RouteEntryPorticoRoof", group, (0, 4.92, -4.18), (10.4, 0.38, 1.05), mats["dark"], bevel=0.018)
    cube("SentinelSoc_RouteEntryPorticoScanBar", group, (0, 3.38, -4.72), (7.6, 0.12, 0.06), mats["mint"], bevel=0.004)
    cube("SentinelSoc_RouteEntryWarRoomGlass", group, (0, 2.72, -4.72), (6.2, 2.3, 0.08), mats["glass"], bevel=0.008)
    cube("SentinelSoc_RouteShieldThresholdLeftPier", group, (-4.9, 3.0, -4.6), (0.56, 5.35, 0.58), mats["stone_shadow"], bevel=0.026)
    cube("SentinelSoc_RouteShieldThresholdRightPier", group, (4.9, 3.0, -4.6), (0.56, 5.35, 0.58), mats["stone_shadow"], bevel=0.026)
    cube("SentinelSoc_RouteShieldThresholdBeam", group, (0, 5.78, -4.6), (10.35, 0.5, 0.58), mats["dark"], bevel=0.022)
    cube("SentinelSoc_RouteShieldThresholdScan", group, (0, 4.0, -4.9), (8.0, 0.1, 0.06), mats["mint"], bevel=0.004)
    cube("SentinelSoc_RouteOpsPortalLeftPylon", group, (-4.0, 2.85, -4.86), (0.34, 4.7, 0.4), mats["dark"], bevel=0.018)
    cube("SentinelSoc_RouteOpsPortalRightPylon", group, (4.0, 2.85, -4.86), (0.34, 4.7, 0.4), mats["dark"], bevel=0.018)
    cube("SentinelSoc_RouteOpsPortalOverhead", group, (0, 5.08, -4.86), (8.2, 0.34, 0.42), mats["dark"], bevel=0.018)
    cube("SentinelSoc_RouteOpsPortalThreshold", group, (0, 0.55, -4.86), (7.1, 0.18, 0.36), mats["paper"], bevel=0.01)

    cube("SentinelSoc_CommandTower", group, (4.55, 5.4, 0.8), (2.45, 6.25, 2.65), mats["stone_shadow"], bevel=0.03)
    cube("SentinelSoc_CommandTowerGlass", group, (4.55, 5.7, -0.62), (1.75, 3.55, 0.08), mats["glass"], bevel=0.006)
    cube("SentinelSoc_CommandCrownBar", group, (4.55, 8.68, 0.8), (2.95, 0.3, 2.9), mats["screen"], bevel=0.01)
    cube("SentinelSoc_RouteCommandBeaconMast", group, (4.55, 10.25, 0.8), (0.22, 3.1, 0.22), mats["dark"], bevel=0.008)
    cube("SentinelSoc_RouteCommandBeaconHead", group, (4.55, 11.95, 0.8), (0.66, 0.42, 0.66), mats["mint"], bevel=0.016)

    for index, x in enumerate([-2.85, -0.95, 0.95, 2.85]):
        cube(f"SentinelSoc_ServerRack_{index}", group, (x, 1.45, 4.34), (0.82, 1.72, 0.1), mats["stone_shadow"], bevel=0.012)
        cube(f"SentinelSoc_RackGlow_{index}", group, (x, 1.8, 4.43), (0.5, 0.07, 0.06), [mats["screen"], mats["mint"], mats["aqua"], mats["pink"]][index], bevel=0.002)
    cube("SentinelSoc_ThreatWallBase", group, (-1.0, 2.46, 4.36), (6.9, 2.32, 0.22), mats["dark"], bevel=0.018)
    cube("SentinelSoc_ThreatWallMap", group, (-1.0, 2.55, 4.5), (5.52, 1.35, 0.08), mats["pink"], bevel=0.004)
    cube("SentinelSoc_ThreatWallStatusRail", group, (-1.0, 3.34, 4.55), (6.1, 0.08, 0.06), mats["screen"], bevel=0.003)
    for index, x in enumerate([-2.55, -1.25, 0.05, 1.35]):
        cube(f"SentinelSoc_PacketShardPanel_{index}", group, (x, 2.05 + (index % 2) * 0.35, 4.62), (0.62, 0.08, 0.06), [mats["screen"], mats["mint"], mats["pink"], mats["aqua"]][index], bevel=0.003)
    for index, z in enumerate([-2.95, 2.85]):
        cube(f"SentinelSoc_RouteSocFrontageWing_{index}", group, (5.98, 2.28, z), (0.48, 3.45, 1.3), mats["stone_shadow"], bevel=0.025)
        cube(f"SentinelSoc_RouteSocFrontageGlass_{index}", group, (6.26, 2.38, z), (0.06, 2.02, 0.78), mats["glass"], bevel=0.004)
    for index, z in enumerate([-1.75, -0.55, 0.65]):
        cube(f"SentinelSoc_RouteIncidentReviewBay_{index}", group, (5.98, 1.36, z), (0.08, 0.38, 0.68), [mats["pink"], mats["aqua"], mats["mint"]][index], bevel=0.003)
    cube("SentinelSoc_BlueTeamBridge", group, (-0.4, 5.42, 2.72), (8.7, 0.2, 0.32), mats["screen"], bevel=0.008)
    cube("SentinelSoc_ScannerBridge", group, (-0.2, 5.44, -2.9), (8.3, 0.24, 0.34), mats["pink"], bevel=0.008)
    cube("SentinelSoc_ScannerBridgeLower", group, (-0.2, 5.05, -2.88), (7.1, 0.1, 0.22), mats["screen"], bevel=0.006)
    cube("SentinelSoc_CommandCatwalk", group, (-0.6, 5.85, 2.58), (8.95, 0.14, 0.24), mats["mint"], bevel=0.006)
    cube("SentinelSoc_OverwatchDeck", group, (-0.6, 5.82, 0.78), (8.8, 0.42, 4.65), mats["rubber"], bevel=0.024)
    cube("SentinelSoc_OverwatchRailFront", group, (-0.6, 6.14, -1.72), (8.65, 0.12, 0.1), mats["screen"], bevel=0.004)
    cube("SentinelSoc_OverwatchRailBack", group, (-0.6, 6.14, 3.0), (8.65, 0.12, 0.1), mats["mint"], bevel=0.004)


def create_harbor_signal(mats):
    group = root("EnvPolishHarborSignal")
    cube("HarborSignal_Base", group, (0, 0.18, 0), (2.0, 0.36, 1.6), mats["stone"], bevel=0.04)
    cube("HarborSignal_Tower", group, (0, 1.45, 0), (0.72, 2.5, 0.72), mats["stone_shadow"], bevel=0.035)
    cube("HarborSignal_Lantern", group, (0, 2.88, -0.08), (1.08, 0.62, 0.82), mats["glass"], bevel=0.035)
    cube("HarborSignal_Roof", group, (0, 3.32, 0), (1.42, 0.26, 1.12), mats["wood"], bevel=0.03)
    cube("HarborSignal_Beam", group, (0, 2.88, -0.58), (2.5, 0.08, 0.08), mats["mint"], bevel=0.006)


def create_signal_harbor_communications_station(mats):
    group = root("EnvPolishSignalHarborCommunicationsStation")
    cube("SignalHarbor_SolidSitePlinth", group, (0, 0.09, 0.6), (17.0, 0.18, 11.0), mats["stone"], bevel=0.055)
    cube("SignalHarbor_RoadThresholdApron", group, (0, 0.22, 6.78), (11.2, 0.18, 3.0), mats["paper"], bevel=0.04)
    cube("SignalHarbor_ApronCenterSeam", group, (0, 0.36, 6.78), (0.24, 0.08, 2.55), mats["stone_shadow"], bevel=0.006)
    for x in [-5.35, 5.35]:
        cube("SignalHarbor_ApronLowCurb", group, (x, 0.42, 6.78), (0.22, 0.28, 2.85), mats["stone_shadow"], bevel=0.012)

    cube("SignalHarbor_OperationsBlock", group, (0, 2.16, 0.05), (12.4, 4.1, 6.55), mats["stone_shadow"], bevel=0.065)
    cube("SignalHarbor_LeftServiceMass", group, (-4.95, 2.18, -0.05), (3.1, 4.0, 5.8), mats["wood"], bevel=0.052)
    cube("SignalHarbor_RightExchangeMass", group, (4.72, 2.08, 0.05), (3.35, 3.8, 5.95), mats["stone_shadow"], bevel=0.052)
    cube("SignalHarbor_RearRelayCore", group, (0, 4.18, -2.0), (9.1, 2.7, 2.25), mats["stone_shadow"], bevel=0.048)
    cube("SignalHarbor_RoofCap", group, (0, 4.36, 0.05), (13.25, 0.42, 7.25), mats["dark"], bevel=0.034)
    cube("SignalHarbor_RearRoofCap", group, (0, 5.66, -2.0), (9.8, 0.34, 2.72), mats["dark"], bevel=0.028)

    cube("SignalHarbor_PublicGatewayFrame", group, (0, 2.66, 3.46), (10.65, 3.48, 0.3), mats["dark"], bevel=0.03)
    cube("SignalHarbor_PublicGatewayGlass", group, (0, 2.58, 3.66), (9.45, 2.42, 0.08), mats["glass"], bevel=0.01)
    cube("SignalHarbor_PublicGatewayHeader", group, (0, 4.15, 3.72), (9.8, 0.22, 0.08), mats["mint"], bevel=0.004)
    cube("SignalHarbor_PublicGatewayFooter", group, (0, 1.08, 3.72), (8.95, 0.16, 0.08), mats["screen"], bevel=0.004)
    cube("SignalHarbor_EnvelopeRidge", group, (0, 3.18, 3.84), (5.8, 0.12, 0.08), mats["paper"], bevel=0.004)
    cube("SignalHarbor_EnvelopeFlapLeft", group, (-1.45, 2.68, 3.9), (3.25, 0.1, 0.08), mats["paper"], rot=(0.0, 0.0, -0.32), bevel=0.003)
    cube("SignalHarbor_EnvelopeFlapRight", group, (1.45, 2.68, 3.9), (3.25, 0.1, 0.08), mats["paper"], rot=(0.0, 0.0, 0.32), bevel=0.003)

    for index, x in enumerate([-3.35, 0, 3.35]):
        material = [mats["screen"], mats["mint"], mats["aqua"]][index]
        cube(f"SignalHarbor_ChannelRoom_{index}", group, (x, 1.92, 4.02), (2.15, 1.55, 0.16), mats["dark"], bevel=0.018)
        cube(f"SignalHarbor_ChannelGlass_{index}", group, (x, 1.96, 4.14), (1.52, 0.98, 0.07), material, bevel=0.006)
        cube(f"SignalHarbor_ChannelLintel_{index}", group, (x, 2.68, 4.16), (1.58, 0.12, 0.06), [mats["paper"], mats["amber"], mats["paper"]][index], bevel=0.003)

    for index, x in enumerate([-4.2, -2.1, 2.1, 4.2]):
        cube(f"SignalHarbor_FrontWindow_{index}", group, (x, 3.42, 3.74), (1.08, 0.58, 0.07), mats["glass"], bevel=0.006)
        cube(f"SignalHarbor_FrontWindowSill_{index}", group, (x, 3.04, 3.78), (1.24, 0.08, 0.06), mats["paper"], bevel=0.003)

    for index, x in enumerate([-4.4, -2.2, 0, 2.2, 4.4]):
        cube(f"SignalHarbor_RearServiceWindow_{index}", group, (x, 2.42, -3.42), (1.0, 0.78, 0.08), mats["glass"], bevel=0.006)
        cube(f"SignalHarbor_RearServiceSill_{index}", group, (x, 1.9, -3.46), (1.14, 0.08, 0.06), mats["paper"], bevel=0.003)
    cube("SignalHarbor_RearServiceDoor", group, (-5.2, 1.28, -3.42), (0.92, 1.95, 0.1), mats["dark"], bevel=0.014)
    cube("SignalHarbor_RearSignalRail", group, (0, 4.92, -3.34), (7.7, 0.14, 0.08), mats["screen"], bevel=0.004)

    for side, x in [("Left", -6.28), ("Right", 6.28)]:
        cube(f"SignalHarbor_{side}FinishedWall", group, (x, 2.36, 0.05), (0.18, 3.45, 5.32), mats["stone_shadow"], bevel=0.018)
        cube(f"SignalHarbor_{side}WindowBand", group, (x + (-0.08 if x < 0 else 0.08), 2.72, 0.05), (0.08, 1.12, 3.92), mats["glass"], bevel=0.006)
        for index, z in enumerate([-1.58, -0.52, 0.52, 1.58]):
            cube(f"SignalHarbor_{side}ReceiverSlat_{index}", group, (x + (-0.12 if x < 0 else 0.12), 3.46, z), (0.06, 0.08, 0.72), [mats["mint"], mats["screen"], mats["aqua"], mats["mint"]][index], bevel=0.003)

    cube("SignalHarbor_RoofReceiverMast", group, (4.82, 6.72, -1.62), (0.34, 3.7, 0.34), mats["dark"], bevel=0.014)
    cube("SignalHarbor_RoofReceiverCrossbar", group, (4.82, 7.84, -1.62), (3.25, 0.12, 0.12), mats["dark"], bevel=0.006)
    cone("SignalHarbor_RoofDish", group, (3.28, 6.95, -1.98), 1.05, 0.36, mats["foam"], vertices=22, rot=(math.pi / 2, 0.0, 0.44))
    cube("SignalHarbor_RoofDishCore", group, (2.94, 6.95, -2.22), (0.24, 0.24, 0.18), mats["screen"], bevel=0.016)
    cube("SignalHarbor_RoofBeacon", group, (4.82, 8.62, -1.62), (0.72, 0.44, 0.72), mats["amber"], bevel=0.038)

    for index, x in enumerate([-2.9, -1.45, 0, 1.45, 2.9]):
        cube(f"SignalHarbor_RoofPacketLight_{index}", group, (x, 4.7, 2.82), (0.82, 0.08, 0.08), [mats["screen"], mats["mint"], mats["aqua"], mats["mint"], mats["screen"]][index], bevel=0.003)


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
    cube("YardEdgeTrim_Curb", group, (0, 0.14, 0), (5.6, 0.28, 0.42), mats["stone"], bevel=0.026)
    cube("YardEdgeTrim_ShadowLip", group, (0, 0.32, 0.24), (5.35, 0.12, 0.12), mats["stone_shadow"])
    cube("YardEdgeTrim_GlowLeft", group, (-1.35, 0.41, -0.24), (1.45, 0.08, 0.07), mats["mint"])
    cube("YardEdgeTrim_GlowRight", group, (1.35, 0.41, -0.24), (1.45, 0.08, 0.07), mats["amber"])
    for x in [-2.82, 2.82]:
        cube("YardEdgeTrim_EndCap", group, (x, 0.45, 0), (0.16, 0.54, 0.2), mats["dark"], bevel=0.01)


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
    cube("RouteStoryMarker_BaseShadow", group, (0, 0.31, 0.34), (2.9, 0.1, 0.16), mats["stone_shadow"])
    for x in [-1.08, 1.08]:
        cube("RouteStoryMarker_Post", group, (x, 1.75, 0), (0.22, 3.05, 0.22), mats["dark"], bevel=0.012)
        cube("RouteStoryMarker_PostGlow", group, (x, 1.64, -0.16), (0.07, 2.1, 0.05), mats["screen"])
    cube("RouteStoryMarker_Header", group, (0, 3.12, 0), (2.75, 0.26, 0.3), mats["wood"], bevel=0.026)
    cube("RouteStoryMarker_HeaderGlow", group, (0, 2.93, -0.18), (2.08, 0.07, 0.055), mats["amber"])
    cube("RouteStoryMarker_MainPanel", group, (0, 2.1, -0.12), (1.95, 0.98, 0.08), mats["dark"], bevel=0.018)
    cube("RouteStoryMarker_MapScreen", group, (-0.34, 2.12, -0.18), (0.96, 0.64, 0.055), mats["screen"])
    for index, y in enumerate([1.84, 2.08, 2.32]):
        cube(f"RouteStoryMarker_ScreenLine_{index}", group, (-0.34, y, -0.225), (0.62 - index * 0.08, 0.04, 0.035), mats["mint"])
    cube("RouteStoryMarker_ArrowPlate", group, (0.72, 2.12, -0.18), (0.58, 0.48, 0.055), mats["amber"], rot=(0, 0, -0.14))
    cube("RouteStoryMarker_ArrowHead", group, (0.9, 2.12, -0.225), (0.22, 0.28, 0.04), mats["foam"], rot=(0, 0, -0.14))
    cube("RouteStoryMarker_HangingTag", group, (0.42, 1.38, -0.16), (0.82, 0.34, 0.055), mats["paper"], rot=(0, 0, 0.08))
    cube("RouteStoryMarker_TagPin", group, (0.04, 1.58, -0.2), (0.14, 0.1, 0.04), mats["pink"])
    for x in [-1.42, -0.88, 0.88, 1.42]:
        cube("RouteStoryMarker_FootReflector", group, (x, 0.52, -0.68), (0.26, 0.16, 0.08), mats["mint" if x < 0 else "amber"])
    for x in [-1.42, 1.42]:
        cube("RouteStoryMarker_SidePlanter", group, (x, 0.54, 0.46), (0.72, 0.38, 0.42), mats["wood"], bevel=0.014)
        for blade in [-0.18, 0.0, 0.18]:
            cone("RouteStoryMarker_PlanterBlade", group, (x + blade, 0.96, 0.48), 0.07, 0.58, mats["leaf"], vertices=5, rot=(0.12, blade * 1.8, 0.04))
    rock_blob("RouteStoryMarker_LeftPebble", group, (-1.78, 0.16, -0.22), (0.25, 0.14, 0.18), mats["stone_shadow"], rot=(0.16, 0.3, -0.08))
    rock_blob("RouteStoryMarker_RightPebble", group, (1.78, 0.15, 0.2), (0.3, 0.13, 0.18), mats["stone_shadow"], rot=(-0.12, -0.35, 0.06))


def create_route_vista_kit(mats):
    group = root("EnvPolishRouteVistaKit")
    cube("RouteVista_BaseStone", group, (0, 0.11, 0), (4.8, 0.22, 1.2), mats["stone"], bevel=0.055)
    cube("RouteVista_AsphaltLip", group, (0, 0.28, -0.52), (4.42, 0.12, 0.14), mats["stone_shadow"], bevel=0.012)
    cube("RouteVista_GardenLip", group, (0, 0.32, 0.48), (4.08, 0.12, 0.16), mats["wood"], bevel=0.012)
    for index, x in enumerate([-1.8, -0.9, 0, 0.9, 1.8]):
        cube(f"RouteVista_GlowChip_{index}", group, (x, 0.43, -0.57), (0.34, 0.075, 0.07), [mats["mint"], mats["amber"], mats["screen"], mats["amber"], mats["mint"]][index], bevel=0.004)
    cube("RouteVista_SignPost", group, (-1.72, 1.22, 0.16), (0.16, 2.12, 0.16), mats["dark"], bevel=0.012)
    cube("RouteVista_SignPanel", group, (-1.2, 2.08, -0.02), (1.16, 0.52, 0.07), mats["screen"], rot=(0, -0.14, 0), bevel=0.012)
    cube("RouteVista_SignArrow", group, (-0.83, 2.08, -0.08), (0.34, 0.28, 0.055), mats["foam"], rot=(0, -0.14, -0.16), bevel=0.005)
    for x in [0.25, 0.95, 1.65]:
        cone("RouteVista_Reed", group, (x, 0.72 + x * 0.04, 0.38), 0.09, 0.84 + x * 0.08, mats["leaf"], vertices=5, rot=(0.16, x * 0.34, 0.06))
        cube("RouteVista_Blossom", group, (x + 0.04, 1.14 + x * 0.04, 0.34), (0.14, 0.12, 0.12), [mats["flower"], mats["amber"], mats["purple"]][int(x * 10) % 3], bevel=0.014)
    for x in [-2.26, 2.26]:
        cube("RouteVista_EndBollard", group, (x, 0.72, -0.1), (0.22, 0.94, 0.22), mats["dark"], bevel=0.026)
        cube("RouteVista_BollardLamp", group, (x, 1.28, -0.12), (0.34, 0.2, 0.24), mats["amber" if x < 0 else "mint"], bevel=0.018)
    rock_blob("RouteVista_LeftPebble", group, (-0.25, 0.16, 0.36), (0.26, 0.13, 0.18), mats["stone_shadow"], rot=(0.16, 0.2, -0.08))
    rock_blob("RouteVista_RightPebble", group, (2.02, 0.15, 0.26), (0.3, 0.13, 0.2), mats["stone_shadow"], rot=(-0.12, -0.35, 0.06))


def create_shoreline_tide_pool(mats):
    group = root("EnvPolishShorelineTidePool")
    rock_blob("TidePool_SandShelf", group, (0, 0.08, 0), (2.7, 0.16, 1.35), mats["islet_sand"], rot=(0.0, 0.12, -0.02))
    cube("TidePool_AquaWater", group, (0.08, 0.19, -0.06), (2.22, 0.055, 0.86), mats["aqua"], rot=(0, -0.08, 0), bevel=0.055)
    cube("TidePool_FoamLipFront", group, (0.0, 0.25, -0.55), (2.2, 0.055, 0.12), mats["foam"], rot=(0, -0.08, 0), bevel=0.008)
    cube("TidePool_FoamLipBack", group, (0.18, 0.24, 0.48), (1.7, 0.05, 0.1), mats["foam"], rot=(0, 0.18, 0), bevel=0.008)
    for index, (x, z, sx, sz, material) in enumerate([
        (-1.18, -0.18, 0.46, 0.26, "stone_shadow"),
        (-0.76, 0.52, 0.38, 0.22, "stone"),
        (1.04, 0.34, 0.5, 0.24, "stone_shadow"),
        (1.28, -0.42, 0.34, 0.18, "stone"),
    ]):
        rock_blob(f"TidePool_EdgeRock_{index}", group, (x, 0.2 + index * 0.01, z), (sx, 0.16, sz), mats[material], rot=(0.1, index * 0.42, -0.06))
    for index, x in enumerate([-0.92, -0.56, 0.52, 0.88]):
        cone("TidePool_Reed", group, (x, 0.55 + index * 0.02, 0.72), 0.08, 0.72 + index * 0.05, mats["leaf"], vertices=5, rot=(0.16, x * 0.34, 0.08))
    for index, x in enumerate([-0.42, 0.24, 0.72]):
        cube(f"TidePool_Shell_{index}", group, (x, 0.31, -0.36 + index * 0.18), (0.22, 0.08, 0.12), mats["paper" if index % 2 else "foam"], rot=(0, index * 0.4, 0.08), bevel=0.012)
    cube("TidePool_MintGlint", group, (0.34, 0.31, -0.1), (0.66, 0.035, 0.055), mats["mint"], rot=(0, -0.34, 0), bevel=0.004)


def create_shoreline_breakwater(mats):
    group = root("EnvPolishShorelineBreakwater")
    cube("Breakwater_SandPad", group, (0, 0.07, 0), (4.6, 0.14, 0.92), mats["islet_sand"], bevel=0.035)
    cube("Breakwater_FoamRun", group, (0, 0.19, -0.48), (4.35, 0.055, 0.12), mats["foam"], bevel=0.008)
    cube("Breakwater_BackWetLine", group, (0.12, 0.18, 0.38), (3.6, 0.045, 0.1), mats["aqua"], rot=(0, 0.04, 0), bevel=0.008)
    for index, x in enumerate([-1.95, -1.15, -0.36, 0.45, 1.28, 2.02]):
        cube(f"Breakwater_Post_{index}", group, (x, 0.62 + (index % 2) * 0.08, -0.04), (0.18, 1.08 + (index % 3) * 0.12, 0.18), mats["dark"], rot=(0, 0.04 * index, 0), bevel=0.018)
        cube(f"Breakwater_PostCap_{index}", group, (x, 1.22 + (index % 2) * 0.08, -0.04), (0.32, 0.18, 0.32), mats["wood"], bevel=0.025)
    cube("Breakwater_RopeTop", group, (0.02, 1.1, -0.12), (4.1, 0.08, 0.08), mats["rope"], rot=(0, -0.03, 0), bevel=0.012)
    cube("Breakwater_RopeLow", group, (-0.02, 0.76, -0.1), (4.0, 0.07, 0.07), mats["rope"], rot=(0, 0.04, 0), bevel=0.01)
    for index, x in enumerate([-1.55, -0.72, 0.18, 0.92, 1.68]):
        cone("Breakwater_Reed", group, (x, 0.48 + index * 0.015, 0.42), 0.07, 0.62 + index * 0.035, mats["leaf"], vertices=5, rot=(0.12, x * 0.28, 0.06))
    for index, x in enumerate([-1.72, 1.54]):
        rock_blob(f"Breakwater_Rock_{index}", group, (x, 0.18, -0.62), (0.34, 0.15, 0.2), mats["stone_shadow"], rot=(0.16, x * 0.2, -0.08))
    cube("Breakwater_WarningTag", group, (-0.14, 1.34, -0.16), (0.62, 0.22, 0.055), mats["amber"], rot=(0, -0.08, 0.04), bevel=0.006)


if __name__ == "__main__":
    main()
