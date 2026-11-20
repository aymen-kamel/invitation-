// Shared invitation sections. Each returns an HTML string; behaviour is attached in core.js (bind*).
import { eventStart, eventEnd, fmtDate, fmtTime, mapsUrl } from './calendar.js';
import { divider, corner, heroMotif, icon, jasmine, waxSeal } from './ornaments.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const DEFAULT_SECTIONS = ['hero', 'countdown', 'schedule', 'venues', 'dresscode', 'story', 'rsvp', 'wishes', 'footer'];
const COUPLE_TYPES = new Set(['wedding', 'engagement', 'henna', 'contract', 'outia']);

export const isCouple = (data) => COUPLE_TYPES.has(data.eventType);
export function mainEvent(data) {
  const evs = data.events || [];
  return evs[data.mainEvent ?? evs.length - 1] || evs[0];
}

const frame = (tpl) => (tpl.corner ? ['tl', 'tr', 'bl', 'br'].map((p) => corner(tpl.corner, { cls: `c-${p}` })).join('') : '');
const head = (t, key, tpl) => `<header class="sec-head"><h2 class="sec-title">${esc(t(key))}</h2>${divider(tpl.divider || 'diamond')}</header>`;

// ───────────────── hero: names & date ─────────────────
function hero(ctx) {
  const { tpl, data, t } = ctx;
  const ev = mainEvent(data);
  const start = eventStart(ev, ctx.now);
  const dateStr = fmtDate(start, t.locale);
  let names, lead, follow;
  if (isCouple(data)) {
    const [a, b] = data.names;
    const fam = data.families ? `<p class="families">${esc(t.L(data.families[0]))} <span class="amp">${t('andFamilies')}</span> ${esc(t.L(data.families[1]))}</p>` : '';
    lead = fam;
    names = `<h1 class="names"><span class="n">${esc(t.L(a))}</span><span class="amp-big" aria-hidden="true">${tpl.amp || '&'}</span><span class="sr-only">${t('andFamilies')}</span><span class="n">${esc(t.L(b))}</span></h1>`;
    follow = `<p class="invite-line">${esc(t.L(data.inviteLine) || t('youAreInvited'))}</p>`;
  } else {
    lead = data.hosts ? `<p class="families">${esc(t.L(data.hosts))}</p>` : '';
    const kicker = data.eventType === 'birthday' ? t('celebrate') : t('welcomeBaby');
    names = `<p class="kicker">${esc(t.L(data.kicker) || kicker)}</p><h1 class="names single"><span class="n">${esc(t.L(data.honoree))}</span></h1>${data.age ? `<p class="age"><span>${esc(data.age)}</span></p>` : ''}`;
    follow = `<p class="invite-line">${esc(t.L(data.inviteLine) || t('celebrate'))}</p>`;
  }
  const initials = isCouple(data) ? data.names.map((n) => t.L(n).trim()[0] || '').join('') : (t.L(data.honoree).trim()[0] || '');
  const motif = tpl.motif === 'none' ? ''
    : tpl.motif === 'monogram' ? waxSeal('initials', { cls: 'motif', text: esc(initials) })
      : heroMotif(tpl.motif, { cls: 'motif' });
  return `<section class="sec hero" id="hero">
    ${motif ? `<div class="hero-motif hm-${tpl.motif}">${motif}</div>` : ''}
    ${lead}${names}${follow}
    ${divider(tpl.divider || 'diamond')}
    <p class="hero-date"><time datetime="${start.toISOString()}">${esc(dateStr)}</time></p>
    <p class="hero-place">${esc(t.L(ev.city || ev.venue))}</p>
    ${data.message ? `<p class="message">${esc(t.L(data.message))}</p>` : ''}
  </section>`;
}

// ───────────────── countdown ─────────────────
function countdown(ctx) {
  const { t, tpl, data } = ctx;
  const start = eventStart(mainEvent(data), ctx.now);
  const cell = (k) => `<div class="cd-cell"><span class="cd-num" data-cd="${k}">00</span><span class="cd-lbl">${t(k)}</span></div>`;
  return `<section class="sec countdown" id="countdown" data-target="${start.getTime()}">
    ${head(t, 'countdownTitle', tpl)}
    <div class="cd-grid" role="timer" aria-live="off">${['days', 'hours', 'minutes', 'seconds'].map(cell).join('')}</div>
    <p class="cd-done" hidden>${esc(t('itsToday'))}</p>
  </section>`;
}

// ───────────────── schedule (multi-event timeline) ─────────────────
function schedule(ctx) {
  const { t, tpl, data } = ctx;
  if (!data.events?.length) return '';
  const items = data.events.map((ev, i) => {
    const s = eventStart(ev, ctx.now);
    return `<li class="tl-item">
      <span class="tl-dot" aria-hidden="true">${i + 1}</span>
      <div class="tl-body">
        <h3 class="tl-kind">${esc(t.L(ev.title) || t.kind(ev.kind))}</h3>
        <p class="tl-when">${icon.cal}<span>${esc(fmtDate(s, t.locale, { weekday: 'long', day: 'numeric', month: 'long' }))}</span></p>
        <p class="tl-when">${icon.clock}<span dir="ltr">${esc(fmtTime(s, t.locale))}</span></p>
        <p class="tl-when">${icon.pin}<span>${esc(t.L(ev.venue))}</span></p>
      </div></li>`;
  }).join('');
  return `<section class="sec schedule" id="schedule">${head(t, 'scheduleTitle', tpl)}<ol class="timeline">${items}</ol></section>`;
}

// ───────────────── venues + maps + calendar ─────────────────
function venues(ctx) {
  const { t, tpl, data } = ctx;
  if (!data.events?.length) return '';
  const cards = data.events.map((ev, i) => {
    const s = eventStart(ev, ctx.now);
    const place = [t.L(ev.venue), t.L(ev.address)].filter(Boolean).join(', ');
    return `<article class="venue card">${frame(tpl)}
      <p class="venue-kind">${esc(t.L(ev.title) || t.kind(ev.kind))}</p>
      <h3 class="venue-name">${esc(t.L(ev.venue))}</h3>
      <p class="venue-addr">${esc(t.L(ev.address))}</p>
      <p class="venue-time"><span>${esc(fmtDate(s, t.locale, { weekday: 'short', day: 'numeric', month: 'short' }))}</span> · <span dir="ltr">${esc(fmtTime(s, t.locale))}</span></p>
      <div class="btn-row">
        <a class="btn" href="${esc(mapsUrl(ev, place))}" target="_blank" rel="noopener">${icon.pin}<span>${t('openMaps')}</span></a>
        <details class="cal-menu">
          <summary class="btn btn-ghost">${icon.cal}<span>${t('addCalendar')}</span></summary>
          <div class="cal-pop">
            <a class="cal-opt" data-cal="google" data-ev="${i}" href="#" target="_blank" rel="noopener">${t('googleCal')}</a>
            <button type="button" class="cal-opt" data-cal="ics" data-ev="${i}">${t('appleCal')} (.ics)</button>
          </div>
        </details>
      </div>
    </article>`;
  }).join('');
  return `<section class="sec venues" id="venues">${head(t, 'venuesTitle', tpl)}<div class="venue-list">${cards}</div></section>`;
}

// ───────────────── dress code ─────────────────
function dresscode(ctx) {
  const { t, tpl, data } = ctx;
  const dc = data.dressCode;
  if (!dc) return '';
  const sw = (dc.colors || []).map((c) => `<li class="swatch" style="--sw:${esc(c)}"><span class="sr-only">${esc(c)}</span></li>`).join('');
  return `<section class="sec dresscode" id="dresscode">${head(t, 'dressTitle', tpl)}
    <p class="dc-title">${esc(t.L(dc.title))}</p>
    <p class="dc-note">${esc(t.L(dc.note))}</p>
    ${sw ? `<ul class="swatches" aria-label="${esc(t('dressTitle'))}">${sw}</ul>` : ''}
  </section>`;
}

// ───────────────── story & photos ─────────────────
function story(ctx) {
  const { t, tpl, data } = ctx;
  const moments = (data.story || []).map((m) => `<li class="moment"><span class="m-year">${esc(t.L(m.when))}</span><p>${esc(t.L(m.text))}</p></li>`).join('');
  const photos = (data.photos || []).map((p, i) => {
    if (p.src) return `<figure class="photo"><img src="${esc(p.src)}" alt="${esc(t.L(p.alt))}" loading="lazy" decoding="async" width="600" height="750"></figure>`;
    // Demo placeholder: drawn art instead of stock photos.
    return `<figure class="photo photo-art" style="--hue:${(i * 47) % 360}"><div class="pa-motif">${jasmine({})}</div><figcaption>${esc(t.L(p.caption))}</figcaption></figure>`;
  }).join('');
  if (!moments && !photos) return '';
  return `<section class="sec story" id="story">${head(t, data.story?.length ? 'storyTitle' : 'photosTitle', tpl)}
    ${moments ? `<ol class="moments">${moments}</ol>` : ''}
    ${photos ? `<div class="photos">${photos}</div>` : ''}
  </section>`;
}

// ───────────────── RSVP ─────────────────
function rsvp(ctx) {
  const { t, tpl, data } = ctx;
  if (data.rsvp === false) return '';
  const r = data.rsvp || {};
  const deadline = r.deadline ? new Date(r.deadline) : new Date(eventStart(mainEvent(data), ctx.now).getTime() - (r.daysBefore || 14) * 864e5);
  const max = r.maxGuests || 5;
  const opts = Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
  const multi = (data.events || []).length > 1
    ? `<fieldset class="field evs"><legend>${t('whichEvents')}</legend>${data.events.map((ev, i) => `<label class="chk"><input type="checkbox" name="events" value="${i}" checked><span>${esc(t.L(ev.title) || t.kind(ev.kind))}</span></label>`).join('')}</fieldset>`
    : '';
  return `<section class="sec rsvp" id="rsvp">${head(t, 'rsvpTitle', tpl)}
    <p class="rsvp-before">${t('rsvpBefore')} <strong>${esc(fmtDate(deadline, t.locale, { day: 'numeric', month: 'long' }))}</strong></p>
    <form class="rsvp-form card" novalidate>${frame(tpl)}
      <label class="field"><span>${t('yourName')}</span><input name="guest_name" autocomplete="name" required maxlength="80"></label>
      <fieldset class="field att"><legend>${t('attending')}</legend>
        <label class="pill"><input type="radio" name="attending" value="yes"><span>${t('yes')}</span></label>
        <label class="pill"><input type="radio" name="attending" value="no"><span>${t('no')}</span></label>
      </fieldset>
      <div class="if-yes">
        <label class="field"><span>${t('guests')}</span><select name="guests">${opts}</select></label>
        ${multi}
      </div>
      <label class="field"><span>${t('message')}</span><textarea name="message" rows="2" maxlength="400"></textarea></label>
      <p class="form-err" role="alert"></p>
      <button class="btn btn-primary" type="submit">${t('send')}</button>
    </form>
    <div class="rsvp-done card" hidden tabindex="-1">${frame(tpl)}<div class="done-ico">${icon.check}</div><p class="done-msg"></p>
      ${r.whatsapp ? `<a class="btn btn-ghost wa-link" target="_blank" rel="noopener" href="#">${t('alsoWhatsapp')}</a>` : ''}
    </div>
    ${ctx.demo ? `<p class="demo-note">${t('demoNote')}</p>` : ''}
  </section>`;
}

// ───────────────── wishes wall ─────────────────
function wishes(ctx) {
  const { t, tpl } = ctx;
  return `<section class="sec wishes" id="wishes">${head(t, 'wishesTitle', tpl)}
    <form class="wish-form card" novalidate>
      <label class="field"><span>${t('yourName')}</span><input name="guest_name" maxlength="60" autocomplete="name"></label>
      <label class="field"><span class="sr-only">${t('wishesTitle')}</span><textarea name="wish_text" rows="2" maxlength="280" placeholder="${esc(t('wishPlaceholder'))}"></textarea></label>
      <p class="form-err" role="alert"></p>
      <button class="btn btn-primary" type="submit">${t('postWish')}</button>
    </form>
    <ul class="wish-list" aria-live="polite"></ul>
  </section>`;
}

// ───────────────── footer ─────────────────
function footer(ctx) {
  const { t } = ctx;
  return `<footer class="sec footer" id="footer">
    <button type="button" class="btn btn-ghost share-btn">${icon.share}<span>${t('shareInvite')}</span></button>
    <p class="made">${t('madeWith')} <a href="https://farha-bay.vercel.app/" target="_blank" rel="noopener">Farha · فرحة</a></p>
  </footer>`;
}

export const SECTIONS = { hero, countdown, schedule, venues, dresscode, story, rsvp, wishes, footer };

/** ICS / Google payload for event i. */
export function calPayload(ctx, i) {
  const { t, data } = ctx;
  const ev = data.events[i];
  const start = eventStart(ev, ctx.now);
  const who = isCouple(data) ? data.names.map((n) => t.L(n)).join(' & ') : t.L(data.honoree);
  return {
    title: `${t.L(ev.title) || t.kind(ev.kind)} — ${who}`,
    start, end: eventEnd(ev, start),
    location: [t.L(ev.venue), t.L(ev.address)].filter(Boolean).join(', '),
    description: location.href.split('#')[0],
    url: location.href.split('#')[0],
  };
}
