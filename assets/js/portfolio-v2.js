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
      classic: "older and fun projects"
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
      "If you read this line in an interview, I know you actually opened the site.",
      "Still motivated by money. Also curiosity, impact, and occasionally spite-driven debugging.",
      "Built by a human. If it looks too clean later, please accuse me immediately.",
      "The footer truck survived the redesign. Some institutions deserve protection."
    ];
    target.textContent = lines[Math.floor(Math.random() * lines.length)];
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    setupMobileNav();
    setupFilters();
    setupMediaFallbacks();
    setupYear();
    setupProofLine();
  });
})();
