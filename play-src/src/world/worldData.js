// ABOUTME: Defines the authored /play island layout, districts, roads, zones, and rewards.
// ABOUTME: Keeps portfolio zone ids stable while allowing the island itself to be rebuilt.

export const WORLD_HALF_SIZE = 190;
export const MAP_PADDING = 24;
export const ISLAND_RADIUS = 158;

export const canalSegments = [];

export const districtFootprints = [
  { id: 'start-plaza', label: 'Launch Plaza', center: [0, 28], size: [50, 38], color: '#7cffb2', kind: 'plaza' },
  { id: 'fcc-campus', label: 'FCC Education Grove', center: [-78, 82], size: [58, 48], color: '#9ccfff', kind: 'campus' },
  { id: 'security-campus', label: 'Security Lab', center: [-94, -66], size: [56, 44], color: '#68d8ff', kind: 'security' },
  { id: 'project-yard', label: 'Projects Yard', center: [62, 56], size: [44, 36], color: '#ffcc66', kind: 'workshop' },
  { id: 'ridge', label: 'Sentinel Ridge', center: [16, 112], size: [46, 34], color: '#ff6d8d', kind: 'tower' },
  { id: 'archive', label: 'Archive Steps', center: [-44, 72], size: [36, 30], color: '#ffdf8a', kind: 'archive' },
  { id: 'south-loop', label: 'Stunt And CV Run', center: [58, -82], size: [82, 46], color: '#ff9b6d', kind: 'driving' },
  { id: 'west-trail', label: 'Skills And Farm Trail', center: [-58, -104], size: [62, 46], color: '#92ffea', kind: 'trail' },
  { id: 'harbor', label: 'Signal Harbor', center: [126, 46], size: [36, 38], color: '#78b7ff', kind: 'harbor' },
  { id: 'data-pier', label: 'Data Pier', center: [-126, 66], size: [32, 34], color: '#79ffc5', kind: 'pier' }
];

export const scenicPropZones = [
  { id: 'start-gardens', center: [0, 28], size: [68, 52], kind: 'garden' },
  { id: 'fcc-tree-walk', center: [-78, 82], size: [72, 56], kind: 'campus' },
  { id: 'security-pines', center: [-94, -66], size: [62, 50], kind: 'security' },
  { id: 'project-grove', center: [62, 56], size: [54, 42], kind: 'garden' },
  { id: 'north-ridge', center: [16, 112], size: [58, 34], kind: 'grove' },
  { id: 'archive-sakura', center: [-44, 72], size: [38, 34], kind: 'grove' },
  { id: 'harbor-palms', center: [126, 46], size: [34, 44], kind: 'coast' },
  { id: 'south-oaks', center: [48, -96], size: [82, 44], kind: 'meadow' },
  { id: 'farm-pocket', center: [-48, -132], size: [44, 26], kind: 'farm' },
  { id: 'skills-cypress', center: [-62, -84], size: [44, 38], kind: 'security' },
  { id: 'west-beach', center: [-136, -12], size: [34, 72], kind: 'coast' }
];

export const terrainBrushes = [
  { id: 'start-meadow-light', center: [-12, 34], size: [72, 46], rotation: -0.12, material: 'meadowLight' },
  { id: 'start-shadow-pocket', center: [32, 26], size: [40, 22], rotation: 0.18, material: 'meadowDark' },
  { id: 'fcc-lawn', center: [-78, 73], size: [78, 34], rotation: -0.08, material: 'meadowLight' },
  { id: 'fcc-flower-walk', center: [-58, 94], size: [38, 16], rotation: 0.35, material: 'flowerField' },
  { id: 'security-dark-pad', center: [-96, -58], size: [66, 40], rotation: -0.2, material: 'meadowDark' },
  { id: 'security-blue-grit', center: [-112, -34], size: [30, 18], rotation: 0.48, material: 'wildflowerBlue' },
  { id: 'project-yard-dust', center: [62, 48], size: [52, 34], rotation: -0.36, material: 'warmStone' },
  { id: 'sentinel-ridge-grass', center: [18, 108], size: [54, 22], rotation: 0.24, material: 'meadowLight' },
  { id: 'south-stunt-rubber', center: [86, -86], size: [78, 36], rotation: 0.08, material: 'meadowDark' },
  { id: 'farm-gold-field', center: [-50, -126], size: [54, 30], rotation: -0.16, material: 'warmStone' },
  { id: 'harbor-sand-apron', center: [126, 52], size: [42, 34], rotation: -0.18, material: 'sand' },
  { id: 'west-data-beach', center: [-132, 60], size: [36, 32], rotation: 0.42, material: 'sand' }
];

export const roadPaths = [
  {
    id: 'gallery-spine',
    name: 'Gallery Spine',
    width: 7.4,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-118, 42],
      [-78, 40],
      [-36, 30],
      [0, 24],
      [42, 34],
      [84, 48],
      [126, 34]
    ]
  },
  {
    id: 'fcc-walk',
    name: 'FCC Walk',
    width: 5.4,
    hierarchy: 'plaza',
    closed: false,
    points: [
      [-36, 30],
      [-52, 52],
      [-64, 74],
      [-54, 94]
    ]
  },
  {
    id: 'security-run',
    name: 'Scanner Run',
    width: 5.8,
    hierarchy: 'security',
    closed: false,
    points: [
      [0, 24],
      [-28, 4],
      [-64, -12],
      [-96, -34],
      [-120, -58]
    ]
  },
  {
    id: 'cv-run',
    name: 'Document Run',
    width: 5.8,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 24],
      [18, -10],
      [34, -42],
      [52, -72],
      [76, -96]
    ]
  },
  {
    id: 'stunt-causeway',
    name: 'Stunt Causeway',
    width: 6.6,
    hierarchy: 'stunt',
    closed: false,
    points: [
      [76, -96],
      [104, -94],
      [132, -70]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 5.2,
    hierarchy: 'dirt',
    closed: false,
    points: [
      [18, -118],
      [-22, -128],
      [-62, -118],
      [-98, -92],
      [-120, -58]
    ]
  },
  {
    id: 'sentinel-ridge',
    name: 'Sentinel Ridge',
    width: 5.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [-36, 30],
      [-18, 66],
      [10, 94],
      [38, 116]
    ]
  },
  {
    id: 'career-link',
    name: 'Career Link',
    width: 5.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [42, 34],
      [68, 8],
      [92, -18],
      [116, -22],
      [126, 34]
    ]
  },
  {
    id: 'harbor-link',
    name: 'Harbor Link',
    width: 5,
    hierarchy: 'street',
    closed: false,
    points: [
      [84, 48],
      [112, 66],
      [130, 76]
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    width: 4.8,
    hierarchy: 'bridge',
    closed: false,
    points: [
      [-118, 42],
      [-132, 50],
      [-138, 62]
    ]
  },
  {
    id: 'behind-spur',
    name: 'Build Spur',
    width: 5.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [34, -42],
      [10, -76],
      [-4, -104],
      [18, -118]
    ]
  },
  {
    id: 'awards-link',
    name: 'Archive Steps',
    width: 4.8,
    hierarchy: 'plaza',
    closed: false,
    points: [
      [-36, 30],
      [-28, 58],
      [-24, 82]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'scanner-boost', position: [-64, 0, -12], rotation: -2.17, color: '#68d8ff', district: 'security' },
  { id: 'document-run-boost', position: [22, 0, -18], rotation: 2.68, color: '#7cffb2', district: 'cv' },
  { id: 'stunt-yard-boost', position: [72, 0, -96], rotation: Math.PI / 2, color: '#ff9b6d', district: 'stunt' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Launch Plaza',
    kind: 'Home',
    position: [0, 0, 42],
    rotation: 0.18,
    radius: 10,
    color: '#7cffb2',
    shape: 'hub',
    dialogueId: '0',
    achievement: 'first_stop',
    actions: [
      { label: 'Main Portfolio', href: '../index.html' },
      { label: 'Projects', href: '../projects.html' }
    ]
  },
  {
    id: 'security',
    name: 'Security Lab Gate',
    kind: 'Offensive Security',
    position: [-94, 0, -66],
    rotation: -0.28,
    radius: 10,
    color: '#68d8ff',
    shape: 'lab',
    dialogueId: '1',
    achievement: 'security_lab',
    scanRequired: true,
    actions: [
      { label: 'CV', href: '../cv.html' },
      { label: 'Cyber Sentinel', href: '../cyber-sentinel.html' }
    ]
  },
  {
    id: 'projects',
    name: 'Projects Yard',
    kind: 'Project Gallery',
    position: [62, 0, 56],
    rotation: -0.44,
    radius: 10,
    color: '#ffcc66',
    shape: 'foundry',
    achievement: 'projects_foundry',
    projectGallery: true,
    actions: [
      { label: 'Projects Page', href: '../projects.html' }
    ]
  },
  {
    id: 'sentinel',
    name: 'Cyber Sentinel Ridge',
    kind: 'Final Year Project',
    position: [16, 0, 112],
    rotation: -0.12,
    radius: 12,
    color: '#ff6d8d',
    shape: 'tower',
    dialogueId: '3',
    achievement: 'cyber_sentinel',
    actions: [
      { label: 'Read Blog', href: '../cyber-sentinel.html' }
    ]
  },
  {
    id: 'career',
    name: 'Career Signal Office',
    kind: 'Experience',
    position: [96, 0, -40],
    rotation: -0.24,
    radius: 10,
    color: '#b6a0ff',
    shape: 'office',
    dialogueId: '5',
    achievement: 'career_office',
    actions: [
      { label: 'CV', href: '../cv.html' }
    ]
  },
  {
    id: 'skills',
    name: 'Skills Terminal',
    kind: 'Stack',
    position: [-62, 0, -84],
    rotation: 0.24,
    radius: 9,
    color: '#92ffea',
    shape: 'terminal',
    dialogueId: '2',
    achievement: 'skills_terminal',
    actions: [
      { label: 'Resume PDF', href: '../Abdullah-Mehtab-Resume-v5.pdf' }
    ]
  },
  {
    id: 'education',
    name: 'FCC Education Grove',
    kind: 'Academics',
    position: [-78, 0, 82],
    rotation: -0.08,
    radius: 11,
    color: '#9ccfff',
    shape: 'library',
    dialogueId: '6',
    achievement: 'education_library',
    actions: [
      { label: 'CV', href: '../cv.html' }
    ]
  },
  {
    id: 'awards',
    name: 'Archive Steps',
    kind: 'Certificates',
    position: [-44, 0, 72],
    rotation: -0.18,
    radius: 8,
    color: '#ffdf8a',
    shape: 'trophy',
    dialogueId: '7',
    achievement: 'awards_tower',
    actions: [
      { label: 'CV', href: '../cv.html' }
    ]
  },
  {
    id: 'cv',
    name: 'CV Vault',
    kind: 'Resume',
    position: [8, 0, -58],
    rotation: 0.12,
    radius: 8,
    color: '#e6f3ff',
    shape: 'vault',
    achievement: 'cv_vault',
    lines: [
      'Resume archive, project record, certificates, skills, awards, and downloadable PDFs.',
      'Open the document-first version for the full professional profile.'
    ],
    actions: [
      { label: 'Open CV Page', href: '../cv.html' },
      { label: 'Resume PDF', href: '../Abdullah-Mehtab-Resume-v5.pdf' },
      { label: 'Cyber CV PDF', href: '../Abdullah-Mehtab-CV-Cyber-v2.pdf' }
    ]
  },
  {
    id: 'todo',
    name: 'Todo Board',
    kind: 'Blog / List',
    position: [-82, 0, 14],
    rotation: 0.34,
    radius: 8,
    color: '#d8ff92',
    shape: 'board',
    achievement: 'todo_board',
    lines: [
      'The never-ending list keeps active tasks, experiments, reminders, and ideas visible.',
      'A lightweight log for work that is being tested, refined, or revisited.'
    ],
    actions: [
      { label: 'Open Todo', href: '../todo.html' }
    ]
  },
  {
    id: 'circuit',
    name: 'Circuit Gate',
    kind: 'Time Trial',
    position: [56, 0, 100],
    rotation: -0.28,
    radius: 9,
    color: '#ff9b6d',
    shape: 'gate',
    achievement: 'circuit_gate',
    lines: [
      'This gate starts the island loop circuit.',
      'Follow the checkpoints around the coast and return clean.'
    ],
    startsCircuit: true
  },
  {
    id: 'contact',
    name: 'Signal Harbor',
    kind: 'Links',
    position: [128, 0, 56],
    rotation: -0.34,
    radius: 8,
    color: '#78b7ff',
    shape: 'post',
    dialogueId: '8',
    achievement: 'contact_port',
    actions: [
      { label: 'GitHub', href: 'https://github.com/Abdullah-Mehtab' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/abdullah-mehtab' },
      { label: 'Email', href: 'mailto:abdullahmehtab666@gmail.com' }
    ]
  },
  {
    id: 'behind',
    name: 'Behind The Build',
    kind: 'Stack',
    position: [-18, 0, -96],
    rotation: 0.08,
    radius: 8,
    color: '#a8a6ff',
    shape: 'portal',
    achievement: 'behind_build',
    lines: [
      'Engine room: Three.js visuals, Rapier physics, local resume data, and Supabase-backed counters.',
      'The repository link opens the source behind the drive world.'
    ],
    actions: [
      { label: 'Repository', href: 'https://github.com/Abdullah-Mehtab/Abdullah-Mehtab' }
    ]
  },
  {
    id: 'drift',
    name: 'Stunt Yard',
    kind: 'Driving',
    position: [106, 0, -72],
    rotation: -0.48,
    radius: 11,
    color: '#ff9b6d',
    shape: 'rampyard',
    achievement: 'ramp_yard',
    lines: [
      'A dedicated driving yard for ramps, boosters, handbrake turns, and clean landings.'
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    kind: 'Visitor Trail',
    position: [-126, 0, 66],
    rotation: 0.68,
    radius: 9,
    color: '#79ffc5',
    shape: 'pier',
    achievement: 'data_pier',
    lines: [
      'Signal pier for page views, zone visits, and interaction counts.',
      'Visitor signals are stored as hashed analytics events.'
    ]
  },
  {
    id: 'potato',
    name: 'Potato Farm',
    kind: 'Farm Counter',
    position: [-48, 0, -132],
    rotation: 0.18,
    radius: 10,
    color: '#c79b56',
    shape: 'farm',
    achievement: 'potato_farm',
    lines: [
      'Voxel potato patch beside the farm track.',
      'Press P nearby, or use the summon button, to grow one temporary potato and increment the farm counter.'
    ],
    potatoFarm: true
  }
];

export const zonePresentation = {
  landing: {
    respawn: { position: [4, 1.08, 26], heading: 0.15 },
    camera: [17, 8, 57],
    target: [2, 1.7, 36],
    fov: 42
  },
  security: {
    respawn: { position: [-72, 1.08, -17.5], heading: -2.17 },
    camera: [-74, 10, -39],
    target: [-99, 3, -68],
    fov: 43
  },
  projects: {
    respawn: { position: [43, 1.08, 34], heading: 0.71 },
    camera: [40, 9, 44],
    target: [64, 2.5, 58],
    fov: 42
  },
  sentinel: {
    respawn: { position: [10, 1.08, 94], heading: 0.91 },
    camera: [-8, 10, 100],
    target: [17, 4.5, 113],
    fov: 42
  },
  career: {
    respawn: { position: [112, 1.08, -23], heading: -2.42 },
    camera: [120, 9, -12],
    target: [99, 3, -42],
    fov: 43
  },
  skills: {
    respawn: { position: [-82, 1.08, -103.5], heading: 2.17 },
    camera: [-92, 9, -62],
    target: [-62, 2.6, -84],
    fov: 42
  },
  education: {
    respawn: { position: [-60, 1.08, 64], heading: -0.79 },
    camera: [-48, 12, 58],
    target: [-78, 5.5, 82],
    fov: 39
  },
  awards: {
    respawn: { position: [-30, 1.08, 54], heading: -0.66 },
    camera: [-28, 8, 54],
    target: [-44, 3, 73],
    fov: 41
  },
  cv: {
    respawn: { position: [30, 1.08, -42], heading: -2.2 },
    camera: [34, 8, -34],
    target: [8, 2.5, -59],
    fov: 42
  },
  todo: {
    respawn: { position: [-82, 1.08, 40], heading: 3.14 },
    camera: [-63, 8, -8],
    target: [-84, 2.6, 16],
    fov: 42
  },
  circuit: {
    respawn: { position: [38, 1.08, 116], heading: 2.3 },
    camera: [34, 8, 87],
    target: [57, 3, 102],
    fov: 42
  },
  contact: {
    respawn: { position: [112, 1.08, 66], heading: 2.13 },
    camera: [104, 8, 74],
    target: [128, 4, 56],
    fov: 42
  },
  behind: {
    respawn: { position: [8, 1.08, -78], heading: -2.18 },
    camera: [14, 8, -70],
    target: [-18, 2.6, -96],
    fov: 42
  },
  drift: {
    respawn: { position: [78, 1.08, -94], heading: 0.9 },
    camera: [70, 8, -102],
    target: [106, 3, -72],
    fov: 42
  },
  'data-pier': {
    respawn: { position: [-118, 1.08, 42], heading: -0.32 },
    camera: [-108, 8, 38],
    target: [-128, 2.4, 68],
    fov: 42
  },
  potato: {
    respawn: { position: [-22, 1.08, -128], heading: -1.72 },
    camera: [-14, 8, -120],
    target: [-50, 2.5, -132],
    fov: 42
  }
};

export const achievementDefinitions = [
  ['first_stop', 'First Stop', 'Interact with the Start Hub.'],
  ['security_lab', 'Security Pass', 'Open the Security Lab.'],
  ['security_scan', 'Security Scan', 'Complete the scanner gate sequence.'],
  ['projects_foundry', 'Project Heat', 'Open the Projects Foundry.'],
  ['cyber_sentinel', 'Sentinel Signal', 'Visit Cyber Sentinel Tower.'],
  ['career_office', 'Work Log', 'Open the Career Office.'],
  ['skills_terminal', 'Stack Trace', 'Open the Skills Terminal.'],
  ['education_library', 'Academic Archive', 'Open the Education Library.'],
  ['awards_tower', 'Trophy Case', 'Open the Awards Tower.'],
  ['cv_vault', 'Formal Mode', 'Open the CV Vault.'],
  ['todo_board', 'Still Building', 'Open the Todo Board.'],
  ['circuit_gate', 'Track Curious', 'Start the circuit gate.'],
  ['contact_port', 'Signal Sent', 'Open the Contact Port.'],
  ['behind_build', 'Look Under The Hood', 'Open Behind The Build.'],
  ['ramp_yard', 'Ramp Yard', 'Visit the driving yard.'],
  ['data_pier', 'Data Pier', 'Visit the data pier.'],
  ['potato_farm', 'Potato Patch', 'Visit the potato farm.'],
  ['potato_summon', 'Potato Summoner', 'Summon a blocky potato.'],
  ['boost', 'Boosted', 'Use boost while driving.'],
  ['boost_pad', 'Pad Launched', 'Hit a boost pad.'],
  ['jump', 'Suspension Check', 'Jump the car.'],
  ['ramp_jump', 'Clean Air', 'Launch from a ramp.'],
  ['data_shards', 'Signal Collector', 'Collect every floating data shard.'],
  ['distance_1km', 'One Kilometer', 'Drive at least 1 km.'],
  ['all_zones', 'Full Tour', 'Interact with every portfolio zone.']
];

export const circuitCheckpoints = [
  [56, 0, 100],
  [16, 0, 112],
  [-24, 0, 82],
  [-78, 0, 82],
  [-118, 0, 42],
  [-120, 0, -58],
  [-62, 0, -118],
  [18, 0, -118],
  [76, 0, -96],
  [132, 0, -70],
  [126, 0, 34],
  [84, 0, 48],
  [56, 0, 100]
];

function pathToSegments(path) {
  const points = path.points;
  const segments = [];
  const limit = path.closed ? points.length : points.length - 1;
  for (let i = 0; i < limit; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz);
    segments.push([
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
      path.width,
      length + path.width * 0.64,
      Math.atan2(dx, dz)
    ]);
  }
  return segments;
}
