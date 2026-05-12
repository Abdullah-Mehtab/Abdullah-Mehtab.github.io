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
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        cards.forEach((card) => {
          const categories = (card.dataset.categories || "").split(" ");
          card.hidden = filter !== "all" && !categories.includes(filter);
        });
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
    setupYear();
    setupProofLine();
  });
})();
