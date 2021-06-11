// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels, removeChannel } from './channelsSlicer.js';

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
      })
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages.filter((message) => message.channelId !== id);
      });
  },
});

export const { addMessage } = messagesInfo.actions;
export default messagesInfo.reducer;
