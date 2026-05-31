# Play District Batching Failed Experiment

## Experiment

Changed district dressing static batching from 128-unit cells to 192-unit cells to test whether fewer/larger district batches would lower mobile draw calls.

## Result

The experiment failed verification.

- `npm run play:build` passed.
- `npm run play:verify` failed.
- Failure: `mobile district dressing visibility probe failed: hiddenBatches=55`.
- Failure: `mobile draw-call budget exceeded: 231`.

## Decision

Revert district dressing batching back to 128-unit cells. Larger district batches reduced culling granularity and made the measured mobile render budget worse, so this is not the right optimization path.

## Next Direction

Do not tune district cell size upward blindly. The next viable performance path is to reduce material/mesh count inside the remaining visible district buckets, or introduce quality-specific alternatives for low/mobile instead of making broad merged batches larger.
