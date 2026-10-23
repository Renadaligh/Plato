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

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
