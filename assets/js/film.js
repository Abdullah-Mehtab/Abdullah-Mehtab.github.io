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

  // The frame gets an edge. Two bars, top and bottom, so the page reads as something being
  // projected rather than as a document that happens to move. They sit outside main so the
  // reading column is unaffected, and they are the first thing a reader stops noticing.
  for (const edge of ["top", "bottom"]) {
    const bar = document.createElement("div");
    bar.className = "film-bar";
    bar.dataset.filmBar = edge;
    bar.setAttribute("aria-hidden", "true");
    body.appendChild(bar);
  }

  // The running head. It names the act the reader is in, not the chapter: the chapter's name
  // is the first thing on the page and the reader already has it, while four acts of a film
  // with nothing saying which one this is leaves them counting screens.
  //
  // In words, never numbered. Owner ruling, 2026-09-11: no chapter or act numbering anywhere
  // a reader can see.
  let spineLabel = null;
  if (main.dataset.chapter) {
    const spine = document.createElement("div");
    spine.className = "film-spine";
    spine.setAttribute("aria-hidden", "true");
    spineLabel = document.createElement("span");
    spineLabel.textContent = main.dataset.chapter;
    spine.appendChild(spineLabel);
    body.appendChild(spine);
  }

  // A way to get to an act without scrolling past the ones before it.
  //
  // Built from the acts rather than written out, so adding a chapter act is a markup block with
  // an id and a name on it and nothing else. An act without both is skipped rather than given a
  // control that goes nowhere.
  const jumpable = acts.filter((act) => act.id && act.dataset.actName);
  let railItems = [];
  if (jumpable.length > 1) {
    const rail = document.createElement("nav");
    rail.className = "film-act-nav";
    rail.dataset.actNav = "";
    rail.setAttribute("aria-label", "Jump to a part of this chapter");
    for (const act of jumpable) {
      const link = document.createElement("a");
      link.href = "#" + act.id;
      link.className = "film-act-nav-item";
      // The name is the accessible name and the visible label on hover. The dot alone is a dot.
      link.setAttribute("aria-label", act.dataset.actName);
      const dot = document.createElement("span");
      dot.className = "film-act-nav-dot";
      dot.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.className = "film-act-nav-label";
      text.textContent = act.dataset.actName;
      link.append(dot, text);
      rail.appendChild(link);
      railItems.push({ link, act });
    }
    body.appendChild(rail);
  }

  // The first screen is a title card, and a title card looks finished. This says it is not.
  let scrollCue = null;
  {
    const cue = document.createElement("div");
    cue.className = "film-scroll-cue";
    cue.dataset.scrollCue = "";
    cue.setAttribute("aria-hidden", "true");
    const word = document.createElement("span");
    word.textContent = "Scroll";
    const line = document.createElement("span");
    line.className = "film-scroll-cue-line";
    cue.append(word, line);
    body.appendChild(cue);
    scrollCue = cue;
  }

  // A control that plays the film, so a reader can watch it rather than drive it.
  //
  // In, per owner decision 2026-09-11. It scrolls by time rather than by wheel, and it gives
  // way the instant the reader touches anything: a page that keeps moving under someone who is
  // trying to stop it is worse than no control at all. It stops itself at the end of the last
  // act, because past that the page is a comment form and a footer.
  //
  // Written as scroll, not as a second camera path. The whole film is a function of scroll
  // position, so anything that moves the scroll gets every piece of it for free.
  const play = document.createElement("button");
  play.type = "button";
  play.className = "film-play";
  play.dataset.filmPlay = "";
  play.setAttribute("aria-label", "Play this chapter");
  const playIcon = document.createElement("span");
  playIcon.className = "film-play-icon";
  playIcon.setAttribute("aria-hidden", "true");
  const playWord = document.createElement("span");
  playWord.className = "film-play-word";
  playWord.textContent = "Play";
  play.append(playIcon, playWord);
  body.appendChild(play);

  // Pixels per second. Slow enough to read a heading at, and the film's own damping does the
  // rest: the camera is already following this at its own pace.
  const PLAY_SPEED = 108;
  let playing = false;
  let playFrom = 0;
  let playAt = 0;

  function playEnd() {
    const last = acts[acts.length - 1];
    return last.getBoundingClientRect().top + window.scrollY + last.offsetHeight - window.innerHeight;
  }

  function stopPlaying() {
    if (!playing) return;
    playing = false;
    body.classList.remove("is-playing");
    play.setAttribute("aria-label", "Play this chapter");
    playWord.textContent = "Play";
  }

  function stepPlay(now) {
    if (!playing) return;
    const seconds = (now - playAt) / 1000;
    playAt = now;
    playFrom += PLAY_SPEED * seconds;
    const end = playEnd();
    if (playFrom >= end) {
      window.scrollTo(0, end);
      stopPlaying();
      return;
    }
    window.scrollTo(0, Math.round(playFrom));
    window.requestAnimationFrame(stepPlay);
  }

  play.addEventListener("click", () => {
    if (playing) { stopPlaying(); return; }
    // Nothing to play from here, and playing anyway means scrolling backwards to the end of the
    // last act. The control is hidden past that point as well; this is the half of it that does
    // not depend on a class having been applied yet.
    if (window.scrollY >= playEnd()) return;
    playing = true;
    playFrom = window.scrollY;
    playAt = performance.now();
    body.classList.add("is-playing");
    play.setAttribute("aria-label", "Stop playing this chapter");
    playWord.textContent = "Stop";
    window.requestAnimationFrame(stepPlay);
  });

  // Anything the reader does takes the film back off them. Keydown is listed because the space
  // bar and the arrows scroll too, and a reader pressing End should land at the end.
  for (const event of ["wheel", "touchstart", "keydown", "pointerdown"]) {
    window.addEventListener(event, (e) => {
      // A wheel or key event on the window has the window as its target, which is not a Node,
      // and Node.contains throws on it rather than returning false.
      const from = e.target instanceof Node ? e.target : null;
      if (from && (from === play || play.contains(from))) return;
      stopPlaying();
    }, { passive: true, capture: true });
  }

  // ?still: one scroll position, one frame, every time.
  //
  // The engine freezes its own clock and drops the camera's damping for this, and that got two
  // captures of the same depth from a tenth of their pixels apart down to a fiftieth. The rest
  // was the document: the reveal is a CSS transition with a stagger of up to 275ms, so copy is
  // still arriving a second after a jump. Everything is put in its settled state here and all
  // transitions are turned off, which is blunt and is the point.
  if (/[?&]still(?:=|&|$)/.test(window.location.search)) {
    body.classList.add("film-still");
    for (const el of document.querySelectorAll(".reveal")) el.classList.add("is-visible");
    for (const pin of main.querySelectorAll(".act-pin")) pin.classList.add("is-arrived");
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

    // Every rectangle this pass needs, read before anything is written.
    //
    // A custom property write dirties style for the subtree it is on, and the next
    // getBoundingClientRect then has to recalculate layout before it can answer. Reading each
    // act, writing to it, and reading the next one makes the browser do that once per act, and
    // it showed up as a sixth of all frame time under a profiler. Read everything, then write
    // everything, and it happens once.
    const rects = acts.map((act) => act.getBoundingClientRect());
    const lastRect = rects[rects.length - 1];

    // One measure per act: --act, how far through its hold it is, 0 as it pins and 1 as it
    // releases. The stage glow reads it through --act-now. There were three, and the other two
    // computed the copy's opacity and position from scroll offset, which is why the copy ran
    // backwards when the reader did.
    //
    // The stage also takes its character from whichever act is nearest the middle of the
    // screen, so the space changes as the chapter advances instead of being one backdrop.
    let nearest = null;
    let nearestDistance = Infinity;
    for (let i = 0; i < acts.length; i++) {
      const rect = rects[i];
      const distance = Math.abs(rect.top + rect.height / 2 - vh / 2);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = acts[i];
      }
    }
    for (let i = 0; i < acts.length; i++) {
      const rect = rects[i];
      // An act shorter than the viewport never pins, so it has no hold to be part way through.
      const travel = Math.max(rect.height - vh, 0);
      put(acts[i], "--act", travel > 0 ? clamp(-rect.top / travel).toFixed(2) : "1");
    }
    // Past the last act the page is a comment thread and a footer. Computed here, from the
    // rectangles already read at the top of this pass, because three things below need it.
    const pastChapter = lastRect.bottom < vh * 0.5;

    const scene = nearest && nearest.dataset.scene ? nearest.dataset.scene : "horizon";
    if (body.dataset.scene !== scene) body.dataset.scene = scene;

    // The running head and the rail both follow whichever act the reader is in, which is the
    // one nearest the middle of the screen, the same act the room's colour is taken from.
    //
    // Past the last act they name nothing: the reader is in a comment thread three screens
    // below the chapter, and a spine still reading OUTCOME over it is furniture that outlived
    // what it was describing.
    const inChapter = !pastChapter && nearest;
    const spineText = inChapter && nearest.dataset.actName ? nearest.dataset.actName : "";
    if (spineLabel && spineLabel.textContent !== spineText) spineLabel.textContent = spineText;
    for (const item of railItems) {
      const here = inChapter && item.act === nearest;
      if ((item.link.getAttribute("aria-current") === "true") === here) continue;
      if (here) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    }

    // The cue has done its job the moment the reader scrolls, and saying so twice is nagging.
    if (scrollCue) put(scrollCue, "--cue-shown", window.scrollY > vh * 0.25 ? "0" : "1");

    // The rooms end with the chapter. Past the last act the page is a comment thread and a
    // footer, and perspective rays behind a form read as lines through its placeholder.
    const last = lastRect;

    // Past the last act the copy goes back to the full measure, because there is no set left
    // for it to be leaving room for: the canvas has faded out by then.
    if (body.classList.contains("past-chapter") !== pastChapter) {
      body.classList.toggle("past-chapter", pastChapter);
    }

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
