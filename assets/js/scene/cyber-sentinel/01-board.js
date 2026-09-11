// ABOUTME: Act I's set: the Raspberry Pi 5 the whole project runs on, assembled part by part.
// ABOUTME: Laid out from the real board, 85mm by 56mm, one world unit per millimetre.
//
// The hardware is not decoration here. Cyber Sentinel's own repository says it runs on a
// Raspberry Pi 5 under Kali Linux, and the fact a full SIEM fits on a 85mm board is the
// project's actual claim. So the title act is the board, and the camera tilts down into it.
import { THREE, clamp01, drift, ease, edgedBox, glow, motes, painted, panel, repeated, seeded, solid, wire } from "../kit.js";

const BOARD_W = 85;
const BOARD_D = 56;

export function buildBoard(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[0];
  const ink = palette.ink;
  const face = palette.face;
  const random = seeded(11);

  // Every part records when it arrives, so the board builds itself while the title is read
  // instead of being present from the first frame.
  const parts = [];
  function part(mesh, at) {
    group.add(mesh);
    parts.push({ mesh, at, y: mesh.position.y });
    return mesh;
  }

  // ——— the board ———
  const pcb = edgedBox(BOARD_W, 1.6, BOARD_D, face, accent, 0.85);
  part(pcb, 0);

  // Four mounting holes, which are the detail that says "this is a real board" faster than
  // any of the chips do.
  const holeRing = new THREE.EdgesGeometry(new THREE.CylinderGeometry(2.7, 2.7, 2.4, 14), 12);
  const holePoints = [];
  const holeVertex = new THREE.Vector3();
  const holeSource = holeRing.attributes.position;
  for (const [hx, hz] of [[-38.5, -21.5], [-38.5, 21.5], [19.5, -21.5], [19.5, 21.5]]) {
    for (let v = 0; v < holeSource.count; v++) {
      holeVertex.fromBufferAttribute(holeSource, v);
      holePoints.push(new THREE.Vector3(holeVertex.x + hx, holeVertex.y, holeVertex.z + hz));
    }
  }
  part(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(holePoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.5 })
  ), 0.05);

  // ——— silicon ———
  const soc = edgedBox(15, 2.4, 15, face, accent, 1);
  soc.position.set(-2, 2, 2);
  part(soc, 0.16);
  const socLid = solid(new THREE.PlaneGeometry(13, 13), accent, 0.14);
  socLid.rotation.x = -Math.PI / 2;
  socLid.position.set(-2, 3.25, 2);
  part(socLid, 0.18);

  const ram = edgedBox(11, 1.8, 11, face, accent, 0.9);
  ram.position.set(-17, 1.7, -3);
  part(ram, 0.2);

  const rp1 = edgedBox(9, 1.6, 9, face, accent, 0.9);
  rp1.position.set(14, 1.6, 14);
  part(rp1, 0.22);

  const pmic = edgedBox(5, 1.2, 5, face, accent, 0.75);
  pmic.position.set(-30, 1.4, 6);
  part(pmic, 0.24);

  // ——— the 2x20 header ———
  // Fifty-one millimetres of pins is the most recognisable thing on the board, and it is worth
  // forty boxes: at this distance a textured strip reads as a smudge.
  const header = new THREE.Group();
  const pinGeo = new THREE.BoxGeometry(0.9, 5.4, 0.9);
  const pinMat = new THREE.MeshBasicMaterial({ color: accent });
  const pins = new THREE.InstancedMesh(pinGeo, pinMat, 40);
  const dummy = new THREE.Object3D();
  let n = 0;
  for (let i = 0; i < 20; i++) {
    for (let row = 0; row < 2; row++) {
      dummy.position.set(-28.6 + i * 2.54, 3.5, -24.4 + row * 2.54);
      dummy.updateMatrix();
      pins.setMatrixAt(n++, dummy.matrix);
    }
  }
  header.add(pins);
  header.add(edgedBox(52, 2.6, 6.2, face, accent, 0.6));
  header.children[1].position.set(-3.6, 2, -23.1);
  header.position.y = 0;
  part(header, 0.3);

  // ——— ports, all on the two real edges ———
  const ethernet = edgedBox(16, 13.5, 21, face, accent, 0.95);
  ethernet.position.set(36, 7.5, -18);
  part(ethernet, 0.38);

  const usbUpper = edgedBox(15, 15.5, 17, face, accent, 0.95);
  usbUpper.position.set(36, 8.5, 0);
  part(usbUpper, 0.42);
  const usbLower = edgedBox(15, 15.5, 17, face, accent, 0.95);
  usbLower.position.set(36, 8.5, 18);
  part(usbLower, 0.46);

  for (let i = 0; i < 2; i++) {
    const hdmi = edgedBox(7.2, 3.4, 6.4, face, accent, 0.9);
    hdmi.position.set(-25 + i * 13.5, 2.6, 26);
    part(hdmi, 0.5 + i * 0.03);
  }
  const usbc = edgedBox(9, 3.4, 7.4, face, accent, 0.9);
  usbc.position.set(-38, 2.6, 24);
  part(usbc, 0.56);

  const pcie = edgedBox(3, 2.6, 18, face, accent, 0.7);
  pcie.position.set(30, 2.1, -1);
  part(pcie, 0.58);

  // ——— power light ———
  const led = glow(accent, 5, 0);
  led.position.set(-41, 3, 20);
  group.add(led);

  // ——— the active cooler, which lands last ———
  const cooler = new THREE.Group();
  const fins = [];
  for (let i = 0; i < 11; i++) fins.push([-4, 9.5, -8 + i * 1.7]);
  cooler.add(repeated(new THREE.BoxGeometry(28, 9, 0.7), fins, face, accent, 0.5));
  const fanRing = wire(new THREE.TorusGeometry(7.5, 0.5, 6, 26), accent, 0.8);
  fanRing.rotation.x = Math.PI / 2;
  fanRing.position.set(-4, 14.5, 12);
  cooler.add(fanRing);
  const blades = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const blade = solid(new THREE.PlaneGeometry(6.6, 2.1), accent, 0.4);
    blade.rotation.y = (i / 7) * Math.PI * 2;
    blade.rotation.x = 0.5;
    blade.position.set(Math.cos((i / 7) * Math.PI * 2) * 3.4, 0, Math.sin((i / 7) * Math.PI * 2) * 3.4);
    blades.add(blade);
  }
  blades.position.copy(fanRing.position);
  cooler.add(blades);
  cooler.position.y = 6;
  part(cooler, 0.44);

  // ——— callouts ———
  // Type has to be painted into a canvas to exist in a WebGL scene at all. Three labels, set
  // in the page's own display face, because a scene with no words in it reads as a screensaver.
  function callout(text, sub) {
    const texture = painted(512, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.fillStyle = "#" + accent.getHexString();
      g.font = "600 44px Archivo, 'Segoe UI', sans-serif";
      g.textBaseline = "middle";
      g.fillText(text, 16, 44);
      g.globalAlpha = 0.62;
      g.font = "400 28px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(sub, 16, 92);
      g.globalAlpha = 1;
      g.fillRect(0, 8, 4, 104);
    });
    const plate = panel(texture, 34, 8.5, 0);
    plate.userData.caption = text;
    return plate;
  }
  const labels = [
    { mesh: callout("BCM2712", "quad Arm Cortex-A76"), pos: [34, 24, 6], at: 0.56 },
    { mesh: callout("2x20 GPIO", "header, 2.54mm pitch"), pos: [30, 4, -36], at: 0.62 },
    { mesh: callout("Kali Linux", "the whole SIEM, on 85mm"), pos: [26, -22, 26], at: 0.68 }
  ];
  for (const label of labels) {
    label.mesh.position.set(label.pos[0], label.pos[1], label.pos[2]);
    group.add(label.mesh);
  }
  // The one that names the set, kept on a phone where the others are dropped.
  labels[0].mesh.userData.primary = true;

  // A leader line from the chip callout back to the chip it names.
  const socLeader = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, 4, 2), new THREE.Vector3(14, 21, 2)]),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0 })
  );
  group.add(socLeader);

  // ——— the bench ———
  // A hero object alone in a starfield is a product render, not a set. What the board actually
  // sat on was a desk with other equipment on it, so that is what is behind it: a few dim
  // volumes well back, and a soft pool of light underneath where the surface would be. Not a
  // grid, and not a floor plane with lines on it; those are what the CSS version drew.
  const bench = repeated(new THREE.BoxGeometry(26, 10, 18), [
    [-84, -34, -70],
    [-50, -30, -96],
    [64, -36, -84],
    [96, -28, -60]
  ], face, accent, 0.22);
  bench.userData.ambient = true;
  group.add(bench);

  const pool = glow(accent, 1, palette.lightRoom ? 0.06 : 0.13);
  pool.scale.set(180, 54, 1);
  pool.position.set(0, -26, -30);
  pool.userData.ambient = true;
  group.add(pool);

  // ——— air ———
  // Deliberately no ground grid. A receding grid is the one thing this page is not allowed to
  // be: it is what the CSS version drew everywhere, and it is what the owner rejected it for.
  // The board hangs in fog and dust, and its own edges do all the drawing.
  const dust = [];
  for (let i = 0; i < 220; i++) {
    dust.push((random() - 0.5) * 260, -20 + random() * 110, (random() - 0.5) * 220);
  }
  const air = motes(dust, accent, 1.3, 0.42);
  air.userData.ambient = true;
  group.add(air);

  // Components, loose in the air around the bench: chip bodies, a fan blade, a length of pin
  // header, a heatsink fin. The same parts the board is made of, not floating platonic solids.
  const spares = drift([
    new THREE.BoxGeometry(9, 2, 9),
    new THREE.BoxGeometry(2.2, 1.2, 14),
    new THREE.CylinderGeometry(4.4, 4.4, 1.2, 8),
    new THREE.BoxGeometry(14, 5, 0.6),
    new THREE.BoxGeometry(5, 5, 5)
  ], 11, accent, palette.lightRoom ? 0.24 : 0.3, 91);
  spares.object.userData.ambient = true;
  group.add(spares.object);

  const halo = glow(accent, 150, palette.lightRoom ? 0.1 : 0.2);
  halo.userData.ambient = true;
  halo.position.set(0, 4, -40);
  group.add(halo);

  // Tilted up towards the camera rather than lying flat. A board seen from a shallow angle is
  // a grey parallelogram: the components have no height against it and the header disappears
  // entirely. At about forty degrees every part keeps its own silhouette.
  group.rotation.x = 0.72;
  group.rotation.z = 0.06;
  // Sized to the right third of a 1440 frame with the copy in the left half. The board is 85mm
  // of real hardware and the frame at this distance is about 100 units across, so at full size
  // it sits behind the words instead of beside them.
  group.scale.setScalar(0.5);

  return {
    group,
    // An object, not a space. The reader is meant to see the whole board, so the frame audit
    // holds it inside the canvas.
    contained: true,
    update(t, p) {
      // The board assembles over the first two thirds of the act, then simply runs.
      // Starts part-built. This is the frame the page lands on, and an empty slab is a bad
      // first impression; the chips, the header and the cooler still arrive as the title is read.
      const build = clamp01(p * 1.9 + 0.5);
      for (const item of parts) {
        const k = ease(clamp01((build - item.at) / 0.22));
        item.mesh.visible = k > 0.01;
        item.mesh.scale.setScalar(Math.max(0.001, k));
        item.mesh.position.y = item.y + (1 - k) * 26;
      }

      // The whole board turns very slowly. Enough that a still frame taken twice is not the
      // same frame, not enough to read as a spinning object.
      group.rotation.y = -0.34 + Math.sin(t * 0.12) * 0.12 + p * 0.34;
      group.rotation.x = 0.72 - p * 0.18;
      group.position.y = 12 + Math.sin(t * 0.5) * 0.9;

      blades.rotation.y = t * 6;
      air.rotation.y = t * 0.02;
      spares.update(t);

      // Power light comes up once the cooler has landed, then breathes.
      const powered = ease(clamp01((build - 0.5) * 4));
      led.material.opacity = powered * (0.65 + Math.sin(t * 2.2) * 0.35);
      led.scale.setScalar(4 + powered * 2);
      socLid.material.opacity = 0.08 + powered * 0.12 + Math.sin(t * 1.4) * 0.03;

      const labelIn = (at) => ease(clamp01((build - at) * 7));
      for (const label of labels) label.mesh.material.opacity = labelIn(label.at) * 0.95;
      socLeader.material.opacity = labelIn(0.56) * 0.45;

    },
    // Tilt down into the board and pull closer as the act runs, which is the move the plan
    // asks for: the reader arrives above it and ends up inside it.
    // Arrive looking down on the board and end level with it, close enough that the header
    // pins and the cooler fins have real size. The distances are small because the whole set
    // is 53 units wide: a bigger move flies straight past it, which is what the first cut did.
    // Down and in. Starts above and back from the board and ends close over the header, so
    // the reader arrives looking at a whole board and leaves able to count the pins.
    mod: (p) => ({
      dx: -6 + 10 * ease(p),
      dy: 26 - 22 * ease(p),
      dz: 54 - 46 * ease(p),
      df: 0
    })
  };
}
