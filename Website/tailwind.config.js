/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { display: ['"Playfair Display"', 'Tajawal', 'serif'], body: ['Poppins', 'Tajawal', 'sans-serif'] } } },
  plugins: [],
};
