import { useI18n } from '../i18n/I18nProvider';
import { BRAND } from '../config/site';

export default function Footer() {
  const { t, lang } = useI18n();
  const y = new Date().getFullYear();
  const yr = lang === 'ar' ? new Intl.NumberFormat('ar-SA-u-nu-latn', { useGrouping: false }).format(y) : String(y);
  return (
    <footer className="border-t px-[clamp(1.1rem,7vw,6.9rem)] py-8 text-center" style={{ background: 'var(--bg)', borderColor: 'var(--glass-b)' }}>
      <p className="text-[.95rem] font-semibold">
        © {yr} <bdi>{BRAND[lang]}</bdi> · {t.footRights}
      </p>
      <p className="mx-auto mt-2 max-w-[44rem] text-[.8rem] leading-relaxed" style={{ color: 'var(--muted)' }}>{t.footNote}</p>
    </footer>
  );
}
