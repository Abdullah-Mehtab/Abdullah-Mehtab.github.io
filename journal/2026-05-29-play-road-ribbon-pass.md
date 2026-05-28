# /play Road Ribbon Pass

## Decision

The road visuals should stop reading as chained rectangular pads. This checkpoint keeps roads non-colliding, but renders them as continuous path ribbons so the route language is smoother and less arbitrary.

## Implementation Notes

- Replaced per-segment visual road rectangles with Catmull-Rom path ribbon geometry for shoulders, driving surfaces, and curbs.
- Lane dashes now follow the sampled route tangent instead of each straight segment midpoint.
- Junction caps now use round low-poly cylinders instead of square boxes.
- Existing `roadSegments` stay as route metadata for prop spacing and proximity checks; physics still uses the continuous terrain collider so road visuals cannot become hidden blockers.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-28T23-30-30-096Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.55; p95 frame: 8.4ms.
- Render calls: 515; triangles: 270,374.
- Scene objects: 843 total, 628 meshes, 11 lights.
- Gameplay probes passed, including drive, handbrake, boost, jump, burnout, and wheelie.
- Water probe still passed after the road geometry change.

## Remaining Risk

The roads now have smoother geometry, but this is not the full road-design target. The island still needs stronger district-specific road markings, more authored approach lanes, better ramps/shortcuts, and a visual cleanup pass for signs and roadside composition.
