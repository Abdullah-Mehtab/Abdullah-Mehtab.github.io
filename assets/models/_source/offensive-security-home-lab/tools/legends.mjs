// ABOUTME: Draws the keyboard legend atlas (16 x 8 cells of 64 px, purple legends on black) for the Blender preview renders.
// ABOUTME: The demo page draws its own copy at run time. Usage: node legends.mjs <keys.json> <out.png>
import { createRequire } from "node:module";
import fs from "node:fs";
const puppeteer = createRequire("G:/Resume-Website/package.json")("puppeteer-core");

const [keysPath, outPath] = process.argv.slice(2);
const keys = JSON.parse(fs.readFileSync(keysPath, "utf8"));
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true, args: ["--no-sandbox"]
});
try {
  const page = await browser.newPage();
  await page.setContent("<canvas id=c width=1024 height=512></canvas>");
  const dataUrl = await page.evaluate((keys) => {
    const c = document.getElementById("c"), g = c.getContext("2d");
    g.fillStyle = "#000"; g.fillRect(0, 0, 1024, 512);
    const CELL = 64, TOPD = 12.4;
    keys.forEach((k, i) => {
      const cx = (i % 16) * CELL, cy = Math.floor(i / 16) * CELL;
      const aspect = Math.max(1, (k.w * 19.05 - 1.05 - 5.6) / TOPD);
      g.save();
      g.beginPath(); g.rect(cx + 2, cy + 2, CELL - 4, CELL - 4); g.clip();
      g.translate(cx + CELL / 2, cy + CELL / 2);
      g.scale(1 / aspect, 1);
      g.fillStyle = "#a070ff"; g.textAlign = "center"; g.textBaseline = "middle";
      const fit = (txt, size) => { g.font = "600 " + size + "px Arial"; let s = size; while (g.measureText(txt).width > CELL * 0.9 * aspect && s > 8) { s -= 2; g.font = "600 " + s + "px Arial"; } };
      if (k.shift) {
        fit(k.shift, 26); g.fillText(k.shift, 0, -13);
        fit(k.label, 26); g.fillText(k.label, 0, 14);
      } else if (k.label) {
        const big = k.label.length === 1 ? 38 : 24;
        fit(k.label, big); g.fillText(k.label, 0, 2);
      }
      g.restore();
    });
    return c.toDataURL("image/png");
  }, keys);
  fs.writeFileSync(outPath, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log("wrote", outPath, keys.length, "keys");
} finally { await browser.close(); }
