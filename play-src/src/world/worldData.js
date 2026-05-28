export const WORLD_HALF_SIZE = 190;
export const MAP_PADDING = 24;
export const ISLAND_RADIUS = 158;

export const canalSegments = [];

export const districtFootprints = [
  { id: 'courtyard', label: 'Portfolio Courtyard', center: [16, 40], size: [58, 48], color: '#7cffb2', kind: 'plaza' },
  { id: 'watchtower', label: 'Sentinel Watchtower', center: [38, 104], size: [46, 34], color: '#ff6d8d', kind: 'keep' },
  { id: 'library-grove', label: 'FCC Education Grove', center: [-112, 72], size: [68, 54], color: '#9ccfff', kind: 'library' },
  { id: 'forge', label: 'Projects Foundry', center: [62, 42], size: [48, 36], color: '#ffcc66', kind: 'forge' },
  { id: 'harbor', label: 'Contact Harbor', center: [130, 64], size: [34, 30], color: '#78b7ff', kind: 'waterfront' },
  { id: 'archive', label: 'Archive Garden', center: [-24, 60], size: [36, 28], color: '#ffdf8a', kind: 'civic' },
  { id: 'security-campus', label: 'Security Lab Campus', center: [-126, -42], size: [62, 52], color: '#68d8ff', kind: 'security' },
  { id: 'cove', label: 'Stunt Courtyard', center: [112, -78], size: [40, 28], color: '#ff9b6d', kind: 'stunt' },
  { id: 'farm', label: 'Voxel Farm Pocket', center: [-56, -126], size: [34, 28], color: '#c79b56', kind: 'farm' }
];

export const scenicPropZones = [
  { id: 'start-diorama', center: [16, 40], size: [58, 48], kind: 'garden' },
  { id: 'security-pines', center: [-126, -42], size: [70, 56], kind: 'security' },
  { id: 'fcc-campus-walk', center: [-112, 72], size: [74, 58], kind: 'campus' },
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
    id: 'coastal-drive',
    name: 'Coastal Drive',
    width: 8.2,
    hierarchy: 'ring',
    closed: true,
    points: [
      [-80, 86],
      [-126, 18],
      [-106, -70],
      [-36, -122],
      [50, -116],
      [118, -58],
      [134, 34],
      [92, 94],
      [16, 126],
      [-60, 112]
    ]
  },
  {
    id: 'portfolio-avenue',
    name: 'Portfolio Avenue',
    width: 6.8,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-126, 18],
      [-74, 22],
      [-20, 24],
      [24, 26],
      [72, 26],
      [134, 30]
    ]
  },
  {
    id: 'watchtower-climb',
    name: 'Watchtower Climb',
    width: 5.4,
    hierarchy: 'street',
    closed: false,
    points: [
      [-20, 24],
      [0, 66],
      [28, 96],
      [16, 126]
    ]
  },
  {
    id: 'fcc-approach',
    name: 'FCC Approach',
    width: 5.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [-74, 22],
      [-92, 50],
      [-112, 61],
      [-126, 66]
    ]
  },
  {
    id: 'security-descent',
    name: 'Security Descent',
    width: 5.6,
    hierarchy: 'security',
    closed: false,
    points: [
      [-126, 18],
      [-136, -16],
      [-142, -36],
      [-130, -62],
      [-106, -70]
    ]
  },
  {
    id: 'south-tech-run',
    name: 'South Tech Run',
    width: 5.8,
    hierarchy: 'street',
    closed: false,
    points: [
      [-20, 24],
      [8, -22],
      [18, -72],
      [46, -104],
      [50, -116]
    ]
  },
  {
    id: 'career-link',
    name: 'Career Link',
    width: 5.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [72, 26],
      [82, 0],
      [80, -26],
      [58, -58],
      [48, -70]
    ]
  },
  {
    id: 'stunt-run',
    name: 'Stunt Run',
    width: 6.4,
    hierarchy: 'stunt',
    closed: false,
    points: [
      [50, -116],
      [96, -104],
      [124, -92],
      [124, -64],
      [118, -58]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 5.2,
    hierarchy: 'dirt',
    closed: false,
    points: [
      [-36, -122],
      [-58, -112],
      [-102, -82],
      [-106, -70]
    ]
  },
  {
    id: 'data-pier-spur',
    name: 'Data Pier Spur',
    width: 4.6,
    hierarchy: 'street',
    closed: false,
    points: [
      [-126, 18],
      [-146, 42],
      [-150, 36]
    ]
  },
  {
    id: 'harbor-spur',
    name: 'Harbor Spur',
    width: 4.8,
    hierarchy: 'street',
    closed: false,
    points: [
      [116, 54],
      [134, 50],
      [134, 30]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'southern-curve-boost', position: [2, 0, -119], rotation: 1.5, color: '#68d8ff', district: 'loop' },
  { id: 'east-loop-boost', position: [110, 0, -64], rotation: -0.55, color: '#7cffb2', district: 'loop' },
  { id: 'stunt-cove-boost', position: [82, 0, -96], rotation: -0.7, color: '#ff9b6d', district: 'stunt' }
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
    name: 'Security Lab Gate',
    kind: 'Offensive Security',
    position: [-126, 0, -42],
    rotation: 0.18,
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
    name: 'FCC Education Grove',
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
    position: [-88, 0, 0],
    rotation: 0.18,
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
      'A dedicated driving yard for ramps, boosters, handbrake turns, and clean landings.'
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
