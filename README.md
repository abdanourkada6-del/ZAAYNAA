# ZAAYNAA — Storefront (Shopify Hydrogen)

> **Modern Moroccan Quiet Luxury** — _« L'élégance, comme une signature. »_

Boutique en ligne headless de la maison ZAAYNAA, construite avec **Shopify
Hydrogen** (React Router v7) + **TypeScript** + **Tailwind v4**.

Pour l'instant le site tourne sur les données de démonstration **Mock.shop** :
il fonctionne immédiatement, sans clé API. La vraie boutique Shopify se branche
en quelques minutes (voir plus bas).

---

## 🧱 Ce qui est déjà construit

| Page | Route | Contenu |
|------|-------|---------|
| Accueil | `/` | Hero, 2 collections, pièce signature, sélection, boutique live, newsletter |
| Collections | `/collections` | Cartes Héritage & Nour + catalogue Mock.shop |
| Héritage | `/collections/heritage` | Catalogue éditorial (5 bagues sans pierre) |
| Nour | `/collections/nour` | Catalogue éditorial (6 bagues avec pierre) |
| Produit | `/products/:handle` | Fiche produit Mock.shop (panier réel) |
| À propos | `/about` | Storytelling de la marque |
| Contact | `/contact` | Formulaire + e-mail / Instagram |
| Panier | `/cart` | Panier → checkout Shopify natif |

- **Identité ZAAYNAA** appliquée partout : palette (ivoire, or champagne,
  émeraude, sable), typographies (Cormorant Garamond + Jost), animations douces.
- **Catalogue de marque** dans [`app/lib/brand.ts`](app/lib/brand.ts) : noms,
  prix, pierres et storytelling FR des 11 produits. C'est LE fichier à éditer
  pour changer les textes/prix sans toucher au code.

---

## ▶️ Lancer le site en local

Prérequis : **Node.js 22 ou 24** (vérifiez avec `node --version`).

```bash
npm install
npm run dev
```

Ouvrez **http://localhost:3000**.

À vérifier dans le navigateur :
- La page d'accueil affiche le hero ZAAYNAA et les deux collections.
- `/collections/heritage` et `/collections/nour` listent les bagues.
- L'icône **Panier** ouvre le tiroir ; ajouter un produit Mock.shop fonctionne.

Autres commandes utiles :
```bash
npm run typecheck   # vérifie les types TypeScript
npm run lint        # vérifie le style de code
npm run build       # build de production
npm run preview     # prévisualise le build
```

---

## 🔌 Brancher la vraie boutique Shopify

1. Dans l'admin Shopify, installez le canal **Hydrogen** (ou **Headless**).
2. Depuis ce dossier :
   ```bash
   npx shopify hydrogen link      # relie le projet à la boutique
   npx shopify hydrogen env pull  # récupère les clés dans .env
   ```
   (ou copiez `.env.example` en `.env` et remplissez les valeurs à la main).
3. Relancez `npm run dev`. Dès que `PUBLIC_STORE_DOMAIN` est rempli, le site
   bascule automatiquement sur le vrai catalogue.

> Quand le vrai catalogue est en ligne, créez dans Shopify les produits et les
> deux collections avec les **handles** `heritage` et `nour` pour que la
> navigation continue de fonctionner. Le fichier `app/lib/brand.ts` sert de
> référence (noms, prix, descriptions).

Le **checkout** est géré nativement par Shopify : le panier redirige vers
l'URL de paiement sécurisée Shopify. Aucun flux de paiement custom à maintenir.

---

## 🚀 Déploiement

### Option A — Shopify Oxygen (recommandé, gratuit)
C'est l'hébergement natif de Hydrogen, inclus avec le canal Hydrogen (toutes
les formules Shopify). Le projet est déjà configuré pour Oxygen :
```bash
npx shopify hydrogen deploy
```
Pas de config supplémentaire, CDN mondial, variables d'env gérées par Shopify.

### Option B — Vercel
Possible mais plus manuel : Hydrogen 2026 tourne sur le runtime React Router 7,
et Vercel nécessite l'ajout du **preset Vercel** de React Router + le réglage
des variables d'environnement (`PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`,
`SESSION_SECRET`, etc.) dans le dashboard Vercel. Étapes :
1. Pousser le projet sur un repo GitHub.
2. Importer le repo dans Vercel.
3. Ajouter `@vercel/react-router` et le preset correspondant dans
   `react-router.config.ts`, puis définir les variables d'env côté Vercel.

> 💡 Pour un premier lancement, **Oxygen est le chemin le plus simple et
> gratuit**. On pourra basculer sur Vercel plus tard si besoin.

---

## 📁 Où toucher quoi

| Je veux changer… | Fichier |
|------------------|---------|
| Textes / prix / produits | `app/lib/brand.ts` |
| Couleurs & polices | `app/styles/tailwind.css` (tokens) + `app/styles/app.css` |
| En-tête / navigation | `app/components/Header.tsx` |
| Pied de page | `app/components/Footer.tsx` |
| Page d'accueil | `app/routes/_index.tsx` |
| Page « À propos » | `app/routes/about.tsx` |
| Page « Contact » | `app/routes/contact.tsx` |

---

_ZAAYNAA — Une maison de joaillerie parisienne secrètement inspirée par le Maroc.
Discrète en surface. Extraordinaire de près._
