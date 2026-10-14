import { useI18n } from '../i18n/I18nProvider';
import type { Dict } from '../i18n/translations';

const BLOCKS: { id: string; key: keyof Dict }[] = [
  { id: 'community', key: 'navCommunity' }, { id: 'support', key: 'navSupport' },
];

/** Minimal landing area so the scroll transition and every nav link have a real target. Real sections come next. */
export default function NextSection() {
  const { t } = useI18n();
  return (
    <section className="min-h-[80svh] px-[clamp(1.1rem,7vw,6.9rem)] py-[clamp(3rem,8vw,6rem)]" style={{ background: 'var(--bg)' }}>
      <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black rtl:font-sans rtl:font-extrabold">{t.nextTitle}</h2>
      <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.nextDesc}</p>
      <div className="mt-8 grid max-w-[40rem] gap-5">
        {BLOCKS.map((b) => (
          <div key={b.id} id={b.id} className="scroll-mt-28 rounded-3xl border p-6" style={{ background: 'var(--glass)', borderColor: 'var(--glass-b)' }}>
            <h3 className="text-lg font-semibold">{t[b.key]}</h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{t.soon}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
