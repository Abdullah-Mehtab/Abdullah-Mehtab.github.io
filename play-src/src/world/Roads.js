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
    this.detailDummy = new THREE.Object3D();
    this.detailMeshes = [];
    this.detailStats = { wearStrips: 0, laneSeams: 0 };
    this.surfaceSegments = createRoadSurfaceSegments(roadPaths);
    this.roadGroup = new THREE.Group();
    this.roadGroup.name = 'ROAD_Network';
  }

  build() {
    this.world.scene.add(this.roadGroup);
    this.roadGroup.userData.edgeFeatherCount = 0;
    this.roadGroup.userData.laneEdgeLineCount = 0;
    for (const path of roadPaths) {
      this.addPath(path);
    }
    this.addJunctionPatches();
    mergeStaticMeshesInGroup(this.roadGroup, { namePrefix: 'ROAD_batch' });
    this.createRoadSurfaceDetails();
    this.createGuidanceMarkers();
    this.applyQuality();
  }

  applyQuality() {
    const showSurfaceDetails = this.world.landscapeQuality !== 'low';
    for (const mesh of this.detailMeshes) {
      mesh.visible = showSurfaceDetails;
    }
  }

  addPath(path) {
    this.addPathRibbon(path);
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
    this.addEdgeFeathers(path, style, width, layer);
    if (path.hierarchy !== 'dirt') {
      this.addLaneEdgeLines(path, width, layer, surfaceY);
    }

    const lineMaterial = this.cachedLineMaterial(style.line);
    const curve = makePathCurve(path.points, path.closed);
    const totalLength = curve.getLength();
    const dashSpacing = path.hierarchy === 'stunt' ? 9.5 : 13.5;
    for (let distance = width * 1.35; distance < totalLength - width * 1.35; distance += dashSpacing) {
      const t = distance / totalLength;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const rotation = Math.atan2(tangent.x, tangent.z);
      const dash = this.createRoadPlane(0.28, path.hierarchy === 'stunt' ? 2.65 : 2.35, lineMaterial, 8 + layer, rotation);
      dash.position.set(point.x, surfaceY + 0.034, point.z);
      this.roadGroup.add(dash);
    }

    // Roads stay visual so the car always drives on one continuous terrain collider.
  }

  addLaneEdgeLines(path, width, layer, surfaceY) {
    const inset = path.hierarchy === 'bridge' ? width * 0.36 : width * 0.34;
    const lineWidth = path.hierarchy === 'avenue' ? 0.15 : path.hierarchy === 'plaza' ? 0.14 : 0.12;
    const material = this.offsetMaterial(this.cachedLineMaterial(roadLaneEdgeColor(path)), 10 + layer);
    for (const side of [-1, 1]) {
      const line = new THREE.Mesh(
        createPathRibbonGeometry(path.points, lineWidth, path.closed, surfaceY + 0.041, 9, inset * side),
        material
      );
      line.name = `ROAD_${path.id}_lane_edge_${side > 0 ? 'right' : 'left'}`;
      line.renderOrder = 9 + layer;
      this.roadGroup.add(line);
      this.roadGroup.userData.laneEdgeLineCount += 1;
    }
  }

  addEdgeFeathers(path, style, width, layer) {
    const featherWidth = path.hierarchy === 'bridge' ? 0.82 : path.hierarchy === 'dirt' ? 1.72 : 1.18;
    const y = 0.098 + layer * 0.006;
    const material = this.vergeMaterial(path);
    for (const side of [-1, 1]) {
      const offset = (width / 2 + style.shoulder + featherWidth * 0.18) * side;
      const feather = new THREE.Mesh(
        createPathRibbonGeometry(path.points, featherWidth, path.closed, y, 9, offset),
        material
      );
      feather.name = `ROAD_${path.id}_verge_${side > 0 ? 'right' : 'left'}`;
      feather.renderOrder = 5 + layer;
      this.roadGroup.add(feather);
      this.roadGroup.userData.edgeFeatherCount += 1;
    }
  }

  addJunctionPatches() {
    const graph = new Map();
    for (const path of roadPaths) {
      for (let index = 0; index < path.points.length; index += 1) {
        const point = path.points[index];
        const key = pointKey(point);
        if (!graph.has(key)) {
          graph.set(key, { point, connections: [], pathIds: new Set() });
        }
        const node = graph.get(key);
        node.pathIds.add(path.id);
        if (index > 0) {
          node.connections.push(createJunctionConnection(point, path.points[index - 1], path));
        }
        if (index < path.points.length - 1) {
          node.connections.push(createJunctionConnection(point, path.points[index + 1], path));
        }
      }
    }

    let patches = 0;
    for (const node of graph.values()) {
      if (node.pathIds.size < 2 || node.connections.length < 2) continue;
      const dominant = dominantRoadPath(node.connections.map((connection) => connection.path));
      const style = ROAD_STYLE[dominant.hierarchy] || ROAD_STYLE.street;
      const layer = ROAD_LAYER[dominant.hierarchy] ?? 1;
      const shoulderPadding = style.shoulder * 0.46;
      const shoulderGeometry = createJunctionBlendGeometry(node.point, node.connections, shoulderPadding, 0.088 + layer * 0.003);
      const surfaceGeometry = createJunctionBlendGeometry(node.point, node.connections, 0.12, 0.148 + layer * 0.007);
      const edgeMaterial = dominant.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadShoulder;
      const surfaceMaterial = this.roadSurfaceMaterial(dominant);
      const shoulder = new THREE.Mesh(shoulderGeometry, this.cleanCapMaterial(edgeMaterial));
      shoulder.name = `ROAD_JunctionBlend_${patches}_shoulder`;
      shoulder.receiveShadow = false;
      shoulder.renderOrder = 10 + layer;
      this.roadGroup.add(shoulder);

      const surface = new THREE.Mesh(surfaceGeometry, this.cleanCapMaterial(surfaceMaterial));
      surface.name = `ROAD_JunctionBlend_${patches}_surface`;
      surface.receiveShadow = false;
      surface.renderOrder = 12 + layer;
      this.roadGroup.add(surface);
      patches += 1;
    }

    this.roadGroup.userData.junctionPatchCount = patches;
    this.roadGroup.userData.circularPointCaps = 0;
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

  vergeMaterial(path) {
    const color = roadVergeColor(path);
    const opacity = path.hierarchy === 'security' ? 0.2 : path.hierarchy === 'dirt' ? 0.15 : 0.16;
    const key = `verge:${color}:${opacity}`;
    if (this.materialCache.has(key)) return this.materialCache.get(key);
    const material = this.world.materials.roadVerge.clone();
    material.color.setHex(color);
    material.opacity = opacity;
    this.materialCache.set(key, material);
    return material;
  }

  roadSurfaceMaterial(path) {
    if (path.hierarchy === 'dirt') return this.world.materials.dirtRoad;
    if (path.hierarchy === 'security') return this.world.materials.securityRoad;
    if (path.hierarchy === 'plaza') return this.world.materials.plazaRoad;
    if (path.hierarchy === 'stunt') return this.world.materials.stuntRamp;
    return this.world.materials.stoneRoad;
  }

  createRoadSurfaceDetails() {
    const wearStrips = [];
    const laneSeams = [];

    for (let pathIndex = 0; pathIndex < roadPaths.length; pathIndex += 1) {
      const path = roadPaths[pathIndex];
      const curve = makePathCurve(path.points, path.closed);
      const totalLength = curve.getLength();
      const layer = ROAD_LAYER[path.hierarchy] ?? 1;
      const surfaceY = 0.104 + layer * 0.006;
      const wearColor = roadWearColor(path);
      const seamColor = roadSeamColor(path);
      const wearSpacing = path.hierarchy === 'dirt' ? 7.5 : path.hierarchy === 'stunt' ? 8.8 : 11.5;
      const seamSpacing = path.hierarchy === 'avenue' ? 20 : 24;

      for (let distance = path.width * 1.2; distance < totalLength - path.width * 1.2; distance += wearSpacing) {
        const seed = pathIndex * 1000 + distance;
        if (pseudoRoad(seed * 1.7) < 0.22) continue;
        const t = distance / totalLength;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const rightX = tangent.z;
        const rightZ = -tangent.x;
        const lateral = (pseudoRoad(seed * 2.3) - 0.5) * path.width * 0.62;
        wearStrips.push({
          x: point.x + rightX * lateral,
          y: surfaceY + 0.082,
          z: point.z + rightZ * lateral,
          rotation: Math.atan2(tangent.x, tangent.z) + (pseudoRoad(seed * 3.1) - 0.5) * 0.18,
          width: 0.22 + pseudoRoad(seed * 4.7) * 0.28,
          length: 1.8 + pseudoRoad(seed * 5.9) * 3.6,
          color: wearColor
        });
      }

      for (let distance = path.width * 1.5; distance < totalLength - path.width * 1.5; distance += seamSpacing) {
        const seed = pathIndex * 1400 + distance;
        if (path.hierarchy === 'dirt' && pseudoRoad(seed * 2.1) < 0.54) continue;
        const t = distance / totalLength;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const side = pseudoRoad(seed * 3.9) > 0.5 ? 1 : -1;
        const rightX = tangent.z;
        const rightZ = -tangent.x;
        const lateral = side * path.width * (0.18 + pseudoRoad(seed * 4.2) * 0.18);
        laneSeams.push({
          x: point.x + rightX * lateral,
          y: surfaceY + 0.086,
          z: point.z + rightZ * lateral,
          rotation: Math.atan2(tangent.x, tangent.z) + (pseudoRoad(seed * 5.2) - 0.5) * 0.08,
          width: 0.08 + pseudoRoad(seed * 6.7) * 0.12,
          length: 3.4 + pseudoRoad(seed * 7.4) * 5.2,
          color: seamColor
        });
      }
    }

    this.addRoadDetailInstances('ROAD_Surface_Wear_Strips', wearStrips, this.createRoadDetailMaterial('wear', 0.28), 28);
    this.addRoadDetailInstances('ROAD_Lane_Seams', laneSeams, this.createRoadDetailMaterial('seam', 0.24), 29);
    this.detailStats = { wearStrips: wearStrips.length, laneSeams: laneSeams.length };
    this.roadGroup.userData.surfaceWearStrips = wearStrips.length;
    this.roadGroup.userData.surfaceLaneSeams = laneSeams.length;
  }

  addRoadDetailInstances(name, specs, material, renderOrder) {
    if (!specs.length) return;
    const geometry = new THREE.PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    applyWhiteVertexColors(geometry);
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = name;
    mesh.renderOrder = renderOrder;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    for (let index = 0; index < specs.length; index += 1) {
      const spec = specs[index];
      this.detailDummy.position.set(spec.x, spec.y + index * 0.00002, spec.z);
      this.detailDummy.rotation.set(0, spec.rotation, 0);
      this.detailDummy.scale.set(spec.width, 1, spec.length);
      this.detailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.detailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.roadGroup.add(mesh);
    this.detailMeshes.push(mesh);
  }

  createRoadDetailMaterial(key, opacity) {
    const cacheKey = `road-detail:${key}:${opacity}`;
    if (this.materialCache.has(cacheKey)) return this.materialCache.get(cacheKey);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -30,
      polygonOffsetUnits: -30
    });
    this.materialCache.set(cacheKey, material);
    return material;
  }

  getDetailStats() {
    const wearMesh = this.roadGroup.getObjectByName('ROAD_Surface_Wear_Strips');
    const seamMesh = this.roadGroup.getObjectByName('ROAD_Lane_Seams');
    return {
      ...this.detailStats,
      visibleWearStrips: wearMesh?.visible ? wearMesh.count || 0 : 0,
      visibleLaneSeams: seamMesh?.visible ? seamMesh.count || 0 : 0,
      visibleDetailMeshes: this.detailMeshes.filter((mesh) => mesh.visible).length
    };
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
      const inset = path.width * (path.hierarchy === 'plaza' ? 0.24 : path.hierarchy === 'dirt' ? 0.2 : 0.32);

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
          scale: path.hierarchy === 'stunt' ? 0.68 : path.hierarchy === 'bridge' ? 0.5 : 0.54,
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
      geometry: new THREE.BoxGeometry(0.24, 0.05, 0.58),
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
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -24,
      polygonOffsetUnits: -24
    });
    this.materialCache.set(key, material);
    return material;
  }

  isNear(x, z, margin = 0) {
    return Boolean(this.getSurfaceAt(x, z, margin));
  }

  getSurfaceAt(x, z, margin = 0.9) {
    let best = null;
    for (const segment of this.surfaceSegments) {
      const dx = x - segment.cx;
      const dz = z - segment.cz;
      const localX = Math.cos(segment.rotation) * dx - Math.sin(segment.rotation) * dz;
      const localZ = Math.sin(segment.rotation) * dx + Math.cos(segment.rotation) * dz;
      const halfWidth = segment.width / 2 + margin;
      const halfLength = segment.length / 2 + margin;
      if (Math.abs(localX) > halfWidth || Math.abs(localZ) > halfLength) continue;
      const lateral = Math.abs(localX) / Math.max(0.001, halfWidth);
      const longitudinal = Math.abs(localZ) / Math.max(0.001, halfLength);
      const score = segment.priority - lateral * 0.18 - longitudinal * 0.04;
      if (!best || score > best.score) {
        best = { score, path: segment.path };
      }
    }
    return best?.path || null;
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

function roadLaneEdgeColor(path) {
  if (path.hierarchy === 'security') return 0x68d8ff;
  if (path.hierarchy === 'stunt') return 0xffc0a5;
  if (path.hierarchy === 'bridge') return 0x9df7ff;
  if (path.hierarchy === 'plaza') return 0xfff3cf;
  if (path.hierarchy === 'avenue') return 0xf4ddb1;
  return 0xe8d3a0;
}

function roadVergeColor(path) {
  if (path.hierarchy === 'security') return 0x54aabc;
  if (path.hierarchy === 'stunt') return 0xb87955;
  if (path.hierarchy === 'dirt') return 0xc89a5b;
  if (path.hierarchy === 'bridge') return 0x79ffc5;
  if (path.hierarchy === 'plaza') return 0xb7ac87;
  return 0x587c4d;
}

function roadMarkerSpacing(path) {
  if (path.hierarchy === 'security' || path.hierarchy === 'stunt') return 11;
  if (path.hierarchy === 'bridge') return 8.5;
  if (path.hierarchy === 'plaza') return 12.5;
  if (path.hierarchy === 'dirt') return 16;
  if (path.hierarchy === 'avenue') return 15;
  return 13.5;
}

function roadWearColor(path) {
  if (path.hierarchy === 'security') return 0x0b1d24;
  if (path.hierarchy === 'stunt') return 0x3a211c;
  if (path.hierarchy === 'dirt') return 0x6b4828;
  if (path.hierarchy === 'plaza') return 0x7f735f;
  if (path.hierarchy === 'bridge') return 0x2e4d4b;
  return 0x202a28;
}

function roadSeamColor(path) {
  if (path.hierarchy === 'security') return 0x68d8ff;
  if (path.hierarchy === 'stunt') return 0xffc0a5;
  if (path.hierarchy === 'dirt') return 0xc9985a;
  if (path.hierarchy === 'bridge') return 0x9df7ff;
  return 0xf0d9a4;
}

function pseudoRoad(seed) {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
}

function pointKey(point) {
  return `${point[0].toFixed(2)}:${point[1].toFixed(2)}`;
}

function createJunctionConnection(point, neighbor, path) {
  const dx = neighbor[0] - point[0];
  const dz = neighbor[1] - point[1];
  const length = Math.hypot(dx, dz) || 1;
  return {
    path,
    width: path.width,
    direction: { x: dx / length, z: dz / length }
  };
}

function dominantRoadPath(paths) {
  return paths.reduce((best, path) => {
    const bestLayer = ROAD_LAYER[best.hierarchy] ?? 1;
    const pathLayer = ROAD_LAYER[path.hierarchy] ?? 1;
    if (pathLayer !== bestLayer) return pathLayer > bestLayer ? path : best;
    return path.width > best.width ? path : best;
  }, paths[0]);
}

function createJunctionBlendGeometry(point, connections, padding, y) {
  const center = { x: point[0], z: point[1] };
  const outline = [];
  for (const connection of connections) {
    const halfWidth = connection.width * 0.5 + padding;
    const reach = Math.max(connection.width * 0.72 + padding * 1.8, 4.8);
    const right = { x: connection.direction.z, z: -connection.direction.x };
    const forward = {
      x: center.x + connection.direction.x * reach,
      z: center.z + connection.direction.z * reach
    };
    outline.push({
      x: forward.x - right.x * halfWidth,
      z: forward.z - right.z * halfWidth
    });
    outline.push({
      x: forward.x + right.x * halfWidth,
      z: forward.z + right.z * halfWidth
    });
  }
  outline.sort((a, b) => Math.atan2(a.z - center.z, a.x - center.x) - Math.atan2(b.z - center.z, b.x - center.x));

  const vertices = new Float32Array((outline.length + 1) * 3);
  const uvs = new Float32Array((outline.length + 1) * 2);
  vertices[0] = center.x;
  vertices[1] = y;
  vertices[2] = center.z;
  uvs[0] = 0.5;
  uvs[1] = 0.5;
  const textureScale = 22;
  for (let i = 0; i < outline.length; i += 1) {
    const vertex = outline[i];
    const cursor = (i + 1) * 3;
    vertices[cursor] = vertex.x;
    vertices[cursor + 1] = y;
    vertices[cursor + 2] = vertex.z;
    const uvCursor = (i + 1) * 2;
    uvs[uvCursor] = 0.5 + (vertex.x - center.x) / textureScale;
    uvs[uvCursor + 1] = 0.5 + (vertex.z - center.z) / textureScale;
  }

  const indices = [];
  for (let i = 0; i < outline.length; i += 1) {
    indices.push(0, ((i + 1) % outline.length) + 1, i + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function distanceToBendSide(curve, t) {
  const previous = curve.getTangentAt(Math.max(0, t - 0.026)).normalize();
  const next = curve.getTangentAt(Math.min(1, t + 0.026)).normalize();
  const cross = previous.x * next.z - previous.z * next.x;
  if (Math.abs(cross) < 0.045) return 0;
  return cross > 0 ? -1 : 1;
}

function createChevronGeometry() {
  const bars = [
    [[0, 0.88], [-0.78, -0.5]],
    [[0, 0.88], [0.78, -0.5]]
  ];
  const halfWidth = 0.075;
  const vertices = [];
  const uvs = [];
  const indices = [];

  for (const [start, end] of bars) {
    const index = vertices.length / 3;
    const dx = end[0] - start[0];
    const dz = end[1] - start[1];
    const length = Math.hypot(dx, dz) || 1;
    const nx = -dz / length * halfWidth;
    const nz = dx / length * halfWidth;
    vertices.push(
      start[0] + nx, 0, start[1] + nz,
      start[0] - nx, 0, start[1] - nz,
      end[0] - nx, 0, end[1] - nz,
      end[0] + nx, 0, end[1] + nz
    );
    uvs.push(0, 1, 1, 1, 1, 0, 0, 0);
    indices.push(index, index + 1, index + 2, index, index + 2, index + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);
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

function createRoadSurfaceSegments(paths) {
  return paths.flatMap((path) => {
    const segments = [];
    const limit = path.closed ? path.points.length : path.points.length - 1;
    for (let index = 0; index < limit; index += 1) {
      const a = path.points[index];
      const b = path.points[(index + 1) % path.points.length];
      const dx = b[0] - a[0];
      const dz = b[1] - a[1];
      const length = Math.hypot(dx, dz);
      segments.push({
        path,
        cx: (a[0] + b[0]) / 2,
        cz: (a[1] + b[1]) / 2,
        width: path.width,
        length: length + path.width * 0.64,
        rotation: Math.atan2(dx, dz),
        priority: ROAD_LAYER[path.hierarchy] ?? 1
      });
    }
    return segments;
  });
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
