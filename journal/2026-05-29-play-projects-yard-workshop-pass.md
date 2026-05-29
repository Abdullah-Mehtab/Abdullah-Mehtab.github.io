# Play Projects Yard Workshop Pass

## Decision

Projects Yard was the next visible weak slice after the horizon/islet correction because the verifier screenshot still showed a broad flat pad with sparse workshop identity.

I added four source-authored Blender props to the polish prop pack:

- `EnvPolishProjectGantry`
- `EnvPolishProjectDisplayRack`
- `EnvPolishProjectPartsCart`
- `EnvPolishProjectCableReel`

The runtime now stages those props with a warmer assembly deck, process lane, guide marks, yard trims, surface marks, rails, lamps, and a planter cluster around the existing `projects` zone. This keeps the zone id, portfolio action, car, and FCC model untouched.

## Verification

Commands run:

- `C:\Tools\blender-4.5.0-windows-x64\blender.exe --background --python play-assets\source\blender\export_polish_props.py -- --output play-src\assets\models\world\polish-props.glb`
- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Latest verifier output:

- Directory: `.codex-tmp/play-verify-2026-05-29T18-05-15-162Z`
- Console/page errors: none
- Desktop: 324 calls, 327,922 triangles, p95 8.4ms, 120.54 FPS
- Mobile low: 221 calls, 182,374 triangles
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Authored project assets: all four new templates loaded and placed
- District composition: 15 pads, 70 path marks, 13 lamps, 3 planters, 144 authored assets, 80 edge trims, 13 surface marks, 6 rails

## Notes

The updated `zone-projects.png` screenshot shows a substantially denser workshop yard than the prior flat-pad version. It is still not the final whole-island quality bar; this pass specifically moves the Projects Yard toward the authored district standard without claiming the full `/play` overhaul is complete.
