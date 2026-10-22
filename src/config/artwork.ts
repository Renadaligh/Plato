/**
 * Hero artwork: one baked scene per theme (everything except the five floating props) plus the five props as separate layers.
 * Coordinates are in the 1672×941 space of the scene image: centre x, centre y, width, rotation (deg), float delay (s), parallax depth.
 * All paths use BASE_URL (GitHub Pages base '/Plato/').
 */
const BASE = import.meta.env.BASE_URL;

export const HERO = {
  bg: { dark: `${BASE}art/hero/bg-dark.webp`, light: `${BASE}art/hero/bg-light.webp` },
  w: 1672,
  h: 941,
  /** Extra scale at the end of the scroll transition into the next section. */
  zoom: 0.03,
  props: [
    { id: 'king', x: 890, y: 295, w: 180, r: 0, d: 0.6, k: 16 },
    { id: 'dice', x: 1170, y: 375, w: 400, r: 0, d: 0, k: 26 },
    { id: 'pawn', x: 848, y: 488, w: 125, r: 0, d: 2.4, k: 20 },
    { id: 'chip', x: 1365, y: 535, w: 152, r: 0, d: 0.2, k: 22 },
    { id: 'card', x: 1528, y: 208, w: 168, r: 8, d: 1.4, k: 18 },
  ].map((p) => ({ ...p, src: `${BASE}art/hero/${p.id}.webp` })),
  /** Small twinkles inside the scene (x, y in scene space, size px, delay s). */
  sparks: [[760, 150, 7, 0], [980, 90, 5, 1.1], [1480, 90, 6, 0.5], [1600, 380, 5, 1.8], [700, 420, 6, 2.2], [1290, 650, 5, 0.9], [1100, 700, 7, 1.5], [560, 300, 5, 0.3], [1520, 600, 6, 2.6], [900, 640, 5, 1.3]] as [number, number, number, number][],
};
