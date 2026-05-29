// ABOUTME: Builds the visible driving routes and junction markings for /play.
// ABOUTME: Keeps roads visual-only so decorative route geometry cannot block the car.
import * as THREE from 'three';
import { roadPaths, roadSegments } from './worldData.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

const ROAD_STYLE = {
  ring: { shoulder: 1.6, curb: 0.28, line: 0xf0d477 },
  avenue: { shoulder: 1.3, curb: 0.26, line: 0xeed9a6 },
  street: { shoulder: 1.1, curb: 0.22, line: 0xd9d6c7 },
  plaza: { shoulder: 1.05, curb: 0.3, line: 0xf3e7bd },
  security: { shoulder: 1.25, line: 0x68d8ff },
  stunt: { shoulder: 1.4, curb: 0.28, line: 0xff9b6d },
  dirt: { shoulder: 1.8, line: 0x8d6338 },
  bridge: { shoulder: 1.4, curb: 0.22, line: 0xe8edf0 }
};

const ROAD_LAYER = {
  ring: 0,
  avenue: 1,
  street: 2,
  plaza: 3,
  security: 3,
  dirt: 2,
  stunt: 3,
  bridge: 4
};

export class Roads {
  constructor(world) {
    this.world = world;
    this.segments = roadSegments;
    this.materialCache = new Map();
    this.markerDummy = new THREE.Object3D();
    this.roadGroup = new THREE.Group();
    this.roadGroup.name = 'ROAD_Network';
  }

  build() {
    this.world.scene.add(this.roadGroup);
    for (const path of roadPaths) {
      this.addPath(path);
    }
    mergeStaticMeshesInGroup(this.roadGroup, { namePrefix: 'ROAD_batch' });
    this.createGuidanceMarkers();
  }

  addPath(path) {
    this.addPathRibbon(path);
    for (const point of path.points) {
      this.addNode(point, path);
    }
  }

  addPathRibbon(path) {
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const width = path.width;
    const layer = ROAD_LAYER[path.hierarchy] ?? 1;
    const shoulderY = 0.068 + layer * 0.001;
    const surfaceY = 0.104 + layer * 0.006;

    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadShoulder;
    const surfaceMaterial = path.hierarchy === 'dirt'
      ? this.world.materials.dirtRoad
      : path.hierarchy === 'security'
        ? this.world.materials.securityRoad
        : path.hierarchy === 'plaza'
          ? this.world.materials.plazaRoad
          : this.world.materials.stoneRoad;

    const shoulder = new THREE.Mesh(
      createPathRibbonGeometry(path.points, width + style.shoulder * 2, path.closed, shoulderY, 9),
      this.offsetMaterial(edgeMaterial, 1 + layer)
    );
    shoulder.name = `ROAD_${path.id}_shoulder`;
    shoulder.renderOrder = 1 + layer;
    shoulder.receiveShadow = true;
    this.roadGroup.add(shoulder);

    const surface = new THREE.Mesh(
      createPathRibbonGeometry(path.points, width, path.closed, surfaceY, 9),
      this.offsetMaterial(surfaceMaterial, 3 + layer)
    );
    surface.name = `ROAD_${path.id}_surface`;
    surface.renderOrder = 3 + layer;
    surface.receiveShadow = true;
    this.roadGroup.add(surface);

    if (path.hierarchy !== 'dirt') {
      for (const side of [-1, 1]) {
        const curb = new THREE.Mesh(
          createPathRibbonGeometry(path.points, style.curb || 0.22, path.closed, surfaceY + 0.046, 9, (width / 2 + (style.curb || 0.22) * 0.66) * side),
          this.offsetMaterial(this.world.materials.roadCurb, 6 + layer)
        );
        curb.name = `ROAD_${path.id}_curb`;
        curb.renderOrder = 6 + layer;
        this.roadGroup.add(curb);
      }
    }

    const lineMaterial = this.cachedLineMaterial(style.line);
    const curve = makePathCurve(path.points, path.closed);
    const totalLength = curve.getLength();
    const dashSpacing = path.hierarchy === 'stunt' ? 8.5 : 12;
    for (let distance = width * 1.35; distance < totalLength - width * 1.35; distance += dashSpacing) {
      const t = distance / totalLength;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const rotation = Math.atan2(tangent.x, tangent.z);
      const dash = this.createRoadPlane(0.38, 3.2, lineMaterial, 8 + layer, rotation);
      dash.position.set(point.x, surfaceY + 0.034, point.z);
      this.roadGroup.add(dash);
    }

    // Roads stay visual so the car always drives on one continuous terrain collider.
  }

  addNode(point, path) {
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const size = path.width * 0.78 + style.shoulder * 0.42;
    const layer = ROAD_LAYER[path.hierarchy] ?? 1;
    const shoulderY = 0.086 + layer * 0.003;
    const surfaceY = 0.142 + layer * 0.007;
    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadShoulder;
    const surfaceMaterial = path.hierarchy === 'dirt'
      ? this.world.materials.dirtRoad
      : path.hierarchy === 'security'
        ? this.world.materials.securityRoad
        : path.hierarchy === 'plaza'
          ? this.world.materials.plazaRoad
          : this.world.materials.stoneRoad;
    const nodeMaterial = this.cleanCapMaterial(edgeMaterial);
    const topMaterial = this.cleanCapMaterial(surfaceMaterial);
    const node = new THREE.Mesh(new THREE.CylinderGeometry((size + style.shoulder * 0.9) / 2, (size + style.shoulder * 0.9) / 2, 0.035, 18), nodeMaterial);
    node.name = `ROAD_${path.id}_junction`;
    node.position.set(point[0], shoulderY, point[1]);
    node.receiveShadow = false;
    node.renderOrder = 10 + layer;
    this.roadGroup.add(node);

    const top = new THREE.Mesh(new THREE.CylinderGeometry(size / 2, size / 2, 0.035, 18), topMaterial);
    top.name = `ROAD_${path.id}_junction_cap`;
    top.position.set(point[0], surfaceY + 0.034, point[1]);
    top.receiveShadow = false;
    top.renderOrder = 12 + layer;
    this.roadGroup.add(top);
  }

  createRoadPlane(width, length, material, renderOrder = 1, rotation = 0) {
    const roadMaterial = this.offsetMaterial(material, renderOrder);
    const mesh = new THREE.Mesh(createOrientedPlaneGeometry(width, length, rotation), roadMaterial);
    mesh.renderOrder = renderOrder;
    return mesh;
  }

  offsetMaterial(material, layer) {
    const key = `offset:${material.uuid}:${layer}`;
    if (this.materialCache.has(key)) return this.materialCache.get(key);
    const clone = material.clone();
    clone.polygonOffset = true;
    clone.polygonOffsetFactor = -layer;
    clone.polygonOffsetUnits = -layer;
    this.materialCache.set(key, clone);
    return clone;
  }

  cleanCapMaterial(material) {
    const key = `cap:${material.uuid}`;
    if (this.materialCache.has(key)) return this.materialCache.get(key);
    const clone = new THREE.MeshBasicMaterial({
      color: material.color ? material.color.clone() : new THREE.Color(0x5f584d),
      map: material.map || null,
      transparent: material.transparent,
      opacity: material.opacity ?? 1,
      depthWrite: material.depthWrite ?? true
    });
    clone.polygonOffset = true;
    clone.polygonOffsetFactor = -14;
    clone.polygonOffsetUnits = -14;
    this.materialCache.set(key, clone);
    return clone;
  }

  cachedLineMaterial(color) {
    const key = `line:${color}`;
    if (this.materialCache.has(key)) return this.materialCache.get(key);
    const material = this.world.materials.roadLine.clone();
    material.color.setHex(color);
    this.materialCache.set(key, material);
    return material;
  }

  createGuidanceMarkers() {
    const chevrons = [];
    const studs = [];

    for (const path of roadPaths) {
      const curve = makePathCurve(path.points, path.closed);
      const totalLength = curve.getLength();
      const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
      const layer = ROAD_LAYER[path.hierarchy] ?? 1;
      const surfaceY = 0.104 + layer * 0.006;
      const color = roadMarkerColor(path);
      const chevronSpacing = roadMarkerSpacing(path);
      const studSpacing = Math.max(6, chevronSpacing * 0.5);
      const inset = path.width * 0.5 + Math.min(1.15, style.shoulder * 0.62);

      for (let distance = chevronSpacing * 0.85; distance < totalLength - chevronSpacing * 0.75; distance += chevronSpacing) {
        const t = distance / totalLength;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const side = distanceToBendSide(curve, t) || (chevrons.length % 2 === 0 ? 1 : -1);
        const rightX = tangent.z;
        const rightZ = -tangent.x;
        chevrons.push({
          x: point.x + rightX * inset * side,
          y: surfaceY + 0.074,
          z: point.z + rightZ * inset * side,
          rotation: Math.atan2(tangent.x, tangent.z),
          scale: path.hierarchy === 'stunt' ? 1.08 : path.hierarchy === 'bridge' ? 0.86 : 0.94,
          color
        });
      }

      for (let distance = studSpacing; distance < totalLength - studSpacing; distance += studSpacing) {
        const t = distance / totalLength;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const rightX = tangent.z;
        const rightZ = -tangent.x;
        for (const side of [-1, 1]) {
          studs.push({
            x: point.x + rightX * (path.width * 0.5 + style.shoulder * 0.38) * side,
            y: surfaceY + 0.09,
            z: point.z + rightZ * (path.width * 0.5 + style.shoulder * 0.38) * side,
            rotation: Math.atan2(tangent.x, tangent.z),
            scale: path.hierarchy === 'dirt' ? 0.78 : 1,
            color
          });
        }
      }
    }

    this.addMarkerInstances({
      name: 'ROAD_Guidance_Chevrons',
      geometry: createChevronGeometry(),
      material: this.createMarkerMaterial(),
      specs: chevrons,
      defaultScale: [1, 1, 1]
    });
    this.addMarkerInstances({
      name: 'ROAD_Reflector_Studs',
      geometry: new THREE.BoxGeometry(0.34, 0.07, 0.9),
      material: this.createMarkerMaterial(),
      specs: studs,
      defaultScale: [1, 1, 1]
    });
  }

  addMarkerInstances({ name, geometry, material, specs, defaultScale }) {
    if (!specs.length) return;
    const markerGeometry = geometry.clone();
    applyWhiteVertexColors(markerGeometry);
    const mesh = new THREE.InstancedMesh(markerGeometry, material, specs.length);
    mesh.name = name;
    mesh.renderOrder = 30;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    for (let index = 0; index < specs.length; index += 1) {
      const spec = specs[index];
      this.markerDummy.position.set(spec.x, spec.y, spec.z);
      this.markerDummy.rotation.set(0, spec.rotation, 0);
      this.markerDummy.scale.set(
        defaultScale[0] * spec.scale,
        defaultScale[1],
        defaultScale[2] * spec.scale
      );
      this.markerDummy.updateMatrix();
      mesh.setMatrixAt(index, this.markerDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.roadGroup.add(mesh);
  }

  createMarkerMaterial() {
    const key = 'road-marker-instanced';
    if (this.materialCache.has(key)) return this.materialCache.get(key);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -24,
      polygonOffsetUnits: -24
    });
    this.materialCache.set(key, material);
    return material;
  }

  isNear(x, z, margin = 0) {
    return roadSegments.some(([cx, cz, width, length, rotation]) => {
      const dx = x - cx;
      const dz = z - cz;
      const localX = Math.cos(rotation) * dx - Math.sin(rotation) * dz;
      const localZ = Math.sin(rotation) * dx + Math.cos(rotation) * dz;
      return Math.abs(localX) <= width / 2 + margin && Math.abs(localZ) <= length / 2 + margin;
    });
  }
}

function roadMarkerColor(path) {
  if (path.hierarchy === 'security') return 0x68d8ff;
  if (path.hierarchy === 'stunt') return 0xff9b6d;
  if (path.hierarchy === 'dirt') return 0xc79b56;
  if (path.hierarchy === 'bridge') return 0x79ffc5;
  if (path.hierarchy === 'plaza') return 0xf3e7bd;
  return (ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street).line;
}

function roadMarkerSpacing(path) {
  if (path.hierarchy === 'security' || path.hierarchy === 'stunt') return 11;
  if (path.hierarchy === 'bridge') return 8.5;
  if (path.hierarchy === 'plaza') return 12.5;
  if (path.hierarchy === 'dirt') return 16;
  if (path.hierarchy === 'avenue') return 15;
  return 13.5;
}

function distanceToBendSide(curve, t) {
  const previous = curve.getTangentAt(Math.max(0, t - 0.026)).normalize();
  const next = curve.getTangentAt(Math.min(1, t + 0.026)).normalize();
  const cross = previous.x * next.z - previous.z * next.x;
  if (Math.abs(cross) < 0.045) return 0;
  return cross > 0 ? -1 : 1;
}

function createChevronGeometry() {
  const vertices = new Float32Array([
    0, 0, 1.1,
    -0.82, 0, -0.86,
    0.82, 0, -0.86
  ]);
  const uvs = new Float32Array([
    0.5, 1,
    0, 0,
    1, 0
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex([0, 1, 2]);
  applyWhiteVertexColors(geometry);
  geometry.computeVertexNormals();
  return geometry;
}

function applyWhiteVertexColors(geometry) {
  if (geometry.getAttribute('color')) return;
  const position = geometry.getAttribute('position');
  if (!position) return;
  const colors = new Float32Array(position.count * 3);
  colors.fill(1);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function createOrientedPlaneGeometry(width, length, rotation) {
  const halfWidth = width / 2;
  const halfLength = length / 2;
  const rightX = Math.cos(rotation);
  const rightZ = -Math.sin(rotation);
  const forwardX = Math.sin(rotation);
  const forwardZ = Math.cos(rotation);
  const corners = [
    [-halfWidth, -halfLength],
    [halfWidth, -halfLength],
    [halfWidth, halfLength],
    [-halfWidth, halfLength]
  ];
  const vertices = new Float32Array(corners.flatMap(([localX, localZ]) => [
    rightX * localX + forwardX * localZ,
    0,
    rightZ * localX + forwardZ * localZ
  ]));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ]), 2));
  geometry.setIndex([0, 2, 1, 0, 3, 2]);
  geometry.computeVertexNormals();
  return geometry;
}

function makePathCurve(points, closed) {
  const vectors = points.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(vectors, closed, 'centripetal', 0.35);
  curve.arcLengthDivisions = Math.max(64, points.length * 18);
  curve.updateArcLengths();
  return curve;
}

function createPathRibbonGeometry(points, width, closed, y, samplesPerSegment = 8, offset = 0) {
  const curve = makePathCurve(points, closed);
  const divisions = Math.max(12, (closed ? points.length : points.length - 1) * samplesPerSegment);
  const vertexCount = (divisions + 1) * 2;
  const vertices = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = [];
  let previous = null;
  let accumulated = 0;

  for (let i = 0; i <= divisions; i += 1) {
    const t = i / divisions;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const rightX = tangent.z;
    const rightZ = -tangent.x;
    const centerX = point.x + rightX * offset;
    const centerZ = point.z + rightZ * offset;

    if (previous) {
      accumulated += Math.hypot(centerX - previous.x, centerZ - previous.z);
    }
    previous = { x: centerX, z: centerZ };

    const left = i * 2;
    const right = left + 1;
    writeRibbonVertex(vertices, left, centerX - rightX * width * 0.5, y, centerZ - rightZ * width * 0.5);
    writeRibbonVertex(vertices, right, centerX + rightX * width * 0.5, y, centerZ + rightZ * width * 0.5);
    uvs[left * 2] = accumulated / 9;
    uvs[left * 2 + 1] = 0;
    uvs[right * 2] = accumulated / 9;
    uvs[right * 2 + 1] = 1;

    if (i < divisions) {
      indices.push(left, left + 2, right, right, left + 2, right + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function writeRibbonVertex(vertices, index, x, y, z) {
  const cursor = index * 3;
  vertices[cursor] = x;
  vertices[cursor + 1] = y;
  vertices[cursor + 2] = z;
}
