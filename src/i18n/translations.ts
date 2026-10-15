export type Lang = 'en' | 'ar';

const en = {
  navHome: 'Home', navNews: 'Latest News', navGames: 'Games', navTournaments: 'Tournaments', navChampions: 'Champions', navCommunity: 'Community', navSupport: 'Support Us',
  comSub: 'Join the Plato Elite community — chat, team up and play together.', supSub: 'Help keep Plato Elite growing.',
  toTop: 'Back to top', scrollDown: 'Scroll down to the news',
  newsTitle: 'Latest News', newsSub: 'The newest updates from the Plato Elite community.', newsRead: 'Read more', newsEmpty: 'No news yet — check back soon.', newsError: 'Could not load the news.', newsRetry: 'Try again', newsAll: 'All news', newsBack: 'Back to home', newsFilter: 'Filter by category', filterAll: 'All',
  newsExample: 'Example content — real news will replace these items.', tagUpdate: 'Update', tagTournament: 'Tournament', tagCommunity: 'Community', tagEvent: 'Event',
  gamesTitle: 'Games', gamesSub: 'Pick a game to see how to play, watch clips, and find its tournaments.', gamesDetails: 'Game details', gamesPrev: 'Previous game', gamesNext: 'Next game', gamesBack: 'Back to games', gamesExample: 'Example games — the real catalogue will replace these.', gameNotFound: 'This game was not found.',
  secOverview: 'Overview', secHow: 'How to play', secMechanics: 'Game mechanics', secShots: 'Screenshots', secVideos: 'Gameplay videos', secTournaments: 'Related tournaments', videoSoon: 'Video coming soon', shotSoon: 'Screenshot coming soon', viewTournaments: 'All tournaments', 
  tournTitle: 'Tournaments', tournSub: 'Follow what is live, what is coming next, and how past tournaments ended.', tabAll: 'All', tabLive: 'Live', tabUpcoming: 'Upcoming', tabDone: 'Completed',
  stLive: 'Live now', stUpcoming: 'Upcoming', stDone: 'Completed', tPrize: 'Prize pool', tFormat: 'Format', tTeams: 'Slots', tFull: 'Full', tRegister: 'Register', tWinner: 'Winner',
  tStartsIn: 'Starts in', tEndsIn: 'Ends in', cdDays: 'Days', cdHours: 'Hours', cdMins: 'Min', cdSecs: 'Sec', tEmpty: 'No tournaments in this category yet.', tournExample: 'Example tournaments — real events will replace these.',
  chTitle: 'Champions', chSub: 'The winners of Plato tournaments.', 
  
  aboutText: 'Placeholder text: a short introduction to the Elite community — who we are, what we play, and why players join us. This copy will be replaced with the final text.',
  
  desc: 'Dive into a world of fun games, exciting tournaments, and an amazing community.',
  ctaGames: 'Explore Games', ctaTournaments: 'View Tournaments',
  menu: 'Menu', closeMenu: 'Close menu', switchLang: 'Switch language',
  soon: 'Coming soon', langCode: 'EN',
  tError: 'Could not load the tournaments.', footPlato: 'Plato', footElite: 'Elite', footRights: 'All rights reserved.', footNote: 'Plato and Elite are independent and not affiliated with any game publisher. All game names and trademarks belong to their respective owners.',
  artAlt: 'A fantasy hero crouching on a floating stone platform among floating islands and a glowing citadel',
};
export type Dict = Record<keyof typeof en, string>;

const ar: Dict = {
  navHome: 'الرئيسية', navNews: 'آخر الأخبار', navGames: 'الألعاب', navTournaments: 'البطولات', navChampions: 'الأبطال', navCommunity: 'المجتمع', navSupport: 'ادعمنا',
  comSub: 'انضم إلى مجتمع بلاتو إيليت — تحدّث، كوّن فريقك، والعب مع الآخرين.', supSub: 'ساهم في استمرار نمو بلاتو إيليت.',
  toTop: 'العودة للأعلى', scrollDown: 'انزل لقسم الأخبار',
  newsTitle: 'آخر الأخبار', newsSub: 'أحدث مستجدات مجتمع بلاتو إيليت.', newsRead: 'اقرأ المزيد', newsEmpty: 'لا توجد أخبار حالياً — عد قريباً.', newsError: 'تعذّر تحميل الأخبار.', newsRetry: 'حاول مرة أخرى', newsAll: 'كل الأخبار', newsBack: 'العودة للرئيسية', newsFilter: 'تصفية حسب التصنيف', filterAll: 'الكل',
  newsExample: 'محتوى تجريبي — ستحل الأخبار الحقيقية محل هذه العناصر.', tagUpdate: 'تحديث', tagTournament: 'بطولة', tagCommunity: 'المجتمع', tagEvent: 'فعالية',
  gamesTitle: 'الألعاب', gamesSub: 'اختر لعبة لتعرف طريقة اللعب، وتشاهد المقاطع، وتجد بطولاتها.', gamesDetails: 'تفاصيل اللعبة', gamesPrev: 'اللعبة السابقة', gamesNext: 'اللعبة التالية', gamesBack: 'العودة إلى الألعاب', gamesExample: 'ألعاب تجريبية — سيحل الكتالوج الحقيقي محلها.', gameNotFound: 'لم يتم العثور على هذه اللعبة.',
  secOverview: 'نظرة عامة', secHow: 'طريقة اللعب', secMechanics: 'آليات اللعب', secShots: 'لقطات الشاشة', secVideos: 'فيديوهات اللعب', secTournaments: 'البطولات المرتبطة', videoSoon: 'الفيديو قريباً', shotSoon: 'اللقطة قريباً', viewTournaments: 'كل البطولات', 
  tournTitle: 'البطولات', tournSub: 'تابع ما هو مباشر الآن، وما هو قادم، وكيف انتهت البطولات السابقة.', tabAll: 'الكل', tabLive: 'مباشر', tabUpcoming: 'قادمة', tabDone: 'منتهية',
  stLive: 'مباشر الآن', stUpcoming: 'قادمة', stDone: 'منتهية', tPrize: 'إجمالي الجوائز', tFormat: 'النظام', tTeams: 'المقاعد', tFull: 'مكتمل', tRegister: 'سجّل الآن', tWinner: 'الفائز',
  tStartsIn: 'تبدأ بعد', tEndsIn: 'تنتهي بعد', cdDays: 'يوم', cdHours: 'ساعة', cdMins: 'دقيقة', cdSecs: 'ثانية', tEmpty: 'لا توجد بطولات في هذا التصنيف بعد.', tournExample: 'بطولات تجريبية — ستحل الأحداث الحقيقية محلها.',
  chTitle: 'الأبطال', chSub: 'فائزو بطولات بلاتو.', 
  
  aboutText: 'نص تجريبي: نبذة تعريفية قصيرة عن مجتمع إيليت — من نحن، وماذا نلعب، ولماذا ينضم إلينا اللاعبون. سيتم استبدال هذا النص بالنص النهائي.',
  
  desc: 'اكتشف ألعابك المفضلة، وشارك في البطولات، وتواصل مع مجتمع بلاتو.',
  ctaGames: 'استكشف الألعاب', ctaTournaments: 'استعرض البطولات',
  menu: 'القائمة', closeMenu: 'إغلاق القائمة', switchLang: 'تبديل اللغة',
  soon: 'قريباً', langCode: 'ع',
  tError: 'تعذّر تحميل البطولات.', footPlato: 'بلاتو', footElite: 'إيليت', footRights: 'جميع الحقوق محفوظة.', footNote: 'منصة بلاتو وفريق إيليت مستقلان وغير تابعين لأي ناشر ألعاب. جميع أسماء الألعاب والعلامات التجارية ملك لأصحابها.',
  artAlt: 'بطل خيالي يجثو على منصة حجرية عائمة بين جزر طائرة وقلعة متوهجة',
};
export const translations: Record<Lang, Dict> = { en, ar };
