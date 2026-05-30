# Play Atmosphere Cloud Bank Pass

## Decision

Add an authored horizon cloud-bank layer to reduce the flat-sky read in driving screenshots. The layer uses one instanced low-poly puff mesh, is animated in `Atmosphere.update`, and is disabled on low quality to preserve mobile draw-call budget.

This moves the sky toward the art bible requirement that the world feel alive without introducing new physics risk or touching the protected car and FCC/S-block identities.

## Implementation Notes

- Added twelve horizon cloud banks.
- Each bank uses five faceted lobe instances.
- Medium quality shows eight banks.
- High quality shows twelve banks.
- Low quality shows zero banks because mobile already sits near its draw-call ceiling.
- Added verifier assertions for desktop/default cloud-bank presence and mobile cloud-bank capping.

## Failed Attempts

- First verifier run failed because low quality rendered the extra cloud-bank draw call, pushing mobile from 229 to 231 calls.
- A first fix set the low limit to zero, but `limit || medium` converted zero back to the medium limit. That kept mobile at 231 calls and reported eight visible cloud banks.
- Replaced the fallback with an explicit undefined check so zero remains zero.
- The first visible version used transparent circular planes. Screenshots made them read too much like flat decals, so the primitive changed to a cheap faceted 3D puff.

## Verification

Commands run on 2026-05-30:

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.

Verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-30T13-08-19-157Z`
- Console messages: none.
- Page errors: none.
- High quality: p95 frame time 8.4 ms, 436 draw calls, 259188 triangles.
- Mobile low tier: 229 draw calls, 132302 triangles.
- Route replay: 39 passed, 0 failed.
- Collider audit: 5 total, 0 failures.
- Atmosphere: 12 cloud banks, 8 visible cloud banks on default quality, 0 visible cloud banks on mobile low quality.

Screenshots inspected:

- `02-start-driving.png`
- `high-quality-start.png`
- `zone-education.png`
- `zone-security.png`

## Remaining Gap

This improves the sky/horizon layer, but it does not complete the full visual target. The next high-impact gaps remain stronger district-specific modeling, less web-like UI presentation, and deeper car/game-feel tuning.
