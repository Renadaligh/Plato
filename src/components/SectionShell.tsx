import type { ReactNode } from 'react';
import { useI18n } from '../i18n/I18nProvider';

/** Common frame for a full-width page section: anchor id (nav target), title, subtitle and a body area.
 *  Without children the body is a roomy placeholder, ready to be replaced by the real content. */
export default function SectionShell({ id, title, sub, children }: { id: string; title: string; sub: string; children?: ReactNode }) {
  const { t } = useI18n();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 px-[clamp(1.1rem,7vw,6.9rem)] py-[clamp(3rem,8vw,6rem)]" style={{ background: 'var(--bg)' }}>
      <div className="mb-8 max-w-[40rem]">
        <h2 id={`${id}-title`} className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-tight rtl:font-sans rtl:font-extrabold">{title}</h2>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>{sub}</p>
      </div>
      {children ?? (
        <div className="grid min-h-[12rem] place-items-center rounded-3xl border p-8 text-center" style={{ background: 'var(--glass)', borderColor: 'var(--glass-b)', color: 'var(--muted)' }}>
          {t.soon}
        </div>
      )}
    </section>
  );
}
