# Abdullah Mehtab Portfolio

This repository hosts my portfolio website at:

https://abdullah-mehtab.github.io/Abdullah-Mehtab/

The site is intentionally human, not a sterile resume template. It keeps the old personality bits, the never-ending list, comments, and the footer truck, while upgrading the structure into a cleaner professional portfolio.

## Current Structure

```text
index.html              # Home
projects.html           # Work / project case studies
cv.html                 # Web CV plus resume/CV downloads near the bottom
todo.html               # Never-Ending List
classic/                # Preserved legacy static site snapshot
assets/css/             # Stylesheets
assets/js/              # JavaScript
assets/images/          # Site images and project screenshots
supabase/schema.sql     # Optional backend schema for moderated comments
```

## Comments Backend

Comments are embedded where they are useful, such as project entries, the CV page, and the Never-Ending List. They work in local preview mode by default. To make comments live-backed:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Add the project URL and public anon key to `assets/js/site-config.js`.
4. Moderate comments from Supabase by changing `status` from `pending` to `approved`.

The anon key is safe to expose only if Row Level Security policies stay enabled.

## Legacy Site

The previous static site is preserved under `classic/`. The root site is the upgraded version; the classic pages are kept as a historical snapshot and because the old site had personality worth keeping.

## Local Notes

This project currently uses plain HTML, CSS, and JavaScript so it can run directly on GitHub Pages. A future full-stack migration can use Next.js + Supabase + Vercel once the local machine has Node.js/npm installed.
