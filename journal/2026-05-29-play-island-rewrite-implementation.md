# /play Island Rewrite Implementation

## Decision

The owner explicitly authorized rebuilding the `/play` island from scratch while preserving two constants:

- The Sabre Turbo-style car asset, cosmetics, and driving identity.
- The FCC/S-block education building model identity. The model may move or rotate, but the model itself must remain the same.

The implementation replaces the old island layout with a procedural irregular island, authored districts, denser roads, staged route dressing, and static mesh batching. The FCC model is still loaded through `EnvLandmark_library`, and the car asset path is not replaced.

## Implementation Notes

- The old optional island visual GLB is no longer loaded at runtime.
- Terrain, coast, shallow water, foam, districts, and road paths are generated in code.
- The potato farm no longer clones the optional `EnvPotatoFarm` GLB because it created unnecessary mesh cost for a non-protected feature.
- Static roads, set pieces, stunt-yard dressing, and cloud lobes are batched to reduce draw calls.
- Decorative scenery remains visual-only unless it is a ramp or the protected FCC landmark collider.

## Verification

- `npm run play:build` passed.
- `npm test` passed.
- Browser pass with `/play/?debugDrive=1` produced no console messages or page errors.
- Wide-view runtime sample at the potato farm after batching: about 58 FPS, 419 render calls, about 222k triangles, car height stable around y=1.01.
- Keyboard smoke test confirmed driving/boost/jump/map open with about 69 meters of movement.
- Mobile normal viewport loaded with no console messages or page errors.

## Remaining Risk

- `medieval-props.glb` remains about 8.5 MB because it still carries the protected FCC model.
- The FCC model and car remain the dominant protected asset costs. Further optimization should target asset-source cleanup or LOD decisions only with explicit owner approval.
