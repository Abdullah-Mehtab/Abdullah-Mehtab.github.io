# Play Authored Shoreline Props Pass

## Context

The `/play/` goal calls for authored source assets instead of runtime placeholder geometry. After the previous prop-source pass, shoreline rocks were still created as procedural `IcosahedronGeometry` instances in `Props.js`.

## Decision

Add authored shoreline templates to `polish-props.glb` and use them for coast dressing:
- `EnvPolishCoastRockCluster`
- `EnvPolishBeachGrassClump`

Keep emergency fallback geometry available, but make the verifier fail if shoreline props fall back while the authored templates are expected.

Reasoning:
- Shoreline composition is a visible part of the island silhouette and water approach.
- Source-authored clusters are closer to the requested art workflow than runtime primitive scatter.
- The props are static and still pass through the existing static batching path, so the change should stay compatible with the performance budget.

## Implementation Notes

- Added low-poly rock and grass helpers to `play-assets/source/blender/export_polish_props.py`.
- Regenerated only `play-src/assets/models/world/polish-props.glb` with targeted Blender export.
- Updated `Props.js` so shore dressing alternates authored rock clusters and beach grass clumps.
- Added verifier checks for authored shoreline counts and zero fallbacks.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T10-58-42-880Z`.
- `npm test` passed.
- Screenshots reviewed: `04-water-interaction.png`, `zone-contact.png`, `zone-data-pier.png`, and `mobile-start.png`.

Verifier highlights:
- Console messages: 0.
- Page errors: 0.
- `polish-props.glb`: 1,504,628 bytes.
- Desktop p95 frame: 8.4 ms.
- Desktop draw calls: 299.
- Desktop triangles: 248,830.
- Mobile draw calls: 236.
- Props: 22 authored shore rock clusters, 7 authored beach grass clumps, 0 shoreline fallbacks.
- Route replay: 39/39.
- Collider audit: 5/5.

## Remaining Risk

This improves shoreline asset provenance and composition, but the shoreline is not final. The verifier's water screenshot still mostly frames the car and beach rather than a full shoreline beauty angle, so a later pass should add a stronger dedicated shoreline screenshot and continue composing the coast around actual driving approaches.
