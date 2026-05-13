alter table public.visitor_events
  add column if not exists visitor_id text check (char_length(visitor_id) <= 80),
  add column if not exists session_id text check (char_length(session_id) <= 80),
  add column if not exists fingerprint_hash text check (char_length(fingerprint_hash) <= 128),
  add column if not exists fingerprint_version text check (char_length(fingerprint_version) <= 20),
  add column if not exists user_agent_hash text check (char_length(user_agent_hash) <= 128),
  add column if not exists ip_hash text check (char_length(ip_hash) <= 128),
  add column if not exists screen_size text check (char_length(screen_size) <= 40),
  add column if not exists viewport_size text check (char_length(viewport_size) <= 40),
  add column if not exists timezone text check (char_length(timezone) <= 80),
  add column if not exists language text check (char_length(language) <= 40),
  add column if not exists platform text check (char_length(platform) <= 80);

create index if not exists visitor_events_visitor_idx
  on public.visitor_events (visitor_id, created_at desc);

create index if not exists visitor_events_fingerprint_idx
  on public.visitor_events (fingerprint_hash, created_at desc);

create index if not exists visitor_events_ip_hash_idx
  on public.visitor_events (ip_hash, created_at desc);

create or replace function public.sanitize_visitor_event()
returns trigger
language plpgsql
as $$
begin
  new.page_slug := left(trim(regexp_replace(coalesce(new.page_slug, 'home'), '[^a-zA-Z0-9_-]', '-', 'g')), 120);
  new.event_type := 'page_view';
  new.theme := nullif(left(trim(regexp_replace(coalesce(new.theme, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 80), '');
  new.cursor := nullif(left(trim(regexp_replace(coalesce(new.cursor, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 80), '');
  new.motion := nullif(left(trim(regexp_replace(coalesce(new.motion, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 80), '');
  new.referrer := nullif(left(trim(regexp_replace(coalesce(new.referrer, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g')), 300), '');
  new.source_token := nullif(left(trim(regexp_replace(coalesce(new.source_token, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 120), '');
  new.visitor_id := nullif(left(trim(regexp_replace(coalesce(new.visitor_id, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 80), '');
  new.session_id := nullif(left(trim(regexp_replace(coalesce(new.session_id, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 80), '');
  new.fingerprint_hash := nullif(left(trim(regexp_replace(coalesce(new.fingerprint_hash, ''), '[^a-fA-F0-9]', '', 'g')), 128), '');
  new.fingerprint_version := nullif(left(trim(regexp_replace(coalesce(new.fingerprint_version, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 20), '');
  new.user_agent_hash := nullif(left(trim(regexp_replace(coalesce(new.user_agent_hash, ''), '[^a-fA-F0-9]', '', 'g')), 128), '');
  new.ip_hash := nullif(left(trim(regexp_replace(coalesce(new.ip_hash, ''), '[^a-fA-F0-9]', '', 'g')), 128), '');
  new.screen_size := nullif(left(trim(regexp_replace(coalesce(new.screen_size, ''), '[^0-9x.]', '', 'g')), 40), '');
  new.viewport_size := nullif(left(trim(regexp_replace(coalesce(new.viewport_size, ''), '[^0-9x.]', '', 'g')), 40), '');
  new.timezone := nullif(left(trim(regexp_replace(coalesce(new.timezone, ''), '[^a-zA-Z0-9_+./-]', '', 'g')), 80), '');
  new.language := nullif(left(trim(regexp_replace(coalesce(new.language, ''), '[^a-zA-Z0-9_-]', '', 'g')), 40), '');
  new.platform := nullif(left(trim(regexp_replace(coalesce(new.platform, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g')), 80), '');

  if new.page_slug = '' then
    new.page_slug := 'home';
  end if;

  return new;
end;
$$;

drop trigger if exists sanitize_visitor_events_before_write on public.visitor_events;
create trigger sanitize_visitor_events_before_write
  before insert or update on public.visitor_events
  for each row execute function public.sanitize_visitor_event();

drop policy if exists "Admins can read visitor proof" on public.visitor_events;
create policy "Admins can read visitor proof"
  on public.visitor_events for select
  to authenticated
  using (public.is_comment_admin());
