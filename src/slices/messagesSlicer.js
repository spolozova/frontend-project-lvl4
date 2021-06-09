// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlicer.js';

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const message = action.payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels, (state, action) => {
        const { messages } = action.payload;
        state.messages = [...messages];
      });
  },
});

export const { addMessage } = messagesInfo.actions;
export default messagesInfo.reducer;
