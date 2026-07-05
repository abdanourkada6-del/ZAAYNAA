/**
 * Logo ZAAYNAA — version vectorielle propre (lotus + wordmark lisible).
 * Reproduit le concept du logo fourni (lotus « Elegance by Nature ») mais
 * avec une typographie nette et lisible à toute taille, fond transparent.
 *
 * tone="ink"  → sur fond clair (header, fond crème)
 * tone="cream"→ sur fond sombre (footer velours)
 */
export function Logo({
  tone = 'ink',
  tagline = false,
  className,
}: {
  tone?: 'ink' | 'cream';
  tagline?: boolean;
  className?: string;
}) {
  const word = tone === 'cream' ? '#faf8f4' : '#1a1814';
  const gold = '#c9a96e';
  const petals = [-44, -22, 0, 22, 44];

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
