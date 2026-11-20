import { TEMPLATES, STYLE_FAMILIES, TIERS, fontsHref } from './templates/registry.js';
import { EVENT_KINDS } from './engine/i18n.js';
import { heroMotif, patternFill, waxSeal, doorLeaf, lantern } from './engine/ornaments.js';

// Where "Choisir ce modèle" leads. Point this at the real order flow once it exists.
const ORDER_URL = (id) => `https://farha-bay.vercel.app/?modele=${encodeURIComponent(id)}#themes`;
// Which demo dataset best shows a template for a given event filter.
const DEMO_FOR = { wedding: 'wedding', engagement: 'engagement', contract: 'wedding', henna: 'henna', outia: 'henna', birth: 'baby', babyshower: 'baby', tahara: 'tahara', birthday: 'birthday' };
const SAMPLE_NAMES = { wedding: 'Ranim & Aymen', engagement: 'Ranim & Aymen', henna: 'Ranim & Aymen', baby: 'Lina', birthday: 'Adam', tahara: 'Youssef' };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Load each template's Latin display/script fonts for the thumbnails (one request).
const latin = [...new Set(TEMPLATES.flatMap((t) => t.gf.filter((f) => !/Amiri|Aref|Messiri|Reem|Tajawal|Baloo/.test(f))))];
const fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = fontsHref(latin); document.head.appendChild(fl);

const state = { event: 'all', style: 'all', tier: 'all' };
const events = [...new Set(TEMPLATES.flatMap((t) => t.events))];

function chips(name, items) {
  const box = document.querySelector(`[data-filter="${name}"]`);
  box.innerHTML = [['all', 'Tous'], ...items].map(([v, label], i) => `
    <label class="chip"><input type="radio" name="${name}" value="${v}"${i === 0 ? ' checked' : ''}><span>${esc(label)}</span></label>`).join('');
}
chips('event', events.map((e) => [e, EVENT_KINDS[e].fr]));
chips('style', Object.entries(STYLE_FAMILIES).filter(([k]) => TEMPLATES.some((t) => t.style === k)).map(([k, v]) => [k, v.fr]));
chips('tier', Object.entries(TIERS).map(([k, v]) => [k, `${v.fr} · ${v.price}`]));

/** Thumbnail: a miniature invitation drawn with the template's own palette, fonts and motif. */
function thumb(t) {
  if (t.photo) {
    const sample = SAMPLE_NAMES[t.demo] || 'Ranim & Aymen';
    return `<div class="thumb thumb-photo" style="--accent:${t.palette.accent};--font-script:${esc(t.fonts.script)}">
      <img src="/openings/${t.id}/closed.webp" alt="" loading="lazy" decoding="async" width="1080" height="1920">
      <img class="th-seal-img" src="/openings/${t.id}/seal.webp" alt="" loading="lazy" decoding="async" width="120" height="120">
      <p class="th-ov-names">${esc(sample)}</p>
    </div>`;
  }
  const vars = Object.entries(t.palette).map(([k, v]) => `--${k}:${v}`).join(';');
  const fonts = `--font-display:${t.fonts.display};--font-script:${t.fonts.script}`;
  const sample = SAMPLE_NAMES[t.demo] || 'Ranim & Aymen';
  const art = {
    doors: `<div class="th-doors">${doorLeaf('l')}${doorLeaf('r')}</div>`,
    lanterns: `<div class="th-lanterns">${lantern({})}${lantern({})}</div>`,
    letter: `<div class="th-seal">${waxSeal('initials', { text: sample.split(' & ').map((n) => n[0]).join('') })}</div>`,
    sealBreak: `<div class="th-seal">${waxSeal('khomsa')}</div>`,
    envelope: `<div class="th-seal">${waxSeal('jasmine')}</div>`,
  }[t.opening];
  const motif = t.motif === 'none' ? '' : t.motif === 'monogram' ? '' : `<div class="th-motif">${heroMotif(t.motif, {})}</div>`;
  return `<div class="thumb th-${t.id}" style="${esc(vars)};${esc(fonts)}">
    ${patternFill(t.pattern || 'dots')}
    <div class="th-card">
      ${art || motif}
      <p class="th-names">${esc(sample).replace(' &amp; ', '<span> &amp; </span>')}</p>
      <p class="th-date">Samedi 12 septembre</p>
    </div>
  </div>`;
}

function card(t) {
  const demo = DEMO_FOR[state.event] && t.events.includes(state.event) ? DEMO_FOR[state.event] : t.demo;
  const demoUrl = `/i/?t=${t.id}${demo !== t.demo ? `&demo=${demo}` : ''}`;
  const tier = TIERS[t.tier];
  return `<article class="card">
    <a class="thumb-link" href="${demoUrl}" aria-label="Voir la démo ${esc(t.name.fr)}">${thumb(t)}</a>
    <div class="body">
      <div class="title-row"><h2>${esc(t.name.fr)}</h2><span class="ar" lang="ar" dir="rtl">${esc(t.name.ar)}</span></div>
      <p class="tagline">${esc(t.tagline.fr)}</p>
      <ul class="tags">${t.events.map((e) => `<li>${esc(EVENT_KINDS[e].fr)}</li>`).join('')}</ul>
      <p class="price"><span>${esc(tier.fr)}</span> ${esc(tier.price)}</p>
      <div class="actions">
        <a class="btn ghost" href="${demoUrl}">Voir la démo</a>
        <a class="btn solid" href="${ORDER_URL(t.id)}">Choisir ce modèle</a>
      </div>
    </div>
  </article>`;
}

function render() {
  const list = TEMPLATES.filter((t) => (state.event === 'all' || t.events.includes(state.event)) && (state.style === 'all' || t.style === state.style) && (state.tier === 'all' || t.tier === state.tier));
  document.getElementById('grid').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Aucun modèle ne correspond. Essayez un autre filtre — ou demandez une création sur mesure.</p>';
  document.querySelector('.count').textContent = `${list.length} modèle${list.length > 1 ? 's' : ''}`;
}

const params = new URLSearchParams(location.search);
for (const k of Object.keys(state)) {
  const v = params.get(k);
  const input = v && document.querySelector(`input[name="${k}"][value="${CSS.escape(v)}"]`);
  if (input) { input.checked = true; state[k] = v; }
}
document.querySelector('.filters').addEventListener('change', (e) => {
  state[e.target.name] = e.target.value;
  const u = new URL(location.href);
  for (const [k, v] of Object.entries(state)) v === 'all' ? u.searchParams.delete(k) : u.searchParams.set(k, v);
  history.replaceState(null, '', u);
  render();
});
render();
