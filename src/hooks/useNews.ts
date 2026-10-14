import { useCallback, useEffect, useState } from 'react';
import type { NewsItem } from '../data/news';
import { getLatestNews } from '../services/newsService';

export type NewsStatus = 'loading' | 'ready' | 'error';

export function useNews(limit = 5) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [status, setStatus] = useState<NewsStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setStatus('loading');
    getLatestNews(limit, ctrl.signal)
      .then((list) => { setItems(list); setStatus('ready'); })
      .catch((e: unknown) => { if (!(e instanceof DOMException && e.name === 'AbortError')) setStatus('error'); });
    return () => ctrl.abort();
  }, [limit, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
