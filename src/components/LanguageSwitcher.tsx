import { useI18n } from '../i18n/I18nProvider';
import { GlobeIcon } from './icons';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      className="pill"
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      title={lang === 'en' ? 'العربية' : 'English'}
    >
      <GlobeIcon className="h-4 w-4" />
      <span lang={lang === 'en' ? 'ar' : 'en'} dir={lang === 'en' ? 'rtl' : 'ltr'}>{lang === 'en' ? 'عربي' : 'EN'}</span>
    </button>
  );
}
