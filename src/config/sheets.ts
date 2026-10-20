/**
 * Google Sheets content source (optional).
 * Paste the "Publish to web → CSV" link of each tab here. Empty string = use the built-in sample data.
 * Link shape: https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv
 */
export const SHEETS = {
  news: '',
  tournaments: '',
  /** Apps Script web-app URL that receives registrations from the site (see sheet-template/registration-script.gs). Empty = no in-site form. */
  register: 'https://script.google.com/macros/s/AKfycbycl5KWa5JuzBdDGwZPS3shcVMkXasNE-9zARUfqJ7oZjcgsb8KikqBngB_wXIO4mKK/exec',
};
