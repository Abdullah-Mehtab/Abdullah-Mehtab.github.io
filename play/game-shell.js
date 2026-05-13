import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("drive-canvas");
const loadingScreen = document.getElementById("loading-screen");
const titleScreen = document.getElementById("title-screen");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const pauseMenu = document.getElementById("pause-menu");
const resumeButton = document.getElementById("resume-button");
const respawnButton = document.getElementById("respawn-button");
const qualityButton = document.getElementById("quality-button");
const stationPanel = document.getElementById("station-panel");
const stationType = document.getElementById("station-type");
const stationName = document.getElementById("station-name");
const stationHint = document.getElementById("station-hint");
const stationReadout = document.getElementById("station-readout");
const speedReadout = document.getElementById("speed-readout");
const dialoguePanel = document.getElementById("dialogue-panel");
const dialogueSpeaker = document.getElementById("dialogue-speaker");
const dialogueLine = document.getElementById("dialogue-line");
const dialogueNext = document.getElementById("dialogue-next");
const dialogueClose = document.getElementById("dialogue-close");
const touchStick = document.getElementById("touch-stick");
const touchKnob = document.getElementById("touch-knob");
const touchAction = document.getElementById("touch-action");
const touchBoost = document.getElementById("touch-boost");

const WORLD_LIMIT = 62;
const START_POSITION = new THREE.Vector3(0, 0.26, -9);
const START_HEADING = 0;
const STORAGE_THEME_KEY = "abdullah-portfolio-theme";
const STORAGE_MOTION_KEY = "abdullah-portfolio-motion";

const themePalettes = {
  professional: { bg: 0x07111c, fog: 0x07111c, ground: 0x102238, road: 0x172333, accent: 0x68d8ff, alt: 0x7cffb2, glow: 0x2e86de },
  dark: { bg: 0x05080d, fog: 0x05080d, ground: 0x101721, road: 0x1b2636, accent: 0x78b7ff, alt: 0x7cffb2, glow: 0x78b7ff },
  light: { bg: 0xcdd8e8, fog: 0xcdd8e8, ground: 0xb9c8d6, road: 0x6f7f8d, accent: 0x1f5a89, alt: 0x087a54, glow: 0x1f5a89 },
  forest: { bg: 0x07140e, fog: 0x07140e, ground: 0x12351f, road: 0x2d352a, accent: 0x8bdc7f, alt: 0xffd36a, glow: 0x6ee07d },
  space: { bg: 0x040612, fog: 0x040612, ground: 0x0c1021, road: 0x181a2e, accent: 0xa8a6ff, alt: 0x68d8ff, glow: 0xa8a6ff },
  terminal: { bg: 0x020704, fog: 0x020704, ground: 0x061409, road: 0x092112, accent: 0x36ff77, alt: 0xd2ff8c, glow: 0x36ff77 },
  cyber: { bg: 0x070512, fog: 0x070512, ground: 0x120c22, road: 0x1f1730, accent: 0xff4fd8, alt: 0x22f7ff, glow: 0xff4fd8 },
  ocean: { bg: 0x04131e, fog: 0x04131e, ground: 0x0c2a38, road: 0x123342, accent: 0x52d7ff, alt: 0x7cffd6, glow: 0x52d7ff },
  ember: { bg: 0x120806, fog: 0x120806, ground: 0x28170e, road: 0x35251c, accent: 0xffa14a, alt: 0xffdf8a, glow: 0xff7a38 },
  arctic: { bg: 0x071019, fog: 0x071019, ground: 0x162532, road: 0x263746, accent: 0xa8f1ff, alt: 0xe5fbff, glow: 0xa8f1ff },
  royal: { bg: 0x090716, fog: 0x090716, ground: 0x17102c, road: 0x231a3d, accent: 0xd6b0ff, alt: 0xffd36a, glow: 0xa66bff },
  noir: { bg: 0x050505, fog: 0x050505, ground: 0x111111, road: 0x1d1d1d, accent: 0xe8e8e8, alt: 0xb6d8ff, glow: 0xffffff },
  blueprint: { bg: 0x04101d, fog: 0x04101d, ground: 0x061c33, road: 0x0b2a4a, accent: 0x69b7ff, alt: 0xffffff, glow: 0x69b7ff },
  aurora: { bg: 0x06121a, fog: 0x06121a, ground: 0x10232a, road: 0x172f35, accent: 0x79ffc5, alt: 0xd39cff, glow: 0x79ffc5 },
  rain: { bg: 0x071018, fog: 0x071018, ground: 0x12202a, road: 0x1b2d37, accent: 0x9ccfff, alt: 0x9dffcb, glow: 0x9ccfff },
  signal: { bg: 0x05090b, fog: 0x05090b, ground: 0x0c1517, road: 0x111f22, accent: 0xf7ff65, alt: 0x65ffd2, glow: 0xf7ff65 },
  lab: { bg: 0x071111, fog: 0x071111, ground: 0x102020, road: 0x1b2b2b, accent: 0x92ffea, alt: 0xd8ff92, glow: 0x92ffea },
  paper: { bg: 0xd9d2c5, fog: 0xd9d2c5, ground: 0xcac1b1, road: 0x8b8170, accent: 0x2c5b7c, alt: 0x2d6b4f, glow: 0x2c5b7c }
};

const state = {
  scene: null,
  camera: null,
  renderer: null,
  clock: new THREE.Clock(),
  resumeData: null,
  palette: themePalettes.professional,
  car: null,
  carBody: null,
  wheels: [],
  stations: [],
  obstacles: [],
  decorative: [],
  activeStation: null,
  gameStarted: false,
  paused: false,
  qualityHigh: true,
  dialogue: {
    open: false,
    station: null,
    lines: [],
    index: 0,
    typed: "",
    target: "",
    speed: 58,
    cursorTime: 0
  },
  carPhysics: {
    speed: 0,
    heading: START_HEADING,
    lastPosition: START_POSITION.clone()
  },
  input: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
    action: false,
    joystick: new THREE.Vector2(0, 0)
  },
  touch: {
    pointerId: null,
    originX: 0,
    originY: 0
  },
  motion: {
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    stored: readLocal(STORAGE_MOTION_KEY, "auto")
  },
  particles: [],
  starField: null,
  accentMaterials: [],
  lastTheme: null
};

boot().catch((error) => {
  console.error("3D portfolio drive failed:", error);
  loadingScreen.innerHTML = '<p style="color:#ff6d8d">3D world failed to load. Check the console.</p>';
});

async function boot() {
  state.resumeData = await fetchJson("resume_data.json");
  createRenderer();
  createScene();
  createLighting();
  createWorld();
  createCar();
  createStations();
  setupInput();
  setupDebugHooks();
  resize();

  window.addEventListener("resize", resize);
  window.addEventListener("storage", applyThemeFromStorage);

  loadingScreen.classList.add("is-hidden");
  requestAnimationFrame(loop);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
}

function readLocal(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
}

function createRenderer() {
  state.renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true
  });
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  state.renderer.shadowMap.enabled = true;
  state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  state.renderer.outputColorSpace = THREE.SRGBColorSpace;
  state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  state.renderer.toneMappingExposure = 1.05;
}

function createScene() {
  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 260);
  state.camera.position.set(0, 9, -20);
  applyThemeFromStorage();
}

function createLighting() {
  const hemi = new THREE.HemisphereLight(0xbfeeff, 0x08111c, 2.2);
  state.scene.add(hemi);

  const moon = new THREE.DirectionalLight(0xffffff, 2.9);
  moon.position.set(-34, 46, -18);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -75;
  moon.shadow.camera.right = 75;
  moon.shadow.camera.top = 75;
  moon.shadow.camera.bottom = -75;
  state.scene.add(moon);

  const rim = new THREE.DirectionalLight(state.palette.accent, 1.15);
  rim.position.set(32, 20, 42);
  state.scene.add(rim);
}

function createWorld() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(145, 145, 1, 1),
    new THREE.MeshStandardMaterial({
      color: state.palette.ground,
      roughness: 0.88,
      metalness: 0.03,
      map: makeGridTexture()
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  state.scene.add(ground);
  state.decorative.push({ type: "ground", mesh: ground });

  makeRoad(0, -2, 13, 108);
  makeRoad(-29, 16, 52, 10);
  makeRoad(29, 16, 52, 10);
  makeRoad(-34, -24, 10, 45);
  makeRoad(34, -24, 10, 45);
  makeRoad(0, -42, 78, 10);
  makeRoad(0, 37, 86, 10);

  makeCircuitLine(0, -2, 9.2, 104, true);
  makeCircuitLine(-29, 16, 48, 6.2, false);
  makeCircuitLine(29, 16, 48, 6.2, false);
  makeCircuitLine(0, 37, 82, 6.2, false);
  makeCircuitLine(0, -42, 74, 6.2, false);

  makeNeonTower(-51, 43, 12, 0x68d8ff);
  makeNeonTower(51, 43, 10, 0x7cffb2);
  makeNeonTower(-50, -49, 9, 0xf5c86a);
  makeNeonTower(50, -49, 11, 0xff6d8d);
  makeTrees();
  makeStarField();
  makeFloatingDataRibbons();
}

function makeRoad(x, z, width, depth) {
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.08, depth),
    new THREE.MeshStandardMaterial({
      color: state.palette.road,
      roughness: 0.65,
      metalness: 0.08
    })
  );
  road.position.set(x, 0.025, z);
  road.receiveShadow = true;
  state.scene.add(road);
  state.decorative.push({ type: "road", mesh: road });
}

function makeCircuitLine(x, z, width, depth, vertical) {
  const group = new THREE.Group();
  const count = vertical ? 16 : 12;
  for (let i = 0; i < count; i += 1) {
    const dash = new THREE.Mesh(
      new THREE.BoxGeometry(vertical ? 0.16 : 2.2, 0.09, vertical ? 2.2 : 0.16),
      new THREE.MeshBasicMaterial({ color: state.palette.accent, transparent: true, opacity: 0.48 })
    );
    const t = count === 1 ? 0 : i / (count - 1);
    dash.position.set(
      x + (vertical ? 0 : (t - 0.5) * width),
      0.12,
      z + (vertical ? (t - 0.5) * depth : 0)
    );
    group.add(dash);
    state.accentMaterials.push(dash.material);
  }
  state.scene.add(group);
}

function makeNeonTower(x, z, height, color) {
  const tower = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(4, height, 4),
    new THREE.MeshStandardMaterial({
      color: 0x101a25,
      emissive: color,
      emissiveIntensity: 0.18,
      metalness: 0.35,
      roughness: 0.42
    })
  );
  base.position.y = height / 2;
  base.castShadow = true;
  tower.add(base);

  const cap = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.4, 0),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 })
  );
  cap.position.y = height + 1.8;
  tower.add(cap);

  const light = new THREE.PointLight(color, 1.4, 28);
  light.position.y = height + 1.5;
  tower.add(light);

  tower.position.set(x, 0, z);
  state.scene.add(tower);
  state.decorative.push({ type: "tower", mesh: tower, cap, phase: Math.random() * Math.PI * 2 });
}

function makeTrees() {
  const positions = [
    [-46, 24], [-42, 31], [-39, 39], [-51, 8], [-45, -8], [-53, -25],
    [44, 24], [48, 32], [39, 43], [52, 5], [43, -13], [52, -31],
    [-24, 52], [-13, 50], [17, 51], [28, 50], [-22, -55], [21, -55]
  ];
  positions.forEach(([x, z], index) => {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.38, 2.2, 7),
      new THREE.MeshStandardMaterial({ color: 0x4b3328, roughness: 0.9 })
    );
    trunk.position.set(x, 1.1, z);
    trunk.castShadow = true;
    state.scene.add(trunk);

    const top = new THREE.Mesh(
      new THREE.ConeGeometry(1.6 + (index % 3) * 0.18, 4.2, 7),
      new THREE.MeshStandardMaterial({ color: 0x173c29, roughness: 0.82 })
    );
    top.position.set(x, 4, z);
    top.castShadow = true;
    state.scene.add(top);
    state.decorative.push({ type: "tree", mesh: top, phase: index * 0.4 });
  });
}

function makeStarField() {
  const points = [];
  for (let i = 0; i < 480; i += 1) {
    points.push(
      (Math.random() - 0.5) * 210,
      35 + Math.random() * 65,
      (Math.random() - 0.5) * 210
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const material = new THREE.PointsMaterial({
    color: state.palette.alt,
    size: 0.22,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });
  state.starField = new THREE.Points(geometry, material);
  state.scene.add(state.starField);
}

function makeFloatingDataRibbons() {
  for (let i = 0; i < 7; i += 1) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-48 + i * 15, 8 + i % 3, -48),
      new THREE.Vector3(-26 + i * 7, 13 + i % 4, -18),
      new THREE.Vector3(5 + i * 4, 9 + i % 5, 19),
      new THREE.Vector3(48 - i * 10, 15 + i % 3, 48)
    ]);
    const geometry = new THREE.TubeGeometry(curve, 40, 0.04, 6, false);
    const material = new THREE.MeshBasicMaterial({
      color: i % 2 ? state.palette.accent : state.palette.alt,
      transparent: true,
      opacity: 0.22
    });
    const ribbon = new THREE.Mesh(geometry, material);
    state.scene.add(ribbon);
    state.accentMaterials.push(material);
    state.decorative.push({ type: "ribbon", mesh: ribbon, phase: i * 0.55 });
  }
}

function makeGridTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 512;
  const ctx = textureCanvas.getContext("2d");
  ctx.fillStyle = "#102238";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(104,216,255,0.13)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(124,255,178,0.08)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(7, 7);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCar() {
  const car = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x78b7ff,
    roughness: 0.34,
    metalness: 0.42,
    emissive: state.palette.glow,
    emissiveIntensity: 0.08
  });
  const cabinMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d1724,
    roughness: 0.18,
    metalness: 0.55,
    transparent: true,
    opacity: 0.86
  });
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x05080d, roughness: 0.62, metalness: 0.2 });
  const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0a3 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 3.35), bodyMaterial);
  body.position.y = 0.65;
  body.castShadow = true;
  car.add(body);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.34, 1.15), bodyMaterial);
  nose.position.set(0, 0.86, 1.2);
  nose.castShadow = true;
  car.add(nose);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.7, 1.15), cabinMaterial);
  cabin.position.set(0, 1.2, -0.35);
  cabin.castShadow = true;
  car.add(cabin);

  const wheelGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.35, 18);
  const wheelPositions = [
    [-1.18, 0.36, 1.02],
    [1.18, 0.36, 1.02],
    [-1.18, 0.36, -1.08],
    [1.18, 0.36, -1.08]
  ];
  wheelPositions.forEach((position) => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(...position);
    wheel.castShadow = true;
    car.add(wheel);
    state.wheels.push(wheel);
  });

  [-0.5, 0.5].forEach((x) => {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.06), headlightMaterial);
    lamp.position.set(x, 0.75, 1.72);
    car.add(lamp);

    const light = new THREE.SpotLight(0xfff0a3, 7, 23, Math.PI / 7, 0.4, 1.8);
    light.position.set(x, 0.78, 1.86);
    light.target.position.set(x, 0.1, 8);
    car.add(light);
    car.add(light.target);
  });

  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.4, 6),
    new THREE.MeshBasicMaterial({ color: state.palette.alt })
  );
  antenna.position.set(0.72, 1.95, -0.72);
  antenna.rotation.z = -0.18;
  car.add(antenna);

  car.position.copy(START_POSITION);
  car.rotation.y = START_HEADING;
  state.scene.add(car);
  state.car = car;
  state.carBody = body;
  resetCar();
}

function createStations() {
  const stationDefinitions = [
    { id: "hub", name: "Start Hub", type: "Guide", dialogueId: 0, position: [0, -2], color: 0x7cffb2, shape: "terminal", scale: 1.1 },
    { id: "security", name: "Security Lab", type: "Profile", dialogueId: 1, position: [-34, 17], color: 0x68d8ff, shape: "lab", scale: 1.2 },
    { id: "skills", name: "Skills Terminal", type: "Stack", dialogueId: 2, position: [34, 17], color: 0xd8ff92, shape: "terminal", scale: 1.05 },
    { id: "sentinel", name: "Cyber Sentinel", type: "Final Year Project", dialogueId: 3, position: [0, 39], color: 0xff6d8d, shape: "archive", scale: 1.3 },
    { id: "devops", name: "DevOps Pipeline", type: "Infrastructure", dialogueId: 4, position: [38, -25], color: 0xf5c86a, shape: "pipeline", scale: 1.08 },
    { id: "experience", name: "Work Experience", type: "Timeline", dialogueId: 5, position: [-38, -25], color: 0xa8a6ff, shape: "office", scale: 1.12 },
    { id: "education", name: "Education Archive", type: "Academic", dialogueId: 6, position: [-19, -46], color: 0x9ccfff, shape: "library", scale: 1 },
    { id: "awards", name: "Awards Tower", type: "Certificates", dialogueId: 7, position: [19, -46], color: 0xffdf8a, shape: "trophy", scale: 1 },
    { id: "contact", name: "Contact Port", type: "Links", dialogueId: 8, position: [0, 17], color: 0x92ffea, shape: "post", scale: 0.95 }
  ];

  stationDefinitions.forEach((definition) => {
    const station = buildStation(definition);
    state.stations.push(station);
    state.scene.add(station.group);
    state.obstacles.push({
      id: definition.id,
      x: station.position.x,
      z: station.position.z,
      halfX: station.obstacleSize.x,
      halfZ: station.obstacleSize.z
    });
  });
}

function buildStation(definition) {
  const group = new THREE.Group();
  const [x, z] = definition.position;
  group.position.set(x, 0, z);

  const color = definition.color;
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x101a25,
    roughness: 0.45,
    metalness: 0.28,
    emissive: color,
    emissiveIntensity: 0.08
  });
  const trimMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x07111c, roughness: 0.7, metalness: 0.18 });

  const scale = definition.scale || 1;
  const obstacleSize = new THREE.Vector2(4.6 * scale, 4.6 * scale);
  let height = 4.6 * scale;

  if (definition.shape === "pipeline") {
    height = 3.3;
    for (let i = 0; i < 4; i += 1) {
      const block = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2 + i * 0.45, 2.3), baseMaterial);
      block.position.set((i - 1.5) * 2.1, 1 + i * 0.22, 0);
      block.castShadow = true;
      group.add(block);
    }
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 8.2, 14), trimMaterial);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.y = 3.8;
    group.add(pipe);
    obstacleSize.set(6.4, 3.8);
  } else if (definition.shape === "trophy") {
    const column = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.7, 5.5, 7), baseMaterial);
    column.position.y = 2.75;
    column.castShadow = true;
    group.add(column);
    const trophy = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.22, 72, 8), trimMaterial);
    trophy.position.y = 6.2;
    group.add(trophy);
    height = 6.2;
    obstacleSize.set(3.8, 3.8);
  } else if (definition.shape === "archive") {
    const archive = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 5.4), baseMaterial);
    archive.position.y = 2.2;
    archive.castShadow = true;
    group.add(archive);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0, 4.7, 2.1, 4), darkMaterial);
    crown.rotation.y = Math.PI / 4;
    crown.position.y = 5.45;
    crown.castShadow = true;
    group.add(crown);
    obstacleSize.set(5.6, 4.9);
    height = 6.5;
  } else if (definition.shape === "office" || definition.shape === "lab" || definition.shape === "library") {
    const floors = definition.shape === "library" ? 3 : 4;
    for (let i = 0; i < floors; i += 1) {
      const floor = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 4.4), baseMaterial);
      floor.position.y = 0.75 + i * 1.25;
      floor.castShadow = true;
      group.add(floor);
      const line = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.08, 4.7), trimMaterial);
      line.position.y = 1.35 + i * 1.25;
      group.add(line);
    }
    height = floors * 1.25 + 1.4;
    obstacleSize.set(4.9, 4.3);
  } else if (definition.shape === "post") {
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.24, 28), trimMaterial);
    dish.rotation.x = Math.PI / 2.6;
    dish.position.y = 4.5;
    group.add(dish);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 4.4, 10), baseMaterial);
    mast.position.y = 2.2;
    mast.castShadow = true;
    group.add(mast);
    obstacleSize.set(3.4, 3.4);
    height = 5.4;
  } else {
    const terminal = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.2, 3.8), baseMaterial);
    terminal.position.y = 1.6;
    terminal.castShadow = true;
    group.add(terminal);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.7, 0.08), trimMaterial);
    screen.position.set(0, 2, 1.94);
    group.add(screen);
    obstacleSize.set(4.2, 3.8);
    height = 4.2;
  }

  const ringGeometry = new THREE.RingGeometry(3.9 * scale, 4.15 * scale, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.32
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.13;
  group.add(ring);

  const light = new THREE.PointLight(color, 1.8, 22);
  light.position.set(0, height + 1.2, 0);
  group.add(light);

  const label = makeLabelSprite(definition.name, color);
  label.position.set(0, height + 2.1, 0);
  group.add(label);

  const marker = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.7, 0),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 })
  );
  marker.position.y = height + 0.85;
  group.add(marker);

  return {
    ...definition,
    position: new THREE.Vector3(x, 0, z),
    radius: 9.5,
    group,
    ring,
    marker,
    label,
    obstacleSize,
    baseColor: color,
    phase: Math.random() * Math.PI * 2
  };
}

function makeLabelSprite(text, color) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  const ctx = labelCanvas.getContext("2d");
  ctx.clearRect(0, 0, 512, 128);
  ctx.fillStyle = "rgba(5,10,17,0.78)";
  roundedRect(ctx, 18, 26, 476, 76, 18);
  ctx.fill();
  ctx.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
  ctx.lineWidth = 4;
  roundedRect(ctx, 18, 26, 476, 76, 18);
  ctx.stroke();
  ctx.fillStyle = "#eaf2f8";
  ctx.font = "800 34px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 64, 440);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(8.2, 2.05, 1);
  return sprite;
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function setupInput() {
  window.addEventListener("keydown", (event) => {
    if (isGameKey(event.code)) event.preventDefault();
    if (event.code === "Space" || event.code === "Enter") {
      if (!state.gameStarted) {
        startGame();
      } else if (state.dialogue.open) {
        advanceDialogue();
      } else {
        openNearestStation();
      }
      return;
    }
    if (event.code === "Escape") {
      togglePause();
      return;
    }
    if (event.code === "KeyR") {
      resetCar();
      return;
    }
    setKey(event.code, true);
  });

  window.addEventListener("keyup", (event) => {
    setKey(event.code, false);
  });

  startButton.addEventListener("click", startGame);
  titleScreen.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    startGame();
  });
  pauseButton.addEventListener("click", () => togglePause(true));
  resumeButton.addEventListener("click", () => togglePause(false));
  respawnButton.addEventListener("click", () => {
    resetCar();
    togglePause(false);
  });
  qualityButton.addEventListener("click", toggleQuality);
  dialogueNext.addEventListener("click", advanceDialogue);
  dialogueClose.addEventListener("click", closeDialogue);
  touchAction.addEventListener("click", () => {
    if (!state.gameStarted) startGame();
    else if (state.dialogue.open) advanceDialogue();
    else openNearestStation();
  });
  touchBoost.addEventListener("pointerdown", () => {
    state.input.boost = true;
  });
  touchBoost.addEventListener("pointerup", () => {
    state.input.boost = false;
  });
  touchBoost.addEventListener("pointercancel", () => {
    state.input.boost = false;
  });
  setupTouchStick();
}

function isGameKey(code) {
  return [
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "KeyW", "KeyA", "KeyS", "KeyD", "Space", "Enter", "Escape", "ShiftLeft", "ShiftRight", "KeyR"
  ].includes(code);
}

function setKey(code, value) {
  if (code === "ArrowUp" || code === "KeyW") state.input.forward = value;
  if (code === "ArrowDown" || code === "KeyS") state.input.backward = value;
  if (code === "ArrowLeft" || code === "KeyA") state.input.left = value;
  if (code === "ArrowRight" || code === "KeyD") state.input.right = value;
  if (code === "ShiftLeft" || code === "ShiftRight") state.input.boost = value;
}

function setupTouchStick() {
  touchStick.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    state.touch.pointerId = event.pointerId;
    touchStick.setPointerCapture(event.pointerId);
    const rect = touchStick.getBoundingClientRect();
    state.touch.originX = rect.left + rect.width / 2;
    state.touch.originY = rect.top + rect.height / 2;
    updateTouchVector(event.clientX, event.clientY);
  });

  touchStick.addEventListener("pointermove", (event) => {
    if (event.pointerId !== state.touch.pointerId) return;
    event.preventDefault();
    updateTouchVector(event.clientX, event.clientY);
  });

  function endTouch(event) {
    if (event.pointerId !== state.touch.pointerId) return;
    state.touch.pointerId = null;
    state.input.joystick.set(0, 0);
    touchKnob.style.transform = "translate(-50%, -50%)";
  }

  touchStick.addEventListener("pointerup", endTouch);
  touchStick.addEventListener("pointercancel", endTouch);
}

function updateTouchVector(clientX, clientY) {
  const dx = clientX - state.touch.originX;
  const dy = clientY - state.touch.originY;
  const max = 52;
  const length = Math.hypot(dx, dy) || 1;
  const scale = Math.min(1, max / length);
  const x = dx * scale;
  const y = dy * scale;
  state.input.joystick.set(x / max, y / max);
  touchKnob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

function startGame() {
  state.gameStarted = true;
  state.paused = false;
  titleScreen.hidden = true;
  pauseMenu.hidden = true;
  document.body.classList.remove("title-open", "pause-open");
  canvas.focus();
}

function togglePause(force) {
  if (!state.gameStarted) return;
  state.paused = typeof force === "boolean" ? force : !state.paused;
  pauseMenu.hidden = !state.paused;
  document.body.classList.toggle("pause-open", state.paused);
}

function toggleQuality() {
  state.qualityHigh = !state.qualityHigh;
  qualityButton.textContent = `Quality: ${state.qualityHigh ? "Full" : "Calm"}`;
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, state.qualityHigh ? 1.8 : 1.1));
  if (state.starField) state.starField.visible = state.qualityHigh;
}

function resetCar() {
  state.carPhysics.speed = 0;
  state.carPhysics.heading = START_HEADING;
  state.carPhysics.lastPosition.copy(START_POSITION);
  if (state.car) {
    state.car.position.copy(START_POSITION);
    state.car.rotation.y = START_HEADING;
  }
}

function loop() {
  const dt = Math.min(state.clock.getDelta(), 0.05);
  applyThemeFromStorage();

  if (state.gameStarted && !state.paused && !state.dialogue.open) {
    updateCar(dt);
  } else {
    state.carPhysics.speed *= Math.max(0, 1 - dt * 3.5);
  }

  updateStations(dt);
  updateCamera(dt);
  updateParticles(dt);
  updateDecorativeMotion(dt);
  updateHud(dt);
  state.renderer.render(state.scene, state.camera);
  requestAnimationFrame(loop);
}

function updateCar(dt) {
  const joystick = state.input.joystick;
  const forward = state.input.forward || joystick.y < -0.22;
  const backward = state.input.backward || joystick.y > 0.22;
  const left = state.input.left || joystick.x < -0.18;
  const right = state.input.right || joystick.x > 0.18;
  const boost = state.input.boost;
  const maxSpeed = boost ? 26 : 18;
  const acceleration = boost ? 34 : 24;
  const braking = 30;
  const friction = forward || backward ? 1.25 : 2.45;

  state.carPhysics.lastPosition.copy(state.car.position);

  if (forward) state.carPhysics.speed += acceleration * dt;
  if (backward) state.carPhysics.speed -= braking * dt;
  state.carPhysics.speed = THREE.MathUtils.clamp(state.carPhysics.speed, -9, maxSpeed);
  state.carPhysics.speed *= Math.max(0, 1 - friction * dt);

  const steerInput = (left ? 1 : 0) + (right ? -1 : 0) + THREE.MathUtils.clamp(-joystick.x, -1, 1);
  const speedRatio = THREE.MathUtils.clamp(Math.abs(state.carPhysics.speed) / 13, 0.18, 1);
  state.carPhysics.heading += steerInput * 2.65 * speedRatio * dt * Math.sign(state.carPhysics.speed || 1);

  const forwardVector = new THREE.Vector3(
    Math.sin(state.carPhysics.heading),
    0,
    Math.cos(state.carPhysics.heading)
  );
  state.car.position.addScaledVector(forwardVector, state.carPhysics.speed * dt);
  state.car.position.x = THREE.MathUtils.clamp(state.car.position.x, -WORLD_LIMIT, WORLD_LIMIT);
  state.car.position.z = THREE.MathUtils.clamp(state.car.position.z, -WORLD_LIMIT, WORLD_LIMIT);
  state.car.rotation.y = state.carPhysics.heading;

  if (collidesWithObstacle(state.car.position)) {
    state.car.position.copy(state.carPhysics.lastPosition);
    state.carPhysics.speed *= -0.24;
  }

  const wheelRotation = state.carPhysics.speed * dt * 2.7;
  state.wheels.forEach((wheel, index) => {
    wheel.rotation.x += wheelRotation;
    if (index < 2) wheel.rotation.y = -steerInput * 0.36;
  });

  if (Math.abs(state.carPhysics.speed) > 6 && !shouldReduceMotion()) {
    spawnExhaust(forwardVector);
  }
}

function collidesWithObstacle(position) {
  const carHalfX = 1.25;
  const carHalfZ = 1.75;
  return state.obstacles.some((box) => (
    Math.abs(position.x - box.x) < box.halfX + carHalfX &&
    Math.abs(position.z - box.z) < box.halfZ + carHalfZ
  ));
}

function spawnExhaust(forwardVector) {
  if (state.particles.length > 90) return;
  const back = state.car.position.clone().addScaledVector(forwardVector, -2.1);
  const geometry = new THREE.SphereGeometry(0.14 + Math.random() * 0.14, 8, 6);
  const material = new THREE.MeshBasicMaterial({
    color: state.palette.alt,
    transparent: true,
    opacity: 0.28
  });
  const particle = new THREE.Mesh(geometry, material);
  particle.position.set(back.x + (Math.random() - 0.5) * 0.6, 0.38, back.z + (Math.random() - 0.5) * 0.6);
  state.scene.add(particle);
  state.particles.push({
    mesh: particle,
    life: 0.7,
    velocity: new THREE.Vector3((Math.random() - 0.5) * 0.6, 0.45 + Math.random() * 0.35, (Math.random() - 0.5) * 0.6)
  });
}

function updateParticles(dt) {
  for (let i = state.particles.length - 1; i >= 0; i -= 1) {
    const particle = state.particles[i];
    particle.life -= dt;
    particle.mesh.position.addScaledVector(particle.velocity, dt);
    particle.mesh.material.opacity = Math.max(0, particle.life / 0.7) * 0.28;
    particle.mesh.scale.multiplyScalar(1 + dt * 0.9);
    if (particle.life <= 0) {
      state.scene.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      particle.mesh.material.dispose();
      state.particles.splice(i, 1);
    }
  }
}

function updateDecorativeMotion(dt) {
  const elapsed = state.clock.elapsedTime;
  if (state.starField && !shouldReduceMotion()) {
    state.starField.rotation.y += dt * 0.006;
  }
  state.decorative.forEach((item) => {
    if (item.type === "tower" && item.cap) {
      item.cap.rotation.y += dt * 0.8;
      item.cap.position.y += Math.sin(elapsed * 2 + item.phase) * 0.004;
    }
    if (item.type === "tree" && !shouldReduceMotion()) {
      item.mesh.rotation.z = Math.sin(elapsed * 0.8 + item.phase) * 0.018;
    }
    if (item.type === "ribbon" && !shouldReduceMotion()) {
      item.mesh.material.opacity = 0.16 + Math.sin(elapsed + item.phase) * 0.06;
    }
  });
}

function updateStations(dt) {
  const elapsed = state.clock.elapsedTime;
  let nearest = null;
  let nearestDistance = Infinity;

  state.stations.forEach((station) => {
    const distance = flatDistance(state.car.position, station.position);
    if (distance < nearestDistance) {
      nearest = station;
      nearestDistance = distance;
    }
    const active = distance <= station.radius;
    station.ring.material.opacity = active ? 0.64 : 0.24 + Math.sin(elapsed * 1.7 + station.phase) * 0.08;
    station.ring.scale.setScalar(active ? 1.12 + Math.sin(elapsed * 5) * 0.035 : 1);
    station.marker.rotation.y += dt * (active ? 2.8 : 1.25);
    station.marker.position.y += Math.sin(elapsed * 2.2 + station.phase) * 0.003;
    station.label.visible = distance < 36;
  });

  state.activeStation = nearest && nearestDistance <= nearest.radius ? nearest : null;
}

function updateCamera(dt) {
  const heading = state.carPhysics.heading;
  const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
  const speedOffset = THREE.MathUtils.clamp(Math.abs(state.carPhysics.speed) * 0.16, 0, 4);
  const targetPosition = state.car.position.clone()
    .addScaledVector(forward, -13 - speedOffset)
    .add(new THREE.Vector3(0, 7.2 + speedOffset * 0.12, 0));
  const lookTarget = state.car.position.clone().addScaledVector(forward, 6).add(new THREE.Vector3(0, 2.2, 0));
  const cameraLerp = shouldReduceMotion() ? 1 : 1 - Math.pow(0.001, dt);
  state.camera.position.lerp(targetPosition, cameraLerp * 0.65);
  state.camera.lookAt(lookTarget);
}

function updateHud(dt) {
  const speed = Math.round(Math.abs(state.carPhysics.speed) * 4.7);
  speedReadout.textContent = `${speed} km/h`;

  if (state.activeStation) {
    stationReadout.textContent = state.activeStation.name;
    stationType.textContent = state.activeStation.type;
    stationName.textContent = state.activeStation.name;
    stationHint.textContent = state.dialogue.open ? "Dialogue open" : "Press SPACE or Action to open.";
    stationPanel.hidden = state.dialogue.open || state.paused || !state.gameStarted;
  } else {
    stationReadout.textContent = "Find a station";
    stationPanel.hidden = true;
  }

  if (state.dialogue.open) {
    updateDialogueTyping(dt);
  }
}

function openNearestStation() {
  if (!state.activeStation) return;
  openDialogue(state.activeStation);
}

function openDialogue(station) {
  const dialogue = state.resumeData.dialogues[String(station.dialogueId)];
  if (!dialogue) return;
  state.dialogue.open = true;
  state.dialogue.station = station;
  state.dialogue.lines = dialogue.lines.slice();
  state.dialogue.index = 0;
  state.dialogue.typed = "";
  state.dialogue.target = state.dialogue.lines[0] || "";
  state.dialogue.cursorTime = 0;
  dialogueSpeaker.textContent = dialogue.speaker || station.name;
  dialogueLine.textContent = "";
  dialogueNext.textContent = state.dialogue.lines.length > 1 ? "Next" : "Close";
  dialoguePanel.hidden = false;
  document.body.classList.add("dialogue-open");
  stationPanel.hidden = true;
}

function updateDialogueTyping(dt) {
  const dialogue = state.dialogue;
  if (dialogue.typed.length >= dialogue.target.length) {
    dialogueLine.textContent = dialogue.target;
    return;
  }
  dialogue.cursorTime += dt;
  const chars = shouldReduceMotion() ? dialogue.target.length : Math.max(1, Math.ceil(dialogue.speed * dt));
  dialogue.typed = dialogue.target.slice(0, dialogue.typed.length + chars);
  dialogueLine.textContent = dialogue.typed;
}

function advanceDialogue() {
  const dialogue = state.dialogue;
  if (!dialogue.open) return;
  if (dialogue.typed.length < dialogue.target.length) {
    dialogue.typed = dialogue.target;
    dialogueLine.textContent = dialogue.target;
    return;
  }
  dialogue.index += 1;
  if (dialogue.index >= dialogue.lines.length) {
    closeDialogue();
    return;
  }
  dialogue.target = dialogue.lines[dialogue.index];
  dialogue.typed = "";
  dialogueLine.textContent = "";
  dialogueNext.textContent = dialogue.index === dialogue.lines.length - 1 ? "Close" : "Next";
}

function closeDialogue() {
  state.dialogue.open = false;
  state.dialogue.station = null;
  state.dialogue.lines = [];
  state.dialogue.index = 0;
  state.dialogue.typed = "";
  state.dialogue.target = "";
  dialoguePanel.hidden = true;
  document.body.classList.remove("dialogue-open");
}

function flatDistance(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz);
}

function shouldReduceMotion() {
  if (state.motion.stored === "off" || state.motion.stored === "calm") return true;
  if (state.motion.stored === "auto") return state.motion.reduced;
  return false;
}

function applyThemeFromStorage() {
  const theme = readLocal(STORAGE_THEME_KEY, "professional");
  const motion = readLocal(STORAGE_MOTION_KEY, "auto");
  state.motion.stored = motion;
  if (theme === state.lastTheme) return;
  state.lastTheme = theme;
  state.palette = themePalettes[theme] || themePalettes.professional;

  if (!state.scene) return;
  state.scene.background = new THREE.Color(state.palette.bg);
  state.scene.fog = new THREE.Fog(state.palette.fog, 42, 138);
  document.documentElement.style.setProperty("--bg", `#${state.palette.bg.toString(16).padStart(6, "0")}`);
  document.documentElement.style.setProperty("--accent", `#${state.palette.accent.toString(16).padStart(6, "0")}`);
  document.documentElement.style.setProperty("--accent-2", `#${state.palette.alt.toString(16).padStart(6, "0")}`);

  state.decorative.forEach((item) => {
    if (item.type === "ground") item.mesh.material.color.setHex(state.palette.ground);
    if (item.type === "road") item.mesh.material.color.setHex(state.palette.road);
  });
  state.accentMaterials.forEach((material, index) => {
    if (material.color) material.color.setHex(index % 2 ? state.palette.alt : state.palette.accent);
  });
  if (state.starField) state.starField.material.color.setHex(state.palette.alt);
  if (state.carBody) {
    state.carBody.material.emissive.setHex(state.palette.glow);
  }
}

function resize() {
  const width = window.innerWidth || 1;
  const height = window.innerHeight || 1;
  state.camera.aspect = width / height;
  state.camera.updateProjectionMatrix();
  state.renderer.setSize(width, height, false);
}

function setupDebugHooks() {
  window.__arcadeDebug = {
    get ready() {
      return Boolean(state.renderer && state.scene && state.car);
    },
    startGame,
    resetCar,
    openNearest: openNearestStation,
    closeDialogue,
    getCarPosition() {
      return {
        x: Number(state.car.position.x.toFixed(3)),
        y: Number(state.car.position.y.toFixed(3)),
        z: Number(state.car.position.z.toFixed(3)),
        speed: Number(state.carPhysics.speed.toFixed(3))
      };
    },
    getNearestStation() {
      const nearest = state.activeStation || nearestStation();
      if (!nearest) return null;
      return {
        id: nearest.id,
        name: nearest.name,
        dialogueId: nearest.dialogueId,
        distance: Number(flatDistance(state.car.position, nearest.position).toFixed(3))
      };
    },
    teleportToDialogue(dialogueId) {
      const station = state.stations.find((item) => item.dialogueId === dialogueId);
      if (!station) return false;
      state.carPhysics.speed = 0;
      state.car.position.set(station.position.x, 0.26, station.position.z - station.radius + 2.2);
      state.carPhysics.heading = 0;
      state.car.rotation.y = 0;
      state.activeStation = station;
      return true;
    },
    isDialogOpen() {
      return state.dialogue.open;
    },
    getDialogText() {
      return dialogueLine.textContent;
    },
    sampleCanvas() {
      const gl = state.renderer.getContext();
      const width = Math.max(1, Math.min(12, state.renderer.domElement.width));
      const height = Math.max(1, Math.min(12, state.renderer.domElement.height));
      const pixels = new Uint8Array(width * height * 4);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      return Array.from(pixels).reduce((sum, value) => sum + value, 0);
    },
    setInput(input) {
      Object.assign(state.input, input);
    }
  };
}

function nearestStation() {
  let nearest = null;
  let distance = Infinity;
  state.stations.forEach((station) => {
    const nextDistance = flatDistance(state.car.position, station.position);
    if (nextDistance < distance) {
      nearest = station;
      distance = nextDistance;
    }
  });
  return nearest;
}
