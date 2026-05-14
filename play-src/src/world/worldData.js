export const WORLD_HALF_SIZE = 205;
export const MAP_PADDING = 24;

export const canalSegments = [
  {
    id: 'lahore-canal',
    width: 18,
    bankWidth: 6,
    points: [
      [-196, -86],
      [-136, -76],
      [-76, -82],
      [-12, -72],
      [48, -88],
      [112, -80],
      [196, -102]
    ]
  }
];

export const districtFootprints = [
  { id: 'portfolio-chowk', label: 'Portfolio Chowk', center: [0, 0], size: [54, 44], color: '#7cffb2', kind: 'plaza' },
  { id: 'campus', label: 'Campus District', center: [-128, 110], size: [62, 52], color: '#9ccfff', kind: 'campus' },
  { id: 'business', label: 'Business District', center: [92, -34], size: [64, 58], color: '#b6a0ff', kind: 'business' },
  { id: 'security', label: 'Security + Stack District', center: [-116, -30], size: [64, 54], color: '#68d8ff', kind: 'security' },
  { id: 'creative', label: 'Creative Bazaar', center: [64, 62], size: [66, 52], color: '#ffcc66', kind: 'bazaar' },
  { id: 'civic', label: 'Civic Archive', center: [-42, 54], size: [64, 50], color: '#ffdf8a', kind: 'civic' },
  { id: 'waterfront', label: 'Waterfront Data Edge', center: [-168, -138], size: [58, 42], color: '#79ffc5', kind: 'waterfront' },
  { id: 'stunt', label: 'Ramp Yard', center: [138, -132], size: [70, 46], color: '#ff9b6d', kind: 'stunt' },
  { id: 'farm', label: 'Potato Farm Pocket', center: [176, 176], size: [52, 36], color: '#c79b56', kind: 'farm' }
];

export const scenicPropZones = [
  { id: 'canal-greenbelt-west', center: [-124, -58], size: [92, 22], kind: 'greenbelt' },
  { id: 'canal-greenbelt-east', center: [92, -62], size: [120, 24], kind: 'greenbelt' },
  { id: 'campus-lawns', center: [-146, 120], size: [58, 34], kind: 'park' },
  { id: 'bazaar-front', center: [36, 92], size: [72, 22], kind: 'market' },
  { id: 'archive-garden', center: [-42, 92], size: [50, 26], kind: 'park' },
  { id: 'farm-buffer', center: [172, 156], size: [56, 28], kind: 'farm' }
];

export const roadPaths = [
  {
    id: 'ring-boulevard',
    name: 'Ring Boulevard',
    width: 13.5,
    hierarchy: 'ring',
    closed: true,
    points: [
      [-154, 76],
      [-144, -30],
      [-102, -134],
      [-8, -166],
      [94, -148],
      [158, -78],
      [162, 28],
      [128, 116],
      [34, 158],
      [-80, 144]
    ]
  },
  {
    id: 'mall-boulevard',
    name: 'Mall Boulevard',
    width: 14.5,
    hierarchy: 'boulevard',
    closed: false,
    points: [
      [-164, 8],
      [-88, 2],
      [-22, 0],
      [36, 0],
      [96, 8],
      [166, 14]
    ]
  },
  {
    id: 'canal-road-north',
    name: 'Canal North Road',
    width: 10.5,
    hierarchy: 'canal',
    closed: false,
    points: [
      [-182, -58],
      [-120, -50],
      [-54, -56],
      [8, -48],
      [72, -62],
      [138, -54],
      [186, -70]
    ]
  },
  {
    id: 'canal-road-south',
    name: 'Canal South Road',
    width: 10.5,
    hierarchy: 'canal',
    closed: false,
    points: [
      [-180, -106],
      [-116, -98],
      [-52, -104],
      [12, -94],
      [72, -112],
      [140, -100],
      [188, -122]
    ]
  },
  {
    id: 'campus-avenue',
    name: 'Campus Avenue',
    width: 11.5,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-120, 150],
      [-116, 94],
      [-106, 38],
      [-88, 2],
      [-82, -50],
      [-98, -120]
    ]
  },
  {
    id: 'business-spine',
    name: 'Business Spine',
    width: 12,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [42, 146],
      [52, 88],
      [42, 34],
      [36, 0],
      [62, -52],
      [100, -112],
      [138, -148]
    ]
  },
  {
    id: 'bazaar-loop',
    name: 'Creative Bazaar Loop',
    width: 9.5,
    hierarchy: 'street',
    closed: true,
    points: [
      [-80, 70],
      [-18, 74],
      [42, 56],
      [94, 44],
      [120, 74],
      [74, 104],
      [8, 112],
      [-58, 98]
    ]
  },
  {
    id: 'waterfront-drive',
    name: 'Waterfront Drive',
    width: 10,
    hierarchy: 'street',
    closed: false,
    points: [
      [-176, -132],
      [-146, -116],
      [-126, -94],
      [-120, -62],
      [-144, -30]
    ]
  },
  {
    id: 'stunt-yard-loop',
    name: 'Ramp Yard Loop',
    width: 11,
    hierarchy: 'stunt',
    closed: true,
    points: [
      [104, -112],
      [138, -104],
      [170, -128],
      [154, -160],
      [112, -168],
      [84, -140]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 7.5,
    hierarchy: 'dirt',
    closed: false,
    turnaround: true,
    points: [
      [128, 116],
      [146, 134],
      [164, 152],
      [184, 164]
    ]
  },
  {
    id: 'bridge-west',
    name: 'West Canal Bridge',
    width: 12,
    hierarchy: 'bridge',
    closed: false,
    points: [
      [-118, -44],
      [-116, -78],
      [-116, -112]
    ]
  },
  {
    id: 'bridge-center',
    name: 'Portfolio Canal Bridge',
    width: 12,
    hierarchy: 'bridge',
    closed: false,
    points: [
      [12, -42],
      [8, -72],
      [12, -104]
    ]
  },
  {
    id: 'bridge-east',
    name: 'Business Canal Bridge',
    width: 12,
    hierarchy: 'bridge',
    closed: false,
    points: [
      [112, -38],
      [116, -78],
      [118, -112]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'ring-east-straight', position: [160, 4, 0], rotation: 0.06, color: '#7cffb2', district: 'ring' },
  { id: 'canal-sprint', position: [54, 0, -62], rotation: Math.PI / 2 + 0.04, color: '#68d8ff', district: 'canal' },
  { id: 'stunt-entry', position: [94, 0, -144], rotation: Math.PI / 2 - 0.26, color: '#ff9b6d', district: 'stunt' },
  { id: 'stunt-exit', position: [154, 0, -158], rotation: -1.18, color: '#ffdf8a', district: 'stunt' },
  { id: 'farm-track-roll', position: [150, 0, 138], rotation: -0.78, color: '#c79b56', district: 'farm' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Portfolio Chowk',
    kind: 'Home',
    position: [0, 0, 20],
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
    name: 'Security Lab',
    kind: 'Offensive Security',
    position: [-134, 0, -22],
    rotation: 0.12,
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
    position: [74, 0, 70],
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
    name: 'Cyber Sentinel Tower',
    kind: 'Final Year Project',
    position: [2, 0, 126],
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
    name: 'Career Office',
    kind: 'Experience',
    position: [92, 0, -34],
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
    name: 'Skills Terminal',
    kind: 'Stack',
    position: [-44, 0, -116],
    rotation: 0.2,
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
    position: [-148, 0, 110],
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
    name: 'Awards Tower',
    kind: 'Certificates',
    position: [-54, 0, 54],
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
    position: [34, 0, 80],
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
    position: [-150, 0, 132],
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
    position: [128, 0, 116],
    rotation: -0.22,
    radius: 9,
    color: '#ff9b6d',
    shape: 'gate',
    achievement: 'circuit_gate',
    lines: [
      'This gate starts the city ring circuit.',
      'Follow the boulevard checkpoints through each district and return to the gate clean.'
    ],
    startsCircuit: true
  },
  {
    id: 'contact',
    name: 'Contact Port',
    kind: 'Links',
    position: [174, 0, -36],
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
    position: [24, 0, 146],
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
    name: 'Ramp Yard',
    kind: 'Driving',
    position: [138, 0, -132],
    rotation: -0.45,
    radius: 11,
    color: '#ff9b6d',
    shape: 'rampyard',
    achievement: 'ramp_yard',
    lines: [
      'Dedicated stunt district with clear approach lanes, boosters, ramps, and landing room.'
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    kind: 'Visitor Trail',
    position: [-172, 0, -146],
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
    position: [176, 0, 176],
    rotation: -0.78,
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
  [128, 0, 116],
  [34, 0, 158],
  [-80, 0, 144],
  [-154, 0, 76],
  [-144, 0, -30],
  [-102, 0, -134],
  [-8, 0, -166],
  [94, 0, -148],
  [158, 0, -78],
  [162, 0, 28],
  [128, 0, 116]
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
