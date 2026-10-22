import type { SVGProps } from 'react';
type P = SVGProps<SVGSVGElement>;
const b = { 'aria-hidden': true as const, focusable: 'false' as const };

export const GlobeIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...b} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>);
export const MenuIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...b} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CloseIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...b} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const ArrowIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...b} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const GamepadIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...b} {...p}><path d="M7.5 9h9a4.5 4.5 0 0 1 4.37 5.58l-.56 2.2a2.8 2.8 0 0 1-4.5 1.42l-1.53-1.25a3.4 3.4 0 0 0-4.28 0l-1.53 1.25a2.8 2.8 0 0 1-4.5-1.42l-.56-2.2A4.5 4.5 0 0 1 7.5 9Z"/><path d="M8.4 13.2h2.8M9.8 11.8v2.8M16.5 12.5h.01M18.4 14.3h.01"/></svg>);
export const TrophyIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...b} {...p}><path d="M8 4h8v2a4 4 0 0 1-8 0V4Z"/><path d="M9 18h6M12 14v4M6 4H4a2 2 0 0 0 2 5h1M18 4h2a2 2 0 0 1-2 5h-1"/></svg>);
export const UsersIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...b} {...p}><path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"/><circle cx="10" cy="8" r="3"/><path d="M20 19v-1a3.5 3.5 0 0 0-2.6-3.38"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6"/></svg>);
export const HeartIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...b} {...p}><path d="M12 20.5 4.8 13.6a4.8 4.8 0 1 1 6.8-6.8L12 7.2l.4-.4a4.8 4.8 0 1 1 6.8 6.8L12 20.5Z"/></svg>);
