import { TEMPLATES, STYLE_FAMILIES, TIERS } from './templates/registry.js';
import { EVENT_KINDS } from './engine/i18n.js';

// ── Shop settings ──────────────────────────────────────────────────────────
// WhatsApp number that receives orders (international format, digits only).
const WHATSAPP = '21692891770';
// ───────────────────────────────────────────────────────────────────────────

const DEMO_FOR = { wedding: 'wedding', engagement: 'engagement', contract: 'wedding', henna: 'henna', outia: 'henna', birth: 'baby', babyshower: 'baby', tahara: 'tahara', birthday: 'birthday' };
const SAMPLE_NAMES = { wedding: 'Ranim & Aymen', engagement: 'Ranim & Aymen', henna: 'Ranim & Aymen', baby: 'Lina', birthday: 'Adam', tahara: 'Youssef' };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Every [data-wa] link opens WhatsApp with its prefilled message.
document.querySelectorAll('[data-wa]').forEach((a) => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });

// ── Hero phone demo: switch the live template ──
const frame = document.getElementById('phone-frame');
document.querySelector('.demo-pick')?.addEventListener('click', (e) => {
  const b = e.target.closest('[data-demo]'); if (!b) return;
  document.querySelectorAll('.demo-pick button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  frame.src = `/i/?t=${b.dataset.demo}&music=none`;
});

// ── Catalog ──
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

function card(t) {
  const demo = DEMO_FOR[state.event] && t.events.includes(state.event) ? DEMO_FOR[state.event] : t.demo;
  const demoUrl = `/i/?t=${t.id}${demo !== t.demo ? `&demo=${demo}` : ''}`;
  const tier = TIERS[t.tier];
  const names = SAMPLE_NAMES[demo] || 'Ranim & Aymen';
  const order = wa(`Bonjour Mémora, je souhaite commander l'invitation « ${t.name.fr} » (${tier.fr}).`);
  return `<article class="card">
    <a class="thumb" href="${demoUrl}" target="_blank" rel="noopener" aria-label="Ouvrir la démo ${esc(t.name.fr)}">
      <img class="th-photo" src="/openings/${t.id}/closed.webp" alt="" loading="lazy" decoding="async" width="1080" height="1920">
      <img class="th-seal" src="/openings/${t.id}/seal.webp" alt="" loading="lazy" decoding="async" width="120" height="120">
      <span class="th-names" style="--font-script:${esc(t.fonts.script)}">${esc(names)}</span>
      <span class="th-play">Démo ↗</span>
    </a>
    <div class="body">
      <div class="title-row"><h3>${esc(t.name.fr)}</h3><span class="ar" lang="ar" dir="rtl">${esc(t.name.ar)}</span></div>
      <p class="tagline">${esc(t.tagline.fr)}</p>
      <ul class="tags">${t.events.map((e) => `<li>${esc(EVENT_KINDS[e].fr)}</li>`).join('')}</ul>
      <div class="card-foot">
        <p class="price"><span>${esc(tier.price)}</span>${esc(tier.fr)}</p>
        <a class="btn btn-wine btn-sm" href="${order}" target="_blank" rel="noopener">Choisir ce modèle</a>
      </div>
    </div>
  </article>`;
}

function render() {
  const list = TEMPLATES.filter((t) => (state.event === 'all' || t.events.includes(state.event)) && (state.style === 'all' || t.style === state.style) && (state.tier === 'all' || t.tier === state.tier));
  document.getElementById('grid').innerHTML = list.length ? list.map(card).join('')
    : `<p class="empty">Aucun modèle ne correspond à ces filtres. <a href="${wa('Bonjour Mémora, je voudrais une invitation sur mesure.')}" target="_blank" rel="noopener">Demandez une création sur mesure</a>.</p>`;
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

// Load the script fonts used on card names (Latin only, one request).
const fams = [...new Set(TEMPLATES.map((t) => (t.fonts.script.match(/'([^']+)'/) || [])[1]).filter(Boolean))];
const l = document.createElement('link'); l.rel = 'stylesheet';
l.href = `https://fonts.googleapis.com/css2?${fams.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')}&display=swap`;
document.head.appendChild(l);

// Reveal sections on scroll
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal, .sec-head, .features li, .steps li, .tier').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
}
