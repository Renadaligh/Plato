import type { CSSProperties } from 'react';
import { LAYERS } from '../config/artwork';
import { useI18n } from '../i18n/I18nProvider';

type Vars = CSSProperties & { [k: `--${string}`]: string | number };

/** Parallax (outer) → scroll zoom (data-art-scroll) → entrance (data-anim=art) → mirror + breathing (inner). */
export default function ArtLayers() {
  const { dir, t } = useI18n();
  const rtl = dir === 'rtl';
  return (
    <div className="absolute inset-0" role="img" aria-label={t.artAlt}>
      {LAYERS.map((l) => {
        const img: Vars = {
          '--art': `url(${l.src})`,
          '--flip': l.mirrorInLtr && !rtl ? -1 : 1,
          '--pos': rtl ? l.pos.rtl : l.pos.ltr,
          '--pos-m': rtl ? l.pos.mobileRtl : l.pos.mobileLtr,
        };
        return (
          <div key={l.id} className="art-layer" style={{ '--d': l.depth } as Vars}>
            <div data-art-scroll className="absolute inset-0">
              <div data-anim="art" className="absolute inset-0">
                <div className="art-img" style={img} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
