# Play Harbor Composition Pass

## Context

The Contact / Signal Harbor screenshot still read as a broad sand pad with a simple signal tower. That did not meet the current goal requirement for authored, district-specific staging.

## Change

- Added Blender-source harbor props to the polish pack:
  - `EnvPolishHarborPier`
  - `EnvPolishHarborAntenna`
  - `EnvPolishHarborCargoStack`
  - `EnvPolishHarborShade`
- Rebuilt `play-src/assets/models/world/polish-props.glb`.
- Rebuilt the Contact / Signal Harbor composition with two pads, pier elements, cargo stacks, shade kiosk, antenna, lamps, beacons, path marks, and yard edge detail.
- Added `getHarborStats()` and verifier assertions so the harbor composition cannot silently regress to a sparse pad.
- Did not add harbor colliders; this pass is visual staging only and should not introduce movement blockers.

## Verification

- `C:\Tools\blender-4.5.0-windows-x64\blender.exe --background --python play-assets\source\blender\export_polish_props.py -- --output play-src\assets\models\world\polish-props.glb` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T12-33-43-459Z`.
- Screenshot inspected: `zone-contact.png`.

Key verifier metrics:

- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console messages: 0.
- Page errors: 0.
- Desktop p95 frame: 8.4 ms.
- Desktop FPS: 120.69.
- Desktop draw calls: 304.
- Desktop triangles: 378,022.
- Mobile quality: low.
- Mobile draw calls: 242.
- Mobile triangles: 348,658.
- Polish prop GLB size: 2,305,552 bytes.
- Harbor stats: 2 pads, 16 path marks, 12 authored assets, 3 pier elements, 3 cargo stacks, 1 shade structure, 4 lamps, 3 beacons.

## Remaining Risk

The harbor now has a stronger authored read, but the world still needs deeper final-pass art direction: stronger water integration at the pier edge, better camera framing, audio stingers, and interaction feedback for the contact action.
