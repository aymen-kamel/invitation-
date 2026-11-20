// Farha invitation engine: theme → opening → sections → behaviours.
import { TEMPLATES, fontsHref } from '../templates/registry.js';
import { SAMPLES } from '../demo/samples.js';
import { LANGS, makeT } from './i18n.js';
import { SECTIONS, DEFAULT_SECTIONS, calPayload, esc, isCouple } from './sections.js';
import { OPENINGS } from './openings.js';
import { createMusic } from './music.js';
import { buildICS, downloadICS, googleCalUrl } from './calendar.js';
import { icon, patternFill } from './ornaments.js';
import { photoOpening, assetBase } from './photo.js';
import { particles } from './particles.js';
import { SITE } from './site.js';

const qs = new URLSearchParams(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || qs.has('nomotion');

async function loadData(tpl) {
  const src = qs.get('data');
  // Orders are JSON files served from this site (relative paths only).
  if (src && /^[\w\-/]+\.json$/.test(src)) {
    const r = await fetch(`${SITE}${src.replace(/^\/+/, '')}`);
    if (r.ok) return { data: await r.json(), demo: false };
  }
  const key = qs.get('demo') || tpl.demo;
  return { data: structuredClone(SAMPLES[key] || SAMPLES.wedding), demo: true };
}

function applyTheme(tpl) {
  const root = document.documentElement;
  root.classList.add(`t-${tpl.id}`);
  for (const [k, v] of Object.entries(tpl.palette)) root.style.setProperty(`--${k}`, v);
  root.style.setProperty('--font-display', tpl.fonts.display);
  root.style.setProperty('--font-script', tpl.fonts.script);
  root.style.setProperty('--font-body', tpl.fonts.body);
  root.style.setProperty('--font-ar', tpl.fonts.ar);
  root.style.setProperty('--font-ar-display', tpl.fonts.arDisplay || tpl.fonts.ar);
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = fontsHref(tpl.gf);
  document.head.appendChild(link);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tpl.palette.bg);
  if (tpl.css) {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `${SITE}templates/${tpl.id}.css`; document.head.appendChild(l);
  }
  const backdrop = document.querySelector('.backdrop');
  if (tpl.photo && !qs.has('nophoto')) {
    const base = assetBase(tpl);
    root.classList.add('has-photo');
    if (tpl.photo.overlay) root.style.setProperty('--bg-overlay', tpl.photo.overlay);
    for (const [href, as] of [[`${base}/closed.webp`, 'image'], [`${base}/bg.webp`, 'image']]) {
      const l = document.createElement('link'); l.rel = 'preload'; l.as = as; l.href = href; document.head.appendChild(l);
    }
    backdrop.innerHTML = `<div class="photo-bg" style="background-image:url('${base}/bg.webp')"></div>`;
    // gentle parallax on scroll
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking || reduced) return; ticking = true;
      requestAnimationFrame(() => { backdrop.firstElementChild?.style.setProperty('--sy', String(Math.round(scrollY * 0.12))); ticking = false; });
    }, { passive: true });
  } else {
    tpl.photo = null;
    backdrop.innerHTML = patternFill(tpl.pattern || 'dots');
  }
}

function setLang(lang) {
  const root = document.documentElement;
  root.lang = lang; root.dir = LANGS[lang].dir;
}

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
  push(k, v) { try { const a = store.get(k); a.push(v); localStorage.setItem(k, JSON.stringify(a)); } catch { /* private mode */ } },
};

async function post(url, payload) {
  if (!url || !/^https:\/\//.test(url)) return false;
  try { const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }); return r.ok; } catch { return false; }
}

async function main() {
  const tpl = TEMPLATES.find((t) => t.id === qs.get('t')) || TEMPLATES[0];
  applyTheme(tpl);
  const { data, demo } = await loadData(tpl);
  if (demo && data.music?.type === 'synth' && tpl.mood) data.music.mood = tpl.mood;
  // Demos play the template's suggested YouTube song; ?music=<youtube link> tries any other song.
  if (demo && tpl.song) data.music = { type: 'youtube', url: tpl.song };
  if (qs.get('music')) data.music = qs.get('music') === 'none' ? { type: 'none' } : { type: 'youtube', url: qs.get('music') };
  const langs = (data.languages || ['ar', 'fr', 'en']).filter((l) => LANGS[l]);
  let lang = langs.includes(qs.get('lang')) ? qs.get('lang') : (data.defaultLang || langs[0]);
  setLang(lang);
  const slug = data.slug || `demo-${tpl.id}`;
  const now = new Date();
  const ctx = () => ({ tpl, data, t: makeT(lang), lang, now, demo });

  const who = isCouple(data) ? data.names.map((n) => makeT(lang).L(n)).join(' & ') : makeT(lang).L(data.honoree);
  document.title = `${who} · Mémora`;

  let blocked = false, blockTimer = 0, attempts = 0;
  let music = createMusic(data.music, {
    onChange: () => { if (music?.playing) blocked = false; renderControls(); },
    onBlocked: () => { blocked = true; renderControls(); },
    onUnavailable: () => { music = null; renderControls(); }, // broken / removed video: hide silently
  });
  const musicOn = () => Boolean(music && (music.playing || (music.wanted && !blocked)));
  const startMusic = () => {
    if (!music) return;
    music.start(); renderControls();
    clearTimeout(blockTimer); attempts++;
    // if the browser refused to start the sound, offer the "tap for music" pill
    // after a second failed try (e.g. a video that silently refuses to play when embedded) hide the music
    blockTimer = setTimeout(() => {
      if (!music || music.playing) return;
      if (attempts >= 2 && music.wanted !== undefined) { music.pause(); music = null; } else blocked = true;
      renderControls();
    }, 4000);
  };
  const app = document.getElementById('app');
  const controls = document.getElementById('controls');

  // ── controls: language switch + music toggle ──
  function renderControls() {
    const t = makeT(lang);
    const langBtns = langs.length > 1
      ? `<div class="lang-switch" role="group" aria-label="${t('language')}">${langs.map((l) => `<button type="button" data-lang="${l}" aria-pressed="${l === lang}" lang="${l}">${LANGS[l].label}</button>`).join('')}</div>`
      : '';
    const on = musicOn();
    const mus = music ? `<div class="music-dock">${on ? '' : `<button type="button" class="music-pill">${t('tapForMusic')}</button>`}<button type="button" class="music-btn${on ? ' on' : ''}" aria-pressed="${on}" aria-label="${on ? t('musicOff') : t('musicOn')}">${on ? icon.music : icon.mute}<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></button></div>` : '';
    controls.innerHTML = langBtns + mus;
  }
  controls.addEventListener('click', (e) => {
    const lb = e.target.closest('[data-lang]');
    if (lb && lb.dataset.lang !== lang) {
      lang = lb.dataset.lang; setLang(lang);
      const y = scrollY / Math.max(1, document.body.scrollHeight);
      renderControls(); renderContent(); relabelGate();
      scrollTo(0, y * document.body.scrollHeight);
      const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u);
    }
    if (e.target.closest('.music-btn, .music-pill') && music) {
      if (musicOn() && !e.target.closest('.music-pill')) { clearTimeout(blockTimer); music.pause(); renderControls(); }
      else { blocked = false; startMusic(); }
    }
  });

  function relabelGate() {
    const st = document.getElementById('opening'); if (!st || !st.dataset.hint) return;
    const t = makeT(lang);
    const tap = st.querySelector('.op-tap'); if (tap) tap.textContent = t(st.dataset.hint);
    const sm = st.querySelector('.op-hint small'); if (sm) sm.textContent = '♪ ' + t('soundHint');
    st.querySelector('.op-scene')?.setAttribute('aria-label', t('tapToOpen'));
    st.querySelectorAll('.hn-title').forEach((h) => { h.textContent = t.kind('henna'); });
  }

  // ── content ──
  let cdTimer = null;
  function renderContent() {
    const c = ctx();
    const order = (data.sections || tpl.sections || DEFAULT_SECTIONS).filter((id) => SECTIONS[id]);
    app.innerHTML = order.map((id) => SECTIONS[id](c)).join('');
    bindCountdown(); bindCalendar(c); bindRsvp(c); bindWishes(c); bindShare(c); bindReveal();
  }

  function bindCountdown() {
    clearInterval(cdTimer);
    const el = app.querySelector('.countdown'); if (!el) return;
    const target = Number(el.dataset.target);
    const nums = Object.fromEntries([...el.querySelectorAll('[data-cd]')].map((n) => [n.dataset.cd, n]));
    const tick = () => {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      if (s === 0) { el.querySelector('.cd-grid').hidden = true; el.querySelector('.cd-done').hidden = false; clearInterval(cdTimer); return; }
      const v = { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
      for (const k in v) { const txt = String(v[k]).padStart(2, '0'); if (nums[k].textContent !== txt) nums[k].textContent = txt; }
    };
    tick(); cdTimer = setInterval(tick, 1000);
  }

  function bindCalendar(c) {
    app.querySelectorAll('[data-cal]').forEach((b) => {
      const p = calPayload(c, Number(b.dataset.ev));
      if (b.dataset.cal === 'google') b.href = googleCalUrl(p);
      else b.addEventListener('click', () => downloadICS(buildICS(p), `${slug}-${data.events[b.dataset.ev].kind}.ics`));
    });
  }

  function bindRsvp(c) {
    const form = app.querySelector('.rsvp-form'); if (!form) return;
    const { t } = c;
    const done = app.querySelector('.rsvp-done');
    const ifYes = form.querySelector('.if-yes');
    const sync = () => { ifYes.hidden = form.attending.value === 'no'; };
    form.addEventListener('change', sync); sync();
    const prev = store.get(`farha:rsvp:${slug}`).at(-1);
    const showDone = (entry) => {
      form.hidden = true; done.hidden = false;
      done.querySelector('.done-msg').textContent = entry.attending === 'yes' ? t('rsvpThanksYes') : t('rsvpThanksNo');
      const wa = done.querySelector('.wa-link');
      if (wa) {
        const evs = entry.events?.map((i) => t.L(data.events[i].title) || t.kind(data.events[i].kind)).join(', ');
        const txt = `${entry.name} — ${entry.attending === 'yes' ? `${t('yes')} (${entry.guests})${evs ? ` · ${evs}` : ''}` : t('no')}${entry.message ? `\n${entry.message}` : ''}`;
        wa.href = `https://wa.me/${String(data.rsvp.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(txt)}`;
      }
    };
    if (prev) showDone(prev);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = form.querySelector('.form-err');
      const name = form.elements.guest_name.value.trim();
      if (!name) { err.textContent = t('nameRequired'); form.elements.guest_name.focus(); return; }
      if (!form.attending.value) { err.textContent = t('chooseAttend'); return; }
      err.textContent = '';
      const entry = {
        name, attending: form.attending.value,
        guests: form.attending.value === 'yes' ? Number(form.guests.value) : 0,
        events: form.attending.value === 'yes' ? [...form.querySelectorAll('[name=events]:checked')].map((x) => Number(x.value)) : [],
        message: form.message.value.trim(), at: new Date().toISOString(), lang,
      };
      const btn = form.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = t('sending');
      store.push(`farha:rsvp:${slug}`, entry);
      await post(data.rsvp?.endpoint, { type: 'rsvp', slug, ...entry });
      showDone(entry); done.focus();
    });
  }

  function bindWishes(c) {
    const form = app.querySelector('.wish-form'); if (!form) return;
    const { t } = c;
    const list = app.querySelector('.wish-list');
    const item = (w) => `<li class="wish card"><p class="w-text">${esc(w.text)}</p><p class="w-name">— ${esc(w.name)}</p></li>`;
    const seeded = (data.wishes || []).map((w) => ({ name: t.L(w.name), text: t.L(w.text) }));
    list.innerHTML = [...store.get(`farha:wish:${slug}`).reverse(), ...seeded].map(item).join('');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.elements.guest_name.value.trim(), text = form.elements.wish_text.value.trim();
      const err = form.querySelector('.form-err');
      if (!name || !text) { err.textContent = t('wishRequired'); return; }
      err.textContent = '';
      const w = { name, text, at: new Date().toISOString() };
      store.push(`farha:wish:${slug}`, w);
      list.insertAdjacentHTML('afterbegin', item(w));
      form.reset();
      await post(data.wishesEndpoint || data.rsvp?.endpoint, { type: 'wish', slug, ...w });
    });
  }

  function bindShare(c) {
    const b = app.querySelector('.share-btn'); if (!b) return;
    b.addEventListener('click', async () => {
      const url = location.href.split('#')[0];
      if (navigator.share) { try { await navigator.share({ title: document.title, url }); return; } catch { /* cancelled */ } }
      open(`https://wa.me/?text=${encodeURIComponent(`${document.title}\n${url}`)}`, '_blank', 'noopener');
    });
  }

  function bindReveal() {
    const secs = app.querySelectorAll('.sec');
    if (reduced || !('IntersectionObserver' in window)) { secs.forEach((s) => s.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  renderContent();

  // ── opening ──
  const stage = document.getElementById('opening');
  const skip = qs.has('open') || !OPENINGS[tpl.opening];
  const ambient = () => {
    if (!tpl.photo || reduced) return;
    const layer = document.createElement('div');
    layer.className = 'fx-layer'; layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    particles(layer, tpl.photo.particles || 'dust', tpl.photo.colors || ['#fff'], { density: 0.45 });
  };
  if (skip) { stage.remove(); document.body.classList.add('opened'); renderControls(); ambient(); return; }
  document.body.classList.add('gated');
  renderControls();
  const t = makeT(lang);
  await (tpl.photo ? photoOpening : OPENINGS[tpl.opening])(stage, {
    tpl, data, t, lang, reduced,
    initials: isCouple(data) ? data.names.map((n) => t.L(n).trim()[0] || '').join('') : (t.L(data.honoree)[0] || ''),
    who,
    unlock: () => startMusic(),
  });
  document.body.classList.remove('gated'); document.body.classList.add('opened');
  stage.classList.add('gone');
  setTimeout(() => stage.remove(), reduced ? 0 : 700);
  ambient();
  app.querySelector('h1')?.setAttribute('tabindex', '-1');
  app.querySelector('h1')?.focus({ preventScroll: true });
}

main().catch((e) => { console.error(e); document.getElementById('opening')?.remove(); });
