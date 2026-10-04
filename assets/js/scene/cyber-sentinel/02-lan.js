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
import { LAYER, THREE, clamp01, drift, ease, edgedBox, glow, motes, nameplate, painted, panel, repeated, seeded, wire } from "../kit.js";

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
// How high a reporting line runs on its way across the room. Above the top of a cabinet by
// enough that the line, and the bead riding it, clear every cabinet between the one reporting
// and the manager.
const ABOVE_ROW = RACK_H / 2 + 22;
const UNITS = 15;

export function buildLan(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[1];
  const face = palette.face;
  const random = seeded(23);

  // ——— the racks ———
  // Two rows, the back one set deeper and offset, so the room has a floor plan rather than a
  // front elevation.
  //
  // Four to a row, not five in front. The fifth stood at x 86, spanning 75.5 to 96.5, and the
  // manager at 96 reaches 21 units either side of itself: the whole of that cabinet was inside
  // the manager from the moment it finished growing at 45% of the act, and the manager turns, so
  // it swept through the cabinet for the rest of the act. The owner saw it in a frame before any
  // tool did, because nothing here compared two bodies to each other. checkFilmBodyClash does now.
  //
  // The room gave way rather than the manager, and the other three ways were measured first.
  // Moving the manager right to 118 or 120 clears the cabinet and puts the act's own payoff hard
  // against the right frame edge, because dock() places this set by its own mass and a body that
  // size moving right moves the whole room left: measured, 13% of the screen sits dead at the
  // right at 70%, against a ceiling of 12. Moving it
  // forward to z 29 or beyond clears the cabinet in depth and parks it in the seven attack lanes,
  // which run at z 40 down to z 28 and are placed there deliberately to cross in front of its
  // face. Shrinking it enough to fit beside a cabinet at 96 is not possible: it would have to
  // halve.
  //
  // Eight cabinets instead of nine costs no draw call, since they are one instanced mesh, and the
  // reporting bundles size themselves from the row.
  const spots = [];
  for (let row = 0; row < 2; row++) {
    const count = 4;
    for (let i = 0; i < count; i++) spots.push([-18 + i * 26 + row * 13, 0, -6 - row * 46]);
  }
  group.add(repeated(new THREE.BoxGeometry(RACK_W, RACK_H, RACK_D), spots, face, accent, 0.5));

  // Rack units: the horizontal slots down the face of each cabinet. This is the detail that
  // makes a box a rack, and all of them together are one line buffer.
  //
  // On the sides as well as the front, because the camera goes down an aisle. Every piece of
  // detail in this room used to be drawn at z + RACK_D / 2 and nowhere else: the slots, the
  // plinth vents, the cable managers, the proud bays and the lit strip. So the instant the
  // camera passed that plane, on its way between two cabinets, every cabinet around it was a
  // bare box and the frame measured 1.1% of its pixels on an edge against a floor of 3. The
  // camera was not inside anything. There was nothing to be inside of.
  //
  // The lines sit inside each cabinet's own footprint, so the room's extents and its mass do
  // not move, and neither does where dock() puts it. That is the whole reason this works where
  // taking a cabinet out or moving one did not.
  const slotPoints = [];
  for (const [x, y, z] of spots) {
    for (let u = 0; u < UNITS; u++) {
      const uy = y - RACK_H / 2 + 4 + u * ((RACK_H - 8) / UNITS);
      slotPoints.push(
        new THREE.Vector3(x - RACK_W / 2 + 2, uy, z + RACK_D / 2 + 0.2),
        new THREE.Vector3(x + RACK_W / 2 - 2, uy, z + RACK_D / 2 + 0.2)
      );
      for (const side of [-1, 1]) {
        const sx = x + side * (RACK_W / 2 + 0.2);
        slotPoints.push(
          new THREE.Vector3(sx, uy, z - RACK_D / 2 + 2),
          new THREE.Vector3(sx, uy, z + RACK_D / 2 - 2)
        );
      }
    }
    // Uprights on the sides, not only the horizontal runs.
    //
    // A horizontal line on a wall the camera is flying along converges to the vanishing point and
    // stops being a line the moment the wall is edge on, which is exactly the frame this is for:
    // the aisle is 2.5 world units wide and the cabinets beside the lens are at a grazing angle.
    // Uprights stay separated across the frame at any angle, which is what makes a corridor read
    // as a corridor.
    for (const side of [-1, 1]) {
      const sx = x + side * (RACK_W / 2 + 0.2);
      for (let v = 0; v <= 5; v++) {
        const vz = z - RACK_D / 2 + 2 + v * ((RACK_D - 4) / 5);
        slotPoints.push(
          new THREE.Vector3(sx, y - RACK_H / 2 + 2, vz),
          new THREE.Vector3(sx, y + RACK_H / 2 - 2, vz)
        );
      }
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

  // Units pulled forward out of the faces, at the heights they actually sit at, and in two
  // depths: a 1U switch is not a 2U server. More cabinets of the same shape is not more to
  // look at; different things in them is.
  const proud = [];
  const bays = [[8, 1], [-6, 2], [20, 1], [-20, 2], [-2, 1]];
  spots.forEach(([x, y, z], i) => {
    const [dy, units] = bays[i % bays.length];
    proud.push([x, y + dy, z + RACK_D / 2 + 1.4, 0, 0, 0, 1, units, 1]);
  });
  group.add(repeated(new THREE.BoxGeometry(RACK_W - 4, 3.2, 4.4), proud, face, accent, 0.75));

  // Cable bundles looping out of the back of the front row and into the floor.
  const loomPoints = [];
  for (const [x, y, z] of spots.slice(0, 5)) {
    for (let c = 0; c < 3; c++) {
      const ox = x - RACK_W / 2 + 4 + c * 5;
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(ox, y + 14 - c * 3, z - RACK_D / 2),
        new THREE.Vector3(ox + 6, y - 18, z - RACK_D - 10),
        new THREE.Vector3(ox + 2, y - RACK_H / 2, z - RACK_D - 2)
      );
      const along = curve.getPoints(10);
      for (let i = 0; i < along.length - 1; i++) loomPoints.push(along[i], along[i + 1]);
    }
  }
  const loom = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(loomPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.28, depthWrite: false })
  );
  loom.renderOrder = LAYER.path;
  group.add(loom);

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

  // Where a cabinet's reporting line leaves it: just clear of the top face, not six units down
  // inside it. Inside the body the bead that runs this line spends the start of every journey
  // behind an opaque panel, so it appears out of nothing partway up. That is half of what the
  // owner saw as "some beads go THROUGH the servers, some float in front, inconsistently"; the
  // other half was the attack lanes, which were moved clear of the cabinets for the same reason.
  // No sorting rule can help a bead that is inside a box.
  const endpoints = spots.map(([x, y, z]) => ({ at: new THREE.Vector3(x, y + RACK_H / 2 + 1.5, z) }));

  // The room names itself while it is still the subject.
  //
  // The manager does not exist for the first 42% of this act, by design: its arrival is the
  // act. But its nameplate was the only one here, so for most of the act the reader was
  // looking at nine unlabelled cabinets with streams crossing them and nothing saying what
  // the place was. This plate holds the first half and hands over as the manager comes up.
  const roomLabel = nameplate("Unwatched LAN", "no agents reporting", accent, palette.deep, 52);
  roomLabel.userData.primary = true;
  roomLabel.position.set(26, 52, 8);
  group.add(roomLabel);

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
  // The plate hangs beside the manager, not on it.
  //
  // It was a child of the manager group, and that group turns continuously, so the plate turned
  // with it and spent half of every revolution showing the reader its back: the words reversed
  // and tilted. The turn is the manager doing its job, an ordered stack of rules with an event
  // being pushed down through it, so the plate comes off the turning thing rather than the turn
  // coming off the set.
  const managerLabel = nameplate("Wazuh Manager", "", accent, palette.deep, 42);
  managerLabel.userData.primary = true;
  managerLabel.position.set(0, 24, 0);
  group.add(managerLabel);
  // This stays where it is. The room was shortened to make space for it, and the three ways of
  // moving it instead were all measured and are all worse. See the rack row above for why.
  //
  // It reaches 21 units either side of its own centre, so it needs the nearest cabinet's face
  // outside x 75, and the front row now ends at 70.5.
  manager.position.set(96, 8, 10);
  group.add(manager);
  managerLabel.position.set(manager.position.x, manager.position.y + 24, manager.position.z);

  const managerGlow = glow(accent, 78, 0);
  managerGlow.position.copy(manager.position);
  managerGlow.userData.ambient = true;
  group.add(managerGlow);

  // ——— agent reporting lines ———
  // Three bundles, each coming up a beat after the one before, so the room fills in rather
  // than switching on.
  const links = [];
  const bundles = [];
  // Sized from the racks rather than from a three that happened to match nine of them. With a
  // rack added to each row the fixed form reported three full bundles and quietly left the last
  // two cabinets reporting to nothing.
  const perBundle = Math.ceil(endpoints.length / 3);
  for (let b = 0; b < 3; b++) {
    const points = [];
    for (let i = b * perBundle; i < Math.min(b * perBundle + perBundle, endpoints.length); i++) {
      const from = endpoints[i].at.clone();
      // Onto the top of the appliance, not into the middle of it. A line that ends at the centre
      // of a body spends its last stretch inside that body, and so does the bead on it.
      const to = manager.position.clone();
      to.y += 19;
      // Up out of the cabinet, across above the row, then down onto the manager.
      //
      // It was one quadratic with its control point 18 above the straight line, and a quadratic
      // does not pass through its control point: from a cabinet top at 38.5 to the manager at 8
      // the curve sagged to 32 halfway, and the cabinets it crossed are 37 tall. So the line and
      // the bead on it went through two or three cabinets on every journey, which is the rest of
      // what the owner saw. ABOVE_ROW clears the tallest thing in the room, and the two control
      // points hold the run flat over it instead of sagging into it.
      const c1 = new THREE.Vector3(from.x, ABOVE_ROW, from.z);
      const c2 = new THREE.Vector3(to.x, ABOVE_ROW, to.z);
      const curve = new THREE.CubicBezierCurve3(from, c1, c2, to);
      const along = curve.getPoints(20);
      for (let s = 0; s < along.length - 1; s++) points.push(along[s], along[s + 1]);
      const bead = glow(accent, 3.6, 0);
      group.add(bead);
      links.push({ bead, curve, offset: random(), bundle: b });
    }
    const line = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false })
    );
    line.renderOrder = LAYER.path;
    group.add(line);
    bundles.push(line);
  }

  // ——— the threats ———
  // Each crosses the room along its own lane. Before the manager exists it goes straight
  // through; after, it dies at the manager, and that difference is the act.
  const trailPoints = [];
  const lanes = THREATS.map((name, i) => {
    const y = 58 - i * 15;
    // Every lane crosses in front of the racks, and in front of the manager's own face.
    //
    // They used to run from z 34 to z -14 while the front row of cabinets spans -20 to 8, so
    // three streams passed in front of the racks and four went straight through them. The
    // owner read that as a depth bug, which is fair: "some beads go THROUGH server, some float
    // in front of them? Whats with the inconsistency?" Nothing was sorting them wrongly. They
    // were put there. Two units apart keeps the lanes separable without any of them reaching
    // the cabinets.
    const z = 40 - i * 2;
    trailPoints.push(new THREE.Vector3(206, y, z), new THREE.Vector3(-46, y, z));

    const head = glow(accent, 7, 0.9);
    head.position.set(206, y, z);
    group.add(head);

    // Wide enough to read at the depth the act establishes from. At 33 units the plate was a
    // 13 pixel cap height at 0.55 opacity, which is why the streams looked like decoration:
    // the reader could see seven things crossing the room and could not tell what any of them
    // was, and the labels are the only thing that makes them attacks rather than particles.
    const label = nameplate(name, "", accent, palette.deep, 44);
    label.userData.caption = name;
    // Atmosphere, not a name to read. Seven attack classes crossing a room at once is a swarm:
    // a reader is meant to take in that the room is under attack and that these are the kinds
    // of attack, not to read the seventh one. Three of them never reach the 12px floor that
    // every other label on the page has to reach, and the owner ruled on 2026-09-16 that they
    // stay exactly as they are. This marker is what exempts them, so the exemption is a
    // decision the set states rather than a hole in the check.
    label.userData.swarm = true;
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
  // Same reason as the flock in kit.js: an exact bounding sphere per frame is a second pass
  // over every point, for a frustum test on something that is always in shot.
  swarm.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 320);
  swarm.frustumCulled = false;
  group.add(swarm);

  const trails = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(trailPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.16, depthWrite: false })
  );
  trails.renderOrder = LAYER.path;
  group.add(trails);

  // ——— the room ———
  // A back row of further racks, dim enough to be depth rather than content, and a pool of
  // light on the floor. No grid: a receding grid is what the version before this one drew
  // everywhere, and it is what the owner rejected it for.
  const far = [];
  for (let i = 0; i < 9; i++) far.push([-70 + i * 30, -6, -150]);
  for (let i = 0; i < 7; i++) far.push([-54 + i * 34, -10, -216]);
  const backRow = repeated(new THREE.BoxGeometry(24, 68, 26), far, face, accent, 0.16);
  backRow.userData.ambient = true;
  group.add(backRow);

  // Packets and alerts in the air: flat cells going past, and the triangle every console in
  // the world uses to mean something is wrong.
  // Frames going past: a packet, a blade, a patch panel, a cable tray. Flat parts from a rack
  // room, not floating solids.
  const traffic = drift([
    new THREE.BoxGeometry(7, 3, 0.6),
    new THREE.BoxGeometry(12, 1.6, 5),
    new THREE.BoxGeometry(9, 0.9, 9),
    new THREE.BoxGeometry(11, 1.4, 1.4)
  ], 24, accent, palette.lightRoom ? 0.22 : 0.28, 47);
  traffic.object.userData.ambient = true;
  group.add(traffic.object);

  const pool = glow(accent, 1, palette.lightRoom ? 0.05 : 0.12);
  pool.scale.set(300, 70, 1);
  pool.position.set(50, -46, -60);
  pool.userData.ambient = true;
  group.add(pool);

  const dust = [];
  for (let i = 0; i < 560; i++) dust.push((random() - 0.5) * 300, (random() - 0.5) * 160, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.1, 0.3);
  air.userData.ambient = true;
  group.add(air);

  group.scale.setScalar(0.5);

  // When the manager arrives, as a fraction of the act.
  //
  // It was 0.42, and the camera has left its resting frame by 0.46 and is between the cabinets
  // by 0.56, so the object this act is about appeared as the reader was being carried past it
  // and was never seen at size with its own name on it. The act still opens on a room nobody is
  // watching, which is the point of it, and the room has its own plate for that stretch now.
  const WATCHED_FROM = 0.16;

  return {
    group,
    update(t, p) {
      const watched = ease(clamp01((p - WATCHED_FROM) / 0.3));

      manager.scale.setScalar(0.02 + watched * 0.98);
      managerLabel.scale.setScalar(0.3 + watched * 0.7);
      manager.visible = watched > 0.02;
      manager.rotation.y = t * 0.18;
      // The rule stack turns as one and each plate breathes on its own beat: an event is
      // being pushed down through the ruleset, which is what this node does.
      for (let i = 0; i < rules.length; i++) {
        const pulse = (Math.sin(t * 1.6 - i * 0.5) + 1) / 2;
        rules[i].material.opacity = 0.3 + pulse * 0.45 * watched;
        rules[i].rotation.y = Math.sin(t * 0.2 + i) * 0.08;
      }
      // Up as soon as the thing it names exists. Tied straight to `watched` it read 0.18 at
      // the halfway point of the act, so the object that gives this act its subject spent most
      // of the act unnamed.
      managerLabel.material.opacity = ease(clamp01(watched * 2.2)) * 0.95;
      // One subject at a time: the room's plate goes as the manager's arrives.
      roomLabel.material.opacity = (1 - ease(clamp01(watched * 1.8))) * 0.9;
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
        lane.label.material.opacity = 0.82 + (stopped ? 0.18 : 0);

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
      swarm.material.opacity = 0.75 - watched * 0.25;
      trails.material.opacity = 0.16 * (1 - watched * 0.55);
      air.rotation.y = t * 0.015;
      traffic.update(t);
    },
    // Track right across the room as the racks come up, ending on the manager. The camera has
    // to travel further right than the set's own offset suggests: the room is 126 units wide
    // and its weight sits at the manager end, so a camera that stops short leaves the manager,
    // which is the thing the act is about, at three quarters of the way to the frame edge.
    // Take in the room, then walk into it. The first third frames the whole rank of racks so
    // the reader knows where they are; the rest moves down the aisle toward the manager as it
    // arrives.
    mod: (p) => {
      const settle = ease(clamp01(p / 0.34));
      const enter = ease(clamp01((p - 0.34) / 0.66));
      return {
        dx: -26 - 4 * settle + 54 * enter,
        dy: 18 - 2 * settle - 18 * enter,
        dz: 104 - 14 * settle - 26 * enter,
        df: 3 - 5 * enter
      };
    }
  };
}
