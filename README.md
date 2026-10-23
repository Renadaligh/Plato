# Plato AR

الموقع الرسمي لمجتمع Plato AR (Plato | بالعربية) — منصة ألعاب وبطولات.
React 18 · TypeScript · Tailwind CSS 3 · GSAP. عربي/إنجليزي (RTL).

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # type-check + production build (dist/)
```

## البنية
- `src/components/` — أقسام الصفحة (Hero، الأخبار، الألعاب، البطولات، …) ونموذج التسجيل.
- `src/i18n/translations.ts` — نصوص EN / AR (المفاتيح متطابقة في اللغتين).
- `src/config/site.ts` — قائمة التنقل واسم الموقع (`BRAND`).
- `src/config/sheets.ts` — روابط Google Sheets (الأخبار، البطولات، التسجيل).
- `src/data/` — بيانات تجريبية تظهر إذا لم تُربط الجداول.
- `sheet-template/` — قالب الجدول وسكربت التسجيل (انظر `README-ar.md`).

## النشر
- GitHub Pages: `.github/workflows/deploy.yml` (المسار `/Plato/` يُضبط في `vite.config.ts`).
- Cloudflare Pages: Build command `npm run build` · Output `dist`.
