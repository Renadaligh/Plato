import { SHEETS } from '../config/sheets';
import { TOURNAMENTS_SEED, type Tournament } from '../data/tournaments';
import { fetchRows, isPublished, safeUrl, toIso, type Row } from './sheet';

const int = (v: string, d: number) => { const n = Math.floor(Number(v.replace(/[, ]/g, ''))); return Number.isFinite(n) && n >= 0 ? n : d; };

function fromRow(r: Row): Tournament | null {
  if (!isPublished(r)) return null;
  const startsAt = toIso(r.starts_at ?? '');
  const nAr = r.name_ar || r.name_en, nEn = r.name_en || r.name_ar;
  if (!startsAt || !nAr) return null;
  const pair = (k: string) => ({ ar: r[`${k}_ar`] || r[`${k}_en`] || '', en: r[`${k}_en`] || r[`${k}_ar`] || '' });
  const total = Math.max(1, int(r.total ?? '', 1));
  return {
    id: r.id || `${startsAt}-${nEn}`, gameId: (r.game ?? '').toLowerCase(),
    name: { ar: nAr, en: nEn }, format: pair('format'), prize: pair('prize'),
    startsAt, endsAt: toIso(r.ends_at ?? '') ?? startsAt,
    slots: { filled: Math.min(int(r.filled ?? '', 0), total), total },
    registerUrl: r.register_url ? safeUrl(r.register_url) : undefined,
    winner: r.winner_ar || r.winner_en ? pair('winner') : undefined,
  };
}

export async function getTournaments(signal?: AbortSignal): Promise<Tournament[]> {
  if (!SHEETS.tournaments) return TOURNAMENTS_SEED;
  const rows = await fetchRows(SHEETS.tournaments, signal);
  return rows.map(fromRow).filter((x): x is Tournament => x !== null);
}
