// ABOUTME: Draws a stand-in screen picture (1280x720 or 1024x640) for the Blender previews, so UV direction and text size can be judged.
// ABOUTME: Usage: node screenpic.mjs <out.png> <width> <height> <title>
import { createRequire } from "node:module";
import fs from "node:fs";
const puppeteer = createRequire("G:/Resume-Website/package.json")("puppeteer-core");
const [out, w, h, title] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setContent(`<canvas id=c width=${w} height=${h}></canvas>`);
  const url = await page.evaluate((w, h, title) => {
    const c = document.getElementById("c"), g = c.getContext("2d");
    g.fillStyle = "#0a0e18"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#1a2236"; g.fillRect(0, 0, w, 54);
    g.fillStyle = "#c9a8ff"; g.font = "bold 28px monospace"; g.fillText(title + "  (top left)", 24, 36);
    g.fillStyle = "#7ee0a0"; g.font = "26px monospace";
    const lines = ["kali@home-kali:~$ nmap -sV 192.168.1.20", "Starting Nmap 7.94 ( https://nmap.org )", "PORT    STATE SERVICE VERSION", "21/tcp  open  ftp     vsftpd 2.3.4", "22/tcp  open  ssh     OpenSSH 4.7p1", "80/tcp  open  http    Apache httpd 2.2.8", "kali@home-kali:~$ _"];
    lines.forEach((t, i) => g.fillText(t, 24, 110 + i * 40));
    g.strokeStyle = "#6d3dff"; g.lineWidth = 4; g.strokeRect(2, 2, w - 4, h - 4);
    g.fillStyle = "#e8e8f0"; g.fillRect(w - 80, h - 60, 56, 36);
    return c.toDataURL("image/png");
  }, +w, +h, title);
  fs.writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", out);
} finally { await browser.close(); }
