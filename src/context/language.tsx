import { ReactNode, createContext } from 'react';

import translations from '../i18n/translations.json';

const LanguageContext = createContext(translations.en);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    let currentLanguageTranslations = translations['en'];
    if (/es/.test(navigator.language)) {
        currentLanguageTranslations = translations['es'];
    }

    return (
        <LanguageContext.Provider value={currentLanguageTranslations}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
