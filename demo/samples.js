// Demo data (fictional people and venues). Dates use offsetDays so demos never go stale.
// A real order uses the same shape with `date: 'YYYY-MM-DD'` instead of offsetDays.

const wishes = [
  { name: { fr: 'Tante Najet', ar: 'خالتي نجاة', en: 'Aunt Najet' }, text: { fr: 'Mabrouk mes chéris, que Dieu vous comble de bonheur !', ar: 'مبروك يا أحبابي، ربي يتمّم عليكم بالخير!', en: 'Mabrouk my darlings, may God fill your home with joy!' } },
  { name: { fr: 'Les cousins de Sfax', ar: 'أولاد العم من صفاقس', en: 'The cousins from Sfax' }, text: { fr: 'On arrive avec la darbouka 🥁', ar: 'جايين بالدربوكة 🥁', en: 'We’re bringing the darbouka 🥁' } },
];

export const SAMPLES = {
  wedding: {
    eventType: 'wedding', languages: ['fr', 'ar', 'en'], defaultLang: 'fr',
    names: [{ fr: 'Ranim', ar: 'رنيم', en: 'Ranim' }, { fr: 'Aymen', ar: 'أيمن', en: 'Aymen' }],
    families: [{ fr: 'Famille Ben Salah', ar: 'عائلة بن صالح', en: 'The Ben Salah family' }, { fr: 'Famille Trabelsi', ar: 'عائلة الطرابلسي', en: 'The Trabelsi family' }],
    message: { fr: 'Trois soirées pour célébrer notre union, entourés de ceux que nous aimons.', ar: 'ثلاث سهرات نحتفل فيها بارتباطنا مع من نحب.', en: 'Three evenings to celebrate our union, surrounded by the people we love.' },
    mainEvent: 2,
    events: [
      { kind: 'henna', offsetDays: 52, time: '19:30', durationH: 5, venue: { fr: 'Dar Zitouna', ar: 'دار الزيتونة', en: 'Dar Zitouna' }, address: { fr: 'Médina de Tunis', ar: 'مدينة تونس العتيقة', en: 'Tunis Medina' }, city: { fr: 'Tunis', ar: 'تونس', en: 'Tunis' } },
      { kind: 'contract', offsetDays: 53, time: '17:00', durationH: 2, venue: { fr: 'Maison familiale Ben Salah', ar: 'دار عائلة بن صالح', en: 'Ben Salah family home' }, address: { fr: 'El Menzah 6, Tunis', ar: 'المنزه 6، تونس', en: 'El Menzah 6, Tunis' } },
      { kind: 'wedding', offsetDays: 54, time: '20:30', durationH: 5, venue: { fr: 'Espace Les Jasmins', ar: 'فضاء الياسمين', en: 'Les Jasmins venue' }, address: { fr: 'Gammarth, Tunis', ar: 'قمرت، تونس', en: 'Gammarth, Tunis' }, city: { fr: 'Gammarth · Tunis', ar: 'قمرت · تونس', en: 'Gammarth · Tunis' } },
    ],
    dressCode: {
      title: { fr: 'Élégance méditerranéenne', ar: 'أناقة متوسطية', en: 'Mediterranean elegance' },
      note: { fr: 'Tenues de soirée, tons doux. Jebba et kaftans bienvenus pour le henné.', ar: 'لباس سهرة بألوان هادئة. الجبّة والقفطان مرحّب بهما في ليلة الحنّة.', en: 'Evening wear in soft tones. Jebba and kaftans welcome for the henna night.' },
      colors: ['#f3ece0', '#c9b79a', '#7d8f6a', '#2f4a2a'],
    },
    story: [
      { when: '2019', text: { fr: 'Un café à Sidi Bou Saïd, une discussion qui ne finit plus.', ar: 'قهوة في سيدي بوسعيد وحديث لم ينتهِ.', en: 'A coffee in Sidi Bou Said, a conversation that never ended.' } },
      { when: '2023', text: { fr: 'La demande, au coucher du soleil sur la corniche.', ar: 'الطلب عند الغروب على الكورنيش.', en: 'The proposal, at sunset on the corniche.' } },
      { when: '2026', text: { fr: 'Le grand jour — et vous à nos côtés.', ar: 'اليوم الكبير — وأنتم معنا.', en: 'The big day — with you by our side.' } },
    ],
    photos: [{ caption: { fr: 'Sidi Bou Saïd', ar: 'سيدي بوسعيد', en: 'Sidi Bou Said' } }, { caption: { fr: 'La demande', ar: 'الطلب', en: 'The proposal' } }, { caption: { fr: 'En famille', ar: 'مع العائلة', en: 'With family' } }],
    rsvp: { maxGuests: 5, daysBefore: 21, endpoint: null, whatsapp: null },
    wishes,
    music: { type: 'synth', mood: 'oud' },
  },

  engagement: {
    eventType: 'engagement', languages: ['fr', 'ar', 'en'], defaultLang: 'fr',
    names: [{ fr: 'Ranim', ar: 'رنيم', en: 'Ranim' }, { fr: 'Aymen', ar: 'أيمن', en: 'Aymen' }],
    families: [{ fr: 'Famille Gharbi', ar: 'عائلة الغربي', en: 'The Gharbi family' }, { fr: 'Famille Jaziri', ar: 'عائلة الجزيري', en: 'The Jaziri family' }],
    inviteLine: { fr: 'ont la joie de vous convier à leurs fiançailles', ar: 'يسعدهم دعوتكم إلى حفل خطوبتهما', en: 'are delighted to invite you to their engagement' },
    events: [{ kind: 'engagement', offsetDays: 30, time: '18:00', durationH: 4, venue: { fr: 'Villa Les Oliviers', ar: 'فيلا الزياتين', en: 'Villa Les Oliviers' }, address: { fr: 'La Marsa, Tunis', ar: 'المرسى، تونس', en: 'La Marsa, Tunis' }, city: { fr: 'La Marsa', ar: 'المرسى', en: 'La Marsa' } }],
    dressCode: { title: { fr: 'Chic & pastel', ar: 'أنيق وبألوان فاتحة', en: 'Chic & pastel' }, note: { fr: 'Rose poudré, crème et touches dorées.', ar: 'وردي فاتح، كريمي ولمسات ذهبية.', en: 'Powder pink, cream and touches of gold.' }, colors: ['#f4d8d5', '#fbf3ea', '#d8b98a'] },
    photos: [{ caption: { fr: 'Nous deux', ar: 'نحن الاثنين', en: 'The two of us' } }, { caption: { fr: 'Tunis', ar: 'تونس', en: 'Tunis' } }, { caption: { fr: 'La bague', ar: 'الخاتم', en: 'The ring' } }],
    rsvp: { maxGuests: 4, daysBefore: 10, endpoint: null, whatsapp: null },
    wishes,
    music: { type: 'synth', mood: 'sweet' },
  },

  henna: {
    eventType: 'henna', languages: ['ar', 'fr', 'en'], defaultLang: 'ar',
    names: [{ fr: 'Ranim', ar: 'رنيم', en: 'Ranim' }, { fr: 'Aymen', ar: 'أيمن', en: 'Aymen' }],
    families: [{ fr: 'Famille Haddad', ar: 'عائلة الحدّاد', en: 'The Haddad family' }, { fr: 'Famille Mansouri', ar: 'عائلة المنصوري', en: 'The Mansouri family' }],
    inviteLine: { fr: 'vous invitent à la nuit du henné', ar: 'يتشرّفون بدعوتكم لسهرة الحنّة', en: 'invite you to the henna night' },
    mainEvent: 1,
    events: [
      { kind: 'outia', offsetDays: 20, time: '16:00', durationH: 4, venue: { fr: 'Dar El Haddad', ar: 'دار الحدّاد', en: 'Dar El Haddad' }, address: { fr: 'Nabeul', ar: 'نابل', en: 'Nabeul' } },
      { kind: 'henna', offsetDays: 21, time: '20:00', durationH: 5, venue: { fr: 'Salle El Andalous', ar: 'قاعة الأندلس', en: 'El Andalous hall' }, address: { fr: 'Hammamet', ar: 'الحمامات', en: 'Hammamet' }, city: { fr: 'Hammamet', ar: 'الحمامات', en: 'Hammamet' } },
    ],
    dressCode: { title: { fr: 'Rouge, bordeaux & or', ar: 'أحمر، عنّابي وذهبي', en: 'Red, burgundy & gold' }, note: { fr: 'Tenue traditionnelle bienvenue : jebba, keswa, kaftan.', ar: 'اللباس التقليدي مرحّب به: جبّة، كسوة، قفطان.', en: 'Traditional dress welcome: jebba, keswa, kaftan.' }, colors: ['#8c1c2b', '#4a0916', '#c9a45c', '#f3e2c0'] },
    rsvp: { maxGuests: 6, daysBefore: 7, endpoint: null, whatsapp: null },
    wishes,
    music: { type: 'synth', mood: 'oud' },
  },

  baby: {
    eventType: 'birth', languages: ['fr', 'ar', 'en'], defaultLang: 'fr',
    honoree: { fr: 'Lina', ar: 'لينا', en: 'Lina' },
    hosts: { fr: 'Sarra & Walid sont heureux de vous présenter', ar: 'سارة ووليد سعداء بتقديم', en: 'Sarra & Walid are happy to introduce' },
    kicker: { fr: 'Bienvenue à notre petite', ar: 'أهلاً بصغيرتنا', en: 'Welcome to our little' },
    inviteLine: { fr: 'Venez fêter son arrivée avec nous', ar: 'تعالوا نحتفلوا بقدومها', en: 'Come celebrate her arrival with us' },
    events: [{ kind: 'birth', offsetDays: 18, time: '16:00', durationH: 3, venue: { fr: 'Chez nous', ar: 'في دارنا', en: 'At home' }, address: { fr: 'Ennasr 2, Ariana', ar: 'النصر 2، أريانة', en: 'Ennasr 2, Ariana' }, city: { fr: 'Ariana', ar: 'أريانة', en: 'Ariana' } }],
    dressCode: { title: { fr: 'Douceur pastel', ar: 'ألوان ناعمة', en: 'Soft pastels' }, note: { fr: 'Rose, bleu ciel ou blanc.', ar: 'وردي، أزرق فاتح أو أبيض.', en: 'Pink, sky blue or white.' }, colors: ['#f4b6c6', '#b5cdf3', '#ffffff', '#f5d76e'] },
    photos: [{ caption: { fr: 'Premier sourire', ar: 'أول ابتسامة', en: 'First smile' } }, { caption: { fr: 'Petites mains', ar: 'يدين صغار', en: 'Tiny hands' } }, { caption: { fr: 'Dodo', ar: 'نومة', en: 'Sleepy' } }],
    rsvp: { maxGuests: 4, daysBefore: 5, endpoint: null, whatsapp: null },
    wishes: [{ name: { fr: 'Mamie Fatma', ar: 'جدّتي فاطمة', en: 'Grandma Fatma' }, text: { fr: 'Que Dieu la protège, notre petite princesse ❤️', ar: 'ربي يحفظها أميرتنا الصغيرة ❤️', en: 'May God protect our little princess ❤️' } }],
    music: { type: 'synth', mood: 'lullaby' },
  },

  birthday: {
    eventType: 'birthday', languages: ['fr', 'ar', 'en'], defaultLang: 'fr',
    honoree: { fr: 'Adam', ar: 'آدم', en: 'Adam' }, age: 7,
    kicker: { fr: 'Venez fêter', ar: 'تعالوا نحتفلوا مع', en: 'Come celebrate' },
    events: [{ kind: 'birthday', offsetDays: 12, time: '15:00', durationH: 3, venue: { fr: 'Parc Fun Land', ar: 'منتزه فان لاند', en: 'Fun Land park' }, address: { fr: 'Les Berges du Lac, Tunis', ar: 'ضفاف البحيرة، تونس', en: 'Berges du Lac, Tunis' }, city: { fr: 'Tunis', ar: 'تونس', en: 'Tunis' } }],
    rsvp: { maxGuests: 3, daysBefore: 4, endpoint: null, whatsapp: null },
    wishes: [],
    music: { type: 'synth', mood: 'lullaby' },
  },

  tahara: {
    eventType: 'tahara', languages: ['ar', 'fr', 'en'], defaultLang: 'ar',
    honoree: { fr: 'Youssef', ar: 'يوسف', en: 'Youssef' },
    hosts: { fr: 'La famille Ayari vous invite à la tahara de', ar: 'عائلة العياري تدعوكم لطهارة', en: 'The Ayari family invites you to the tahara of' },
    kicker: { fr: 'Fête de', ar: 'فرحة', en: 'Celebrating' },
    events: [{ kind: 'tahara', offsetDays: 25, time: '17:00', durationH: 4, venue: { fr: 'Dar Ayari', ar: 'دار العياري', en: 'Dar Ayari' }, address: { fr: 'Sousse', ar: 'سوسة', en: 'Sousse' }, city: { fr: 'Sousse', ar: 'سوسة', en: 'Sousse' } }],
    rsvp: { maxGuests: 6, daysBefore: 7, endpoint: null, whatsapp: null },
    wishes: [],
    music: { type: 'synth', mood: 'oud' },
  },
};
