import { useRef } from 'react';
import { SHOW_EXAMPLE_NEWS } from '../data/news';
import { useCardsReveal } from '../hooks/useCardsReveal';
import { useNews } from '../hooks/useNews';
import { useI18n } from '../i18n/I18nProvider';
import NewsCard from './NewsCard';

const LIMIT = 3;

/** First section under the hero: the 3 newest stories + a link to the full news page. */
export default function NewsSection() {
  const { t } = useI18n();
  const { items, status, retry } = useNews(LIMIT);
  const root = useRef<HTMLElement>(null);
  useCardsReveal(root, status === 'ready', [items]);

  return (
    <section id="news" ref={root} aria-labelledby="news-title" className="scroll-mt-20 px-[clamp(1.1rem,7vw,6.9rem)] py-[clamp(3rem,8vw,6rem)]" style={{ background: 'var(--bg)' }}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="max-w-[40rem]">
          <h2 id="news-title" className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-tight rtl:font-sans rtl:font-extrabold">{t.newsTitle}</h2>
          <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.newsSub}</p>
        </div>
        <a href="#/news" className="btn-glass !px-5 !py-2.5 text-[.9rem]">{t.newsAll} <span aria-hidden="true" className="ms-2 inline-block rtl:-scale-x-100">→</span></a>
      </div>

      {status === 'loading' && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: LIMIT }, (_, i) => <div key={i} className="news-skel" />)}
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="flex flex-wrap items-center gap-4 rounded-2xl border p-5" style={{ background: 'var(--glass)', borderColor: 'var(--glass-b)' }}>
          <p>{t.newsError}</p>
          <button type="button" className="btn-glass !px-5 !py-2.5" onClick={retry}>{t.newsRetry}</button>
        </div>
      )}

      {status === 'ready' && items.length === 0 && <p style={{ color: 'var(--muted)' }}>{t.newsEmpty}</p>}

      {status === 'ready' && items.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
      )}

      {SHOW_EXAMPLE_NEWS && status === 'ready' && <p className="mt-5 text-[.8rem]" style={{ color: 'var(--muted)', opacity: 0.75 }}>{t.newsExample}</p>}
    </section>
  );
}
