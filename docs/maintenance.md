# Site Maintenance

This repository is served directly from the GitHub Pages root. Keep the public HTML entry points in the repository root unless the Pages deployment mode is changed in a separate migration.

## Protected Public URLs

Do not move these without adding redirects or updating the deployment strategy:

- `/`
- `/index.html`
- `/projects.html`
- `/cv.html`
- `/todo.html`
- `/cyber-sentinel.html`
- `/admin.html`
- `/play/`
- `/classic/`
- `/Abdullah-Mehtab-Master-CV.pdf`
- `/Abdullah-Mehtab-Cyber-CV.pdf`
- `/robots.txt`
- `/sitemap.xml`

## Directory Roles

- `assets/`: shared CSS, JavaScript, images, and public browser config for the root site.
- `play-src/`: source for the Vite-built Portfolio Drive experience.
- `play/`: deployed `/play/` runtime files. `play/game-assets/` is build output that GitHub Pages serves.
- `play-assets/`: local asset generation and validation tools for Portfolio Drive.
- `classic/`: archival version of the older site, retained so `/classic/` links keep working.
- `supabase/`: local Supabase schema, migrations, config, and edge function source.
- `docs/`: maintenance notes. Only this file is tracked; the audits and history files beside it are git-ignored working notes and never ship.

## Checks Before Updating

Run these before pushing structural or asset changes:

```powershell
npm test
npm run play:build
```

For visual spot checks, run:

```powershell
npm run check:screenshots
```

Screenshots are written under `.codex-tmp/site-screenshots/`, which is ignored. The directory name predates the
current tooling and is kept only because `tools/check-site.mjs` still writes there.

## Cleanup Rules

- Keep live PDFs in root while public pages link to them.
- Remove local preview logs, archives, dependency folders, and one-off exports from the working copy instead of committing them.
- Update `sitemap.xml` and `robots.txt` whenever public URL policy changes.
