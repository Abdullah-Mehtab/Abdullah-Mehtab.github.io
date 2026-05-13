import { worldZones } from '../world/worldData.js';

export class UI {
  constructor({ game, achievements, audio }) {
    this.game = game;
    this.achievements = achievements;
    this.audio = audio;
    this.projectIndex = 0;
    this.activeTab = 'options';
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
    this.refs.promptAction.textContent = zone.startsCircuit ? 'Press E to start circuit' : 'Press E to interact';
    this.refs.prompt.hidden = false;
  }

  hidePrompt() {
    this.refs.prompt.hidden = true;
  }

  openZone(zone) {
    this.audio.click();
    this.achievements.visitZone(zone);
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
      if (/^https?:\/\//.test(action.href)) {
        link.target = '_blank';
        link.rel = 'noreferrer';
      }
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
      'This is a static GitHub Pages game page built as a modular Three.js portfolio world.',
      'Rapier handles rigid-body physics, the car is procedural, the world is Abdullah-specific, and resume content comes from local JSON.',
      'The goal is a proper interactive portfolio space: driveable, inspectable, personal, and still connected to the formal CV and project pages.'
    ];
    for (const line of lines) {
      const p = document.createElement('p');
      p.textContent = line;
      this.refs.menuContent.append(p);
    }
  }

  renderMap() {
    clear(this.refs.worldMap);
    for (const zone of worldZones) {
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'map-pin';
      pin.style.left = `${((zone.position[0] + 88) / 176) * 100}%`;
      pin.style.top = `${((zone.position[2] + 88) / 176) * 100}%`;
      pin.style.setProperty('--pin-color', zone.color);
      pin.textContent = zone.name;
      pin.addEventListener('click', () => {
        this.game.respawn(zone.id);
        this.closeMap();
      });
      this.refs.worldMap.append(pin);
    }
  }

  update({ speed, activeZone, circuit }) {
    this.refs.speedReadout.textContent = `${Math.round(Math.abs(speed) * 3.6)} km/h`;
    this.refs.zoneReadout.textContent = activeZone ? activeZone.name : 'Road';
    this.refs.soundButton.textContent = this.audio.muted ? 'Muted' : 'Sound';
    this.showPrompt(activeZone);
    if (circuit?.active) {
      this.refs.zoneReadout.textContent = `Circuit ${circuit.checkpoint}/${this.game.world.checkpoints.length - 1}`;
    }
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
