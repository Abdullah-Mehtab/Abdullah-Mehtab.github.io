import * as THREE from 'three';
import { roadPaths, roadSegments } from './worldData.js';

const ROAD_STYLE = {
  ring: { shoulder: 1.6, line: 0xe0c46b },
  avenue: { shoulder: 1.3, line: 0xd6c4a2 },
  street: { shoulder: 1.1, line: 0xc8b38a },
  stunt: { shoulder: 1.4, line: 0xff9b6d },
  dirt: { shoulder: 1.8, line: 0x8d6338 },
  bridge: { shoulder: 1.4, line: 0xe8edf0 }
};

export class Roads {
  constructor(world) {
    this.world = world;
    this.segments = roadSegments;
  }

  build() {
    for (const path of roadPaths) {
      this.addPath(path);
    }
  }

  addPath(path) {
    const limit = path.closed ? path.points.length : path.points.length - 1;
    for (let i = 0; i < limit; i += 1) {
      const a = path.points[i];
      const b = path.points[(i + 1) % path.points.length];
      this.addSegment(a, b, path);
    }
    for (const point of path.points) {
      this.addNode(point, path);
    }
  }

  addSegment(a, b, path) {
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz);
    const x = (a[0] + b[0]) / 2;
    const z = (a[1] + b[1]) / 2;
    const rotation = Math.atan2(dx, dz);
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const width = path.width;

    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadEdge;
    const surfaceMaterial = path.hierarchy === 'dirt' ? this.world.materials.wood : this.world.materials.stoneRoad;
    const shoulder = new THREE.Mesh(
      new THREE.BoxGeometry(width + style.shoulder * 2, 0.026, length + width * 0.45),
      edgeMaterial
    );
    shoulder.name = `ROAD_${path.id}_shoulder`;
    shoulder.position.set(x, 0.072, z);
    shoulder.rotation.y = rotation;
    shoulder.receiveShadow = true;
    this.world.scene.add(shoulder);

    const stone = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.032, length + width * 0.28),
      surfaceMaterial
    );
    stone.name = `ROAD_${path.id}_stone`;
    stone.position.set(x, 0.102, z);
    stone.rotation.y = rotation;
    stone.receiveShadow = true;
    this.world.scene.add(stone);

    const lineMaterial = this.world.materials.roadLine.clone();
    lineMaterial.color.setHex(style.line);
    const dashCount = Math.max(1, Math.floor(length / 12));
    for (let i = 0; i < dashCount; i += 1) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.035, 3.2), lineMaterial);
      const t = (i + 0.5) / dashCount - 0.5;
      dash.position.set(x + Math.sin(rotation) * length * t, 0.132, z + Math.cos(rotation) * length * t);
      dash.rotation.y = rotation;
      this.world.scene.add(dash);
    }

    this.world.physics.createFixedBox([x, 0.035, z], [width + style.shoulder * 2, 0.16, length + width * 0.45], {
      rotation: [0, rotation, 0],
      friction: path.hierarchy === 'dirt' ? 0.82 : 1.15,
      restitution: 0.01
    });
  }

  addNode(point, path) {
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const radius = path.width * 0.42 + style.shoulder * 0.62;
    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadEdge;
    const surfaceMaterial = path.hierarchy === 'dirt' ? this.world.materials.wood : this.world.materials.stoneRoad;
    const node = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.03, 34), edgeMaterial);
    node.name = `ROAD_${path.id}_node`;
    node.position.set(point[0], 0.077, point[1]);
    node.receiveShadow = true;
    this.world.scene.add(node);

    const top = new THREE.Mesh(new THREE.CylinderGeometry(radius - style.shoulder * 0.55, radius - style.shoulder * 0.55, 0.034, 34), surfaceMaterial);
    top.position.set(point[0], 0.106, point[1]);
    top.receiveShadow = true;
    this.world.scene.add(top);
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
