import {motion} from 'framer-motion';
import type {ReactNode} from 'react';
import {DUR, EASE} from '~/lib/motion';

/**
 * Reveal — animation douce d'apparition (fade + slide léger) au scroll.
 * Volontairement subtile : le luxe ne clignote pas.
 * prefers-reduced-motion : géré globalement par <MotionConfig
 * reducedMotion="user"> (PageLayout) — le déplacement est neutralisé,
 * le fondu conservé. Ne pas brancher sur useReducedMotion ici : cela
 * créerait un mismatch d'hydratation SSR/client.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: DUR.slow, ease: EASE, delay}}
    >
      {children}
    </MotionTag>
  );
}
