# Mémora Invitations

Invitations digitales animées, conçues en Tunisie : mariage, nuit du henné, katb el kteb, fiançailles,
naissance, tahara, anniversaire. Un seul lien → ouverture 3D, musique YouTube, compte à rebours,
programme multi-soirées, lieux (Maps + agenda), RSVP, mur de vœux — en arabe (RTL), français et anglais.

## Lancer en local

```bash
npm run dev        # http://localhost:4173  (aucune dépendance à installer)
```

| Page | URL |
|---|---|
| Page de vente + catalogue | `/` |
| Démo d'un modèle | `/i/?t=khomsa` (ajouter `&lang=ar`, `&demo=henna`, `&music=<lien YouTube>`) |
| Contrôle qualité automatique | `/tests/check.html` |

## Structure

```
index.html, catalog.js, catalog.css   Page de vente Mémora (catalogue filtrable, tarifs, FAQ, WhatsApp)
i/index.html                          Lecteur d'invitation
engine/                               Moteur : sections, ouvertures (photo.js, openings.js), musique,
                                      calendrier (.ics), particules, i18n, ornements SVG
templates/registry.js                 Les 10 modèles (palette, polices, ouverture, chanson suggérée)
openings/<modèle>/                    Visuels : closed.webp, bg.webp, seal.webp (+ open.mp4 optionnel)
demo/samples.js                       Données de démo (Ranim & Aymen, Lina, Adam, Youssef)
scripts/import-assets.py              Importer de nouveaux visuels (jpg/png/webp) dans openings/
research/                             Étude concurrentielle, prompts d'images, checklist QA
```

## Réglages boutique

- Numéro WhatsApp des commandes : `WHATSAPP` en haut de `catalog.js`.
- Chansons suggérées : `SONG_SUGGESTIONS` et `song:` par modèle dans `templates/registry.js`.
- Une commande réelle = un fichier JSON au même format que `demo/samples.js`, ouvert avec `/i/?t=<modèle>&data=<chemin>.json`.
