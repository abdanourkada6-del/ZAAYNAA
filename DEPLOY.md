# 🚀 Déployer le storefront ZAAYNAA

Le site est un storefront **Shopify Hydrogen** branché sur la vraie boutique
(`fwht7n-48.myshopify.com` → www.zaaynaa.com). Deux options de déploiement :
**Oxygen (recommandé, gratuit, natif Shopify)** ou Vercel.

---

## Option A — Shopify Oxygen (recommandé)

Oxygen est l'hébergement Shopify inclus dans ton plan. CDN mondial, variables
d'env gérées dans l'admin, déploiement en une commande.

### 1. Installer le canal Hydrogen
Admin Shopify → **Paramètres → Apps et canaux de vente** → **Shopify App Store**
→ cherche **« Hydrogen »** → installe le canal Hydrogen (éditeur : Shopify).

### 2. Lier le projet (une seule fois)
```bash
cd 07_Site/storefront
npx shopify hydrogen link
```
→ Connexion navigateur, choisis la boutique **ZAAYNAA**, crée le storefront
Hydrogen « ZAAYNAA » quand demandé.

### 3. Configurer les variables d'environnement
Dans l'admin : canal **Hydrogen** → ton storefront → **Storefront settings →
Environment variables**, ajoute :

| Variable | Valeur |
|---|---|
| `SESSION_SECRET` | une longue chaîne aléatoire (PAS « foobar ») |
| `PUBLIC_STORE_DOMAIN` | `fwht7n-48.myshopify.com` |
| `PUBLIC_STOREFRONT_API_TOKEN` | le token public Headless (32 car. hex) |
| `PUBLIC_CHECKOUT_DOMAIN` | `www.zaaynaa.com` |

### 4. Déployer
```bash
npx shopify hydrogen deploy
```
→ Build + upload + URL de production affichée à la fin. C'est tout.

### 5. Domaine www.zaaynaa.com
Canal Hydrogen → storefront → **Domains** → ajoute `www.zaaynaa.com`
(le domaine doit pointer chez Shopify, ce qui est déjà le cas).
⚠️ Cela remplacera le thème Online Store par le storefront Hydrogen sur ce
domaine — fais-le quand tu es prêt à basculer.

---

## Option B — Vercel

1. Pousse le dossier `07_Site/storefront` sur un repo GitHub.
2. Sur vercel.com → **New Project** → importe le repo.
   Vercel détecte Hydrogen/React Router automatiquement.
3. Ajoute les 4 variables d'env ci-dessus dans **Settings → Environment Variables**.
4. **Deploy**. Chaque `git push` redéploie.

---

## Développement local

```bash
cd 07_Site/storefront
npm run dev        # http://localhost:3000
npx tsc --noEmit   # typecheck
npm run build      # build de production (vérifié ✅)
```

Les variables locales vivent dans `.env` (jamais commité).

## Rappels

- ✅ Token **public** Storefront API dans le site (fait pour être exposé).
- ❌ Ne JAMAIS mettre le token privé `shpat_…` ni un token admin `atkn_…`
  dans le storefront.
- Les produits utilitaires (Package Protection, Item Customizations, carte
  cadeau) sont filtrés côté code (`app/components/ProductCardV2.tsx`,
  `HIDDEN_PRODUCT_HANDLES`). Fix durable : les dépublier du canal
  « Zaaynaa Headless » dans l'admin, puis vider cette liste.
- Témoignages de l'accueil = exemples → remplacer par de vrais avis clients
  dans `app/routes/_index.tsx` (fonction `Testimonials`).
