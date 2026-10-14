import { NEWS_SEED, type NewsItem } from '../data/news';

/**
 * Single place that knows where news comes from.
 * - No env var: uses the local seed in data/news.ts.
 * - VITE_NEWS_API_URL set (e.g. a Cloudflare Worker route returning NewsItem[] JSON): fetches it.
 */
const API_URL = import.meta.env.VITE_NEWS_API_URL as string | undefined;

const newestFirst = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export async function getLatestNews(limit: number, signal?: AbortSignal): Promise<NewsItem[]> {
  let items: NewsItem[] = NEWS_SEED;
  if (API_URL) {
    const res = await fetch(`${API_URL}${API_URL.includes('?') ? '&' : '?'}limit=${limit}`, { signal });
    if (!res.ok) throw new Error(`News request failed (${res.status})`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error('News response is not a list');
    items = data as NewsItem[];
  }
  return [...items].sort(newestFirst).slice(0, limit);
}
