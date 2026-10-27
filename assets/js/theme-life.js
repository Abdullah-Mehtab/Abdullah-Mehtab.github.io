// ABOUTME: A theme's life beyond its colours: what moves, draws itself and answers the visitor. Paper, Space, Forest, Cyber, Ember and Cassie live here.
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
    if (!element.style.length) {
      // Chrome writes inline style changes back to the attribute lazily. Removing an attribute
      // that has not been written yet leaves it to come back later as style="", so it is read
      // (written) first and then removed.
      element.getAttribute("style");
      element.removeAttribute("style");
    }
  }

  // Puts each word of the elements' text in a span of className, so a word can be revealed on its
  // own; each(span, word, element) is called for every word, in reading order. Returns the step
  // that puts the original text nodes back.
  function splitWords(elements, className, each) {
    const split = [];
    elements.forEach((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const texts = [];
      while (walker.nextNode()) if (walker.currentNode.textContent.trim()) texts.push(walker.currentNode);
      texts.forEach((text) => {
        const fragment = document.createDocumentFragment();
        const words = text.textContent.split(/(\s+)/);
        words.forEach((word) => {
          if (!word.trim()) {
            fragment.appendChild(document.createTextNode(word));
            return;
          }
          const span = document.createElement("span");
          span.className = className;
          span.textContent = word;
          each(span, word, element);
          fragment.appendChild(span);
        });
        const placeholder = fragment.firstChild;
        text.replaceWith(fragment);
        split.push({ text, first: placeholder, count: words.length });
      });
    });
    return () => split.forEach(({ text, first, count }) => {
      const nodes = [];
      for (let node = first, i = 0; node && i < count; node = node.nextSibling, i += 1) nodes.push(node);
      nodes[0].replaceWith(text);
      nodes.slice(1).forEach((node) => node.remove());
    });
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
      let delay = 0;
      let current = null;
      const unsplit = splitWords(writing, "paper-word", (span, word, heading) => {
        if (heading !== current) {
          current = heading;
          delay = 0;
        }
        const time = Math.max(120, word.length * 40);
        span.style.setProperty("--write-time", `${time}ms`);
        span.style.setProperty("--write-delay", `${delay}ms`);
        delay += time + 50;
      });
      undo.push(() => {
        unsplit();
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

  // Parts several lives share. Each returns the step that takes it away again.

  // Adds a class only to elements that are not already positioned, so the parts placed inside
  // them have a box to sit in without moving an element the page placed on purpose.
  function anchor(elements) {
    const anchored = elements.filter((element) => getComputedStyle(element).position === "static");
    anchored.forEach((element) => element.classList.add("life-anchor"));
    return () => anchored.forEach((element) => unmark(element, "life-anchor"));
  }

  // A canvas in the backdrop, sized to the window, drawn every frame at Full motion and a few
  // times a second otherwise (enough for a slow twinkle). draw(context, width, height, now, mode).
  function backdropCanvas(className, draw) {
    const canvas = document.createElement("canvas");
    canvas.className = className;
    (document.querySelector(".theme-backdrop") || body).appendChild(canvas);
    const context = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    function size() {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    size();
    window.addEventListener("resize", size);
    let frame = 0;
    let lastDraw = 0;
    function loop(now) {
      frame = window.requestAnimationFrame(loop);
      const mode = motion();
      if (mode !== "full" && now - lastDraw < 120) return;
      lastDraw = now;
      draw(context, width, height, now, mode);
    }
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", size);
      canvas.remove();
    };
  }

  // A light inside each card that follows the pointer while it is over the card. The theme's
  // CSS for className decides what the light looks like (Space: an edge, Forest: a warm glow).
  function pointerLight(className) {
    const cards = [...document.querySelectorAll(".kinetic-card, .proof-lane")];
    const unanchor = anchor(cards);
    const lights = cards.map((card) => {
      const light = document.createElement("span");
      light.className = className;
      light.setAttribute("aria-hidden", "true");
      card.appendChild(light);
      return light;
    });
    let frame = 0;
    let pointer = null;
    const move = (event) => {
      pointer = event;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const card = pointer.target instanceof Element ? pointer.target.closest(".kinetic-card, .proof-lane") : null;
        const light = card && card.querySelector(`:scope > .${className}`);
        if (!light) return;
        const box = card.getBoundingClientRect();
        light.style.setProperty("--light-x", `${pointer.clientX - box.left}px`);
        light.style.setProperty("--light-y", `${pointer.clientY - box.top}px`);
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      if (frame) window.cancelAnimationFrame(frame);
      lights.forEach((light) => light.remove());
      unanchor();
    };
  }

  // Headings take className and gain is-seen when they come into view; the theme's CSS says how
  // they arrive. Only at full motion: anywhere else they are simply there.
  function headingsArrive(className) {
    const headings = motion() === "full" ? [...document.querySelectorAll("main :is(h1, h2)")] : [];
    headings.forEach((heading) => heading.classList.add(className));
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-seen");
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    headings.forEach((heading) => seen.observe(heading));
    return () => {
      seen.disconnect();
      headings.forEach((heading) => unmark(heading, className, "is-seen"));
    };
  }

  // A click at full motion leaves a few specks that fly apart and fade, styled by className.
  function clickBurst(className, count, reach) {
    const layer = document.createElement("div");
    layer.className = "life-bursts";
    layer.setAttribute("aria-hidden", "true");
    body.appendChild(layer);
    const burst = (event) => {
      if (motion() !== "full" || event.button !== 0) return;
      const spot = document.createElement("span");
      spot.className = `life-burst ${className}`;
      spot.style.left = `${event.clientX}px`;
      spot.style.top = `${event.clientY}px`;
      for (let i = 0; i < count; i += 1) {
        const speck = document.createElement("i");
        speck.style.setProperty("--speck-turn", `${(i * 360) / count + wobble(360 / count / 2)}deg`);
        speck.style.setProperty("--speck-reach", `${reach * (0.6 + Math.random() * 0.8)}px`);
        spot.appendChild(speck);
      }
      layer.appendChild(spot);
      window.setTimeout(() => spot.remove(), 1600);
    };
    document.addEventListener("pointerdown", burst, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", burst);
      layer.remove();
    };
  }

  // A mark on every project filter, shown by the theme's CSS only on the chosen one.
  function filterMark(className) {
    const filters = [...document.querySelectorAll(".filter-button")];
    const unanchor = anchor(filters);
    filters.forEach((button) => {
      const mark = document.createElement("span");
      mark.className = className;
      mark.setAttribute("aria-hidden", "true");
      button.appendChild(mark);
    });
    return () => {
      filters.forEach((button) => button.querySelectorAll(`:scope > .${className}`).forEach((mark) => mark.remove()));
      unanchor();
    };
  }

  const space = {
    start() {
      const undo = [];

      // 1. Stars of its own in front of the painted sky, at different depths, so they
      // drift apart as the page scrolls. Some twinkle; now and then one shoots across.
      // At Calm they hold still and twinkle slowly; at Off the backdrop is hidden altogether.
      const tints = ["255, 255, 255", "255, 255, 255", "255, 255, 255", "188, 208, 255", "255, 220, 170"];
      const stars = Array.from({ length: 400 }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: 0.45 + Math.pow(Math.random(), 2.4) * 1.1,
        depth: 0.04 + Math.random() * 0.18,
        light: 0.4 + Math.random() * 0.55,
        // Seconds per twinkle, or 0 for a star that keeps its light.
        twinkle: Math.random() < 0.22 ? 3 + Math.random() * 5 : 0,
        phase: Math.random() * Math.PI * 2,
        tint: tints[Math.floor(Math.random() * tints.length)]
      }));
      let shooting = null;
      let nextShot = performance.now() + 3000 + Math.random() * 5000;
      function shoot(now, width, height) {
        const angle = (0.12 + Math.random() * 0.22) * Math.PI;
        const direction = Math.random() < 0.5 ? 1 : -1;
        shooting = {
          x: width * (0.2 + Math.random() * 0.6),
          y: height * (0.05 + Math.random() * 0.3),
          dx: Math.cos(angle) * direction,
          dy: Math.sin(angle),
          start: now,
          time: 700 + Math.random() * 300,
          distance: 240 + Math.random() * 160
        };
        nextShot = now + 5000 + Math.random() * 5000;
      }
      undo.push(backdropCanvas("space-sky", (context, width, height, now, mode) => {
        if (mode === "off") return;
        const scroll = mode === "full" ? window.scrollY : 0;
        const slow = mode === "full" ? 1 : 3;
        context.clearRect(0, 0, width, height);
        stars.forEach((star) => {
          let y = (star.y * height - scroll * star.depth) % height;
          if (y < 0) y += height;
          const light = star.twinkle
            ? star.light * (0.55 + 0.45 * Math.sin(now / 1000 / (star.twinkle * slow) * Math.PI * 2 + star.phase))
            : star.light;
          context.fillStyle = `rgba(${star.tint}, ${light.toFixed(3)})`;
          context.beginPath();
          context.arc(star.x * width, y, star.radius, 0, Math.PI * 2);
          context.fill();
        });
        if (mode === "full" && !shooting && now > nextShot) shoot(now, width, height);
        if (!shooting) return;
        const progress = (now - shooting.start) / shooting.time;
        if (progress >= 1 || mode !== "full") {
          shooting = null;
          return;
        }
        const head = shooting.distance * progress;
        const tail = Math.max(0, head - 150);
        const fade = progress < 0.75 ? 1 : (1 - progress) / 0.25;
        const x1 = shooting.x + shooting.dx * tail;
        const y1 = shooting.y + shooting.dy * tail;
        const x2 = shooting.x + shooting.dx * head;
        const y2 = shooting.y + shooting.dy * head;
        const streak = context.createLinearGradient(x1, y1, x2, y2);
        streak.addColorStop(0, "rgba(220, 232, 255, 0)");
        streak.addColorStop(1, `rgba(235, 242, 255, ${(0.85 * fade).toFixed(3)})`);
        context.strokeStyle = streak;
        context.lineWidth = 1.4;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }));

      // 2. Starlight catches the edge of the card under the pointer, brightest nearest to it.
      undo.push(pointerLight("space-glint"));
      // 3. Headings settle into place as they come into view, pulled in from a little wider.
      undo.push(headingsArrive("space-rise"));
      // 4. A click leaves a small burst of stars where it landed.
      undo.push(clickBurst("space-burst", 8, 24));
      // 5. A small dot orbits the chosen project filter.
      undo.push(filterMark("space-orbit"));

      return () => undo.reverse().forEach((step) => step());
    }
  };

  const forest = {
    start() {
      const undo = [];
      const full = () => motion() === "full";

      // 1. Fireflies drift among the trees, each wandering on its own and blinking slowly.
      // At Calm and Off they hold where they are.
      const glow = document.createElement("canvas");
      glow.width = 32;
      glow.height = 32;
      const glowContext = glow.getContext("2d");
      const halo = glowContext.createRadialGradient(16, 16, 0, 16, 16, 16);
      halo.addColorStop(0, "rgba(255, 244, 190, 1)");
      halo.addColorStop(0.18, "rgba(242, 210, 122, 0.9)");
      halo.addColorStop(0.45, "rgba(242, 210, 122, 0.22)");
      halo.addColorStop(1, "rgba(242, 210, 122, 0)");
      glowContext.fillStyle = halo;
      glowContext.fillRect(0, 0, 32, 32);
      const flies = Array.from({ length: 60 }, () => ({
        x: Math.random(),
        // Mostly low, among the trees, a few higher up.
        y: 0.35 + Math.pow(Math.random(), 0.7) * 0.62,
        heading: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.01,
        size: 14 + Math.random() * 12,
        blink: 2.5 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2
      }));
      let last = performance.now();
      undo.push(backdropCanvas("forest-flies", (context, width, height, now, mode) => {
        const seconds = Math.min(0.1, (now - last) / 1000);
        last = now;
        context.clearRect(0, 0, width, height);
        flies.forEach((fly) => {
          if (mode === "full") {
            fly.heading += wobble(1.6) * seconds * 2;
            fly.x = (fly.x + Math.cos(fly.heading) * fly.speed * seconds + 1) % 1;
            fly.y += Math.sin(fly.heading) * fly.speed * seconds;
            if (fly.y < 0.3 || fly.y > 0.98) fly.heading = -fly.heading;
          }
          const time = mode === "full" ? now : 0;
          const light = 0.12 + 0.88 * Math.pow(Math.max(0, Math.sin((time / 1000 / fly.blink) * Math.PI * 2 + fly.phase)), 2);
          context.globalAlpha = light;
          context.drawImage(glow, fly.x * width - fly.size / 2, fly.y * height - fly.size / 2, fly.size, fly.size);
        });
        context.globalAlpha = 1;
      }));

      // 2. The tree lines slide apart as the page scrolls, the nearest fastest, so the reader
      // seems to walk along the river.
      const far = document.querySelector(".theme-backdrop .layer-b");
      const middle = document.querySelector(".theme-backdrop .layer-c");
      let scrollFrame = 0;
      const shift = (depth, tile) => -((window.scrollY * depth) % tile);
      function slide() {
        scrollFrame = 0;
        if (!far || !middle) return;
        if (!full()) {
          unstyle(far, "transform");
          unstyle(middle, "transform", "--forest-near");
          return;
        }
        const middleShift = shift(0.1, 1100);
        far.style.transform = `translate3d(${shift(0.04, 900).toFixed(1)}px, 0, 0)`;
        middle.style.transform = `translate3d(${middleShift.toFixed(1)}px, 0, 0)`;
        // The nearest trees sit inside the middle layer, so they move by the difference.
        middle.style.setProperty("--forest-near", `${(shift(0.22, 1300) - middleShift).toFixed(1)}px`);
      }
      const onScroll = () => {
        if (!scrollFrame) scrollFrame = window.requestAnimationFrame(slide);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      slide();
      undo.push(() => {
        window.removeEventListener("scroll", onScroll);
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        if (far) unstyle(far, "transform");
        if (middle) unstyle(middle, "transform", "--forest-near");
      });

      // 3. Leaves keep drifting down behind the page, green, gold and rust, near and far.
      const backdrop = document.querySelector(".theme-backdrop");
      const leaves = new Set();
      const paints = [
        "linear-gradient(135deg, #8a9a4a, #5e6e2c)",
        "linear-gradient(135deg, #c9a24a, #8a6a24)",
        "linear-gradient(135deg, #b0603a, #6e3420)"
      ];
      const dropLeaf = () => {
        if (!full() || document.hidden || !backdrop) return;
        const leaf = document.createElement("span");
        const near = Math.random();
        leaf.className = "forest-leaf";
        leaf.style.left = `${2 + Math.random() * 96}%`;
        leaf.style.setProperty("--leaf-size", `${(9 + near * 12).toFixed(1)}px`);
        leaf.style.setProperty("--leaf-light", (0.5 + near * 0.4).toFixed(2));
        leaf.style.setProperty("--leaf-paint", paints[Math.floor(Math.random() * paints.length)]);
        // Nearer leaves are bigger and fall faster.
        leaf.style.setProperty("--leaf-fall", `${(15 - near * 6 + Math.random() * 2).toFixed(1)}s`);
        leaf.style.setProperty("--leaf-drift", `${wobble(320)}px`);
        leaf.style.setProperty("--leaf-turn", `${wobble(900)}deg`);
        leaf.addEventListener("animationend", () => {
          leaf.remove();
          leaves.delete(leaf);
        });
        backdrop.appendChild(leaf);
        leaves.add(leaf);
      };
      const leafTimer = window.setInterval(dropLeaf, 700);
      for (let i = 0; i < 8; i += 1) window.setTimeout(dropLeaf, 150 + i * 250);
      undo.push(() => {
        window.clearInterval(leafTimer);
        leaves.forEach((leaf) => leaf.remove());
      });

      // 4. The card under the pointer warms, as if a firefly came close.
      undo.push(pointerLight("forest-glow"));
      // 5. Headings rise out of the mist as they come into view.
      undo.push(headingsArrive("forest-rise"));
      // 6. A click sends a few fireflies up from where it landed.
      undo.push(clickBurst("forest-burst", 6, 34));
      // 7. A firefly settles on the chosen project filter.
      undo.push(filterMark("forest-firefly"));

      return () => undo.reverse().forEach((step) => step());
    }
  };

  // What the terminal in the corner of the Cyber theme prints, over and over: a scan, an alert,
  // a honeypot catching a guess, a push. Each line is [kind, text]; the kind picks its colour.
  const terminalLog = [
    ["prompt", "nmap -sV 10.0.2.0/24"],
    ["info", "Nmap scan report for 10.0.2.15"],
    ["out", "22/tcp   open  ssh     OpenSSH 9.6p1"],
    ["out", "80/tcp   open  http    nginx 1.24.0"],
    ["out", "445/tcp  open  microsoft-ds"],
    ["out", "Nmap done: 256 IP addresses (4 hosts up)"],
    ["prompt", "tail -f ossec/logs/alerts.log"],
    ["alert", "** Alert: syslog,sshd,authentication_failed"],
    ["out", "Rule: 5710 (level 5) sshd: non-existent user"],
    ["out", "Src IP: 10.0.2.99"],
    ["alert", "cowrie: login attempt [root/123456] failed"],
    ["good", "[+] alert sent to the SOC channel"],
    ["prompt", "git push origin main"],
    ["out", "Writing objects: 100% (5/5), done."],
    ["out", "   main -> main"],
    ["good", "[+] all checks passed"]
  ];

  const cyber = {
    start() {
      const undo = [];
      const timers = [];
      const full = () => motion() === "full";

      // 0. Characters fall behind the page in scattered columns, dim, each column at its own pace
      // and a cell at a time, its newest character brightest. At Calm they hold still.
      const cellWidth = 14;
      const cellHeight = 18;
      const glyphs = "0123456789abcdef<>/$#{}[]=*:;";
      const pickGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];
      const column = (anywhere) => ({
        x: Math.random(),
        head: anywhere ? Math.floor(Math.random() * 60) : -Math.floor(Math.random() * 30),
        length: 6 + Math.floor(Math.random() * 16),
        // Milliseconds per cell.
        pace: 70 + Math.random() * 150,
        moved: 0,
        trail: Array.from({ length: 24 }, pickGlyph)
      });
      const columns = Array.from({ length: 50 }, () => column(true));
      let lastRain = 0;
      undo.push(backdropCanvas("cyber-rain", (context, width, height, now, mode) => {
        if (mode === "off" || now - lastRain < 50) return;
        const elapsed = Math.min(200, now - lastRain);
        lastRain = now;
        context.clearRect(0, 0, width, height);
        context.font = `13px "IBM Plex Mono", ui-monospace, monospace`;
        context.textBaseline = "top";
        const rows = Math.ceil(height / cellHeight);
        columns.forEach((stream, index) => {
          if (mode === "full") {
            stream.moved += elapsed;
            while (stream.moved > stream.pace) {
              stream.moved -= stream.pace;
              stream.head += 1;
              stream.trail.unshift(pickGlyph());
              stream.trail.pop();
            }
            if (stream.head - stream.length > rows) columns[index] = column(false);
          }
          const x = Math.round((stream.x * width) / cellWidth) * cellWidth;
          for (let i = 0; i < stream.length; i += 1) {
            const row = stream.head - i;
            if (row < 0 || row > rows) continue;
            context.fillStyle = i === 0 ? "rgba(255, 121, 198, 0.6)" : `rgba(189, 147, 249, ${(0.34 * (1 - i / stream.length)).toFixed(3)})`;
            context.fillText(stream.trail[i], x, row * cellHeight);
          }
        });
      }));

      // 1. Headings are typed in, a character at a time, behind a blinking block cursor, when
      // they come into view. The words are clipped rather than added letter by letter, so the
      // page never reflows while they type. Only at full motion; anywhere else they are there.
      const typing = full() ? [...document.querySelectorAll("main :is(h1, h2)")] : [];
      const words = new Map();
      undo.push(splitWords(typing, "cyber-word", (span, word, heading) => {
        if (!words.has(heading)) words.set(heading, []);
        words.get(heading).push(span);
      }));
      undo.push(anchor(typing));
      const carets = [];
      function type(heading) {
        const spans = words.get(heading) || [];
        const caret = document.createElement("span");
        caret.className = "cyber-caret";
        caret.setAttribute("aria-hidden", "true");
        heading.appendChild(caret);
        carets.push(caret);
        // Every character of a monospaced word is the same width, so a word's width over its
        // length is how far one keystroke reveals.
        const plan = spans.map((span) => ({ span, width: span.offsetWidth, letters: span.textContent.length }));
        let word = 0;
        let typed = 0;
        const place = (entry, shown) => {
          caret.style.left = `${entry.span.offsetLeft + shown}px`;
          caret.style.top = `${entry.span.offsetTop}px`;
          caret.style.height = `${entry.span.offsetHeight}px`;
        };
        const timer = window.setInterval(() => {
          const entry = plan[word];
          if (!entry) {
            window.clearInterval(timer);
            heading.classList.add("is-typed");
            return;
          }
          typed += 1;
          const shown = (entry.width / entry.letters) * typed;
          entry.span.style.setProperty("--typed", `${shown.toFixed(1)}px`);
          place(entry, shown);
          if (typed >= entry.letters) {
            entry.span.classList.add("is-typed");
            word += 1;
            typed = 0;
          }
        }, 38);
        timers.push(timer);
        if (plan[0]) place(plan[0], 0);
      }
      const seen = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          seen.unobserve(entry.target);
          type(entry.target);
        });
      }, { threshold: 0.3 });
      typing.forEach((heading) => seen.observe(heading));
      undo.push(() => {
        seen.disconnect();
        carets.forEach((caret) => caret.remove());
        typing.forEach((heading) => unmark(heading, "is-typed"));
      });

      // 2. A dim terminal in the bottom corner of the screen, printing a line every second or
      // two. At Calm it shows its last screenful and prints nothing new.
      const backdrop = document.querySelector(".theme-backdrop");
      if (backdrop) {
        const log = document.createElement("div");
        log.className = "cyber-log";
        log.setAttribute("aria-hidden", "true");
        backdrop.appendChild(log);
        let next = 0;
        const print = () => {
          const [kind, text] = terminalLog[next % terminalLog.length];
          next += 1;
          const line = document.createElement("div");
          line.className = `cyber-line cyber-${kind}`;
          if (kind === "prompt") {
            const prompt = document.createElement("span");
            prompt.className = "cyber-prompt";
            prompt.textContent = "abdullah@kali:~$ ";
            line.appendChild(prompt);
          }
          line.appendChild(document.createTextNode(text));
          log.appendChild(line);
          while (log.childElementCount > 11) log.firstElementChild.remove();
        };
        for (let i = 0; i < 9; i += 1) print();
        timers.push(window.setInterval(() => {
          if (full() && !document.hidden) print();
        }, 1700));
        undo.push(() => log.remove());
      }

      // 3. The card under the pointer is outlined in magenta and marked [+], as a found host is.
      undo.push(pointerLight("cyber-frame"));
      // 4. A click leaves a blinking [*] where it landed.
      undo.push(clickBurst("cyber-burst", 1, 0));
      // 5. Project filters become checkboxes, [x] on the chosen one.
      undo.push(filterMark("cyber-check"));

      return () => {
        timers.forEach((timer) => window.clearInterval(timer));
        undo.reverse().forEach((step) => step());
      };
    }
  };

  const ember = {
    start() {
      const undo = [];

      // 1. Embers rise from the bottom of the screen, swaying and flickering, cooling from
      // yellow to deep orange as they climb. At Calm they hold where they are.
      const glow = document.createElement("canvas");
      glow.width = 24;
      glow.height = 24;
      const glowContext = glow.getContext("2d");
      const halo = glowContext.createRadialGradient(12, 12, 0, 12, 12, 12);
      halo.addColorStop(0, "rgba(255, 240, 200, 1)");
      halo.addColorStop(0.2, "rgba(255, 190, 80, 0.95)");
      halo.addColorStop(0.5, "rgba(255, 110, 30, 0.35)");
      halo.addColorStop(1, "rgba(255, 80, 20, 0)");
      glowContext.fillStyle = halo;
      glowContext.fillRect(0, 0, 24, 24);
      const spark = (anywhere) => ({
        x: Math.random(),
        y: anywhere ? Math.random() : 1.02 + Math.random() * 0.1,
        // Fractions of the screen height per second.
        rise: 0.05 + Math.random() * 0.1,
        sway: 0.004 + Math.random() * 0.014,
        swayRate: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        size: 7 + Math.pow(Math.random(), 2) * 18,
        flicker: 4 + Math.random() * 8
      });
      const sparks = Array.from({ length: 140 }, () => spark(true));
      let last = performance.now();
      undo.push(backdropCanvas("ember-sparks", (context, width, height, now, mode) => {
        const seconds = Math.min(0.1, (now - last) / 1000);
        last = now;
        context.clearRect(0, 0, width, height);
        sparks.forEach((item, index) => {
          if (mode === "full") {
            item.y -= item.rise * seconds;
            if (item.y < -0.05) sparks[index] = spark(false);
          }
          const time = mode === "full" ? now / 1000 : 0;
          const x = (item.x + Math.sin(time * item.swayRate + item.phase) * item.sway) * width;
          // Brightest low down, dying out as it climbs, with a flicker of its own.
          const life = Math.max(0, Math.min(1, item.y * 1.15));
          const light = life * (0.65 + 0.35 * Math.sin(time * item.flicker + item.phase));
          if (light <= 0.02) return;
          context.globalAlpha = light;
          const size = item.size * (0.5 + life * 0.5);
          context.drawImage(glow, x - size / 2, item.y * height - size / 2, size, size);
        });
        context.globalAlpha = 1;
      }));

      // 2. Headings arrive hot, rising into place while a flare behind them dies down.
      const kindled = motion() === "full" ? [...document.querySelectorAll("main :is(h1, h2)")] : [];
      undo.push(anchor(kindled));
      undo.push(headingsArrive("ember-kindle"));
      // 3. The card under the pointer warms from below.
      undo.push(pointerLight("ember-heat"));
      // 4. A click throws a shower of sparks.
      undo.push(clickBurst("ember-burst", 10, 46));
      // 5. A coal glows on the chosen project filter.
      undo.push(filterMark("ember-coal"));

      return () => undo.reverse().forEach((step) => step());
    }
  };

  const cassie = {
    start() {
      const undo = [];
      const timers = [];
      const full = () => motion() === "full";

      // 1. Hearts, bows and sparkles drift up behind the page, each turning a little as it goes;
      // the sparkles twinkle where they are. At Calm everything holds still.
      const shapes = ["heart", "heart", "heart", "bow", "sparkle", "sparkle"];
      const tints = ["255, 90, 168", "255, 156, 201", "255, 184, 216", "255, 214, 234"];
      const float = (anywhere) => ({
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        x: Math.random(),
        y: anywhere ? Math.random() : 1.05,
        rise: 0.02 + Math.random() * 0.04,
        sway: 0.006 + Math.random() * 0.014,
        swayRate: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        size: 7 + Math.random() * 12,
        light: 0.3 + Math.random() * 0.45,
        tint: tints[Math.floor(Math.random() * tints.length)]
      });
      const floats = Array.from({ length: 60 }, () => float(true));
      // The pointer pushes the floats aside as it passes, and a click on one pops it.
      let aim = null;
      const push = (event) => { aim = { x: event.clientX, y: event.clientY }; };
      const pop = (event) => {
        const canvas = document.querySelector("canvas.cassie-floats");
        if (!canvas || event.button !== 0) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const hit = floats.findIndex((item) => item.shape !== "sparkle" && Math.hypot((item.x + (item.nudgeX || 0)) * width - event.clientX, item.y * height - event.clientY) < item.size + 10);
        if (hit >= 0) floats[hit] = float(false);
      };
      document.addEventListener("pointermove", push, { passive: true });
      document.addEventListener("pointerdown", pop, { passive: true });
      undo.push(() => {
        document.removeEventListener("pointermove", push);
        document.removeEventListener("pointerdown", pop);
      });
      function draw(context, item, x, y, light) {
        const s = item.size;
        context.fillStyle = `rgba(${item.tint}, ${light.toFixed(3)})`;
        context.beginPath();
        if (item.shape === "heart") {
          context.moveTo(x, y + s * 0.45);
          context.bezierCurveTo(x - s * 0.6, y + s * 0.05, x - s * 0.5, y - s * 0.45, x, y - s * 0.15);
          context.bezierCurveTo(x + s * 0.5, y - s * 0.45, x + s * 0.6, y + s * 0.05, x, y + s * 0.45);
        } else if (item.shape === "bow") {
          context.moveTo(x, y);
          context.lineTo(x - s * 0.6, y - s * 0.35);
          context.lineTo(x - s * 0.6, y + s * 0.35);
          context.closePath();
          context.moveTo(x, y);
          context.lineTo(x + s * 0.6, y - s * 0.35);
          context.lineTo(x + s * 0.6, y + s * 0.35);
          context.closePath();
          context.moveTo(x + s * 0.16, y);
          context.arc(x, y, s * 0.16, 0, Math.PI * 2);
        } else {
          const k = s * 0.14;
          const r = s * 0.5;
          context.moveTo(x, y - r);
          context.lineTo(x + k, y - k);
          context.lineTo(x + r, y);
          context.lineTo(x + k, y + k);
          context.lineTo(x, y + r);
          context.lineTo(x - k, y + k);
          context.lineTo(x - r, y);
          context.lineTo(x - k, y - k);
          context.closePath();
        }
        context.fill();
      }
      let last = performance.now();
      undo.push(backdropCanvas("cassie-floats", (context, width, height, now, mode) => {
        const seconds = Math.min(0.1, (now - last) / 1000);
        last = now;
        context.clearRect(0, 0, width, height);
        const time = mode === "full" ? now / 1000 : 0;
        floats.forEach((item, index) => {
          if (mode === "full" && item.shape !== "sparkle") {
            item.y -= item.rise * seconds;
            if (item.y < -0.05) floats[index] = float(false);
          }
          // Pushed away from a pointer within 110px, drifting back once it has gone.
          item.nudgeX = (item.nudgeX || 0) * 0.94;
          if (mode === "full" && aim) {
            const dx = (item.x + item.nudgeX) * width - aim.x;
            const dy = item.y * height - aim.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 110 && distance > 0) {
              item.nudgeX += ((dx / distance) * (110 - distance) * 0.012) / width * 6;
              item.y += ((dy / distance) * (110 - distance) * 0.012) / height * 6;
            }
          }
          const x = (item.x + item.nudgeX + Math.sin(time * item.swayRate + item.phase) * item.sway) * width;
          const light = item.shape === "sparkle" ? item.light * (0.4 + 0.6 * Math.abs(Math.sin(time * item.swayRate * 2 + item.phase))) : item.light;
          draw(context, item, x, item.y * height, light);
        });
      }));

      // 2. Hello Cassie peeks up over the bottom of the screen. The eyes follow the pointer and
      // blink now and then, and at full motion the cat ducks down and pops up again once in a
      // while. At Calm the cat simply sits there; at Off it is not shown.
      const peek = document.createElement("div");
      peek.className = "cassie-peek";
      peek.setAttribute("aria-hidden", "true");
      const pupils = ["is-left", "is-right"].map((side) => {
        const pupil = document.createElement("span");
        pupil.className = `cassie-pupil ${side}`;
        const lid = document.createElement("span");
        lid.className = `cassie-lid ${side}`;
        peek.append(pupil, lid);
        return pupil;
      });
      const paw = document.createElement("span");
      paw.className = "cassie-paw";
      peek.appendChild(paw);
      body.appendChild(peek);

      // Petting: a click closes the cat's eyes, it wiggles, and a purr floats up.
      const pet = () => {
        peek.classList.remove("is-petted");
        void peek.offsetWidth;
        peek.classList.add("is-petted");
        const purr = document.createElement("span");
        purr.className = "cassie-purr";
        purr.textContent = "purr";
        peek.appendChild(purr);
        timers.push(window.setTimeout(() => {
          purr.remove();
          peek.classList.remove("is-petted");
        }, 1500));
      };
      peek.addEventListener("click", pet);

      // A pointer that comes close gets batted at, once in a while rather than every frame.
      let lastBat = 0;
      const bat = (event) => {
        if (!full() || !peek.classList.contains("is-up") || peek.classList.contains("is-petted")) return;
        const box = peek.getBoundingClientRect();
        const near = Math.hypot(event.clientX - (box.left + box.width / 2), event.clientY - (box.top + box.height / 2)) < 170;
        const now = performance.now();
        if (!near || now - lastBat < 900) return;
        lastBat = now;
        peek.classList.remove("is-batting");
        void peek.offsetWidth;
        peek.classList.add("is-batting");
      };
      document.addEventListener("pointermove", bat, { passive: true });
      undo.push(() => document.removeEventListener("pointermove", bat));
      timers.push(window.setTimeout(() => peek.classList.add("is-up"), full() ? 1200 : 0));
      let lookFrame = 0;
      let pointer = null;
      const look = (event) => {
        pointer = event;
        if (lookFrame || !full()) return;
        lookFrame = window.requestAnimationFrame(() => {
          lookFrame = 0;
          const box = peek.getBoundingClientRect();
          pupils.forEach((pupil) => {
            const eye = pupil.getBoundingClientRect();
            const dx = pointer.clientX - (eye.left + eye.width / 2);
            const dy = pointer.clientY - (eye.top + eye.height / 2);
            const distance = Math.hypot(dx, dy) || 1;
            // At most a few pixels, scaled to the drawing, so the pupil stays inside the eye.
            const reach = box.width * 0.022;
            pupil.style.setProperty("--look-x", `${((dx / distance) * reach).toFixed(1)}px`);
            pupil.style.setProperty("--look-y", `${((dy / distance) * reach).toFixed(1)}px`);
          });
        });
      };
      document.addEventListener("pointermove", look, { passive: true });
      const blink = () => {
        if (full() && !document.hidden) {
          peek.classList.remove("is-blinking");
          void peek.offsetWidth;
          peek.classList.add("is-blinking");
        }
        timers.push(window.setTimeout(blink, 2500 + Math.random() * 3500));
      };
      timers.push(window.setTimeout(blink, 2500));
      timers.push(window.setInterval(() => {
        if (!full() || document.hidden) return;
        peek.classList.remove("is-up");
        timers.push(window.setTimeout(() => peek.classList.add("is-up"), 2200));
      }, 26000));
      undo.push(() => {
        document.removeEventListener("pointermove", look);
        if (lookFrame) window.cancelAnimationFrame(lookFrame);
        peek.remove();
      });

      // 3. Hello Cassie asleep in the corner of the footer.
      const footer = document.querySelector(".site-footer-inner");
      if (footer) {
        const unanchor = anchor([footer]);
        const sleeper = document.createElement("span");
        sleeper.className = "cassie-sleep";
        sleeper.setAttribute("aria-hidden", "true");
        ["is-left", "is-right"].forEach((side) => {
          const eye = document.createElement("span");
          eye.className = `cassie-sleep-eye ${side}`;
          sleeper.appendChild(eye);
        });
        footer.appendChild(sleeper);
        // The pointer wakes the cat; a click makes it stretch; left alone, it dozes off again.
        let doze = 0;
        const wake = () => {
          window.clearTimeout(doze);
          sleeper.classList.add("is-awake");
        };
        const rest = () => {
          doze = window.setTimeout(() => sleeper.classList.remove("is-awake"), 1500);
          timers.push(doze);
        };
        const stretch = () => {
          wake();
          sleeper.classList.remove("is-stretching");
          void sleeper.offsetWidth;
          sleeper.classList.add("is-stretching");
          timers.push(window.setTimeout(() => sleeper.classList.remove("is-stretching"), 850));
        };
        sleeper.addEventListener("pointerenter", wake);
        sleeper.addEventListener("pointerleave", rest);
        sleeper.addEventListener("click", stretch);
        undo.push(() => {
          sleeper.remove();
          unanchor();
        });
      }

      // 4. Headings pop into place with a little bounce.
      undo.push(headingsArrive("cassie-pop"));
      // 5. The card under the pointer glows pink and a bow pops onto its corner.
      undo.push(pointerLight("cassie-glow"));
      // 6. A click bursts into hearts.
      undo.push(clickBurst("cassie-burst", 8, 40));
      // 7. The chosen project filter wears a bow.
      undo.push(filterMark("cassie-bow"));

      return () => {
        timers.forEach((timer) => { window.clearInterval(timer); window.clearTimeout(timer); });
        undo.reverse().forEach((step) => step());
      };
    }
  };

  const lives = { paper, space, forest, cyber, ember, cassie };
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
