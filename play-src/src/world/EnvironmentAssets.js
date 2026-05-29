// ABOUTME: Loads reusable GLB templates for protected and optional /play world props.
// ABOUTME: Keeps the FCC/S-block landmark available while the island terrain is generated in code.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import medievalPropsUrl from '../../assets/models/world/medieval-props.glb?url';
import polishPropsUrl from '../../assets/models/world/polish-props.glb?url';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

export async function loadEnvironmentAssets() {
  const loader = new GLTFLoader();
  const packs = new Map();
  const templates = new Map();

  await Promise.all([
    loadPack(loader, 'medievalProps', medievalPropsUrl, packs, templates),
    loadPack(loader, 'polishProps', polishPropsUrl, packs, templates)
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
    const templateRoots = scene.children.filter((object) => (
      object.name.startsWith('Env')
      || object.name.startsWith('VIS_')
      || object.name.startsWith('PHY_')
      || object.name.startsWith('SPAWN_')
      || object.name.startsWith('ZONE_')
    ));
    for (const object of templateRoots) {
      if (object.name.startsWith('EnvPolish')) {
        mergeStaticMeshesInGroup(object, { namePrefix: `TEMPLATE_${object.name}` });
      }
      object.visible = false;
      templates.set(object.name, object);
    }
    scene.traverse((object) => {
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            material.side = THREE.FrontSide;
          });
        } else {
          object.material.side = THREE.FrontSide;
        }
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  } catch (error) {
    console.error(`Environment asset pack failed to load: ${packName}`, error);
  }
}
