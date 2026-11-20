// Background music: uploaded file, YouTube link, or (demos) an original melody synthesised in the browser.
// Browsers only allow audio after a user gesture, so start() must be called from the "open" tap.

export function createMusic(cfg) {
  if (!cfg || cfg.type === 'none') return null;
  if (cfg.type === 'file' && cfg.url) return fileMusic(cfg.url);
  if (cfg.type === 'youtube' && cfg.url) return youtubeMusic(cfg.url);
  return synthMusic(cfg.mood || 'oud');
}

function fileMusic(url) {
  const a = new Audio(url);
  a.loop = true; a.preload = 'none'; a.volume = 0.7;
  return { start: () => a.play().catch(() => {}), pause: () => a.pause(), resume: () => a.play().catch(() => {}), get playing() { return !a.paused; } };
}

function youtubeId(url) {
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function youtubeMusic(url) {
  const id = youtubeId(url);
  if (!id) return synthMusic('oud');
  let player = null, ready = false, wantPlay = false, playing = false;
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;width:1px;height:1px;left:-10px;bottom:0;opacity:0;pointer-events:none';
  host.innerHTML = '<div id="yt-music"></div>';
  document.body.appendChild(host);
  const boot = () => {
    player = new window.YT.Player('yt-music', {
      videoId: id, width: 1, height: 1,
      playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: id, playsinline: 1 },
      events: { onReady: () => { ready = true; if (wantPlay) { player.playVideo(); playing = true; } } },
    });
  };
  if (window.YT?.Player) boot();
  else {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); boot(); };
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.async = true; document.head.appendChild(s);
  }
  return {
    start() { wantPlay = true; if (ready) { player.playVideo(); playing = true; } },
    pause() { wantPlay = false; if (ready) player.pauseVideo(); playing = false; },
    resume() { this.start(); },
    get playing() { return playing; },
  };
}

// Original, algorithmic melody (no recorded asset): a plucked "oud-like" voice over a soft drone,
// wandering in a hijaz-flavoured scale. Moods change scale and tempo.
const MOODS = {
  oud: { scale: [0, 1, 4, 5, 7, 8, 10, 12], root: 196, bpm: 84, wave: 'triangle' },
  sweet: { scale: [0, 2, 4, 7, 9, 12, 14], root: 262, bpm: 96, wave: 'sine' },
  night: { scale: [0, 2, 3, 5, 7, 8, 11, 12], root: 174.6, bpm: 70, wave: 'triangle' },
  lullaby: { scale: [0, 4, 7, 9, 12, 16], root: 330, bpm: 72, wave: 'sine' },
};

function synthMusic(moodName) {
  const mood = MOODS[moodName] || MOODS.oud;
  let ctx = null, master = null, timer = null, step = 0, playing = false, drone = null;
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const beat = 60 / mood.bpm;
  // a fixed 16-step phrase, generated once so it repeats like a real motif
  const phrase = Array.from({ length: 16 }, (_, i) => (i % 4 === 3 && rnd() < 0.5 ? null : mood.scale[Math.floor(rnd() * mood.scale.length)]));

  function pluck(freq, t, dur = beat * 1.8, vol = 0.22) {
    const o = ctx.createOscillator(); const g = ctx.createGain(); const f = ctx.createBiquadFilter();
    o.type = mood.wave; o.frequency.value = freq;
    f.type = 'lowpass'; f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(500, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function tick() {
    const t = ctx.currentTime + 0.05;
    const n = phrase[step % phrase.length];
    const bar = Math.floor(step / 16) % 4;
    const transpose = [0, 0, 5, -2][bar];
    if (n != null) pluck(mood.root * 2 ** ((n + transpose) / 12), t);
    if (step % 8 === 0) pluck(mood.root / 2 * 2 ** (transpose / 12), t, beat * 4, 0.16);
    step++;
  }
  return {
    start() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
        drone = ctx.createOscillator(); const dg = ctx.createGain(); drone.type = 'sine'; drone.frequency.value = mood.root / 2; dg.gain.value = 0.035; drone.connect(dg).connect(master); drone.start();
      }
      ctx.resume(); playing = true;
      if (!timer) timer = setInterval(tick, beat * 500);
    },
    pause() { playing = false; clearInterval(timer); timer = null; ctx?.suspend(); },
    resume() { this.start(); },
    get playing() { return playing; },
  };
}
