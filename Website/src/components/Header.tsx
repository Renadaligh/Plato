import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { NAV } from '../config/site';
import { CloseIcon, LogoMark, MenuIcon } from './icons';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#top');
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); burger.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header data-anim="header" className="fixed inset-x-0 top-0 z-50 px-[clamp(1rem,4vw,3.5rem)] pt-[clamp(.75rem,2vw,1.5rem)]">
      <div className={`rounded-[1.6rem] border backdrop-blur-xl transition-shadow duration-300 ${scrolled ? 'shadow-[0_10px_40px_rgba(10,5,40,.35)]' : ''}`} style={{ background: 'var(--glass)', borderColor: 'var(--glass-b)' }}>
        <div className="flex items-center justify-between gap-4 py-2.5 pe-3.5 ps-5 md:rounded-full">
          <a href="#top" className="flex items-center gap-2.5 text-[1.45rem] font-semibold" aria-label="Plato — home">
            <LogoMark className="h-8 w-8" /> Plato
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1rem,2.2vw,2.1rem)]">
              {NAV.map((n) => {
                const on = active === n.href;
                return (
                  <li key={n.href}>
                    <a href={n.href} aria-current={on ? 'page' : undefined} className="border-b-2 py-1.5 text-[.92rem] transition-colors hover:text-[var(--text)]" style={{ color: on ? 'var(--text)' : 'var(--muted)', borderColor: on ? 'var(--link-on)' : 'transparent' }}>
                      {t[n.key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button ref={burger} type="button" className="pill !px-0 lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.closeMenu : t.menu}>
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t px-5 pb-4 pt-2 lg:hidden" style={{ borderColor: 'var(--glass-b)' }}>
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-lg" style={{ color: active === n.href ? 'var(--text)' : 'var(--muted)' }}>{t[n.key]}</a></li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
