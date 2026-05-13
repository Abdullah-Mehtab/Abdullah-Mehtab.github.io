alter table public.comments
  alter column status set default 'pending';

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
  created_at timestamptz not null default now()
);

create index if not exists comments_status_idx
  on public.comments (status, created_at desc);

create index if not exists visitor_events_page_idx
  on public.visitor_events (page_slug, event_type, created_at desc);

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
