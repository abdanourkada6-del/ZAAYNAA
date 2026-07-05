import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {SHOPIFY_EDITORIAL} from '~/lib/brand';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const editorial = SHOPIFY_EDITORIAL[product.handle];

  return (
    <Link className="zy-card" key={product.id} prefetch="intent" to={variantUrl}>
      <div className="zy-card-media">
        {image ? (
          <Image
            alt={image.altText || product.title}
            aspectRatio="4/5"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 280px, 50vw"
          />
        ) : (
          <span className="zy-card-arabic">{editorial?.arabic ?? '✦'}</span>
        )}
      </div>
      <h4>{editorial?.shortName ?? product.title}</h4>
      {editorial?.baseline && (
        <p className="zy-card-baseline">{editorial.baseline}</p>
      )}
      <div className="product-item-price">
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}
