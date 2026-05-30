# Play shoreline foam flecks

## Context

The active `/play` goal still requires a world that feels alive without losing performance. The water pass already had animated foam rings, glints, wave lanes, bobbing props, wheel splashes, wake rings, water drag, and submerge respawn. The shoreline still needed more small-scale motion at the land-water boundary.

## Decision

Add a cheap instanced shoreline foam-fleck layer in `play-src/src/world/Water.js` instead of adding per-fleck meshes or heavier shader/post work. The flecks follow the same irregular coast outline as the terrain, pulse and drift slightly, and are quality-tiered:

- low: 24 visible flecks
- medium: 72 visible flecks
- high: 112 visible flecks

The verifier now records mobile water stats and enforces that mobile low quality keeps visible shoreline flecks at or below 24.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T00-00-50-164Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.63
- desktop p95 frame: 8.4 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 234
- mobile low triangles: 133152
- route replay: 39/39 passed
- collider audit: 5/5 passed
- medium water shoreline flecks: 112 total, 72 visible
- mobile low water shoreline flecks: 112 total, 24 visible

## Notes

This is a focused water-life checkpoint, not completion of the full Bruno-level overhaul. The next useful work should continue replacing weak authored areas and reducing draw calls while preserving the protected car and FCC model identities.
