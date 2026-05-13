# Play Asset Pipeline

This folder contains source assets for the `/play` world.

- `source/blender/`: Blender Python generators and future `.blend` source files.
- `source/js/`: deterministic Node/Three.js generators used when Blender is not available locally.
- Exported runtime assets are written into `play-src/assets/` and bundled by Vite into `play/`.

Run:

```powershell
npm run play:assets
```

If Blender is available on `PATH`, the pipeline can use the Blender source scripts. Otherwise it falls back to the Node generator so GitHub Pages can still ship working GLB assets.
