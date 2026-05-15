import { canalSegments, districtFootprints, ISLAND_RADIUS, MAP_PADDING, roadPaths, WORLD_HALF_SIZE, worldZones } from '../world/worldData.js';

export class UI {
  constructor({ game, achievements, audio }) {
    this.game = game;
    this.achievements = achievements;
    this.audio = audio;
    this.projectIndex = 0;
    this.activeTab = 'options';
    this.mapState = { scale: 1, x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 };
    this.refs = {
      loading: document.getElementById('loading'),
      titleScreen: document.getElementById('title-screen'),
      startButton: document.getElementById('start-button'),
      zoneReadout: document.getElementById('zone-readout'),
      speedReadout: document.getElementById('speed-readout'),
      prompt: document.getElementById('interaction-prompt'),
      promptKind: document.getElementById('prompt-kind'),
      promptTitle: document.getElementById('prompt-title'),
      promptAction: document.getElementById('prompt-action'),
      panel: document.getElementById('panel'),
      panelKind: document.getElementById('panel-kind'),
      panelTitle: document.getElementById('panel-title'),
      panelBody: document.getElementById('panel-body'),
      panelActions: document.getElementById('panel-actions'),
      panelClose: document.getElementById('panel-close'),
      menu: document.getElementById('menu'),
      menuButton: document.getElementById('menu-button'),
      menuClose: document.getElementById('menu-close'),
      menuContent: document.getElementById('menu-content'),
      mapModal: document.getElementById('map-modal'),
      mapButton: document.getElementById('map-button'),
      mapClose: document.getElementById('map-close'),
      worldMap: document.getElementById('world-map'),
      worldMapLayer: document.getElementById('world-map-layer'),
      mapZoomIn: document.getElementById('map-zoom-in'),
      mapZoomOut: document.getElementById('map-zoom-out'),
      mapReset: document.getElementById('map-reset'),
      mapStatus: document.getElementById('map-status'),
      minimap: document.getElementById('minimap'),
      minimapWorld: document.getElementById('minimap-world'),
      notifications: document.getElementById('notifications'),
      soundButton: document.getElementById('sound-button')
    };
    this.setup();
  }

  setup() {
    this.refs.startButton.addEventListener('click', () => this.game.startDriving());
    this.refs.panelClose.addEventListener('click', () => this.closePanel());
    this.refs.menuButton.addEventListener('click', () => this.toggleMenu());
    this.refs.menuClose.addEventListener('click', () => this.closeMenu());
    this.refs.mapButton.addEventListener('click', () => this.toggleMap());
    this.refs.mapClose.addEventListener('click', () => this.closeMap());
    this.refs.mapZoomIn.addEventListener('click', () => this.zoomMap(0.22));
    this.refs.mapZoomOut.addEventListener('click', () => this.zoomMap(-0.22));
    this.refs.mapReset.addEventListener('click', () => this.resetMapView());
    this.setupMapDrag();
    this.refs.soundButton.addEventListener('click', () => {
      this.audio.resume();
      const muted = this.audio.toggleMute();
      this.refs.soundButton.textContent = muted ? 'Muted' : 'Sound';
      this.notify(muted ? 'Sound muted' : 'Sound enabled');
    });

    document.querySelectorAll('.menu-tabs button').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTab = button.dataset.tab;
        this.renderMenu();
      });
    });

    this.achievements.onUnlock = (achievement) => {
      this.notify(`Achievement unlocked: ${achievement.title}`);
    };

    this.renderMap();
    this.renderMinimap();
    this.renderMenu();
  }

  markLoaded() {
    this.refs.loading.classList.add('is-hidden');
  }

  hideTitle() {
    this.refs.titleScreen.hidden = true;
    document.body.classList.add('is-driving');
  }

  showPrompt(zone) {
    if (!zone || this.isPanelOpen()) {
      this.refs.prompt.hidden = true;
      return;
    }
    this.refs.promptKind.textContent = zone.kind;
    this.refs.promptTitle.textContent = zone.name;
    if (zone.potatoFarm) {
      this.refs.promptAction.textContent = 'Press P to summon. Press E for farm log';
    } else {
      this.refs.promptAction.textContent = zone.startsCircuit ? 'Press E to start circuit' : 'Press E to interact';
    }
    this.refs.prompt.hidden = false;
  }

  hidePrompt() {
    this.refs.prompt.hidden = true;
  }

  openZone(zone) {
    this.audio.click();
    this.achievements.visitZone(zone);
    this.game.recordZoneVisit(zone);
    if (zone.startsCircuit) {
      this.game.startCircuit();
    }
    if (zone.projectGallery) {
      this.openProjectGallery(zone);
      return;
    }

    const lines = this.game.getZoneLines(zone);
    this.refs.panelKind.textContent = zone.kind;
    this.refs.panelTitle.textContent = zone.name;
    clear(this.refs.panelBody);
    clear(this.refs.panelActions);
    for (const line of lines) {
      const p = document.createElement('p');
      p.textContent = line;
      this.refs.panelBody.append(p);
    }
    if (zone.potatoFarm) {
      const counter = document.createElement('p');
      counter.className = 'panel-muted';
      counter.textContent = `Farm counter: ${this.game.analytics?.potatoCountLabel || '--'}`;
      this.refs.panelBody.append(counter);
      const summon = button('Summon Potato', () => this.game.summonPotato());
      this.refs.panelActions.append(summon);
    }
    if (zone.id === 'data-pier') {
      const status = document.createElement('p');
      status.className = 'panel-muted';
      status.textContent = this.game.analytics?.isEnabled
        ? 'Signal collection is active.'
        : 'Signal collection is offline.';
      this.refs.panelBody.append(status);
    }
    this.addActions(zone.actions || []);
    this.refs.panel.hidden = false;
    this.game.focusZone(zone);
  }

  openProjectGallery(zone) {
    this.refs.panelKind.textContent = zone.kind;
    this.refs.panelTitle.textContent = zone.name;
    clear(this.refs.panelBody);
    clear(this.refs.panelActions);

    const projects = this.game.resumeData.projects || [];
    const current = projects[this.projectIndex % projects.length] || 'Project data unavailable.';
    const index = document.createElement('span');
    index.className = 'project-counter';
    index.textContent = `${this.projectIndex + 1} / ${projects.length}`;
    const title = document.createElement('h3');
    const [name, description = ''] = current.split(': ');
    title.textContent = name;
    const body = document.createElement('p');
    body.textContent = description || current;
    const hint = document.createElement('p');
    hint.className = 'panel-muted';
    hint.textContent = 'Use Previous and Next to browse the project record from the resume data.';
    this.refs.panelBody.append(index, title, body, hint);

    const previous = button('Previous', () => {
      this.projectIndex = (this.projectIndex - 1 + projects.length) % projects.length;
      this.openProjectGallery(zone);
    });
    const next = button('Next', () => {
      this.projectIndex = (this.projectIndex + 1) % projects.length;
      this.openProjectGallery(zone);
    });
    this.refs.panelActions.append(previous, next);
    this.addActions(zone.actions || []);
    this.refs.panel.hidden = false;
    this.game.focusZone(zone);
  }

  addActions(actions) {
    for (const action of actions) {
      const link = document.createElement('a');
      link.href = action.href;
      link.textContent = action.label;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      this.refs.panelActions.append(link);
    }
  }

  closePanel() {
    this.refs.panel.hidden = true;
    this.game.clearFocus();
  }

  isPanelOpen() {
    return !this.refs.panel.hidden || !this.refs.menu.hidden || !this.refs.mapModal.hidden;
  }

  toggleMenu() {
    if (this.refs.menu.hidden) this.openMenu();
    else this.closeMenu();
  }

  openMenu() {
    this.audio.click();
    this.refs.menu.hidden = false;
    this.renderMenu();
  }

  closeMenu() {
    this.refs.menu.hidden = true;
  }

  toggleMap() {
    if (this.refs.mapModal.hidden) this.openMap();
    else this.closeMap();
  }

  openMap() {
    this.audio.click(620);
    this.refs.mapModal.hidden = false;
    this.renderMap();
  }

  closeMap() {
    this.refs.mapModal.hidden = true;
  }

  setupMapDrag() {
    const map = this.refs.worldMap;
    map.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.map-pin')) return;
      this.mapState.dragging = true;
      this.mapState.lastX = event.clientX;
      this.mapState.lastY = event.clientY;
      map.setPointerCapture(event.pointerId);
    });
    map.addEventListener('pointermove', (event) => {
      if (!this.mapState.dragging) return;
      const dx = event.clientX - this.mapState.lastX;
      const dy = event.clientY - this.mapState.lastY;
      this.mapState.lastX = event.clientX;
      this.mapState.lastY = event.clientY;
      this.mapState.x += dx;
      this.mapState.y += dy;
      this.applyMapTransform();
    });
    const end = (event) => {
      this.mapState.dragging = false;
      if (map.hasPointerCapture(event.pointerId)) map.releasePointerCapture(event.pointerId);
    };
    map.addEventListener('pointerup', end);
    map.addEventListener('pointercancel', end);
    map.addEventListener('wheel', (event) => {
      event.preventDefault();
      this.zoomMap(event.deltaY > 0 ? -0.12 : 0.12);
    }, { passive: false });
  }

  zoomMap(delta) {
    this.mapState.scale = Math.max(0.8, Math.min(2.4, this.mapState.scale + delta));
    this.applyMapTransform();
  }

  resetMapView() {
    this.mapState = { scale: 1, x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 };
    this.applyMapTransform();
  }

  applyMapTransform() {
    this.refs.worldMapLayer.style.transform = `translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`;
    this.refs.mapStatus.textContent = `Zoom ${Math.round(this.mapState.scale * 100)}%`;
  }

  renderMenu() {
    document.querySelectorAll('.menu-tabs button').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.tab === this.activeTab);
    });
    clear(this.refs.menuContent);
    if (this.activeTab === 'options') {
      this.renderOptions();
    } else if (this.activeTab === 'controls') {
      this.renderControls();
    } else if (this.activeTab === 'achievements') {
      this.renderAchievements();
    } else {
      this.renderAbout();
    }
  }

  renderOptions() {
    const wrap = document.createElement('div');
    wrap.className = 'menu-grid';
    wrap.append(
      optionButton('Respawn', 'Move the car back to the Start Hub.', () => {
        this.game.respawn();
        this.closeMenu();
      }),
      optionButton('Reset Props', 'Put loose objects back near their starting positions.', () => {
        this.game.resetWorld();
        this.notify('World props reset');
      }),
      optionButton('Sound', this.audio.muted ? 'Currently muted.' : 'Currently enabled.', () => {
        const muted = this.audio.toggleMute();
        this.refs.soundButton.textContent = muted ? 'Muted' : 'Sound';
        this.renderMenu();
      }),
      optionButton('Landscape Quality', `Currently ${capitalize(this.game.world.landscapeQuality)}. Controls sakura petals and grass density.`, () => {
        const quality = this.game.world.cycleLandscapeQuality();
        this.renderMenu();
        this.notify(`Landscape quality: ${capitalize(quality)}`);
      }),
      optionButton('Reset Achievements', 'Clear local achievement progress for this browser.', () => {
        this.achievements.reset();
        this.renderMenu();
        this.notify('Achievements reset');
      })
    );
    this.refs.menuContent.append(wrap);
  }

  renderControls() {
    const rows = [
      ['WASD / Arrows', 'Drive'],
      ['Shift', 'Boost'],
      ['Ctrl / B', 'Brake'],
      ['Space', 'Jump'],
      ['E / Enter', 'Interact'],
      ['P', 'Summon potato at the farm'],
      ['M', 'Map'],
      ['R', 'Respawn'],
      ['Mouse drag', 'Move camera'],
      ['Gamepad', 'Left stick, A interact, B boost, Y jump']
    ];
    const grid = document.createElement('div');
    grid.className = 'control-grid';
    for (const [key, action] of rows) {
      const k = document.createElement('span');
      k.textContent = key;
      const a = document.createElement('strong');
      a.textContent = action;
      grid.append(k, a);
    }
    this.refs.menuContent.append(grid);
  }

  renderAchievements() {
    const progress = this.achievements.getProgress();
    const summary = document.createElement('p');
    summary.className = 'panel-muted';
    summary.textContent = `${progress.unlocked}/${progress.total} unlocked. Distance driven: ${Math.round(progress.distance)} m.`;
    const list = document.createElement('div');
    list.className = 'achievement-list';
    for (const achievement of this.achievements.definitions) {
      const item = document.createElement('div');
      item.className = 'achievement';
      item.classList.toggle('is-unlocked', this.achievements.unlocked.has(achievement.id));
      const title = document.createElement('strong');
      title.textContent = achievement.title;
      const desc = document.createElement('span');
      desc.textContent = achievement.description;
      item.append(title, desc);
      list.append(item);
    }
    this.refs.menuContent.append(summary, list);
  }

  renderAbout() {
    const lines = [
      'Three.js renders the island drive-world. Rapier handles the driving physics.',
      'Resume content, project stops, contact links, and counters are connected directly to the portfolio.'
    ];
    for (const line of lines) {
      const p = document.createElement('p');
      p.textContent = line;
      this.refs.menuContent.append(p);
    }
  }

  renderMap() {
    clear(this.refs.worldMapLayer);
    this.renderMapBase(this.refs.worldMapLayer, 'map');
    for (const zone of worldZones) {
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'map-pin';
      const coords = worldToMap(zone.position[0], zone.position[2]);
      pin.style.left = `${coords.x}%`;
      pin.style.top = `${coords.y}%`;
      pin.style.setProperty('--pin-color', zone.color);
      pin.textContent = zone.name;
      pin.title = `${zone.name} - ${zone.kind}`;
      pin.addEventListener('click', () => {
        this.game.respawn(zone.id);
        this.closeMap();
      });
      this.refs.worldMapLayer.append(pin);
    }
    this.mapPlayer = document.createElement('span');
    this.mapPlayer.className = 'map-player';
    this.refs.worldMapLayer.append(this.mapPlayer);
    this.applyMapTransform();
  }

  renderMinimap() {
    clear(this.refs.minimapWorld);
    this.renderMapBase(this.refs.minimapWorld, 'minimap');
    for (const zone of worldZones) {
      const pin = document.createElement('span');
      pin.className = 'minimap-pin';
      const coords = worldToMap(zone.position[0], zone.position[2]);
      pin.style.left = `${coords.x}%`;
      pin.style.top = `${coords.y}%`;
      pin.style.setProperty('--pin-color', zone.color);
      this.refs.minimapWorld.append(pin);
    }
    this.minimapPlayer = document.createElement('span');
    this.minimapPlayer.className = 'minimap-player';
    this.refs.minimapWorld.append(this.minimapPlayer);
  }

  renderMapBase(container, mode) {
    const island = document.createElement('div');
    island.className = `${mode}-island`;
    const span = WORLD_HALF_SIZE * 2 + MAP_PADDING * 2;
    island.style.inset = `${((WORLD_HALF_SIZE + MAP_PADDING - ISLAND_RADIUS) / span) * 100}%`;
    container.append(island);
    for (const district of districtFootprints) {
      const patch = document.createElement('span');
      patch.className = `${mode}-district`;
      const coords = worldToMap(district.center[0], district.center[1]);
      patch.style.left = `${coords.x}%`;
      patch.style.top = `${coords.y}%`;
      patch.style.width = `${(district.size[0] / (WORLD_HALF_SIZE * 2 + MAP_PADDING * 2)) * 100}%`;
      patch.style.height = `${(district.size[1] / (WORLD_HALF_SIZE * 2 + MAP_PADDING * 2)) * 100}%`;
      patch.style.setProperty('--district-color', district.color);
      container.append(patch);
    }
    for (const canal of canalSegments) {
      for (const [x, z, width, depth, rotation = 0] of pathToSegments(canal.points, false, canal.width)) {
        const segment = document.createElement('span');
        segment.className = `${mode}-canal`;
        const coords = worldToMap(x, z);
        segment.style.left = `${coords.x}%`;
        segment.style.top = `${coords.y}%`;
        segment.style.width = `${(width / (WORLD_HALF_SIZE * 2 + MAP_PADDING * 2)) * 100}%`;
        segment.style.height = `${(depth / (WORLD_HALF_SIZE * 2 + MAP_PADDING * 2)) * 100}%`;
        segment.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`;
        container.append(segment);
      }
    }
    container.append(createRoadSvg(mode));
  }

  update({ speed, activeZone, circuit }) {
    this.refs.speedReadout.textContent = `${Math.round(Math.abs(speed) * 3.6)} km/h`;
    this.refs.zoneReadout.textContent = activeZone ? activeZone.name : 'Road';
    this.refs.soundButton.textContent = this.audio.muted ? 'Muted' : 'Sound';
    this.showPrompt(activeZone);
    if (circuit?.active) {
      this.refs.zoneReadout.textContent = `Circuit ${circuit.checkpoint}/${this.game.world.checkpoints.length - 1}`;
    }
    this.updateMapMarkers(activeZone);
  }

  updateMapMarkers(activeZone) {
    const position = this.game.vehicle.position;
    const coords = worldToMap(position.x, position.z);
    const rotation = this.game.vehicle.heading || 0;
    if (this.mapPlayer) {
      this.mapPlayer.style.left = `${coords.x}%`;
      this.mapPlayer.style.top = `${coords.y}%`;
      this.mapPlayer.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`;
    }
    if (this.minimapPlayer) {
      this.minimapPlayer.style.left = `${coords.x}%`;
      this.minimapPlayer.style.top = `${coords.y}%`;
      this.minimapPlayer.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`;
    }
    document.querySelectorAll('.map-pin').forEach((pin) => {
      pin.classList.toggle('is-active', activeZone && pin.textContent === activeZone.name);
    });
  }

  notify(message) {
    const item = document.createElement('div');
    item.className = 'notification';
    item.textContent = message;
    this.refs.notifications.append(item);
    setTimeout(() => item.classList.add('is-visible'), 20);
    setTimeout(() => {
      item.classList.remove('is-visible');
      setTimeout(() => item.remove(), 260);
    }, 3600);
  }

  setPotatoCount(count) {
    this.game.world?.setPotatoCount?.(count);
  }
}

function worldToMap(x, z) {
  const span = WORLD_HALF_SIZE * 2 + MAP_PADDING * 2;
  return {
    x: ((x + WORLD_HALF_SIZE + MAP_PADDING) / span) * 100,
    y: ((z + WORLD_HALF_SIZE + MAP_PADDING) / span) * 100
  };
}

function createRoadSvg(mode) {
  const span = WORLD_HALF_SIZE * 2 + MAP_PADDING * 2;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `${mode}-roads-svg`);
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('aria-hidden', 'true');
  for (const path of roadPaths) {
    const points = path.closed ? [...path.points, path.points[0]] : path.points;
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('class', `${mode}-road-line ${mode}-road-${path.hierarchy}`);
    polyline.setAttribute('points', points.map(([x, z]) => {
      const coords = worldToMap(x, z);
      return `${coords.x.toFixed(2)},${coords.y.toFixed(2)}`;
    }).join(' '));
    polyline.setAttribute('stroke-width', `${((path.width + 3.4) / span) * 100}`);
    svg.append(polyline);
  }
  return svg;
}

function pathToSegments(points, closed, width) {
  const segments = [];
  const limit = closed ? points.length : points.length - 1;
  for (let i = 0; i < limit; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz);
    segments.push([
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
      width,
      length + width * 0.64,
      Math.atan2(dx, dz)
    ]);
  }
  return segments;
}

function clear(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

function button(label, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.textContent = label;
  element.addEventListener('click', onClick);
  return element;
}

function optionButton(title, description, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = 'option-tile';
  const strong = document.createElement('strong');
  strong.textContent = title;
  const span = document.createElement('span');
  span.textContent = description;
  element.append(strong, span);
  element.addEventListener('click', onClick);
  return element;
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
