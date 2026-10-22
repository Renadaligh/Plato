import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import './platoReferenceHero.css';

const pips = [[4], [0,8], [0,4,8], [0,2,6,8], [0,2,4,6,8], [0,2,3,5,6,8]];
const turns = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];

export default function HeroSection() {
  const { lang, t } = useI18n();
  const [outline, setOutline] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLButtonElement>(null);
  const actionRef = useRef<null | (() => void)>(null);
  const motionRef = useRef({ pitch: -24, yaw: 0, mode: 'idle' as 'idle' | 'roll' | 'hold', start: 0, fromX: -24, fromY: 0, toX: -24, toY: 0, holdUntil: 0 });
  const reducedRef = useRef(false);
  const rtl = lang === 'ar';

  // One animation clock owns every frame: uninterrupted idle spin, roll, brief stop, then idle again.
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let previous = 0;
    let alive = true;
    const m = motionRef.current;
    const paint = () => { cube.style.transform = `rotateX(${m.pitch}deg) rotateY(${m.yaw}deg)`; };
    const tick = (now: number) => {
      if (!alive) return;
      const dt = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (m.mode === 'roll') {
        const elapsed = now - m.start;
        const p = Math.min(elapsed / (reducedRef.current ? 350 : 1900), 1);
        // Ease the acceleration and deceleration into the selected dice face.
        const ease = 1 - Math.pow(1 - p, 4);
        m.pitch = m.fromX + (m.toX - m.fromX) * ease;
        m.yaw = m.fromY + (m.toY - m.fromY) * ease;
        if (p >= 1) {
          m.mode = 'hold';
          m.holdUntil = now + (reducedRef.current ? 400 : 1050);
        }
      } else if (m.mode === 'hold') {
        if (now >= m.holdUntil) {
          m.mode = 'idle';
          setOutline(false);
          setRolling(false);
        }
      } else if (!reducedRef.current) {
        m.yaw += dt * (360 / 26000);
      }
      paint();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    actionRef.current = () => {
      if (m.mode !== 'idle') return;
      const number = Math.floor(Math.random() * 6) + 1;
      setHasRolled(true);
      setResult(number);
      setRolling(true);
      setOutline(true);
      // Faces map to 1..6. Two full turns make the roll visible; the destination
      // is a canonical face angle offset from the current position, so no snap occurs.
      const destinations = [
        { x: 0, y: 0 }, { x: 0, y: -90 }, { x: 0, y: 180 },
        { x: 0, y: 90 }, { x: -90, y: 0 }, { x: 90, y: 0 },
      ];
      const target = destinations[number - 1];
      m.fromX = m.pitch;
      m.fromY = m.yaw;
      const extraX = reducedRef.current ? 0 : 360;
      const extraY = reducedRef.current ? 0 : 720;
      m.toX = target.x + Math.ceil((m.fromX + extraX - target.x) / 360) * 360;
      m.toY = target.y + Math.ceil((m.fromY + extraY - target.y) / 360) * 360;
      m.start = performance.now();
      m.mode = 'roll';
    };
    return () => { alive = false; cancelAnimationFrame(frame); actionRef.current = null; };
  }, []);

  const rollDice = () => actionRef.current?.();
  return (
    <section id="top" className="plato-ref-hero" aria-label={rtl ? 'مقدمة بلاتو بالعربية' : 'Plato AR welcome'}>
      <div className="plato-ref-glows" aria-hidden="true"><span/><span/><span/></div>
      <div className="plato-ref-layout">
        <div className="plato-ref-content">
          <h1 className="plato-ref-heading"><span>{t.heroL1}</span><span>{t.heroL2}</span><span>{t.heroL3}</span></h1>
          <p className="plato-ref-desc">{rtl ? 'مجتمع بلاتو العربي — ألعاب وبطولات وناس يلعبون للفوز.' : 'The Arabic Plato community — games, tournaments, and people who play to win.'}</p>
          <div className="plato-ref-actions">
            <a href="#games" className="plato-ref-button plato-ref-button-primary">{t.ctaGames}<span aria-hidden="true">{rtl ? '←' : '→'}</span></a>
            <a href="#tournaments" className="plato-ref-button plato-ref-button-secondary">{t.ctaTournaments}</a>
          </div>
          <div className="plato-ref-stats" aria-label={rtl ? 'إحصائيات المجتمع' : 'Community statistics'}>
            <div className="plato-ref-stat"><b dir="ltr">45+</b><small>{rtl ? 'لعبة' : 'Games'}</small></div>
            <div className="plato-ref-stat"><b dir="ltr">100+</b><small>{rtl ? 'بطولة' : 'Tournaments'}</small></div>
            <div className="plato-ref-stat"><b dir="ltr">50K+</b><small>{rtl ? 'لاعب' : 'Players'}</small></div>
            <div className="plato-ref-stat"><b className="plato-ref-heart" aria-hidden="true">♥</b><small>{rtl ? 'مجتمع متنامٍ' : 'Growing Community'}</small></div>
          </div>
        </div>
        <div className="plato-ref-stage" ref={stageRef} onPointerMove={(event) => {
          if (event.pointerType !== 'mouse' || !stageRef.current) return;
          const r = stageRef.current.getBoundingClientRect();
          setTilt({ x: -((event.clientY-r.top)/r.height-.5)*12, y: ((event.clientX-r.left)/r.width-.5)*12 });
        }} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="plato-ref-king" aria-hidden="true"><svg viewBox="0 0 100 160"><defs><linearGradient id="platoRefKing" x1="0" x2="1"><stop stopColor="#fffdf2"/><stop offset=".6" stopColor="#eee2c5"/><stop offset="1" stopColor="#c9b48a"/></linearGradient></defs><g fill="url(#platoRefKing)" stroke="#b3a2e6" strokeWidth="1.3"><rect x="8" y="142" width="84" height="14" rx="7"/><rect x="14" y="131" width="72" height="13" rx="6"/><path d="M39 70C41 96 32 114 20 132H80C68 114 59 96 61 70Z"/><ellipse cx="50" cy="132" rx="32" ry="6"/><path d="M41 56H59L61 70H39Z"/><ellipse cx="50" cy="70" rx="17" ry="5"/><path d="M36 28Q50 22 64 28L68 47Q50 54 32 47Z"/><ellipse cx="50" cy="52" rx="22" ry="6"/><rect x="45" y="2" width="10" height="26" rx="4"/><rect x="36" y="9" width="28" height="9" rx="4"/></g></svg></div>
          <div className="plato-ref-chip" aria-hidden="true"/><div className="plato-ref-card" aria-hidden="true">♥</div>
          <div className="plato-ref-tilt" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
            <div className="plato-ref-bob"><button ref={cubeRef} type="button" disabled={rolling} className={`plato-ref-cube${outline ? ' is-outline' : ''}`} aria-label={rtl ? 'اضغط لرمي النرد' : 'Roll the dice'} onClick={rollDice}>
              {turns.map((turn, f) => <span className="plato-ref-face" key={f} style={{ transform: `${turn} translateZ(calc(var(--dice-size) / 2))` }}>
                {Array.from({length: 9}, (_, k) => <i key={k} style={{visibility: pips[f].includes(k) ? 'visible' : 'hidden'}} />)}
              </span>)}
            </button></div>
          </div>
          {!hasRolled && <span className="plato-ref-click-hint" aria-hidden="true"><span className="plato-ref-click-hint-icon">↗</span>{rtl ? 'اضغط لرمي النرد' : 'Click to Roll'}</span>}
          <span className="sr-only" role="status" aria-live="polite">{result === null ? '' : (rtl ? `نتيجة النرد ${result}` : `Dice rolled ${result}`)}</span>
          <div className="plato-ref-shadow" aria-hidden="true"/>
        </div>
      </div>
      <a href="#news" className="plato-ref-scroll" aria-label={t.scrollDown}><span/></a>
    </section>
  );
}
