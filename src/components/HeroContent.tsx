import { useI18n } from '../i18n/I18nProvider';
import { ArrowIcon, SparkIcon } from './icons';

export default function HeroContent() {
  const { t } = useI18n();
  return (
    <div className="hero-copy">
      <p className="hero-eyebrow mb-3.5 text-[clamp(.7rem,.9vw,.9rem)] tracking-[.38em] rtl:tracking-normal" style={{ color: 'var(--muted)' }}>{t.eyebrow}</p>
      <h1 className="hero-title font-display text-[clamp(3rem,min(6.2vw,11.5vh),6.4rem)] font-black leading-[1.08] tracking-[-.01em]">        <span className="hero-line block">{t.title1}</span>
        <span className="hero-line g-pink block">{t.title2}</span>
        <span className="hero-line g-cyan block">{t.title3}</span>
      </h1>
      <p className="hero-desc mb-7 mt-5 max-w-[30em] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.7]" style={{ color: 'var(--muted)' }}>{t.desc}</p>
      <div className="hero-cta flex flex-wrap gap-3.5">
        <a href="#games" className="btn-primary group">
          {t.ctaGames}
          <ArrowIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </a>
        <a href="#tournaments" className="btn-glass">{t.ctaTournaments}</a>
      </div>
      <div className="hero-divider mt-[clamp(1.6rem,6vh,3.5rem)] flex max-w-[420px] items-center gap-3" style={{ color: 'var(--muted)' }} aria-hidden="true">
        <i className="h-px flex-1 bg-gradient-to-r from-transparent to-current rtl:-scale-x-100" />
        <SparkIcon className="h-[18px] w-[18px]" />
        <i className="h-px flex-1 bg-gradient-to-l from-transparent to-current rtl:-scale-x-100" />
      </div>
    </div>
  );
}
