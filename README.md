# Abdullah Mehtab Portfolio

This repository hosts my portfolio website at:

https://abdullah-mehtab.github.io/Abdullah-Mehtab/

The site is intentionally human, not a sterile resume template. It keeps the old personality bits, the never-ending list, comments, and the footer truck, while upgrading the structure into a cleaner professional portfolio.

## Current Structure

```text
index.html              # Home
projects.html           # Work / project case studies
cyber-sentinel.html     # Cyber Sentinel security engineering case study
cv.html                 # Web CV plus resume/CV downloads near the bottom
todo.html               # Never-Ending List
admin.html              # Supabase Auth moderation page, noindex
classic/                # Preserved legacy static site snapshot
assets/css/             # Stylesheets
assets/js/              # JavaScript
assets/images/          # Site images and project screenshots
supabase/schema.sql     # Backend schema for comments, admin moderation, and visitor proof
```

## Comments Backend

Comments are embedded where they are useful, such as project entries, the CV page, and the Never-Ending List. Public comments are stored as `pending` first and only approved comments render publicly.

The Supabase anon key is safe to expose only because Row Level Security stays enabled. Moderation is handled through `admin.html` with Supabase Auth and the `comment_admins` table.

## Visitor Proof

The site records lightweight anonymous page-view proof in Supabase when enabled in `assets/js/site-config.js`. It stores page slug, event type, selected theme/cursor/motion, referrer, optional source token, and timestamp. It does not log IP addresses or browser fingerprints.

## Legacy Site

The previous static site is preserved under `classic/`. The root site is the upgraded version; the classic pages are kept as a historical snapshot and because the old site had personality worth keeping.

## Local Notes

This project currently uses plain HTML, CSS, and JavaScript so it can run directly on GitHub Pages. A future full-stack migration can use Next.js + Supabase + Vercel once the local machine has Node.js/npm installed.
