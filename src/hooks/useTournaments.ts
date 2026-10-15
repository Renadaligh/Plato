import { useCallback, useEffect, useState } from 'react';
import { SHEETS } from '../config/sheets';
import { TOURNAMENTS_SEED, type Tournament } from '../data/tournaments';
import { getTournaments } from '../services/tournamentsService';

export function useTournaments() {
  const [items, setItems] = useState<Tournament[]>(SHEETS.tournaments ? [] : TOURNAMENTS_SEED);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(SHEETS.tournaments ? 'loading' : 'ready');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!SHEETS.tournaments) return;
    const ctrl = new AbortController();
    setStatus('loading');
    getTournaments(ctrl.signal)
      .then((list) => { setItems(list); setStatus('ready'); })
      .catch((e: unknown) => { if (!(e instanceof DOMException && e.name === 'AbortError')) setStatus('error'); });
    return () => ctrl.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { items, status, retry };
}
