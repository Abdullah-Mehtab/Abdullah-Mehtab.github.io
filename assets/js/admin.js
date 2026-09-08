(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  let supabaseClientPromise = null;

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function getSupabase() {
    if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
    if (!supabaseClientPromise) {
      supabaseClientPromise = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm")
        .then(({ createClient }) => createClient(config.supabaseUrl, config.supabaseAnonKey))
        .catch(() => null);
    }
    return supabaseClientPromise;
  }

  function setStatus(message) {
    const status = document.querySelector("[data-admin-status]");
    if (status) status.textContent = message;
  }

  function renderComments(comments) {
    const list = document.querySelector("[data-admin-comments]");
    if (!list) return;

    if (!comments.length) {
      list.innerHTML = '<p class="comment-note">No comments in the moderation queue.</p>';
      return;
    }

    list.innerHTML = comments.map((comment) => {
      const date = new Date(comment.created_at || Date.now());
      return `
        <article class="admin-comment" data-comment-id="${escapeHtml(comment.id)}">
          <div class="admin-comment-head">
            <strong>${escapeHtml(comment.author_name)}</strong>
            <span>${escapeHtml(comment.status)} / ${escapeHtml(comment.content_type)}:${escapeHtml(comment.content_slug)}</span>
          </div>
          <time datetime="${escapeHtml(date.toISOString())}">${escapeHtml(date.toLocaleString())}</time>
          <p>${escapeHtml(comment.body)}</p>
          <div class="button-row">
            <button class="button primary" type="button" data-admin-action="approved">Approve</button>
            <button class="button" type="button" data-admin-action="pending">Pending</button>
            <button class="button ghost" type="button" data-admin-action="hidden">Hide</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function uniqueCount(items, key) {
    return new Set(items.map((item) => item[key]).filter(Boolean)).size;
  }

  function renderVisitors(events) {
    const stats = document.querySelector("[data-admin-visitor-stats]");
    const list = document.querySelector("[data-admin-visitors]");
    if (!stats || !list) return;

    if (!events.length) {
      stats.innerHTML = '<p class="comment-note">No visitor proof rows available.</p>';
      list.innerHTML = "";
      return;
    }

    const pages = new Map();
    events.forEach((event) => {
      const page = event.page_slug || "home";
      pages.set(page, (pages.get(page) || 0) + 1);
    });
    const topPages = Array.from(pages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([page, count]) => `${escapeHtml(page)} (${count})`)
      .join(", ");

    stats.innerHTML = `
      <article class="admin-stat"><strong>${events.length}</strong><span>Recent page views</span></article>
      <article class="admin-stat"><strong>${uniqueCount(events, "visitor_id")}</strong><span>Visitor IDs</span></article>
      <article class="admin-stat"><strong>${uniqueCount(events, "fingerprint_hash")}</strong><span>Browser fingerprints</span></article>
      <article class="admin-stat"><strong>${uniqueCount(events, "ip_hash")}</strong><span>IP hashes</span></article>
      <article class="admin-stat"><strong>${uniqueCount(events, "session_id")}</strong><span>Sessions</span></article>
      <article class="admin-stat"><strong>${uniqueCount(events, "source_token")}</strong><span>Source tokens</span></article>
    `;

    list.innerHTML = `
      <p class="comment-note">Top pages: ${topPages || "not enough data yet"}</p>
      ${events.slice(0, 30).map((event) => {
        const date = new Date(event.created_at || Date.now());
        return `
          <article class="admin-visitor">
            <div class="admin-comment-head">
              <strong>${escapeHtml(event.page_slug || "home")}</strong>
              <time datetime="${escapeHtml(date.toISOString())}">${escapeHtml(date.toLocaleString())}</time>
            </div>
            <p>
              visitor <code>${escapeHtml((event.visitor_id || "legacy").slice(0, 24))}</code>
              / session <code>${escapeHtml((event.session_id || "legacy").slice(0, 24))}</code>
              / fp <code>${escapeHtml((event.fingerprint_hash || "").slice(0, 16) || "none")}</code>
              / ip <code>${escapeHtml((event.ip_hash || "").slice(0, 16) || "edge off")}</code>
            </p>
            <p>${escapeHtml(event.theme || "theme?")} / ${escapeHtml(event.cursor || "cursor?")} / ${escapeHtml(event.referrer || "direct")}</p>
          </article>
        `;
      }).join("")}
    `;
  }

  const PROBE_TIMEOUT_MS = 8000;

  // A hung request never rejects, so an unbounded probe would sit on "Checking" forever and report
  // nothing at all. Bounding it turns a hang into a visible failure.
  function withTimeout(promise, label) {
    let timer;
    const limit = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} timed out after ${PROBE_TIMEOUT_MS / 1000}s`)), PROBE_TIMEOUT_MS);
    });
    return Promise.race([promise, limit]).finally(() => clearTimeout(timer));
  }

  // Each probe exercises a path the public site depends on, so a silent outage shows up here
  // instead of looking like a quiet week.
  const healthChecks = [
    {
      label: "Supabase client",
      detail: "Loaded from the jsDelivr CDN. If this fails, comments fall back to nothing.",
      async run() {
        if (!await getSupabase()) throw new Error("client did not load");
        return "Loaded";
      }
    },
    {
      label: "Public comment reads",
      detail: "Exactly what a visitor's browser does on every page.",
      async run() {
        const supabase = await getSupabase();
        if (!supabase) throw new Error("no client");
        const { error, count } = await supabase
          .from("comments")
          .select("id", { count: "exact", head: true })
          .eq("status", "approved");
        if (error) throw error;
        return `Reachable, ${count || 0} approved`;
      }
    },
    {
      label: "Visitor-proof function",
      detail: "Edge function that records analytics and hashes visitor IPs.",
      async run() {
        const endpoint = config.visitorProofEndpoint;
        if (!endpoint) throw new Error("no endpoint configured");
        const url = new URL(endpoint);
        url.searchParams.set("page_slug", "play");
        url.searchParams.set("event_type", "potato_summon_count");
        const response = await fetch(url, {
          headers: {
            apikey: config.supabaseAnonKey,
            authorization: `Bearer ${config.supabaseAnonKey}`
          },
          signal: AbortSignal.timeout(PROBE_TIMEOUT_MS)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return "Responding";
      }
    },
    {
      label: "Moderation access",
      detail: "Needs an admin sign-in. Row-level security decides, not this page.",
      async run() {
        const supabase = await getSupabase();
        if (!supabase) throw new Error("no client");
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return { idle: true, text: "Not signed in" };
        const { error, count } = await supabase
          .from("comments")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending");
        if (error) throw error;
        return `Granted, ${count || 0} pending`;
      }
    }
  ];

  function renderHealth(rows) {
    const list = document.querySelector("[data-admin-health]");
    if (!list) return;
    list.innerHTML = rows.map((row) => `
      <li class="health-row">
        <div>
          <span class="health-label">${escapeHtml(row.label)}</span>
          <span class="health-detail">${escapeHtml(row.detail)}</span>
        </div>
        <span class="health-state ${escapeHtml(row.state)}">${escapeHtml(row.text)}</span>
      </li>
    `).join("");
  }

  async function checkHealth() {
    renderHealth(healthChecks.map((check) => ({
      label: check.label,
      detail: check.detail,
      state: "is-checking",
      text: "Checking"
    })));

    const rows = [];
    for (const check of healthChecks) {
      try {
        const outcome = await withTimeout(check.run(), check.label);
        rows.push(outcome && outcome.idle
          ? { label: check.label, detail: check.detail, state: "is-idle", text: outcome.text }
          : { label: check.label, detail: check.detail, state: "is-ok", text: outcome });
      } catch (error) {
        const reason = String((error && error.message) || error).slice(0, 60);
        rows.push({ label: check.label, detail: check.detail, state: "is-down", text: `Down: ${reason}` });
      }
    }
    renderHealth(rows);
  }

  async function loadComments() {
    const supabase = await getSupabase();
    if (!supabase) {
      setStatus("Supabase config is missing.");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      renderComments([]);
      setStatus("Sign in with the admin email to load moderation.");
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .select("id, content_type, content_slug, author_name, body, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      renderComments([]);
      setStatus("Signed in, but RLS blocked moderation access.");
      return;
    }

    renderComments(data || []);
    setStatus(`Loaded ${(data || []).length} comments.`);
  }

  async function loadVisitors() {
    const supabase = await getSupabase();
    if (!supabase) {
      setStatus("Supabase config is missing.");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      renderVisitors([]);
      setStatus("Sign in with the admin email to load visitor proof.");
      return;
    }

    const columns = [
      "id",
      "page_slug",
      "event_type",
      "theme",
      "cursor",
      "motion",
      "referrer",
      "source_token",
      "visitor_id",
      "session_id",
      "fingerprint_hash",
      "user_agent_hash",
      "ip_hash",
      "screen_size",
      "viewport_size",
      "timezone",
      "language",
      "platform",
      "created_at"
    ].join(", ");

    let result = await supabase
      .from("visitor_events")
      .select(columns)
      .order("created_at", { ascending: false })
      .limit(250);

    if (result.error) {
      result = await supabase
        .from("visitor_events")
        .select("id, page_slug, event_type, theme, cursor, motion, referrer, source_token, created_at")
        .order("created_at", { ascending: false })
        .limit(250);
    }

    if (result.error) {
      renderVisitors([]);
      setStatus("Signed in, but RLS blocked visitor proof access or the migration is not applied yet.");
      return;
    }

    renderVisitors(result.data || []);
    setStatus(`Loaded ${(result.data || []).length} visitor proof rows.`);
  }

  async function updateComment(id, status) {
    const supabase = await getSupabase();
    if (!supabase) return;

    const payload = {
      status,
      approved_at: status === "approved" ? new Date().toISOString() : null
    };
    const { error } = await supabase.from("comments").update(payload).eq("id", id);
    if (error) {
      setStatus("Update failed. Check admin permissions.");
      return;
    }
    setStatus(`Comment marked ${status}.`);
    loadComments();
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const supabase = await getSupabase();
    const login = document.querySelector("[data-admin-login]");
    const list = document.querySelector("[data-admin-comments]");
    const refresh = document.querySelector("[data-admin-refresh]");
    const refreshVisitors = document.querySelector("[data-admin-refresh-visitors]");
    const refreshHealth = document.querySelector("[data-admin-refresh-health]");
    const signout = document.querySelector("[data-admin-signout]");
    const emailInput = login ? login.querySelector("input[name='email']") : null;

    if (emailInput && config.adminEmailHint) emailInput.placeholder = config.adminEmailHint;

    // Before the early return on purpose: a client that will not load is exactly the outage this
    // panel exists to show, and returning first would leave it stuck on its placeholder.
    if (refreshHealth) refreshHealth.addEventListener("click", checkHealth);
    await checkHealth();

    if (!supabase) {
      setStatus("Supabase config is missing.");
      return;
    }

    login.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = new FormData(login).get("email");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Without this, Supabase defaults to creating a user for any address typed into this
          // public form and emailing them a signup confirmation. That let a stranger send mail
          // from this project and fill its user table, so unknown addresses must be refused.
          shouldCreateUser: false,
          emailRedirectTo: window.location.href.split("#")[0]
        }
      });
      setStatus(error ? "That address cannot sign in here." : "If that address can moderate, a sign-in link is on its way.");
    });

    refresh.addEventListener("click", loadComments);
    refreshVisitors.addEventListener("click", loadVisitors);
    signout.addEventListener("click", async () => {
      await supabase.auth.signOut();
      renderComments([]);
      renderVisitors([]);
      setStatus("Signed out.");
    });

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-admin-action]");
      const item = event.target.closest("[data-comment-id]");
      if (!button || !item) return;
      updateComment(item.dataset.commentId, button.dataset.adminAction);
    });

    await loadComments();
    await loadVisitors();
  });
})();
