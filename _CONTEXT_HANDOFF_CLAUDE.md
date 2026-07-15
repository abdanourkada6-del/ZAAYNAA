# 🧭 ZAAYNAA — Contexte complet (handoff pour Claude / Cowork sur un autre PC)

> **À lire en premier.** Ce fichier résume tout le projet ZAAYNAA et tout ce qui a été fait, pour qu'un nouveau Claude (sur un autre PC, sans l'historique du chat) puisse reprendre sans rien perdre. Les conversations Cowork ne se transfèrent pas entre PC, mais ce dossier (OneDrive) est synchronisé. Sur le nouveau PC : ouvrir Cowork → connecter le dossier `ZAAYNAA` → donner ce fichier à Claude.

---

## 1. LA MARQUE

- **Nom** : ZAAYNAA (arabe زَيْنَاء = parure / beauté). Slogan : « Discret en surface. Extraordinaire de près. » (tagline aussi vue : « Elegance by Nature »).
- **Positionnement** : « Modern Moroccan Quiet Luxury ». Minimalisme parisien + héritage marocain. Référence n°1 = **Mejuri** (même stack). Autres refs : Pandora, Akali, Lunara, Glow & Co., Keira Kelley.
- **Matériaux** : argent sterling 925 + vermeil or 18k (2,5 microns) ; pierres zircone CZ. (Ternit avec parfum/crème → prévoir instructions d'entretien. C'est le bon matériau, niveau Mejuri.)
- **Palette** : ivoire `#FAF8F4`, or `#C9A96E`, or foncé `#8A6D3B`, émeraude `#1E3D34`, noir velours `#0D0D0D`, taupe `#6B6259`.
- **Typo** : titres **Cormorant Garamond** (serif) + corps **Montserrat** (sans).
- **Logo** : lotus + cadre zellige (étoile 8 branches) + wordmark serif. Dans `01_Brand/`. (Des variantes ont été générées via Canva.)

---

## 2. STRUCTURE DU DOSSIER
```
ZAAYNAA/
├── 01_Brand/         → logo, palette, storytelling
├── 02_Designs/       → visuels bijoux (Bagues/Colliers/Boucles/Bracelets, V1/V2)
├── 03_Specs_Techniques/
├── 04_Fabricants/    → devis, scoring, RFQ
├── 05_Samples/
├── 06_Contenu/       → Instagram, Videos, Ads
├── 07_Site/          → LE SITE (storefront) + les prompts
├── 08_Finance/
└── 09_Documents/     → prompts produits + docs stratégie
```

---

## 3. LE SITE (état actuel)

- **Emplacement** : `07_Site/storefront/`
- **Stack** : Shopify **Hydrogen 2026.4.3** (React Router 7, Vite, Tailwind 4, **framer-motion**). Déployé sur **Oxygen** (URL preview `…myshopify.dev`).
- **Décision arrêtée** : on **reste sur Shopify Hydrogen** (c'est la stack de Mejuri). PAS de site custom sans Shopify (on perdrait checkout/paiement/PCI/sécurité pour rien ; le headless donne déjà 100% de liberté de design).
- **Données** : vrais produits Shopify via Storefront API. NE JAMAIS remettre `mock.shop` / produits démo (bug initial = des T-shirts s'affichaient).
- **Déjà fait dans le code** : correction responsive mobile (menu burger réparé, marges réduites, réglages ≤768/≤480px), hovers premium, section **cinématique** (`Cinematic` dans `_index.tsx` : ken-burns + rayon de lumière + éclats + vignette, 100% CSS), transitions de page + parallax hero + `MotionConfig reducedMotion`.
- **Fichiers clés** : `app/routes/_index.tsx` (accueil), `app/styles/app.css` (tout le design), `app/components/` (Header, Footer, PageLayout, Reveal, Cursor, ProductCardV2…), `app/routes/products.$handle.tsx`, `collections.$handle.tsx`.
- **Reste à faire** : peaufiner fiche produit (PDP) + collections + panier au niveau de l'accueil ; créer collections **Héritage/Nour** dans Shopify ; tester panier/checkout + mobile réel ; nettoyer la boutique (produit « product 1 » vide, brouillon « Copy ») ; remplacer les photos dropshipping par les visuels de marque.

### Prompts pour Claude Code (dans `07_Site/`)
- **`PROMPT_DESIGN_ANIMATIONS.md`** ⭐ = LE prompt à utiliser (design luxe + animations Framer Motion + références visuelles + « améliore, ne recrée pas »). Skill utilisée : **ui-ux-pro-max**.
- `PROMPT_AMELIORATIONS_SITE.md` = améliorations générales + annexe vidéo.
- `PROMPT_VIDEO_CINEMATIQUE.md` = prompts pour générer la vidéo.
- `PROMPT_CLAUDE_CODE_SITE.md` = recréation de zéro → **NE PAS UTILISER** (referait un site neuf).

> Pour lancer : ouvrir Claude Code **dans** `07_Site/storefront/`, dire « utilise la skill ui-ux-pro-max + framer-motion » puis coller `PROMPT_DESIGN_ANIMATIONS.md`.

---

## 4. GIT / GITHUB

- **Dépôt** : `github.com/abdanourkada6-del/ZAAYNAA` (le mettre en **Private** : Settings → Danger Zone → Change visibility).
- Git initialisé à la **racine `ZAAYNAA/`** (tout le projet). `.env` (token Storefront) est **exclu** via `.gitignore` → jamais poussé.
- **Cycle à chaque mise à jour** (PowerShell natif) :
  ```powershell
  cd "C:\Users\abdan\OneDrive\Bureau\ZAAYNAA"
  git add .
  git commit -m "..."
  git push
  ```
- **2ᵉ PC** : `git clone https://github.com/abdanourkada6-del/ZAAYNAA.git` (idéalement HORS OneDrive), `npm install` dans `07_Site/storefront/`, **recréer `.env`** à la main (token Storefront non poussé). `git pull` avant de bosser, `git push` après.
- ⚠️ **Limitation** : depuis Cowork (bac à sable), Git ne fonctionne PAS sur le dossier OneDrive (opérations bloquées). **Toujours lancer git dans PowerShell natif.**

---

## 5. PRODUITS

### Vrais produits déjà en boutique Shopify (dropshipping, 12–55 $)
Colliers : Layali, Rimal, Wardah, Noujoum, Zahra · Bagues : Qalb, Jawharah · Boucles : Farasha, Najma & Qamar · Bracelets : Nahr, Lamah.

### Collection concept (à fabriquer, 69–179 €)
HOB (حب), HILAL (هلال), SABR (صبر), NAJMA (نجمة), ZELLIGE, NOUR/HOB Émeraude + variantes pierres (Saphir, Cristal, Lune Bleue, Najma Émeraude).

### Prompts de génération d'images (dans `09_Documents/`)
- `zaaynaa-prompts-produits-v2.md` (bagues) · `zaaynaa-prompts-colliers.md` (colliers) · `zaaynaa-prompts-complets (2).md` (original).
- **Style** : moodboard 6 panneaux (hero, main, macro, lifestyle, story card, écrin). Toujours uploader une bague déjà réussie en référence + coller les BRAND RULES.
- **Déjà générés/réussis** : NOUR Émeraude, NAJMA, HILAL, SABR, HOB (plusieurs versions), NAJMA Dome.
- **Découpe** : SABR est découpé en 6 images individuelles dans `02_Designs/Bagues/SABR/V1/individuelles/`. La découpe auto ne marche QUE sur les planches à 6 cases **égales** (2 col × 3 rangées). Les vieux moodboards NOUR (mai) sont irréguliers → non découpables automatiquement.

---

## 6. FABRICATION (sourcing)

- **Trouver des fabricants = facile** : Turquie (Istanbul), Thaïlande (Bangkok), Inde (Jaipur), Chine (Guangzhou). Designs standards. Le zellige caché nécessite CAD + moule (coût unique).
- **Estimations coût fabrication/pièce** (925 + vermeil, CZ) : HILAL ~7–15 $ · SABR ~8–18 $ · NOUR Émeraude ~18–40 $. Coûts uniques ~150–400 $/design (CAD + moule + échantillon).
- **Devis réel reçu** (Guangzhou Jingying, mo@kingjy.com) pour NOUR Émeraude : **32,6 $/pièce** (argent 8,1 $ + labor 24,5 $), 925 + 2,5 micron vermeil, CZ 3A, 3,5 g. Mold 60 $/taille + 40 $/taille suppl.
- **À demander au fournisseur** : peut-il faire le **zellige ajouré caché** ? passer en **CZ 5A** (meilleure brillance) ? prix à **50/100 pièces** + **MOQ** ? or 18k + anti-ternissement + **sans nickel (EN 1811)** + certificats ? **Négocier le mold** (un moule pour une plage de tailles).
- **Méthode** : **commander un échantillon** avant série, comparer **3 fabricants**. Marge saine (coût 10–40 $ vs prix 69–179 €).
- Certificats : test métal (SGS/Intertek), nickel EN 1811, RJC (sourcing responsable), GIA/IGI (vraies pierres).

---

## 7. VIDÉOS & CONTENU
- **Higgsfield** : plus de crédits → génération d'image/vidéo IA bloquée pour l'instant.
- **Solution vidéo** : `06_Contenu/Videos/zaaynaa-videos-canva.md` = 3 recettes prêtes à monter dans **Canva** (Product Reveal 16:9, Reel 9:16, Brand Film montage). Templates à chercher : « jewelry reel », « luxury product video », « brand film fashion ».
- Le site a déjà un effet cinématique codé (prêt à recevoir un vrai `.mp4` dans `storefront/public/`).

---

## 8. CONTRAINTES / PIÈGES (pour le prochain Claude)
- **Git** : ne marche pas depuis Cowork sur OneDrive → lancer en PowerShell natif.
- **Higgsfield** : crédits épuisés.
- **Canva** : connecté (génération de logo OK ; pas de vidéo directe via l'outil).
- **Découpe moodboard** : seulement grilles 2×3 égales.
- **NE PAS** recréer le site ni remettre des produits démo.

---

## 9. PROCHAINES ÉTAPES (ordre conseillé)
1. Donner **`07_Site/PROMPT_DESIGN_ANIMATIONS.md`** à Claude Code (dans `storefront/`) → refaire design + animations en s'inspirant de Mejuri/Lunara/Glow/Keira Kelley.
2. Créer les collections **Héritage / Nour** dans Shopify + y ranger les produits ; nettoyer la boutique.
3. Répondre au fabricant (questions ci-dessus), **commander un échantillon**, comparer 2 autres usines.
4. Sauver les moodboards propres (grille 2×3) sur le disque → les faire découper en images individuelles.
5. Monter les vidéos dans Canva (recettes fournies).
6. Tester le site sur mobile réel + panier/checkout, puis redéployer (`npx shopify hydrogen deploy`).

---
*ZAAYNAA — « Modern Moroccan Quiet Luxury ». Discret en surface. Extraordinaire de près. ✦*
