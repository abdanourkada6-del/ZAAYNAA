import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {Reveal} from '~/components/Reveal';
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

  return (
    <Reveal delay={(index % 3) * 0.1}>
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
    </Reveal>
  );
}
