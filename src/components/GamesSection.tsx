import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { GAMES, SHOW_EXAMPLE_GAMES, type Game } from '../data/games';
import { useI18n } from '../i18n/I18nProvider';
import { ArrowIcon } from './icons';

const BASE = import.meta.env.BASE_URL;
type Vars = CSSProperties & { [k: `--${string}`]: string };

function useWide() {
  const q = '(min-width: 768px)';
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return wide;
}

/** Fan-style carousel: active game in the centre, neighbours tilt and shrink. Swipe / drag / arrows / click a side card.
 *  Clicking the centre card fades the section out and opens the game page (#/games/<id>). */
export default function GamesSection() {
  const { t, lang, dir } = useI18n();
  const wide = useWide();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const sign = dir === 'rtl' ? -1 : 1;
  const span = wide ? 2 : 1;
  const n = GAMES.length;
  const timer = useRef<number>();
  const drag = useRef({ x: 0, down: false, moved: false });
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = (g: Game) => {
    if (leaving) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const open = () => { window.location.hash = `#/games/${g.id}`; };
    if (reduce) { open(); return; }
    setLeaving(true);
    timer.current = window.setTimeout(open, 320);
  };
  const step = (d: number) => setIndex((i) => Math.min(n - 1, Math.max(0, i + d)));

  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, down: true, moved: false }; };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (d.down && Math.abs(e.clientX - d.x) > 8) d.moved = true;
  };
  const onUp = (e: PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) step(dx * sign < 0 ? 1 : -1);
    window.setTimeout(() => { d.moved = false; }, 0);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(sign);
    else if (e.key === 'ArrowLeft') step(-sign);
    else return;
    e.preventDefault();
  };

  const cw = wide ? 'clamp(210px, 19vw, 290px)' : 'min(60vw, 250px)';
  const stage: Vars = { '--cw': cw, '--wm': `url(${BASE}brand/ninja.png)`, height: 'calc(var(--cw) * 1.4 + 2.5rem)' };
  const active = GAMES[index];

  return (
    <section id="games" aria-labelledby="games-title" className="scroll-mt-20 overflow-x-clip px-[clamp(1.1rem,7vw,6.9rem)] py-[clamp(3rem,8vw,6rem)]" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-[40rem] text-center">
        <h2 id="games-title" className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-tight rtl:font-sans rtl:font-extrabold">{t.gamesTitle}</h2>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.gamesSub}</p>
      </div>

      <div className={`gstage mt-10 ${leaving ? 'is-leaving' : ''}`}>
        <div role="region" aria-roledescription="carousel" aria-label={t.gamesTitle} tabIndex={0} onKeyDown={onKey}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          className="relative mx-auto w-full max-w-[72rem] touch-pan-y rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--link-on)]" style={stage}>
          {GAMES.map((g, i) => {
            const o = i - index;
            const a = Math.abs(o);
            const shown = a <= span;
            const c = Math.min(a, span + 1) * Math.sign(o);
            const x = sign * c * 0.6, y = Math.pow(Math.abs(c), 1.6) * 0.075, rot = sign * c * 7, sc = 1 - Math.abs(c) * 0.09;
            const style: Vars = {
              transform: `translateX(calc(-50% + var(--cw) * ${x})) translateY(calc(var(--cw) * ${y})) rotate(${rot}deg) scale(${sc})`,
              zIndex: 10 - a, opacity: shown ? 1 : 0, pointerEvents: shown ? 'auto' : 'none',
              filter: o === 0 ? 'none' : 'brightness(.62) saturate(.85)',
              background: `linear-gradient(160deg, ${g.colors[0]}, ${g.colors[1]})`,
            };
            return (
              <a key={g.id} href={`#/games/${g.id}`} draggable={false} aria-hidden={!shown || undefined} tabIndex={o === 0 ? 0 : -1}
                aria-label={`${g.name[lang]} — ${o === 0 ? t.gamesDetails : g.genre[lang]}`} className="gcard" style={style}
                onClick={(e: MouseEvent) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  if (drag.current.moved) return;
                  if (o === 0) go(g); else setIndex(i);
                }}>
                {g.image ? <img src={g.image} alt="" draggable={false} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /> : <div className="gcard-art" />}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="text-[.78rem] font-semibold opacity-85">{g.genre[lang]}</span>
                  <div className="text-[clamp(1.15rem,1.8vw,1.55rem)] font-extrabold leading-tight">{g.name[lang]}</div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mx-auto mt-6 max-w-[34rem] text-center" aria-live="polite">
          <h3 className="text-[1.5rem] font-bold">{active.name[lang]}</h3>
          <p className="mt-1.5" style={{ color: 'var(--muted)' }}>{active.tagline[lang]}</p>
          <button type="button" className="btn-primary mt-5" onClick={() => go(active)}>
            {t.gamesDetails} <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button type="button" className="pill !px-0 disabled:opacity-35" onClick={() => step(-1)} disabled={index === 0} aria-label={t.gamesPrev}><ArrowIcon className="h-5 w-5 rotate-180 rtl:rotate-0" /></button>
          <div className="flex gap-2">
            {GAMES.map((g, i) => (
              <button key={g.id} type="button" aria-label={g.name[lang]} aria-current={i === index} onClick={() => setIndex(i)} className="h-2 rounded-full transition-all" style={{ width: i === index ? '1.6rem' : '.5rem', background: i === index ? 'var(--link-on)' : 'var(--glass-b)' }} />
            ))}
          </div>
          <button type="button" className="pill !px-0 disabled:opacity-35" onClick={() => step(1)} disabled={index === n - 1} aria-label={t.gamesNext}><ArrowIcon className="h-5 w-5 rtl:rotate-180" /></button>
        </div>
      </div>

      {SHOW_EXAMPLE_GAMES && <p className="mt-6 text-center text-[.8rem]" style={{ color: 'var(--muted)', opacity: 0.75 }}>{t.gamesExample}</p>}
    </section>
  );
}
