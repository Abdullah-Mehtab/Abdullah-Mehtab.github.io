import { createDialogueController } from "./dialogue.js";

const TILE_SIZE = 16;
const RENDER_SCALE = 3;
const PIXEL_SIZE = TILE_SIZE * RENDER_SCALE;
const FP_SHIFT = 16;
const FP_ONE = 1 << FP_SHIFT;
const MAP_MEMORY_WIDTH = 256;
const MAX_ENTITIES = 256;
const MAX_TRIGGERS = 256;
const ENTITY_SIZE = 64;
const TRIGGER_SIZE = 64;
const PLAYER_OFFSET = 0x0040;
const ENTITY_OFFSET = 0x0080;

const INPUT_UP = 1 << 0;
const INPUT_DOWN = 1 << 1;
const INPUT_LEFT = 1 << 2;
const INPUT_RIGHT = 1 << 3;
const INPUT_INTERACT = 1 << 4;
const INPUT_PAUSE = 1 << 5;

let Module = null;
let ctx = null;
let canvas = null;
let inputPtr = 0;
let statePtr = 0;
let mapPtr = 0;
let triggerPtr = 0;
let gameFlagsPtr = 0;
let entityPtr = 0;
let lastTime = 0;
let cameraX = 0;
let cameraY = 0;
let cameraShake = 0;
let gameStarted = false;
let paused = false;
let currentInteraction = -1;
let interactQueued = false;
let lastInteractId = -1;
let promptChimeReady = true;

const keysDown = {};
const particles = [];
const tileLayers = {};
const entities = [];
const mapInfo = { width: 64, height: 64, tilewidth: 16, tileheight: 16 };
const touchState = {
  isMobile: false,
  joystickId: null,
  joystickVector: { x: 0, y: 0 },
  interactTouchId: null
};

let tilesetImage = null;
let playerSheet = null;
let npcSheet = null;
let resumeData = null;
let dialogue = null;
let audio = null;
let footstepClock = 0;
let sparkleClock = 0;
let ambientClock = 0;

async function boot() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d", { alpha: false });
  canvas.tabIndex = 0;

  const engineFactory = window.createEngine || globalThis.createEngine;
  if (!engineFactory) throw new Error("Emscripten engine factory createEngine() was not found.");
  Module = await engineFactory();
  window.Module = Module;

  Module._init_engine();
  inputPtr = Module._get_input_ptr();
  statePtr = Module._get_state_ptr();
  mapPtr = Module._get_map_ptr();
  triggerPtr = Module._get_trigger_ptr();
  gameFlagsPtr = Module._get_game_flags_ptr();
  entityPtr = statePtr + (ENTITY_OFFSET - PLAYER_OFFSET);

  audio = createAudioManager();
  resumeData = await fetchJson("resume_data.json");
  await Promise.all([
    loadImage("assets/characters/player.png").then((img) => { playerSheet = img; }),
    loadImage("assets/characters/npcs.png").then((img) => { npcSheet = img; })
  ]);
  await loadMap("assets/maps/hub.json");

  dialogue = createDialogueController({
    overlay: document.getElementById("dialogue-overlay"),
    getDialogue: (id) => resumeData.dialogues[id],
    setActiveFlag: setDialogueActive,
    audio
  });

  setupPauseMenu();
  setupInput();
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  document.getElementById("loading-screen").classList.add("hidden");
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(createPlaceholderImage(url));
    img.src = url;
  });
}

function createPlaceholderImage(label) {
  const offscreen = document.createElement("canvas");
  offscreen.width = 64;
  offscreen.height = 64;
  const g = offscreen.getContext("2d");
  g.imageSmoothingEnabled = false;
  g.fillStyle = "#1a1a2e";
  g.fillRect(0, 0, offscreen.width, offscreen.height);
  g.fillStyle = "#7cffb2";
  g.fillRect(8, 8, 48, 48);
  g.fillStyle = "#07111c";
  g.fillText(label.slice(0, 3), 12, 34);
  return offscreen;
}

function getProperty(object, name, fallback) {
  const item = (object.properties || []).find((property) => property.name === name);
  return item ? item.value : fallback;
}

function fixed(value) {
  return Math.round(value * FP_ONE);
}

async function loadMap(url) {
  const map = await fetchJson(url);
  mapInfo.width = map.width;
  mapInfo.height = map.height;
  mapInfo.tilewidth = map.tilewidth;
  mapInfo.tileheight = map.tileheight;

  const tileset = map.tilesets && map.tilesets[0];
  if (tileset && tileset.image) {
    tilesetImage = await loadImage(new URL(tileset.image, new URL(url, window.location.href)).href);
  } else {
    tilesetImage = createPlaceholderImage("tiles");
  }

  ["ground", "walls", "decoration_below", "decoration_above"].forEach((name) => {
    const layer = map.layers.find((item) => item.name === name && item.type === "tilelayer");
    tileLayers[name] = layer ? layer.data : new Array(map.width * map.height).fill(0);
  });

  writeCollisionLayer(map);
  writeTriggerLayer(map);
  writeEntityLayer(map);
  placePlayerAtSpawn(map);
}

function writeCollisionLayer(map) {
  const memory = Module.HEAPU8;
  for (let i = 0; i < MAP_MEMORY_WIDTH * MAP_MEMORY_WIDTH; i += 1) {
    memory[mapPtr + i] = 0;
  }

  const collision = map.layers.find((layer) => layer.name === "collision" && layer.type === "tilelayer");
  if (!collision) return;

  for (let y = 0; y < collision.height; y += 1) {
    for (let x = 0; x < collision.width; x += 1) {
      const gid = collision.data[y * collision.width + x];
      if (gid) memory[mapPtr + y * MAP_MEMORY_WIDTH + x] = 1;
    }
  }
}

function writeTriggerLayer(map) {
  const triggers = new Int32Array(Module.HEAP32.buffer, triggerPtr, MAX_TRIGGERS * (TRIGGER_SIZE / 4));
  triggers.fill(0);
  const layer = map.layers.find((item) => item.name === "triggers" && item.type === "objectgroup");
  if (!layer) return;

  layer.objects.slice(0, MAX_TRIGGERS).forEach((object, index) => {
    const base = index * (TRIGGER_SIZE / 4);
    triggers[base + 0] = fixed(object.x / TILE_SIZE);
    triggers[base + 1] = fixed(object.y / TILE_SIZE);
    triggers[base + 2] = fixed((object.width || TILE_SIZE) / TILE_SIZE);
    triggers[base + 3] = fixed((object.height || TILE_SIZE) / TILE_SIZE);
    triggers[base + 4] = Number(getProperty(object, "dialogue_id", -1));
    triggers[base + 5] = Number(getProperty(object, "zone_id", 0));
    triggers[base + 6] = Number(getProperty(object, "trigger_type", 0));
  });
}

function writeEntityLayer(map) {
  entities.length = 0;
  const entityMemory = new Int32Array(Module.HEAP32.buffer, entityPtr, MAX_ENTITIES * (ENTITY_SIZE / 4));
  entityMemory.fill(0);
  const layer = map.layers.find((item) => item.name === "entities" && item.type === "objectgroup");
  if (!layer) return;

  layer.objects.slice(0, MAX_ENTITIES).forEach((object, index) => {
    const base = index * (ENTITY_SIZE / 4);
    const typeName = String(getProperty(object, "type", "npc"));
    const flags = Number(getProperty(object, "flags", typeName === "npc" ? 13 : 5));
    const dialogueId = Number(getProperty(object, "dialogue_id", -1));
    const spriteId = Number(getProperty(object, "sprite_id", 0));
    const width = object.width || TILE_SIZE;
    const height = object.height || TILE_SIZE;
    const type = typeName === "npc" ? 1 : typeName === "sign" ? 2 : 3;

    entityMemory[base + 0] = Number(object.id || index + 1);
    entityMemory[base + 1] = fixed(object.x / TILE_SIZE);
    entityMemory[base + 2] = fixed(object.y / TILE_SIZE);
    entityMemory[base + 3] = fixed(width / TILE_SIZE);
    entityMemory[base + 4] = fixed(height / TILE_SIZE);
    entityMemory[base + 5] = type;
    entityMemory[base + 6] = flags;
    entityMemory[base + 7] = dialogueId;
    entityMemory[base + 8] = spriteId;

    entities.push({
      index,
      name: object.name || `Entity ${index + 1}`,
      type: typeName,
      dialogueId,
      spriteId
    });
  });
}

function placePlayerAtSpawn(map) {
  const spawnLayer = map.layers.find((layer) => layer.name === "spawn" && layer.type === "objectgroup");
  const spawn = spawnLayer && spawnLayer.objects.find((object) => object.name === "player_spawn");
  if (!spawn) return;
  const player = new Int32Array(Module.HEAP32.buffer, statePtr, 16);
  player[0] = fixed(spawn.x / TILE_SIZE);
  player[1] = fixed(spawn.y / TILE_SIZE);
}

function setupInput() {
  touchState.isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  updateRotateNotice();

  window.addEventListener("keydown", (event) => {
    if (isGameKey(event.code)) event.preventDefault();
    if (event.repeat && event.code !== "Space") return;
    keysDown[event.code] = true;
    audio.unlock();

    if (event.code === "Space") {
      if (!gameStarted) {
        startGame();
      } else if (dialogue && dialogue.isActive()) {
        dialogue.advance();
      } else {
        interactQueued = true;
      }
    }

    if (event.code === "Escape" && gameStarted && (!dialogue || !dialogue.isActive())) {
      togglePause();
    }

    if (event.code === "KeyM") {
      audio.toggleMute();
      updatePauseMenu();
    }
  });

  window.addEventListener("keyup", (event) => {
    keysDown[event.code] = false;
  });

  canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
  canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
  canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
  canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });
  document.getElementById("title-screen").addEventListener("click", () => {
    audio.unlock();
    if (!gameStarted) startGame();
  });
  window.addEventListener("orientationchange", updateRotateNotice);
  window.addEventListener("resize", updateRotateNotice);
}

function isGameKey(code) {
  return [
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "KeyW", "KeyA", "KeyS", "KeyD", "Space", "Escape"
  ].includes(code);
}

function startGame() {
  gameStarted = true;
  document.getElementById("title-screen").classList.add("hidden");
  audio.unlock();
  canvas.focus();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
}

function updateRotateNotice() {
  const notice = document.getElementById("rotate-notice");
  const shouldShow = touchState.isMobile && window.innerHeight > window.innerWidth;
  notice.classList.toggle("hidden", !shouldShow);
}

function handleTouchStart(event) {
  event.preventDefault();
  audio.unlock();
  const rect = canvas.getBoundingClientRect();
  for (const touch of event.changedTouches) {
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const joystick = getJoystick();
    const dist = Math.hypot(x - joystick.x, y - joystick.y);
    if (touchState.joystickId === null && dist <= joystick.radius + 28) {
      touchState.joystickId = touch.identifier;
      updateJoystickVector(x, y);
    } else if (touchState.interactTouchId === null && x > canvas.width * 0.5) {
      touchState.interactTouchId = touch.identifier;
      if (!gameStarted) startGame();
      else if (dialogue && dialogue.isActive()) dialogue.advance();
      else interactQueued = true;
    }
  }
}

function handleTouchMove(event) {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  for (const touch of event.changedTouches) {
    if (touch.identifier === touchState.joystickId) {
      updateJoystickVector(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  }
}

function handleTouchEnd(event) {
  event.preventDefault();
  for (const touch of event.changedTouches) {
    if (touch.identifier === touchState.joystickId) {
      touchState.joystickId = null;
      touchState.joystickVector = { x: 0, y: 0 };
    }
    if (touch.identifier === touchState.interactTouchId) {
      touchState.interactTouchId = null;
    }
  }
}

function getJoystick() {
  return { x: 108, y: Math.max(112, canvas.height - 112), radius: 80 };
}

function updateJoystickVector(x, y) {
  const joystick = getJoystick();
  const dx = x - joystick.x;
  const dy = y - joystick.y;
  const len = Math.hypot(dx, dy);
  const max = joystick.radius;
  const scale = len > max ? max / len : 1;
  touchState.joystickVector = {
    x: (dx * scale) / max,
    y: (dy * scale) / max
  };
}

function writeInput(dt) {
  let mask = 0;
  if (!gameStarted) {
    Module.HEAP32[inputPtr >> 2] = 0;
    Module.HEAPF32[(inputPtr + 4) >> 2] = dt;
    return;
  }

  if (keysDown.KeyW || keysDown.ArrowUp || touchState.joystickVector.y < -0.32) mask |= INPUT_UP;
  if (keysDown.KeyS || keysDown.ArrowDown || touchState.joystickVector.y > 0.32) mask |= INPUT_DOWN;
  if (keysDown.KeyA || keysDown.ArrowLeft || touchState.joystickVector.x < -0.32) mask |= INPUT_LEFT;
  if (keysDown.KeyD || keysDown.ArrowRight || touchState.joystickVector.x > 0.32) mask |= INPUT_RIGHT;
  if (interactQueued) mask |= INPUT_INTERACT;
  if (paused) mask |= INPUT_PAUSE;

  Module.HEAP32[inputPtr >> 2] = mask;
  Module.HEAPF32[(inputPtr + 4) >> 2] = dt;
}

function readPlayerState() {
  const view = new Int32Array(Module.HEAP32.buffer, statePtr, 16);
  return {
    x: view[0] / FP_ONE,
    y: view[1] / FP_ONE,
    w: view[2] / FP_ONE,
    h: view[3] / FP_ONE,
    dir: view[4],
    frame: view[6],
    moving: view[6] !== 0 || keysDown.KeyW || keysDown.KeyA || keysDown.KeyS || keysDown.KeyD ||
      keysDown.ArrowUp || keysDown.ArrowDown || keysDown.ArrowLeft || keysDown.ArrowRight ||
      Math.abs(touchState.joystickVector.x) > 0.2 || Math.abs(touchState.joystickVector.y) > 0.2
  };
}

function getEntityState(entity) {
  const view = new Int32Array(Module.HEAP32.buffer, entityPtr + entity.index * ENTITY_SIZE, ENTITY_SIZE / 4);
  return {
    x: view[1] / FP_ONE,
    y: view[2] / FP_ONE,
    w: view[3] / FP_ONE,
    h: view[4] / FP_ONE,
    type: view[5],
    flags: view[6],
    dialogueId: view[7],
    spriteId: view[8],
    frame: view[9]
  };
}

function setDialogueActive(value) {
  const flags = new Int32Array(Module.HEAP32.buffer, gameFlagsPtr, 64);
  flags[1] = value ? 1 : 0;
}

function setPaused(value) {
  paused = value;
  const flags = new Int32Array(Module.HEAP32.buffer, gameFlagsPtr, 64);
  flags[2] = value ? 1 : 0;
}

function setupPauseMenu() {
  updatePauseMenu();
  const pauseMenu = document.getElementById("pause-menu");
  pauseMenu.addEventListener("click", (event) => {
    const action = event.target.closest("[data-pause-action]");
    if (!action) return;
    if (action.dataset.pauseAction === "resume") togglePause(false);
    if (action.dataset.pauseAction === "music") {
      audio.toggleMute();
      updatePauseMenu();
    }
  });
}

function updatePauseMenu() {
  const pauseMenu = document.getElementById("pause-menu");
  pauseMenu.innerHTML = `
    <div class="pause-panel">
      <h2>Paused</h2>
      <div class="pause-actions">
        <button type="button" data-pause-action="resume">Resume</button>
        <button type="button" data-pause-action="music">Toggle Music (${audio && audio.isMuted() ? "off" : "on"})</button>
        <a href="../Abdullah-Mehtab-Resume-v5.pdf" download>Download PDF CV</a>
        <a href="../index.html">Visit Main Portfolio</a>
      </div>
      <div class="controls-reference">
        <p>WASD / Arrow keys: move</p>
        <p>SPACE: interact / advance dialogue</p>
        <p>ESC: pause</p>
        <p>M: mute / unmute</p>
      </div>
    </div>
  `;
}

function togglePause(force) {
  const next = typeof force === "boolean" ? force : !paused;
  setPaused(next);
  document.getElementById("pause-menu").classList.toggle("hidden", !next);
}

function updateCamera(player) {
  const targetX = player.x * PIXEL_SIZE - canvas.width / 2;
  const targetY = player.y * PIXEL_SIZE - canvas.height / 2;
  cameraX += (targetX - cameraX) * 0.13;
  cameraY += (targetY - cameraY) * 0.13;

  const maxX = Math.max(0, mapInfo.width * PIXEL_SIZE - canvas.width);
  const maxY = Math.max(0, mapInfo.height * PIXEL_SIZE - canvas.height);
  cameraX = Math.max(0, Math.min(maxX, cameraX));
  cameraY = Math.max(0, Math.min(maxY, cameraY));
}

function tileAt(layer, x, y) {
  const data = tileLayers[layer];
  if (!data || x < 0 || y < 0 || x >= mapInfo.width || y >= mapInfo.height) return 0;
  return data[y * mapInfo.width + x] || 0;
}

function drawTile(gid, tx, ty) {
  if (!gid) return;
  const local = gid - 1;
  const columns = 16;
  const sx = (local % columns) * TILE_SIZE;
  const sy = Math.floor(local / columns) * TILE_SIZE;
  const dx = Math.round(tx * PIXEL_SIZE);
  const dy = Math.round(ty * PIXEL_SIZE);
  ctx.drawImage(tilesetImage, sx, sy, TILE_SIZE, TILE_SIZE, dx, dy, PIXEL_SIZE, PIXEL_SIZE);
}

function renderLayer(layer) {
  const startX = Math.max(0, Math.floor(cameraX / PIXEL_SIZE) - 1);
  const startY = Math.max(0, Math.floor(cameraY / PIXEL_SIZE) - 1);
  const endX = Math.min(mapInfo.width - 1, Math.ceil((cameraX + canvas.width) / PIXEL_SIZE) + 1);
  const endY = Math.min(mapInfo.height - 1, Math.ceil((cameraY + canvas.height) / PIXEL_SIZE) + 1);

  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      drawTile(tileAt(layer, x, y), x, y);
    }
  }
}

function renderEntities() {
  entities.forEach((entity) => {
    const state = getEntityState(entity);
    if (!(state.flags & 1)) return;
    const frame = Math.max(0, Math.min(1, state.frame));
    const row = Math.max(0, Math.min(2, state.spriteId % 3));
    const dx = Math.round(state.x * PIXEL_SIZE);
    const dy = Math.round(state.y * PIXEL_SIZE - PIXEL_SIZE * 0.25);
    ctx.drawImage(npcSheet, frame * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, dx, dy, PIXEL_SIZE, PIXEL_SIZE);
  });
}

function renderPlayer(player) {
  const srcX = Math.max(0, Math.min(3, player.frame)) * TILE_SIZE;
  const srcY = Math.max(0, Math.min(3, player.dir)) * TILE_SIZE;
  const dx = Math.round(player.x * PIXEL_SIZE - PIXEL_SIZE * 0.1);
  const dy = Math.round(player.y * PIXEL_SIZE - PIXEL_SIZE * 0.25);
  ctx.drawImage(playerSheet, srcX, srcY, TILE_SIZE, TILE_SIZE, dx, dy, PIXEL_SIZE, PIXEL_SIZE);
}

function renderInteractionPrompt(now) {
  if (currentInteraction < 0 || !gameStarted || paused || (dialogue && dialogue.isActive())) return;
  const entity = entities.find((item) => item.dialogueId === currentInteraction);
  if (!entity) return;
  const state = getEntityState(entity);
  const x = Math.round(state.x * PIXEL_SIZE + PIXEL_SIZE * 0.5);
  const y = Math.round(state.y * PIXEL_SIZE - 18 + Math.sin(now / 160) * 4);
  ctx.save();
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(5, 8, 13, 0.84)";
  ctx.fillRect(x - 34, y - 16, 68, 18);
  ctx.strokeStyle = "#7cffb2";
  ctx.strokeRect(x - 34, y - 16, 68, 18);
  ctx.fillStyle = "#7cffb2";
  ctx.fillText("SPACE", x, y - 3);
  ctx.restore();
}

function updateParticles(dt, player) {
  if (gameStarted && !paused && (!dialogue || !dialogue.isActive()) && player.moving) {
    footstepClock += dt;
    if (footstepClock > 0.12) {
      footstepClock = 0;
      for (let i = 0; i < 3; i += 1) {
        addParticle(player.x + 0.4, player.y + 0.85, (Math.random() - 0.5) * 0.8, Math.random() * 0.25, 0.32, "rgba(180,150,105,0.8)", 2 + Math.random() * 2);
      }
      audio.playSfx("footstep");
    }
  }

  if (currentInteraction >= 0 && gameStarted) {
    sparkleClock += dt;
    if (sparkleClock > 0.18) {
      sparkleClock = 0;
      const entity = entities.find((item) => item.dialogueId === currentInteraction);
      if (entity) {
        const state = getEntityState(entity);
        addParticle(state.x + 0.5, state.y + 0.2, (Math.random() - 0.5) * 0.25, -0.45 - Math.random() * 0.25, 1, "rgba(124,255,178,0.9)", 2);
      }
    }
  }

  ambientClock += dt;
  if (ambientClock > 0.08) {
    ambientClock = 0;
    const zoneColor = getAmbientColor(player);
    addParticle(player.x + (Math.random() - 0.5) * 16, player.y + (Math.random() - 0.5) * 10, 0, -0.08 - Math.random() * 0.12, 1.6, zoneColor, 1.2);
  }

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function getAmbientColor(player) {
  if (player.x < 24 && player.y < 34) return "rgba(124,255,178,0.45)";
  if (player.x > 40 && player.y < 34) return "rgba(216,181,109,0.45)";
  if (player.y < 18) return "rgba(210,220,235,0.45)";
  return "rgba(120,183,255,0.35)";
}

function addParticle(x, y, vx, vy, life, color, size) {
  if (particles.length >= 200) particles.shift();
  particles.push({ x, y, vx, vy, life, maxLife: life, color, size });
}

function renderParticles() {
  particles.forEach((p) => {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(Math.round(p.x * PIXEL_SIZE), Math.round(p.y * PIXEL_SIZE), p.size * RENDER_SCALE, p.size * RENDER_SCALE);
    ctx.restore();
  });
}

function renderMobileControls() {
  if (!touchState.isMobile) return;
  const joystick = getJoystick();
  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = "#7cffb2";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(joystick.x, joystick.y, joystick.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(124,255,178,0.14)";
  ctx.fill();
  ctx.fillStyle = "rgba(124,255,178,0.42)";
  ctx.beginPath();
  ctx.arc(
    joystick.x + touchState.joystickVector.x * joystick.radius,
    joystick.y + touchState.joystickVector.y * joystick.radius,
    30,
    0,
    Math.PI * 2
  );
  ctx.fill();

  const ax = canvas.width - 92;
  const ay = canvas.height - 108;
  ctx.strokeStyle = "#f5c86a";
  ctx.fillStyle = "rgba(245,200,106,0.16)";
  ctx.beginPath();
  ctx.arc(ax, ay, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f5c86a";
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.fillText("A", ax, ay + 10);
  ctx.restore();
}

function render(player, now) {
  ctx.fillStyle = getThemeColor("--bg", "#08111f");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const shakeX = cameraShake > 0 ? (Math.random() - 0.5) * 4 : 0;
  const shakeY = cameraShake > 0 ? (Math.random() - 0.5) * 4 : 0;

  ctx.save();
  ctx.translate(Math.round(-cameraX + shakeX), Math.round(-cameraY + shakeY));
  renderLayer("ground");
  renderLayer("decoration_below");
  renderEntities();
  renderPlayer(player);
  renderParticles();
  renderLayer("walls");
  renderLayer("decoration_above");
  renderInteractionPrompt(now);
  ctx.restore();

  renderMobileControls();
}

function getThemeColor(property, fallback) {
  const savedTheme = localStorage.getItem("abdullah-portfolio-theme") || "professional";
  const palette = {
    forest: "#07140e",
    space: "#050713",
    terminal: "#020704",
    light: "#f2f0ea",
    professional: "#08111f"
  };
  return palette[savedTheme] || getComputedStyle(document.documentElement).getPropertyValue(property).trim() || fallback;
}

function handleInteraction(player) {
  currentInteraction = Module._check_interaction();
  if (currentInteraction !== lastInteractId) {
    promptChimeReady = true;
    lastInteractId = currentInteraction;
  }
  if (currentInteraction >= 0 && promptChimeReady && gameStarted) {
    audio.playSfx("available");
    promptChimeReady = false;
  }

  if (interactQueued) {
    if (currentInteraction >= 0 && dialogue && !dialogue.isActive()) {
      const opened = dialogue.open(currentInteraction);
      if (opened) {
        cameraShake = 0.2;
        audio.playSfx("dialogue");
      }
    }
    interactQueued = false;
  }
}

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  if (cameraShake > 0) cameraShake = Math.max(0, cameraShake - dt);

  writeInput(dt);
  Module._update();

  const player = readPlayerState();
  updateCamera(player);
  handleInteraction(player);
  updateParticles(dt, player);
  render(player, now);

  requestAnimationFrame(loop);
}

function createAudioManager() {
  let context = null;
  let muted = false;
  let musicTimer = 0;
  let musicStep = 0;
  const notes = [196, 247, 294, 392, 330, 294, 247, 196];

  function ensureContext() {
    if (context || typeof AudioContext === "undefined" && typeof webkitAudioContext === "undefined") return context;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    context = new AudioCtor();
    return context;
  }

  function scheduleMusic() {
    if (!context || muted) return;
    clearInterval(musicTimer);
    musicTimer = window.setInterval(() => {
      if (muted || !context) return;
      playTone(notes[musicStep % notes.length], 0.18, 0.035, "triangle");
      musicStep += 1;
    }, 280);
  }

  function unlock() {
    const ctxAudio = ensureContext();
    if (!ctxAudio) return;
    if (ctxAudio.state === "suspended") ctxAudio.resume();
    scheduleMusic();
  }

  function playTone(freq, duration, volume, type = "square") {
    if (!context || muted) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + duration);
  }

  function playSfx(name) {
    if (!context || muted) return;
    const map = {
      footstep: [120, 0.035, 0.018, "sine"],
      dialogue: [520, 0.08, 0.04, "square"],
      advance: [740, 0.045, 0.03, "square"],
      available: [880, 0.05, 0.025, "triangle"]
    };
    const tone = map[name];
    if (tone) playTone(...tone);
  }

  function toggleMute() {
    muted = !muted;
    if (muted) clearInterval(musicTimer);
    else {
      unlock();
      scheduleMusic();
    }
    return muted;
  }

  function isMuted() {
    return muted;
  }

  return { unlock, playSfx, toggleMute, isMuted };
}

boot().catch((error) => {
  console.error("Engine boot failed:", error);
  document.getElementById("loading-screen").innerHTML =
    '<p style="color:#ff6d8d">Engine failed to load. Check console.</p>';
});
