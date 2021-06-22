// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import store from './store.js';
import App from './components/App.jsx';

const init = async () => {
  const i18next = i18n.createInstance();
  await i18next
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
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
