import { useCallback, useEffect, useState } from 'react';
import type { Tournament } from '../data/tournaments';
import { getTournaments } from '../services/tournamentsService';

export function useTournaments() {
  const [items, setItems] = useState<Tournament[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setStatus('loading');
    getTournaments()
      .then((list) => { if (live) { setItems(list); setStatus('ready'); } })
      .catch(() => { if (live) setStatus('error'); });
    return () => { live = false; };
  }, [attempt]);

  // Silent refresh: new/edited tournaments (and slot counts) show up on their own.
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== 'visible') return;
      getTournaments().then((list) => setItems((prev) => (JSON.stringify(prev) === JSON.stringify(list) ? prev : list))).catch(() => undefined);
    };
    const id = window.setInterval(refresh, 30_000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(id); document.removeEventListener('visibilitychange', refresh); };
  }, []);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
