import type {Route} from './+types/collections.all';
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {Reveal} from '~/components/Reveal';
import {
  ProductCardV2,
  isDisplayableProduct,
  type CardProduct,
} from '~/components/ProductCardV2';
import type {CollectionItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Toutes les pièces — ZAAYNAA'},
    {
      name: 'description',
      content:
        'Le catalogue complet ZAAYNAA — colliers, bagues, boucles d’oreilles et bracelets. Argent 925 & vermeil or 18k, héritage marocain.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return {...criticalData};
}

async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
  ]);
  return {products};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="plp">
      <nav className="crumbs" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span className="sep">·</span>
        <Link to="/collections">Collections</Link>
        <span className="sep">·</span>
        <span className="current">Toutes les pièces</span>
      </nav>

      <header className="plp-header">
        <Reveal>
          <div className="section-label">Le catalogue</div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="section-heading" style={{marginBottom: 16}}>
            Toutes les <em>pièces</em>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="body-text">
            Chaque bijou ZAAYNAA cache un détail marocain — une calligraphie,
            un motif, une lumière. Regardez de près.
          </p>
        </Reveal>
      </header>

      <PaginatedResourceSection<CollectionItemFragment>
        connection={products}
        resourcesClassName="plp-grid"
      >
        {({node: product, index}) =>
          isDisplayableProduct(product.handle) ? (
            <ProductCardV2
              key={product.id}
              product={product as CardProduct}
              index={index}
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          ) : null
        }
      </PaginatedResourceSection>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    productType
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 2) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
