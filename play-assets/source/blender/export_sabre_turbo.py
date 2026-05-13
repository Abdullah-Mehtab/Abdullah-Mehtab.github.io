import argparse
import math
from pathlib import Path

import bpy


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args(get_script_args())

    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()

    materials = {
        "paint": material("burnt_red_metallic_paint", (0.55, 0.16, 0.07, 1), metallic=0.45, roughness=0.28),
        "stripe": material("warm_white_racing_stripe", (0.9, 0.86, 0.75, 1), metallic=0.12, roughness=0.32),
        "dark": material("black_rubber_trim", (0.02, 0.03, 0.04, 1), metallic=0.25, roughness=0.48),
        "chrome": material("aged_chrome", (0.78, 0.81, 0.82, 1), metallic=0.82, roughness=0.18),
        "glass": material("dark_smoked_glass", (0.02, 0.05, 0.08, 0.9), metallic=0.05, roughness=0.08),
        "tire": material("black_rubber_tires", (0.01, 0.01, 0.012, 1), metallic=0.05, roughness=0.72),
    }

    add_cube("Body_SculptedFastbackShell", (0, 0.62, 0), (2.32, 0.72, 5.1), materials["paint"])
    add_cube("Hood_LongMuscleHood", (0, 1.04, 1.42), (2.12, 0.18, 2.45), materials["paint"])
    add_cube("Trunk_SlopedDeck", (0, 1.0, -1.62), (2.08, 0.16, 1.72), materials["paint"])
    add_cube("Cabin_FastbackRoof", (0, 1.35, -0.32), (1.55, 0.58, 1.92), materials["paint"])

    add_cube("Stripe_Hood", (0, 1.16, 1.45), (0.45, 0.025, 2.6), materials["stripe"])
    add_cube("Stripe_Roof", (0, 1.65, -0.36), (0.4, 0.025, 0.95), materials["stripe"])
    add_cube("Stripe_Trunk", (0, 1.1, -1.7), (0.45, 0.025, 1.55), materials["stripe"])

    add_cube("Glass_Windshield", (0, 1.35, 0.24), (1.44, 0.035, 0.56), materials["glass"], rotation=(math.radians(39), 0, 0))
    add_cube("Glass_RearWindow", (0, 1.28, -1.0), (1.36, 0.035, 0.5), materials["glass"], rotation=(math.radians(-42), 0, 0))

    for side, label in [(-1, "Left"), (1, "Right")]:
        add_cube(f"Glass_SideWindow_{label}", (side * 0.88, 1.32, -0.35), (0.035, 0.42, 1.32), materials["glass"])
        add_cube(f"Mirror_Stem_{label}", (side * 1.12, 0.98, 0.41), (0.34, 0.075, 0.07), materials["dark"])
        add_cube(f"Mirror_Case_{label}", (side * 1.29, 0.99, 0.45), (0.24, 0.15, 0.12), materials["chrome"])
        add_cube(f"Trim_Rocker_{label}", (side * 1.19, 0.7, 0), (0.035, 0.035, 3.78), materials["chrome"])
        add_wheel(f"WheelFront{label}", (side * 1.24, 0.35, 1.62), materials)
        add_wheel(f"WheelRear{label}", (side * 1.24, 0.35, -1.68), materials)

    add_cube("Grille_BlackRecess", (0, 0.82, 2.68), (2.1, 0.42, 0.16), materials["dark"])
    add_cube("Bumper_FrontChrome", (0, 0.55, 2.78), (2.45, 0.18, 0.22), materials["chrome"])
    add_cube("Bumper_RearChrome", (0, 0.54, -2.74), (2.24, 0.16, 0.18), materials["chrome"])

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(output), export_format="GLB", export_apply=True)


def get_script_args():
    if "--" not in __import__("sys").argv:
        return []
    return __import__("sys").argv[__import__("sys").argv.index("--") + 1:]


def material(name, color, metallic=0.0, roughness=0.5):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat


def add_cube(name, location, scale, mat, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return obj


def add_wheel(name, location, materials):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    empty.location = location

    bpy.ops.mesh.primitive_cylinder_add(vertices=36, radius=0.52, depth=0.42, location=location, rotation=(0, math.radians(90), 0))
    tire = bpy.context.object
    tire.name = f"WheelMesh_{name}"
    tire.parent = empty
    tire.data.materials.append(materials["tire"])

    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.31, depth=0.04, location=(location[0] + (0.235 if location[0] > 0 else -0.235), location[1], location[2]), rotation=(0, math.radians(90), 0))
    cap = bpy.context.object
    cap.name = f"Hubcap_{name}"
    cap.parent = empty
    cap.data.materials.append(materials["chrome"])


if __name__ == "__main__":
    main()
