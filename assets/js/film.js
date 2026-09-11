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
  let progressBar = null;
  for (const name of ["film-matte", "film-progress"]) {
    const element = document.createElement("div");
    element.className = name;
    element.setAttribute("aria-hidden", "true");
    body.appendChild(element);
    if (name === "film-progress") progressBar = element;
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

  // Copy latches. It arrives once, and from then on it stays exactly where it is however the
  // reader moves the wheel.
  //
  // It used to be driven by --phase, a value recomputed from the act's rect on every scroll
  // frame, which runs backwards as readily as forwards: scrolling back a little took every
  // paragraph part of the way out again, and the reader saw the text twitching against the
  // scrollbar. The arrival span was also 0.08 of a 108px phase, so the whole of it happened
  // inside nine pixels of scrolling; it read as a flash rather than as choreography, and it
  // meant twenty-nine pixels separated a full frame from an empty one.
  //
  // How far below the fold a pin is when its copy arrives. A quarter screen means the frame
  // is already composed by the time the reader reaches it, rather than assembling itself in
  // front of them. Acts no longer overlap, so this is free to be generous: there is no second
  // act sharing those pixels for it to collide with.
  const arriveHeadStart = window.innerHeight * 0.25;
  const arrive = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-arrived");
      // Never unset. That is the whole point, and unobserving says so in code.
      arrive.unobserve(entry.target);
    }
  }, { rootMargin: `0px 0px ${Math.round(arriveHeadStart)}px 0px` });
  for (const pin of main.querySelectorAll(".act-pin")) arrive.observe(pin);

  let ticking = false;

  function clamp(value) {
    return Math.min(1, Math.max(0, value));
  }

  // Setting a custom property on an element marks its whole subtree for style recalculation,
  // and body's subtree is the document. Four of those per frame plus four per act costs about
  // 27ms a frame here, which is most of a frame's budget spent re-resolving styles that did
  // not change. Writing only when the value actually changes gets that back during a hold,
  // which is where a reader spends most of their time.
  const written = new WeakMap();
  function put(element, name, value) {
    let bag = written.get(element);
    if (!bag) written.set(element, (bag = new Map()));
    if (bag.get(name) === value) return;
    bag.set(name, value);
    element.style.setProperty(name, value);
  }

  function update() {
    ticking = false;

    const vh = window.innerHeight;
    const scrollable = document.documentElement.scrollHeight - vh;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    // On the bar itself rather than on body: it is the only thing that reads this, and on
    // body it invalidated every element on the page once a frame to move one hairline.
    if (progressBar) put(progressBar, "--film-progress", `${(clamp(ratio) * 100).toFixed(2)}%`);

    // The stage floor advances with the reader. Wrapping at one grid cell keeps the travel
    // seamless however far the page runs, so the space never reaches an end.
    // With the 3D layer live the floor, ceiling and walls are out of the document entirely,
    // so this and the two measures below have no consumer and are not worth a style recalc.
    const staged = !body.classList.contains("scene-live");
    if (staged) put(body, "--film-depth", String(Math.round((window.scrollY * 0.45) % 110)));

    // One measure per act: --act, how far through its hold it is, 0 as it pins and 1 as it
    // releases. The stage glow reads it through --act-now. There were three, and the other two
    // computed the copy's opacity and position from scroll offset, which is why the copy ran
    // backwards when the reader did.
    for (const act of acts) {
      const rect = act.getBoundingClientRect();
      // An act shorter than the viewport never pins, so it has no hold to be part way through.
      const travel = Math.max(rect.height - vh, 0);

      put(act, "--act", travel > 0 ? clamp(-rect.top / travel).toFixed(2) : "1");

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
    if (staged) put(body, "--stage-presence", (1 - clamp((vh - last.bottom) / (vh * 0.6)) * 0.85).toFixed(3));

    // The running act's own progress, published where the stage can read it. The stage is a
    // sibling of main, so it cannot inherit a property set on the act itself.
    if (staged) put(body, "--act-now", nearest ? nearest.style.getPropertyValue("--act") || "0" : "0");
  }

  // Thirty times a second, not sixty.
  //
  // Every measure this writes feeds a CSS transition that runs for 700ms, so halving the rate
  // changes nothing a reader can see. What it does change is the cost: each pass reads eight
  // layout rectangles and writes four custom properties per act, and a custom property write
  // invalidates the style of everything below it. Measured at a 4x CPU throttle, this file was
  // the difference between 117fps with it blocked and 35fps with it running.
  const MIN_GAP = 33;
  let lastRun = 0;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame((now) => {
      if (now - lastRun < MIN_GAP) {
        ticking = false;
        // Still due: come back on the next frame rather than dropping this scroll entirely.
        window.requestAnimationFrame(() => { ticking = false; onScroll(); });
        return;
      }
      lastRun = now;
      update();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
