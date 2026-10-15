import { useI18n } from '../i18n/I18nProvider';

/** Plato = the gaming platform, Elite = the esports team; a thin divider keeps them distinct. */
export default function Footer() {
  const { t, lang } = useI18n();
  const y = new Date().getFullYear();
  const yr = lang === 'ar' ? new Intl.NumberFormat('ar-SA-u-nu-latn', { useGrouping: false }).format(y) : String(y);
  return (
    <footer className="border-t px-[clamp(1.1rem,7vw,6.9rem)] py-8 text-center" style={{ background: 'var(--bg)', borderColor: 'var(--glass-b)' }}>
      <p className="text-[.95rem] font-semibold">
        <span aria-hidden="true">© {yr} </span>
        <span className="sr-only">© {yr} {t.footPlato} {t.footElite}</span>
        <span aria-hidden="true" className="inline-flex items-center gap-2.5 align-middle">
          <span>{t.footPlato}</span><i className="inline-block h-[1.1em] w-px" style={{ background: 'var(--glass-b)', boxShadow: '0 0 0 .5px rgba(255,255,255,.25)' }} /><span>{t.footElite}</span>
        </span>
        <span> · {t.footRights}</span>
      </p>
      <p className="mx-auto mt-2 max-w-[44rem] text-[.8rem] leading-relaxed" style={{ color: 'var(--muted)' }}>{t.footNote}</p>
    </footer>
  );
}
