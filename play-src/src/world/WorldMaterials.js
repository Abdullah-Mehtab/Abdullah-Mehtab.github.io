import * as THREE from 'three';

export const WATER_Y = -0.55;
export const QUALITY_PROFILES = {
  low: { trees: 30, grassTufts: 110, leaves: 50, clouds: 8, props: 22, fireflies: 18, shadows: false, water: 'low' },
  medium: { trees: 58, grassTufts: 300, leaves: 135, clouds: 16, props: 44, fireflies: 46, shadows: true, water: 'medium' },
  high: { trees: 86, grassTufts: 640, leaves: 260, clouds: 28, props: 72, fireflies: 90, shadows: true, water: 'high' }
};
export const QUALITY_ORDER = ['low', 'medium', 'high'];

export function createWorldMaterials() {
  const grassTexture = makeGrassTexture(1024);
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(54, 54);
  grassTexture.magFilter = THREE.NearestFilter;
  grassTexture.minFilter = THREE.NearestMipmapNearestFilter;
  grassTexture.anisotropy = 8;

  const stoneTexture = makeNoiseTexture(['#605c50', '#756f61', '#8b8472', '#46443e'], 256, 1400);
  stoneTexture.wrapS = THREE.RepeatWrapping;
  stoneTexture.wrapT = THREE.RepeatWrapping;
  stoneTexture.repeat.set(2, 18);

  const sandTexture = makeNoiseTexture(['#b98d52', '#d1ad6c', '#e1c482', '#8d6a40', '#f1dca2'], 256, 1800);
  sandTexture.wrapS = THREE.RepeatWrapping;
  sandTexture.wrapT = THREE.RepeatWrapping;
  sandTexture.repeat.set(10, 10);

  return {
    ground: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: grassTexture,
      roughness: 0.92,
      metalness: 0.01,
      vertexColors: false,
      side: THREE.DoubleSide
    }),
    stoneRoad: new THREE.MeshStandardMaterial({ color: 0x5d584d, map: stoneTexture, roughness: 0.94, metalness: 0.02 }),
    roadEdge: new THREE.MeshStandardMaterial({ color: 0x2f302b, roughness: 0.9, metalness: 0.04 }),
    roadLine: new THREE.MeshBasicMaterial({ color: 0xd8c48a, transparent: true, opacity: 0.36 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xffffff, map: sandTexture, roughness: 0.95, metalness: 0.0 }),
    cliff: new THREE.MeshStandardMaterial({ color: 0x5c5146, roughness: 0.92, metalness: 0.01 }),
    shallow: new THREE.MeshBasicMaterial({ color: 0x79d6d0, transparent: true, opacity: 0.16, depthWrite: false }),
    foam: new THREE.MeshBasicMaterial({ color: 0xf1fff6, transparent: true, opacity: 0.26, depthWrite: false }),
    wood: new THREE.MeshStandardMaterial({ color: 0x6b4425, roughness: 0.86, metalness: 0.02 }),
    darkWood: new THREE.MeshStandardMaterial({ color: 0x2c1a11, roughness: 0.88, metalness: 0.03 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x827968, roughness: 0.86, metalness: 0.04 }),
    paleStone: new THREE.MeshStandardMaterial({ color: 0xc4b99d, roughness: 0.82, metalness: 0.03 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x293845, roughness: 0.78, metalness: 0.08 }),
    bannerRed: new THREE.MeshStandardMaterial({ color: 0xa43130, roughness: 0.78, metalness: 0.03 }),
    bannerBlue: new THREE.MeshStandardMaterial({ color: 0x2d5f86, roughness: 0.78, metalness: 0.03 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xe0b94f, roughness: 0.42, metalness: 0.45 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x79d7ff, roughness: 0.22, metalness: 0.08, transparent: true, opacity: 0.62 }),
    glow: new THREE.MeshBasicMaterial({ color: 0x8fffd0, transparent: true, opacity: 0.72 }),
    potato: new THREE.MeshStandardMaterial({ color: 0xb5742b, roughness: 0.94, metalness: 0.0 }),
    crop: new THREE.MeshStandardMaterial({ color: 0x63a950, roughness: 0.9, metalness: 0.0 }),
    water: makeWaterMaterial(),
    leaf: new THREE.MeshBasicMaterial({ color: 0xffb2bc, transparent: true, opacity: 0.62, depthWrite: false }),
    firefly: new THREE.MeshBasicMaterial({ color: 0xc7ff8a, transparent: true, opacity: 0.8, depthWrite: false })
  };
}

export function makeIslandGeometry(radius, segments = 160) {
  const geometry = new THREE.CircleGeometry(radius, segments);
  const position = geometry.attributes.position;
  const colors = [];
  const deepGrass = new THREE.Color(0x28562e);
  const meadow = new THREE.Color(0x4e8a3a);
  const highGrass = new THREE.Color(0x7aa453);
  const coast = new THREE.Color(0x89764d);
  const temp = new THREE.Color();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const dist = Math.hypot(x, y) / radius;
    const noise = pseudoRandom(i * 13.71) * 0.18;
    const coastAmount = THREE.MathUtils.smoothstep(dist, 0.74, 1.0);
    temp.copy(deepGrass).lerp(meadow, Math.min(1, dist * 0.85 + noise));
    temp.lerp(highGrass, Math.max(0, 0.55 - dist) * 0.45);
    temp.lerp(coast, coastAmount * 0.45);
    colors.push(temp.r, temp.g, temp.b);
    position.setZ(i, (pseudoRandom(i * 9.17) - 0.5) * 0.12);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function makeRingGeometry(innerRadius, outerRadius, segments = 160, wobble = 3.4) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const r = outerRadius + (pseudoRandom(i * 4.11) - 0.5) * wobble;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  for (let i = segments; i >= 0; i -= 1) {
    const a = (i / segments) * Math.PI * 2;
    const r = innerRadius + (pseudoRandom(i * 5.77) - 0.5) * wobble * 0.45;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === segments) hole.moveTo(x, y);
    else hole.lineTo(x, y);
  }
  shape.holes.push(hole);
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function makePatchGeometry(width, depth, seed = 1) {
  const shape = new THREE.Shape();
  const points = 28;
  for (let i = 0; i < points; i += 1) {
    const a = (i / points) * Math.PI * 2;
    const sx = Math.cos(a) * width * 0.5;
    const sy = Math.sin(a) * depth * 0.5;
    const n = 0.88 + pseudoRandom(seed * 71 + i * 3.19) * 0.22;
    const x = sx * n;
    const y = sy * n;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function makeCanvasLabel(text, color = '#7cffb2', width = 384, height = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(5, 12, 18, 0.84)';
  roundRect(ctx, 18, 20, width - 36, height - 40, 14);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = '700 20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text.toUpperCase(), width / 2, 53);
  return new THREE.CanvasTexture(canvas);
}

export function makeWaterMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      time: { value: 0 },
      deep: { value: new THREE.Color(0x064c78) },
      shallow: { value: new THREE.Color(0x28b8c5) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 transformed = position;
        float wave = sin(position.x * 0.045 + time * 0.55) * 0.18 + cos(position.y * 0.06 + time * 0.42) * 0.11;
        transformed.z += wave;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform vec3 deep;
      uniform vec3 shallow;
      uniform float time;
      void main() {
        float bands = sin((vUv.x + vUv.y) * 90.0 + time * 0.9) * 0.5 + 0.5;
        vec3 color = mix(deep, shallow, smoothstep(0.1, 1.0, vUv.y + vWave * 0.2));
        color += bands * 0.025;
        gl_FragColor = vec4(color, 0.78);
      }
    `
  });
}

export function makeNoiseTexture(colors, size = 256, dots = 800) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < dots; i += 1) {
    ctx.fillStyle = colors[Math.floor(pseudoRandom(i * 11.3) * colors.length)];
    const x = pseudoRandom(i * 17.1) * size;
    const y = pseudoRandom(i * 23.7) * size;
    const r = 1 + pseudoRandom(i * 31.1) * 4;
    ctx.globalAlpha = 0.16 + pseudoRandom(i * 7.5) * 0.24;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function makeGrassTexture(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const pixel = 16;
  const cell = size / pixel;
  const palette = ['#255829', '#2f6a31', '#3b7d36', '#4b913d', '#1f4d27', '#5b9c42'];
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < pixel; y += 1) {
    for (let x = 0; x < pixel; x += 1) {
      const n = pseudoRandom((x + 1) * 17.3 + (y + 3) * 31.7);
      const shade = palette[Math.floor(n * palette.length)];
      ctx.fillStyle = shade;
      ctx.fillRect(x * cell, y * cell, cell + 1, cell + 1);
      if (pseudoRandom(n * 19.2 + x) > 0.66) {
        ctx.fillStyle = 'rgba(159, 202, 76, 0.26)';
        ctx.fillRect(x * cell + cell * 0.12, y * cell + cell * 0.18, cell * 0.42, cell * 0.18);
      }
      if (pseudoRandom(n * 43.8 + y) > 0.72) {
        ctx.fillStyle = 'rgba(15, 49, 24, 0.34)';
        ctx.fillRect(x * cell + cell * 0.42, y * cell + cell * 0.52, cell * 0.45, cell * 0.22);
      }
    }
  }
  return new THREE.CanvasTexture(canvas);
}

export function pseudoRandom(seed) {
  return Math.sin(seed * 999.91) * 43758.5453 % 1 + (Math.sin(seed * 999.91) * 43758.5453 < 0 ? 1 : 0);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
