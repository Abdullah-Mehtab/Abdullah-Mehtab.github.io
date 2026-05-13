const fs = require("fs");
const path = require("path");

const width = 64;
const height = 64;
const size = width * height;
const layerNames = ["ground", "walls", "decoration_below", "decoration_above", "collision"];
const layers = Object.fromEntries(layerNames.map((name) => [name, new Array(size).fill(0)]));

function index(x, y) {
  return y * width + x;
}

function fill(layer, x, y, w, h, tile) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
      layers[layer][index(xx, yy)] = tile;
    }
  }
}

function rectWall(x, y, w, h, wallTile, floorTile = 2) {
  fill("decoration_below", x + 1, y + 1, w - 2, h - 2, floorTile);
  fill("walls", x, y, w, 1, wallTile);
  fill("walls", x, y + h - 1, w, 1, wallTile);
  fill("walls", x, y, 1, h, wallTile);
  fill("walls", x + w - 1, y, 1, h, wallTile);
  fill("collision", x, y, w, 1, 1);
  fill("collision", x, y + h - 1, w, 1, 1);
  fill("collision", x, y, 1, h, 1);
  fill("collision", x + w - 1, y, 1, h, 1);
}

function clearDoor(x, y, w = 2, h = 1) {
  fill("walls", x, y, w, h, 0);
  fill("collision", x, y, w, h, 0);
  fill("decoration_below", x, y, w, h, 2);
}

function pathLine(x1, y1, x2, y2) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  fill("ground", minX, minY, maxX - minX + 1, maxY - minY + 1, 2);
}

fill("ground", 0, 0, width, height, 1);
fill("ground", 0, 0, width, 1, 4);
fill("ground", 0, height - 1, width, 1, 4);
fill("ground", 0, 0, 1, height, 4);
fill("ground", width - 1, 0, 1, height, 4);
fill("collision", 0, 0, width, 1, 1);
fill("collision", 0, height - 1, width, 1, 1);
fill("collision", 0, 0, 1, height, 1);
fill("collision", width - 1, 0, 1, height, 1);

// Main paths following the plan's hub diagram.
pathLine(30, 8, 34, 58);
pathLine(10, 24, 54, 28);
pathLine(10, 39, 54, 43);
pathLine(23, 54, 41, 58);
pathLine(26, 60, 38, 62);

// Buildings/zones.
rectWall(24, 4, 17, 9, 7, 6);
clearDoor(31, 12, 2, 1);

rectWall(5, 20, 14, 11, 7, 6);
clearDoor(18, 25, 1, 2);

rectWall(45, 20, 14, 11, 8, 6);
clearDoor(45, 25, 1, 2);

rectWall(5, 36, 14, 11, 12, 6);
clearDoor(18, 41, 1, 2);

rectWall(45, 36, 14, 11, 13, 6);
clearDoor(45, 41, 1, 2);

rectWall(23, 50, 19, 9, 9, 6);
clearDoor(31, 50, 2, 1);

rectWall(24, 59, 17, 4, 10, 6);
clearDoor(31, 59, 2, 1);

// Decorative signals.
fill("decoration_above", 9, 21, 6, 1, 11);
fill("decoration_above", 49, 21, 6, 1, 14);
fill("decoration_above", 28, 5, 8, 1, 15);
fill("decoration_below", 28, 31, 8, 4, 2);

function prop(name, type, value) {
  return { name, type, value };
}

const entities = [
  ["Guide", 32, 32, 0, 0],
  ["Security NPC", 20, 25, 1, 0],
  ["Skills Terminal", 11, 25, 2, 1],
  ["Sentinel NPC", 20, 41, 3, 2],
  ["DevOps NPC", 43, 25, 4, 1],
  ["Work NPC", 43, 41, 5, 0],
  ["Librarian", 32, 14, 6, 2],
  ["Trophy NPC", 32, 49, 7, 1],
  ["Mailman", 32, 58, 8, 0]
].map(([name, x, y, dialogueId, spriteId], id) => ({
  id: id + 1,
  name,
  type: "point",
  x: x * 16,
  y: y * 16,
  width: 16,
  height: 16,
  properties: [
    prop("type", "string", name.includes("Terminal") ? "sign" : "npc"),
    prop("dialogue_id", "int", dialogueId),
    prop("sprite_id", "int", spriteId),
    prop("flags", "int", 13)
  ]
}));

const triggers = entities.map((entity, id) => ({
  id: id + 100,
  name: `${entity.name} trigger`,
  type: "dialogue",
  x: entity.x - 12,
  y: entity.y - 12,
  width: 40,
  height: 40,
  properties: [
    prop("dialogue_id", "int", entity.properties.find((p) => p.name === "dialogue_id").value),
    prop("zone_id", "int", id),
    prop("trigger_type", "int", 0)
  ]
}));

const map = {
  compressionlevel: -1,
  height,
  infinite: false,
  layers: [
    ...layerNames.map((name, id) => ({
      id: id + 1,
      name,
      type: "tilelayer",
      visible: true,
      opacity: name === "collision" ? 0 : 1,
      x: 0,
      y: 0,
      width,
      height,
      data: layers[name]
    })),
    {
      id: 10,
      name: "triggers",
      type: "objectgroup",
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      objects: triggers
    },
    {
      id: 11,
      name: "entities",
      type: "objectgroup",
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      objects: entities
    },
    {
      id: 12,
      name: "spawn",
      type: "objectgroup",
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      objects: [
        {
          id: 300,
          name: "player_spawn",
          type: "point",
          x: 32 * 16,
          y: 34 * 16,
          width: 0,
          height: 0,
          properties: []
        }
      ]
    }
  ],
  nextlayerid: 13,
  nextobjectid: 301,
  orientation: "orthogonal",
  renderorder: "right-down",
  tiledversion: "1.10.2",
  tileheight: 16,
  tilesets: [
    {
      firstgid: 1,
      source: "",
      columns: 16,
      image: "../tilesets/placeholder-tiles.png",
      imageheight: 256,
      imagewidth: 256,
      margin: 0,
      name: "placeholder-tiles",
      spacing: 0,
      tilecount: 256,
      tileheight: 16,
      tilewidth: 16
    }
  ],
  tilewidth: 16,
  type: "map",
  version: "1.10",
  width
};

const out = path.resolve(__dirname, "../assets/maps/hub.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(map, null, 2));
console.log(`generated ${out}`);
