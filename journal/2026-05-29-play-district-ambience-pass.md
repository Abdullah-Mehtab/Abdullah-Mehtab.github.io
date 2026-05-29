# Play District Ambience Pass

## Context

The island has route signs, district dressing, animated water, foliage wind, and existing life signals. It still needs more motion inside each district so the world feels less static when the car is not interacting with a terminal. This pass adds cheap animated ambience that covers every portfolio district without adding colliders or per-object draw calls.

## Decision

Add one instanced district ambience system in `play-src/src/world/SetPieces.js`:

- 64 total themed motes distributed round-robin across the 16 zones.
- Medium quality shows 48 motes.
- Low/mobile quality shows 16 motes, one per zone.
- The motes orbit and bob around their district center.
- The material uses additive blending so the effect reads as small light/activity instead of debris.
- No physics bodies or colliders were added.

The verifier now checks that district motes exist, animate, and reduce correctly on low quality.

## Verification

Commands run:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T04-53-46-822Z/result.json`

Verifier results:

- Console messages: 0
- Page errors: 0
- Route replay: 39/39 passed
- District motes: 64 total
- Medium visible district motes: 48
- Low/mobile visible district motes: 16
- District mote animation: detected
- Desktop p95 frame time: 8.4ms
- Desktop draw calls: 259
- Desktop triangles: 175094
- Mobile low-tier draw calls: 207
- Mobile low-tier triangles: 156412
- Collider audit failures: 0

Screenshots inspected:

- `02-start-driving.png`
- `zone-security.png`
- `zone-projects.png`
- `mobile-start.png`

## Remaining Work

This improves the world-life layer, but the full overhaul still needs more authored district modeling, better terrain composition, richer district-specific interactions, and continued performance profiling.
