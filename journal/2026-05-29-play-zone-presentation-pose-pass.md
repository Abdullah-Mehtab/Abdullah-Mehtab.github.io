# /play Zone Presentation Pose Pass

## Decision

Add authored presentation poses and road-safe respawn poses for every `/play` zone.

## Reasoning

The latest verified screenshots showed that some authored district work was being hidden by generic camera and respawn behavior. Career Signal Office was the clearest failure: the verifier framed the roof and broad grass instead of the landmark composition. A single generic zone focus offset is not enough for a finished driving portfolio because each district has different scale, road approach, and silhouette.

## Implementation Notes

- Added `zonePresentation` metadata for all 16 stable zone ids.
- `World.getRespawnPose()` now prefers authored road-safe respawn poses before falling back to generic offsets.
- `World.getPresentationPose()` provides per-zone cinematic camera, target, and FOV.
- `Game.focusZone()` now uses authored presentation poses, so panels and project gallery focus the actual district composition.
- `CameraRig.setCinematic()` now accepts an optional FOV and eases toward it while focused.
- `npm run play:verify` now focuses each zone before screenshot capture and asserts every zone has presentation metadata, finite camera framing, and road-surface respawns.

## Verification

Commands run:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- Result file: `.codex-tmp/play-verify-2026-05-29T12-12-16-966Z/result.json`
- Console/page errors: 0
- Route replay: 39/39
- Collider audit: 5/5
- Zone presentation samples: 16/16
- Bad zone respawns: 0
- Bad zone cameras: 0
- Desktop p95 frame: 8.4ms
- Desktop FPS sample: 120.57
- Desktop draw calls: 300
- Desktop triangles: 326,042
- Mobile quality: low
- Mobile draw calls: 238
- Mobile triangles: 296,678

Screenshots inspected:

- `zone-career.png`
- `zone-cv.png`
- `zone-education.png`
- `zone-security.png`
- `zone-todo.png`
- `zone-circuit.png`
- `zone-skills.png`
- `02-start-driving.png`
- `mobile-start.png`
- `map.png`

## Failed First Attempt

The first verifier run failed because the initial authored respawns for Security, Sentinel, Skills, Todo, and Circuit were visually plausible but landed on `grass` according to runtime surface detection. The fix was to move those respawn poses onto actual route centerlines and rerun the build and verifier.

## Remaining Risk

This improves presentation framing and fast-travel safety, but it does not finish the full Bruno-level goal. Some district models are still simple, the map still reads more utilitarian than playful, and the next high-value work should target deeper authored district modeling plus a continued optimization pass against the heavy district dressing bucket.
