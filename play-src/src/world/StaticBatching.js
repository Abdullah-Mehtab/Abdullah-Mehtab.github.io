// ABOUTME: Merges static decorative meshes into material batches to reduce draw calls.
// ABOUTME: Leaves explicitly skipped animated or interactive meshes under their original parents.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function mergeStaticMeshesInGroup(group, { namePrefix = 'StaticBatch', shouldSkip = () => false } = {}) {
  group.updateMatrixWorld(true);
  const inverseGroupMatrix = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map();
  const removable = [];

  group.traverse((object) => {
    if (object === group || !object.isMesh || !object.geometry || Array.isArray(object.material) || shouldSkip(object)) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    geometry.applyMatrix4(inverseGroupMatrix);
    const key = `${materialSignature(object.material)}:${geometrySignature(geometry)}:${object.renderOrder || 0}`;
    if (!buckets.has(key)) {
      buckets.set(key, {
        material: object.material,
        renderOrder: object.renderOrder || 0,
        geometries: []
      });
    }
    buckets.get(key).geometries.push(geometry);
    removable.push(object);
  });

  for (const object of removable) object.parent?.remove(object);

  let batchIndex = 0;
  for (const entry of buckets.values()) {
    const merged = entry.geometries.length === 1 ? entry.geometries[0] : mergeGeometries(entry.geometries, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, entry.material);
    mesh.name = `${namePrefix}_${batchIndex}`;
    mesh.renderOrder = entry.renderOrder;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    batchIndex += 1;
  }

  return batchIndex;
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
