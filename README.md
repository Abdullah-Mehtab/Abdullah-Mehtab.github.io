# Abdullah Mehtab

Portfolio website for Abdullah Mehtab, focused on offensive security, full-stack engineering, DevOps, AI/ML, IoT, embedded systems, and project-based computer science work.

Live site:

https://abdullah-mehtab.github.io/

## Main Pages

```text
index.html              # Home, profile, proof points, skills, services, featured projects, timeline
projects.html           # 18-project portfolio across security, engineering, AI/ML, IoT, and systems
cyber-sentinel.html     # Cyber Sentinel final year project write-up
cv.html                 # Structured web resume with PDF downloads
todo.html               # Never-Ending List
```

## Highlights

- Offensive security experience at Tkxel.
- Cyber Sentinel final year project using Wazuh, ELK Stack, Suricata, automation, and alerting.
- 18 documented projects across security, DevOps, backend, machine learning, IoT, embedded systems, games, and data structures.
- Web CV with resume downloads.
- Moderated comments on selected pages and project entries.
- Theme and cursor customization for visitors.

## Visitor Proof

The site records lightweight visitor analytics through Supabase. Events include page slug, event type, selected theme/cursor/motion, referrer, optional source token, stable visitor/session IDs, hashed browser fingerprint data, and a hashed IP signal from the visitor-proof edge function.

## Tech

The site is built with static HTML, CSS, and JavaScript and is hosted through GitHub Pages. Interactive comments and lightweight visitor proof use Supabase.

## Development Workflow

This repository is the source for the live root GitHub Pages site:

https://abdullah-mehtab.github.io/

Run the maintenance checks before pushing structural, asset, or play-world changes:

```powershell
npm run test
npm run play:build
```

See `docs/maintenance.md` before moving root files or public assets. The live GitHub Pages URLs are intentionally protected even when the root directory looks busy.

Use this workflow for future updates:

```powershell
git add .
git commit -m "Describe the update"
git push origin main
```

The `Abdullah-Mehtab/Abdullah-Mehtab` repository is profile-only and should not receive website updates.
