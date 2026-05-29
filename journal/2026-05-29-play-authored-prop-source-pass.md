# Play Authored Prop Source Pass

## Context

The active `/play/` goal requires serious scenery to use authored source assets instead of relying on random procedural boxes. `Props.js` still used runtime box/cylinder fallbacks for road lanterns and district benches/crates/barrels even though matching GLB templates were already loaded.

## Decision

Make `Props.js` prefer existing Blender-authored templates for road lanterns and placed district props. Keep primitive fallbacks only as explicit emergency compatibility paths, and expose prop-source stats to the verifier.

Reasoning:
- This moves the world toward authored art direction without touching the protected Sabre Turbo-style car or FCC/S-block model.
- Existing GLB templates already ship with the page, so the change does not add another asset pack.
- Verifier stats prevent a silent return to fallback primitives.

## Implementation Notes

- Road lanterns now clone `EnvPolishRouteLantern`.
- Placed benches, crates, and barrels now clone `EnvBench`, `EnvCrate`, and `EnvBarrel` when available.
- `Props.getStats()` reports authored and fallback counts.
- `tools/verify-play.mjs` now fails if road lanterns or district props fall back while authored templates are expected.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T10-52-46-218Z`.
- `npm test` passed.
- Screenshots reviewed: `02-start-driving.png`, `zone-projects.png`, `zone-education.png`, and `mobile-start.png`.

Verifier highlights:
- Console messages: 0.
- Page errors: 0.
- Desktop p95 frame: 8.4 ms.
- Desktop draw calls: 296.
- Desktop triangles: 242,510.
- Mobile draw calls: 232.
- Props: 9 authored road lanterns, 12 authored placed props, 0 fallback lanterns, 0 fallback props, 29 shore rocks.
- Route replay: 39/39.
- Collider audit: 5/5.

## Remaining Risk

The authored prop source pass improves asset provenance and local composition, but it is not the final art target. Future passes still need deeper district modeling, better authored silhouettes, stronger motion, and continued optimization as visual density increases.
