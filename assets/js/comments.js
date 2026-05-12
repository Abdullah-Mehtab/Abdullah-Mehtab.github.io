(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const localPrefix = "abdullah-portfolio-comments:";
  let supabaseClientPromise = null;

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getThreadKey(root) {
    return {
      type: root.dataset.type || "page",
      slug: root.dataset.slug || window.location.pathname.replace(/[^\w-]+/g, "-") || "home"
    };
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

  function readLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(localPrefix + key.type + ":" + key.slug)) || [];
    } catch (_) {
      return [];
    }
  }

  function writeLocal(key, comments) {
    localStorage.setItem(localPrefix + key.type + ":" + key.slug, JSON.stringify(comments));
  }

  async function loadComments(key) {
    const supabase = await getSupabase();
    if (!supabase) {
      return {
        mode: "local",
        comments: readLocal(key)
      };
    }

    const { data, error } = await supabase
      .from("comments")
      .select("id, author_name, body, created_at")
      .eq("content_type", key.type)
      .eq("content_slug", key.slug)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return {
        mode: "local",
        comments: readLocal(key),
        warning: "Live comments are not reachable, showing local preview comments."
      };
    }

    return {
      mode: "supabase",
      comments: data || []
    };
  }

  async function saveComment(key, payload) {
    const supabase = await getSupabase();
    if (!supabase) {
      const comments = readLocal(key);
      comments.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        author_name: payload.author_name,
        body: payload.body,
        created_at: new Date().toISOString()
      });
      writeLocal(key, comments.slice(0, 50));
      return {
        mode: "local",
        message: "Saved locally in this browser. Connect Supabase to make this public."
      };
    }

    const { error } = await supabase.from("comments").insert({
      content_type: key.type,
      content_slug: key.slug,
      author_name: payload.author_name,
      body: payload.body,
      status: "pending"
    });

    if (error) throw error;
    return {
      mode: "supabase",
      message: "Sent. It will appear after moderation."
    };
  }

  function render(root, result) {
    const list = root.querySelector(".comment-list");
    const note = root.querySelector(".comment-note");
    if (!list) return;

    if (note && result.mode === "local") {
      note.textContent = result.warning || "Comments are running in local preview mode until Supabase is configured.";
    } else if (note) {
      note.textContent = "Comments are live-backed and moderated before they show up.";
    }

    if (!result.comments.length) {
      list.innerHTML = '<div class="comment-item"><p>No comments yet. Suspiciously quiet.</p></div>';
      return;
    }

    list.innerHTML = result.comments.map((comment) => {
      const date = new Date(comment.created_at || Date.now());
      return `
        <article class="comment-item">
          <strong>${escapeHtml(comment.author_name || "Anonymous")}</strong>
          <time datetime="${escapeHtml(date.toISOString())}">${escapeHtml(date.toLocaleString())}</time>
          <p>${escapeHtml(comment.body || "")}</p>
        </article>
      `;
    }).join("");
  }

  function buildThread(root) {
    if (root.dataset.ready === "true") return;
    root.dataset.ready = "true";
    const title = root.dataset.title || "Comments";
    root.innerHTML = `
      <div class="comment-shell">
        <h3>${escapeHtml(title)}</h3>
        <p class="comment-note">Loading comments...</p>
        <form class="comment-form">
          <label>
            <span class="sr-only">Name</span>
            <input name="author_name" maxlength="80" placeholder="Name or handle" required>
          </label>
          <label>
            <span class="sr-only">Comment</span>
            <textarea name="body" maxlength="1200" placeholder="Say something useful, funny, or incriminatingly specific enough to prove you were here." required></textarea>
          </label>
          <input class="hidden-field" name="website" tabindex="-1" autocomplete="off">
          <button class="button primary" type="submit">Post comment</button>
          <div class="comment-status" aria-live="polite"></div>
        </form>
        <div class="comment-list"></div>
      </div>
    `;

    const key = getThreadKey(root);
    const status = root.querySelector(".comment-status");
    const form = root.querySelector("form");

    loadComments(key).then((result) => render(root, result));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      if (data.get("website")) return;

      const lastPost = Number(localStorage.getItem(localPrefix + "last-post") || 0);
      if (Date.now() - lastPost < 25000) {
        status.textContent = "Slow down a bit. The internet will survive 25 seconds.";
        return;
      }

      const payload = {
        author_name: String(data.get("author_name") || "").trim(),
        body: String(data.get("body") || "").trim()
      };
      if (!payload.author_name || !payload.body) return;

      status.textContent = "Posting...";
      try {
        const result = await saveComment(key, payload);
        localStorage.setItem(localPrefix + "last-post", String(Date.now()));
        form.reset();
        status.textContent = result.message;
        loadComments(key).then((loaded) => render(root, loaded));
      } catch (error) {
        status.textContent = "Comment failed. Check Supabase config/RLS, then try again.";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-comments]").forEach(buildThread);
  });
})();
