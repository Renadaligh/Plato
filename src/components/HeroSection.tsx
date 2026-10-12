import { useEffect, useRef } from 'react';
import { useHeroMotion } from '../hooks/useHeroMotion';
import { usePointerParallax } from '../hooks/usePointerParallax';
import ArtLayers from './ArtLayers';
import HeroContent from './HeroContent';
import ParticleField from './ParticleField';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  usePointerParallax(heroRef);
  useHeroMotion(heroRef);

  // Pause continuous animation while the hero is off-screen.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-paused', !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      <ArtLayers />
      <div className="hero-tint pointer-events-none absolute inset-0" />
      <div className="hero-mist pointer-events-none absolute inset-x-0 bottom-0 h-[22%]" />
      <div className="hero-scrim pointer-events-none absolute inset-0" />
      <ParticleField />
      <div className="relative z-10 flex flex-1 flex-col justify-center px-[clamp(1.1rem,7vw,6.9rem)] pb-[8vh] pt-28 max-md:justify-end max-md:pb-[10vh] md:w-[52%] md:max-w-[720px] [@media(max-height:560px)]:pt-24">
        <HeroContent />
      </div>
      <div className="hero-veil pointer-events-none absolute inset-0 z-[8] opacity-0" style={{ background: 'var(--bg)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-[14%] bg-gradient-to-b from-transparent to-[var(--bg)]" />
    </section>
  );
}
