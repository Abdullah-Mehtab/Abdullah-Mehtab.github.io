// ABOUTME: Everything act one paints in 2D: the Kali terminal, the VMware window with the three targets, the laptop's screensavers
// ABOUTME: and lock screen, and the keyboard's legend atlas. Each is a plain function of time, so a frame can be drawn for any moment.
import { clamp01, ease, seeded } from "../kit.js";

const mod = (v, m) => ((v % m) + m) % m;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
// Position of something bouncing between 0 and L at constant speed, as a plain function of time.
const bounce = (u, L) => { const m = mod(u, 2 * L); return m < L ? m : 2 * L - m; };
const canvas = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };

const MONO = "IBM Plex Mono, Consolas, monospace";
const SANS = "Segoe UI, sans-serif";

// The visitor's own clock. A frozen frame (?still, the frames the checks and reviews are taken from) shows one fixed moment in one
// locale instead, so two shots of it are the same picture whenever and wherever they are taken.
const pad2 = (n) => String(n).padStart(2, "0");
const FROZEN = /[?&]still(?:=|&|$)/.test(window.location.search);
const FIXED_MOMENT = new Date(2024, 7, 1, 21, 30);
export const shownTime = () => (FROZEN ? FIXED_MOMENT : new Date());
const shownLocale = FROZEN ? "en-US" : undefined;
export const clockText = () => { const d = shownTime(); return pad2(d.getHours()) + ":" + pad2(d.getMinutes()); };
const dateShort = () => shownTime().toLocaleDateString(shownLocale);
export const dateLong = () => shownTime().toLocaleDateString(shownLocale, { weekday: "long", month: "long", day: "numeric" });

// ---------- the keyboard's keys: code, legend, shifted legend, position and width in key units ----------
// The order is the order of the legend atlas cells, and matches the UV cells built into the keyboard model.
export const KEY_DEFS = [
  ["Escape","Esc","",0,0,1], ["F1","F1","",2,0,1], ["F2","F2","",3,0,1],
  ["F3","F3","",4,0,1], ["F4","F4","",5,0,1], ["F5","F5","",6.5,0,1],
  ["F6","F6","",7.5,0,1], ["F7","F7","",8.5,0,1], ["F8","F8","",9.5,0,1],
  ["F9","F9","",11,0,1], ["F10","F10","",12,0,1], ["F11","F11","",13,0,1],
  ["F12","F12","",14,0,1], ["PrintScreen","PrtSc","",15.25,0,1], ["ScrollLock","ScrLk","",16.25,0,1],
  ["Pause","Pause","",17.25,0,1], ["Backquote","`","~",0,1.5,1], ["Digit1","1","!",1,1.5,1],
  ["Digit2","2","@",2,1.5,1], ["Digit3","3","#",3,1.5,1], ["Digit4","4","$",4,1.5,1],
  ["Digit5","5","%",5,1.5,1], ["Digit6","6","^",6,1.5,1], ["Digit7","7","&",7,1.5,1],
  ["Digit8","8","*",8,1.5,1], ["Digit9","9","(",9,1.5,1], ["Digit0","0",")",10,1.5,1],
  ["Minus","-","_",11,1.5,1], ["Equal","=","+",12,1.5,1], ["Backspace","Backspace","",13,1.5,2],
  ["Insert","Ins","",15.25,1.5,1], ["Home","Home","",16.25,1.5,1], ["PageUp","PgUp","",17.25,1.5,1],
  ["Tab","Tab","",0,2.5,1.5], ["KeyQ","Q","",1.5,2.5,1], ["KeyW","W","",2.5,2.5,1],
  ["KeyE","E","",3.5,2.5,1], ["KeyR","R","",4.5,2.5,1], ["KeyT","T","",5.5,2.5,1],
  ["KeyY","Y","",6.5,2.5,1], ["KeyU","U","",7.5,2.5,1], ["KeyI","I","",8.5,2.5,1],
  ["KeyO","O","",9.5,2.5,1], ["KeyP","P","",10.5,2.5,1], ["BracketLeft","[","{",11.5,2.5,1],
  ["BracketRight","]","}",12.5,2.5,1], ["Backslash","\\","|",13.5,2.5,1.5], ["Delete","Del","",15.25,2.5,1],
  ["End","End","",16.25,2.5,1], ["PageDown","PgDn","",17.25,2.5,1], ["CapsLock","Caps","",0,3.5,1.75],
  ["KeyA","A","",1.75,3.5,1], ["KeyS","S","",2.75,3.5,1], ["KeyD","D","",3.75,3.5,1],
  ["KeyF","F","",4.75,3.5,1], ["KeyG","G","",5.75,3.5,1], ["KeyH","H","",6.75,3.5,1],
  ["KeyJ","J","",7.75,3.5,1], ["KeyK","K","",8.75,3.5,1], ["KeyL","L","",9.75,3.5,1],
  ["Semicolon",";",":",10.75,3.5,1], ["Quote","'","\"",11.75,3.5,1], ["Enter","Enter","",12.75,3.5,2.25],
  ["ShiftLeft","Shift","",0,4.5,2.25], ["KeyZ","Z","",2.25,4.5,1], ["KeyX","X","",3.25,4.5,1],
  ["KeyC","C","",4.25,4.5,1], ["KeyV","V","",5.25,4.5,1], ["KeyB","B","",6.25,4.5,1],
  ["KeyN","N","",7.25,4.5,1], ["KeyM","M","",8.25,4.5,1], ["Comma",",","<",9.25,4.5,1],
  ["Period",".",">",10.25,4.5,1], ["Slash","/","?",11.25,4.5,1], ["ShiftRight","Shift","",12.25,4.5,2.75],
  ["ArrowUp","▲","",16.25,4.5,1], ["ControlLeft","Ctrl","",0,5.5,1.25], ["MetaLeft","Win","",1.25,5.5,1.25],
  ["AltLeft","Alt","",2.5,5.5,1.25], ["Space","","",3.75,5.5,6.25], ["AltRight","Alt","",10,5.5,1.25],
  ["MetaRight","Win","",11.25,5.5,1.25], ["ContextMenu","Menu","",12.5,5.5,1.25], ["ControlRight","Ctrl","",13.75,5.5,1.25],
  ["ArrowLeft","◀","",15.25,5.5,1], ["ArrowDown","▼","",16.25,5.5,1], ["ArrowRight","▶","",17.25,5.5,1]
].map(([code, label, shift, x, y, w]) => ({ code, label, shift, x: x + w / 2, y: y + 0.5, w }));
export const keyByCode = new Map(KEY_DEFS.map((k, i) => [k.code, i]));
export const keyByLabel = new Map();
KEY_DEFS.forEach((k, i) => { if (k.label && !keyByLabel.has(k.label.toLowerCase())) keyByLabel.set(k.label.toLowerCase(), i); });
keyByLabel.set(" ", keyByCode.get("Space")); keyByLabel.set("\n", keyByCode.get("Enter"));

// The legends: one 64 px cell per key, 16 across, in the given colour on black. Drawn here, not stored in the model.
export function legendCanvas(ink) {
  const c = canvas(1024, 512), g = c.getContext("2d");
  g.fillStyle = "#000"; g.fillRect(0, 0, 1024, 512);
  const CELL = 64, TOPD = 12.4;
  KEY_DEFS.forEach((k, i) => {
    const cx = (i % 16) * CELL, cy = Math.floor(i / 16) * CELL;
    const aspect = Math.max(1, (k.w * 19.05 - 1.05 - 5.6) / TOPD); // the key's top is stretched onto its cell, so the legend is squeezed to match
    g.save();
    g.beginPath(); g.rect(cx + 2, cy + 2, CELL - 4, CELL - 4); g.clip();
    g.translate(cx + CELL / 2, cy + CELL / 2); g.scale(1 / aspect, 1);
    g.fillStyle = ink; g.textAlign = "center"; g.textBaseline = "middle";
    const fit = (txt, size) => { g.font = "600 " + size + "px Arial"; let s = size; while (g.measureText(txt).width > CELL * 0.9 * aspect && s > 8) { s -= 2; g.font = "600 " + s + "px Arial"; } };
    if (k.shift) { fit(k.shift, 26); g.fillText(k.shift, 0, -13); fit(k.label, 26); g.fillText(k.label, 0, 14); }
    else if (k.label) { fit(k.label, k.label.length === 1 ? 38 : 24); g.fillText(k.label, 0, 2); }
    g.restore();
  });
  return c;
}

// ---------- the Kali terminal: a script that types, runs and loops ----------
// The keyboard presses the key for each character this script types, so what the hands do and what the screen shows agree.
// The address is in a range reserved for documentation, as every painted screen on these pages uses.
const CPS = 11;
const KALI_STEPS = [
  { prompt: "kali@kali:~$ ", typed: "nmap -sV 192.0.2.22" },
  { out: "Starting Nmap scan" },
  { out: "PORT     STATE  SERVICE  VERSION" },
  { out: "21/tcp   open   ftp      vsftpd 2.3.4" },
  { out: "22/tcp   open   ssh      OpenSSH 4.7p1" },
  { out: "23/tcp   open   telnet   Linux telnetd" },
  { out: "445/tcp  open   smb      Samba smbd 3.X" },
  { out: "Nmap done: 1 IP address (1 host up)" },
  { prompt: "kali@kali:~$ ", typed: "msfconsole" },
  { prompt: "msf6 > ", out: "" }
];
export const KALI_TIMELINE = (() => {
  let at = 0; const steps = [];
  for (const s of KALI_STEPS) {
    if (s.typed !== undefined) { const dur = s.typed.length / CPS; steps.push({ ...s, start: at, dur }); at += dur + 0.5; }
    else { steps.push({ ...s, start: at, dur: 0 }); at += s.prompt ? 0.2 : 0.28; }
  }
  return { steps, length: at + 5, scanStart: steps[1].start, scanEnd: steps[7].start + 0.5, finishedAt: steps[steps.length - 1].start + 1.2 };
})();
// What the Kali window shows at time t, which key the script has down (a character, or "\n" for Enter) and how far, and whether a scan is running.
export function kaliAt(t) {
  const tt = t % KALI_TIMELINE.length;
  const lines = []; let keyChar = null, press = 0, typing = false;
  for (const s of KALI_TIMELINE.steps) {
    if (tt < s.start) break;
    if (s.typed !== undefined) {
      const raw = (tt - s.start) * CPS, n = Math.min(s.typed.length, Math.floor(raw));
      lines.push({ prompt: s.prompt, text: s.typed.slice(0, n), kind: "cmd" });
      if (raw < s.typed.length) {
        typing = true;
        const f = raw - Math.floor(raw);
        if (n > 0 && f < 0.6) { keyChar = s.typed[n - 1]; press = Math.sin(Math.PI * f / 0.6); }
      } else {
        const after = (tt - s.start) - s.dur;
        if (after < 0.2) { keyChar = "\n"; press = Math.sin(Math.PI * after / 0.2); }
      }
    } else lines.push({ prompt: s.prompt, text: s.out, kind: s.prompt ? "cmd" : "out" });
  }
  return { lines, keyChar, press, typing, busy: tt >= KALI_TIMELINE.scanStart && tt <= KALI_TIMELINE.scanEnd };
}

// ---------- the two monitors: Home Kali on one, the three vulnerable machines on the other ----------
export const SW = 1280, SH = 720;
const TASKBAR = 40;
const UBUNTU_LOG = ["Started Network Manager", "Started OpenSSH server", "Started ProFTPD", "Started MySQL Server", "Started Samba SMB", "Started D-Bus Daemon", "Started Cron Scheduler", "Started Print service", "Reached Multi-User", "Reached Graphical"];
const TARGET = { bar: "#2b3b55", ink: "#dbe8fa" };
export const kaliCanvas = canvas(SW, SH);
export const targetsCanvas = canvas(SW, SH);
const kg = kaliCanvas.getContext("2d"), sg = targetsCanvas.getContext("2d");

// Home Kali, full screen: a large terminal that types and runs the script.
export function drawKali(t, kali) {
  const g = kg;
  const bg = g.createLinearGradient(0, 0, SW, SH); bg.addColorStop(0, "#0a0f1e"); bg.addColorStop(1, "#1a1238"); g.fillStyle = bg; g.fillRect(0, 0, SW, SH);
  g.fillStyle = "#0b1020"; g.fillRect(0, 0, SW, 38);
  g.fillStyle = "#d3def5"; g.font = `600 19px ${SANS}`; g.textBaseline = "middle"; g.textAlign = "left"; g.fillText("Home Kali", 18, 20);
  g.fillStyle = "#7f93b8"; g.font = `500 16px ${SANS}`; g.fillText("Applications   Places", 140, 20);
  g.textAlign = "right"; g.fillStyle = "#d3def5"; g.font = `500 18px ${SANS}`; g.fillText(clockText(), SW - 18, 20); g.textAlign = "left";
  const x = 64, y = 66, w = SW - 128, h = SH - 66 - 86;
  g.fillStyle = "#060912"; g.fillRect(x, y, w, h);
  g.fillStyle = "#1b2440"; g.fillRect(x, y, w, 38);
  g.fillStyle = "#e3ecfb"; g.font = `600 19px ${SANS}`; g.fillText("kali@kali: ~", x + 16, y + 20);
  [0, 1, 2].forEach((i) => { g.fillStyle = ["#43d17c", "#e9c46a", "#7b92b6"][i]; g.beginPath(); g.arc(x + w - 24 - i * 22, y + 19, 6, 0, 7); g.fill(); });
  g.strokeStyle = "#4aa8ff"; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, h - 2);
  g.save(); g.beginPath(); g.rect(x + 2, y + 40, w - 4, h - 42); g.clip();
  g.font = `500 30px ${MONO}`; g.textBaseline = "alphabetic";
  let lastX = x + 24, lastY = y + 40 + 40;
  kali.lines.forEach((ln, i) => {
    const ly = y + 40 + 40 + i * 40; let lx = x + 24;
    if (ln.prompt) { g.fillStyle = "#7fd0ff"; g.fillText(ln.prompt, lx, ly); lx += g.measureText(ln.prompt).width; }
    g.fillStyle = ln.kind === "cmd" ? "#f1f6ff" : "#a9bdd8"; g.fillText(ln.text, lx, ly); lx += g.measureText(ln.text).width;
    lastX = lx; lastY = ly;
  });
  if (kali.typing || Math.floor(t * 2.2) % 2 === 0) { g.fillStyle = "#f1f6ff"; g.fillRect(lastX + 3, lastY - 26, 15, 32); }
  g.restore();
  g.fillStyle = "#0b1020"; g.fillRect(0, SH - 62, SW, 62);
  [0, 1, 2, 3, 4].forEach((i) => { g.fillStyle = i === 0 ? "#4aa8ff" : "#26324d"; g.beginPath(); g.roundRect(SW / 2 - 140 + i * 56, SH - 50, 40, 38, 9); g.fill(); });
}

function vmWin(x, y, w, h, title, look, body) {
  sg.fillStyle = "#0a0f1a"; sg.fillRect(x, y, w, h);
  sg.fillStyle = look.bar; sg.fillRect(x, y, w, 30);
  sg.fillStyle = look.ink; sg.font = `600 17px ${SANS}`; sg.textBaseline = "middle"; sg.textAlign = "left"; sg.fillText(title, x + 12, y + 16);
  sg.save(); sg.beginPath(); sg.rect(x + 2, y + 31, w - 4, h - 33); sg.clip(); body(x + 2, y + 31, w - 4, h - 33); sg.restore();
  sg.strokeStyle = look.bar; sg.lineWidth = 2; sg.strokeRect(x + 1, y + 1, w - 2, h - 2);
}
// busy is 0 to 1: how hard the host is working. The machines in the scan show it in their graphs.
export function drawTargets(t, busy) {
  const bg = sg.createLinearGradient(0, 0, SW, SH); bg.addColorStop(0, "#0b1322"); bg.addColorStop(1, "#122036"); sg.fillStyle = bg; sg.fillRect(0, 0, SW, SH);
  sg.fillStyle = "#0f1829"; sg.fillRect(0, 0, SW, 44);
  sg.fillStyle = "#e1ecfb"; sg.font = `600 21px ${SANS}`; sg.textBaseline = "middle"; sg.textAlign = "left"; sg.fillText("VMware Workstation Pro", 18, 23);
  sg.fillStyle = "#5f7699"; sg.font = `500 16px ${SANS}`; sg.fillText("File   Edit   View   VM   Tabs", 330, 23);
  const LIB = 232;
  sg.fillStyle = "#09101d"; sg.fillRect(0, 44, LIB, SH - 44 - TASKBAR);
  sg.fillStyle = "#7b92b6"; sg.font = `600 14px ${SANS}`; sg.fillText("LIBRARY", 18, 72);
  ["Home Kali", "Metasploitable 2", "Metasploitable 3 (Windows)", "Metasploitable 3 (Ubuntu)"].forEach((name, i) => {
    const y = 108 + i * 82, work = i < 2 ? busy : 0; // Kali and its target
    sg.fillStyle = "#43d17c"; sg.beginPath(); sg.arc(26, y, 5, 0, 7); sg.fill(); // green: running
    sg.fillStyle = "#dbe8fa"; sg.font = `500 15px ${SANS}`; sg.fillText(name, 44, y + 1);
    sg.strokeStyle = "#4aa8ff"; sg.lineWidth = 1.6; sg.globalAlpha = 0.8; sg.beginPath();
    for (let k = 0; k < 36; k++) { const v = 0.5 * (1 + work * 0.3) + (0.35 + work * 0.15) * Math.sin(k * 0.45 + t * (1.2 + i * 0.35 + work * 2.2) + i) * Math.sin(k * 0.13 + t * 0.7); const px = 44 + k * 4.6, py = y + 36 - clamp(v, 0, 1) * 22; k ? sg.lineTo(px, py) : sg.moveTo(px, py); }
    sg.stroke(); sg.globalAlpha = 1;
  });
  // three equal tiles, one per vulnerable machine
  const ox = LIB + 16, oy = 60, gap = 14, ww = (SW - ox - 16 - gap * 2) / 3, wh = SH - TASKBAR - oy - 14;
  vmWin(ox, oy, ww, wh, "Metasploitable 2", TARGET, (x, y) => {
    sg.fillStyle = "#000"; sg.fillRect(x, y, ww, wh);
    sg.font = `500 18px ${MONO}`; sg.textBaseline = "alphabetic"; sg.fillStyle = "#b8c4d8";
    sg.fillText("Metasploitable 2", x + 14, y + 30);
    sg.fillText("Warning: Never expose", x + 14, y + 86); sg.fillText("this VM to an untrusted", x + 14, y + 112); sg.fillText("network!", x + 14, y + 138);
    sg.fillText("metasploitable login: ", x + 14, y + 196);
    if (Math.floor(t * 2.2) % 2 === 0) sg.fillRect(x + 14 + sg.measureText("metasploitable login: ").width + 2, y + 180, 10, 20);
  });
  vmWin(ox + ww + gap, oy, ww, wh, "Metasploitable 3 (Windows)", TARGET, (x, y) => {
    const gr = sg.createLinearGradient(x, y, x, y + wh); gr.addColorStop(0, "#14438a"); gr.addColorStop(1, "#071d45"); sg.fillStyle = gr; sg.fillRect(x, y, ww, wh);
    const cx = x + ww / 2, cy = y + wh / 2 - 20; sg.strokeStyle = "#cfe3ff"; sg.lineWidth = 5; sg.lineCap = "round";
    for (let k = 0; k < 8; k++) { sg.globalAlpha = 0.12 + 0.88 * (((k - t * 6) % 8 + 8) % 8) / 8; const a = (k / 8) * 6.283; sg.beginPath(); sg.moveTo(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20); sg.lineTo(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34); sg.stroke(); }
    sg.globalAlpha = 1; sg.fillStyle = "#dcebff"; sg.font = `500 19px ${SANS}`; sg.textAlign = "center"; sg.fillText("Starting Windows", cx, cy + 82); sg.textAlign = "left";
  });
  vmWin(ox + (ww + gap) * 2, oy, ww, wh, "Metasploitable 3 (Ubuntu)", TARGET, (x, y) => {
    sg.fillStyle = "#090e15"; sg.fillRect(x, y, ww, wh); sg.font = `500 17px ${MONO}`; sg.textBaseline = "alphabetic";
    // fills from the top, then scrolls once the window is full
    const rows = 18, newest = Math.floor(t * 1.6), first = Math.max(0, newest - rows + 1);
    for (let r = 0; r < Math.min(rows, newest + 1); r++) { const n = first + r; sg.fillStyle = "#5fd48a"; sg.fillText("[ OK ]", x + 10, y + 28 + r * 31); sg.fillStyle = "#d3dcea"; sg.fillText(UBUNTU_LOG[n % UBUNTU_LOG.length], x + 78, y + 28 + r * 31); }
  });
  // the host's own taskbar, with the visitor's real time
  sg.fillStyle = "#070b13"; sg.fillRect(0, SH - TASKBAR, SW, TASKBAR);
  sg.strokeStyle = "#8aa3c7"; sg.lineWidth = 2; sg.beginPath(); sg.arc(26, SH - TASKBAR / 2, 8, 0, 7); sg.stroke();
  [0, 1, 2, 3].forEach((i) => { sg.fillStyle = i === 0 ? "#4aa8ff" : "#2b3b55"; sg.beginPath(); sg.roundRect(70 + i * 44, SH - TASKBAR / 2 - 11, 22, 22, 5); sg.fill(); });
  sg.fillStyle = "#c9d6ea"; sg.textAlign = "right"; sg.textBaseline = "middle";
  sg.font = `500 14px ${SANS}`; sg.fillText(clockText(), SW - 18, SH - TASKBAR / 2 - 7);
  sg.font = `400 11px ${SANS}`; sg.fillStyle = "#8aa3c7"; sg.fillText(dateShort(), SW - 18, SH - TASKBAR / 2 + 9); sg.textAlign = "left";
}

// ---------- the laptop's screensavers: Windows 10 ships Mystify, Bubbles, Ribbons, 3D Text, Blank and Photos ----------
// Photos is left out: it needs pictures. The palette is blue, indigo, purple, violet, teal and soft pink: neighbouring hues, never a red to
// violet stripe order.
export const LW = 1024, LH = 640;
const PAL = [215, 245, 268, 292, 188, 322];
const hsl = (h, s, l, a = 1) => `hsla(${mod(h, 360)}, ${s}%, ${l}%, ${a})`;
const lerpHue = (a, b, k) => a + (b - a) * k; // the palette hues are within 134 degrees of each other, so the straight path is the short one
export const laptopCanvas = canvas(LW, LH);
const lg = laptopCanvas.getContext("2d");
const saverCanvas = canvas(LW, LH), sv = saverCanvas.getContext("2d");
const lockCanvas = canvas(LW, LH), lc = lockCanvas.getContext("2d");
export const SAVER_RUN = 12, SAVER_PAUSE = 1.2;
const FADE = 0.6;

const rndM = seeded(41);
const MYSTIFY = [0, 1].map(() => Array.from({ length: 4 }, () => ({ x0: rndM() * LW, y0: rndM() * LH, vx: (rndM() < 0.5 ? -1 : 1) * (90 + rndM() * 110), vy: (rndM() < 0.5 ? -1 : 1) * (70 + rndM() * 90) })));
function drawMystify(g, ts) {
  g.fillStyle = "#04050b"; g.fillRect(0, 0, LW, LH);
  g.lineWidth = 1.8; g.lineJoin = "round";
  const HISTORY = 28;
  for (let h = HISTORY - 1; h >= 0; h--) {
    const tt = ts - h * 0.06, a = Math.pow(1 - h / HISTORY, 1.6) * 0.9;
    MYSTIFY.forEach((poly, k) => {
      g.strokeStyle = hsl((k ? 232 : 208) + 52 * (0.5 + 0.5 * Math.sin(0.4 * tt + k * 2.1)), 85, 58, a * 0.85);
      g.beginPath();
      poly.forEach((v, i) => { const x = bounce(v.x0 + v.vx * tt, LW), y = bounce(v.y0 + v.vy * tt, LH); i ? g.lineTo(x, y) : g.moveTo(x, y); });
      g.closePath(); g.stroke();
    });
  }
}
const rndB = seeded(77);
const BUBBLES = Array.from({ length: 14 }, (_, i) => ({ r: 26 + rndB() * 48, x0: rndB(), y0: rndB(), vx: (rndB() < 0.5 ? -1 : 1) * (40 + rndB() * 60), vy: (rndB() < 0.5 ? -1 : 1) * (35 + rndB() * 55), h0: i }));
function drawBubbles(g, ts) {
  const bg = g.createLinearGradient(0, 0, LW, LH); bg.addColorStop(0, "#070a1a"); bg.addColorStop(1, "#160f2e"); g.fillStyle = bg; g.fillRect(0, 0, LW, LH);
  for (const b of BUBBLES) {
    const Lx = LW - 2 * b.r, Ly = LH - 2 * b.r, ux = b.x0 * Lx + b.vx * ts, uy = b.y0 * Ly + b.vy * ts;
    const cx = b.r + bounce(ux, Lx), cy = b.r + bounce(uy, Ly);
    // each bump on an edge steps the bubble to the next colour, blended over 0.7 seconds
    const hits = Math.floor(ux / Lx) + Math.floor(uy / Ly), since = Math.min(mod(ux, Lx) / Math.abs(b.vx), mod(uy, Ly) / Math.abs(b.vy));
    const idx = mod(b.h0 + hits, PAL.length), hue = lerpHue(PAL[mod(idx - 1, PAL.length)], PAL[idx], ease(clamp01(since / 0.7)));
    const gr = g.createRadialGradient(cx - b.r * 0.3, cy - b.r * 0.3, b.r * 0.05, cx, cy, b.r);
    gr.addColorStop(0, hsl(hue, 80, 80, 0.2)); gr.addColorStop(0.7, hsl(hue, 80, 62, 0.08)); gr.addColorStop(1, hsl(hue, 85, 66, 0.5));
    g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, b.r, 0, 7); g.fill();
    g.strokeStyle = hsl(hue, 90, 78, 0.5); g.lineWidth = 1.5; g.stroke();
    g.fillStyle = "rgba(255,255,255,0.5)"; g.beginPath(); g.ellipse(cx - b.r * 0.38, cy - b.r * 0.42, b.r * 0.2, b.r * 0.11, -0.7, 0, 7); g.fill();
  }
}
const rndR = seeded(5);
const RIBBONS = Array.from({ length: 5 }, (_, i) => ({ f: [0.35 + rndR() * 0.5, 0.6 + rndR() * 0.7, 0.3 + rndR() * 0.4, 0.5 + rndR() * 0.6], p: [0, 1, 2, 3].map(() => rndR() * 6.28), hue: PAL[(i + 1) % PAL.length] }));
const ribbonHead = (r, ts) => ({ x: LW / 2 + LW * 0.4 * Math.sin(r.f[0] * ts + r.p[0]) + LW * 0.1 * Math.sin(r.f[1] * ts * 1.7 + r.p[1]), y: LH / 2 + LH * 0.34 * Math.sin(r.f[2] * ts + r.p[2]) + LH * 0.1 * Math.sin(r.f[3] * ts * 2.1 + r.p[3]) });
// Each ribbon is a band that follows a moving head: wide, tapering to nothing at both ends, narrowing to a thin edge where it twists, fading along its length.
function drawRibbons(g, ts) {
  g.fillStyle = "#04050c"; g.fillRect(0, 0, LW, LH);
  const N = 120;
  for (const r of RIBBONS) {
    const pts = Array.from({ length: N }, (_, k) => ribbonHead(r, ts - k * 0.04));
    const edge = pts.map((p, k) => {
      const a = pts[Math.max(0, k - 1)], b = pts[Math.min(N - 1, k + 1)], len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const taper = Math.pow(Math.sin(Math.PI * (k + 0.5) / N), 0.7), twist = 0.2 + 0.8 * Math.abs(Math.cos(k * 0.06 + ts * 1.1 + r.p[0])), w = 46 * taper * twist;
      return { x: p.x, y: p.y, nx: -(b.y - a.y) / len * w, ny: (b.x - a.x) / len * w };
    });
    for (let k = 0; k < N - 1; k++) {
      const fade = Math.pow(1 - k / N, 1.3), a = edge[k], b = edge[k + 1];
      for (const [scale, alpha, light] of [[1, 0.2, 55], [0.5, 0.34, 68]]) {
        g.fillStyle = hsl(r.hue, 85, light, alpha * fade);
        g.beginPath(); g.moveTo(a.x + a.nx * scale, a.y + a.ny * scale); g.lineTo(b.x + b.nx * scale, b.y + b.ny * scale); g.lineTo(b.x - b.nx * scale, b.y - b.ny * scale); g.lineTo(a.x - a.nx * scale, a.y - a.ny * scale); g.closePath(); g.fill();
      }
      g.strokeStyle = hsl(r.hue, 90, 78, 0.45 * fade); g.lineWidth = 1.4; g.lineCap = "round";
      g.beginPath(); g.moveTo(a.x + a.nx, a.y + a.ny); g.lineTo(b.x + b.nx, b.y + b.ny); g.moveTo(a.x - a.nx, a.y - a.ny); g.lineTo(b.x - b.nx, b.y - b.ny); g.stroke();
    }
  }
}
function drawText3D(g, ts) {
  const bg = g.createLinearGradient(0, 0, LW, LH); bg.addColorStop(0, "#06081a"); bg.addColorStop(1, "#120d28"); g.fillStyle = bg; g.fillRect(0, 0, LW, LH);
  const angle = ts * 0.9, c = Math.cos(angle), s = Math.sin(angle), DEPTH = 16;
  g.font = `700 250px ${SANS}`; g.textAlign = "center"; g.textBaseline = "middle";
  for (let k = DEPTH; k >= 0; k--) {
    g.setTransform(c, 0, s * 0.04, 1, LW / 2 + s * k * 1.7, LH / 2 + Math.sin(ts * 0.7) * 14);
    g.fillStyle = k === 0 ? hsl(258, 85, 66) : hsl(250, 55, 14 + 26 * (1 - k / DEPTH));
    g.fillText(clockText(), 0, 0);
  }
  g.setTransform(1, 0, 0, 1, 0, 0);
}
export const SAVERS = [["mystify", drawMystify], ["bubbles", drawBubbles], ["ribbons", drawRibbons], ["text", drawText3D]];
// One saver for one moment: it fades in, runs, fades out into the black Blank screen, and rests there before the next.
function drawSaver(g, slot, ts) {
  const [, draw] = SAVERS[mod(slot, SAVERS.length)];
  if (ts >= SAVER_RUN) { g.fillStyle = "#000"; g.fillRect(0, 0, LW, LH); return; }
  draw(g, ts);
  const fade = Math.min(clamp01(ts / FADE), clamp01((SAVER_RUN - ts) / FADE));
  if (fade < 1) { g.fillStyle = `rgba(0,0,0,${1 - fade})`; g.fillRect(0, 0, LW, LH); }
}
let lockMinute = "";
function drawLock() {
  const m = clockText(); if (m === lockMinute) return; lockMinute = m;
  const gr = lc.createLinearGradient(0, 0, LW, LH); gr.addColorStop(0, "#07142f"); gr.addColorStop(1, "#1c5fb4"); lc.fillStyle = gr; lc.fillRect(0, 0, LW, LH);
  lc.fillStyle = "rgba(255,255,255,0.07)"; lc.beginPath(); lc.moveTo(560, 0); lc.lineTo(LW, 0); lc.lineTo(LW, LH); lc.lineTo(330, LH); lc.closePath(); lc.fill();
  lc.fillStyle = "#fff"; lc.textAlign = "left"; lc.textBaseline = "alphabetic";
  lc.font = "300 170px Segoe UI Light, Segoe UI, sans-serif"; lc.fillText(m, 56, 560);
  lc.font = "400 38px Segoe UI, sans-serif"; lc.fillText(dateLong(), 62, 505 - 130);
}
// The laptop's screen: a saver at this moment, with the lock screen laid over it by lockMix.
export function drawLaptop(slot, ts, lockMix) {
  drawSaver(sv, slot, ts); drawLock();
  lg.globalAlpha = 1; lg.drawImage(saverCanvas, 0, 0);
  if (lockMix > 0.01) { lg.globalAlpha = lockMix; lg.drawImage(lockCanvas, 0, 0); lg.globalAlpha = 1; }
}

export { mod, clamp, lerp };
