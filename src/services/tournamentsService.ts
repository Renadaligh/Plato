import { TOURNAMENTS_SEED, type Tournament } from '../data/tournaments';
import { api } from './api';

/** Tournaments come from the Cloudflare D1 database through /api/tournaments. In `npm run dev` (no API) it falls back to the sample seed. */
export async function getTournaments(): Promise<Tournament[]> {
  try {
    return await api<Tournament[]>('/tournaments');
  } catch (e) {
    if (!import.meta.env.DEV) throw e;
    return TOURNAMENTS_SEED;
  }
}
