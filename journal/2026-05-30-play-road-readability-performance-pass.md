# Play Road Readability And Performance Pass

## Context

The `/play/` overhaul remains active. This pass focused on cleaning noisy road/circuit visuals and recovering performance headroom without touching the protected Sabre-style car or exact FCC/S-block model.

## Decision

- Tuned medium/high quality visibility radii so default desktop does not keep as many distant broad set-piece batches active at once.
- Kept low-quality mobile secondary set pieces hidden and also disabled low-quality cloud shadows to recover draw-call headroom.
- Reduced road stripe, reflector, chevron, surface-detail, and map circuit visual loudness so roads read less cluttered.
- Changed the career route from a right-side return loop into a short approach spur, while keeping the career stop reachable and preserving all zone ids.
- Demoted the map circuit line/dots so they read as optional time-trial guidance instead of a bright circular road.

## Failed Attempt

I first ended the career road directly at the career zone center. `npm run play:validate-map` rejected that with `career overlaps a driving lane: 0.00m from road center.` The endpoint was moved beside the zone instead, and validation then passed.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output at `.codex-tmp/play-verify-2026-05-30T05-21-11-574Z`.
- `npm test` passed.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Mobile low: 228 draw calls, 132322 triangles.
- Desktop verifier summary: 391 draw calls, 232170 triangles, average frame 8.29ms, p95 8.4ms, FPS 120.57.
- Protected FCC model stayed exact near-field: 139068 exact triangles, silhouette mode only at distance.
