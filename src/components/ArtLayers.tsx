import { useEffect, useRef, useState } from 'react';
import { HERO } from '../config/artwork';
import { useI18n } from '../i18n/I18nProvider';
import EliteWordmark from './EliteWordmark';

/** Looping muted video (no audio track). Pauses off-screen; reduced-motion users only see the poster. */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Phones get the lighter 1600-wide file (picked once on load).
  const [phone] = useState(() => matchMedia('(max-width: 767px)').matches);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    let inView = false;
    const play = () => { void v.play().catch(() => undefined); };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) play(); else v.pause(); });
    io.observe(v);
    // iPhones in Low Power Mode (and some in-app browsers) refuse autoplay: start on the first touch / key press instead.
    const events = ['touchend', 'pointerdown', 'keydown'] as const;
    const kick = () => { if (inView && v.paused) play(); };
    const done = () => events.forEach((ev) => window.removeEventListener(ev, kick));
    events.forEach((ev) => window.addEventListener(ev, kick, { passive: true }));
    v.addEventListener('playing', done, { once: true });
    return () => { io.disconnect(); done(); v.removeEventListener('playing', done); };
  }, [reduce]);

  const src = phone ? HERO.videoPhone : HERO.video;
  return (
    <video key={src.mp4} ref={ref} className="art-video" poster={HERO.poster} muted loop playsInline disableRemotePlayback preload="auto" autoPlay={!reduce} aria-hidden="true">
      <source src={src.webm} type="video/webm" />
      <source src={src.mp4} type="video/mp4" />
    </video>
  );
}

/** Slightly oversized layer → scroll zoom (data-art-scroll) → entrance (data-anim=art) → video + wordmark overlay. */
export default function ArtLayers() {
  const { t } = useI18n();
  return (
    <div className="absolute inset-0" role="img" aria-label={t.artAlt}>
      <div className="absolute -inset-[3%]">
        <div data-art-scroll className="absolute inset-0">
          <div data-anim="art" className="absolute inset-0">
            <HeroVideo />
            <EliteWordmark />
          </div>
        </div>
      </div>
    </div>
  );
}
