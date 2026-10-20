import { useI18n } from '../i18n/I18nProvider';
import { ArrowIcon } from './icons';

/**
 * Centered block that sits right under the "ELITE" wordmark baked into the hero video.
 * Ink is dark because the video's centre is white fog. Copy lives in i18n (aboutText).
 */
export default function HeroContent() {
  const { t } = useI18n();
  return (
    <div className="hero-copy hero-ink mx-auto flex max-w-[40rem] flex-col items-center text-center">
      <h1 className="sr-only">Plato Elite</h1>
      <p className="hero-desc mb-[clamp(1.6rem,4.5svh,2.9rem)] text-[clamp(.98rem,1.3vw,1.2rem)] leading-[1.75]">{t.aboutText}</p>
      <div className="hero-cta flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5">
        <a href="#games" className="btn-primary group max-sm:w-full max-sm:max-w-[16.5rem] max-sm:justify-center">
          {t.ctaGames}
          <ArrowIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </a>
        <a href="#tournaments" className="btn-glass max-sm:w-full max-sm:max-w-[16.5rem] max-sm:justify-center">{t.ctaTournaments}</a>
      </div>
    </div>
  );
}
