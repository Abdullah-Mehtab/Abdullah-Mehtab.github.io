# Play Authored Horizon Islet Correction

## Context

The previous horizon depth pass added useful distant islets, but they were generated directly in `Atmosphere.js` with Three.js geometry. That improved staging, but it did not fully honor the owner preference that serious world art should come from source-authored assets instead of runtime primitives.

## Decision

Move the horizon islet art into the Blender polish-props source and have runtime place that authored template.

- Added `EnvPolishDistantIslet` to `play-assets/source/blender/export_polish_props.py`.
- Regenerated only `play-src/assets/models/world/polish-props.glb`; car and FCC assets were not rebuilt.
- Updated `play-src/src/world/Atmosphere.js` to clone the authored islet template into quality-gated low, medium, and high static groups.
- Added verifier coverage for the authored template presence.

Quality gates remain:

- Low: 8 visible islets.
- Medium: 14 visible islets.
- High: 20 visible islets.

## Verification

Commands passed:

- `C:\Tools\blender-4.5.0-windows-x64\blender.exe --background --python play-assets\source\blender\export_polish_props.py -- --output play-src\assets\models\world\polish-props.glb`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- `.codex-tmp/play-verify-2026-05-29T17-19-01-754Z`

Observed verifier state:

- Atmosphere: `distantIsletTemplate: true`.
- Atmosphere: 20 total distant islets, 14 visible on medium.
- Mobile low tier: 8 visible distant islets.
- No console messages or page errors.
- Route replay: 39/39.
- Collider audit: 5/5.
- Circuit: 12/12 events, finish true.
- Protected FCC LOD, zone landmarks, water, surface feedback, UI, audio, and mobile probes passed.

Performance snapshot:

- Desktop: 318 renderer calls, 300,364 triangles, p95 8.4ms.
- Mobile low tier: 220 renderer calls, 157,902 triangles.
- Scene objects: 1,151 objects, 750 meshes, 11 lights.

Screenshots inspected:

- `04-water-interaction.png`

## Tradeoff

The Blender-authored version costs more than the procedural version, but it is still inside the verifier budgets and aligns better with the no-shortcuts asset direction.
