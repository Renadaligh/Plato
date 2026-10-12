import type { SVGProps } from 'react';
type P = SVGProps<SVGSVGElement>;
const b = { 'aria-hidden': true as const, focusable: 'false' as const };

export const GlobeIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...b} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>);
export const SunIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...b} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
export const MoonIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...b} {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>);
export const MenuIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...b} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CloseIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...b} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const ArrowIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...b} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const SparkIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...b} {...p}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" /></svg>);
/** Temporary logo — replace with the official Plato logo. */
export const LogoMark = (p: P) => (<svg viewBox="0 0 40 40" {...b} {...p}><rect x="2" y="8" width="36" height="24" rx="12" fill="#8fb4ff" /><circle cx="14" cy="19" r="4" fill="#fff" /><circle cx="26" cy="19" r="4" fill="#fff" /><circle cx="14" cy="19" r="1.8" fill="#2a2f8f" /><circle cx="26" cy="19" r="1.8" fill="#2a2f8f" /></svg>);
