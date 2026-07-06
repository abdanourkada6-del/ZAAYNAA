import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {Reveal} from '~/components/Reveal';
import {
  ProductCardV2,
  isDisplayableProduct,
  type CardProduct,
} from '~/components/ProductCardV2';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'ZAAYNAA — Modern Moroccan Quiet Luxury'},
    {
      name: 'description',
      content:
        'Joaillerie inspirée du Maroc, pensée à Paris. Discret en surface, extraordinaire de près. Argent 925 & vermeil or 18k.',
    },
    {property: 'og:title', content: 'ZAAYNAA — Modern Moroccan Quiet Luxury'},
    {
      property: 'og:description',
      content: 'Discret en surface. Extraordinaire de près.',
    },
  ];
};

/* ── Types (résultats Storefront API) ─────────────── */
type MoneyV2 = {amount: string; currencyCode: CurrencyCode};
type StorefrontImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};
type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  featuredImage?: StorefrontImage | null;
  images?: {nodes: StorefrontImage[]} | null;
  priceRange: {minVariantPrice: MoneyV2};
};
type HomeFeatured = {products: {nodes: FeaturedProduct[]}} | null;
type CategoryCollection = {
  id: string;
  handle: string;
  title: string;
  image?: StorefrontImage | null;
} | null;
type HomeCategories = {
  necklaces: CategoryCollection;
  rings: CategoryCollection;
  earrings: CategoryCollection;
  bracelets: CategoryCollection;
} | null;

export async function loader(args: Route.LoaderArgs) {
  return loadDeferredData(args);
}

function loadDeferredData({context}: Route.LoaderArgs) {
  const featured = context.storefront
    .query(HOME_FEATURED_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    }) as unknown as Promise<HomeFeatured>;

  const categories = context.storefront
    .query(HOME_CATEGORIES_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    }) as unknown as Promise<HomeCategories>;

  return {featured, categories};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <Hero />
      <Marquee />
      <Story />
      <Categories categories={data.categories} />
      <FeaturedPieces featured={data.featured} />
      <Cinematic />
      <Philosophy />
      <Materials />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

/* ── Hero (split, image droite, parallax léger) ─────── */
function Hero() {
  const reducedMotion = useReducedMotion();
  const {scrollY} = useScroll();
  // Parallax doux : l'image glisse de 60px sur les 700 premiers px de
  // scroll. Amplitude 0 si reduced-motion (la valeur initiale reste 0
  // dans les deux cas → aucun mismatch d'hydratation).
  const parallaxY = useTransform(
    scrollY,
    [0, 700],
    [0, reducedMotion ? 0 : 60],
  );

  return (
    <section className="hero">
      <div className="hero-bg" />
      <motion.div className="hero-img" style={{y: parallaxY}}>
        <img
          src="/nour-signature-hero.png"
          alt="Bague NOUR Signature — émeraude et vermeil or 18k, ZAAYNAA"
        />
      </motion.div>

      <div className="hero-content">
        <p className="hero-subtitle">Haute Joaillerie · Est. 2025</p>
        <h1 className="hero-title">
          Discret en surface.
          <br />
          <em>Extraordinaire</em>
          <br />
          de près.
        </h1>
        <p className="hero-desc">
          Le minimalisme parisien rencontre l&rsquo;héritage marocain. Chaque
          pièce cache un détail que seule celle qui la porte connaît.
        </p>
        <div className="hero-cta">
          <Link className="btn-primary" to="/collections">
            <span>Découvrir la collection</span>
          </Link>
          <Link className="btn-ghost" to="/about">
            Notre histoire
          </Link>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Défiler</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ── Marquee (bandeau défilant) ─────────────────────── */
const MARQUEE_ITEMS = [
  'Vermeil Or 18k',
  'Argent Sterling 925',
  'Héritage Marocain',
  'زَيْنَاء',
  'Quiet Luxury',
  'Détails Cachés',
  'حب · صبر · نور',
  'Élégance Intemporelle',
];

function Marquee() {
  // Contenu doublé pour une boucle sans couture
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div className="marquee-item" key={`${item}-${i}`}>
            {item} <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Story (héritage) ───────────────────────────────── */
function Story() {
  return (
    <section className="story">
      <Reveal className="story-visual">
        <div className="story-img-main">
          <img
            src="/hob-emeraude-hero.png"
            alt="Bague HOB Émeraude sur velours vert — ZAAYNAA"
            loading="lazy"
          />
        </div>
        <div className="story-img-accent">
          <p className="story-quote">
            «&nbsp;La beauté enracinée dans la culture,
            <br />
            raffinée pour la femme moderne.&nbsp;»
          </p>
        </div>
      </Reveal>
      <div className="story-body-wrap">
        <Reveal>
          <div className="section-label">Notre héritage</div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="section-heading">
            Née de la
            <br />
            <em>grâce orientale</em>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="body-text">
            ZAAYNAA est née d&rsquo;un désir&nbsp;: honorer la richesse de
            l&rsquo;artisanat marocain et de la culture arabe — traduire des
            siècles de raffinement en joaillerie pour la femme
            d&rsquo;aujourd&rsquo;hui.
          </p>
          <p className="body-text">
            Notre nom, زَيْنَاء, porte le sens de la parure et de la beauté en
            arabe. Il dit pour qui nous créons&nbsp;: des femmes qui savent que
            la véritable élégance est discrète, intentionnelle et profondément
            personnelle.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="gold-rule" />
          <Link to="/about" className="btn-ghost">
            Lire notre histoire
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Catégories (collections réelles Shopify) ───────── */
const CATEGORY_LABELS: Array<{
  key: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  fr: string;
}> = [
  {key: 'necklaces', fr: 'Colliers'},
  {key: 'rings', fr: 'Bagues'},
  {key: 'earrings', fr: 'Boucles d’oreilles'},
  {key: 'bracelets', fr: 'Bracelets'},
];

function Categories({categories}: {categories: Promise<HomeCategories>}) {
  return (
    <section className="categories">
      <div className="cat-header">
        <div>
          <Reveal>
            <div className="section-label">Explorer</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-heading" style={{marginBottom: 0}}>
              Nos <em>collections</em>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <Link to="/collections" className="btn-ghost">
            Tout voir
          </Link>
        </Reveal>
      </div>
      <Suspense fallback={<div className="cat-grid" />}>
        <Await resolve={categories}>
          {(cats) => (
            <div className="cat-grid">
              {CATEGORY_LABELS.map(({key, fr}, i) => {
                const col = cats?.[key];
                if (!col) return null;
                return (
                  <Reveal key={key} delay={i * 0.12}>
                    <Link
                      to={`/collections/${col.handle}`}
                      className="cat-card"
                    >
                      {col.image ? (
                        <Image
                          data={col.image}
                          alt={
                            col.image.altText || `Collection ${fr} — ZAAYNAA`
                          }
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
          )}
        </Await>
      </Suspense>
    </section>
  );
}

/* ── Pièces phares (grille asymétrique, produits réels) ── */
function FeaturedPieces({featured}: {featured: Promise<HomeFeatured>}) {
  return (
    <section className="featured">
      <div className="cat-header">
        <div>
          <Reveal>
            <div className="section-label">Nouveautés</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-heading" style={{marginBottom: 0}}>
              La collection
              <br />
              <em>inaugurale</em>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <Link to="/collections/all" className="btn-ghost">
            Voir toutes les pièces
          </Link>
        </Reveal>
      </div>
      <Suspense fallback={<div className="featured-grid" />}>
        <Await resolve={featured}>
          {(data) => {
            const nodes = (data?.products?.nodes ?? [])
              .filter((p) => isDisplayableProduct(p.handle))
              .slice(0, 5);
            return (
              <div className="featured-grid">
                {nodes.map((product, i) => (
                  <ProductCardV2
                    key={product.id}
                    product={product as CardProduct}
                    index={i}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

/* ── Bande cinématique (prête pour une vraie vidéo) ─────
 * Pour passer à une vidéo : remplacer le <img> par
 *   <video autoPlay muted loop playsInline poster="/…">
 *     <source src="/zaaynaa-cinematic.mp4" type="video/mp4" />
 *   </video>
 * et déposer le fichier dans /public.
 */
function Cinematic() {
  return (
    <section className="zy-cinema" aria-label="ZAAYNAA — l’émotion du détail">
      <img
        src="/hob-saphir-hero.png"
        alt="Bague ZAAYNAA en lumière cinématique"
        loading="lazy"
      />
      <div className="zy-cinema-sweep" aria-hidden="true" />
      <span className="zy-spark" style={{top: '28%', left: '22%'}} aria-hidden="true" />
      <span
        className="zy-spark"
        style={{top: '62%', left: '72%', animationDelay: '1.2s'}}
        aria-hidden="true"
      />
      <span
        className="zy-spark"
        style={{top: '46%', left: '52%', animationDelay: '2.1s'}}
        aria-hidden="true"
      />
      <span
        className="zy-spark"
        style={{top: '72%', left: '34%', animationDelay: '3s'}}
        aria-hidden="true"
      />
      <Reveal className="zy-cinema-inner">
        <p className="phi-eyebrow" style={{color: 'var(--gold-light)'}}>
          L’émotion du détail
        </p>
        <h2>
          Un éclat qui se révèle
          <br />
          seulement de près.
        </h2>
        <p>
          Chaque pièce ZAAYNAA capture la lumière comme un secret — pensée pour
          être vécue, pas seulement portée.
        </p>
      </Reveal>
    </section>
  );
}

/* ── Philosophie ────────────────────────────────────── */
function Philosophy() {
  return (
    <section className="philosophy">
      <div className="phi-ring phi-ring-1" />
      <div className="phi-ring phi-ring-2" />
      <div className="phi-ring phi-ring-3" />
      <div className="phi-inner">
        <Reveal>
          <p className="phi-eyebrow">La philosophie ZAAYNAA</p>
          <div className="gold-line-v" />
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="phi-heading">
            «&nbsp;Le luxe n&rsquo;est pas
            <br />
            l&rsquo;<strong>excès</strong> — c&rsquo;est
            <br />
            l&rsquo;intention.&nbsp;»
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="phi-text">
            Nous croyons que les plus belles choses sont façonnées avec soin,
            portées avec sens, et transmises. Chaque bijou ZAAYNAA est pensé
            pour traverser les tendances — et devenir une part de votre
            histoire.
          </p>
        </Reveal>
      </div>
      <div className="phi-pillars">
        <Reveal className="pillar">
          <div className="pillar-num">01</div>
          <div className="pillar-title">Artisanat</div>
          <p className="pillar-text">
            Chaque détail est pesé. Chaque finition est délibérée. Des bijoux
            faits pour durer bien au-delà d&rsquo;une saison.
          </p>
        </Reveal>
        <Reveal className="pillar" delay={0.15}>
          <div className="pillar-num">02</div>
          <div className="pillar-title">Héritage</div>
          <p className="pillar-text">
            Enraciné dans la tradition marocaine et arabe, réinventé pour la
            femme contemporaine du monde entier.
          </p>
        </Reveal>
        <Reveal className="pillar" delay={0.3}>
          <div className="pillar-num">03</div>
          <div className="pillar-title">Élégance</div>
          <p className="pillar-text">
            Minimal. Raffiné. Sereinement confiant. Une beauté qui parle sans
            élever la voix.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Matières ───────────────────────────────────────── */
function Materials() {
  return (
    <section className="materials">
      <div>
        <Reveal>
          <div className="section-label">Les matières</div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="section-heading">
            Seul le
            <br />
            <em>précieux</em> dure
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="body-text">
            Nos pièces sont façonnées en argent sterling 925 et vermeil or 18k
            — pensées pour garder leur lumière au quotidien, et offrir un
            chemin sincère vers le vrai luxe.
          </p>
          <ul className="mat-list">
            <li className="mat-item">Vermeil or 18k sur argent massif</li>
            <li className="mat-item">Argent sterling 925</li>
            <li className="mat-item">Fini hypoallergénique</li>
            <li className="mat-item">Traitement anti-ternissement</li>
            <li className="mat-item">
              Gravure «&nbsp;ZAAYNAA&nbsp;» à l&rsquo;intérieur
            </li>
          </ul>
        </Reveal>
      </div>
      <Reveal className="mat-visual" delay={0.15}>
        <div className="mat-box-1">
          <img
            src="/hob-cristal-hero.png"
            alt="Bague HOB Cristal — détail des matières, ZAAYNAA"
            loading="lazy"
          />
        </div>
        <div className="mat-box-2">
          <div style={{textAlign: 'center'}}>
            <div className="mat-stat-num">18k</div>
            <div className="mat-stat-label">Vermeil Or</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Témoignages ────────────────────────────────────── */
function Testimonials() {
  const items = [
    {
      text: '« J’ai porté le collier Layali au mariage de ma sœur. Toutes les femmes m’ont demandé d’où il venait. ZAAYNAA a quelque chose de vraiment à part. »',
      author: '— Nadia M., Casablanca',
    },
    {
      text: '« La qualité est extraordinaire. On dirait une pièce d’atelier parisien. Je la porte tous les jours depuis trois mois. »',
      author: '— Yasmine R., Paris',
    },
    {
      text: '« ZAAYNAA comprend la femme arabe moderne. C’est élégant sans jamais en faire trop. On dirait que c’est fait pour nous. »',
      author: '— Leila A., Dubaï',
    },
  ];
  return (
    <section className="testimonials">
      <Reveal>
        <h2>Ce qu&rsquo;elles en disent</h2>
      </Reveal>
      <div className="t-grid">
        {items.map((t, i) => (
          <Reveal className="t-card" key={t.author} delay={i * 0.15}>
            <div className="t-stars">★★★★★</div>
            <p className="t-text">{t.text}</p>
            <p className="t-author">{t.author}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Newsletter ─────────────────────────────────────── */
function Newsletter() {
  return (
    <section className="newsletter">
      <Reveal>
        <div className="gold-line-v" />
        <h2>
          Entrez dans le monde
          <br />
          de <em>ZAAYNAA</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="nl-sub">
          Avant-premières, nouvelles pièces et histoires de la maison.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <form
          className="nl-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Inscription newsletter"
        >
          <input
            type="email"
            className="nl-input"
            placeholder="Votre adresse e-mail"
            required
          />
          <button type="submit" className="nl-btn">
            S&rsquo;inscrire
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ── Requêtes Storefront API ────────────────────────── */
const HOME_FEATURED_QUERY = `#graphql
  fragment HomeFeaturedProduct on Product {
    id
    title
    handle
    productType
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 2) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
  query HomeFeatured($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        ...HomeFeaturedProduct
      }
    }
  }
` as const;

const HOME_CATEGORIES_QUERY = `#graphql
  fragment HomeCategory on Collection {
    id
    handle
    title
    image {
      id
      url
      altText
      width
      height
    }
  }
  query HomeCategories($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    necklaces: collection(handle: "necklaces") {
      ...HomeCategory
    }
    rings: collection(handle: "rings") {
      ...HomeCategory
    }
    earrings: collection(handle: "earrings") {
      ...HomeCategory
    }
    bracelets: collection(handle: "bracelets") {
      ...HomeCategory
    }
  }
` as const;
