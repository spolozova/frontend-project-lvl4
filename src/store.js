// @ts-check
import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slices/channelsSlicer.js';
import messagesReducer from './slices/messagesSlicer.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
});

export default store;
