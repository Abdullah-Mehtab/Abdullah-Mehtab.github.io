// ABOUTME: Drives the cinematic chapter chrome: reading progress, the section rail, and act marks.
// ABOUTME: Enhancement only. Every element it touches is already legible before this file runs.
(function () {
  "use strict";

  const body = document.body;
  if (!body || !body.classList.contains("film")) return;

  const main = document.querySelector("main");
  // Acts wrap their section in a pinning element, so a plain child selector would miss them.
  const sections = main
    ? Array.from(main.querySelectorAll(":scope > section, :scope > .act > section"))
    : [];
  if (sections.length === 0) return;

  // Sections carry no titles of their own, so the rail is labelled from whatever heading each
  // one already contains. A chapter that adds a section gets a rail entry without editing this.
  function labelFor(section, index) {
    const heading = section.querySelector("h1, h2, h3");
    const text = heading ? heading.textContent.trim().replace(/\s+/g, " ") : "";
    if (!text) return `Section ${index + 1}`;
    return text.length > 42 ? `${text.slice(0, 41)}…` : text;
  }

  const chrome = document.createElement("div");
  chrome.className = "film-chrome";
  chrome.innerHTML =
    '<span class="film-chrome-act" data-film-act></span>' +
    '<span class="film-chrome-progress"><span data-film-progress>000</span>%</span>';

  const rail = document.createElement("nav");
  rail.className = "film-rail";
  rail.setAttribute("aria-label", "Chapter sections");

  const dots = sections.map(function (section, index) {
    if (!section.id) section.id = `film-section-${index + 1}`;
    const link = document.createElement("a");
    link.className = "film-rail-dot";
    link.href = `#${section.id}`;
    link.innerHTML = `<span class="film-rail-label">${labelFor(section, index)}</span>`;
    link.setAttribute("aria-label", labelFor(section, index));
    rail.appendChild(link);
    return link;
  });

  body.appendChild(chrome);
  body.appendChild(rail);

  const actEl = chrome.querySelector("[data-film-act]");
  const progressEl = chrome.querySelector("[data-film-progress]");

  let ticking = false;

  function update() {
    ticking = false;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    const percent = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    progressEl.textContent = String(percent).padStart(3, "0");
    body.style.setProperty("--film-progress", `${percent}%`);

    // The stage floor advances with the reader. Wrapping at one grid cell keeps the travel
    // seamless however far the page runs, so the space never reaches an end.
    body.style.setProperty("--film-depth", String((window.scrollY * 0.45) % 110));

    // Active section is the last one whose top has passed the upper third of the viewport,
    // which matches where a reader's attention actually sits.
    const line = window.innerHeight / 3;
    let activeIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) activeIndex = i;
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("is-active", i === activeIndex);
    }
    actEl.textContent = labelFor(sections[activeIndex], activeIndex);
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
