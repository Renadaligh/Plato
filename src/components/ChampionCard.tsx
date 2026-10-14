import { getGame } from '../data/games';
import type { Champion } from '../data/champions';
import { useI18n } from '../i18n/I18nProvider';
import EliteMark from './EliteMark';

const MAROON = '#8a1019';

/** Default artwork: a trophy (no real-life photo needed). */
function Trophy() {
  return (
    <svg viewBox="0 0 100 120" className="absolute bottom-[5%] end-[6%] w-[52%]" aria-hidden="true" focusable="false" style={{ filter: 'drop-shadow(-4px 10px 14px rgba(60,30,10,.35))' }}>
      <defs>
        <linearGradient id="tr-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2cf6b" /><stop offset=".55" stopColor="#c9962b" /><stop offset="1" stopColor="#8a5f14" /></linearGradient>
      </defs>
      <path d="M26 8h48v30c0 17-11 28-24 28S26 55 26 38Z" fill="url(#tr-gold)" />
      <path d="M26 16H10c0 22 7 33 20 36M74 16h16c0 22-7 33-20 36" fill="none" stroke="url(#tr-gold)" strokeWidth="6" strokeLinecap="round" />
      <path d="M44 66h12v16H44Z" fill="url(#tr-gold)" />
      <path d="M30 82h40l4 12H26Z" fill="url(#tr-gold)" />
      <rect x="22" y="94" width="56" height="12" rx="2" fill="#6e4a10" />
      <path d="M50 18l4.2 8.6 9.4 1.3-6.8 6.6 1.6 9.4L50 39.5l-8.4 4.4 1.6-9.4-6.8-6.6 9.4-1.3Z" fill="#fff6d8" opacity=".85" />
    </svg>
  );
}

/** Poster-style champion card: ELITE mark, label, year, giant vertical handle, tournament, game and prize. */
export default function ChampionCard({ c }: { c: Champion }) {
  const { t, lang } = useI18n();
  const g = getGame(c.gameId);
  const handle = c.name.toUpperCase();
  const textDir = lang === 'ar' ? 'rtl' : 'ltr';
  // the handle fills ~33% of the card height; longer handles shrink to fit
  const fs = Math.min(22, 105 / Math.max(handle.length, 4));
  const rule = { background: MAROON, height: 1, opacity: 0.9 } as const;

  return (
    <article dir="ltr" className="pcard group" style={{ color: MAROON }} aria-label={`${c.name} — ${c.tournament[lang]}`}>
      <div aria-hidden="true" className="absolute left-[5%] top-[3%] flex flex-col items-start gap-[1.6cqw]"><i className="block h-[2.4cqw] w-[2.4cqw]" style={{ background: MAROON }} /><i className="ms-[1cqw] block w-px" style={{ background: MAROON, height: '9cqh' }} /></div>

      {c.image
        ? <img src={c.image} alt="" loading="lazy" className="absolute bottom-0 end-0 h-[88%] w-[76%] object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]" />
        : <Trophy />}
      {c.avatar && (
        <img src={c.avatar} alt="" loading="lazy" className="absolute end-[6%] top-[8%] aspect-square w-[30%] rounded-full object-cover" style={{ border: `1.2cqw solid ${MAROON}`, boxShadow: '0 10px 24px rgba(60,20,10,.35)' }} />
      )}

      <EliteMark className="absolute left-[5%] top-[16.5%] w-[26%]" />
      <div className="absolute left-[5%] top-[21.2%] text-[4.4cqw] font-medium tracking-[.32em]" dir={textDir}>{t.chLabel.toUpperCase()}</div>
      <div className="absolute left-[5%] top-[25.4%] flex w-[56%] items-center gap-[2.4cqw]">
        <span className="text-[5cqw] font-bold leading-none tracking-wide">{c.date.slice(0, 4)}</span>
        <i className="block flex-1" style={rule} />
      </div>

      <div className="absolute left-[3.5%] top-[29%] h-[33.5%] overflow-hidden font-black leading-[.82] tracking-tight" style={{ writingMode: 'vertical-rl', fontFamily: 'Anton, Impact, "Arial Narrow", sans-serif', fontSize: `${fs}cqw` }}>{handle}</div>

      <i className="absolute left-[5%] top-[63.6%] block w-[3.4cqw]" style={rule} aria-hidden="true" />
      <p className="absolute left-[5%] top-[65%] w-[36%] text-[4.1cqw] font-medium leading-[1.35]" dir={textDir}>{c.tournament[lang]}</p>
      <i className="absolute left-[5%] top-[76.2%] block w-[7%]" style={rule} aria-hidden="true" />
      {g && <div className="absolute left-[5%] top-[77.6%] w-[36%] truncate text-[4cqw] font-medium tracking-[.2em]" dir="ltr">{g.name[lang].toUpperCase()}</div>}
      {c.prize && <div className="absolute left-[5%] top-[81.4%] w-[42%] truncate text-[4.8cqw] font-extrabold leading-tight" dir={textDir}>{c.prize[lang]}</div>}

      <div aria-hidden="true" className="absolute bottom-[3%] left-[5%] flex flex-col items-start gap-[1.6cqw]"><i className="ms-[1cqw] block w-px" style={{ background: MAROON, height: '8cqh' }} /><i className="block h-[2.4cqw] w-[2.4cqw]" style={{ background: MAROON }} /></div>
    </article>
  );
}
