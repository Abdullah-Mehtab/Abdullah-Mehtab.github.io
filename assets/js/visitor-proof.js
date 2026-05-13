(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const storageKey = "abdullah-portfolio-visitor-proof:";
  const visitorKey = storageKey + "visitor-id";
  const sessionKey = storageKey + "session-id";
  const fingerprintVersion = "browser-v1";
  let supabaseClientPromise = null;

  function clean(value, maxLength) {
    return String(value || "")
      .normalize("NFKC")
      .replace(/[<>`"']/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function randomId(prefix) {
    const id = window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    return `${prefix}_${id}`;
  }

  function readStorage(storage, key) {
    try {
      return storage.getItem(key);
    } catch (_) {
      return "";
    }
  }

  function writeStorage(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch (_) {
      // Analytics should not break strict privacy or storage-restricted sessions.
    }
  }

  function getPersistentId() {
    let id = readStorage(localStorage, visitorKey);
    if (!id) {
      id = randomId("visitor");
      writeStorage(localStorage, visitorKey, id);
    }
    return clean(id, 80);
  }

  function getSessionId() {
    let id = readStorage(sessionStorage, sessionKey);
    if (!id) {
      id = randomId("session");
      writeStorage(sessionStorage, sessionKey, id);
    }
    return clean(id, 80);
  }

  async function hashText(value) {
    const text = String(value || "");
    if (!text) return "";

    if (window.crypto && crypto.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(text);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }

    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash >>> 0).toString(16);
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

  function getFingerprintParts() {
    const nav = window.navigator || {};
    const scr = window.screen || {};
    return {
      userAgent: nav.userAgent || "",
      language: nav.language || "",
      languages: Array.isArray(nav.languages) ? nav.languages.join(",") : "",
      platform: nav.platform || "",
      hardwareConcurrency: nav.hardwareConcurrency || "",
      deviceMemory: nav.deviceMemory || "",
      maxTouchPoints: nav.maxTouchPoints || 0,
      cookieEnabled: nav.cookieEnabled === true ? "1" : "0",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${scr.width || 0}x${scr.height || 0}x${scr.colorDepth || 0}`,
      viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
      pixelRatio: window.devicePixelRatio || 1
    };
  }

  async function buildPayload() {
    const parts = getFingerprintParts();
    const fingerprintSource = [
      fingerprintVersion,
      parts.userAgent,
      parts.language,
      parts.languages,
      parts.platform,
      parts.hardwareConcurrency,
      parts.deviceMemory,
      parts.maxTouchPoints,
      parts.cookieEnabled,
      parts.timezone,
      parts.screen,
      parts.pixelRatio
    ].join("|");

    return {
      page_slug: getPageSlug(),
      event_type: "page_view",
      theme: clean(document.body.dataset.theme || "", 80),
      cursor: clean(document.body.dataset.cursor || "", 80),
      motion: clean(document.body.dataset.motionPreference || document.body.dataset.motion || "", 80),
      referrer: clean(document.referrer, 300),
      source_token: getSourceToken(),
      visitor_id: getPersistentId(),
      session_id: getSessionId(),
      fingerprint_hash: await hashText(fingerprintSource),
      fingerprint_version: fingerprintVersion,
      user_agent_hash: await hashText(parts.userAgent),
      screen_size: clean(parts.screen, 40),
      viewport_size: clean(parts.viewport, 40),
      timezone: clean(parts.timezone, 80),
      language: clean(parts.language, 40),
      platform: clean(parts.platform, 80)
    };
  }

  function legacyPayload(payload) {
    return {
      page_slug: payload.page_slug,
      event_type: payload.event_type,
      theme: payload.theme,
      cursor: payload.cursor,
      motion: payload.motion,
      referrer: payload.referrer,
      source_token: payload.source_token
    };
  }

  async function recordViaEdge(payload) {
    const endpoint = config.visitorProofEndpoint
      || (config.supabaseUrl ? `${config.supabaseUrl.replace(/\/$/, "")}/functions/v1/visitor-proof` : "");
    if (!endpoint || !config.supabaseAnonKey) return false;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: config.supabaseAnonKey,
          authorization: `Bearer ${config.supabaseAnonKey}`
        },
        body: JSON.stringify(payload),
        keepalive: true
      });
      return response.ok;
    } catch (_) {
      return false;
    }
  }

  async function recordViaSupabase(payload) {
    const supabase = await getSupabase();
    if (!supabase) return;

    const { error } = await supabase.from("visitor_events").insert(payload);
    if (!error) return;

    await supabase.from("visitor_events").insert(legacyPayload(payload));
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

    const payload = await buildPayload();
    const edgeRecorded = await recordViaEdge(payload);
    if (!edgeRecorded) await recordViaSupabase(payload);
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
