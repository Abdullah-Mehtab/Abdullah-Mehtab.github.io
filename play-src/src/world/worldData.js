// ABOUTME: Defines the authored /play island layout, districts, roads, zones, and rewards.
// ABOUTME: Keeps portfolio zone ids stable while allowing the island itself to be rebuilt.

export const WORLD_HALF_SIZE = 190;
export const MAP_PADDING = 24;
export const ISLAND_RADIUS = 158;
export const SECURITY_SCAN_OFFSET = [-13, 1];
export const SECURITY_SCAN_ROTATION = -2.66;

export const canalSegments = [];

export const districtFootprints = [
  { id: 'start-plaza', label: 'Launch Plaza', center: [0, 42], size: [46, 34], color: '#7cffb2', kind: 'plaza' },
  { id: 'fcc-campus', label: 'FCC Education Grove', center: [-82, 82], size: [58, 46], color: '#9ccfff', kind: 'campus' },
  { id: 'security-campus', label: 'Security Lab', center: [-94, -66], size: [54, 42], color: '#68d8ff', kind: 'security' },
  { id: 'project-yard', label: 'Projects Yard', center: [62, 58], size: [44, 34], color: '#ffcc66', kind: 'workshop' },
  { id: 'ridge', label: 'Sentinel Ridge', center: [18, 112], size: [46, 32], color: '#ff6d8d', kind: 'tower' },
  { id: 'archive', label: 'Archive Steps', center: [-44, 72], size: [34, 28], color: '#ffdf8a', kind: 'archive' },
  {
    id: 'south-loop',
    label: 'Stunt And CV Run',
    center: [58, -86],
    size: [82, 46],
    color: '#ff9b6d',
    kind: 'driving',
    visualPads: [
      { id: 'cv-approach-deck', center: [8, -58], size: [36, 24], rotation: -0.18, kind: 'archive' },
      { id: 'stunt-runway-apron', center: [94, -86], size: [54, 24], rotation: 0.08, kind: 'driving' },
      { id: 'south-return-ribbon', center: [32, -124], size: [52, 16], rotation: -0.28, kind: 'trail' }
    ]
  },
  { id: 'west-trail', label: 'Skills And Farm Trail', center: [-62, -104], size: [64, 46], color: '#92ffea', kind: 'trail' },
  {
    id: 'harbor',
    label: 'Signal Harbor',
    center: [104, 86],
    size: [30, 30],
    color: '#78b7ff',
    kind: 'harbor',
    visualPads: [
      { id: 'signal-court', center: [104, 86], size: [25, 20], rotation: -0.34, kind: 'harbor' },
      { id: 'pier-pocket', center: [132, 70], size: [12, 10], rotation: -0.5, kind: 'pier' }
    ]
  },
  { id: 'data-pier', label: 'Data Pier', center: [-112, 58], size: [32, 32], color: '#79ffc5', kind: 'pier' }
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
  { id: 'start-meadow-light', center: [-12, 34], size: [72, 46], rotation: -0.12, material: 'terrainBrushLight' },
  { id: 'start-shadow-pocket', center: [32, 26], size: [40, 22], rotation: 0.18, material: 'terrainBrushDark' },
  { id: 'fcc-lawn', center: [-78, 73], size: [78, 34], rotation: -0.08, material: 'terrainBrushLight' },
  { id: 'fcc-flower-walk', center: [-58, 94], size: [38, 16], rotation: 0.35, material: 'terrainBrushFlower' },
  { id: 'security-dark-pad', center: [-96, -58], size: [66, 40], rotation: -0.2, material: 'terrainBrushDark' },
  { id: 'security-blue-grit', center: [-112, -34], size: [30, 18], rotation: 0.48, material: 'terrainBrushBlue' },
  { id: 'project-yard-dust', center: [62, 48], size: [52, 34], rotation: -0.36, material: 'terrainBrushWarm' },
  { id: 'sentinel-ridge-grass', center: [18, 108], size: [54, 22], rotation: 0.24, material: 'terrainBrushLight' },
  { id: 'south-stunt-rubber-runway', center: [88, -92], size: [54, 22], rotation: 0.08, material: 'terrainBrushDark' },
  { id: 'stunt-pit-warm-apron', center: [116, -74], size: [32, 18], rotation: -0.34, material: 'terrainBrushWarm' },
  { id: 'south-loop-grass-infield', center: [56, -118], size: [46, 18], rotation: -0.36, material: 'terrainBrushLight' },
  { id: 'farm-gold-field', center: [-50, -126], size: [54, 30], rotation: -0.16, material: 'terrainBrushWarm' },
  { id: 'harbor-sand-apron', center: [132, 58], size: [30, 22], rotation: -0.26, material: 'terrainBrushSand' },
  { id: 'west-data-beach', center: [-132, 60], size: [36, 32], rotation: 0.42, material: 'terrainBrushSand' }
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
  { id: 'cv-foreground-document-cut', center: [-10, -72], size: [34, 8], rotation: 0.18, color: '#e6f3ff' },
  { id: 'cv-west-archive-shadow', center: [-36, -78], size: [28, 7], rotation: -0.28, color: '#7aa064' },
  { id: 'skills-east-terminal-lawn', center: [-36, -82], size: [26, 8], rotation: 0.28, color: '#92ffea' },
  { id: 'skills-west-shadow-lawn', center: [-98, -78], size: [28, 8], rotation: -0.24, color: '#426c4a' },
  { id: 'behind-south-work-lawn', center: [-12, -126], size: [30, 8], rotation: 0.18, color: '#a8a6ff' },
  { id: 'behind-workshop-foreground', center: [-30, -88], size: [32, 8], rotation: 0.28, color: '#a8a6ff' },
  { id: 'behind-west-trail-fill', center: [-46, -104], size: [28, 7], rotation: -0.22, color: '#c79b56' },
  { id: 'todo-north-queue-lawn', center: [-88, 36], size: [28, 8], rotation: -0.12, color: '#d8ff92' },
  { id: 'todo-west-shadow-lawn', center: [-120, 16], size: [26, 8], rotation: 0.34, color: '#6d8f4d' },
  { id: 'security-pine-lawn', center: [-132, -46], size: [26, 8], rotation: 0.46, color: '#68d8ff' },
  { id: 'security-return-lawn', center: [-78, -18], size: [30, 8], rotation: -0.3, color: '#394f4b' },
  { id: 'career-signal-lawn', center: [88, -8], size: [28, 8], rotation: -0.42, color: '#b6a0ff' },
  { id: 'career-south-warm-lawn', center: [102, -70], size: [34, 9], rotation: 0.24, color: '#ffb074' },
  { id: 'project-north-garden-lawn', center: [64, 86], size: [28, 8], rotation: -0.18, color: '#ffcc66' },
  { id: 'project-east-meadow-lawn', center: [104, 58], size: [24, 7], rotation: 0.4, color: '#8bd36b' },
  { id: 'east-gallery-petal-sweep', center: [92, 26], size: [30, 8], rotation: 0.28, color: '#f0aeb6' },
  { id: 'contact-career-crosswind-lawn', center: [112, 2], size: [40, 10], rotation: -0.28, color: '#78b7ff' },
  { id: 'project-harbor-signal-lawn', center: [116, 42], size: [24, 7], rotation: -0.18, color: '#ffcc66' },
  { id: 'contact-inner-grass-cut', center: [128, 5], size: [24, 7], rotation: 0.38, color: '#84d7bd' },
  { id: 'harbor-inner-lawn', center: [108, 10], size: [28, 8], rotation: -0.24, color: '#78b7ff' },
  { id: 'east-shore-foreground-blue-cut', center: [116, -10], size: [34, 8], rotation: -0.18, color: '#78b7ff' },
  { id: 'east-shore-foreground-salt-cut', center: [134, -7], size: [26, 7], rotation: 0.3, color: '#f3d19c' },
  { id: 'east-shore-foreground-meadow-cut', center: [104, -15], size: [28, 7], rotation: 0.12, color: '#84d7bd' },
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
  { id: 'project-harbor-shoulder', center: [104, 8], size: [46, 26], rotation: 0.28, palette: ['#78b7ff', '#ffcc66', '#84d7bd'], berms: 3, ribbons: 6, seed: 43 },
  { id: 'east-signal-crossfield', center: [112, 0], size: [58, 30], rotation: -0.16, palette: ['#78b7ff', '#ffcc66', '#84d7bd'], berms: 4, ribbons: 8, seed: 127 },
  { id: 'east-shore-foreground-fan', center: [122, -12], size: [44, 20], rotation: 0.08, palette: ['#78b7ff', '#f3d19c', '#84d7bd'], berms: 3, ribbons: 7, seed: 151 },
  { id: 'project-harbor-lawn-fill', center: [98, 54], size: [44, 24], rotation: 0.22, palette: ['#ffcc66', '#78b7ff', '#8bd36b'], berms: 3, ribbons: 7, seed: 131 },
  { id: 'contact-approach-meadow', center: [132, 12], size: [34, 24], rotation: -0.38, palette: ['#78b7ff', '#f3d19c', '#84d7bd'], berms: 3, ribbons: 6, seed: 137 },
  { id: 'career-meadow-fill', center: [88, -8], size: [46, 28], rotation: -0.4, palette: ['#b6a0ff', '#ffb074', '#8bd36b'], berms: 4, ribbons: 7, seed: 47 },
  { id: 'cv-document-lawn', center: [4, -42], size: [42, 26], rotation: -0.16, palette: ['#e6f3ff', '#d8b6ff', '#9fc77a'], berms: 3, ribbons: 6, seed: 53 },
  { id: 'cv-foreground-archive-field', center: [-18, -76], size: [42, 24], rotation: 0.14, palette: ['#e6f3ff', '#d8b6ff', '#7aa064'], berms: 4, ribbons: 8, seed: 139 },
  { id: 'west-skills-field', center: [-92, -86], size: [44, 28], rotation: -0.3, palette: ['#92ffea', '#7aa064', '#c79b56'], berms: 4, ribbons: 7, seed: 59 },
  { id: 'south-stunt-field', center: [112, -118], size: [52, 26], rotation: -0.32, palette: ['#ff9b6d', '#c79b56', '#f3e7bd'], berms: 4, ribbons: 7, seed: 61 },
  { id: 'behind-farm-field', center: [-22, -122], size: [46, 24], rotation: 0.22, palette: ['#a8a6ff', '#c79b56', '#77b85a'], berms: 3, ribbons: 6, seed: 67 },
  { id: 'behind-foreground-workfield', center: [-36, -92], size: [42, 24], rotation: 0.28, palette: ['#a8a6ff', '#92ffea', '#c79b56'], berms: 4, ribbons: 8, seed: 149 },
  { id: 'data-pier-grove-fill', center: [-128, 32], size: [34, 24], rotation: -0.5, palette: ['#79ffc5', '#9ccfff', '#f0aeb6'], berms: 3, ribbons: 6, seed: 71 },
  { id: 'central-gallery-meadow', center: [38, -4], size: [44, 28], rotation: -0.35, palette: ['#84d7bd', '#e6f3ff', '#d8b6ff'], berms: 4, ribbons: 8, seed: 73 },
  { id: 'sentinel-inner-meadow', center: [-2, 76], size: [42, 24], rotation: 0.42, palette: ['#ff6d8d', '#ffdf8a', '#9ccfff'], berms: 3, ribbons: 7, seed: 79 },
  { id: 'east-harbor-meadow', center: [116, 98], size: [32, 22], rotation: 0.2, palette: ['#78b7ff', '#f3d19c', '#84d7bd'], berms: 3, ribbons: 7, seed: 83 },
  { id: 'cv-west-meadow', center: [-18, -24], size: [38, 26], rotation: 0.18, palette: ['#e6f3ff', '#d8b6ff', '#9fc77a'], berms: 3, ribbons: 7, seed: 89 },
  { id: 'south-loop-inner-meadow', center: [44, -126], size: [40, 24], rotation: -0.44, palette: ['#ff9b6d', '#c79b56', '#f3e7bd'], berms: 4, ribbons: 7, seed: 97 },
  { id: 'fcc-north-grove-meadow', center: [-106, 112], size: [34, 22], rotation: 0.24, palette: ['#9ccfff', '#f0aeb6', '#f2dfb2'], berms: 3, ribbons: 6, seed: 101 },
  { id: 'central-loop-infield', center: [48, -4], size: [32, 22], rotation: 0.22, palette: ['#84d7bd', '#ffdf8a', '#d8b6ff'], berms: 4, ribbons: 6, seed: 107 },
  { id: 'north-loop-overlook-meadow', center: [-10, 112], size: [32, 18], rotation: -0.18, palette: ['#ff6d8d', '#9ccfff', '#f2dfb2'], berms: 4, ribbons: 6, seed: 113 }
];

export const roadPaths = [
  {
    id: 'coastal-loop',
    name: 'Coastal Loop',
    width: 4.6,
    hierarchy: 'avenue',
    closed: true,
    points: [
      [-132, 48],
      [-110, 98],
      [-56, 130],
      [20, 136],
      [82, 116],
      [128, 72],
      [142, 12],
      [118, -54],
      [86, -108],
      [18, -132],
      [-58, -124],
      [-98, -82],
      [-132, -18],
      [-136, 30]
    ]
  },
  {
    id: 'portfolio-spine',
    name: 'Portfolio Spine',
    width: 5.0,
    hierarchy: 'avenue',
    closed: false,
    points: [
      [-132, 48],
      [-90, 44],
      [-42, 34],
      [0, 28],
      [44, 38],
      [84, 48],
      [128, 72]
    ]
  },
  {
    id: 'fcc-walk',
    name: 'FCC Walk',
    width: 4.6,
    hierarchy: 'plaza',
    closed: false,
    points: [
      [-42, 34],
      [-56, 56],
      [-58, 72],
      [-48, 96],
      [-70, 116],
      [-110, 98]
    ]
  },
  {
    id: 'security-run',
    name: 'Scanner Run',
    width: 4.8,
    hierarchy: 'security',
    closed: false,
    points: [
      [0, 28],
      [-28, 4],
      [-64, -12],
      [-94, -40],
      [-114, -78]
    ]
  },
  {
    id: 'cv-run',
    name: 'Document Run',
    width: 4.8,
    hierarchy: 'street',
    closed: false,
    points: [
      [0, 28],
      [16, -8],
      [34, -42],
      [52, -72],
      [78, -96],
      [92, -112]
    ]
  },
  {
    id: 'stunt-causeway',
    name: 'Stunt Causeway',
    width: 5.0,
    hierarchy: 'stunt',
    closed: false,
    points: [
      [78, -96],
      [104, -94],
      [118, -54]
    ]
  },
  {
    id: 'farm-track',
    name: 'Farm Track',
    width: 4.2,
    hierarchy: 'dirt',
    closed: false,
    points: [
      [18, -132],
      [-22, -128],
      [-58, -124],
      [-90, -100],
      [-114, -78]
    ]
  },
  {
    id: 'sentinel-ridge',
    name: 'Sentinel Ridge',
    width: 4.4,
    hierarchy: 'street',
    closed: false,
    points: [
      [-42, 34],
      [-18, 66],
      [12, 94],
      [44, 116],
      [82, 116]
    ]
  },
  {
    id: 'career-link',
    name: 'Career Link',
    width: 4.4,
    hierarchy: 'street',
    closed: false,
    points: [
      [44, 38],
      [68, 8],
      [92, -18],
      [112, -32],
      [118, -54]
    ]
  },
  {
    id: 'harbor-link',
    name: 'Harbor Link',
    width: 4.2,
    hierarchy: 'street',
    closed: false,
    points: [
      [84, 48],
      [112, 58],
      [128, 72]
    ]
  },
  {
    id: 'data-pier',
    name: 'Data Pier',
    width: 3.8,
    hierarchy: 'bridge',
    closed: false,
    points: [
      [-132, 48],
      [-136, 62],
      [-132, 70]
    ]
  },
  {
    id: 'behind-spur',
    name: 'Build Spur',
    width: 4.4,
    hierarchy: 'street',
    closed: false,
    points: [
      [34, -42],
      [10, -76],
      [-4, -104],
      [18, -132]
    ]
  },
  {
    id: 'awards-link',
    name: 'Archive Steps',
    width: 4.0,
    hierarchy: 'plaza',
    closed: false,
    points: [
      [-42, 34],
      [-34, 56],
      [-40, 78]
    ]
  },
  {
    id: 'skills-link',
    name: 'Skills Link',
    width: 4.2,
    hierarchy: 'security',
    closed: false,
    points: [
      [-64, -12],
      [-74, -48],
      [-90, -100],
      [-58, -124]
    ]
  }
];

export const routeThresholds = [
  { id: 'launch-plaza-rollout', center: [4, 30], rotation: 0.22, width: 15.0, depth: 6.2, color: '#7cffb2', bars: 4 },
  { id: 'coastal-loop-north-overlook', center: [20, 136], rotation: 1.5, width: 14.0, depth: 5.8, color: '#ffdf8a', bars: 3 },
  { id: 'coastal-loop-east-harbor', center: [128, 72], rotation: 2.45, width: 14.0, depth: 5.8, color: '#78b7ff', bars: 3 },
  { id: 'coastal-loop-south-cove', center: [86, -108], rotation: 0.75, width: 14.0, depth: 5.8, color: '#ff9b6d', bars: 3 },
  { id: 'coastal-loop-west-return', center: [-132, -18], rotation: -0.28, width: 14.0, depth: 5.8, color: '#79ffc5', bars: 3 },
  { id: 'spine-data-join', center: [-132, 48], rotation: 1.48, width: 13.2, depth: 5.8, color: '#79ffc5', bars: 3 },
  { id: 'spine-harbor-join', center: [112, 58], rotation: -0.9, width: 13.8, depth: 5.8, color: '#78b7ff', bars: 3 },
  { id: 'fcc-arrival-threshold', center: [-58, 72], rotation: -0.08, width: 13.8, depth: 6.2, color: '#9ccfff', bars: 4 },
  { id: 'fcc-courtyard-threshold', center: [-48, 96], rotation: 0.58, width: 13.8, depth: 5.8, color: '#f2dfb2', bars: 3 },
  { id: 'scanner-gate-threshold', center: [-94, -40], rotation: -2.66, width: 14.2, depth: 6.2, color: '#68d8ff', bars: 4 },
  { id: 'security-return-threshold', center: [-114, -78], rotation: -2.36, width: 13.2, depth: 5.8, color: '#68d8ff', bars: 3 },
  { id: 'document-run-threshold', center: [34, -42], rotation: 2.64, width: 13.8, depth: 6.2, color: '#e6f3ff', bars: 4 },
  { id: 'cv-vault-threshold', center: [10, -76], rotation: -2.66, width: 13.6, depth: 6.0, color: '#d8b6ff', bars: 4 },
  { id: 'stunt-yard-threshold', center: [104, -94], rotation: 1.48, width: 14.0, depth: 5.4, color: '#ff9b6d', bars: 5 },
  { id: 'farm-track-threshold', center: [-58, -124], rotation: -1.48, width: 13.8, depth: 6.2, color: '#c79b56', bars: 4 },
  { id: 'behind-build-threshold', center: [8, -76], rotation: -2.66, width: 13.2, depth: 5.8, color: '#a8a6ff', bars: 3 },
  { id: 'sentinel-ridge-threshold', center: [12, 94], rotation: 0.82, width: 13.8, depth: 5.8, color: '#ff6d8d', bars: 4 },
  { id: 'career-office-threshold', center: [92, -18], rotation: -2.42, width: 13.8, depth: 5.8, color: '#b6a0ff', bars: 3 },
  { id: 'harbor-link-threshold', center: [128, 72], rotation: 0.9, width: 13.2, depth: 5.8, color: '#78b7ff', bars: 3 },
  { id: 'data-pier-threshold', center: [-136, 62], rotation: -0.28, width: 12.4, depth: 5.8, color: '#79ffc5', bars: 3 },
  { id: 'archive-steps-threshold', center: [-34, 56], rotation: 0.35, width: 12.4, depth: 5.8, color: '#ffdf8a', bars: 3 },
  { id: 'skills-link-threshold', center: [-74, -48], rotation: -2.86, width: 13.2, depth: 5.8, color: '#92ffea', bars: 3 }
];

export const roadSegments = roadPaths.flatMap((path) => pathToSegments(path));

export const boostPads = [
  { id: 'scanner-boost', position: [-64, 0, -12], rotation: -2.17, color: '#68d8ff', district: 'security' },
  { id: 'document-run-boost', position: [16, 0, -8], rotation: 2.68, color: '#7cffb2', district: 'cv' },
  { id: 'stunt-yard-boost', position: [78, 0, -96], rotation: Math.PI / 2, color: '#ff9b6d', district: 'stunt' }
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
    radius: 14,
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
    position: [62, 0, 58],
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
    position: [-82, 0, 82],
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
    position: [104, 0, 86],
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
    position: [82, 0, -70],
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
    position: [-112, 0, 58],
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
      'Stylized potato counter beside the farm track.',
      'Press P nearby, or use the summon button, to grow one temporary potato and increment the counter.'
    ],
    potatoFarm: true
  }
];

export const zonePresentation = {
  landing: {
    respawn: { position: [4, 1.08, 30], heading: 0.22 },
    camera: [16, 8, 58],
    target: [1, 1.7, 42],
    fov: 42
  },
  security: {
    respawn: { position: [-105, 1.08, -64], heading: SECURITY_SCAN_ROTATION },
    camera: [-84, 10, -48],
    target: [-107, 3, -65],
    fov: 43
  },
  projects: {
    respawn: { position: [44, 1.08, 38], heading: 0.71 },
    camera: [43, 9, 45],
    target: [62, 2.5, 58],
    fov: 42
  },
  sentinel: {
    respawn: { position: [12, 1.08, 94], heading: 0.91 },
    camera: [-8, 10, 100],
    target: [17, 4.5, 113],
    fov: 42
  },
  career: {
    respawn: { position: [92, 1.08, -18], heading: -2.42 },
    camera: [116, 9, -16],
    target: [99, 3, -42],
    fov: 43
  },
  skills: {
    respawn: { position: [-90, 1.08, -100], heading: 2.17 },
    camera: [-86, 9, -66],
    target: [-62, 3.2, -84],
    fov: 40
  },
  education: {
    respawn: { position: [-58, 1.08, 72], heading: -0.79 },
    camera: [-50, 13, 58],
    target: [-82, 5.2, 82],
    fov: 43
  },
  awards: {
    respawn: { position: [-34, 1.08, 56], heading: -0.66 },
    camera: [-28, 8, 58],
    target: [-44, 3, 73],
    fov: 41
  },
  cv: {
    respawn: { position: [34, 1.08, -42], heading: -2.2 },
    camera: [28, 8, -42],
    target: [6, 3, -57],
    fov: 41
  },
  todo: {
    respawn: { position: [-90, 1.08, 44], heading: 3.14 },
    camera: [-65, 9, 2],
    target: [-83, 3, 15],
    fov: 40
  },
  circuit: {
    respawn: { position: [44, 1.08, 116], heading: 2.3 },
    camera: [84, 10, 82],
    target: [58, 3.4, 102],
    fov: 39
  },
  contact: {
    respawn: { position: [128, 1.08, 72], heading: 2.13 },
    camera: [126, 10, 96],
    target: [104, 3.6, 86],
    fov: 40
  },
  behind: {
    respawn: { position: [8, 1.08, -76], heading: -2.18 },
    camera: [6, 8, -76],
    target: [-17, 3, -96],
    fov: 40
  },
  drift: {
    respawn: { position: [104, 1.08, -94], heading: 0.9 },
    camera: [66, 8, -92],
    target: [82, 3, -70],
    fov: 42
  },
  'data-pier': {
    respawn: { position: [-132, 1.08, 48], heading: -0.32 },
    camera: [-98, 8, 42],
    target: [-112, 2.4, 58],
    fov: 42
  },
  potato: {
    respawn: { position: [-58, 1.08, -124], heading: -1.72 },
    camera: [-72, 10, -104],
    target: [-50, 3.2, -132],
    fov: 40
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
  [44, 0, 116],
  [12, 0, 94],
  [-34, 0, 56],
  [-58, 0, 72],
  [-132, 0, 48],
  [-114, 0, -78],
  [-58, 0, -124],
  [18, 0, -132],
  [78, 0, -96],
  [118, 0, -54],
  [128, 0, 72],
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
