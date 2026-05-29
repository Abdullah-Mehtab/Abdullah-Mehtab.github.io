# Play Instanced Vehicle FX Pass

## Context

The `/play` car already produced smoke, dust, boost flames, and skid marks, but those effects were individual meshes with per-particle materials. That made hard driving visually active but created avoidable transient mesh/material churn during burnout, boost, landing, and handbrake sequences.

## Decision

Replace the transient vehicle feedback meshes with bounded instanced pools in `play-src/src/player/Vehicle.js`:

- `VehicleFX_TrailParticles`.
- `VehicleFX_SmokeParticles`.
- `VehicleFX_BoostFlames`.
- `VehicleFX_SkidMarks`.

The pools keep the protected Sabre Turbo-style car identity unchanged. They only change how feedback effects are rendered and bounded.

## Verifier Update

`tools/verify-play.mjs` now records vehicle FX counters and fails if the gameplay probe does not spawn trail, smoke, boost, and skid feedback. This protects burnout, boost, landing dust, and road handbrake feedback from silent regressions.

## Correction During Implementation

The first verifier attempt failed because the handbrake probe drifted onto grass, and the vehicle correctly does not draw asphalt skid marks on grass. I changed the probe to test handbrake at a known road coordinate before asserting skid feedback.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser artifact: `.codex-tmp/play-verify-2026-05-29T03-11-08-679Z`.

Accepted verifier metrics:

- Desktop FPS: 120.43.
- Desktop p95 frame time: 8.4ms.
- Desktop draw calls: 432.
- Desktop triangles: 310886.
- Mobile low draw calls: 187.
- Mobile low triangles: 128606.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Vehicle FX during gameplay probe: 192 trail, 278 smoke, 60 boost, 38 skid.

Screenshots inspected:

- `02-start-driving.png`.
- `03-driving-stress.png`.
- `04-water-interaction.png`.
- `mobile-start.png`.

## Follow-Up

The visual effects are now bounded and measurable, but the broader overhaul still needs authored terrain, richer district modeling, camera collision work, UI integration, audio depth, and stronger art-direction consistency.
