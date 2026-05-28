# 2026-05-28 Play Endpoint Overhaul Decision

The `/play/` endpoint will be overhauled as a Bruno-inspired but original interactive portfolio world. The protected constants are the working GitHub Pages `/play/` route, the current static deployment shape, the island footprint, the FCC/S-block education building identity, and the Sabre Turbo-style car identity with burnout and wheelie behavior.

The first implementation target is a finished-quality vertical slice from the Start Hub to the FCC Education Grove and Security Lab. The island should not be shrunk; the problem to solve is sparse staging, weak roads, generic landmarks, flat lighting, and modal-heavy interaction. Changes should preserve public URLs and existing zone ids where practical.

Baseline screenshots were captured before edits under `.codex-tmp/baseline-play-overhaul-2026-05-28`.

2026-05-29 update: the owner explicitly requested a full island rebuild rather than incremental visible phases. The protected constants remain the Sabre Turbo-style car and the FCC/S-block education model. Supplemental Blender-authored scenery should be generated as a separate prop pack so the protected car and FCC source assets do not need to be regenerated for every world-art iteration.

2026-05-29 verification note: an ugly dark stunt ramp was traced to reversed top-face triangle winding in `StuntPark` ramp geometry. Fix ramp normals at the geometry source before adjusting materials.
