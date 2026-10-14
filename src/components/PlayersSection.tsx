import { useMemo, useRef, useState } from 'react';
import { GAMES, getGame } from '../data/games';
import { PLAYERS_SEED, SHOW_EXAMPLE_PLAYERS, byTitles, type Player } from '../data/players';
import { useCardsReveal } from '../hooks/useCardsReveal';
import { useI18n } from '../i18n/I18nProvider';

const BASE = import.meta.env.BASE_URL;
const PAGE = 8;
const LINKS = [['x', 'X'], ['twitch', 'Twitch'], ['youtube', 'YouTube']] as const;

function PlayerCard({ p }: { p: Player }) {
  const { t, lang } = useI18n();
  const games = p.gameIds.map(getGame).filter((g): g is NonNullable<typeof g> => !!g);
  const c = games[0]?.colors ?? ['#ff3b4e', '#6b0f1d'];
  const sub = [p.team, p.country?.[lang]].filter(Boolean).join(' · ');
  return (
    <article className="news-card news-card-hover group">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: `linear-gradient(160deg, ${c[0]}, ${c[1]})` }}>
        <div aria-hidden="true" className="absolute inset-0 opacity-[.16]" style={{ background: `url(${BASE}brand/ninja.png) 50% 40% / 60% no-repeat` }} />
        {p.image
          ? <img src={p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          : <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-[4.5rem] font-black text-white/90">{p.nickname[0]}</span>}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.6))' }} />
        <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[.78rem] font-bold text-white" style={{ background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(6px)' }}>
          <span aria-hidden="true">★</span> {p.titles} {t.plTitles}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.25rem] font-extrabold leading-tight">{p.nickname}</h3>
        {p.name && <p className="text-[.85rem]" style={{ color: 'var(--muted)' }}>{p.name[lang]}</p>}
        <p className="mt-2 text-[.92rem] font-semibold" style={{ color: 'var(--link-on)' }}>{p.role[lang]}</p>
        {sub && <p className="mt-0.5 text-[.85rem]" style={{ color: 'var(--muted)' }}>{sub}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {games.map((g) => <span key={g.id} className="rounded-full border px-2.5 py-0.5 text-[.75rem]" style={{ borderColor: 'var(--glass-b)', color: 'var(--muted)' }}>{g.name[lang]}</span>)}
        </div>
        {p.links && (
          <div className="mt-4 flex gap-2">
            {LINKS.map(([k, label]) => p.links?.[k] && (
              <a key={k} href={p.links[k]} target="_blank" rel="noopener noreferrer" aria-label={`${p.nickname} — ${label}`} className="rounded-full border px-3 py-1 text-[.78rem] font-semibold" style={{ borderColor: 'var(--glass-b)' }}>{label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** Pro players, filtered by game category. Strongest (most titles) first; "show more" past the first page. */
export default function PlayersSection() {
  const { t, lang } = useI18n();
  const [game, setGame] = useState<string>('all');
  const [shown, setShown] = useState(PAGE);
  const root = useRef<HTMLElement>(null);

  const cats = useMemo(() => GAMES.filter((g) => PLAYERS_SEED.some((p) => p.gameIds.includes(g.id))), []);
  const list = useMemo(() => PLAYERS_SEED.filter((p) => game === 'all' || p.gameIds.includes(game)).sort(byTitles), [game]);
  const visible = list.slice(0, shown);
  useCardsReveal(root, true, [game, shown]);
  const chip = (on: boolean) => ({ color: on ? '#fff' : 'var(--muted)', background: on ? 'linear-gradient(135deg, #ff3347, #d90f26)' : 'var(--glass)', borderColor: on ? 'transparent' : 'var(--glass-b)' });
  const pick = (id: string) => { setGame(id); setShown(PAGE); };

  return (
    <section id="players" ref={root} aria-labelledby="players-title" className="scroll-mt-20 px-[clamp(1.1rem,7vw,6.9rem)] py-[clamp(3rem,8vw,6rem)]" style={{ background: 'var(--bg)' }}>
      <div className="mb-7 max-w-[40rem]">
        <h2 id="players-title" className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-tight rtl:font-sans rtl:font-extrabold">{t.playersTitle}</h2>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.playersSub}</p>
      </div>

      {cats.length > 1 && (
        <div role="group" aria-label={t.playersTitle} className="mb-7 flex flex-wrap gap-2.5">
          {[{ id: 'all', label: t.plAll }, ...cats.map((g) => ({ id: g.id, label: g.name[lang] }))].map((c) => (
            <button key={c.id} type="button" aria-pressed={game === c.id} onClick={() => pick(c.id)} className="rounded-full border px-4 py-2 text-[.9rem] font-semibold transition-colors" style={chip(game === c.id)}>{c.label}</button>
          ))}
        </div>
      )}

      {list.length === 0 && <p style={{ color: 'var(--muted)' }}>{t.plEmpty}</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => <PlayerCard key={p.id} p={p} />)}
      </div>
      {list.length > shown && (
        <div className="mt-8 flex justify-center"><button type="button" className="btn-glass" onClick={() => setShown((n) => n + PAGE)}>{t.plMore}</button></div>
      )}

      {SHOW_EXAMPLE_PLAYERS && <p className="mt-5 text-[.8rem]" style={{ color: 'var(--muted)', opacity: 0.75 }}>{t.playersExample}</p>}
    </section>
  );
}
