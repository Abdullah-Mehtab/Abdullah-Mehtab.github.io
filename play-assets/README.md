# Play Asset Pipeline

This folder contains source assets for the `/play` world.

- `source/blender/`: Blender Python generators for the car and environment asset packs.
- `source/js/`: deterministic Node/Three.js generators used when Blender is not available locally.
- Exported runtime assets are written into `play-src/assets/` and bundled by Vite into `play/`.

Run:

```powershell
npm run play:assets
```

The asset builder checks `BLENDER`, the local portable Blender path at `C:\Tools\blender-4.5.0-windows-x64\blender.exe`, and then `blender` on `PATH`. If none are available, the car falls back to the Node generator and the already committed environment GLB is reused.
