// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import getSocketApi from './socketApi.js';
import store from './store.js';
import { SocketApiContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlicer.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlicer.js';
import App from './components/App.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default async (socketClient) => {
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

  socketClient.on('newMessage', (newMessage) => {
    store.dispatch(addMessage(newMessage));
  });

  socketClient.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });
  socketClient.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });
  socketClient.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  const socketApi = getSocketApi(socketClient);

  return (
    <Provider store={store}>
      <SocketApiContext.Provider value={socketApi}>
        <App />
      </SocketApiContext.Provider>
    </Provider>
  );
};
