import * as THREE from 'three';
import { WORLD_HALF_SIZE } from './worldData.js';

export class Atmosphere {
  constructor(world) {
    this.world = world;
    this.clouds = [];
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
        top: { value: new THREE.Color(0x51b8f4) },
        horizon: { value: new THREE.Color(0xcdf4ff) }
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
        uniform vec3 top;
        uniform vec3 horizon;
        void main() {
          float h = normalize(vWorldPosition).y * 0.5 + 0.5;
          vec3 color = mix(horizon, top, smoothstep(0.14, 0.9, h));
          color += pow(max(h, 0.0), 4.0) * vec3(0.03, 0.04, 0.06);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    const dome = new THREE.Mesh(geometry, material);
    dome.name = 'MedievalIslandSkyDome';
    this.world.scene.add(dome);
  }

  createClouds() {
    const profile = this.world.getQualityProfile();
    for (let i = 0; i < profile.clouds; i += 1) {
      const group = new THREE.Group();
      group.name = `Cloud_${i}`;
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.68, depthWrite: false });
      const lobes = 4 + (i % 3);
      for (let j = 0; j < lobes; j += 1) {
        const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2 + j * 0.35, 1), material);
        mesh.position.set((j - lobes / 2) * 3.5, Math.sin(j) * 0.55, Math.cos(j * 2.1) * 1.3);
        mesh.scale.set(1.35, 0.48, 0.78);
        group.add(mesh);
      }
      const angle = (i / profile.clouds) * Math.PI * 2;
      const radius = 112 + (i % 5) * 20;
      group.position.set(Math.cos(angle) * radius, 56 + (i % 4) * 5, Math.sin(angle) * radius);
      group.rotation.y = angle;
      this.world.scene.add(group);
      this.clouds.push(group);
    }
  }

  update(dt, elapsed) {
    for (let i = 0; i < this.clouds.length; i += 1) {
      const cloud = this.clouds[i];
      cloud.rotation.y += dt * (0.012 + i * 0.0004);
      cloud.position.x += Math.sin(elapsed * 0.04 + i) * dt * 0.08;
    }
  }
}
