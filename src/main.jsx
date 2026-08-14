import { StrictMode } from 'react';
console.log("Force Cache Bust v3");
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
