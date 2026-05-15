export const WORLD_HALF_SIZE = 190;
export const MAP_PADDING = 24;
export const ISLAND_RADIUS = 158;

export const canalSegments = [];

export const districtFootprints = [
  { id: 'courtyard', label: 'Portfolio Courtyard', center: [16, 40], size: [44, 36], color: '#7cffb2', kind: 'plaza' },
  { id: 'watchtower', label: 'Sentinel Watchtower', center: [38, 104], size: [46, 34], color: '#ff6d8d', kind: 'keep' },
  { id: 'library-grove', label: 'Education Grove', center: [-112, 72], size: [48, 38], color: '#9ccfff', kind: 'library' },
  { id: 'forge', label: 'Projects Foundry', center: [62, 42], size: [48, 36], color: '#ffcc66', kind: 'forge' },
  { id: 'harbor', label: 'Contact Harbor', center: [130, 64], size: [34, 30], color: '#78b7ff', kind: 'waterfront' },
  { id: 'archive', label: 'Archive Garden', center: [-24, 60], size: [36, 28], color: '#ffdf8a', kind: 'civic' },
  { id: 'cove', label: 'Stunt Courtyard', center: [112, -78], size: [40, 28], color: '#ff9b6d', kind: 'stunt' },
  { id: 'farm', label: 'Voxel Farm Pocket', center: [-56, -126], size: [34, 28], color: '#c79b56', kind: 'farm' }
];

export const scenicPropZones = [
  { id: 'western-sakura', center: [-124, 28], size: [34, 48], kind: 'grove' },
  { id: 'library-sakura', center: [-122, 112], size: [30, 28], kind: 'grove' },
  { id: 'north-meadow', center: [-12, 110], size: [54, 28], kind: 'meadow' },
  { id: 'harbor-cypress', center: [128, 76], size: [24, 32], kind: 'coast' },
  { id: 'southern-oaks', center: [-22, -116], size: [58, 26], kind: 'meadow' },
  { id: 'farm-orchard', center: [-60, -126], size: [30, 24], kind: 'farm' },
  { id: 'east-park', center: [114, -12], size: [26, 34], kind: 'garden' },
  { id: 'west-cove', center: [-118, -60], size: [30, 34], kind: 'coast' }
];

export const roadPaths = [
  {
    id: 'island-loop',
    name: 'Stone Coast Loop',
    width: 8.8,
    hierarchy: 'ring',
    closed: true,
    points: [
      [-88, 78],
      [-122, 12],
      [-96, -74],
      [-28, -120],
      [56, -112],
      [118, -56],
      [130, 34],
      [84, 100],
      [16, 126],
      [-60, 112]
    ]
  },
  {
    id: 'agora-way',
    name: 'Courtyard Way',
    width: 7.2,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-122, 12],
      [-62, 18],
      [0, 26],
      [62, 18],
      [130, 34]
    ]
  },
  {
    id: 'acropolis-climb',
    name: 'Watchtower Climb',
    width: 6.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 26],
      [6, 66],
      [22, 104],
      [16, 126]
    ]
  },
  {
    id: 'academy-lane',
    name: 'Library Lane',
    width: 6,
    hierarchy: 'street',
    closed: false,
    points: [
      [-62, 18],
      [-92, 54],
      [-104, 86],
      [-88, 78]
    ]
  },
  {
    id: 'vault-run',
    name: 'Vault Run',
    width: 5.8,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 26],
      [24, -36],
      [44, -86],
      [56, -112]
    ]
  },
  {
    id: 'stunt-cove-loop',
    name: 'Stunt Courtyard Approach',
    width: 7,
    hierarchy: 'stunt',
    closed: false,
    points: [
      [56, -112],
      [84, -96],
      [104, -96]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 5.2,
    hierarchy: 'dirt',
    closed: false,
    turnaround: true,
    points: [
      [-28, -120],
      [-44, -124]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'southern-curve-boost', position: [0, 0, -123], rotation: Math.PI / 2 - 0.2, color: '#68d8ff', district: 'loop' },
  { id: 'east-loop-boost', position: [122, 0, -18], rotation: 0.1, color: '#7cffb2', district: 'loop' },
  { id: 'stunt-cove-boost', position: [78, 0, -106], rotation: -0.6, color: '#ff9b6d', district: 'stunt' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Portfolio Courtyard',
    kind: 'Home',
    position: [16, 0, 40],
    rotation: 0,
    radius: 11,
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
    name: 'Security Keep',
    kind: 'Offensive Security',
    position: [-126, 0, -42],
    rotation: 0.18,
    radius: 10,
    color: '#68d8ff',
    shape: 'lab',
    dialogueId: '1',
    achievement: 'security_lab',
    actions: [
      { label: 'CV', href: '../cv.html' },
      { label: 'Cyber Sentinel', href: '../cyber-sentinel.html' }
    ]
  },
  {
    id: 'projects',
    name: 'Projects Foundry',
    kind: 'Project Gallery',
    position: [64, 0, 42],
    rotation: -0.34,
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
    name: 'Cyber Sentinel Watchtower',
    kind: 'Final Year Project',
    position: [38, 0, 104],
    rotation: 0,
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
    name: 'Career Guild Hall',
    kind: 'Experience',
    position: [90, 0, -28],
    rotation: -0.15,
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
    name: 'Skills Oracle',
    kind: 'Stack',
    position: [-86, 0, -102],
    rotation: 0.28,
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
    name: 'Education Library',
    kind: 'Academics',
    position: [-112, 0, 72],
    rotation: 0.18,
    radius: 10,
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
    name: 'Awards Shrine',
    kind: 'Certificates',
    position: [-24, 0, 60],
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
    position: [32, 0, -78],
    rotation: 0.28,
    radius: 8,
    color: '#e6f3ff',
    shape: 'vault',
    achievement: 'cv_vault',
    lines: [
      'Resume archive, project record, certificates, skills, awards, and downloadable PDFs.',
      'The formal version lives here when the drive becomes a document.'
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
    position: [-88, 0, 0],
    rotation: 0.18,
    radius: 8,
    color: '#d8ff92',
    shape: 'board',
    achievement: 'todo_board',
    lines: [
      'The never-ending list keeps the unfinished, ongoing, and occasionally strange parts visible.',
      'Tasks, experiments, reminders, and ideas still moving live there.'
    ],
    actions: [
      { label: 'Open Todo', href: '../todo.html' }
    ]
  },
  {
    id: 'circuit',
    name: 'Circuit Gate',
    kind: 'Time Trial',
    position: [84, 0, 100],
    rotation: -0.22,
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
    name: 'Contact Harbor Lighthouse',
    kind: 'Links',
    position: [130, 0, 64],
    rotation: -0.18,
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
    position: [36, 0, -104],
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
    name: 'Stunt Courtyard',
    kind: 'Driving',
    position: [112, 0, -78],
    rotation: -0.45,
    radius: 11,
    color: '#ff9b6d',
    shape: 'rampyard',
    achievement: 'ramp_yard',
    lines: [
      'A separate courtyard for ramps, boosters, and messy driving away from the formal portfolio landmarks.'
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    kind: 'Visitor Trail',
    position: [-138, 0, 20],
    rotation: 0.42,
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
    position: [-56, 0, -126],
    rotation: 1.15,
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

export const achievementDefinitions = [
  ['first_stop', 'First Stop', 'Interact with the Start Hub.'],
  ['security_lab', 'Security Pass', 'Open the Security Lab.'],
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
  [84, 0, 100],
  [16, 0, 126],
  [-60, 0, 112],
  [-88, 0, 78],
  [-122, 0, 12],
  [-96, 0, -74],
  [-28, 0, -120],
  [56, 0, -112],
  [118, 0, -56],
  [130, 0, 34],
  [84, 0, 100]
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
