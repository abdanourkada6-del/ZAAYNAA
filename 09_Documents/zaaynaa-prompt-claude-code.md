# 🛠️ ZAAYNAA — PROMPT CLAUDE CODE (Hydrogen + Shopify)

## Comment l'utiliser
1. Ouvre Claude Code dans un dossier vide
2. Copie-colle TOUT le bloc "PROMPT" ci-dessous
3. Laisse Claude Code travailler, réponds à ses questions
4. Suis le guide pas-à-pas (document séparé) pour les clés API et le déploiement

---

# ⬇️ PROMPT À COPIER-COLLER DANS CLAUDE CODE

```
You are building a headless Shopify storefront for a luxury 
jewelry brand called ZAAYNAA. Use Shopify Hydrogen 
(latest version, @shopify/hydrogen 2026.x, built on 
React Router v7) with TypeScript and Tailwind CSS.

=== IMPORTANT TECHNICAL CONSTRAINTS ===
- Use the official scaffolding: `npm create @shopify/hydrogen@latest`
- Choose: TypeScript, Tailwind CSS, and the Quickstart options
- Deployment target is VERCEL (not Oxygen — the store is on a 
  basic Shopify plan without Oxygen access). Configure the 
  project to build and deploy on Vercel.
- The checkout is handled by Shopify natively. The cart should 
  redirect to the Shopify checkout URL. Do NOT build a custom 
  payment flow.
- Use the Storefront API (GraphQL) for all product/collection data.
- For now, use Mock.shop demo data so the site works before 
  real API credentials are added. Make it easy to switch to 
  real credentials via .env variables.

=== BRAND IDENTITY (apply consistently everywhere) ===
Brand: ZAAYNAA — "Modern Moroccan Quiet Luxury" jewelry
Tagline: "Elegance by Nature"
Hero phrase: "L'élégance, comme une signature."
Language: French (primary)
Positioning: Parisian minimalism meets Moroccan heritage.
Think Mejuri proportions + Dior Joaillerie mood.

COLOR PALETTE (use as Tailwind custom colors):
- Background: Ivory / off-white  #FAF7F2
- Text primary: Deep black       #1A1A1A
- Accent: Champagne gold         #C5A572
- Secondary: Sand beige          #E8DFD3
- Deep emerald (for NOUR collection accents): #0B3D2E

TYPOGRAPHY:
- Headings: an elegant serif — use "Cormorant Garamond" 
  (Google Fonts)
- Body: a clean sans-serif — use "Jost" or "Inter" 
  (Google Fonts)

DESIGN PRINCIPLES:
- Lots of white space, generous margins
- Slow, soft fade/slide animations (subtle, luxurious)
- Large editorial product imagery
- Minimal, refined navigation
- NO loud colors, NO aggressive popups, NO clutter
- Mobile-first, fully responsive
- Fast loading, accessible (good contrast, alt text)

=== PAGES TO BUILD ===

1. HOME (/)
   - Full-screen hero with brand tagline + one CTA 
     "Découvrir la collection"
   - Section: featured products (3-4)
   - Section: the two collections (Héritage / Nour) as 
     two elegant cards
   - Section: brand story teaser (short, links to /about)
   - Newsletter signup (email field, elegant, no popup)
   - Footer with links

2. COLLECTIONS LIST (/collections)
   - Grid of collections (Héritage, Nour)
   - Each as a large editorial card

3. COLLECTION PAGE (/collections/:handle)
   - Product grid for that collection
   - Refined filters (price, material) — optional
   - Elegant product cards (image, name, price, hover effect)

4. PRODUCT PAGE (/products/:handle)
   - Large product image gallery (multiple angles)
   - Product name, price, short description
   - Variant selector (ring size)
   - "Ajouter au panier" button
   - Product story section (the emotional storytelling)
   - "ZAAYNAA engraved inside" trust detail
   - Materials & care section

5. ABOUT (/about)
   - Brand story (long form, emotional)
   - The "Quiet Luxury Marocain" philosophy
   - Values section

6. CART (/cart)
   - Line items, quantities, remove
   - Subtotal
   - "Passer la commande" button → redirects to Shopify checkout

7. CONTACT (/contact)
   - Contact form (name, email, message)
   - Brand email + social links

=== COMPONENTS ===
- Header: logo (ZAAYNAA), nav (Accueil, Collections, À propos, 
  Contact), cart icon with count
- Footer: brand info, links, social, newsletter, payment icons
- ProductCard: reusable, elegant
- CartDrawer: slide-in cart from the right
- Reusable Button, Section, Container components

=== DELIVERABLES ===
1. Full working Hydrogen project, runs locally with `npm run dev`
2. Uses Mock.shop data so it works immediately
3. Clear .env.example file showing which variables to add 
   for real Shopify connection (PUBLIC_STORE_DOMAIN, 
   PUBLIC_STOREFRONT_API_TOKEN)
4. README with: how to run locally, how to connect real 
   Shopify store, how to deploy to Vercel
5. Vercel deployment configuration

=== WORKING STYLE ===
- Explain each major step before doing it (I'm learning React)
- Keep code clean and commented
- Build incrementally: scaffold first, confirm it runs, 
  then build pages one by one
- After scaffolding, tell me exactly what to check in the 
  browser before continuing
- Flag anything that needs MY action (API keys, accounts, etc.)

Start by scaffolding the Hydrogen project and confirming 
it runs locally with Mock.shop data. Then we'll build the 
pages one by one.
```

---

# 📋 CE QUE CLAUDE CODE VA FAIRE

```
1. Créer le projet Hydrogen (scaffolding)
2. Configurer Tailwind + tes couleurs + polices
3. Construire chaque page une par une
4. Te montrer comment vérifier dans le navigateur
5. Préparer le déploiement Vercel
6. T'indiquer où ajouter tes clés API Shopify
```

---

# ⚠️ CE QUE TOI TU DEVRAS FAIRE (Claude Code ne peut pas)

```
☐ Avoir Node.js installé sur ton ordinateur
☐ Récupérer tes clés API Shopify (guide séparé)
☐ Créer un compte Vercel (gratuit, avec ton GitHub)
☐ Créer un repo GitHub pour le projet
☐ Ajouter tes vraies clés dans le fichier .env
☐ Tester et valider chaque page
```

Tout ça est détaillé dans le guide pas-à-pas.
