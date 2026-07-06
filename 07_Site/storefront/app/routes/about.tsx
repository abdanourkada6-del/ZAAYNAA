import type {Route} from './+types/about';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => {
  return [{title: 'À propos — ZAAYNAA'}];
};

export default function About() {
  return (
    <div className="zy-page">
      <span className="zy-eyebrow" style={{display: 'block', textAlign: 'center'}}>
        La maison
      </span>
      <h1>Le luxe qui chuchote</h1>
      <p className="zy-page-lede">
        Une maison de joaillerie parisienne, secrètement inspirée par le Maroc.
      </p>

      <p>
        ZAAYNAA est née d&rsquo;une conviction simple&nbsp;: l&rsquo;élégance la
        plus puissante est celle qui n&rsquo;a rien à prouver. Pas de bijou qui
        crie, pas de surcharge dorée. Une présence silencieuse, qui se révèle
        seulement à celle qui sait regarder de près.
      </p>

      <p>
        Nous puisons dans deux héritages. Le minimalisme parisien&nbsp;: des
        proportions fines, des lignes épurées, une retenue assumée. Et l&rsquo;âme
        marocaine&nbsp;: la calligraphie, le zellige, les croissants de lune, les
        étoiles à huit branches — toute une géométrie millénaire que nous
        dissimulons sous la pierre ou à l&rsquo;intérieur de l&rsquo;anneau.
      </p>

      <h2>« Discret mais WOW de près »</h2>
      <p>
        C&rsquo;est notre signature. De loin, une bague fine et raffinée. De
        près, un secret&nbsp;: une architecture cachée sous l&rsquo;émeraude, une
        gravure contre la peau, un motif qui n&rsquo;apparaît qu&rsquo;à certains
        angles. Le bijou devient un dialogue intime entre celle qui le porte et
        ce qu&rsquo;elle garde pour elle.
      </p>

      <h2>L&rsquo;artisanat</h2>
      <p>
        Chaque pièce est pensée en argent sterling 925, finie au vermeil or 18k.
        Les pierres de notre collection Nour sont des zircones de laboratoire,
        choisies pour leur éclat et leur conscience. À l&rsquo;intérieur de chaque
        anneau, la gravure «&nbsp;ZAAYNAA&nbsp;» — une promesse de qualité et un
        clin d&rsquo;œil que seule la porteuse connaît.
      </p>

      <div className="zy-values">
        <div className="zy-value">
          <h3>Discrétion</h3>
          <p>Le raffinement plutôt que l&rsquo;ostentation. Toujours.</p>
        </div>
        <div className="zy-value">
          <h3>Héritage</h3>
          <p>Le Maroc réinventé pour aujourd&rsquo;hui, jamais figé.</p>
        </div>
        <div className="zy-value">
          <h3>Intimité</h3>
          <p>Un secret porté contre la peau, rien que pour soi.</p>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '3.5rem'}}>
        <Link className="zy-btn--gold zy-btn" to="/collections">
          Découvrir les collections
        </Link>
      </div>
    </div>
  );
}
