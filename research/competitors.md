# Farha — Competitor research (Step 1)

Researched 2026-11-20. **Patterns only**: nothing below is copied code, art or text. Pages were read as
text, so palettes, fonts and motion timing are taken from each seller's own description unless marked
*seen*. Items marked *(inferred)* are my analysis.

Pages that could not be read: Velvet Vow (Framer says "template unavailable", delisted), Etsy
LittleTemplateGift (403), Khamsat gigs (403). Their rows use search-result snippets only.

---

## 0. Farha today (baseline)

| | |
|---|---|
| Live site | farha-bay.vercel.app — static/vanilla-JS signals (hash routes `#modele=carthage`, per-event folders `/invitation-mariage/`, `/invitation-henna/`, `/invitation-anniversaire/`, `/invitation-tahara/`, `/invitation-baby-shower/`) |
| Local repo | **This folder is empty — the Farha source code is not here.** |
| Templates | 16: wedding ×10 (Carthage, Sidi Bou Said doors, Perla, Orchidée, Jacaranda, Forêt, Jardin enchanté, Les vagues, Olive, Jardin des Oliviers), henna/wteya ×3 (Henna Sultan, Rideau rouge, Wteya Gold), birthday ×3 (Super-héros, Dino Jungle, Concert pop) |
| Prices | 24 DT birthday · 36 DT henna · 86 DT wedding/wteya · custom on quote |
| Order form | bride/groom names, date, time, venue, Maps link, message, dress-code colours, photo, music |
| Features | music, countdown, Maps per event, RSVP (yes/no + message, sent by email), wishes, dress code, WhatsApp link |
| Gaps | FR UI only (no AR/EN switch), payment + publishing still manual, host dashboard "promised", no add-to-calendar seen |

---

## 1. Competitor table

| Site | Market | Price | # templates | Opening animation | Sections | Features | Weaknesses |
|---|---|---|---|---|---|---|---|
| **invitini.online** | Tunisia (AR-first, FR, EN) | from 60 DT flat, no subscription | 21 claimed (builder lists 14) | Envelope opens on tap; palace doors open; 4 "dance video" intros; "better with sound" prompt | Quran verse, names, families, date, countdown, venue + time, Maps button, Google Calendar button; multi-event programme (wteya, henna, 3ors, katb) advertised | YouTube music, countdown, Maps, add-to-calendar, 3 languages, RTL, no account | **No RSVP, no wishes, no gallery, no dress code seen**; link delivered manually by WhatsApp in 24–48 h; no edit link/dashboard; stale demo dates |
| **chungdoi.com** (Arabic collection) | Global, EN storefront | Hidden; free to build, 3-day trial, pay to publish | 7 "Arabic" (whole site larger) | Envelope opens on tap (`?open=1`) | Names in gold arch, families, ceremony + reception, gallery, Maps embed, RSVP, guestbook, gift box, timeline medallions, mini calendar with heart | Full RTL, guest name display, unlimited photos, guest list dashboard | "Arabic" mixes Indian/European palaces; price hidden; demos in English; nothing Maghrebi |
| **Framer – The Knot** | Global, EN | $39 (or paid "customised for you") | 1 | 3D letter opening + optional custom wax seal | Hero, welcome, venue, details (ceremony/reception/attire/travel/stay), schedule, FAQ, registry, RSVP | Maps link, FAQ accordion, built-in RSVP | Single event, EN only, no music/countdown, no dashboard |
| **Framer – Together Vows** | Global, EN | $29 | 1 | "Tap here to open" envelope → card reveal | Families line, names, date/time, venue, CTA → separate RSVP page | RSVP: guest count, dietary, message | Minimal: no schedule/map/calendar/music; single event |
| **Framer – Weddingly** | Global, EN | Free remix | 1 | Envelope + countdown in the opening | Save-the-date + countdown, story (3 dated moments), day schedule, venue, guest info (stay/dress/food/transport), **pinned RSVP**, FAQ | Countdown, pinned scrolling RSVP, separate RSVP page | No gallery, no music, single event, typos/stale data |
| **Framer – Blossom Love** | Global, EN | $59 | 1 | **Cinematic scroll-driven envelope** reveal | Envelope intro, hero, love story (4), event-detail cards (date/time/place/dress), countdown, schedule, Q&A, RSVP | Sticky scroll, text effects, carousel/ticker | No music, no gallery, single event, placeholder copy |
| **Framer – Romeo Juliet** | Global, EN | Free remix | 1 | Pre-loader → on-scroll envelope | Hero, 3-chapter story, polaroid gallery, 2 venues, where to stay, dress code **mood board**, timeline, wedding party, registry, FAQ, RSVP, countdown | Hand-drawn shapes, animated icons, polaroids | Single event, EN only, inconsistent demo data |
| **Framer – Velvet Vow** | Global, EN | n/a (delisted) | 1 | (brief) burgundy envelope, wax seal, card rises, music toggle | — | — | Not reachable |
| **Lovable – Sage/Evergreen** | Builders, EN | Lovable plan | 1 (6 pages) | None — hero parallax zoom only | Home, story + portraits, travel & stay, registry, RSVP | RSVP form not stored until you add Supabase | Not an invitation; dev needed; no Arabic glyphs in fonts |
| **Paperless Post** | US/global, EN | Coins/premium (not on page) | Large catalogue | Animated envelope with **choosable envelope, liner, stamp, backdrop** | Card + event page (schedule, hotels, registry blocks) | Guest list import, group invites, meal questions, RSVP tracking, email/SMS/link | No AR/RTL, no WhatsApp, Western styles only |
| **Joy (withjoy)** | US/global, 9 UI languages | Digital free; paper ≈$1.5–1.9/card | "Hundreds" | No animated opening on page; liners/foil for print | Card front/back, envelope, matching website | Smart RSVP per event, plus-ones, custom questions, contact collector, registry, QR | No Arabic/RTL/WhatsApp; Western style families |
| **Etsy – LittleTemplateGift** | Global, EN | (403) | (403) | Search snippet: invitation + private RSVP dashboard + editable live link + music | — | Dashboard, editable link | Not reachable |
| **Renderforest** | Global, 12 UI langs incl. AR | Subscription (not shown) | 6 wedding shown | Not mentioned | Not listed | Link share, RSVP tracking claimed | Generic builder, SEO copy, no prices |
| **faire-part-digital.com** | Switzerland/FR | 39 € one-off (from 69 €) | 6–9 | **Full-screen envelope opens**, paired with music + photos | Names/date, photos, music, programme, address, lodging, RSVP, gift list, FAQ, countdown | RSVP dashboard (attendance, count, meals, allergies, lodging), gift list "mark as bought", QR, **edits after sending keep same link**, multilingual content | FR site; count inconsistent; no Maghrebi styles |
| **Invitamo** (mariages.net) | France | from 189 € (+50 € 2nd version) | ~4 | "Elegant animations" | Reception, RSVP questionnaire, hotels + maps | Music, countdown, Maps, Google Photos, unlimited sends (email/SMS/WhatsApp) | ~1 week delivery, bank transfer only, 2 reviews |
| **ComeUp / Fiverr / Khamsat freelancers** | FR / Arab world | ~5–30 $ (Khamsat), 27 € base + add-ons (ComeUp) | Custom | Animations as paid add-on | Photo, text, Maps, countdown | Add-ons à la carte: QR +11 €, gallery +16 €, RSVP +22 €, music +16 €, animations +22 € | Unreliable sellers, no demo, no dashboard |

---

## 2. Opening animation types seen

1. **Envelope flap opens on tap**, card slides/rises out (invitini, chungdoi, Together Vows, faire-part-digital, Paperless Post).
2. **Wax seal** that must be "broken" / tapped before the flap opens (The Knot, Velvet Vow brief).
3. **3D letter opening** — perspective folds unfold (The Knot).
4. **Scroll-driven cinematic envelope** — the reveal is scrubbed by scrolling, pinned section (Blossom Love, Romeo Juliet).
5. **Countdown shown inside/on the envelope** before opening (Weddingly).
6. **Pre-loader** (monogram/hearts) before the envelope (Romeo Juliet).
7. **Doors / palace gates opening** (invitini palace designs, Farha Sidi Bou Said).
8. **Curtain opening** (Farha Henna Rideau rouge).
9. **Video intro** (dancing couple / bride) then invitation (invitini "dance" designs).
10. **Portal / frame zoom** — flower portal, jungle portal (Farha Jardin enchanté, Dino Jungle).
11. **Scratch-to-reveal date** (Farha Carthage gold scratch).
12. **Hero parallax zoom-settle** only, no gate (Lovable).
13. **Customisable envelope kit** — envelope colour, liner pattern, stamp, backdrop chosen by the host (Paperless Post).
14. **"Tap to open + turn sound on" prompt** used as an audio-unlock gate (invitini, Together Vows).

## 3. Section types seen

| Section | Seen at |
|---|---|
| Opening gate (envelope/door/curtain) | almost all |
| Religious opener (Quran verse / Bismillah) | invitini |
| Hero: names + date (+ families "together with their families") | all |
| Families of bride & groom | invitini, chungdoi, Together Vows |
| Countdown (d/h/m/s) | invitini, Weddingly, Blossom, Romeo, faire-part, Invitamo, Farha |
| Love story / milestones / chapters | Weddingly, Blossom, Romeo, Lovable |
| Day schedule / timeline | The Knot, Weddingly, Blossom, Romeo, chungdoi |
| **Multi-event programme** (wteya, henna, katb, 3ors / rehearsal, brunch) | invitini (advertised), Joy, Paperless Post |
| Venue + Maps link / embed | all serious ones |
| Add to calendar | invitini (Google Calendar only) |
| Event detail cards (date / time / place / dress) | Blossom Love |
| Dress code (+ colour palette / mood board) | Farha, Romeo, The Knot, Weddingly |
| Gallery (polaroids, photo frames, unlimited photos) | Romeo, chungdoi, Farha, Lovable |
| Wedding party | Romeo |
| Travel / where to stay / transport | The Knot, Weddingly, Romeo, Lovable, faire-part, Invitamo |
| FAQ | The Knot, Weddingly, Blossom, Romeo, faire-part |
| Registry / gift box / cash fund | The Knot, Romeo, chungdoi, Joy, faire-part |
| RSVP (yes/no, guest count, dietary, message, per-event) | most; pinned in Weddingly |
| Guestbook / wishes wall | chungdoi, Farha |
| Mini calendar with the day marked | chungdoi |
| Music toggle | invitini, Farha, faire-part, Invitamo, Velvet Vow |
| Closing sign-off / footer | all |

## 4. Style families seen

- **Classic / elegant** (ivory, serif, gold foil) — everywhere
- **Floral & botanical / greenery / garden** — Joy, Paperless, Farha (Jacaranda, Jardin), faire-part (Sakura)
- **Minimal / editorial / typographic** — Blossom, Lovable, Paperless "simple & minimal"
- **Romantic blush / rose** — invitini "romantique", faire-part "Romantique", Farha Perla
- **Night luxury (black & gold)** — invitini "فخامة الليل", chungdoi gold
- **Palace / arch / Andalusian-Moroccan** — invitini, chungdoi (Saraya, Qasr)
- **Mediterranean / seaside** — faire-part Méditerranée, Farha Les vagues
- **Old money / vintage / toile de Jouy / wax seal** — The Knot, faire-part Sceau doré & Toile de Jouy
- **Rustic / countryside / boho** — Joy, Paperless, faire-part Champêtre
- **Hand-drawn / playful / polaroid** — Romeo Juliet
- **Cultural** (Indian, Mughal) — Paperless, Joy, chungdoi
- **Kids / themed** (superheroes, dinosaurs, pop) — Farha only

## 5. Gaps nobody covers well (Farha's opportunity)

1. **Real Tunisian identity.** Arabic templates elsewhere are Gulf/Moroccan/Indian palaces. Nobody draws jasmine/mechmoum, Sidi Bou Said blue, Kairouan carpets, khomsa, Djerba, Tunisian bridal dress (Farha already leads here — keep it).
2. **Henna night / wteya / katb el kteb / outia as first-class events**, each with its own template — only invitini mentions them, inside one wedding page.
3. **One link, many events.** Multi-event schedule with a separate venue, map, dress code and RSVP per event (henna Thursday, wedding Saturday) — only Joy does per-event RSVP, in English.
4. **AR + FR + EN switchable in the same link**, with proper RTL and Arabic-capable fonts — invitini has it but no RSVP; Western tools have no Arabic at all.
5. **Non-wedding Tunisian events**: tahara, sbou3/birth, baby shower, success parties (bac/diploma), birthdays — almost nobody.
6. **Self-serve publish + edit link + host dashboard** at a Tunisian price. invitini delivers manually in 24–48 h; foreign tools charge in €/$ and hide prices.
7. **WhatsApp-native sharing**: WhatsApp preview card (OG image with names), per-guest links "Dear Ahmed & family" — no Western tool targets WhatsApp.
8. **Complete feature set in one product**: invitini lacks RSVP/wishes; Framer templates lack music, multi-event, dashboard; freelancers sell each feature as an add-on.
9. **Add-to-calendar that works on iPhone** (.ics) — only Google Calendar links seen.
10. **Data quality**: almost every demo has stale dates, wrong weekdays, typos. Live demos that auto-compute a future date and look flawless are an easy trust win.
11. **Performance & accessibility**: heavy Framer/video intros; nobody mentions reduced-motion or 4G load time.

---

### Sources
[invitini.online](https://invitini.online/) ·
[chungdoi Arabic](https://chungdoi.com/en/templates/collections/arabic) ·
[The Knot](https://www.framer.com/marketplace/templates/the-knot/) ·
[Together Vows](https://www.framer.com/marketplace/templates/together-vows/) ·
[Weddingly](https://www.framer.com/marketplace/templates/71116/) ·
[Blossom Love](https://www.framer.com/marketplace/templates/67051/) ·
[Romeo Juliet](https://www.framer.com/marketplace/templates/67756/) ·
[Velvet Vow](https://www.framer.com/marketplace/templates/velvet-vow/) ·
[Lovable Evergreen](https://lovable.dev/templates/websites/events/evergreen-elegant-wedding-invitation-template) ·
[Paperless Post](https://www.paperlesspost.com/design/wedding-invitations) ·
[Joy](https://withjoy.com/wedding-invitations/) ·
[Etsy LittleTemplateGift](https://www.etsy.com/shop/LittleTemplateGift) ·
[Renderforest](https://www.renderforest.com/fr/online-wedding-invitations) ·
[faire-part-digital](https://www.faire-part-digital.com/) ·
[Invitamo](https://www.mariages.net/faire-part-mariage/invitamo--e367669) ·
[ComeUp](https://comeup.com/fr/service/532381/creer-un-site-d-invitation-digital-premium-pour-votre-mariage-ou-evenement-de-tous-genres) ·
[Khamsat search](https://khamsat.com/programming/custom-website-development/4452112)
