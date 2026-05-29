# Play Instanced Life Signals Pass

## Context

The `/play/` renderer profile showed `SETPIECE_Living_Signals` as a visible draw-call contributor even though the signal geometry is tiny. The previous implementation animated separate transparent meshes for zone pulses, whisper beacons, and terminal pulses.

## Decision

Convert repeated life signals to animated `THREE.InstancedMesh` batches while keeping named `Object3D` proxies for verifier probes. This keeps the world-life behavior measurable without spending one visible mesh per pulse/beacon.

The change does not alter the protected Sabre Turbo-style car identity, the protected FCC/S-block model identity, zone ids, public URLs, or portfolio actions.

## Verification

Baseline verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T02-20-32-437Z`
- Desktop medium: 537 render calls, 286226 triangles, 861 objects, 620 meshes
- `SETPIECE_Living_Signals`: 45 meshes/materials
- Mobile low: 241 render calls, 103606 triangles

After instancing:

- `.codex-tmp/play-verify-2026-05-29T02-28-20-530Z`
- Desktop medium: 495 render calls, 286286 triangles, 864 objects, 591 meshes, 120.68 FPS, 8.4 ms p95 frame time
- `SETPIECE_Living_Signals`: 19 meshes/materials
- Mobile low: 242 render calls, 104030 triangles
- Route replay: 39/39 segments passed
- Collider audit: 5/5 probes passed
- Console/page errors: 0

World-life behavior still passed:

- Zone pulses: 16
- Wind banners: 10
- Whisper beacons: 10
- Terminal pulses: 6
- Low tier visible total: 18
- Medium tier visible total: 37
- Grass, banner, pulse, beacon, and motion probes all animated

Screenshots inspected:

- `02-start-driving.png`
- `zone-security.png`
- `mobile-start.png`

Full test suite:

- `npm test` passed
- `play:validate-map` passed: 12 road paths, 39 road segments, 16 zones
- `check:site` passed: 12 protected routes, 7 runtime files, and local static references verified

## Remaining Work

The next measured contributors are still the protected vehicle mesh/material count, `SETPIECE_District_Dressing`, `ROAD_Network`, and shoreline bobbing props. The world also still needs more authored modeling, composition, and feel work before it can honestly be called finished art direction.
