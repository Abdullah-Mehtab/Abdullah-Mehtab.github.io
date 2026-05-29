# Play Meadow Density Pass

## Context

The current `/play` world is much healthier than the original flat island, but screenshots still show broad green fields between authored districts. The owner explicitly said the island size is acceptable and the problem is that too much of it feels empty.

## Decision

Add visual-only meadow detail in `worldData` instead of adding physical prop clutter:

- Added 8 meadow detail patches around CV, central gallery, career approach, sentinel approach, harbor north, south loop, FCC north, and data ridge.
- Added 6 field motif clusters with low berms and colored ribbons in sparse meadows.
- Kept these as non-colliding visual terrain motifs, so they cannot create invisible blockers.
- Kept the existing low-quality behavior: field motifs remain hidden on mobile low.
- Raised verifier thresholds for meadow patches and field motif counts so this density does not regress silently.

This pass intentionally improves the “large island but empty grass” problem without touching protected car/FCC assets, public URLs, route ids, or collision.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed after the verifier threshold update using `.codex-tmp/play-verify-2026-05-29T23-49-27-017Z`.
- `npm test` passed.
- Screenshots reviewed: `zone-cv.png`, `zone-projects.png`, `zone-sentinel.png`, and `mobile-start.png`.

Measured after this pass:

- Console/page errors: 0.
- Load time: 3295ms.
- Desktop FPS: 120.89; p95 frame: 8.4ms.
- Desktop render calls: 355; triangles: 237,870.
- Mobile low render calls: 232; triangles: 133,056.
- Meadow detail patches: 36.
- Field motif clusters: 20.
- Field motif visible total on medium: 139.
- Field motif visible total on mobile low: 0.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 passed.

## Remaining Risk

This is a terrain-density improvement, not a final art-direction finish. The fields read less empty, but the broader goal still needs stronger authored district modeling, better road/terrain transitions, more physical interactions, and continued car/camera/water tuning.
