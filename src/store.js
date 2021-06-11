// @ts-check
import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slices/channelsSlicer.js';
import messagesReducer from './slices/messagesSlicer.js';
import modalReducer from './slices/modalSlicer.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
  },
});

export default store;
