import { useRef } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { useHeroMotion } from '../hooks/useHeroMotion';
import ArtLayers from './ArtLayers';
import HeroContent from './HeroContent';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  useHeroMotion(heroRef);
  const { t } = useI18n();

  return (
    <section id="top" ref={heroRef} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      <ArtLayers />
      {/* soft top shade keeps the glass header readable over the bright footage */}
      <div className="hero-topshade pointer-events-none absolute inset-0" />
      {/* "ELITE" sits at ~31–39% of the footage height, so the copy starts just below it */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-[clamp(1.1rem,5vw,5rem)] pb-[12vh] pt-[max(43svh,9rem)] max-md:pt-[max(35svh,8rem)] [@media(max-height:560px)]:pt-[48svh]">
        <HeroContent />
      </div>
      <a href="#news" aria-label={t.scrollDown} className="scroll-cue absolute bottom-5 left-1/2 z-[11] -translate-x-1/2 sm:bottom-7">
        <span className="scroll-cue-dot" />
      </a>
      <div className="hero-veil pointer-events-none absolute inset-0 z-[8] opacity-0" style={{ background: 'var(--bg)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-[14%] bg-gradient-to-b from-transparent to-[var(--bg)]" />
    </section>
  );
}
