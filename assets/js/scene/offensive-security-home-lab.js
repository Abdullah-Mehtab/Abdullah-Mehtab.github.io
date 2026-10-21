// ABOUTME: Wires the Offensive Security Home Lab page's sets onto the shared film engine.
// ABOUTME: This is the whole of the page's 3D layer: a canvas, the models acts one and two stand on, the set imports, and a list.
//
// A page's 3D layer is a copy of the first page's wiring with its set imports changed and a canvas
// on the page. It never means editing the engine.

const canvas = document.getElementById("chapter-scene");

// The capability check happens before the import, not after it.
//
// engine.js and kit.js import three.js at the top of their modules, so the whole 183KB would be
// fetched, parsed and compiled before mountFilm asked the canvas for a WebGL2 context and returned
// null. A reader whose browser cannot run any of it would pay for all of it and then read the
// typographic page underneath, which is already there.
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
    import("./offensive-security-home-lab/01-desk.js"),
    import("./offensive-security-home-lab/02-network.js"),
    import("./offensive-security-home-lab/03-method.js"),
    import("./offensive-security-home-lab/04-detection.js"),
    import("../../vendor/three/addons/loaders/GLTFLoader.js"),
    import("../../vendor/three/addons/libs/meshopt_decoder.module.js")
  ]).then(async ([{ mountFilm }, { buildDesk, GLOW }, { buildNetwork }, { buildMethod }, { buildDetection }, { GLTFLoader }, { MeshoptDecoder }]) => {
    // Acts one and two stand on five models made for this page. They are loaded once, before the engine starts, because the engine builds
    // every set at once and again on a theme change; the set clones them each time. If any of them fails to load the scene does not
    // start and the reader keeps the typographic page, which is already there.
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const folder = new URL("../../models/offensive-security-home-lab/", import.meta.url);
    const names = ["tower", "keyboard", "mouse", "monitor", "laptop"];
    const loaded = await Promise.all(names.map((name) => loader.loadAsync(new URL(name + ".glb", folder).href)));
    const models = Object.fromEntries(names.map((name, i) => [name, loaded[i]]));

    const film = mountFilm({
      canvas,
      // Acts two and three sit further right than the engine's usual set, so their subjects and labels stay clear of the act's copy:
      // act two's two blocks, and act three's list of seven phases, which reaches furthest across the frame. Act four keeps the
      // engine's own place.
      // The first chapter's log rows and streaks are off: they were that chapter's travel matter and meant nothing here (owner,
      // 2026-10-19). This chapter's is one network cable, from the Home PC's port through every act's set, with packets riding it,
      // because the whole lab sat on one bridged LAN. It is the models' purple, as every model line in this chapter is.
      // Act three's map stands higher than the engine's usual lift, near the height act two is read at. The flight out of act two
      // turns towards the map from its first frame, and with the map at the usual height it tipped down so far that act two's top
      // label rose under the page's header (4.29:1 against the 4.5 contrast floor). The map's own frames do not move: its camera tour
      // is in the set's own units.
      // The fog thins while the camera flies and each flight glides in on the next set, so the next set shows ahead from the start
      // of each flight and is near its own size by the middle of it; see flightFog and glide in engine.js.
      stage: { offsets: [42, 70, 60, 48], lifts: [10, 6, 100, 6], logRows: false, streaks: 0, cable: GLOW, flightFog: 0.0012, glide: true },
      buildStations: (palette) => [
        buildDesk(palette, models),
        buildNetwork(palette, models),
        buildMethod(palette),
        buildDetection(palette)
      ]
    });

    // A measurement seam, off unless asked for by hand. Opening the page with ?scene-debug
    // publishes the scene graph so the audit tooling can project nameplates into screen space
    // and check none of them leaves the frame or lands on another. No reader's page runs this
    // branch, and nothing on the page reads the handle.
    if (film && location.search.includes("scene-debug")) window.chapterFilm = film;
  }).catch((error) => {
    // Said in the console, so a failure is not mistaken for a page that simply has no scene.
    console.error("The 3D scene for this chapter could not start:", error);
  });
}
