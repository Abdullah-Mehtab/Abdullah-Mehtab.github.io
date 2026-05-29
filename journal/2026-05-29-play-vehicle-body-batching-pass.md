# Play Vehicle Body Batching Pass

## Context

The verifier profile showed the protected Sabre Turbo-style vehicle as the largest remaining draw-call bucket. The car identity is protected, so this pass only considered geometry batching that preserves the authored GLB shape, wheel pivots, glass, and existing vehicle behavior.

## Decision

Batch only non-wheel, non-glass vehicle body meshes after the GLB materials are prepared at runtime. Wheel and steering ancestors remain separate so wheel spin and front-wheel steering still use the existing named pivots. Glass, windshield, windows, and transparent materials also remain separate to avoid ordering or identity regressions.

This is a runtime batching optimization. The committed `sabre-turbo.glb` source asset and its protected visual identity are not replaced.

## Verification

Baseline verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T02-35-03-443Z`
- Desktop medium: 482 render calls, 286290 triangles, 850 objects, 577 meshes
- Vehicle bucket: 139 meshes/materials
- Mobile low: 242 render calls, 104086 triangles

After vehicle body batching:

- `.codex-tmp/play-verify-2026-05-29T02-43-02-834Z`
- Desktop medium: 427 render calls, 291278 triangles, 789 objects, 516 meshes, 120.6 FPS, 8.4 ms p95 frame time
- Vehicle bucket: 78 meshes/materials
- Mobile low: 181 render calls, 104086 triangles
- Route replay: 39/39 segments passed
- Collider audit: 5/5 probes passed
- Console/page errors: 0

Vehicle behavior still passed:

- Boost, jump, burnout, wheelie, handbrake, landing, impact audio, and route replay all passed verifier checks.
- Screenshots inspected: `02-start-driving.png`, `03-driving-stress.png`, `zone-security.png`, `mobile-start.png`.

Full test suite:

- `npm test` passed
- `play:validate-map` passed: 12 road paths, 39 road segments, 16 zones
- `check:site` passed: 12 protected routes, 7 runtime files, and local static references verified

## Remaining Work

The optimization trajectory is much better, but the final requested product is still not done. Remaining measured contributors include district dressing, road batching, security/start set pieces, shoreline props, and the larger art-direction/game-feel work that needs authored modeling and iteration rather than only batching.
