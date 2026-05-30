# Play instanced water splash pass

## Context

The active `/play` goal requires water and vehicle feedback to feel alive without adding avoidable runtime cost. The verifier already covered water interaction, but it only recorded final render metrics. The previous surface-feedback screenshot showed a transient high-cost frame, so active-driving render snapshots needed to become explicit verifier evidence.

## Decision

Water wheel splashes now use a fixed instanced pool instead of creating separate mesh/material pairs during driving. The splash mesh is hidden when no splash instances are active, so the pool does not add a constant idle/mobile draw call.

The `/play` verifier now records active render snapshots after the driving stress screenshot and the surface-feedback screenshot. Each snapshot records draw calls, triangles, visible scene counts, top render buckets, vehicle FX stats, water stats, and road detail stats. The verifier also asserts broad active-frame budgets and verifies that water splashes are backed by the instanced pool.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T00-34-06-331Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.65
- desktop p95 frame: 8.4 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 228
- mobile low triangles: 132532
- driving stress snapshot: 447 calls, 265986 triangles
- surface-feedback snapshot: 687 calls, 316762 triangles
- water splashes spawned: 24
- water splash capacity: 40
- route replay: 39/39 passed
- collider audit: 5/5 passed

Screenshots inspected from that verifier run:

- `04-water-interaction.png`
- `05-surface-feedback.png`
- `mobile-start.png`

## Notes

This is a water-feedback optimization and verifier-instrumentation checkpoint, not completion of the full visual overhaul. The new active snapshots confirm the next performance target: broad visible set-piece rendering during surface-feedback camera angles, especially `SETPIECE_District_Dressing` with 163 visible meshes/materials.
