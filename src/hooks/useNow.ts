import { useEffect, useState } from 'react';

/** Current time in ms, refreshed every `everyMs` (used for countdowns and for status changes). */
export function useNow(everyMs = 30000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), everyMs);
    return () => window.clearInterval(id);
  }, [everyMs]);
  return now;
}
