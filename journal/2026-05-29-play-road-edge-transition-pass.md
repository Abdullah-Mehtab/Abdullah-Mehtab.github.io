# Play road edge transition pass

Date: 2026-05-29

## Decision

Road shoulders should not stop as hard graphic cutouts against grass, sand, or plazas. This pass keeps the route graph, physics, car, FCC model, and all zone ids intact, but adds subtle road-edge feather ribbons outside each visual road shoulder.

## Implementation notes

- `Roads` now creates two verge feather ribbons per road path.
- Verge colors are tied to road hierarchy: security, stunt, dirt, bridge, plaza, and default routes each get a different transition color.
- The first browser pass made the feathers too wide and too visible. The final version uses narrower ribbons and lower opacity so they read as edge transition rather than translucent slabs.
- `WorldMaterials` owns the base `roadVerge` material.
- The verifier records `roadGuidance.edgeFeathers` and fails if the transition layer is removed.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Latest verification artifact: `.codex-tmp/play-verify-2026-05-29T04-25-01-831Z/result.json`.
- Browser verifier highlights from that run: no console or page errors, route replay 39/39, edge feathers 24, road junction blend patches 10, circular point caps 0, p95 frame time 8.4ms, draw calls 243, triangles 143390, mobile low-tier ready.
- `npm test` passed.

## Remaining limitation

The edge transition is softer, but the world still needs stronger road-side composition: authored signs, small barriers, terrain berms, and more intentional approaches to each district. This pass only addresses the visual edge seam.
