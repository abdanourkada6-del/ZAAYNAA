import {Link} from 'react-router';
import {BRAND} from '~/lib/brand';
import {Logo} from '~/components/Logo';

interface FooterProps {
  footer: unknown;
  header: unknown;
  publicStoreDomain: string;
}

export function Footer(_props: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Logo tone="cream" tagline className="footer-logo-svg" />
          <p className="footer-tagline">{BRAND.intro}</p>
        </div>

        <div>
          <p className="f-col-title">Collections</p>
          <ul className="f-links">
            <li>
              <Link to="/collections/necklaces">Colliers</Link>
            </li>
            <li>
              <Link to="/collections/rings">Bagues</Link>
            </li>
            <li>
              <Link to="/collections/earrings">Boucles d&rsquo;oreilles</Link>
            </li>
            <li>
              <Link to="/collections/bracelets">Bracelets</Link>
            </li>
            <li>
              <Link to="/collections/heritage">Héritage</Link>
            </li>
            <li>
              <Link to="/collections/nour">Nour</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="f-col-title">Maison</p>
          <ul className="f-links">
            <li>
              <Link to="/about">Notre histoire</Link>
            </li>
            <li>
              <Link to="/collections">Toutes les collections</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="f-col-title">Service</p>
          <ul className="f-links">
            <li>
              <Link to="/policies">Livraison &amp; retours</Link>
            </li>
            <li>
              <Link to="/policies">Mentions &amp; CGV</Link>
            </li>
            <li>
              <Link to="/account">Mon compte</Link>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} ZAAYNAA — {BRAND.positioning}. Tous droits réservés.
        </p>
        <div className="footer-social">
          <a href={BRAND.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
