import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import islandVisualUrl from '../../assets/models/world/island-visual.glb?url';
import islandPhysicsUrl from '../../assets/models/world/island-physics.glb?url';
import medievalPropsUrl from '../../assets/models/world/medieval-props.glb?url';

export async function loadEnvironmentAssets() {
  const loader = new GLTFLoader();
  const packs = new Map();
  const templates = new Map();

  await Promise.all([
    loadPack(loader, 'islandVisual', islandVisualUrl, packs, templates),
    loadPack(loader, 'islandPhysics', islandPhysicsUrl, packs, templates),
    loadPack(loader, 'medievalProps', medievalPropsUrl, packs, templates)
  ]);

  return {
    has(name) {
      return templates.has(name);
    },
    clone(name) {
      const template = templates.get(name);
      if (!template) return null;
      const clone = template.clone(true);
      clone.visible = true;
      clone.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object.material) object.material = object.material.clone();
        }
      });
      return clone;
    },
    cloneScene(name) {
      const scene = packs.get(name);
      if (!scene) return null;
      const clone = scene.clone(true);
      clone.visible = true;
      clone.traverse((object) => {
        object.visible = true;
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object.material) object.material = object.material.clone();
        }
      });
      return clone;
    }
  };
}

async function loadPack(loader, packName, url, packs, templates) {
  try {
    const gltf = await loader.loadAsync(url);
    const scene = gltf.scene;
    scene.name = packName;
    scene.visible = false;
    packs.set(packName, scene);
    scene.traverse((object) => {
      if (object.parent === scene && (object.name.startsWith('Env') || object.name.startsWith('VIS_') || object.name.startsWith('PHY_') || object.name.startsWith('SPAWN_') || object.name.startsWith('ZONE_'))) {
        object.visible = false;
        templates.set(object.name, object);
      }
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  } catch (error) {
    console.error(`Environment asset pack failed to load: ${packName}`, error);
  }
}
