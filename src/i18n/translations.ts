export type Lang = 'en' | 'ar';

const en = {
  navHome: 'Home', navGames: 'Games', navTournaments: 'Tournaments', navPro: 'Pro Players', navCommunity: 'Community', navSupport: 'Support Us',
  eyebrow: 'WELCOME TO PLATO',
  title1: 'PLAY.', title2: 'COMPETE.', title3: 'CONNECT.',
  desc: 'Dive into a world of fun games, exciting tournaments, and an amazing community.',
  ctaGames: 'Explore Games', ctaTournaments: 'View Tournaments',
  menu: 'Menu', closeMenu: 'Close menu', switchLang: 'Switch language', switchTheme: 'Toggle light / dark mode',
  nextTitle: 'The adventure continues', nextDesc: 'The next sections will be built one at a time.', soon: 'Coming soon', langCode: 'EN',
  artAlt: 'A fantasy hero crouching on a floating stone platform among floating islands and a glowing citadel',
};
export type Dict = Record<keyof typeof en, string>;

const ar: Dict = {
  navHome: 'الرئيسية', navGames: 'الألعاب', navTournaments: 'البطولات', navPro: 'اللاعبون المحترفون', navCommunity: 'المجتمع', navSupport: 'ادعمنا',
  eyebrow: 'مرحباً بك في بلاتو',
  title1: 'العب.', title2: 'نافس.', title3: 'تواصل.',
  desc: 'اكتشف ألعابك المفضلة، وشارك في البطولات، وتواصل مع مجتمع بلاتو.',
  ctaGames: 'استكشف الألعاب', ctaTournaments: 'استعرض البطولات',
  menu: 'القائمة', closeMenu: 'إغلاق القائمة', switchLang: 'تبديل اللغة', switchTheme: 'تبديل الوضع الفاتح / الداكن',
  nextTitle: 'المغامرة مستمرة', nextDesc: 'سنبني الأقسام التالية واحداً تلو الآخر.', soon: 'قريباً', langCode: 'ع',
  artAlt: 'بطل خيالي يجثو على منصة حجرية عائمة بين جزر طائرة وقلعة متوهجة',
};
export const translations: Record<Lang, Dict> = { en, ar };
