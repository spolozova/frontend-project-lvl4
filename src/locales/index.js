import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.js';
import ru from './ru.js';

const resources = { en, ru };

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: ['ru', 'en'],
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
  });

export default i18n;
