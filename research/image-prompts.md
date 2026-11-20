# Farha — AI image & video prompts (10 templates)

Use these to generate the visuals in Midjourney / Ideogram / Flux / DALL·E (images) and
Kling / Runway / Veo / Sora / Hailuo (image-to-video). Prompts are in English on purpose:
image models follow English best.

## Global rules (apply to every prompt)

- **No text, no letters, no numbers in the image.** Names, dates and Arabic calligraphy are added by code
  on top (AI text always comes out broken). Add `no text, no lettering, no watermark` to every prompt.
- **Leave empty space** where the names will go (usually the centre of the card / the upper-middle third).
- **Format:** portrait **9:16** (1080×1920). In Midjourney add `--ar 9:16 --style raw --v 7`.
- **Look:** photorealistic 3D product render, soft studio light, shallow depth of field, rich materials
  (paper fibre, wax, gold foil, carved wood). Same camera height and light direction across a template's shots,
  so the closed → open sequence matches.
- **Video:** use the *closed* still as the **first frame** (image-to-video), 4–6 s, 24 fps, slow camera,
  no cuts, no people's faces. End on a calm frame (it fades into the invitation).
- **Negative prompt** (where supported): `text, letters, watermark, logo, signature, people, hands, faces,
  blurry, lowres, deformed, extra objects, clutter, cartoon, flat illustration`.

## Files to deliver per template

Put them in `openings/<template-id>/` (e.g. `openings/jasmin/`):

| File | What | Size / weight target |
|---|---|---|
| `closed.webp` | The opening screen before the tap (poster) | 1080×1920, ≤ 200 KB |
| `open.mp4` | The opening animation (starts from `closed.webp`) | 720×1280, H.264, 4–6 s, ≤ 1.5 MB, no audio |
| `bg.webp` | Background behind the invitation text (calm, low detail in the centre) | 1080×1920, ≤ 180 KB |
| `seal.png` | Wax seal / ornament alone, transparent background | 1024×1024 PNG, ≤ 250 KB |

Compress video with:
```
ffmpeg -i in.mp4 -vf "scale=720:-2,fps=24" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart open.mp4
```
Weights matter: the whole opening must load in under 2 s on 4G.

---

## 1. Jasmin — white & green, jasmine (mechmoum) seal

**closed.webp**
> Photorealistic 3D render of a closed ivory cotton-paper envelope lying slightly tilted on soft sage-green linen,
> sealed at the centre with a deep forest-green wax seal pressed with a five-petal jasmine flower,
> a small Tunisian mechmoum jasmine posy tied with a thin green thread resting beside it, a few loose white jasmine
> buds scattered, morning window light from the left, soft shadows, shallow depth of field, elegant, fresh,
> palette ivory #FDFDF8, sage #5F7D4E, forest green #2F4A2A, no text, no lettering, no watermark --ar 9:16

**open.mp4** (image-to-video from closed.webp)
> The green wax seal cracks gently, the envelope flap lifts open in slow motion, an ivory card slides up out of the
> envelope toward the camera, a few white jasmine petals drift down through the frame, camera slowly pushes in,
> soft morning light, calm and elegant, no text

**bg.webp**
> Top-down soft-focus flat lay of white jasmine flowers and green leaves framing the edges of an ivory textured paper,
> large empty clean centre area, airy, light, delicate, palette ivory and sage green, no text --ar 9:16

**seal.png**
> Single forest-green wax seal stamped with a five-petal jasmine flower, glossy wax with irregular edges,
> photorealistic macro, isolated on pure white background, centred, no text --ar 1:1

---

## 2. Sidi Bou — blue door that opens onto the sea

**closed.webp**
> Photorealistic 3D render of a traditional Sidi Bou Said arched wooden door painted bright blue #1D5FA5 with black
> iron studs forming geometric patterns, set in a whitewashed wall, pink bougainvillea flowers cascading over the
> arch, a small blue mashrabiya window beside it, bright Mediterranean afternoon sun, crisp shadows, front view,
> centred, no text, no lettering --ar 9:16

**open.mp4**
> The two leaves of the blue studded door swing slowly open toward the camera, revealing a sunlit white terrace and the
> deep blue Mediterranean sea and sky behind, bougainvillea petals float in the breeze, camera moves forward through
> the doorway, cinematic, calm, no people, no text

**bg.webp**
> Soft-focus view from a white Sidi Bou Said terrace with blue railings onto the Mediterranean sea at golden hour,
> bougainvillea in the corners, large calm empty sky area in the upper half, no text --ar 9:16

**seal.png**
> Ornate blue and white ceramic medallion with an eight-pointed star, Tunisian style, glossy glaze, isolated on white,
> centred, no text --ar 1:1

---

## 3. Henna Night (laylet el henna) — burgundy & gold

**closed.webp**
> Photorealistic 3D render of heavy burgundy velvet stage curtains #4A0916 closed, embroidered with fine gold henna
> paisley and mandala patterns, a golden tassel hanging in the centre, warm candlelight glow from below, small brass
> lanterns softly blurred in the background, luxurious traditional Tunisian henna-night atmosphere, no text --ar 9:16

**open.mp4**
> The burgundy velvet curtains part slowly to both sides revealing a warm glowing room decorated with brass lanterns,
> rose petals, a silver bowl of henna and lit candles, gold dust sparkles in the air, camera gently pushes in, no people,
> no text

**bg.webp**
> Close-up of a burgundy silk fabric with delicate gold henna-style line patterns around the edges, soft folds,
> warm light, empty smooth centre area, no text --ar 9:16

**seal.png**
> Round gold filigree henna mandala medallion, fine engraved lines and dots, metallic gold, isolated on white,
> centred, no text --ar 1:1

---

## 4. Khomsa — gold on black, night luxury

**closed.webp**
> Photorealistic 3D render of a black matte gatefold invitation card with thin gold foil borders standing on a black
> marble surface, the two panels held closed by a large antique-gold wax seal stamped with a khomsa (hand of Fatima)
> motif, dramatic low-key lighting, gold reflections, a few gold dust particles, luxurious, palette black #0D0B09 and
> gold #C9A45C, no text, no lettering --ar 9:16

**open.mp4**
> The gold khomsa wax seal splits in two and falls away, the two black panels of the card swing open like doors,
> warm golden light pours out from inside, gold dust swirls toward the camera, slow motion, cinematic, no text

**bg.webp**
> Black background with subtle gold Tunisian zellige geometric line pattern fading into the dark, faint gold dust
> bokeh, large empty dark centre, elegant, no text --ar 9:16

**seal.png**
> Antique gold wax seal stamped with a khomsa hand of Fatima with an eye in the palm, glossy metallic wax,
> photorealistic macro, isolated on pure white background, no text --ar 1:1

---

## 5. Kairouan — carpet & zellige

**closed.webp**
> Photorealistic 3D render of a rolled traditional Kairouan wool carpet (deep red, indigo and ochre geometric
> diamonds) lying on a sand-coloured stone floor in a courtyard of a Kairouan house with zellige tiles on the wall,
> warm afternoon light, top-down three-quarter view, no text --ar 9:16

**open.mp4**
> The Kairouan carpet unrolls by itself across the floor toward the camera revealing its central star medallion,
> fine dust in the sunbeams, camera rises slowly to a top-down view of the carpet, calm, no people, no text

**bg.webp**
> Top-down view of a Kairouan carpet border with red, indigo and ochre geometric motifs around the edges and a plain
> cream wool field in the centre, soft light, large empty centre, no text --ar 9:16

**seal.png**
> Eight-pointed star zellige tile medallion in red, indigo, ochre and cream glazed ceramic, isolated on white,
> centred, no text --ar 1:1

---

## 6. Medina Nights — lanterns & stars

**closed.webp**
> Photorealistic night scene of a narrow Tunis medina alley with arched doorways, three unlit ornate brass lanterns
> hanging from above, a crescent moon and many stars in a deep navy sky #0F1A33, cool blue moonlight, quiet,
> mysterious, no people, no text --ar 9:16

**open.mp4**
> The brass lanterns light up one after another with a warm golden glow #FFC65C, patterned light shadows spread on the
> white walls, stars twinkle, camera slowly tilts up toward the crescent moon, magical, no people, no text

**bg.webp**
> Deep navy night sky full of soft stars with a thin gold crescent moon in a top corner, a dark medina skyline
> silhouette at the very bottom, large empty sky in the centre, no text --ar 9:16

**seal.png**
> Single ornate brass Moroccan-Tunisian lantern glowing warm gold, pierced metal patterns, isolated on white,
> no text --ar 1:1

---

## 7. Djerba — sand & terracotta, summer wedding

**closed.webp**
> Photorealistic view through a terracotta-coloured Djerba-style arch (smooth plastered wall #C96F45) onto a calm
> turquoise sea at dawn, a palm tree on the right, pale sand, soft pink-orange sky, sun just below the horizon,
> warm, peaceful, no people, no text --ar 9:16

**open.mp4**
> The sun rises above the sea, the sky turns golden, the camera slowly walks forward through the terracotta arch toward
> the beach, gentle waves, palm leaves moving in the breeze, cinematic, no people, no text

**bg.webp**
> Soft sand texture with gentle ripple lines, a few small shells and dried palm leaves at the edges, warm light,
> large empty centre, palette sand #E9D0A6 and terracotta, no text --ar 9:16

**seal.png**
> Terracotta clay medallion with a sun and wave motif, handmade pottery texture, isolated on white, no text --ar 1:1

---

## 8. Blush Minimal — modern, soft pink

**closed.webp**
> Minimal photorealistic 3D render of a folded blush-pink cotton card #B9686D standing on a pale pink surface,
> deckled edges, a thin satin ribbon, soft diffused light, clean modern composition with lots of negative space,
> editorial, no text --ar 9:16

**open.mp4**
> The folded blush card opens slowly like a book, soft light reflects on the paper, a few pale pink petals fall,
> camera very slowly pushes in, minimal and elegant, no text

**bg.webp**
> Soft blush-pink handmade paper texture with deckled edges, subtle shadows, very minimal, large empty centre,
> no text --ar 9:16

**seal.png**
> Small blush-pink wax seal with a simple embossed heart, isolated on white, no text --ar 1:1

---

## 9. Monogram Ivory — ivory letter, initials in wax

**closed.webp**
> Photorealistic 3D render of a tri-folded thick ivory letter paper on a cream linen tablecloth, closed with a deep
> burgundy #6E1423 wax seal with an empty round centre (initials will be added later), a sprig of dried olive leaves
> beside it, soft window light, old-money elegance, no text, no letters --ar 9:16

**open.mp4**
> The burgundy wax seal lifts off, the ivory letter unfolds in two smooth movements, top fold then bottom fold, the
> paper rises gently toward the camera, soft natural light, calm, no text

**bg.webp**
> Ivory cotton paper texture with a thin gold foil double border, very subtle grain, large empty centre, no text --ar 9:16

**seal.png**
> Deep burgundy glossy wax seal with a plain smooth circular centre and raised rim, irregular wax edges,
> photorealistic macro, isolated on white, no letters --ar 1:1

---

## 10. Baby Farha — pastel, births / tahara / birthdays

**closed.webp**
> Cute photorealistic 3D render (soft clay / Pixar-like materials) of a pastel pink gift box with a baby-blue satin
> bow on a soft cloud-white background, small pastel balloons and stars floating around, gentle light, dreamy, no text
> --ar 9:16

**open.mp4**
> The gift box lid pops up and pastel balloons, little stars and confetti float up out of the box, gentle bounce,
> soft dreamy light, camera static, joyful, no text

**bg.webp**
> Soft pastel sky with fluffy 3D clouds, tiny stars and a crescent moon, pale pink and baby blue, large empty centre,
> no text --ar 9:16

**seal.png**
> Cute 3D pastel cloud with a small yellow star, soft clay material, isolated on white, no text --ar 1:1

---

## Optional extras (premium tier)

- **Couple silhouette video** (for "dance" premium templates): *Elegant silhouette of a bride and groom slow dancing
  under warm lanterns, backlit, faces not visible, slow motion, golden bokeh, no text*, 6–8 s, loopable.
- **Henna hand close-up** for Henna Night: *Close-up of a bride's hand with fresh traditional Tunisian henna patterns
  resting on burgundy velvet, gold bracelets, warm light, no face, no text* --ar 9:16
