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

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
