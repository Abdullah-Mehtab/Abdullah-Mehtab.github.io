(function () {
  const themeOptions = [
    ["professional", "Professional"],
    ["dark", "Dark Mode"],
    ["light", "Light Mode"],
    ["forest", "Forest Mode"],
    ["space", "Space Mode"],
    ["terminal", "Terminal Mode"],
    ["cyber", "Cyber Mode"],
    ["ocean", "Ocean Mode"],
    ["ember", "Ember Mode"],
    ["arctic", "Arctic Mode"],
    ["royal", "Royal Mode"],
    ["noir", "Noir Mode"],
    ["blueprint", "Blueprint Mode"],
    ["aurora", "Aurora Mode"],
    ["rain", "Rain Mode"],
    ["signal", "Signal Mode"],
    ["lab", "Lab Mode"],
    ["paper", "Paper Mode"]
  ];

  const cursorOptions = [
    ["spotlight", "Spotlight"],
    ["comet", "Comet Trail"],
    ["sparks", "Sparks"],
    ["ribbon", "Ribbon"],
    ["reticle", "Reticle"],
    ["embers", "Embers"],
    ["plasma", "Plasma Wake"],
    ["ink", "Ink Ripple"],
    ["constellation", "Constellation"],
    ["scanner", "Scanner"],
    ["orbit", "Orbit"],
    ["snow", "Snowfall"],
    ["pulse", "Pulse Rings"],
    ["off", "Off"]
  ];

  const motionOptions = [
    ["auto", "Auto"],
    ["full", "Full"],
    ["calm", "Calm"],
    ["off", "Off"]
  ];

  const storageKeys = {
    theme: "abdullah-portfolio-theme",
    cursor: "abdullah-portfolio-cursor",
    motion: "abdullah-portfolio-motion"
  };

  function readStoredValue(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeStoredValue(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {
      // Ignore private browsing/storage failures.
    }
  }

  function setActiveNav() {
    const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href === file || (file === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  function setupMobileNav() {
    const button = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-mobile-nav]");
    if (!button || !menu) return;
    button.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function setupHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 80);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function ensureBackdrop() {
    if (document.querySelector(".theme-backdrop")) return;

    const backdrop = document.createElement("div");
    backdrop.className = "theme-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.innerHTML = `
      <span class="theme-layer layer-a"></span>
      <span class="theme-layer layer-b"></span>
      <span class="theme-layer layer-c"></span>
    `;

    const cursorEffects = document.createElement("div");
    cursorEffects.className = "cursor-effects";
    cursorEffects.setAttribute("aria-hidden", "true");
    cursorEffects.innerHTML = '<span class="cursor-reticle"></span>';

    document.body.prepend(backdrop);
    document.body.append(cursorEffects);
  }

  function setupStyleControls() {
    ensureBackdrop();

    const themeSelects = document.querySelectorAll("[data-theme-select]");
    const cursorSelects = document.querySelectorAll("[data-cursor-select]");
    const motionSelects = document.querySelectorAll("[data-motion-select]");
    const resetButtons = document.querySelectorAll("[data-style-reset]");
    const styleControls = document.querySelectorAll("[data-style-control]");
    const styleToggles = document.querySelectorAll("[data-style-toggle]");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactMotionQuery = window.matchMedia("(max-width: 760px)");

    const savedTheme = themeOptions.some(([value]) => value === readStoredValue(storageKeys.theme, "dark"))
      ? readStoredValue(storageKeys.theme, "dark")
      : "dark";
    const savedCursor = cursorOptions.some(([value]) => value === readStoredValue(storageKeys.cursor, "spotlight"))
      ? readStoredValue(storageKeys.cursor, "spotlight")
      : "spotlight";
    const savedMotion = motionOptions.some(([value]) => value === readStoredValue(storageKeys.motion, "auto"))
      ? readStoredValue(storageKeys.motion, "auto")
      : "auto";

    function fillSelect(select, options) {
      if (select.options.length) return;
      options.forEach(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
      });
    }

    function applyTheme(value) {
      document.body.dataset.theme = value;
      themeSelects.forEach((select) => {
        select.value = value;
      });
      writeStoredValue(storageKeys.theme, value);
    }

    function applyCursor(value) {
      document.body.dataset.cursor = value;
      cursorSelects.forEach((select) => {
        select.value = value;
      });
      writeStoredValue(storageKeys.cursor, value);
    }

    function getEffectiveMotion(value) {
      if (value !== "auto") return value;
      if (motionQuery.matches) return "off";
      return compactMotionQuery.matches ? "calm" : "full";
    }

    function applyMotion(value) {
      document.body.dataset.motionPreference = value;
      document.body.dataset.motion = getEffectiveMotion(value);
      motionSelects.forEach((select) => {
        select.value = value;
      });
      writeStoredValue(storageKeys.motion, value);
    }

    themeSelects.forEach((select) => {
      fillSelect(select, themeOptions);
      select.addEventListener("change", () => applyTheme(select.value));
    });

    cursorSelects.forEach((select) => {
      fillSelect(select, cursorOptions);
      select.addEventListener("change", () => applyCursor(select.value));
    });

    motionSelects.forEach((select) => {
      fillSelect(select, motionOptions);
      select.addEventListener("change", () => applyMotion(select.value));
    });

    resetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyTheme("dark");
        applyCursor("spotlight");
        applyMotion("auto");
      });
    });

    const syncAutoMotion = () => {
      const preference = document.body.dataset.motionPreference || "auto";
      if (preference === "auto") applyMotion(preference);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", syncAutoMotion);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(syncAutoMotion);
    }

    if (compactMotionQuery.addEventListener) {
      compactMotionQuery.addEventListener("change", syncAutoMotion);
    } else if (compactMotionQuery.addListener) {
      compactMotionQuery.addListener(syncAutoMotion);
    }

    styleToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const control = toggle.closest("[data-style-control]");
        if (!control) return;
        const isOpen = control.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.addEventListener("click", (event) => {
      styleControls.forEach((control) => {
        if (control.contains(event.target)) return;
        control.classList.remove("is-open");
        const toggle = control.querySelector("[data-style-toggle]");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });

    applyTheme(savedTheme);
    applyCursor(savedCursor);
    applyMotion(savedMotion);
  }

  function setupFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-categories]");
    const status = document.querySelector("[data-filter-status]");
    if (!buttons.length || !cards.length) return;

    const labels = {
      all: "all projects",
      security: "security projects",
      devops: "DevOps projects",
      fullstack: "FullStack projects",
      ml: "AI/ML projects",
      iot: "IoT projects",
      early: "early and fun projects"
    };

    function applyFilter(filter) {
      let visible = 0;

      buttons.forEach((item) => {
        const isActive = item.dataset.filter === filter;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      cards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(/\s+/).filter(Boolean);
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-filtered-out", !shouldShow);
        card.setAttribute("aria-hidden", String(!shouldShow));
        if (shouldShow) visible += 1;
      });

      if (status) {
        status.textContent = filter === "all"
          ? `Showing all ${visible} projects.`
          : `Showing ${visible} ${labels[filter] || "projects"}.`;
      }
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        applyFilter(button.dataset.filter || "all");
      });
    });

    applyFilter("all");
  }

  function setupMediaFallbacks() {
    document.querySelectorAll(".work-card > img").forEach((image) => {
      image.addEventListener("error", () => {
        const placeholder = document.createElement("div");
        placeholder.className = "work-placeholder";
        placeholder.setAttribute("role", "img");
        placeholder.setAttribute("aria-label", "Project image placeholder");
        placeholder.innerHTML = "<span>Image missing</span><strong>Project details still matter</strong>";
        image.replaceWith(placeholder);
      }, { once: true });
    });
  }

  function setupLiteVideos() {
    document.querySelectorAll("[data-video-id]").forEach((video) => {
      const button = video.querySelector(".video-play");
      if (!button) return;

      button.addEventListener("click", () => {
        const videoId = String(video.dataset.videoId || "").replace(/[^\w-]/g, "");
        if (!videoId) return;

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.title = video.dataset.videoTitle || button.getAttribute("aria-label") || "Project video";
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        video.classList.add("is-playing");
        video.replaceChildren(iframe);
        iframe.focus();
      });
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function setupProofLine() {
    const target = document.querySelector("[data-proof-line]");
    if (!target) return;
    const lines = [
      "Security mindset, builder instincts, and a public trail of projects across domains.",
      "Computer science, offensive security, DevOps, AI/ML, IoT, and practical systems work.",
      "Broad technical range with a preference for work that can be tested, shipped, and explained clearly.",
      "A portfolio for projects, proof, and the occasional line that sounds like a real person wrote it."
    ];
    target.textContent = lines[Math.floor(Math.random() * lines.length)];
  }

  function setupReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });

    targets.forEach((target, index) => {
      target.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(target);
    });
  }

  function setupCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(counter) {
      const target = Number(counter.dataset.count || 0);
      const start = performance.now();
      const duration = 850;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function setupPointerEffects() {
    let raf = 0;
    let lastTrail = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.25;
    const effects = document.querySelector(".cursor-effects");

    function updatePointer() {
      raf = 0;
      document.documentElement.style.setProperty("--mouse-x", `${pointerX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${pointerY}px`);
    }

    const noTrailModes = new Set(["spotlight", "reticle", "off"]);
    const jitterByMode = {
      sparks: 28,
      embers: 28,
      constellation: 22,
      snow: 44
    };
    const delayByMode = {
      ribbon: 16,
      plasma: 18,
      scanner: 22,
      orbit: 26,
      pulse: 30,
      constellation: 32,
      snow: 42
    };
    const lifespanByMode = {
      scanner: 680,
      ribbon: 780,
      comet: 850,
      sparks: 900,
      pulse: 940,
      ink: 980,
      plasma: 1050,
      orbit: 1080,
      embers: 1150,
      constellation: 1220,
      snow: 1450
    };

    function createTrailPoint(x, y, mode) {
      if (!effects || noTrailModes.has(mode)) return;

      const point = document.createElement("span");
      point.className = "cursor-point";

      const jitter = jitterByMode[mode] || 0;
      if (jitter) {
        x += (Math.random() - 0.5) * jitter;
        y += (Math.random() - 0.5) * jitter;
      }

      if (mode === "orbit") {
        point.innerHTML = "<span></span><span></span>";
      }

      point.style.left = `${x}px`;
      point.style.top = `${y}px`;
      point.style.setProperty("--cursor-rotate", `${Math.round(Math.random() * 360)}deg`);
      point.style.setProperty("--cursor-scale", (0.72 + Math.random() * 0.58).toFixed(2));
      effects.appendChild(point);

      window.setTimeout(() => point.remove(), lifespanByMode[mode] || 850);
    }

    window.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!raf) raf = requestAnimationFrame(updatePointer);

      const now = performance.now();
      const mode = document.body.dataset.cursor || "spotlight";
      const motion = document.body.dataset.motion || "full";
      if (motion === "off") return;

      const delayMultiplier = motion === "calm" ? 2.6 : 1;
      const delay = (delayByMode[mode] || 34) * delayMultiplier;
      if (now - lastTrail > delay) {
        lastTrail = now;
        createTrailPoint(pointerX, pointerY, mode);
      }
    }, { passive: true });
  }

  function setupTiltCards() {
    const cards = document.querySelectorAll(".profile-panel, .panel, .work-card, .service-card, .skill-item, .stat-card, .todo-column, .download-card, .timeline-card");
    cards.forEach((card) => {
      card.classList.add("kinetic-card");

      card.addEventListener("pointermove", (event) => {
        const motion = document.body.dataset.motion || "full";
        if (motion === "off") return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const strength = motion === "calm" ? 0.42 : 1;
        card.classList.add("is-tilting");
        card.style.setProperty("--tilt-x", `${(-y * 5 * strength).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 7 * strength).toFixed(2)}deg`);
        card.style.setProperty("--lift", motion === "calm" ? "-1px" : "-2px");
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
        card.style.removeProperty("--lift");
      });
    });
  }

  function setupTimelineCarousel() {
    const track = document.querySelector("[data-timeline-track]");
    const previous = document.querySelector("[data-timeline-prev]");
    const next = document.querySelector("[data-timeline-next]");
    if (!track || !previous || !next) return;

    function scrollByCard(direction) {
      const firstCard = track.querySelector(".timeline-item");
      const distance = firstCard ? firstCard.getBoundingClientRect().width + 18 : 380;
      track.scrollBy({ left: direction * distance, behavior: "smooth" });
    }

    previous.addEventListener("click", () => scrollByCard(-1));
    next.addEventListener("click", () => scrollByCard(1));
  }

  function setupOffscreenAnimationPauses() {
    const animatedBlocks = document.querySelectorAll(".loop-wrapper");
    if (!animatedBlocks.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-animation-paused", !entry.isIntersecting);
      });
    }, { rootMargin: "140px 0px", threshold: 0 });

    animatedBlocks.forEach((block) => {
      block.classList.add("is-animation-paused");
      observer.observe(block);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    setupMobileNav();
    setupHeaderScroll();
    setupStyleControls();
    setupFilters();
    setupMediaFallbacks();
    setupLiteVideos();
    setupYear();
    setupProofLine();
    setupReveal();
    setupCounters();
    setupPointerEffects();
    setupTiltCards();
    setupTimelineCarousel();
    setupOffscreenAnimationPauses();
  });
})();
