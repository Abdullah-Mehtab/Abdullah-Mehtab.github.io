# Play data shard loop pass

Date: 2026-05-29

## Decision

Data shards should behave like authored world pickups, not hidden state changes. This pass keeps the existing seven shard positions and `data_shards` achievement id, but gives each shard a shared octahedron mesh, an instanced ground ring, an instanced vertical beam, collection audio, notification text, and verifier coverage for every shard.

## Implementation notes

- `World` owns shard visibility and instanced ring/beam transforms through `refreshCollectibleVisuals()` and `getCollectibleStats()`.
- `Game.collectNearbyDataShards()` centralizes collection behavior so the runtime loop and verifier use the same path.
- `AudioSystem.dataShard()` records a counter even while muted, which lets the verifier prove collection events without requiring live audio output.
- `tools/verify-play.mjs` now captures a dedicated shard screenshot, exercises all seven shard pickups, checks the achievement unlock, and verifies that collected shard visuals are hidden while the instanced pools remain sized to the total.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Latest verification artifact: `.codex-tmp/play-verify-2026-05-29T03-57-14-568Z/result.json`.
- Browser verifier highlights from that run: no console or page errors, route replay 39/39, data shards 7/7, data-shard audio events 7, mobile low-tier ready, p95 frame time 8.4ms, draw calls 232, triangles 146668, collider audit 5/5.
- `npm test` passed.

## Remaining limitation

This is a collectible loop and verification checkpoint, not the end of the Bruno-level art direction goal. The next useful pass should address a larger visible surface area: road/path composition, terrain material richness, authored district silhouettes, or water/shoreline feel.
