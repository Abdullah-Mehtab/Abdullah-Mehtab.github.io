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

const ROAD_LAYER = {
  ring: 0,
  avenue: 1,
  street: 2,
  dirt: 2,
  stunt: 3,
  bridge: 4
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
    const layer = ROAD_LAYER[path.hierarchy] ?? 1;
    const shoulderY = 0.068 + layer * 0.001;
    const surfaceY = 0.104 + layer * 0.006;

    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadEdge;
    const surfaceMaterial = path.hierarchy === 'dirt' ? this.world.materials.wood : this.world.materials.stoneRoad;
    const shoulder = new THREE.Mesh(
      new THREE.BoxGeometry(width + style.shoulder * 2, 0.026, length + width * 0.45),
      edgeMaterial
    );
    shoulder.name = `ROAD_${path.id}_shoulder`;
    shoulder.position.set(x, shoulderY, z);
    shoulder.rotation.y = rotation;
    shoulder.receiveShadow = true;
    this.world.scene.add(shoulder);

    const stone = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.032, length + width * 0.28),
      surfaceMaterial
    );
    stone.name = `ROAD_${path.id}_stone`;
    stone.position.set(x, surfaceY, z);
    stone.rotation.y = rotation;
    stone.receiveShadow = true;
    this.world.scene.add(stone);

    const lineMaterial = this.world.materials.roadLine.clone();
    lineMaterial.color.setHex(style.line);
    const lineLength = Math.max(0, length - width * 2.4);
    const dashCount = Math.max(0, Math.floor(lineLength / 12));
    for (let i = 0; i < dashCount; i += 1) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.035, 3.2), lineMaterial);
      const t = (i + 0.5) / dashCount - 0.5;
      dash.position.set(x + Math.sin(rotation) * lineLength * t, surfaceY + 0.033, z + Math.cos(rotation) * lineLength * t);
      dash.rotation.y = rotation;
      this.world.scene.add(dash);
    }

    this.world.physics.createFixedBox([x, 0.025, z], [width + style.shoulder * 2, 0.05, length + width * 0.45], {
      rotation: [0, rotation, 0],
      friction: path.hierarchy === 'dirt' ? 0.82 : 1.15,
      restitution: 0.01
    });
  }

  addNode(point, path) {
    const style = ROAD_STYLE[path.hierarchy] || ROAD_STYLE.street;
    const radius = path.width * 0.58 + style.shoulder * 0.76;
    const layer = ROAD_LAYER[path.hierarchy] ?? 1;
    const shoulderY = 0.086 + layer * 0.003;
    const surfaceY = 0.142 + layer * 0.007;
    const edgeMaterial = path.hierarchy === 'dirt' ? this.world.materials.sand : this.world.materials.roadEdge;
    const surfaceMaterial = path.hierarchy === 'dirt' ? this.world.materials.wood : this.world.materials.stoneRoad;
    const node = new THREE.Mesh(new THREE.CircleGeometry(radius, 48), edgeMaterial);
    node.name = `ROAD_${path.id}_node`;
    node.position.set(point[0], shoulderY, point[1]);
    node.rotation.x = -Math.PI / 2;
    node.receiveShadow = true;
    node.renderOrder = 4 + layer;
    this.world.scene.add(node);

    const top = new THREE.Mesh(new THREE.CircleGeometry(radius - style.shoulder * 0.64, 48), surfaceMaterial);
    top.position.set(point[0], surfaceY + 0.028, point[1]);
    top.rotation.x = -Math.PI / 2;
    top.receiveShadow = true;
    top.renderOrder = 5 + layer;
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
