// ABOUTME: Builds the procedural toy-island terrain used by /play.
// ABOUTME: Replaces the old authored island GLB while keeping a stable visible driving floor.
import * as THREE from 'three';
import { districtFootprints, districtSurfaceBreakups, fieldMotifClusters, ISLAND_RADIUS, WORLD_HALF_SIZE, meadowDetailPatches, roadPaths, roadSegments, terrainBrushes } from './worldData.js';
import { getIslandCoastPoints, makeIslandBandGeometry, makeIslandGeometry, makePatchGeometry, pseudoRandom, WATER_Y } from './WorldMaterials.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

const DISTRICT_DETAIL_STYLES = {
  plaza: { seam: 0xe9d7ad, paver: 0x907f62, accent: 0x7cffb2 },
  campus: { seam: 0xf2dfb2, paver: 0xa98962, accent: 0x9ccfff },
  security: { seam: 0x68d8ff, paver: 0x1e4656, accent: 0xff6d8d },
  workshop: { seam: 0xffcc66, paver: 0x6a5a45, accent: 0xff9b6d },
  tower: { seam: 0xff9db0, paver: 0x7a5d68, accent: 0xff6d8d },
  archive: { seam: 0xffdf8a, paver: 0x9d875a, accent: 0xffffff },
  driving: { seam: 0xff9b6d, paver: 0x6d4a38, accent: 0xf3e7bd },
  trail: { seam: 0xc79b56, paver: 0x5f3d22, accent: 0x92ffea },
  harbor: { seam: 0xf3d19c, paver: 0x8db8b9, accent: 0x78b7ff },
  pier: { seam: 0xd49a55, paver: 0x51311d, accent: 0x79ffc5 }
};

export class Terrain {
  constructor(world) {
    this.world = world;
    this.authoredIslandLoaded = false;
    this.surfaceDetailDummy = new THREE.Object3D();
    this.reliefDummy = new THREE.Object3D();
    this.surfaceDetailStats = { districts: 0, seams: 0, pavers: 0, accents: 0, breakups: 0, opacities: {}, alphaMapped: {} };
    this.meadowDetailStats = { patches: 0, colorVariants: 0, opacity: 0, alphaMapped: false };
    this.fieldMotifEntries = [];
    this.reliefEntries = [];
    this.fieldMotifStats = {
      clusters: 0,
      berms: 0,
      ribbons: 0,
      visibleBerms: 0,
      visibleRibbons: 0,
      visibleTotal: 0,
      bermGeometryTriangles: 0,
      ribbonGeometryTriangles: 0
    };
    this.roadsideFrameEntries = [];
    this.roadsideFrameStats = {
      paths: 0,
      segments: 0,
      berms: 0,
      ribbons: 0,
      stoneTabs: 0,
      visibleBerms: 0,
      visibleRibbons: 0,
      visibleStoneTabs: 0,
      visibleTotal: 0
    };
    this.districtGroundStats = { pads: 0, edgeTrims: 0, averageOutlineVertices: 0, batchedMeshes: 0, mergedMeshes: 0 };
    this.reliefStats = { mounds: 0, cliffShelves: 0, rockOutcrops: 0, duneRidges: 0, contourBands: 0, beachRipples: 0, beachCombs: 0, interiorRidges: 0, visibleInteriorRidges: 0, batchedMeshes: 0, mergedMeshes: 0 };
    this.shorelineStats = { edgeBands: 0, foamBreaks: 0 };
  }

  build() {
    this.addBeachBase();
    this.addGrassPlateau();
    if (this.world.blockoutMode) {
      if (!this.world.foundationReplacementMode) {
        this.addDistrictGrounding();
      }
      this.addCoastalEdges();
      this.addPhysicsFloor();
      return;
    }
    this.addTerrainBrushes();
    this.addMeadowDetailPatches();
    this.addFieldMotifs();
    this.addRoadsideFrames();
    this.addDistrictGrounding();
    this.addDistrictSurfaceDetails();
    this.addScenicRelief();
    this.addCoastalEdges();
    this.addPhysicsFloor();
  }

  applyQuality() {
    const visible = this.world.landscapeQuality !== 'low';
    let visibleBerms = 0;
    let visibleRibbons = 0;
    for (const entry of this.fieldMotifEntries) {
      entry.mesh.visible = visible;
      if (!visible) continue;
      if (entry.kind === 'berm') visibleBerms += entry.count;
      if (entry.kind === 'ribbon') visibleRibbons += entry.count;
    }
    this.fieldMotifStats.visibleBerms = visibleBerms;
    this.fieldMotifStats.visibleRibbons = visibleRibbons;
    this.fieldMotifStats.visibleTotal = visibleBerms + visibleRibbons;

    let visibleRoadsideBerms = 0;
    let visibleRoadsideRibbons = 0;
    let visibleStoneTabs = 0;
    for (const entry of this.roadsideFrameEntries) {
      entry.mesh.visible = visible;
      if (!visible) continue;
      if (entry.kind === 'berm') visibleRoadsideBerms += entry.count;
      if (entry.kind === 'ribbon') visibleRoadsideRibbons += entry.count;
      if (entry.kind === 'stoneTab') visibleStoneTabs += entry.count;
    }
    this.roadsideFrameStats.visibleBerms = visibleRoadsideBerms;
    this.roadsideFrameStats.visibleRibbons = visibleRoadsideRibbons;
    this.roadsideFrameStats.visibleStoneTabs = visibleStoneTabs;
    this.roadsideFrameStats.visibleTotal = visibleRoadsideBerms + visibleRoadsideRibbons + visibleStoneTabs;

    let visibleInteriorRidges = 0;
    for (const entry of this.reliefEntries) {
      entry.mesh.visible = visible;
      if (visible && entry.kind === 'interiorRidge') visibleInteriorRidges += entry.count;
    }
    this.reliefStats.visibleInteriorRidges = visibleInteriorRidges;
  }

  addBeachBase() {
    const beach = new THREE.Mesh(makeIslandGeometry(ISLAND_RADIUS, 156, 1.02), this.world.materials.sand);
    beach.name = 'ToyIslandBeachBase';
    beach.position.y = 0.025;
    beach.receiveShadow = true;
    this.world.scene.add(beach);

    const wetEdge = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 0.985, 1.055, 156),
      this.world.materials.wetSandBlend
    );
    wetEdge.name = 'ToyIslandWetEdge';
    wetEdge.position.y = 0.042;
    wetEdge.renderOrder = 2;
    this.world.scene.add(wetEdge);
  }

  addGrassPlateau() {
    const grass = new THREE.Mesh(makeIslandGeometry(ISLAND_RADIUS, 156, 0.93), this.world.materials.ground);
    grass.name = 'ToyIslandGrassPlateau';
    grass.position.y = 0.062;
    grass.receiveShadow = true;
    this.world.scene.add(grass);
    this.world.decor.push({ type: 'ground', mesh: grass });

    const feather = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 0.865, 0.955, 156),
      this.world.materials.grassSandBlend
    );
    feather.name = 'ToyIslandGrassToBeachFeather';
    feather.position.y = 0.078;
    feather.renderOrder = 3;
    this.world.scene.add(feather);
  }

  addDistrictGrounding() {
    const group = new THREE.Group();
    group.name = 'ToyIslandDistrictGrounding';
    const materials = {
      plaza: this.world.materials.plazaRoad,
      campus: this.world.materials.paleStone,
      security: this.world.materials.securityRoad,
      workshop: this.world.materials.stoneRoad,
      tower: this.world.materials.stone,
      archive: this.world.materials.paleStone,
      driving: this.world.materials.stuntRamp,
      trail: this.world.materials.wood,
      harbor: this.world.materials.sand,
      pier: this.world.materials.wood
    };
    let padsBuilt = 0;
    let edgeTrims = 0;
    let outlineVertices = 0;

    districtFootprints.forEach((district, index) => {
      const pads = getDistrictVisualPads(district, index);
      pads.forEach((pad, padIndex) => {
        const kind = pad.kind || district.kind;
        const seed = index * 11 + padIndex + 4;
        const geometry = makeDistrictPadGeometry(pad.size[0], pad.size[1], seed);
        const patch = new THREE.Mesh(
          geometry,
          materials[kind] || this.world.materials.plazaRoad
        );
        patch.name = `ToyIslandDistrictPatch_${district.id}_${pad.id}`;
        patch.position.set(pad.center[0], 0.075 + index * 0.0008 + padIndex * 0.00018, pad.center[1]);
        patch.rotation.y = pad.rotation;
        patch.receiveShadow = true;
        patch.renderOrder = 4;
        patch.userData.batchLabel = `patch_${kind}`;
        group.add(patch);

        const edge = new THREE.Mesh(
          makeDistrictPadEdgeGeometry(pad.size[0], pad.size[1], seed, districtEdgeWidth(kind)),
          districtEdgeMaterial(this.world)
        );
        edge.name = `ToyIslandDistrictEdge_${district.id}_${pad.id}`;
        edge.position.set(pad.center[0], 0.112 + index * 0.0008 + padIndex * 0.00018, pad.center[1]);
        edge.rotation.y = pad.rotation;
        edge.receiveShadow = false;
        edge.renderOrder = 7;
        edge.userData.batchLabel = `edge_${kind}`;
        group.add(edge);

        padsBuilt += 1;
        edgeTrims += 1;
        outlineVertices += geometry.userData.outlineVertices || 0;
      });
    });
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'TERRAIN_DistrictGround',
      getBatchLabel: (object) => object.userData?.batchLabel
    });
    this.world.scene.add(group);
    this.districtGroundStats = {
      pads: padsBuilt,
      edgeTrims,
      averageOutlineVertices: Number((outlineVertices / Math.max(1, padsBuilt)).toFixed(1)),
      batchedMeshes: group.userData.staticBatchStats?.batches || 0,
      mergedMeshes: group.userData.staticBatchStats?.mergedMeshes || 0
    };
  }

  addTerrainBrushes() {
    terrainBrushes.forEach((brush, index) => {
      const material = this.world.materials[brush.material];
      if (!material) return;
      const patch = new THREE.Mesh(
        makePatchGeometry(brush.size[0], brush.size[1], index + 43),
        material
      );
      patch.name = `ToyIslandTerrainBrush_${brush.id}`;
      patch.position.set(brush.center[0], 0.066 + index * 0.0005, brush.center[1]);
      patch.rotation.y = brush.rotation || 0;
      patch.receiveShadow = false;
      patch.renderOrder = 4 + index;
      this.world.scene.add(patch);
    });
  }

  addMeadowDetailPatches() {
    const specs = meadowDetailPatches.map((patch, index) => ({
      x: patch.center[0],
      y: 0.168 + index * 0.0002,
      z: patch.center[1],
      width: patch.size[0],
      depth: patch.size[1],
      rotation: patch.rotation || 0,
      color: Number.parseInt(patch.color.slice(1), 16)
    }));
    this.addMeadowDetailInstances(specs);
    this.meadowDetailStats = {
      patches: specs.length,
      colorVariants: new Set(meadowDetailPatches.map((patch) => patch.color)).size,
      opacity: materialOpacity(this.world.materials.meadowDetail),
      alphaMapped: Boolean(this.world.materials.meadowDetail.alphaMap)
    };
  }

  addMeadowDetailInstances(specs) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(makePatchGeometry(1, 1, 91), this.world.materials.meadowDetail, specs.length);
    mesh.name = 'ToyIslandMeadowDetailPatches';
    mesh.renderOrder = 33;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, spec.y, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  addFieldMotifs() {
    const group = new THREE.Group();
    group.name = 'ToyIslandFieldMotifs';
    const berms = [];
    const ribbons = [];

    fieldMotifClusters.forEach((cluster, clusterIndex) => {
      for (let i = 0; i < (cluster.berms || 0); i += 1) {
        const point = sampleFieldCluster(cluster, i, 13.7);
        if (!this.isClearFieldMotifPoint(point.x, point.z, 2.0)) continue;
        berms.push({
          ...point,
          width: 3.8 + pseudoRandom(cluster.seed * 31 + i * 4.7) * 3.2,
          depth: 0.85 + pseudoRandom(cluster.seed * 37 + i * 5.1) * 0.85,
          height: 0.12 + pseudoRandom(cluster.seed * 41 + i * 6.3) * 0.12,
          color: colorFromCluster(cluster, clusterIndex + i)
        });
      }

      for (let i = 0; i < (cluster.ribbons || 0); i += 1) {
        const point = sampleFieldCluster(cluster, i, 29.3);
        if (!this.isClearFieldMotifPoint(point.x, point.z, 0.8)) continue;
        ribbons.push({
          ...point,
          width: 4.8 + pseudoRandom(cluster.seed * 43 + i * 4.9) * 7.5,
          depth: 0.22 + pseudoRandom(cluster.seed * 47 + i * 5.3) * 0.28,
          color: colorFromCluster(cluster, clusterIndex + i + 2)
        });
      }
    });

    this.addFieldBermInstances(group, berms);
    this.addFieldRibbonInstances(group, ribbons);
    this.world.scene.add(group);
    this.fieldMotifStats = {
      clusters: fieldMotifClusters.length,
      berms: berms.length,
      ribbons: ribbons.length,
      visibleBerms: berms.length,
      visibleRibbons: ribbons.length,
      visibleTotal: berms.length + ribbons.length,
      bermGeometryTriangles: this.fieldMotifStats.bermGeometryTriangles,
      ribbonGeometryTriangles: this.fieldMotifStats.ribbonGeometryTriangles,
      ribbonOpacity: materialOpacity(this.world.materials.fieldRibbon),
      ribbonAlphaMapped: Boolean(this.world.materials.fieldRibbon.alphaMap)
    };
    this.applyQuality();
  }

  addFieldBermInstances(group, specs) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createMoundGeometry(1, 1, 1, 157, 7, 4), this.world.materials.fieldBerm, specs.length);
    mesh.name = 'ToyIslandFieldMotif_Berms';
    mesh.receiveShadow = true;
    this.fieldMotifStats.bermGeometryTriangles = countGeometryTriangles(mesh.geometry);
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, 0.13 + index * 0.0002, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, spec.height, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.fieldMotifEntries.push({ mesh, kind: 'berm', count: specs.length });
  }

  addFieldRibbonInstances(group, specs) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createHorizontalPlaneGeometry(), this.world.materials.fieldRibbon, specs.length);
    mesh.name = 'ToyIslandFieldMotif_Ribbons';
    mesh.renderOrder = 39;
    mesh.frustumCulled = false;
    this.fieldMotifStats.ribbonGeometryTriangles = countGeometryTriangles(mesh.geometry);
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, 0.188 + index * 0.00002, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.fieldMotifEntries.push({ mesh, kind: 'ribbon', count: specs.length });
  }

  addRoadsideFrames() {
    const group = new THREE.Group();
    group.name = 'ToyIslandRoadsideFrames';
    this.roadsideFrameEntries = [];

    const berms = [];
    const ribbons = [];
    const stoneTabs = [];
    let segments = 0;

    roadPaths.forEach((path, pathIndex) => {
      const points = path.points;
      const limit = path.closed ? points.length : points.length - 1;
      for (let segmentIndex = 0; segmentIndex < limit; segmentIndex += 1) {
        const a = points[segmentIndex];
        const b = points[(segmentIndex + 1) % points.length];
        const dx = b[0] - a[0];
        const dz = b[1] - a[1];
        const length = Math.hypot(dx, dz);
        if (length < 7) continue;
        segments += 1;
        this.sampleRoadsideFrameSegment({
          path,
          pathIndex,
          segmentIndex,
          a,
          dx,
          dz,
          length,
          berms,
          ribbons,
          stoneTabs
        });
      }
    });

    this.addRoadsideBermInstances(group, berms);
    this.addRoadsideFlatInstances('ToyIslandRoadsideFrames_Ribbons', group, ribbons, this.world.materials.fieldRibbon, 0.203);
    this.addRoadsideFlatInstances('ToyIslandRoadsideFrames_StoneTabs', group, stoneTabs, this.world.materials.surfacePaver, 0.211);
    this.world.scene.add(group);

    this.roadsideFrameStats = {
      paths: roadPaths.length,
      segments,
      berms: berms.length,
      ribbons: ribbons.length,
      stoneTabs: stoneTabs.length,
      visibleBerms: berms.length,
      visibleRibbons: ribbons.length,
      visibleStoneTabs: stoneTabs.length,
      visibleTotal: berms.length + ribbons.length + stoneTabs.length,
      ribbonOpacity: materialOpacity(this.world.materials.fieldRibbon),
      ribbonAlphaMapped: Boolean(this.world.materials.fieldRibbon.alphaMap),
      stoneTabOpacity: materialOpacity(this.world.materials.surfacePaver),
      stoneTabAlphaMapped: Boolean(this.world.materials.surfacePaver.alphaMap)
    };
    this.applyQuality();
  }

  sampleRoadsideFrameSegment({ path, pathIndex, segmentIndex, a, dx, dz, length, berms, ribbons, stoneTabs }) {
    const spacing = roadsideFrameSpacing(path);
    const samples = Math.max(1, Math.floor(length / spacing));
    const angle = Math.atan2(dx, dz);
    const rightX = dz / length;
    const rightZ = -dx / length;
    const palette = roadsideFramePalette(path);

    for (let sampleIndex = 0; sampleIndex < samples; sampleIndex += 1) {
      const t = (sampleIndex + 0.5) / samples;
      const x = a[0] + dx * t;
      const z = a[1] + dz * t;
      const seed = pathIndex * 911 + segmentIndex * 101 + sampleIndex * 17;
      for (const side of [-1, 1]) {
        const sideSeed = seed + side * 19.7;
        if (pseudoRandom(sideSeed * 1.3) < 0.2) continue;
        const offset = path.width * 0.5 + roadsideFrameOffset(path) + pseudoRandom(sideSeed * 2.7) * 1.25;
        const px = x + rightX * offset * side;
        const pz = z + rightZ * offset * side;
        if (!this.containsPoint(px, pz, 12)) continue;
        if (Math.hypot(px, pz) > ISLAND_RADIUS * 0.92 && path.hierarchy !== 'avenue') continue;

        const rotation = angle + (pseudoRandom(sideSeed * 3.1) - 0.5) * 0.34;
        const color = palette[Math.floor(pseudoRandom(sideSeed * 4.3) * palette.length) % palette.length];
        ribbons.push({
          x: px,
          z: pz,
          rotation,
          width: 0.34 + pseudoRandom(sideSeed * 5.9) * 0.34,
          length: 4.8 + pseudoRandom(sideSeed * 6.7) * 6.2,
          color
        });

        if (pseudoRandom(sideSeed * 7.1) > 0.38) {
          berms.push({
            x: px + rightX * side * (0.75 + pseudoRandom(sideSeed * 7.9) * 0.7),
            z: pz + rightZ * side * (0.75 + pseudoRandom(sideSeed * 8.3) * 0.7),
            rotation,
            width: 1.2 + pseudoRandom(sideSeed * 9.7) * 0.85,
            length: 4.4 + pseudoRandom(sideSeed * 10.9) * 5.8,
            height: 0.055 + pseudoRandom(sideSeed * 11.5) * 0.075,
            color
          });
        }

        if (pseudoRandom(sideSeed * 12.3) > 0.54) {
          stoneTabs.push({
            x: x + rightX * side * (path.width * 0.5 + 0.68),
            z: z + rightZ * side * (path.width * 0.5 + 0.68),
            rotation: angle + (side > 0 ? 0.05 : -0.05),
            width: 0.62 + pseudoRandom(sideSeed * 13.1) * 0.34,
            length: 1.9 + pseudoRandom(sideSeed * 14.7) * 2.2,
            color: roadsideStoneColor(path)
          });
        }
      }
    }
  }

  addRoadsideBermInstances(group, specs) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createRoadsideMoundGeometry(), this.world.materials.fieldBerm, specs.length);
    mesh.name = 'ToyIslandRoadsideFrames_Berms';
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, 0.112 + index * 0.00002, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, spec.height, spec.length);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.roadsideFrameEntries.push({ mesh, kind: 'berm', count: specs.length });
  }

  addRoadsideFlatInstances(name, group, specs, material, y) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createHorizontalPlaneGeometry(), material, specs.length);
    mesh.name = name;
    mesh.renderOrder = 40;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, y + index * 0.00002, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.length);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.roadsideFrameEntries.push({
      mesh,
      kind: name.includes('StoneTabs') ? 'stoneTab' : 'ribbon',
      count: specs.length
    });
  }

  isClearFieldMotifPoint(x, z, roadMargin) {
    return this.containsPoint(x, z, 9) && Math.hypot(x, z) < ISLAND_RADIUS * 0.93 && !isNearRoad(x, z, roadMargin);
  }

  addDistrictSurfaceDetails() {
    const seams = [];
    const pavers = [];
    const accents = [];
    const breakups = districtSurfaceBreakups.map((patch, index) => ({
      x: patch.center[0],
      y: 0.176 + index * 0.00004,
      z: patch.center[1],
      width: patch.size[0],
      depth: patch.size[1],
      rotation: patch.rotation || 0,
      color: Number.parseInt(patch.color.slice(1), 16)
    }));

    districtFootprints.forEach((district, index) => {
      const pads = getDistrictVisualPads(district, index);

      pads.forEach((pad, padIndex) => {
        const rotation = pad.rotation;
        const style = DISTRICT_DETAIL_STYLES[pad.kind] || DISTRICT_DETAIL_STYLES[district.kind] || DISTRICT_DETAIL_STYLES.plaza;
        const width = pad.size[0];
        const depth = pad.size[1];
        const seamColumns = Math.max(2, Math.floor(width / 18));
        const seamRows = Math.max(1, Math.floor(depth / 16));
        const seed = index * 17 + padIndex + 11;

        for (let i = 1; i <= seamColumns; i += 1) {
          const localX = -width * 0.38 + (i / (seamColumns + 1)) * width * 0.76;
          seams.push(createSurfaceDetail(pad, localX, 0, 0.22, depth * 0.72, rotation, style.seam));
        }
        for (let i = 1; i <= seamRows; i += 1) {
          const localZ = -depth * 0.36 + (i / (seamRows + 1)) * depth * 0.72;
          seams.push(createSurfaceDetail(pad, 0, localZ, width * 0.7, 0.2, rotation, style.seam));
        }

        const paverColumns = Math.max(3, Math.floor(width / 18));
        for (let i = 0; i < paverColumns; i += 1) {
          const side = i % 2 === 0 ? -1 : 1;
          const localX = -width * 0.28 + (i / Math.max(1, paverColumns - 1)) * width * 0.56;
          const localZ = side * depth * (0.18 + pseudoRandom(seed * 17 + i) * 0.14);
          pavers.push(createSurfaceDetail(
            pad,
            localX,
            localZ,
            4.6 + pseudoRandom(seed * 23 + i) * 3.2,
            2.1 + pseudoRandom(seed * 29 + i) * 1.6,
            rotation + (pseudoRandom(seed * 31 + i) - 0.5) * 0.28,
            style.paver
          ));
        }

        const accentLength = Math.min(18, Math.max(10, width * 0.24));
        accents.push(createSurfaceDetail(pad, -width * 0.32, depth * 0.26, accentLength, 0.34, rotation + 0.42, style.accent));
        accents.push(createSurfaceDetail(pad, width * 0.3, -depth * 0.22, accentLength * 0.72, 0.34, rotation - 0.38, style.accent));
      });
    });

    this.addSurfaceDetailInstances('ToyIslandSurface_Seams', seams, this.world.materials.surfaceSeam, 36);
    this.addSurfaceDetailInstances('ToyIslandSurface_Pavers', [...pavers, ...breakups], this.world.materials.surfacePaver, 35);
    this.addSurfaceDetailInstances('ToyIslandSurface_Accents', accents, this.world.materials.surfaceAccent, 37);
    this.surfaceDetailStats = {
      districts: districtFootprints.length,
      seams: seams.length,
      pavers: pavers.length,
      accents: accents.length,
      breakups: breakups.length,
      opacities: {
        seam: materialOpacity(this.world.materials.surfaceSeam),
        paver: materialOpacity(this.world.materials.surfacePaver),
        accent: materialOpacity(this.world.materials.surfaceAccent)
      },
      alphaMapped: {
        seam: Boolean(this.world.materials.surfaceSeam.alphaMap),
        paver: Boolean(this.world.materials.surfacePaver.alphaMap),
        accent: Boolean(this.world.materials.surfaceAccent.alphaMap)
      }
    };
  }

  addScenicRelief() {
    const group = new THREE.Group();
    group.name = 'ToyIslandScenicRelief';
    const mounds = [
      { x: 22, z: 130, width: 72, depth: 15, height: 1.05, rotation: 0.18, material: this.world.materials.meadowLight, seed: 3 },
      { x: -116, z: 106, width: 46, depth: 13, height: 0.82, rotation: -0.42, material: this.world.materials.meadowDark, seed: 9 },
      { x: 116, z: 92, width: 48, depth: 12, height: 0.76, rotation: 0.62, material: this.world.materials.meadowLight, seed: 13 },
      { x: -132, z: -42, width: 42, depth: 14, height: 0.88, rotation: 0.12, material: this.world.materials.meadowDark, seed: 19 },
      { x: 110, z: -128, width: 58, depth: 14, height: 0.9, rotation: -0.48, material: this.world.materials.meadowLight, seed: 23 },
      { x: -44, z: -146, width: 62, depth: 12, height: 0.78, rotation: 0.24, material: this.world.materials.meadowDark, seed: 29 }
    ];
    for (const spec of mounds) {
      const mound = new THREE.Mesh(createMoundGeometry(spec.width, spec.depth, spec.height, spec.seed), spec.material);
      mound.name = 'TerrainRelief_Mound';
      mound.position.set(spec.x, 0.08, spec.z);
      mound.rotation.y = spec.rotation;
      mound.receiveShadow = true;
      mound.userData.batchLabel = spec.material === this.world.materials.meadowDark ? 'mound_dark' : 'mound_light';
      group.add(mound);
    }

    const cliffShelves = [
      { x: 146, z: 45, width: 22, depth: 4.5, rotation: 0.9 },
      { x: 126, z: -126, width: 28, depth: 4.2, rotation: -0.42 },
      { x: -150, z: 42, width: 26, depth: 4.6, rotation: -0.95 },
      { x: -112, z: -124, width: 24, depth: 4.4, rotation: 0.54 },
      { x: 4, z: 151, width: 34, depth: 4.8, rotation: 0.08 },
      { x: 66, z: -148, width: 24, depth: 4.0, rotation: -0.22 }
    ];
    for (const spec of cliffShelves) {
      const shelf = new THREE.Mesh(createShelfGeometry(spec.width, spec.depth), this.world.materials.cliff);
      shelf.name = 'TerrainRelief_CliffShelf';
      shelf.position.set(spec.x, 0.32, spec.z);
      shelf.rotation.y = spec.rotation;
      shelf.receiveShadow = true;
      shelf.userData.batchLabel = 'cliff_shelf';
      group.add(shelf);
    }

    const duneRidges = [
      { x: 94, z: -141, width: 30, depth: 3.2, rotation: -0.36 },
      { x: -78, z: -145, width: 28, depth: 3.0, rotation: 0.22 },
      { x: -143, z: 4, width: 26, depth: 3.2, rotation: 1.42 },
      { x: 144, z: 18, width: 24, depth: 3.0, rotation: -1.28 },
      { x: 44, z: 144, width: 30, depth: 3.1, rotation: 0.36 },
      { x: -38, z: 145, width: 26, depth: 3.0, rotation: -0.26 }
    ];
    for (const spec of duneRidges) {
      const ridge = new THREE.Mesh(createDuneRidgeGeometry(spec.width, spec.depth), this.world.materials.sand);
      ridge.name = 'TerrainRelief_DuneRidge';
      ridge.position.set(spec.x, 0.18, spec.z);
      ridge.rotation.y = spec.rotation;
      ridge.receiveShadow = true;
      ridge.userData.batchLabel = 'dune_ridge';
      group.add(ridge);
    }

    this.addInteriorLandformRidges(group);
    this.addContourBands(group);
    this.addBeachRipples(group);
    this.addRockOutcrops(group);
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'TERRAIN_Relief',
      shouldSkip: (object) => object.isInstancedMesh,
      getBatchLabel: (object) => object.userData?.batchLabel
    });
    this.world.scene.add(group);
    this.reliefStats = {
      mounds: mounds.length,
      cliffShelves: cliffShelves.length,
      rockOutcrops: group.userData.rockOutcrops || 0,
      duneRidges: duneRidges.length,
      contourBands: group.userData.contourBands || 0,
      beachRipples: group.userData.beachRipples || 0,
      beachCombs: group.userData.beachCombs || 0,
      interiorRidges: group.userData.interiorRidges || 0,
      visibleInteriorRidges: group.userData.interiorRidges || 0,
      batchedMeshes: group.userData.staticBatchStats?.batches || 0,
      mergedMeshes: group.userData.staticBatchStats?.mergedMeshes || 0
    };
    this.applyQuality();
  }

  addInteriorLandformRidges(group) {
    const candidates = [
      { x: -37, z: 55, width: 34, depth: 7.5, height: 0.27, rotation: -0.2, color: 0x8fc674 },
      { x: 18, z: 70, width: 42, depth: 8.2, height: 0.3, rotation: 0.18, color: 0xd7c36a },
      { x: 46, z: -4, width: 32, depth: 6.8, height: 0.24, rotation: -0.34, color: 0x84d7bd },
      { x: 104, z: -4, width: 38, depth: 7.2, height: 0.27, rotation: -0.26, color: 0x78b7ff },
      { x: 100, z: 34, width: 32, depth: 6.6, height: 0.24, rotation: 0.42, color: 0xffcc66 },
      { x: 108, z: 83, width: 34, depth: 7.1, height: 0.25, rotation: 0.24, color: 0x84d7bd },
      { x: 30, z: -128, width: 38, depth: 7.5, height: 0.29, rotation: -0.44, color: 0xff9b6d },
      { x: 96, z: -85, width: 36, depth: 7.2, height: 0.28, rotation: -0.24, color: 0xff9b6d },
      { x: 84, z: -108, width: 34, depth: 7.0, height: 0.27, rotation: 0.22, color: 0xc79b56 },
      { x: -10, z: -78, width: 34, depth: 7.0, height: 0.26, rotation: 0.16, color: 0xd8b6ff },
      { x: -95, z: -104, width: 38, depth: 7.4, height: 0.29, rotation: -0.28, color: 0x92ffea },
      { x: -53, z: -133, width: 34, depth: 6.8, height: 0.23, rotation: -0.12, color: 0xc79b56 },
      { x: -134, z: -50, width: 30, depth: 6.4, height: 0.27, rotation: 0.48, color: 0x68d8ff },
      { x: -88, z: 94, width: 34, depth: 6.8, height: 0.24, rotation: 0.22, color: 0xf0aeb6 },
      { x: -136, z: 36, width: 30, depth: 6.5, height: 0.23, rotation: -0.5, color: 0x79ffc5 },
      { x: 6, z: 116, width: 36, depth: 6.8, height: 0.25, rotation: -0.18, color: 0xff6d8d },
      { x: -48, z: 24, width: 30, depth: 6.6, height: 0.24, rotation: 0.26, color: 0xffdf8a }
    ];
    const specs = candidates.filter((spec) => this.containsPoint(spec.x, spec.z, 14) && !isNearRoad(spec.x, spec.z, spec.roadMargin || 5.5));
    if (!specs.length) return;

    const mesh = new THREE.InstancedMesh(createMoundGeometry(1, 1, 1, 211, 7, 4), this.world.materials.fieldBerm, specs.length);
    mesh.name = 'TerrainRelief_InteriorRidges';
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.reliefDummy.position.set(spec.x, 0.102 + index * 0.00004, spec.z);
      this.reliefDummy.rotation.set(0, spec.rotation, 0);
      this.reliefDummy.scale.set(spec.width, spec.height, spec.depth);
      this.reliefDummy.updateMatrix();
      mesh.setMatrixAt(index, this.reliefDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.reliefEntries.push({ mesh, kind: 'interiorRidge', count: specs.length });
    group.userData.interiorRidges = specs.length;
  }

  addContourBands(group) {
    const specs = [];
    for (let attempt = 0; attempt < 180 && specs.length < 48; attempt += 1) {
      const seed = attempt + 37;
      const radius = (0.2 + pseudoRandom(seed * 3.1) * 0.62) * ISLAND_RADIUS;
      const angle = pseudoRandom(seed * 5.7) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (Math.hypot(x, z) > ISLAND_RADIUS * 0.82) continue;
      if (isNearRoad(x, z, 9.5)) continue;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5 + (pseudoRandom(seed * 11.2) - 0.5) * 0.72,
        width: 0.55 + pseudoRandom(seed * 13.4) * 0.34,
        length: 7.5 + pseudoRandom(seed * 17.9) * 14
      });
    }
    const material = new THREE.MeshBasicMaterial({
      color: 0x1d4b2c,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -34,
      polygonOffsetUnits: -34
    });
    const mesh = this.addFlatDetailInstances('TerrainRelief_ContourBands', specs, material, 0.184);
    group.add(mesh);
    group.userData.contourBands = specs.length;
  }

  addBeachRipples(group) {
    const specs = [];
    for (let i = 0; i < 64; i += 1) {
      const angle = (i / 64) * Math.PI * 2 + pseudoRandom(i * 5.6) * 0.055;
      const radius = ISLAND_RADIUS * (0.89 + pseudoRandom(i * 7.4) * 0.08);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (isNearRoad(x, z, 2.8)) continue;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5,
        width: 0.18 + pseudoRandom(i * 11.1) * 0.16,
        length: 4.2 + pseudoRandom(i * 13.8) * 7.6
      });
    }
    const combs = this.createBeachCombSpecs();
    specs.push(...combs);
    const material = new THREE.MeshBasicMaterial({
      color: 0x946638,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -35,
      polygonOffsetUnits: -35
    });
    const mesh = this.addFlatDetailInstances('TerrainRelief_BeachRipples', specs, material, 0.19);
    group.add(mesh);
    group.userData.beachRipples = specs.length - combs.length;
    group.userData.beachCombs = combs.length;
  }

  createBeachCombSpecs() {
    const clusters = [
      { center: [148, -6], size: [24, 74], rotation: -Math.PI / 2, count: 32, seed: 19 },
      { center: [22, -149], size: [106, 24], rotation: 0.05, count: 34, seed: 31 },
      { center: [-148, 12], size: [22, 76], rotation: Math.PI / 2, count: 24, seed: 43 },
      { center: [12, 148], size: [78, 22], rotation: -0.08, count: 22, seed: 59 }
    ];
    const specs = [];
    for (const cluster of clusters) {
      for (let i = 0; i < cluster.count; i += 1) {
        const seed = cluster.seed + i * 7.31;
        const localX = (pseudoRandom(seed) - 0.5) * cluster.size[0];
        const localZ = (pseudoRandom(seed * 1.67) - 0.5) * cluster.size[1];
        const cos = Math.cos(cluster.rotation);
        const sin = Math.sin(cluster.rotation);
        const x = cluster.center[0] + localX * cos + localZ * sin;
        const z = cluster.center[1] - localX * sin + localZ * cos;
        if (!this.containsPoint(x, z, 2.5)) continue;
        if (isNearRoad(x, z, 3.2)) continue;
        specs.push({
          x,
          z,
          rotation: cluster.rotation + (pseudoRandom(seed * 2.13) - 0.5) * 0.28,
          width: 0.1 + pseudoRandom(seed * 3.17) * 0.13,
          length: 3.2 + pseudoRandom(seed * 5.11) * 4.8
        });
      }
    }
    return specs;
  }

  addFlatDetailInstances(name, specs, material, y) {
    const mesh = new THREE.InstancedMesh(createHorizontalPlaneGeometry(), material, specs.length);
    mesh.name = name;
    mesh.renderOrder = 38;
    specs.forEach((spec, index) => {
      this.reliefDummy.position.set(spec.x, y, spec.z);
      this.reliefDummy.rotation.set(0, spec.rotation, 0);
      this.reliefDummy.scale.set(spec.width, 1, spec.length);
      this.reliefDummy.updateMatrix();
      mesh.setMatrixAt(index, this.reliefDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    return mesh;
  }

  addRockOutcrops(group) {
    const specs = [
      [142, 64, 0.9, 0.82],
      [150, 20, -0.2, 0.72],
      [130, -132, 0.4, 0.86],
      [88, -151, -0.5, 0.7],
      [-96, -145, 0.8, 0.76],
      [-145, -62, -0.3, 0.82],
      [-151, 24, 0.5, 0.72],
      [-130, 102, -0.7, 0.8],
      [-18, 150, 0.2, 0.74],
      [54, 148, -0.2, 0.7],
      [121, 121, 0.64, 0.78],
      [-142, 74, -0.55, 0.7]
    ];
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const mesh = new THREE.InstancedMesh(geometry, this.world.materials.cliff, specs.length);
    mesh.name = 'TerrainRelief_RockOutcrops';
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    specs.forEach(([x, z, rotation, scale], index) => {
      this.reliefDummy.position.set(x, 0.72 * scale, z);
      this.reliefDummy.rotation.set(0.18 + index * 0.05, rotation, -0.08 + index * 0.03);
      this.reliefDummy.scale.set(scale * 2.8, scale * 0.92, scale * 1.9);
      this.reliefDummy.updateMatrix();
      mesh.setMatrixAt(index, this.reliefDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    group.add(mesh);
    group.userData.rockOutcrops = specs.length;
  }

  addSurfaceDetailInstances(name, specs, material, renderOrder) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createHorizontalPlaneGeometry(), material, specs.length);
    mesh.name = name;
    mesh.renderOrder = renderOrder;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, spec.y, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  addCoastalEdges() {
    const cliff = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 1.025, 1.052, 156),
      this.world.materials.shoreCliff
    );
    cliff.name = 'ToyIslandLowCliffEdge';
    cliff.position.y = WATER_Y + 0.33;
    cliff.receiveShadow = true;
    this.world.scene.add(cliff);
    this.addShorelineFoamBreaks();
    this.shorelineStats.edgeBands = 1;
  }

  addShorelineFoamBreaks() {
    const coastPoints = getIslandCoastPoints(ISLAND_RADIUS, 1.012, 156);
    const specs = [];
    for (let i = 0; i < 72; i += 1) {
      const angle = (i / 72) * Math.PI * 2;
      const pointIndex = Math.round((angle / (Math.PI * 2)) * coastPoints.length) % coastPoints.length;
      const [x, z] = coastPoints[pointIndex];
      if (isNearRoad(x, z, 3.8) && i % 3 !== 0) continue;
      const jitter = pseudoRandom(i * 9.73) - 0.5;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5 + jitter * 0.42,
        width: 0.08 + pseudoRandom(i * 13.1) * 0.08,
        length: 1.8 + pseudoRandom(i * 17.7) * 2.2
      });
    }
    const material = this.world.materials.foam.clone();
    material.opacity = 0.22;
    material.side = THREE.DoubleSide;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -42;
    material.polygonOffsetUnits = -42;
    const mesh = this.addFlatDetailInstances('ToyIslandShorelineFoamBreaks', specs, material, 0.118);
    this.world.scene.add(mesh);
    this.shorelineStats.foamBreaks = specs.length;
  }

  addPhysicsFloor() {
    if (this.world.foundationReplacementMode) {
      const { vertices, indices } = makeIslandTopColliderMesh(ISLAND_RADIUS, 1.01, 112, 0.04);
      this.world.physics.createFixedTrimesh([0, 0, 0], vertices, indices, {
        debugName: 'ToyIslandTerrainCollider',
        visualName: 'ToyIslandGrassPlateau',
        friction: 1.08,
        restitution: 0.01
      });
      return;
    }

    const { vertices, indices } = makeIslandColliderMesh(ISLAND_RADIUS, 1.01, 112, 0.04, -0.95);

    this.world.physics.createFixedTrimesh([0, 0, 0], vertices, indices, {
      debugName: 'ToyIslandTerrainCollider',
      visualName: 'ToyIslandGrassPlateau',
      friction: 1.08,
      restitution: 0.01
    });
  }

  containsPoint(x, z, margin = 0) {
    return Math.hypot(x, z) <= ISLAND_RADIUS - margin;
  }

  getReliefStats() {
    return { ...this.reliefStats };
  }

  getMeadowDetailStats() {
    return { ...this.meadowDetailStats };
  }

  getFieldMotifStats() {
    return { ...this.fieldMotifStats };
  }

  getRoadsideFrameStats() {
    return { ...this.roadsideFrameStats };
  }

  getDistrictGroundStats() {
    return { ...this.districtGroundStats };
  }

  getShorelineStats() {
    return { ...this.shorelineStats };
  }
}

function makeIslandColliderMesh(radius, scale, segments, topY, bottomY) {
  const points = getIslandCoastPoints(radius, scale, segments);
  const vertices = new Float32Array((2 + points.length * 2) * 3);
  writeVertex(vertices, 0, 0, topY, 0);
  writeVertex(vertices, 1, 0, bottomY, 0);

  for (let i = 0; i < points.length; i += 1) {
    const [x, z] = points[i];
    writeVertex(vertices, 2 + i, x, topY, z);
    writeVertex(vertices, 2 + points.length + i, x, bottomY, z);
  }

  const indices = new Uint32Array(points.length * 12);
  let cursor = 0;
  for (let i = 0; i < points.length; i += 1) {
    const next = (i + 1) % points.length;
    const topCurrent = 2 + i;
    const topNext = 2 + next;
    const bottomCurrent = 2 + points.length + i;
    const bottomNext = 2 + points.length + next;

    indices[cursor++] = 0;
    indices[cursor++] = topNext;
    indices[cursor++] = topCurrent;

    indices[cursor++] = 1;
    indices[cursor++] = bottomCurrent;
    indices[cursor++] = bottomNext;

    indices[cursor++] = topCurrent;
    indices[cursor++] = topNext;
    indices[cursor++] = bottomNext;

    indices[cursor++] = topCurrent;
    indices[cursor++] = bottomNext;
    indices[cursor++] = bottomCurrent;
  }
  return { vertices, indices };
}

function makeIslandTopColliderMesh(radius, scale, segments, topY) {
  const points = getIslandCoastPoints(radius, scale, segments);
  const vertices = new Float32Array((1 + points.length) * 3);
  writeVertex(vertices, 0, 0, topY, 0);

  for (let i = 0; i < points.length; i += 1) {
    const [x, z] = points[i];
    writeVertex(vertices, 1 + i, x, topY, z);
  }

  const indices = new Uint32Array(points.length * 3);
  let cursor = 0;
  for (let i = 0; i < points.length; i += 1) {
    const next = (i + 1) % points.length;
    indices[cursor++] = 0;
    indices[cursor++] = 1 + next;
    indices[cursor++] = 1 + i;
  }
  return { vertices, indices };
}

function writeVertex(vertices, index, x, y, z) {
  const cursor = index * 3;
  vertices[cursor] = x;
  vertices[cursor + 1] = y;
  vertices[cursor + 2] = z;
}

function getDistrictVisualPads(district, index) {
  const defaultRotation = district.rotation ?? ((index % 3 - 1) * 0.08);
  const pads = district.visualPads?.length ? district.visualPads : [{ id: 'main', center: district.center, size: district.size }];
  return pads.map((pad) => ({
    id: pad.id,
    center: pad.center || district.center,
    size: pad.size || district.size,
    kind: pad.kind || district.kind,
    rotation: pad.rotation ?? defaultRotation
  }));
}

function makeDistrictPadGeometry(width, depth, seed) {
  const points = createDistrictPadPoints(width, depth, seed, 0);
  const shape = makeShapeFromPoints(points);
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  geometry.userData.outlineVertices = points.length;
  return geometry;
}

function makeDistrictPadEdgeGeometry(width, depth, seed, thickness) {
  const outer = createDistrictPadPoints(width + thickness * 1.2, depth + thickness * 1.2, seed + 0.17, thickness * 0.24);
  const inner = createDistrictPadPoints(
    Math.max(1, width - thickness * 1.85),
    Math.max(1, depth - thickness * 1.85),
    seed + 0.17,
    -thickness * 0.14
  );
  const shape = makeShapeFromPoints(outer);
  const hole = new THREE.Path();
  [...inner].reverse().forEach(([x, z], index) => {
    if (index === 0) hole.moveTo(x, z);
    else hole.lineTo(x, z);
  });
  hole.closePath();
  shape.holes.push(hole);
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  geometry.userData.outlineVertices = outer.length;
  return geometry;
}

function createDistrictPadPoints(width, depth, seed, expansion) {
  const halfWidth = Math.max(0.5, width * 0.5 + expansion);
  const halfDepth = Math.max(0.5, depth * 0.5 + expansion);
  const chipBase = Math.max(0.52, Math.min(width, depth) * 0.07);
  const chip = (offset, scale = 1) => chipBase * scale * (0.52 + pseudoRandom(seed * 97 + offset * 13.17) * 0.74);

  return [
    [-halfWidth + chip(1), -halfDepth],
    [-halfWidth * 0.42, -halfDepth + chip(2, 0.22)],
    [0, -halfDepth - chip(3, 0.12)],
    [halfWidth * 0.42, -halfDepth + chip(4, 0.18)],
    [halfWidth - chip(5), -halfDepth],
    [halfWidth, -halfDepth + chip(6)],
    [halfWidth - chip(7, 0.18), -halfDepth * 0.36],
    [halfWidth + chip(8, 0.11), 0],
    [halfWidth - chip(9, 0.18), halfDepth * 0.38],
    [halfWidth, halfDepth - chip(10)],
    [halfWidth - chip(11), halfDepth],
    [halfWidth * 0.34, halfDepth - chip(12, 0.2)],
    [0, halfDepth + chip(13, 0.13)],
    [-halfWidth * 0.44, halfDepth - chip(14, 0.2)],
    [-halfWidth + chip(15), halfDepth],
    [-halfWidth, halfDepth - chip(16)],
    [-halfWidth + chip(17, 0.2), halfDepth * 0.32],
    [-halfWidth - chip(18, 0.1), 0],
    [-halfWidth + chip(19, 0.2), -halfDepth * 0.38],
    [-halfWidth, -halfDepth + chip(20)]
  ];
}

function makeShapeFromPoints(points) {
  const shape = new THREE.Shape();
  points.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(x, z);
    else shape.lineTo(x, z);
  });
  shape.closePath();
  return shape;
}

function districtEdgeWidth(kind) {
  if (kind === 'security') return 1.7;
  if (kind === 'driving') return 1.45;
  if (kind === 'trail' || kind === 'pier') return 1.25;
  return 1.35;
}

function districtEdgeMaterial(world) {
  return world.materials.roadCurb;
}

function createSurfaceDetail(district, localX, localZ, width, depth, rotation, color) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    x: district.center[0] + localX * cos + localZ * sin,
    y: 0.172,
    z: district.center[1] - localX * sin + localZ * cos,
    width,
    depth,
    rotation,
    color
  };
}

function sampleFieldCluster(cluster, index, channel) {
  const seed = (cluster.seed || 1) * channel + index * 17.31;
  const localX = (pseudoRandom(seed) - 0.5) * cluster.size[0];
  const localZ = (pseudoRandom(seed * 1.73) - 0.5) * cluster.size[1];
  const rotation = cluster.rotation || 0;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    x: cluster.center[0] + localX * cos + localZ * sin,
    z: cluster.center[1] - localX * sin + localZ * cos,
    rotation: rotation + (pseudoRandom(seed * 2.17) - 0.5) * 0.8
  };
}

function colorFromCluster(cluster, index) {
  const palette = cluster.palette?.length ? cluster.palette : ['#7cffb2'];
  return Number.parseInt(palette[index % palette.length].slice(1), 16);
}

function roadsideFrameSpacing(path) {
  if (path.hierarchy === 'avenue') return 15;
  if (path.hierarchy === 'security') return 12;
  if (path.hierarchy === 'stunt') return 12.5;
  if (path.hierarchy === 'plaza') return 12.5;
  if (path.hierarchy === 'dirt') return 13.5;
  if (path.hierarchy === 'bridge') return 11;
  return 13;
}

function roadsideFrameOffset(path) {
  if (path.hierarchy === 'avenue') return 2.1;
  if (path.hierarchy === 'security') return 1.85;
  if (path.hierarchy === 'stunt') return 2;
  if (path.hierarchy === 'dirt') return 2.35;
  if (path.hierarchy === 'bridge') return 1.55;
  return 1.75;
}

function roadsideFramePalette(path) {
  if (path.hierarchy === 'security') return [0x35666d, 0x68d8ff, 0x2f5753];
  if (path.hierarchy === 'stunt') return [0x7a5b46, 0xff9b6d, 0x5e7c42];
  if (path.hierarchy === 'dirt') return [0x9b6f3d, 0xc79b56, 0x77b85a];
  if (path.hierarchy === 'bridge') return [0x79ffc5, 0x8db8b9, 0xf3d19c];
  if (path.hierarchy === 'plaza') return [0xb7ac87, 0xf2dfb2, 0x8fc674];
  if (path.hierarchy === 'avenue') return [0x587c4d, 0x8fc674, 0xd7c36a];
  return [0x5f7f43, 0x84d7bd, 0xc79b56];
}

function roadsideStoneColor(path) {
  if (path.hierarchy === 'security') return 0x68d8ff;
  if (path.hierarchy === 'stunt') return 0xff9b6d;
  if (path.hierarchy === 'dirt') return 0xc79b56;
  if (path.hierarchy === 'bridge') return 0x79ffc5;
  if (path.hierarchy === 'plaza') return 0xf2dfb2;
  return 0xe8d3a0;
}

function materialOpacity(material) {
  return Number((material?.opacity ?? 0).toFixed(3));
}

function createHorizontalPlaneGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -0.5, 0, -0.5,
    0.5, 0, -0.5,
    0.5, 0, 0.5,
    -0.5, 0, 0.5
  ]), 3));
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

function isNearRoad(x, z, margin) {
  return roadSegments.some(([cx, cz, width, length, rotation]) => {
    const dx = x - cx;
    const dz = z - cz;
    const localX = Math.cos(rotation) * dx - Math.sin(rotation) * dz;
    const localZ = Math.sin(rotation) * dx + Math.cos(rotation) * dz;
    return Math.abs(localX) <= width / 2 + margin && Math.abs(localZ) <= length / 2 + margin;
  });
}

function createMoundGeometry(width, depth, height, seed, columns = 9, rows = 5) {
  const vertices = [];
  const uvs = [];
  const indices = [];
  for (let row = 0; row < rows; row += 1) {
    const v = row / (rows - 1);
    const z = (v - 0.5) * depth;
    for (let column = 0; column < columns; column += 1) {
      const u = column / (columns - 1);
      const x = (u - 0.5) * width;
      const nx = Math.abs(u - 0.5) * 2;
      const nz = Math.abs(v - 0.5) * 2;
      const falloff = Math.max(0, 1 - Math.pow(nx, 2.2)) * Math.max(0, 1 - Math.pow(nz, 1.65));
      const noise = 0.86 + pseudoRandom(seed * 17 + column * 11.3 + row * 7.1) * 0.22;
      vertices.push(x, falloff * height * noise, z);
      uvs.push(u, v);
    }
  }
  for (let row = 0; row < rows - 1; row += 1) {
    for (let column = 0; column < columns - 1; column += 1) {
      const a = row * columns + column;
      const b = a + 1;
      const c = a + columns;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function countGeometryTriangles(geometry) {
  if (geometry.index) return geometry.index.count / 3;
  return (geometry.getAttribute('position')?.count || 0) / 3;
}

function createShelfGeometry(width, depth) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const vertices = new Float32Array([
    -halfWidth, 0.28, -halfDepth,
    halfWidth, 0.22, -halfDepth,
    halfWidth * 0.92, -0.3, halfDepth,
    -halfWidth * 0.92, -0.24, halfDepth,
    -halfWidth * 0.82, 0.62, -halfDepth * 0.28,
    halfWidth * 0.78, 0.54, -halfDepth * 0.22
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 4,
    1, 5, 4,
    0, 2, 1,
    0, 3, 2,
    3, 4, 5,
    3, 5, 2,
    0, 4, 3,
    1, 2, 5
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function createDuneRidgeGeometry(width, depth) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const vertices = new Float32Array([
    -halfWidth, 0, -halfDepth,
    halfWidth, 0, -halfDepth,
    halfWidth, 0, halfDepth,
    -halfWidth, 0, halfDepth,
    0, 0.58, 0
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4,
    0, 3, 2,
    0, 2, 1
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function createRoadsideMoundGeometry() {
  const vertices = new Float32Array([
    -0.5, 0, -0.5,
    0.5, 0, -0.5,
    0.5, 0, 0.5,
    -0.5, 0, 0.5,
    0, 1, 0
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4,
    0, 3, 2,
    0, 2, 1
  ]);
  geometry.computeVertexNormals();
  return geometry;
}
