const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(file, width, height, pixels) {
  ensureDir(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  fs.writeFileSync(file, Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]));
}

function rgba(hex, alpha = 255) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
    alpha
  ];
}

function makeCanvas(width, height, transparent = false) {
  const pixels = Buffer.alloc(width * height * 4);
  if (!transparent) {
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 255;
    }
  }
  return {
    width,
    height,
    pixels,
    rect(x, y, w, h, color) {
      const [r, g, b, a] = color;
      for (let yy = y; yy < y + h; yy += 1) {
        for (let xx = x; xx < x + w; xx += 1) {
          if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
          const i = (yy * width + xx) * 4;
          pixels[i] = r;
          pixels[i + 1] = g;
          pixels[i + 2] = b;
          pixels[i + 3] = a;
        }
      }
    },
    outline(x, y, w, h, color) {
      this.rect(x, y, w, 1, color);
      this.rect(x, y + h - 1, w, 1, color);
      this.rect(x, y, 1, h, color);
      this.rect(x + w - 1, y, 1, h, color);
    }
  };
}

function generateTileset() {
  const tile = 16;
  const canvas = makeCanvas(256, 256, true);
  const colors = [
    "#234d2f", "#66727d", "#745431", "#19364f",
    "#2b6840", "#875c78", "#34435e", "#6a453d",
    "#9f7f3e", "#2a5b6a", "#3f8c58", "#5d6b75",
    "#21354f", "#936c3d", "#702f3f", "#c7d6e7"
  ];
  colors.forEach((color, index) => {
    const x = (index % 16) * tile;
    const y = Math.floor(index / 16) * tile;
    canvas.rect(x, y, tile, tile, rgba(color));
    canvas.outline(x, y, tile, tile, rgba("#0b1118", 140));
    if (index === 0 || index === 4 || index === 10) {
      canvas.rect(x + 3, y + 4, 2, 2, rgba("#7cffb2", 180));
      canvas.rect(x + 10, y + 9, 2, 2, rgba("#d8b56d", 180));
    }
    if (index === 1 || index === 6 || index === 11) {
      canvas.rect(x + 2, y + 2, 12, 2, rgba("#d7e8ff", 75));
      canvas.rect(x + 4, y + 9, 8, 1, rgba("#d7e8ff", 75));
    }
  });
  writePng(path.join(root, "assets/tilesets/placeholder-tiles.png"), 256, 256, canvas.pixels);
}

function drawHumanoid(canvas, ox, oy, shirt, frameOffset = 0) {
  canvas.rect(ox + 6, oy + 2, 4, 3, rgba("#f2c08a"));
  canvas.rect(ox + 5, oy + 5, 6, 6, rgba(shirt));
  canvas.rect(ox + 4 + frameOffset, oy + 6, 2, 5, rgba("#f2c08a"));
  canvas.rect(ox + 10 - frameOffset, oy + 6, 2, 5, rgba("#f2c08a"));
  canvas.rect(ox + 5, oy + 11, 2, 4, rgba("#1d2c44"));
  canvas.rect(ox + 9, oy + 11, 2, 4, rgba("#1d2c44"));
  canvas.rect(ox + 6, oy + 3, 1, 1, rgba("#07111c"));
  canvas.rect(ox + 9, oy + 3, 1, 1, rgba("#07111c"));
}

function generateCharacters() {
  const player = makeCanvas(64, 64, true);
  const shirts = ["#78b7ff", "#75e0b5", "#d8b56d", "#f47b96"];
  for (let row = 0; row < 4; row += 1) {
    for (let frame = 0; frame < 4; frame += 1) {
      drawHumanoid(player, frame * 16, row * 16, shirts[row], frame % 2);
    }
  }
  writePng(path.join(root, "assets/characters/player.png"), 64, 64, player.pixels);

  const npc = makeCanvas(32, 48, true);
  ["#7cffb2", "#f5c86a", "#9aa7ff"].forEach((color, row) => {
    drawHumanoid(npc, 0, row * 16, color, 0);
    drawHumanoid(npc, 16, row * 16, color, 1);
  });
  writePng(path.join(root, "assets/characters/npcs.png"), 32, 48, npc.pixels);
}

generateTileset();
generateCharacters();
console.log("placeholder assets generated");
