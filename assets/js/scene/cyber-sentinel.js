// ABOUTME: Wires the Cyber Sentinel chapter's four sets onto the shared film engine.
// ABOUTME: This is the whole of a chapter page's 3D layer: a canvas, four imports, and a list.
//
// Adding another chapter means copying this file, changing four imports, and adding a canvas to
// that page. It must never mean editing the engine. If it does, the station contract is wrong,
// and the contract is what gets fixed, not the engine.

const canvas = document.getElementById("chapter-scene");

// The capability check happens before the import, not after it.
//
// engine.js and kit.js import three.js at the top of their modules, so the whole 183KB used to be
// fetched, parsed and compiled before mountFilm asked the canvas for a WebGL2 context and returned
// null. A reader whose browser cannot run any of it paid for all of it and then read the
// typographic chapter underneath, which was already on the page. Measured against the live site:
// 249KB for nothing.
//
// Asking here costs nothing and changes nothing for a reader who does get the scene. getContext
// called twice for the same type hands back the same context object, so the engine's own check
// still runs exactly as it did, on the context this call created.
//
// The imports are dynamic for the same reason. A static import is fetched when this module is,
// whatever the branch around it says.
if (canvas && canvas.getContext("webgl2", { antialias: true, powerPreference: "high-performance" })) {
  Promise.all([
    import("./engine.js"),
    import("./cyber-sentinel/01-board.js"),
    import("./cyber-sentinel/02-lan.js"),
    import("./cyber-sentinel/03-pipeline.js"),
    import("./cyber-sentinel/04-outputs.js")
  ]).then(([{ mountFilm }, { buildBoard }, { buildLan }, { buildPipeline }, { buildOutputs }]) => {
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
  });
}
