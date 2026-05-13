(function () {
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

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    setupMobileNav();
    setupFilters();
    setupMediaFallbacks();
    setupYear();
    setupProofLine();
    setupReveal();
    setupCounters();
  });
})();
