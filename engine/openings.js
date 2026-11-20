// Ten original opening interactions. Each builds a scene inside #opening, waits for a tap
// (or Enter/Space), calls ctx.unlock() inside that gesture (audio), plays its animation, resolves.
import { esc } from './sections.js';
import { waxSeal, doorLeaf, hennaMandala, lantern, crescent, djerbaScene, patternFill, starPoints, balloon, star5, mechmoum } from './ornaments.js';

function gate(stage, ctx, kind, scene, { duration, hint } = {}) {
  const { t, reduced } = ctx;
  stage.className = `opening op-${kind}${reduced ? ' reduced' : ''}`;
  stage.dataset.hint = hint || 'tapToOpen';
  stage.innerHTML = `
    <div class="op-scene" role="button" tabindex="0" aria-label="${esc(t('tapToOpen'))}">${scene}</div>
    <p class="op-hint" aria-hidden="true"><span class="op-tap">${esc(t(hint || 'tapToOpen'))}</span><small>♪ ${esc(t('soundHint'))}</small></p>`;
  const hit = stage.querySelector('.op-scene');
  requestAnimationFrame(() => stage.classList.add('ready'));
  setTimeout(() => hit.focus({ preventScroll: true }), 60);
  return new Promise((resolve) => {
    let done = false;
    const go = (e) => {
      if (done) return;
      if (e.type === 'keydown' && !['Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      done = true;
      ctx.unlock();
      stage.classList.add('is-open');
      setTimeout(resolve, reduced ? 250 : duration);
    };
    hit.addEventListener('click', go);
    hit.addEventListener('keydown', go);
  });
}

const preview = (ctx, extra = '') => `<div class="op-preview">${extra}<p class="op-who">${esc(ctx.who)}</p></div>`;

// 1 · Jasmin — envelope sealed with a mechmoum seal; flap opens, card rises.
function envelope(stage, ctx) {
  const scene = `
    <div class="env">
      <div class="env-back"></div>
      <div class="env-card">${preview(ctx, `<div class="op-mini">${mechmoum({})}</div>`)}</div>
      <div class="env-pocket"></div>
      <div class="env-flap"><div class="env-flap-in"></div></div>
      <div class="env-seal">${waxSeal(ctx.tpl.openingOpts?.seal || 'jasmine')}</div>
    </div>`;
  return gate(stage, ctx, 'envelope', scene, { duration: 2100 });
}

// 2 · Sidi Bou — studded blue double door in a whitewashed arch swings open.
function doors(stage, ctx) {
  let bougain = '';
  for (let i = 0; i < 26; i++) {
    const a = Math.PI * (i / 25), r = 52 + (i % 3) * 5;
    bougain += `<circle cx="${(60 + r * Math.cos(a) * -1).toFixed(1)}" cy="${(64 - r * Math.sin(a) * 0.95).toFixed(1)}" r="${3 + (i % 4)}" fill="var(--bougain)" opacity="${0.75 + (i % 3) * 0.08}"/>`;
  }
  const scene = `
    <div class="door-wall">
      <div class="door-frame">
        <div class="door-behind">${preview(ctx)}</div>
        <div class="leaf leaf-l">${doorLeaf('l')}</div>
        <div class="leaf leaf-r">${doorLeaf('r')}</div>
      </div>
      <svg class="bougain" viewBox="0 0 120 70" aria-hidden="true">${bougain}<g fill="var(--leaf)">${Array.from({ length: 10 }, (_, i) => `<ellipse cx="${10 + i * 11}" cy="${30 - Math.sin((i / 9) * Math.PI) * 26}" rx="3.2" ry="1.6" transform="rotate(${i * 23} ${10 + i * 11} ${30 - Math.sin((i / 9) * Math.PI) * 26})"/>`).join('')}</g></svg>
    </div>`;
  return gate(stage, ctx, 'doors', scene, { duration: 2300 });
}

// 3 · Henna Night — a henna mandala draws itself; on tap it blooms and the curtains part.
function henna(stage, ctx) {
  const scene = `
    <div class="hn-curtain hn-l">${patternFill('henna')}</div>
    <div class="hn-curtain hn-r">${patternFill('henna')}</div>
    <div class="hn-center">
      <div class="hn-mandala">${hennaMandala({})}</div>
      <p class="hn-title">${esc(ctx.t.kind('henna'))}</p>
    </div>`;
  return gate(stage, ctx, 'henna', scene, { duration: 1900 });
}

// 4 · Khomsa — black gatefold card held by a gold khomsa wax seal that splits in two.
function sealBreak(stage, ctx) {
  const seal = waxSeal('khomsa');
  const scene = `
    <div class="gf">
      <div class="gf-inside">${preview(ctx)}</div>
      <div class="gf-panel gf-l"><div class="gf-border"></div></div>
      <div class="gf-panel gf-r"><div class="gf-border"></div></div>
      <div class="gf-seal gf-seal-l">${seal}</div>
      <div class="gf-seal gf-seal-r">${seal}</div>
    </div>`;
  return gate(stage, ctx, 'seal', scene, { duration: 1900 });
}

// 5 · Kairouan — a rolled kilim unrolls down the screen revealing a medallion with the names.
function carpet(stage, ctx) {
  const med = `<svg class="cp-medal" viewBox="-60 -60 120 120" aria-hidden="true"><polygon points="${starPoints(8, 56, 40)}" fill="var(--pat-b)"/><polygon points="${starPoints(8, 44, 31)}" fill="var(--pat-a)"/><circle r="28" fill="var(--paper)"/></svg>`;
  const scene = `
    <div class="cp">
      <div class="cp-rug">
        ${patternFill('kilim')}
        <div class="cp-fringe cp-fringe-t"></div><div class="cp-fringe cp-fringe-b"></div>
        <div class="cp-center">${med}<p class="op-who">${esc(ctx.initials.split('').join(' & '))}</p></div>
      </div>
      <div class="cp-roll">${patternFill('kilim')}</div>
    </div>`;
  return gate(stage, ctx, 'carpet', scene, { duration: 2700 });
}

// 6 · Medina Nights — dim lanterns under a crescent; tap lights them one by one.
function lanterns(stage, ctx) {
  const scene = `
    <div class="ln-sky">${patternFill('stars')}</div>
    <div class="ln-moon">${crescent({})}</div>
    <div class="ln-row">
      <div class="ln ln-1">${lantern({})}</div>
      <div class="ln ln-2">${lantern({})}</div>
      <div class="ln ln-3">${lantern({})}</div>
    </div>
    <div class="ln-skyline" aria-hidden="true"></div>
    ${preview(ctx)}`;
  return gate(stage, ctx, 'lanterns', scene, { duration: 2400, hint: 'lightsOn' });
}

// 7 · Djerba — dawn over the sea framed by a terracotta arch; the sun rises and we walk through.
function sunrise(stage, ctx) {
  const scene = `
    <div class="dj-scene">${djerbaScene({})}</div>
    <svg class="dj-arch" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><mask id="dj-hole"><rect width="200" height="300" fill="#fff"/><path d="M48 300V150C48 108 72 80 100 74C128 80 152 108 152 150V300Z" fill="#000"/></mask></defs>
      <rect width="200" height="300" fill="var(--wall)" mask="url(#dj-hole)"/>
      <path d="M48 300V150C48 108 72 80 100 74C128 80 152 108 152 150V300" fill="none" stroke="var(--wall-line)" stroke-width="2.4"/>
      <path d="M40 300V150C40 102 68 70 100 64C132 70 160 102 160 150V300" fill="none" stroke="var(--wall-line)" stroke-width="1" opacity=".6"/>
    </svg>
    ${preview(ctx)}`;
  return gate(stage, ctx, 'sunrise', scene, { duration: 2300 });
}

// 8 · Blush Minimal — a folded typographic card; the cover turns like a page.
function fold(stage, ctx) {
  const scene = `
    <div class="fd">
      <div class="fd-inside">${preview(ctx)}</div>
      <div class="fd-cover"><div class="fd-front"><span class="fd-mono">${esc(ctx.initials.split('').join(' · '))}</span><span class="fd-line"></span><span class="fd-small">${esc(ctx.t('tapToOpen'))}</span></div><div class="fd-backface"></div></div>
    </div>`;
  return gate(stage, ctx, 'fold', scene, { duration: 1800 });
}

// 9 · Monogram Ivory — tri-fold letter closed with an initials wax seal.
function letter(stage, ctx) {
  const scene = `
    <div class="lt">
      <div class="lt-mid">${preview(ctx)}</div>
      <div class="lt-bottom"></div>
      <div class="lt-top"></div>
      <div class="lt-seal">${waxSeal('initials', { text: esc(ctx.initials) })}</div>
    </div>`;
  return gate(stage, ctx, 'letter', scene, { duration: 2500 });
}

// 10 · Baby Farha — a ribboned gift box; the lid pops and balloons & stars float out.
function giftbox(stage, ctx) {
  const colors = ['var(--accent)', 'var(--accent2)', 'var(--pat-c)'];
  const bits = Array.from({ length: 14 }, (_, i) => {
    const ang = -160 + (i / 13) * 140, dist = 120 + (i % 4) * 40;
    const x = Math.cos((ang * Math.PI) / 180) * dist, y = Math.sin((ang * Math.PI) / 180) * dist - 60;
    const body = i % 3 === 0 ? balloon({ fill: colors[i % 3] }) : star5({ fill: colors[i % 3] });
    return `<span class="gb-bit${i % 3 === 0 ? ' gb-balloon' : ''}" style="--x:${x.toFixed(0)}px;--y:${y.toFixed(0)}px;--d:${(i % 5) * 60}ms">${body}</span>`;
  }).join('');
  const scene = `
    <div class="gb">
      <div class="gb-bits">${bits}</div>
      <div class="gb-lid"><span class="gb-bow"></span></div>
      <div class="gb-box"><span class="gb-ribbon"></span></div>
    </div>
    ${preview(ctx)}`;
  return gate(stage, ctx, 'gift', scene, { duration: 2000 });
}

export const OPENINGS = { envelope, doors, henna, sealBreak, carpet, lanterns, sunrise, fold, letter, giftbox };
