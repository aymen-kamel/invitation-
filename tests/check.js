// In-browser QA: loads every template in an iframe at 375px and 1280px, in AR and FR,
// opens it with a real click, and verifies countdown, maps, calendar (.ics + Google), RSVP,
// wishes, music toggle, RTL direction, Arabic font loading and horizontal overflow.
import { TEMPLATES } from '../templates/registry.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = document.getElementById('out');
const results = [];

function frame(width, height, src) {
  return new Promise((resolve) => {
    const f = document.createElement('iframe');
    f.style.cssText = `width:${width}px;height:${height}px;border:1px solid #ccc;position:absolute;left:-${width + 50}px;top:0`;
    f.src = src;
    f.onload = () => resolve(f);
    document.body.appendChild(f);
  });
}

async function waitFor(fn, timeout = 6000) {
  const t0 = performance.now();
  while (performance.now() - t0 < timeout) { const v = fn(); if (v) return v; await sleep(60); }
  return null;
}

async function checkOne(tpl, lang, width) {
  const r = { template: tpl.id, lang, width };
  const f = await frame(width, width < 600 ? 812 : 900, `/i/?t=${tpl.id}&lang=${lang}&qa=${Math.random()}`);
  const w = f.contentWindow, d = f.contentDocument;
  try { w.localStorage.clear(); } catch { /* ignore */ }
  try {
    const scene = await waitFor(() => d.querySelector('.op-scene'));
    r.opening = !!scene;
    // capture .ics downloads
    let icsText = null;
    const origCreate = w.URL.createObjectURL.bind(w.URL);
    w.URL.createObjectURL = (blob) => { blob.text().then((t) => { icsText = t; }); return origCreate(blob); };
    w.HTMLAnchorElement.prototype.click = function () { /* swallow download navigation */ };

    scene.click();
    const opened = await waitFor(() => d.body.classList.contains('opened') && !d.getElementById('opening'), 5000);
    r.opens = !!opened;
    r.dir = d.documentElement.dir;
    r.rtlOk = lang === 'ar' ? r.dir === 'rtl' : r.dir === 'ltr';

    // music (unlocked by the opening click)
    const mb = d.querySelector('.music-btn');
    r.musicOn = !!mb && mb.getAttribute('aria-pressed') === 'true';
    mb?.click(); await sleep(50);
    r.musicToggle = d.querySelector('.music-btn')?.getAttribute('aria-pressed') === 'false';
    d.querySelector('.music-btn')?.click(); await sleep(30);
    d.querySelector('.music-btn')?.click(); // leave it paused

    // countdown ticks
    const s1 = d.querySelector('[data-cd="seconds"]')?.textContent;
    await sleep(1150);
    const s2 = d.querySelector('[data-cd="seconds"]')?.textContent;
    r.countdown = !!s1 && s1 !== s2;

    // maps
    const maps = [...d.querySelectorAll('.venue a.btn')];
    r.maps = maps.length > 0 && maps.every((a) => /^https:\/\/www\.google\.com\/maps\//.test(a.href) && a.target === '_blank');

    // calendar
    const g = d.querySelector('[data-cal="google"]');
    r.gcal = !!g && /calendar\.google\.com/.test(g.href) && /dates=\d{8}T\d{6}Z%2F\d{8}T\d{6}Z/.test(g.href);
    d.querySelector('[data-cal="ics"]')?.click();
    await waitFor(() => icsText, 1500);
    r.ics = !!icsText && /BEGIN:VCALENDAR/.test(icsText) && /DTSTART:\d{8}T\d{6}Z/.test(icsText) && /END:VEVENT/.test(icsText);

    // RSVP
    const form = d.querySelector('.rsvp-form');
    if (form) {
      form.querySelector('[type=submit]').click(); await sleep(30);
      r.rsvpValidates = !!form.querySelector('.form-err')?.textContent;
      form.elements.guest_name.value = 'QA Test';
      form.querySelector('input[name=attending][value=yes]').click();
      form.elements.guests.value = '2';
      form.querySelector('[type=submit]').click();
      await waitFor(() => !d.querySelector('.rsvp-done')?.hidden, 2000);
      const saved = JSON.parse(w.localStorage.getItem(Object.keys(w.localStorage).find((k) => k.startsWith('farha:rsvp:'))) || '[]');
      r.rsvp = !d.querySelector('.rsvp-done').hidden && saved.at(-1)?.guests === 2;
    }

    // wishes
    const wf = d.querySelector('.wish-form');
    if (wf) {
      const before = d.querySelectorAll('.wish').length;
      wf.elements.guest_name.value = 'QA'; wf.elements.wish_text.value = 'Mabrouk !';
      wf.querySelector('[type=submit]').click(); await sleep(60);
      r.wishes = d.querySelectorAll('.wish').length === before + 1;
    }

    // layout: no horizontal overflow, no element wider than the viewport
    await sleep(100);
    r.noOverflow = d.documentElement.scrollWidth <= d.documentElement.clientWidth + 1;
    if (!r.noOverflow) {
      r.overflowBy = [...d.querySelectorAll('#app *')].filter((e) => e.getBoundingClientRect().right > d.documentElement.clientWidth + 1).slice(0, 3).map((e) => e.className || e.tagName).join(', ');
    }
    // fonts
    await d.fonts.ready;
    const fam = (v) => (tpl.fonts[v].match(/'([^']+)'/) || [])[1];
    r.fontAr = lang === 'ar' ? d.fonts.check(`16px "${fam('arDisplay') || fam('ar')}"`, 'سلام') : true;
    r.fontLatin = d.fonts.check(`16px "${fam('script')}"`, 'Aa');
  } catch (e) {
    r.error = String(e);
  }
  f.remove();
  return r;
}

const KEYS = ['opens', 'rtlOk', 'countdown', 'maps', 'gcal', 'ics', 'rsvpValidates', 'rsvp', 'wishes', 'musicOn', 'musicToggle', 'noOverflow', 'fontAr', 'fontLatin'];

async function run() {
  const only = new URLSearchParams(location.search).get('t');
  for (const tpl of TEMPLATES.filter((t) => !only || t.id === only)) {
    for (const lang of ['fr', 'ar']) {
      for (const width of [375, 1280]) {
        out.textContent = `Checking ${tpl.id} ${lang} ${width}px…`;
        results.push(await checkOne(tpl, lang, width));
      }
    }
  }
  const fails = results.filter((r) => r.error || KEYS.some((k) => r[k] === false));
  window.__QA__ = { results, fails, keys: KEYS };
  out.innerHTML = `<p>${results.length} runs · ${fails.length} with failures</p><table><tr><th>template</th><th>lang</th><th>px</th>${KEYS.map((k) => `<th>${k}</th>`).join('')}</tr>${results.map((r) => `<tr><td>${r.template}</td><td>${r.lang}</td><td>${r.width}</td>${KEYS.map((k) => `<td class="${r[k] === false ? 'bad' : ''}">${r[k] === undefined ? '–' : r[k] ? '✓' : '✗'}</td>`).join('')}</tr>`).join('')}</table>`;
}
run();
