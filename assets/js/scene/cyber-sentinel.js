// ABOUTME: Wires the Cyber Sentinel chapter's four sets onto the shared film engine.
// ABOUTME: This is the whole of a chapter page's 3D layer: a canvas, four imports, and a list.
//
// Adding another chapter means copying this file, changing four imports, and adding a canvas to
// that page. It must never mean editing the engine. If it does, the station contract is wrong,
// which docs/SCROLL_FILM_PLAN.md lists as a reason to stop and say so.
import { mountFilm } from "./engine.js";
import { buildBoard } from "./cyber-sentinel/01-board.js";
import { buildLan } from "./cyber-sentinel/02-lan.js";
import { buildPipeline } from "./cyber-sentinel/03-pipeline.js";
import { buildOutputs } from "./cyber-sentinel/04-outputs.js";

const canvas = document.getElementById("chapter-scene");
if (canvas) {
  // A per-page audio track attaches here once the sets are settled. Owner decision,
  // 2026-09-11: sets first, then a track chosen for each page. Nothing is loaded until then.
  const film = mountFilm({
    canvas,
    buildStations: (palette) => [
      buildBoard(palette),
      buildLan(palette),
      buildPipeline(palette),
      buildOutputs(palette)
    ]
  });

  // A measurement seam, off unless asked for by hand. Opening the page with ?scene-debug
  // publishes the scene graph so the audit tooling can project nameplates into screen space
  // and check none of them leaves the frame or lands on another. No reader's page runs this
  // branch, and nothing on the page reads the handle.
  if (film && location.search.includes("scene-debug")) window.chapterFilm = film;
}
