// ABOUTME: Drives the chapter's scroll choreography: reading progress, stage depth, and act timing.
// ABOUTME: Enhancement only. Every element it touches is already legible before this file runs.
(function () {
  "use strict";

  const body = document.body;
  if (!body || !body.classList.contains("film")) return;

  const main = document.querySelector("main");
  if (!main) return;

  const acts = Array.from(main.querySelectorAll(":scope > .act"));
  if (acts.length === 0) return;

  // Two pieces of fixed chrome: a reading-progress hairline at the header's lower edge, and
  // a matte beneath it so type dissolves into the bar instead of ending on a hard line.
  // Both replaced a caption bar pinned along the bottom of the screen, which permanently
  // covered the last 40px of every phone viewport. film.css positions them and hides the
  // matte on a phone, where the header does not float at all.
  for (const name of ["film-matte", "film-progress"]) {
    const element = document.createElement("div");
    element.className = name;
    element.setAttribute("aria-hidden", "true");
    body.appendChild(element);
  }

  // The running head, from whatever the page called itself. A chapter that does not name
  // itself here simply does not get one.
  if (main.dataset.chapter) {
    const spine = document.createElement("div");
    spine.className = "film-spine";
    spine.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = main.dataset.chapter;
    spine.appendChild(label);
    body.appendChild(spine);
  }

  // Choreography is opt-in on this class, which only exists once this file has run. Without it
  // every act renders at full presence, so a reader with no JavaScript sees the whole chapter.
  body.classList.add("is-choreographed");

  let ticking = false;

  function clamp(value) {
    return Math.min(1, Math.max(0, value));
  }

  function update() {
    ticking = false;

    const vh = window.innerHeight;
    const scrollable = document.documentElement.scrollHeight - vh;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    body.style.setProperty("--film-progress", `${clamp(ratio) * 100}%`);

    // The stage floor advances with the reader. Wrapping at one grid cell keeps the travel
    // seamless however far the page runs, so the space never reaches an end.
    body.style.setProperty("--film-depth", String((window.scrollY * 0.45) % 110));

    // Three measures per act, because they answer three different questions and one property
    // was doing all three jobs badly.
    //
    //   --phase  when the act's content arrives. It starts while the frame is still coming
    //            into view and finishes halfway through the hold, so the frame is never
    //            blank on arrival and the pin still has something left to do.
    //   --act    how far through its hold the act is, 0 as it pins and 1 as it releases.
    //   --exit   how far the frame has actually travelled off screen, which is the only
    //            honest trigger for fading it: a frame that is still pinned is still the
    //            only thing the reader can see, so it must not dim.
    for (const act of acts) {
      const rect = act.getBoundingClientRect();
      // An act shorter than the viewport has no hold. Left negative, it inverts the arrival
      // span and the whole frame settles at an arbitrary opacity.
      const travel = Math.max(rect.height - vh, 0);

      // Arrival happens entirely on the way in, over the three tenths of a screen before
      // this act's wrapper reaches the top. That head start is not a preference: it is
      // exactly what the overlap arithmetic in film.css leaves, so the previous frame
      // reaches zero on the same scroll position this one starts arriving. Spreading the beats into the hold instead was measurably worse: at
      // 0.85 of the hold, 63% of scroll depths showed a fully composed frame, and at zero
      // 82% do (.claude-tools/audit-handoff.mjs). What a held frame does instead is dolly,
      // which never leaves a word half drawn.
      const phaseSpan = vh * 0.3;
      act.style.setProperty("--phase", clamp((-rect.top + vh * 0.3) / phaseSpan).toFixed(4));
      act.style.setProperty("--act", travel > 0 ? clamp(-rect.top / travel).toFixed(4) : "1");

      // An act with no travel never pins, so it has no exit either: it is ordinary flow and
      // fading it would only open a gap in front of whatever follows.
      const pin = act.querySelector("section");
      const top = pin ? pin.getBoundingClientRect().top : 0;
      act.style.setProperty("--exit", travel > 0 ? clamp(-top / vh).toFixed(4) : "0");

      // How far the frame still has to travel before it pins. Cancelling it means a frame
      // is drawn where it will hold from the moment it becomes legible, instead of arriving
      // centred in a pin that is still half below the fold, with a third of the screen
      // empty above it and its last line cut off by the bottom edge.
      act.style.setProperty("--enter", String(Math.max(0, Math.round(top))));
    }

    // The stage takes its character from whichever act is nearest the middle of the screen, so
    // the space changes as the chapter advances instead of being one backdrop throughout.
    let nearest = null;
    let nearestDistance = Infinity;
    for (const act of acts) {
      const rect = act.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - vh / 2);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = act;
      }
    }
    const scene = nearest && nearest.dataset.scene ? nearest.dataset.scene : "horizon";
    if (body.dataset.scene !== scene) body.dataset.scene = scene;

    // The rooms end with the chapter. Past the last act the page is a comment thread and a
    // footer, and perspective rays behind a form read as lines through its placeholder.
    const last = acts[acts.length - 1].getBoundingClientRect();
    body.style.setProperty("--stage-presence", (1 - clamp((vh - last.bottom) / (vh * 0.6)) * 0.85).toFixed(3));

    // The running act's own progress, published where the stage can read it. The stage is a
    // sibling of main, so it cannot inherit a property set on the act itself.
    body.style.setProperty("--act-now", nearest ? nearest.style.getPropertyValue("--act") || "0" : "0");
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
