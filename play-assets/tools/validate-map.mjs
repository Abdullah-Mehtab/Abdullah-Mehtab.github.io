import {
  boostPads,
  canalSegments,
  ISLAND_RADIUS,
  roadPaths,
  WORLD_HALF_SIZE,
  worldZones
} from '../../play-src/src/world/worldData.js';

const errors = [];
const roadRects = roadPaths.flatMap((path) => pathSegments(path.points, path.width, path.closed).map((segment) => ({ ...segment, pathId: path.id })));
roadRects.forEach((rect, index) => { rect.index = index; });

validateBounds();
validateZones();
validateZoneSeparation();
validateBoostPads();
validateRoadConnectivity();

if (errors.length) {
  console.error(`Map validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Map validation passed: ${roadPaths.length} road paths, ${roadRects.length} road segments, ${worldZones.length} zones.`);

function validateBounds() {
  for (const path of roadPaths) {
    for (const [x, z] of path.points) {
      if (Math.abs(x) > WORLD_HALF_SIZE || Math.abs(z) > WORLD_HALF_SIZE) {
        errors.push(`${path.id} has point outside world bounds: ${x}, ${z}`);
      }
      if (Math.hypot(x, z) > ISLAND_RADIUS - path.width * 0.35) {
        errors.push(`${path.id} has point outside the island driveable land: ${x}, ${z}`);
      }
    }
  }
  for (const zone of worldZones) {
    const [x, , z] = zone.position;
    if (Math.abs(x) > WORLD_HALF_SIZE - zone.radius || Math.abs(z) > WORLD_HALF_SIZE - zone.radius) {
      errors.push(`${zone.id} is too close to or outside the world boundary.`);
    }
    if (Math.hypot(x, z) > ISLAND_RADIUS - zone.radius - 4) {
      errors.push(`${zone.id} is too close to or outside the island coastline.`);
    }
  }
}

function validateZones() {
  for (const zone of worldZones) {
    const [x, , z] = zone.position;
    const road = nearestRoad(x, z);
    const minimumClearance = road.width * 0.5 + Math.min(4.2, Math.max(2.4, zone.radius * 0.32));
    if (road.distance < minimumClearance && !zone.startsCircuit) {
      errors.push(`${zone.id} overlaps a driving lane: ${road.distance.toFixed(2)}m from road center.`);
    }
    const maximumApproach = zone.id === 'potato' ? 48 : zone.id === 'data-pier' ? 46 : 38;
    if (road.distance > maximumApproach) {
      errors.push(`${zone.id} is too far from a drivable approach road: ${road.distance.toFixed(2)}m.`);
    }
    if (isNearCanal(x, z, zone.radius * 0.35)) {
      errors.push(`${zone.id} is inside the canal/water clearance.`);
    }
  }
}

function validateZoneSeparation() {
  for (let i = 0; i < worldZones.length; i += 1) {
    for (let j = i + 1; j < worldZones.length; j += 1) {
      const a = worldZones[i];
      const b = worldZones[j];
      const distance = distance2D(a.position[0], a.position[2], b.position[0], b.position[2]);
      const minimum = a.radius + b.radius + 10;
      if (distance < minimum) {
        errors.push(`${a.id} and ${b.id} overlap or crowd each other: ${distance.toFixed(2)}m apart, needs ${minimum.toFixed(2)}m.`);
      }
    }
  }
}

function validateBoostPads() {
  for (const pad of boostPads) {
    const [x, , z] = pad.position;
    const road = nearestRoad(x, z);
    if (road.distance > road.width * 0.5 + 4) {
      errors.push(`${pad.id} is not placed on a readable road segment.`);
    }
    if (isNearCanal(x, z, 3)) {
      errors.push(`${pad.id} is too close to canal water.`);
    }
    const direction = [Math.sin(pad.rotation), Math.cos(pad.rotation)];
    const landing = [x + direction[0] * 24, z + direction[1] * 24];
    if (Math.abs(landing[0]) > WORLD_HALF_SIZE - 8 || Math.abs(landing[1]) > WORLD_HALF_SIZE - 8) {
      errors.push(`${pad.id} visual launch direction points outside the world.`);
    }
    if (Math.hypot(landing[0], landing[1]) > ISLAND_RADIUS - 8) {
      errors.push(`${pad.id} visual launch direction points off the island.`);
    }
    if (isNearCanal(landing[0], landing[1], 4)) {
      errors.push(`${pad.id} visual launch direction points into canal water.`);
    }
    const nearestZone = worldZones.find((zone) => distance2D(landing[0], landing[1], zone.position[0], zone.position[2]) < zone.radius + 4);
    if (nearestZone) {
      errors.push(`${pad.id} visual launch direction points into ${nearestZone.id}.`);
    }
  }
}

function validateRoadConnectivity() {
  const parent = roadRects.map((_, index) => index);
  for (const path of roadPaths) {
    const indices = roadRects
      .filter((rect) => rect.pathId === path.id)
      .map((rect) => rect.index);
    for (let i = 1; i < indices.length; i += 1) union(parent, indices[i - 1], indices[i]);
  }
  for (let i = 0; i < roadRects.length; i += 1) {
    for (let j = i + 1; j < roadRects.length; j += 1) {
      const a = roadRects[i];
      const b = roadRects[j];
      const threshold = (a.width + b.width) * 0.5 + 3.4;
      if (segmentDistance(a.a, a.b, b.a, b.b) <= threshold) union(parent, i, j);
    }
  }
  const roots = new Set(roadRects.map((_, index) => find(parent, index)));
  if (roots.size !== 1) {
    errors.push(`drivable road graph is disconnected into ${roots.size} components.`);
  }
}

function nearestRoad(x, z) {
  let best = { distance: Infinity, width: 0 };
  for (const road of roadRects) {
    const distance = pointToSegmentDistance([x, z], road.a, road.b);
    if (distance < best.distance) best = { distance, width: road.width, road };
  }
  return best;
}

function endpoint(x, z, depth, rotation, sign) {
  return [
    x + Math.sin(rotation) * depth * 0.5 * sign,
    z + Math.cos(rotation) * depth * 0.5 * sign
  ];
}

function isNearCanal(x, z, margin = 0) {
  for (const canal of canalSegments) {
    for (const segment of pathSegments(canal.points, canal.width)) {
      const distance = pointToSegmentDistance([x, z], segment.a, segment.b);
      if (distance <= canal.width * 0.5 + margin) return true;
    }
  }
  return false;
}

function pathSegments(points, width, closed = false) {
  const segments = [];
  const limit = closed ? points.length : points.length - 1;
  for (let i = 0; i < limit; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz) + width * 0.64;
    const rotation = Math.atan2(dx, dz);
    const x = (a[0] + b[0]) / 2;
    const z = (a[1] + b[1]) / 2;
    segments.push({
      x,
      z,
      width,
      depth: length,
      rotation,
      a: endpoint(x, z, length, rotation, -1),
      b: endpoint(x, z, length, rotation, 1)
    });
  }
  return segments;
}

function pointToSegmentDistance(point, a, b) {
  const vx = b[0] - a[0];
  const vz = b[1] - a[1];
  const wx = point[0] - a[0];
  const wz = point[1] - a[1];
  const lengthSq = vx * vx + vz * vz;
  const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, (wx * vx + wz * vz) / lengthSq));
  return distance2D(point[0], point[1], a[0] + vx * t, a[1] + vz * t);
}

function segmentDistance(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    pointToSegmentDistance(a, c, d),
    pointToSegmentDistance(b, c, d),
    pointToSegmentDistance(c, a, b),
    pointToSegmentDistance(d, a, b)
  );
}

function segmentsIntersect(a, b, c, d) {
  const o1 = orient(a, b, c);
  const o2 = orient(a, b, d);
  const o3 = orient(c, d, a);
  const o4 = orient(c, d, b);
  return o1 * o2 < 0 && o3 * o4 < 0;
}

function orient(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

function distance2D(ax, az, bx, bz) {
  return Math.hypot(ax - bx, az - bz);
}

function find(parent, value) {
  if (parent[value] !== value) parent[value] = find(parent, parent[value]);
  return parent[value];
}

function union(parent, a, b) {
  const rootA = find(parent, a);
  const rootB = find(parent, b);
  if (rootA !== rootB) parent[rootB] = rootA;
}
