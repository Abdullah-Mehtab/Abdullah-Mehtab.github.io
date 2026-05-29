# Play Ocean And Atmosphere Pass

## Context

Screenshots from the previous checkpoint still showed a flat, banded ocean horizon. That weakened the toy-world art direction because the water read as a shader artifact instead of an authored scenic edge.

## Decision

Replace the old far-water treatment with a cheaper authored direction:

- Move water color from high-frequency UV bands toward radial world-space blending.
- Add sparse instanced ocean wave lanes so the sea has authored motion without many draw calls.
- Change horizon ribbons from flat ground rings to low-opacity vertical haze cylinders.
- Add a verifier check for visible wave lanes so the detail remains measurable.

Screenshot review rejected the first version of this pass because the horizon became too dark. A second pass reduced haze opacity and brightened far water, but the far line was still too heavy. The committed version starts the radial horizon blend earlier so far water moves toward bright cyan haze before it forms a dark stripe.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T19-09-53-805Z`.
- `npm test` passed.
- Desktop verifier metrics: p95 frame time 8.4ms, average frame time 8.3ms, 120.48 FPS, 328 draw calls, 330,094 triangles.
- Mobile low verifier metrics: 225 draw calls, 183,666 triangles.
- Water detail metrics: 52 wave lanes, 32 visible wave lanes, 34 surface glints, 20 visible surface glints.
- Route replay: 39 of 39 segments passed.
- Collider audit: 5 of 5 passed.
- Console/page errors: none reported by the verifier.

## Notes

This is still not a final Bruno-benchmark water system. It improves the horizon and adds life while staying cheap, but future work should add stronger shore composition, better local water interaction framing, and more hand-authored scenic beats around the beach and harbor.
