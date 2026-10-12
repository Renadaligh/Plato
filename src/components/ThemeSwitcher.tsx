import { useI18n } from '../i18n/I18nProvider';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './icons';

export default function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button type="button" className="pill !px-0" onClick={toggle} aria-label={t.switchTheme} aria-pressed={theme === 'light'}>
      {theme === 'dark' ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}
