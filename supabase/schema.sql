create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  content_slug text not null,
  parent_id uuid references public.comments(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1200),
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists public.comment_admins (
  email text primary key check (position('@' in email) > 1),
  created_at timestamptz not null default now()
);

insert into public.comment_admins (email)
values ('abdullahmehtab666@gmail.com')
on conflict (email) do nothing;

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null check (char_length(page_slug) between 1 and 120),
  event_type text not null default 'page_view' check (event_type in ('page_view')),
  theme text check (char_length(theme) <= 80),
  cursor text check (char_length(cursor) <= 80),
  motion text check (char_length(motion) <= 80),
  referrer text check (char_length(referrer) <= 300),
  source_token text check (char_length(source_token) <= 120),
  visitor_id text check (char_length(visitor_id) <= 80),
  session_id text check (char_length(session_id) <= 80),
  fingerprint_hash text check (char_length(fingerprint_hash) <= 128),
  fingerprint_version text check (char_length(fingerprint_version) <= 20),
  user_agent_hash text check (char_length(user_agent_hash) <= 128),
  ip_hash text check (char_length(ip_hash) <= 128),
  screen_size text check (char_length(screen_size) <= 40),
  viewport_size text check (char_length(viewport_size) <= 40),
  timezone text check (char_length(timezone) <= 80),
  language text check (char_length(language) <= 40),
  platform text check (char_length(platform) <= 80),
  created_at timestamptz not null default now()
);

create index if not exists comments_thread_idx
  on public.comments (content_type, content_slug, status, created_at desc);

create index if not exists comments_status_idx
  on public.comments (status, created_at desc);

create index if not exists visitor_events_page_idx
  on public.visitor_events (page_slug, event_type, created_at desc);

create index if not exists visitor_events_visitor_idx
  on public.visitor_events (visitor_id, created_at desc);

create index if not exists visitor_events_fingerprint_idx
  on public.visitor_events (fingerprint_hash, created_at desc);

create index if not exists visitor_events_ip_hash_idx
  on public.visitor_events (ip_hash, created_at desc);

create or replace function public.is_comment_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.comment_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.sanitize_comment_text()
returns trigger
language plpgsql
as $$
begin
  new.content_type := left(trim(regexp_replace(coalesce(new.content_type, 'page'), '[^a-zA-Z0-9_-]', '-', 'g')), 80);
  new.content_slug := left(trim(regexp_replace(coalesce(new.content_slug, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 160);
  new.author_name := regexp_replace(coalesce(new.author_name, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g');
  new.author_name := left(trim(regexp_replace(new.author_name, '(javascript|data|vbscript)[[:space:]]*:', '', 'gi')), 80);
  new.body := regexp_replace(coalesce(new.body, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g');
  new.body := left(trim(regexp_replace(new.body, '(javascript|data|vbscript)[[:space:]]*:', '', 'gi')), 1200);

  if new.content_type = '' then
    new.content_type := 'page';
  end if;

  if new.content_slug = '' or new.author_name = '' or new.body = '' then
    raise exception 'Comments require a valid thread, author, and plain-text body.';
  end if;

  return new;
end;
$$;

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

drop trigger if exists sanitize_comments_before_write on public.comments;
create trigger sanitize_comments_before_write
  before insert or update on public.comments
  for each row execute function public.sanitize_comment_text();

drop trigger if exists sanitize_visitor_events_before_write on public.visitor_events;
create trigger sanitize_visitor_events_before_write
  before insert or update on public.visitor_events
  for each row execute function public.sanitize_visitor_event();

alter table public.comments enable row level security;
alter table public.comment_admins enable row level security;
alter table public.visitor_events enable row level security;

drop policy if exists "Anyone can read approved comments" on public.comments;
create policy "Anyone can read approved comments"
  on public.comments for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "Anyone can submit pending comments" on public.comments;
drop policy if exists "Anyone can submit public comments" on public.comments;
create policy "Anyone can submit pending comments"
  on public.comments for insert
  to anon, authenticated
  with check (status = 'pending');

drop policy if exists "Admins can read all comments" on public.comments;
create policy "Admins can read all comments"
  on public.comments for select
  to authenticated
  using (public.is_comment_admin());

drop policy if exists "Admins can update comments" on public.comments;
create policy "Admins can update comments"
  on public.comments for update
  to authenticated
  using (public.is_comment_admin())
  with check (public.is_comment_admin());

drop policy if exists "Admins can delete comments" on public.comments;
create policy "Admins can delete comments"
  on public.comments for delete
  to authenticated
  using (public.is_comment_admin());

drop policy if exists "Admins can read comment admins" on public.comment_admins;
create policy "Admins can read comment admins"
  on public.comment_admins for select
  to authenticated
  using (public.is_comment_admin());

drop policy if exists "Anyone can submit visitor proof" on public.visitor_events;
create policy "Anyone can submit visitor proof"
  on public.visitor_events for insert
  to anon, authenticated
  with check (event_type = 'page_view');

drop policy if exists "Admins can read visitor proof" on public.visitor_events;
create policy "Admins can read visitor proof"
  on public.visitor_events for select
  to authenticated
  using (public.is_comment_admin());

-- Public users can submit pending comments and anonymous page-view proof.
-- Only authenticated admins listed in comment_admins can moderate comments.
