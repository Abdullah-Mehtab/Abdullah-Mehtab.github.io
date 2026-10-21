// ABOUTME: Act I's set: the desk the whole lab ran on. A PC, two monitors (Kali on one, the three targets on the other), a keyboard,
// ABOUTME: a mouse and the Windows 10 laptop, drawn as faces and purple edges. The camera tours it and leaves through the Kali screen.
//
// The models were made in Blender for this page (sources in assets/models/_source/offensive-security-home-lab/) and are loaded by the
// wiring file before the engine starts, then cloned here, so a theme change can rebuild the set without loading anything again.
//
// The objects answer the visitor: the 3D mouse follows the real one, the 3D key for the real key pressed goes down and lights, the
// laptop shows its lock screen while the pointer is over it, the PC's fans speed up under the pointer, and the wheel lights while
// the page scrolls. Nothing is clickable. What a visitor types is never read, stored or sent: only which key it was, to press it.
import { THREE, clamp01, ease, nameplate, seeded } from "../kit.js";
import { mergeGeometries, mergeVertices } from "../../../vendor/three/addons/utils/BufferGeometryUtils.js";
import {
  KEY_DEFS, keyByCode, keyByLabel, legendCanvas, KALI_TIMELINE, kaliAt, kaliCanvas, targetsCanvas, drawKali, drawTargets,
  laptopCanvas, drawLaptop, SAVERS, SAVER_RUN, SAVER_PAUSE, mod, clamp, lerp
} from "./01-desk-paint.js";

const N_KEYS = KEY_DEFS.length;
// The models are modelled in metres; the set is laid out at 111.1 units to the metre and then scaled as a whole.
export const SCALE = 111.1;
const SET_SCALE = 0.5;
// The models' accent. It stays purple on every theme: the room, the faces and the page's words follow the theme instead.
// Owner ruling, 2026-10-18. Lifted the way the engine lifts a theme's accent, so it sits at the same strength as the other chapters' edges.
export const ACCENT = (() => { const hsl = {}; new THREE.Color(0xa070ff).getHSL(hsl); return new THREE.Color().setHSL(hsl.h, Math.min(1, hsl.s * 0.95), Math.min(0.72, hsl.l + 0.06)); })();
export const GLOW = 0xa070ff;
const HALO = 0xc24fff; // a true purple, a little redder than the lights on the machines
// The crease angle edges are found at, per model. The models round their edges with two or three bevel steps, and at the engine's
// usual 12 degrees every step drew its own line.
export const EDGE_ANGLE = { tower: 30, monitor: 30, laptop: 30, keyboard: 35, mouse: 30 };
// The share of the act the camera tours the desk for; the flight to act two takes the rest.
const HOLD = 0.56;
// How far through the tour the PC's name stays up: the wide view and the start of the move to the laptop, while the PC is in frame.
const PC_SHOWN_UNTIL = 0.14;

// ---------- the visitor, read once for the page however often the set is rebuilt ----------
const input = { x: 0, y: 0, inside: false, last: null, moved: -99, mouse: { x: 41, z: 28 }, keys: new Map(), ripples: [], ripplesStarted: 0, scrolledAt: -99 };
const MOUSE_HOME = { x: 41, z: 28 };
// The keyboard ends at x = 20 and the mouse is about 8 units wide and a little more when it turns, so its centre stays right of x = 28.
// It also stays on the mat (x from -48 to 64, z from 10 to 46), nose included.
const MOUSE_BOX = { x0: 28, x1: 54, z0: 18, z1: 38.4 };
const UNITS_PER_PIXEL = 0.05, MOUSE_IDLE_RETURN = 4;
export const motionOff = () => document.body.dataset.motion === "off" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const now = () => performance.now() / 1000;
const isTypingTarget = (el) => el instanceof Element && !!el.closest("input, textarea, select, [contenteditable]");
let listening = false;
function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("pointermove", (e) => {
    input.x = e.clientX; input.y = e.clientY; input.inside = true;
    if (e.pointerType !== "mouse" || motionOff()) { input.last = null; return; }
    // the change since the last event, worked out from the pointer's own position (the browser's movement values use different units in different browsers)
    if (input.last) {
      input.mouse.x = clamp(input.mouse.x + (e.clientX - input.last.x) * UNITS_PER_PIXEL, MOUSE_BOX.x0, MOUSE_BOX.x1);
      input.mouse.z = clamp(input.mouse.z + (e.clientY - input.last.y) * UNITS_PER_PIXEL, MOUSE_BOX.z0, MOUSE_BOX.z1);
      input.moved = now();
    }
    input.last = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  document.addEventListener("pointerleave", () => { input.inside = false; input.last = null; });
  window.addEventListener("keydown", (e) => {
    if (e.repeat || isTypingTarget(e.target) || motionOff()) return;
    const index = keyByCode.get(e.code) ?? Math.floor(Math.random() * N_KEYS); // keys the small 3D keyboard lacks press a random key
    input.keys.set(e.code, { index, releaseAt: Infinity });
    input.ripples.push({ index, t0: now() }); input.ripplesStarted++;
  });
  window.addEventListener("keyup", (e) => { const k = input.keys.get(e.code); if (k) k.releaseAt = now() + 0.09; });
  window.addEventListener("blur", () => { for (const k of input.keys.values()) k.releaseAt = now() + 0.05; });
  window.addEventListener("scroll", () => { input.scrolledAt = now(); }, { passive: true });
}

// ---------- how every body is drawn: a flat face, and its outline and real creases as thin lines in the accent ----------
export const edgeMaterial = (opacity) => new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity });
export const edgePoints = (geometry, angle) => new THREE.EdgesGeometry(geometry, angle).attributes.position.array;
export function edgeLines(chunks, opacity) {
  const all = new Float32Array(chunks.reduce((n, c) => n + c.length, 0)); let at = 0;
  for (const c of chunks) { all.set(c, at); at += c.length; }
  return new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(all, 3)), edgeMaterial(opacity));
}
// The loader keeps the models' compressed numbers as small integers. Merging and moving parts needs plain floats.
export function floatGeometry(src) {
  const g = new THREE.BufferGeometry();
  for (const [name, a] of Object.entries(src.attributes)) {
    const arr = new Float32Array(a.count * a.itemSize);
    for (let i = 0; i < a.count; i++) for (let k = 0; k < a.itemSize; k++) arr[i * a.itemSize + k] = a.getComponent(i, k);
    g.setAttribute(name, new THREE.BufferAttribute(arr, a.itemSize));
  }
  if (src.index) g.setIndex(new THREE.BufferAttribute(Uint32Array.from(src.index.array), 1));
  return g;
}
export const relMatrix = (root, o) => new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(o.matrixWorld);
const byName = (root, n) => root.getObjectByName(n);
// Things that move or change on their own stay separate meshes. Everything else is merged: one mesh for every face in a model, one for
// each glow, and one buffer holding all its edges, so a whole model costs a handful of draw calls however many parts it has.
const DYNAMIC = /^(key_|fan_|wheel$|screen$|led_)/;
const isDynamic = (o) => { for (let p = o; p; p = p.parent) if (DYNAMIC.test(p.name)) return true; return false; };

export function buildDesk(palette, models) {
  listen();
  const group = new THREE.Group();
  const faceMat = new THREE.MeshBasicMaterial({ color: palette.face });
  // The shared glows: every thin purple light is one of two materials, so they breathe and speed up together.
  const glowMat = new THREE.MeshBasicMaterial({ color: GLOW });
  const softMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(GLOW).multiplyScalar(0.55) });
  const drawnAs = (m) => {
    if (m === glowMat || m === softMat) return m;
    if (/^Glow_Purple_Soft/.test(m.name)) return softMat;
    if (/^Glow_Purple/.test(m.name)) return glowMat;
    return faceMat;
  };
  function mergeStatic(root, angle, opacity = 0.85) {
    root.updateMatrixWorld(true);
    const groups = new Map(), dead = [], edges = [];
    root.traverse((o) => {
      if (!o.isMesh || isDynamic(o)) return;
      dead.push(o);
      const name = o.material.name || "";
      if (name === "Glass_Clear") return; // glass in front of a screen would only dim it
      const g = floatGeometry(o.geometry); g.applyMatrix4(relMatrix(root, o));
      for (const n of Object.keys(g.attributes)) if (n !== "position") g.deleteAttribute(n); // unlit flat colour needs nothing else
      const material = drawnAs(o.material);
      // the tower's side glass keeps its outline and shows the parts inside
      if (material === faceMat) { edges.push(edgePoints(g, angle)); if (/^Glass_/.test(name)) return; }
      if (!groups.has(material)) groups.set(material, []);
      groups.get(material).push(g);
    });
    for (const o of dead) o.removeFromParent();
    for (const [material, geos] of groups) root.add(new THREE.Mesh(mergeGeometries(geos, false), material));
    if (edges.length) root.add(edgeLines(edges, opacity));
  }
  // A part that moves on its own carries its own edges, so they move with it.
  function edgeMovingPart(mesh, angle, opacity = 0.85) {
    mesh.material = faceMat;
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, angle), edgeMaterial(opacity)));
  }
  // A smooth body has almost no creases, so edges alone leave it without an outline. This draws one: a copy of the body pushed out
  // along its normals by `width` (model units, metres) and drawn from its back faces only, so it shows as a line wherever the body
  // meets what is behind it.
  function silhouette(root, width, opacity = 0.85) {
    for (const mesh of root.children.filter((o) => o.isMesh && o.material === faceMat)) {
      const g = mergeVertices(mesh.geometry.clone()); g.computeVertexNormals();
      const m = new THREE.MeshBasicMaterial({ color: ACCENT, side: THREE.BackSide, transparent: true, opacity });
      m.onBeforeCompile = (s) => { s.vertexShader = s.vertexShader.replace("#include <begin_vertex>", "vec3 transformed = position + normal * " + width.toFixed(5) + ";"); };
      m.customProgramCacheKey = () => "outline-" + width;
      m.userData.ownShader = true;
      root.add(new THREE.Mesh(g, m));
    }
  }
  const place = (gltf, x, y, z, ry = 0) => {
    const root = gltf.scene.clone(true);
    const h = new THREE.Group(); h.add(root); h.scale.setScalar(SCALE); h.position.set(x, y, z); h.rotation.y = ry; group.add(h); h.updateMatrixWorld(true);
    return { holder: h, root };
  };

  // ---------- the desk: one slab and four legs, with a mat for the keyboard and mouse ----------
  // Scenery: the engine places the set by the machines on it, not by the slab, and fades the slab behind the page's words.
  const deskFace = palette.face.clone().lerp(palette.rooms[0], 0.5);
  const slab = (w, h, d, x, y, z, opacity) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: deskFace })); m.position.set(x, y, z);
    m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 12), edgeMaterial(opacity)));
    m.userData.ambient = true; group.add(m);
  };
  slab(264, 5, 92, 0, -2.5, 0, 0.45);
  for (const [x, z] of [[-126, -40], [126, -40], [-126, 40], [126, 40]]) slab(4.6, 47, 4.6, x, -28.5, z, 0.3);
  slab(112, 0.5, 36, 8, 0.3, 28, 0.35);
  const MAT_TOP = 0.55;

  // ---------- the tower ----------
  const tower = place(models.tower, -106, 0, -14, -0.35);
  mergeStatic(tower.root, EDGE_ANGLE.tower);
  const fans = [];
  {
    // A fan spins about the line its blades are thin along, read from the blades themselves. (The model's own axes depend on how it was exported.)
    const thinAxis = (mesh) => {
      mesh.geometry.computeBoundingBox(); const b = mesh.geometry.boundingBox, s = mesh.scale;
      const ext = [(b.max.x - b.min.x) * Math.abs(s.x), (b.max.y - b.min.y) * Math.abs(s.y), (b.max.z - b.min.z) * Math.abs(s.z)];
      return new THREE.Vector3().setComponent(ext.indexOf(Math.min(...ext)), 1);
    };
    // The blades' own centre is exact because the blades repeat evenly round the axis. The fan turns about it.
    const bladeCentre = (mesh) => { const p = mesh.geometry.attributes.position, c = new THREE.Vector3(), v = new THREE.Vector3(); for (let i = 0; i < p.count; i++) c.add(v.fromBufferAttribute(p, i)); return c.multiplyScalar(1 / p.count).multiply(mesh.scale); };
    tower.root.traverse((o) => { if (/^fan_/.test(o.name)) fans.push({ node: o, q0: o.quaternion.clone(), p0: o.position.clone(), axis: thinAxis(o), centre: bladeCentre(o) }); });
    for (const f of fans) edgeMovingPart(f.node, EDGE_ANGLE.tower);
  }
  // The tower's network port, on its back panel at the motherboard side where the rear ports are: the model has none, and the film's
  // one network cable starts here. Its link light breathes with the other lights. Read by the engine when the chapter turns the cable on.
  const socket = new THREE.Object3D();
  {
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.013, 0.004), glowMat);
    port.position.set(-0.085, 0.27, -0.232);
    tower.root.add(port);
    socket.position.set(-0.085, 0.27, -0.236);
    tower.root.add(socket);
  }
  const driveMat = new THREE.MeshBasicMaterial({ color: 0xcfe3ff });
  tower.root.traverse((o) => { if (o.isMesh && /^led_/.test(o.name)) o.material = o.name === "led_drive" ? driveMat : glowMat; });

  // ---------- the two monitors, side by side a centimetre apart, each turned a few degrees towards the middle ----------
  const MONITOR_GAP = 0.6, MONITOR_HALF = 34, MONITOR_TURN = 0.09, MONITOR_Z = -14 + MONITOR_HALF * Math.sin(MONITOR_TURN);
  const MONITOR_X = [-(MONITOR_GAP + MONITOR_HALF * Math.cos(MONITOR_TURN)), MONITOR_GAP + MONITOR_HALF * Math.cos(MONITOR_TURN)];
  const screenTexture = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.flipY = false; return t; };
  const kaliTex = screenTexture(kaliCanvas), targetsTex = screenTexture(targetsCanvas), lapTex = screenTexture(laptopCanvas);
  const monitorModel = { scene: models.monitor.scene.clone(true) };
  mergeStatic(monitorModel.scene, EDGE_ANGLE.monitor);
  function monitor(x, ry, tex, name) {
    const m = place(monitorModel, x, 0, MONITOR_Z, ry);
    const screen = byName(m.root, "screen");
    screen.material = new THREE.MeshBasicMaterial({ map: tex });
    screen.userData.screen = name; // so the checks that look inside a screen can find it
    // The tour pans both monitors behind the act's title on its way across the desk, so their screens fade behind the words like the
    // rest of the set (owner ruling, 2026-10-18). The laptop is never behind the words and keeps its screen whole.
    screen.userData.fadesBehindText = true;
    const led = byName(m.root, "led_monitor"); if (led) led.material = glowMat;
    return m;
  }
  const monitorKali = monitor(MONITOR_X[0], MONITOR_TURN, kaliTex, "Kali");
  const monitorTargets = monitor(MONITOR_X[1], -MONITOR_TURN, targetsTex, "the three targets");

  // ---------- the laptop ----------
  const laptop = place(models.laptop, 98, 0, 2, -0.3);
  mergeStatic(laptop.root, EDGE_ANGLE.laptop);
  {
    const screen = byName(laptop.root, "screen"); screen.material = new THREE.MeshBasicMaterial({ map: lapTex }); screen.userData.screen = "the laptop";
    const led = byName(laptop.root, "led_laptop"); if (led) led.material = glowMat;
  }

  // ---------- the keyboard: the keys are merged into one mesh, and each answers the real key the visitor presses ----------
  const keyboard = place(models.keyboard, 0, MAT_TOP, 28);
  const keyUniforms = { uPress: { value: new Float32Array(96) }, uHot: { value: new Float32Array(96) }, uDown: { value: new THREE.Vector3(0, -1, 0) } };
  const PRESS = 0.0034; // key travel in metres
  // kind "cap": the face colour with the key's legend added on top, brighter while the key is lit. kind "lit": the material's own
  // colour, dim at rest and bright while lit.
  function patchKeys(material, kind) {
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, keyUniforms);
      shader.vertexShader = "attribute float aKey; varying float vKey; uniform float uPress[96]; uniform vec3 uDown;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n vKey = aKey; transformed += uDown * uPress[int(aKey + 0.5)];");
      shader.fragmentShader = "varying float vKey; uniform float uHot[96];\n" + shader.fragmentShader.replace(
        kind === "cap" ? "#include <map_fragment>" : "#include <color_fragment>",
        kind === "cap" ? "diffuseColor.rgb += texture2D(map, vMapUv).rgb * (0.38 + uHot[int(vKey + 0.5)] * 5.0);" : "#include <color_fragment>\n diffuseColor.rgb *= (0.5 + uHot[int(vKey + 0.5)] * 6.0);");
    };
    // Two materials of one kind of shader with the same patch text would otherwise share one compiled program.
    material.customProgramCacheKey = () => "keys-" + kind;
    material.userData.ownShader = true; // the engine adds its fade behind the page's words after this patch rather than instead of it
  }
  const legends = new THREE.CanvasTexture(legendCanvas("#a070ff"));
  legends.colorSpace = THREE.SRGBColorSpace; legends.anisotropy = 8; legends.flipY = false;
  let keysFound = 0;
  {
    const root = keyboard.root;
    root.updateMatrixWorld(true);
    keyUniforms.uDown.value.set(0, -1, 0).transformDirection(relMatrix(root, byName(root, "kb_tilt")));
    const capGeos = [], centres = new Array(N_KEYS), capEdges = [], capEdgeKeys = [];
    root.traverse((o) => {
      if (!o.isMesh || !o.name.startsWith("key_")) return;
      const idx = keyByCode.get(o.name.slice(4)); if (idx === undefined) return;
      const g = floatGeometry(o.geometry); g.applyMatrix4(relMatrix(root, o));
      g.setAttribute("aKey", new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(idx), 1));
      g.computeBoundingBox(); centres[idx] = g.boundingBox.getCenter(new THREE.Vector3());
      capGeos.push(g);
      // each key's own edges, tagged with its key so they go down with it
      const e = edgePoints(g, EDGE_ANGLE.keyboard); capEdges.push(e); capEdgeKeys.push(new Float32Array(e.length / 3).fill(idx));
    });
    byName(root, "kb_light_bar").material = softMat; // the thin front bar glows softly
    const underglow = byName(root, "kb_underglow");
    const glowGeo = floatGeometry(underglow.geometry); glowGeo.applyMatrix4(relMatrix(root, underglow));
    { // each pad of light belongs to the key above it, found by position
      const p = glowGeo.attributes.position, a = new Float32Array(p.count), v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); let best = 0, bd = Infinity; for (let k = 0; k < N_KEYS; k++) { if (!centres[k]) continue; const d = v.distanceToSquared(centres[k]); if (d < bd) { bd = d; best = k; } } a[i] = best; }
      glowGeo.setAttribute("aKey", new THREE.BufferAttribute(a, 1));
    }
    keysFound = capGeos.length;
    const capMat = new THREE.MeshBasicMaterial({ color: palette.face, map: legends }); patchKeys(capMat, "cap");
    const padMat = new THREE.MeshBasicMaterial({ color: GLOW }); patchKeys(padMat, "lit");
    const caps = new THREE.Mesh(mergeGeometries(capGeos, false), capMat); caps.name = "keycaps";
    const pads = new THREE.Mesh(glowGeo, padMat); pads.name = "keypads";
    const capLines = edgeLines(capEdges, 0.85); patchKeys(capLines.material, "lit"); capLines.name = "keyedges";
    const ids = new Float32Array(capEdgeKeys.reduce((n, c) => n + c.length, 0)); let at = 0;
    for (const c of capEdgeKeys) { ids.set(c, at); at += c.length; }
    capLines.geometry.setAttribute("aKey", new THREE.BufferAttribute(ids, 1));
    const dead = []; root.traverse((o) => { if (o.isMesh && (o.name.startsWith("key_") || o === underglow)) dead.push(o); }); dead.forEach((o) => o.removeFromParent());
    mergeStatic(root, EDGE_ANGLE.keyboard);
    root.add(caps, pads, capLines);
  }

  // ---------- the mouse ----------
  const mouse = place(models.mouse, input.mouse.x, MAT_TOP, input.mouse.z, 0.05);
  mergeStatic(mouse.root, EDGE_ANGLE.mouse);
  silhouette(mouse.root, 0.0006);
  // The wheel has its own face colour, which warms towards the accent while the page scrolls.
  const wheel = byName(mouse.root, "wheel"); edgeMovingPart(wheel, EDGE_ANGLE.mouse); wheel.material = new THREE.MeshBasicMaterial({ color: palette.face });

  // what the pointer can be over
  const pickables = [];
  for (const [root, part] of [[tower.root, "tower"], [laptop.root, "laptop"]]) root.traverse((o) => { if (o.isMesh) { o.userData.part = part; pickables.push(o); } });

  // ---------- the glow behind the monitors, and a few of this scene's own shapes in the air ----------
  // One soft halo in the room behind the two screens. Its colour follows what the screens are showing, held close to purple.
  // Added light disappears on a pale room, so on a light theme the halo is laid over normally and kept faint.
  const softDot = (() => { const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d"); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.3, "rgba(255,255,255,0.45)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  const HALO_OPACITY = palette.lightRoom ? 0.16 : 0.42;
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot, color: HALO, transparent: true, opacity: HALO_OPACITY, depthWrite: false, blending: palette.lightRoom ? THREE.NormalBlending : THREE.AdditiveBlending }));
  halo.scale.set(330, 170, 1); halo.position.set(0, 44, -70); halo.userData.ambient = true; group.add(halo);
  // Keycaps and packets, outlines only, all in one draw call; each tumbles and bobs on its own. Kept behind the desk and to its sides,
  // so nothing drifts across the camera's route.
  const flock = (() => {
    const shapes = [new THREE.BoxGeometry(4, 2.2, 4), new THREE.BoxGeometry(2.4, 2.4, 2.4)];
    const random = seeded(31), items = []; let total = 0;
    for (let i = 0; i < 18; i++) {
      const base = new THREE.EdgesGeometry(shapes[i % shapes.length], 12).attributes.position.array;
      const side = random() < 0.5 ? -1 : 1;
      items.push({ base, offset: total, home: new THREE.Vector3(side * (40 + random() * 200), 20 + random() * 110, -60 - random() * 160),
        scale: 0.7 + random() * 0.8, spin: (random() - 0.5) * 0.5, tilt: random() * Math.PI, phase: random() * 6.28, sway: 2 + random() * 5 });
      total += base.length / 3;
    }
    const positions = new Float32Array(total * 3), geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 70, -140), 320);
    const object = new THREE.LineSegments(geometry, edgeMaterial(0.25)); object.frustumCulled = false; object.userData.ambient = true;
    const spot = new THREE.Object3D(), v = new THREE.Vector3();
    const update = (t) => {
      for (const it of items) {
        spot.position.set(it.home.x, it.home.y + Math.sin(t * 0.3 + it.phase) * it.sway, it.home.z);
        spot.rotation.set(it.tilt + t * it.spin * 0.7, t * it.spin, it.tilt * 0.5); spot.scale.setScalar(it.scale); spot.updateMatrix();
        for (let k = 0; k < it.base.length; k += 3) { v.set(it.base[k], it.base[k + 1], it.base[k + 2]).applyMatrix4(spot.matrix); positions[it.offset * 3 + k] = v.x; positions[it.offset * 3 + k + 1] = v.y; positions[it.offset * 3 + k + 2] = v.z; }
      }
      geometry.attributes.position.needsUpdate = true;
    };
    update(0);
    return { object, update };
  })();
  group.add(flock.object);

  // ---------- names: the PC, the targets, the attacker and the laptop, each hung from the thing it names ----------
  // The PC's name is up only while the camera is on the wide view. Left up for the whole tour it named the desk as a whole while the
  // camera was on one monitor (owner, 2026-10-19). It goes at once rather than fading: a plate is legible or gone.
  // The engine hides a plate while another object stands between the camera and the one it names, and it asks that question of the
  // plate's parent's own position. So each named model's holder is moved to the middle of its model (the model moved back to match),
  // and the plate hangs from it, scaled out of the model's metre units. `pos` is in the set's units, from that middle.
  const labels = [
    { text: "Home PC", sub: "runs it all", from: tower, pos: [72, 44, 10], width: 70, primary: true, until: PC_SHOWN_UNTIL, fit: true },
    { text: "Metasploitable", sub: "the vulnerable targets", from: monitorTargets, pos: [4, 26, 0], width: 40 },
    { text: "Kali", sub: "the attacking machine", from: monitorKali, pos: [-4, 26, 0], width: 34 },
    { text: "Windows 10", sub: "spare laptop, a target", from: laptop, pos: [0, 24, 8], width: 34 }
  ].map((l) => {
    const h = l.from.holder;
    h.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(l.from.root), middle = (box.min.y + box.max.y) / 2 - h.position.y;
    h.position.y += middle; l.from.root.position.y -= middle / SCALE; h.updateMatrixWorld(true);
    const plate = nameplate(l.text, l.sub, ACCENT, palette.deep, l.width, l.fit, 40);
    plate.scale.setScalar(1 / SCALE);
    plate.rotation.y = -h.rotation.y; // square to the desk's front until update turns it to the camera
    plate.position.set(l.pos[0] / SCALE, l.pos[1] / SCALE, l.pos[2] / SCALE);
    if (l.primary) plate.userData.primary = true;
    plate.userData.until = l.until;
    h.add(plate);
    return plate;
  });

  group.scale.setScalar(SET_SCALE);

  // ---------- the camera's route through the act, in the set's own units ----------
  // Wide on the desk, then the laptop, the targets' screen, the Kali screen and close on Kali. The engine flies on from the last stop
  // to act two, and the straight line there passes through the Kali screen. Each subject is framed in the right of the picture, because
  // the act's words stay pinned on the left for the whole tour: each stop looks to the left of its subject. The camera stays within 30
  // degrees of the desk's front at every stop, so the set never reads as turned towards the words (the page's facing check).
  const STOPS = [
    { at: 0.00, pos: [140, 140, 480], look: [-128, 10, -20], fov: 34 },
    { at: 0.26, pos: [100, 48, 185], look: [55, 8, -5], fov: 26 },
    { at: 0.50, pos: [55, 52, 165], look: [-8, 30, -9], fov: 30 },
    { at: 0.74, pos: [-10, 50, 160], look: [-75, 30, -9], fov: 30 },
    { at: 1.00, pos: [-15, 40, 100], look: [-72, 30, -9], fov: 30 }
  ];
  const HOLD_AT_STOP = 0.06; // a share of the act the camera rests at each stop before moving on
  const pose = { position: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40 };
  function tour(p) {
    p = clamp01(p);
    let i = 0; while (i < STOPS.length - 2 && p > STOPS[i + 1].at) i++;
    const a = STOPS[i], b = STOPS[i + 1];
    const k = ease(clamp01((p - a.at - HOLD_AT_STOP) / Math.max(1e-6, b.at - a.at - 2 * HOLD_AT_STOP)));
    pose.position.set(lerp(a.pos[0], b.pos[0], k), lerp(a.pos[1], b.pos[1], k), lerp(a.pos[2], b.pos[2], k));
    pose.look.set(lerp(a.look[0], b.look[0], k), lerp(a.look[1], b.look[1], k), lerp(a.look[2], b.look[2], k));
    pose.fov = lerp(a.fov, b.fov, k);
    return pose;
  }

  // ---------- everything that keeps moving ----------
  const fan = { angle: 0, boost: 0, scan: 0 };
  const wheelGlow = { v: 0 };
  const lap = { slot: 0, slotStart: 0, lastHover: -99, lockMix: 0, locked: false };
  const keyDepth = new Float32Array(N_KEYS), keyGoal = new Float32Array(N_KEYS), keyRipple = new Float32Array(N_KEYS);
  const haloColor = new THREE.Color(HALO), haloGoal = new THREE.Color(HALO), haloLevel = { v: 0.38, goal: 0.38 };
  const sampler = document.createElement("canvas"); sampler.width = 16; sampler.height = 9;
  const sctx = sampler.getContext("2d", { willReadFrequently: true });
  const qSpin = new THREE.Quaternion(), shift = new THREE.Vector3();
  const poseFan = (f, angle) => {
    f.node.quaternion.copy(f.q0).multiply(qSpin.setFromAxisAngle(f.axis, angle));
    f.node.position.copy(f.p0).add(shift.copy(f.centre).applyQuaternion(f.q0)).sub(shift.copy(f.centre).applyQuaternion(f.node.quaternion));
  };
  const raycaster = new THREE.Raycaster(), ndc = new THREE.Vector2();
  // A plate with `until` stays up while the camera is further back than the place the tour reaches at that share of it. Read from the
  // camera rather than from the act's progress, because with reduced motion the engine hands every set a progress of 1 while the camera
  // still tours with the scroll, and the PC's name was then never shown at all.
  for (const plate of labels) if (plate.userData.until !== undefined) plate.userData.untilZ = tour(plate.userData.until).position.z;
  const eye = new THREE.Vector3();
  const parentAt = new THREE.Vector3(), parentTurn = new THREE.Quaternion(), parentSize = new THREE.Vector3();
  const plateAt = new THREE.Vector3();
  // The largest a plate's title may be on screen, in pixels; act two caps its plates the same way.
  const TYPE_CAP = 22;
  for (const plate of labels) plate.userData.baseScale = plate.scale.x;
  let lastT = 0, lastTick = -1, lastLapTick = -1, lastSample = -99, hovered = null;
  // the moment Motion Off holds on: the Kali session finished
  const STILL_T = KALI_TIMELINE.finishedAt;

  return {
    group,
    socket,
    // Not contained: the tour pans the machines across the left of the frame on its way from one to the next, and there the engine has
    // to be free to fade them behind the page's words.
    contained: false,
    // The tour takes most of the act; the flight to act two takes the rest.
    hold: HOLD,
    camera: (p) => tour(p),
    // Where the camera rests for the engine's own arithmetic: how far the set is parked from the track.
    mod: () => ({ dx: -12, dy: 34, dz: 82, df: 0 }),
    // For the measurement seam and the checks.
    debug: { keyDepth, fans, keysFound: () => keysFound, input, lap, tour, STOPS, hovered: () => hovered },
    update(t, p, camera) {
      const still = motionOff();
      const T = still ? STILL_T : t;
      const dt = clamp(t - lastT, 0, 0.1); lastT = t;
      const clock = now();

      // the terminal runs on its own, and the camera's last stop shows the session finished
      const s = ease(clamp01((p - 0.62) / 0.2));
      const free = kaliAt(T);
      const kali = s > 0 ? kaliAt(lerp(T % KALI_TIMELINE.length, KALI_TIMELINE.finishedAt, s)) : free;
      fan.scan += ((!still && free.busy && s < 0.5 ? 1 : 0) - fan.scan) * (1 - Math.exp(-dt * 3));

      // what the pointer is over
      hovered = null;
      if (!still && input.inside && camera) {
        ndc.set(input.x / window.innerWidth * 2 - 1, -(input.y / window.innerHeight) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObjects(pickables, false)[0];
        hovered = hit ? hit.object.userData.part : null;
      }

      // fans: faster while the pointer is over the tower, and while the scan runs
      const boostGoal = Math.max(hovered === "tower" ? 1 : 0, fan.scan * 0.85);
      fan.boost += (boostGoal - fan.boost) * (1 - Math.exp(-dt * (boostGoal > fan.boost ? 3.5 : 1.2)));
      fan.angle = still ? -STILL_T * 5.5 : fan.angle - 5.5 * (1 + 1.5 * fan.boost) * dt;
      for (const f of fans) poseFan(f, fan.angle);
      const breathe = (0.9 + 0.1 * Math.sin(T * 0.9)) * (1 + 0.3 * fan.boost);
      glowMat.color.set(GLOW).multiplyScalar(breathe);
      softMat.color.set(GLOW).multiplyScalar(0.55 * breathe);
      const flick = Math.floor(T * 13), h = Math.abs(Math.sin(flick * 12.9898) * 43758.5453) % 1;
      driveMat.color.set(0xcfe3ff).multiplyScalar(h > 0.78 ? 1.8 : 0.12);

      // the mouse follows the visitor's mouse, and drifts back to the middle of the mat when it has been still a while
      if (!still && clock - input.moved > MOUSE_IDLE_RETURN) {
        const k = 1 - Math.exp(-dt * 0.9);
        input.mouse.x += (MOUSE_HOME.x - input.mouse.x) * k; input.mouse.z += (MOUSE_HOME.z - input.mouse.z) * k;
      }
      const mh = mouse.holder, k16 = 1 - Math.exp(-dt * 16), before = mh.position.x;
      mh.position.x += (input.mouse.x - mh.position.x) * k16; mh.position.z += (input.mouse.z - mh.position.z) * k16;
      mh.rotation.y = 0.05 + clamp((dt > 0 ? (mh.position.x - before) / dt : 0) * 0.025, -0.3, 0.3);
      // the wheel turns and lights while the page scrolls
      const scrolling = !still && clock - input.scrolledAt < 0.3 ? 1 : 0;
      wheelGlow.v += (scrolling - wheelGlow.v) * (1 - Math.exp(-dt * (scrolling > wheelGlow.v ? 20 : 4)));
      wheel.rotation.x = p * 90;
      wheel.material.color.copy(palette.face).lerp(ACCENT, 0.15 + wheelGlow.v * 0.7);

      // the screens redraw fifteen times a second
      const tick = Math.floor(T * 15);
      if (tick !== lastTick || t === 0) { lastTick = tick; drawKali(T, kali); drawTargets(T, fan.scan); kaliTex.needsUpdate = true; targetsTex.needsUpdate = true; }

      // keys: the Kali script presses them while it types, and the visitor's own keys always work
      keyGoal.fill(0);
      for (const [code, k] of input.keys) { if (k.releaseAt < clock) input.keys.delete(code); else keyGoal[k.index] = 1; }
      if (kali.keyChar !== null && s < 0.02 && !still) { const i = keyByLabel.get(kali.keyChar.toLowerCase()); if (i !== undefined) keyGoal[i] = Math.max(keyGoal[i], kali.press); }
      keyRipple.fill(0);
      for (let r = input.ripples.length - 1; r >= 0; r--) {
        const age = clock - input.ripples[r].t0; if (age > 0.75) { input.ripples.splice(r, 1); continue; }
        const o = KEY_DEFS[input.ripples[r].index], radius = age * 5.6, fade = Math.exp(-age * 4.2);
        for (let j = 0; j < N_KEYS; j++) { const d = Math.hypot(KEY_DEFS[j].x - o.x, KEY_DEFS[j].y - o.y); keyRipple[j] = Math.max(keyRipple[j], Math.exp(-(((d - radius) / 0.9) ** 2)) * fade); }
      }
      for (let i = 0; i < N_KEYS; i++) {
        keyDepth[i] += (keyGoal[i] - keyDepth[i]) * (1 - Math.exp(-dt * (keyGoal[i] > keyDepth[i] ? 40 : 16)));
        keyUniforms.uPress.value[i] = keyDepth[i] * PRESS;
        keyUniforms.uHot.value[i] = clamp01(Math.max(keyDepth[i], keyRipple[i] * 0.85)); // a key that is down lights, and a ripple passes light to its neighbours
      }

      // the laptop: a screensaver runs until the pointer goes over it, then the lock screen shows; four seconds after the pointer leaves the savers resume
      if (hovered === "laptop") lap.lastHover = T;
      const wantLock = hovered === "laptop" || (lap.locked && T - lap.lastHover < 4);
      if (wantLock && !lap.locked) lap.locked = true;
      if (!wantLock && lap.locked) { lap.locked = false; lap.slot += 1; lap.slotStart = T; }
      lap.lockMix += ((lap.locked ? 1 : 0) - lap.lockMix) * (still ? 1 : 1 - Math.exp(-dt * 10));
      let ts = T - lap.slotStart;
      if (ts >= SAVER_RUN + SAVER_PAUSE && !still) { lap.slot += 1; lap.slotStart = T; ts = 0; }
      const lapTick = Math.floor(T * 20);
      // A frozen frame's clock stays at 0, where a saver has not faded in yet and the screen is black; it is drawn three seconds in,
      // as Motion Off draws it.
      if (lapTick !== lastLapTick || t === 0) { lastLapTick = lapTick; drawLaptop(lap.slot, still || t === 0 ? 3 : ts, lap.lockMix); lapTex.needsUpdate = true; }

      // the halo takes the colour of what the screens are showing, a few times a second, held close to purple
      if (!still && clock - lastSample > 0.25) {
        lastSample = clock; sctx.drawImage(kaliCanvas, 0, 0, 8, 9); sctx.drawImage(targetsCanvas, 0, 0, kaliCanvas.width, kaliCanvas.height, 8, 0, 8, 9);
        const d = sctx.getImageData(0, 0, 16, 9).data; let r = 0, g = 0, b = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
        const n = (d.length / 4) * 255, m = Math.max(r, g, b, 1);
        haloGoal.setRGB(r / m, g / m, b / m, THREE.SRGBColorSpace).lerp(new THREE.Color(HALO), 0.75);
        haloLevel.goal = 0.3 + 0.5 * clamp01(((0.2126 * r + 0.7152 * g + 0.0722 * b) / n) / 0.22);
      }
      haloColor.lerp(haloGoal, 1 - Math.exp(-dt * 2.5));
      haloLevel.v += (haloLevel.goal - haloLevel.v) * (1 - Math.exp(-dt * 2.5));
      halo.material.color.copy(haloColor);
      halo.material.opacity = HALO_OPACITY * haloLevel.v * 1.6;
      flock.update(still ? 0 : t);

      // Full strength: a plate drawn under it lets the room through its ground and loses its contrast.
      if (camera) group.worldToLocal(eye.copy(camera.position));
      for (const plate of labels) plate.material.opacity = plate.userData.untilZ === undefined || !camera || eye.z > plate.userData.untilZ ? 1 : 0;
      // Each plate turns to face the camera, as act four's do: squared to the desk's front, the tour's close shots sheared them into
      // keystones. The parent's turn is read from last frame's matrix, so nothing up the chain is recomputed mid-frame.
      // Past TYPE_CAP pixels of type a plate is drawn smaller, so the close shots do not blow it up to 30px and soften it.
      if (camera) {
        const viewTan = 2 * Math.tan((camera.fov * Math.PI) / 360);
        const screenH = window.innerHeight || 900;
        for (const plate of labels) {
          plate.parent.matrixWorld.decompose(parentAt, parentTurn, parentSize);
          plate.quaternion.copy(parentTurn.invert()).multiply(camera.quaternion);
          const base = plate.userData.baseScale;
          plateAt.setFromMatrixPosition(plate.matrixWorld);
          const typeAtBase = (plate.userData.typeShare * plate.geometry.parameters.height * parentSize.x * base * screenH) / (plateAt.distanceTo(camera.position) * viewTan);
          plate.scale.setScalar(base * Math.min(1, TYPE_CAP / Math.max(1e-3, typeAtBase)));
        }
      }
    }
  };
}

export { mod };
