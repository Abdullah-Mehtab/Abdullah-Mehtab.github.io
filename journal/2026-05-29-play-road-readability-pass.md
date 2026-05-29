# Play Road Readability Pass

## Context

The current island no longer uses circular road caps, but screenshots still showed broad road and plaza slabs that could read as arbitrary painted shapes. The first-frame road needed stronger route hierarchy without changing the static GitHub Pages deployment or adding collision.

## Decision

Add continuous visual-only lane-edge guide ribbons to every non-dirt road. These use the existing road ribbon geometry path, stay in the visual road group, and do not add any car blockers or Rapier colliders. The verifier now records `laneEdges` so the road readability layer remains measured.

Screenshot review kept the pass because the foreground route reads more like a designed road network and less like a dark flat slab. The lines are intentionally cheap and should be revisited later if the art direction moves toward narrower roads or custom modeled curb assets.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T19-16-46-367Z`.
- `npm test` passed.
- Road metrics: 22 lane edges, 88 chevrons, 364 reflector studs, 24 edge feathers.
- Desktop verifier metrics: p95 frame time 8.4ms, average frame time 8.29ms, 120.62 FPS, 332 draw calls, 331,210 triangles.
- Mobile low verifier metrics: 228 draw calls, 184,710 triangles.
- Route replay: 39 of 39 segments passed.
- Collider audit: 5 of 5 passed.
- Console/page errors: none reported by the verifier.

## Notes

This is a readability pass, not a finished road art pass. The broader road system still needs more authored curb modeling, stronger plaza composition, better material contrast, and future narrowing/reshaping where the current route footprints feel too slab-like.
