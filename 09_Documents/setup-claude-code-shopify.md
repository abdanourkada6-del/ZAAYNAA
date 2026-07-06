# 🚀 NordRelief — Setup Claude Code + Shopify Dawn

Guide complet pour customiser ton thème Shopify Dawn avec Claude Code.

---

## 📋 PRÉREQUIS À INSTALLER (10 min)

### 1. Node.js (si pas déjà installé)
- Va sur **nodejs.org**
- Télécharge la version LTS (20.x ou plus)
- Installe-la

Vérifie dans ton terminal :
```bash
node --version
npm --version
```

### 2. Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
```

Vérifie :
```bash
shopify version
```

### 3. Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

Connecte-toi avec ton compte Anthropic :
```bash
claude login
```

---

## 🏗️ SETUP DU PROJET (15 min)

### Étape 1 — Crée le dossier de travail

```bash
# Sur ton bureau ou dans Documents
mkdir nordrelief-theme
cd nordrelief-theme
```

### Étape 2 — Connecte-toi à Shopify

```bash
shopify theme dev --store=TON-STORE.myshopify.com
```

Remplace `TON-STORE` par le nom de ta boutique.

Une fenêtre browser s'ouvre → autorise.

### Étape 3 — Télécharge le thème Dawn

```bash
# D'abord installe Dawn comme thème actif sur ta boutique Shopify
# Puis dans le terminal :
shopify theme pull
```

Sélectionne **Dawn** dans la liste.

Ton dossier contiendra maintenant :
```
nordrelief-theme/
├── assets/
├── config/
├── layout/
├── locales/
├── sections/
├── snippets/
└── templates/
```

### Étape 4 — Lance le serveur de dev

Dans un autre terminal :
```bash
shopify theme dev
```

→ Tu verras ton thème en local : `http://127.0.0.1:9292`
→ Toute modification est visible en temps réel ⚡

### Étape 5 — Lance Claude Code

Dans un troisième terminal, dans le même dossier :
```bash
claude
```

---

## 🎨 LE PROMPT MAÎTRE À COLLER DANS CLAUDE CODE

Copie-colle ceci dans Claude Code une fois lancé :

```
Tu es un expert Shopify Liquid + designer e-commerce. 

CONTEXTE :
Je customise mon thème Shopify "Dawn" pour ma boutique 
"NordRelief" — une marque de wellness & récupération inspirée 
du minimalisme scandinave, qui cible la Suède, Norvège, Danemark.

Produit hero : tapis d'acupression + coussin pour relaxation, 
soulagement musculaire et amélioration du sommeil.

DIRECTION ARTISTIQUE :
- Esthétique : minimalisme scandinave / hygge / wellness premium
- Inspirations : Aēsop, Apothem Labs, Frette, Goop
- Émotion : calme, sérénité, qualité, intemporel
- AUCUN style "dropshipping cheap" / pas de couleurs flashy / 
  pas de pop-ups agressifs

PALETTE COULEURS (utilise ces variables CSS) :
- --color-bg: #FAFAF7 (blanc cassé chaleureux)
- --color-text: #2C2C2C (noir doux)
- --color-accent: #8B7355 (terracotta sable)
- --color-sage: #A8B5A0 (vert sauge subtil)
- --color-cream: #F2EBE0 (beige clair)
- --color-charcoal: #1A1A1A (noir profond pour CTA)

TYPOGRAPHIES :
- Headings : "Cormorant Garamond" (serif élégant)
- Body : "Inter" (sans-serif moderne)
- Charge-les via Google Fonts dans theme.liquid

PRINCIPES DE DESIGN :
- Espaces blancs généreux (padding 80-120px sur sections)
- Photos pleine largeur, pleine hauteur sur hero
- Typographie hiérarchique forte (titres XXL serif)
- Animations subtiles uniquement (fade-in au scroll, 
  hover doux 200ms)
- Mobile-first, responsive parfait
- Performance : pas de JS lourd inutile

PLAN DE TRAVAIL (ordre strict) :

ÉTAPE 1 — theme.liquid (layout principal)
- Ajouter Google Fonts
- Définir les variables CSS globales
- Smooth scroll global

ÉTAPE 2 — Header (sections/header.liquid)
- Header minimaliste, sticky au scroll
- Logo centré ou à gauche
- Menu épuré, hover subtil
- Cart icon élégant

ÉTAPE 3 — Homepage Hero (sections/image-banner.liquid)
- Image pleine largeur immersive
- Titre serif XXL ("Find Your Stillness" ou similaire)
- Sous-titre minimal
- CTA noir épuré ("Discover the Ritual")

ÉTAPE 4 — Section "Featured Product" (sections/featured-product.liquid)
- Layout 2 colonnes : image gauche, infos droite
- Galerie produit élégante
- Description hiérarchique
- Boutons Add to Cart / Klarna

ÉTAPE 5 — Page produit (sections/main-product.liquid)
- Layout magazine : grande image + sticky info
- Section "Benefits" avec icônes minimales
- Section "How to use" en 3 étapes
- Reviews integration

ÉTAPE 6 — Footer (sections/footer.liquid)
- Footer simple, élégant
- Newsletter signup sobre
- Liens organisés

RÈGLES IMPORTANTES :
- NE casse PAS les fonctionnalités Shopify existantes 
  (cart, variants, checkout)
- Garde tout le code Liquid fonctionnel
- Modifie principalement le HTML structurel + CSS
- Pour chaque section, montre-moi le code modifié 
  AVANT d'écrire le fichier
- Si tu n'es pas sûr, demande-moi
- Travaille fichier par fichier, étape par étape

MAINTENANT :
Commence par l'ÉTAPE 1 — theme.liquid. 
Lis d'abord le fichier actuel, puis propose les modifications.
```

---

## 💡 WORKFLOW RECOMMANDÉ

### Pendant que Claude Code travaille :

1. **Vérifie chaque modification** dans ton navigateur (`localhost:9292`)
2. **Commit Git après chaque étape qui marche** :
   ```bash
   git init  # première fois
   git add .
   git commit -m "Étape 1 : theme.liquid customisé"
   ```
3. Si quelque chose casse → `git checkout .` pour revenir en arrière

### Pour pousser sur Shopify quand tu es content :

```bash
shopify theme push
```

Ou pour publier directement :
```bash
shopify theme push --live
```

---

## 🎯 CHECKLIST DESIGN À VALIDER

Pour chaque section, demande-toi :

```
☐ La typo est-elle élégante (pas générique) ?
☐ Les espaces blancs sont-ils généreux ?
☐ Les couleurs sont-elles cohérentes (palette définie) ?
☐ Les boutons inspirent-ils confiance ?
☐ Les photos sont-elles mises en valeur ?
☐ Mobile : c'est aussi beau qu'en desktop ?
☐ Vitesse : pas de lag au chargement ?
☐ Émotion : ça respire le "premium scandinave" ?
```

---

## 🚨 SI TU BLOQUES

### "Shopify CLI ne se connecte pas"
- Vérifie que ton store name est correct (sans .myshopify.com)
- Connecte-toi à Shopify dans ton navigateur d'abord

### "Claude Code ne lit pas les fichiers"
- Assure-toi d'être dans le bon dossier (`pwd`)
- Vérifie `ls` que les fichiers sont là

### "Le design ne se met pas à jour"
- Vérifie que `shopify theme dev` tourne dans un terminal
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### "Tout est cassé"
- `git checkout .` pour annuler les changements
- Ou retélécharge Dawn : `shopify theme pull`

---

## 🎨 PROMPTS BONUS POUR PUSH PLUS LOIN

Une fois la base finie, tu peux donner ces prompts à Claude Code :

### Pour ajouter une section "Bundle"
```
Crée une nouvelle section "bundle-deals.liquid" qui affiche 
nos 2 bundles (Sleep Ritual / Winter Survival) avec prix barré, 
prix promo, et CTA. Style cohérent avec le reste du site.
```

### Pour les avis clients
```
Customise la section reviews pour qu'elle affiche 3 avis 
en colonnes, chacun avec photo, nom, note 5 étoiles dorées, 
et texte court. Style éditorial magazine.
```

### Pour la page À Propos
```
Crée une page "About" avec une narrative scandinave authentique 
sur la marque NordRelief. Image pleine largeur en haut, 
texte aéré en deux colonnes, valeurs de la marque illustrées 
avec des icônes minimales.
```

---

## 📊 OBJECTIFS DE CETTE NUIT

À la fin de la phase 3, tu dois avoir :
```
✅ Boutique Shopify fonctionnelle
✅ Domaine connecté
✅ Thème Dawn customisé (homepage + produit + header + footer)
✅ 1 produit hero importé avec page produit propre
✅ Paiements configurés (Klarna + PayPal)
✅ 4 pages légales en place
```

Ne cherche pas la perfection — vise un design **propre et premium** qu'on pourra améliorer après les premières ventes.

---

**Prochaine phase : Création du contenu IA (photos + vidéos UGC sans avoir le produit).**
