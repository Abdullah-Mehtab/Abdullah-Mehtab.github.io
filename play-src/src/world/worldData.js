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
  {
    id: 'south-loop',
    label: 'Stunt And CV Run',
    center: [58, -82],
    size: [82, 46],
    color: '#ff9b6d',
    kind: 'driving',
    visualPads: [
      { id: 'cv-approach-deck', center: [26, -60], size: [38, 24], rotation: -0.18, kind: 'archive' },
      { id: 'stunt-runway-apron', center: [86, -92], size: [52, 22], rotation: 0.08, kind: 'driving' },
      { id: 'stunt-pit-yard', center: [114, -72], size: [31, 22], rotation: -0.34, kind: 'driving' },
      { id: 'south-return-ribbon', center: [58, -116], size: [44, 15], rotation: -0.28, kind: 'trail' }
    ]
  },
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
  { id: 'south-stunt-rubber-runway', center: [88, -92], size: [54, 22], rotation: 0.08, material: 'meadowDark' },
  { id: 'stunt-pit-warm-apron', center: [116, -74], size: [32, 18], rotation: -0.34, material: 'warmStone' },
  { id: 'south-loop-grass-infield', center: [56, -118], size: [46, 18], rotation: -0.36, material: 'meadowLight' },
  { id: 'farm-gold-field', center: [-50, -126], size: [54, 30], rotation: -0.16, material: 'warmStone' },
  { id: 'harbor-sand-apron', center: [126, 52], size: [42, 34], rotation: -0.18, material: 'sand' },
  { id: 'west-data-beach', center: [-132, 60], size: [36, 32], rotation: 0.42, material: 'sand' }
];

export const meadowDetailPatches = [
  { id: 'start-left-petal-lawn', center: [-34, 18], size: [28, 9], rotation: -0.26, color: '#f0aeb6' },
  { id: 'start-right-warm-lawn', center: [38, 18], size: [24, 8], rotation: 0.22, color: '#d7c36a' },
  { id: 'start-north-cool-lawn', center: [8, 62], size: [34, 10], rotation: 0.12, color: '#84d7bd' },
  { id: 'fcc-west-flower-lawn', center: [-116, 90], size: [30, 8], rotation: -0.34, color: '#f0aeb6' },
  { id: 'fcc-east-study-lawn', center: [-42, 94], size: [24, 7], rotation: 0.36, color: '#9ccfff' },
  { id: 'archive-garden-sweep', center: [-38, 50], size: [22, 7], rotation: -0.42, color: '#ffdf8a' },
  { id: 'cv-north-document-lawn', center: [2, -34], size: [32, 9], rotation: -0.16, color: '#e6f3ff' },
  { id: 'cv-west-shadow-lawn', center: [-20, -62], size: [28, 9], rotation: 0.24, color: '#7aa064' },
  { id: 'cv-south-petal-lawn', center: [20, -82], size: [26, 8], rotation: -0.32, color: '#d8b6ff' },
  { id: 'skills-east-terminal-lawn', center: [-36, -82], size: [26, 8], rotation: 0.28, color: '#92ffea' },
  { id: 'skills-west-shadow-lawn', center: [-98, -78], size: [28, 8], rotation: -0.24, color: '#426c4a' },
  { id: 'behind-south-work-lawn', center: [-12, -126], size: [30, 8], rotation: 0.18, color: '#a8a6ff' },
  { id: 'todo-north-queue-lawn', center: [-88, 36], size: [28, 8], rotation: -0.12, color: '#d8ff92' },
  { id: 'todo-west-shadow-lawn', center: [-120, 16], size: [26, 8], rotation: 0.34, color: '#6d8f4d' },
  { id: 'security-pine-lawn', center: [-132, -46], size: [26, 8], rotation: 0.46, color: '#68d8ff' },
  { id: 'security-return-lawn', center: [-78, -18], size: [30, 8], rotation: -0.3, color: '#394f4b' },
  { id: 'career-signal-lawn', center: [88, -8], size: [28, 8], rotation: -0.42, color: '#b6a0ff' },
  { id: 'career-south-warm-lawn', center: [102, -70], size: [34, 9], rotation: 0.24, color: '#ffb074' },
  { id: 'project-north-garden-lawn', center: [64, 86], size: [28, 8], rotation: -0.18, color: '#ffcc66' },
  { id: 'project-east-meadow-lawn', center: [104, 58], size: [24, 7], rotation: 0.4, color: '#8bd36b' },
  { id: 'harbor-inner-lawn', center: [112, 28], size: [24, 7], rotation: -0.32, color: '#78b7ff' },
  { id: 'harbor-ridge-lawn', center: [138, 72], size: [20, 6], rotation: 0.42, color: '#f3d19c' },
  { id: 'farm-upper-lawn', center: [-42, -104], size: [28, 8], rotation: -0.28, color: '#c79b56' },
  { id: 'farm-west-flower-lawn', center: [-90, -126], size: [26, 7], rotation: 0.36, color: '#f0aeb6' },
  { id: 'data-pier-grove-lawn', center: [-126, 36], size: [22, 7], rotation: -0.48, color: '#79ffc5' },
  { id: 'sentinel-ridge-petal-lawn', center: [26, 134], size: [28, 8], rotation: 0.18, color: '#ff6d8d' },
  { id: 'stunt-west-tire-lawn', center: [66, -110], size: [30, 8], rotation: -0.18, color: '#7a5b46' },
  { id: 'stunt-east-warm-lawn', center: [128, -86], size: [26, 7], rotation: 0.34, color: '#ff9b6d' },
  { id: 'central-cv-flower-lawn', center: [-16, -24], size: [28, 7], rotation: 0.16, color: '#d8b6ff' },
  { id: 'gallery-inner-cool-lawn', center: [38, -6], size: [30, 7], rotation: -0.32, color: '#84d7bd' },
  { id: 'career-approach-warm-lawn', center: [74, -36], size: [28, 8], rotation: 0.18, color: '#ffb074' },
  { id: 'sentinel-approach-lawn', center: [0, 76], size: [30, 7], rotation: 0.38, color: '#ff6d8d' },
  { id: 'harbor-north-salt-lawn', center: [116, 96], size: [26, 7], rotation: 0.24, color: '#78b7ff' },
  { id: 'south-loop-inner-lawn', center: [44, -126], size: [34, 8], rotation: -0.42, color: '#ff9b6d' },
  { id: 'west-campus-shadow-lawn', center: [-118, 104], size: [24, 7], rotation: 0.28, color: '#9ccfff' },
  { id: 'data-ridge-wild-lawn', center: [-146, 84], size: [20, 6], rotation: -0.36, color: '#79ffc5' }
];

export const districtSurfaceBreakups = [
  { id: 'launch-left-inset', center: [-12, 22], size: [22, 5.2], rotation: -0.18, color: '#3e6f45' },
  { id: 'launch-right-inset', center: [24, 34], size: [18, 4.6], rotation: 0.34, color: '#8fc674' },
  { id: 'launch-paver-shadow', center: [7, 13], size: [15, 3.8], rotation: 0.04, color: '#6a5d43' },
  { id: 'fcc-arrival-worn-lawn', center: [-82, 60], size: [30, 5.2], rotation: -0.1, color: '#7fb869' },
  { id: 'fcc-east-court-inset', center: [-52, 82], size: [18, 4.2], rotation: 0.38, color: '#9ccfff' },
  { id: 'security-court-shadow', center: [-105, -62], size: [30, 5.6], rotation: -0.18, color: '#071923' },
  { id: 'security-scanner-wash', center: [-86, -47], size: [22, 4.4], rotation: 0.42, color: '#68d8ff' },
  { id: 'security-return-inset', center: [-118, -76], size: [17, 3.8], rotation: -0.46, color: '#2d5f67' },
  { id: 'projects-factory-wear', center: [66, 48], size: [24, 5.4], rotation: -0.4, color: '#735b3f' },
  { id: 'projects-cargo-inset', center: [78, 66], size: [18, 4.2], rotation: 0.18, color: '#ffcc66' },
  { id: 'projects-road-side-fill', center: [44, 56], size: [14, 3.6], rotation: 0.55, color: '#8bd36b' },
  { id: 'sentinel-ridge-shadow', center: [20, 110], size: [24, 4.6], rotation: 0.26, color: '#5a4150' },
  { id: 'archive-stair-glow', center: [-42, 62], size: [18, 3.8], rotation: -0.12, color: '#ffdf8a' },
  { id: 'cv-document-court-left', center: [-4, -56], size: [22, 4.8], rotation: -0.24, color: '#64756b' },
  { id: 'cv-document-court-right', center: [24, -50], size: [18, 4.4], rotation: 0.32, color: '#d8b6ff' },
  { id: 'cv-south-worn-edge', center: [22, -78], size: [19, 3.6], rotation: -0.42, color: '#6b5948' },
  { id: 'career-office-apron-break', center: [92, -38], size: [24, 4.8], rotation: -0.28, color: '#715b78' },
  { id: 'career-link-lawn-cut', center: [82, -16], size: [17, 3.8], rotation: 0.5, color: '#8bd36b' },
  { id: 'stunt-yard-rubber-island', center: [88, -82], size: [28, 5.6], rotation: 0.12, color: '#3a211c' },
  { id: 'stunt-yard-safety-wash', center: [112, -96], size: [24, 4.8], rotation: -0.3, color: '#ff9b6d' },
  { id: 'stunt-yard-grass-cut', center: [72, -112], size: [22, 4.4], rotation: 0.46, color: '#5e7c42' },
  { id: 'circuit-grid-rubber-one', center: [50, 106], size: [22, 4.8], rotation: -0.2, color: '#3a211c' },
  { id: 'circuit-grid-rubber-two', center: [72, 96], size: [18, 4.2], rotation: 0.28, color: '#6d4a38' },
  { id: 'circuit-outer-lawn-cut', center: [42, 120], size: [16, 3.8], rotation: 0.12, color: '#6fa856' },
  { id: 'farm-track-worn-row', center: [-54, -132], size: [26, 4.4], rotation: -0.18, color: '#6b4828' },
  { id: 'farm-green-row', center: [-74, -118], size: [18, 3.8], rotation: 0.42, color: '#77b85a' },
  { id: 'behind-workbench-wear', center: [-14, -98], size: [22, 4.4], rotation: 0.18, color: '#5f584d' },
  { id: 'behind-process-inset', center: [2, -84], size: [17, 3.8], rotation: -0.36, color: '#a8a6ff' },
  { id: 'harbor-salt-wash', center: [124, 54], size: [21, 4.6], rotation: -0.2, color: '#78b7ff' },
  { id: 'harbor-sand-cut', center: [136, 74], size: [17, 3.8], rotation: 0.4, color: '#f3d19c' },
  { id: 'data-pier-tide-inset', center: [-130, 62], size: [17, 3.8], rotation: 0.65, color: '#79ffc5' }
];

export const fieldMotifClusters = [
  { id: 'launch-west-lawn', center: [-38, 8], size: [42, 24], rotation: -0.22, palette: ['#7cffb2', '#f0aeb6', '#d7c36a'], berms: 3, ribbons: 7, seed: 11 },
  { id: 'launch-east-lawn', center: [42, 16], size: [38, 22], rotation: 0.28, palette: ['#68d8ff', '#7cffb2', '#d7c36a'], berms: 3, ribbons: 6, seed: 17 },
  { id: 'fcc-arrival-lawn', center: [-104, 58], size: [42, 26], rotation: -0.36, palette: ['#9ccfff', '#f2dfb2', '#f0aeb6'], berms: 4, ribbons: 7, seed: 23 },
  { id: 'archive-campus-fill', center: [-30, 48], size: [40, 24], rotation: 0.18, palette: ['#ffdf8a', '#9ccfff', '#d8ff92'], berms: 3, ribbons: 6, seed: 29 },
  { id: 'security-pine-floor', center: [-126, -42], size: [40, 26], rotation: 0.48, palette: ['#68d8ff', '#84d7bd', '#92ffea'], berms: 3, ribbons: 7, seed: 31 },
  { id: 'security-return-field', center: [-74, -26], size: [36, 24], rotation: -0.24, palette: ['#68d8ff', '#7aa064', '#ff9db0'], berms: 3, ribbons: 6, seed: 37 },
  { id: 'project-north-field', center: [78, 92], size: [46, 24], rotation: -0.12, palette: ['#ffcc66', '#8bd36b', '#f0aeb6'], berms: 4, ribbons: 7, seed: 41 },
  { id: 'project-harbor-shoulder', center: [112, 24], size: [42, 24], rotation: 0.38, palette: ['#78b7ff', '#ffcc66', '#84d7bd'], berms: 3, ribbons: 6, seed: 43 },
  { id: 'career-meadow-fill', center: [88, -8], size: [46, 28], rotation: -0.4, palette: ['#b6a0ff', '#ffb074', '#8bd36b'], berms: 4, ribbons: 7, seed: 47 },
  { id: 'cv-document-lawn', center: [4, -42], size: [42, 26], rotation: -0.16, palette: ['#e6f3ff', '#d8b6ff', '#9fc77a'], berms: 3, ribbons: 6, seed: 53 },
  { id: 'west-skills-field', center: [-92, -86], size: [44, 28], rotation: -0.3, palette: ['#92ffea', '#7aa064', '#c79b56'], berms: 4, ribbons: 7, seed: 59 },
  { id: 'south-stunt-field', center: [112, -118], size: [52, 26], rotation: -0.32, palette: ['#ff9b6d', '#c79b56', '#f3e7bd'], berms: 4, ribbons: 7, seed: 61 },
  { id: 'behind-farm-field', center: [-22, -122], size: [46, 24], rotation: 0.22, palette: ['#a8a6ff', '#c79b56', '#77b85a'], berms: 3, ribbons: 6, seed: 67 },
  { id: 'data-pier-grove-fill', center: [-128, 32], size: [34, 24], rotation: -0.5, palette: ['#79ffc5', '#9ccfff', '#f0aeb6'], berms: 3, ribbons: 6, seed: 71 },
  { id: 'central-gallery-meadow', center: [38, -4], size: [44, 28], rotation: -0.35, palette: ['#84d7bd', '#e6f3ff', '#d8b6ff'], berms: 4, ribbons: 8, seed: 73 },
  { id: 'sentinel-inner-meadow', center: [-2, 76], size: [42, 24], rotation: 0.42, palette: ['#ff6d8d', '#ffdf8a', '#9ccfff'], berms: 3, ribbons: 7, seed: 79 },
  { id: 'east-harbor-meadow', center: [116, 98], size: [32, 22], rotation: 0.2, palette: ['#78b7ff', '#f3d19c', '#84d7bd'], berms: 3, ribbons: 7, seed: 83 },
  { id: 'cv-west-meadow', center: [-18, -24], size: [38, 26], rotation: 0.18, palette: ['#e6f3ff', '#d8b6ff', '#9fc77a'], berms: 3, ribbons: 7, seed: 89 },
  { id: 'south-loop-inner-meadow', center: [44, -126], size: [40, 24], rotation: -0.44, palette: ['#ff9b6d', '#c79b56', '#f3e7bd'], berms: 4, ribbons: 7, seed: 97 },
  { id: 'fcc-north-grove-meadow', center: [-106, 112], size: [34, 22], rotation: 0.24, palette: ['#9ccfff', '#f0aeb6', '#f2dfb2'], berms: 3, ribbons: 6, seed: 101 }
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
      [112, -23],
      [104, -31]
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

export const routeThresholds = [
  { id: 'launch-plaza-rollout', center: [4, 31], rotation: 0.14, width: 20, depth: 7.5, color: '#7cffb2', bars: 4 },
  { id: 'gallery-data-join', center: [-116, 42], rotation: 1.5, width: 17, depth: 7, color: '#79ffc5', bars: 3 },
  { id: 'gallery-harbor-join', center: [116, 40], rotation: -1.06, width: 18, depth: 7, color: '#78b7ff', bars: 3 },
  { id: 'fcc-arrival-threshold', center: [-57, 63], rotation: -0.62, width: 18, depth: 8, color: '#9ccfff', bars: 4 },
  { id: 'fcc-courtyard-threshold', center: [-57, 91], rotation: 0.48, width: 18, depth: 7, color: '#f2dfb2', bars: 3 },
  { id: 'scanner-gate-threshold', center: [-90, -31], rotation: -2.2, width: 19, depth: 8, color: '#68d8ff', bars: 4 },
  { id: 'security-return-threshold', center: [-119, -57], rotation: -2.36, width: 17, depth: 7, color: '#68d8ff', bars: 3 },
  { id: 'document-run-threshold', center: [28, -29], rotation: 2.64, width: 18, depth: 8, color: '#e6f3ff', bars: 4 },
  { id: 'cv-vault-threshold', center: [36, -53], rotation: 2.62, width: 18, depth: 7.5, color: '#d8b6ff', bars: 4 },
  { id: 'stunt-yard-threshold', center: [86, -96], rotation: 1.48, width: 18, depth: 6.5, color: '#ff9b6d', bars: 5 },
  { id: 'farm-track-threshold', center: [-52, -121], rotation: -1.32, width: 18, depth: 8, color: '#c79b56', bars: 4 },
  { id: 'behind-build-threshold', center: [5, -92], rotation: -2.72, width: 17, depth: 7, color: '#a8a6ff', bars: 3 },
  { id: 'sentinel-ridge-threshold', center: [18, 99], rotation: 0.82, width: 18, depth: 7, color: '#ff6d8d', bars: 4 },
  { id: 'career-office-threshold', center: [94, -22], rotation: -2.42, width: 18, depth: 7, color: '#b6a0ff', bars: 3 },
  { id: 'harbor-link-threshold', center: [124, 70], rotation: 1.08, width: 17, depth: 7, color: '#78b7ff', bars: 3 },
  { id: 'data-pier-threshold', center: [-135, 58], rotation: -0.62, width: 16, depth: 7, color: '#79ffc5', bars: 3 },
  { id: 'archive-steps-threshold', center: [-27, 64], rotation: 0.1, width: 16, depth: 7, color: '#ffdf8a', bars: 3 }
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
    camera: [-86, 9, -66],
    target: [-62, 3.2, -84],
    fov: 40
  },
  education: {
    respawn: { position: [-60, 1.08, 64], heading: -0.79 },
    camera: [-44, 13, 52],
    target: [-78, 5.2, 82],
    fov: 43
  },
  awards: {
    respawn: { position: [-30, 1.08, 54], heading: -0.66 },
    camera: [-28, 8, 54],
    target: [-44, 3, 73],
    fov: 41
  },
  cv: {
    respawn: { position: [30, 1.08, -42], heading: -2.2 },
    camera: [28, 8, -42],
    target: [6, 3, -57],
    fov: 41
  },
  todo: {
    respawn: { position: [-82, 1.08, 40], heading: 3.14 },
    camera: [-64, 9, -4],
    target: [-83, 3, 15],
    fov: 40
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
    camera: [6, 8, -76],
    target: [-17, 3, -96],
    fov: 40
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
  ['circuit_finish', 'Clean Circuit', 'Finish the island checkpoint circuit.'],
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
