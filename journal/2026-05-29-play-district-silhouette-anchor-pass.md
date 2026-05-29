# /play District Silhouette Anchor Pass

## Decision

Add three Blender-authored polish prop templates to improve district silhouettes and authored place identity without touching the protected car or FCC/S-block model:

- `EnvPolishSignalSpire`
- `EnvPolishWorkshopCanopy`
- `EnvPolishGardenArch`

These are source-authored in `play-assets/source/blender/export_polish_props.py`, exported into `play-src/assets/models/world/polish-props.glb`, and then copied into `play/game-assets/polish-props.glb` by the normal Vite build.

## Placement

The pass adds measured silhouette anchors to Projects, Sentinel, Skills, Todo, Career, Behind The Build, and Potato/Farm. FCC Grove also gets a garden arch as surrounding staging, while the FCC model itself remains untouched.

## Verification

Commands run:

- `C:\Tools\blender-4.5.0-windows-x64\blender.exe --background --python play-assets\source\blender\export_polish_props.py -- --output play-src\assets\models\world\polish-props.glb`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- Result: passed
- Output directory: `.codex-tmp/play-verify-2026-05-29T13-54-29-641Z`
- Console errors: 0
- Page errors: 0
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Desktop p95 frame: 8.4ms
- Desktop draw calls: 309
- Desktop triangles: 397,224
- Mobile low draw calls: 226
- Mobile low triangles: 286,646
- Authored district assets: all expected templates and placements present
- District silhouette anchors: 7
- Protected FCC near mode: exact model visible
- Protected FCC far mode: silhouette visible, exact model hidden

## Screenshot Notes

Checked screenshots:

- `zone-projects.png`: workshop canopy now gives Projects a clearer foreground structure.
- `zone-sentinel.png`: signal spire adds a readable vertical landmark.
- `zone-education.png`: FCC model remains the visual hero; added arch is surrounding staging only.
- `zone-skills.png`: signal spire is visible near the Skills area.
- `zone-career.png`: career area still needs broader terrain and prop density work; the pass only adds one vertical anchor.
- `zone-todo.png`: garden arch adds an entrance-style frame to the Todo pad.
- `zone-behind.png`: workshop canopy makes the Behind The Build pad read more like a built workspace.
- `zone-potato.png`: farm area still needs stronger field/gameplay design; arch helps entry framing but is not enough.
- `mobile-start.png`: low-quality tier still renders and stays under the mobile draw-call budget.

## Remaining Work

This is not the full overhaul. The next high-value work should address larger layout and authored gameplay issues: road hierarchy, district emptiness around Career/Farm, stronger water/shore play, better UI scaling outside debug mode, and interaction/audio polish.
