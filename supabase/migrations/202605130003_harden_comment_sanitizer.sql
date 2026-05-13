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
