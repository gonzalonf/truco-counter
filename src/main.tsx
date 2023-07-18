import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './utils/screen-lock.ts';
import './index.css';
// import translationsObj from './i18n/translations.json';

// const lang = navigator.language;
// let translations = translationsObj[en];
// if (/^es/.test(lang)) {
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);