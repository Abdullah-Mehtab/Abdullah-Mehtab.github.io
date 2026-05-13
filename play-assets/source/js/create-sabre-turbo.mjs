import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

if (!globalThis.FileReader) {
  globalThis.FileReader = class FileReader {
    async readAsArrayBuffer(blob) {
      this.result = await blob.arrayBuffer();
      this.onloadend?.();
    }
  };
}

export async function buildSabreTurbo({ output }) {
  const model = createSabreTurboModel();
  const exporter = new GLTFExporter();
  const glb = await exporter.parseAsync(model, {
    binary: true,
    trs: false,
    onlyVisible: true,
    includeCustomExtensions: false
  });
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, Buffer.from(glb));
}

export function createSabreTurboModel() {
  const root = new THREE.Group();
  root.name = 'SabreTurbo_OriginalInspired';

  const materials = createMaterials();
  const add = (name, geometry, material, position, rotation = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };

  add('Body_SculptedFastbackShell', createMuscleBodyGeometry(), materials.paint, [0, 0.28, 0]);
  add('Hood_LongMuscleHood', createHoodGeometry(), materials.paint, [0, 0.94, 1.35]);
  add('Trunk_SlopedDeck', createTrunkGeometry(), materials.paint, [0, 0.91, -1.55]);
  add('Cabin_FastbackRoof', createFastbackGeometry(), materials.paint, [0, 1.03, -0.32]);

  add('Stripe_Hood', createHoodStripeGeometry(), materials.stripe, [0, 0, 0]);
  add('Stripe_Roof', createRoofStripeGeometry(), materials.stripe, [0, 0, 0]);
  add('Stripe_Trunk', createTrunkStripeGeometry(), materials.stripe, [0, 0, 0]);

  add('Glass_Windshield', createWindshieldSurfaceGeometry(), materials.glass, [0, 1.03, -0.32]);
  add('Glass_RearWindow', createRearWindowSurfaceGeometry(), materials.glass, [0, 1.03, -0.32]);
  add('Frame_Windshield_Top', new THREE.BoxGeometry(1.5, 0.035, 0.045), materials.chrome, [0, 1.57, -0.2], [-0.78, 0, 0]);
  add('Frame_Windshield_Base', new THREE.BoxGeometry(1.66, 0.04, 0.045), materials.chrome, [0, 1.2, 0.36], [-0.78, 0, 0]);
  add('Mirror_RearView_Stem', new THREE.BoxGeometry(0.035, 0.13, 0.026), materials.dark, [0, 1.48, 0.1], [-0.52, 0, 0]);
  add('Mirror_RearView', new THREE.BoxGeometry(0.24, 0.07, 0.035), materials.dark, [0, 1.4, 0.22], [-0.52, 0, 0]);

  for (const side of [-1, 1]) {
    add(`Glass_SideWindow_${sideName(side)}`, createSideWindowSurfaceGeometry(side), materials.glass, [0, 1.03, -0.32]);
    add(`Frame_SideWindow_${sideName(side)}`, createSideWindowTrimGeometry(side), materials.chrome, [0, 1.03, -0.32]);
    add(`Trim_Rocker_${sideName(side)}`, new THREE.BoxGeometry(0.035, 0.035, 3.78), materials.chrome, [side * 1.19, 0.7, 0]);
    add(`Trim_DoorSeam_${sideName(side)}`, new THREE.BoxGeometry(0.035, 0.34, 0.035), materials.dark, [side * 1.2, 0.82, -0.45]);
    add(`Handle_Door_${sideName(side)}`, new THREE.BoxGeometry(0.035, 0.06, 0.22), materials.chrome, [side * 1.21, 0.93, -0.24]);
    add(`Mirror_Stem_${sideName(side)}`, new THREE.BoxGeometry(0.36, 0.07, 0.07), materials.dark, [side * 1.12, 0.98, 0.41], [0, 0, side * 0.05]);
    add(`Mirror_Case_${sideName(side)}`, new THREE.BoxGeometry(0.24, 0.15, 0.12), materials.chrome, [side * 1.29, 0.99, 0.45], [0, side * 0.16, 0]);
    add(`Mirror_Glass_${sideName(side)}`, new THREE.BoxGeometry(0.024, 0.086, 0.105), materials.glass, [side * 1.33, 0.99, 0.46], [0, side * 0.16, 0]);
    addWheelArch(root, materials.dark, side, 1.56, 'Front');
    addWheelArch(root, materials.dark, side, -1.64, 'Rear');
    addSidePanelLines(root, materials, side);
  }

  add('Grille_BlackRecess', new THREE.BoxGeometry(2.1, 0.42, 0.16), materials.grille, [0, 0.82, 2.68]);
  add('Bumper_FrontChrome', new THREE.BoxGeometry(2.45, 0.18, 0.22), materials.chrome, [0, 0.55, 2.78]);
  add('Bumper_RearChrome', new THREE.BoxGeometry(2.24, 0.16, 0.18), materials.chrome, [0, 0.54, -2.74]);
  add('Trim_FrontBrowChrome', new THREE.BoxGeometry(1.95, 0.06, 0.08), materials.chrome, [0, 0.98, 2.76]);
  add('Trim_RearBrowChrome', new THREE.BoxGeometry(1.75, 0.05, 0.06), materials.chrome, [0, 1.02, -2.68]);

  for (const x of [-0.72, -0.44, 0.44, 0.72]) {
    const lamp = add(`Headlight_Round_${x}`, new THREE.CylinderGeometry(0.105, 0.105, 0.038, 28), materials.headlight, [x, 0.86, 2.776], [Math.PI / 2, 0, 0]);
    lamp.castShadow = false;
  }

  for (const x of [-0.62, 0.62]) {
    add(`TailLight_Red_${x}`, new THREE.BoxGeometry(0.34, 0.15, 0.055), materials.tailRed, [x, 0.78, -2.58]);
    add(`TailLight_Amber_${x}`, new THREE.BoxGeometry(0.14, 0.15, 0.055), materials.tailAmber, [x * 1.42, 0.78, -2.58]);
  }

  addWheel(root, materials, [-1.24, 0.35, 1.62], 'WheelFrontLeft', true);
  addWheel(root, materials, [1.24, 0.35, 1.62], 'WheelFrontRight', true);
  addWheel(root, materials, [-1.24, 0.35, -1.68], 'WheelRearLeft', false);
  addWheel(root, materials, [1.24, 0.35, -1.68], 'WheelRearRight', false);

  const spotAnchor = new THREE.Group();
  spotAnchor.name = 'LightAnchors_Headlights';
  root.add(spotAnchor);

  return root;
}

function createMaterials() {
  return {
    paint: new THREE.MeshPhysicalMaterial({
      name: 'burnt_red_metallic_paint',
      color: 0x8b2b13,
      roughness: 0.26,
      metalness: 0.5,
      clearcoat: 0.58,
      clearcoatRoughness: 0.18,
      emissive: 0x160402,
      emissiveIntensity: 0.1
    }),
    stripe: new THREE.MeshStandardMaterial({ name: 'warm_white_racing_stripe', color: 0xe8dfca, roughness: 0.28, metalness: 0.22, side: THREE.DoubleSide }),
    dark: new THREE.MeshStandardMaterial({ name: 'black_rubber_trim', color: 0x071018, roughness: 0.42, metalness: 0.38 }),
    chrome: new THREE.MeshStandardMaterial({ name: 'aged_chrome', color: 0xc8ced0, roughness: 0.2, metalness: 0.82 }),
    grille: new THREE.MeshStandardMaterial({ name: 'black_front_grille', color: 0x15191d, roughness: 0.42, metalness: 0.64 }),
    glass: new THREE.MeshBasicMaterial({ name: 'dark_smoked_glass', color: 0x08131f, transparent: true, opacity: 0.94, side: THREE.DoubleSide, depthWrite: false }),
    tire: new THREE.MeshStandardMaterial({ name: 'black_rubber_tires', color: 0x020407, roughness: 0.74, metalness: 0.12 }),
    hubcap: new THREE.MeshStandardMaterial({ name: 'chrome_hubcaps', color: 0xaeb4b8, roughness: 0.18, metalness: 0.82 }),
    whitewall: new THREE.MeshBasicMaterial({ name: 'whitewall_tire_ring', color: 0xdee5e0 }),
    headlight: new THREE.MeshBasicMaterial({ name: 'warm_round_headlight', color: 0xfff3cf }),
    tailRed: new THREE.MeshBasicMaterial({ name: 'red_tail_light', color: 0xff2b36 }),
    tailAmber: new THREE.MeshBasicMaterial({ name: 'amber_tail_light', color: 0xffa04d })
  };
}

function addWheel(root, materials, position, name) {
  const pivot = new THREE.Group();
  pivot.name = name;
  pivot.position.set(...position);

  const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.42, 36), materials.tire);
  wheel.name = `WheelMesh_${name}`;
  wheel.rotation.z = Math.PI / 2;
  wheel.castShadow = true;
  pivot.add(wheel);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.04, 32), materials.hubcap);
  cap.name = `Hubcap_${name}`;
  cap.position.x = position[0] > 0 ? 0.235 : -0.235;
  cap.rotation.z = Math.PI / 2;
  pivot.add(cap);

  const whitewall = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 8, 32), materials.whitewall);
  whitewall.name = `Whitewall_${name}`;
  whitewall.position.x = position[0] > 0 ? 0.238 : -0.238;
  whitewall.rotation.y = Math.PI / 2;
  pivot.add(whitewall);

  root.add(pivot);
}

function addWheelArch(root, material, side, z, label) {
  const arch = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.045, 8, 28, Math.PI), material);
  arch.name = `WheelArch_${label}_${sideName(side)}`;
  arch.position.set(side * 1.212, 0.42, z);
  arch.rotation.set(0, Math.PI / 2, side > 0 ? 0 : Math.PI);
  arch.scale.y = 0.68;
  arch.castShadow = true;
  arch.receiveShadow = true;
  root.add(arch);
}

function addSidePanelLines(root, materials, side) {
  const addTrim = (name, width, height, depth, position) => {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), materials.chrome);
    trim.name = `${name}_${sideName(side)}`;
    trim.position.set(...position);
    trim.castShadow = true;
    trim.receiveShadow = true;
    root.add(trim);
  };
  addTrim('SideMarker_Front', 0.04, 0.08, 0.22, [side * 1.215, 0.71, 2.38]);
  addTrim('SideMarker_Rear', 0.04, 0.08, 0.22, [side * 1.215, 0.71, -2.28]);
  addTrim('LowerDoorChrome', 0.032, 0.028, 1.05, [side * 1.22, 0.53, -0.16]);
}

function createMuscleBodyGeometry() {
  const vertices = new Float32Array([
    -1.08, 0.00, -2.55, 1.08, 0.00, -2.55, 1.18, 0.00, 2.56, -1.18, 0.00, 2.56,
    -1.02, 0.78, -2.42, 1.02, 0.78, -2.42, 1.04, 0.66, 2.48, -1.04, 0.66, 2.48,
    -1.22, 0.18, -1.7, -1.22, 0.18, 1.65, 1.22, 0.18, -1.7, 1.22, 0.18, 1.65
  ]);
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 10, 1, 10, 2, 10, 5, 6, 10, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 8, 3, 8, 0, 8, 7, 4, 8, 4, 0,
    8, 9, 7, 7, 9, 3,
    10, 5, 11, 11, 5, 6
  ];
  return buildGeometry(vertices, indices);
}

function createHoodGeometry() {
  const vertices = new Float32Array([
    -1.02, 0.00, -1.18, 1.02, 0.00, -1.18, 1.08, 0.00, 1.36, -1.08, 0.00, 1.36,
    -0.94, 0.20, -1.08, 0.94, 0.20, -1.08, 0.98, 0.08, 1.28, -0.98, 0.08, 1.28
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createTrunkGeometry() {
  const vertices = new Float32Array([
    -1.02, 0.00, -0.92, 1.02, 0.00, -0.92, 1.06, 0.00, 0.92, -1.06, 0.00, 0.92,
    -0.96, 0.16, -0.84, 0.96, 0.16, -0.84, 0.98, 0.08, 0.86, -0.98, 0.08, 0.86
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createFastbackGeometry() {
  const vertices = new Float32Array([
    -0.84, 0.00, -1.25, 0.84, 0.00, -1.25, 0.92, 0.00, 0.82, -0.92, 0.00, 0.82,
    -0.61, 0.58, -0.78, 0.61, 0.58, -0.78, 0.66, 0.5, 0.24, -0.66, 0.5, 0.24
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createHoodStripeGeometry() {
  return buildGeometry(new Float32Array([
    -0.24, 1.175, 0.32,
    0.24, 1.175, 0.32,
    0.24, 1.045, 2.56,
    -0.24, 1.045, 2.56
  ]), [0, 1, 2, 0, 2, 3]);
}

function createRoofStripeGeometry() {
  return buildGeometry(new Float32Array([
    -0.21, 1.595, -1.02,
    0.21, 1.595, -1.02,
    0.21, 1.51, -0.1,
    -0.21, 1.51, -0.1
  ]), [0, 1, 2, 0, 2, 3]);
}

function createTrunkStripeGeometry() {
  return buildGeometry(new Float32Array([
    -0.24, 1.09, -2.36,
    0.24, 1.09, -2.36,
    0.24, 1.018, -0.82,
    -0.24, 1.018, -0.82
  ]), [0, 1, 2, 0, 2, 3]);
}

function createWindshieldSurfaceGeometry() {
  return buildGeometry(new Float32Array([
    -0.74, 0.16, 0.62,
    0.74, 0.16, 0.62,
    0.59, 0.53, 0.12,
    -0.59, 0.53, 0.12
  ]), [0, 1, 2, 0, 2, 3]);
}

function createRearWindowSurfaceGeometry() {
  return buildGeometry(new Float32Array([
    -0.68, 0.15, -1.14,
    0.68, 0.15, -1.14,
    0.53, 0.52, -0.8,
    -0.53, 0.52, -0.8
  ]), [0, 2, 1, 0, 3, 2]);
}

function createSideWindowSurfaceGeometry(side) {
  const s = side;
  return buildGeometry(new Float32Array([
    s * 0.915, 0.2, 0.5,
    s * 0.705, 0.52, 0.18,
    s * 0.665, 0.57, -0.8,
    s * 0.835, 0.22, -1.16
  ]), [0, 1, 2, 0, 2, 3]);
}

function createSideWindowTrimGeometry(side) {
  const s = side;
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints([
    new THREE.Vector3(s * 0.935, 0.2, 0.52),
    new THREE.Vector3(s * 0.72, 0.54, 0.18),
    new THREE.Vector3(s * 0.68, 0.59, -0.82),
    new THREE.Vector3(s * 0.855, 0.22, -1.18),
    new THREE.Vector3(s * 0.935, 0.2, 0.52)
  ]);
  const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: geometry.attributes.position.count }, (_, index) => {
    return new THREE.Vector3().fromBufferAttribute(geometry.attributes.position, index);
  })), 32, 0.018, 6, false);
  return tube;
}

function sideName(side) {
  return side < 0 ? 'Left' : 'Right';
}

function boxIndices() {
  return [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 4, 3, 4, 0
  ];
}

function buildGeometry(vertices, indices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
