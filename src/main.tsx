import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// Run translation validation in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/translationValidation').then(({ logTranslationValidation }) => {
    // Run validation after i18n is initialized
    setTimeout(() => {
      logTranslationValidation();
    }, 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
