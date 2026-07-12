# 🎨 ZAAYNAA — Prompt DESIGN + ANIMATIONS (pour Claude Code)
## Améliorer le site Hydrogen existant — NE PAS le recréer

> À donner à Claude Code / Fable. Projet : `ZAAYNAA/07_Site/storefront/` (Hydrogen 2026.4, React Router 7, Tailwind 4, **framer-motion déjà installé**).
> Basé sur les règles UI/UX Pro Max (accessibilité + interaction + animation) et sur Framer Motion.

---

## ⚠️ RÈGLE ABSOLUE
NE recrée PAS le site, ne scaffold rien. **Modifie uniquement les fichiers existants.** Garde la stack, les pages, les vrais produits Shopify. Objectif : élever le **design** et ajouter des **animations élégantes et subtiles** (le luxe ne clignote pas).

---

## 1) DESIGN SYSTEM (à respecter partout)

**Style** : minimalisme éditorial haut de gamme (réf. Mejuri / Aurate / Dior Joaillerie). Beaucoup d'air, photos en grand, hiérarchie typographique forte.

**Couleurs — tokens sémantiques** (déclare-les en variables CSS/Tailwind, pas de hex en dur dans les composants) :
```
--ivory   #FAF8F4   (surface principale)
--ink     #1A1814   (texte fort)
--gold    #C9A96E   (accent / prix / CTA secondaires)
--gold-dk #8A6D3B   (texte or sur clair — contraste AA)
--emerald #1E3D34   (sections sombres, collection Nour)
--velvet  #0D0D0D   (footer, sections nuit)
--taupe   #6B6259   (texte secondaire — AA sur ivoire)
```
Contraste : **texte ≥ 4.5:1** (corps), 3:1 (grands titres). Vérifie l'or sur clair : utilise `--gold-dk` pour du texte, `--gold` seulement pour gros/décoratif.

**Typographie** : titres serif (Cormorant Garamond), corps sans (Montserrat). Échelle : 12 · 14 · 16 · 18 · 24 · 32 · 48 · 64. Corps **16px min** (mobile), line-height 1.5–1.7, mesure 60–75 caractères.

**Espacement** : rythme 8px, généreux (marketing) : sections 64–96px desktop, 40–64px mobile. Container max 1240px.

**Effets** : ombres très douces et cohérentes (échelle unique), rayons discrets (2px), 1 seul CTA primaire par écran.

---

## 2) SYSTÈME D'ANIMATION (Framer Motion)

**Tokens globaux** (centralise-les dans `app/lib/motion.ts`) :
```ts
export const EASE = [0.22, 1, 0.36, 1] as const;      // ease-out doux
export const DUR = { fast: 0.18, base: 0.28, slow: 0.5 }; // 150–300ms micro, ≤500ms max
export const SPRING = { type: "spring", stiffness: 320, damping: 30 } as const;
```

**Règles (issues des standards UI/UX) — impératives :**
- Micro-interactions **150–300ms**, transitions complexes ≤ 400–500ms. Jamais > 500ms.
- **Anime uniquement `transform` et `opacity`** (jamais width/height/top/left) → pas de reflow/CLS.
- **ease-out à l'entrée, ease-in à la sortie** ; sortie ~60–70% de la durée d'entrée.
- **Physique/spring** pour ce qui suit le doigt (drawer, boutons) → plus naturel.
- **Stagger 30–50ms** par item pour les listes/grilles (jamais tout d'un coup).
- **1 à 2 éléments animés max** par vue. Motion = sens (cause→effet), jamais décoratif seul.
- **Respect de `prefers-reduced-motion`** : enveloppe l'app dans `<MotionConfig reducedMotion="user">` (déjà en place) — garde les fondus, coupe les déplacements.
- Animations **interruptibles**, n'empêchent jamais l'interaction.

**Patterns à implémenter :**

1. **Transitions de page** (déjà amorcé) : fade + léger `y` (10px), 280ms, à la racine du `<main>`. Direction cohérente (avancer = vers le haut).
2. **Reveal au scroll** (composant `Reveal` existant) : `initial {opacity:0, y:24}` → `whileInView {opacity:1, y:0}`, `viewport={{once:true, margin:"-80px"}}`, ease-out 500–600ms. Ajoute le **stagger** sur les grilles produits (delay = index × 0.04–0.05).
3. **Hover cartes produit** : `whileHover={{ y:-6 }}` + ombre douce (déjà en CSS), image `scale:1.05` en 600ms. `scale-feedback` : **0.97–0.98 au press** (`whileTap`).
4. **Boutons** : remplissage or au survol (déjà en CSS), flèche qui glisse ; press `scale:0.98`.
5. **Hero** : ken-burns lent + **parallax subtil** sur l'image (déjà amorcé via `useScroll`/`useTransform`, amplitude ≤ 60px, coupé en reduced-motion).
6. **Mini-cart drawer** : slide-in depuis la droite avec **spring**, scrim 40–60% noir, fermeture ~70% de la durée d'ouverture, focus-trap + Échap.
7. **Galerie fiche produit (PDP)** : crossfade entre l'image principale et les vignettes (même conteneur) ; vignette active animée.
8. **Marquee / bandeau** : garde le défilement CSS (léger), pause au survol.

**Snippets de référence :**
```tsx
import {motion, useReducedMotion} from 'framer-motion';
import {EASE, DUR} from '~/lib/motion';

// Grille avec stagger
const container = {show:{transition:{staggerChildren:0.05}}};
const item = {hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:DUR.slow,ease:EASE}}};

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{once:true, margin:'-80px'}}>
  {products.map(p => <motion.li key={p.id} variants={item}>…</motion.li>)}
</motion.ul>

// Carte produit
<motion.article whileHover={{y:-6}} whileTap={{scale:0.98}} transition={{duration:DUR.base, ease:EASE}}>…</motion.article>
```

---

## 3) OÙ APPLIQUER (checklist par surface)

- **Accueil** : reveals + stagger sur Catégories/Pièces phares ; hero parallax ; garder la section cinématique.
- **Fiche produit (PDP)** : galerie crossfade, reveal du bloc infos, add-to-cart **sticky mobile**, accordéons animés (hauteur via `layout`/`AnimatePresence`, pas d'anim de height brute).
- **Collections** : grille en stagger, hover cartes, filtre animé (fade).
- **Header** : transparent → givré au scroll (déjà) ; soulignement or animé sous les liens ; burger mobile → drawer en spring.
- **Panier** : drawer spring + lignes qui apparaissent/disparaissent avec `AnimatePresence`.

---

## 3bis) RÉFÉRENCES VISUELLES & STRUCTURE DE PAGE (à imiter)

Inspire-toi de ces sites de joaillerie (même famille visuelle, tous « quiet luxury ») :
**Mejuri** (mejuri.com — c'est notre référence n°1, même stack Shopify Hydrogen), **Pandora** (uk.pandora.net — pour les vidéos), **Akali**, **Lunara**, **Glow & Co.**, **Keira Kelley**.

**ADN commun à reproduire :**
- Fond **crème / beige chaud** (#FAF8F4 → sable), beaucoup d'air.
- **Gros titres serif** ("Shine Brighter", "Elevate Every Moment") + sous-titre fin.
- **Grande photo hero** plein cadre (bijou sur pierre/soie, lumière chaude), 1 seul CTA.
- Palette neutre + **une touche émeraude** (comme Lunara/Glow) → colle à ZAAYNAA.

**Structure de la page d'accueil (dans cet ordre, comme les références) :**
1. **Hero** immersif (photo produit + titre serif + CTA « Découvrir la collection »).
2. **Bandeau réassurance** : Livraison offerte · Emballage soigné · Paiement sécurisé · Qualité 925+vermeil (icônes SVG fines, pas d'emoji).
3. **Cartes catégories** : Colliers · Boucles · Bagues · Bracelets (photo + « Explorer → »), comme Lunara/Glow.
4. **Bestsellers / Nouveautés** : grille 4 produits, note ★, prix, **bouton « Ajouter au panier »** visible (style Glow & Co).
5. **Bannière éditoriale** (offre ou histoire) sur fond émeraude, ex. « L'âme marocaine, cachée ».
6. **Section histoire** « Crafted with passion » → notre « Née de la grâce orientale ».
7. **Blog / Journal** (2-3 articles : entretien du bijou, style) — optionnel.
8. **Footer** riche : liens + **newsletter** + réseaux sociaux + moyens de paiement.

**La touche ZAAYNAA qui nous distingue de ces refs :** calligraphie arabe discrète (حب صبر نور), motif zellige en filigrane, story cards par produit, détail marocain caché. On prend leur **rigueur/minimalisme** + notre **âme arabo-marocaine**.

**Pages produit / collection / panier :** aligne-les sur **Keira Kelley** (catalogue épuré avec filtres à gauche, fiche produit avec galerie + accordéons + « You might also like », panier en drawer élégant).

---

## 4) GARDE-FOUS (à ne jamais violer)

- **Accessibilité** : contraste AA, focus visibles (2–4px), `aria-label` sur icônes, ordre clavier logique, `prefers-reduced-motion` respecté.
- **Tactile** : cibles ≥ 44px, espacement ≥ 8px, feedback au press < 100ms.
- **Perf** : images WebP/AVIF + `loading="lazy"` sous la ligne de flottaison, dimensions réservées (pas de CLS), transform/opacity only, pas de layout thrash.
- **Cohérence** : mêmes tokens de durée/easing partout (rythme unifié).

---

## 5) MÉTHODE
1. Lis `app/routes/_index.tsx`, `app/styles/app.css`, `app/components/*` avant de modifier.
2. Centralise les tokens motion dans `app/lib/motion.ts`, réutilise partout.
3. Modifie de façon ciblée, teste **desktop + mobile (375px)** + **reduced-motion activé**.
4. `npm run build` doit passer. Puis explique le redéploiement (`npx shopify hydrogen deploy`).

## ✅ Critères de fin
```
☐ Site amélioré, pas recréé ; vrais produits Shopify intacts
☐ Design éditorial luxe cohérent (tokens couleur/type/espacement)
☐ Animations Framer Motion subtiles : reveal+stagger, hover, page transitions, drawer spring
☐ transform/opacity only, 150–300ms, prefers-reduced-motion respecté
☐ Contraste AA, cibles ≥44px, focus visibles
☐ Parfait sur mobile 375px, npm run build OK
```
