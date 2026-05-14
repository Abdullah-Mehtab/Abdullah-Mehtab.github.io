import * as THREE from 'three';
import {
  boostPads,
  canalSegments,
  circuitCheckpoints,
  districtFootprints,
  ISLAND_RADIUS,
  roadPaths,
  roadSegments,
  scenicPropZones,
  WORLD_HALF_SIZE,
  worldZones
} from './worldData.js';

const WATER_Y = -0.18;
const ROAD_LINE_COLOR = 0x68d8ff;
const tmpColor = new THREE.Color();
const QUALITY_PROFILES = {
  low: { trees: 42, grassTufts: 80, petals: 70, clouds: 10, streetProps: 30 },
  medium: { trees: 72, grassTufts: 170, petals: 170, clouds: 18, streetProps: 56 },
  high: { trees: 108, grassTufts: 320, petals: 360, clouds: 30, streetProps: 88 }
};
const QUALITY_ORDER = ['low', 'medium', 'high'];
const ROAD_STYLE = {
  ring: { shoulder: 0.62, sidewalk: 0, line: 0xffdf8a },
  boulevard: { shoulder: 0.68, sidewalk: 0, line: 0x7cffb2 },
  canal: { shoulder: 0.56, sidewalk: 0, line: 0x68d8ff },
  avenue: { shoulder: 0.58, sidewalk: 0, line: 0x9ccfff },
  street: { shoulder: 0.5, sidewalk: 0, line: 0xd8ff92 },
  stunt: { shoulder: 0.6, sidewalk: 0, line: 0xff9b6d },
  dirt: { shoulder: 0.72, sidewalk: 0, line: 0xc79b56 },
  bridge: { shoulder: 0.62, sidewalk: 0, line: 0xe6f3ff }
};

export class World {
  constructor({ scene, physics, resumeData, environmentAssets }) {
    this.scene = scene;
    this.physics = physics;
    this.resumeData = resumeData;
    this.environmentAssets = environmentAssets;
    this.zones = [];
    this.decor = [];
    this.particles = [];
    this.boostPads = [];
    this.ramps = [];
    this.collectibles = [];
    this.potatoes = [];
    this.materials = {};
    this.landscapeQuality = this.readLandscapeQuality();
    this.sakuraTrees = [];
    this.grassTufts = [];
    this.petals = null;
    this.circuit = {
      active: false,
      startedAt: 0,
      checkpoint: 0,
      best: Number(localStorage.getItem('portfolio-drive-best-lap') || 0)
    };
    this.build();
  }

  build() {
    this.createMaterials();
    this.createSky();
    this.createGround();
    this.createIslandBoundary();
    this.createRoads();
    this.createCircuit();
    this.createZones();
    this.createRampsAndPads();
    this.createProps();
    this.createCollectibles();
    this.createAtmosphere();
  }

  cloneEnvironmentAsset(name) {
    return this.environmentAssets?.clone?.(name) || null;
  }

  readLandscapeQuality() {
    const saved = localStorage.getItem('portfolio-drive-landscape-quality');
    return QUALITY_PROFILES[saved] ? saved : 'medium';
  }

  getQualityProfile() {
    return QUALITY_PROFILES[this.landscapeQuality] || QUALITY_PROFILES.medium;
  }

  setLandscapeQuality(quality) {
    if (!QUALITY_PROFILES[quality]) return this.landscapeQuality;
    this.landscapeQuality = quality;
    localStorage.setItem('portfolio-drive-landscape-quality', quality);
    this.applyLandscapeQuality();
    return this.landscapeQuality;
  }

  cycleLandscapeQuality() {
    const current = QUALITY_ORDER.indexOf(this.landscapeQuality);
    const next = QUALITY_ORDER[(current + 1) % QUALITY_ORDER.length];
    return this.setLandscapeQuality(next);
  }

  applyLandscapeQuality() {
    const profile = this.getQualityProfile();
    if (this.petals?.geometry) {
      this.petals.geometry.setDrawRange(0, profile.petals);
      this.petals.mesh.visible = profile.petals > 0;
    }
    for (let i = 0; i < this.grassTufts.length; i += 1) {
      this.grassTufts[i].mesh.visible = i < profile.grassTufts;
    }
  }

  createMaterials() {
    const grassTexture = makeNoiseTexture(['#285c2f', '#31723a', '#1f4a29', '#3d8243'], 256, 4600);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(28, 28);
    const roadTexture = makeRoadTexture();
    roadTexture.wrapS = THREE.RepeatWrapping;
    roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set(1, 18);
    const sandTexture = makeNoiseTexture(['#a98b61', '#bd9f70', '#8d724f', '#d0b17c'], 192, 1200);
    sandTexture.wrapS = THREE.RepeatWrapping;
    sandTexture.wrapT = THREE.RepeatWrapping;
    sandTexture.repeat.set(10, 10);
    const patchAlpha = makePatchAlphaTexture();

    this.materials.ground = new THREE.MeshStandardMaterial({
      color: 0x4f9b45,
      map: grassTexture,
      roughness: 0.94,
      metalness: 0.01
    });
    this.materials.road = new THREE.MeshStandardMaterial({ color: 0x3d4748, map: roadTexture, roughness: 0.86, metalness: 0.03 });
    this.materials.roadLine = new THREE.MeshBasicMaterial({ color: ROAD_LINE_COLOR, transparent: true, opacity: 0.46 });
    this.materials.dark = new THREE.MeshStandardMaterial({ color: 0x09121d, roughness: 0.55, metalness: 0.25 });
    this.materials.edge = new THREE.MeshStandardMaterial({ color: 0x0b1722, roughness: 0.7, metalness: 0.18 });
    this.materials.sand = new THREE.MeshStandardMaterial({ color: 0xb19163, map: sandTexture, roughness: 0.96, metalness: 0.01 });
    this.materials.grass = new THREE.MeshStandardMaterial({ color: 0x246237, roughness: 0.88, metalness: 0.02 });
    this.materials.leaf = new THREE.MeshStandardMaterial({ color: 0x2f7a44, roughness: 0.82, metalness: 0.01 });
    this.materials.leafLight = new THREE.MeshStandardMaterial({ color: 0x4b9a55, roughness: 0.84, metalness: 0.01 });
    this.materials.trunk = new THREE.MeshStandardMaterial({ color: 0x4b3328, roughness: 0.9, metalness: 0.02 });
    this.materials.brick = new THREE.MeshStandardMaterial({ color: 0x7b4a37, roughness: 0.74, metalness: 0.04 });
    this.materials.cream = new THREE.MeshStandardMaterial({ color: 0xc8b991, roughness: 0.72, metalness: 0.02 });
    this.materials.limestone = new THREE.MeshStandardMaterial({ color: 0xd8d0b9, roughness: 0.68, metalness: 0.03 });
    this.materials.roof = new THREE.MeshStandardMaterial({ color: 0x25384d, roughness: 0.55, metalness: 0.18 });
    this.materials.gold = new THREE.MeshStandardMaterial({ color: 0xffd56b, roughness: 0.3, metalness: 0.55, emissive: 0x332000, emissiveIntensity: 0.18 });
    this.materials.potato = new THREE.MeshStandardMaterial({ color: 0xc28b42, roughness: 0.86, metalness: 0.01 });
    this.materials.farmSoil = new THREE.MeshStandardMaterial({ color: 0x5a3826, roughness: 0.96, metalness: 0.01 });
    this.materials.wood = new THREE.MeshStandardMaterial({ color: 0x7b5739, roughness: 0.82, metalness: 0.03 });
    this.materials.woodDark = new THREE.MeshStandardMaterial({ color: 0x533a28, roughness: 0.88, metalness: 0.02 });
    this.materials.concrete = new THREE.MeshStandardMaterial({ color: 0x879199, roughness: 0.72, metalness: 0.06 });
    this.materials.neonBlue = new THREE.MeshBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.82 });
    this.materials.neonGreen = new THREE.MeshBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.82 });
    this.materials.neonRed = new THREE.MeshBasicMaterial({ color: 0xff4466, transparent: true, opacity: 0.82 });
    this.materials.water = makeCanalWaterMaterial();
    this.materials.canalBank = new THREE.MeshStandardMaterial({ color: 0x576b61, roughness: 0.86, metalness: 0.03 });
    this.materials.sidewalk = new THREE.MeshStandardMaterial({ color: 0x8b9188, roughness: 0.82, metalness: 0.04 });
    this.materials.plaza = new THREE.MeshStandardMaterial({ color: 0x5f7068, roughness: 0.78, metalness: 0.04 });
    this.materials.dirtRoad = new THREE.MeshStandardMaterial({ color: 0x8a6339, roughness: 0.94, metalness: 0.01 });
    this.materials.marketCanvas = new THREE.MeshStandardMaterial({ color: 0xc9a45d, roughness: 0.72, metalness: 0.02 });
    this.materials.patchAlpha = patchAlpha;
    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: 0x8fe8ff,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.28,
      transparent: true,
      opacity: 0.48
    });
    this.materials.darkGlass = new THREE.MeshPhysicalMaterial({
      color: 0x233a4f,
      roughness: 0.08,
      metalness: 0.12,
      transmission: 0.12,
      transparent: true,
      opacity: 0.7
    });
  }

  createSky() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#5ab8ff');
    gradient.addColorStop(0.32, '#83d2ff');
    gradient.addColorStop(0.66, '#bfefff');
    gradient.addColorStop(1, '#f6d49a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(620, 48, 24),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, depthWrite: false })
    );
    sky.position.y = 40;
    this.scene.add(sky);

    const sun = new THREE.Mesh(
      new THREE.CircleGeometry(15, 48),
      new THREE.MeshBasicMaterial({ color: 0xfff1af, transparent: true, opacity: 0.86, depthWrite: false })
    );
    sun.position.set(-145, 118, -245);
    sun.lookAt(0, 20, 0);
    this.scene.add(sun);
    this.decor.push({ type: 'sunDisc', mesh: sun, phase: 0 });

    const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xf7fbff, transparent: true, opacity: 0.54, depthWrite: false });
    const cloudCount = this.getQualityProfile().clouds;
    for (let i = 0; i < cloudCount; i += 1) {
      const group = new THREE.Group();
      const angle = (i / cloudCount) * Math.PI * 2 + pseudoRandom(i * 19) * 0.45;
      const radius = 170 + pseudoRandom(i * 23) * 210;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      group.position.set(x, 82 + (i % 7) * 7, z);
      group.rotation.y = -angle + Math.PI / 2;
      for (let j = 0; j < 6; j += 1) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(5.2 + j * 0.95, 16, 10), cloudMaterial.clone());
        puff.scale.set(3.4 + pseudoRandom(i * 31 + j) * 1.1, 0.28, 0.86 + pseudoRandom(i * 37 + j) * 0.25);
        puff.position.set((j - 2.5) * 8.0, Math.sin(j + i) * 0.75, (j % 2) * 3.1);
        group.add(puff);
      }
      this.scene.add(group);
      this.decor.push({ type: 'cloud', mesh: group, phase: i * 0.37 });
    }
  }

  createGround() {
    this.createOceanPlane();
    this.createIslandBaseShelf();
    const groundGeometry = makeIslandGeometry(ISLAND_RADIUS, 128);
    const positions = groundGeometry.attributes.position;
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const distance = Math.hypot(x, y);
      const coastFalloff = THREE.MathUtils.smoothstep(distance, ISLAND_RADIUS * 0.72, ISLAND_RADIUS * 0.99);
      const height =
        Math.sin(x * 0.032) * 0.045 +
        Math.cos(y * 0.028) * 0.04 +
        Math.sin((x - y) * 0.016) * 0.035 -
        coastFalloff * 0.22;
      positions.setZ(i, height);
    }
    groundGeometry.computeVertexNormals();
    const ground = new THREE.Mesh(groundGeometry, this.materials.ground);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.physics.createFixedBox([0, -0.16, 0], [WORLD_HALF_SIZE * 2, 0.24, WORLD_HALF_SIZE * 2], { friction: 1 });

    this.createBeachRing();
    for (const district of districtFootprints) {
      this.addDistrictPatch(district);
    }
    for (const zone of scenicPropZones) {
      this.addScenicPatch(zone);
    }
  }

  createOceanPlane() {
    const ocean = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_HALF_SIZE * 6, WORLD_HALF_SIZE * 6, 64, 64), this.materials.water);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = WATER_Y - 0.06;
    ocean.receiveShadow = false;
    this.scene.add(ocean);
    this.decor.push({ type: 'canalWater', mesh: ocean, phase: 0.3 });
  }

  createIslandBaseShelf() {
    const shelfMaterial = this.materials.sand.clone();
    shelfMaterial.color = new THREE.Color(0xb99162);
    shelfMaterial.roughness = 0.98;
    const shelf = new THREE.Mesh(makeIslandGeometry(ISLAND_RADIUS * 1.08, 160), shelfMaterial);
    shelf.rotation.x = -Math.PI / 2;
    shelf.position.y = WATER_Y + 0.08;
    shelf.receiveShadow = true;
    this.scene.add(shelf);
  }

  createBeachRing() {
    const beach = new THREE.Mesh(
      makeOrganicRingGeometry(ISLAND_RADIUS * 0.84, ISLAND_RADIUS * 1.06, 160, 4.2),
      this.materials.sand
    );
    beach.rotation.x = -Math.PI / 2;
    beach.position.y = 0.018;
    beach.receiveShadow = true;
    this.scene.add(beach);

    const grassBlendMaterial = this.materials.ground.clone();
    grassBlendMaterial.transparent = true;
    grassBlendMaterial.opacity = 0.46;
    grassBlendMaterial.depthWrite = false;
    const grassBlend = new THREE.Mesh(
      makeOrganicRingGeometry(ISLAND_RADIUS * 0.76, ISLAND_RADIUS * 0.9, 160, 3.0),
      grassBlendMaterial
    );
    grassBlend.rotation.x = -Math.PI / 2;
    grassBlend.position.y = 0.045;
    grassBlend.receiveShadow = true;
    this.scene.add(grassBlend);

    const shallowsMaterial = new THREE.MeshBasicMaterial({
      color: 0x45c8e8,
      transparent: true,
      opacity: 0.28,
      depthWrite: false
    });
    const shallows = new THREE.Mesh(
      makeOrganicRingGeometry(ISLAND_RADIUS * 1.02, ISLAND_RADIUS * 1.2, 160, 5.0),
      shallowsMaterial
    );
    shallows.rotation.x = -Math.PI / 2;
    shallows.position.y = WATER_Y + 0.035;
    this.scene.add(shallows);
    this.decor.push({ type: 'canalWater', mesh: shallows, phase: 1.4 });

    const cliffMaterial = new THREE.MeshStandardMaterial({ color: 0x6f6d60, roughness: 0.92, metalness: 0.02 });
    for (let i = 0; i < 38; i += 1) {
      const angle = (i / 38) * Math.PI * 2 + (pseudoRandom(i * 19) - 0.5) * 0.055;
      const radius = ISLAND_RADIUS * (0.89 + pseudoRandom(i * 23) * 0.08);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (!this.isClearForProp(x, z, 3.5)) continue;
      const rock = this.cloneEnvironmentAsset('EnvShoreRock') || new THREE.Mesh(new THREE.DodecahedronGeometry(1.5, 0), cliffMaterial);
      rock.position.set(x, 0.1, z);
      rock.rotation.y = -angle + Math.PI / 2;
      rock.scale.setScalar(1.0 + pseudoRandom(i * 31) * 1.35);
      this.scene.add(rock);
    }
  }

  createOutskirtsPlane() {
    const material = this.materials.ground.clone();
    material.color = new THREE.Color(0x2e6539);
    material.map = this.materials.ground.map;
    material.opacity = 0.72;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_HALF_SIZE * 3.4, WORLD_HALF_SIZE * 3.4), material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.09;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  createCanal() {
    for (const canal of canalSegments) {
      const segments = makePathSegments(canal.points, false, canal.width);
      for (const [x, z, width, depth, rotation] of segments) {
        const water = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), this.materials.water);
        water.position.set(x, WATER_Y, z);
        water.rotation.y = rotation;
        water.receiveShadow = false;
        this.scene.add(water);
        this.decor.push({ type: 'canalWater', mesh: water, phase: Math.random() * 6 });

        const bankOffset = width * 0.5 + canal.bankWidth * 0.5;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        for (const side of [-1, 1]) {
          const bank = new THREE.Mesh(
            new THREE.BoxGeometry(canal.bankWidth, 0.12, depth + 2.5),
            this.materials.canalBank
          );
          bank.position.set(x + cos * bankOffset * side, 0.03, z - sin * bankOffset * side);
          bank.rotation.y = rotation;
          bank.receiveShadow = true;
          this.scene.add(bank);

          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.18, 0.72, depth + 1.5),
            this.materials.sidewalk
          );
          rail.position.set(x + cos * (bankOffset + canal.bankWidth * 0.45) * side, 0.42, z - sin * (bankOffset + canal.bankWidth * 0.45) * side);
          rail.rotation.y = rotation;
          rail.castShadow = true;
          rail.receiveShadow = true;
          this.scene.add(rail);
        }
      }
    }
  }

  addDistrictPatch(district) {
    const [x, z] = district.center;
    const [width, depth] = district.size;
    const color = new THREE.Color(district.color);
    const material = this.materials.plaza.clone();
    material.color.copy(color).lerp(new THREE.Color(0x33443a), district.kind === 'plaza' ? 0.55 : 0.74);
    material.transparent = true;
    material.opacity = district.kind === 'farm' ? 0.5 : 0.42;
    material.alphaMap = this.materials.patchAlpha;
    material.depthWrite = false;
    const patch = new THREE.Mesh(makeOrganicPatchGeometry(width, depth, x * 0.13 + z * 0.21), material);
    patch.position.set(x, 0.052, z);
    patch.rotation.x = -Math.PI / 2;
    patch.rotation.z = district.kind === 'business' ? -0.08 : district.kind === 'campus' ? 0.12 : 0;
    patch.receiveShadow = true;
    this.scene.add(patch);
  }

  addScenicPatch(zone) {
    const [x, z] = zone.center;
    const [width, depth] = zone.size;
    const material = (zone.kind === 'farm' ? this.materials.dirtRoad : this.materials.leafLight).clone();
    material.transparent = true;
    material.opacity = zone.kind === 'market' ? 0.34 : 0.46;
    material.alphaMap = this.materials.patchAlpha;
    material.depthWrite = false;
    const patch = new THREE.Mesh(makeOrganicPatchGeometry(width, depth, x * 0.19 + z * 0.17), material);
    patch.position.set(x, 0.06, z);
    patch.rotation.x = -Math.PI / 2;
    patch.rotation.z = (pseudoRandom(x + z) - 0.5) * 0.28;
    this.scene.add(patch);
  }

  createIslandBoundary() {
    const barrierHeight = 3.2;
    const segments = 40;
    const wallRadius = ISLAND_RADIUS + 6;
    const chord = (Math.PI * 2 * wallRadius) / segments;
    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * wallRadius;
      const z = Math.sin(angle) * wallRadius;
      this.physics.createFixedBox([x, barrierHeight / 2 - 0.4, z], [chord, barrierHeight, 3.8], {
        rotation: [0, -angle + Math.PI / 2, 0],
        friction: 0.88,
        restitution: 0.0
      });
    }

    const columnMaterial = new THREE.MeshStandardMaterial({ color: 0xd7ccb0, roughness: 0.72, metalness: 0.02 });
    const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xffcf72, transparent: true, opacity: 0.82 });
    for (let i = 0; i < 18; i += 1) {
      const angle = (i / 18) * Math.PI * 2 + pseudoRandom(i * 17) * 0.12;
      const radius = ISLAND_RADIUS * (0.82 + pseudoRandom(i * 19) * 0.08);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (!this.isClearForProp(x, z, 4)) continue;
      const marker = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.4, 14), columnMaterial);
      base.position.y = 0.2;
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 2.6, 14), columnMaterial);
      column.position.y = 1.7;
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.9, 10), flameMaterial);
      flame.position.y = 3.4;
      marker.add(base, column, flame);
      marker.position.set(x, 0, z);
      marker.rotation.y = -angle;
      this.scene.add(marker);
      this.decor.push({ type: 'signalRing', mesh: flame, phase: i * 0.44 });
    }
  }

  createRoads() {
    const pointCounts = new Map();
    for (const path of roadPaths) {
      for (const point of path.points) {
        const key = `${Math.round(point[0])}:${Math.round(point[1])}`;
        pointCounts.set(key, (pointCounts.get(key) || 0) + 1);
      }
    }

    for (const path of roadPaths) {
      for (const road of makePathSegments(path.points, path.closed, path.width)) {
        this.addRoad(...road, path);
      }
      for (const point of path.points) {
        if (path.hierarchy === 'dirt') continue;
        const key = `${Math.round(point[0])}:${Math.round(point[1])}`;
        if ((pointCounts.get(key) || 0) < 2) continue;
        const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
        const node = new THREE.Group();
        const shoulder = new THREE.Mesh(
          new THREE.CylinderGeometry(path.width * 0.22 + style.shoulder * 0.45, path.width * 0.22 + style.shoulder * 0.45, 0.065, 36),
          this.materials.edge
        );
        shoulder.position.y = -0.03;
        shoulder.receiveShadow = true;
        const asphalt = new THREE.Mesh(
          new THREE.CylinderGeometry(path.width * 0.19, path.width * 0.19, 0.09, 40),
          this.materials.road
        );
        asphalt.position.y = 0.025;
        asphalt.receiveShadow = true;
        node.add(shoulder, asphalt);
        if (style.sidewalk > 0.1) {
          const curb = new THREE.Mesh(
            new THREE.TorusGeometry(path.width * 0.28 + style.shoulder * 0.24, 0.04, 8, 40),
            this.materials.sidewalk
          );
          curb.rotation.x = Math.PI / 2;
          curb.position.y = 0.09;
          node.add(curb);
        }
        node.position.set(point[0], 0.155, point[1]);
        this.scene.add(node);
      }
    }
  }

  addRoad(x, z, width, depth, rotation = 0, path = {}) {
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const group = new THREE.Group();
    group.position.set(x, 0.15, z);
    group.rotation.y = rotation;
    const roadModel = path.hierarchy === 'dirt' ? null : this.cloneEnvironmentAsset('EnvRoadSegment');
    if (roadModel) {
      roadModel.scale.set(width, 1, depth);
      roadModel.traverse((object) => {
        if (object.isMesh) {
          object.receiveShadow = true;
          object.castShadow = false;
        }
      });
      group.add(roadModel);
    } else {
      const shoulderMaterial = path.hierarchy === 'dirt' ? this.materials.dirtRoad : this.materials.edge;
      const roadMaterial = path.hierarchy === 'dirt' ? this.materials.dirtRoad : this.materials.road;
      const shoulder = new THREE.Mesh(new THREE.BoxGeometry(width + style.shoulder * 2, 0.05, depth + style.shoulder * 2), shoulderMaterial);
      shoulder.position.y = -0.035;
      shoulder.receiveShadow = true;
      group.add(shoulder);

      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.09, depth), roadMaterial);
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    if (style.sidewalk > 0.1) {
      const vertical = depth > width;
      const sidewalkMaterial = this.materials.sidewalk.clone();
      sidewalkMaterial.color.offsetHSL(0, 0, path.hierarchy === 'bridge' ? 0.08 : 0);
      for (const side of [-1, 1]) {
        const sidewalk = new THREE.Mesh(
          new THREE.BoxGeometry(
            vertical ? style.sidewalk : width + style.shoulder * 2,
            0.11,
            vertical ? depth + style.shoulder * 2 : style.sidewalk
          ),
          sidewalkMaterial
        );
        sidewalk.position.set(
          vertical ? side * (width * 0.5 + style.shoulder + style.sidewalk * 0.5) : 0,
          0.035,
          vertical ? 0 : side * (depth * 0.5 + style.shoulder + style.sidewalk * 0.5)
        );
        sidewalk.receiveShadow = true;
        group.add(sidewalk);
      }
    }
    if (path.hierarchy === 'bridge') {
      const guardMaterial = new THREE.MeshStandardMaterial({ color: 0xaeb8b6, roughness: 0.68, metalness: 0.08 });
      const vertical = depth > width;
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(vertical ? 0.24 : width + 1.2, 0.85, vertical ? depth + 1.2 : 0.24),
          guardMaterial
        );
        rail.position.set(vertical ? side * (width * 0.5 + 1.1) : 0, 0.48, vertical ? 0 : side * (depth * 0.5 + 1.1));
        rail.castShadow = true;
        rail.receiveShadow = true;
        group.add(rail);
      }
    }
    this.scene.add(group);

    const vertical = depth > width;
    const count = Math.max(2, vertical ? Math.floor(depth / 8) : Math.floor(width / 8));
    for (let i = 0; i < count; i += 1) {
      if (path.hierarchy === 'dirt') break;
      const dash = new THREE.Mesh(
        new THREE.BoxGeometry(vertical ? 0.14 : 2.3, 0.09, vertical ? 2.3 : 0.14),
        new THREE.MeshBasicMaterial({ color: style.line, transparent: true, opacity: 0.5 })
      );
      const t = count <= 1 ? 0 : i / (count - 1) - 0.5;
      dash.position.set(vertical ? 0 : t * width, 0.08, vertical ? t * depth : 0);
      group.add(dash);
      this.decor.push({ type: 'dash', mesh: dash, phase: Math.random() * 6 });
    }
  }

  createCircuit() {
    this.checkpoints = circuitCheckpoints.map((coords, index) => {
      const group = new THREE.Group();
      group.position.set(coords[0], 0.08, coords[2]);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 0.06, 8, 48),
        new THREE.MeshBasicMaterial({ color: index === 0 ? 0xff9b6d : 0x68d8ff, transparent: true, opacity: 0.34 })
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 3.4, 8),
        new THREE.MeshBasicMaterial({ color: 0xff9b6d, transparent: true, opacity: 0.6 })
      );
      pillar.position.y = 1.7;
      group.add(pillar);
      group.visible = false;
      this.scene.add(group);
      this.decor.push({ type: 'checkpoint', mesh: ring, phase: index * 0.7 });
      return { position: new THREE.Vector3(coords[0], 0, coords[2]), group, ring };
    });
  }

  createZones() {
    for (const definition of worldZones) {
      const zone = this.createZone(definition);
      this.zones.push(zone);
    }
  }

  createRampsAndPads() {
    const rampMaterial = new THREE.MeshStandardMaterial({
      color: 0x263849,
      roughness: 0.58,
      metalness: 0.22,
      emissive: 0x102a3f,
      emissiveIntensity: 0.15
    });
    const rampData = [
      { position: [96, 0.46, -108], rotation: [-0.26, -0.72, 0], size: [8.6, 0.62, 13.5], color: 0xff9b6d }
    ];

    for (const item of rampData) {
      const ramp = new THREE.Mesh(new THREE.BoxGeometry(...item.size), rampMaterial.clone());
      ramp.position.set(...item.position);
      ramp.rotation.set(...item.rotation);
      ramp.castShadow = true;
      ramp.receiveShadow = true;
      this.scene.add(ramp);
      this.physics.createFixedBox(item.position, item.size, { rotation: item.rotation, friction: 0.9, restitution: 0.04 });
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(item.size[0] * 0.7, 0.05, 0.35),
        new THREE.MeshBasicMaterial({ color: item.color, transparent: true, opacity: 0.72 })
      );
      stripe.position.copy(ramp.position);
      stripe.position.y += 0.52;
      stripe.rotation.copy(ramp.rotation);
      this.scene.add(stripe);
      this.ramps.push({ position: new THREE.Vector3(...item.position), radius: 10 });
      this.decor.push({ type: 'rampStripe', mesh: stripe, phase: Math.random() * 6 });
    }

    for (const pad of boostPads) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(7.4, 0.12, 4.6),
        new THREE.MeshBasicMaterial({ color: pad.color, transparent: true, opacity: 0.38 })
      );
      mesh.position.set(...pad.position);
      mesh.position.y = 0.12;
      mesh.rotation.y = pad.rotation;
      this.scene.add(mesh);
      const arrow = new THREE.Mesh(
        new THREE.TorusGeometry(1.22, 0.08, 8, 36),
        new THREE.MeshBasicMaterial({ color: pad.color, transparent: true, opacity: 0.78 })
      );
      arrow.rotation.x = Math.PI / 2;
      arrow.position.copy(mesh.position);
      arrow.position.y += 0.18;
      this.scene.add(arrow);
      this.boostPads.push({
        ...pad,
        mesh,
        arrow,
        position: new THREE.Vector3(...pad.position),
        direction: new THREE.Vector3(Math.sin(pad.rotation), 0, Math.cos(pad.rotation)).normalize(),
        cooldown: 0
      });
      this.decor.push({ type: 'boostPad', mesh, arrow, phase: Math.random() * 6 });
    }
  }

  createZone(definition) {
    const group = new THREE.Group();
    const position = new THREE.Vector3(...definition.position);
    group.position.copy(position);
    group.rotation.y = definition.rotation || 0;
    const color = new THREE.Color(definition.color);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: tmpColor.copy(color).lerp(new THREE.Color(0x24313b), 0.68),
      roughness: 0.48,
      metalness: 0.3,
      emissive: color,
      emissiveIntensity: 0.12
    });
    const accentMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.86 });

    const colliderSize = this.addZoneModel(group, definition, baseMaterial, accentMaterial);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(definition.radius, 0.08, 8, 72),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.12;
    group.add(ring);

    const beacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, Math.max(1.2, colliderSize[1]) + 1.4, 16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, depthWrite: false })
    );
    beacon.position.y = Math.max(1, colliderSize[1] / 2) + 0.65;
    beacon.visible = !definition.potatoFarm;
    group.add(beacon);

    this.scene.add(group);
    if (colliderSize[0] > 0) {
      this.physics.createFixedBox(
        [position.x, colliderSize[1] / 2, position.z],
        colliderSize,
        { rotation: [0, definition.rotation || 0, 0], friction: 0.88, restitution: 0.08 }
      );
    }

    this.decor.push({ type: 'zone', mesh: group, marker: beacon, ring, phase: Math.random() * 6 });
    return {
      ...definition,
      position,
      group,
      marker: beacon,
      ring,
      colliderSize
    };
  }

  addZoneModel(group, definition, baseMaterial, accentMaterial) {
    const shape = definition.shape;
    const color = new THREE.Color(definition.color);
    const add = (geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    };
    const neon = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.82 });
    let colliderSize = [6, 5, 6];

    if (shape === 'hub') {
      add(new THREE.CylinderGeometry(5.2, 5.9, 0.7, 48), this.materials.concrete, [0, 0.35, 0]);
      add(new THREE.TorusGeometry(4.15, 0.08, 10, 72), neon, [0, 0.82, 0], [Math.PI / 2, 0, 0]);
      add(new THREE.CylinderGeometry(1.05, 1.25, 2.2, 32), baseMaterial, [0, 1.55, 0]);
      add(new THREE.OctahedronGeometry(1.25, 1), neon, [0, 3.4, 0]);
      this.addSignalRings(group, 0, 3.4, 0, color, 3);
      colliderSize = [8.8, 3.4, 8.8];
    } else if (shape === 'lab') {
      add(new THREE.BoxGeometry(8.4, 1.0, 6.6), this.materials.limestone, [0, 0.5, 0]);
      add(new THREE.BoxGeometry(7.2, 4.2, 5.4), baseMaterial, [0, 2.6, 0]);
      for (const x of [-4.2, 4.2]) {
        add(new THREE.CylinderGeometry(0.85, 1.05, 5.6, 10), baseMaterial, [x, 2.8, -2.2]);
        add(new THREE.ConeGeometry(1.15, 1.2, 10), this.materials.roof, [x, 6.2, -2.2]);
      }
      add(new THREE.BoxGeometry(8.4, 0.35, 0.38), neon, [0, 4.7, -2.86]);
      add(new THREE.TorusGeometry(1.35, 0.08, 12, 48), neon, [0, 5.9, 0], [Math.PI / 2.8, 0, 0]);
      colliderSize = [9, 5.4, 6.8];
    } else if (shape === 'foundry') {
      add(new THREE.CylinderGeometry(4.8, 5.4, 1.0, 32), this.materials.concrete, [0, 0.5, 0]);
      add(new THREE.TorusGeometry(3.2, 0.5, 16, 96), baseMaterial, [0, 2.7, 0], [Math.PI / 2, 0, 0], [1, 1.4, 1]);
      add(new THREE.CylinderGeometry(3.2, 3.2, 3.3, 32, 1, true), this.materials.darkGlass, [0, 2.55, 0]);
      add(new THREE.BoxGeometry(7.4, 0.28, 0.34), this.materials.gold, [0, 4.5, -2.9]);
      add(new THREE.CylinderGeometry(0.34, 0.48, 5.6, 18), this.materials.roof, [3.25, 3.4, 1.4]);
      add(new THREE.TorusGeometry(1.15, 0.12, 8, 32), this.materials.gold, [-2.8, 3.0, 0.2], [Math.PI / 2, 0, 0]);
      colliderSize = [8.4, 4.8, 6.4];
    } else if (shape === 'tower') {
      add(new THREE.CylinderGeometry(3.0, 4.0, 1.0, 8), baseMaterial, [0, 0.5, 0]);
      for (let i = 0; i < 5; i += 1) {
        const radius = 2.45 - i * 0.16;
        add(new THREE.CylinderGeometry(radius, radius + 0.18, 1.55, 8), i % 2 ? this.materials.darkGlass : baseMaterial, [0, 1.35 + i * 1.42, 0], [0, Math.PI / 8, 0]);
        add(new THREE.TorusGeometry(radius + 0.08, 0.045, 8, 64), neon, [0, 2.12 + i * 1.42, 0], [Math.PI / 2, 0, 0]);
      }
      add(new THREE.ConeGeometry(1.55, 2.2, 8), this.materials.neonRed, [0, 9.1, 0]);
      add(new THREE.TorusGeometry(3.2, 0.06, 8, 80), this.materials.neonRed, [0, 6.4, 0], [Math.PI / 2, 0, 0]);
      add(new THREE.TorusGeometry(4.0, 0.04, 8, 80), this.materials.neonRed, [0, 7.2, 0], [Math.PI / 2, 0, 0]);
      colliderSize = [7, 8.8, 7];
    } else if (shape === 'office') {
      add(new THREE.BoxGeometry(9.8, 0.9, 6.8), this.materials.limestone, [0, 0.45, 0]);
      add(new THREE.BoxGeometry(8.0, 3.2, 5.2), baseMaterial, [0, 2.05, 0]);
      add(new THREE.BoxGeometry(9.2, 0.4, 5.8), this.materials.roof, [0, 3.9, 0]);
      add(new THREE.ConeGeometry(5.2, 1.2, 4), this.materials.roof, [0, 4.65, 0], [0, Math.PI / 4, 0], [1.0, 0.55, 0.68]);
      for (const x of [-3.3, -2.0, -0.7, 0.7, 2.0, 3.3]) {
        add(new THREE.CylinderGeometry(0.16, 0.22, 3.0, 16), this.materials.limestone, [x, 2.0, -3.0]);
      }
      add(new THREE.BoxGeometry(2.0, 2.15, 0.14), this.materials.darkGlass, [0, 1.65, -3.08]);
      add(new THREE.BoxGeometry(4.7, 0.16, 0.9), this.materials.gold, [0, 1.72, -3.25]);
      colliderSize = [10, 4.6, 7];
    } else if (shape === 'terminal') {
      add(new THREE.CylinderGeometry(4.0, 4.3, 0.65, 24), this.materials.limestone, [0, 0.32, 0]);
      for (let i = 0; i < 8; i += 1) {
        const angle = i * Math.PI / 4;
        add(new THREE.CylinderGeometry(0.16, 0.22, 2.8, 12), this.materials.limestone, [Math.sin(angle) * 3.0, 1.75, Math.cos(angle) * 3.0]);
      }
      add(new THREE.CylinderGeometry(2.1, 2.45, 1.55, 24), baseMaterial, [0, 1.55, 0]);
      add(new THREE.OctahedronGeometry(1.15, 1), neon, [0, 3.15, 0]);
      add(new THREE.TorusGeometry(2.95, 0.05, 8, 64), this.materials.neonGreen, [0, 2.95, 0], [Math.PI / 2, 0, 0]);
      colliderSize = [6.8, 3.4, 6.8];
    } else if (shape === 'library') {
      add(new THREE.BoxGeometry(9.6, 1.0, 6.2), this.materials.limestone, [0, 0.5, 0]);
      add(new THREE.BoxGeometry(8.7, 3.4, 5.1), this.materials.brick, [0, 2.2, 0.2]);
      add(new THREE.BoxGeometry(4.6, 4.4, 5.6), this.materials.limestone, [0, 2.8, -0.1]);
      add(new THREE.BoxGeometry(10.2, 0.55, 6.4), this.materials.roof, [0, 5.05, 0.05]);
      for (let i = -3; i <= 3; i += 1) {
        add(new THREE.CylinderGeometry(0.18, 0.24, 3.7, 18), this.materials.limestone, [i * 0.86, 2.35, -3.12]);
      }
      for (const x of [-3.25, -2.05, 2.05, 3.25]) {
        this.addWindowStack(group, x, 2.7, -2.85, 3, this.materials.darkGlass);
      }
      add(new THREE.TorusGeometry(1.05, 0.08, 10, 48, Math.PI), this.materials.limestone, [0, 3.0, -3.2], [0, 0, Math.PI]);
      add(new THREE.CylinderGeometry(0.92, 1.05, 1.9, 20), this.materials.limestone, [0, 6.05, -0.1]);
      add(new THREE.ConeGeometry(1.1, 1.05, 4), this.materials.roof, [0, 7.5, -0.1], [0, Math.PI / 4, 0]);
      add(new THREE.CircleGeometry(0.42, 32), this.materials.gold, [0, 6.25, -1.08]);
      colliderSize = [10.4, 6.2, 6.6];
    } else if (shape === 'trophy') {
      add(new THREE.CylinderGeometry(3.4, 4.0, 0.9, 32), this.materials.concrete, [0, 0.45, 0]);
      add(new THREE.CylinderGeometry(0.55, 0.78, 2.2, 28), this.materials.gold, [0, 1.9, 0]);
      add(new THREE.SphereGeometry(1.65, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.64), this.materials.gold, [0, 3.5, 0], [Math.PI, 0, 0]);
      for (const side of [-1, 1]) {
        add(new THREE.TorusGeometry(0.95, 0.11, 12, 48), this.materials.gold, [side * 1.55, 3.55, 0], [0, Math.PI / 2, 0]);
      }
      add(new THREE.OctahedronGeometry(0.75, 0), neon, [0, 5.15, 0]);
      colliderSize = [5.6, 4.9, 5.6];
    } else if (shape === 'vault') {
      add(new THREE.CylinderGeometry(3.4, 3.8, 4.4, 18, 1, false, 0, Math.PI), baseMaterial, [0, 2.2, 0], [0, Math.PI / 2, 0]);
      add(new THREE.BoxGeometry(6.8, 3.9, 3.2), baseMaterial, [0, 1.95, 0.8]);
      add(new THREE.TorusGeometry(1.65, 0.18, 16, 64), this.materials.gold, [0, 2.15, -2.05]);
      add(new THREE.CylinderGeometry(0.22, 0.22, 0.42, 20), this.materials.gold, [0, 2.15, -2.28], [Math.PI / 2, 0, 0]);
      for (const x of [-1.8, 1.8]) {
        add(new THREE.BoxGeometry(0.8, 1.05, 0.08), this.materials.neonBlue, [x, 2.65, -2.15]);
      }
      colliderSize = [7.2, 4.5, 4.8];
    } else if (shape === 'board') {
      add(new THREE.BoxGeometry(7.4, 0.42, 1.2), this.materials.woodDark, [0, 0.21, 0]);
      add(new THREE.BoxGeometry(7.8, 3.1, 0.28), this.materials.wood, [0, 2.35, -0.2]);
      for (let i = 0; i < 12; i += 1) {
        const note = add(new THREE.PlaneGeometry(0.72, 0.52), new THREE.MeshBasicMaterial({ color: [0xffdf8a, 0xd8ff92, 0x92ffea, 0xff9b6d][i % 4] }), [-3 + (i % 6) * 1.18, 2.0 + Math.floor(i / 6) * 0.72, -0.36]);
        note.rotation.z = (i % 3 - 1) * 0.08;
      }
      colliderSize = [8.2, 3.4, 1.6];
    } else if (shape === 'gate') {
      for (const x of [-2.6, 2.6]) {
        add(new THREE.CylinderGeometry(0.38, 0.54, 5.6, 16), baseMaterial, [x, 2.8, 0]);
      }
      add(new THREE.TorusGeometry(2.7, 0.16, 12, 64, Math.PI), neon, [0, 5.45, 0], [0, 0, Math.PI]);
      add(new THREE.BoxGeometry(5.5, 0.34, 0.5), this.materials.gold, [0, 5.38, 0]);
      colliderSize = [0, 0, 0];
    } else if (shape === 'post') {
      add(new THREE.CylinderGeometry(1.75, 2.15, 1.0, 18), this.materials.limestone, [0, 0.5, 0]);
      add(new THREE.CylinderGeometry(1.15, 1.45, 6.2, 18), baseMaterial, [0, 3.6, 0]);
      for (const y of [2.2, 4.2, 6.1]) {
        add(new THREE.TorusGeometry(1.25, 0.055, 8, 48), neon, [0, y, 0], [Math.PI / 2, 0, 0]);
      }
      add(new THREE.CylinderGeometry(1.35, 1.55, 0.65, 18), this.materials.darkGlass, [0, 7.0, 0]);
      add(new THREE.ConeGeometry(1.7, 1.4, 18), this.materials.roof, [0, 8.0, 0]);
      const lamp = new THREE.PointLight(color, 1.8, 26);
      lamp.position.set(0, 7.2, 0);
      group.add(lamp);
      colliderSize = [4.4, 7.2, 4.4];
    } else if (shape === 'rampyard') {
      add(new THREE.CylinderGeometry(5.0, 5.7, 0.7, 28), this.materials.sand, [0, 0.35, 0]);
      add(new THREE.CylinderGeometry(4.0, 4.6, 1.6, 28, 1, true, 0, Math.PI * 1.55), baseMaterial, [0, 1.25, 0], [0, -0.6, 0]);
      add(new THREE.TorusGeometry(4.9, 0.08, 8, 72), neon, [0, 1.75, 0], [Math.PI / 2, 0, 0]);
      for (let i = 0; i < 7; i += 1) {
        const angle = -1.65 + i * 0.55;
        add(new THREE.BoxGeometry(0.45, 0.55, 1.4), this.materials.limestone, [Math.sin(angle) * 4.2, 1.4, Math.cos(angle) * 4.2], [0, angle, 0]);
      }
      colliderSize = [7.8, 2.4, 7.8];
    } else if (shape === 'pier') {
      add(new THREE.BoxGeometry(9.8, 0.48, 6.2), this.materials.wood, [0, 0.34, 0]);
      for (const x of [-4.2, -1.4, 1.4, 4.2]) {
        add(new THREE.CylinderGeometry(0.18, 0.22, 2.0, 10), this.materials.woodDark, [x, 1.0, 2.55]);
        add(new THREE.CylinderGeometry(0.18, 0.22, 2.0, 10), this.materials.woodDark, [x, 1.0, -2.55]);
      }
      add(new THREE.CylinderGeometry(0.65, 0.85, 4.2, 16), baseMaterial, [0, 2.35, 0.1]);
      add(new THREE.ConeGeometry(1.05, 1.4, 16), this.materials.neonGreen, [0, 5.15, 0.1]);
      add(new THREE.TorusGeometry(2.1, 0.05, 8, 64), this.materials.neonGreen, [0, 3.8, 0.1], [Math.PI / 2, 0, 0]);
      colliderSize = [9.8, 1.0, 6.2];
    } else if (shape === 'farm') {
      this.createMinecraftFarm(group, add);
      colliderSize = [0, 0, 0];
    } else if (shape === 'portal') {
      add(new THREE.CylinderGeometry(3.4, 3.8, 0.55, 28), this.materials.limestone, [0, 0.28, 0]);
      for (const x of [-2.1, 2.1]) {
        add(new THREE.CylinderGeometry(0.32, 0.42, 4.6, 14), baseMaterial, [x, 2.3, 0]);
      }
      add(new THREE.TorusGeometry(2.1, 0.26, 14, 72, Math.PI), baseMaterial, [0, 4.4, 0], [0, 0, Math.PI]);
      add(new THREE.TorusGeometry(1.55, 0.08, 10, 72), this.materials.neonBlue, [0, 2.75, 0], [0, Math.PI / 2, 0]);
      colliderSize = [5.8, 1, 2.4];
    }

    return colliderSize;
  }

  addWindowGrid(group, rows, material) {
    for (let y = 0; y < rows; y += 1) {
      for (let x = -1; x <= 1; x += 1) {
        const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.36), material);
        windowMesh.position.set(x * 1.1, 1.7 + y * 0.9, -2.62);
        group.add(windowMesh);
      }
    }
  }

  addWindowStack(group, x, y, z, rows, material) {
    for (let i = 0; i < rows; i += 1) {
      const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.48), material);
      windowMesh.position.set(x, y + i * 0.82, z);
      group.add(windowMesh);
    }
  }

  addSignalRings(group, x, y, z, color, count = 2) {
    for (let i = 0; i < count; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.25 + i * 0.68, 0.035, 8, 56),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 - i * 0.055, depthWrite: false })
      );
      ring.position.set(x, y + i * 0.18, z);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      this.decor.push({ type: 'signalRing', mesh: ring, phase: i * 0.4 });
    }
  }

  createMinecraftFarm(group, add) {
    const farmModel = this.cloneEnvironmentAsset('EnvPotatoFarm');
    if (farmModel) {
      group.add(farmModel);
    } else {
      const grassBlock = new THREE.MeshStandardMaterial({ color: 0x4f9a45, roughness: 0.82 });
      const dirt = new THREE.MeshStandardMaterial({ color: 0x79512f, roughness: 0.9 });
      const water = new THREE.MeshBasicMaterial({ color: 0x3ca6ff, transparent: true, opacity: 0.74 });
      const crop = new THREE.MeshStandardMaterial({ color: 0x49a94e, roughness: 0.85 });
      const fence = new THREE.MeshStandardMaterial({ color: 0x9b6a3d, roughness: 0.82 });
      for (let x = -5; x <= 5; x += 1) {
        for (let z = -4; z <= 4; z += 1) {
          const material = Math.abs(z) === 1 ? water : (Math.abs(x) === 5 || Math.abs(z) === 4 ? grassBlock : dirt);
          add(new THREE.BoxGeometry(0.98, 0.5, 0.98), material, [x, 0.25, z]);
          if (material === dirt && (x + z) % 2 === 0) {
            add(new THREE.BoxGeometry(0.2, 0.42, 0.2), crop, [x - 0.18, 0.72, z - 0.14]);
            add(new THREE.BoxGeometry(0.62, 0.22, 0.62), crop, [x + 0.08, 0.94, z + 0.08]);
          }
        }
      }
      add(new THREE.BoxGeometry(4.8, 2.2, 0.22), this.materials.woodDark, [0, 2.25, -6.0]);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(4.15, 1.45),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true })
    );
    screen.position.set(0, 2.48, -7.24);
    screen.rotation.y = Math.PI;
    group.add(screen);
    this.potatoCounter = { canvas, texture, ctx: canvas.getContext('2d') };
    this.setPotatoCount('--');
  }

  setPotatoCount(count) {
    if (!this.potatoCounter) return;
    const { canvas, ctx, texture } = this.potatoCounter;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1f1308';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#5f3b1f';
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.fillRect(x, 0, 16, canvas.height);
    }
    ctx.strokeStyle = '#d8aa5d';
    ctx.lineWidth = 16;
    ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
    ctx.fillStyle = '#f8e2a7';
    ctx.textAlign = 'center';
    ctx.font = '900 42px Inter, Arial, sans-serif';
    ctx.fillText('POTATOES', canvas.width / 2, 78);
    ctx.font = '900 96px Inter, Arial, sans-serif';
    ctx.fillText(String(count), canvas.width / 2, 180);
    texture.needsUpdate = true;
  }

  makeSmallLabel(text, color, width = 384, height = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(3, 9, 15, 0.84)';
    roundRect(ctx, 8, 18, width - 16, height - 36, 14);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    roundRect(ctx, 8, 18, width - 16, height - 36, 14);
    ctx.stroke();
    ctx.fillStyle = '#f2f8ff';
    ctx.font = `900 ${Math.round(height * 0.23)}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2, width - 44);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  }

  makeLabel(name, kind, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(4, 9, 15, 0.78)';
    roundRect(ctx, 18, 34, 732, 124, 18);
    ctx.fill();
    ctx.strokeStyle = `#${color.getHexString()}`;
    ctx.lineWidth = 5;
    roundRect(ctx, 18, 34, 732, 124, 18);
    ctx.stroke();
    ctx.fillStyle = '#9fb6ca';
    ctx.font = '800 26px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(kind.toUpperCase(), 384, 75);
    ctx.fillStyle = '#f2f8ff';
    ctx.font = '900 46px Inter, Arial, sans-serif';
    ctx.fillText(name, 384, 123, 660);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.scale.set(9.5, 2.38, 1);
    return sprite;
  }

  createProps() {
    const quality = this.getQualityProfile();
    this.sakuraTrees = [];
    this.grassTufts = [];
    this.createDistrictProps();
    this.createStreetProps(quality);
    this.placeCityTrees(quality);
    this.placeGrassTufts(quality);
    this.createSakuraPetals();
    this.applyLandscapeQuality();
  }

  createDistrictProps() {
    const crateMaterial = new THREE.MeshStandardMaterial({ color: 0x7d5a40, roughness: 0.78, metalness: 0.05 });
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x3d4b57, roughness: 0.42, metalness: 0.55 });

    const ruinMaterial = this.materials.limestone.clone();
    ruinMaterial.color.offsetHSL(0.02, -0.08, -0.05);
    const ruinPieces = [
      [-116, 56, 0.2, 7.5], [-98, 106, -0.35, 6.4], [-52, 82, 0.28, 5.2],
      [34, 112, -0.2, 6.2], [114, 62, 0.42, 5.4], [-132, -98, -0.5, 6.4],
      [58, -118, 0.2, 6.0], [136, -116, -0.22, 5.6]
    ];
    for (const [x, z, rotation, length] of ruinPieces) {
      if (!this.isClearForProp(x, z, 2.4)) continue;
      const wall = new THREE.Mesh(new THREE.BoxGeometry(length, 1.25, 0.48), ruinMaterial);
      wall.position.set(x, 0.62, z);
      wall.rotation.y = rotation;
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.scene.add(wall);
      this.physics.createFixedBox([x, 0.62, z], [length, 1.25, 0.48], { rotation: [0, rotation, 0], friction: 0.88 });
    }

    const columnSpots = [
      [-102, 96], [-114, 96], [-126, 96], [-42, 74], [-30, 74],
      [32, 92], [44, 92], [128, 54], [138, 48]
    ];
    for (const [x, z] of columnSpots) {
      if (!this.isClearForProp(x, z, 1.8)) continue;
      const column = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.58, 0.28, 14), this.materials.limestone);
      base.position.y = 0.14;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 2.6, 16), this.materials.limestone);
      shaft.position.y = 1.55;
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.28, 0.95), this.materials.limestone);
      cap.position.y = 2.95;
      column.add(base, shaft, cap);
      column.position.set(x, 0, z);
      column.rotation.y = pseudoRandom(x + z) * Math.PI;
      this.scene.add(column);
    }

    const stallPositions = [
      [34, 38, -0.25], [50, 42, -0.1], [74, 48, 0.16],
      [126, 66, 0.32], [-78, 118, -0.28], [92, 74, -0.72]
    ];
    for (const [x, z, rotation] of stallPositions) {
      if (!this.isClearForProp(x, z, 3.4)) continue;
      const stall = this.cloneEnvironmentAsset('EnvMarketStall') || this.createFallbackMarketStall();
      stall.position.set(x, 0, z);
      stall.rotation.y = rotation;
      stall.scale.setScalar(0.92);
      this.scene.add(stall);
      this.physics.createFixedBox([x, 1.2, z], [4.4, 2.4, 3.1], { rotation: [0, rotation, 0], friction: 0.86, restitution: 0.04 });
    }

    const cratePositions = [
      [110, 0.8, -96], [116, 0.8, -104]
    ];
    cratePositions.forEach((position, index) => {
      const size = index % 3 === 0 ? [1.4, 1.4, 1.4] : [1.1, 1.1, 1.1];
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), index % 2 ? metalMaterial : crateMaterial);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      const body = this.physics.createDynamicBox(position, size, { density: 0.35, restitution: 0.24 });
      this.physics.bindVisual(body, mesh);
    });
  }

  createStreetProps(quality) {
    let placed = 0;
    for (const path of roadPaths) {
      if (path.hierarchy === 'dirt' || path.hierarchy === 'stunt') continue;
      const segments = makePathSegments(path.points, path.closed, path.width);
      for (const segment of segments) {
        const [x, z, width, depth, rotation] = segment;
        const length = depth;
        const steps = Math.max(1, Math.floor(length / 36));
        const forward = new THREE.Vector3(Math.sin(rotation), 0, Math.cos(rotation));
        const side = new THREE.Vector3(Math.cos(rotation), 0, -Math.sin(rotation));
        for (let step = 0; step <= steps && placed < quality.streetProps; step += 1) {
          const t = (step / Math.max(1, steps) - 0.5) * length;
          const sideSign = (placed + step) % 2 ? 1 : -1;
          const px = x + forward.x * t + side.x * sideSign * (width * 0.5 + 4.2);
          const pz = z + forward.z * t + side.z * sideSign * (width * 0.5 + 4.2);
          if (!this.isClearForProp(px, pz, 2.6)) continue;
          const light = this.createFallbackTorch();
          light.position.set(px, 0, pz);
          light.rotation.y = rotation + (sideSign > 0 ? Math.PI : 0);
          light.scale.setScalar(0.9 + pseudoRandom(placed * 17) * 0.18);
          this.scene.add(light);
          placed += 1;
        }
      }
    }

    const benchSpots = [
      [-18, 44, 0.1], [22, 45, -0.12], [-122, 76, 0.32], [-96, 122, -0.4],
      [60, 102, 0.2], [132, -62, -0.1], [-144, -78, 0.45], [166, 126, -0.68]
    ];
    for (const [x, z, rotation] of benchSpots) {
      if (!this.isClearForProp(x, z, 2.8)) continue;
      const bench = this.cloneEnvironmentAsset('EnvBench') || this.createFallbackBench();
      bench.position.set(x, 0, z);
      bench.rotation.y = rotation;
      this.scene.add(bench);
    }
  }

  placeCityTrees(quality) {
    let placedTrees = 0;
    for (let attempt = 0; attempt < 1200 && placedTrees < quality.trees; attempt += 1) {
      const zone = scenicPropZones[attempt % scenicPropZones.length];
      const [cx, cz] = zone.center;
      const [width, depth] = zone.size;
      const x = cx + (pseudoRandom(attempt * 11) - 0.5) * width;
      const z = cz + (pseudoRandom(attempt * 17) - 0.5) * depth;
      if (!this.isClearForProp(x, z, 5.2)) continue;
      const treeType = zone.kind === 'garden'
        ? 'EnvTreeSakuraMedium'
        : placedTrees % 4 === 0
          ? 'EnvTreeSakuraSmall'
          : placedTrees % 2 === 0
            ? 'EnvCityTreeNeem'
            : 'EnvCityTreeKikar';
      const tree = this.cloneEnvironmentAsset(treeType) || this.createFallbackTree();
      tree.position.set(x, 0, z);
      tree.rotation.y = pseudoRandom(attempt * 37) * Math.PI * 2;
      const treeScale = 0.7 + pseudoRandom(attempt * 41) * 0.48;
      tree.scale.setScalar(treeScale);
      this.scene.add(tree);
      this.sakuraTrees.push({ position: new THREE.Vector3(x, 0, z), scale: treeScale });
      this.decor.push({ type: 'tree', mesh: tree, phase: placedTrees * 0.37 });
      placedTrees += 1;
    }
  }

  placeGrassTufts(quality) {
    const grassTemplate = this.cloneEnvironmentAsset('EnvGrassTuft');
    const bladeGeometry = new THREE.PlaneGeometry(0.08, 0.44);
    bladeGeometry.translate(0, 0.22, 0);
    const bladeMaterial = new THREE.MeshBasicMaterial({ color: 0x78c96c, side: THREE.DoubleSide, transparent: true, opacity: 0.42 });
    const grass = grassTemplate ? new THREE.Group() : new THREE.InstancedMesh(bladeGeometry, bladeMaterial, 850);
    const matrix = new THREE.Matrix4();
    const maxGrass = Math.max(quality.grassTufts, QUALITY_PROFILES.high.grassTufts);
    for (let i = 0; i < 850; i += 1) {
      const zone = scenicPropZones[i % scenicPropZones.length];
      const x = zone.center[0] + (pseudoRandom(i * 19) - 0.5) * zone.size[0];
      const z = zone.center[1] + (pseudoRandom(i * 31) - 0.5) * zone.size[1];
      if (!this.isClearForProp(x, z, 1.2)) continue;
      if (grassTemplate && this.grassTufts.length < maxGrass) {
        const tuft = grassTemplate.clone(true);
        tuft.position.set(x, 0.045, z);
        tuft.rotation.y = pseudoRandom(i * 7) * Math.PI;
        const tuftScale = 0.5 + pseudoRandom(i * 13) * 0.85;
        tuft.scale.setScalar(tuftScale);
        grass.add(tuft);
        this.grassTufts.push({
          mesh: tuft,
          position: new THREE.Vector3(x, 0, z),
          baseRotationY: tuft.rotation.y,
          baseScale: tuftScale,
          phase: pseudoRandom(i * 43) * Math.PI * 2
        });
      } else if (!grassTemplate) {
        matrix.compose(
          new THREE.Vector3(x, 0.05, z),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, pseudoRandom(i * 7) * Math.PI, 0)),
          new THREE.Vector3(0.55 + pseudoRandom(i * 13) * 0.55, 0.45 + pseudoRandom(i * 23) * 0.55, 1)
        );
        grass.setMatrixAt(i, matrix);
      }
    }
    if (!grassTemplate) {
      grass.instanceMatrix.needsUpdate = true;
    }
    this.scene.add(grass);
    this.decor.push({ type: 'grassBlades', mesh: grass, phase: 0 });
  }

  createSakuraPetals() {
    const maxPetals = QUALITY_PROFILES.high.petals;
    const positions = new Float32Array(maxPetals * 3);
    const seeds = new Float32Array(maxPetals * 4);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffbfd0,
      size: 0.18,
      map: makePetalTexture(),
      transparent: true,
      opacity: 0.72,
      alphaTest: 0.08,
      depthWrite: false
    });
    const mesh = new THREE.Points(geometry, material);
    mesh.frustumCulled = false;
    this.petals = { geometry, mesh, positions, seeds };
    for (let i = 0; i < maxPetals; i += 1) {
      seeds[i * 4] = pseudoRandom(i * 17);
      seeds[i * 4 + 1] = pseudoRandom(i * 31);
      seeds[i * 4 + 2] = pseudoRandom(i * 43);
      seeds[i * 4 + 3] = pseudoRandom(i * 59);
      this.resetPetal(i, true);
    }
    this.scene.add(mesh);
  }

  resetPetal(index, spreadHeight = false) {
    if (!this.petals) return;
    const { positions, seeds } = this.petals;
    const tree = this.sakuraTrees.length
      ? this.sakuraTrees[Math.floor(seeds[index * 4] * this.sakuraTrees.length) % this.sakuraTrees.length]
      : { position: new THREE.Vector3(0, 0, 0), scale: 1 };
    const angle = seeds[index * 4 + 1] * Math.PI * 2;
    const radius = 0.8 + seeds[index * 4 + 2] * 3.2 * tree.scale;
    positions[index * 3] = tree.position.x + Math.cos(angle) * radius;
    positions[index * 3 + 1] = 4.0 + seeds[index * 4 + 3] * (spreadHeight ? 10 : 3.2) * tree.scale;
    positions[index * 3 + 2] = tree.position.z + Math.sin(angle) * radius;
  }

  updateSakuraPetals(dt, elapsed) {
    if (!this.petals?.mesh?.visible) return;
    const { positions, seeds, geometry } = this.petals;
    const count = this.getQualityProfile().petals;
    for (let i = 0; i < count; i += 1) {
      const base = i * 3;
      const seed = i * 4;
      positions[base] += Math.sin(elapsed * (0.8 + seeds[seed] * 0.7) + seeds[seed + 1] * 8) * dt * 0.7;
      positions[base + 1] -= dt * (0.75 + seeds[seed + 2] * 0.85);
      positions[base + 2] += Math.cos(elapsed * (0.7 + seeds[seed + 2] * 0.6) + seeds[seed + 3] * 8) * dt * 0.55;
      if (positions[base + 1] < 0.16) {
        seeds[seed] = pseudoRandom(elapsed * 11 + i * 17);
        seeds[seed + 1] = pseudoRandom(elapsed * 13 + i * 31);
        seeds[seed + 2] = pseudoRandom(elapsed * 19 + i * 43);
        seeds[seed + 3] = pseudoRandom(elapsed * 23 + i * 59);
        this.resetPetal(i, false);
      }
    }
    geometry.attributes.position.needsUpdate = true;
  }

  updateGrassInteraction(vehiclePosition, elapsed) {
    if (!vehiclePosition || !this.grassTufts.length) return;
    const profile = this.getQualityProfile();
    const limit = Math.min(profile.grassTufts, this.grassTufts.length);
    for (let i = 0; i < limit; i += 1) {
      const item = this.grassTufts[i];
      const distance = flatDistance(vehiclePosition, item.position);
      const bend = THREE.MathUtils.clamp(1 - distance / 5.2, 0, 1);
      const wind = Math.sin(elapsed * 1.4 + item.phase) * 0.045;
      item.mesh.rotation.y = item.baseRotationY + wind;
      item.mesh.rotation.x = bend * 0.42;
      item.mesh.scale.setScalar(item.baseScale * (1 - bend * 0.16));
      item.mesh.scale.y = item.baseScale * (1 + wind * 0.25 - bend * 0.22);
    }
  }

  isClearForProp(x, z, radius = 2) {
    if (Math.hypot(x, z) > ISLAND_RADIUS - radius - 4) return false;
    if (isNearRoad(x, z, radius + 3.5)) return false;
    if (isNearCanal(x, z, radius + 3)) return false;
    const point = new THREE.Vector3(x, 0, z);
    return !this.zones.some((zone) => flatDistance(point, zone.position) < zone.radius + radius + 9);
  }

  createFallbackDistrictModel(assetName) {
    const group = new THREE.Group();
    const material = assetName.includes('Office') ? this.materials.darkGlass : assetName.includes('Security') ? this.materials.dark : this.materials.limestone;
    const body = new THREE.Mesh(new THREE.BoxGeometry(8, assetName.includes('Office') ? 14 : 6, 8), material);
    body.position.y = assetName.includes('Office') ? 7 : 3;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    const base = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), this.materials.concrete);
    base.position.y = 0.25;
    base.receiveShadow = true;
    group.add(base);
    return group;
  }

  createFallbackMarketStall() {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.7, 2.7), this.materials.wood);
    base.position.y = 0.85;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.28, 3.2), this.materials.marketCanvas);
    canopy.position.y = 2.05;
    canopy.castShadow = true;
    group.add(canopy);
    return group;
  }

  createFallbackStreetLight() {
    const group = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.2, 10), this.materials.concrete);
    pole.position.y = 2.1;
    pole.castShadow = true;
    group.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), this.materials.concrete);
    arm.position.set(0.6, 4.0, 0);
    arm.castShadow = true;
    group.add(arm);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), this.materials.gold);
    lamp.position.set(1.25, 3.9, 0);
    group.add(lamp);
    return group;
  }

  createFallbackTorch() {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.45, 10), this.materials.limestone);
    base.position.y = 0.22;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.3, 8), this.materials.woodDark);
    pole.position.y = 1.38;
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.22, 10), this.materials.gold);
    bowl.position.y = 2.6;
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.28, 0.86, 10),
      new THREE.MeshBasicMaterial({ color: 0xffb45e, transparent: true, opacity: 0.8 })
    );
    flame.position.y = 3.05;
    const light = new THREE.PointLight(0xffae63, 0.45, 11);
    light.position.y = 2.8;
    group.add(base, pole, bowl, flame, light);
    this.decor.push({ type: 'signalRing', mesh: flame, phase: Math.random() * 4 });
    return group;
  }

  createFallbackBench() {
    const group = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.7), this.materials.wood);
    seat.position.y = 0.58;
    seat.castShadow = true;
    group.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 0.18), this.materials.woodDark);
    back.position.set(0, 0.98, 0.34);
    back.castShadow = true;
    group.add(back);
    for (const x of [-0.9, 0.9]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.16), this.materials.dark);
      leg.position.set(x, 0.29, 0);
      group.add(leg);
    }
    return group;
  }

  createFallbackTree() {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.34, 2.8, 8), this.materials.trunk);
    trunk.position.y = 1.4;
    trunk.castShadow = true;
    tree.add(trunk);
    for (let j = 0; j < 4; j += 1) {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(1.05 + (j % 2) * 0.24, 12, 8),
        new THREE.MeshStandardMaterial({ color: j % 2 ? 0xffc6d5 : 0xf58fab, roughness: 0.86, metalness: 0.01 })
      );
      leaf.position.set((j - 1.5) * 0.56, 3.0 + j * 0.42, (j % 2 - 0.5) * 0.58);
      leaf.scale.set(1.15, 0.86, 1.1);
      leaf.castShadow = true;
      tree.add(leaf);
    }
    return tree;
  }

  createCollectibles() {
    const positions = [
      [-120, 1.4, 76], [-92, 1.4, 108], [-34, 1.4, 86], [28, 1.4, 116],
      [92, 1.4, 54], [138, 1.4, 22], [112, 1.4, -94], [128, 1.4, -150],
      [-146, 1.4, -118], [-70, 1.4, -112], [18, 1.4, -108], [148, 1.4, 138]
    ];
    const material = new THREE.MeshBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.86 });
    positions.forEach((position, index) => {
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), material.clone());
      shard.position.set(...position);
      this.scene.add(shard);
      this.collectibles.push({
        id: `shard-${index}`,
        mesh: shard,
        position: new THREE.Vector3(...position),
        collected: localStorage.getItem(`portfolio-drive-shard-${index}`) === '1',
        phase: index * 0.44
      });
      if (this.collectibles[index].collected) shard.visible = false;
    });
  }

  createAtmosphere() {
    const positions = [];
    for (let i = 0; i < 450; i += 1) {
      positions.push((Math.random() - 0.5) * 320, 1.2 + Math.random() * 8, (Math.random() - 0.5) * 320);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.dust = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0xffe0a4, size: 0.08, transparent: true, opacity: 0.22, depthWrite: false })
    );
    this.scene.add(this.dust);
  }

  checkBoostPad(position) {
    for (const pad of this.boostPads) {
      if (pad.cooldown <= 0 && flatDistance(position, pad.position) < 5.6) {
        pad.cooldown = 1.2;
        return pad;
      }
    }
    return null;
  }

  checkRampAir(position, yVelocity) {
    if (yVelocity < 3.4) return false;
    return this.ramps.some((ramp) => flatDistance(position, ramp.position) < ramp.radius);
  }

  checkCollectibles(position) {
    const collected = [];
    for (const item of this.collectibles) {
      if (!item.collected && flatDistance(position, item.position) < 4.2) {
        item.collected = true;
        item.mesh.visible = false;
        localStorage.setItem(`portfolio-drive-${item.id}`, '1');
        collected.push(item);
      }
    }
    return collected;
  }

  getCollectedCount() {
    return this.collectibles.filter((item) => item.collected).length;
  }

  spawnPotato() {
    const farm = this.zones.find((zone) => zone.id === 'potato');
    const center = farm?.position || new THREE.Vector3(95, 0, 142);
    const x = center.x + (Math.random() - 0.5) * 7;
    const z = center.z + (Math.random() - 0.5) * 5;
    const group = new THREE.Group();
    group.position.set(x, 0.9, z);
    group.rotation.set(Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2);

    const potatoModel = this.cloneEnvironmentAsset('EnvMinecraftPotato');
    if (potatoModel) {
      group.add(potatoModel);
    } else {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.52, 0.92), this.materials.potato);
      base.castShadow = true;
      group.add(base);
      const bumpMaterial = new THREE.MeshStandardMaterial({ color: 0x8f5f2b, roughness: 0.9, metalness: 0.01 });
      for (let i = 0; i < 4; i += 1) {
        const bump = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), bumpMaterial);
        bump.position.set((Math.random() - 0.5) * 0.55, 0.08 + Math.random() * 0.2, (Math.random() - 0.5) * 0.7);
        group.add(bump);
      }
      const sprout = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.46, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x4f9b4e, roughness: 0.9 })
      );
      sprout.position.set(0.12, 0.45, -0.1);
      group.add(sprout);
    }

    this.scene.add(group);
    const body = this.physics.createDynamicBox([x, 0.9, z], [0.82, 0.58, 0.96], {
      density: 0.16,
      restitution: 0.28,
      friction: 0.82,
      angularDamping: 0.35
    });
    body.applyImpulse({ x: (Math.random() - 0.5) * 1.6, y: 1.2 + Math.random() * 1.8, z: (Math.random() - 0.5) * 1.6 }, true);
    this.physics.bindVisual(body, group);
    this.potatoes.push({ group, body });
    if (this.potatoes.length > 70) {
      const old = this.potatoes.shift();
      this.scene.remove(old.group);
      this.physics.dynamicVisuals = this.physics.dynamicVisuals.filter((item) => item.object !== old.group);
      try {
        this.physics.world.removeRigidBody(old.body);
      } catch {
        // Rapier cleanup is best-effort here; the visible session object is removed either way.
      }
    }
    return group;
  }

  nearestZone(position) {
    let nearest = null;
    let distance = Infinity;
    for (const zone of this.zones) {
      const d = flatDistance(position, zone.position);
      if (d < distance) {
        nearest = zone;
        distance = d;
      }
    }
    return nearest && distance <= nearest.radius ? { zone: nearest, distance } : null;
  }

  getRespawnPose(zoneId = 'landing') {
    const zone = this.zones.find((item) => item.id === zoneId) || this.zones[0];
    const colliderDepth = zone.colliderSize?.[2] || 0;
    const colliderWidth = zone.colliderSize?.[0] || 0;
    const offsetZ = Math.max(zone.radius + 18, colliderDepth / 2 + 19);
    const offsetX = Math.max(zone.radius + 18, colliderWidth / 2 + 19);
    const limit = WORLD_HALF_SIZE - 12;
    const candidates = [
      { offset: new THREE.Vector3(0, 1.45, offsetZ), heading: Math.PI },
      { offset: new THREE.Vector3(0, 1.45, -offsetZ), heading: 0 },
      { offset: new THREE.Vector3(offsetX, 1.45, 0), heading: -Math.PI / 2 },
      { offset: new THREE.Vector3(-offsetX, 1.45, 0), heading: Math.PI / 2 }
    ];

    const chosen = candidates.find(({ offset }) => {
      const x = zone.position.x + offset.x;
      const z = zone.position.z + offset.z;
      return Math.abs(x) < limit && Math.abs(z) < limit;
    }) || candidates[0];

    return {
      position: zone.position.clone().add(chosen.offset),
      heading: chosen.heading
    };
  }

  getRespawnPosition(zoneId = 'landing') {
    return this.getRespawnPose(zoneId).position;
  }

  startCircuit(now) {
    this.circuit.active = true;
    this.circuit.startedAt = now;
    this.circuit.checkpoint = 1;
    for (let i = 0; i < this.checkpoints.length; i += 1) {
      this.checkpoints[i].group.visible = true;
      this.checkpoints[i].ring.material.opacity = i === 1 ? 0.85 : 0.18;
    }
  }

  updateCircuit(position, now) {
    if (!this.circuit.active) return null;
    const checkpoint = this.checkpoints[this.circuit.checkpoint];
    if (!checkpoint) return null;
    if (flatDistance(position, checkpoint.position) < 6.5) {
      this.circuit.checkpoint += 1;
      if (this.circuit.checkpoint >= this.checkpoints.length) {
        const lap = now - this.circuit.startedAt;
        this.circuit.active = false;
        if (!this.circuit.best || lap < this.circuit.best) {
          this.circuit.best = lap;
          localStorage.setItem('portfolio-drive-best-lap', String(lap));
        }
        for (const item of this.checkpoints) item.group.visible = false;
        return { finished: true, lap };
      }
      for (let i = 0; i < this.checkpoints.length; i += 1) {
        this.checkpoints[i].ring.material.opacity = i === this.circuit.checkpoint ? 0.85 : 0.18;
      }
      return { checkpoint: this.circuit.checkpoint };
    }
    return null;
  }

  update(dt, elapsed, vehiclePosition) {
    if (this.dust) {
      this.dust.rotation.y += dt * 0.012;
    }
    this.updateSakuraPetals(dt, elapsed);
    this.updateGrassInteraction(vehiclePosition, elapsed);
    for (const item of this.decor) {
      if (item.type === 'dash') {
        item.mesh.material.opacity = 0.28 + Math.sin(elapsed * 2 + item.phase) * 0.12;
      } else if (item.type === 'zone') {
        if (item.marker?.visible) {
          item.marker.rotation.y += dt * 1.8;
          item.marker.position.y += Math.sin(elapsed * 2.4 + item.phase) * 0.004;
        }
        item.ring.material.opacity = 0.18 + Math.sin(elapsed * 1.7 + item.phase) * 0.05;
        const distance = vehiclePosition ? flatDistance(vehiclePosition, item.mesh.position) : 100;
        item.ring.scale.setScalar(distance < 13 ? 1.05 + Math.sin(elapsed * 7) * 0.04 : 1);
      } else if (item.type === 'tree') {
        item.mesh.rotation.z = Math.sin(elapsed * 0.7 + item.phase) * 0.018;
      } else if (item.type === 'ribbon') {
        item.mesh.material.opacity = 0.09 + Math.sin(elapsed + item.phase) * 0.04;
      } else if (item.type === 'cloud') {
        item.mesh.position.x += dt * (0.7 + (item.phase % 0.4));
        if (item.mesh.position.x > 285) item.mesh.position.x = -285;
      } else if (item.type === 'sunDisc') {
        item.mesh.material.opacity = 0.74 + Math.sin(elapsed * 0.35) * 0.08;
      } else if (item.type === 'checkpoint') {
        item.mesh.rotation.z += dt * 0.8;
      } else if (item.type === 'canalWater') {
        if (item.mesh.material.uniforms?.uTime) item.mesh.material.uniforms.uTime.value = elapsed;
        item.mesh.position.y = WATER_Y + Math.sin(elapsed * 0.75 + item.phase) * 0.025;
      } else if (item.type === 'buoy') {
        item.mesh.position.y = 0.38 + Math.sin(elapsed * 1.4 + item.phase) * 0.18;
        item.mesh.rotation.y += dt * 0.45;
      } else if (item.type === 'boostPad') {
        item.mesh.material.opacity = 0.28 + Math.sin(elapsed * 5 + item.phase) * 0.14;
        item.arrow.rotation.y += dt * 1.8;
      } else if (item.type === 'rampStripe' || item.type === 'rail') {
        item.mesh.material.opacity = 0.34 + Math.sin(elapsed * 2 + item.phase) * 0.14;
      } else if (item.type === 'signalRing') {
        item.mesh.rotation.z += dt * 0.55;
        item.mesh.scale.setScalar(1 + Math.sin(elapsed * 1.6 + item.phase) * 0.06);
      } else if (item.type === 'grassBlades') {
        if (item.mesh.material) {
          item.mesh.material.opacity = 0.42 + Math.sin(elapsed * 0.9) * 0.05;
        } else {
          item.mesh.rotation.y = Math.sin(elapsed * 0.18) * 0.012;
        }
      }
    }

    for (const pad of this.boostPads) {
      pad.cooldown = Math.max(0, pad.cooldown - dt);
    }
    for (const item of this.collectibles) {
      if (item.collected) continue;
      item.mesh.rotation.y += dt * 1.4;
      item.mesh.position.y = item.position.y + Math.sin(elapsed * 2.2 + item.phase) * 0.26;
      item.mesh.material.opacity = 0.62 + Math.sin(elapsed * 3 + item.phase) * 0.22;
    }
  }
}

function flatDistance(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function isNearRoad(x, z, margin = 0) {
  return roadSegments.some(([rx, rz, width, depth, rotation = 0]) => {
    const dx = x - rx;
    const dz = z - rz;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const localX = dx * cos - dz * sin;
    const localZ = dx * sin + dz * cos;
    return Math.abs(localX) <= width * 0.5 + margin && Math.abs(localZ) <= depth * 0.5 + margin;
  });
}

function isNearCanal(x, z, margin = 0) {
  return canalSegments.some((canal) => {
    const segments = makePathSegments(canal.points, false, canal.width);
    return segments.some(([cx, cz, width, depth, rotation = 0]) => {
      const dx = x - cx;
      const dz = z - cz;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const localX = dx * cos - dz * sin;
      const localZ = dx * sin + dz * cos;
      return Math.abs(localX) <= width * 0.5 + margin && Math.abs(localZ) <= depth * 0.5 + margin;
    });
  });
}

function makePathSegments(points, closed, width) {
  const segments = [];
  const limit = closed ? points.length : points.length - 1;
  for (let i = 0; i < limit; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz);
    segments.push([
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
      width,
      length + width * 0.64,
      Math.atan2(dx, dz)
    ]);
  }
  return segments;
}

function makeIslandGeometry(radius, segments = 128) {
  const geometry = new THREE.CircleGeometry(radius, segments);
  const positions = geometry.attributes.position;
  for (let i = 1; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const angle = Math.atan2(y, x);
    const edge =
      Math.sin(angle * 2.1 + 0.4) * 0.045 +
      Math.cos(angle * 4.7 - 0.8) * 0.05 +
      Math.sin(angle * 8.2 + 1.9) * 0.028;
    positions.setXY(i, x * (1 + edge), y * (1 + edge));
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function makeOrganicRingGeometry(innerRadius, outerRadius, segments = 128, noise = 2.8) {
  const shape = new THREE.Shape();
  const outer = [];
  const inner = [];
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    const wobble = Math.sin(angle * 3.2) * noise + Math.cos(angle * 5.7) * noise * 0.7;
    outer.push(new THREE.Vector2(Math.cos(angle) * (outerRadius + wobble), Math.sin(angle) * (outerRadius + wobble)));
    inner.push(new THREE.Vector2(Math.cos(angle) * (innerRadius + wobble * 0.45), Math.sin(angle) * (innerRadius + wobble * 0.45)));
  }
  shape.setFromPoints(outer);
  const hole = new THREE.Path();
  hole.setFromPoints(inner.reverse());
  shape.holes.push(hole);
  return new THREE.ShapeGeometry(shape);
}

function makeOrganicPatchGeometry(width, depth, seed = 1) {
  const geometry = new THREE.CircleGeometry(1, 64);
  const positions = geometry.attributes.position;
  for (let i = 1; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const angle = Math.atan2(y, x);
    const radiusNoise =
      Math.sin(angle * 3.1 + seed) * 0.075 +
      Math.cos(angle * 5.3 + seed * 0.7) * 0.055 +
      Math.sin(angle * 9.0 + seed * 1.4) * 0.025;
    const radius = 1 + radiusNoise;
    positions.setXY(i, x * width * 0.5 * radius, y * depth * 0.5 * radius);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function makePatchAlphaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 22, 128, 128, 128);
  gradient.addColorStop(0, 'rgb(255,255,255)');
  gradient.addColorStop(0.58, 'rgb(230,230,230)');
  gradient.addColorStop(0.82, 'rgb(108,108,108)');
  gradient.addColorStop(1, 'rgb(0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 900; i += 1) {
    const v = 170 + Math.random() * 85;
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.globalAlpha = 0.04 + Math.random() * 0.08;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function makeNoiseTexture(colors, size = 256, dots = 1200) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < dots; i += 1) {
    ctx.fillStyle = colors[i % colors.length];
    const radius = 0.6 + Math.random() * 2.4;
    ctx.globalAlpha = 0.18 + Math.random() * 0.42;
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeRoadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#252b2f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 900; i += 1) {
    const value = 28 + Math.random() * 30;
    ctx.fillStyle = `rgba(${value}, ${value + 4}, ${value + 8}, ${0.16 + Math.random() * 0.18})`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makePetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(16, 16);
  ctx.rotate(-0.55);
  const gradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14);
  gradient.addColorStop(0, 'rgba(255, 245, 248, 0.96)');
  gradient.addColorStop(0.55, 'rgba(255, 179, 201, 0.78)');
  gradient.addColorStop(1, 'rgba(255, 154, 185, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(0, 0, 5.4, 12.5, 0, 0, Math.PI * 2);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeCanalWaterMaterial() {
  const material = new THREE.ShaderMaterial({
    transparent: false,
    depthWrite: true,
    depthTest: true,
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(0x07507e) },
      uShallow: { value: new THREE.Color(0x42c4e8) }
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vUv = uv;
        vec3 p = position;
        float wave = sin(p.x * 0.11 + uTime * 1.2) * 0.035 + cos(p.z * 0.08 + uTime * 0.8) * 0.025;
        p.y += wave;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        float ripple = sin(vUv.x * 96.0 + uTime * 1.35) * sin(vUv.y * 44.0 - uTime * 0.9);
        float foam = smoothstep(0.7, 0.92, ripple * 0.5 + 0.5);
        vec3 color = mix(uDeep, uShallow, 0.5 + vWave * 2.0);
        color += foam * 0.045;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });
  return material;
}

function pseudoRandom(seed) {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
