import { I18nProvider } from './i18n/I18nProvider';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NextSection from './components/NextSection';

export default function App() {
  return (
    <I18nProvider>
      <Header />
      <main><HeroSection /><NextSection /></main>
    </I18nProvider>
  );
}
