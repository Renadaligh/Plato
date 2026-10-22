import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO } from '../config/artwork';

gsap.registerPlugin(ScrollTrigger);

/** Cinematic entrance + reversible scroll transition into the next section (no scroll hijacking). */
export function useHeroMotion(hero: RefObject<HTMLElement>) {
  const played = useRef(false);

  useLayoutEffect(() => {
    const root = hero.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!played.current) {
        played.current = true;
        const header = document.querySelector('[data-anim="header"]');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
        tl.from('[data-anim="art"]', { opacity: 0, scale: 1.08, duration: 1.4, ease: 'power2.out' }, 0);
        if (header) tl.from(header, { opacity: 0, y: -16, duration: 0.7 }, 0.1);
        tl.from('.hero-eyebrow, .hero-h1 > span', { opacity: 0, y: 22, duration: 0.6, stagger: 0.1 }, 0.5)
          .from('.hero-desc', { opacity: 0, y: 18, duration: 0.55 }, 0.95)
          .from('.hero-cta > *', { opacity: 0, y: 16, duration: 0.5, stagger: 0.09 }, 1.1);
      }

      const st: ScrollTrigger.Vars = { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('[data-art-scroll]', { scale: 1 + HERO.zoom, y: 70, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-copy', { y: -80, opacity: 0.1, ease: 'none', scrollTrigger: st });
      // pointer parallax (fine pointers only): --px/--py ease towards the cursor, CSS turns them into per-layer offsets
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const qx = gsap.quickTo(root, '--px', { duration: 1.4, ease: 'power3.out' });
        const qy = gsap.quickTo(root, '--py', { duration: 1.4, ease: 'power3.out' });
        const move = (e: PointerEvent) => { qx((e.clientX / innerWidth - 0.5) * 2); qy((e.clientY / innerHeight - 0.5) * 2); };
        window.addEventListener('pointermove', move, { passive: true });
        gsap.set(root, { '--px': 0, '--py': 0 });
        cleanups.push(() => window.removeEventListener('pointermove', move));
      }
      gsap.to('.hero-veil', { opacity: 0.92, ease: 'none', scrollTrigger: st });
    }, root);

    return () => { cleanups.forEach((c) => c()); mm.revert(); };
  }, [hero]);
}
