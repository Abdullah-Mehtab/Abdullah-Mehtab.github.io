// ABOUTME: A theme's life beyond its colours: what moves, draws itself and answers the visitor. Paper's lives here.
// ABOUTME: Loaded by portfolio-v2.js the first time a theme with life is picked; never on film pages, where the film is the life.
(function () {
  if (window.themeLife) return;

  const body = document.body;
  const NS = "http://www.w3.org/2000/svg";
  const wobble = (n) => (Math.random() - 0.5) * n;
  const motion = () => body.dataset.motion || "full";

  // Draws an SVG path by moving its dash; it starts fully undrawn.
  function prime(path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    return length;
  }

  function svg(className, viewBox, d) {
    const element = document.createElementNS(NS, "svg");
    element.setAttribute("class", className);
    element.setAttribute("viewBox", viewBox);
    element.setAttribute("preserveAspectRatio", "none");
    element.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    element.appendChild(path);
    return element;
  }

  // A cream index card or the sheet itself: only text on the sheet is written on its rules.
  function onSheet(element) {
    for (let node = element.parentElement; node && node !== body; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none") return false;
      const alpha = style.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (alpha) {
        const parts = alpha[1].split(",");
        if (parts.length < 4 || Number(parts[3]) >= 0.5) return false;
      }
    }
    return true;
  }

  // Undo leaves an element exactly as the page wrote it, empty attributes included.
  function unmark(element, ...classes) {
    element.classList.remove(...classes);
    if (!element.classList.length) element.removeAttribute("class");
  }

  function unstyle(element, ...properties) {
    properties.forEach((property) => element.style.removeProperty(property));
    if (!element.style.length) element.removeAttribute("style");
  }

  function documentTop(element) {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  }

  const paper = {
    start() {
      const undo = [];
      const timers = [];
      const rule = parseFloat(getComputedStyle(body).getPropertyValue("--text-rule")) || 32;

      // 1. Text on the sheet is written on the lines: each block's line height becomes a whole
      // number of rules, and the block is nudged (translate, so nothing else moves) until its
      // baseline sits just above a printed line. Every later line then lands too.
      const sheetText = [...document.querySelectorAll("main :is(h1, h2, h3, p, .eyebrow), .site-footer :is(h2, h3, p)")]
        .filter((element) => element.offsetParent && onSheet(element));
      // How many rules each line takes: the nearest to the line height the page asked for, but
      // never fewer than the handwriting needs, whose letters stand taller than the site's own.
      const rulesPerLine = new Map(sheetText.map((element) => {
        const style = getComputedStyle(element);
        const size = parseFloat(style.fontSize);
        const lineHeight = style.lineHeight === "normal" ? size * 1.2 : parseFloat(style.lineHeight);
        return [element, Math.max(1, Math.round(lineHeight / rule), Math.ceil((size * 0.95) / rule))];
      }));

      function snap() {
        const marks = sheetText.map((element) => {
          const lines = rulesPerLine.get(element);
          const height = `${lines * rule}px`;
          if (element.style.lineHeight !== height) element.style.lineHeight = height;
          const mark = document.createElement("span");
          mark.style.cssText = "display:inline-block;width:0;height:0";
          element.prepend(mark);
          return mark;
        });
        // An empty inline block sits on the baseline, and offsetTop ignores transforms, so the
        // reveal animations in flight cannot spoil the reading.
        const baselines = marks.map((mark) => documentTop(mark));
        marks.forEach((mark) => mark.remove());
        sheetText.forEach((element, index) => {
          const line = Math.round((baselines[index] + 4) / rule) * rule;
          element.style.translate = `0 ${line - 4 - baselines[index]}px`;
        });
      }
      undo.push(() => sheetText.forEach((element) => {
        unstyle(element, "line-height", "translate");
      }));

      // 2. Headings write themselves in, word by word, when they come into view.
      // Only at full motion: anywhere else the headings stay whole text, already written.
      const writing = motion() === "full" ? [...document.querySelectorAll("main :is(h1, h2), main .eyebrow")] : [];
      const split = [];
      writing.forEach((heading) => {
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        const texts = [];
        while (walker.nextNode()) if (walker.currentNode.textContent.trim()) texts.push(walker.currentNode);
        let delay = 0;
        texts.forEach((text) => {
          const fragment = document.createDocumentFragment();
          const words = text.textContent.split(/(\s+)/);
          words.forEach((word) => {
            if (!word.trim()) {
              fragment.appendChild(document.createTextNode(word));
              return;
            }
            const span = document.createElement("span");
            span.className = "paper-word";
            span.textContent = word;
            const time = Math.max(120, word.length * 40);
            span.style.setProperty("--write-time", `${time}ms`);
            span.style.setProperty("--write-delay", `${delay}ms`);
            delay += time + 50;
            fragment.appendChild(span);
          });
          const placeholder = fragment.firstChild;
          text.replaceWith(fragment);
          split.push({ text, first: placeholder, count: words.length });
        });
      });
      undo.push(() => {
        split.forEach(({ text, first, count }) => {
          const nodes = [];
          for (let node = first, i = 0; node && i < count; node = node.nextSibling, i += 1) nodes.push(node);
          nodes[0].replaceWith(text);
          nodes.slice(1).forEach((node) => node.remove());
        });
        writing.forEach((heading) => unmark(heading, "is-written"));
      });

      // 3. A highlighter is swept across section headings on the sheet once they are written.
      const marked = [...document.querySelectorAll("main h2")].filter(onSheet);
      marked.forEach((heading) => heading.classList.add("paper-marked"));
      undo.push(() => marked.forEach((heading) => unmark(heading, "paper-marked")));

      // 4. Links get a scribbled underline on hover, each a little different, as no hand draws the
      // same line twice. The page you are on keeps its underline.
      const links = [...document.querySelectorAll(".nav-links a, main p a, .section-heading a:not(.button), .site-footer a")]
        .filter((link) => !link.querySelector("img, svg"));
      links.forEach((link) => {
        const mark = svg("paper-scribble", "0 0 100 12", `M1 ${7 + wobble(3)} C 22 ${2 + wobble(3)}, 40 ${10 + wobble(3)}, 60 ${5 + wobble(3)} S 88 ${4 + wobble(3)}, 99 ${7 + wobble(2)}`);
        link.classList.add("paper-link");
        link.appendChild(mark);
        prime(mark.firstChild);
      });
      undo.push(() => links.forEach((link) => {
        unmark(link, "paper-link");
        link.querySelectorAll(":scope > .paper-scribble").forEach((mark) => mark.remove());
      }));

      // 5. The chosen filter is circled in red pen; picking another rubs the old circle out.
      const filters = [...document.querySelectorAll(".filter-button")];
      filters.forEach((button) => {
        const ring = svg("paper-ring", "0 0 100 50", `M${16 + wobble(4)} 7 C 44 -3, 94 1, 97 22 C 100 44, 50 51, 17 45 C -5 40, -1 11, ${32 + wobble(6)} 5`);
        button.classList.add("paper-circled");
        button.appendChild(ring);
        prime(ring.firstChild);
      });
      undo.push(() => filters.forEach((button) => {
        unmark(button, "paper-circled");
        button.querySelectorAll(":scope > .paper-ring").forEach((ring) => ring.remove());
      }));

      // 6. Strips of tape hold the photo and the cards that are pinned rather than laid flat.
      const taped = [...document.querySelectorAll(".profile-panel, .about-snapshot, .download-card, .todo-column")];
      taped.forEach((card) => {
        card.classList.add("paper-taped");
        ["left", "right"].forEach((side) => {
          const tape = document.createElement("span");
          tape.className = `paper-tape paper-tape-${side}`;
          tape.setAttribute("aria-hidden", "true");
          tape.style.setProperty("--tape-turn", `${(side === "left" ? -32 : 30) + wobble(10)}deg`);
          card.appendChild(tape);
        });
      });
      undo.push(() => taped.forEach((card) => {
        unmark(card, "paper-taped");
        card.querySelectorAll(":scope > .paper-tape").forEach((tape) => tape.remove());
      }));

      // 7. Doodles in the right-hand margin, drawn in pencil when seen, now and then redrawn.
      const shapes = [
        "M10 30 C 10 10, 40 10, 40 30 C 40 45, 18 45, 18 30 C 18 22, 32 22, 32 30",
        "M25 2 L31 19 L49 19 L34 30 L40 48 L25 37 L10 48 L16 30 L1 19 L19 19 Z",
        "M6 40 L40 6 M40 6 L26 8 M40 6 L38 20",
        "M10 14 L28 4 L46 14 L28 24 Z M10 14 L10 36 L28 46 L28 24 M46 14 L46 36 L28 46",
        "M30 2 L12 26 L26 26 L18 48 L40 20 L26 20 Z",
        "M25 25 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 M17 20 L17 21 M33 20 L33 21 M15 31 C 20 37, 30 37, 35 31"
      ];
      const margin = document.createElement("div");
      margin.className = "paper-margin";
      margin.setAttribute("aria-hidden", "true");
      body.appendChild(margin);
      const sections = [...document.querySelectorAll("main > section")];
      const doodles = sections.map((section, index) => {
        const doodle = svg("paper-doodle", "0 0 50 50", shapes[index % shapes.length]);
        doodle.removeAttribute("preserveAspectRatio");
        doodle.style.setProperty("--doodle-size", `${44 + wobble(10)}px`);
        doodle.style.setProperty("--doodle-turn", `${wobble(30)}deg`);
        margin.appendChild(doodle);
        prime(doodle.firstChild);
        return doodle;
      });
      function placeDoodles() {
        const column = document.querySelector("main .section-inner");
        const right = column ? column.getBoundingClientRect().right : 0;
        const room = document.documentElement.clientWidth - right;
        doodles.forEach((doodle, index) => {
          doodle.hidden = room < 76;
          doodle.style.left = `${right + room / 2 - 23}px`;
          doodle.style.top = `${documentTop(sections[index]) + 90}px`;
        });
      }
      undo.push(() => margin.remove());

      // Writing and drawing start when a thing comes into view.
      const seen = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-written");
          seen.unobserve(entry.target);
        });
      }, { threshold: 0.3 });
      [...writing, ...doodles].forEach((element) => seen.observe(element));
      undo.push(() => seen.disconnect());

      timers.push(window.setInterval(() => {
        if (motion() !== "full" || document.hidden) return;
        const drawn = doodles.filter((doodle) => doodle.classList.contains("is-written") && !doodle.hidden);
        const doodle = drawn[Math.floor(Math.random() * drawn.length)];
        if (!doodle) return;
        doodle.classList.remove("is-written");
        timers.push(window.setTimeout(() => doodle.classList.add("is-written"), 1900));
      }, 7000));

      // Everything that is placed by measuring is placed again when the page changes size:
      // fonts arriving, comments loading, the window resized.
      let pending = 0;
      const layout = () => {
        pending = 0;
        snap();
        placeDoodles();
      };
      const relayout = () => {
        if (!pending) pending = window.requestAnimationFrame(layout);
      };
      const resized = new ResizeObserver(relayout);
      resized.observe(document.querySelector("main") || body);
      window.addEventListener("resize", relayout);
      document.fonts.ready.then(relayout);
      layout();
      undo.push(() => {
        resized.disconnect();
        window.removeEventListener("resize", relayout);
        if (pending) window.cancelAnimationFrame(pending);
      });

      return () => {
        timers.forEach((timer) => { window.clearInterval(timer); window.clearTimeout(timer); });
        undo.reverse().forEach((step) => step());
      };
    }
  };

  const lives = { paper };
  let running = null;

  // The crumple: the sheet is squeezed and smoothed out again when it arrives, whether by a new
  // page or by picking the theme. Only at full motion.
  function crunch() {
    if (motion() !== "full") return;
    body.classList.remove("is-crunching");
    void body.offsetWidth;
    body.classList.add("is-crunching");
    window.setTimeout(() => body.classList.remove("is-crunching"), 1500);
  }

  function follow() {
    const theme = body.dataset.theme;
    if (running && running.theme === theme) {
      body.classList.toggle("theme-life-still", motion() !== "full");
      return;
    }
    if (running) {
      running.stop();
      running = null;
    }
    body.classList.remove("theme-life-still");
    const life = lives[theme];
    if (!life) return;
    body.classList.toggle("theme-life-still", motion() !== "full");
    running = { theme, stop: life.start() };
    if (theme === "paper") crunch();
  }

  window.themeLife = { follow };
  new MutationObserver(follow).observe(body, { attributes: true, attributeFilter: ["data-theme", "data-motion"] });
  follow();
})();
