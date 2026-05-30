# Play Medium Tier Culling Pass

## Decision

Tighten medium/default quality visibility radii for distant decorative set pieces while leaving the high-quality tier unchanged.

## Reasoning

The verifier showed the surface-feedback active snapshot running close to the draw-call budget. Render profiles continued to identify set-piece dressing as the largest visible bucket. The medium tier is the default path for most desktop visitors, so modestly earlier culling reduces default cost without removing authored assets or reducing the richer high-quality tier.

## Implementation

Changed `QUALITY_PROFILES.medium` in `play-src/src/world/WorldMaterials.js`:

- `districtDressingRadius`: 126 -> 118.
- `broadSetPieceRadius`: 144 -> 134.
- `routeCompositionRadius`: 84 -> 78.

No protected asset, zone id, URL, collider, achievement, Supabase behavior, or high-quality draw distance was changed.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output in `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/result.json`.
- `npm test` passed.

Before this pass, the latest comparable verifier output was `.codex-tmp/play-verify-2026-05-30T07-11-39-959Z/result.json`.

Observed metrics:

- Default idle district visible batches: 122 -> 106.
- Default idle district hidden batches: 44 -> 60.
- Default idle route composition visible batches: 53 -> 51.
- Driving active calls: 518 -> 504.
- Driving active triangles: 265104 -> 263746.
- Surface-feedback active calls: 649 -> 637.
- Surface-feedback active triangles: 270432 -> 265762.
- High-quality scene calls stayed 434.
- High-quality scene triangles stayed 249588.
- Route replay stayed 39 passed, 0 failed.
- Collider audit stayed 5 checked, 0 failures.
- Console messages: 0.
- Page errors: 0.

Screenshots reviewed:

- `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/01-title.png`
- `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/02-start-driving.png`
- `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/high-quality-start.png`
- `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/05-surface-feedback.png`
- `.codex-tmp/play-verify-2026-05-30T07-15-57-537Z/zone-circuit.png`

## Follow-Up

The surface-feedback screenshot still shows the broader island problem: open fields and distant districts need stronger authored composition. This pass only trims render cost; it does not complete the art-direction rebuild.
