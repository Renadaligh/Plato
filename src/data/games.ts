import type { Localized } from './news';

/**
 * Game catalogue + PLACEHOLDER content (fictional titles). Replace with the real games.
 * Every optional list below hides its whole section on the game page when empty/missing.
 */
export interface Game {
  /** URL slug: the game page lives at #/games/<id>. */
  id: string;
  name: Localized;
  genre: Localized;
  /** One or two sentences, shown under the carousel and at the top of the game page. */
  tagline: Localized;
  /** Two gradient colours for the card / cover until real artwork is added. */
  colors: [string, string];
  /** Optional card + cover image (path under /public or URL). */
  image?: string;
  overview: Localized;
  howToPlay?: Localized[];
  mechanics?: Localized[];
  /** Image URLs. Without them the page shows labelled placeholder tiles. */
  screenshots?: string[];
  /** YouTube video ids (privacy-enhanced embed). Without an id the tile shows "coming soon". */
  videos?: { title: Localized; youtubeId?: string }[];
}

/** Set to false once real games replace the placeholders. */
export const SHOW_EXAMPLE_GAMES = true;

const L = (en: string, ar: string): Localized => ({ en, ar });
const how = [
  L('Create your account and join a lobby.', 'أنشئ حسابك وانضم إلى غرفة اللعب.'),
  L('Pick your role or loadout before the match starts.', 'اختر دورك أو عتادك قبل بدء المباراة.'),
  L('Work with your team toward the match objective.', 'تعاون مع فريقك لتحقيق هدف المباراة.'),
  L('Win the round, climb the ranks, repeat.', 'اكسب الجولة، تقدّم في التصنيف، وكرّر.'),
];
const mech = [
  L('Placeholder rule: short rounds with a clear objective.', 'قاعدة تجريبية: جولات قصيرة بهدف واضح.'),
  L('Placeholder rule: teams of two to five players.', 'قاعدة تجريبية: فرق من لاعبَين إلى خمسة.'),
  L('Placeholder rule: ranked seasons reset every few months.', 'قاعدة تجريبية: تُعاد المواسم المصنّفة كل بضعة أشهر.'),
];
const over = L('Placeholder overview. A general introduction to the game and why it is part of the Plato catalogue will go here.', 'نظرة عامة تجريبية. ستُكتب هنا مقدمة عامة عن اللعبة وسبب وجودها في كتالوج بلاتو.');
const vids = [{ title: L('Beginner tutorial', 'شرح للمبتدئين') }, { title: L('Pro gameplay highlights', 'أبرز لقطات المحترفين') }];

export const GAMES: Game[] = [
  { id: 'rift-arena', name: L('Rift Arena', 'ريفت أرينا'), genre: L('Team Battle', 'قتال جماعي'), tagline: L('Fast five-versus-five fights over shifting arenas.', 'معارك سريعة خمسة ضد خمسة داخل ساحات متغيّرة.'), colors: ['#ff3b4e', '#0f2a6b'], overview: over, howToPlay: how, mechanics: mech, videos: vids },
  { id: 'night-raid', name: L('Night Raid', 'نايت ريد'), genre: L('Battle Royale', 'باتل رويال'), tagline: L('Drop in, scavenge, and be the last squad standing.', 'انزل، اجمع العتاد، وكن آخر فريق صامد.'), colors: ['#7a5cff', '#1a1040'], overview: over, howToPlay: how, mechanics: mech, videos: vids },
  { id: 'velocity', name: L('Velocity', 'فيلوسيتي'), genre: L('Racing', 'سباقات'), tagline: L('Drift through neon tracks and beat the clock.', 'انزلق عبر مضامير نيون وتغلّب على الوقت.'), colors: ['#18c8ff', '#06304a'], overview: over, howToPlay: how, mechanics: mech},
  { id: 'iron-siege', name: L('Iron Siege', 'آيرن سيج'), genre: L('Strategy', 'استراتيجية'), tagline: L('Build, defend, and break the enemy fortress.', 'ابنِ، دافع، واكسر قلعة الخصم.'), colors: ['#ffb02e', '#4a2c04'], overview: over, howToPlay: how, mechanics: mech, videos: vids },
  { id: 'pixel-quest', name: L('Pixel Quest', 'بكسل كويست'), genre: L('Co-op Adventure', 'مغامرة تعاونية'), tagline: L('A relaxed co-op journey for friends and families.', 'رحلة تعاونية مريحة للأصدقاء والعائلة.'), colors: ['#3ddc84', '#0a3a22'], overview: over, howToPlay: how, mechanics: mech },
];

export const getGame = (id: string) => GAMES.find((g) => g.id === id);
