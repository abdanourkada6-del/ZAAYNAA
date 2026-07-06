import {useLoaderData, Link} from 'react-router';
import {useState} from 'react';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Image,
  Money,
} from '@shopify/hydrogen';
import {ProductForm} from '~/components/ProductForm';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Reveal} from '~/components/Reveal';
import {
  ProductCardV2,
  isDisplayableProduct,
  type CardProduct,
} from '~/components/ProductCardV2';
import {SHOPIFY_EDITORIAL} from '~/lib/brand';

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;
  const editorial = product ? SHOPIFY_EDITORIAL[product.handle] : null;
  const title = editorial?.shortName
    ? `${editorial.shortName} — ZAAYNAA`
    : `${product?.title ?? ''} — ZAAYNAA`;
  const description =
    editorial?.baseline ?? product?.description?.slice(0, 155) ?? '';
  const image = product?.images?.nodes?.[0]?.url;
  return [
    {title},
    {name: 'description', content: description},
    {rel: 'canonical', href: `/products/${product?.handle}`},
    {property: 'og:type', content: 'product'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    ...(image ? [{property: 'og:image', content: image}] : []),
    {name: 'twitter:card', content: 'summary_large_image'},
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const {handle} = args.params;
  const {storefront} = args.context;

  if (!handle) throw new Error('Expected product handle');

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(args.request)},
    }),
  ]);

  if (!product?.id) throw new Response(null, {status: 404});

  redirectIfHandleIsLocalized(args.request, {handle, data: product});

  const relatedProducts = await storefront
    .query(RELATED_PRODUCTS_QUERY, {variables: {first: 8}})
    .catch(() => null);

  return {product, relatedProducts};
}

export default function Product() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const editorial = SHOPIFY_EDITORIAL[product.handle];
  const displayName = editorial?.shortName ?? product.title;
  const arabic = editorial?.arabic;
  const baseline = editorial?.baseline;
  const storyEN = editorial?.storyEN;
  const collectionSlug = editorial?.collection ?? 'heritage';

  type ProductImage = {id: string; url: string; altText: string | null; width: number; height: number};
  // Collect all product images for gallery
  const images: ProductImage[] = (product.images?.nodes ?? []) as ProductImage[];
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const {open: openAside} = useAside();
  const mainImage =
    (selectedImageIdx !== null ? images[selectedImageIdx] : null) ??
    selectedVariant?.image ??
    images[0] ??
    null;
  const thumbImages = images.slice(0, 4);

  return (
    <>
      <article className="zy-pdp">
        {/* Gallery */}
        <div className="zy-pdp-gallery">
          <div className="zy-pdp-main-img">
            {mainImage ? (
              <Image
                data={mainImage}
                alt={mainImage.altText || displayName}
                sizes="(min-width: 56em) 50vw, 100vw"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            ) : (
              <span className="zy-card-arabic">{arabic ?? '✦'}</span>
            )}
          </div>
          {thumbImages.length > 1 && (
            <div className="zy-pdp-thumbs">
              {thumbImages.map((img: ProductImage, i: number) => (
                <button
                  type="button"
                  key={img.id ?? i}
                  className={
                    mainImage && img.url === mainImage.url ? 'active' : ''
                  }
                  onClick={() => setSelectedImageIdx(i)}
                  aria-label={`Voir la photo ${i + 1}`}
                >
                  <div className="zy-pdp-thumb">
                    <Image
                      data={img}
                      alt={img.altText || displayName}
                      aspectRatio="1/1"
                      sizes="100px"
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="zy-pdp-info">
          <nav className="crumbs" aria-label="Fil d’Ariane">
            <Link to="/">Accueil</Link>
            <span className="sep">·</span>
            <Link to={`/collections/${collectionSlug}`}>
              {collectionSlug === 'nour' ? 'Nour' : 'Héritage'}
            </Link>
            <span className="sep">·</span>
            <span className="current">{displayName}</span>
          </nav>

          <h1>{displayName}</h1>
          {arabic && <div className="zy-pdp-arabic">{arabic}</div>}

          <div className="zy-pdp-price">
            <Money data={selectedVariant?.price ?? product.priceRange.minVariantPrice} />
          </div>

          {baseline && (
            <p className="zy-pdp-baseline">« {baseline} »</p>
          )}

          {/* Variant selector + Add to cart */}
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />

          {/* Story card */}
          {(storyEN || baseline) && (
            <div className="zy-storycard">
              {storyEN && <div className="en">{storyEN}</div>}
              {baseline && <div className="fr">« {baseline} »</div>}
              <div className="en">ZAAYNAA ✦</div>
            </div>
          )}

          {/* Accordions */}
          <details className="zy-accordion" open>
            <summary>Détails &amp; matériaux</summary>
            <div
              style={{paddingBottom: '1.2rem', fontSize: '0.95rem', opacity: 0.85}}
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            />
          </details>
          <details className="zy-accordion">
            <summary>Le détail caché ✦</summary>
            <p>
              Sous la monture, un motif géométrique marocain se révèle de profil —
              l&rsquo;architecture du zellige cachée dans l&rsquo;or. Un secret
              que seule la porteuse connaît.
            </p>
          </details>
          <details className="zy-accordion">
            <summary>Livraison &amp; écrin</summary>
            <p>
              Livrée dans l&rsquo;écrin velours ZAAYNAA, gravure « ZAAYNAA »
              offerte à l&rsquo;intérieur. Emballage précieux, expédition suivie.
              Livraison internationale disponible.
            </p>
          </details>
        </div>
      </article>

      {/* Barre sticky mobile — ajout au panier toujours à portée de pouce */}
      <div className="pdp-stickybar" aria-hidden={false}>
        <div className="pdp-stickybar-info">
          <span className="pdp-stickybar-name">{displayName}</span>
          <span className="pdp-stickybar-price">
            <Money
              data={selectedVariant?.price ?? product.priceRange.minVariantPrice}
            />
          </span>
        </div>
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => openAside('cart')}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant,
                  },
                ]
              : []
          }
        >
          {selectedVariant?.availableForSale ? 'Ajouter au panier' : 'Épuisé'}
        </AddToCartButton>
      </div>

      {/* Related products */}
      <RelatedSection
        relatedProducts={relatedProducts}
        currentId={product.id}
        collectionSlug={collectionSlug}
      />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

function RelatedSection({
  relatedProducts,
  currentId,
  collectionSlug,
}: {
  relatedProducts: {products: {nodes: CardProduct[]}} | null;
  currentId: string;
  collectionSlug: 'heritage' | 'nour';
}) {
  const all = (relatedProducts?.products?.nodes ?? []).filter(
    (p) => p.id !== currentId && isDisplayableProduct(p.handle),
  );
  // Priorité aux pièces de la même collection éditoriale
  const sameCollection = all.filter(
    (p) => SHOPIFY_EDITORIAL[p.handle]?.collection === collectionSlug,
  );
  const picks = [...sameCollection, ...all.filter((p) => !sameCollection.includes(p))]
    .slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <section className="zy-related">
      <div className="cat-header">
        <div>
          <Reveal>
            <div className="section-label">À découvrir aussi</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-heading" style={{marginBottom: 0}}>
              Vous aimerez <em>aussi</em>
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="plp-grid">
        {picks.map((p, i) => (
          <ProductCardV2 key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── GraphQL ─────────────────────────────────────── */
const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice { amount currencyCode }
    id
    image {
      __typename id url altText width height
    }
    price { amount currencyCode }
    product { title handle }
    selectedOptions { name value }
    sku
    title
    unitPrice { amount currencyCode }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 6) {
      nodes { id url altText width height }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant { ...ProductVariant }
        swatch {
          color
          image { previewImage { url } }
        }
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo { description title }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RELATED_PRODUCTS_QUERY = `#graphql
  fragment RelatedProductItem on Product {
    id handle title productType
    featuredImage { id url altText width height }
    images(first: 2) { nodes { id url altText width height } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
  }
  query RelatedProducts($country: CountryCode, $language: LanguageCode, $first: Int)
  @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes { ...RelatedProductItem }
    }
  }
` as const;
