import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {motion} from 'framer-motion';
import {DUR, EASE, STAGGER} from '~/lib/motion';
import {SHOPIFY_EDITORIAL} from '~/lib/brand';

/**
 * Produits utilitaires (apps, protection colis, carte cadeau sans visuel)
 * à ne jamais afficher dans les grilles. Fix durable : les dépublier du
 * canal « Zaaynaa Headless » dans l'admin Shopify, puis retirer cette liste.
 */
export const HIDDEN_PRODUCT_HANDLES = new Set([
  'package-protection',
  'product-customizer-item-customizations',
  'zaaynaa-gift-card',
]);

export function isDisplayableProduct(handle: string) {
  return !HIDDEN_PRODUCT_HANDLES.has(handle);
}

/** Libellés FR des types de produits Shopify. */
export const TYPE_LABELS_FR: Record<string, string> = {
  necklace: 'Collier',
  ring: 'Bague',
  earring: 'Boucles d’oreilles',
  bracelet: 'Bracelet',
  jewelry: 'Bijou',
};

type CardMoney = {amount: string; currencyCode: CurrencyCode};
type CardImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type CardProduct = {
  id: string;
  handle: string;
  title: string;
  productType?: string | null;
  featuredImage?: CardImage | null;
  /** 2 premières images produit — la 2e se révèle au survol. */
  images?: {nodes: CardImage[]} | null;
  priceRange: {minVariantPrice: CardMoney};
};

/**
 * Carte produit v2 — image 3:4, overlay « Voir la pièce » au survol,
 * libellé type + calligraphie, nom serif, prix. Style référence maison de luxe.
 */
export function ProductCardV2({
  product,
  index = 0,
  loading = 'lazy',
}: {
  product: CardProduct;
  index?: number;
  loading?: 'eager' | 'lazy';
}) {
  const editorial = SHOPIFY_EDITORIAL[product.handle];
  const typeLabel = product.productType
    ? (TYPE_LABELS_FR[product.productType.toLowerCase()] ?? 'Bijou')
    : 'Bijou';
  // 2e image (différente de la principale) révélée au survol
  const secondImage =
    product.images?.nodes?.find(
      (img) => img.url !== product.featuredImage?.url,
    ) ?? null;

  return (
    // Reveal en cascade (stagger 50 ms/item), lift au survol, feedback au
    // press. Un seul élément animé — transform/opacity uniquement.
    <motion.div
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      whileHover={{y: -6}}
      whileTap={{scale: 0.98}}
      transition={{
        duration: DUR.slow,
        ease: EASE,
        delay: (index % 6) * STAGGER,
        // hover/tap réagissent vite, indépendamment du reveal
        y: {duration: DUR.base, ease: EASE},
        scale: {duration: DUR.fast, ease: EASE},
      }}
    >
      <Link
        to={`/products/${product.handle}`}
        className="product-card"
        prefetch="intent"
      >
        <div className="product-imgbox">
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              alt={product.featuredImage.altText || product.title}
              sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
              loading={loading}
            />
          ) : null}
          {secondImage ? (
            <Image
              className="product-img-alt"
              data={secondImage}
              alt={secondImage.altText || product.title}
              sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
              loading="lazy"
              aria-hidden="true"
            />
          ) : null}
          <div className="product-overlay">
            <span className="product-add">Voir la pièce</span>
          </div>
        </div>
        <div className="product-meta">
          <p className="product-label">
            {typeLabel}
            {editorial?.arabic ? ` · ${editorial.arabic}` : ''}
          </p>
          <p className="product-name">
            {editorial?.shortName ?? product.title}
          </p>
          <div className="product-price">
            <Money data={product.priceRange.minVariantPrice} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
