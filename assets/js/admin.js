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
    const signout = document.querySelector("[data-admin-signout]");
    const emailInput = login ? login.querySelector("input[name='email']") : null;

    if (emailInput && config.adminEmailHint) emailInput.placeholder = config.adminEmailHint;
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
          emailRedirectTo: window.location.href.split("#")[0]
        }
      });
      setStatus(error ? "Magic link failed." : "Magic link sent. Check your email.");
    });

    refresh.addEventListener("click", loadComments);
    signout.addEventListener("click", async () => {
      await supabase.auth.signOut();
      renderComments([]);
      setStatus("Signed out.");
    });

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-admin-action]");
      const item = event.target.closest("[data-comment-id]");
      if (!button || !item) return;
      updateComment(item.dataset.commentId, button.dataset.adminAction);
    });

    await loadComments();
  });
})();
