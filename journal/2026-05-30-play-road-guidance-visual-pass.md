# Play Road Guidance Visual Pass

## Decision

Reworked route guidance markers so they read as road markings instead of debug-style arrows. Road-network chevrons are now smaller paired stripe geometry placed on the road surface, and authored set-piece route arrows use compact two-stripe markers instead of filled cone-and-stem arrows.

This keeps guidance readable while reducing the amateur overlay look visible in the start-driving screenshot.

## Verification Notes

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T21-03-11-203Z`.
- Checked `02-start-driving.png`; the start hub route guidance is visually smaller and less dominant.
- App-ready load time: 4565ms.
- Desktop verifier metrics: 106.35 FPS, p95 frame 16.7ms, 348 draw calls, 237106 triangles.
- Mobile low tier metrics: 232 draw calls, 141944 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.
- No console messages or page errors were reported.

## Follow-Up

The instantaneous debug readout can still show lower momentary FPS in screenshots, but it is only visible under `?debugDrive=1`. Keep using verifier p95/FPS metrics for the performance gate while continuing to profile real interactive runs.
