import type { Localized } from './news';

/**
 * Pro players + PLACEHOLDER data. A player belongs to one or more games (gameIds, slugs from data/games.ts),
 * which are the "categories" used by the filter and by each game page ("Related pro players").
 */
export interface Player {
  id: string;
  /** In-game name, shown big. */
  nickname: string;
  /** Optional real name, per language. */
  name?: Localized;
  gameIds: string[];
  role: Localized;
  team?: string;
  country?: Localized;
  /** Number of titles / trophies. */
  titles: number;
  /** Optional portrait (path under /public or URL). Without one the card shows the game colours + initial. */
  image?: string;
  /** Optional links: only the ones given are shown. */
  links?: { x?: string; twitch?: string; youtube?: string };
}

/** Set to false once real players replace the placeholders below. */
export const SHOW_EXAMPLE_PLAYERS = true;

const L = (en: string, ar: string): Localized => ({ en, ar });

export const PLAYERS_SEED: Player[] = [
  { id: 'p1', nickname: 'Player One', name: L('Placeholder name', 'اسم تجريبي'), gameIds: ['rift-arena'], role: L('Team captain', 'قائد الفريق'), team: 'Team Alpha', country: L('Saudi Arabia', 'السعودية'), titles: 6 },
  { id: 'p2', nickname: 'Player Two', gameIds: ['rift-arena'], role: L('Entry fragger', 'مهاجم أول'), team: 'Team Alpha', country: L('Saudi Arabia', 'السعودية'), titles: 4 },
  { id: 'p3', nickname: 'Player Three', gameIds: ['night-raid'], role: L('Squad leader', 'قائد السكواد'), team: 'Team Bravo', country: L('UAE', 'الإمارات'), titles: 5 },
  { id: 'p4', nickname: 'Player Four', gameIds: ['night-raid', 'rift-arena'], role: L('Flex', 'لاعب مرن'), country: L('Kuwait', 'الكويت'), titles: 3 },
  { id: 'p5', nickname: 'Player Five', gameIds: ['velocity'], role: L('Time-trial specialist', 'متخصص سباق الوقت'), team: 'Team Charlie', country: L('Saudi Arabia', 'السعودية'), titles: 8 },
  { id: 'p6', nickname: 'Player Six', gameIds: ['iron-siege'], role: L('Strategist', 'استراتيجي'), country: L('Jordan', 'الأردن'), titles: 2 },
  { id: 'p7', nickname: 'Player Seven', gameIds: ['velocity', 'iron-siege'], role: L('All-rounder', 'لاعب شامل'), team: 'Team Charlie', country: L('Bahrain', 'البحرين'), titles: 1 },
];

/** Strongest first. */
export const byTitles = (a: Player, b: Player) => b.titles - a.titles;
export const playersForGame = (gameId: string) => PLAYERS_SEED.filter((p) => p.gameIds.includes(gameId)).sort(byTitles);
