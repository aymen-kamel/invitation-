// Lightweight canvas particles (petals, gold dust, stars, confetti, bougainvillea, sand motes).
// One canvas, ~20–50 particles, paused when the tab is hidden, off under prefers-reduced-motion.

const PRESETS = {
  petals: { n: 26, size: [7, 13], vy: [0.35, 0.9], vx: [-0.35, 0.35], spin: true, shape: 'petal' },
  dust: { n: 46, size: [1, 2.8], vy: [-0.25, 0.15], vx: [-0.12, 0.12], twinkle: true, shape: 'dot', glow: true },
  stars: { n: 40, size: [0.8, 2.2], vy: [0, 0], vx: [0, 0], twinkle: true, shape: 'star', glow: true },
  confetti: { n: 34, size: [5, 9], vy: [0.5, 1.2], vx: [-0.4, 0.4], spin: true, shape: 'rect' },
  bougain: { n: 22, size: [8, 14], vy: [0.4, 0.9], vx: [-0.5, 0.2], spin: true, shape: 'petal' },
  sand: { n: 30, size: [1, 2.4], vy: [-0.05, 0.1], vx: [0.15, 0.45], twinkle: true, shape: 'dot', glow: true },
};

const rand = ([a, b]) => a + Math.random() * (b - a);

export function particles(host, kind, colors = ['#fff'], { density = 1, burstAt = null } = {}) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return { burst() {}, stop() {} };
  const p = PRESETS[kind] || PRESETS.dust;
  const c = document.createElement('canvas');
  c.className = 'fx-canvas';
  c.setAttribute('aria-hidden', 'true');
  host.appendChild(c);
  const ctx = c.getContext('2d');
  let W = 0, H = 0, dpr = Math.min(2, devicePixelRatio || 1), raf = 0, alive = true;
  const resize = () => { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize();
  addEventListener('resize', resize);

  const make = (x, y, burst = false) => ({
    x: x ?? Math.random() * W, y: y ?? Math.random() * H,
    s: rand(p.size), vx: burst ? (Math.random() - 0.5) * 7 : rand(p.vx), vy: burst ? -Math.random() * 7 - 1 : rand(p.vy),
    r: Math.random() * 6.28, vr: p.spin ? (Math.random() - 0.5) * 0.06 : 0, t: Math.random() * 6.28,
    col: colors[Math.floor(Math.random() * colors.length)], life: burst ? 1 : null, g: burst ? 0.12 : 0,
  });
  let list = Array.from({ length: Math.round(p.n * density) }, () => make());

  function draw(q) {
    ctx.save();
    ctx.translate(q.x, q.y); ctx.rotate(q.r);
    const a = p.twinkle ? 0.45 + 0.55 * Math.abs(Math.sin(q.t)) : 0.9;
    ctx.globalAlpha = q.life != null ? Math.max(0, q.life) * a : a;
    ctx.fillStyle = q.col;
    if (p.glow) { ctx.shadowColor = q.col; ctx.shadowBlur = q.s * 4; }
    if (p.shape === 'petal') { ctx.beginPath(); ctx.ellipse(0, 0, q.s * 0.45, q.s, 0, 0, 6.28); ctx.fill(); ctx.globalAlpha *= 0.35; ctx.fillStyle = '#000'; ctx.fillRect(-0.4, -q.s * 0.8, 0.8, q.s * 1.6); }
    else if (p.shape === 'rect') ctx.fillRect(-q.s / 2, -q.s / 4, q.s, q.s / 2);
    else if (p.shape === 'star') { ctx.beginPath(); for (let i = 0; i < 8; i++) { const rr = i % 2 ? q.s * 0.35 : q.s * 1.6; ctx.lineTo(Math.cos((i * Math.PI) / 4) * rr, Math.sin((i * Math.PI) / 4) * rr); } ctx.fill(); }
    else { ctx.beginPath(); ctx.arc(0, 0, q.s, 0, 6.28); ctx.fill(); }
    ctx.restore();
  }
  function frame() {
    if (!alive) return;
    ctx.clearRect(0, 0, W, H);
    for (const q of list) {
      q.x += q.vx + Math.sin(q.t) * 0.25; q.y += q.vy; q.vy += q.g; q.r += q.vr; q.t += 0.03;
      if (q.life != null) { q.life -= 0.012; q.vx *= 0.985; }
      else {
        if (q.y > H + 20) { q.y = -20; q.x = Math.random() * W; }
        if (q.y < -30) { q.y = H + 10; }
        if (q.x > W + 20) q.x = -20; if (q.x < -20) q.x = W + 20;
      }
      draw(q);
    }
    list = list.filter((q) => q.life == null || q.life > 0);
    raf = requestAnimationFrame(frame);
  }
  const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && alive) raf = requestAnimationFrame(frame); };
  document.addEventListener('visibilitychange', vis);
  raf = requestAnimationFrame(frame);
  return {
    burst(x = W / 2, y = H / 2, n = 60) { for (let i = 0; i < n; i++) list.push(make(x, y, true)); },
    stop() { alive = false; cancelAnimationFrame(raf); removeEventListener('resize', resize); document.removeEventListener('visibilitychange', vis); c.remove(); },
  };
}

/** 3D tilt that follows the pointer (desktop) or device orientation (phones), with an idle sway. */
export function tilt(el, { max = 7 } = {}) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0, active = false, t0 = performance.now();
  const onMove = (e) => { const r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; active = true; };
  const onOri = (e) => { if (e.gamma == null) return; tx = Math.max(-1, Math.min(1, e.gamma / 25)); ty = Math.max(-1, Math.min(1, (e.beta - 45) / 25)); active = true; };
  addEventListener('pointermove', onMove);
  addEventListener('deviceorientation', onOri);
  const loop = (now) => {
    const idle = active ? 0 : 1;
    const sx = Math.sin((now - t0) / 2600) * 0.45 * idle, sy = Math.cos((now - t0) / 3400) * 0.35 * idle;
    x += ((active ? tx : sx) - x) * 0.06; y += ((active ? ty : sy) - y) * 0.06;
    el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
    el.style.setProperty('--px', x.toFixed(3));
    el.style.setProperty('--py', y.toFixed(3));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', onMove); removeEventListener('deviceorientation', onOri); };
}
