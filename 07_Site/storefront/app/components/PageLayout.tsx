import {Await, Link, useLocation} from 'react-router';
import {Suspense, useId} from 'react';
import {motion, MotionConfig} from 'framer-motion';
import {DUR, EASE} from '~/lib/motion';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    // reducedMotion="user" : framer neutralise les déplacements pour les
    // utilisateurs qui préfèrent les animations réduites (fondus conservés).
    <MotionConfig reducedMotion="user">
      <Aside.Provider>
        <CartAside cart={cart} />
        <SearchAside />
        <MobileMenuAside
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}
        <main className={isHome ? undefined : 'main-padded'}>
          {/* Transition de page douce (fade) */}
          <motion.div
            key={location.pathname}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: DUR.base, ease: EASE}}
          >
            {children}
          </motion.div>
        </main>
        <Footer
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside.Provider>
    </MotionConfig>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading="PANIER">
      <Suspense fallback={<p>Chargement du panier…</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="RECHERCHE">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Rechercher"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Rechercher</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div>Chargement…</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      Voir tous les résultats pour <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  // Toujours rendre le menu mobile : la nav est codée en dur (ZAAYNAA_NAV),
  // donc elle ne doit pas dépendre de l'existence d'un menu Shopify.
  return (
    <Aside type="mobile" heading="MENU">
      <HeaderMenu
        menu={header?.menu ?? null}
        viewport="mobile"
        primaryDomainUrl={header?.shop?.primaryDomain?.url ?? ''}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside>
  );
}
