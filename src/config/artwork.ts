/**
 * Hero footage. The video has no wordmark: <EliteWordmark/> draws it on top, aligned to the footage.
 * `poster` shows before playback and for reduced-motion users. All paths use BASE_URL (GitHub Pages base '/Plato/').
 */
const BASE = import.meta.env.BASE_URL;

export const HERO = {
  poster: `${BASE}art/hero-scene.webp`,
  video: { webm: `${BASE}art/hero-scene.webm`, mp4: `${BASE}art/hero-scene.mp4` },            // 2560×1440
  videoPhone: { webm: `${BASE}art/hero-scene-m.webm`, mp4: `${BASE}art/hero-scene-m.mp4` },   // 1600×900 for phones
  /** Extra scale at the end of the scroll transition into the next section. */
  zoom: 0.03,
};
