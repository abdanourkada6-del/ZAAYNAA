# 🖥️ ZAAYNAA — PROMPT COMPLET POUR CLAUDE CODE
## Création du site e-commerce + génération des visuels (Higgsfield / Canva)

> **Comment utiliser ce fichier :** ouvre Claude Code dans le dossier `ZAAYNAA/07_Site/`, puis colle l'intégralité de ce document comme premier message. Il contient tout : la marque, l'emplacement du logo, le catalogue produit, les descriptions de chaque photo, et les instructions de génération d'images.

---

## 0. RÔLE & MISSION

Tu es un développeur front-end senior + directeur artistique. Ta mission : **construire le site e-commerce complet de ZAAYNAA**, une marque de joaillerie « Modern Moroccan Quiet Luxury », et **générer tous les visuels manquants** (photos produit + backgrounds + bannières) en utilisant les outils **Higgsfield** (MCP connecté) ou **Canva** (MCP connecté).

Livrable final : un site responsive, rapide, élégant, prêt à être déployé, avec un catalogue de 11 produits, des pages produit complètes, un panier, et une identité visuelle cohérente.

---

## 1. ADN DE MARQUE (règle d'or — à respecter partout)

```
ZAAYNAA — "Modern Moroccan Quiet Luxury"
Une maison de joaillerie parisienne secrètement inspirée par le Maroc.
Discret en surface. Extraordinaire de près.

DNA :
- Minimalisme parisien rencontre l'héritage marocain
- "Discret mais WOW de près"
- PAS maximaliste, PAS cheap, PAS bijou de mariée traditionnel
- Référence : proportions Mejuri + mood Dior Joaillerie + âme de Marrakech

Règles visuelles (pour TOUTE image générée) :
- Lumière naturelle douce OU lumière cinématique chaude UNIQUEMENT
- PAS de fonds dramatiques noirs et durs
- PAS de designs surdimensionnés
- Proportions fines, féminines, raffinées
- Détails marocains cachés (qu'on découvre lentement)
- Matériaux : argent sterling 925 + vermeil or 18k
- Calligraphie arabe fine quand mentionnée (حب، صبر، نور، نجمة، هلال)
```

---

## 2. EMPLACEMENT DES ASSETS

```
ZAAYNAA/
├── 01_Brand/        → LOGO ICI (PNG transparent), palette couleurs, storytelling
├── 02_Designs/      → designs de référence des bijoux (par produit)
├── 07_Site/         → TU TRAVAILLES ICI
│   └── Assets/      → dépose ici toutes les images générées (HD)
```

- **Logo** : utilise le fichier logo présent dans `../01_Brand/` (PNG transparent, monogramme floral/étoile + texte « ZAAYNAA »). Décline-le en version or sur fond clair et version claire sur fond sombre. **N'AFFICHE AUCUN slogan placeholder** type « Elegance by nature ». Slogan officiel uniquement : « Discret en surface. Extraordinaire de près. »

---

## 2.5 ⚠️ CORRECTIONS CRITIQUES (à lire en premier)

Une première version a été construite et présentait 3 bugs majeurs. NE LES REPRODUIS PAS :

1. **JAMAIS de catalogue démo / `mock.shop`.** La version précédente affichait des T-shirts / hoodies verts : c'étaient des produits de démonstration. **INTERDIT.** Connecte le site à la **vraie boutique ZAAYNAA** via ses variables d'environnement réelles (`.env.local`) :
   - `SHOPIFY_STORE_DOMAIN` = le domaine `.myshopify.com` de la vraie boutique
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = le token Storefront API (lecture) de cette boutique
   - `SHOPIFY_API_VERSION` = version stable récente de l'API (ex. `2026-01`)
   - Aucune donnée factice, aucun catalogue de démonstration nulle part.
2. **Aucun produit en dur, aucune section démo.** Supprime toute section « Disponible maintenant » ou autre qui afficherait des produits factices. Toutes les pièces affichées viennent de la **Storefront API de la vraie boutique** (avec LEURS vraies photos déjà sur le CDN Shopify — c'est ça, « importer les photos »).
3. **Aucun texte placeholder** (« Elegance by nature », lorem ipsum, etc.). Uniquement le contenu de marque de ce document.
4. **COMPATIBLE SMARTPHONE = OBLIGATOIRE, pas optionnel.** Le site doit être aussi soigné sur mobile que sur ordinateur — c'est même la priorité (la majorité du trafic bijoux est mobile). Exigences fermes :
   - `<meta name="viewport" content="width=device-width, initial-scale=1">` présent.
   - Menu **burger** fonctionnel sur mobile (le menu doit s'ouvrir, même si la boutique n'a pas de menu Shopify configuré).
   - **Zéro scroll horizontal** : aucune section ne dépasse la largeur de l'écran.
   - Grilles qui passent en 1 colonne, images plein écran, typographie fluide (`clamp()`), marges verticales réduites sur petit écran (pas de grands vides).
   - Bouton « Ajouter au panier » **sticky** en bas sur la fiche produit mobile.
   - Cibles tactiles ≥ 44px, pas de survol requis pour accéder à une info.
   - **Tester réellement** en < 400px de large (mode responsive du navigateur / vrai téléphone) avant de considérer la page terminée.

> Le catalogue réel existe déjà dans Shopify (colliers Layali/Rimal/Wardah/Noujoum/Zahra, bagues Qalb/Jawharah, boucles Farasha/Najma&Qamar, bracelets Nahr/Lamah…). Affiche CE catalogue réel. La collection concept (HOB/HILAL/SABR/NAJMA/NOUR) de la section 5 sert de cible : crée ces produits dans Shopify **seulement si demandé** ; sinon, mappe les vrais produits existants sur les collections « Héritage » / « Nour ».

---

## 3. STACK TECHNIQUE — NEXT.JS + SHOPIFY STOREFRONT API (headless)

Le site est un **storefront headless React/Next.js** branché sur la vraie boutique Shopify via la **Storefront API (GraphQL)**, déployé sur **Vercel**. (On n'utilise PAS Hydrogen — liberté de design totale, même résultat commerce via l'API.)

- **Next.js (App Router) + TypeScript + Tailwind CSS** (dernière version stable).
  - Scaffolder via `npx create-next-app@latest` (App Router, TS, Tailwind).
  - Server Components pour les fetchs Storefront API ; React Server Actions pour les mutations panier.
- **Données produit = Shopify Storefront API (GraphQL)**, PAS de fichier local de produits.
  - Crée une couche `lib/shopify/` : client GraphQL (fetch vers `https://{SHOPIFY_STORE_DOMAIN}/api/{version}/graphql.json` avec header `X-Shopify-Storefront-Access-Token`), + requêtes typées (products, collections, product by handle, cart).
  - Le site lit le **catalogue réel** (produits, variantes/tailles, prix, **images depuis le CDN Shopify**, collections, metafields). Inspire-toi de l'exemple officiel **Next.js Commerce** pour l'architecture.
  - Storytelling FR/EN, calligraphie arabe et « détail caché » → lus depuis des **metafields** produit (à créer côté Shopify si besoin).
- **Panier & checkout** : panier via la **Cart API** de la Storefront API (création/ajout/maj lignes, stocké via cookie `cartId`), puis **redirection vers le `checkoutUrl`** renvoyé par Shopify (checkout hébergé Shopify — pas de paiement maison).
- Animations : **Framer Motion** (reveals au scroll, transitions de page), subtil et raffiné.
- Images via `next/image` (autorise le domaine `cdn.shopify.com` dans `next.config`). Polices via `next/font`.
- 100 % responsive (mobile-first), Core Web Vitals au vert, Lighthouse > 90 partout.
- **Déploiement : Vercel** (gratuit), variables d'env configurées dans le dashboard. Donne les instructions de déploiement à la fin.
- Pour créer/mettre à jour produits, collections, variantes et uploader des images côté Shopify, utilise le **connecteur Shopify (MCP)** (côté admin) — distinct de la Storefront API (côté lecture site).

---

## 4. DESIGN SYSTEM

```
COULEURS
- Or champagne / vermeil : #C9A24B (accents, prix, CTA secondaires)
- Or foncé texte       : #8A6D3B
- Crème / ivoire fond  : #F6F1E7
- Vert émeraude profond: #1E3D34 (collection NOUR, accents)
- Noir velours         : #14110F (sections sombres, footer)
- Gris taupe texte     : #5B5550

TYPOGRAPHIE
- Titres : serif élégante (Cormorant Garamond ou Playfair Display) — fine, espacée
- Corps  : sans-serif épurée (Inter ou Jost) — légère, lisible
- Petites majuscules espacées (letter-spacing) pour les labels et le mot ZAAYNAA

PRINCIPES
- Beaucoup d'espace blanc (luxe = respiration)
- Bordures fines, ombres très douces
- Transitions lentes et raffinées
- Le ✦ (étoile) comme signature graphique discrète
```

### DIRECTION DESIGN MODERNE (obligatoire — vise un site « WOW »)

Le rendu doit être **éditorial, contemporain et haut de gamme**, niveau Mejuri / Aurate / Vrai & Oro / Dior Joaillerie. Pas un thème Shopify générique.

- **Hero immersif** : grande image ou vidéo produit plein écran (pas un fond crème vide), titre serif surdimensionné, beaucoup d'air, un seul CTA fort. Le hero actuel (fond beige vide) est à proscrire.
- **Photos d'abord** : les visuels produit occupent une grande place. Grilles asymétriques / bento, images plein-bleed, ratio portrait 4:5 pour les cartes produit, hover qui révèle une 2e photo.
- **Micro-interactions** : reveal au scroll (Framer Motion / Intersection Observer), parallax doux sur les images hero, transitions de page fluides, curseurs et liens soulignés animés. Subtil, jamais clinquant.
- **Typo expressive** : gros titres serif (clamp() responsive), labels en petites majuscules très espacées, contraste fort entre titres XXL et corps fin.
- **Sections rythmées** : alternance fond crème / fond émeraude / fond noir velours pour créer un parcours visuel. Bandeaux storytelling pleine largeur avec macro des détails.
- **Détail signature marocain** : motif zellige discret en filigrane (SVG léger) dans certaines sections, calligraphie arabe en élément graphique géant et translucide.
- **Sticky header** transparent → crème au scroll, **mini-cart en drawer** animé, **mega-menu** élégant pour Collections.
- **Mobile = priorité** : sur mobile le site doit être aussi soigné (images plein écran, typo qui respire, sticky add-to-cart sur la fiche produit).
- **Cohérence** : système d'espacement (échelle 4/8px), composants réutilisables, états hover/focus soignés partout.

> Cible : qu'on ait l'impression d'un site de maison de joaillerie premium, pas d'un template. Si un choix paraît « générique », pousse-le plus loin.

---

## 5. CATALOGUE PRODUIT (11 produits + descriptions photos)

> Chaque produit a une fiche complète : nom, sous-titre, calligraphie, prix, description longue (storytelling), matériaux, et la **description de la photo** servant de brief de génération.

### COLLECTION HÉRITAGE (sans pierres — argent 925)

**1. HOB CLASSIC — 69 €** · حب (amour)
- Bague jonc ultra-fine en vermeil or 18k, petit plateau plat gravé de la calligraphie « حب ». Filigrane marocain caché sous le jonc (visible sous certains angles). « ZAAYNAA » gravé à l'intérieur. Pas de pierre.
- *Photo de référence (uploadée)* : moodboard 6 panneaux — version chaude (lumière dorée, ombres de moucharabieh, zellige) ET version douce (soie crème, perles). Plans : bague seule, main féminine ongles nude, macro de la gravure حب, vue de profil ultra-fine, story card, écrin velours noir.
- Story card : « HOB حب — LOVE, ENGRAVED FOREVER. / L'amour gravé dans l'or. Une déclaration discrète, mais éternelle. »

**2. HILAL CLASSIC — 69 €** · هلال (croissant)
- Jonc ultra-fin, tout petit croissant de lune délicat (4 mm), profil fin. Pas de pierre. Esthétique céleste, crème + bleu nuit.
- Story card : « HILAL هلال — MOONLIGHT, ETERNAL. / Comme la lune sur Marrakech la nuit. Une promesse d'élégance silencieuse. »

**3. SABR CLASSIC — 79 €** · صبر (patience)
- Chevalière féminine ultra-délicate, jonc très fin, petit plateau ovale (max 6 mm) gravé « صبر ». Pas de pierre.
- *Photo de référence (uploadée)* : moodboard — lin blanc + branche d'olivier, main tenant un verre de thé à la menthe, macro du plateau ovale صبر, profil fin, story card crème, écrin noir.
- Story card : « SABR صبر — PATIENCE, ENGRAVED WITHIN. / La patience gravée à l'intérieur. Un secret précieux, porté contre la peau. »

**4. NAJMA CLASSIC — 79 €** · نجمة (étoile)
- Jonc fin, étoile à 8 branches (géométrie islamique) ajourée sur le dessus (~8 mm), structure architecturale en couches. Pas de pierre.
- *Photo de référence (uploadée)* : moodboard — étoile ajourée sur marbre clair, main devant miroir marocain (henné discret), macro top-down de l'étoile, bague sur zellige vert/crème, story card, écrin avec lanterne.
- Story card : « NAJMA نجمة — THE STAR THAT GUIDES. / L'étoile à 8 branches, symbole millénaire d'équilibre. Réinventée pour aujourd'hui. »

**5. ZELLIGE SET (×3) — 109 €**
- Set de 3 joncs fins empilables, chacun avec un motif géométrique zellige subtil différent. Empilables sans surépaisseur.
- Story card : « ZELLIGE — ANCIENT ART. MODERN GRACE. / L'art ancestral des palais marocains, transformé en trio délicat. »

### COLLECTION NOUR (avec pierres — argent 925 + zirconia)

**6. HOB ÉMERAUDE — 129 €** · حب 💚
- Jonc fin vermeil or 18k, petite pierre taille émeraude vert profond (4×3 mm), structure géométrique marocaine cachée sous la pierre (visible de profil en macro), micro-pavé 3 zirconia blancs de chaque côté.
- *Photo de référence (uploadée)* : moodboard vert émeraude + or — bague sur velours vert, main avec manche soie verte + lanterne, macro du sertissage caché, bague sur zellige vert, story card « HOB ÉMERAUDE », écrin velours noir doublure verte.
- Story card : « HOB ÉMERAUDE حب — LOVE, SET IN EMERALD. / L'amour serti dans l'émeraude. La lumière cachée dans la pierre. »

**7. HOB SAPHIR — 129 €** · حب 💙
- Identique à HOB ÉMERAUDE mais pierre saphir bleu profond. Mood : soie bleu nuit + clair de lune. « Marrakech sous les étoiles ».
- Story card : « HOB SAPHIR حب — LOVE UNDER MIDNIGHT SKIES. »

**8. HOB CRISTAL — 119 €** · حب 🤍
- Identique mais pierre zirconia blanche type diamant. Le plus polyvalent, luxe du quotidien. Mood : marbre blanc + lumière du matin.
- Story card : « HOB CRISTAL حب — LOVE, CRYSTALLIZED. »

**9. HILAL LUNE BLEUE — 129 €** · هلال 🌙
- Jonc ultra-fin, croissant (6 mm) avec petit saphir bleu serti dedans — la pierre EST la lune.
- Story card : « HILAL LUNE BLEUE هلال — THE MOON THAT NEVER SETS. »

**10. NAJMA ÉMERAUDE — 149 €** · نجمة ✨💚
- Étoile 8 branches avec zirconia émeraude au centre, la structure tient la pierre comme une fenêtre marocaine tient la lumière. Micro-pavé sur les pointes.
- *Variante vue en photo : NAJMA DOME* — version bombée/dôme en or poli avec étoile + petit diamant central (à présenter comme alternative de la fiche NAJMA).
- Story card : « NAJMA ÉMERAUDE نجمة — THE STAR THAT ILLUMINATES. »

**11. NOUR ÉMERAUDE SIGNATURE — 179 €** · نور 💎 (PRODUIT PHARE / HERO)
- Jonc fin-à-moyen vermeil or 18k, émeraude taille rectangulaire (6×4 mm) vert vif, architecture marocaine (zellige) cachée sous la pierre — LE moment WOW en macro. Micro-pavé 4-5 zirconia de chaque côté. Inscription « نور » (lumière) à l'intérieur.
- Story card : « NOUR نور — LIGHT HIDDEN IN EMERALD. / La lumière cachée dans l'émeraude. Au cœur de la pierre, l'âme marocaine. »

### BUNDLES
- Duo HOB Classic + HOB Émeraude : **179 €**
- Trio Héritage (HOB + HILAL + SABR) : **189 €**
- Set NOUR Complet (3 pierres) : **329 €**

---

## 6. PAGES & STRUCTURE DU SITE

1. **Accueil**
   - Hero plein écran : visuel NOUR SIGNATURE ou HOB Émeraude + accroche « Discret en surface. Extraordinaire de près. » + CTA « Découvrir la collection ».
   - Bandeau marque (3 mots-clés : Héritage · Minimalisme · Quiet Luxury).
   - Sélection « Nos pièces phares » (3-4 produits).
   - Bloc storytelling « L'âme marocaine, cachée » (avec macro des détails).
   - Les 2 collections (Héritage / Nour) en 2 cartes.
   - Réassurance (argent 925 + vermeil 18k, gravure offerte, écrin ZAAYNAA, livraison soignée).
   - Newsletter + footer.

2. **Collections** — page liste filtrable (Héritage / Nour / Tout), grille de cartes produit (image, nom, calligraphie, prix).

3. **Page produit** (gabarit unique pour les 11) :
   - Galerie (4-6 visuels du moodboard : hero, main, macro, profil/lifestyle, écrin).
   - Nom + calligraphie + prix + sélecteur de taille + quantité + « Ajouter au panier ».
   - Story card (la citation FR/EN).
   - Accordéons : Détails & matériaux · Le détail caché (WOW) · Livraison & écrin.
   - Produits liés (même collection).

4. **Notre histoire** — la marque, le concept « quiet luxury » marocain, l'engagement qualité.

5. **Panier / Checkout** — panier en drawer (Cart API Storefront, cookie `cartId`) + redirection vers le `checkoutUrl` Shopify.

6. **Contact / FAQ** + mentions légales.

Composants transverses : header transparent qui devient crème au scroll, mini-cart en drawer, boutons or, micro-animations Framer Motion.

---

## 7. 🎨 GÉNÉRATION DES IMAGES (Higgsfield / Canva) — TRÈS IMPORTANT

**Priorité photos : utilise d'abord les vraies photos produit déjà présentes sur le CDN Shopify** (elles arrivent automatiquement via la Storefront API quand on est branché sur la vraie boutique — c'est ça, « importer les photos »). La génération ci-dessous sert UNIQUEMENT à compléter ce qui manque.

Le site a besoin de : (a) les **photos produit** = celles de Shopify en priorité, génération seulement si une pièce n'a pas de visuel correct ; (b) les **backgrounds/textures** (velours, zellige, soie, marbre) ; (c) les **bannières** hero et collection ; (d) les **story cards** typographiques.

### Règle d'or à coller AVANT chaque prompt d'image
```
I'm creating jewelry product images for ZAAYNAA, a "Modern Moroccan Quiet Luxury" brand.
Parisian minimalism + Moroccan heritage. "Discret mais WOW de près."
Soft natural OR warm cinematic light ONLY. NO harsh dark dramatic backgrounds.
Thin feminine refined proportions. Hidden Moroccan details. 18k gold vermeil + 925 silver.
Use the ZAAYNAA ring reference image when provided. Aspect ratio per use case.
```

### Comment générer (outils)
- **Photos produit & backgrounds réalistes → Higgsfield** (MCP). Utilise le modèle image produit ; uploade l'image de référence de la bague (dossier `02_Designs/` ou l'image fournie) via le widget d'upload pour garder l'identité du bijou. Formats : `4:5` (cartes produit), `1:1` (galerie/IG), `16:9` (bannières hero), `9:16` (mobile/stories).
- **Story cards, mises en page typographiques, bannières avec texte, logo → Canva** (MCP). Utilise le logo de `01_Brand/`, la palette (section 4) et les polices serif/sans. Le texte arabe et français doit être net et bien centré.
- Sauvegarde **chaque image générée dans `07_Site/Assets/`** avec un nom clair : `hob-emeraude-hero.png`, `hob-emeraude-main.png`, `bg-velours-vert.png`, `hero-accueil.png`, etc., puis référence-les dans `/data/products.ts`.

### Prompts d'images par catégorie

**Backgrounds / textures (Higgsfield, 16:9 et 1:1)**
- `Deep emerald green velvet fabric, soft folds, warm golden cinematic light, luxury macro texture, no objects.`
- `Antique Moroccan zellige tile pattern, green/gold/ivory tones, soft natural light, top-down, luxury surface.`
- `Warm ivory marble with subtle Moroccan geometric shadow, soft golden morning light, minimal, no objects.`
- `Cream silk fabric with soft shadows, delicate, warm light, luxury backdrop, no objects.`

**Photos produit (Higgsfield, 4:5 / 1:1, AVEC image de référence du bijou)**
- Reprends pour CHAQUE produit les 6 panneaux décrits en section 5 (hero, main, macro détail caché, profil/lifestyle, écrin ZAAYNAA velours noir). Exemple HOB ÉMERAUDE :
  `Luxury jewelry product shot of the HOB Émeraude ring (keep ring identical to reference): thin 18k gold vermeil band, emerald-cut deep green stone, micro pavé. On deep green velvet, warm golden light making the stone glow, subtle Moroccan setting visible from the side. Editorial quiet luxury, shallow depth of field, 4:5.`
- Plan « bague à la main » : `Elegant feminine hand, neutral nails, wearing the ZAAYNAA ring (identical to reference), dark emerald silk sleeve, soft Moroccan lantern glow, warm and refined, NOT dramatic.`
- Plan « écrin » : `Black velvet ZAAYNAA jewelry box with gold embossed logo on lid, ring nested inside on satin lining, dried champagne flowers beside, warm soft light.`

**Bannières & story cards (Canva)**
- Hero accueil : visuel produit + logo ZAAYNAA + accroche « Discret en surface. Extraordinaire de près. » + CTA.
- Story card par produit : fond crème ou noir velours, titre serif (ex. « HOB ÉMERAUDE حب »), sous-titre EN, citation FR, signature « ZAAYNAA ✦ » — reproduire le style des moodboards uploadés.

> ⚠️ Note budget Higgsfield : le plan peut limiter le nombre/le coût des générations (image ≈ 2 crédits, vidéo = plan payant). Génère en priorité les visuels du HERO (NOUR/HOB Émeraude) et de la page d'accueil, puis le reste. Préviens si les crédits sont insuffisants et propose Canva en repli pour les fonds/typographies.

---

## 8. CONTENU DES PHOTOS UPLOADÉES (brief visuel de référence)

Le client a fourni des moodboards 6 panneaux servant de **direction artistique exacte** à reproduire/adapter :

1. **HOB (version chaude)** — jonc or fin, disque gravé حب ; ambiance lumière dorée, ombres de moucharabieh, zellige, lanterne, écrin noir doublure noire, gypsophile séchée.
2. **HOB (version douce)** — même bague ; soie/lin crème, perles, fleurs blanches, story card crème.
3. **HOB (version sombre)** — même bague ; velours et marbre noirs, soie ivoire, story card noire « HOB — LOVE, WHISPERED IN GOLD ».
4. **NAJMA DOME** — bague dôme/bombée or poli, étoile 8 branches + petit diamant central ; marbre foncé, zellige, écrin.
5. **NAJMA (ajourée)** — étoile 8 branches ouverte sur jonc fin ; marbre crème, miroir marocain, henné, zellige vert.
6. **HOB ÉMERAUDE** — jonc or, émeraude taille émeraude + pavé ; velours vert, lanterne, zellige vert, écrin doublure verte.
7. **SABR** — chevalière ovale fine gravée صبر ; lin blanc, olivier, thé à la menthe, écrin noir.

Reproduis cette esthétique (lumière douce/chaude, détails marocains cachés, proportions fines) pour TOUS les visuels du site.

---

## 9. ORDRE D'EXÉCUTION RECOMMANDÉ

1. Scaffolder Next.js (App Router + TS + Tailwind), configurer `.env.local` avec le domaine + token Storefront API de la **vraie boutique**, autoriser `cdn.shopify.com` dans `next.config`.
2. Créer la couche `lib/shopify/` (client GraphQL + requêtes products/collections/cart) et vérifier qu'on lit bien le **catalogue réel** (test : afficher quelques vrais produits).
3. Côté Shopify (connecteur MCP) : créer/mapper les collections « Héritage » et « Nour », ranger les vrais produits dedans, ajouter les metafields nécessaires (calligraphie, story card FR/EN, détail caché).
4. Poser le design system + la direction design moderne (couleurs, polices, composants, header/footer, motifs).
5. Construire les pages (Accueil → Collections → Produit → Histoire → Panier → Contact) en lisant la Storefront API.
6. Compléter les visuels manquants (section 7) : HERO + backgrounds + story cards via Higgsfield/Canva, rangés dans `07_Site/Assets/` puis uploadés sur Shopify si ce sont des images produit.
7. Panier (Cart API) + redirection checkout Shopify fonctionnels.
8. Responsive + animations Framer Motion + accessibilité + SEO (titres, meta, Open Graph, alt FR).
9. Vérifier Lighthouse/Core Web Vitals, corriger, puis **déployer sur Vercel** et fournir les instructions (repo Git, variables d'env, domaine).

---

## 10. CRITÈRES DE RÉUSSITE (checklist finale)

```
☐ Next.js branché sur la Storefront API de la VRAIE boutique (zéro produit démo / mock.shop)
☐ Catalogue réel affiché avec ses vraies photos (CDN Shopify), collections « Héritage » / « Nour »
☐ Design moderne éditorial « wow » (hero immersif, grilles photos, micro-interactions) — pas un template
☐ Logo de 01_Brand intégré (header, footer, favicon), zéro slogan placeholder
☐ Palette + typographie « quiet luxury » respectées partout
☐ Visuels manquants générés via Higgsfield/Canva, rangés dans 07_Site/Assets
☐ Calligraphie arabe nette (حب صبر نجمة هلال نور)
☐ Panier (Cart API) + redirection checkout Shopify fonctionnels
☐ 100% responsive, Lighthouse > 90, Core Web Vitals au vert, SEO FR de base
☐ Déployé sur Vercel + instructions fournies
```

---

*ZAAYNAA — « Modern Moroccan Quiet Luxury ». Discret en surface. Extraordinaire de près. ✦*
