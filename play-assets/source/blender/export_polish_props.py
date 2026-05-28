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
        modifier.segments = 2
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


if __name__ == "__main__":
    main()
