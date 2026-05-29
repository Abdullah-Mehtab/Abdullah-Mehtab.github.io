# Play Start Sign Language Pass

## Decision

Changed the Start Hub billboard from `CLICK TO DRIVE` to `START LINE`.

The old copy made the world read like a web instruction panel. The replacement keeps the same sign, placement, route, and interaction behavior, but frames the spot as an authored race/start location.

## Verification Notes

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T21-27-47-849Z`.
- Checked `01-title.png`, `02-start-driving.png`, and `mobile-start.png`; the start sign now reads `START LINE` while the first-frame composition, car staging, and mobile layout still render.
- App-ready load time: 2958ms.
- Desktop verifier metrics: 120.57 FPS, p95 frame 8.4ms, 348 draw calls, 237106 triangles.
- Mobile low tier metrics: 232 draw calls, 141944 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.
- No console messages or page errors were reported.

## Follow-Up

This is a small language/immersion correction, not a completion claim. The next meaningful work should target visible world composition or the `SETPIECE_District_Dressing` render cost shown in the verifier profile.
