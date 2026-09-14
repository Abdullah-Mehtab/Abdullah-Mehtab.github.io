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
//
// A placement is [x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ]; everything after the
// position is optional, and a single scale value applies to all three axes.
// Eleven heatsink fins and twelve endpoint machines were sixty-six draw calls between them,
// which was a third of the worst frame on the page.
export function repeated(geometry, placements, faceColor, lineColor, lineOpacity) {
  const group = new THREE.Group();

  const bodies = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ color: faceColor }), placements.length);
  const slot = new THREE.Object3D();
  placements.forEach((at, i) => {
    slot.position.set(at[0], at[1], at[2]);
    slot.rotation.set(at[3] || 0, at[4] || 0, at[5] || 0);
    // Per-copy scale, so one call can carry parts of genuinely different proportions. Seven
    // connector housings of seven sizes were seven meshes and fourteen draw calls before this;
    // they are one shape at seven scales, and the draw calls it frees pay for shapes that are
    // actually different.
    slot.scale.set(at[6] === undefined ? 1 : at[6], at[7] === undefined ? (at[6] === undefined ? 1 : at[6]) : at[7], at[8] === undefined ? (at[6] === undefined ? 1 : at[6]) : at[8]);
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

// A nameplate: the set's own words, painted into a canvas with a ground behind them.
//
// The ground is the part that matters. A label with no backing is legible against empty space
// and invisible against a dense wireframe, and a reviewer found exactly that: a caption that
// nothing was covering and nobody could read. Painting a soft dark pill behind the type means
// the label carries its own contrast wherever it ends up, instead of depending on what the
// camera happens to have put behind it.
export function nameplate(text, sub, accent, deep, worldWidth) {
  const width = 640;
  const height = sub ? 150 : 104;
  const texture = painted(width, height, (g, w, h) => {
    g.clearRect(0, 0, w, h);

    g.font = "600 46px Archivo, 'Segoe UI', sans-serif";
    const titleWidth = g.measureText(text).width;
    g.font = "400 30px 'IBM Plex Mono', ui-monospace, monospace";
    const subWidth = sub ? g.measureText(sub).width : 0;
    const boxWidth = Math.min(w - 8, Math.max(titleWidth, subWidth) + 48);
    const left = (w - boxWidth) / 2;

    const ground = g.createLinearGradient(left, 0, left + boxWidth, 0);
    // Darker than the page's own ground, not equal to it.
    //
    // Each act lifts its room's clear colour away from the background by up to 5% lightness, so
    // a plate painted in the background colour converges with the room it is standing in on the
    // brighter acts: measured at 3.12:1 for Filebeat and 3.22:1 for DDoS, against 7.76:1 for the
    // same plate style in the darkest act. Taking it below the darkest room puts the ink above
    // the floor everywhere instead of only where the room happens to help.
    const plate = deep.clone();
    const paleGround = deep.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;
    plate.offsetHSL(0, 0, paleGround ? 0.1 : -0.06);
    const shade = "#" + plate.getHexString();
    // Fully opaque through the middle where the words are, so the plate is a ground rather than
    // a tint over whatever geometry the label happens to be in front of. At f0 the six per cent
    // showing through was enough to take a plate sitting on its own node's wireframe to 4.4:1,
    // and darkening the ground did not move that: the fault was what was visible through it,
    // not what colour it was.
    ground.addColorStop(0, shade + "00");
    ground.addColorStop(0.16, shade + "ff");
    ground.addColorStop(0.84, shade + "ff");
    ground.addColorStop(1, shade + "00");
    g.fillStyle = ground;
    g.fillRect(left, 6, boxWidth, h - 12);

    // A rule under the words rather than a box around them: a border would read as a badge.
    g.fillStyle = "#" + accent.getHexString();
    g.globalAlpha = 0.4;
    g.fillRect(left + 18, h - 12, boxWidth - 36, 2);
    g.globalAlpha = 1;

    // The words are ink, not accent. The accent is the hue the whole room is painted in, so a
    // name written in it is the same colour as everything behind it: measured at 2.92:1 for the
    // stream labels and 3.06:1 for the graph's, against plates in act one that reach 6.88:1
    // because their ground happens to be darker. The rule under the words keeps the accent,
    // which is where it reads as a colour rather than as camouflage.
    //
    // Taken from the ground rather than passed in, so it is right on all eighteen themes: two
    // of them are light, and light ink on a pale plate is the same fault the other way round.
    const pale = deep.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;
    g.fillStyle = pale ? "#0b0f14" : "#f2f7fb";

    g.textBaseline = "middle";
    g.textAlign = "center";
    g.font = "600 46px Archivo, 'Segoe UI', sans-serif";
    g.fillText(text, w / 2, sub ? 46 : h / 2 - 3);
    if (sub) {
      g.globalAlpha = 0.78;
      g.font = "400 30px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(sub, w / 2, 96);
      g.globalAlpha = 1;
    }
  });
  const plate = panel(texture, worldWidth, (worldWidth * height) / width, 0);
  plate.userData.caption = text;
  return plate;
}

// A flock of small wireframe objects that tumble and drift on their own, in one draw call.
//
// Every set needs matter in the air around it or it reads as a model on a turntable, and the
// obvious way to get it, one mesh per object, costs one draw call each. Instead every object's
// edges are baked into a single buffer and the buffer is rewritten each frame from each
// object's own rotation and bob. Ten objects, one draw call, and they move independently.
//
// The shapes passed in are the point of it: this is where a set says what it is made of. A
// rack room has alert triangles and packets going past, a pipeline has log lines and pipe
// sections, and neither of them has a floating platonic solid in it.
export function drift(geometries, count, color, opacity, seed) {
  const random = seeded(seed || 3);
  const items = [];
  let total = 0;

  for (let i = 0; i < count; i++) {
    const source = new THREE.EdgesGeometry(geometries[i % geometries.length], 12).attributes.position;
    const base = new Float32Array(source.count * 3);
    for (let v = 0; v < source.count; v++) {
      base[v * 3] = source.getX(v);
      base[v * 3 + 1] = source.getY(v);
      base[v * 3 + 2] = source.getZ(v);
    }
    items.push({
      base,
      offset: total,
      // Biased to the set's own side of the frame rather than spread evenly around it.
      //
      // Spread evenly it reached 170 units either way, which on a frame whose left half is the
      // reading column meant a flock of lit quads behind every paragraph. It was the largest
      // remaining thing the scene put inside the words, above the sets themselves, and a
      // review had already called the flock louder than the board it surrounds.
      home: new THREE.Vector3(-34 + random() * 290, (random() - 0.5) * 210, (random() - 0.5) * 280),
      scale: 0.5 + random() * 1.1,
      spin: (random() - 0.5) * 0.5,
      tilt: random() * Math.PI,
      phase: random() * Math.PI * 2,
      sway: 2 + random() * 5
    });
    total += source.count;
  }

  const positions = new Float32Array(total * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const object = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color, transparent: true, opacity: opacity === undefined ? 0.3 : opacity
  }));
  // Fixed once, generously. Recomputing it every frame walks every vertex a second time
  // purely so the frustum test can be exact, and the flock never leaves this radius.
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 320);
  object.frustumCulled = false;

  const spot = new THREE.Object3D();
  const vertex = new THREE.Vector3();

  return {
    object,
    update(t) {
      for (const item of items) {
        spot.position.set(
          item.home.x,
          item.home.y + Math.sin(t * 0.3 + item.phase) * item.sway,
          item.home.z
        );
        spot.rotation.set(item.tilt + t * item.spin * 0.7, t * item.spin, item.tilt * 0.5);
        spot.scale.setScalar(item.scale);
        spot.updateMatrix();
        for (let v = 0; v < item.base.length; v += 3) {
          vertex.set(item.base[v], item.base[v + 1], item.base[v + 2]).applyMatrix4(spot.matrix);
          const at = (item.offset + v / 3) * 3;
          positions[at] = vertex.x;
          positions[at + 1] = vertex.y;
          positions[at + 2] = vertex.z;
        }
      }
      geometry.attributes.position.needsUpdate = true;
    }
  };
}

// A travelling pulse along a fixed path. Three of the four sets are about data moving from one
// box to another, and this is the only thing on screen that says so.
export function pulse(color, size) {
  const sprite = glow(color, size, 0.95);
  sprite.userData.at = 0;
  return sprite;
}

export { THREE };
