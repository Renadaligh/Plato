import type { CSSProperties } from 'react';
import type { NewsItem, NewsTag } from '../data/news';
import { useI18n } from '../i18n/I18nProvider';
import type { Dict } from '../i18n/translations';

const BASE = import.meta.env.BASE_URL;
export const TAG_KEY: Record<NewsTag, keyof Dict> = { update: 'tagUpdate', tournament: 'tagTournament', community: 'tagCommunity', event: 'tagEvent' };
const TAG_DOT: Record<NewsTag, string> = { update: '#ff3b4e', tournament: '#ffb02e', community: '#5aa2ff', event: '#7be07a' };

type Vars = CSSProperties & { [k: `--${string}`]: string };

export default function NewsCard({ item }: { item: NewsItem }) {
  const { lang, t } = useI18n();
  const date = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(item.date));
  const title = item.title[lang];
  const wm: Vars = { '--wm': `url(${BASE}brand/ninja.png)` };

  return (
    <article className="news-card news-card-hover group">
      <div className="news-art" style={item.image ? undefined : wm}>
        {item.image && <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
      </div>
      <div className="flex flex-col gap-2.5 p-5">
        <div className="flex items-center gap-3 text-[.82rem]" style={{ color: 'var(--muted)' }}>
          <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text)' }}>
            <i aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: TAG_DOT[item.tag] }} />
            {t[TAG_KEY[item.tag]]}
          </span>
          <time dateTime={item.date}>{date}</time>
        </div>
        <h3 className="text-[1.15rem] font-semibold leading-snug">
          {item.href ? <a href={item.href} className="news-link after:absolute after:inset-0">{title}</a> : title}
        </h3>
        <p className="text-[.95rem] leading-relaxed" style={{ color: 'var(--muted)' }}>{item.summary[lang]}</p>
        {item.href && <span aria-hidden="true" className="mt-1 text-[.9rem] font-semibold" style={{ color: 'var(--link-on)' }}>{t.newsRead} <span className="inline-block rtl:-scale-x-100">→</span></span>}
      </div>
    </article>
  );
}
