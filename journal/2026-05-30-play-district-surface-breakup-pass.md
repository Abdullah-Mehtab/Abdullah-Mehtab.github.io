# Play District Surface Breakup Pass

## Decision

Add authored visual breakup patches to district courts without adding colliders or another render layer.

The route-threshold pass made road arrivals read better, but screenshots still showed broad flat district courts, especially around the stunt/circuit areas. This checkpoint adds more surface variation while preserving the protected Sabre Turbo-style car identity, the exact FCC/S-block model identity, public `/play/` behavior, and existing driving physics.

## Implementation Notes

- Added `districtSurfaceBreakups` layout data in `play-src/src/world/worldData.js`.
- `Terrain` now folds those breakup patches into the existing `ToyIslandSurface_Pavers` instanced mesh instead of creating a separate mesh.
- The existing paver material opacity was raised slightly so the new patches are visible enough to read in screenshots.
- `surfaceDetailStats` now records `breakups`, and `tools/verify-play.mjs` fails if the layer disappears.

I first considered a separate material/mesh for breakups, but that would have added another draw call for a subtle overlay. Merging the patches into the existing paver instance layer kept mobile low quality at the current measured 228 calls.

## Verification

Verified:

- `npm run play:build`: passed
- `npm run play:verify`: passed
- `npm test`: passed

Browser verifier evidence from `.codex-tmp/play-verify-2026-05-30T06-38-49-115Z/result.json`:

- Console messages: 0
- Page errors: 0
- Route replay: 39 passed, 0 failed
- Collider audit: 5 checked, 0 failures
- Surface details: 10 districts, 45 seams, 31 pavers, 20 accents, 31 breakups
- Road transitions: 17 aprons, 60 guide bars, 3 visible transition meshes on desktop
- Mobile low calls: 228
- Mobile low triangles: 132446
- Active driving calls: 508
- Active driving triangles: 264772

## Follow-Up

This is still not the final art-direction fix. The large stunt/circuit court and some district pad silhouettes need deeper authored massing, terrain shaping, and road/plaza layout changes rather than more surface overlays.
