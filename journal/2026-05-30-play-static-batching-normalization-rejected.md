# Play Static Batching Normalization Rejected

## Attempt

Tried normalizing static batch geometries before merging:

- converted indexed geometry to non-indexed geometry
- removed unused attributes for untextured, non-vertex-color materials
- kept UVs for textured materials and colors for vertex-color materials

The hypothesis was that mismatched geometry signatures were preventing repeated untextured authored props from merging.

## Result

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Verifier output: `.codex-tmp/play-verify-2026-05-29T21-33-49-569Z`.
- Desktop draw calls changed from 348 to 346.
- Mobile low draw calls changed from 232 to 230.
- `SETPIECE_District_Dressing` stayed at 163 meshes, 163 materials, and 109940 triangles.
- Triangles stayed at 237106 desktop and 141944 mobile.

## Decision

Rejected and reverted the runtime batching normalization. The code was too broad for a two-draw-call improvement and did not address the verified district dressing hot spot.

The next optimization should target the actual district placement/material/source-asset structure rather than adding generic merge logic.
