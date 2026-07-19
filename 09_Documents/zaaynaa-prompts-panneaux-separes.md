# 🎯 ZAAYNAA — PROMPTS PANNEAU PAR PANNEAU (méthode B — cohérence garantie)

> Objectif : que **le même bijou** apparaisse dans tous les plans (finie la dérive de design).
> **Règle d'or** : on génère le **panneau 1 (HERO)** d'abord, puis on **uploade CE hero comme référence** pour générer chaque autre plan, en ne changeant QUE l'angle/le fond/la lumière.

---

## 🔒 RÈGLE OFFICIELLE — LOGO DU PLAN 6 (packaging)

**Fichiers logo officiels** (à uploader comme référence à chaque génération du plan 6) :
- `01_Brand/new logo transparent.png`
- `01_Brand/new logo.png`

Le logo réel est un **monogramme "ZY"** (Z et Y entrelacés, serif gras) inscrit dans un **cadre étoile marocaine à 8 branches** (style zellige, avec petits losanges sur les pointes), surmonté du wordmark serif fin **"ZAAYNAA"**. **Ce n'est PAS un lotus** — corrige toute description antérieure qui mentionnait un lotus.

**Règle stricte** : ne jamais laisser l'IA inventer, redessiner, simplifier, remplacer ou réinterpréter ce logo. Toujours uploader `new logo transparent.png` ou `new logo.png` en référence dans le même prompt que le plan 6.

Le plan 6 (packaging) doit montrer :
- écrin **velours noir mat** ZAAYNAA
- **monogramme/logo officiel ZAAYNAA embossé or** sur le couvercle (le monogramme ZY exact dans le cadre étoile 8 branches)
- wordmark serif fin **ZAAYNAA**
- doublure satin/velours **noire** (sauf mention contraire dans le prompt produit)
- une fleur séchée / brindille séchée à côté de l'écrin
- lumière chaude, luxe

Si le générateur d'image n'arrive pas à reproduire le logo fidèlement : générer l'écrin avec une **zone d'emboss propre et vide** (sans texte/symbole inventé), et ajouter le vrai logo après-coup depuis le fichier officiel (montage Canva/Photoshop).

**Snippet à coller dans chaque prompt de plan 6** :
```
CRITICAL LOGO CONSTRAINT: Use the official ZAAYNAA logo reference supplied (new logo
transparent.png / new logo.png). Do not redesign, reinterpret, restyle, simplify, or
invent any logo, monogram, symbol, flower, typography, or wordmark. The jewelry box
lid must use the exact ZAAYNAA logo: a bold serif "ZY" monogram inside a Moroccan
8-point star frame, with the ZAAYNAA serif wordmark below, embossed in champagne gold.
If the logo cannot be reproduced perfectly, render a clean empty gold-embossed emboss
area on the lid instead of inventing a substitute mark.
```

---

## 🔁 WORKFLOW (à suivre à chaque produit)
1. Génère le **HERO** (plan 1) avec le prompt Hero → choisis la meilleure version. **C'est LUI le design final.**
2. Pour les plans 2 à 6 : **uploade le hero** + colle la « BASE de cohérence » + la description du plan.
3. Enregistre les 6 images dans le dossier du produit (ex. `02_Designs/Colliers/LAYALI/`).
4. La **story card (plan 5)** : mieux vaut la faire dans **Canva** avec le vrai logo (texte toujours net).

---

## 🧱 BASE DE COHÉRENCE (à coller AVANT chaque plan 2→6)
```
Use the jewelry piece from the REFERENCE IMAGE exactly as-is. It is the SAME physical
object: identical shape, identical surface pattern, identical engraving, identical
proportions and metal color. DO NOT redesign or restyle it. Only the camera angle,
background, and lighting change. Photorealistic, high-end editorial, ZAAYNAA
"Modern Moroccan Quiet Luxury". Soft warm light, no harsh black. 1:1.
```

## 🎯 BRAND RULES HERO (à coller pour le plan 1 uniquement)
```
Product photo for ZAAYNAA — "Modern Moroccan Quiet Luxury" fine jewelry (Parisian
minimalism + Moroccan heritage). 18k gold vermeil on 925 silver. Thin, delicate,
feminine. Hidden Moroccan zellige detail. Photorealistic, warm cinematic light,
soft, editorial. Single object, sharp focus, 1:1.
```

---

# 📿 EXEMPLE COMPLET — LAYALI (collier croissant ajouré)

> Design retenu = **croissant en dentelle zellige ajourée** (le plus « ZAAYNAA »).

**Plan 1 — HERO** *(génère celui-ci en premier)*
```
[BRAND RULES HERO]
A delicate 18k gold vermeil necklace with a small crescent-moon pendant. The crescent
is filled with an openwork Moroccan zellige lace pattern (8-pointed star motifs).
Ultra-thin cable chain. Laid on dark cream silk, warm golden evening light, a few
grains of golden light/bokeh. Elegant, intimate, luxurious. 1:1.
```

**Plan 2 — PORTÉ (cou)**
```
[BASE DE COHÉRENCE]
Shot: the necklace worn on an elegant feminine décolleté, the openwork crescent
pendant resting softly below the collarbone. Warm ambient light, a blurred Moroccan
lantern glowing in the background. Skin natural, no heavy makeup.
```

**Plan 3 — MACRO détail**
```
[BASE DE COHÉRENCE]
Shot: extreme macro of the crescent pendant, showing the openwork zellige lacework in
sharp detail, warm light grazing the gold. Background softly blurred.
```

**Plan 4 — MACRO + tag marque**
```
[BASE DE COHÉRENCE]
Shot: close-up of the crescent pendant next to the small "ZAAYNAA" engraved tag near
the clasp, on pale warm stone. Show the openwork pattern clearly.
```

**Plan 5 — STORY CARD** *(à faire de préférence dans Canva)*
```
Cream textured card, elegant serif typography, gold text:
"LAYALI  ليالي"
"WOVEN FROM ARABIAN NIGHTS."
——◇——
"L'élégance des nuits d'Orient,
portée tout près du cœur."
ZAAYNAA ✦
```

**Plan 6 — PACKAGING**
```
[BASE DE COHÉRENCE]
[CRITICAL LOGO CONSTRAINT — see rule above, upload "new logo transparent.png"]
Shot: the necklace inside a matte black velvet ZAAYNAA jewelry box. The lid is embossed
in champagne gold with the OFFICIAL ZAAYNAA logo (exact "ZY" serif monogram inside a
Moroccan 8-pointed star frame + "ZAAYNAA" serif wordmark below — do not invent). Black
satin lining, one dried flower beside the box, soft warm light.
```

---

# 📿 COLLIERS — descriptions HERO (plan 1) + rappels de plans

Pour chaque produit : génère le HERO ci-dessous, puis réutilise **exactement** les plans 2→6 de LAYALI en adaptant l'élément (le fond/texte changent, la BASE de cohérence reste). Les story cards sont dans `zaaynaa-prompts-generation-complets.md`.

**RIMAL — HERO**
```
[BRAND RULES HERO] A fine gold vermeil necklace with an organic pendant textured like
wind-shaped desert dunes. On beige linen with a few grains of golden sand, soft
daylight. 1:1.
```
**WARDAH — HERO**
```
[BRAND RULES HERO] A delicate gold vermeil necklace with a small rose-flower pendant,
softly dimensional petals. On ivory silk with one fresh white rose, gentle morning
light. 1:1.
```
**NOUJOUM — HERO (choker)**
```
[BRAND RULES HERO] A close-fitting fine gold vermeil choker with tiny scattered
8-pointed Moroccan stars and micro white cubic zirconia sparkling like a constellation.
On deep navy silk, soft moonlight. 1:1.
```
**ZAHRA — HERO**
```
[BRAND RULES HERO] A gold vermeil necklace with a flower pendant set with a deep green
emerald cubic zirconia at its heart, hidden Moroccan geometric setting behind the
stone. On deep emerald velvet, warm golden light making the stone glow. 1:1.
```

Plans 2→6 (à réutiliser avec la BASE de cohérence) :
- **2 Porté** : necklace worn on décolleté, [ambiance du produit].
- **3 Macro** : extreme macro of the pendant detail.
- **4 Macro + tag** : pendant + "ZAAYNAA" engraved clasp tag.
- **5 Story card** : (Canva).
- **6 Packaging** : ZAAYNAA velvet box, logo officiel "ZY" étoile 8 branches (upload `new logo transparent.png`), [doublure : noire/émeraude/crème].

---

# 🔗 BRACELETS — HERO (plan 1)

**NAHR — HERO**
```
[BRAND RULES HERO] A fluid, fine gold vermeil chain bracelet like flowing water, small
clasp tag engraved "ZAAYNAA". Draped on warm marble, light flowing along the links. 1:1.
```
**LAMAH — HERO (tennis fin)**
```
[BRAND RULES HERO] An ultra-thin tennis bracelet: a continuous line of micro white
cubic zirconia in delicate gold vermeil settings. Coiled on dark velvet, sparkle
trail, warm light. 1:1.
```
**HOB BANGLE — HERO**
```
[BRAND RULES HERO] A thin rigid gold vermeil bangle engraved 'حب' on the outside, with
a hidden Moroccan zellige filigree pattern on the inner face. Standing upright on ivory
marble, soft morning gold light. 1:1.
```
**ZELLIGE CHAIN — HERO**
```
[BRAND RULES HERO] A gold vermeil chain bracelet whose links are tiny interlocking
8-pointed Moroccan stars, polished. On a real zellige tile, warm afternoon light. 1:1.
```

Plans 2→6 : **2 Porté** (worn on an elegant wrist) · **3 Macro** (links/detail) · **4 Macro + clasp tag ZAAYNAA** · **5 Story card** (Canva) · **6 Packaging** (ZAAYNAA box, new logo).

---

# 💍 BAGUES — HERO (plan 1)

### V1 — sans pierre
**HOB Classic — HERO**
```
[BRAND RULES HERO] An ultra-thin gold vermeil ring, small flat disc micro-engraved
with arabic 'حب', hidden Moroccan filigree under the band. On ivory marble, soft
golden morning light. 1:1.
```
**HILAL Classic — HERO**
```
[BRAND RULES HERO] An ultra-thin gold vermeil ring with a tiny delicate 4mm crescent
moon. On dark cream silk, the crescent catching warm light. 1:1.
```
**NAJMA Classic — HERO**
```
[BRAND RULES HERO] A thin gold vermeil ring topped with an open 8-pointed Moroccan
star with layered architectural depth. On warm beige marble, soft light showing the
layers. 1:1.
```
**ZELLIGE Set (×3) — HERO**
```
[BRAND RULES HERO] Three thin stackable gold vermeil bands, each with a different
subtle Moroccan zellige pattern. Stacked on a real zellige tile, warm afternoon light. 1:1.
```
*(SABR Classic ✅ déjà fait — dossier SABR/V1/individuelles)*

### V2 — avec pierre
**HOB Émeraude — HERO**
```
[BRAND RULES HERO] A thin gold vermeil ring with an emerald-cut deep green cubic
zirconia (4x3mm), micro-pavé white CZ on the shoulders, and a HIDDEN Moroccan zellige
setting under the stone (visible from the side). On deep emerald silk, warm light
making the stone glow. 1:1.
```
**HOB Saphir — HERO** → même bague, pierre **saphir bleu nuit**, fond soie marine + clair de lune.
**HOB Cristal — HERO** → même bague, pierre **CZ blanche**, fond marbre blanc + lumière du matin.
**HILAL Lune Bleue — HERO**
```
[BRAND RULES HERO] An ultra-thin gold vermeil ring with a 6mm crescent moon holding a
tiny blue sapphire cubic zirconia inside the crescent (the stone is the moon). On dark
cream silk, blue glow. 1:1.
```
**NAJMA Émeraude — HERO**
```
[BRAND RULES HERO] A thin gold vermeil ring: an 8-pointed Moroccan star holding an
emerald cubic zirconia at its center, hidden architectural layers visible from the
side, micro-pavé on the star points. On warm marble, emerald glowing through the gold. 1:1.
```
*(NOUR Émeraude Signature ✅ déjà fait — dossier NOUR EMERAUDE)*

Plans 2→6 (BASE de cohérence) : **2 Main** (worn on a feminine hand, nude nails) · **3 Macro** (engraving/stone) · **4 WOW macro** (hidden zellige from the side) · **5 Story card** (Canva) · **6 Packaging** (ZAAYNAA box, new logo, doublure selon collection).

---

# 🌙 BOUCLES D'OREILLES — HERO (plan 1)

**FARASHA — HERO**
```
[BRAND RULES HERO] A pair of small gold vermeil pavé huggie hoops with a delicate
butterfly/star charm dangling. On ivory silk, soft sparkle. 1:1.
```
**NAJMA & QAMAR — HERO**
```
[BRAND RULES HERO] An asymmetric pair of thin gold vermeil earrings: one tiny 8-pointed
star, one crescent moon. On deep navy silk like a night sky. 1:1.
```
**HILAL Studs — HERO**
```
[BRAND RULES HERO] A pair of minimalist tiny crescent-moon studs, polished gold
vermeil. On cream linen, soft daylight. 1:1.
```
**ZELLIGE Hoops — HERO**
```
[BRAND RULES HERO] A pair of fine gold vermeil hoops with an openwork Moroccan zellige
star pattern all around. On a zellige tile, warm afternoon light. 1:1.
```

Plans 2→6 : **2 Porté** (elegant ear, hair up, profile) · **3 Macro** (charm/pattern) · **4 Macro alt angle** · **5 Story card** (Canva) · **6 Packaging** (ZAAYNAA box, new logo).

---

# 🎁 PACKS — approche
Pour les coffrets, génère chaque pièce **individuellement** (méthode ci-dessus), puis compose le visuel du pack :
```
[BASE DE COHÉRENCE, en uploadant les hero des pièces du pack]
Shot: the [pieces] presented TOGETHER inside one black velvet ZAAYNAA gift box with
multiple slots, lid embossed with the OFFICIAL ZAAYNAA logo (upload `new logo
transparent.png` as reference — exact "ZY" monogram in 8-point star frame, do not
invent), [emerald/black/cream] satin lining, ribbon + dried flowers beside. Gifting
luxury mood. 1:1.
```
(Story cards des packs : voir `zaaynaa-prompts-generation-complets.md`.)

---

## ✅ RAPPELS
- Le **HERO est la référence** : toujours l'uploader pour les plans 2→6.
- Ne change QUE angle + fond + lumière ; jamais le design du bijou.
- **Plan 6 (packaging)** : toujours uploader `01_Brand/new logo transparent.png` en référence + coller le CRITICAL LOGO CONSTRAINT. Le logo est un monogramme **"ZY"** dans une étoile 8 branches — **jamais** un lotus ni une autre invention.
- Story cards → **Canva** (texte net + vrai logo de `01_Brand/`).
- Grille finale : si tu veux un moodboard 2×3, assemble les 6 plans dans Canva (ou je le monte ici).
