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
      <p className="hero-desc mb-6 text-[clamp(.98rem,1.3vw,1.2rem)] leading-[1.75]">{t.aboutText}</p>
      <div className="hero-cta flex flex-wrap justify-center gap-3 sm:gap-3.5">
        <a href="#games" className="btn-primary group max-[480px]:!px-4 max-[480px]:!py-3 max-[480px]:!text-[.85rem]">
          {t.ctaGames}
          <ArrowIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </a>
        <a href="#tournaments" className="btn-glass max-[480px]:!px-4 max-[480px]:!py-3 max-[480px]:!text-[.85rem]">{t.ctaTournaments}</a>
      </div>
    </div>
  );
}
