// Date helpers, .ics generation and Google Calendar links.
// Event times are entered in Tunisia local time (UTC+1, no DST).
const TN_OFFSET_H = 1;

/** Resolve an event's start as a Date. Supports {date:'YYYY-MM-DD'} or demo {offsetDays}. */
export function eventStart(ev, now = new Date()) {
  const [hh, mm] = (ev.time || '20:00').split(':').map(Number);
  let y, m, d;
  if (ev.date) [y, m, d] = ev.date.split('-').map(Number);
  else {
    // Demo data: a date N days from today, so countdowns never show stale dates.
    const base = new Date(now.getTime() + (ev.offsetDays || 30) * 864e5);
    y = base.getUTCFullYear(); m = base.getUTCMonth() + 1; d = base.getUTCDate();
  }
  return new Date(Date.UTC(y, m - 1, d, hh - TN_OFFSET_H, mm));
}

export const eventEnd = (ev, start) => new Date(start.getTime() + (ev.durationH || 4) * 36e5);

const pad = (n) => String(n).padStart(2, '0');
const icsDate = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
const icsEsc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Format a date in Tunisia time for display. */
export function fmtDate(date, locale, opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(locale, { timeZone: 'Africa/Tunis', numberingSystem: 'latn', ...opts }).format(date);
}
export const fmtTime = (date, locale) => fmtDate(date, locale, { hour: '2-digit', minute: '2-digit', hour12: false });

export function buildICS({ title, start, end, location, description, url }) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Farha//Invitation//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${icsDate(start)}-${Math.abs(hash(title + location))}@farha`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsEsc(title)}`,
    location ? `LOCATION:${icsEsc(location)}` : '',
    description ? `DESCRIPTION:${icsEsc(description)}` : '',
    url ? `URL:${url}` : '',
    'BEGIN:VALARM', 'TRIGGER:-PT3H', 'ACTION:DISPLAY', `DESCRIPTION:${icsEsc(title)}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean);
  return lines.join('\r\n');
}

export function googleCalUrl({ title, start, end, location, description }) {
  const p = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${icsDate(start)}/${icsDate(end)}`, location: location || '', details: description || '', ctz: 'Africa/Tunis' });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export function mapsUrl(ev, place) {
  if (ev.maps && /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)/.test(ev.maps)) return ev.maps;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function hash(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

/** Trigger a download of an .ics file (works on iOS Safari, Android, desktop). */
export function downloadICS(ics, filename = 'invitation.ics') {
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}
