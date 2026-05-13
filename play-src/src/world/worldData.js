export const WORLD_HALF_SIZE = 170;
export const MAP_PADDING = 18;

export const roadSegments = [
  [0, 0, 14, 286],
  [0, 24, 226, 12],
  [0, -62, 210, 12],
  [0, 96, 240, 12],
  [-108, 18, 12, 166],
  [108, 18, 12, 166],
  [-54, 66, 104, 10],
  [54, 66, 104, 10],
  [0, -116, 120, 12],
  [-132, -132, 72, 10],
  [132, -132, 72, 10],
  [-132, 126, 82, 10],
  [132, 126, 82, 10],
  [0, 144, 56, 10]
];

export const boostPads = [
  { id: 'north-run', position: [0, 0, 58], rotation: 0, color: '#7cffb2' },
  { id: 'south-run', position: [0, 0, -82], rotation: Math.PI, color: '#68d8ff' },
  { id: 'east-run', position: [78, 0, 24], rotation: Math.PI / 2, color: '#ffdf8a' },
  { id: 'west-run', position: [-78, 0, 24], rotation: -Math.PI / 2, color: '#ff6d8d' },
  { id: 'pier-shot', position: [132, 0, -116], rotation: 0, color: '#a8a6ff' }
];

export const worldZones = [
  {
    id: 'landing',
    name: 'Start Hub',
    kind: 'Home',
    position: [0, 0, 0],
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
    position: [-108, 0, 24],
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
    position: [108, 0, 24],
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
    position: [0, 0, 96],
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
    position: [-92, 0, -62],
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
    position: [92, 0, -62],
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
    position: [0, 0, -116],
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
    position: [-54, 0, 66],
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
    position: [54, 0, 66],
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
    position: [-132, 0, 126],
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
    position: [132, 0, 126],
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
    position: [0, 0, -36],
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
    position: [0, 0, 144],
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
    position: [132, 0, -132],
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
    position: [-132, 0, -132],
    radius: 9,
    color: '#79ffc5',
    shape: 'pier',
    achievement: 'data_pier',
    lines: [
      'A quiet edge of the island for signals, traces, and visitor-proof ideas.',
      'The public portfolio remains static-friendly, but the wider site already has Supabase-backed comments and visitor proof plumbing.',
      'This area can later become the live analytics/guest trail corner.'
    ]
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
  ['boost', 'Boosted', 'Use boost while driving.'],
  ['boost_pad', 'Pad Launched', 'Hit a boost pad.'],
  ['jump', 'Suspension Check', 'Jump the car.'],
  ['ramp_jump', 'Clean Air', 'Launch from a ramp.'],
  ['data_shards', 'Signal Collector', 'Collect every floating data shard.'],
  ['distance_1km', 'One Kilometer', 'Drive at least 1 km.'],
  ['all_zones', 'Full Tour', 'Interact with every portfolio zone.']
];

export const circuitCheckpoints = [
  [-132, 0, 126],
  [-156, 0, -132],
  [0, 0, -156],
  [156, 0, -132],
  [132, 0, 126],
  [0, 0, 144]
];
