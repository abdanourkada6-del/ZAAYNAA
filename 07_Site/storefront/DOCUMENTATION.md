# 📘 ZAAYNAA Storefront — Documentation technique complète

> Public : élève ingénieur en informatique. Objectif : comprendre **toute**
> l'architecture du site, savoir le modifier, le déboguer et le déployer en
> autonomie. Lis dans l'ordre la première fois ; ensuite utilise-le comme
> référence.

---

## Table des matières

1. [Vue d'ensemble — c'est quoi ce site ?](#1-vue-densemble)
2. [La stack technique, brique par brique](#2-la-stack-technique)
3. [Architecture headless — le schéma mental](#3-architecture-headless)
4. [Structure des dossiers, fichier par fichier](#4-structure-des-dossiers)
5. [Cycle de vie d'une requête (SSR → hydratation)](#5-cycle-de-vie-dune-requête)
6. [La couche données : GraphQL & Storefront API](#6-la-couche-données)
7. [Le panier et le checkout](#7-le-panier-et-le-checkout)
8. [Le design system (CSS)](#8-le-design-system)
9. [Les animations (framer-motion + CSS)](#9-les-animations)
10. [Les données éditoriales (brand.ts)](#10-les-données-éditoriales)
11. [🔧 Recettes : comment modifier X](#11-recettes-de-modification)
12. [Commandes & workflow de dev](#12-commandes--workflow)
13. [Variables d'environnement & secrets](#13-variables-denvironnement)
14. [Débogage — les pièges déjà rencontrés](#14-débogage)
15. [Ressources pour aller plus loin](#15-ressources)

---

## 1. Vue d'ensemble

ZAAYNAA est un site e-commerce **headless** : le « front » (ce site) est
totalement découplé du « back » (Shopify). 

- **Shopify** gère : le catalogue produits, les prix, les stocks, les
  collections, le panier côté serveur, le paiement (checkout), les commandes,
  les clients. On n'écrit **aucun** code de paiement.
- **Ce projet** gère : tout ce que l'utilisateur voit. React rend les pages,
  interroge Shopify via une API GraphQL publique (la **Storefront API**) et
  redirige vers le checkout hébergé Shopify au moment de payer.

Pourquoi headless ? Liberté de design totale (pas de thème Shopify imposé),
performances contrôlées, et le front peut évoluer sans toucher au back.

```
┌────────────┐   HTML/JS    ┌──────────────────┐   GraphQL    ┌─────────────┐
│ Navigateur │ ◄──────────► │  CE PROJET       │ ◄──────────► │   SHOPIFY   │
│  (client)  │              │  (Hydrogen, SSR) │              │ (catalogue, │
└────────────┘              │  hébergé Oxygen  │              │  panier,    │
       │                    └──────────────────┘              │  checkout)  │
       │    redirection checkout (URL Shopify)                └─────────────┘
       └──────────────────────────────────────────────────────────►
```

---

## 2. La stack technique

| Brique | Rôle | Équivalent que tu connais peut-être |
|---|---|---|
| **Shopify Hydrogen** `2026.4.x` | Framework e-commerce de Shopify. C'est une surcouche fine de React Router qui pré-branche : client Storefront API, gestion du panier, analytics, SEO, images CDN. | « Next.js Commerce, mais officiel Shopify » |
| **React Router v7** (mode framework) | Le cœur : routing par fichiers, SSR, `loader()` côté serveur, hydratation client. C'est l'héritier de **Remix** (même équipe, Remix a fusionné dans React Router). | Next.js App Router (philosophie proche, API différente) |
| **React 18** | La lib UI. | — |
| **TypeScript** | Typage statique partout. Les types des réponses GraphQL sont **générés automatiquement** (voir §6.5). | — |
| **Vite** (+ Rolldown) | Bundler/dev-server. HMR instantané en dev, build optimisé en prod. | Webpack, mais moderne |
| **Tailwind CSS v4** | Installé et importé, mais **peu utilisé** : 95 % du style vit dans `app/styles/app.css` en CSS « vanilla » avec des variables CSS. Choix délibéré : un design system custom se lit mieux en CSS pur. | — |
| **framer-motion** | Animations React déclaratives (reveals au scroll, parallax, transitions de page). | GSAP/anime.js, en plus React-friendly |
| **MiniOxygen** | Simulateur local du runtime de prod (dev). | — |
| **Shopify Oxygen** | Hébergement de prod : le serveur SSR tourne comme un **worker** (V8 isolate, comme Cloudflare Workers) sur le CDN mondial de Shopify. Gratuit avec le plan Shopify. | Vercel Edge / Cloudflare Workers |

⚠️ Conséquence du runtime « worker » : **pas d'API Node.js** dans le code
serveur (`fs`, `path`, `process`… interdits). On utilise les API Web standard
(`fetch`, `Request`, `Response`, `caches`).

---

## 3. Architecture headless

### Les DEUX API Shopify (à ne jamais confondre)

| | Storefront API | Admin API |
|---|---|---|
| Utilisée par | **ce site** (lecture catalogue + panier) | outils d'admin (créer des produits, etc.) |
| Auth | token **public** (`PUBLIC_STOREFRONT_API_TOKEN`, 32 car. hex) — conçu pour être exposé dans un navigateur | token **secret** (`shpat_…` / `atkn_…`) — ne doit JAMAIS apparaître dans ce projet |
| Portée | lecture produits/collections, création de panier | lecture/écriture de tout |
| Endpoint | `https://{domaine}/api/{version}/graphql.json` | `https://{domaine}/admin/api/...` |

Le site n'utilise QUE la Storefront API. Si tu vois un token `shpat_` ou
`atkn_` dans le code un jour : c'est une faille, supprime-le et régénère-le.

### Le flux complet d'un achat

```
1. GET /products/layali-…      → loader() interroge la Storefront API (produit + variantes)
2. Rendu SSR                   → HTML complet renvoyé (SEO ✓, rapide ✓)
3. Hydratation                 → React « prend vie » côté client
4. Clic « Ajouter au panier »  → CartForm POST /cart (action React Router)
5. action() de cart.tsx        → mutation Cart API (cartLinesAdd) via Hydrogen
                                 → cookie `cart` posé (l'ID du panier Shopify)
6. UI optimiste                → le drawer affiche l'article AVANT la réponse serveur
7. « Finaliser la commande »   → redirection vers cart.checkoutUrl
                                 → checkout 100 % hébergé par Shopify (paiement, livraison)
```

---

## 4. Structure des dossiers

```
07_Site/storefront/
├── .env                    ← secrets locaux (JAMAIS commité)
├── package.json            ← scripts npm + dépendances
├── vite.config.ts          ← config bundler (plugins hydrogen + oxygen + react-router + tailwind)
├── react-router.config.ts  ← config du framework (SSR activé)
├── server.ts               ← POINT D'ENTRÉE SERVEUR : reçoit chaque Request,
│                              crée le contexte Hydrogen, délègue à React Router
├── tsconfig.json
├── storefrontapi.generated.d.ts ← types TS AUTO-GÉNÉRÉS depuis tes requêtes GraphQL
│                                   (ne JAMAIS éditer à la main — régénéré par `npm run dev`)
├── public/                 ← fichiers statiques servis tels quels
│   ├── nour-signature-hero.png   (image hero accueil)
│   ├── hob-emeraude-hero.png     (section Story)
│   ├── hob-cristal-hero.png      (section Matières)
│   ├── hob-saphir-hero.png       (section Cinematic — poster vidéo)
│   └── (futur : zaaynaa-cinematic.mp4)
└── app/                    ← TOUT LE CODE APPLICATIF
    ├── root.tsx            ← layout HTML global (<html>, <head>, fonts, CSS),
    │                          loader racine (header, panier, analytics)
    ├── entry.client.tsx    ← démarrage React côté navigateur (hydratation)
    ├── entry.server.tsx    ← rendu SSR + Content-Security-Policy
    ├── routes/             ← 1 fichier = 1 URL (convention "flat routes")
    │   ├── _index.tsx                  → /            (accueil, 9 sections)
    │   ├── collections._index.tsx      → /collections (univers + catégories)
    │   ├── collections.$handle.tsx     → /collections/:handle (grille produits)
    │   ├── collections.all.tsx         → /collections/all (tout le catalogue)
    │   ├── products.$handle.tsx        → /products/:handle (fiche produit)
    │   ├── cart.tsx                    → /cart + ACTION du panier (mutations)
    │   ├── about.tsx / contact.tsx     → pages éditoriales
    │   ├── search.tsx                  → /search
    │   ├── account*.tsx                → espace client (Customer Account API)
    │   ├── [sitemap.xml].tsx, [robots.txt].tsx → SEO
    │   └── $.tsx                       → catch-all 404
    ├── components/
    │   ├── PageLayout.tsx   ← squelette de page : MotionConfig, Cursor, Header,
    │   │                       <main> + transition de page, Footer, drawers (Asides)
    │   ├── Header.tsx       ← nav fixe transparente→givrée au scroll
    │   ├── Footer.tsx       ← footer sombre 4 colonnes
    │   ├── Aside.tsx        ← système de drawers (panier/recherche/menu mobile)
    │   │                       via React Context (useAside → open('cart'))
    │   ├── ProductCardV2.tsx← LA carte produit (image 3:4, hover 2e image,
    │   │                       overlay, prix) + liste HIDDEN_PRODUCT_HANDLES
    │   ├── ProductForm.tsx  ← sélecteur de variantes + bouton Ajouter au panier
    │   ├── AddToCartButton.tsx ← CartForm (mutation LinesAdd) + bouton
    │   ├── CartMain.tsx / CartLineItem.tsx / CartSummary.tsx ← contenu du drawer panier
    │   ├── Reveal.tsx       ← wrapper framer-motion : apparition au scroll
    │   ├── Cursor.tsx       ← curseur or custom (desktop uniquement)
    │   └── Logo.tsx         ← logo SVG vectoriel (lotus + wordmark)
    ├── lib/
    │   ├── context.ts       ← createHydrogenContext (client storefront, session, panier)
    │   ├── fragments.ts     ← fragments GraphQL partagés (CART_QUERY_FRAGMENT, HEADER_QUERY…)
    │   ├── brand.ts         ← DONNÉES ÉDITORIALES (voir §10)
    │   ├── session.ts       ← session signée par cookie (SESSION_SECRET)
    │   ├── variants.ts      ← helper URL de variante
    │   └── redirect.ts      ← redirection si handle localisé
    └── styles/
        ├── reset.css        ← reset navigateur
        ├── tailwind.css     ← import Tailwind (peu utilisé)
        └── app.css          ← ⭐ TOUT LE DESIGN (~3 700 lignes, voir §8)
```

### Convention de nommage des routes (React Router flat routes)

- `_index.tsx` → la page « racine » d'un segment.
- `.` dans le nom = `/` dans l'URL (`collections.all.tsx` → `/collections/all`).
- `$param` = segment dynamique (`products.$handle.tsx` → `/products/:handle`,
  accessible via `params.handle` dans le loader).
- `[fichier.xml].tsx` = les crochets échappent les caractères spéciaux.
- `$.tsx` = catch-all (404).

---

## 5. Cycle de vie d'une requête

C'est LE concept central de React Router / Remix. Chaque route exporte :

```tsx
// 1. Exécuté CÔTÉ SERVEUR uniquement, avant le rendu.
export async function loader({context, params, request}: Route.LoaderArgs) {
  const {storefront} = context;               // client GraphQL pré-configuré
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle: params.handle},
  });
  if (!product) throw new Response('Introuvable', {status: 404});
  return {product};                            // sérialisé → envoyé au client
}

// 2. Le composant (rendu SSR PUIS ré-exécuté côté client après hydratation).
export default function Product() {
  const {product} = useLoaderData<typeof loader>();  // données du loader, typées
  return <h1>{product.title}</h1>;
}

// 3. (Optionnel) reçoit les POST (formulaires) — ex. cart.tsx.
export async function action({request, context}: Route.ActionArgs) { … }

// 4. (Optionnel) balises <title>/<meta> de la page.
export const meta: Route.MetaFunction = ({data}) => [{title: data?.product.title}];
```

### Données critiques vs différées (pattern utilisé sur l'accueil)

```tsx
export async function loader(args) {
  // CRITIQUE : on ATTEND (bloque le HTML) — ce qui est nécessaire au 1er écran.
  const critical = await loadCriticalData(args);
  // DIFFÉRÉ : on n'attend PAS — la Promise elle-même est renvoyée au client.
  const deferred = loadDeferredData(args);   // ← pas de await !
  return {...critical, ...deferred};
}
```

Côté composant, une Promise se consomme avec `<Suspense>` + `<Await>` :

```tsx
<Suspense fallback={<div className="featured-grid" />}>
  <Await resolve={data.featured}>
    {(resolved) => /* rendu quand la promise résout */}
  </Await>
</Suspense>
```

→ Le HTML part immédiatement, les produits « streament » ensuite.
C'est pour ça que l'accueil est rapide même si Shopify met 300 ms à répondre.

### SSR + hydratation, en une phrase

Le serveur rend du HTML complet (SEO, vitesse) ; le navigateur charge ensuite
le JS et « hydrate » : React s'attache au HTML existant et le rend interactif.
**Règle d'or : le premier rendu client doit être IDENTIQUE au rendu serveur**,
sinon warning « hydration mismatch » (voir §14, on s'est fait avoir).

---

## 6. La couche données

### 6.1 Le client `context.storefront`

Créé dans `app/lib/context.ts` par `createHydrogenContext()`. Il lit
`PUBLIC_STORE_DOMAIN` + `PUBLIC_STOREFRONT_API_TOKEN` depuis l'env et expose :

- `storefront.query(QUERY, {variables, cache})` — lectures
- `storefront.CacheLong() / CacheShort() / CacheNone()` — stratégies de cache
  intégrées (le worker met en cache les réponses GraphQL)
- `context.cart` — l'API panier (voir §7)

⚠️ Si les variables d'env sont absentes, Hydrogen retombe sur **mock.shop**
(catalogue de démo avec des t-shirts). Si tu vois des hoodies verts : ton
`.env` n'est pas chargé → redémarre `npm run dev`.

### 6.2 Écrire une requête GraphQL

Les requêtes vivent en bas de chaque fichier route, en constantes :

```ts
const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 6) { nodes { id url altText width height } }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
` as const;   // ← le `as const` est OBLIGATOIRE pour le codegen
```

- Le commentaire `#graphql` active la coloration + le codegen.
- `@inContext` = internationalisation (devise/langue par pays).
- Explore le schéma interactivement sur **http://localhost:3000/graphiql**
  (dispo quand `npm run dev` tourne) — c'est TON meilleur outil.

### 6.3 Les fragments

Un fragment = un morceau de requête réutilisable :

```graphql
fragment ProductItem on Product { id handle title … }
# puis dans la query :
nodes { ...ProductItem }
```

⚠️ Les **noms de fragments doivent être uniques dans tout le projet**
(le codegen les fusionne globalement). C'est pour ça qu'on a
`ProductItem` (collections.$handle), `CollectionItem` (collections.all),
`HomeFeaturedProduct` (_index) — même shape, noms différents.

### 6.4 Pagination

`getPaginationVariables(request, {pageBy: 12})` lit `?cursor=` dans l'URL et
fournit `first/last/startCursor/endCursor` à la requête. Le composant
`<PaginatedResourceSection>` rend la grille + le bouton « charger plus ».

### 6.5 Le codegen (types automatiques)

`npm run dev` lance un watcher qui scanne toutes les constantes `#graphql`
et régénère `storefrontapi.generated.d.ts`. Résultat : 

```ts
const {product} = await storefront.query(PRODUCT_QUERY, …);
// `product` est TYPÉ automatiquement selon les champs demandés. Magique.
```

Si tu modifies une requête et que les types semblent faux : sauvegarde le
fichier avec le dev server allumé (le codegen retourne), puis `npx tsc --noEmit`.

---

## 7. Le panier et le checkout

### Comment ça marche

1. **`app/routes/cart.tsx`** exporte une `action()` : tous les POST panier
   arrivent là. Elle lit `CartForm.getFormInput(formData)` et dispatch :
   `LinesAdd`, `LinesUpdate`, `LinesRemove`, `DiscountCodesUpdate`, etc.
   Chaque cas appelle `context.cart.addLines(...)` → mutation Storefront API.
2. **L'identité du panier** : Shopify renvoie un `cartId` à la création ;
   Hydrogen le stocke dans un **cookie** → le panier survit aux visites.
3. **Envoi côté client** : `<CartForm route="/cart" action={LinesAdd} inputs={{lines}}>`
   (dans `AddToCartButton.tsx`) rend un `<form>` que React Router soumet en
   **fetcher** (AJAX, pas de rechargement de page).
4. **UI optimiste** : `useOptimisticCart(cart)` fusionne le panier serveur avec
   les actions en cours → l'article apparaît dans le drawer AVANT la réponse.
5. **Checkout** : le panier expose `checkoutUrl` (URL sur www.zaaynaa.com) —
   simple `<a href>`. Paiement, TVA, livraison : 100 % Shopify.

### Les composants du drawer

- `Aside.tsx` : contexte React global. `useAside().open('cart')` ouvre le
  drawer (state + classes CSS `.overlay.expanded`).
- `CartMain` → liste des lignes (`CartLineItem`) + `CartSummary`
  (sous-total, code promo, carte cadeau, bouton checkout).
- Il y a DEUX boutons « Ajouter au panier » sur la fiche produit : celui du
  `ProductForm` (desktop) et celui de la **barre sticky mobile**
  (`.pdp-stickybar`, ≤ 640 px) — les deux utilisent le même `AddToCartButton`.

---

## 8. Le design system

### 8.1 Les tokens (variables CSS)

Tout en haut de `app/styles/app.css` :

```css
:root {
  --ivory:   #faf8f4;  /* fond principal (off-white) */
  --ink:     #1a1814;  /* texte fort */
  --gold:    #c9a96e;  /* or principal (accents, em italiques) */
  --gold-light: #e8d5a3; --gold-pale: #f5edd8; --gold-dark: #8a6d3b;
  --sand:    #f0eae0;  /* beige sections/fonds de cartes */
  --emerald: #1e3d34;  /* vert émeraude (accent secondaire) */
  --velvet:  #0d0d0d;  /* noir profond (sections sombres, footer) */
  --taupe:   #9a9088;  /* gris chaud (texte secondaire) */
  --serif: 'Cormorant Garamond', Georgia, serif;   /* titres */
  --sans:  'Montserrat', system-ui, sans-serif;    /* corps/labels */
}
```

**Changer une couleur du site entier = changer UNE ligne ici.**
Les polices sont chargées via Google Fonts dans `app/root.tsx` (fonction `links()`).

### 8.2 Organisation du fichier app.css (~3 700 lignes)

Le fichier est historiquement structuré en **couches additives** (chaque
passe de design a ajouté un bloc en fin de fichier) :

| Zone (ordre) | Contenu |
|---|---|
| Tokens + base | `:root`, body, typographie, curseur or |
| Composants squelette | header, footer, aside/drawers, search, cart, PDP (`.zy-pdp*`), pages éditoriales (`.zy-page`) |
| Anciennes classes `zy-*` accueil | **code mort** (ancienne v1 de l'accueil) — ignorable, supprimable |
| « Accueil v2 » | hero split, marquee, story, catégories, featured, philosophy, materials, testimonials, newsletter |
| « Pages v2 » | breadcrumb `.crumbs`, grille `.plp-grid`, cartes duo `.duo-card`, options produit, `.atc-btn` |
| « v3 » | plein écran, ken-burns, section cinématique `.zy-cinema`, hovers premium, raffinements mobile ≤768/≤480 |
| « v4 » | hover 2e image `.product-img-alt`, barre sticky `.pdp-stickybar`, cibles tactiles 44px, drawer panier raffiné, `prefers-reduced-motion` |

⚠️ **La cascade compte** : un bloc plus bas écrase un bloc plus haut à
spécificité égale. Si un style « ne marche pas », cherche s'il est redéfini
plus bas (Ctrl+F sur le nom de classe — il peut apparaître 2-3 fois).

### 8.3 Conventions

- Préfixe `zy-` = classes historiques (PDP, pages, cinéma). Les sections v2
  utilisent des noms simples (`.hero`, `.story`, `.featured`…).
- Labels : petites capitales très espacées (`letter-spacing: 0.25–0.45em`,
  font-size 9-10px).
- Titres : serif 300, `clamp()` pour la fluidité, `<em>` = italique doré.
- Breakpoints principaux : **1024px** (tablette), **768px** (mobile),
  **640px** (barre sticky), **480px** (petits mobiles), **64em/1024px**
  (bascule menu burger).

---

## 9. Les animations

### 9.1 framer-motion (React)

- **`Reveal.tsx`** — le composant à connaître :
  ```tsx
  <Reveal delay={0.15}> <h2>…</h2> </Reveal>
  ```
  = fade + translateY(24px→0) quand l'élément entre dans le viewport
  (`whileInView`, une seule fois). Le `delay` en cascade (0 / 0.15 / 0.3)
  crée l'effet « éléments qui se suivent ».
- **Parallax hero** (`_index.tsx > Hero`) : `useScroll()` + `useTransform`
  déplacent l'image de 60px pendant les 700 premiers px de scroll.
- **Transition de page** (`PageLayout.tsx`) : `<motion.div key={location.pathname}>`
  — changer la clé force un remontage → fade-in à chaque navigation.
- **`<MotionConfig reducedMotion="user">`** (PageLayout, englobe tout) :
  respecte automatiquement `prefers-reduced-motion` — les déplacements sont
  neutralisés, les fondus conservés. **NE PAS** utiliser `useReducedMotion()`
  pour changer le rendu initial d'un composant SSR (voir piège §14.2).

### 9.2 CSS pur (keyframes)

Dans app.css : `zyKenBurns` (zoom lent des grandes images), `zySweep`
(rayon de lumière or de la section cinématique), `zySpark` (éclats),
`marquee` (bandeau défilant — contenu dupliqué ×2 + translateX(-50%) pour
une boucle sans couture), `fadeUp` (entrée du hero, pilotée par des
`animation-delay` échelonnés).

Toutes sont enveloppées dans `@media (prefers-reduced-motion: no-preference)`
ou neutralisées dans le bloc `reduce` final.

### 9.3 La section cinématique (prête pour vidéo)

`_index.tsx > Cinematic()` : image + voile sombre + rayon + éclats. Pour
passer en vraie vidéo : dépose `zaaynaa-cinematic.mp4` dans `public/` et
remplace le `<img>` par :

```jsx
<video autoPlay muted loop playsInline poster="/hob-saphir-hero.png">
  <source src="/zaaynaa-cinematic.mp4" type="video/mp4" />
</video>
```
Les effets CSS (rayon/éclats/vignette) restent superposés — c'est voulu.

---

## 10. Les données éditoriales

`app/lib/brand.ts` est la « base de données » de la marque (pas de CMS) :

- **`BRAND`** — nom, slogan officiel, email, Instagram.
- **`SHOPIFY_EDITORIAL`** — ⭐ le mapping le plus important :
  ```ts
  'layali-necklace-arabic-elegance-by-zaaynaa': {
    shortName: 'Layali',        // nom court affiché sur les cartes
    arabic: 'ليالي',            // calligraphie
    baseline: 'Les nuits qui brillent de l'intérieur.',  // phrase poétique
    collection: 'heritage',     // univers éditorial (heritage | nour)
    storyEN: 'NIGHTS, ENGRAVED IN GOLD',  // titre EN de la story card
  }
  ```
  Clé = **handle Shopify** du produit. Si tu ajoutes un produit dans Shopify,
  ajoute son entrée ici pour qu'il ait un nom court/calligraphie ; sinon le
  site affiche son titre Shopify brut (fallback propre).
- **`PRODUCTS` / `COLLECTIONS`** — le catalogue « concept » (bagues HOB/NOUR)
  utilisé par les pages `/piece/:handle` et les collections éditoriales.
- Dans `ProductCardV2.tsx` : **`HIDDEN_PRODUCT_HANDLES`** — produits
  utilitaires Shopify (assurance colis, app de personnalisation, carte cadeau)
  exclus des grilles. Fix durable : les dépublier du canal « Zaaynaa
  Headless » dans l'admin Shopify, puis vider ce Set.

---

## 11. Recettes de modification

### R1 — Changer une couleur / une police
`app/styles/app.css` → bloc `:root` (§8.1). Pour la police : modifier aussi
l'URL Google Fonts dans `app/root.tsx > links()`.

### R2 — Modifier un texte de l'accueil
Tout est dans `app/routes/_index.tsx`, chaque section = une fonction React
nommée (Hero, Story, Philosophy, Testimonials…). Cherche le texte, édite.

### R3 — Remplacer les témoignages (exemples actuels !)
`_index.tsx > Testimonials()` → tableau `items`. Mets de vrais avis clients.

### R4 — Ajouter une section à l'accueil
1. Écris une fonction `MaSection()` dans `_index.tsx` (inspire-toi de `Story`).
2. Ajoute `<MaSection />` dans le JSX de `Homepage()` à la position voulue.
3. Ajoute les styles en **fin** de `app.css` + leurs règles responsive.
4. Enveloppe les éléments dans `<Reveal>` pour l'animation au scroll.

### R5 — Ajouter une page (ex. /faq)
1. Crée `app/routes/faq.tsx` :
   ```tsx
   import type {Route} from './+types/faq';
   export const meta: Route.MetaFunction = () => [{title: 'FAQ — ZAAYNAA'}];
   export default function Faq() {
     return <div className="zy-page"><h1>FAQ</h1>…</div>;
   }
   ```
2. Ajoute le lien dans `Header.tsx` (tableau `ZAAYNAA_NAV`) et/ou `Footer.tsx`.

### R6 — Demander un champ produit en plus (ex. `vendor`)
1. Ajoute le champ dans la requête GraphQL du fichier route concerné
   (vérifie le nom exact dans GraphiQL).
2. Sauvegarde avec `npm run dev` allumé → types régénérés.
3. Utilise `product.vendor` dans le JSX. `npx tsc --noEmit` pour valider.

### R7 — Changer les produits mis en avant sur l'accueil
`_index.tsx > HOME_FEATURED_QUERY` : actuellement
`products(first: 8, sortKey: BEST_SELLING)`. Autres tris : `CREATED_AT`,
`UPDATED_AT`, `PRICE`, `TITLE` (+ `reverse: true`). Pour une sélection
manuelle : crée une collection « Vitrine » dans Shopify et interroge
`collection(handle: "vitrine") { products(first: 5) {…} }`.

### R8 — Modifier la barre sticky mobile
Markup : `products.$handle.tsx` (bloc `.pdp-stickybar` après `</article>`).
Styles : app.css, bloc v4, `@media (max-width: 640px)`.

### R9 — Ajouter la vidéo cinématique
Voir §9.3.

### R10 — Réactiver un produit caché (ex. la carte cadeau)
`ProductCardV2.tsx > HIDDEN_PRODUCT_HANDLES` → retire le handle du Set.

### R11 — Modifier le drawer panier
Markup : `CartMain.tsx` / `CartLineItem.tsx` / `CartSummary.tsx`.
Styles : app.css blocs « components/Cart » (haut) + « Drawer panier » (v4, bas).

---

## 12. Commandes & workflow

```bash
cd 07_Site/storefront

npm run dev          # dev server → http://localhost:3000 (HMR + codegen watch)
                     # + GraphiQL : http://localhost:3000/graphiql
                     # + profiler : http://localhost:3000/subrequest-profiler
npx tsc --noEmit     # vérification TypeScript (à lancer avant tout commit)
npm run lint         # ESLint
npm run build        # build de production (doit passer AVANT de déployer)
npx shopify hydrogen deploy --force   # déploiement sur Oxygen
```

- `--force` : nécessaire car un dépôt Git existe à la racine de ton dossier
  utilisateur Windows, ce qui fait croire au CLI que tout est « non commité ».
  Sans danger : seul le build du storefront est envoyé.
- Après déploiement, le CLI affiche l'URL de prod (`…myshopify.dev`).
- Workflow conseillé : modifier → vérifier sur localhost (desktop + mode
  responsive < 400 px des DevTools) → `tsc` → `build` → `deploy`.

---

## 13. Variables d'environnement

`./.env` (local uniquement, ignoré par Git) :

| Variable | Rôle |
|---|---|
| `SESSION_SECRET` | signe le cookie de session (longue chaîne aléatoire) |
| `PUBLIC_STORE_DOMAIN` | `fwht7n-48.myshopify.com` |
| `PUBLIC_STOREFRONT_API_TOKEN` | token **public** Storefront (32 car. hex, créé via le canal Headless) |
| `PUBLIC_CHECKOUT_DOMAIN` | `www.zaaynaa.com` (checkout sur le domaine de marque) |

**En production (Oxygen)** : ne saisis que `SESSION_SECRET` dans l'admin
(canal Hydrogen → storefront → Environments and variables). Les trois
`PUBLIC_*` sont **injectées automatiquement par Oxygen** (read-only — si tu
essaies de les créer, erreur « read-only variable can't be modified »).

Règles : le token public peut être vu par n'importe qui (c'est prévu pour) ;
les tokens `shpat_`/`atkn_` sont des secrets admin et n'ont RIEN à faire ici ;
`.env` ne se commite jamais ; MiniOxygen ne relit `.env` qu'au démarrage
(modif → redémarrer `npm run dev`).

---

## 14. Débogage — les pièges déjà rencontrés (vécus sur ce projet)

### 14.1 « Je vois des t-shirts verts » (mock.shop)
Variables d'env absentes/non rechargées → Hydrogen bascule en catalogue démo.
Fix : vérifier `.env`, redémarrer le dev server.

### 14.2 Warning « Hydration mismatch / Prop did not match »
Le HTML SSR diffère du premier rendu client. Causes classiques :
- utiliser `useReducedMotion()`, `window`, `Date.now()`… dans le rendu initial
  (le serveur ne connaît pas ces valeurs). **Fix appliqué ici** : rendu initial
  déterministe + `<MotionConfig reducedMotion="user">` qui adapte côté client.
- HTML invalide : un `<div>` dans un `<p>` (le composant `<Money>` de Hydrogen
  rend un `<div>` → ne jamais le mettre dans un `<p>`/`<small>`). Vécu aussi.

### 14.3 « Ma modif CSS ne s'applique pas »
La classe est probablement redéfinie plus bas dans app.css (couches v2→v4).
Cherche toutes les occurrences ; ajoute ta règle en fin de fichier.

### 14.4 Erreur TypeScript sur un type `…Fragment` inexistant
Le codegen a régénéré les types après suppression/renommage d'une requête.
Corrige les imports dans les composants concernés.

### 14.5 Fragment GraphQL « duplicate name »
Deux fichiers déclarent un fragment du même nom → renomme l'un des deux (§6.3).

### 14.6 Le déploiement refuse (« Uncommitted changes »)
Dépôt Git parasite à la racine du dossier utilisateur → `deploy --force`.

### 14.7 Outils de debug intégrés
- **GraphiQL** (`/graphiql`) : teste tes requêtes avec le vrai token.
- **Subrequest profiler** (`/subrequest-profiler`) : visualise chaque appel
  Storefront API d'une page (durée, cache hit/miss).
- Console navigateur : les erreurs de loader s'affichent côté serveur
  (terminal `npm run dev`) ET côté client.

---

## 15. Ressources

| Sujet | Lien |
|---|---|
| Hydrogen (docs officielles) | https://shopify.dev/docs/storefronts/headless/hydrogen |
| React Router v7 (framework mode) | https://reactrouter.com/ |
| Storefront API (référence GraphQL) | https://shopify.dev/docs/api/storefront |
| Composants Hydrogen (Image, Money, CartForm…) | https://shopify.dev/docs/api/hydrogen |
| Oxygen (hébergement) | https://shopify.dev/docs/storefronts/headless/oxygen |
| framer-motion | https://motion.dev/ |
| Apprendre GraphQL | https://graphql.org/learn/ |

---

*Document rédigé le 8 juillet 2026 — reflète l'état du code au commit
`ec747fc` (+ images SABR `a0327db`). Si le code évolue, mets ce fichier à
jour : c'est TA documentation maintenant.* ✦
