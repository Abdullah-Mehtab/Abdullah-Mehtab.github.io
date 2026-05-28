# Play Asset Pipeline

This folder contains source assets for the `/play` world.

- `source/blender/`: Blender Python generators for the car and environment asset packs.
- `source/js/`: deterministic Node/Three.js generators used when Blender is not available locally.
- Exported runtime assets are written into `play-src/assets/` and bundled by Vite into `play/`.

Run:

```powershell
npm run play:assets
```

By default, the asset builder reuses the committed GLB files so normal validation does not rewrite large binary assets. Set `PLAY_ASSETS_REBUILD=1` to rebuild the Node-generated car asset while reusing committed world assets.

Set `PLAY_ASSETS_BLENDER=1` to regenerate all Blender-authored assets. The builder checks `BLENDER`, the local portable Blender path at `C:\Tools\blender-4.5.0-windows-x64\blender.exe`, and then `blender` on `PATH`.
