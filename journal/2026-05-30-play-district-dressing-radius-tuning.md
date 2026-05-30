# Play district dressing radius tuning

## Context

After route-composition spatial culling, the largest active render bucket was `SETPIECE_District_Dressing`. The verifier output at `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T01-25-23-725Z` showed:

- driving snapshot: 158 visible district-dressing batches, 81112 district-dressing triangles
- surface-feedback snapshot: 108 visible district-dressing batches, 70640 district-dressing triangles
- mobile low: 135 visible district-dressing batches

The medium radius was broad enough that the main driving sample rendered most district dressing across the island.

## Decision

District dressing visibility radii were tightened:

- low: 118 -> 92
- medium: 172 -> 148
- high: 238 -> 214

This keeps nearby district staging active while hiding more far district cells in long views. It does not change the protected FCC model, the Sabre Turbo-style car, zone ids, routes, colliders, or portfolio actions.

The verifier now enforces:

- driving district-dressing hidden batches >= 15
- surface-feedback district-dressing hidden batches >= 60
- mobile district-dressing hidden batches >= 40
- surface-feedback active snapshot triangles <= 290000

## Verification

Commands run on 2026-05-30:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T01-33-50-954Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.59
- desktop p95 frame: 8.4 ms
- desktop draw calls: 366
- desktop triangles: 222038
- mobile low draw calls: 228
- mobile low triangles: 132532
- mobile district dressing: 95 visible / 68 hidden / 163 total batches
- driving snapshot: 486 calls, 256470 triangles
- driving district dressing: 141 visible / 22 hidden / 163 total batches
- surface-feedback snapshot: 618 calls, 274842 triangles
- surface-feedback district dressing: 87 visible / 76 hidden / 163 total batches
- route replay: 39/39 passed
- collider audit: 5/5 passed

Screenshots inspected from the verifier output:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `zone-education.png`

## Remaining work

This is a visibility/performance checkpoint, not completion of the art overhaul. The next higher-quality version should replace some far district detail with authored distance proxy clusters so long views keep visual story at lower draw-call cost instead of relying only on hiding real batches.
