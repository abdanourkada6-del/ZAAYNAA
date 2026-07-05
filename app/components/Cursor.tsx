import {useEffect, useRef} from 'react';

/**
 * Curseur or personnalisé (point + anneau retardé) — desktop uniquement.
 * Désactivé automatiquement sur écrans tactiles via CSS (@media pointer: fine).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    // Délégation : grossit sur tout élément interactif (SPA-safe)
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest?.(
        'a, button, input, select, textarea, summary, label, [role="button"]',
      );
      if (interactive) {
        ring.style.width = '52px';
        ring.style.height = '52px';
        dot.style.transform = 'translate(-50%, -50%) scale(2)';
      } else {
        ring.style.width = '32px';
        ring.style.height = '32px';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    document.addEventListener('mousemove', onMove, {passive: true});
    document.addEventListener('mouseover', onOver, {passive: true});
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="zv-cursor" aria-hidden="true" />
      <div ref={ringRef} className="zv-cursor-ring" aria-hidden="true" />
    </>
  );
}
