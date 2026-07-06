# 🛠️ ZAAYNAA — Prompt d'AMÉLIORATION du site existant
## (NE PAS recréer le site — améliorer l'existant uniquement)

> À donner à Claude Code / Fable. Ouvre le projet dans `ZAAYNAA/07_Site/storefront/`.

---

## ⚠️ RÈGLE ABSOLUE
**NE recrée PAS le site. NE lance PAS `create-next-app`, `create @shopify/hydrogen`, ni aucun scaffolding.**
Un site existe déjà et fonctionne. Tu dois **uniquement l'améliorer en modifiant les fichiers existants**. Ne remplace pas la stack, ne réinitialise pas le projet, ne supprime pas de pages.

---

## 📦 CE QUI EXISTE DÉJÀ (à conserver)
- **Stack** : Shopify **Hydrogen 2026.4.3** (React Router 7, Vite, Tailwind 4, framer-motion) — déployé sur Oxygen.
- **Emplacement** : `ZAAYNAA/07_Site/storefront/`.
- **Données** : vrais produits Shopify via Storefront API (colliers, bagues, boucles, bracelets « by Zaaynaa »). NE PAS remettre de produits démo / `mock.shop`.
- **Fichiers clés** :
  - `app/routes/_index.tsx` — page d'accueil (Hero, Marquee, Story, Categories, FeaturedPieces, Cinematic, Philosophy, Materials, Testimonials, Newsletter).
  - `app/styles/app.css` — tout le design (palette, sections, responsive, animations).
  - `app/components/` — `Header`, `Footer`, `PageLayout`, `Reveal` (animation scroll framer-motion), `Cursor` (curseur or desktop), `ProductCardV2`, etc.
  - `app/routes/products.$handle.tsx`, `collections.$handle.tsx`, `collections._index.tsx`, `about.tsx`, `contact.tsx`.
- **Marque** : « Modern Moroccan Quiet Luxury ». Palette : ivoire `#faf8f4`, or `#c9a96e`, émeraude `#1e3d34`, noir velours `#0d0d0d`. Titres serif (Cormorant Garamond), corps sans (Montserrat).

---

## 🎯 CE QUE TU DOIS AMÉLIORER (sans casser l'existant)

### 1. Compatibilité smartphone — PRIORITÉ N°1
- Le site doit être **irréprochable sur mobile**, pas seulement sur ordinateur.
- Vérifie/garantis : `<meta viewport>` présent, **menu burger fonctionnel**, **zéro scroll horizontal**, grilles en 1 colonne, images plein écran, typographie fluide (`clamp()`), marges verticales réduites sur petit écran (pas de grands vides).
- Fiche produit mobile : bouton **« Ajouter au panier » sticky** en bas.
- Cibles tactiles ≥ 44px. **Teste réellement en < 400px de large** avant de valider chaque page.

### 2. Design plus moderne / « wow »
- Renforce le côté éditorial haut de gamme (réf. Mejuri, Aurate, Dior Joaillerie).
- Hiérarchie typographique plus affirmée, plus d'air, grilles photos plus généreuses (ratio portrait 4:5), hover qui révèle une 2e image quand disponible.
- Améliore les pages **fiche produit**, **collection** et **panier** au même niveau que l'accueil.

### 3. Animations & micro-interactions
- Amplifie (avec goût) : reveals au scroll (composant `Reveal` déjà présent), hovers sur cartes/boutons/liens, transitions de page fluides.
- Garde tout **subtil et rapide** (le luxe ne clignote pas). Respecte `prefers-reduced-motion`.

### 4. Sections cinématiques
- Une section cinématique existe déjà (`Cinematic` dans `_index.tsx`, effet lumière + éclats + ken-burns en CSS). Améliore-la si tu peux et garde-la **prête pour une vraie vidéo** (`<video>` dans `/public`).

---

## 🚦 MÉTHODE DE TRAVAIL
1. **Lis d'abord** `app/routes/_index.tsx` et `app/styles/app.css` en entier avant de modifier.
2. Fais des **modifications ciblées** (édite les fichiers existants), pas de réécriture globale.
3. Réutilise les classes et composants déjà là (`Reveal`, `.zy-*`, `.product-card`, etc.).
4. Après chaque lot : `npm run dev`, teste **desktop ET mobile** (mode responsive), corrige.
5. Ne touche pas à `.env` (token Storefront), ni à la config de déploiement.
6. À la fin : `npm run build` doit passer, puis explique comment redéployer (`npx shopify hydrogen deploy`).

---

## ✅ CRITÈRES DE FIN
```
☐ Site NON recréé — mêmes projet, stack et pages, seulement améliorés
☐ Vrais produits Shopify toujours affichés (aucun produit démo)
☐ Parfait sur smartphone (burger OK, pas de scroll horizontal, add-to-cart sticky)
☐ Design plus moderne/éditorial sur toutes les pages (accueil, produit, collection, panier)
☐ Animations/hover renforcés mais subtils, prefers-reduced-motion respecté
☐ npm run build passe sans erreur
```

---

# 🎬 ANNEXE — Animations & vidéo cinématique

## A. Animations en CSS/JS (à faire dans le site, gratuit, sans outil externe)
La section `Cinematic` de `_index.tsx` a déjà : ken-burns (zoom lent), rayon de lumière or qui traverse (`.zy-cinema-sweep`), éclats scintillants (`.zy-spark`), vignette. **Garde et affine** ces effets. Tu peux les étendre ailleurs avec goût :
- Léger **parallax au scroll** sur les grandes images (hero, story) via `transform: translateY` piloté par le scroll.
- **Reveals** au scroll partout (composant `Reveal` déjà présent) — décale légèrement les délais pour un effet en cascade.
- Hovers : cartes produit qui se soulèvent (ombre + `translateY`), liseré or sur les cartes catégories, flèches de boutons qui glissent.
- **Toujours** : subtil, lent, élégant ; respecter `@media (prefers-reduced-motion: reduce)`.

## B. Vidéo cinématique (quand des crédits Higgsfield seront dispo)
La section `Cinematic` est prête à recevoir une vraie vidéo. Prompts à utiliser (uploader la **photo de la bague en référence** à chaque fois) :

**V1 — Bande site (paysage 16:9, 5–8 s, 1080p, boucle fluide, audio OFF)**
```
Cinematic luxury jewelry film. Extreme close-up of the ZAAYNAA emerald-cut ring
(keep the ring identical to the reference: gold vermeil band, deep green emerald,
pavé diamonds). The ring rests on dark green velvet. A slow, smooth camera push-in
while a soft golden light sweeps across the stone, making the emerald glow and the
diamonds sparkle. Faint Moroccan zellige shadows and warm bokeh in the background.
Gentle floating dust particles catching the light. High-end perfume-ad aesthetic.
Shallow depth of field, slow elegant motion, seamless loop. No text, no people.
```

**V2 — Reel / TikTok (vertical 9:16, main + packaging)**
```
Cinematic vertical jewelry ad. A young woman's elegant manicured hand gently lifts
the ZAAYNAA emerald ring (identical to reference) out of a dark green velvet ZAAYNAA
box with a gold embossed logo, and slides it onto her finger. She turns her hand
slowly so the emerald catches warm golden light and sparkles. Soft Moroccan lantern
glow and zellige tiles blurred in the background. Warm, intimate, luxury editorial
mood. Smooth slow motion, shallow depth of field. No text.
```

**V3 — Ouverture d'écrin (unboxing, 9:16 ou 1:1)**
```
Close-up cinematic shot of a dark green velvet ZAAYNAA jewelry box with a gold
embossed lotus/star logo. The lid slowly opens to reveal the emerald ring nested
inside on satin, warm golden light blooming over it. A single dried champagne flower
beside the box. Marrakech-palace-at-golden-hour mood. Slow, elegant, premium.
Seamless and quiet. No text, no people.
```

## C. Intégrer la vidéo une fois obtenue
1. Renomme le fichier `zaaynaa-cinematic.mp4` → dépose-le dans `07_Site/storefront/public/`.
2. Dans `app/routes/_index.tsx`, section `Cinematic()`, remplace le bloc `<img … />` par :
```jsx
<video autoPlay muted loop playsInline poster="/hob-saphir-hero.png">
  <source src="/zaaynaa-cinematic.mp4" type="video/mp4" />
</video>
```
3. `npm run dev` pour vérifier, puis `npx shopify hydrogen deploy`.
*(Les effets rayon de lumière / éclats / vignette restent par-dessus la vidéo.)*
