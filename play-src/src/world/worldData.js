export const WORLD_HALF_SIZE = 170;
export const MAP_PADDING = 18;

export const roadSegments = [
  [3, 4, 14, 250, -0.04],
  [-45, 21, 148, 11, 0.08],
  [66, 32, 92, 11, -0.12],
  [-64, -54, 112, 11, -0.13],
  [67, -70, 120, 11, 0.08],
  [-25, 95, 104, 11, 0.1],
  [66, 91, 90, 10, -0.18],
  [-122, 78, 12, 122, -0.08],
  [112, 47, 12, 130, 0.06],
  [-24, -124, 132, 11, -0.05],
  [-132, -128, 62, 10, 0.18],
  [128, -123, 78, 10, -0.12],
  [-126, 132, 66, 10, -0.1],
  [96, 140, 78, 10, 0.07],
  [20, 146, 58, 10, -0.04],
  [22, -35, 86, 10, 0.05]
];

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
      'This vault opens into the web version of my current resume.',
      'It collects experience, education, certificates, project record, skills, awards, and downloadable PDFs.',
      'Use it when you want the formal version after exploring the world.'
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
      'It is the public scratchpad beside the polished portfolio: tasks, experiments, reminders, and ideas still moving.'
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
      'The full leaderboard version can be expanded later, but the loop already gives the world a reason to be driven instead of merely viewed.',
      'Follow the glowing road around the outer ring and try not to park upside down.'
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
      'This world is a static GitHub Pages page powered by a Vite-built Three.js application.',
      'Physics runs through Rapier, visuals are built with custom Three.js geometry and materials, and the portfolio content is pulled from local resume data.',
      'The public site remains static-friendly while still behaving like a small interactive application.'
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
      'This yard exists for driving, not reading.',
      'Use the ramps, boost pads, and loose crates to test the car handling.',
      'The portfolio world should have some physical memory, not only panels.'
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
      'This pier lights up the visitor-proof layer for the drive page.',
      'Page views, zone visits, and potato summons are counted as lightweight anonymous events.',
      'Server-side analytics store hashed IP and browser-fingerprint signals for uniqueness without exposing raw addresses in the client.'
    ]
  },
  {
    id: 'potato',
    name: 'Potato Farm',
    kind: 'Interaction Counter',
    position: [95, 0, 142],
    radius: 9,
    color: '#c79b56',
    shape: 'farm',
    achievement: 'potato_farm',
    lines: [
      'A small farm patch for spawning temporary blocky potatoes inside the drive world.',
      'Press P nearby, or use the summon button here, to add one potato to the local map and increment the persistent counter.',
      'The potatoes are session-only objects; the interaction count is the part that stays.'
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
