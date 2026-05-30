# Play broad set-piece visibility pass

## Context

After the district-dressing visibility pass, the active surface-feedback view still showed broad secondary set-piece cost from approach dressing, district gateways, and route composition. These systems are authored world detail, but they do not need to render in full across long camera views.

## Decision

Approach dressing, district gateways, and route composition now register their merged static batches with a shared broad set-piece visibility registry. The registry is quality-tiered and distance-based, using the same radius values as district dressing:

- low: 118
- medium: 172
- high: 238

The low tier already hides these secondary roots through the existing quality-group system. The new registry records effective visibility so the verifier can see that mobile low hides all 62 broad batches and medium active views hide far batches where relevant.

The verifier now records `broadSetPieceVisibility` in active snapshots, runtime metrics, and mobile metrics. The active snapshot budget is tightened again to 660 calls and 320000 triangles.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T01-07-23-754Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.56
- desktop p95 frame: 8.4 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 228
- mobile low triangles: 132532
- driving stress snapshot: 447 calls, 265986 triangles
- surface-feedback snapshot: 623 calls, 304762 triangles
- surface-feedback district dressing: 108 visible batches, 55 hidden batches, 163 total
- surface-feedback broad set pieces: 53 visible batches, 9 hidden batches, 62 total
- mobile broad set pieces: 0 visible batches, 62 hidden batches, 62 total
- route replay: 39/39 passed
- collider audit: 5/5 passed

Screenshots inspected from verifier output:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `zone-projects.png`
- `zone-contact.png`
- `mobile-start.png`

## Failure note

One verifier run failed on `whisper UI probe failed: overlay did not show`. The nearest whisper was found and text existed, but the HUD sample was taken while the element was hidden with the active key cleared. The verifier now calls `game.ui.updateWhisper(nearest)` after positioning the car at the whisper beacon, which directly tests the UI boundary instead of relying on a single frame-loop timing window.

## Remaining work

This is still a performance/visibility guardrail checkpoint, not completion of the full Bruno-level overhaul. Route composition remains fully visible from the surface-feedback view, and `SETPIECE_Route_Composition` is still a high-triangle bucket. A later pass should consider route-composition-specific batching or distance proxies rather than simply tightening the radius and risking missing approach readability.
