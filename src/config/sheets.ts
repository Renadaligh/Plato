/**
 * Google Sheets content source (optional).
 * Paste the "Publish to web → CSV" link of each tab here. Empty string = use the built-in sample data.
 * Link shape: https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv
 */
export const SHEETS = {
  news: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFN1UotsJvWUOtATAuKO1r34Hf8R-yBdG-22E_DiBmDMwo0jmzyiXzQwlTzMM10Q/pubhtml?gid=1476791283&single=true',
  tournaments: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFN1UotsJvWUOtATAuKO1r34Hf8R-yBdG-22E_DiBmDMwo0jmzyiXzQwlTzMM10Q/pubhtml?gid=2075438532&single=true',
  /** Apps Script web-app URL that receives registrations from the site (see sheet-template/registration-script.gs). Empty = no in-site form. */
  register: 'https://script.google.com/macros/s/AKfycbycl5KWa5JuzBdDGwZPS3shcVMkXasNE-9zARUfqJ7oZjcgsb8KikqBngB_wXIO4mKK/exec',
};
