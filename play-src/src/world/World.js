import * as THREE from 'three';
import { boostPads, circuitCheckpoints, roadSegments, WORLD_HALF_SIZE, worldZones } from './worldData.js';

const OCEAN_HALF_SIZE = 520;
const ROAD_LINE_COLOR = 0x68d8ff;

export class World {
  constructor({ scene, physics, resumeData }) {
    this.scene = scene;
    this.physics = physics;
    this.resumeData = resumeData;
    this.zones = [];
    this.decor = [];
    this.particles = [];
    this.boostPads = [];
    this.ramps = [];
    this.collectibles = [];
    this.materials = {};
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
    this.createGround();
    this.createIslandEdges();
    this.createRoads();
    this.createCircuit();
    this.createZones();
    this.createRampsAndPads();
    this.createProps();
    this.createCollectibles();
    this.createAtmosphere();
  }

  createMaterials() {
    this.materials.ground = new THREE.MeshStandardMaterial({ color: 0x102238, roughness: 0.92, metalness: 0.02 });
    this.materials.road = new THREE.MeshStandardMaterial({ color: 0x172333, roughness: 0.74, metalness: 0.08 });
    this.materials.roadLine = new THREE.MeshBasicMaterial({ color: ROAD_LINE_COLOR, transparent: true, opacity: 0.46 });
    this.materials.dark = new THREE.MeshStandardMaterial({ color: 0x09121d, roughness: 0.55, metalness: 0.25 });
    this.materials.edge = new THREE.MeshStandardMaterial({ color: 0x0b1722, roughness: 0.7, metalness: 0.18 });
    this.materials.water = new THREE.MeshPhysicalMaterial({
      color: 0x073047,
      roughness: 0.18,
      metalness: 0.05,
      transmission: 0.08,
      transparent: true,
      opacity: 0.84
    });
    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: 0x8fe8ff,
      roughness: 0.08,
      transmission: 0.16,
      transparent: true,
      opacity: 0.44
    });
  }

  createGround() {
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(OCEAN_HALF_SIZE * 2, OCEAN_HALF_SIZE * 2, 48, 48),
      this.materials.water
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.42;
    this.scene.add(water);
    this.decor.push({ type: 'ocean', mesh: water, phase: 0 });

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(WORLD_HALF_SIZE * 2, WORLD_HALF_SIZE * 2, 32, 32),
      this.materials.ground
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.physics.createFixedBox([0, -0.16, 0], [WORLD_HALF_SIZE * 2, 0.24, WORLD_HALF_SIZE * 2], { friction: 1 });

    const grid = new THREE.GridHelper(WORLD_HALF_SIZE * 2, 68, 0x2e86de, 0x19344f);
    grid.position.y = 0.02;
    grid.material.transparent = true;
    grid.material.opacity = 0.18;
    this.scene.add(grid);
  }

  createIslandEdges() {
    const edgeMaterial = this.materials.edge;
    const edgeHeight = 1.8;
    const edgeThickness = 3.4;
    const railMaterial = new THREE.MeshBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.38 });
    const edges = [
      [0, WORLD_HALF_SIZE + edgeThickness / 2, WORLD_HALF_SIZE * 2, edgeThickness],
      [0, -WORLD_HALF_SIZE - edgeThickness / 2, WORLD_HALF_SIZE * 2, edgeThickness],
      [WORLD_HALF_SIZE + edgeThickness / 2, 0, edgeThickness, WORLD_HALF_SIZE * 2],
      [-WORLD_HALF_SIZE - edgeThickness / 2, 0, edgeThickness, WORLD_HALF_SIZE * 2]
    ];
    for (const [x, z, width, depth] of edges) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(width, edgeHeight, depth), edgeMaterial);
      wall.position.set(x, edgeHeight / 2 - 0.08, z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.scene.add(wall);
      this.physics.createFixedBox([x, edgeHeight / 2 - 0.08, z], [width, edgeHeight, depth], { friction: 0.7, restitution: 0.08 });
      const rail = new THREE.Mesh(new THREE.BoxGeometry(width || edgeThickness, 0.08, depth || edgeThickness), railMaterial.clone());
      rail.position.set(x, edgeHeight + 0.12, z);
      this.scene.add(rail);
      this.decor.push({ type: 'rail', mesh: rail, phase: Math.random() * 6 });
    }

    for (let i = 0; i < 28; i += 1) {
      const side = i % 4;
      const t = -WORLD_HALF_SIZE + 12 + Math.floor(i / 4) * 48;
      const x = side === 0 ? t : side === 1 ? WORLD_HALF_SIZE + 7 : side === 2 ? t : -WORLD_HALF_SIZE - 7;
      const z = side === 0 ? WORLD_HALF_SIZE + 7 : side === 1 ? t : side === 2 ? -WORLD_HALF_SIZE - 7 : t;
      const buoy = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 0.7, 1.5, 9),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffdf8a : 0xff6d8d, transparent: true, opacity: 0.78 })
      );
      buoy.position.set(x, 0.38, z);
      buoy.castShadow = true;
      this.scene.add(buoy);
      this.decor.push({ type: 'buoy', mesh: buoy, phase: i * 0.5 });
    }
  }

  createRoads() {
    for (const road of roadSegments) {
      this.addRoad(...road);
    }
  }

  addRoad(x, z, width, depth) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), this.materials.road);
    mesh.position.set(x, 0.03, z);
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    const vertical = depth > width;
    const count = Math.max(2, vertical ? Math.floor(depth / 8) : Math.floor(width / 8));
    for (let i = 0; i < count; i += 1) {
      const dash = new THREE.Mesh(
        new THREE.BoxGeometry(vertical ? 0.14 : 2.3, 0.09, vertical ? 2.3 : 0.14),
        this.materials.roadLine.clone()
      );
      const t = count <= 1 ? 0 : i / (count - 1) - 0.5;
      dash.position.set(x + (vertical ? 0 : t * width), 0.11, z + (vertical ? t * depth : 0));
      this.scene.add(dash);
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
      { position: [0, 0.46, 68], rotation: [-0.34, 0, 0], size: [12, 0.72, 18], color: 0x7cffb2 },
      { position: [132, 0.46, -112], rotation: [-0.42, 0, 0], size: [13, 0.8, 19], color: 0xff9b6d },
      { position: [112, 0.46, -132], rotation: [-0.34, Math.PI / 2, 0], size: [11, 0.72, 18], color: 0xa8a6ff },
      { position: [-132, 0.46, -112], rotation: [-0.28, 0, 0], size: [10, 0.65, 16], color: 0x79ffc5 }
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
        new THREE.ConeGeometry(1.1, 2.8, 3),
        new THREE.MeshBasicMaterial({ color: pad.color, transparent: true, opacity: 0.78 })
      );
      arrow.rotation.x = Math.PI / 2;
      arrow.rotation.z = -pad.rotation;
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
    const color = new THREE.Color(definition.color);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x101b28,
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

    const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), accentMaterial.clone());
    marker.position.y = colliderSize[1] + 2.2;
    group.add(marker);

    const label = this.makeLabel(definition.name, definition.kind, color);
    label.position.y = colliderSize[1] + 3.4;
    group.add(label);

    this.scene.add(group);
    if (colliderSize[0] > 0) {
      this.physics.createFixedBox(
        [position.x, colliderSize[1] / 2, position.z],
        colliderSize,
        { friction: 0.88, restitution: 0.08 }
      );
    }

    this.decor.push({ type: 'zone', mesh: group, marker, ring, phase: Math.random() * 6 });
    return {
      ...definition,
      position,
      group,
      marker,
      ring,
      colliderSize
    };
  }

  addZoneModel(group, definition, baseMaterial, accentMaterial) {
    const shape = definition.shape;
    let colliderSize = [5.2, 4.2, 5.2];

    if (shape === 'hub') {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.7, 1.6, 8), baseMaterial);
      base.position.y = 0.8;
      base.castShadow = true;
      group.add(base);
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 5.4, 12), accentMaterial);
      beacon.position.y = 3.4;
      group.add(beacon);
      colliderSize = [7, 1.8, 7];
    } else if (shape === 'lab') {
      for (let i = 0; i < 3; i += 1) {
        const block = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.4 + i * 0.7, 3.6), baseMaterial);
        block.position.set((i - 1) * 2.4, 1.7 + i * 0.35, 0);
        block.castShadow = true;
        group.add(block);
      }
      const antenna = new THREE.Mesh(new THREE.ConeGeometry(0.6, 3.8, 6), accentMaterial);
      antenna.position.set(0, 6.6, 0);
      group.add(antenna);
      colliderSize = [8.2, 5.2, 4.8];
    } else if (shape === 'foundry') {
      const forge = new THREE.Mesh(new THREE.BoxGeometry(7.4, 4.2, 5.2), baseMaterial);
      forge.position.y = 2.1;
      forge.castShadow = true;
      group.add(forge);
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.9, 5.8, 9), baseMaterial);
      chimney.position.set(2.3, 5.0, -1.4);
      chimney.castShadow = true;
      group.add(chimney);
      colliderSize = [7.8, 4.4, 5.6];
    } else if (shape === 'tower') {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 3.6, 9.5, 7), baseMaterial);
      tower.position.y = 4.75;
      tower.castShadow = true;
      group.add(tower);
      const crown = new THREE.Mesh(new THREE.OctahedronGeometry(2.4, 0), accentMaterial);
      crown.position.y = 10.5;
      group.add(crown);
      colliderSize = [6.6, 9.5, 6.6];
    } else if (shape === 'office') {
      const office = new THREE.Mesh(new THREE.BoxGeometry(6.6, 4.8, 5.2), baseMaterial);
      office.position.y = 2.4;
      office.castShadow = true;
      group.add(office);
      this.addWindowGrid(group, 3, accentMaterial);
      colliderSize = [7, 5, 5.5];
    } else if (shape === 'terminal') {
      const terminal = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 4.4), baseMaterial);
      terminal.position.y = 2.1;
      terminal.castShadow = true;
      group.add(terminal);
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.1), accentMaterial);
      screen.position.set(0, 2.8, -2.23);
      group.add(screen);
      colliderSize = [5.8, 4.4, 5];
    } else if (shape === 'library') {
      const library = new THREE.Mesh(new THREE.BoxGeometry(7, 4.2, 5.2), baseMaterial);
      library.position.y = 2.1;
      library.castShadow = true;
      group.add(library);
      for (let i = -2; i <= 2; i += 1) {
        const column = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.8, 8), accentMaterial);
        column.position.set(i * 1.2, 2.1, -2.72);
        group.add(column);
      }
      colliderSize = [7.4, 4.4, 5.8];
    } else if (shape === 'trophy') {
      const column = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.8, 5.2, 8), baseMaterial);
      column.position.y = 2.6;
      column.castShadow = true;
      group.add(column);
      const trophy = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.22, 80, 8), accentMaterial);
      trophy.position.y = 6.3;
      group.add(trophy);
      colliderSize = [4.2, 5.4, 4.2];
    } else if (shape === 'vault') {
      const vault = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.9, 4.8), baseMaterial);
      vault.position.y = 1.95;
      vault.castShadow = true;
      group.add(vault);
      const door = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.16, 12, 36), accentMaterial);
      door.position.set(0, 2.1, -2.45);
      group.add(door);
      colliderSize = [6, 4.2, 5.2];
    } else if (shape === 'board') {
      const board = new THREE.Mesh(new THREE.BoxGeometry(7.4, 3.2, 0.35), baseMaterial);
      board.position.y = 2.3;
      board.castShadow = true;
      group.add(board);
      colliderSize = [7.8, 3.6, 1.4];
    } else if (shape === 'gate') {
      for (const x of [-2.1, 2.1]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 5.8, 0.7), baseMaterial);
        pillar.position.set(x, 2.9, 0);
        pillar.castShadow = true;
        group.add(pillar);
      }
      const top = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.52, 0.8), accentMaterial);
      top.position.y = 5.8;
      group.add(top);
      colliderSize = [0, 0, 0];
    } else if (shape === 'post') {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.4, 5.8, 6), baseMaterial);
      tower.position.y = 2.9;
      tower.castShadow = true;
      group.add(tower);
      colliderSize = [4.6, 6, 4.6];
    } else if (shape === 'rampyard') {
      const garage = new THREE.Mesh(new THREE.BoxGeometry(7.2, 3.6, 4.6), baseMaterial);
      garage.position.set(0, 1.8, 0);
      garage.castShadow = true;
      group.add(garage);
      const sign = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.5, 0.3), accentMaterial);
      sign.position.set(0, 4.1, -2.45);
      group.add(sign);
      for (const x of [-2.3, 0, 2.3]) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.1, 8), accentMaterial.clone());
        cone.position.set(x, 0.55, 3.4);
        group.add(cone);
      }
      colliderSize = [7.6, 3.8, 5];
    } else if (shape === 'pier') {
      const deck = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.55, 5.4), baseMaterial);
      deck.position.y = 0.35;
      deck.castShadow = true;
      group.add(deck);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 5.8, 8), accentMaterial);
      mast.position.y = 3.2;
      group.add(mast);
      const dish = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 8, 28), accentMaterial);
      dish.position.set(0, 5.9, 0);
      dish.rotation.x = Math.PI / 3;
      group.add(dish);
      colliderSize = [8.8, 1, 5.8];
    } else if (shape === 'portal') {
      const portal = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.28, 12, 64), accentMaterial);
      portal.rotation.y = Math.PI / 2;
      portal.position.y = 3.2;
      group.add(portal);
      const base = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.8, 2.1), baseMaterial);
      base.position.y = 0.4;
      group.add(base);
      colliderSize = [6.2, 1, 2.4];
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
    const crateMaterial = new THREE.MeshStandardMaterial({ color: 0x7d5a40, roughness: 0.78, metalness: 0.05 });
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x3d4b57, roughness: 0.42, metalness: 0.55 });
    const positions = [
      [-92, 0.8, 46], [-98, 0.8, 50], [98, 0.8, 46], [116, 0.8, -12],
      [12, 0.8, 36], [-13, 0.8, -46], [136, 0.8, -126], [142, 0.8, -136],
      [5, 0.8, -132], [-7, 0.8, -135], [-118, 0.8, -124], [-142, 0.8, -132],
      [74, 0.8, 86], [-74, 0.8, 86], [44, 0.8, -84], [-44, 0.8, -84],
      [0, 0.8, 122], [0, 0.8, -148]
    ];
    positions.forEach((position, index) => {
      const size = index % 3 === 0 ? [1.4, 1.4, 1.4] : [1.1, 1.1, 1.1];
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), index % 2 ? metalMaterial : crateMaterial);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      const body = this.physics.createDynamicBox(position, size, { density: 0.35, restitution: 0.24 });
      this.physics.bindVisual(body, mesh);
    });

    for (let i = 0; i < 72; i += 1) {
      const angle = (i / 72) * Math.PI * 2;
      const radius = WORLD_HALF_SIZE - 20 - Math.abs(Math.sin(i * 1.7)) * 18;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 2.4, 7), new THREE.MeshStandardMaterial({ color: 0x4b3328, roughness: 0.9 }));
      trunk.position.set(x, 1.2, z);
      trunk.castShadow = true;
      this.scene.add(trunk);
      const top = new THREE.Mesh(new THREE.ConeGeometry(1.4 + (i % 4) * 0.16, 4.3, 7), new THREE.MeshStandardMaterial({ color: 0x173c29, roughness: 0.82 }));
      top.position.set(x, 4.1, z);
      top.castShadow = true;
      this.scene.add(top);
      this.decor.push({ type: 'tree', mesh: top, phase: i * 0.37 });
    }
  }

  createCollectibles() {
    const positions = [
      [-72, 1.4, 82], [-118, 1.4, 76], [86, 1.4, 86], [136, 1.4, 72],
      [-146, 1.4, -88], [-92, 1.4, -142], [92, 1.4, -142], [146, 1.4, -88],
      [-26, 1.4, -152], [26, 1.4, -152], [-18, 1.4, 126], [18, 1.4, 126]
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
    const starPositions = [];
    for (let i = 0; i < 1200; i += 1) {
      starPositions.push((Math.random() - 0.5) * 520, 34 + Math.random() * 96, (Math.random() - 0.5) * 520);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    this.stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xa8f1ff, size: 0.18, transparent: true, opacity: 0.72, depthWrite: false })
    );
    this.scene.add(this.stars);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.14 });
    for (let i = 0; i < 16; i += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-150 + i * 20, 8 + (i % 4), -150),
        new THREE.Vector3(-70 + i * 7, 13, -36),
        new THREE.Vector3(36 - i * 4, 10 + (i % 3), 58),
        new THREE.Vector3(150 - i * 12, 15, 150)
      ]);
      const points = curve.getPoints(48);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial.clone());
      this.scene.add(line);
      this.decor.push({ type: 'ribbon', mesh: line, phase: i * 0.4 });
    }
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

  getRespawnPosition(zoneId = 'landing') {
    const zone = this.zones.find((item) => item.id === zoneId) || this.zones[0];
    return zone.position.clone().add(new THREE.Vector3(0, 1.25, -zone.radius + 2.5));
  }

  startCircuit(now) {
    this.circuit.active = true;
    this.circuit.startedAt = now;
    this.circuit.checkpoint = 1;
    for (let i = 0; i < this.checkpoints.length; i += 1) {
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
        for (const item of this.checkpoints) item.ring.material.opacity = 0.34;
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
    if (this.stars) {
      this.stars.rotation.y += dt * 0.006;
    }
    for (const item of this.decor) {
      if (item.type === 'dash') {
        item.mesh.material.opacity = 0.28 + Math.sin(elapsed * 2 + item.phase) * 0.12;
      } else if (item.type === 'zone') {
        item.marker.rotation.y += dt * 1.8;
        item.marker.position.y += Math.sin(elapsed * 2.4 + item.phase) * 0.004;
        item.ring.material.opacity = 0.18 + Math.sin(elapsed * 1.7 + item.phase) * 0.05;
        const distance = vehiclePosition ? flatDistance(vehiclePosition, item.mesh.position) : 100;
        item.ring.scale.setScalar(distance < 13 ? 1.05 + Math.sin(elapsed * 7) * 0.04 : 1);
      } else if (item.type === 'tree') {
        item.mesh.rotation.z = Math.sin(elapsed * 0.7 + item.phase) * 0.018;
      } else if (item.type === 'ribbon') {
        item.mesh.material.opacity = 0.09 + Math.sin(elapsed + item.phase) * 0.04;
      } else if (item.type === 'checkpoint') {
        item.mesh.rotation.z += dt * 0.8;
      } else if (item.type === 'ocean') {
        item.mesh.material.opacity = 0.76 + Math.sin(elapsed * 0.5) * 0.06;
        item.mesh.position.y = -0.42 + Math.sin(elapsed * 0.45) * 0.035;
      } else if (item.type === 'buoy') {
        item.mesh.position.y = 0.38 + Math.sin(elapsed * 1.4 + item.phase) * 0.18;
        item.mesh.rotation.y += dt * 0.45;
      } else if (item.type === 'boostPad') {
        item.mesh.material.opacity = 0.28 + Math.sin(elapsed * 5 + item.phase) * 0.14;
        item.arrow.rotation.y += dt * 1.8;
      } else if (item.type === 'rampStripe' || item.type === 'rail') {
        item.mesh.material.opacity = 0.34 + Math.sin(elapsed * 2 + item.phase) * 0.14;
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
