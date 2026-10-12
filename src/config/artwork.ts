/**
 * Hero artwork layers (back → front).
 * TODAY: a single flat illustration (temporary).
 * PRODUCTION: replace with separated transparent layers — e.g.
 *   sky+far citadel (depth 4) · mid islands & waterfalls (8) · hero + platform (14) · foreground rocks/mist (22).
 * `depth` = pointer-parallax px, `speed` = extra scroll-zoom factor. Nothing else needs to change.
 */
export interface ArtLayer {
  id: string;
  src: string;
  depth: number;
  zoom: number;          // scroll-transition scale added at the end of the hero
  /** LTR artwork is mirrored so the hero stands on the right. Set false for art already composed that way. */
  mirrorInLtr: boolean;
  pos: { ltr: string; rtl: string; mobileLtr: string; mobileRtl: string };
}

export const LAYERS: ArtLayer[] = [
  {
    id: 'scene',
    src: `${import.meta.env.BASE_URL}art/hero-scene.webp`,
    depth: 12,
    zoom: 0.12,
    mirrorInLtr: true,
    pos: { ltr: '55% 50%', rtl: '45% 50%', mobileLtr: '62% 30%', mobileRtl: '38% 30%' },
  },
];
