// ABOUTME: Merges static decorative meshes into material batches to reduce draw calls.
// ABOUTME: Leaves explicitly skipped animated or interactive meshes under their original parents.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function mergeStaticMeshesInGroup(group, {
  namePrefix = 'StaticBatch',
  shouldSkip = () => false,
  pruneEmpty = true,
  cellSize = 0,
  getBatchLabel = null
} = {}) {
  group.updateMatrixWorld(true);
  const inverseGroupMatrix = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map();
  const removable = [];
  const cells = new Set();

  group.traverse((object) => {
    if (object === group || !object.isMesh || !object.geometry || Array.isArray(object.material) || shouldSkip(object)) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    geometry.applyMatrix4(inverseGroupMatrix);
    const cell = spatialSignature(geometry, cellSize);
    cells.add(cell);
    const key = `${materialSignature(object.material)}:${geometrySignature(geometry)}:${object.renderOrder || 0}:${cell}`;
    const label = sanitizeBatchLabel(getBatchLabel?.(object) || object.userData?.batchLabel || '');
    if (!buckets.has(key)) {
      buckets.set(key, {
        material: object.material,
        renderOrder: object.renderOrder || 0,
        geometries: [],
        labels: new Map()
      });
    }
    const bucket = buckets.get(key);
    bucket.geometries.push(geometry);
    if (label) bucket.labels.set(label, (bucket.labels.get(label) || 0) + 1);
    removable.push(object);
  });

  for (const object of removable) object.parent?.remove(object);

  let batchIndex = 0;
  for (const entry of buckets.values()) {
    const merged = entry.geometries.length === 1 ? entry.geometries[0] : mergeGeometries(entry.geometries, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, entry.material);
    const label = strongestBatchLabel(entry.labels);
    mesh.name = label ? `${namePrefix}_${label}_${batchIndex}` : `${namePrefix}_${batchIndex}`;
    mesh.renderOrder = entry.renderOrder;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    batchIndex += 1;
  }

  const prunedEmptyGroups = pruneEmpty ? pruneEmptyDescendants(group) : 0;
  group.userData.staticBatchStats = {
    batches: batchIndex,
    mergedMeshes: removable.length,
    prunedEmptyGroups,
    cells: cells.size
  };

  return batchIndex;
}

function strongestBatchLabel(labels) {
  let best = '';
  let bestCount = 0;
  for (const [label, count] of labels.entries()) {
    if (count <= bestCount) continue;
    best = label;
    bestCount = count;
  }
  return best;
}

function sanitizeBatchLabel(label) {
  return String(label || '').replace(/[^a-z0-9_]+/gi, '_').replace(/^_+|_+$/g, '').slice(0, 64);
}

function pruneEmptyDescendants(root) {
  const candidates = [];
  root.traverse((object) => {
    if (object !== root && !object.isMesh && !object.isLight && !object.isCamera) {
      candidates.push(object);
    }
  });

  let pruned = 0;
  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const object = candidates[index];
    if (object.children.length > 0) continue;
    if (isMeaningfulEmptyRoot(object)) continue;
    object.parent?.remove(object);
    pruned += 1;
  }
  return pruned;
}

function isMeaningfulEmptyRoot(object) {
  const name = object.name || '';
  return /^(SetPiece_|STUNT_|Shoreline_|Env|VIS_|PHY_|SPAWN_|ZONE_|Wheel|Life_|VehicleModel|SecurityScannerGate|SetPieceBeacon)/.test(name);
}

function spatialSignature(geometry, cellSize) {
  if (!cellSize) return 'all';
  geometry.computeBoundingSphere();
  const center = geometry.boundingSphere?.center;
  if (!center) return 'all';
  return `${Math.floor(center.x / cellSize)}:${Math.floor(center.z / cellSize)}`;
}

function geometrySignature(geometry) {
  const attributes = Object.entries(geometry.attributes)
    .map(([name, attribute]) => `${name}:${attribute.itemSize}:${attribute.normalized ? 1 : 0}:${attribute.array?.constructor?.name || 'array'}`)
    .sort()
    .join('|');
  return `${geometry.index ? 'indexed' : 'plain'}:${attributes}`;
}

function materialSignature(material) {
  return [
    material.type,
    material.color?.getHexString?.() || '',
    material.emissive?.getHexString?.() || '',
    material.emissiveIntensity ?? '',
    material.roughness ?? '',
    material.metalness ?? '',
    material.opacity ?? 1,
    material.transparent ? 1 : 0,
    material.depthWrite ? 1 : 0,
    material.side ?? THREE.FrontSide,
    material.vertexColors ? 1 : 0,
    material.alphaTest ?? 0,
    material.polygonOffset ? 1 : 0,
    material.polygonOffsetFactor ?? 0,
    material.polygonOffsetUnits ?? 0,
    textureSignature(material.map)
  ].join(':');
}

function textureSignature(texture) {
  if (!texture) return '';
  return texture.source?.uuid || texture.image?.src || texture.uuid;
}
