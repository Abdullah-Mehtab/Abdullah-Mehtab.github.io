create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  content_slug text not null,
  parent_id uuid references public.comments(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1200),
  status text not null default 'approved' check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists comments_thread_idx
  on public.comments (content_type, content_slug, status, created_at desc);

create or replace function public.sanitize_comment_text()
returns trigger
language plpgsql
as $$
begin
  new.content_type := left(trim(regexp_replace(coalesce(new.content_type, 'page'), '[^a-zA-Z0-9_-]', '-', 'g')), 80);
  new.content_slug := left(trim(regexp_replace(coalesce(new.content_slug, ''), '[^a-zA-Z0-9_-]', '-', 'g')), 160);
  new.author_name := left(trim(regexp_replace(coalesce(new.author_name, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g')), 80);
  new.body := left(trim(regexp_replace(coalesce(new.body, ''), '<[^>]*>|[<>`]|[[:cntrl:]]', ' ', 'g')), 1200);

  if new.content_type = '' then
    new.content_type := 'page';
  end if;

  if new.content_slug = '' or new.author_name = '' or new.body = '' then
    raise exception 'Comments require a valid thread, author, and plain-text body.';
  end if;

  return new;
end;
$$;

drop trigger if exists sanitize_comments_before_write on public.comments;
create trigger sanitize_comments_before_write
  before insert or update on public.comments
  for each row execute function public.sanitize_comment_text();

alter table public.comments enable row level security;

drop policy if exists "Anyone can read approved comments" on public.comments;
create policy "Anyone can read approved comments"
  on public.comments for select
  using (status = 'approved');

drop policy if exists "Anyone can submit pending comments" on public.comments;
drop policy if exists "Anyone can submit public comments" on public.comments;
create policy "Anyone can submit public comments"
  on public.comments for insert
  with check (status in ('approved', 'pending'));

-- Admin moderation should be done from the Supabase dashboard or a future authenticated admin page.
-- Do not allow public update/delete policies.
