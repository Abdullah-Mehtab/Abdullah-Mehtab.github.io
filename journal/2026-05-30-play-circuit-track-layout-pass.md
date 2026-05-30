# Play Circuit Track Layout Pass

## Decision

Add a visible circuit route layer to the stunt/circuit district using the existing `circuitCheckpoints` path. The route should read as racing-line guidance with curb and apex markers, not as a broad new road system painted over the island.

## Reasoning

The circuit gameplay already had checkpoint targets, gates, arrows, and scoring, but the ground path between targets was not readable enough from normal driving views. A continuous but narrow guide helps the player understand the route without changing the protected car, the FCC/S-block model, zone ids, public URLs, or achievement storage.

The first material pass was too dark and broad in screenshots. I narrowed the guide from a road-width ribbon to a slim racing line and moved the curbs inward so it looks like stunt/circuit paint instead of a placeholder road overlay.

## Implementation

- `play-src/src/world/StuntPark.js` now creates `STUNT_Circuit_Track_Layout` from `circuitCheckpoints`.
- The base route is one lightweight mesh named `STUNT_Circuit_Racing_Line`.
- Curb edges and apex markers use instanced meshes.
- Decorative circuit details are hidden on low quality, while the base route remains visible.
- No new physics colliders were added.
- `tools/verify-play.mjs` now asserts circuit segment, curb, and apex marker counts.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed with output in `.codex-tmp/play-verify-2026-05-30T07-03-00-846Z/result.json`.
- `npm test` passed.

Latest browser verification highlights:

- Console messages: 0.
- Page errors: 0.
- Mobile low draw calls: 229.
- Mobile low triangles: 132302.
- Active driving draw calls: 518.
- Active driving triangles: 265104.
- Route replay: 39 passed, 0 failed.
- Collider audit: 5 checked, 0 failures.
- Circuit track segments: 12.
- Circuit track curbs: 24.
- Circuit apex markers: 11.

Screenshots reviewed:

- `.codex-tmp/play-verify-2026-05-30T07-03-00-846Z/zone-circuit.png`
- `.codex-tmp/play-verify-2026-05-30T07-03-00-846Z/zone-drift.png`
- `.codex-tmp/play-verify-2026-05-30T07-03-00-846Z/06-circuit-target.png`

## Follow-Up

This is not the final circuit art pass. The stunt district still needs deeper authored source art, better track-side composition, and more physical affordances before it can be considered finished against the full `/play` overhaul goal.
