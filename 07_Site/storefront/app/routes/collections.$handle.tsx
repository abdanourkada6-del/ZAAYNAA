import {redirect, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Reveal} from '~/components/Reveal';
import {ProductCardV2, type CardProduct} from '~/components/ProductCardV2';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = ({data}) => {
  const title = data?.collection?.title ?? 'Collection';
  return [
    {title: `${title} — ZAAYNAA`},
    {name: 'description', content: data?.collection?.description ?? ''},
  ];
};

export async function loader(args: Route.LoaderArgs) {
  return await loadCriticalData(args);
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) throw redirect('/collections');

  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection "${handle}" introuvable`, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="plp">
      {/* Fil d'Ariane */}
      <nav className="crumbs" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span className="sep">·</span>
        <Link to="/collections">Collections</Link>
        <span className="sep">·</span>
        <span className="current">{collection.title}</span>
      </nav>

      {/* En-tête éditorial */}
      <header className="plp-header">
        <Reveal>
          <div className="section-label">Collection</div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="section-heading" style={{marginBottom: 16}}>
            {collection.title}
          </h1>
        </Reveal>
        {collection.description && (
          <Reveal delay={0.3}>
            <p className="body-text">{collection.description}</p>
          </Reveal>
        )}
      </header>

      {/* Grille produits v2 */}
      <PaginatedResourceSection<ProductItemFragment>
        connection={collection.products}
        resourcesClassName="plp-grid"
      >
        {({node: product, index}) => (
          <ProductCardV2
            key={product.id}
            product={product as CardProduct}
            index={index}
            loading={index < 6 ? 'eager' : 'lazy'}
          />
        )}
      </PaginatedResourceSection>

      <Analytics.CollectionView
        data={{collection: {id: collection.id, handle: collection.handle}}}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
