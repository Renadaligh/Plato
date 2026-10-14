import { I18nProvider } from './i18n/I18nProvider';
import { useRoute } from './hooks/useRoute';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import NewsPage from './components/NewsPage';
import GamesSection from './components/GamesSection';
import GamePage from './components/GamePage';
import TournamentsSection from './components/TournamentsSection';
import ChampionsSection from './components/ChampionsSection';
import BackToTop from './components/BackToTop';
import CommunitySection from './components/CommunitySection';
import SupportSection from './components/SupportSection';

function Pages() {
  const route = useRoute();
  return (
    <>
      <Header page={route.page} />
      <main>
        {route.page === 'news' ? (
          <NewsPage />
        ) : route.page === 'game' ? (
          <GamePage id={route.id ?? ''} />
        ) : (
          <>
            <HeroSection />
            <NewsSection />
            <GamesSection />
            <TournamentsSection />
            <ChampionsSection />
            <CommunitySection />
            <SupportSection />
          </>
        )}
      </main>
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Pages />
    </I18nProvider>
  );
}
