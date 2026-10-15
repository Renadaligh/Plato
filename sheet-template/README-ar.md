# ربط الأخبار والبطولات بـ Google Sheets

## 1) جهّز الجدول
1. ارفع `plato-content-template.xlsx` على Google Drive وافتحه بـ Google Sheets (File ← Save as Google Sheets).
2. تبويب `news` للأخبار، وتبويب `tournaments` للبطولات. لا تغيّر أسماء الأعمدة (الصف الأول).
3. اترك التواريخ كنص بالصيغة: `2026-11-20 18:00` (يُقرأ بتوقيت الرياض).

## 2) انشر كل تبويب
File ← Share ← Publish to web ← اختر التبويب ← **Comma-separated values (.csv)** ← Publish.
انسخ الرابط (لكل تبويب رابط).

## 3) الصق الرابط في الموقع
افتح `src/config/sheets.ts` وحط الرابطين:
```ts
export const SHEETS = {
  news: 'https://docs.google.com/spreadsheets/d/e/....&output=csv',
  tournaments: 'https://docs.google.com/spreadsheets/d/e/....&output=csv',
};
```
ارفع على GitHub مرة وحدة. بعدها أي تعديل في الجدول يظهر في الموقع خلال دقائق بدون رفع.
اترك الرابط فارغاً `''` ويرجع الموقع للبيانات التجريبية.

## الأعمدة
**news**: id، date (YYYY-MM-DD)، tag (update / tournament / community / event)، title_ar، title_en، summary_ar، summary_en، image (اختياري)، link (اختياري)، published.

**tournaments**: id، game (من تبويب games-ids)، name_ar/en، format_ar/en، starts_at، ends_at، prize_ar/en، filled، total، register_url، winner_ar/en (للمنتهية)، published.

## ملاحظات
- `published` = FALSE يخفي الصف (مسودة).
- حالة البطولة (قادمة / مباشرة / منتهية) تنحسب من التواريخ تلقائياً.
- زر التسجيل يظهر للبطولة القادمة اللي فيها `register_url` وفيها أماكن فاضية. الرابط من Google Forms.
- صف فيه تاريخ أو عنوان ناقص يتجاهله الموقع بدل ما يخرّب الصفحة.
- الصور: رابط كامل `https://...` أو مسار داخل `public/` مثل `/news/a.webp`.
- الجدول المنشور يقدر يشوفه أي أحد معه الرابط، لا تحط فيه بيانات خاصة. ردود نموذج التسجيل تبقى في ملف منفصل غير منشور.
