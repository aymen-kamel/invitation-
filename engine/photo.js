// Photo opening: the template's generated visuals (openings/<id>/closed.webp, open.mp4, seal.webp)
// brought to life with 3D tilt, parallax, sheen and particles.
// Modes: 'seal' (dive into the seal), 'doors' (photo splits and swings open in 3D),
// 'curtains' (photo halves slide apart), 'zoom' (walk through the scene).
// If openings/<id>/open.mp4 exists it plays instead, then fades into the invitation.
import { esc } from './sections.js';
import { particles, tilt } from './particles.js';

export const assetBase = (tpl) => `/openings/${tpl.id}`;

function hasVideo(src) {
  return new Promise((resolve) => {
    const v = document.createElement('video');
    v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = src;
    const done = (ok) => { v.onloadeddata = v.onerror = null; resolve(ok ? v : null); };
    v.onloadeddata = () => done(true);
    v.onerror = () => done(false);
    setTimeout(() => done(false), 2500);
  });
}

export async function photoOpening(stage, ctx) {
  const { tpl, t, reduced } = ctx;
  const ph = tpl.photo;
  const base = assetBase(tpl);
  const [fx, fy] = ph.focal || [0.5, 0.5];
  const img = `${base}/closed.webp`;
  const mode = ph.mode || 'zoom';
  const half = (side) => `<div class="ph-half ph-${side}"><div class="ph-half-img" style="background-image:url('${img}')"></div><span class="ph-edge"></span></div>`;

  stage.className = `opening op-photo ph-mode-${mode}${reduced ? ' reduced' : ''}`;
  stage.dataset.hint = 'tapToOpen';
  stage.style.setProperty('--fx', `${fx * 100}%`);
  stage.style.setProperty('--fy', `${fy * 100}%`);
  stage.style.setProperty('--closed', `url('${img}')`);
  const split = ph.split || 0.5; // where the photo divides (door seam)
  stage.style.setProperty('--split', `${split * 100}%`);
  stage.style.setProperty('--l-img', `${100 / split}%`);
  stage.style.setProperty('--r-img', `${100 / (1 - split)}%`);
  stage.innerHTML = `
    <div class="op-scene ph-scene" role="button" tabindex="0" aria-label="${esc(t('tapToOpen'))}">
      <div class="ph-behind" style="background-image:url('${base}/bg.webp')">
        <div class="ph-behind-names"><p class="op-who">${esc(ctx.who)}</p></div>
      </div>
      <div class="ph-stage3d">
        ${mode === 'doors' || mode === 'curtains' ? half('l') + half('r') : `<div class="ph-img" style="background-image:url('${img}')"></div>`}
        <div class="ph-sheen" aria-hidden="true"></div>
        <div class="ph-vignette" aria-hidden="true"></div>
      </div>
      <div class="ph-flash" aria-hidden="true"></div>
      <div class="ph-target" aria-hidden="true"><span></span><span></span></div>
    </div>
    <p class="op-hint" aria-hidden="true"><span class="op-tap">${esc(t('tapToOpen'))}</span><small>♪ ${esc(t('soundHint'))}</small></p>`;

  const scene = stage.querySelector('.ph-scene');
  const s3d = stage.querySelector('.ph-stage3d');
  const untilt = tilt(scene, { max: mode === 'doors' ? 5 : 7 });
  const fx1 = particles(scene, ph.particles || 'dust', ph.colors || ['#f3dc9b'], { density: 1 });
  const videoP = hasVideo(`${base}/open.mp4`);
  requestAnimationFrame(() => stage.classList.add('ready'));
  setTimeout(() => scene.focus({ preventScroll: true }), 60);

  await new Promise((resolve) => {
    const go = (e) => {
      if (e.type === 'keydown' && !['Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      scene.removeEventListener('click', go); scene.removeEventListener('keydown', go);
      ctx.unlock();
      resolve();
    };
    scene.addEventListener('click', go); scene.addEventListener('keydown', go);
  });

  untilt();
  const video = reduced ? null : await Promise.race([videoP, new Promise((r) => setTimeout(() => r(null), 150))]);
  if (video) {
    video.className = 'ph-video';
    scene.appendChild(video);
    stage.classList.add('is-video');
    await video.play().catch(() => {});
    await new Promise((r) => { video.onended = r; setTimeout(r, (video.duration || 6) * 1000 + 300); });
    fx1.stop();
    return;
  }
  const r = scene.getBoundingClientRect();
  fx1.burst(r.width * fx, r.height * fy, mode === 'seal' ? 70 : 40);
  stage.classList.add('is-open');
  s3d.style.transformOrigin = `${fx * 100}% ${fy * 100}%`;
  await new Promise((res) => setTimeout(res, reduced ? 250 : ({ doors: 2300, curtains: 2000, seal: 1900, zoom: 2100 }[mode] || 2000)));
  fx1.stop();
}
