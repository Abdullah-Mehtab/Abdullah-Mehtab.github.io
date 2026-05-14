import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import environmentModelUrl from '../../assets/models/environment/play-environment.glb?url';

export async function loadEnvironmentAssets() {
  const loader = new GLTFLoader();

  try {
    const gltf = await loader.loadAsync(environmentModelUrl);
    const templates = new Map();
    gltf.scene.traverse((object) => {
      if (object.parent === gltf.scene && object.name.startsWith('Env')) {
        object.visible = false;
        templates.set(object.name, object);
      }
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return {
      scene: gltf.scene,
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
      }
    };
  } catch (error) {
    console.error('Environment asset pack failed to load', error);
    return null;
  }
}
