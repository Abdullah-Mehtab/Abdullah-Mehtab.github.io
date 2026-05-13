alter table public.visitor_events
  drop constraint if exists visitor_events_event_type_check;

alter table public.visitor_events
  add constraint visitor_events_event_type_check
  check (event_type in ('page_view', 'play_zone_visit', 'potato_summon', 'play_data_shard', 'play_boost_pad'));

create or replace function public.sanitize_visitor_event()
returns trigger
language plpgsql
as $$
begin
  new.page_slug := left(trim(regexp_replace(coalesce(new.page_slug, 'home'), '[^a-zA-Z0-9_-]', '-', 'g')), 120);
  new.event_type := left(trim(regexp_replace(coalesce(new.event_type, 'page_view'), '[^a-zA-Z0-9_-]', '-', 'g')), 80);
  if new.event_type not in ('page_view', 'play_zone_visit', 'potato_summon', 'play_data_shard', 'play_boost_pad') then
    new.event_type := 'page_view';
  end if;
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

drop policy if exists "Anyone can submit visitor proof" on public.visitor_events;
create policy "Anyone can submit visitor proof"
  on public.visitor_events for insert
  to anon, authenticated
  with check (event_type in ('page_view', 'play_zone_visit', 'potato_summon', 'play_data_shard', 'play_boost_pad'));

create index if not exists visitor_events_play_interaction_idx
  on public.visitor_events (page_slug, event_type, source_token, created_at desc);
