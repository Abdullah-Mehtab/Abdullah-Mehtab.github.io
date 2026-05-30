# Play Route Threshold Pass

## Decision

Added a non-colliding road transition layer to make district arrivals read as authored route thresholds instead of hard road-to-pad seams.

This targets the visible flatness in the current screenshots: roads often meet district courts as separate layers, which makes the world feel more like placed boards than a built driving environment.

## Implementation Notes

- Added `routeThresholds` to `play-src/src/world/worldData.js` as authored layout data for 17 arrival points.
- `Roads` now builds three low-cost instanced transition layers:
  - `ROAD_Transition_Aprons`
  - `ROAD_Transition_Edge_Bands`
  - `ROAD_Transition_Guide_Bars`
- The transition layer is visual-only. It adds no colliders and does not affect vehicle movement.
- The layer is included in the existing road detail quality path, so low/mobile hides it while medium/high keep it visible.
- The verifier now checks transition counts so future road passes do not accidentally drop the layer.

## Verification

Verified:

- `npm run play:build`: passed
- `npm run play:verify`: passed
- `npm test`: passed

Browser verifier evidence from `.codex-tmp/play-verify-2026-05-30T06-20-51-826Z/result.json`:

- Console messages: 0
- Page errors: 0
- Route replay: 39 passed, 0 failed
- Collider audit: 5 checked, 0 failures
- Road transition aprons: 17
- Road transition guide bars: 60
- Visible transition meshes on desktop: 3
- Visible road detail meshes on mobile low: 0
- Mobile low calls: 228
- Mobile low triangles: 132322

Screenshot review:

- `zone-landing.png` shows stronger route continuity around the start road.
- `zone-cv.png` shows more readable surface stitching into the CV court.
- `zone-circuit.png` still exposes broad flat stunt/circuit pad shape; the remaining issue is the pad/district composition itself, not just missing route threshold details.

## Follow-Up

The next pass should attack the broad district pad geometry, especially stunt/circuit and other large court surfaces. The threshold layer helps road continuity, but the island still needs deeper authored terrain shape and district massing to move closer to the art bible.
