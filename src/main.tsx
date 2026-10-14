import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/900.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/700.css';
import '@fontsource/tajawal/800.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);

// Fade out the instant poster (index.html #boot) once the app has painted, while the hero's own entrance fades in beneath it.
const boot = document.getElementById('boot');
if (boot) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    boot.style.opacity = '0';
    window.setTimeout(() => boot.remove(), 1400);
  }));
}
