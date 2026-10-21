// ABOUTME: Act III's set: the lab drawn the way Nmap's Zenmap topology view draws a scan, Kali in the middle and the hosts on a ring,
// ABOUTME: and the seven phases played on it as the reader scrolls, the camera moving in on one target and back out.
//
// Owner rulings 2026-10-19: the method is seven phases (reconnaissance, enumeration, vulnerability analysis, exploitation, privilege
// escalation, post-exploitation, covering tracks), shown on the real lab as a scan map. Zenmap's own conventions, from the Nmap book's
// "Surfing the Network Topology": the scanning host at the centre, hosts on rings by network hop, hosts as circles sized by their open
// ports, routers and switches as squares. Every machine here is on one bridged LAN, so all of them are one hop out, on one ring. The
// addresses are act two's, from the range kept for documentation: an illustration, not the lab's real ones. One accent colour, so
// Zenmap's green, yellow and red are left out and size alone says which host is the most open.
//
// The attack shown is the one the owner ran on Metasploitable 3's Windows Server 2008 R2 build: EternalBlue (MS17-010) through SMB on
// port 445. It lands as SYSTEM (Metasploit's module documentation: "as SYSTEM", "full control of the kernel"), so the meter shows no
// climb in phase five: the shell arrives at the top in one stroke and the phase's name says so (owner ruling, 2026-10-19).
//
// The set drives the camera itself (`camera`), as act one's tour does: wide on the map for the scan, in on the target for phases two
// to six, back out for the last. The phases follow the camera's place through the act rather than the act's progress, because with
// reduced motion the engine hands every set a progress of 1 while the camera still follows the scroll.
import { THREE, LAYER, clamp01, ease, lerp, glow, nameplate, painted } from "../kit.js";
import { mergeGeometries } from "../../../vendor/three/addons/utils/BufferGeometryUtils.js";
import { ACCENT, GLOW, edgeMaterial } from "./01-desk.js";

const SET_SCALE = 0.35;
// The ring the hosts stand on, in the set's own units, round Kali at the origin. The map stands upright, facing the camera (+z).
const RING = 72;
// In address order, the order a ping sweep reaches them; placed by angle from the top, clockwise, the router on the cable's side. Size is
// Zenmap's: the more ports a host has open, the larger its circle. The target is Metasploitable 3's Windows Server 2008 R2 build, which
// the owner took with EternalBlue: at the foot of the ring, so in the close frame Kali stands above it and the way in comes down from
// Kali rather than across the page's words. `os` decides the mark on each host: four panes for Windows, a prompt for Linux, ports for
// the router. Kali carries none: it is the one in the middle.
const HOSTS = [
  { octet: ".1", angle: 88, size: 11, os: "router" },
  { octet: ".21", angle: 232, size: 12, os: "linux" },
  { octet: ".22", angle: 160, size: 15, os: "windows", target: true },
  { octet: ".23", angle: 304, size: 11, os: "linux" },
  { octet: ".30", angle: 16, size: 8.5, os: "windows" }
];
const KALI_R = 13;
const at = (angle, r = RING) => new THREE.Vector2(r * Math.sin((angle * Math.PI) / 180), r * Math.cos((angle * Math.PI) / 180));
const TARGET = HOSTS.find((h) => h.target);
const TARGET_AT = at(TARGET.angle);
// How much the target grows while its ports come out.
const TARGET_GROWS = 1.12;
// The ports that come out of the target, as a column on its left, Kali's side, the way Nmap lists them: services Rapid7 lists for
// Metasploitable 3. The first is SMB, the one without the MS17-010 patch, at the top, nearest Kali.
const PORTS = [
  { text: "445", service: "smb" },
  { text: "80", service: "http" },
  { text: "3389", service: "rdp" },
  { text: "22", service: "ssh" }
];
const TAG = { w: 26, h: 9.5, d: 1.6, x: -42, top: 18, pitch: 12 };
// The unpatched port's tag grows taller, upward, to carry its second line.
const MARKED_TALL = 1.8, MARKED_SCALE = 1.12;
// The meter, right of the target: a "user" pill at the bottom, four steps, a "SYSTEM" pill at the top. EternalBlue lands at the top in
// one stroke; the user pill is never lit, which is the point of phase five here.
const METER = { x: 33, pill: { w: 22, h: 7 }, step: 6.2 };

// The share of the act the camera stays with the map before the flight. The act is 600vh tall on this page (its own stylesheet), so
// each phase has about 450 to 600px of scroll.
const HOLD = 0.82;
// Each phase's start and end, as a share of the hold.
const PHASES = [[0.04, 0.18], [0.21, 0.34], [0.36, 0.46], [0.48, 0.58], [0.6, 0.7], [0.72, 0.8], [0.84, 0.96]];

// The camera, in the set's units. A frame is a point to look at, a distance and a field of view; the camera stands straight in front
// of the point, which sits left of the subject, so the subject lands in the right of the frame beside the act's list.
function framed(x, y, distance, fov, across) {
  const half = distance * Math.tan((fov * Math.PI) / 360) * 1.6;
  const lookX = x - across * half;
  return { pos: [lookX, y, distance], look: [lookX, y, 0], fov };
}
// The whole map, at about 2.5px a set unit on a 900px tall screen.
const WIDE = framed(-2, -2, 470, 40, 0.56);
// The target, its ports, its meter and Kali above it, at about 3.6px a unit, clear of the fade the engine draws behind the list.
// Aimed well above the target, so the cluster sits in the lower part of the frame while the dimmed hosts above run off its top: aimed
// at the cluster's own middle, the frame ran off the top with 29% of it empty at the bottom.
// At 0.62 and then 0.585 across the router's square reached the act rail at the frame's right edge (x 1395 to 1405 at 1440 wide).
const CLOSE = framed(TARGET_AT.x - 4, TARGET_AT.y + 44, 380, 36, 0.55);
// A slow lean in while the close phases play, so the picture is never parked.
const CLOSER = framed(TARGET_AT.x - 4, TARGET_AT.y + 42, 362, 36, 0.55);
// The scan and the last phase lean slowly too: a camera parked through a phase reads as a still picture however much plays on it.
const WIDE_FAR = framed(-2, -2, 500, 40, 0.56);
const WIDE_NEAR = framed(-2, -2, 452, 40, 0.56);
const ROUTE = [
  [0.0, WIDE_FAR], [0.2, WIDE], [0.3, CLOSE], [0.8, CLOSER], [0.9, WIDE_NEAR], [1.0, WIDE]
];
// How many pixels one set unit is on a 900px screen at each frame, for sizing the labels' type.
const PX_WIDE = 900 / (2 * WIDE.pos[2] * Math.tan((WIDE.fov * Math.PI) / 360));
const PX_CLOSE = 900 / (2 * CLOSE.pos[2] * Math.tan((CLOSE.fov * Math.PI) / 360));
// A nameplate's world width for type of a given size at a given scale. Type size on screen is 46 / 640 of the plate's world width.
const plateWidth = (typePx, px) => (typePx * 640) / (46 * px);

export function buildMethod(palette) {
  const group = new THREE.Group();
  const face = palette.face.clone();
  const lit = new THREE.Color(GLOW);
  const pale = palette.deep.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;
  const light = (size, opacity) => {
    const sprite = glow(GLOW, size, opacity);
    if (palette.lightRoom) sprite.material.blending = THREE.NormalBlending;
    return sprite;
  };
  // A circle facing the camera, thin enough that the check for one body inside another does not count it as a body.
  const disc = (r) => new THREE.CylinderGeometry(r, r, 3, 56).rotateX(Math.PI / 2);
  const lines = (geometry, opacity) => new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 12), edgeMaterial(opacity));
  const circle = (r, z, segments = 96) => {
    const pts = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2, b = ((i + 1) / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.sin(a), r * Math.cos(a), z), new THREE.Vector3(r * Math.sin(b), r * Math.cos(b), z));
    }
    return pts;
  };

  // ---------- Kali, the scanning host, at the centre: the one lit machine, in a glow, the pulses of the scan leaving it ----------
  // A second ring round it read as a bullseye, which says target, the opposite of what Kali is (owner, 2026-10-19: "the ring also looks
  // amateurish").
  const kali = new THREE.Group();
  group.add(kali);
  const kaliFace = new THREE.Mesh(disc(KALI_R), new THREE.MeshBasicMaterial({ color: face.clone().lerp(lit, 0.7) }));
  kali.add(kaliFace, lines(kaliFace.geometry, 1));
  const kaliGlow = light(58, 0.5);
  kaliGlow.position.set(0, 0, -2);
  kaliGlow.userData.ambient = true;
  group.add(kaliGlow);

  // ---------- the hop ring, and the hosts on it ----------
  // A faint broken guide, as Zenmap draws its rings behind the hosts: drawn as an even solid line it read as a wire the hosts were
  // threaded on, a clock face rather than a scan.
  const ringPts = circle(RING, -1, 144).filter((_, i) => Math.floor(i / 2) % 3 !== 2);
  const ring = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ringPts), edgeMaterial(0.22));
  ring.material.depthWrite = false;
  group.add(ring);

  // The mark on a host's face, in its own units, so a stranger can tell the machines apart without reading anything: four panes for
  // Windows, a prompt for Linux, a row of ports for the router.
  const markPoints = (os, r) => {
    const out = [];
    const box = (x0, y0, x1, y1) => out.push(x0, y0, 0, x1, y0, 0, x1, y0, 0, x1, y1, 0, x1, y1, 0, x0, y1, 0, x0, y1, 0, x0, y0, 0);
    if (os === "windows") {
      const s = r * 0.3, g = r * 0.07;
      box(-s - g, g, -g, s + g); box(g, g, s + g, s + g); box(-s - g, -s - g, -g, -g); box(g, -s - g, s + g, -g);
    } else if (os === "linux") {
      const s = r * 0.36;
      out.push(-s, s * 0.7, 0, -s * 0.15, 0, 0, -s * 0.15, 0, 0, -s, -s * 0.7, 0, s * 0.1, -s * 0.7, 0, s, -s * 0.7, 0);
    } else {
      const w = r * 0.32, h = r * 0.28;
      for (const x of [-1.1, 0, 1.1]) box(x * w - w * 0.4, -h, x * w + w * 0.4, h);
    }
    return new Float32Array(out.map((v, i) => (i % 3 === 2 ? 1.7 : v)));
  };
  const hosts = HOSTS.map((spec) => {
    const node = new THREE.Group();
    const p = at(spec.angle);
    node.position.set(p.x, p.y, 0);
    const geometry = spec.os === "router" ? new THREE.BoxGeometry(spec.size * 2, spec.size * 2, 3) : disc(spec.size);
    const body = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: face.clone(), transparent: true }));
    const edge = lines(geometry, 0.2);
    const mark = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(markPoints(spec.os, spec.size), 3)), edgeMaterial(0.2));
    node.add(body, edge, mark);
    group.add(node);
    return { spec, node, body, edge, mark };
  });
  const target = hosts.find((h) => h.spec.target);

  // Kali's line to each host, drawn as the host answers: one buffer, each line's far end moved as it grows.
  const spokePos = new Float32Array(HOSTS.length * 6);
  const spokes = new THREE.LineSegments(new THREE.BufferGeometry(), edgeMaterial(0.7));
  spokes.geometry.setAttribute("position", new THREE.BufferAttribute(spokePos, 3));
  spokes.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), RING + 20);
  spokes.material.depthWrite = false;
  spokes.renderOrder = LAYER.path;
  group.add(spokes);
  const spokeEnds = hosts.map((h) => {
    const toward = new THREE.Vector2(h.node.position.x, h.node.position.y);
    const length = toward.length();
    const dir = toward.clone().divideScalar(length);
    return { from: dir.clone().multiplyScalar(KALI_R + 5.5), to: dir.clone().multiplyScalar(length - h.spec.size - 1) };
  });
  const setSpoke = (i, k) => {
    const { from, to } = spokeEnds[i];
    const end = from.clone().lerp(to, clamp01(k));
    spokePos.set([from.x, from.y, -0.5, end.x, end.y, -0.5], i * 6);
  };

  // The ping sweep: a circle spreading from Kali over the map, three times while the scan runs.
  const SWEEP_SEG = 96;
  const sweepPos = new Float32Array(SWEEP_SEG * 6), sweepCol = new Float32Array(SWEEP_SEG * 8);
  const sweepGeo = new THREE.BufferGeometry();
  sweepGeo.setAttribute("position", new THREE.BufferAttribute(sweepPos, 3));
  sweepGeo.setAttribute("color", new THREE.BufferAttribute(sweepCol, 4));
  sweepGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), RING + 40);
  const sweep = new THREE.LineSegments(sweepGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }));
  sweep.renderOrder = LAYER.path;
  sweep.frustumCulled = false;
  sweep.userData.ambient = true;
  group.add(sweep);
  const drawSweep = (radius, alpha) => {
    for (let s = 0, w = 0; s < SWEEP_SEG; s++) {
      for (const e of [s, s + 1]) {
        const a = (e / SWEEP_SEG) * Math.PI * 2;
        sweepPos.set([Math.cos(a) * radius, Math.sin(a) * radius, 0.5], w * 3);
        sweepCol.set([ACCENT.r, ACCENT.g, ACCENT.b, alpha], w * 4);
        w++;
      }
    }
    sweepGeo.attributes.position.needsUpdate = true;
    sweepGeo.attributes.color.needsUpdate = true;
  };

  // ---------- on the target: its ports, the meter and the pin ----------
  const ink = pale ? "#0b0f14" : "#f2f7fb";
  const accentCss = "#" + ACCENT.getHexString();
  const textPlane = (w, h, draw) => {
    const texture = painted(Math.round(w * 20), Math.round(h * 20), draw);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }));
  };
  const font = (weight, px, family) => weight + " " + Math.round(px) + "px " + family;
  const SANS = "Archivo, 'Segoe UI', sans-serif", MONO = "'IBM Plex Mono', ui-monospace, monospace";
  // One line: the port number and its service. The marked tag's second face adds a warning triangle and the word "unpatched".
  const portLine = (g, port, w, y, wanted) => {
    g.textBaseline = "middle";
    // Set as large as the tag allows: the widest port and service pair is shrunk until it fits with a margin.
    const measure = (size) => {
      g.font = font(700, size, SANS);
      const portWidth = g.measureText(port.text).width;
      g.font = font(400, size * 0.9, MONO);
      return { portWidth, serviceWidth: g.measureText(port.service).width, gap: size * 0.5 };
    };
    let size = wanted, m = measure(size);
    while (m.portWidth + m.gap + m.serviceWidth > w * 0.86 && size > 8) m = measure((size *= 0.94));
    const { portWidth, serviceWidth, gap } = m, x0 = (w - portWidth - gap - serviceWidth) / 2;
    g.fillStyle = ink;
    g.font = font(700, size, SANS);
    g.fillText(port.text, x0, y);
    g.globalAlpha = 0.86;
    g.font = font(400, size * 0.9, MONO);
    g.fillText(port.service, x0 + portWidth + gap, y + size * 0.03);
    g.globalAlpha = 1;
  };
  const tags = PORTS.map((port, i) => {
    const node = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(TAG.w, TAG.h, TAG.d), new THREE.MeshBasicMaterial({ color: face.clone(), transparent: true }));
    const edge = lines(box.geometry, 0.95);
    box.add(edge);
    const words = textPlane(TAG.w - 1.4, TAG.h - 1.4, (g, w, h) => { g.clearRect(0, 0, w, h); portLine(g, port, w, h * 0.52, h * 0.62); });
    words.position.z = TAG.d / 2 + 0.2;
    node.add(box, words);
    node.visible = false;
    target.node.add(node);
    const home = new THREE.Vector3(TAG.x, TAG.top - i * TAG.pitch, 2);
    return { port, node, box, edge, words, home };
  });
  const weak = tags[0];
  const tallH = TAG.h * MARKED_TALL;
  const markedWords = textPlane(TAG.w - 1.4, tallH - 1.4, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    portLine(g, weak.port, w, h * 0.3, h * 0.33);
    // The warning: a triangle with an exclamation mark, and the word.
    const s = h * 0.34, cx = w * 0.25, top = h * 0.55;
    g.beginPath(); g.moveTo(cx, top); g.lineTo(cx + s * 0.6, top + s); g.lineTo(cx - s * 0.6, top + s); g.closePath();
    g.lineWidth = h * 0.035; g.lineJoin = "round"; g.strokeStyle = ink; g.stroke();
    g.fillStyle = ink; g.textAlign = "center"; g.textBaseline = "middle";
    g.font = font(800, s * 0.62, SANS);
    g.fillText("!", cx, top + s * 0.62);
    g.textAlign = "left";
    let size = h * 0.27;
    g.font = font(600, size, SANS);
    while (g.measureText("unpatched").width > w - (cx + s * 0.8) - w * 0.06 && size > 8) g.font = font(600, (size *= 0.94), SANS);
    g.fillText("unpatched", cx + s * 0.8, top + s * 0.58);
  });
  markedWords.position.set(0, (tallH - TAG.h) / 2, TAG.d / 2 + 0.25);
  markedWords.visible = false;
  weak.node.add(markedWords);
  // The short line from the target's rim to each tag, as Zenmap's port list hangs off its host.
  const leadPos = new Float32Array(PORTS.length * 6);
  const leads = new THREE.LineSegments(new THREE.BufferGeometry(), edgeMaterial(0.8));
  leads.geometry.setAttribute("position", new THREE.BufferAttribute(leadPos, 3));
  leads.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);
  leads.material.depthWrite = false;
  target.node.add(leads);

  const meterParts = [], meterRanges = [];
  let meterCount = 0;
  const meterPart = (geometry) => {
    for (const name of Object.keys(geometry.attributes)) if (name !== "position") geometry.deleteAttribute(name);
    const n = geometry.attributes.position.count;
    geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    meterParts.push(geometry); meterRanges.push([meterCount, n]); meterCount += n;
    return meterRanges.length - 1;
  };
  const { pill, step } = METER;
  const meterLow = -(pill.h + 2.6 * 2 + 4 * step + 0.4) / 2;
  const userId = meterPart(new THREE.BoxGeometry(pill.w, pill.h, 1.6).translate(METER.x, meterLow + pill.h / 2, 0));
  const stepIds = [0, 1, 2, 3].map((i) => meterPart(new THREE.BoxGeometry(7, step - 1.6, 1.6).translate(METER.x, meterLow + pill.h + 2.6 + step / 2 + i * step - 0.8, 0)));
  const systemY = meterLow + pill.h + 2.6 * 2 + 4 * step + 0.4 - pill.h / 2;
  const systemId = meterPart(new THREE.BoxGeometry(pill.w, pill.h, 1.6).translate(METER.x, systemY, 0));
  const meterGeo = mergeGeometries(meterParts, false);
  const meter = new THREE.Mesh(meterGeo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true }));
  const meterEdge = new THREE.LineSegments(new THREE.EdgesGeometry(meterGeo, 12), edgeMaterial(0.9));
  const meterTall = systemY + pill.h / 2 - meterLow;
  const meterWords = textPlane(pill.w, meterTall, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const pillH = (pill.h / meterTall) * h;
    g.fillStyle = ink; g.textAlign = "center"; g.textBaseline = "middle";
    let size = pillH * 0.66;
    g.font = font(700, size, SANS);
    while (g.measureText("SYSTEM").width > w * 0.84 && size > 8) g.font = font(700, (size *= 0.94), SANS);
    g.fillText("SYSTEM", w / 2, pillH / 2 + 1);
    g.fillText("user", w / 2, h - pillH / 2 + 1);
  });
  meterWords.position.set(METER.x, meterLow + meterTall / 2, 1);
  // The flare behind the SYSTEM pill in phase five. It stays where it is, so nothing reads it as something travelling.
  const systemGlow = light(1, 0.5);
  systemGlow.position.set(METER.x, systemY, -1);
  systemGlow.visible = false;
  const meterNode = new THREE.Group();
  meterNode.add(meter, meterEdge, meterWords, systemGlow);
  meterNode.visible = false;
  target.node.add(meterNode);
  const meterColour = meterGeo.attributes.color, tint = new THREE.Color();
  const setMeter = (id, k) => {
    tint.copy(face).lerp(lit, clamp01(k)).multiplyScalar(1 + Math.max(0, k - 1) * 0.5);
    const [start, n] = meterRanges[id];
    for (let v = start; v < start + n; v++) meterColour.setXYZ(v, tint.r, tint.g, tint.b);
    meterColour.needsUpdate = true;
  };

  // The pin: access kept. Planted in the target's face, leaning up and out towards the camera so it reads as a pin and not a dot.
  const pinGeo = mergeGeometries([
    new THREE.SphereGeometry(6, 24, 16).translate(0, 19, 0),
    new THREE.ConeGeometry(2.6, 16, 16).rotateX(Math.PI).translate(0, 8, 0)
  ].map((g) => { g.deleteAttribute("normal"); g.deleteAttribute("uv"); return g; }), false);
  const pin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(GLOW).multiplyScalar(1.25), transparent: true }));
  pin.add(new THREE.LineSegments(new THREE.EdgesGeometry(pinGeo, 30), edgeMaterial(0.9)));
  // Upright on the target's top rim, leaning a little away from the ports: planted in its face it sat on the Windows mark and read as a
  // smudge.
  pin.rotation.set(0, 0, -0.25);
  pin.position.set(3, TARGET.size - 3, 2);
  pin.visible = false;
  target.node.add(pin);

  // ---------- the way in: a thick line from Kali down into the unpatched port's tag ----------
  // Where the marked tag's top edge ends up, in the set's units, once the target has grown and the tag has grown upward.
  const weakTop = new THREE.Vector3(TARGET_AT.x, TARGET_AT.y, 0).add(
    weak.home.clone().add(new THREE.Vector3(0, (MARKED_SCALE * (tallH + TAG.h)) / 2, 0)).multiplyScalar(TARGET_GROWS)
  );
  const fromKali = new THREE.Vector3(weakTop.x, weakTop.y, 0).normalize().multiplyScalar(KALI_R + 5.5);
  const wayCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(fromKali.x, fromKali.y, 2.5),
    new THREE.Vector3(lerp(fromKali.x, weakTop.x, 0.5) - 3, lerp(fromKali.y, weakTop.y, 0.5), 3),
    new THREE.Vector3(weakTop.x, weakTop.y + 0.6, 3)
  ], false, "centripetal");
  const WAY_SEGMENTS = 64, WAY_RADIAL = 8;
  const way = new THREE.Mesh(new THREE.TubeGeometry(wayCurve, WAY_SEGMENTS, 1.3, WAY_RADIAL, false), new THREE.MeshBasicMaterial({ color: GLOW, transparent: true }));
  way.renderOrder = LAYER.path;
  way.visible = false;
  group.add(way);

  // The cable from act two arrives at the router: its socket is on the router's right side, the side the cable comes from.
  const router = hosts[0];
  const socket = new THREE.Object3D();
  socket.position.set(router.spec.size + 0.5, 0, 0);
  router.node.add(socket);

  // ---------- names ----------
  // Each anchor stands in front of what it names, on the camera's side, because the engine hides a label while a solid body that is
  // not the anchor's own stands between the camera and the anchor.
  const anchor = (parent, x, y) => { const g = new THREE.Group(); g.position.set(x, y, 10); parent.add(g); return g; };
  const label = (parent, text, sub, width, pos, primary, fit) => {
    const plate = nameplate(text, sub, ACCENT, palette.deep, width, fit, 40);
    plate.position.set(...pos);
    if (primary) plate.userData.primary = true;
    plate.visible = false;
    parent.add(plate);
    return plate;
  };
  const wideAddress = plateWidth(15, PX_WIDE);
  const kaliPlate = label(anchor(kali, 0, 0), "Kali", null, wideAddress, [0, -KALI_R - 8.5, 0], true, true);
  const addressPlates = hosts.map((h) => label(anchor(h.node, 0, 0), h.spec.octet, null, wideAddress, [0, -h.spec.size - 6.5, 0], false, true));
  // The plates with a second line are sized so that line, painted at two thirds of the title's size, is at least 11px.
  const wideType = plateWidth(16, PX_WIDE), closeType = plateWidth(20, PX_CLOSE);
  const targetAnchor = anchor(target.node, 0, 0);
  const targetPlate = label(targetAnchor, "Metasploitable 3", ".22, Windows Server 2008", plateWidth(19, PX_CLOSE), [5, -TARGET.size - 9, 0], false, true);
  // The close phases' names stand just below the target, under its port tags and its own name, clear of the way in, the meter and
  // the pin. Above the target, below the router, they read as the router's caption; right of it they ran onto the act rail.
  const aside = [-14, -42, 0];
  const phasePlates = [
    label(anchor(kali, 0, 0), "01 Live hosts", "192.0.2.0/24", wideType, [0, RING + 30, 0], false, true),
    label(targetAnchor, "02 Open ports", "services and versions", closeType, aside, false, true),
    label(targetAnchor, "03 Unpatched SMB", "MS17-010", closeType, aside, false, true),
    label(targetAnchor, "04 EternalBlue", "into port 445", closeType, aside, false, true),
    label(targetAnchor, "05 SYSTEM at once", "it runs in the kernel", closeType, aside, false, true),
    label(targetAnchor, "06 Access kept", "persistence", closeType, aside, false, true),
    label(targetAnchor, "07 No trace", "the way in removed", wideType, [0, -TARGET.size - 20, 0], false, true)
  ];

  // ---------- the room ----------
  const halo = light(1, palette.lightRoom ? 0.08 : 0.16);
  halo.scale.set(300, 240, 1); halo.position.set(0, 0, -60); halo.userData.ambient = true;
  group.add(halo);

  group.scale.setScalar(SET_SCALE);

  // ---------- the camera's route, and how far along it the reader is ----------
  const pose = { position: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40 };
  function tour(p) {
    p = clamp01(p);
    let i = 0;
    while (i < ROUTE.length - 2 && p > ROUTE[i + 1][0]) i++;
    const [p0, a] = ROUTE[i], [p1, b] = ROUTE[i + 1];
    const k = ease(clamp01((p - p0) / Math.max(1e-6, p1 - p0)));
    pose.position.set(lerp(a.pos[0], b.pos[0], k), lerp(a.pos[1], b.pos[1], k), lerp(a.pos[2], b.pos[2], k));
    pose.look.set(lerp(a.look[0], b.look[0], k), lerp(a.look[1], b.look[1], k), lerp(a.look[2], b.look[2], k));
    pose.fov = lerp(a.fov, b.fov, k);
    return pose;
  }
  // Written by camera(p), which the engine calls for this act's hold and with 0 for the flight into it, before any set's update.
  let along = 0;

  const eye = new THREE.Vector3();
  let names = true;
  const show = (plate, on) => { on = on && names; plate.visible = on; plate.material.opacity = on ? 1 : 0; };
  const phase = (i, p) => clamp01((p - PHASES[i][0]) / (PHASES[i][1] - PHASES[i][0]));
  let markedStep = -2, steps = null;

  return {
    group,
    socket,
    hold: HOLD,
    camera: (p) => { along = p; return tour(p); },
    // Where the camera rests for the engine's own arithmetic, in world units: the wide frame's distance less the docking gap, so the
    // set is parked where the tour's first frame sees it.
    mod: () => ({ dx: 0, dy: 0, dz: WIDE.pos[2] * SET_SCALE - 78, df: 0 }),
    debug: { tour, PHASES, ROUTE, along: () => along },
    update(t, progress, camera) {
      const p = along;
      // Once the tour has ended the flight to act four passes through the map, and a name left up then is drawn over whatever the
      // camera is passing (Kali's read 1.50:1 at 90% of the act). The names go once the camera is nearer than the wide frame. Read
      // from the camera, as `along` is, because reduced motion holds the act's progress at 1.
      if (camera) group.worldToLocal(eye.copy(camera.position));
      names = !(p >= 1 && camera && eye.z < WIDE.pos[2] * 0.92);
      const recon = phase(0, p), enumerate = phase(1, p), assess = phase(2, p), exploit = phase(3, p);
      const escalate = phase(4, p), persist = phase(5, p), cover = phase(6, p);
      const calm = 1 - ease(cover);
      // While the camera is on the target the rest of the map steps back.
      const focus = clamp01((p - 0.2) / 0.08) * (1 - clamp01((p - 0.8) / 0.08));
      const rest = 1 - 0.7 * focus;

      // 01 Reconnaissance: pulses spread from Kali, and the hosts answer in address order, each lighting and drawn to Kali.
      // After the scan Kali goes on scanning, faintly, a ring every five seconds by the clock, so the map is never still while a reader
      // stops on a phase; the phases themselves stay on the scroll.
      const idleK = (t / 5) % 1;
      if (recon > 0 && recon < 1) drawSweep(((recon * 3) % 1) * (RING + 30), 0.75 * (1 - ((recon * 3) % 1)));
      else if (recon >= 1) drawSweep(idleK * (RING + 30), 0.34 * (1 - idleK) * calm + 0.14 * (1 - idleK) * (1 - calm));
      // Before the scan proper, the same faint ring: the act opens on the list's first phase, and Play holds that frame longest.
      else drawSweep(idleK * (RING + 30), 0.5 * (1 - idleK));
      hosts.forEach((h, i) => {
        const answered = clamp01((recon - (0.12 + i * 0.16)) / 0.1);
        const flash = answered > 0 ? Math.max(0, 1 - (recon - (0.12 + i * 0.16)) / 0.25) : 0;
        const k = h === target ? Math.max(answered, focus) : answered * rest;
        // Before the scan finds them the machines are still on: each one glows up and down on its own beat, body, mark and outline, so
        // the map's opening frame, the one Play holds longest, is not still with only Kali's light moving.
        const idle = (1 - answered) * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 1.7));
        h.body.material.color.copy(face).lerp(lit, 0.3 * k + 0.5 * flash * (1 - focus) + 0.22 * idle);
        // A host the map steps back from fades into the room rather than darkening: darkened, the .21 host read as a near-black disc
        // beside the list for the whole of the target's close shots.
        h.body.material.opacity = h === target ? 1 : 1 - 0.8 * focus;
        // Faded, it must not hide the glow behind it either, or it reads as a hole cut in the light.
        h.body.material.depthWrite = h.body.material.opacity > 0.99;
        // The target's outline breathes a little while the camera is on it.
        h.edge.material.opacity = 0.32 + 0.63 * k - (h === target ? 0.25 * focus * (0.5 + 0.5 * Math.sin(t * 1.8)) : 0);
        h.mark.material.opacity = 0.15 + 0.8 * k + 0.35 * idle;
        h.edge.material.opacity += 0.15 * idle;
        setSpoke(i, answered);
        show(addressPlates[i], answered >= 1 && focus < 0.5);
      });
      spokes.geometry.attributes.position.needsUpdate = true;
      spokes.material.opacity = 0.7 * rest;
      ring.material.opacity = 0.16 * rest + 0.06;
      kaliFace.material.color.copy(face).lerp(lit, 0.7 + 0.08 * Math.sin(t * 2));
      kaliGlow.material.opacity = (0.4 + 0.15 * Math.sin(t * 2)) * (palette.lightRoom ? 0.5 : 1);
      // Kali's light swells and settles while it waits to start, and holds its size once the scan has begun.
      kaliGlow.scale.setScalar(58 * (1 + 0.3 * (1 - clamp01(recon * 4)) * (0.5 + 0.5 * Math.sin(t * 1.4))));
      show(kaliPlate, focus < 0.5);
      show(targetPlate, focus >= 0.5);

      // 02 Enumeration: the target grows and its ports come out of it, one after another, into a column on Kali's side.
      target.node.scale.setScalar(1 + (TARGET_GROWS - 1) * ease(enumerate) * calm);
      const centre = new THREE.Vector3();
      tags.forEach((tag, i) => {
        const out = ease(clamp01((enumerate - 0.2 - i * 0.15) / 0.35));
        const marked = tag === weak ? ease(assess) : 0;
        const k = out * calm;
        tag.node.visible = k > 0.01;
        tag.node.position.copy(centre).lerp(tag.home, out);
        tag.node.scale.setScalar((0.4 + 0.6 * out) * (1 + (MARKED_SCALE - 1) * marked));
        // The marked tag grows taller upward, and its second face, with the warning, takes over from its first.
        tag.box.scale.y = 1 + (MARKED_TALL - 1) * marked;
        tag.box.position.y = ((tag.box.scale.y - 1) * TAG.h) / 2;
        tag.box.material.color.copy(face).lerp(lit, 0.16 + 0.6 * marked);
        tag.box.material.opacity = k;
        // A face writing depth while it fades cuts a dark hole in the ring and lines behind it, so it stops writing once it fades.
        tag.box.material.depthWrite = k > 0.95;
        tag.edge.material.opacity = 0.95 * k;
        tag.words.material.opacity = k * (1 - marked);
        tag.words.visible = marked < 0.99;
        leadPos.set([-TARGET.size - 0.5, tag.node.position.y * 0.5, 0.5, tag.node.position.x + (TAG.w / 2) * tag.node.scale.x, tag.node.position.y, 0.5], i * 6);
      });
      markedWords.visible = assess > 0 && calm > 0.01;
      markedWords.material.opacity = ease(assess) * calm;
      leads.geometry.attributes.position.needsUpdate = true;
      leads.material.opacity = 0.8 * ease(enumerate) * calm;
      leads.visible = enumerate > 0 && calm > 0.01;

      // 04 Exploitation: EternalBlue, drawn from Kali down into port 445; the shell lands at the top of the meter in one stroke, past a
      // user pill that never lights, because EternalBlue runs in the kernel and arrives as SYSTEM.
      way.visible = exploit > 0 && calm > 0.01;
      way.geometry.setDrawRange(0, Math.round(ease(clamp01(exploit / 0.7)) * WAY_SEGMENTS) * WAY_RADIAL * 6);
      way.material.opacity = calm;
      // The way in pulses by the clock while it is drawn, so the close frames are never still while a reader stops on a phase.
      way.material.color.copy(lit).multiplyScalar(0.8 + 0.2 * Math.sin(t * 2.4));
      meterNode.visible = exploit > 0.55 && calm > 0.01;
      meter.material.opacity = calm;
      meterEdge.material.opacity = 0.9 * calm;
      meterWords.material.opacity = calm;
      const strike = clamp01((exploit - 0.7) / 0.3);
      setMeter(userId, 0);
      stepIds.forEach((id, i) => setMeter(id, clamp01(strike * 5 - i) * 1.1));
      // 05 Privilege escalation: nothing to climb. The SYSTEM pill flares and its name says so.
      setMeter(systemId, clamp01(strike * 5 - 4) * (1.4 + 0.6 * Math.sin(Math.PI * escalate)));
      systemGlow.visible = strike > 0.8 && calm > 0.01;
      systemGlow.material.opacity = (0.35 + 0.5 * Math.sin(Math.PI * escalate)) * calm * (palette.lightRoom ? 0.5 : 1);
      systemGlow.scale.setScalar(26 + 22 * Math.sin(Math.PI * escalate));

      // 06 Post-exploitation: the pin is planted. It stays, faint, once the tracks are covered.
      pin.visible = persist > 0;
      pin.scale.setScalar(0.4 + 0.6 * ease(persist));
      pin.material.opacity = ease(persist) * (1 - 0.6 * ease(cover));
      pin.children[0].material.opacity = 0.9 * pin.material.opacity;

      // One phase's name at a time, from its start until the next phase starts.
      phasePlates.forEach((plate, i) => {
        const end = i + 1 < PHASES.length ? PHASES[i + 1][0] : 1.01;
        show(plate, p >= PHASES[i][0] && p < end);
      });

      // The same phase marked in the act's list of seven on the page, so a plate's number has a row to match. A class, written only when
      // the phase changes: a style written every frame costs the whole document a recalculation.
      const current = PHASES.findIndex((range, i) => p >= range[0] && p < (i + 1 < PHASES.length ? PHASES[i + 1][0] : 1.01));
      if (current !== markedStep) {
        markedStep = current;
        if (!steps) steps = document.querySelectorAll("#method .case-flow > .case-step");
        steps.forEach((step, i) => step.classList.toggle("is-current", i === current));
      }
    }
  };
}
