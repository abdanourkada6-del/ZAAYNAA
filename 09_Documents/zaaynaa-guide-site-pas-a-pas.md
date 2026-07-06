# 📘 ZAAYNAA — GUIDE PAS-À-PAS (Site Hydrogen)
## Pour débutant — chaque étape expliquée

---

## 🎯 VUE D'ENSEMBLE

```
Tu vas construire un site React (Hydrogen) connecté à Shopify.

ÉTAPES :
1. Préparer ton ordinateur (Node.js)
2. Lancer Claude Code avec le prompt
3. Vérifier que le site tourne en local
4. Récupérer tes clés Shopify
5. Connecter le vrai Shopify
6. Déployer sur Vercel (gratuit)
```

⏱️ Temps estimé : 3-5h réparties sur plusieurs sessions
💰 Coût : 0€ (Vercel gratuit, Hydrogen gratuit)

---

# 🔧 ÉTAPE 1 — Préparer ton ordinateur

## Installer Node.js

```
☐ Va sur nodejs.org
☐ Télécharge la version "LTS" (recommandée)
☐ Installe-la (next, next, finish)
☐ Vérifie : ouvre un terminal et tape :
   node --version
   → doit afficher v20.x ou plus
```

## Installer un éditeur de code (si pas déjà fait)

```
☐ Télécharge VS Code (code.visualstudio.com)
☐ Installe-le
```

---

# 🤖 ÉTAPE 2 — Lancer Claude Code

```
☐ Crée un dossier vide "zaaynaa-site" sur ton ordi
☐ Ouvre Claude Code dans ce dossier
☐ Copie-colle le PROMPT (document zaaynaa-prompt-claude-code)
☐ Laisse Claude Code travailler
☐ Réponds à ses questions (TypeScript: oui, Tailwind: oui)
```

**Important :** Claude Code va te poser des questions et 
exécuter des commandes. Lis ce qu'il explique. Si tu ne 
comprends pas, demande-lui "explique-moi cette étape simplement".

---

# 👀 ÉTAPE 3 — Vérifier le site en local

Une fois le scaffolding fini, Claude Code te dira de lancer :

```
npm run dev
```

```
☐ Ouvre ton navigateur sur http://localhost:3000
☐ Tu devrais voir le site avec des produits de démo (Mock.shop)
☐ Clique partout, vérifie que ça marche
```

**À ce stade, le site fonctionne avec des FAUX produits.**
C'est normal. On connecte les vrais après.

---

# 🔑 ÉTAPE 4 — Récupérer tes clés Shopify

C'est l'étape la plus technique. Suis bien.

## 4.1 — Installer le canal Hydrogen sur Shopify

```
☐ Va dans ton admin Shopify
☐ Cherche "Hydrogen" dans la barre de recherche apps
☐ Installe le canal de vente "Hydrogen"
   (ou "Headless" selon ce qui est dispo)
```

## 4.2 — Créer un storefront et récupérer le token

```
☐ Dans le canal Hydrogen/Headless
☐ Crée un nouveau "storefront"
☐ Tu obtiens 2 informations essentielles :

   1. PUBLIC_STORE_DOMAIN
      → ressemble à : ta-boutique.myshopify.com

   2. PUBLIC_STOREFRONT_API_TOKEN
      → une longue chaîne de caractères
      → c'est le "Storefront API access token"
```

⚠️ **Le token Storefront est PUBLIC** (pas secret), il peut 
être dans le code front-end. C'est normal et sûr.

---

# 🔗 ÉTAPE 5 — Connecter le vrai Shopify

```
☐ Dans ton projet, trouve le fichier ".env" 
   (ou crée-le depuis .env.example)
☐ Remplis :

   PUBLIC_STORE_DOMAIN=ta-boutique.myshopify.com
   PUBLIC_STOREFRONT_API_TOKEN=ton_token_ici

☐ Sauvegarde
☐ Relance : npm run dev
☐ Maintenant le site affiche TES vrais produits Shopify
```

Si tu n'as pas encore de produits dans Shopify, tu peux en 
créer un ou deux de test pour vérifier la connexion.

---

# 🚀 ÉTAPE 6 — Déployer sur Vercel (gratuit)

## 6.1 — Mettre le code sur GitHub

```
☐ Crée un compte GitHub (gratuit) si pas déjà fait
☐ Crée un nouveau repository "zaaynaa-site"
☐ Claude Code peut t'aider à pousser le code dessus :
   demande-lui "aide-moi à push ce projet sur GitHub"
```

## 6.2 — Connecter Vercel

```
☐ Va sur vercel.com
☐ Inscris-toi avec ton compte GitHub
☐ Clique "Add New Project"
☐ Sélectionne ton repo "zaaynaa-site"
☐ Dans les réglages, ajoute les variables d'environnement :
   - PUBLIC_STORE_DOMAIN
   - PUBLIC_STOREFRONT_API_TOKEN
☐ Clique "Deploy"
☐ Attends 1-2 min
☐ Vercel te donne une URL : ton site est EN LIGNE 🎉
```

## 6.3 — Ton nom de domaine (plus tard)

```
Quand tu achètes zaaynaa.com :
☐ Dans Vercel → Settings → Domains
☐ Ajoute ton domaine
☐ Suis les instructions DNS
```

---

# 🆘 SI TU BLOQUES

```
ERREUR pendant l'installation :
→ Copie l'erreur, colle-la à Claude Code
→ Il va t'aider à débugger

LE SITE NE SE LANCE PAS :
→ Vérifie Node.js : node --version
→ Vérifie que tu es dans le bon dossier
→ Essaie : npm install puis npm run dev

LES VRAIS PRODUITS N'APPARAISSENT PAS :
→ Vérifie le fichier .env (pas de faute de frappe)
→ Vérifie que le token est le bon
→ Vérifie que tu as des produits publiés dans Shopify

DÉPLOIEMENT VERCEL ÉCHOUE :
→ Vérifie que les variables d'env sont bien dans Vercel
→ Copie l'erreur de build à Claude Code
```

---

# 📚 POUR APPRENDRE (toi, futur ingénieur)

```
Avant ou pendant, ces ressources t'aideront :

→ Tuto React Router 30 min (recommandé par Shopify)
→ Docs Hydrogen : shopify.dev/docs/storefronts/headless/hydrogen
→ Demande à Claude Code d'expliquer chaque concept

Ne copie pas bêtement. Comprends.
C'est un investissement dans tes skills dev.
```

---

# ⏰ RAPPEL PRIORITÉS

```
🎓 Examens dans 23 jours = priorité absolue
💻 Ce site = projet d'apprentissage en parallèle

Construis-le par sessions courtes (1-2h).
Pas besoin de tout finir d'un coup.
Le site peut attendre que tu aies les vrais produits.

Mais l'avantage : tu apprends React/Hydrogen 
= skill précieux pour ton CV d'ingénieur.
```

---

# ✅ CHECKLIST GLOBALE

```
☐ Node.js installé
☐ Claude Code lancé avec le prompt
☐ Site tourne en local (Mock.shop)
☐ Toutes les pages construites
☐ Clés Shopify récupérées
☐ Vrais produits connectés
☐ Code sur GitHub
☐ Déployé sur Vercel
☐ Site en ligne 🎉
☐ (plus tard) Domaine zaaynaa.com connecté
```
