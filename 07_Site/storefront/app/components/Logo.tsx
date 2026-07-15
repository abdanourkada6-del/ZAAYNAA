import {useEffect, useState} from 'react';

/**
 * Logo ZAAYNAA — PNG transparents (dossier /public), déclinés en 3 variantes
 * × 2 teintes :
 *   variant : 'full' (symbole + wordmark) · 'symbol' (najma seule) · 'wordmark'
 *   tone    : 'ink' (noir, sur fond clair) · 'cream' (clair, sur fond sombre)
 *   → /logo-{variant}-{tone}.png
 *
 * Tant que les fichiers ne sont pas dans /public, repli sur le logo vectoriel
 * de secours (aucun logo cassé, pas de mismatch d'hydratation).
 */
export function Logo({
  variant = 'full',
  tone = 'ink',
  tagline = false,
  className,
}: {
  variant?: 'full' | 'symbol' | 'wordmark';
  tone?: 'ink' | 'cream';
  tagline?: boolean;
  className?: string;
}) {
  const src = `/logo-${variant}-${tone}.png`;
  // 'pending' au SSR + 1er rendu client (→ SVG, pas de mismatch d'hydratation),
  // puis on teste réellement si le PNG charge avant de basculer dessus.
  const [status, setStatus] = useState<'pending' | 'ok' | 'missing'>('pending');

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setStatus('ok');
    probe.onerror = () => setStatus('missing');
    probe.src = src;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  if (status === 'ok') {
    return (
      <img
        src={src}
        alt={variant === 'symbol' ? 'ZAAYNAA' : 'ZAAYNAA — Modern Moroccan Quiet Luxury'}
        className={className}
        decoding="async"
      />
    );
  }

  // 'pending' ou 'missing' → logo vectoriel de secours (aucune image cassée)
  return (
    <LogoFallback
      variant={variant}
      tone={tone}
      tagline={tagline}
      className={className}
    />
  );
}

/**
 * Logo vectoriel de secours (lotus/najma + wordmark). Utilisé uniquement
 * si le PNG n'est pas encore présent dans /public.
 */
function LogoFallback({
  variant = 'full',
  tone = 'ink',
  tagline = false,
  className,
}: {
  variant?: 'full' | 'symbol' | 'wordmark';
  tone?: 'ink' | 'cream';
  tagline?: boolean;
  className?: string;
}) {
  const word = tone === 'cream' ? '#faf8f4' : '#1a1814';
  const gold = '#c9a96e';
  const petals = [-44, -22, 0, 22, 44];

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 140 140"
        className={className}
        role="img"
        aria-label="ZAAYNAA"
      >
        <g transform="translate(70 70)">
          <path
            d="M0 -44 L10 -10 L44 0 L10 10 L0 44 L-10 10 L-44 0 L-10 -10 Z"
            fill="none"
            stroke={gold}
            strokeWidth="2"
            opacity="0.65"
          />
          <g fill="none" stroke={gold} strokeWidth="4" strokeLinejoin="round">
            {petals.map((a) => (
              <path
                key={a}
                transform={`rotate(${a})`}
                d="M0 8 C -10 -4 -8 -24 0 -34 C 8 -24 10 -4 0 8 Z"
              />
            ))}
          </g>
          <circle cy="9" r="4" fill={gold} />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 380 140"
      className={className}
      role="img"
      aria-label="ZAAYNAA — Modern Moroccan Quiet Luxury"
    >
      {/* Mark : lotus à 5 pétales sur étoile à 8 branches (najma) */}
      <g transform="translate(190 34)">
        <path
          d="M0 -30 L7 -7 L30 0 L7 7 L0 30 L-7 7 L-30 0 L-7 -7 Z"
          fill="none"
          stroke={gold}
          strokeWidth="1"
          opacity="0.5"
        />
        <g fill="none" stroke={gold} strokeWidth="2.4" strokeLinejoin="round">
          {petals.map((a) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d="M0 5 C -7 -3 -5 -16 0 -23 C 5 -16 7 -3 0 5 Z"
            />
          ))}
        </g>
        <circle cy="6" r="2.4" fill={gold} />
      </g>

      {/* Wordmark */}
      <text
        x="190"
        y="92"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="48"
        fontWeight="600"
        letterSpacing="11"
        fill={word}
      >
        ZAAYNAA
      </text>

      {tagline && (
        <text
          x="195"
          y="116"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontSize="9"
          letterSpacing="5"
          fill={gold}
          opacity="0.85"
        >
          MODERN MOROCCAN QUIET LUXURY
        </text>
      )}
    </svg>
  );
}
