export const WORLD_HALF_SIZE = 170;
export const MAP_PADDING = 18;

export const roadPaths = [
  {
    id: 'outer-loop',
    width: 13,
    closed: true,
    points: [
      [-138, 124],
      [-156, 58],
      [-145, -38],
      [-108, -120],
      [-24, -158],
      [74, -146],
      [146, -96],
      [156, -8],
      [132, 88],
      [82, 142],
      [-18, 154],
      [-104, 142]
    ]
  },
  {
    id: 'inner-loop',
    width: 11,
    closed: true,
    points: [
      [2, -8],
      [-70, 18],
      [-72, 76],
      [-10, 104],
      [48, 82],
      [100, 34],
      [82, -78],
      [18, -28]
    ]
  },
  {
    id: 'campus-loop',
    width: 10,
    closed: true,
    points: [
      [-105, -52],
      [-24, -132],
      [82, -78],
      [18, -28]
    ]
  },
  {
    id: 'north-loop',
    width: 10,
    closed: true,
    points: [
      [-138, 128],
      [-70, 76],
      [-10, 104],
      [45, 82],
      [129, 118],
      [82, 142],
      [22, 149]
    ]
  },
  {
    id: 'dock-loop',
    width: 10,
    closed: true,
    points: [
      [-144, -130],
      [-108, -120],
      [-105, -52],
      [-145, -38]
    ]
  }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'north-run', position: [6, 0, 58], rotation: -0.04, color: '#7cffb2' },
  { id: 'south-run', position: [2, 0, -82], rotation: Math.PI - 0.04, color: '#68d8ff' },
  { id: 'east-run', position: [78, 0, 29], rotation: Math.PI / 2 - 0.12, color: '#ffdf8a' },
  { id: 'west-run', position: [-82, 0, 17], rotation: -Math.PI / 2 + 0.08, color: '#ff6d8d' },
  { id: 'pier-shot', position: [128, 0, -116], rotation: 0.2, color: '#a8a6ff' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Start Hub',
    kind: 'Home',
    position: [2, 0, -4],
    radius: 9,
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
    position: [-118, 0, 18],
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
    position: [98, 0, 34],
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
    position: [-10, 0, 103],
    radius: 11,
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
    position: [-105, 0, -52],
    radius: 9,
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
    position: [82, 0, -78],
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
    position: [-24, 0, -132],
    radius: 9,
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
    position: [-70, 0, 76],
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
    position: [45, 0, 82],
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
    position: [-138, 0, 128],
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
    position: [129, 0, 118],
    radius: 8,
    color: '#ff9b6d',
    shape: 'gate',
    achievement: 'circuit_gate',
    lines: [
      'This gate marks the driving circuit.',
      'Follow the outer loop through the checkpoint rings and bring the car back clean.'
    ],
    startsCircuit: true
  },
  {
    id: 'contact',
    name: 'Contact Port',
    kind: 'Links',
    position: [18, 0, -28],
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
    position: [22, 0, 149],
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
    position: [136, 0, -126],
    radius: 9,
    color: '#ff9b6d',
    shape: 'rampyard',
    achievement: 'ramp_yard',
    lines: [
      'Ramps, boost pads, loose crates, and a bit of room to throw the car around.'
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    kind: 'Visitor Trail',
    position: [-144, 0, -130],
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
    position: [105, 0, 154],
    radius: 9,
    color: '#c79b56',
    shape: 'farm',
    achievement: 'potato_farm',
    lines: [
      'Minecraft-style potato patch.',
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
  [-138, 0, 128],
  [-158, 0, -130],
  [-24, 0, -158],
  [152, 0, -126],
  [129, 0, 118],
  [22, 0, 149]
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
