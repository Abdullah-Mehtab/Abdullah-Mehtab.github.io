// ABOUTME: Act II's set: inside the home PC. The four VMs and the VMware bridge they share, inside a giant outline of act one's PC, and
// ABOUTME: one cable out through the PC's back wall to the home router and the laptop. Attacks leave Kali and cross it.
//
// Act one shows the lab from outside and its flight ends by passing through the Kali screen. This act is what was behind that screen:
// the virtual side of the PC. The VMs ran inside one PC and were bridged, so all four shared its one cable to the home network and
// each had an address of its own there (owner rulings 2026-10-18: option B, then 1A to 4A). The PC itself is drawn as faint outlines
// only, large enough for the camera to stand inside it; it is scenery, the room this act happens in. The camera walks in towards the
// VMs while the words are read, and the flight to act three passes through the inside and out past the router.
import { THREE, LAYER, clamp01, ease, glow, motes, nameplate, painted } from "../kit.js";
import { mergeGeometries } from "../../../vendor/three/addons/utils/BufferGeometryUtils.js";
import { SCALE, ACCENT, GLOW, EDGE_ANGLE, edgeMaterial, edgePoints, edgeLines, floatGeometry, relMatrix } from "./01-desk.js";
import { clockText, dateLong, shownTime } from "./01-desk-paint.js";

const SET_SCALE = 0.35;
// How many set units to the metre the PC is drawn at here, against act one's 111: big enough that the VMs float inside it.
const INSIDE_SCALE = 480;

// Where everything stands, in the set's own units. The PC's glass side faces the camera (+z), its front is to the left, its back wall
// at x 110 to the right, its motherboard at z -50 behind the VMs and its graphics card in front of them, at their height. The VMs sit
// low in it so the whole subject, inside and out, stays short enough to grow in the frame as the camera walks in.
const VMS = [
  { name: "Kali", at: [8, 100, 10], size: [26, 34, 22], kali: true },
  { name: "Metasploitable 2", at: [14, 142, -26], size: [40, 10, 26] },
  { name: "Metasploitable 3, Windows", at: [50, 138, -32], size: [20, 32, 24] },
  { name: "Metasploitable 3, Ubuntu", at: [84, 140, -26], size: [34, 16, 24] }
];
const TARGETS_AT = [50, 162, -28];
const BRIDGE_AT = [56, 86, -18];
// The socket the PC's one network cable leaves from, on its back wall.
const PORT_AT = [108, 86, -20];
// Outside the PC, on the floor beside its back wall, so the cable is seen leaving it: the home router, and the laptop on its own cable,
// to the router's left and behind it, so from the camera, which stands to the left and in front, neither hides the other.
const ROUTER_AT = [168, 0, 6];
const LAPTOP_AT = [136, 0, -46];

// How long a packet takes over one leg of its way, in seconds. Every leg always carries one, staggered, so attacks keep arriving.
// Kept under the site check's watch on a moving packet (180 frames, about a second and a half here), so it always sees a whole trip:
// at 1.6 it could miss the start inside Kali and then counted Kali as a body the packet crossed.
const PERIOD = 1.2;

// A box's edges, broken into dashes in the geometry itself, for the VMs, which are virtual. A dashed line material would be simpler,
// but its shader has no hook for the engine's fade behind the page's words, so its lines would stay bright behind a heading.
export function dashedBoxEdges(w, h, d, dash, gap) {
  const src = edgePoints(new THREE.BoxGeometry(w, h, d), 1);
  const out = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), dir = new THREE.Vector3();
  for (let i = 0; i < src.length; i += 6) {
    a.set(src[i], src[i + 1], src[i + 2]); b.set(src[i + 3], src[i + 4], src[i + 5]);
    const length = a.distanceTo(b); dir.subVectors(b, a).normalize();
    const count = Math.max(1, Math.round((length + gap) / (dash + gap)));
    const step = (length + gap) / count;
    for (let k = 0; k < count; k++) {
      const s = k * step, e = Math.min(length, s + step - gap);
      out.push(a.x + dir.x * s, a.y + dir.y * s, a.z + dir.z * s, a.x + dir.x * e, a.y + dir.y * e, a.z + dir.z * e);
    }
  }
  return new Float32Array(out);
}

function lineBuffer(points, opacity) {
  const line = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), edgeMaterial(opacity));
  line.material.depthWrite = false; // a cable writing depth cuts a hole in the packet riding it
  line.renderOrder = LAYER.path;
  return line;
}

function along(curve, steps) {
  const pts = curve.getPoints(steps), out = [];
  for (let i = 0; i < pts.length - 1; i++) out.push(pts[i], pts[i + 1]);
  return out;
}

export function buildNetwork(palette, models) {
  const group = new THREE.Group();
  const faceMat = new THREE.MeshBasicMaterial({ color: palette.face });
  const softMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(GLOW).multiplyScalar(0.55) });
  // A light, as a soft dot. Added light turns white on a pale room, so on a light theme it is laid over normally, as act one's halo is.
  const light = (size, opacity) => {
    const sprite = glow(GLOW, size, opacity);
    if (palette.lightRoom) sprite.material.blending = THREE.NormalBlending;
    return sprite;
  };

  // ---------- the PC, from inside: act one's model, its edges only, faint ----------
  // Turned so its glass side faces the camera. No faces, so nothing in it hides the VMs or stops a packet, and it costs one draw call.
  {
    const root = models.tower.scene.clone(true);
    root.scale.setScalar(INSIDE_SCALE);
    root.rotation.y = -Math.PI / 2;
    root.updateMatrixWorld(true);
    const edges = [];
    root.traverse((o) => {
      if (!o.isMesh || (o.material.name || "") === "Glass_Clear") return;
      // The small parts drawn this large are clutter: screws, port rows and the like say nothing from inside.
      if (/screws|ports|cable|socket|led_/.test(o.name)) return;
      const g = floatGeometry(o.geometry); g.applyMatrix4(relMatrix(root, o));
      edges.push(edgePoints(g, EDGE_ANGLE.tower));
    });
    const shell = edgeLines(edges, palette.lightRoom ? 0.2 : 0.14);
    shell.applyMatrix4(root.matrix);
    shell.userData.ambient = true;
    group.add(shell);
  }

  // A model from act one at its own size, every part merged: a face mesh, a glow mesh and one buffer of edges.
  function flatten(gltf, x, y, z, ry, angle, lights) {
    const root = gltf.scene.clone(true);
    const holder = new THREE.Group(); holder.add(root); holder.scale.setScalar(SCALE); holder.position.set(x, y, z); holder.rotation.y = ry;
    group.add(holder); holder.updateMatrixWorld(true);
    const groups = new Map(), edges = [], dead = [];
    let screen = null;
    root.traverse((o) => {
      if (!o.isMesh) return;
      if (o.name === "screen") { screen = o; return; }
      dead.push(o);
      const name = o.material.name || "";
      if (name === "Glass_Clear") return;
      const g = floatGeometry(o.geometry); g.applyMatrix4(relMatrix(root, o));
      for (const n of Object.keys(g.attributes)) if (n !== "position") g.deleteAttribute(n);
      const material = /^Glow_Purple_Soft/.test(name) ? softMat : (/^Glow_Purple/.test(name) || /^led_/.test(o.name)) ? lights : faceMat;
      if (material === faceMat) { edges.push(edgePoints(g, angle)); if (/^Glass_/.test(name)) return; }
      if (!groups.has(material)) groups.set(material, []);
      groups.get(material).push(g);
    });
    for (const o of dead) o.removeFromParent();
    for (const [material, geos] of groups) root.add(new THREE.Mesh(mergeGeometries(geos, false), material));
    root.add(edgeLines(edges, 0.85));
    // The holder moves to the middle of the model and the model moves back to match, so a plate hung from the holder is asked about
    // the model's middle when the engine checks whether another body stands in front of it.
    holder.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const middle = (box.min.y + box.max.y) / 2 - holder.position.y;
    holder.position.y += middle; root.position.y -= middle / SCALE; holder.updateMatrixWorld(true);
    return { holder, root, screen, box: new THREE.Box3().setFromObject(root) };
  }

  // A row of ports, painted, for the front of the bridge and the router.
  const portsFront = (w, h) => {
    const tex = painted(512, Math.round(512 * h / w), (g, cw, ch) => {
      g.fillStyle = "#" + palette.face.getHexString(); g.fillRect(0, 0, cw, ch);
      g.strokeStyle = "#" + ACCENT.getHexString(); g.lineWidth = 4; g.fillStyle = g.strokeStyle;
      const port = cw / 11, top = ch * 0.3;
      for (let i = 0; i < 5; i++) { const x = cw * 0.06 + i * port * 1.5; g.strokeRect(x, top, port, ch * 0.42); g.fillRect(x + port * 0.3, top, port * 0.4, ch * 0.1); }
      g.globalAlpha = 0.5; g.fillRect(cw * 0.8, ch * 0.45, cw * 0.14, ch * 0.08); g.globalAlpha = 1;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, h * 0.8), new THREE.MeshBasicMaterial({ map: tex }));
  };

  // ---------- the VMware bridge: the one switch all four VMs plug into ----------
  const bridge = new THREE.Group();
  bridge.position.set(...BRIDGE_AT);
  bridge.name = "Bridge";
  {
    const geo = new THREE.BoxGeometry(34, 14, 22);
    bridge.add(new THREE.Mesh(geo, faceMat));
    bridge.add(edgeLines([edgePoints(geo, 12)], 0.95));
    const front = portsFront(34, 14); front.position.z = 11.05; bridge.add(front);
  }
  const bridgeLights = new THREE.MeshBasicMaterial({ color: GLOW });
  bridge.add(new THREE.Mesh(new THREE.BoxGeometry(30, 0.8, 1).translate(0, 7.4, 10), bridgeLights));
  group.add(bridge);

  // ---------- the socket in the PC's back wall the one cable leaves from ----------
  const port = new THREE.Mesh(new THREE.BoxGeometry(5, 9, 12), faceMat);
  port.position.set(...PORT_AT);
  port.add(edgeLines([edgePoints(port.geometry, 12)], 0.95));
  group.add(port);

  // ---------- the four VMs ----------
  // Kali is a machine of its own. The three targets are one mesh, their faces and their lights coloured per vertex, and one buffer of
  // broken edges: two draw calls for three machines, which matters because this set is drawn all through act one's tour as well.
  // The lights are in the faces' mesh and not a mesh of their own because three small lights at three corners make one box spanning
  // the gap between them, and a packet flying to the middle target crossed that box.
  const lightBox = (w, h, d) => new THREE.BoxGeometry(3, 1.4, 0.8).translate(w / 2 - 4, -h / 2 + 3, d / 2 + 0.41);
  const vms = VMS.map((spec) => ({ spec, flash: 0 }));
  const kali = vms[0], targets = vms.slice(1);
  {
    const [w, h, d] = kali.spec.size;
    const node = new THREE.Group();
    node.position.set(...kali.spec.at);
    node.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), faceMat));
    node.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(dashedBoxEdges(w, h, d, 2.4, 1.6), 3)), edgeMaterial(0.95)));
    const lightMat = new THREE.MeshBasicMaterial({ color: GLOW });
    node.add(new THREE.Mesh(lightBox(w, h, d), lightMat));
    kali.setLight = (k) => lightMat.color.set(GLOW).multiplyScalar(k);
    // Kali's front is a terminal, the same prompt act one's monitor showed.
    const tex = painted(256, 320, (g, cw, ch) => {
      g.fillStyle = "#07090f"; g.fillRect(0, 0, cw, ch);
      g.strokeStyle = "#" + ACCENT.getHexString(); g.lineWidth = 6; g.strokeRect(3, 3, cw - 6, ch - 6);
      g.fillStyle = "#7fb2ff"; g.font = "600 34px IBM Plex Mono, Consolas, monospace"; g.textBaseline = "top";
      g.fillText("kali@kali", 22, 30); g.fillStyle = "#d8e4ff"; g.fillText(">_", 22, 80);
      // The scan it runs, as real lines rather than bars: bars read as a placeholder panel.
      g.font = "500 19px IBM Plex Mono, Consolas, monospace"; g.fillStyle = "#c9d6f2";
      ["nmap -sV .22", "22/tcp  ssh", "80/tcp  http", "445/tcp smb", "3389    rdp", "msf6 >"].forEach((line, i) => g.fillText(line, 22, 136 + i * 28));
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(w - 4, h - 6), new THREE.MeshBasicMaterial({ map: tex }));
    screen.position.set(0, 1.5, d / 2 + 0.4);
    screen.userData.screen = "Kali";
    node.add(screen);
    kali.node = node;
    node.name = "Kali";
    group.add(node);
  }
  const targetsNode = new THREE.Group();
  targetsNode.position.set(...TARGETS_AT);
  targetsNode.name = "Targets";
  group.add(targetsNode);
  {
    const parts = [], edges = [];
    let vertices = 0;
    const coloured = (geometry, colour) => {
      const n = geometry.attributes.position.count, c = new Float32Array(n * 3);
      for (let v = 0; v < n; v++) { c[v * 3] = colour.r; c[v * 3 + 1] = colour.g; c[v * 3 + 2] = colour.b; }
      geometry.setAttribute("color", new THREE.BufferAttribute(c, 3));
      for (const name of Object.keys(geometry.attributes)) if (name !== "position" && name !== "color") geometry.deleteAttribute(name);
      parts.push(geometry); vertices += n;
      return n;
    };
    targets.forEach((vm) => {
      const [w, h, d] = vm.spec.size;
      const at = new THREE.Vector3(...vm.spec.at).sub(targetsNode.position);
      coloured(new THREE.BoxGeometry(w, h, d).translate(at.x, at.y, at.z), palette.face);
      const e = dashedBoxEdges(w, h, d, 2.4, 1.6);
      for (let k = 0; k < e.length; k += 3) { e[k] += at.x; e[k + 1] += at.y; e[k + 2] += at.z; }
      edges.push(e);
      const start = vertices;
      vm.lightRange = [start, coloured(lightBox(w, h, d).translate(at.x, at.y, at.z), new THREE.Color(GLOW))];
    });
    const body = new THREE.Mesh(mergeGeometries(parts, false), new THREE.MeshBasicMaterial({ vertexColors: true }));
    targetsNode.add(body);
    // Each target shows what it is on its front, as Kali does, so the three read as three different machines and not one dashed box
    // three times: Metasploitable 2's text console, Windows Server 2008's logo, Metasploitable 3 Ubuntu's prompt.
    const mono = "IBM Plex Mono, Consolas, monospace", accent = "#" + ACCENT.getHexString();
    const faces = [
      (g, cw, ch) => {
        g.fillStyle = "#c9d6f2"; g.font = `500 ${Math.round(ch * 0.2)}px ${mono}`; g.textBaseline = "top";
        g.fillText("metasploitable login:", cw * 0.05, ch * 0.18); g.fillStyle = accent; g.fillRect(cw * 0.05, ch * 0.55, cw * 0.04, ch * 0.22);
      },
      (g, cw, ch) => {
        const s = cw * 0.2, x = cw / 2 - s - 4, y = ch * 0.22;
        g.fillStyle = accent; for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) g.fillRect(x + dx * (s + 8), y + dy * (s + 8), s, s);
        g.fillStyle = "#c9d6f2"; g.font = `500 ${Math.round(cw * 0.1)}px ${mono}`; g.textAlign = "center"; g.textBaseline = "top";
        g.fillText("Server 2008", cw / 2, y + 2 * s + 30);
      },
      (g, cw, ch) => {
        g.fillStyle = "#c9d6f2"; g.font = `500 ${Math.round(ch * 0.17)}px ${mono}`; g.textBaseline = "top";
        g.fillText("ubuntu login:", cw * 0.05, ch * 0.15); g.fillStyle = accent; g.fillText("vagrant@ubuntu:~$", cw * 0.05, ch * 0.5);
      }
    ];
    targets.forEach((vm, i) => {
      const [w, h, d] = vm.spec.size;
      const at = new THREE.Vector3(...vm.spec.at).sub(targetsNode.position);
      const tex = painted(256, Math.round((256 * (h - 3)) / (w - 3)), (g, cw, ch) => {
        g.fillStyle = "#07090f"; g.fillRect(0, 0, cw, ch);
        faces[i](g, cw, ch);
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(w - 3, h - 3), new THREE.MeshBasicMaterial({ map: tex }));
      screen.position.set(at.x, at.y + 0.5, at.z + d / 2 + 0.4);
      screen.userData.screen = vm.spec.name;
      targetsNode.add(screen);
    });
    targetsNode.add(edgeLines(edges, 0.95));
    const colour = body.geometry.attributes.color, tint = new THREE.Color();
    for (const vm of targets) {
      vm.setLight = (k) => {
        tint.set(GLOW).multiplyScalar(k);
        for (let v = vm.lightRange[0]; v < vm.lightRange[0] + vm.lightRange[1]; v++) colour.setXYZ(v, tint.r, tint.g, tint.b);
        colour.needsUpdate = true;
      };
    }
  }

  // ---------- outside, behind the PC: the home router and the laptop ----------
  const router = new THREE.Group();
  router.position.set(...ROUTER_AT);
  router.name = "Router";
  {
    const geo = mergeGeometries([
      new THREE.BoxGeometry(44, 8, 26).translate(0, 4, 0),
      new THREE.BoxGeometry(1.8, 24, 1.8).translate(-17, 18, -10),
      new THREE.BoxGeometry(1.8, 24, 1.8).translate(17, 18, -10)
    ], false);
    router.add(new THREE.Mesh(geo, faceMat));
    router.add(edgeLines([edgePoints(geo, 12)], 0.9));
    const front = portsFront(44, 8); front.position.set(0, 4, 13.05); router.add(front);
  }
  // Where the film's one network cable plugs in: a port on the router's back, so the cable runs on from the home network to the next
  // act. Read by the engine when the chapter turns the cable on.
  const socket = new THREE.Object3D();
  socket.position.set(12, 4, -13.6);
  router.add(socket);
  const routerLights = new THREE.MeshBasicMaterial({ color: GLOW });
  router.add(new THREE.Mesh(mergeGeometries([0, 1, 2, 3].map((i) => new THREE.BoxGeometry(2, 0.6, 1.2).translate(-15 + i * 4, 8.3, 10)), false), routerLights));
  group.add(router);
  const laptopLight = new THREE.MeshBasicMaterial({ color: GLOW });
  const laptop = flatten(models.laptop, LAPTOP_AT[0], LAPTOP_AT[1], LAPTOP_AT[2], -0.5, EDGE_ANGLE.laptop, laptopLight);
  laptop.holder.name = "Laptop";
  // The laptop shows its lock screen with the visitor's own clock, as it did in act one when the pointer was over it.
  const lapCanvas = document.createElement("canvas"); lapCanvas.width = 512; lapCanvas.height = 320;
  const paintLaptop = () => {
    const g = lapCanvas.getContext("2d");
    const sky = g.createLinearGradient(0, 0, 0, 320); sky.addColorStop(0, "#0b1b3a"); sky.addColorStop(1, "#1d0f3a");
    g.fillStyle = sky; g.fillRect(0, 0, 512, 320);
    g.fillStyle = "#ffffff"; g.font = "300 88px Segoe UI, sans-serif"; g.textBaseline = "alphabetic"; g.fillText(clockText(), 40, 250);
    g.font = "400 26px Segoe UI, sans-serif"; g.globalAlpha = 0.85;
    g.fillText(dateLong(), 44, 290); g.globalAlpha = 1;
  };
  paintLaptop();
  const lapTex = new THREE.CanvasTexture(lapCanvas); lapTex.colorSpace = THREE.SRGBColorSpace; lapTex.flipY = false;
  laptop.screen.material = new THREE.MeshBasicMaterial({ map: lapTex });
  laptop.screen.userData.screen = "the laptop";

  // ---------- the wiring ----------
  const centre = (vm) => new THREE.Vector3(...vm.spec.at);
  const bridgeC = new THREE.Vector3(...BRIDGE_AT);
  const portC = new THREE.Vector3(...PORT_AT);
  const routerC = new THREE.Vector3(ROUTER_AT[0], 4, ROUTER_AT[2]);
  const laptopC = new THREE.Vector3(LAPTOP_AT[0] + 4, 3, LAPTOP_AT[2] + 2);
  // Each VM to the bridge: out of its underside, down, and in at the bridge's top.
  const vmLeg = (vm) => {
    const c = centre(vm), base = c.clone().setY(c.y - vm.spec.size[1] / 2 - 2);
    return new THREE.CatmullRomCurve3([c, base, new THREE.Vector3((base.x + bridgeC.x) / 2, bridgeC.y + 16, (base.z + bridgeC.z) / 2), bridgeC], false, "catmullrom", 0.2);
  };
  // Kali stands beside the bridge rather than above it, so its line leaves from its side towards the bridge: a dip under it would be
  // the point furthest from the bridge, outside Kali, and the packet would then read as crossing Kali rather than leaving it.
  const legKali = new THREE.CatmullRomCurve3([centre(kali), new THREE.Vector3((kali.spec.at[0] + bridgeC.x) / 2, (kali.spec.at[1] + bridgeC.y) / 2 + 6, (kali.spec.at[2] + bridgeC.z) / 2), bridgeC], false, "catmullrom", 0.2);
  const legTargets = targets.map(vmLeg);
  const legPort = new THREE.CatmullRomCurve3([bridgeC, new THREE.Vector3(84, BRIDGE_AT[1], -19), portC], false, "catmullrom", 0.2);
  // The cable out: from the socket, down the outside of the back wall to the floor, then along it to the router.
  const legCable = new THREE.CatmullRomCurve3([
    portC, new THREE.Vector3(118, 82, -20), new THREE.Vector3(121, 30, -14), new THREE.Vector3(126, 1, -4),
    new THREE.Vector3(140, 1, 0), routerC
  ], false, "catmullrom", 0.3);
  const legLaptop = new THREE.CatmullRomCurve3([routerC, new THREE.Vector3(158, 1, -24), laptopC], false, "catmullrom", 0.3);
  group.add(lineBuffer([...along(legKali, 24), ...legTargets.flatMap((c) => along(c, 24)), ...along(legPort, 16)], 0.75));
  group.add(lineBuffer([...along(legCable, 48), ...along(legLaptop, 24)], 0.85));

  // ---------- the attack: one packet always running on each leg, all of them one buffer of points ----------
  let routerFlash = 0, laptopFlash = 0;
  const legs = [
    { curve: legKali, offset: 0, arrive: () => {} },
    ...legTargets.map((curve, i) => ({ curve, offset: 0.25 + i * 0.25, arrive: () => { targets[i].flash = 1; } })),
    { curve: legPort, offset: 0.4, arrive: () => {} },
    { curve: legCable, offset: 0.55, arrive: () => { routerFlash = 1; } },
    { curve: legLaptop, offset: 0.85, arrive: () => { laptopFlash = 1; } }
  ].map((leg) => ({ ...leg, last: 0 }));
  const packets = motes(new Array(legs.length * 3).fill(0), GLOW, 3.4, 0.95);
  if (palette.lightRoom) packets.material.blending = THREE.NormalBlending;
  packets.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 400);
  packets.frustumCulled = false;
  group.add(packets);
  const at = new THREE.Vector3();

  // ---------- names ----------
  const label = (parent, text, sub, width, pos, primary, scaled) => {
    // Cut to its own ground, so the room does not show round the words: on the full canvas "192.0.2.21 to .23" read 1.99:1 over the
    // target VMs beside it.
    // The second line painted at 40 against the title's 46, so it is readable at the plate's own size: at the kit's 30 it opened at 8
    // to 9px, and making the plates larger instead let them outweigh the machines they name.
    const plate = nameplate(text, sub, ACCENT, palette.deep, width, true, 40);
    // Inside a model's holder `pos` is read in the set's directions, not the turned model's; update turns the plate to the camera.
    if (scaled) { plate.scale.setScalar(1 / SCALE); plate.rotation.y = -parent.rotation.y; plate.position.set(...pos).applyAxisAngle(new THREE.Vector3(0, 1, 0), -parent.rotation.y).multiplyScalar(1 / SCALE); }
    else plate.position.set(...pos);
    if (primary) plate.userData.primary = true;
    parent.add(plate);
    return plate;
  };
  // Act one already named the machines, so these name what act one cannot show: the one cable, each machine's own address on the home
  // network, and the router door that stayed shut (owner, 2026-10-19, A with B). The addresses are from the range kept for
  // documentation, as every painted sample on these pages is: they illustrate bridging, they are not the lab's real ones.
  // Second lines kept short, so a plate is no wider than its title needs and does not outweigh the machine it names.
  const plates = [
    label(group, "Inside the Home PC", "VMware Workstation Pro", 80, [44, 172, 0], true),
    label(bridge, "One cable, four VMs", "VMware bridge", 72, [40, -18, 10]),
    label(kali.node, "192.0.2.10", "Kali's own address", 66, [0, -28, 8]),
    label(targetsNode, "192.0.2.21 to .23", "the target VMs", 74, [76, -2, 0]),
    label(router, "No port forwarding", "the home router", 72, [-34, -14, 22]),
    label(laptop.holder, "192.0.2.30", "Windows 10 laptop", 78, [0, 30, 0], false, true)
  ];

  // ---------- the room ----------
  const halo = light(1, palette.lightRoom ? 0.08 : 0.2);
  halo.scale.set(320, 200, 1); halo.position.set(10, 160, -90); halo.userData.ambient = true;
  group.add(halo);

  // Turned toward the camera, which stands to the left of this act.
  group.rotation.y = -0.3;
  group.scale.setScalar(SET_SCALE);

  for (const plate of plates) plate.userData.baseScale = plate.scale.x;
  // Measured on screen this comes out about a tenth larger, at about 22px, because the plate stands at an angle to the camera.
  // 17, not 20: at 20 the plates were the brightest and widest things in the frame, wider than the VMs they named (round nine).
  const TYPE_CAP = 17;
  const FAR = 200;
  const plateAt = new THREE.Vector3();
  const parentAt = new THREE.Vector3(), parentTurn = new THREE.Quaternion(), parentSize = new THREE.Vector3();
  let lastClock = -1, lastT = 0;
  return {
    group,
    socket,
    // Turned to only part of the set's sideways place, so the set stays in the right of the frame, clear of the act's two blocks of
    // copy, as the closing act of the first chapter does for its second column.
    aimFollow: 0.42,
    // The walk-in goes straight towards the set, so the set grows where it stands in the art lane instead of sliding over the copy,
    // and the flight passes beside it.
    offAxis: true,
    // Walk in towards the VMs for the whole of the hold, so the picture keeps changing while the words are read: a little to the right,
    // a little down and closer, at an even pace from the act's first frame to the flight.
    mod: (p) => {
      const k = clamp01(p);
      return { dx: -12 + 26 * k, dy: 44 - 4 * k, dz: 100 - 38 * k, df: 0 };
    },
    update(t, progress, camera) {
      legs.forEach((leg, i) => {
        const k = (((t / PERIOD + leg.offset) % 1) + 1) % 1;
        if (k < leg.last) leg.arrive(); // it went round: the last one has just landed
        leg.last = k;
        leg.curve.getPointAt(ease(k), at);
        packets.geometry.attributes.position.setXYZ(i, at.x, at.y, at.z);
      });
      packets.geometry.attributes.position.needsUpdate = true;
      // Each machine's light flashes as a packet lands on it, and fades.
      const fade = Math.exp(-Math.min(0.1, Math.max(0, t - lastT)) * 3); lastT = t;
      for (const vm of vms) { vm.setLight(0.45 + vm.flash * 1.6); vm.flash *= fade; }
      routerLights.color.set(GLOW).multiplyScalar(0.6 + routerFlash * 1.4); routerFlash *= fade;
      laptopLight.color.set(GLOW).multiplyScalar(0.6 + laptopFlash * 1.6); laptopFlash *= fade;
      bridgeLights.color.set(GLOW).multiplyScalar(0.7 + 0.3 * Math.sin(t * 6));
      // The lock screen's clock, once a minute.
      const minute = Math.floor(shownTime().getTime() / 60000);
      if (minute !== lastClock) { lastClock = minute; paintLaptop(); lapTex.needsUpdate = true; }
      // Not drawn while the camera is still at act one: seen from there across the gap they are far off and faint, 1.5:1 against the
      // room. This act's own frames have the camera within about 110 of them.
      for (const plate of plates) {
        plate.material.opacity = camera && plateAt.setFromMatrixPosition(plate.matrixWorld).distanceTo(camera.position) > FAR ? 0 : 1;
      }
      // The camera walks in through the hold, and plates sized for the opening frame grew to 30px of type by its middle, louder than
      // the machines they name. Past TYPE_CAP each one is drawn smaller, so it keeps the same size of type from there in.
      // Read from the matrices of the frame before, not with getWorldPosition: that recomputes the matrices up the parent chain in the
      // middle of the engine's frame, and with it the laptop's plate was drawn at 3px in the wrong place.
      if (camera) {
        const viewTan = 2 * Math.tan((camera.fov * Math.PI) / 360);
        const screenH = window.innerHeight || 900;
        for (const plate of plates) {
          const base = plate.userData.baseScale;
          plateAt.setFromMatrixPosition(plate.matrixWorld);
          const parentScale = plate.parent.matrixWorld.getMaxScaleOnAxis();
          const typeAtBase = (plate.userData.typeShare * plate.geometry.parameters.height * parentScale * base * screenH) / (plateAt.distanceTo(camera.position) * viewTan);
          plate.scale.setScalar(base * Math.min(1, TYPE_CAP / Math.max(1e-3, typeAtBase)));
          // Turned to face the camera, as act four's are: squared to the set, the close shots of the walk-in sheared them into
          // keystones and smeared their type. The parent's turn comes from last frame's matrix, for the reason above.
          plate.parent.matrixWorld.decompose(parentAt, parentTurn, parentSize);
          plate.quaternion.copy(parentTurn.invert()).multiply(camera.quaternion);
        }
      }
    }
  };
}
