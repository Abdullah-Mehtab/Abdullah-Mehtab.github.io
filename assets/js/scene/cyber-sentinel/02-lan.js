// ABOUTME: Act II's set: a rack room nobody is watching, and the moment agents start reporting.
// ABOUTME: The seven streams are the seven attack classes Cyber Sentinel's own rules actually name.
//
// The act is about the gap between having machines and having visibility. So the set opens with
// traffic crossing a room that never reacts, and closes with every rack reporting into a manager
// that stops it. Nothing is invented: the seven labels are the detection classes in the
// project's Wazuh and Suricata rules.
//
// The machines are racks rather than monitors. Twelve flat screens floating at eye height read
// as a node diagram of a network; cabinets with rack units in them read as a room, and the room
// is the point: this kind of monitoring is usually assumed to need one.
import { THREE, clamp01, drift, ease, edgedBox, glow, motes, painted, panel, repeated, seeded, wire } from "../kit.js";

const THREATS = [
  "aggressive scan",
  "DDoS",
  "brute force",
  "SQL injection",
  "Shellshock",
  "Meterpreter",
  "system intrusion"
];

const RACK_W = 21;
const RACK_H = 74;
const RACK_D = 28;
const UNITS = 15;

export function buildLan(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[1];
  const face = palette.face;
  const random = seeded(23);

  // ——— the racks ———
  // Two rows, the back one set deeper and offset, so the room has a floor plan rather than a
  // front elevation.
  const spots = [];
  for (let row = 0; row < 2; row++) {
    const count = row === 0 ? 5 : 4;
    for (let i = 0; i < count; i++) spots.push([-18 + i * 26 + row * 13, 0, -6 - row * 46]);
  }
  group.add(repeated(new THREE.BoxGeometry(RACK_W, RACK_H, RACK_D), spots, face, accent, 0.5));

  // Rack units: the horizontal slots down the face of each cabinet. This is the detail that
  // makes a box a rack, and all of them together are one line buffer.
  const slotPoints = [];
  for (const [x, y, z] of spots) {
    for (let u = 0; u < UNITS; u++) {
      const uy = y - RACK_H / 2 + 4 + u * ((RACK_H - 8) / UNITS);
      slotPoints.push(
        new THREE.Vector3(x - RACK_W / 2 + 2, uy, z + RACK_D / 2 + 0.2),
        new THREE.Vector3(x + RACK_W / 2 - 2, uy, z + RACK_D / 2 + 0.2)
      );
    }
  }
  const slots = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(slotPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.3 })
  );
  group.add(slots);

  // Detail that stops a rack being a box with stripes on it: a vented plinth, a cable manager
  // across the middle, and a few units that stand proud of the face. Without these the set is
  // the least specific on the page, and it is the only one that has to carry a whole act on
  // its own silhouette before any label arrives.
  const trim = [];
  for (const [x, y, z] of spots) {
    const front = z + RACK_D / 2;
    // vented plinth
    for (let v = 0; v < 9; v++) {
      const vx = x - RACK_W / 2 + 3 + v * ((RACK_W - 6) / 8);
      trim.push(
        new THREE.Vector3(vx, y - RACK_H / 2 + 0.8, front + 0.3),
        new THREE.Vector3(vx, y - RACK_H / 2 + 3.4, front + 0.3)
      );
    }
    // cable manager
    trim.push(
      new THREE.Vector3(x - RACK_W / 2 + 1.5, y + 4, front + 0.4),
      new THREE.Vector3(x + RACK_W / 2 - 1.5, y + 4, front + 0.4),
      new THREE.Vector3(x - RACK_W / 2 + 1.5, y + 6.4, front + 0.4),
      new THREE.Vector3(x + RACK_W / 2 - 1.5, y + 6.4, front + 0.4)
    );
  }
  const detail = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(trim),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.4 })
  );
  group.add(detail);

  // Three units pulled forward out of the faces, which is what a rack in use looks like.
  const proud = [];
  for (let i = 0; i < 3; i++) {
    const [x, y, z] = spots[i * 2];
    proud.push([x, y + 8 - i * 14, z + RACK_D / 2 + 1.6]);
  }
  group.add(repeated(new THREE.BoxGeometry(RACK_W - 4, 3.4, 4), proud, face, accent, 0.7));

  // One status strip per rack. Nearly dark while nothing is watching, up once the agents
  // report: the whole act in one material.
  const strips = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(2.4, RACK_H - 12),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.07 }),
    spots.length
  );
  const slot = new THREE.Object3D();
  spots.forEach(([x, y, z], i) => {
    slot.position.set(x + RACK_W / 2 - 3.4, y, z + RACK_D / 2 + 0.4);
    slot.updateMatrix();
    strips.setMatrixAt(i, slot.matrix);
  });
  group.add(strips);

  const endpoints = spots.map(([x, y, z]) => ({ at: new THREE.Vector3(x, y + RACK_H / 2 - 6, z) }));

  // ——— the manager ———
  // It is not there at the start of the act. It arrives, and that arrival is the act.
  // A stack of rules in an open frame, not a faceted polyhedron with a cube inside it. The
  // polyhedron is the reference site's own signature device, and the standing ruling on that
  // site is benchmark, never a source. This is also the more honest shape: what a Wazuh
  // manager is, is an ordered stack of rules and decoders that events are pushed through.
  const manager = new THREE.Group();
  manager.add(edgedBox(26, 34, 26, face, accent, 1));

  const rules = [];
  for (let i = 0; i < 9; i++) {
    const width = 22 - Math.abs(i - 4) * 1.6;
    const plate = wire(new THREE.BoxGeometry(width, 1.1, width), accent, 0.55);
    plate.position.y = -14 + i * 3.5;
    manager.add(plate);
    rules.push(plate);
  }

  // Four corner posts, which is the frame a rack appliance actually sits in.
  const postPoints = [];
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    postPoints.push(new THREE.Vector3(sx * 15, -19, sz * 15), new THREE.Vector3(sx * 15, 19, sz * 15));
  }
  for (const y of [-19, 19]) {
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (let i = 0; i < 4; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 4];
      postPoints.push(new THREE.Vector3(a[0] * 15, y, a[1] * 15), new THREE.Vector3(b[0] * 15, y, b[1] * 15));
    }
  }
  const frame = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(postPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.5 })
  );
  manager.add(frame);
  const managerLabel = panel(painted(512, 96, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = "#" + accent.getHexString();
    g.font = "600 46px Archivo, 'Segoe UI', sans-serif";
    g.textBaseline = "middle";
    g.textAlign = "center";
    g.fillText("Wazuh Manager", w / 2, h / 2);
  }), 42, 8, 0);
  managerLabel.userData.caption = "Wazuh Manager";
  managerLabel.userData.primary = true;
  managerLabel.position.set(0, 24, 0);
  manager.add(managerLabel);
  manager.position.set(118, 8, 10);
  group.add(manager);

  const managerGlow = glow(accent, 78, 0);
  managerGlow.position.copy(manager.position);
  managerGlow.userData.ambient = true;
  group.add(managerGlow);

  // ——— agent reporting lines ———
  // Three bundles, each coming up a beat after the one before, so the room fills in rather
  // than switching on.
  const links = [];
  const bundles = [];
  for (let b = 0; b < 3; b++) {
    const points = [];
    for (let i = b * 3; i < Math.min(b * 3 + 3, endpoints.length); i++) {
      const from = endpoints[i].at.clone();
      const to = manager.position.clone();
      const mid = from.clone().lerp(to, 0.5);
      mid.y += 18;
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const along = curve.getPoints(20);
      for (let s = 0; s < along.length - 1; s++) points.push(along[s], along[s + 1]);
      const bead = glow(accent, 3.6, 0);
      group.add(bead);
      links.push({ bead, curve, offset: random(), bundle: b });
    }
    const line = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0 })
    );
    group.add(line);
    bundles.push(line);
  }

  // ——— the threats ———
  // Each crosses the room along its own lane. Before the manager exists it goes straight
  // through; after, it dies at the manager, and that difference is the act.
  const trailPoints = [];
  const lanes = THREATS.map((name, i) => {
    const y = 58 - i * 15;
    const z = 34 - i * 8;
    trailPoints.push(new THREE.Vector3(206, y, z), new THREE.Vector3(-46, y, z));

    const head = glow(accent, 7, 0.9);
    head.position.set(206, y, z);
    group.add(head);

    const label = panel(painted(384, 64, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.fillStyle = "#" + accent.getHexString();
      g.font = "500 40px 'IBM Plex Mono', ui-monospace, monospace";
      g.textBaseline = "middle";
      g.fillText(name, 8, h / 2);
    }), 33, 5.5, 0.7);
    label.userData.caption = name;
    // It enters from off-frame and leaves at the manager: being half on screen is what it is
    // doing, not a composition fault. The frame audit skips these for that reason.
    label.userData.transient = true;
    label.position.set(206, y + 6, z);
    group.add(label);

    return { head, label, y, z, at: random() };
  });
  // Traffic is the one thing in this chapter with no manufactured shape, so it is the one
  // thing drawn as particles rather than as edges. Hardware has millimetres and gets sharp
  // geometry; an attack in flight has none, and a swarm of dots is what it looks like. Every
  // lane's swarm lives in one buffer, so all seven cost a single draw call.
  const SWARM = 16;
  const swarmPositions = new Float32Array(THREATS.length * SWARM * 3);
  const swarm = motes(Array.from(swarmPositions), accent, 2.6, 0.75);
  swarm.geometry.setAttribute("position", new THREE.BufferAttribute(swarmPositions, 3));
  group.add(swarm);

  const trails = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(trailPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.16 })
  );
  group.add(trails);

  // ——— the room ———
  // A back row of further racks, dim enough to be depth rather than content, and a pool of
  // light on the floor. No grid: a receding grid is what the version before this one drew
  // everywhere, and it is what the owner rejected it for.
  const far = [];
  for (let i = 0; i < 5; i++) far.push([-40 + i * 30, -6, -150]);
  const backRow = repeated(new THREE.BoxGeometry(24, 68, 26), far, face, accent, 0.16);
  backRow.userData.ambient = true;
  group.add(backRow);

  // Packets and alerts in the air: flat cells going past, and the triangle every console in
  // the world uses to mean something is wrong.
  const traffic = drift([
    new THREE.BoxGeometry(7, 3, 0.6),
    new THREE.ConeGeometry(4, 6, 3),
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.BoxGeometry(11, 1.4, 1.4)
  ], 13, accent, palette.lightRoom ? 0.22 : 0.28, 47);
  traffic.object.userData.ambient = true;
  group.add(traffic.object);

  const pool = glow(accent, 1, palette.lightRoom ? 0.05 : 0.12);
  pool.scale.set(300, 70, 1);
  pool.position.set(50, -46, -60);
  pool.userData.ambient = true;
  group.add(pool);

  const dust = [];
  for (let i = 0; i < 260; i++) dust.push((random() - 0.5) * 300, (random() - 0.5) * 160, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.1, 0.3);
  air.userData.ambient = true;
  group.add(air);

  group.scale.setScalar(0.5);

  const WATCHED_FROM = 0.42;

  return {
    group,
    update(t, p) {
      const watched = ease(clamp01((p - WATCHED_FROM) / 0.3));

      manager.scale.setScalar(0.02 + watched * 0.98);
      manager.visible = watched > 0.02;
      manager.rotation.y = t * 0.18;
      // The rule stack turns as one and each plate breathes on its own beat: an event is
      // being pushed down through the ruleset, which is what this node does.
      for (let i = 0; i < rules.length; i++) {
        const pulse = (Math.sin(t * 1.6 - i * 0.5) + 1) / 2;
        rules[i].material.opacity = 0.3 + pulse * 0.45 * watched;
        rules[i].rotation.y = Math.sin(t * 0.2 + i) * 0.08;
      }
      managerLabel.material.opacity = watched * 0.95;
      managerGlow.material.opacity = watched * 0.28 * (0.8 + Math.sin(t * 1.7) * 0.2);

      strips.material.opacity = 0.06 + Math.sin(t * 1.6) * 0.025 + watched * 0.5;
      slots.material.opacity = 0.26 + watched * 0.2;

      for (let b = 0; b < bundles.length; b++) {
        bundles[b].material.opacity = ease(clamp01((watched - b * 0.16) * 2.4)) * 0.4;
      }
      for (const link of links) {
        const live = ease(clamp01((watched - link.bundle * 0.16) * 2.4));
        link.bead.material.opacity = live * 0.85;
        const along = (t * 0.35 + link.offset) % 1;
        link.bead.position.copy(link.curve.getPoint(along));
        link.bead.scale.setScalar(2.4 + Math.sin(along * Math.PI) * 2.2);
      }

      // The terminating x walks from off the left of the room to the manager as the act turns.
      const stopAt = -46 + (manager.position.x + 24 - -46) * watched;
      for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i];
        const cycle = (t * 0.22 + lane.at) % 1;
        const x = 206 - cycle * 260;
        const stopped = x <= stopAt;
        lane.head.position.set(stopped ? stopAt : x, lane.y, lane.z);
        lane.label.position.set((stopped ? stopAt : x) + 26, lane.y + 6, lane.z);
        lane.label.material.opacity = 0.55 + (stopped ? 0.35 : 0);

        // A caught stream flares and goes out. An uncaught one just keeps going.
        const burst = stopped ? Math.max(0, 1 - (x - stopAt) / -40) : 0;
        lane.head.scale.setScalar(stopped ? 4 + burst * 9 : 5.5 + Math.sin(t * 6 + i) * 0.8);
        lane.head.material.opacity = stopped ? Math.max(0.1, 0.9 - burst * 0.7) : 0.9;

        // The swarm trails its own head while the stream is running, and scatters outward from
        // the manager once the stream is being caught there.
        const headX = stopped ? stopAt : x;
        for (let s = 0; s < SWARM; s++) {
          const at = (i * SWARM + s) * 3;
          const back = s * 3.4;
          const wobble = Math.sin(t * 3 + s * 1.7 + i) * 2.2;
          if (stopped) {
            const spread = burst * (6 + s * 1.4);
            swarmPositions[at] = headX + Math.cos(s * 2.4 + t) * spread;
            swarmPositions[at + 1] = lane.y + Math.sin(s * 1.9 + t) * spread;
            swarmPositions[at + 2] = lane.z + Math.cos(s * 3.1) * spread * 0.6;
          } else {
            swarmPositions[at] = headX + back;
            swarmPositions[at + 1] = lane.y + wobble * (s / SWARM);
            swarmPositions[at + 2] = lane.z + Math.cos(t * 2 + s) * 1.6 * (s / SWARM);
          }
        }
      }

      swarm.geometry.attributes.position.needsUpdate = true;
      swarm.geometry.computeBoundingSphere();
      swarm.material.opacity = 0.75 - watched * 0.25;
      trails.material.opacity = 0.16 * (1 - watched * 0.55);
      air.rotation.y = t * 0.015;
      traffic.update(t);
    },
    // Track right across the room as the racks come up, ending on the manager.
    // Into the room and along it. The camera enters the aisle as the racks come up and ends
    // in front of the manager, rather than watching the room slide past.
    mod: (p) => ({
      dx: -20 + 34 * ease(p),
      dy: 14 - 16 * ease(p),
      dz: 62 - 54 * ease(p),
      df: 3 - 5 * ease(p)
    })
  };
}
