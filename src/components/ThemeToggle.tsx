import { useI18n } from '../i18n/I18nProvider';
import { useTheme } from '../theme';
import { MoonIcon, SunIcon } from './icons';

export default function ThemeToggle() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const light = theme === 'light';
  const label = light ? t.themeToDark : t.themeToLight;
  return (
    <button type="button" className="pill !px-0" onClick={() => setTheme(light ? 'dark' : 'light')} aria-label={label} title={label}>
      {light ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}
