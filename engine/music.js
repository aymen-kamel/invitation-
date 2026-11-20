// Background music: uploaded file, YouTube link, or (demos) an original melody synthesised in the browser.
// Browsers only allow audio after a user gesture, so start() must be called from the "open" tap.

export function createMusic(cfg, hooks = {}) {
  if (!cfg || cfg.type === 'none') return null;
  if (cfg.type === 'file' && cfg.url) return fileMusic(cfg.url, hooks);
  if (cfg.type === 'youtube' && cfg.url) return youtubeMusic(cfg.url, hooks);
  return synthMusic(cfg.mood || 'oud');
}

function fileMusic(url, hooks) {
  const a = new Audio(url);
  a.loop = true; a.preload = 'none'; a.volume = 0.7;
  a.addEventListener('error', () => hooks.onUnavailable?.());
  const play = () => a.play().then(() => hooks.onChange?.(), () => hooks.onBlocked?.());
  return { start: play, pause: () => { a.pause(); hooks.onChange?.(); }, resume: play, get playing() { return !a.paused; } };
}

export function youtubeId(url) {
  const m = String(url).match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/) || String(url).match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

/**
 * Hidden YouTube player (privacy-enhanced youtube-nocookie.com host), looped.
 * Loaded on page load so it is ready when the guest taps "open" (the tap is the user gesture
 * browsers require for sound). If the video is removed / not embeddable, onUnavailable fires
 * and the music button disappears silently.
 */
function youtubeMusic(url, hooks) {
  const id = youtubeId(url);
  if (!id) { queueMicrotask(() => hooks.onUnavailable?.()); return null; }
  let player = null, ready = false, wantPlay = false, playing = false, dead = false;
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = 'position:fixed;width:2px;height:2px;left:0;bottom:0;opacity:.01;pointer-events:none;z-index:-1';
  host.innerHTML = '<div id="yt-music"></div>';
  document.body.appendChild(host);
  const fail = () => { if (dead) return; dead = true; playing = false; host.remove(); hooks.onUnavailable?.(); };
  const boot = () => {
    player = new window.YT.Player('yt-music', {
      host: 'https://www.youtube-nocookie.com',
      videoId: id, width: 2, height: 2,
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, loop: 1, playlist: id, playsinline: 1, rel: 0, iv_load_policy: 3, enablejsapi: 1, origin: location.origin },
      events: {
        onReady: () => { ready = true; player.setVolume(80); if (wantPlay) player.playVideo(); },
        onStateChange: (e) => {
          const P = window.YT.PlayerState;
          if (e.data === P.PLAYING) { playing = true; hooks.onChange?.(); }
          else if (e.data === P.PAUSED) { playing = false; hooks.onChange?.(); }
          else if (e.data === P.ENDED) player.playVideo();
        },
        // 2 bad id, 5 html5 error, 100 removed/private, 101 & 150 embedding disabled
        onError: fail,
      },
    });
  };
  if (window.YT?.Player) boot();
  else {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); boot(); };
    const sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; sc.async = true;
    sc.onerror = fail;
    document.head.appendChild(sc);
  }
  return {
    start() { if (dead) return; wantPlay = true; if (ready) player.playVideo(); },
    pause() { wantPlay = false; if (ready) player.pauseVideo(); playing = false; hooks.onChange?.(); },
    resume() { this.start(); },
    get playing() { return playing; },
    get wanted() { return wantPlay; },
    get dead() { return dead; },
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
