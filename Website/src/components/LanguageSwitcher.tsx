import { useI18n } from '../i18n/I18nProvider';
import { GlobeIcon } from './icons';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <button type="button" className="pill" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={t.switchLang}>
      <GlobeIcon className="h-4 w-4" />{t.langCode}
    </button>
  );
}
