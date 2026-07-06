/**
 * ZAAYNAA — Données de marque (catalogue éditorial)
 * --------------------------------------------------
 * "Modern Moroccan Quiet Luxury"
 *
 * Ces données alimentent les sections éditoriales du site (accueil,
 * collections, storytelling) tant que le vrai catalogue Shopify n'est
 * pas connecté. Les produits "shoppables" (panier / checkout) viennent
 * de Mock.shop via la Storefront API. Quand le vrai Shopify sera relié,
 * ces fiches serviront de référence pour créer les produits réels.
 */

export const BRAND = {
  name: 'ZAAYNAA',
  positioning: 'Modern Moroccan Quiet Luxury',
  // Slogan officiel UNIQUEMENT (pas de « Elegance by Nature » ni placeholder).
  slogan: 'Discret en surface. Extraordinaire de près.',
  hero: 'Discret en surface. Extraordinaire de près.',
  intro:
    'Une maison de joaillerie parisienne secrètement inspirée par le Maroc. ' +
    'Discrète en surface. Extraordinaire de près.',
  email: 'contact@zaaynaa.com',
  instagram: 'https://instagram.com/zaaynaa',
} as const;

export type BrandProduct = {
  handle: string;
  name: string;
  arabic?: string;
  collection: 'heritage' | 'nour';
  price: number; // EUR
  stone?: string;
  baseline: string;
  story: string;
  material: string;
  hero?: boolean;
  /** Visuel produit généré (chemin public). Si absent → placeholder calligraphie. */
  image?: string;
};

export const COLLECTIONS = [
  {
    handle: 'heritage',
    name: 'Héritage',
    subtitle: 'Sans pierres — Argent 925 & vermeil or 18k',
    description:
      "L'or pur, gravé et sculpté. Des détails marocains cachés que l'on " +
      'découvre lentement. Le minimalisme comme déclaration.',
  },
  {
    handle: 'nour',
    name: 'Nour',
    subtitle: 'Avec pierres — Argent 925, vermeil & zircone',
    description:
      "La lumière sertie dans la pierre. Sous chaque monture, une architecture " +
      'marocaine cachée — un secret porté contre la peau.',
  },
] as const;

export const PRODUCTS: BrandProduct[] = [
  // ── COLLECTION HÉRITAGE ──────────────────────────────
  {
    handle: 'hob-classic',
    name: 'HOB Classic',
    arabic: 'حب',
    collection: 'heritage',
    price: 69,
    baseline: "L'amour gravé dans l'or.",
    story:
      "Une déclaration discrète, mais éternelle. L'anneau ultra-fin porte la " +
      "calligraphie 'حب' (amour) micro-gravée, et dissimule sous la bande un " +
      'motif de filigrane marocain que seuls certains angles révèlent.',
    material: 'Argent sterling 925, finition vermeil or 18k. Gravure « ZAAYNAA » à l\'intérieur.',
  },
  {
    handle: 'hilal-classic',
    name: 'HILAL Classic',
    arabic: 'هلال',
    collection: 'heritage',
    price: 69,
    baseline: 'Comme la lune sur Marrakech la nuit.',
    story:
      "Un croissant de lune délicat de 4 mm — un murmure, pas un cri. Une " +
      "promesse d'élégance silencieuse, sur un profil ultra-fin.",
    material: 'Argent sterling 925, finition vermeil or 18k. Gravure « ZAAYNAA » à l\'intérieur.',
  },
  {
    handle: 'sabr-classic',
    name: 'SABR Classic',
    arabic: 'صبر',
    collection: 'heritage',
    price: 79,
    baseline: "La patience gravée à l'intérieur.",
    story:
      "Une chevalière féminine ultra-délicate. Sur une petite plaque ovale, la " +
      "calligraphie 'صبر' (patience) — un secret précieux, porté contre la peau.",
    material: 'Argent sterling 925, finition vermeil or 18k. Gravure « ZAAYNAA » à l\'intérieur.',
  },
  {
    handle: 'najma-classic',
    name: 'NAJMA Classic',
    arabic: 'نجمة',
    collection: 'heritage',
    price: 79,
    baseline: "L'étoile à 8 branches, réinventée.",
    story:
      "Symbole millénaire d'équilibre, l'étoile à huit branches révèle une " +
      'structure architecturale en couches, comme le stuc des palais marocains.',
    material: 'Argent sterling 925, finition vermeil or 18k. Gravure « ZAAYNAA » à l\'intérieur.',
  },
  {
    handle: 'zellige-set',
    name: 'ZELLIGE Set',
    collection: 'heritage',
    price: 109,
    baseline: "L'art ancestral des palais, en trio délicat.",
    story:
      "Trois bagues fines à empiler, chacune portant un motif géométrique " +
      'inspiré du zellige marocain. Trois bagues, mille histoires.',
    material: 'Lot de 3 anneaux. Argent sterling 925, finition vermeil or 18k.',
  },

  // ── COLLECTION NOUR ──────────────────────────────────
  {
    handle: 'hob-emeraude',
    name: 'HOB Émeraude',
    arabic: 'حب',
    collection: 'nour',
    price: 129,
    stone: 'Zircone taille émeraude, vert profond (4×3 mm)',
    baseline: "L'amour serti dans l'émeraude.",
    story:
      "La lumière cachée dans la pierre. Sous l'émeraude, une structure " +
      'géométrique marocaine se dévoile de profil — un secret que seule elle connaît.',
    material:
      'Argent sterling 925, vermeil or 18k. Micro-pavé de zircones blanches. Gravure « ZAAYNAA ».',
    image: '/hob-emeraude-hero.png',
  },
  {
    handle: 'hob-saphir',
    name: 'HOB Saphir',
    arabic: 'حب',
    collection: 'nour',
    price: 129,
    stone: 'Zircone saphir bleu profond (4×3 mm)',
    baseline: "L'amour sous les étoiles de Marrakech.",
    story:
      "Un secret porté dans le bleu de la nuit. La même âme cachée que HOB " +
      'Émeraude, sous un ciel de minuit.',
    material:
      'Argent sterling 925, vermeil or 18k. Micro-pavé de zircones blanches. Gravure « ZAAYNAA ».',
    image: '/hob-saphir-hero.png',
  },
  {
    handle: 'hob-cristal',
    name: 'HOB Cristal',
    arabic: 'حب',
    collection: 'nour',
    price: 119,
    stone: 'Zircone blanche type diamant (4×3 mm)',
    baseline: "L'amour cristallisé dans la lumière.",
    story:
      'Le plus polyvalent — un luxe de tous les jours. Pour celle qui brille ' +
      'sans effort.',
    material:
      'Argent sterling 925, vermeil or 18k. Micro-pavé de zircones blanches. Gravure « ZAAYNAA ».',
    image: '/hob-cristal-hero.png',
  },
  {
    handle: 'hilal-lune-bleue',
    name: 'HILAL Lune Bleue',
    arabic: 'هلال',
    collection: 'nour',
    price: 129,
    stone: 'Zircone saphir bleu sertie dans le croissant (6 mm)',
    baseline: 'La lune qui ne se couche jamais.',
    story:
      "Une pierre bleue logée dans le croissant — la « lune » qui brille de " +
      "l'intérieur. Portée au doigt, gardée pour toujours.",
    material: 'Argent sterling 925, vermeil or 18k. Gravure « ZAAYNAA » à l\'intérieur.',
  },
  {
    handle: 'najma-emeraude',
    name: 'NAJMA Émeraude',
    arabic: 'نجمة',
    collection: 'nour',
    price: 149,
    stone: 'Zircone émeraude au centre de l\'étoile',
    baseline: "L'étoile qui guide et illumine.",
    story:
      "La structure géométrique de l'étoile tient la pierre comme une fenêtre " +
      "marocaine tient la lumière. Au cœur de l'or, la lumière émeraude.",
    material:
      'Argent sterling 925, vermeil or 18k. Micro-pavé sur les pointes. Gravure « ZAAYNAA ».',
  },
  {
    handle: 'nour-signature',
    name: 'NOUR Émeraude — Signature',
    arabic: 'نور',
    collection: 'nour',
    price: 179,
    stone: 'Zircone taille émeraude rectangulaire, vert vif (6×4 mm)',
    baseline: "La lumière cachée dans l'émeraude.",
    story:
      "Au cœur de la pierre, l'âme marocaine. Sous la monture, une architecture " +
      'zellige reste volontairement cachée — comme un secret porté contre la peau. ' +
      "Portée par celles qui voient ce que les autres ne voient pas.",
    material:
      'Argent sterling 925, vermeil or 18k. Micro-inscription « نور » et « ZAAYNAA » à l\'intérieur.',
    hero: true,
    image: '/nour-signature-hero.png',
  },
];

export const RING_SIZES = ['48', '50', '52', '54', '56', '58'];

/** Contenu éditorial pour les vrais produits Shopify (en attendant les metafields). */
export const SHOPIFY_EDITORIAL: Record<
  string,
  {
    shortName: string;
    arabic: string;
    baseline: string;
    collection: 'heritage' | 'nour';
    storyEN: string;
  }
> = {
  'layali-necklace-arabic-elegance-by-zaaynaa': {
    shortName: 'Layali',
    arabic: 'ليالي',
    baseline: 'Les nuits qui brillent de l\'intérieur.',
    collection: 'heritage',
    storyEN: 'NIGHTS, ENGRAVED IN GOLD',
  },
  'rimal-necklace-coastal-soul-by-zaaynaa': {
    shortName: 'Rimal',
    arabic: 'رمال',
    baseline: 'Le souffle des côtes marocaines.',
    collection: 'heritage',
    storyEN: 'SANDS OF THE MOROCCAN SHORE',
  },
  'wardah-necklace-floral-grace-by-zaaynaa': {
    shortName: 'Wardah',
    arabic: 'وردة',
    baseline: 'La fleur cachée sous l\'argent.',
    collection: 'heritage',
    storyEN: 'BLOOM, ENGRAVED FOREVER',
  },
  'noujoum-choker-celestial-elegance-by-zaaynaa': {
    shortName: 'Noujoum',
    arabic: 'نجوم',
    baseline: 'Un ciel d\'étoiles, porté contre la peau.',
    collection: 'heritage',
    storyEN: 'STARS, WORN CLOSE TO SKIN',
  },
  'zahra-necklace-emerald-bloom-by-zaaynaa': {
    shortName: 'Zahra',
    arabic: 'زهرة',
    baseline: 'L\'émeraude cachée dans la fleur.',
    collection: 'nour',
    storyEN: 'THE BLOOM THAT ILLUMINATES',
  },
  'qalb-ring-heart-of-gold-by-zaaynaa': {
    shortName: 'Qalb',
    arabic: 'قلب',
    baseline: 'Le cœur gravé dans l\'or.',
    collection: 'heritage',
    storyEN: 'HEART OF GOLD, WORN FOREVER',
  },
  'farasha-earring-set-dancing-light-by-zaaynaa': {
    shortName: 'Farasha',
    arabic: 'فراشة',
    baseline: 'La lumière qui danse à chaque mouvement.',
    collection: 'nour',
    storyEN: 'BUTTERFLY OF LIGHT',
  },
  'nahr-bracelet-flow-of-light-by-zaaynaa': {
    shortName: 'Nahr',
    arabic: 'نهر',
    baseline: 'La rivière qui court sur le poignet.',
    collection: 'heritage',
    storyEN: 'THE RIVER FLOWS ON',
  },
  'lamah-bracelet-glimmers-of-the-heart-by-zaaynaa': {
    shortName: 'Lamah',
    arabic: 'لمعة',
    baseline: 'Les reflets du cœur, scintillants.',
    collection: 'nour',
    storyEN: 'GLIMMERS, CARRIED CLOSE',
  },
  'jawharah-ring-the-crowned-gem-by-zaaynaa': {
    shortName: 'Jawharah',
    arabic: 'جوهرة',
    baseline: 'Le joyau couronné.',
    collection: 'nour',
    storyEN: 'THE CROWNED JEWEL',
  },
  'najma-qamar-earrings-celestial-whispers-by-zaaynaa': {
    shortName: 'Najma & Qamar',
    arabic: 'نجمة وقمر',
    baseline: 'L\'étoile et la lune, chuchotées à l\'oreille.',
    collection: 'nour',
    storyEN: 'STAR AND MOON, WHISPERED',
  },
};

export function productsByCollection(handle: 'heritage' | 'nour') {
  return PRODUCTS.filter((p) => p.collection === handle);
}

export function getProduct(handle: string) {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function relatedProducts(handle: string, max = 3) {
  const product = getProduct(handle);
  if (!product) return [];
  return PRODUCTS.filter(
    (p) => p.collection === product.collection && p.handle !== handle,
  ).slice(0, max);
}

/** Le « détail caché » — le moment WOW propre à chaque pièce. */
export function hiddenDetail(p: BrandProduct): string {
  if (p.stone) {
    return (
      'Sous la pierre se cache une structure géométrique inspirée du zellige ' +
      "marocain, visible de profil en macro. Un secret que seule la porteuse connaît."
    );
  }
  if (p.arabic) {
    return (
      `La calligraphie « ${p.arabic} » et un filigrane marocain discret se ` +
      "révèlent seulement sous certains angles, contre la peau."
    );
  }
  return (
    'Un motif marocain finement travaillé se découvre lentement, ' +
    'récompense de celles qui regardent de près.'
  );
}

export function getHeroProduct() {
  return PRODUCTS.find((p) => p.hero) ?? PRODUCTS[PRODUCTS.length - 1];
}

export function formatEUR(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(price);
}
