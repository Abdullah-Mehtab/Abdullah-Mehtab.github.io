# /play Authored District Story Props Pass

## Decision

Replace remaining district story clusters made from local placeholder primitives with Blender-authored prop templates in `polish-props.glb`.

## Why

The overhaul goal rejects random procedural boxes as finished world art. Projects, Skills, Awards, Todo, and Behind The Build still had some local primitive clusters that read like placeholders even though the main landmark assets were authored.

## Changed

- Added authored source templates:
  - `EnvPolishBuildCrateStack`
  - `EnvPolishTerminalBank`
  - `EnvPolishArchiveStepCluster`
  - `EnvPolishTodoCardStack`
- Replaced local crate/screen/card/step clusters in district dressing with those templates.
- Added `districtStory` runtime stats and verifier assertions so the pass fails if these authored props are missing.
- Regenerated only `play-src/assets/models/world/polish-props.glb` and rebuilt the GitHub Pages `/play` assets.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T11-34-08-433Z/result.json`
- Screenshots inspected:
  - `zone-projects.png`
  - `zone-skills.png`
  - `zone-awards.png`
  - `zone-todo.png`
  - `zone-behind.png`

## Metrics

- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 299.
- Desktop triangles: 263,034.
- Mobile draw calls: 236.
- Mobile triangles: 233,598.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- `polish-props.glb`: 1,804,732 bytes.
- `districtStory`: 10 authored placements, 6 crate stacks, 2 terminal banks, 1 archive step cluster, 1 todo card stack.

## Remaining Gap

This improves the authored prop quality, but the screenshots still show too much empty green space around Todo and Behind The Build. The next district-composition pass should add authored pads, paths, approach clutter, small lighting, and playable visual framing there rather than just adding isolated props.
