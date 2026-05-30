# Play Road Surface Metadata

## Decision

Road visuals now feed vehicle surface metadata instead of every route behaving as one generic road.

The road mesh remains visual-only. The continuous terrain collider still owns the driving floor, and road detection samples the authored `roadPaths` segments to decide which visible road hierarchy the car is on.

## Why

The overhaul goal calls for surface-specific grip, sound, smoke, skid, drag, and feedback. Before this pass, `World.getSurfaceInfo()` returned only `road` for every road path, so the car could not feel different on plaza stone, security asphalt, stunt asphalt, dirt track, or bridge deck.

## Implementation Notes

- `Roads.getSurfaceAt(x, z)` returns the nearest matching authored road path by hierarchy-aware segment hit testing.
- `World.getSurfaceInfo()` preserves `id: "road"` for compatibility, but adds `roadId`, `roadHierarchy`, `audioId`, `effectId`, and per-road grip/drag/skid metadata.
- Vehicle controller drive state now exposes the road audio surface while keeping existing driving behavior compatible.
- Vehicle FX counters no longer let default road metadata overwrite grass, sand, or shore effect IDs.
- Audio rumble has distinct profiles for avenue, plaza, security, stunt, dirt, and bridge roads.
- Browser verification samples every road hierarchy and asserts that dirt/stunt/plaza profiles differ in grip, drag, skid, and audio IDs.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.

Verifier output folder: `.codex-tmp/play-verify-2026-05-30T04-19-14-117Z`

Key metrics from the passing browser run:

- Console errors: 0
- Page errors: 0
- Desktop FPS: 120.51
- Desktop p95 frame: 8.4ms
- Desktop draw calls: 373
- Desktop triangles: 227106
- Mobile low draw calls: 228
- Mobile low triangles: 132084
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Surface feedback: grass, sand, and shore all produced trail and smoke deltas
- Road metadata sampled: avenue, plaza, security, stunt, dirt, and bridge

## Failed Attempt

The first verifier run failed because the sample point for avenue sat on a junction and resolved as the higher-priority security road. The second failed because default road `audioId`/`effectId` values leaked into grass, sand, and shore during surface normalization, so the visible soft-surface FX were counted as road. Both were fixed before the passing run.

## Next Work

This improves game feel and verification coverage, but it is not a full art-direction finish. The next high-value slices are road layout/composition cleanup, authored terrain transitions, and district-level art replacement where the world still reads sparse or procedural.
