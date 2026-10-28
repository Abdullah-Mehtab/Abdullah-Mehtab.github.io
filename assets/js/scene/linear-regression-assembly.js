// ABOUTME: Wires the Linear Regression in Assembly page's sets onto the shared film engine.
// ABOUTME: This is the whole of the page's 3D layer: a canvas, the program's own text that act one prints, the set imports, and a list.
//
// A page's 3D layer is a copy of the first page's wiring with its set imports changed and a canvas on the page. It never means
// editing the engine.

const canvas = document.getElementById("chapter-scene");

// The capability check happens before the imports, so a reader whose browser cannot run the scene never downloads it. See the
// first page's wiring for the measurement behind this.
if (canvas && canvas.getContext("webgl2", { antialias: true, powerPreference: "high-performance" })) {
  Promise.all([
    import("./engine.js"),
    import("./linear-regression-assembly/01-program.js"),
    import("./linear-regression-assembly/02-reading.js"),
    import("./linear-regression-assembly/03-fitting.js"),
    import("./linear-regression-assembly/04-testing.js"),
    // Act one prints the program's real text: a copy of the published program, served from this site rather than from GitHub.
    fetch(new URL("../../data/linear-regression-assembly/program.asm", import.meta.url)).then((response) => {
      if (!response.ok) throw new Error("program.asm: " + response.status);
      return response.text();
    }),
    // The sets paint words into canvases once, when they are built, so the faces have to be loaded first or the paint falls back
    // to a system font for good.
    document.fonts.load("400 16px 'IBM Plex Mono'"),
    document.fonts.load("600 46px Archivo")
  ]).then(([{ mountFilm }, { buildProgram }, { buildReading }, { buildFitting }, { buildTesting }, program]) => {
    const film = mountFilm({
      canvas,
      // The first chapter's log rows and streaks are that chapter's travel matter and mean nothing here. This page's travel
      // matter is the number it follows from act to act, carried by the sets themselves.
      // Act one's printout sits further right than the engine's usual set: at the usual place its left edge stood behind the end of
      // the opening paragraph, and a contained set's solid parts are kept whole there rather than faded.
      stage: { logRows: false, streaks: 0, offsets: [62, 54, 62, 64] },
      buildStations: (palette) => [
        buildProgram(palette, program),
        buildReading(palette),
        buildFitting(palette),
        buildTesting(palette)
      ]
    });

    // A measurement seam, off unless asked for by hand: ?scene-debug publishes the scene for the audit tooling.
    if (film && location.search.includes("scene-debug")) window.chapterFilm = film;
  }).catch((error) => {
    // Said in the console, so a failure is not mistaken for a page that simply has no scene.
    console.error("The 3D scene for this page could not start:", error);
  });
}
