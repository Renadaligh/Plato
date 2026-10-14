import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Cards fade up as they enter the viewport (skipped for reduced motion; content stays visible without it). */
export function useCardsReveal(root: RefObject<HTMLElement>, active: boolean, deps: unknown[]) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !active) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.news-card', el);
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.batch(cards, {
        start: 'top 92%', once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' }),
      });
    }, el);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...deps]);
}
