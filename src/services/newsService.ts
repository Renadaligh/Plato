import { SHEETS } from '../config/sheets';
import { NEWS_SEED, type NewsItem, type NewsTag } from '../data/news';
import { fetchRows, isPublished, safeUrl, type Row } from './sheet';

const BASE = import.meta.env.BASE_URL;
const TAGS: NewsTag[] = ['update', 'tournament', 'community', 'event'];

function fromRow(r: Row): NewsItem | null {
  if (!isPublished(r) || !/^\d{4}-\d{2}-\d{2}$/.test(r.date ?? '')) return null;
  const tAr = r.title_ar || r.title_en, tEn = r.title_en || r.title_ar;
  if (!tAr) return null;
  const img = r.image ? (/^(https?:\/\/|\/)/i.test(r.image) ? r.image : BASE + r.image) : undefined;
  return {
    id: r.id || `${r.date}-${tEn}`, date: r.date, tag: (TAGS as string[]).includes(r.tag) ? (r.tag as NewsTag) : 'update',
    title: { ar: tAr, en: tEn }, summary: { ar: r.summary_ar || r.summary_en || '', en: r.summary_en || r.summary_ar || '' },
    image: img, href: r.link ? safeUrl(r.link) : undefined,
  };
}

/**
 * Single place that knows where news comes from.
 * - No env var: uses the local seed in data/news.ts.
 * - VITE_NEWS_API_URL set (e.g. a Cloudflare Worker route returning NewsItem[] JSON): fetches it.
 */
const API_URL = import.meta.env.VITE_NEWS_API_URL as string | undefined;

const newestFirst = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export async function getLatestNews(limit: number, signal?: AbortSignal): Promise<NewsItem[]> {
  let items: NewsItem[] = NEWS_SEED;
  if (SHEETS.news) {
    const rows = await fetchRows(SHEETS.news, signal);
    items = rows.map(fromRow).filter((x): x is NewsItem => x !== null);
  } else if (API_URL) {
    const res = await fetch(`${API_URL}${API_URL.includes('?') ? '&' : '?'}limit=${limit}`, { signal });
    if (!res.ok) throw new Error(`News request failed (${res.status})`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error('News response is not a list');
    items = data as NewsItem[];
  }
  return [...items].sort(newestFirst).slice(0, limit);
}
