export type Lang = 'en' | 'ar';

const en = {
  navHome: 'Home', navNews: 'Latest News', navGames: 'Games', navTournaments: 'Tournaments', navChampions: 'Champions', navCommunity: 'Community', navSupport: 'Support Us',
  comSub: 'Join the Plato AR community — chat, team up and play together.', supSub: 'Help keep Plato AR growing.',
  toTop: 'Back to top', scrollDown: 'Scroll down to the news',
  newsTitle: 'Latest News', newsSub: 'The newest updates from the Plato AR community.', newsRead: 'Read more', newsEmpty: 'No news yet — check back soon.', newsError: 'Could not load the news.', newsRetry: 'Try again', newsAll: 'All news', newsBack: 'Back to home', newsFilter: 'Filter by category', filterAll: 'All',
  newsExample: 'Example content — real news will replace these items.', tagUpdate: 'Update', tagTournament: 'Tournament', tagCommunity: 'Community', tagEvent: 'Event',
  gamesTitle: 'Games', gamesSub: 'Pick a game to see how to play, watch clips, and find its tournaments.', gamesDetails: 'Game details', gamesPrev: 'Previous game', gamesNext: 'Next game', gamesBack: 'Back to games', gamesExample: 'Example games — the real catalogue will replace these.', gameNotFound: 'This game was not found.',
  secOverview: 'Overview', secHow: 'How to play', secMechanics: 'Game mechanics', secShots: 'Screenshots', secVideos: 'Gameplay videos', secTournaments: 'Related tournaments', videoSoon: 'Video coming soon', shotSoon: 'Screenshot coming soon', viewTournaments: 'All tournaments', 
  tournTitle: 'Tournaments', tournSub: 'Follow what is live, what is coming next, and how past tournaments ended.', tabAll: 'All', tabLive: 'Live', tabUpcoming: 'Upcoming', tabDone: 'Completed',
  stLive: 'Live now', stUpcoming: 'Upcoming', stDone: 'Completed', tPrize: 'Prize pool', tFormat: 'Format', tTeams: 'Slots', tFull: 'Full', tRegister: 'Register', tWinner: 'Winner',
  tStartsIn: 'Starts in', tEndsIn: 'Ends in', cdDays: 'Days', cdHours: 'Hours', cdMins: 'Min', cdSecs: 'Sec', tEmpty: 'No tournaments in this category yet.', tournExample: 'Example tournaments — real events will replace these.',
  chTitle: 'Champions', chSub: 'The winners of Plato tournaments.', heroL1: 'PLAY.', heroL2: 'COMPETE.', heroL3: 'CONNECT.',
  ctaGames: 'Explore Games', ctaTournaments: 'View Tournaments',
  pickLabel: "Today's game", pickHint: "Roll to pick today's game", pickView: 'View game', pickAgain: 'Roll again',
  themeToLight: 'Switch to light mode', themeToDark: 'Switch to dark mode',
  menu: 'Menu', closeMenu: 'Close menu',
  soon: 'Coming soon',
  regTitle: 'Register', regFor: 'Tournament', regPlatoId: 'Your Plato ID', regTeamName: 'Team name', regCaptain: 'Team captain Plato ID', regCaptainNote: 'Used to contact the team.', regMembers: "Other members' Plato IDs", regMembersNote: 'One ID per line.', regSubmit: 'Submit', regSending: 'Sending…', regDone: 'You are in the arena ⚔️', regDoneSub: 'We will contact you soon.', regErr: 'Could not send. Please try again.', regDup: 'This ID is already registered for this tournament.', regRequired: 'Please fill in all fields.', regClose: 'Close',
  tError: 'Could not load the tournaments.', footRights: 'All rights reserved.', footNote: 'Plato AR is independent and not affiliated with any game publisher. All game names and trademarks belong to their respective owners.',
};
export type Dict = Record<keyof typeof en, string>;

const ar: Dict = {
  navHome: 'الرئيسية', navNews: 'آخر الأخبار', navGames: 'الألعاب', navTournaments: 'البطولات', navChampions: 'الأبطال', navCommunity: 'المجتمع', navSupport: 'ادعمنا',
  comSub: 'انضم إلى مجتمع Plato | بالعربية — تحدّث، كوّن فريقك، والعب مع الآخرين.', supSub: 'ساهم في استمرار نمو Plato | بالعربية.',
  toTop: 'العودة للأعلى', scrollDown: 'انزل لقسم الأخبار',
  newsTitle: 'آخر الأخبار', newsSub: 'أحدث مستجدات مجتمع Plato | بالعربية.', newsRead: 'اقرأ المزيد', newsEmpty: 'لا توجد أخبار حالياً — عد قريباً.', newsError: 'تعذّر تحميل الأخبار.', newsRetry: 'حاول مرة أخرى', newsAll: 'كل الأخبار', newsBack: 'العودة للرئيسية', newsFilter: 'تصفية حسب التصنيف', filterAll: 'الكل',
  newsExample: 'محتوى تجريبي — ستحل الأخبار الحقيقية محل هذه العناصر.', tagUpdate: 'تحديث', tagTournament: 'بطولة', tagCommunity: 'المجتمع', tagEvent: 'فعالية',
  gamesTitle: 'الألعاب', gamesSub: 'اختر لعبة لتعرف طريقة اللعب، وتشاهد المقاطع، وتجد بطولاتها.', gamesDetails: 'تفاصيل اللعبة', gamesPrev: 'اللعبة السابقة', gamesNext: 'اللعبة التالية', gamesBack: 'العودة إلى الألعاب', gamesExample: 'ألعاب تجريبية — سيحل الكتالوج الحقيقي محلها.', gameNotFound: 'لم يتم العثور على هذه اللعبة.',
  secOverview: 'نظرة عامة', secHow: 'طريقة اللعب', secMechanics: 'آليات اللعب', secShots: 'لقطات الشاشة', secVideos: 'فيديوهات اللعب', secTournaments: 'البطولات المرتبطة', videoSoon: 'الفيديو قريباً', shotSoon: 'اللقطة قريباً', viewTournaments: 'كل البطولات', 
  tournTitle: 'البطولات', tournSub: 'تابع ما هو مباشر الآن، وما هو قادم، وكيف انتهت البطولات السابقة.', tabAll: 'الكل', tabLive: 'مباشر', tabUpcoming: 'قادمة', tabDone: 'منتهية',
  stLive: 'مباشر الآن', stUpcoming: 'قادمة', stDone: 'منتهية', tPrize: 'إجمالي الجوائز', tFormat: 'النظام', tTeams: 'المقاعد', tFull: 'مكتمل', tRegister: 'سجّل الآن', tWinner: 'الفائز',
  tStartsIn: 'تبدأ بعد', tEndsIn: 'تنتهي بعد', cdDays: 'يوم', cdHours: 'ساعة', cdMins: 'دقيقة', cdSecs: 'ثانية', tEmpty: 'لا توجد بطولات في هذا التصنيف بعد.', tournExample: 'بطولات تجريبية — ستحل الأحداث الحقيقية محلها.',
  chTitle: 'الأبطال', chSub: 'فائزو بطولات بلاتو.', heroL1: 'العب.', heroL2: 'نافس.', heroL3: 'تواصل.',
  ctaGames: 'استكشف الألعاب', ctaTournaments: 'استعرض البطولات',
  pickLabel: 'لعبة اليوم', pickHint: 'اضغط لاختيار لعبة اليوم', pickView: 'شاهد اللعبة', pickAgain: 'ارمِ مرة أخرى',
  themeToLight: 'التبديل إلى الوضع الفاتح', themeToDark: 'التبديل إلى الوضع الداكن',
  menu: 'القائمة', closeMenu: 'إغلاق القائمة',
  soon: 'قريباً',
  regTitle: 'التسجيل', regFor: 'البطولة', regPlatoId: 'معرّفك في بلاتو', regTeamName: 'اسم الفريق', regCaptain: 'معرّف قائد الفريق في بلاتو', regCaptainNote: 'نستخدم معرّف القائد للتواصل مع الفريق.', regMembers: 'معرّفات باقي اللاعبين في بلاتو', regMembersNote: 'معرّف كل لاعب في سطر.', regSubmit: 'إرسال', regSending: 'جاري الإرسال…', regDone: 'أنت الآن في الحلبة ⚔️', regDoneSub: 'بنتواصل معك قريباً.', regErr: 'تعذّر الإرسال، حاول مرة ثانية.', regDup: 'هذا المعرّف مسجّل مسبقاً في هذه البطولة.', regRequired: 'عبّي كل الخانات.', regClose: 'إغلاق',
  tError: 'تعذّر تحميل البطولات.', footRights: 'جميع الحقوق محفوظة.', footNote: 'Plato | بالعربية مستقل وغير تابع لأي ناشر ألعاب. جميع أسماء الألعاب والعلامات التجارية ملك لأصحابها.',
};
export const translations: Record<Lang, Dict> = { en, ar };
