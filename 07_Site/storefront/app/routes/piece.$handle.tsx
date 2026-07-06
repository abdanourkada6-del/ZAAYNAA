import {useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/piece.$handle';
import {
  getProduct,
  relatedProducts,
  hiddenDetail,
  formatEUR,
  RING_SIZES,
  COLLECTIONS,
} from '~/lib/brand';
import {Reveal} from '~/components/Reveal';

export const meta: Route.MetaFunction = ({data}) => {
  if (!data?.product) return [{title: 'ZAAYNAA'}];
  return [
    {title: `${data.product.name} — ZAAYNAA`},
    {name: 'description', content: data.product.baseline},
  ];
};

export async function loader({params}: Route.LoaderArgs) {
  const product = getProduct(params.handle ?? '');
  if (!product) {
    throw new Response('Pièce introuvable', {status: 404});
  }
  return {
    product,
    related: relatedProducts(product.handle),
    hidden: hiddenDetail(product),
  };
}

export default function Piece() {
  const {product, related, hidden} = useLoaderData<typeof loader>();
  const [size, setSize] = useState<string | null>(null);
  const collectionName =
    COLLECTIONS.find((c) => c.handle === product.collection)?.name ?? '';

  // Brief EN line from the moodboard story cards.
  const enLine =
    product.collection === 'nour' ? 'LIGHT HIDDEN WITHIN' : 'ENGRAVED FOREVER';

  return (
    <>
      <article className="zy-pdp">
        {/* Gallery — placeholders élégants en attendant les visuels Higgsfield */}
        <div className="zy-pdp-gallery">
          <div className="zy-pdp-main-img">
            {product.image ? (
              <img src={product.image} alt={`${product.name} — ZAAYNAA`} />
            ) : (
              <span className="zy-card-arabic">{product.arabic ?? '✦'}</span>
            )}
          </div>
          <div className="zy-pdp-thumbs">
            {['Hero', 'Main', 'Macro', 'Écrin'].map((label) => (
              <div className="zy-pdp-thumb" key={label} title={label}>
                ✦
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="zy-pdp-info">
          <span className="zy-eyebrow zy-pdp-collection">
            Collection {collectionName}
          </span>
          <h1>{product.name}</h1>
          {product.arabic && <span className="zy-pdp-arabic">{product.arabic}</span>}
          <div className="zy-pdp-price">{formatEUR(product.price)}</div>
          <p className="zy-pdp-baseline">« {product.baseline} »</p>

          <span className="zy-field-label">Taille (tour de doigt)</span>
          <div className="zy-sizes" role="group" aria-label="Choix de la taille">
            {RING_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className="zy-size"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <Link className="zy-btn zy-pdp-cta" to="/contact">
            Réserver cette pièce
          </Link>
          <p className="zy-pdp-note">
            Vente en ligne bientôt disponible. Pour commander dès maintenant,
            contactez-nous{size ? ` (taille ${size})` : ''}.
          </p>

          {/* Story card */}
          <div className="zy-storycard">
            <div className="en">{enLine}</div>
            <div className="fr">« {product.baseline} »</div>
            <div className="en">ZAAYNAA ✦</div>
          </div>

          {/* Accordions */}
          <details className="zy-accordion" open>
            <summary>Détails &amp; matériaux</summary>
            <p>{product.material}</p>
          </details>
          <details className="zy-accordion">
            <summary>Le détail caché</summary>
            <p>{hidden}</p>
          </details>
          <details className="zy-accordion">
            <summary>Livraison &amp; écrin</summary>
            <p>
              Livrée dans l&rsquo;écrin velours ZAAYNAA, gravure « ZAAYNAA »
              offerte à l&rsquo;intérieur. Emballage soigné, expédition suivie.
            </p>
          </details>
        </div>
      </article>

      {related.length > 0 && (
        <section className="zy-related">
          <Reveal className="zy-section-head">
            <span className="zy-eyebrow">À découvrir aussi</span>
            <h2 style={{fontSize: '1.8rem'}}>Dans la même collection</h2>
          </Reveal>
          <div className="zy-product-grid">
            {related.map((p) => (
              <Link key={p.handle} to={`/piece/${p.handle}`} className="zy-card">
                <div className="zy-card-media">
                  {p.stone && <span className="zy-card-badge">Pierre</span>}
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <span className="zy-card-arabic">{p.arabic ?? '✦'}</span>
                  )}
                </div>
                <h4>{p.name}</h4>
                <p className="zy-card-baseline">{p.baseline}</p>
                <span className="zy-card-price">{formatEUR(p.price)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
