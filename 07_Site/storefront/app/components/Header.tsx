import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, Link, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import {AnimatePresence, motion} from 'framer-motion';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/Logo';
import {DUR, EASE} from '~/lib/motion';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

/* Contenu du méga-menu « Collections » (style Mejuri). */
export const MEGA_MENU = {
  categories: {
    title: 'Catégories',
    links: [
      {title: 'Colliers', url: '/collections/necklaces'},
      {title: 'Bagues', url: '/collections/rings'},
      {title: 'Boucles d’oreilles', url: '/collections/earrings'},
      {title: 'Bracelets', url: '/collections/bracelets'},
      {title: 'Toutes les pièces', url: '/collections/all'},
    ],
  },
  univers: {
    title: 'Nos univers',
    links: [
      {title: 'Héritage', url: '/collections/heritage'},
      {title: 'Nour', url: '/collections/nour'},
      {title: 'Best-sellers', url: '/collections/best-sellers'},
    ],
  },
  maison: {
    title: 'La maison',
    links: [
      {title: 'Notre histoire', url: '/about'},
      {title: 'Nos engagements', url: '/about'},
      {title: 'Contact', url: '/contact'},
    ],
  },
};

export function Header({
  header,
  isLoggedIn: _isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {menu} = header;
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le méga-menu à chaque changement de page
  useEffect(() => {
    setMegaOpen(false);
  }, [location.pathname]);

  // Fermeture fiable : dès que le curseur survole autre chose que
  // « Collections » ou le panneau lui-même, on ferme. + Échap.
  useEffect(() => {
    if (!megaOpen) return;
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      // Le méga est un enfant DOM du <header> : tant que le curseur reste
      // dans le header (barre de nav OU panneau), on garde ouvert. On ne
      // ferme que lorsque le curseur passe sur le contenu de la page.
      if (t && !t.closest('.header')) {
        setMegaOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('keydown', onKey);
    };
  }, [megaOpen]);

  const openMega = () => setMegaOpen(true);

  const classes = [
    'header',
    scrolled ? 'scrolled' : '',
    // fond givré crème dès qu'on n'est pas sur le hero OU que le méga-menu est ouvert
    !isHome || megaOpen ? 'solid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <NavLink prefetch="intent" to="/" end aria-label="ZAAYNAA — Accueil">
        <Logo variant="symbol" className="header-logo-symbol" />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        megaOpen={megaOpen}
        onOpenMega={openMega}
        onCloseMega={() => setMegaOpen(false)}
      />
      <HeaderCtas cart={cart} />

      <MegaMenu open={megaOpen} />
    </header>
  );
}

// Navigation principale ZAAYNAA (FR). Remplace le menu Shopify pour
// garantir la structure de marque quelle que soit la boutique liée.
// « Collections » déclenche le méga-menu ; les autres sont des liens directs.
const ZAAYNAA_NAV = [
  {title: 'Collections', url: '/collections', mega: true},
  {title: 'Héritage', url: '/collections/heritage'},
  {title: 'Nour', url: '/collections/nour'},
  {title: 'Notre histoire', url: '/about'},
  {title: 'Contact', url: '/contact'},
];

export function HeaderMenu({
  menu: _menu,
  primaryDomainUrl: _primaryDomainUrl,
  viewport,
  publicStoreDomain: _publicStoreDomain,
  megaOpen = false,
  onOpenMega,
  onCloseMega,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  megaOpen?: boolean;
  onOpenMega?: () => void;
  onCloseMega?: () => void;
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  // ── Menu mobile (drawer) : nav complète + sous-catégories ──
  if (viewport === 'mobile') {
    return (
      <nav className={className} role="navigation">
        <NavLink end onClick={close} prefetch="intent" to="/">
          Accueil
        </NavLink>
        <p className="mobile-menu-heading">Catégories</p>
        {MEGA_MENU.categories.links.map((item) => (
          <NavLink
            className="header-menu-item"
            end
            key={item.url}
            onClick={close}
            prefetch="intent"
            to={item.url}
          >
            {item.title}
          </NavLink>
        ))}
        <p className="mobile-menu-heading">Nos univers</p>
        {MEGA_MENU.univers.links.map((item) => (
          <NavLink
            className="header-menu-item"
            end
            key={item.url}
            onClick={close}
            prefetch="intent"
            to={item.url}
          >
            {item.title}
          </NavLink>
        ))}
        <p className="mobile-menu-heading">La maison</p>
        {MEGA_MENU.maison.links.map((item) => (
          <NavLink
            className="header-menu-item"
            end
            key={item.title}
            onClick={close}
            prefetch="intent"
            to={item.url}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    );
  }

  // ── Menu desktop : « Collections » ouvre le méga-menu au survol ──
  return (
    <nav className={className} role="navigation">
      {ZAAYNAA_NAV.map((item) =>
        item.mega ? (
          <NavLink
            className={`header-menu-item${megaOpen ? ' is-open' : ''}`}
            end
            key={item.url}
            prefetch="intent"
            to={item.url}
            data-mega-trigger=""
            aria-haspopup="true"
            aria-expanded={megaOpen}
            onMouseEnter={onOpenMega}
            onFocus={onOpenMega}
          >
            {item.title}
          </NavLink>
        ) : (
          <NavLink
            className="header-menu-item"
            end
            key={item.url}
            prefetch="intent"
            to={item.url}
            onMouseEnter={onCloseMega}
          >
            {item.title}
          </NavLink>
        ),
      )}
    </nav>
  );
}

/* ── Méga-menu déroulant (desktop) ── */
function MegaMenu({open}: {open: boolean}) {
  const cols = [MEGA_MENU.categories, MEGA_MENU.univers, MEGA_MENU.maison];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mega-menu"
          role="region"
          aria-label="Collections"
          initial={{opacity: 0, y: -8}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8, transition: {duration: DUR.fast, ease: EASE}}}
          transition={{duration: DUR.base, ease: EASE}}
        >
          <div className="mega-inner">
            {cols.map((col) => (
              <div className="mega-col" key={col.title}>
                <p className="mega-col-title">{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.title + l.url}>
                      <Link className="mega-link" to={l.url} prefetch="intent">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Vignette éditoriale */}
            <Link to="/collections/nour" className="mega-feature" prefetch="intent">
              <img
                src="/hob-emeraude-hero.png"
                alt="Collection Nour — bague émeraude ZAAYNAA"
                loading="lazy"
              />
              <span className="mega-feature-label">
                <span className="mega-feature-eyebrow">À la une</span>
                Collection Nour
                <span className="mega-feature-cta">Découvrir →</span>
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeaderCtas({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Ouvrir le menu"
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Recherche
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Panier <span aria-label={`(articles : ${count})`}>({count})</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
