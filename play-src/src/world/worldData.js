export const WORLD_HALF_SIZE = 190;
export const MAP_PADDING = 24;
export const ISLAND_RADIUS = 158;

export const canalSegments = [];

export const districtFootprints = [
  { id: 'courtyard', label: 'Portfolio Courtyard', center: [0, 0], size: [48, 42], color: '#7cffb2', kind: 'plaza' },
  { id: 'watchtower', label: 'Sentinel Watchtower', center: [8, 104], size: [54, 42], color: '#ff6d8d', kind: 'keep' },
  { id: 'library-grove', label: 'Education Grove', center: [-104, 82], size: [56, 44], color: '#9ccfff', kind: 'library' },
  { id: 'forge', label: 'Projects Foundry', center: [66, 28], size: [54, 42], color: '#ffcc66', kind: 'forge' },
  { id: 'harbor', label: 'Contact Harbor', center: [124, 30], size: [40, 32], color: '#78b7ff', kind: 'waterfront' },
  { id: 'archive', label: 'Archive Garden', center: [-42, 58], size: [48, 34], color: '#ffdf8a', kind: 'civic' },
  { id: 'cove', label: 'Stunt Courtyard', center: [96, -96], size: [44, 30], color: '#ff9b6d', kind: 'stunt' },
  { id: 'farm', label: 'Voxel Farm Pocket', center: [82, 84], size: [38, 30], color: '#c79b56', kind: 'farm' }
];

export const scenicPropZones = [
  { id: 'western-woods', center: [-122, -8], size: [42, 72], kind: 'grove' },
  { id: 'library-woods', center: [-120, 106], size: [42, 36], kind: 'grove' },
  { id: 'watchtower-garden', center: [38, 104], size: [58, 30], kind: 'garden' },
  { id: 'harbor-cypress', center: [126, 58], size: [34, 38], kind: 'coast' },
  { id: 'southern-meadow', center: [-18, -118], size: [76, 34], kind: 'meadow' },
  { id: 'farm-buffer', center: [82, 84], size: [40, 28], kind: 'farm' }
];

export const roadPaths = [
  {
    id: 'island-loop',
    name: 'Stone Coast Loop',
    width: 10.5,
    hierarchy: 'ring',
    closed: true,
    points: [
      [-116, 66],
      [-118, -26],
      [-78, -104],
      [-8, -132],
      [64, -112],
      [124, -54],
      [132, 34],
      [92, 104],
      [18, 128],
      [-58, 116]
    ]
  },
  {
    id: 'agora-way',
    name: 'Courtyard Way',
    width: 8.4,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-118, -26],
      [-62, -10],
      [0, 0],
      [62, 0],
      [132, 34]
    ]
  },
  {
    id: 'acropolis-climb',
    name: 'Watchtower Climb',
    width: 7.4,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 0],
      [6, 46],
      [0, 96],
      [18, 128]
    ]
  },
  {
    id: 'academy-lane',
    name: 'Library Lane',
    width: 7.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [-62, -10],
      [-92, 28],
      [-108, 74],
      [-116, 66]
    ]
  },
  {
    id: 'harbor-lane',
    name: 'Harbor Lane',
    width: 7.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [62, 0],
      [102, 12],
      [132, 28]
    ]
  },
  {
    id: 'vault-run',
    name: 'Vault Run',
    width: 7,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 0],
      [18, -52],
      [50, -98],
      [64, -112]
    ]
  },
  {
    id: 'western-trail',
    name: 'Western Trail',
    width: 7,
    hierarchy: 'street',
    closed: false,
    points: [
      [-62, -10],
      [-90, -50],
      [-104, -92]
    ]
  },
  {
    id: 'stunt-cove-loop',
    name: 'Stunt Courtyard Approach',
    width: 8.4,
    hierarchy: 'stunt',
    closed: false,
    points: [
      [64, -112],
      [82, -104],
      [96, -116]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 6.4,
    hierarchy: 'dirt',
    closed: false,
    turnaround: true,
    points: [
      [92, 104],
      [82, 96]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'loop-west-boost', position: [-116, 0, 20], rotation: Math.PI, color: '#7cffb2', district: 'loop' },
  { id: 'southern-curve-boost', position: [16, 0, -128], rotation: Math.PI / 2 - 0.28, color: '#68d8ff', district: 'loop' },
  { id: 'stunt-cove-boost', position: [86, 0, -108], rotation: 0, color: '#ff9b6d', district: 'stunt' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Portfolio Courtyard',
    kind: 'Home',
    position: [18, 0, 22],
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
    position: [-130, 0, -42],
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
    position: [66, 0, 28],
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
    position: [18, 0, 106],
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
    position: [96, 0, -18],
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
    position: [-112, 0, -72],
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
    position: [-108, 0, 84],
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
    position: [-34, 0, 64],
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
    position: [44, 0, -68],
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
    position: [-64, 0, 126],
    rotation: -0.28,
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
    position: [62, 0, 112],
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
    position: [132, 0, 54],
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
    position: [70, 0, -86],
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
    position: [108, 0, -88],
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
    position: [-138, 0, -4],
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
    position: [82, 0, 84],
    rotation: Math.PI,
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
  [84, 0, 104],
  [18, 0, 128],
  [-58, 0, 116],
  [-116, 0, 66],
  [-118, 0, -26],
  [-78, 0, -104],
  [-8, 0, -132],
  [64, 0, -112],
  [124, 0, -54],
  [132, 0, 34],
  [92, 0, 104],
  [84, 0, 104]
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
