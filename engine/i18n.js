// UI strings for the invitation (Arabic is RTL). Data fields are localised separately as {ar, fr, en}.
export const LANGS = { ar: { label: 'عربي', dir: 'rtl', locale: 'ar-TN' }, fr: { label: 'FR', dir: 'ltr', locale: 'fr-FR' }, en: { label: 'EN', dir: 'ltr', locale: 'en-GB' } };

const S = {
  tapToOpen: { ar: 'اضغط لفتح الدعوة', fr: "Touchez pour ouvrir l'invitation", en: 'Tap to open the invitation' },
  soundHint: { ar: 'التجربة أجمل مع الصوت', fr: 'Plus belle avec le son', en: 'Best enjoyed with sound' },
  youAreInvited: { ar: 'يتشرفون بدعوتكم', fr: 'ont la joie de vous inviter', en: 'request the pleasure of your company' },
  together: { ar: 'بكل فرح', fr: 'Avec toute leur joie', en: 'With great joy' },
  andFamilies: { ar: 'و', fr: '&', en: '&' },
  countdownTitle: { ar: 'العدّ التنازلي', fr: 'Le compte à rebours', en: 'Counting down' },
  days: { ar: 'يوم', fr: 'jours', en: 'days' },
  hours: { ar: 'ساعة', fr: 'heures', en: 'hours' },
  minutes: { ar: 'دقيقة', fr: 'minutes', en: 'minutes' },
  seconds: { ar: 'ثانية', fr: 'secondes', en: 'seconds' },
  itsToday: { ar: 'اليوم هو اليوم الموعود!', fr: "C'est aujourd'hui !", en: 'The day is here!' },
  scheduleTitle: { ar: 'البرنامج', fr: 'Le programme', en: 'The programme' },
  venuesTitle: { ar: 'الأماكن', fr: 'Les lieux', en: 'Venues' },
  openMaps: { ar: 'افتح في الخرائط', fr: 'Ouvrir dans Maps', en: 'Open in Maps' },
  addCalendar: { ar: 'أضف إلى التقويم', fr: "Ajouter à l'agenda", en: 'Add to calendar' },
  googleCal: { ar: 'تقويم Google', fr: 'Google Agenda', en: 'Google Calendar' },
  appleCal: { ar: 'Apple / Outlook', fr: 'Apple / Outlook', en: 'Apple / Outlook' },
  dressTitle: { ar: 'اللباس', fr: 'Code vestimentaire', en: 'Dress code' },
  storyTitle: { ar: 'حكايتنا', fr: 'Notre histoire', en: 'Our story' },
  photosTitle: { ar: 'صور', fr: 'Souvenirs', en: 'Moments' },
  rsvpTitle: { ar: 'تأكيد الحضور', fr: 'Confirmez votre présence', en: 'Kindly reply' },
  rsvpBefore: { ar: 'نرجو الرد قبل', fr: 'Merci de répondre avant le', en: 'Please reply before' },
  yourName: { ar: 'الاسم الكامل', fr: 'Nom complet', en: 'Full name' },
  attending: { ar: 'هل ستحضر؟', fr: 'Serez-vous des nôtres ?', en: 'Will you attend?' },
  yes: { ar: 'نعم، بكل سرور', fr: 'Oui, avec joie', en: 'Joyfully accept' },
  no: { ar: 'للأسف لا', fr: 'Malheureusement non', en: 'Regretfully decline' },
  guests: { ar: 'عدد الأشخاص', fr: 'Nombre de personnes', en: 'Number of guests' },
  whichEvents: { ar: 'المناسبات', fr: 'Événements', en: 'Events' },
  message: { ar: 'رسالة (اختياري)', fr: 'Un mot (facultatif)', en: 'A note (optional)' },
  send: { ar: 'إرسال', fr: 'Envoyer', en: 'Send' },
  sending: { ar: 'جارٍ الإرسال…', fr: 'Envoi…', en: 'Sending…' },
  rsvpThanksYes: { ar: 'شكراً! في انتظاركم بكل حب.', fr: 'Merci ! Nous avons hâte de vous voir.', en: 'Thank you! We can’t wait to see you.' },
  rsvpThanksNo: { ar: 'شكراً على ردّكم، ستكونون في قلوبنا.', fr: 'Merci de votre réponse, vous serez dans nos cœurs.', en: 'Thank you for letting us know — you’ll be missed.' },
  alsoWhatsapp: { ar: 'أرسل الرد عبر واتساب أيضاً', fr: 'Envoyer aussi par WhatsApp', en: 'Also send on WhatsApp' },
  nameRequired: { ar: 'الرجاء كتابة الاسم', fr: 'Merci d’indiquer votre nom', en: 'Please enter your name' },
  chooseAttend: { ar: 'الرجاء اختيار إجابة', fr: 'Merci de choisir une réponse', en: 'Please choose an answer' },
  wishesTitle: { ar: 'تمنياتكم', fr: 'Vos vœux', en: 'Wishes' },
  wishPlaceholder: { ar: 'اكتب تمنياتك…', fr: 'Écrivez vos vœux…', en: 'Write your wishes…' },
  postWish: { ar: 'انشر', fr: 'Publier', en: 'Post' },
  wishRequired: { ar: 'اكتب الاسم والتمنيات', fr: 'Ajoutez votre nom et votre vœu', en: 'Add your name and wish' },
  shareInvite: { ar: 'شارك الدعوة', fr: "Partager l'invitation", en: 'Share the invitation' },
  madeWith: { ar: 'صُنعت بحب مع', fr: 'Fait avec amour par', en: 'Made with love by' },
  tapForMusic: { ar: 'اضغط للموسيقى ♪', fr: 'Touchez pour la musique ♪', en: 'Tap for music ♪' },
  musicOn: { ar: 'تشغيل الموسيقى', fr: 'Activer la musique', en: 'Play music' },
  musicOff: { ar: 'إيقاف الموسيقى', fr: 'Couper la musique', en: 'Pause music' },
  language: { ar: 'اللغة', fr: 'Langue', en: 'Language' },
  demoNote: { ar: 'نسخة تجريبية — الردود محفوظة على هذا الجهاز فقط', fr: 'Démo — les réponses restent sur cet appareil', en: 'Demo — replies stay on this device' },
  welcomeBaby: { ar: 'أهلاً بـ', fr: 'Bienvenue à', en: 'Welcome to' },
  celebrate: { ar: 'ندعوكم للاحتفال', fr: 'Venez célébrer avec nous', en: 'Come celebrate with us' },
  turns: { ar: 'يحتفل بعيد ميلاده', fr: 'fête ses', en: 'turns' },
  lightsOn: { ar: 'أشعل الفوانيس', fr: 'Allumez les lanternes', en: 'Light the lanterns' },
};

/** Event kinds and their localised labels. */
export const EVENT_KINDS = {
  henna: { ar: 'ليلة الحنّة', fr: 'Nuit du henné', en: 'Henna night' },
  outia: { ar: 'الوطية', fr: 'Outia', en: 'Outia (pre-wedding)' },
  contract: { ar: 'كتب الكتاب', fr: 'Katb el kteb', en: 'Marriage contract' },
  engagement: { ar: 'الخطوبة', fr: 'Fiançailles', en: 'Engagement' },
  wedding: { ar: 'حفل الزفاف', fr: 'Soirée de mariage', en: 'Wedding party' },
  birth: { ar: 'حفل الولادة', fr: 'Fête de naissance', en: 'Birth celebration' },
  babyshower: { ar: 'حفل استقبال المولود', fr: 'Baby shower', en: 'Baby shower' },
  tahara: { ar: 'الطهارة', fr: 'Tahara', en: 'Tahara (circumcision)' },
  birthday: { ar: 'عيد الميلاد', fr: 'Anniversaire', en: 'Birthday' },
  party: { ar: 'الحفل', fr: 'La fête', en: 'The party' },
};

export function makeT(lang) {
  const t = (key) => (S[key] ? S[key][lang] ?? S[key].fr : key);
  /** Localise a data value that may be a string or {ar, fr, en}. */
  t.L = (v) => {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    return v[lang] ?? v.fr ?? v.en ?? v.ar ?? '';
  };
  t.kind = (k) => (EVENT_KINDS[k] ? EVENT_KINDS[k][lang] : k);
  t.lang = lang;
  t.locale = LANGS[lang]?.locale || 'fr-FR';
  return t;
}
