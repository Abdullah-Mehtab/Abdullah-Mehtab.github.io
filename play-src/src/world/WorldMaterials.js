// ABOUTME: Defines reusable materials, procedural textures, and island geometry helpers.
// ABOUTME: Keeps the /play world stylized and cheap enough for static GitHub Pages.
import * as THREE from 'three';

export const WATER_Y = -0.55;
export const QUALITY_PROFILES = {
  low: {
    trees: 42,
    grassTufts: 220,
    understory: 46,
    leaves: 42,
    clouds: 5,
    props: 18,
    fireflies: 14,
    lifeSignals: { zonePulses: 8, windBanners: 4, whisperBeacons: 4, terminalPulses: 2, districtMotes: 16 },
    districtDressingRadius: 118,
    windCadence: 6,
    particleCadence: 3,
    shadows: false,
    water: 'low',
    post: false,
    pixelRatio: 1
  },
  medium: {
    trees: 92,
    grassTufts: 620,
    understory: 108,
    leaves: 96,
    clouds: 9,
    props: 34,
    fireflies: 32,
    lifeSignals: { zonePulses: 16, windBanners: 8, whisperBeacons: 8, terminalPulses: 5, districtMotes: 48 },
    districtDressingRadius: 172,
    windCadence: 3,
    particleCadence: 2,
    shadows: false,
    water: 'medium',
    post: false,
    pixelRatio: 1.15
  },
  high: {
    trees: 132,
    grassTufts: 900,
    understory: 156,
    leaves: 150,
    clouds: 12,
    props: 48,
    fireflies: 56,
    lifeSignals: { zonePulses: 16, windBanners: 10, whisperBeacons: 10, terminalPulses: 6, districtMotes: 64 },
    districtDressingRadius: 238,
    windCadence: 2,
    particleCadence: 1,
    shadows: true,
    water: 'high',
    post: true,
    pixelRatio: 1.2
  }
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

  const stoneTexture = makeNoiseTexture(['#555f5d', '#65706a', '#4b5350', '#74746b'], 256, 720);
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
      color: 0x5ea85a,
      map: grassTexture,
      roughness: 0.96,
      metalness: 0.01,
      vertexColors: false,
      side: THREE.DoubleSide
    }),
    meadowLight: new THREE.MeshStandardMaterial({ color: 0x78b85f, roughness: 0.98, metalness: 0.0 }),
    meadowDark: new THREE.MeshStandardMaterial({ color: 0x2f6f43, roughness: 0.98, metalness: 0.0 }),
    flowerField: new THREE.MeshBasicMaterial({ color: 0xf3b4be, transparent: true, opacity: 0.26, depthWrite: false }),
    wildflowerBlue: new THREE.MeshBasicMaterial({ color: 0x86d7ff, transparent: true, opacity: 0.22, depthWrite: false }),
    stoneRoad: new THREE.MeshStandardMaterial({ color: 0x626961, map: stoneTexture, roughness: 0.92, metalness: 0.02 }),
    plazaRoad: new THREE.MeshStandardMaterial({ color: 0xc1b290, map: stoneTexture, roughness: 0.9, metalness: 0.02 }),
    securityRoad: new THREE.MeshStandardMaterial({ color: 0x162b34, roughness: 0.7, metalness: 0.14, emissive: 0x061923, emissiveIntensity: 0.36 }),
    roadEdge: new THREE.MeshStandardMaterial({ color: 0x343a38, roughness: 0.94, metalness: 0.02 }),
    roadShoulder: new THREE.MeshStandardMaterial({ color: 0x6f745f, roughness: 0.96, metalness: 0.0 }),
    roadCurb: new THREE.MeshStandardMaterial({ color: 0xd7c99f, roughness: 0.86, metalness: 0.02 }),
    roadVerge: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -18,
      polygonOffsetUnits: -18
    }),
    roadLine: new THREE.MeshBasicMaterial({ color: 0xf4ddb1, transparent: true, opacity: 0.58 }),
    roadLineBright: new THREE.MeshBasicMaterial({ color: 0x9df7ff, transparent: true, opacity: 0.58 }),
    surfaceSeam: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -28,
      polygonOffsetUnits: -28
    }),
    surfacePaver: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -26,
      polygonOffsetUnits: -26
    }),
    surfaceAccent: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -30,
      polygonOffsetUnits: -30
    }),
    meadowDetail: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -24,
      polygonOffsetUnits: -24
    }),
    fieldBerm: new THREE.MeshStandardMaterial({ color: 0x6fa856, roughness: 0.98, metalness: 0.0 }),
    fieldRibbon: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
      polygonOffset: true,
      polygonOffsetFactor: -31,
      polygonOffsetUnits: -31
    }),
    stuntRamp: new THREE.MeshStandardMaterial({ color: 0x8e654a, roughness: 0.86, metalness: 0.02 }),
    dirtRoad: new THREE.MeshStandardMaterial({ color: 0x9b6f3d, roughness: 0.98, metalness: 0.0 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xf2bc82, map: sandTexture, roughness: 0.98, metalness: 0.0 }),
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
      colorB: 0xa5e6dc,
      opacity: 0.34,
      noise: 0.24
    }),
    shoreWash: makeRadialBlendMaterial({
      inner: 158,
      outer: 190,
      colorA: 0xc5fff0,
      colorB: 0x2bb6c3,
      opacity: 0.28,
      noise: 0.38,
      animated: true
    }),
    cliff: new THREE.MeshStandardMaterial({ color: 0x5c5146, roughness: 0.92, metalness: 0.01 }),
    shoreCliff: new THREE.MeshStandardMaterial({ color: 0x9b7650, roughness: 0.96, metalness: 0.0 }),
    shallow: new THREE.MeshBasicMaterial({ color: 0x79d6d0, transparent: true, opacity: 0.16, depthWrite: false }),
    foam: new THREE.MeshBasicMaterial({ color: 0xf1fff6, transparent: true, opacity: 0.26, depthWrite: false }),
    wood: new THREE.MeshStandardMaterial({ color: 0x8a542c, roughness: 0.86, metalness: 0.02 }),
    darkWood: new THREE.MeshStandardMaterial({ color: 0x241711, roughness: 0.88, metalness: 0.03 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x827968, roughness: 0.86, metalness: 0.04 }),
    paleStone: new THREE.MeshStandardMaterial({ color: 0xd4c69d, roughness: 0.82, metalness: 0.03 }),
    warmStone: new THREE.MeshStandardMaterial({ color: 0xe1c482, roughness: 0.84, metalness: 0.02 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x293845, roughness: 0.78, metalness: 0.08 }),
    bannerRed: new THREE.MeshStandardMaterial({ color: 0xa43130, roughness: 0.78, metalness: 0.03 }),
    bannerBlue: new THREE.MeshStandardMaterial({ color: 0x2d5f86, roughness: 0.78, metalness: 0.03 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xe0b94f, roughness: 0.42, metalness: 0.45 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x79d7ff, roughness: 0.22, metalness: 0.08, transparent: true, opacity: 0.62 }),
    glow: new THREE.MeshBasicMaterial({ color: 0x8fffd0, transparent: true, opacity: 0.72 }),
    glowBlue: new THREE.MeshBasicMaterial({ color: 0x68d8ff, transparent: true, opacity: 0.78 }),
    glowPink: new THREE.MeshBasicMaterial({ color: 0xff6d8d, transparent: true, opacity: 0.74 }),
    warmGlow: new THREE.MeshBasicMaterial({ color: 0xffc36a, transparent: true, opacity: 0.78 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x062a35, emissive: 0x29d7ff, emissiveIntensity: 0.92, roughness: 0.36, metalness: 0.08 }),
    cable: new THREE.MeshStandardMaterial({ color: 0x10191f, roughness: 0.74, metalness: 0.14 }),
    campusBrick: new THREE.MeshStandardMaterial({ color: 0x9f3f27, roughness: 0.82, metalness: 0.02 }),
    potato: new THREE.MeshStandardMaterial({ color: 0xb5742b, roughness: 0.94, metalness: 0.0 }),
    crop: new THREE.MeshStandardMaterial({ color: 0x77b85a, roughness: 0.9, metalness: 0.0 }),
    softShadow: new THREE.MeshBasicMaterial({ color: 0x07100d, transparent: true, opacity: 0.16, depthWrite: false }),
    water: makeWaterMaterial(),
    leaf: new THREE.PointsMaterial({
      color: 0xffb2bc,
      map: makeParticleTexture('petal'),
      size: 0.12,
      transparent: true,
      opacity: 0.62,
      alphaTest: 0.08,
      depthWrite: false,
      sizeAttenuation: true
    }),
    firefly: new THREE.PointsMaterial({
      color: 0xc7ff8a,
      map: makeParticleTexture('round'),
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      alphaTest: 0.05,
      depthWrite: false,
      sizeAttenuation: true
    })
  };
}

export function makeIslandGeometry(radius, segments = 144, scale = 1) {
  const shape = makeIslandShape(radius, segments, scale);
  const geometry = new THREE.ShapeGeometry(shape);
  const position = geometry.attributes.position;
  const colors = [];
  const deepGrass = new THREE.Color(0x245b38);
  const meadow = new THREE.Color(0x69a857);
  const warmGrass = new THREE.Color(0xa5b85b);
  const coast = new THREE.Color(0xd2a56f);
  const temp = new THREE.Color();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const dist = Math.hypot(x, y) / (radius * scale);
    const noise = pseudoRandom(i * 13.71) * 0.18;
    const coastAmount = THREE.MathUtils.smoothstep(dist, 0.66, 1.0);
    temp.copy(deepGrass).lerp(meadow, Math.min(1, dist * 0.72 + noise));
    temp.lerp(warmGrass, Math.max(0, 0.5 - dist) * 0.34);
    temp.lerp(coast, coastAmount * 0.24);
    colors.push(temp.r, temp.g, temp.b);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function makeIslandBandGeometry(radius, innerScale, outerScale, segments = 144) {
  const shape = makeIslandShape(radius, segments, outerScale);
  const hole = makeIslandPath(radius, segments, innerScale, true);
  shape.holes.push(hole);
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function getIslandCoastPoints(radius, scale = 1, segments = 144) {
  const points = [];
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    const r = islandRadiusAt(angle, radius) * scale;
    points.push([Math.cos(angle) * r, Math.sin(angle) * r]);
  }
  return points;
}

function makeIslandShape(radius, segments, scale) {
  const shape = new THREE.Shape();
  const points = getIslandCoastPoints(radius, scale, segments);
  points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  return shape;
}

function makeIslandPath(radius, segments, scale, reverse = false) {
  const points = getIslandCoastPoints(radius, scale, segments);
  const ordered = reverse ? points.reverse() : points;
  const path = new THREE.Path();
  ordered.forEach(([x, y], index) => {
    if (index === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  });
  path.closePath();
  return path;
}

function islandRadiusAt(angle, radius) {
  const long = Math.sin(angle * 3.0 + 0.4) * 0.052;
  const medium = Math.cos(angle * 5.0 - 0.8) * 0.038;
  const small = Math.sin(angle * 9.0 + 1.7) * 0.018;
  const northHeadland = Math.exp(-Math.pow(angleDistance(angle, Math.PI * 0.5), 2) / 0.28) * 0.09;
  const westBite = Math.exp(-Math.pow(angleDistance(angle, Math.PI * 0.96), 2) / 0.18) * -0.08;
  const southShelf = Math.exp(-Math.pow(angleDistance(angle, Math.PI * 1.48), 2) / 0.22) * 0.045;
  return radius * (0.92 + long + medium + small + northHeadland + westBite + southShelf);
}

function angleDistance(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
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
      deep: { value: new THREE.Color(0x188eb0) },
      shallow: { value: new THREE.Color(0x38d3d5) },
      horizon: { value: new THREE.Color(0xc4f4ff) },
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
      uniform vec3 horizon;
      uniform vec3 sun;
      uniform float time;
      void main() {
        float radius = length(vWorld.xz);
        float shallowMix = 1.0 - smoothstep(142.0, 244.0, radius);
        float horizonMix = smoothstep(150.0, 380.0, radius);
        float longBands = sin(dot(vWorld.xz, vec2(0.028, 0.041)) + time * 0.55) * 0.5 + 0.5;
        float crossBands = sin(dot(vWorld.xz, vec2(-0.034, 0.026)) - time * 0.38) * 0.5 + 0.5;
        float fineBands = sin(dot(vWorld.xz, vec2(0.19, -0.16)) - time * 1.05) * 0.5 + 0.5;
        float sparkle = pow(max(0.0, fineBands * longBands), 10.0) * (1.0 - horizonMix * 0.72) * 0.22;
        vec3 color = mix(deep, shallow, clamp(shallowMix + vWave * 0.18, 0.0, 1.0));
        color += (longBands * 0.028 + crossBands * 0.018) * (1.0 - horizonMix * 0.42);
        color += sparkle * sun;
        color = mix(color, horizon, horizonMix * 0.82);
        color = mix(color, vec3(0.72, 0.94, 0.98), 0.08 + horizonMix * 0.16);
        float alpha = mix(0.9, 0.88, horizonMix);
        gl_FragColor = vec4(color, alpha);
      }
    `
  });
}

function makeParticleTexture(kind = 'round') {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);

  if (kind === 'petal') {
    ctx.translate(32, 32);
    ctx.rotate(-0.55);
    const gradient = ctx.createRadialGradient(-5, -3, 3, 0, 0, 24);
    gradient.addColorStop(0, 'rgba(255, 244, 247, 1)');
    gradient.addColorStop(0.55, 'rgba(255, 178, 188, 0.88)');
    gradient.addColorStop(1, 'rgba(255, 178, 188, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255, 255, 220, 1)');
    gradient.addColorStop(0.42, 'rgba(199, 255, 138, 0.85)');
    gradient.addColorStop(1, 'rgba(199, 255, 138, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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
    const r = 0.7 + pseudoRandom(i * 31.1) * 2.5;
    ctx.globalAlpha = 0.08 + pseudoRandom(i * 7.5) * 0.12;
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
