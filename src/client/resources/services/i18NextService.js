import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './../../../../locales';

const cfg = {
    debug: false,
    fallbackLng: 'fr',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
        escapeValue: false
    },
    react: {
        wait: true
    },
    resources
};

i18next.use(LanguageDetector).init(cfg);

export { i18next as default };
