# 🎬 ZAAYNAA — Prompt vidéo cinématique (bande site + Reels)

> À coller dans Higgsfield (image-to-video, avec la photo de la bague en référence) dès que tu as des crédits, ou dans tout autre outil de vidéo IA. Sert aussi de brief pour un vidéaste.

---

## Règles de marque (à garder en tête)
ZAAYNAA — « Modern Moroccan Quiet Luxury ». Minimalisme parisien + héritage marocain. Discret en surface, extraordinaire de près. Lumière douce / cinématique chaude uniquement, jamais criard. Or vermeil 18k + argent 925. Détails marocains (zellige, calligraphie) subtils.

---

## 🎥 Version 1 — Bande cinématique du site (paysage 16:9)

**Réglages** : image-to-video · référence = photo de la bague · 16:9 · 5–8 s · 1080p · boucle fluide (le début et la fin se raccordent) · audio OFF.

**Prompt :**
```
Cinematic luxury jewelry film. Extreme close-up of the ZAAYNAA emerald-cut ring
(keep the ring identical to the reference: gold vermeil band, deep green emerald,
pavé diamonds). The ring rests on dark green velvet. A slow, smooth camera push-in
(dolly) while a soft golden light sweeps across the stone, making the emerald glow
and the diamonds sparkle. Faint Moroccan zellige shadows and warm bokeh in the
background. Gentle floating dust particles catching the light. Rich, moody,
high-end perfume-ad aesthetic. Shallow depth of field, slow elegant motion,
seamless loop. No text, no people.
```

---

## 📱 Version 2 — Reel / TikTok (vertical 9:16, avec la main + packaging)

**Réglages** : image-to-video · référence = photo de la bague · 9:16 · 5–8 s · 1080p · audio OFF (musique ajoutée au montage).

**Prompt :**
```
Cinematic vertical jewelry ad. A young woman's elegant manicured hand gently lifts
the ZAAYNAA emerald ring (identical to reference) out of a dark green velvet ZAAYNAA
box with a gold embossed logo, and slides it onto her finger. She turns her hand
slowly so the emerald catches warm golden light and sparkles. Soft Moroccan lantern
glow and zellige tiles blurred in the background. Warm, intimate, luxury editorial
mood. Smooth slow motion, shallow depth of field. No text.
```

---

## 🎞️ Version 3 — Ouverture d'écrin (unboxing, 9:16 ou 1:1)

**Prompt :**
```
Close-up cinematic shot of a dark green velvet ZAAYNAA jewelry box with a gold
embossed lotus/star logo. The lid slowly opens to reveal the emerald ring nested
inside on satin, a warm golden light blooming over it as it appears. A single dried
champagne flower beside the box. Marrakech-palace-at-golden-hour mood. Slow, elegant,
premium. Seamless and quiet. No text, no people.
```

---

## Astuces de génération
- Toujours **uploader la photo de la bague en référence** pour garder l'identité exacte.
- Si le mouvement est trop rapide/brusque : ajouter « very slow, subtle motion, minimal camera movement ».
- Si le rendu est trop sombre : « soft warm lighting, brighter, luminous, not dramatic ».
- Générer d'abord la **V1 (16:9)** pour le site, puis la **V2 (9:16)** pour Instagram/TikTok.

---

## Intégration sur le site (une fois la V1 obtenue)
1. Renomme le fichier `zaaynaa-cinematic.mp4` et dépose-le dans `07_Site/storefront/public/`.
2. Dans `app/routes/_index.tsx`, section `Cinematic()`, remplace le bloc `<img … />` par :
```jsx
<video autoPlay muted loop playsInline poster="/hob-saphir-hero.png">
  <source src="/zaaynaa-cinematic.mp4" type="video/mp4" />
</video>
```
3. `npm run dev` pour vérifier, puis `npx shopify hydrogen deploy`.

*(Le reste de l'effet — rayon de lumière, éclats, vignette — reste par-dessus la vidéo et renforce le rendu.)*
