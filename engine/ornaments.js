// Farha ornament library — every motif is drawn here in code (original artwork, no external assets).
// Colours come from CSS custom properties set by the active theme, so one motif serves every palette.

const svg = (viewBox, body, { cls = '', label = '', w, h, style = '' } = {}) =>
  `<svg class="orn ${cls}" viewBox="${viewBox}"${w ? ` width="${w}"` : ''}${h ? ` height="${h}"` : ''}${style ? ` style="${style}"` : ''} ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'} xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

const r2 = (n) => Math.round(n * 100) / 100;

/** Points of an n-pointed star centred on (cx, cy). */
export function starPoints(n, rOuter, rInner, cx = 0, cy = 0, rot = -90) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? rInner : rOuter;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${r2(cx + r * Math.cos(a))},${r2(cy + r * Math.sin(a))}`);
  }
  return pts.join(' ');
}

// ───────────────────────── Jasmine (yasmine / mechmoum) ─────────────────────────
const PETAL = 'M0 0C-7-8-7.5-21 0-27C7.5-21 7-8 0 0Z';
function jasmineGroup(x, y, s = 1, rot = 0) {
  const petals = [0, 1, 2, 3, 4]
    .map((i) => `<path d="${PETAL}" transform="rotate(${i * 72})" fill="var(--petal,#fff)" stroke="var(--petal-line,rgba(0,0,0,.12))" stroke-width=".9"/>`)
    .join('');
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${petals}<circle r="3.4" fill="var(--pistil,#d7c15a)"/></g>`;
}
export const jasmine = (o = {}) => svg('-30 -30 60 60', jasmineGroup(0, 0), o);

/** Mechmoum: the Tunisian jasmine posy — a dome of buds tied on a stem. */
export function mechmoum(o = {}) {
  let buds = '';
  const rows = [[0, 7, 46], [1, 6, 36], [2, 4, 24], [3, 1, 0]];
  for (const [row, count, spread] of rows) {
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const x = 60 + (t - 0.5) * 2 * spread;
      const y = 62 - row * 13 - Math.sin(t * Math.PI) * 6;
      buds += jasmineGroup(r2(x), r2(y), 0.42 - row * 0.02, (i * 37 + row * 11) % 72);
    }
  }
  const stems = [52, 56, 60, 64, 68].map((x, i) => `<path d="M${x} 66 Q${60 + (x - 60) * 0.3} 100 ${58 + i} 128" stroke="var(--leaf,#5f7d4e)" stroke-width="1.6" fill="none"/>`).join('');
  const ribbon = `<path d="M50 96 Q60 90 70 96 L68 102 Q60 97 52 102Z" fill="var(--accent)"/><path d="M58 99 L46 118 L52 117 L58 104Z M62 99 L74 118 L68 117 L62 104Z" fill="var(--accent)" opacity=".85"/>`;
  return svg('0 0 120 132', stems + ribbon + buds, o);
}

// ───────────────────────── Khomsa (hand of Fatma) ─────────────────────────
export function khomsa(o = {}) {
  const fill = o.fill || 'currentColor';
  const body = `
  <g fill="${fill}">
    <rect x="34" y="14" width="10.5" height="46" rx="5.2"/>
    <rect x="45.5" y="6" width="10.5" height="54" rx="5.2" transform="translate(-0.75 0)"/>
    <rect x="55.5" y="14" width="10.5" height="46" rx="5.2"/>
    <path d="M33 74C21 72 15 60 16 47c.5-6 9-6.5 10 0l3.6 15Z"/>
    <path d="M67 74c12-2 18-14 17-27-.5-6-9-6.5-10 0l-3.6 15Z"/>
    <path d="M27 52h46v28c0 17-11 28-23 31-12-3-23-14-23-31Z"/>
  </g>
  <g fill="none" stroke="var(--bg)" stroke-width="1.3" opacity=".9">
    <path d="M32 58h36v22c0 13-8 22-18 25-10-3-18-12-18-25Z" stroke-dasharray="2 2.6"/>
    <path d="M38 82q12-11 24 0q-12 11-24 0Z"/>
  </g>
  <circle cx="50" cy="82" r="3.6" fill="var(--bg)"/>
  <circle cx="50" cy="66" r="1.6" fill="var(--bg)"/><circle cx="50" cy="98" r="1.6" fill="var(--bg)"/>`;
  return svg('0 0 100 116', body, o);
}

// ───────────────────────── Geometry: stars, zellige, mashrabiya ─────────────────────────
export const star8 = (o = {}) =>
  svg('-50 -50 100 100', `<polygon points="${starPoints(8, 48, 30)}" fill="${o.fill || 'currentColor'}"/>`, o);

export const star5 = (o = {}) =>
  svg('-50 -50 100 100', `<polygon points="${starPoints(5, 48, 20)}" fill="${o.fill || 'currentColor'}" stroke-linejoin="round"/>`, o);

/** Returns a <pattern> definition string (use inside <defs>). */
export function patternDef(kind, id) {
  switch (kind) {
    case 'zellige':
      return `<pattern id="${id}" width="56" height="56" patternUnits="userSpaceOnUse">
        <rect width="56" height="56" fill="var(--pat-bg)"/>
        <polygon points="${starPoints(8, 20, 12.5, 28, 28)}" fill="var(--pat-a)"/>
        <polygon points="${starPoints(8, 9, 5, 28, 28)}" fill="var(--pat-b)"/>
        <g fill="var(--pat-c)"><path d="M0 -8L8 0L0 8L-8 0Z"/><path d="M56 -8L64 0L56 8L48 0Z"/><path d="M0 48L8 56L0 64L-8 56Z"/><path d="M56 48L64 56L56 64L48 56Z"/></g>
      </pattern>`;
    case 'mashrabiya':
      return `<pattern id="${id}" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="var(--pat-bg)"/>
        <g fill="none" stroke="var(--pat-a)" stroke-width="2.2"><circle cx="14" cy="14" r="8"/><path d="M14 0v6M14 22v6M0 14h6M22 14h6"/></g>
        <circle cx="14" cy="14" r="2.4" fill="var(--pat-a)"/>
      </pattern>`;
    case 'kilim':
      return `<pattern id="${id}" width="48" height="32" patternUnits="userSpaceOnUse">
        <rect width="48" height="32" fill="var(--pat-bg)"/>
        <path d="M24 3L39 16L24 29L9 16Z" fill="var(--pat-a)"/><path d="M24 9L32 16L24 23L16 16Z" fill="var(--pat-b)"/>
        <path d="M24 13.5L26.5 16L24 18.5L21.5 16Z" fill="var(--pat-c)"/>
        <path d="M0 0L6 6L0 12Z M48 0L42 6L48 12Z M0 20L6 26L0 32Z M48 20L42 26L48 32Z" fill="var(--pat-b)"/>
      </pattern>`;
    case 'henna':
      return `<pattern id="${id}" width="64" height="64" patternUnits="userSpaceOnUse">
        <rect width="64" height="64" fill="var(--pat-bg)"/>
        <g fill="none" stroke="var(--pat-a)" stroke-width="1.1" opacity=".7">
          <path d="M32 10c8 8 8 16 0 22c-8-6-8-14 0-22Z"/><circle cx="32" cy="22" r="2"/>
          <path d="M0 48q8-8 16 0t16 0t16 0t16 0"/>
        </g>
        <g fill="var(--pat-a)" opacity=".55"><circle cx="8" cy="8" r="1.4"/><circle cx="56" cy="8" r="1.4"/><circle cx="32" cy="40" r="1.2"/></g>
      </pattern>`;
    case 'stars':
      return `<pattern id="${id}" width="90" height="90" patternUnits="userSpaceOnUse">
        <rect width="90" height="90" fill="var(--pat-bg)"/>
        <g fill="var(--pat-a)"><circle cx="12" cy="18" r="1.1"/><circle cx="64" cy="9" r=".8"/><circle cx="40" cy="52" r="1.3"/><circle cx="80" cy="70" r=".9"/><circle cx="20" cy="78" r=".7"/></g>
        <polygon points="${starPoints(4, 4, 1, 70, 40, 0)}" fill="var(--pat-b)"/>
      </pattern>`;
    case 'dots':
      return `<pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill="var(--pat-bg)"/><circle cx="11" cy="11" r="1.6" fill="var(--pat-a)"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" width="60" height="24" patternUnits="userSpaceOnUse">
        <rect width="60" height="24" fill="var(--pat-bg)"/>
        <path d="M0 12q7.5-8 15 0t15 0t15 0t15 0" fill="none" stroke="var(--pat-a)" stroke-width="1.4" opacity=".6"/></pattern>`;
    case 'confetti':
      return `<pattern id="${id}" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="var(--pat-bg)"/>
        <circle cx="10" cy="14" r="2.4" fill="var(--pat-a)"/><circle cx="58" cy="30" r="2" fill="var(--pat-b)"/>
        <rect x="34" y="60" width="5" height="5" rx="1" transform="rotate(25 36 62)" fill="var(--pat-c)"/>
        <polygon points="${starPoints(5, 4.5, 2, 70, 66)}" fill="var(--pat-a)"/>
      </pattern>`;
    default:
      return `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="var(--pat-bg)"/></pattern>`;
  }
}

/** Full-bleed patterned background as a data URI-free inline SVG (scales with its box). */
let patSeq = 0;
export const patternFill = (kind, cls = 'pat-fill') => {
  const id = `p-${kind}-${++patSeq}`;
  return `<svg class="${cls}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs>${patternDef(kind, id)}</defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
};

// ───────────────────────── Sidi Bou Said door ─────────────────────────
/** One leaf of a round-arched double door. side = 'l' | 'r'. */
export function doorLeaf(side = 'l', o = {}) {
  const studs = [];
  // arch of studs following the quarter circle, then panels of studs in a diamond
  for (let a = 0; a <= 90; a += 11.25) {
    const rad = (a * Math.PI) / 180;
    studs.push([100 - 82 * Math.cos(rad), 100 - 82 * Math.sin(rad)]);
  }
  for (let y = 112; y <= 290; y += 14) studs.push([18, y]);
  const diamond = [[60, 150], [46, 164], [74, 164], [32, 178], [88, 178], [46, 192], [74, 192], [60, 206], [60, 178]];
  const circle = [];
  for (let k = 0; k < 12; k++) { const t = (k / 12) * Math.PI * 2; circle.push([60 + 16 * Math.cos(t), 252 + 16 * Math.sin(t)]); }
  const all = [...studs, ...diamond, ...circle].map(([x, y]) => `<circle cx="${r2(x)}" cy="${r2(y)}" r="3.1" fill="var(--stud)"/>`).join('');
  const body = `
    <path d="M0 312V100A100 100 0 0 1 100 0V312Z" fill="var(--door)"/>
    <path d="M8 304V102A92 92 0 0 1 92 10V304Z" fill="none" stroke="var(--door-line)" stroke-width="2"/>
    ${all}
    <rect x="${side === 'l' ? 86 : 86}" y="196" width="5" height="22" rx="2.5" fill="var(--stud)"/>`;
  const flip = side === 'r' ? ' style="transform:scaleX(-1)"' : '';
  return `<svg class="orn door-leaf ${o.cls || ''}" viewBox="0 0 100 312" preserveAspectRatio="none" aria-hidden="true" focusable="false"${flip} xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// ───────────────────────── Architecture & night ─────────────────────────
export const arch = (o = {}) =>
  svg('0 0 100 140', `<path d="M8 140V64C8 30 28 8 50 4C72 8 92 30 92 64V140" fill="${o.fill || 'none'}" stroke="${o.stroke || 'currentColor'}" stroke-width="${o.sw || 2}"/>
   <path d="M16 140V66C16 38 32 18 50 13C68 18 84 38 84 66V140" fill="none" stroke="${o.stroke || 'currentColor'}" stroke-width="1" opacity=".55"/>`, o);

export function lantern(o = {}) {
  const body = `
   <path d="M30 0v10" stroke="var(--chain,currentColor)" stroke-width="1.4"/>
   <circle cx="30" cy="12" r="3" fill="none" stroke="var(--metal)" stroke-width="1.6"/>
   <path d="M18 26L24 15H36L42 26Z" fill="var(--metal)"/>
   <path d="M14 28H46L52 58L46 92H14L8 58Z" fill="var(--glass)" class="lantern-glass"/>
   <path d="M14 28H46L52 58L46 92H14L8 58Z" fill="none" stroke="var(--metal)" stroke-width="2.4"/>
   <path d="M22 28V92M30 28V92M38 28V92M8 58H52" stroke="var(--metal)" stroke-width="1.3" opacity=".9"/>
   <path d="M30 36q6 10 0 18q-6-8 0-18Z" fill="var(--metal)" opacity=".75"/>
   <path d="M16 92H44L38 102H22Z" fill="var(--metal)"/>
   <path d="M30 102v8" stroke="var(--metal)" stroke-width="2"/><circle cx="30" cy="112" r="2.4" fill="var(--metal)"/>`;
  return svg('0 0 60 116', body, o);
}

export const crescent = (o = {}) =>
  svg('0 0 60 60', `<path d="M34 4A26 26 0 1 0 56 42A21 21 0 1 1 34 4Z" fill="${o.fill || 'currentColor'}"/>`, o);

// ───────────────────────── Henna ─────────────────────────
/** Line-art mandala; strokes carry pathLength=1 so CSS can "draw" them. */
export function hennaMandala(o = {}) {
  let p = '';
  const ring = (n, r, d, rot = 0) => {
    for (let i = 0; i < n; i++) p += `<path pathLength="1" d="${d}" transform="rotate(${rot + (i * 360) / n}) translate(0 ${-r})"/>`;
  };
  p += `<circle pathLength="1" r="9"/><circle pathLength="1" r="15"/>`;
  ring(8, 15, 'M0 0C-7-6-7-16 0-22C7-16 7-6 0 0Z');
  p += `<circle pathLength="1" r="42"/>`;
  ring(16, 42, 'M0 0C-5-5-5-11 0-15C5-11 5-5 0 0Z', 11.25);
  ring(16, 42, 'M0 -4L0 -9', 0);
  p += `<circle pathLength="1" r="62"/>`;
  ring(24, 62, 'M-8 0Q0-14 8 0', 0);
  let dots = '';
  for (let i = 0; i < 32; i++) { const a = (i / 32) * Math.PI * 2; dots += `<circle cx="${r2(80 * Math.cos(a))}" cy="${r2(80 * Math.sin(a))}" r="1.7"/>`; }
  const body = `<g class="mandala-lines" fill="none" stroke="${o.stroke || 'currentColor'}" stroke-width="1.5" stroke-linecap="round">${p}</g><g class="mandala-dots" fill="${o.stroke || 'currentColor'}">${dots}<circle r="3"/></g>`;
  return svg('-90 -90 180 180', body, o);
}

export const paisley = (o = {}) =>
  svg('0 0 60 80', `<g fill="none" stroke="${o.stroke || 'currentColor'}" stroke-width="1.6" stroke-linecap="round">
    <path d="M30 76C10 70 4 48 12 32C20 14 44 8 52 24C58 36 48 48 38 44C30 41 32 30 40 30"/>
    <path d="M30 66C17 62 13 48 18 37C24 25 40 21 45 30"/>
    <circle cx="28" cy="50" r="5"/></g>
    <g fill="${o.stroke || 'currentColor'}"><circle cx="28" cy="50" r="1.6"/><circle cx="20" cy="60" r="1.2"/><circle cx="16" cy="48" r="1.2"/><circle cx="22" cy="38" r="1.2"/></g>`, o);

// ───────────────────────── Djerba ─────────────────────────
export function djerbaScene(o = {}) {
  const body = `
  <defs><linearGradient id="dj-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sky-top)"/><stop offset="1" stop-color="var(--sky-bottom)"/></linearGradient></defs>
  <rect width="200" height="200" fill="url(#dj-sky)"/>
  <circle class="dj-sun" cx="100" cy="128" r="30" fill="var(--sun)"/>
  <rect y="128" width="200" height="72" fill="var(--sea)"/>
  <g stroke="var(--sea-line)" stroke-width="1.4" fill="none" opacity=".7"><path d="M20 140h30M80 146h44M150 138h30M40 156h50M120 162h40"/></g>
  <path d="M0 170Q60 150 120 168T200 160V200H0Z" fill="var(--sand)"/>
  <g class="dj-palm" fill="var(--palm)"><path d="M152 172q3-30 1-58" stroke="var(--palm)" stroke-width="3" fill="none"/>
    <path d="M153 114q-18-6-32 6q16-3 32-4Z"/><path d="M153 114q16-10 32 0q-16-2-32 2Z"/><path d="M153 114q-6-16-22-18q12 8 20 20Z"/><path d="M153 114q8-16 24-16q-14 6-22 18Z"/><path d="M153 114q-14 4-20 18q8-10 20-16Z"/></g>`;
  return svg('0 0 200 200', body, { ...o, style: (o.style || '') + ';display:block' });
}

// ───────────────────────── Baby / celebrations ─────────────────────────
export const cloud = (o = {}) =>
  svg('0 0 100 60', `<path d="M22 54C8 54 4 40 14 34C10 20 28 12 38 20C44 6 66 6 70 22C84 18 96 30 88 42C96 52 86 56 80 54Z" fill="${o.fill || 'currentColor'}"/>`, o);

export const balloon = (o = {}) =>
  svg('0 0 40 100', `<path d="M20 2C8 2 2 12 2 24C2 40 14 52 20 54C26 52 38 40 38 24C38 12 32 2 20 2Z" fill="${o.fill || 'currentColor'}"/>
    <path d="M17 54h6l-3 4Z" fill="${o.fill || 'currentColor'}"/><path d="M20 58q-6 10 0 20t0 20" stroke="var(--muted)" stroke-width="1" fill="none"/>
    <ellipse cx="12" cy="18" rx="3" ry="6" fill="#fff" opacity=".45"/>`, o);

// ───────────────────────── Seals, monograms, dividers ─────────────────────────
function blobPath(r, seed = 3, bumps = 14, amp = 0.06) {
  let d = '';
  const n = 64;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + amp * Math.sin(a * bumps + seed) + amp * 0.6 * Math.sin(a * (bumps / 2 + 1) + seed * 2);
    d += `${i ? 'L' : 'M'}${r2(r * k * Math.cos(a))} ${r2(r * k * Math.sin(a))}`;
  }
  return d + 'Z';
}

/**
 * Wax seal. motif: 'jasmine' | 'khomsa' | 'star' | 'initials'.
 * Colours: --seal (wax), --seal-hi (highlight), --seal-motif.
 */
export function waxSeal(motif = 'star', o = {}) {
  let inner = '';
  if (motif === 'jasmine') inner = `<g style="--petal:var(--seal-motif);--pistil:var(--seal-motif);--petal-line:var(--seal-hi)" opacity=".95">${jasmineGroup(0, -2, 0.95)}</g>`;
  else if (motif === 'khomsa') inner = `<g transform="translate(-21 -25) scale(.42)" style="--bg:var(--seal)">${khomsa({ fill: 'var(--seal-motif)' }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`;
  else if (motif === 'initials') inner = `<text x="0" y="1" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-script)" font-size="${o.small ? 22 : 26}" fill="var(--seal-motif)">${o.text || ''}</text>`;
  else inner = `<polygon points="${starPoints(8, 20, 12.5)}" fill="none" stroke="var(--seal-motif)" stroke-width="2"/><circle r="5" fill="var(--seal-motif)"/>`;
  const body = `
    <path d="${blobPath(46, 2.2, 13, 0.05)}" fill="var(--seal)"/>
    <circle r="34" fill="none" stroke="var(--seal-hi)" stroke-width="2.4" opacity=".7"/>
    <circle r="30" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.2"/>
    <path d="M-30 -14A34 34 0 0 1 -8 -32" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${inner}`;
  return svg('-50 -50 100 100', body, o);
}

export function divider(kind = 'diamond', o = {}) {
  const mid = {
    diamond: `<path d="M60 4L66 10L60 16L54 10Z" fill="currentColor"/>`,
    star: `<polygon points="${starPoints(8, 7, 4.2, 60, 10)}" fill="currentColor"/>`,
    jasmine: `<g style="--petal:currentColor;--pistil:var(--bg);--petal-line:transparent">${jasmineGroup(60, 10, 0.32)}</g>`,
    dots: `<circle cx="52" cy="10" r="1.8" fill="currentColor"/><circle cx="60" cy="10" r="2.8" fill="currentColor"/><circle cx="68" cy="10" r="1.8" fill="currentColor"/>`,
    heart: `<path d="M60 16C52 10 52 4 56 4C58 4 60 6 60 7C60 6 62 4 64 4C68 4 68 10 60 16Z" fill="currentColor"/>`,
  }[kind] || '';
  return svg('0 0 120 20', `<path d="M2 10H46M74 10H118" stroke="currentColor" stroke-width="1"/>${mid}`, { ...o, cls: 'divider ' + (o.cls || '') });
}

/** Corner flourish used to frame cards (rotate via CSS for the other corners). */
export const corner = (kind = 'arabesque', o = {}) => {
  const bodies = {
    arabesque: `<path d="M2 58V20C2 10 10 2 20 2H58" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <path d="M10 50V24C10 16 16 10 24 10H50" fill="none" stroke="currentColor" stroke-width=".8"/>
      <path d="M18 18q10 0 12 10q-10 2-12-10Z" fill="currentColor"/><circle cx="34" cy="34" r="2" fill="currentColor"/>`,
    kilim: `<path d="M2 2H58L52 8H8V52L2 58Z" fill="currentColor"/><path d="M14 14L26 14L14 26Z" fill="currentColor" opacity=".7"/>`,
    floral: `<path d="M4 56C4 26 26 4 56 4" fill="none" stroke="currentColor" stroke-width="1.2"/>${jasmineGroup(16, 16, 0.38)}`,
    line: `<path d="M2 40V2H40" fill="none" stroke="currentColor" stroke-width="1"/>`,
  };
  return svg('0 0 60 60', bodies[kind] || bodies.line, { ...o, cls: 'corner ' + (o.cls || '') });
};

/** Small icons used in the schedule & buttons. */
export const icon = {
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="9.5" r="2.6" fill="currentColor"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/></svg>`,
  music: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6.5" cy="18" r="2.6" fill="currentColor"/><circle cx="16.5" cy="16" r="2.6" fill="currentColor"/></svg>`,
  mute: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".5"/><circle cx="6.5" cy="18" r="2.6" fill="currentColor" opacity=".5"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="2"/></svg>`,
  share: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z" fill="currentColor"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/** Big decorative motif per theme for heroes and thumbnails. */
export function heroMotif(kind, o = {}) {
  switch (kind) {
    case 'mechmoum': return mechmoum(o);
    case 'jasmine': return jasmine(o);
    case 'khomsa': return khomsa(o);
    case 'mandala': return hennaMandala(o);
    case 'star8': return star8(o);
    case 'lantern': return lantern(o);
    case 'crescent': return crescent(o);
    case 'arch': return arch(o);
    case 'paisley': return paisley(o);
    case 'sun': return djerbaScene(o);
    case 'cloud': return cloud(o);
    case 'balloon': return balloon(o);
    default: return star8(o);
  }
}
