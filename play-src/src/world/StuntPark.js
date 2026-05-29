// ABOUTME: Builds the driveable stunt yard ramps, boost pads, and visual markers.
// ABOUTME: Keeps only ramp surfaces physical so yard decoration does not block the car.
import * as THREE from 'three';
import { boostPads, circuitCheckpoints, worldZones } from './worldData.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

function stuntRampLayout(baseX, baseZ) {
  return [
    { id: 'cove-main-ramp', x: baseX - 14, z: baseZ - 18, y: 0.12, rot: Math.PI / 2, width: 8.8, length: 22, height: 2.1, color: 0xff9b6d },
    { id: 'cove-return-ramp', x: baseX + 12, z: baseZ - 2, y: 0.12, rot: -Math.PI / 2.6, width: 6.4, length: 16, height: 1.55, color: 0xffc36a },
    { id: 'cove-short-hop', x: baseX - 2, z: baseZ + 16, y: 0.12, rot: 0.1, width: 5.4, length: 12, height: 1.15, color: 0x68d8ff }
  ];
}

export class StuntPark {
  constructor(world) {
    this.world = world;
    this.markerDummy = new THREE.Object3D();
    this.circuitDummy = new THREE.Object3D();
    this.circuitCheckpointTrailGroup = null;
    this.circuitRingMesh = null;
    this.circuitArrowMesh = null;
    this.circuitMarkerColor = new THREE.Color();
    this.stats = this.createStats();
  }

  build() {
    this.stats = this.createStats();
    this.createYardDressing();
    this.createRamps();
    this.createBoostPads();
    this.createCircuitCheckpointTrail();
  }

  update(dt, elapsed) {
    this.updateCircuitMarkers(elapsed);
  }

  applyQuality() {
    if (this.circuitCheckpointTrailGroup) {
      this.circuitCheckpointTrailGroup.visible = this.world.landscapeQuality !== 'low';
    }
  }

  createStats() {
    return {
      ramps: 0,
      boostPads: 0,
      cones: 0,
      tireStacks: 0,
      landingMarkers: 0,
      authoredAssets: 0,
      laneChevrons: 0,
      trackScuffs: 0,
      visualBarriers: 0,
      gates: 0,
      circuitCheckpointGates: 0,
      circuitTargetRings: 0,
      circuitTargetArrows: 0,
      activeCircuitTarget: 0,
      circuitMotionSamples: 0,
      checkpointPulseSamples: 0,
      maxCheckpointPulse: 0
    };
  }

  getStats() {
    return { ...this.stats };
  }

  createYardDressing() {
    const zone = worldZones.find((item) => item.id === 'drift');
    if (!zone) return;
    const group = new THREE.Group();
    group.name = 'STUNT_Yard_Dressing';
    const baseX = zone.position[0];
    const baseZ = zone.position[2];
    const ramps = stuntRampLayout(baseX, baseZ);

    this.addRunwayStripe(group, baseX - 10, baseZ - 18, 24, Math.PI / 2, 0xff9b6d);
    this.addRunwayStripe(group, baseX + 9, baseZ - 2, 18, -Math.PI / 2.6, 0xffc36a);
    this.addRunwayStripe(group, baseX - 2, baseZ + 16, 14, 0.1, 0x68d8ff);
    this.addCircuitChevrons(group, ramps);
    this.addRubberScuffs(group, baseX, baseZ);

    for (let i = 0; i < 12; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.9, 5), this.world.materials.warmGlow);
      cone.name = 'STUNT_slalom_cone';
      cone.position.set(baseX - 6 + i * 2.6, 0.6, baseZ + side * 4.2);
      cone.rotation.y = i * 0.7;
      group.add(cone);
      this.stats.cones += 1;
    }

    for (const [dx, dz, rot] of [
      [-21, -8, 0.2],
      [-18, 10, -0.4],
      [18, -16, 0.6],
      [23, 7, -0.2],
      [4, 22, 0.1]
    ]) {
      const stack = new THREE.Group();
      stack.name = 'STUNT_tire_stack';
      for (let i = 0; i < 3; i += 1) {
        const tire = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 8, 16), this.world.materials.cable);
        tire.position.y = 0.28 + i * 0.24;
        tire.rotation.x = Math.PI / 2;
        stack.add(tire);
      }
      stack.position.set(baseX + dx, 0.18, baseZ + dz);
      stack.rotation.y = rot;
      group.add(stack);
      this.stats.tireStacks += 1;
    }

    const authored = [
      ['EnvPolishStuntCheckpoint', baseX - 26, baseZ - 23.5, Math.PI / 2, 1.05],
      ['EnvPolishStuntCheckpoint', baseX + 25, baseZ - 3.2, -Math.PI / 2.6, 0.88],
      ['EnvPolishStuntScoreTower', baseX + 24, baseZ + 16, -0.38, 1.05],
      ['EnvPolishStuntScoreTower', baseX - 24, baseZ + 8, 0.72, 0.86],
      ['EnvPolishStuntArrowFence', baseX - 25, baseZ - 8, 0.18, 1.0],
      ['EnvPolishStuntArrowFence', baseX + 22, baseZ - 17, -0.42, 0.96],
      ['EnvPolishStuntArrowFence', baseX + 8, baseZ + 24, 0.1, 0.92]
    ];
    for (const [assetName, x, z, rotation, scale] of authored) {
      if (this.addPolishAsset(group, assetName, x, z, rotation, scale)) {
        this.stats.authoredAssets += 1;
        if (assetName === 'EnvPolishStuntCheckpoint') this.stats.gates += 1;
        if (assetName === 'EnvPolishStuntArrowFence') this.stats.visualBarriers += 1;
      }
    }

    mergeStaticMeshesInGroup(group, { namePrefix: 'STUNT_yard' });
    this.world.scene.add(group);
  }

  addRunwayStripe(group, x, z, length, rotation, color) {
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.52, depthWrite: false });
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.035, length), material);
    stripe.name = 'STUNT_runway_glow';
    stripe.position.set(x, 0.22, z);
    stripe.rotation.y = rotation;
    group.add(stripe);
  }

  addRubberScuffs(group, baseX, baseZ) {
    const specs = [];
    for (let i = 0; i < 18; i += 1) {
      const angle = -0.72 + i * 0.19;
      const radius = 7.5 + (i % 5) * 1.45;
      specs.push({
        x: baseX + 12 + Math.cos(angle) * radius,
        z: baseZ + 1 + Math.sin(angle) * radius,
        rotation: angle + Math.PI * 0.5,
        width: 0.34 + (i % 3) * 0.08,
        length: 3.2 + (i % 4) * 0.72
      });
    }
    for (let i = 0; i < 14; i += 1) {
      const angle = 1.9 + i * 0.17;
      const radius = 5.2 + (i % 4) * 1.2;
      specs.push({
        x: baseX - 12 + Math.cos(angle) * radius,
        z: baseZ - 16 + Math.sin(angle) * radius,
        rotation: angle + Math.PI * 0.5,
        width: 0.3 + (i % 2) * 0.1,
        length: 2.8 + (i % 5) * 0.62
      });
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0x1d1712,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -30,
      polygonOffsetUnits: -30
    });
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.025, 1), material, specs.length);
    mesh.name = 'STUNT_Rubber_Scuffs';
    mesh.renderOrder = 35;
    mesh.frustumCulled = false;
    specs.forEach((spec, index) => {
      this.markerDummy.position.set(spec.x, 0.285, spec.z);
      this.markerDummy.rotation.set(0, spec.rotation, 0);
      this.markerDummy.scale.set(spec.width, 1, spec.length);
      this.markerDummy.updateMatrix();
      mesh.setMatrixAt(index, this.markerDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    group.add(mesh);
    this.stats.trackScuffs += specs.length;
  }

  addCircuitChevrons(group, ramps) {
    const specs = [];
    for (const ramp of ramps) {
      const forwardX = Math.sin(ramp.rot);
      const forwardZ = Math.cos(ramp.rot);
      const rightX = Math.cos(ramp.rot);
      const rightZ = -Math.sin(ramp.rot);
      for (let distance = -ramp.length * 0.72; distance <= ramp.length * 0.95; distance += 4.8) {
        const side = distance < 0 ? -1 : 1;
        specs.push({
          x: ramp.x + forwardX * distance + rightX * side * ramp.width * 0.18,
          z: ramp.z + forwardZ * distance + rightZ * side * ramp.width * 0.18,
          rotation: ramp.rot,
          scale: ramp.id === 'cove-main-ramp' ? 1.1 : 0.92,
          color: ramp.color
        });
      }
    }
    if (!specs.length) return;
    const geometry = createStuntChevronGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -28,
      polygonOffsetUnits: -28
    });
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = 'STUNT_Circuit_Chevrons';
    mesh.renderOrder = 34;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.markerDummy.position.set(spec.x, 0.275, spec.z);
      this.markerDummy.rotation.set(0, spec.rotation, 0);
      this.markerDummy.scale.setScalar(spec.scale);
      this.markerDummy.updateMatrix();
      mesh.setMatrixAt(index, this.markerDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    this.stats.laneChevrons += specs.length;
  }

  createRamps() {
    const zone = worldZones.find((item) => item.id === 'drift');
    if (!zone) return;
    const baseX = zone.position[0];
    const baseZ = zone.position[2];
    const ramps = stuntRampLayout(baseX, baseZ);
    for (const ramp of ramps) {
      const rampShape = createRampShape(ramp.width, ramp.length, ramp.height);
      const mesh = new THREE.Mesh(rampShape.geometry, this.world.materials.stuntRamp);
      mesh.name = `STUNT_${ramp.id}`;
      mesh.position.set(ramp.x, ramp.y, ramp.z);
      mesh.rotation.y = ramp.rot;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.world.scene.add(mesh);
      this.world.ramps.push({ id: ramp.id, position: new THREE.Vector3(ramp.x, 0, ramp.z), radius: 11, triggered: false });
      this.world.physics.createFixedTrimesh([ramp.x, ramp.y, ramp.z], rampShape.vertices, rampShape.indices, {
        debugName: `STUNT_${ramp.id}_ramp_collider`,
        visualName: `STUNT_${ramp.id}`,
        rotation: [0, ramp.rot, 0],
        friction: 0.92,
        restitution: 0.02
      });
      this.addGuardrails(ramp);
      this.addLandingMarkers(ramp);
      this.stats.ramps += 1;
    }
  }

  addGuardrails(ramp) {
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, ramp.length * 0.92), this.world.materials.wood);
      rail.name = `STUNT_${ramp.id}_wood_guardrail`;
      rail.position.set(ramp.x + Math.cos(ramp.rot) * ramp.width * 0.56 * side, 0.78, ramp.z - Math.sin(ramp.rot) * ramp.width * 0.56 * side);
      rail.rotation.y = ramp.rot;
      rail.castShadow = true;
      rail.receiveShadow = true;
      this.world.scene.add(rail);
    }
  }

  addLandingMarkers(ramp) {
    const landingDistance = ramp.length * 0.72;
    const centerX = ramp.x + Math.sin(ramp.rot) * landingDistance;
    const centerZ = ramp.z + Math.cos(ramp.rot) * landingDistance;
    for (const side of [-1, 1]) {
      const marker = new THREE.Group();
      marker.name = `STUNT_${ramp.id}_landing_marker`;
      marker.position.set(centerX + Math.cos(ramp.rot) * side * (ramp.width * 0.62), 0.18, centerZ - Math.sin(ramp.rot) * side * (ramp.width * 0.62));
      marker.rotation.y = ramp.rot;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.6, 8), this.world.materials.darkWood);
      post.position.y = 0.8;
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.04), this.world.materials.warmGlow);
      flag.position.set(0.48, 1.32, 0);
      marker.add(post, flag);
      this.world.scene.add(marker);
      this.stats.landingMarkers += 1;
    }
  }

  createBoostPads() {
    for (const pad of boostPads) {
      const group = new THREE.Group();
      group.name = `BOOST_${pad.id}`;
      group.position.set(pad.position[0], 0.35, pad.position[2]);
      group.rotation.y = pad.rotation || 0;
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.4, 0.22, 6),
        new THREE.MeshStandardMaterial({ color: pad.color, emissive: new THREE.Color(pad.color).multiplyScalar(0.22), roughness: 0.42 })
      );
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.4, 3), this.world.materials.glow);
      arrow.position.z = 0.5;
      arrow.rotation.x = Math.PI / 2;
      group.add(base, arrow);
      this.world.scene.add(group);
      this.world.boostPads.push({ ...pad, position: new THREE.Vector3(pad.position[0], 0, pad.position[2]) });
      this.stats.boostPads += 1;
    }
  }

  createCircuitCheckpointTrail() {
    const group = new THREE.Group();
    group.name = 'STUNT_Circuit_Checkpoint_Trail';
    this.circuitCheckpointTrailGroup = group;
    const gateTemplate = 'EnvPolishStuntCheckpoint';
    const targetCount = circuitCheckpoints.length - 1;

    for (let index = 1; index < circuitCheckpoints.length - 1; index += 1) {
      const [x, , z] = circuitCheckpoints[index];
      const rotation = circuitHeading(index);
      if (this.addPolishAsset(group, gateTemplate, x, z, rotation, 0.46)) {
        this.stats.circuitCheckpointGates += 1;
      }
    }

    mergeStaticMeshesInGroup(group, { namePrefix: 'STUNT_circuit_checkpoint_trail' });
    this.applyQuality();
    this.world.scene.add(group);
    this.createCircuitTargetMarkers(targetCount);
  }

  createCircuitTargetMarkers(targetCount) {
    const ringGeometry = new THREE.RingGeometry(1.25, 1.72, 6);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.circuitRingMesh = new THREE.InstancedMesh(ringGeometry, ringMaterial, targetCount);
    this.circuitRingMesh.name = 'STUNT_Circuit_Target_Rings';
    this.circuitRingMesh.renderOrder = 37;
    this.circuitRingMesh.frustumCulled = false;
    this.world.scene.add(this.circuitRingMesh);

    const arrowGeometry = createCircuitArrowGeometry();
    const arrowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.64,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.circuitArrowMesh = new THREE.InstancedMesh(arrowGeometry, arrowMaterial, targetCount);
    this.circuitArrowMesh.name = 'STUNT_Circuit_Target_Arrows';
    this.circuitArrowMesh.renderOrder = 38;
    this.circuitArrowMesh.frustumCulled = false;
    this.world.scene.add(this.circuitArrowMesh);

    this.stats.circuitTargetRings = targetCount;
    this.stats.circuitTargetArrows = targetCount;
    this.updateCircuitMarkers(0);
  }

  updateCircuitMarkers(elapsed = 0) {
    if (!this.circuitRingMesh || !this.circuitArrowMesh) return;
    const circuit = this.world.circuit || {};
    const activeTarget = circuit.active ? circuit.checkpoint + 1 : 0;
    const targetCount = circuitCheckpoints.length - 1;
    this.stats.activeCircuitTarget = activeTarget;

    for (let index = 0; index < targetCount; index += 1) {
      const targetIndex = index + 1;
      const [x, , z] = circuitCheckpoints[targetIndex];
      const rotation = circuitHeading(targetIndex);
      const isActive = circuit.active && targetIndex === activeTarget;
      const passed = circuit.active && targetIndex <= circuit.checkpoint;
      const checkpointPulse = circuit.lastCheckpointIndex === targetIndex ? circuit.checkpointPulse || 0 : 0;
      const pulse = Math.sin(elapsed * 4.6 + index * 0.5) * 0.5 + 0.5;
      const ringScale = isActive ? 2.25 + pulse * 0.36 : passed ? 0.62 + checkpointPulse * 1.18 : 1.0 + checkpointPulse * 1.1;
      const arrowScale = isActive ? 1.35 + pulse * 0.18 : passed ? 0.42 + checkpointPulse * 0.72 : 0.72 + checkpointPulse * 0.62;
      const color = isActive ? 0xfff0a0 : (passed || checkpointPulse > 0.01) ? 0x79ffc5 : 0xff9b6d;
      if (checkpointPulse > 0.01) {
        this.stats.checkpointPulseSamples += 1;
        this.stats.maxCheckpointPulse = Math.max(this.stats.maxCheckpointPulse, checkpointPulse);
      }

      this.circuitDummy.position.set(x, 0.36 + (isActive ? pulse * 0.14 : 0) + checkpointPulse * 0.22, z);
      this.circuitDummy.rotation.set(-Math.PI / 2, 0, rotation);
      this.circuitDummy.scale.setScalar(ringScale);
      this.circuitDummy.updateMatrix();
      this.circuitRingMesh.setMatrixAt(index, this.circuitDummy.matrix);
      this.circuitRingMesh.setColorAt(index, this.circuitMarkerColor.setHex(color));

      const arrowDistance = isActive ? 4.2 + pulse * 0.5 : 3.1 + checkpointPulse * 0.45;
      this.circuitDummy.position.set(
        x + Math.sin(rotation) * arrowDistance,
        0.5 + (isActive ? pulse * 0.12 : 0) + checkpointPulse * 0.24,
        z + Math.cos(rotation) * arrowDistance
      );
      this.circuitDummy.rotation.set(-Math.PI / 2, 0, rotation);
      this.circuitDummy.scale.setScalar(arrowScale);
      this.circuitDummy.updateMatrix();
      this.circuitArrowMesh.setMatrixAt(index, this.circuitDummy.matrix);
      this.circuitArrowMesh.setColorAt(index, this.circuitMarkerColor.setHex(color));
    }

    this.circuitRingMesh.instanceMatrix.needsUpdate = true;
    this.circuitArrowMesh.instanceMatrix.needsUpdate = true;
    if (this.circuitRingMesh.instanceColor) this.circuitRingMesh.instanceColor.needsUpdate = true;
    if (this.circuitArrowMesh.instanceColor) this.circuitArrowMesh.instanceColor.needsUpdate = true;
    this.stats.circuitMotionSamples += targetCount;
  }

  addPolishAsset(group, assetName, x, z, rotation, scale) {
    const asset = this.world.cloneEnvironmentAsset(assetName);
    if (!asset) return false;
    asset.name = `STUNT_${assetName}`;
    asset.position.set(x, 0.16, z);
    asset.rotation.y = rotation;
    asset.scale.setScalar(scale);
    group.add(asset);
    return true;
  }
}

function createRampShape(width, length, height) {
  const halfWidth = width / 2;
  const halfLength = length / 2;
  const lowTop = -0.18;
  const bottom = -0.82;
  const vertices = new Float32Array([
    -halfWidth, lowTop, -halfLength,
    halfWidth, lowTop, -halfLength,
    halfWidth, height, halfLength,
    -halfWidth, height, halfLength,
    -halfWidth, bottom, -halfLength,
    halfWidth, bottom, -halfLength,
    halfWidth, bottom, halfLength,
    -halfWidth, bottom, halfLength
  ]);
  const indices = new Uint32Array([
    0, 2, 1, 0, 3, 2,
    4, 7, 6, 4, 6, 5,
    0, 4, 5, 0, 5, 1,
    3, 2, 6, 3, 6, 7,
    0, 3, 7, 0, 7, 4,
    1, 5, 6, 1, 6, 2
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return { geometry, vertices, indices };
}

function createStuntChevronGeometry() {
  const vertices = new Float32Array([
    0, 0, 1.55,
    -1.05, 0, -0.95,
    0, 0, -0.42,
    1.05, 0, -0.95
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ]), 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  return geometry;
}

function createCircuitArrowGeometry() {
  const vertices = new Float32Array([
    0, 0, 2.1,
    -1.2, 0, -0.8,
    -0.34, 0, -0.34,
    0.34, 0, -0.34,
    1.2, 0, -0.8
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ]), 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4]);
  geometry.computeVertexNormals();
  return geometry;
}

function circuitHeading(index) {
  const current = circuitCheckpoints[index];
  const next = circuitCheckpoints[Math.min(circuitCheckpoints.length - 1, index + 1)];
  const previous = circuitCheckpoints[Math.max(0, index - 1)];
  const from = index < circuitCheckpoints.length - 1 ? current : previous;
  const to = index < circuitCheckpoints.length - 1 ? next : current;
  return Math.atan2(to[0] - from[0], to[2] - from[2]);
}
