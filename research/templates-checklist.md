# Templates checklist

Run on 2026-11-20 with the automated harness `tests/check.html` (open it on the dev server: `npm run dev`
then http://localhost:4173/tests/check.html). Every template is loaded in an iframe at **375px** and
**1280px**, in **French** and **Arabic (RTL)**, opened with a click, then checked.

**Result: 40/40 runs pass all 14 checks.**

| Template | Opening (photo mode) | 375 FR | 375 AR | 1280 FR | 1280 AR |
|---|---|---|---|---|---|
| Jasmin | seal dive + jasmine petals | ✓ | ✓ | ✓ | ✓ |
| Sidi Bou | 3D doors swing open + bougainvillea | ✓ | ✓ | ✓ | ✓ |
| Nuit du Henné | velvet curtains part + gold dust | ✓ | ✓ | ✓ | ✓ |
| Khomsa | 3D doors + gold dust, dark tint | ✓ | ✓ | ✓ | ✓ |
| Kairouan | walk through the arch + sand motes | ✓ | ✓ | ✓ | ✓ |
| Nuits de la Médina | zoom into the lantern + glow | ✓ | ✓ | ✓ | ✓ |
| Djerba | zoom to the blue door + light motes | ✓ | ✓ | ✓ | ✓ |
| Blush Minimal | seal dive + blush petals | ✓ | ✓ | ✓ | ✓ |
| Monogramme Ivoire | seal dive + gold dust | ✓ | ✓ | ✓ | ✓ |
| Baby Farha | seal dive + confetti | ✓ | ✓ | ✓ | ✓ |

## What each run checks

| Check | How |
|---|---|
| opens | real click on the opening → invitation shown, overlay removed |
| rtlOk | `dir="rtl"` in Arabic, `ltr` otherwise |
| countdown | seconds value changes after 1.1 s |
| maps | every venue has an `https://www.google.com/maps/…` link opening in a new tab |
| gcal | Google Calendar link with UTC start/end dates |
| ics | the .ics download contains `BEGIN:VCALENDAR`, `DTSTART`, `END:VEVENT` |
| rsvpValidates | empty submit shows an error |
| rsvp | name + "yes" + 2 guests → thank-you shown and reply stored |
| wishes | posting a wish adds it to the wall |
| musicOn / musicToggle | music starts on the opening tap; button pauses it |
| noOverflow | no horizontal scroll |
| fontAr / fontLatin | the template's Arabic font is loaded in AR, script font in FR |

## Not covered by the harness (check by hand on a phone)

- **Animation smoothness**: the harness runs while the preview is hidden, so it checks start and end states, not frame rate.
- **Real audio output**: browsers only play sound after a real tap; the harness checks player state.
- **Gyroscope tilt** on phones (iOS asks for permission; without it the scene uses a gentle idle sway).
- **open.mp4**: no videos in the pack yet. When `openings/<id>/open.mp4` exists it plays instead of the CSS opening.
- **YouTube music** with a broken id: not built yet (demos use the built-in synthesised melody).

## Known limits of the current visuals

The preview pack images are upscaled crops (see its README). They have been sharpened
(`python scripts/import-assets.py <folder> --enhance`) and the seals cut out, but for production
regenerate each one at full size from `research/image-prompts.md` and re-run the import script.
