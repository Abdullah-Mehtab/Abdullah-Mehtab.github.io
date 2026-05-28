// ABOUTME: Sends Portfolio Drive visitor events to the shared visitor-proof endpoint.
// ABOUTME: Reads public Supabase configuration from the root site config.

const STORAGE_VISITOR_ID = 'portfolio-drive-visitor-id';
const SESSION_ID = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export class Analytics {
  constructor() {
    this.isEnabled = Boolean(getVisitorProofEndpoint() && getSupabaseAnonKey());
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
    const endpoint = getVisitorProofEndpoint();
    const anonKey = getSupabaseAnonKey();
    if (!endpoint || !anonKey) return null;

    try {
      const url = new URL(endpoint);
      url.searchParams.set('page_slug', 'play');
      url.searchParams.set('event_type', 'potato_summon_count');
      const response = await fetch(url, {
        headers: {
          apikey: anonKey,
          authorization: `Bearer ${anonKey}`
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
    const endpoint = getVisitorProofEndpoint();
    const anonKey = getSupabaseAnonKey();
    if (!endpoint || !anonKey) return null;

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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: anonKey,
          authorization: `Bearer ${anonKey}`
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

function getPortfolioConfig() {
  return globalThis.PORTFOLIO_CONFIG || {};
}

function getVisitorProofEndpoint() {
  const config = getPortfolioConfig();
  return config.visitorProofEndpoint
    || (config.supabaseUrl ? `${config.supabaseUrl.replace(/\/$/, '')}/functions/v1/visitor-proof` : '');
}

function getSupabaseAnonKey() {
  return getPortfolioConfig().supabaseAnonKey || '';
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
