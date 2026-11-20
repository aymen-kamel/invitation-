// Farha template library. A template = palette + fonts + ornaments + opening + section order.
// All fonts are Google Fonts (SIL Open Font License). All artwork is drawn in engine/ornaments.js.

export const fontsHref = (gf) => `https://fonts.googleapis.com/css2?family=${gf.join('&family=')}&display=swap`;

// Suggested songs (YouTube embeds, never bundled as files). Each client can replace it with their own link.
// Checked 2026-11-20: all four play when embedded. "Odkhoula Omri" (qnJrE0X_tqE) was dropped: it never starts in an embed.
export const SONG_SUGGESTIONS = [
  { id: 'aktY1vejF9Y', title: 'Hussain Al Jassmi – Fostanek Al Abyad' },
  { id: '7wELp5GGJcI', title: 'Zaffa – Hathihi Fatinati (mix)' },
  { id: '1odRg-2BfXs', title: 'Bism Khaleq El Hob Nabda (bride entrance)' },
  { id: 'hzJHoSePZJU', title: 'Hanian Liman Asbahat Min Nasibih (bride entrance)' },
];

export const STYLE_FAMILIES = {
  floral: { fr: 'Floral', ar: 'زهري', en: 'Floral' },
  mediterranean: { fr: 'Méditerranée', ar: 'متوسطي', en: 'Mediterranean' },
  traditional: { fr: 'Tradition tunisienne', ar: 'تقليدي تونسي', en: 'Tunisian tradition' },
  night: { fr: 'Luxe de nuit', ar: 'فخامة الليل', en: 'Night luxury' },
  minimal: { fr: 'Minimal', ar: 'بسيط', en: 'Minimal' },
  classic: { fr: 'Classique', ar: 'كلاسيكي', en: 'Classic' },
  playful: { fr: 'Tendre', ar: 'مرح', en: 'Playful' },
};
export const TIERS = {
  essentiel: { fr: 'Essentiel', price: 'dès 24 DT' },
  signature: { fr: 'Signature', price: 'dès 56 DT' },
  prestige: { fr: 'Prestige', price: 'dès 86 DT' },
};

const sealGold = { seal: '#b8913f', 'seal-hi': '#e8cd88', 'seal-motif': '#3a2a10' };

export const TEMPLATES = [
  {
    id: 'jasmin', name: { fr: 'Jasmin', ar: 'ياسمين', en: 'Jasmine' },
    tagline: { fr: 'Enveloppe scellée d’un mechmoum de jasmin', ar: 'ظرف مختوم بمشموم الياسمين', en: 'An envelope sealed with a jasmine posy' },
    events: ['wedding', 'engagement', 'contract'], style: 'floral', tier: 'prestige', demo: 'wedding',
    opening: 'envelope', openingOpts: { seal: 'jasmine' }, motif: 'mechmoum', divider: 'jasmine', corner: 'floral', pattern: 'dots', mood: 'sweet', song: 'https://www.youtube.com/watch?v=aktY1vejF9Y',
    photo: { mode: 'seal', focal: [0.52, 0.58], particles: 'petals', colors: ['#ffffff', '#f4f1e2'] },
    palette: {
      bg: '#eef2e8', paper: '#fdfdf8', ink: '#24331f', muted: '#66745e', accent: '#5f7d4e', accent2: '#2f4a2a', line: 'rgba(47,74,42,.16)', 'btn-ink': '#fff', card: 'rgba(255,255,255,.7)',
      'pat-bg': '#eef2e8', 'pat-a': 'rgba(95,125,78,.28)', 'pat-b': 'rgba(95,125,78,.12)', 'pat-c': '#d7c15a',
      env: '#f6f3e7', 'env-dark': '#e2dcc6', liner: '#5f7d4e', seal: '#2f4a2a', 'seal-hi': '#7d9c6c', 'seal-motif': '#f6f1dc',
      petal: '#ffffff', pistil: '#d7c15a', leaf: '#5f7d4e', 'petal-line': 'rgba(47,74,42,.18)',
    },
    fonts: { display: "'Cormorant Garamond', Georgia, serif", script: "'Pinyon Script', cursive", body: "'Cormorant Garamond', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Aref Ruqaa', 'Amiri', serif" },
    gf: ['Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Pinyon+Script', 'Amiri:wght@400;700', 'Aref+Ruqaa:wght@400;700'],
  },
  {
    id: 'sidibou', name: { fr: 'Sidi Bou', ar: 'سيدي بو', en: 'Sidi Bou' },
    tagline: { fr: 'Une porte bleue cloutée s’ouvre sur la mer', ar: 'باب أزرق مسمّر ينفتح على البحر', en: 'A studded blue door opens onto the sea' },
    events: ['wedding', 'engagement'], style: 'mediterranean', tier: 'prestige', demo: 'wedding',
    opening: 'doors', motif: 'arch', divider: 'star', corner: 'line', pattern: 'mashrabiya', mood: 'oud', song: 'https://www.youtube.com/watch?v=7wELp5GGJcI',
    photo: { mode: 'doors', focal: [0.46, 0.55], split: 0.463, particles: 'bougain', colors: ['#c51a78', '#e0479a', '#f06bb0'] },
    palette: {
      bg: '#e6f0f6', paper: '#ffffff', ink: '#12304a', muted: '#557089', accent: '#1f6fb2', accent2: '#0d3f6b', line: 'rgba(13,63,107,.15)', 'btn-ink': '#fff', card: 'rgba(230,240,246,.5)',
      'pat-bg': '#e6f0f6', 'pat-a': 'rgba(31,111,178,.16)', 'pat-b': 'rgba(31,111,178,.1)', 'pat-c': 'rgba(31,111,178,.2)',
      door: '#1d5fa5', 'door-line': '#ffffff', stud: '#162430', wall: '#f8f7f1', bougain: '#c51a78', leaf: '#3f7a3a', 'sky-top': '#a8d8f2',
    },
    fonts: { display: "'Marcellus', Georgia, serif", script: "'Parisienne', cursive", body: "'Marcellus', Georgia, serif", ar: "'El Messiri', sans-serif", arDisplay: "'El Messiri', sans-serif" },
    gf: ['Marcellus', 'Parisienne', 'El+Messiri:wght@400;600'],
  },
  {
    id: 'henna', name: { fr: 'Nuit du Henné', ar: 'ليلة الحنّة', en: 'Henna Night' },
    tagline: { fr: 'Un mandala de henné se dessine, les rideaux s’ouvrent', ar: 'نقش حنّة يُرسم وتنفتح الستائر', en: 'A henna mandala draws itself, curtains part' },
    events: ['henna', 'outia'], style: 'traditional', tier: 'essentiel', demo: 'henna',
    opening: 'henna', motif: 'mandala', divider: 'dots', corner: 'arabesque', pattern: 'henna', mood: 'oud', song: 'https://www.youtube.com/watch?v=hzJHoSePZJU',
    photo: { mode: 'curtains', focal: [0.5, 0.45], particles: 'dust', colors: ['#f3d27a', '#c9a45c'] },
    palette: {
      bg: '#4a0916', paper: '#fbf3ea', ink: '#3b0d14', muted: '#7a5752', accent: '#b8893b', accent2: '#4a0916', line: 'rgba(74,9,22,.16)', 'btn-ink': '#fff', card: 'rgba(255,255,255,.55)',
      'pat-bg': '#4a0916', 'pat-a': 'rgba(184,137,59,.5)', 'pat-b': 'rgba(184,137,59,.3)', 'pat-c': 'rgba(184,137,59,.4)',
    },
    fonts: { display: "'Playfair Display', Georgia, serif", script: "'Great Vibes', cursive", body: "'Playfair Display', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Aref Ruqaa', serif" },
    gf: ['Playfair+Display:ital,wght@0,400;0,600;1,400', 'Great+Vibes', 'Amiri:wght@400;700', 'Aref+Ruqaa:wght@400;700'],
  },
  {
    id: 'khomsa', name: { fr: 'Khomsa', ar: 'خمسة', en: 'Khomsa' },
    tagline: { fr: 'Or sur noir, sceau de cire à la khomsa', ar: 'ذهب على أسود، ختم شمع بالخمسة', en: 'Gold on black, a khomsa wax seal' },
    events: ['wedding', 'engagement', 'contract'], style: 'night', tier: 'prestige', demo: 'wedding',
    opening: 'sealBreak', motif: 'khomsa', divider: 'star', corner: 'arabesque', pattern: 'zellige', mood: 'night', song: 'https://www.youtube.com/watch?v=1odRg-2BfXs',
    photo: { mode: 'doors', focal: [0.5, 0.46], split: 0.5, particles: 'dust', colors: ['#f3d27a', '#c9a45c'], overlay: 'rgba(13,11,9,.35)' },
    palette: {
      bg: '#0d0b09', paper: '#15120e', ink: '#f1e6cf', muted: '#b7a98c', accent: '#c9a45c', accent2: '#e6c77f', line: 'rgba(201,164,92,.24)', 'btn-ink': '#15120e', card: 'rgba(255,255,255,.035)',
      'pat-bg': '#0d0b09', 'pat-a': 'rgba(201,164,92,.16)', 'pat-b': 'rgba(201,164,92,.34)', 'pat-c': 'rgba(201,164,92,.1)',
      ...sealGold,
    },
    fonts: { display: "'Cinzel', Georgia, serif", script: "'Italianno', cursive", body: "'Cormorant Garamond', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Reem Kufi', sans-serif" },
    gf: ['Cinzel:wght@400;600', 'Italianno', 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Amiri:wght@400;700', 'Reem+Kufi:wght@400;600'],
  },
  {
    id: 'kairouan', name: { fr: 'Kairouan', ar: 'القيروان', en: 'Kairouan' },
    tagline: { fr: 'Un tapis de Kairouan se déroule', ar: 'زربية قيروانية تنبسط أمامكم', en: 'A Kairouan rug unrolls' },
    events: ['wedding', 'engagement', 'contract'], style: 'traditional', tier: 'signature', demo: 'wedding',
    opening: 'carpet', motif: 'star8', divider: 'star', corner: 'kilim', pattern: 'kilim', mood: 'oud', song: 'https://www.youtube.com/watch?v=7wELp5GGJcI',
    photo: { mode: 'zoom', focal: [0.7, 0.6], particles: 'sand', colors: ['#ffe3a8', '#fff3d6'] },
    palette: {
      bg: '#efe1cc', paper: '#fbf4e8', ink: '#3d2216', muted: '#7f5f49', accent: '#a9472a', accent2: '#5e2418', line: 'rgba(94,36,24,.18)', 'btn-ink': '#fff', card: 'rgba(255,255,255,.5)',
      'pat-bg': '#8f2f1f', 'pat-a': '#e0b25f', 'pat-b': '#1f3b5a', 'pat-c': '#f4ead6',
    },
    fonts: { display: "'Cormorant SC', Georgia, serif", script: "'Tangerine', cursive", body: "'Cormorant Garamond', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Reem Kufi', sans-serif" },
    gf: ['Cormorant+SC:wght@400;600', 'Tangerine:wght@400;700', 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Amiri:wght@400;700', 'Reem+Kufi:wght@400;600'],
  },
  {
    id: 'medina', name: { fr: 'Nuits de la Médina', ar: 'ليالي المدينة', en: 'Medina Nights' },
    tagline: { fr: 'Ciel étoilé, lanternes qui s’allument une à une', ar: 'سماء مرصّعة بالنجوم وفوانيس تضيء', en: 'Starry sky, lanterns lighting one by one' },
    events: ['wedding', 'henna', 'engagement'], style: 'night', tier: 'signature', demo: 'wedding',
    opening: 'lanterns', motif: 'lantern', divider: 'star', corner: 'arabesque', pattern: 'stars', mood: 'night', song: 'https://www.youtube.com/watch?v=1odRg-2BfXs',
    photo: { mode: 'zoom', focal: [0.62, 0.62], particles: 'dust', colors: ['#ffc65c', '#ffe3a8'], overlay: 'rgba(11,21,48,.25)' },
    palette: {
      bg: '#0f1a33', paper: '#13203f', ink: '#f3ead8', muted: '#aab3c8', accent: '#e2b659', accent2: '#f0cf86', line: 'rgba(226,182,89,.22)', 'btn-ink': '#0f1a33', card: 'rgba(255,255,255,.04)',
      'pat-bg': '#0f1a33', 'pat-a': 'rgba(255,255,255,.55)', 'pat-b': '#e2b659', 'pat-c': 'rgba(226,182,89,.3)',
      night: '#0b1530', 'night-2': '#060c1f', glow: '#ffc65c', metal: '#e2b659', glass: 'rgba(255,198,92,.28)',
    },
    fonts: { display: "'Cormorant Garamond', Georgia, serif", script: "'Italianno', cursive", body: "'Cormorant Garamond', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Aref Ruqaa', serif" },
    gf: ['Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Italianno', 'Amiri:wght@400;700', 'Aref+Ruqaa:wght@400;700'],
  },
  {
    id: 'djerba', name: { fr: 'Djerba', ar: 'جربة', en: 'Djerba' },
    tagline: { fr: 'L’aube sur la mer à travers une arche de terre cuite', ar: 'فجر على البحر من خلال قوس طيني', en: 'Dawn over the sea through a terracotta arch' },
    events: ['wedding', 'engagement'], style: 'mediterranean', tier: 'signature', demo: 'wedding',
    opening: 'sunrise', motif: 'sun', divider: 'dots', corner: 'line', pattern: 'waves', mood: 'sweet', song: 'https://www.youtube.com/watch?v=7wELp5GGJcI',
    photo: { mode: 'zoom', focal: [0.6, 0.52], particles: 'sand', colors: ['#fff1d0', '#ffffff'] },
    palette: {
      bg: '#f4e7d3', paper: '#fffaf1', ink: '#4a2a1a', muted: '#86644d', accent: '#b9572f', accent2: '#723019', line: 'rgba(114,48,25,.16)', 'btn-ink': '#fff', card: 'rgba(255,255,255,.55)',
      'pat-bg': '#f4e7d3', 'pat-a': 'rgba(185,87,47,.35)', 'pat-b': 'rgba(62,143,176,.3)', 'pat-c': '#f39c4a',
      wall: '#c96f45', 'wall-line': '#f4e7d3', 'sky-top': '#f6b98a', 'sky-bottom': '#fde6c8', sun: '#f39c4a', sea: '#3e8fb0', 'sea-line': '#cfeaf5', sand: '#e9d0a6', palm: '#3d5a36',
    },
    fonts: { display: "'Fraunces', Georgia, serif", script: "'Sacramento', cursive", body: "'Fraunces', Georgia, serif", ar: "'El Messiri', sans-serif", arDisplay: "'El Messiri', sans-serif" },
    gf: ['Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400', 'Sacramento', 'El+Messiri:wght@400;600'],
  },
  {
    id: 'blush', name: { fr: 'Blush Minimal', ar: 'وردي بسيط', en: 'Blush Minimal' },
    tagline: { fr: 'Typographie moderne, carte pliée qui s’ouvre', ar: 'خطوط عصرية وبطاقة مطوية تنفتح', en: 'Modern type, a folded card that opens' },
    events: ['wedding', 'engagement', 'contract', 'birthday'], style: 'minimal', tier: 'signature', demo: 'engagement',
    opening: 'fold', motif: 'none', divider: 'dots', corner: '', pattern: 'dots', mood: 'sweet', song: 'https://www.youtube.com/watch?v=aktY1vejF9Y',
    photo: { mode: 'seal', focal: [0.5, 0.57], particles: 'petals', colors: ['#f7d6d4', '#ffffff'] },
    palette: {
      bg: '#f6e8e5', paper: '#fffaf8', ink: '#3b2a2c', muted: '#86706f', accent: '#b9686d', accent2: '#4f3236', line: 'rgba(79,50,54,.14)', 'btn-ink': '#fff', card: 'rgba(246,232,229,.45)',
      'pat-bg': '#f6e8e5', 'pat-a': 'rgba(185,104,109,.22)', 'pat-b': 'rgba(185,104,109,.12)', 'pat-c': '#e9c4c1',
    },
    fonts: { display: "'DM Serif Display', Georgia, serif", script: "'DM Serif Display', Georgia, serif", body: "'Jost', system-ui, sans-serif", ar: "'Tajawal', sans-serif", arDisplay: "'Tajawal', sans-serif" },
    gf: ['DM+Serif+Display:ital@0;1', 'Jost:wght@400;500;600', 'Tajawal:wght@400;500;700'],
  },
  {
    id: 'monogram', name: { fr: 'Monogramme Ivoire', ar: 'مونوغرام عاجي', en: 'Monogram Ivory' },
    tagline: { fr: 'Lettre pliée en trois, sceau de cire à vos initiales', ar: 'رسالة مطوية بختم شمع بالأحرف الأولى', en: 'A tri-fold letter with your initials in wax' },
    events: ['wedding', 'engagement', 'contract'], style: 'classic', tier: 'prestige', demo: 'wedding',
    opening: 'letter', motif: 'monogram', divider: 'diamond', corner: 'line', pattern: 'dots', mood: 'sweet', song: 'https://www.youtube.com/watch?v=aktY1vejF9Y',
    photo: { mode: 'seal', focal: [0.5, 0.48], particles: 'dust', colors: ['#e8cd88', '#fff3c9'] },
    palette: {
      bg: '#ece5d6', paper: '#fffdf7', ink: '#2e2a24', muted: '#776d61', accent: '#a8864e', accent2: '#4a0916', line: 'rgba(46,42,36,.14)', 'btn-ink': '#fff', card: 'rgba(236,229,214,.35)',
      'pat-bg': '#ece5d6', 'pat-a': 'rgba(168,134,78,.22)', 'pat-b': 'rgba(168,134,78,.1)', 'pat-c': '#a8864e',
      seal: '#6e1423', 'seal-hi': '#a3404f', 'seal-motif': '#f3e2c0',
    },
    fonts: { display: "'Bodoni Moda', Georgia, serif", script: "'Pinyon Script', cursive", body: "'Cormorant Garamond', Georgia, serif", ar: "'Amiri', serif", arDisplay: "'Amiri', serif" },
    gf: ['Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400', 'Pinyon+Script', 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Amiri:wght@400;700'],
  },
  {
    id: 'baby', name: { fr: 'Baby Farha', ar: 'بيبي فرحة', en: 'Baby Farha' },
    tagline: { fr: 'Une boîte cadeau d’où s’envolent ballons et étoiles', ar: 'علبة هدية تخرج منها البالونات والنجوم', en: 'A gift box releasing balloons and stars' },
    events: ['birth', 'babyshower', 'tahara', 'birthday'], style: 'playful', tier: 'essentiel', demo: 'baby',
    opening: 'giftbox', motif: 'balloon', divider: 'heart', corner: '', pattern: 'confetti', mood: 'lullaby',
    photo: { mode: 'seal', focal: [0.6, 0.62], particles: 'confetti', colors: ['#f4b6c6', '#b5cdf3', '#f5d76e'] },
    palette: {
      bg: '#eef4fb', paper: '#ffffff', ink: '#33405a', muted: '#6f7b96', accent: '#d9708f', accent2: '#4f74c4', line: 'rgba(79,116,196,.16)', 'btn-ink': '#fff', card: 'rgba(238,244,251,.6)',
      'pat-bg': '#eef4fb', 'pat-a': '#f4b6c6', 'pat-b': '#b5cdf3', 'pat-c': '#f5d76e',
    },
    fonts: { display: "'Fredoka', system-ui, sans-serif", script: "'Fredoka', system-ui, sans-serif", body: "'Nunito', system-ui, sans-serif", ar: "'Baloo Bhaijaan 2', sans-serif", arDisplay: "'Baloo Bhaijaan 2', sans-serif" },
    gf: ['Fredoka:wght@400;600', 'Nunito:wght@400;600', 'Baloo+Bhaijaan+2:wght@400;600'],
  },
];
