# Abdullah Mehtab

Portfolio website for Abdullah Mehtab, focused on offensive security, full-stack engineering, DevOps, AI/ML, IoT, embedded systems, and project-based computer science work.

Live site:

https://abdullah-mehtab.github.io/

## Main Pages

```text
index.html              # Home, profile, proof points, skills, services, featured projects, timeline
projects.html           # Project portfolio across security, engineering, AI/ML, IoT, and systems
cyber-sentinel.html     # Cyber Sentinel final year project write-up
cv.html                 # Structured web resume with PDF downloads
todo.html               # Never-Ending List
play/                   # Portfolio Drive, a driveable 3D island built from play-src/
classic/                # The original site, kept online deliberately
admin.html              # Sign-in-gated comment moderation, not linked from the site
```

The two CV downloads are served from fixed, versionless URLs so a link handed out today keeps
working after the next update:

```text
Abdullah-Mehtab-Master-CV.pdf
Abdullah-Mehtab-Cyber-CV.pdf
```

The saved file still carries its version. Each link sets `download="...-vX.Y.pdf"`, so the path stays
stable while the downloaded file says which version it is.

Updating a CV therefore means two edits: replace the versionless file, and bump the `download`
filename on that link in `cv.html`. `npm test` fails if the two stop agreeing. Numbered exports kept
beside them are a local archive and are not published.

## Highlights

- Offensive security experience at Tkxel.
- Cyber Sentinel final year project using Wazuh, ELK Stack, Suricata, automation, and alerting.
- 19 documented projects across security, DevOps, backend, machine learning, IoT, embedded systems, games, and data structures.
- Web CV with resume downloads.
- Moderated comments on selected pages and project entries.
- Theme and cursor customization for visitors.

## Visitor Proof

The site records lightweight visitor analytics through Supabase. Events include page slug, event type, selected theme/cursor/motion, referrer, optional source token, stable visitor/session IDs, hashed browser fingerprint data, and a hashed IP signal from the visitor-proof edge function.

## Tech

The site is built with static HTML, CSS, and JavaScript and is hosted through GitHub Pages. Interactive comments and lightweight visitor proof use Supabase. There is no build step for the site itself — the files in this repository are the files that ship.

`play/` is the exception: it is built output. Edit `play-src/` and rebuild.

## Requirements

Node.js 22 LTS, matching the version CI runs. Install it system-wide, then `npm ci` from the repository root.
The Blender-backed asset export additionally needs Blender 4.5.

## Development Workflow

This repository is the source for the live root GitHub Pages site:

https://abdullah-mehtab.github.io/

Run the maintenance checks before pushing structural, asset, or play-world changes:

```powershell
npm test
npm run play:build
```

`npm test` validates the drive-world map and checks that every protected route and local asset
reference still resolves. It does not exercise behaviour, so a green run is a link check, not proof
that a change works.

See `docs/maintenance.md` before moving root files or public assets. The live GitHub Pages URLs are intentionally protected even when the root directory looks busy.

Use this workflow for future updates:

```powershell
git add .
git commit -m "Describe the update"
git push origin main
```

The `Abdullah-Mehtab/Abdullah-Mehtab` repository is profile-only and should not receive website updates.
