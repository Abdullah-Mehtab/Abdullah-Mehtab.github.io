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

create index if not exists comments_thread_idx
  on public.comments (content_type, content_slug, status, created_at desc);

alter table public.comments enable row level security;

drop policy if exists "Anyone can read approved comments" on public.comments;
create policy "Anyone can read approved comments"
  on public.comments for select
  using (status = 'approved');

drop policy if exists "Anyone can submit pending comments" on public.comments;
create policy "Anyone can submit pending comments"
  on public.comments for insert
  with check (status = 'pending');

-- Admin moderation should be done from the Supabase dashboard or a future authenticated admin page.
-- Do not allow public update/delete policies.
