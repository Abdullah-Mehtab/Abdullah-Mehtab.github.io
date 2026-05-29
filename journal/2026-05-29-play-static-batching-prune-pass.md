# Static Batching Prune Pass

## Context

The verifier render profile still shows high material batch counts in the vehicle and district dressing. This pass did not touch protected car or FCC visuals. It targeted lower-risk scene traversal overhead left by the existing static mesh batcher.

## Decision

`mergeStaticMeshesInGroup` now prunes empty internal transform groups after merging static meshes and records batch stats on `group.userData.staticBatchStats`.

The browser verifier now samples aggregate static batching stats so this optimization remains visible in future runs.

## Failed Approach

The first prune was too aggressive. It removed empty named placement roots such as `SetPiece_EnvPolishProjectForge` and `STUNT_EnvPolishStuntCheckpoint`. The verifier correctly failed because authored district and stunt assets could no longer be proven placed, even though their merged child geometry still rendered.

The corrected prune preserves meaningful authored/root names while pruning anonymous/internal empty transforms.

## Verification

- `npm run play:build`: passed.
- `npm run play:verify`: passed.
  - Output: `.codex-tmp/play-verify-2026-05-29T16-09-17-634Z`.
  - Console messages: 0.
  - Page errors: 0.
  - Desktop p95 frame time: 8.4 ms.
  - Desktop render calls: 321.
  - Desktop triangles: 436,152.
  - Scene objects: 1,077.
  - Previous verified scene object count: 1,221.
  - Static batching groups: 272.
  - Static batches: 1,776.
  - Merged meshes: 5,719.
  - Pruned empty groups: 144.
  - Mobile low-tier render calls: 232.
  - Mobile low-tier triangles: 304,190.
  - Route replay: 39/39 passed.
  - Collider audit: 5/5 passed.
  - Authored district assets: all templates present and placed.
  - Authored stunt assets: all templates present and placed.
- `npm test`: passed.

## Next Optimization Targets

- Material consolidation for `SETPIECE_District_Dressing`.
- Vehicle mesh/material audit that preserves the Sabre Turbo identity.
- Quality-tier culling for expensive decorative groups that are not visible in first-frame or mobile-critical paths.
