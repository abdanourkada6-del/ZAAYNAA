/**
 * ZAAYNAA — Tokens d'animation globaux.
 * Un seul rythme pour tout le site : mêmes durées, mêmes courbes.
 *
 * Règles (standards UI/UX, cf. skill ui-ux-pro-max §7) :
 * - micro-interactions 150–300 ms ; transitions complexes ≤ 500 ms
 * - transform/opacity uniquement (jamais width/height/top/left)
 * - ease-out à l'entrée, ease-in à la sortie ; sortie ≈ 60–70 % de l'entrée
 * - spring pour ce qui « suit le doigt » (drawer, press)
 * - stagger 30–50 ms par item de liste/grille
 */
export const EASE = [0.22, 1, 0.36, 1] as const; // ease-out doux (entrées)
export const EASE_IN = [0.4, 0, 1, 1] as const; // sorties

export const DUR = {
  fast: 0.18, // sorties, feedback press
  base: 0.28, // micro-interactions, transitions de page
  slow: 0.5, // reveals au scroll
} as const;

export const SPRING = {type: 'spring', stiffness: 320, damping: 30} as const;

/** Délai de cascade par item de grille (30–50 ms). */
export const STAGGER = 0.05;
