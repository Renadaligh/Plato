import { useCallback, useEffect, useState } from 'react';
import type { NewsItem } from '../data/news';
import { getLatestNews } from '../services/newsService';

export type NewsStatus = 'loading' | 'ready' | 'error';

export function useNews(limit = 5) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [status, setStatus] = useState<NewsStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setStatus('loading');
    getLatestNews(limit)
      .then((list) => { if (live) { setItems(list); setStatus('ready'); } })
      .catch(() => { if (live) setStatus('error'); });
    return () => { live = false; };
  }, [limit, attempt]);

  // Silent refresh: new/edited news shows up on its own (every 30 s and whenever the tab becomes visible again).
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== 'visible') return;
      getLatestNews(limit).then((list) => setItems((prev) => (JSON.stringify(prev) === JSON.stringify(list) ? prev : list))).catch(() => undefined);
    };
    const id = window.setInterval(refresh, 30_000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(id); document.removeEventListener('visibilitychange', refresh); };
  }, [limit]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
