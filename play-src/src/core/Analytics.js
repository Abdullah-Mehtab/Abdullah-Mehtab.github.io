const VISITOR_PROOF_ENDPOINT = 'https://zvuklviflletxyhniwdm.supabase.co/functions/v1/visitor-proof';
const SUPABASE_ANON_KEY = 'sb_publishable_almN_FPps-MxiLAF0Uypmw_jaCZ6VrI';
const STORAGE_VISITOR_ID = 'portfolio-drive-visitor-id';
const SESSION_ID = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export class Analytics {
  constructor() {
    this.isEnabled = Boolean(VISITOR_PROOF_ENDPOINT && SUPABASE_ANON_KEY);
    this.visitorId = getOrCreateVisitorId();
    this.fingerprintHash = '';
    this.potatoCount = null;
    this.zoneVisits = new Set();
  }

  get potatoCountLabel() {
    return Number.isFinite(this.potatoCount) ? String(this.potatoCount) : '--';
  }

  async init() {
    if (!this.isEnabled) return;
    this.fingerprintHash = await fingerprint();
    this.record('page_view', { sourceToken: 'drive_world' });
    const count = await this.fetchPotatoCount();
    if (Number.isFinite(count)) this.potatoCount = count;
  }

  recordZone(zoneId) {
    if (!zoneId || this.zoneVisits.has(zoneId)) return;
    this.zoneVisits.add(zoneId);
    this.record('play_zone_visit', { sourceToken: zoneId });
  }

  async recordPotatoSummon() {
    const response = await this.record('potato_summon', { sourceToken: 'potato_farm', wantsCount: true });
    if (Number.isFinite(response?.potato_count)) {
      this.potatoCount = response.potato_count;
    } else if (Number.isFinite(this.potatoCount)) {
      this.potatoCount += 1;
    }
    return this.potatoCount;
  }

  async fetchPotatoCount() {
    if (!this.isEnabled) return null;
    try {
      const url = new URL(VISITOR_PROOF_ENDPOINT);
      url.searchParams.set('page_slug', 'play');
      url.searchParams.set('event_type', 'potato_summon_count');
      const response = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!response.ok) return null;
      const data = await response.json();
      return Number(data.potato_count);
    } catch {
      return null;
    }
  }

  async record(eventType, options = {}) {
    if (!this.isEnabled) return null;
    try {
      const payload = {
        page_slug: 'play',
        event_type: eventType,
        theme: 'drive_world',
        cursor: 'vehicle',
        motion: 'full',
        referrer: document.referrer || '',
        source_token: options.sourceToken || '',
        visitor_id: this.visitorId,
        session_id: SESSION_ID,
        fingerprint_hash: this.fingerprintHash,
        fingerprint_version: 'play-v1',
        screen_size: `${screen.width}x${screen.height}x${window.devicePixelRatio || 1}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        language: navigator.language || '',
        platform: navigator.platform || ''
      };
      const response = await fetch(VISITOR_PROOF_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(payload),
        keepalive: eventType === 'page_view'
      });
      if (!response.ok) return null;
      return response.json().catch(() => null);
    } catch {
      return null;
    }
  }
}

function getOrCreateVisitorId() {
  try {
    const existing = localStorage.getItem(STORAGE_VISITOR_ID);
    if (existing) return existing;
    const value = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(STORAGE_VISITOR_ID, value);
    return value;
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

async function fingerprint() {
  const raw = [
    navigator.userAgent || '',
    navigator.language || '',
    navigator.platform || '',
    screen.width,
    screen.height,
    screen.colorDepth,
    window.devicePixelRatio || 1,
    Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  ].join('|');
  if (!crypto.subtle) return '';
  const bytes = new TextEncoder().encode(raw);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
