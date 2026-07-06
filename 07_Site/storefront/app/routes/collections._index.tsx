import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {Image} from '@shopify/hydrogen';
import {Reveal} from '~/components/Reveal';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Collections — ZAAYNAA'},
    {
      name: 'description',
      content:
        'Héritage et Nour — deux univers, un même secret marocain porté contre la peau. Colliers, bagues, boucles d’oreilles et bracelets.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: {first: 20},
    }),
  ]);
  return {collections};
}

type CollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
};

/* Univers éditoriaux (grandes cartes) */
const EDITORIAL = [
  {
    handle: 'heritage',
    arabic: 'إرث',
    name: 'Héritage',
    text: "L'or pur, gravé et sculpté. Des détails marocains cachés que l'on découvre lentement. Le minimalisme comme déclaration.",
  },
  {
    handle: 'nour',
    arabic: 'نور',
    name: 'Nour',
    text: 'La lumière sertie dans la pierre. Sous chaque monture, une architecture marocaine cachée — un secret porté contre la peau.',
  },
];

/* Catégories produit (cartes photo numérotées) */
const CATEGORIES: Array<{handle: string; fr: string}> = [
  {handle: 'necklaces', fr: 'Colliers'},
  {handle: 'rings', fr: 'Bagues'},
  {handle: 'earrings', fr: 'Boucles d’oreilles'},
  {handle: 'bracelets', fr: 'Bracelets'},
];

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();
  const byHandle = new Map(
    (collections.nodes as CollectionNode[]).map((c) => [c.handle, c]),
  );

  return (
    <div className="cols-page">
      <nav className="crumbs" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span className="sep">·</span>
        <span className="current">Collections</span>
      </nav>

      {/* En-tête */}
      <header className="cols-hero">
        <Reveal>
          <div className="gold-line-v" />
          <h1>
            Nos <em>collections</em>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p>Deux univers, un même secret marocain porté contre la peau.</p>
        </Reveal>
      </header>

      {/* Deux univers — Héritage & Nour */}
      <div className="cols-duo">
        {EDITORIAL.map((u, i) => {
          const col = byHandle.get(u.handle);
          if (!col) return null;
          return (
            <Reveal key={u.handle} delay={i * 0.15}>
              <Link
                to={`/collections/${u.handle}`}
                className={`duo-card ${u.handle}`}
              >
                <span className="duo-arabic" aria-hidden="true">
                  {u.arabic}
                </span>
                <p className="cat-label">Univers 0{i + 1}</p>
                <h2>{u.name}</h2>
                <p>{u.text}</p>
                <span className="duo-link">Explorer</span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Par catégorie */}
      <div className="cat-header">
        <div>
          <Reveal>
            <div className="section-label">Par type</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-heading" style={{marginBottom: 0}}>
              Parcourir par <em>catégorie</em>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <Link to="/collections/all" className="btn-ghost">
            Toutes les pièces
          </Link>
        </Reveal>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map(({handle, fr}, i) => {
          const col = byHandle.get(handle);
          if (!col) return null;
          return (
            <Reveal key={handle} delay={i * 0.12}>
              <Link to={`/collections/${handle}`} className="cat-card">
                {col.image ? (
                  <Image
                    data={col.image}
                    alt={col.image.altText || `Collection ${fr} — ZAAYNAA`}
                    sizes="(min-width: 64em) 25vw, (min-width: 48em) 50vw, 100vw"
                    loading="lazy"
                  />
                ) : null}
                <div className="cat-info">
                  <p className="cat-label">0{i + 1}</p>
                  <h3 className="cat-name">{fr}</h3>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment CollectionCard on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $first: Int
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        ...CollectionCard
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
