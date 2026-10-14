import type { Dict } from '../i18n/translations';

/** Header navigation. Every href is a real in-page target (sections live in App.tsx). */
export const NAV: { href: string; key: keyof Dict }[] = [
  { href: '#top', key: 'navHome' },
  { href: '#news', key: 'navNews' },
  { href: '#games', key: 'navGames' },
  { href: '#tournaments', key: 'navTournaments' },
  { href: '#champions', key: 'navChampions' },
  { href: '#community', key: 'navCommunity' },
  { href: '#support', key: 'navSupport' },
];
