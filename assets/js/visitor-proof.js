(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const storageKey = "abdullah-portfolio-visitor-proof:";
  let supabaseClientPromise = null;

  function clean(value, maxLength) {
    return String(value || "")
      .normalize("NFKC")
      .replace(/[<>`"']/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  async function getSupabase() {
    if (!config.visitorProofEnabled || !config.supabaseUrl || !config.supabaseAnonKey) return null;
    if (!supabaseClientPromise) {
      supabaseClientPromise = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm")
        .then(({ createClient }) => createClient(config.supabaseUrl, config.supabaseAnonKey))
        .catch(() => null);
    }
    return supabaseClientPromise;
  }

  function getPageSlug() {
    const file = (window.location.pathname.split("/").pop() || "index.html").replace(/\.html$/i, "");
    return clean(file || "home", 120);
  }

  function getSourceToken() {
    const params = new URLSearchParams(window.location.search);
    return clean(params.get("proof") || params.get("source") || params.get("utm_source") || "", 120);
  }

  async function recordVisit() {
    const pageSlug = getPageSlug();
    const todayKey = storageKey + pageSlug + ":" + new Date().toISOString().slice(0, 10);
    try {
      if (sessionStorage.getItem(todayKey)) return;
      sessionStorage.setItem(todayKey, "1");
    } catch (_) {
      // Storage can fail in strict privacy modes; analytics should never break the page.
    }

    const supabase = await getSupabase();
    if (!supabase) return;

    try {
      await supabase.from("visitor_events").insert({
        page_slug: pageSlug,
        event_type: "page_view",
        theme: clean(document.body.dataset.theme || "", 80),
        cursor: clean(document.body.dataset.cursor || "", 80),
        motion: clean(document.body.dataset.motionPreference || document.body.dataset.motion || "", 80),
        referrer: clean(document.referrer, 300),
        source_token: getSourceToken()
      });
    } catch (_) {
      // Visitor proof should be invisible if the backend is unavailable.
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(recordVisit, { timeout: 8000 });
      } else {
        recordVisit();
      }
    }, 6000);
  });
})();
