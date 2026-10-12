import type { Dict } from '../i18n/translations';

/** Header navigation. Every href is a real in-page target (see NextSection). */
export const NAV: { href: string; key: keyof Dict }[] = [
  { href: '#top', key: 'navHome' },
  { href: '#games', key: 'navGames' },
  { href: '#tournaments', key: 'navTournaments' },
  { href: '#players', key: 'navPro' },
  { href: '#community', key: 'navCommunity' },
  { href: '#support', key: 'navSupport' },
];
