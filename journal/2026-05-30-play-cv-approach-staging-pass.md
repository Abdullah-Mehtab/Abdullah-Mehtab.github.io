# Play CV Approach Staging Pass

## Decision

Improved the CV Vault approach by reusing existing authored route/plaza kits instead of adding more fresh GLB templates.

The CV sign was also reduced and moved so it reads more like a roadside cue than a dominant flat billboard.

## Implementation Notes

- `CvVaultSign` is now smaller and offset from the main CV court.
- `SETPIECE_District_Hero_Dressing` now stages three existing authored templates along the CV approach:
  - `EnvPolishRouteStoryMarker`
  - `EnvPolishPlazaEdgeKit`
  - `EnvPolishChevronBollardRun`
- The approach additions stay in the existing secondary quality group and broad culling path, so low/mobile hides them while medium/high keep the richer CV arrival.
- No new colliders were added.

## Failed Attempt

The first implementation added two new Blender templates:

- `EnvPolishCvIntakePortal`
- `EnvPolishCvDocumentRun`

That build looked aligned with the art direction, but `npm run play:verify` failed because `play/game-assets/polish-props.glb` grew to `2629260` bytes. The verifier budget is `2500000` bytes. I removed those templates rather than weakening the budget.

## Verification

Verified final implementation:

- `npm run play:build`: passed
- `npm run play:verify`: passed
- `npm test`: passed

Browser verifier evidence from `.codex-tmp/play-verify-2026-05-30T06-06-13-341Z/result.json`:

- Console messages: 0
- Page errors: 0
- Polish props GLB: 2482168 bytes
- Mobile low calls: 228
- Mobile low triangles: 132322
- Mobile secondary groups: 4 total, 0 visible
- Route replay: 39 passed, 0 failed
- Collider audit: 5 checked, 0 failures
- CV archive spine placement: present
- Protected FCC near mode still exact, far mode still silhouette

## Follow-Up

This pass improves the CV entrance without spending asset budget, but the district still needs a stronger ground/road integration pass. The remaining weakness is not only missing props; the road-to-pad transition and surrounding terrain still need more authored shape.
