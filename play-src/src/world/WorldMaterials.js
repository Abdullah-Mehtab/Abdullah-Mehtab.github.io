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
  grassTexture.repeat.set(58, 58);
  grassTexture.magFilter = THREE.LinearFilter;
  grassTexture.minFilter = THREE.LinearMipmapLinearFilter;
  grassTexture.anisotropy = 12;

  const stoneTexture = makeNoiseTexture(['#605c50', '#756f61', '#8b8472', '#46443e'], 256, 1400);
  stoneTexture.wrapS = THREE.RepeatWrapping;
  stoneTexture.wrapT = THREE.RepeatWrapping;
  stoneTexture.repeat.set(2, 18);

  const sandTexture = makeSandTexture(512);
  sandTexture.wrapS = THREE.RepeatWrapping;
  sandTexture.wrapT = THREE.RepeatWrapping;
  sandTexture.repeat.set(18, 18);
  sandTexture.anisotropy = 12;

  return {
    ground: new THREE.MeshStandardMaterial({
      color: 0x356f2f,
      map: grassTexture,
      roughness: 0.96,
      metalness: 0.01,
      vertexColors: false,
      side: THREE.DoubleSide
    }),
    stoneRoad: new THREE.MeshStandardMaterial({ color: 0x5d584d, map: stoneTexture, roughness: 0.94, metalness: 0.02 }),
    roadEdge: new THREE.MeshStandardMaterial({ color: 0x2f302b, roughness: 0.9, metalness: 0.04 }),
    roadLine: new THREE.MeshBasicMaterial({ color: 0xd8c48a, transparent: true, opacity: 0.36 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xf4d59a, map: sandTexture, roughness: 0.98, metalness: 0.0 }),
    grassSandBlend: makeRadialBlendMaterial({
      inner: 136,
      outer: 151,
      colorA: 0x245b26,
      colorB: 0xe8c987,
      opacity: 0.58,
      noise: 0.28
    }),
    wetSandBlend: makeRadialBlendMaterial({
      inner: 151,
      outer: 166,
      colorA: 0xd1ad6e,
      colorB: 0x6fcdd0,
      opacity: 0.48,
      noise: 0.2
    }),
    shoreWash: makeRadialBlendMaterial({
      inner: 158,
      outer: 190,
      colorA: 0x8de0dd,
      colorB: 0x0a6894,
      opacity: 0.36,
      noise: 0.32,
      animated: true
    }),
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
  const deepGrass = new THREE.Color(0x1f4a25);
  const meadow = new THREE.Color(0x356f2f);
  const highGrass = new THREE.Color(0x5f8f42);
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
      deep: { value: new THREE.Color(0x063e66) },
      shallow: { value: new THREE.Color(0x38c7d3) },
      sun: { value: new THREE.Color(0xfff1b8) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vWave;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 transformed = position;
        float waveA = sin(position.x * 0.04 + time * 0.72) * 0.22;
        float waveB = cos(position.y * 0.055 - time * 0.48) * 0.15;
        float chop = sin((position.x + position.y) * 0.12 + time * 1.2) * 0.035;
        float wave = waveA + waveB + chop;
        transformed.z += wave;
        vWave = wave;
        vWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vWave;
      uniform vec3 deep;
      uniform vec3 shallow;
      uniform vec3 sun;
      uniform float time;
      void main() {
        float longBands = sin((vUv.x * 32.0 + vUv.y * 19.0) + time * 0.75) * 0.5 + 0.5;
        float fineBands = sin((vUv.x - vUv.y) * 145.0 - time * 1.15) * 0.5 + 0.5;
        float depthFade = smoothstep(-180.0, 150.0, vWorld.z + vWorld.x * 0.12);
        float sparkle = pow(max(0.0, fineBands * longBands), 8.0) * 0.24;
        vec3 color = mix(deep, shallow, smoothstep(0.12, 0.95, depthFade + vWave * 0.25));
        color += longBands * 0.035 + sparkle * sun;
        color = mix(color, vec3(0.72, 0.94, 0.98), 0.08);
        gl_FragColor = vec4(color, 0.84);
      }
    `
  });
}

function makeRadialBlendMaterial({ inner, outer, colorA, colorB, opacity = 0.5, noise = 0.2, animated = false }) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      inner: { value: inner },
      outer: { value: outer },
      colorA: { value: new THREE.Color(colorA) },
      colorB: { value: new THREE.Color(colorB) },
      opacity: { value: opacity },
      noiseAmount: { value: noise },
      time: { value: 0 },
      animated: { value: animated ? 1 : 0 }
    },
    vertexShader: `
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        vPos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPos;
      varying vec2 vUv;
      uniform float inner;
      uniform float outer;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float opacity;
      uniform float noiseAmount;
      uniform float time;
      uniform int animated;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      void main() {
        float radius = length(vPos.xz);
        float t = smoothstep(inner, outer, radius);
        float featherIn = smoothstep(inner, inner + (outer - inner) * 0.32, radius);
        float featherOut = 1.0 - smoothstep(outer - (outer - inner) * 0.34, outer, radius);
        float n = noise(vPos.xz * 0.075 + vec2(time * 0.045 * float(animated), -time * 0.025 * float(animated)));
        float brokenEdge = 1.0 + (n - 0.5) * noiseAmount;
        float alpha = featherIn * featherOut * opacity * brokenEdge;
        vec3 color = mix(colorA, colorB, clamp(t + (n - 0.5) * 0.18, 0.0, 1.0));
        gl_FragColor = vec4(color, clamp(alpha, 0.0, opacity));
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

function makeSandTexture(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#d1a869');
  gradient.addColorStop(0.45, '#f0d392');
  gradient.addColorStop(1, '#b9894e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 9000; i += 1) {
    const x = pseudoRandom(i * 2.13) * size;
    const y = pseudoRandom(i * 3.79) * size;
    const r = 0.45 + pseudoRandom(i * 5.11) * 1.4;
    const light = pseudoRandom(i * 7.71);
    ctx.globalAlpha = 0.08 + pseudoRandom(i * 11.17) * 0.14;
    ctx.fillStyle = light > 0.54 ? '#fff1be' : '#8f6538';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 90; i += 1) {
    const x = pseudoRandom(i * 17.3) * size;
    const y = pseudoRandom(i * 19.9) * size;
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = '#7d5a35';
    ctx.lineWidth = 1 + pseudoRandom(i * 23.5) * 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 14 + pseudoRandom(i * 29.1) * 38, 2 + pseudoRandom(i * 31.7) * 6, pseudoRandom(i * 37.1) * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function makeGrassTexture(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e4d21';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 24000; i += 1) {
    const x = pseudoRandom(i * 2.37) * size;
    const y = pseudoRandom(i * 5.81) * size;
    const length = 2 + pseudoRandom(i * 7.61) * 9;
    const angle = -Math.PI / 2 + (pseudoRandom(i * 11.43) - 0.5) * 0.9;
    const green = pseudoRandom(i * 13.17);
    ctx.globalAlpha = 0.06 + pseudoRandom(i * 17.77) * 0.16;
    ctx.strokeStyle = green > 0.68 ? '#76a84b' : green > 0.32 ? '#2e6d2b' : '#102f18';
    ctx.lineWidth = 0.55 + pseudoRandom(i * 19.21) * 1.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  for (let i = 0; i < 520; i += 1) {
    const x = pseudoRandom(i * 23.31) * size;
    const y = pseudoRandom(i * 31.27) * size;
    const r = 6 + pseudoRandom(i * 41.13) * 22;
    ctx.globalAlpha = 0.035;
    ctx.fillStyle = pseudoRandom(i * 47.4) > 0.55 ? '#669c46' : '#0d2815';
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.25 + pseudoRandom(i * 53.3) * 0.4), pseudoRandom(i * 59.7) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
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
