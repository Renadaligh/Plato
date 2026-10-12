# Plato — Fantasy Hero Section (Phase 2)

React 18 · TypeScript · Tailwind CSS 3 · GSAP + ScrollTrigger. No other runtime dependencies.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
(Run these inside the folder that contains `package.json`.)

## Structure
- `src/components/HeroSection.tsx` – composition (art → tint → mist → scrim → particles → content → scroll veil)
- `src/components/ArtLayers.tsx` – artwork layers; reads `src/config/artwork.ts`
- `src/components/HeroContent.tsx` – label, headline, description, CTAs, divider (exact approved copy)
- `src/components/Header.tsx` – glass nav, language + theme switchers, accessible mobile menu
- `src/components/ParticleField.tsx` – drifting magical motes
- `src/hooks/useHeroMotion.ts` – GSAP entrance timeline + ScrollTrigger transition
- `src/hooks/usePointerParallax.ts` – smoothed pointer parallax (rAF, lerped)
- `src/i18n/` – EN / AR (RTL) strings; language and theme persist in localStorage
- `src/components/NextSection.tsx` – minimal placeholder so the scroll transition and nav links have real targets

## Artwork — what must be replaced for production
`public/art/hero-scene.webp` is the temporary flat illustration (mirrored in LTR so the hero stands on the right; shown unmirrored in Arabic so he stands on the left).
For true depth, deliver transparent layers and list them in `src/config/artwork.ts`:
1. sky + distant citadel (parallax depth ~4)
2. middle islands + waterfalls (~8)
3. hero + stone platform (~14), ideally composed with the hero on the right
4. foreground rocks / mist (~22)

Each layer gets its own pointer-parallax depth and scroll zoom automatically. Use WebP/AVIF, ≤ 2000px wide.
The logo in `icons.tsx` (`LogoMark`) is a placeholder — swap for the official Plato logo.

## Motion
- Entrance ≈ 2s: art reveal → header → label → staggered headline → description → buttons → divider.
- Idle: breathing art, drifting mist, particles. Mouse: art + particle parallax (fine pointers only).
- Scroll: art zooms/drifts, copy lifts and fades, veil dissolves into the next section. Native scrolling, reversible.
- `prefers-reduced-motion`: no entrance, parallax, idle or scroll effects; all content stays visible.
- Animations pause while the hero is off-screen.

## Responsive
< 768px: art on top, copy bottom-aligned over a vertical scrim, menu in a drawer. ≥ 768px: copy on the start side, art on the end side (mirrored in RTL).
