import * as THREE from 'three';
import { circuitCheckpoints, worldZones } from './worldData.js';

export class World {
  constructor({ scene, physics, resumeData }) {
    this.scene = scene;
    this.physics = physics;
    this.resumeData = resumeData;
    this.zones = [];
    this.decor = [];
    this.particles = [];
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
    this.createRoads();
    this.createCircuit();
    this.createZones();
    this.createProps();
    this.createAtmosphere();
  }

  createMaterials() {
    this.materials.ground = new THREE.MeshStandardMaterial({ color: 0x102238, roughness: 0.92, metalness: 0.02 });
    this.materials.road = new THREE.MeshStandardMaterial({ color: 0x172333, roughness: 0.74, metalness: 0.08 });
    this.materials.roadLine = new THREE.MeshBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.46 });
    this.materials.dark = new THREE.MeshStandardMaterial({ color: 0x09121d, roughness: 0.55, metalness: 0.25 });
    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: 0x8fe8ff,
      roughness: 0.08,
      transmission: 0.16,
      transparent: true,
      opacity: 0.44
    });
  }

  createGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(178, 178, 16, 16),
      this.materials.ground
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.physics.createFixedBox([0, -0.11, 0], [180, 0.22, 180], { friction: 1 });

    const grid = new THREE.GridHelper(176, 44, 0x2e86de, 0x19344f);
    grid.position.y = 0.02;
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    this.scene.add(grid);

    const sea = new THREE.Mesh(
      new THREE.RingGeometry(88, 128, 96),
      new THREE.MeshBasicMaterial({ color: 0x061824, transparent: true, opacity: 0.78, side: THREE.DoubleSide })
    );
    sea.rotation.x = -Math.PI / 2;
    sea.position.y = -0.06;
    this.scene.add(sea);
    this.decor.push({ type: 'sea', mesh: sea, phase: 0 });
  }

  createRoads() {
    const roads = [
      [0, 0, 12, 124],
      [0, 12, 86, 10],
      [0, -28, 98, 10],
      [0, 40, 104, 10],
      [-42, 7, 10, 74],
      [42, 7, 10, 74],
      [0, 58, 18, 20]
    ];
    for (const road of roads) {
      this.addRoad(...road);
    }
  }

  addRoad(x, z, width, depth) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), this.materials.road);
    mesh.position.set(x, 0.03, z);
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    const vertical = depth > width;
    const count = vertical ? Math.floor(depth / 7) : Math.floor(width / 7);
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
      [-28, 0.8, 28], [-31, 0.8, 31], [29, 0.8, -12], [33, 0.8, -14],
      [12, 0.8, 10], [-13, 0.8, -10], [55, 0.8, 5], [-55, 0.8, 4],
      [5, 0.8, -34], [-7, 0.8, -35]
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

    for (let i = 0; i < 34; i += 1) {
      const angle = (i / 34) * Math.PI * 2;
      const radius = 72 + Math.sin(i * 1.7) * 5;
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

  createAtmosphere() {
    const starPositions = [];
    for (let i = 0; i < 900; i += 1) {
      starPositions.push((Math.random() - 0.5) * 240, 34 + Math.random() * 76, (Math.random() - 0.5) * 240);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    this.stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xa8f1ff, size: 0.18, transparent: true, opacity: 0.72, depthWrite: false })
    );
    this.scene.add(this.stars);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.14 });
    for (let i = 0; i < 11; i += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-78 + i * 14, 8 + (i % 4), -74),
        new THREE.Vector3(-40 + i * 5, 13, -18),
        new THREE.Vector3(20 - i * 3, 10 + (i % 3), 26),
        new THREE.Vector3(76 - i * 10, 15, 76)
      ]);
      const points = curve.getPoints(48);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial.clone());
      this.scene.add(line);
      this.decor.push({ type: 'ribbon', mesh: line, phase: i * 0.4 });
    }
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
      } else if (item.type === 'sea') {
        item.mesh.material.opacity = 0.68 + Math.sin(elapsed * 0.5) * 0.08;
      }
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
