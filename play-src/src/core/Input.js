const KEY_BINDINGS = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  ControlLeft: 'boost',
  ShiftLeft: 'handbrake',
  ShiftRight: 'handbrake',
  ControlRight: 'brake',
  KeyB: 'brake',
  Space: 'jump',
  KeyE: 'interact',
  Enter: 'interact',
  KeyR: 'respawn',
  KeyM: 'map',
  Escape: 'menu',
  KeyH: 'honk',
  KeyP: 'potato'
};

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.actions = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      boost: false,
      handbrake: false,
      brake: false,
      jump: false,
      interact: false,
      respawn: false,
      map: false,
      menu: false,
      honk: false,
      potato: false
    };
    this.pressed = new Set();
    this.pointer = {
      dragging: false,
      lastX: 0,
      lastY: 0,
      orbitX: 0,
      orbitY: 0,
      zoom: 1
    };
    this.joystick = { x: 0, y: 0 };
    this.mode = 'keyboard';
    this.enabled = true;
    this.setupKeyboard();
    this.setupPointer();
    this.setupTouch();
  }

  setupKeyboard() {
    window.addEventListener('keydown', (event) => {
      const action = KEY_BINDINGS[event.code];
      if (!action) return;
      event.preventDefault();
      event.stopPropagation();
      if (!this.actions[action]) {
        this.pressed.add(action);
      }
      this.actions[action] = true;
      this.mode = 'keyboard';
    });

    window.addEventListener('keyup', (event) => {
      const action = KEY_BINDINGS[event.code];
      if (!action) return;
      event.preventDefault();
      event.stopPropagation();
      this.actions[action] = false;
    });
  }

  setupPointer() {
    this.canvas.addEventListener('pointerdown', (event) => {
      this.pointer.dragging = true;
      this.pointer.lastX = event.clientX;
      this.pointer.lastY = event.clientY;
      this.canvas.setPointerCapture(event.pointerId);
    });

    this.canvas.addEventListener('pointermove', (event) => {
      if (!this.pointer.dragging) return;
      const dx = event.clientX - this.pointer.lastX;
      const dy = event.clientY - this.pointer.lastY;
      this.pointer.lastX = event.clientX;
      this.pointer.lastY = event.clientY;
      this.pointer.orbitX += dx * 0.006;
      this.pointer.orbitY = Math.max(-0.52, Math.min(0.42, this.pointer.orbitY + dy * 0.004));
      this.mode = event.pointerType === 'touch' ? 'touch' : 'pointer';
    });

    const endDrag = (event) => {
      this.pointer.dragging = false;
      if (this.canvas.hasPointerCapture(event.pointerId)) {
        this.canvas.releasePointerCapture(event.pointerId);
      }
    };
    this.canvas.addEventListener('pointerup', endDrag);
    this.canvas.addEventListener('pointercancel', endDrag);

    window.addEventListener('wheel', (event) => {
      this.pointer.zoom = Math.max(0.7, Math.min(1.55, this.pointer.zoom + Math.sign(event.deltaY) * 0.08));
    }, { passive: true });
  }

  setupTouch() {
    const stick = document.getElementById('touch-stick');
    const knob = document.getElementById('touch-knob');
    const boost = document.getElementById('touch-boost');
    const jump = document.getElementById('touch-jump');
    const action = document.getElementById('touch-action');
    if (!stick || !knob || !boost || !jump || !action) return;

    let pointerId = null;
    let origin = { x: 0, y: 0 };

    const updateStick = (clientX, clientY) => {
      const dx = clientX - origin.x;
      const dy = clientY - origin.y;
      const max = 54;
      const length = Math.max(1, Math.hypot(dx, dy));
      const scale = Math.min(1, max / length);
      const x = dx * scale;
      const y = dy * scale;
      this.joystick.x = x / max;
      this.joystick.y = y / max;
      knob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      this.mode = 'touch';
    };

    stick.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      pointerId = event.pointerId;
      stick.setPointerCapture(pointerId);
      const rect = stick.getBoundingClientRect();
      origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      updateStick(event.clientX, event.clientY);
    });

    stick.addEventListener('pointermove', (event) => {
      if (event.pointerId !== pointerId) return;
      event.preventDefault();
      updateStick(event.clientX, event.clientY);
    });

    const resetStick = (event) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      this.joystick.x = 0;
      this.joystick.y = 0;
      knob.style.transform = 'translate(-50%, -50%)';
    };
    stick.addEventListener('pointerup', resetStick);
    stick.addEventListener('pointercancel', resetStick);

    const holdAction = (element, name) => {
      element.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        this.actions[name] = true;
        this.pressed.add(name);
        this.mode = 'touch';
      });
      const end = () => {
        this.actions[name] = false;
      };
      element.addEventListener('pointerup', end);
      element.addEventListener('pointercancel', end);
      element.addEventListener('pointerleave', end);
    };

    holdAction(boost, 'boost');
    holdAction(jump, 'jump');
    action.addEventListener('click', () => {
      this.pressed.add('interact');
      this.actions.interact = true;
      requestAnimationFrame(() => {
        this.actions.interact = false;
      });
    });
  }

  updateGamepad() {
    const pad = navigator.getGamepads?.()[0];
    if (!pad) return;

    const lx = Math.abs(pad.axes[0]) > 0.15 ? pad.axes[0] : 0;
    const ly = Math.abs(pad.axes[1]) > 0.15 ? pad.axes[1] : 0;
    this.joystick.x = lx;
    this.joystick.y = ly;

    this.actions.forward = ly < -0.25 || pad.buttons[7]?.pressed;
    this.actions.backward = ly > 0.25 || pad.buttons[6]?.pressed;
    this.actions.left = lx < -0.25;
    this.actions.right = lx > 0.25;
    this.actions.boost = Boolean(pad.buttons[1]?.pressed);
    this.actions.handbrake = Boolean(pad.buttons[5]?.pressed);
    this.actions.jump = Boolean(pad.buttons[3]?.pressed);
    this.actions.brake = Boolean(pad.buttons[2]?.pressed);

    if (pad.buttons[0]?.pressed) this.pressed.add('interact');
    if (pad.buttons[9]?.pressed) this.pressed.add('menu');
    if (pad.buttons[8]?.pressed) this.pressed.add('respawn');
    if (pad.buttons[4]?.pressed) this.pressed.add('potato');
    this.mode = 'gamepad';
  }

  update() {
    this.updateGamepad();
  }

  consume(name) {
    const has = this.pressed.has(name);
    this.pressed.delete(name);
    return has;
  }

  clearTransient() {
    this.pressed.clear();
  }
}
