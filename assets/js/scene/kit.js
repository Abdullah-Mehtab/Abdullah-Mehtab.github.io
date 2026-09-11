// ABOUTME: The primitives every chapter set is built from: edged solids, halos, motes, painted panels.
// ABOUTME: Unlit throughout, so a set is defined by its silhouette and its edges rather than by a lighting rig.
import * as THREE from "../../vendor/three/three.module.min.js";

export const TAU = Math.PI * 2;
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, k) => a + (b - a) * k;
// Smoothstep. Every ease in this engine is this one, so nothing in a set can drift out of
// step with the camera move it is timed against.
export const ease = (k) => k * k * (3 - 2 * k);

// A seeded generator, so a set looks the same on every load and a screenshot taken twice is
// the same screenshot. Math.random would make every perceptual diff meaningless.
export function seeded(seed) {
  let s = (seed * 2654435761) >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// One shared soft dot, reused by every halo and every mote field on the page. Built once
// because a 128px canvas per sprite is a texture upload per sprite.
let haloTexture = null;
function halo() {
  if (haloTexture) return haloTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  haloTexture = new THREE.CanvasTexture(c);
  return haloTexture;
}

export function solid(geometry, color, opacity) {
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color,
    transparent: opacity !== undefined,
    opacity: opacity === undefined ? 1 : opacity
  }));
}

// EdgesGeometry at a 12 degree threshold keeps the outline and the real creases and drops the
// triangulation seams, which is the difference between a drawn object and a mesh of triangles.
export function wire(geometry, color, opacity) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 12),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: opacity === undefined ? 0.9 : opacity })
  );
}

// A dark face with a lit edge. Everything with a body on this page is one of these: it reads
// as a machined object at any distance and costs two draw calls.
export function edged(geometry, faceColor, lineColor, lineOpacity) {
  const mesh = solid(geometry, faceColor);
  mesh.add(wire(geometry, lineColor, lineOpacity));
  return mesh;
}

export function edgedBox(w, h, d, faceColor, lineColor, lineOpacity) {
  return edged(new THREE.BoxGeometry(w, h, d), faceColor, lineColor, lineOpacity);
}

export function glow(color, size, opacity) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: halo(),
    color,
    transparent: true,
    opacity: opacity === undefined ? 0.9 : opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  sprite.scale.set(size, size, 1);
  return sprite;
}

export function motes(positions, color, size, opacity) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(geometry, new THREE.PointsMaterial({
    color,
    size,
    map: halo(),
    transparent: true,
    opacity: opacity === undefined ? 0.8 : opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
}

// A line through a list of points, used for every cable and every data path.
export function thread(points, color, opacity) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: opacity === undefined ? 0.5 : opacity })
  );
}

// Text and diagrams are painted into a canvas at load and uploaded once. It is the only way
// to get real type into a WebGL scene without shipping a font atlas or a mesh per glyph.
export function painted(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

export function panel(texture, worldWidth, worldHeight, opacity) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(worldWidth, worldHeight),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: opacity === undefined ? 1 : opacity,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  );
  return mesh;
}

// Many copies of one shape as two draw calls instead of two per copy: an InstancedMesh for
// the bodies and a single LineSegments holding every copy's edges, baked into one buffer.
// Eleven heatsink fins and twelve endpoint machines were sixty-six draw calls between them,
// which was a third of the worst frame on the page.
export function repeated(geometry, placements, faceColor, lineColor, lineOpacity) {
  const group = new THREE.Group();

  const bodies = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ color: faceColor }), placements.length);
  const slot = new THREE.Object3D();
  placements.forEach((at, i) => {
    slot.position.set(at[0], at[1], at[2]);
    slot.rotation.set(at[3] || 0, at[4] || 0, at[5] || 0);
    slot.updateMatrix();
    bodies.setMatrixAt(i, slot.matrix);
  });
  bodies.instanceMatrix.needsUpdate = true;
  group.add(bodies);

  const edgeSource = new THREE.EdgesGeometry(geometry, 12).attributes.position;
  const points = new Float32Array(edgeSource.count * 3 * placements.length);
  const vertex = new THREE.Vector3();
  let write = 0;
  placements.forEach((at, i) => {
    bodies.getMatrixAt(i, slot.matrix);
    for (let v = 0; v < edgeSource.count; v++) {
      vertex.fromBufferAttribute(edgeSource, v).applyMatrix4(slot.matrix);
      points[write++] = vertex.x;
      points[write++] = vertex.y;
      points[write++] = vertex.z;
    }
  });
  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.BufferAttribute(points, 3));
  group.add(new THREE.LineSegments(lines, new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: lineOpacity === undefined ? 0.9 : lineOpacity
  })));

  return group;
}

// A travelling pulse along a fixed path. Three of the four sets are about data moving from one
// box to another, and this is the only thing on screen that says so.
export function pulse(color, size) {
  const sprite = glow(color, size, 0.95);
  sprite.userData.at = 0;
  return sprite;
}

export { THREE };
