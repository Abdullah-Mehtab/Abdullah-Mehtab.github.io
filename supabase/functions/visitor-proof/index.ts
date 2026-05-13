import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

const allowedEventTypes = new Set([
  "page_view",
  "play_zone_visit",
  "potato_summon",
  "play_data_shard",
  "play_boost_pad"
]);

function clean(value: unknown, maxLength: number, pattern = /[<>`"'\u0000-\u001F\u007F]/g) {
  return String(value || "")
    .normalize("NFKC")
    .replace(pattern, "")
    .trim()
    .slice(0, maxLength);
}

function cleanEventType(value: unknown) {
  const eventType = clean(value || "page_view", 80, /[^a-zA-Z0-9_-]/g) || "page_view";
  return allowedEventTypes.has(eventType) ? eventType : "page_view";
}

async function sha256(value: string) {
  if (!value) return "";
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return (
    request.headers.get("cf-connecting-ip")
    || request.headers.get("x-real-ip")
    || forwarded.split(",")[0]
    || ""
  ).trim();
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const salt = Deno.env.get("VISITOR_PROOF_SALT") || serviceRoleKey || "";

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "server_not_configured" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }

  const body = await request.json().catch(() => ({}));
  const ip = getIp(request);
  const userAgent = request.headers.get("user-agent") || "";
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });

  if (request.method === "GET") {
    const url = new URL(request.url);
    const pageSlug = clean(url.searchParams.get("page_slug"), 120, /[^a-zA-Z0-9_-]/g) || "play";
    const eventType = clean(url.searchParams.get("event_type"), 80, /[^a-zA-Z0-9_-]/g);
    if (eventType !== "potato_summon_count") {
      return new Response(JSON.stringify({ error: "unsupported_query" }), {
        status: 400,
        headers: { ...corsHeaders, "content-type": "application/json" }
      });
    }
    const { count, error } = await supabase
      .from("visitor_events")
      .select("id", { count: "exact", head: true })
      .eq("page_slug", pageSlug)
      .eq("event_type", "potato_summon");
    if (error) {
      return new Response(JSON.stringify({ error: "count_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ ok: true, potato_count: count || 0 }), {
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }

  const payload = {
    page_slug: clean(body.page_slug, 120, /[^a-zA-Z0-9_-]/g) || "home",
    event_type: cleanEventType(body.event_type),
    theme: clean(body.theme, 80, /[^a-zA-Z0-9_-]/g),
    cursor: clean(body.cursor, 80, /[^a-zA-Z0-9_-]/g),
    motion: clean(body.motion, 80, /[^a-zA-Z0-9_-]/g),
    referrer: clean(body.referrer, 300),
    source_token: clean(body.source_token, 120, /[^a-zA-Z0-9_-]/g),
    visitor_id: clean(body.visitor_id, 80, /[^a-zA-Z0-9_-]/g),
    session_id: clean(body.session_id, 80, /[^a-zA-Z0-9_-]/g),
    fingerprint_hash: clean(body.fingerprint_hash, 128, /[^a-fA-F0-9]/g),
    fingerprint_version: clean(body.fingerprint_version, 20, /[^a-zA-Z0-9_-]/g),
    user_agent_hash: userAgent ? await sha256(`${salt}|ua|${userAgent}`) : "",
    ip_hash: ip ? await sha256(`${salt}|ip|${ip}`) : "",
    screen_size: clean(body.screen_size, 40, /[^0-9x.]/g),
    viewport_size: clean(body.viewport_size, 40, /[^0-9x.]/g),
    timezone: clean(body.timezone, 80, /[^a-zA-Z0-9_+./-]/g),
    language: clean(body.language, 40, /[^a-zA-Z0-9_-]/g),
    platform: clean(body.platform, 80)
  };

  const { error } = await supabase.from("visitor_events").insert(payload);

  if (error) {
    return new Response(JSON.stringify({ error: "insert_failed" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }

  let potatoCount: number | null = null;
  if (payload.event_type === "potato_summon") {
    const { count } = await supabase
      .from("visitor_events")
      .select("id", { count: "exact", head: true })
      .eq("page_slug", payload.page_slug)
      .eq("event_type", "potato_summon");
    potatoCount = count || 0;
  }

  return new Response(JSON.stringify({ ok: true, potato_count: potatoCount }), {
    headers: { ...corsHeaders, "content-type": "application/json" }
  });
});
