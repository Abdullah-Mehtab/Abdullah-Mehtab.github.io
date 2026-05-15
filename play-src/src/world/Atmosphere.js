import * as THREE from 'three';
import { WORLD_HALF_SIZE } from './worldData.js';

export class Atmosphere {
  constructor(world) {
    this.world = world;
    this.clouds = [];
    this.sunDisk = null;
  }

  build() {
    this.createSkyDome();
    this.createClouds();
  }

  createSkyDome() {
    const geometry = new THREE.SphereGeometry(WORLD_HALF_SIZE * 3.2, 48, 24);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        zenith: { value: new THREE.Color(0x2e9ee9) },
        upper: { value: new THREE.Color(0x76d1ff) },
        horizon: { value: new THREE.Color(0xf2d6aa) },
        low: { value: new THREE.Color(0xa9e8f4) }
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
    this.world.scene.add(dome);

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe4a5,
      transparent: true,
      opacity: 0.78,
      depthWrite: false
    });
    this.sunDisk = new THREE.Mesh(new THREE.CircleGeometry(18, 48), sunMaterial);
    this.sunDisk.name = 'CinematicSunDisk';
    this.sunDisk.position.set(-155, 84, -125);
    this.sunDisk.lookAt(0, 22, 0);
    this.world.scene.add(this.sunDisk);
  }

  createClouds() {
    const profile = this.world.getQualityProfile();
    for (let i = 0; i < profile.clouds; i += 1) {
      const group = new THREE.Group();
      group.name = `Cloud_${i}`;
      const material = new THREE.MeshBasicMaterial({
        color: i % 4 === 0 ? 0xfff2dd : 0xffffff,
        transparent: true,
        opacity: 0.64,
        depthWrite: false
      });
      const lobes = 6 + (i % 4);
      for (let j = 0; j < lobes; j += 1) {
        const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2 + (j % 3) * 0.55, 2), material);
        mesh.position.set((j - lobes / 2) * 3.1, Math.sin(j * 1.8) * 0.7, Math.cos(j * 2.1) * 1.65);
        mesh.scale.set(1.55 + (j % 2) * 0.28, 0.46, 0.84 + (j % 3) * 0.12);
        group.add(mesh);
      }
      const angle = (i / profile.clouds) * Math.PI * 2;
      const radius = 132 + (i % 5) * 26;
      group.position.set(Math.cos(angle) * radius, 58 + (i % 4) * 6, Math.sin(angle) * radius);
      group.rotation.y = angle;
      group.scale.setScalar(0.9 + (i % 5) * 0.12);
      this.world.scene.add(group);
      this.clouds.push(group);
    }
  }

  update(dt, elapsed) {
    if (this.sunDisk) {
      this.sunDisk.material.opacity = 0.68 + Math.sin(elapsed * 0.18) * 0.06;
    }
    for (let i = 0; i < this.clouds.length; i += 1) {
      const cloud = this.clouds[i];
      cloud.rotation.y += dt * (0.01 + i * 0.00035);
      cloud.position.x += Math.sin(elapsed * 0.035 + i) * dt * 0.1;
      cloud.position.z += Math.cos(elapsed * 0.025 + i * 0.7) * dt * 0.06;
    }
  }
}
