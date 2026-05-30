## Context

The recent culling passes reduced heavy district dressing and route composition visibility to keep `/play/` within desktop and mobile budgets. That helped performance, but it also made long-view district readability more dependent on remaining distant props.

## Decision

Add a cheap district signal layer to the existing world-life system instead of re-expanding heavy set-piece radii. The signal layer is a single animated instanced mesh keyed to the existing `worldZones` positions and colors. It is treated as diegetic wayfinding/life feedback, not as a replacement for authored district modeling.

Quality tiers now budget the signal count:

- low: 6 visible district signals
- medium: 12 visible district signals
- high: 16 visible district signals

The shared instanced life meshes now reduce `mesh.count` when a lower quality tier is active, so low/mobile tiers reduce actual rendered instances rather than only hiding matrices.

## Verification

Commands:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Verifier output:

- Output folder: `.codex-tmp/play-verify-2026-05-30T01-45-54-103Z`
- Console errors: 0
- Page errors: 0
- Desktop FPS: 120.51
- Desktop p95 frame: 8.4 ms
- Desktop calls/triangles: 367 / 222122
- Mobile low calls/triangles: 229 / 132336
- Route replay: 39 / 39 passed
- Collider audit: 5 / 5 passed
- World life district signals: 16 total, 12 visible on medium, 6 visible on low
- World life district signal animation: passed

Screens inspected:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `zone-education.png`
- `mobile-start.png`

## Notes

This checkpoint improves long-distance readability and mobile-tier cost control. It does not complete the full Bruno-level overhaul. The next meaningful art-direction work should replace more of the current flat terrain/road impression with authored road-edge silhouettes, terrain height cues, and district-specific landmarks while staying inside the verified render budgets.
