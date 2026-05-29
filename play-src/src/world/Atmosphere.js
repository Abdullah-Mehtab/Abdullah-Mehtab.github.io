// ABOUTME: Adds the stylized sky, sun disk, and distant cloud motion for /play.
// ABOUTME: Uses cheap geometry and quality gates instead of expensive volumetric effects.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { WORLD_HALF_SIZE } from './worldData.js';
import { QUALITY_PROFILES, WATER_Y, pseudoRandom } from './WorldMaterials.js';

const DISTANT_ISLET_LIMITS = { low: 8, medium: 14, high: 20 };

export class Atmosphere {
  constructor(world) {
    this.world = world;
    this.skyDome = null;
    this.clouds = [];
    this.sunDisk = null;
    this.sunGlows = [];
    this.horizonRibbons = [];
    this.distantIslets = [];
    this.distantIsletLimit = DISTANT_ISLET_LIMITS.medium;
    this.isletBaseMesh = null;
    this.isletHillMesh = null;
    this.isletDummy = new THREE.Object3D();
    this.cloudShadowMesh = null;
    this.shadowDummy = new THREE.Object3D();
    this.motionSamples = 0;
  }

  build() {
    this.createSkyDome();
    this.createHorizonRibbons();
    this.createClouds();
    this.createDistantIslets();
    this.createCloudShadows();
  }

  createSkyDome() {
    const geometry = new THREE.SphereGeometry(WORLD_HALF_SIZE * 3.2, 48, 24);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        zenith: { value: new THREE.Color(0x4e8ee7) },
        upper: { value: new THREE.Color(0x8fdbff) },
        horizon: { value: new THREE.Color(0xffc083) },
        low: { value: new THREE.Color(0xa3efe2) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform vec3 zenith;
        uniform vec3 upper;
        uniform vec3 horizon;
        uniform vec3 low;
        void main() {
          float h = normalize(vWorldPosition).y * 0.5 + 0.5;
          vec3 color = mix(low, horizon, smoothstep(0.02, 0.2, h));
          color = mix(color, upper, smoothstep(0.18, 0.62, h));
          color = mix(color, zenith, smoothstep(0.58, 1.0, h));
          float glow = pow(max(0.0, h), 5.0);
          color += glow * vec3(0.02, 0.04, 0.08);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    const dome = new THREE.Mesh(geometry, material);
    dome.name = 'MedievalIslandSkyDome';
    this.skyDome = dome;
    this.world.scene.add(dome);

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb56f,
      transparent: true,
      opacity: 0.78,
      depthWrite: false
    });
    this.sunDisk = new THREE.Mesh(new THREE.CircleGeometry(18, 48), sunMaterial);
    this.sunDisk.name = 'CinematicSunDisk';
    this.sunDisk.position.set(-162, 58, -138);
    this.sunDisk.lookAt(0, 22, 0);
    this.world.scene.add(this.sunDisk);

    const glowSpecs = [
      { radius: 28, color: 0xffc083, opacity: 0.22 },
      { radius: 44, color: 0xff8f67, opacity: 0.12 },
      { radius: 66, color: 0x9be7ff, opacity: 0.055 }
    ];
    for (let i = 0; i < glowSpecs.length; i += 1) {
      const spec = glowSpecs[i];
      const glow = new THREE.Mesh(
        new THREE.CircleGeometry(spec.radius, 48),
        new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: spec.opacity,
          depthWrite: false,
          side: THREE.DoubleSide
        })
      );
      glow.name = `CinematicSunGlow_${i}`;
      glow.position.copy(this.sunDisk.position);
      glow.position.multiplyScalar(0.998 - i * 0.002);
      glow.lookAt(0, 22, 0);
      this.world.scene.add(glow);
      this.sunGlows.push(glow);
    }
  }

  createHorizonRibbons() {
    const specs = [
      { inner: WORLD_HALF_SIZE * 1.02, outer: WORLD_HALF_SIZE * 1.035, color: 0xffd39a, opacity: 0.13 },
      { inner: WORLD_HALF_SIZE * 1.105, outer: WORLD_HALF_SIZE * 1.118, color: 0x9be7ff, opacity: 0.09 },
      { inner: WORLD_HALF_SIZE * 1.19, outer: WORLD_HALF_SIZE * 1.202, color: 0xffffff, opacity: 0.055 }
    ];
    for (let i = 0; i < specs.length; i += 1) {
      const spec = specs[i];
      const ribbon = new THREE.Mesh(
        new THREE.RingGeometry(spec.inner, spec.outer, 160),
        new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: spec.opacity,
          depthWrite: false,
          side: THREE.DoubleSide
        })
      );
      ribbon.name = `Atmosphere_Horizon_Ribbon_${i}`;
      ribbon.rotation.x = -Math.PI / 2;
      ribbon.position.y = -0.48 + i * 0.018;
      this.world.scene.add(ribbon);
      this.horizonRibbons.push(ribbon);
    }
  }

  createClouds() {
    const maxClouds = QUALITY_PROFILES.high.clouds;
    for (let i = 0; i < maxClouds; i += 1) {
      const group = new THREE.Group();
      group.name = `Cloud_${i}`;
      const material = new THREE.MeshBasicMaterial({
        color: i % 4 === 0 ? 0xffd9c2 : 0xffffff,
        transparent: true,
        opacity: 0.58,
        depthWrite: false
      });
      const lobes = 6 + (i % 4);
      const geometries = [];
      for (let j = 0; j < lobes; j += 1) {
        const geometry = new THREE.IcosahedronGeometry(3.2 + (j % 3) * 0.55, 2);
        const matrix = new THREE.Matrix4()
          .compose(
            new THREE.Vector3((j - lobes / 2) * 3.1, Math.sin(j * 1.8) * 0.7, Math.cos(j * 2.1) * 1.65),
            new THREE.Quaternion(),
            new THREE.Vector3(1.55 + (j % 2) * 0.28, 0.46, 0.84 + (j % 3) * 0.12)
          );
        geometry.applyMatrix4(matrix);
        geometries.push(geometry);
      }
      const merged = mergeGeometries(geometries, false);
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = `Cloud_${i}_merged_lobes`;
      group.add(mesh);
      const angle = (i / maxClouds) * Math.PI * 2;
      const radius = 132 + (i % 5) * 26;
      group.position.set(Math.cos(angle) * radius, 58 + (i % 4) * 6, Math.sin(angle) * radius);
      group.rotation.y = angle;
      group.scale.setScalar(0.9 + (i % 5) * 0.12);
      this.world.scene.add(group);
      this.clouds.push(group);
    }
    this.applyQuality();
  }

  createCloudShadows() {
    const maxClouds = QUALITY_PROFILES.high.clouds;
    const geometry = new THREE.CircleGeometry(1, 24);
    const material = new THREE.MeshBasicMaterial({
      color: 0x14352d,
      transparent: true,
      opacity: 0.115,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.cloudShadowMesh = new THREE.InstancedMesh(geometry, material, maxClouds);
    this.cloudShadowMesh.name = 'Atmosphere_Cloud_Shadows';
    this.cloudShadowMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.world.scene.add(this.cloudShadowMesh);
    this.applyQuality();
    this.writeCloudShadows(0);
  }

  createDistantIslets() {
    const capacity = DISTANT_ISLET_LIMITS.high;
    const baseGeometry = new THREE.IcosahedronGeometry(1, 0);
    const hillGeometry = new THREE.ConeGeometry(1, 1, 7);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9985f,
      roughness: 0.96,
      metalness: 0.0,
      flatShading: true
    });
    const hillMaterial = new THREE.MeshStandardMaterial({
      color: 0x315f3b,
      roughness: 0.94,
      metalness: 0.0,
      flatShading: true
    });

    this.isletBaseMesh = new THREE.InstancedMesh(baseGeometry, baseMaterial, capacity);
    this.isletBaseMesh.name = 'Atmosphere_Distant_Islet_Bases';
    this.isletBaseMesh.frustumCulled = false;
    this.world.scene.add(this.isletBaseMesh);

    this.isletHillMesh = new THREE.InstancedMesh(hillGeometry, hillMaterial, capacity);
    this.isletHillMesh.name = 'Atmosphere_Distant_Islet_Hills';
    this.isletHillMesh.frustumCulled = false;
    this.world.scene.add(this.isletHillMesh);

    for (let i = 0; i < capacity; i += 1) {
      const angle = -Math.PI * 0.08 + (i / capacity) * Math.PI * 2 + (pseudoRandom(i * 4.7) - 0.5) * 0.12;
      const radius = WORLD_HALF_SIZE * (1.16 + pseudoRandom(i * 6.3) * 0.54);
      const scale = 0.78 + pseudoRandom(i * 9.1) * 0.64;
      this.distantIslets.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotation: angle + Math.PI * 0.5 + (pseudoRandom(i * 11.3) - 0.5) * 0.42,
        baseScale: scale,
        width: 8.5 + pseudoRandom(i * 13.7) * 13.5,
        depth: 2.0 + pseudoRandom(i * 17.1) * 4.2,
        hillOffset: (pseudoRandom(i * 19.9) - 0.5) * 3.2,
        hillHeight: 2.2 + pseudoRandom(i * 23.5) * 4.4,
        phase: i * 0.83
      });
    }

    this.writeDistantIslets(0);
  }

  applyQuality() {
    const profile = this.world.getQualityProfile();
    for (let i = 0; i < this.clouds.length; i += 1) {
      this.clouds[i].visible = i < profile.clouds;
    }
    for (let i = 0; i < this.sunGlows.length; i += 1) {
      this.sunGlows[i].visible = this.world.landscapeQuality === 'low' ? i === 0 : true;
    }
    for (let i = 0; i < this.horizonRibbons.length; i += 1) {
      this.horizonRibbons[i].visible = this.world.landscapeQuality === 'low' ? i === 0 : true;
    }
    if (this.cloudShadowMesh) {
      this.cloudShadowMesh.count = profile.clouds;
      this.cloudShadowMesh.visible = profile.clouds > 0;
    }
    this.distantIsletLimit = DISTANT_ISLET_LIMITS[this.world.landscapeQuality] || DISTANT_ISLET_LIMITS.medium;
    if (this.isletBaseMesh) {
      this.isletBaseMesh.count = this.distantIsletLimit;
      this.isletBaseMesh.visible = this.distantIsletLimit > 0;
    }
    if (this.isletHillMesh) {
      this.isletHillMesh.count = this.distantIsletLimit;
      this.isletHillMesh.visible = this.distantIsletLimit > 0;
    }
    this.writeDistantIslets(0);
  }

  update(dt, elapsed) {
    if (this.sunDisk) {
      this.sunDisk.material.opacity = 0.68 + Math.sin(elapsed * 0.18) * 0.06;
    }
    for (let i = 0; i < this.sunGlows.length; i += 1) {
      const glow = this.sunGlows[i];
      glow.material.opacity = (i === 0 ? 0.22 : i === 1 ? 0.12 : 0.055) + Math.sin(elapsed * 0.16 + i) * 0.018;
      glow.rotation.z += dt * (0.018 + i * 0.006);
    }
    for (let i = 0; i < this.horizonRibbons.length; i += 1) {
      const ribbon = this.horizonRibbons[i];
      ribbon.material.opacity = (i === 0 ? 0.13 : i === 1 ? 0.09 : 0.055) + Math.sin(elapsed * 0.22 + i * 0.7) * 0.016;
      ribbon.rotation.z += dt * (0.002 + i * 0.0012);
    }
    for (let i = 0; i < this.clouds.length; i += 1) {
      const cloud = this.clouds[i];
      cloud.rotation.y += dt * (0.01 + i * 0.00035);
      cloud.position.x += Math.sin(elapsed * 0.035 + i) * dt * 0.1;
      cloud.position.z += Math.cos(elapsed * 0.025 + i * 0.7) * dt * 0.06;
    }
    this.writeCloudShadows(elapsed);
    this.writeDistantIslets(elapsed);
    this.motionSamples += 1;
  }

  writeCloudShadows(elapsed) {
    if (!this.cloudShadowMesh) return;
    const visible = this.cloudShadowMesh.count;
    for (let i = 0; i < visible; i += 1) {
      const cloud = this.clouds[i];
      const drift = Math.sin(elapsed * 0.08 + i) * 2.6;
      this.shadowDummy.position.set(cloud.position.x * 0.55 + drift, 0.13, cloud.position.z * 0.55);
      this.shadowDummy.rotation.set(-Math.PI / 2, 0, cloud.rotation.y * 0.35);
      this.shadowDummy.scale.set(18 + (i % 4) * 3.2, 9 + (i % 3) * 2.1, 1);
      this.shadowDummy.updateMatrix();
      this.cloudShadowMesh.setMatrixAt(i, this.shadowDummy.matrix);
    }
    this.cloudShadowMesh.instanceMatrix.needsUpdate = true;
  }

  writeDistantIslets(elapsed) {
    if (!this.isletBaseMesh || !this.isletHillMesh) return;
    const visible = Math.min(this.distantIsletLimit, this.distantIslets.length);
    for (let i = 0; i < visible; i += 1) {
      const islet = this.distantIslets[i];
      const bob = Math.sin(elapsed * 0.18 + islet.phase) * 0.035;

      this.isletDummy.position.set(islet.x, WATER_Y + 0.11 + bob, islet.z);
      this.isletDummy.rotation.set(0.03, islet.rotation, -0.04);
      this.isletDummy.scale.set(islet.width * islet.baseScale, 0.36 * islet.baseScale, islet.depth * islet.baseScale);
      this.isletDummy.updateMatrix();
      this.isletBaseMesh.setMatrixAt(i, this.isletDummy.matrix);

      this.isletDummy.position.set(
        islet.x + Math.cos(islet.rotation) * islet.hillOffset,
        WATER_Y + 0.52 + bob,
        islet.z - Math.sin(islet.rotation) * islet.hillOffset
      );
      this.isletDummy.rotation.set(0, islet.rotation + 0.18, 0);
      this.isletDummy.scale.set(islet.width * 0.18 * islet.baseScale, islet.hillHeight * islet.baseScale, islet.depth * 0.22 * islet.baseScale);
      this.isletDummy.updateMatrix();
      this.isletHillMesh.setMatrixAt(i, this.isletDummy.matrix);
    }
    for (let i = visible; i < this.distantIslets.length; i += 1) {
      this.isletDummy.position.set(0, -1000, 0);
      this.isletDummy.scale.set(0, 0, 0);
      this.isletDummy.updateMatrix();
      this.isletBaseMesh.setMatrixAt(i, this.isletDummy.matrix);
      this.isletHillMesh.setMatrixAt(i, this.isletDummy.matrix);
    }
    this.isletBaseMesh.instanceMatrix.needsUpdate = true;
    this.isletHillMesh.instanceMatrix.needsUpdate = true;
  }

  getStats() {
    return {
      skyDome: Boolean(this.skyDome),
      sunDisk: Boolean(this.sunDisk),
      sunGlows: this.sunGlows.length,
      visibleSunGlows: this.sunGlows.filter((glow) => glow.visible).length,
      horizonRibbons: this.horizonRibbons.length,
      visibleHorizonRibbons: this.horizonRibbons.filter((ribbon) => ribbon.visible).length,
      distantIslets: this.distantIslets.length,
      visibleDistantIslets: this.isletBaseMesh?.count || 0,
      clouds: this.clouds.length,
      visibleClouds: this.clouds.filter((cloud) => cloud.visible).length,
      cloudShadowInstances: this.cloudShadowMesh?.count || 0,
      motionSamples: this.motionSamples
    };
  }
}
