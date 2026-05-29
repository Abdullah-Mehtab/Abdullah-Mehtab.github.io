# Play Water Depth Pass

## Decision

The `/play` ocean now has tiered animated glint strips on top of the existing water shader, foam rings, wakes, splashes, and bobbing props. The pass does not alter water drag, submerge respawn, car behavior, FCC/S-block assets, or public routes.

## Reasoning

The water already had functional physics and interaction probes, but screenshots still showed a broad flat ocean plane. The new strips add cheap readable motion and horizon depth while staying compatible with the existing quality tiers.

## Implementation Notes

- `play-src/src/world/Water.js` adds `ToyIslandOceanGlint_Strips`, an instanced non-colliding surface detail mesh.
- Low/medium/high quality tiers show 8/20/34 glints respectively.
- Glints update through matrix animation and one shared material, avoiding per-frame mesh creation.
- `tools/verify-play.mjs` now fails if water glint authoring or medium-tier visibility disappears.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest screenshot/metrics directory: `.codex-tmp/play-verify-2026-05-29T13-20-41-109Z`.
- Key metrics from that verifier run: route replay 39/39, collider audit 5/5, no console/page errors, p95 frame time 8.4ms, desktop draw calls 310, mobile low draw calls 248.
- Water probe from that run: 34 surface glints, 20 visible at medium, 3 foam rings, 2 visible foam rings at medium, 16 bobbing props, and 10 visible bobbing props at medium.

## Follow-Up

The water is more alive, but the island still needs stronger authored road surface treatment, district-specific architecture, and landmark composition before the full art-direction goal can be considered complete.
