import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { useHeroMotion } from '../hooks/useHeroMotion';
import { HERO } from '../config/artwork';
import { ArrowIcon, GamepadIcon, HeartIcon, TrophyIcon, UsersIcon } from './icons';

/** Scale/offset of the 1672×941 prop stage so it lines up with the background scene while showing a slightly wider, lower composition. */
function useStage(hero: RefObject<HTMLElement>, rtl: boolean) {
  const [box, setBox] = useState({ s: 1, x: 0, y: 0, phone: false });
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const calc = () => {
      const W = el.clientWidth, H = el.clientHeight;
      if (W < 768) {
        const s = 0.42, cx = rtl ? HERO.w - 1000 : 1000;
        // Keep the floating pieces high above the main copy on phones.
        setBox({ s, x: W / 2 - cx * s, y: -35, phone: true });
      } else {
        const s = Math.max(W / HERO.w, H / HERO.h) * 0.95;
        setBox({ s, x: rtl ? 18 : W - HERO.w * s - 18, y: H - HERO.h * s + 26, phone: false });
      }
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hero, rtl]);
  return box;
}

// Phone-only coordinates are relative to the artwork stage. Keep side props
// partly outside the viewport and away from the central headline.
const MOBILE_PROPS: Record<string, { x: number; y: number; w: number }> = {
  king: { x: 770, y: 290, w: 170 },
  dice: { x: 1270, y: 340, w: 320 },
  card: { x: 530, y: 940, w: 160 },
  chip: { x: 1390, y: 1110, w: 153 },
  pawn: { x: 848, y: 488, w: 125 },
};

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  useHeroMotion(heroRef);
  const { t, lang } = useI18n();
  const rtl = lang === 'ar';
  const box = useStage(heroRef, rtl);

  const stats = [
    { value: '45+', label: t.heroStatGames, Icon: GamepadIcon, tone: 'games' },
    { value: '100+', label: t.heroStatTournaments, Icon: TrophyIcon, tone: 'tournaments' },
    { value: '50K+', label: t.heroStatPlayers, Icon: UsersIcon, tone: 'players' },
    { value: t.heroStatCommunityValue, label: t.heroStatCommunity, Icon: HeartIcon, tone: 'community' },
  ] as const;

  return (
    <section id="top" ref={heroRef} className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0" role="img" aria-label={t.artAlt}>
        <div data-art-scroll className="absolute inset-0">
          <div data-anim="art" className="absolute inset-0">
            <div className="hero-bg absolute inset-0" style={{ transform: rtl ? 'scaleX(-1)' : undefined }}>
              <img className="hero-bg-dark hero-bg-img" src={HERO.bg.dark} alt="" decoding="async" />
              <img className="hero-bg-light hero-bg-img" src={HERO.bg.light} alt="" decoding="async" />
            </div>
            <div className="hero-stage" style={{ width: HERO.w, height: HERO.h, left: box.x, top: box.y, transform: `scale(${box.s})` }}>
              {HERO.sparks.map(([x, y, sz, d], i) => (
                <span key={i} className="hero-spark" style={{ left: rtl ? HERO.w - x : x, top: y, width: sz, height: sz, animationDelay: `-${d}s` }} />
              ))}
              {HERO.props.map((p) => {
                const mobile = box.phone ? MOBILE_PROPS[p.id] : undefined;
                const x = mobile?.x ?? p.x;
                return (
                  <div key={p.id} className={`hero-prop hero-prop--${p.id}`}
                    style={{ left: rtl ? HERO.w - x : x, top: mobile?.y ?? p.y, width: mobile?.w ?? p.w, '--k': p.k } as CSSProperties}>
                    <img src={p.src} alt="" decoding="async" style={{ rotate: `${rtl ? -p.r : p.r}deg`, animationDelay: `-${p.d}s` }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-topshade pointer-events-none absolute inset-0" />
      <div className="hero-side pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.1rem,6vw,6rem)] pb-[8vh] pt-[max(15svh,6.5rem)] max-md:items-center max-md:pt-[max(14svh,6.5rem)] max-md:text-center">
        <div className="hero-copy max-w-[46rem]">
          <div className="max-w-[36rem]">
            <p className="hero-eyebrow mb-3.5 text-[.8rem] font-medium uppercase tracking-[.3em] rtl:tracking-normal">{t.heroEyebrow}</p>
            <h1 className="hero-h1">
              <span className="hero-w">{t.heroL1}</span>
              <span className="hero-b">{t.heroL2}</span>
              <span className="hero-g">{t.heroL3}</span>
            </h1>
            <p className="hero-desc mt-5 max-w-[28rem] text-[clamp(.95rem,1.25vw,1.15rem)] leading-[1.75] max-md:mx-auto">{t.heroDesc}</p>
            <div className="hero-cta mt-7 flex w-full flex-col gap-3 max-md:items-center sm:w-auto sm:flex-row sm:flex-wrap max-md:sm:justify-center">
              <a href="#games" className="btn-primary group max-sm:w-full max-sm:max-w-[16.5rem]">
                {t.ctaGames}
                <ArrowIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </a>
              <a href="#tournaments" className="btn-glass hero-btn2 max-sm:w-full max-sm:max-w-[16.5rem]">{t.ctaTournaments}</a>
            </div>
          </div>

          <div className="hero-stats mt-8" aria-label="Hero statistics">
            {stats.map(({ value, label, Icon, tone }) => (
              <div key={`${value}-${label}`} className="hero-stat-card">
                <div className={`hero-stat-icon hero-stat-icon--${tone}`}>
                  <Icon className="h-[1.35rem] w-[1.35rem]" />
                </div>
                <div className="min-w-0">
                  {tone === 'community' && rtl ? (
                    <>
                      <div className="hero-stat-label">{label}</div>
                      <div className="hero-stat-value hero-stat-value--community">{value}</div>
                    </>
                  ) : (
                    <>
                      <div className={`hero-stat-value${tone === 'community' ? ' hero-stat-value--community' : ''}`}>{value}</div>
                      <div className="hero-stat-label">{label}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a href="#news" aria-label={t.scrollDown} className="scroll-cue absolute bottom-5 left-1/2 z-[11] -translate-x-1/2 sm:bottom-7">
        <span className="scroll-cue-dot" />
      </a>
      <div className="hero-veil pointer-events-none absolute inset-0 z-[8] opacity-0" style={{ background: 'var(--bg)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-[14%] bg-gradient-to-b from-transparent to-[var(--bg)]" />
    </section>
  );
}
