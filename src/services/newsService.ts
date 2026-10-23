import { NEWS_SEED, type NewsItem } from '../data/news';
import { api } from './api';

const newestFirst = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

/** News comes from the Cloudflare D1 database through /api/news. In `npm run dev` (no API) it falls back to the sample seed. */
export async function getLatestNews(limit: number): Promise<NewsItem[]> {
  let items: NewsItem[];
  try {
    items = await api<NewsItem[]>('/news');
  } catch (e) {
    if (!import.meta.env.DEV) throw e;
    items = NEWS_SEED;
  }
  return [...items].sort(newestFirst).slice(0, limit);
}
