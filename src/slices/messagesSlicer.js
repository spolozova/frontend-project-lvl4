// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlicer.js';

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels, (state, action) => {
        const { messages } = action.payload;
        state.messages = [...messages];
      });
  },
});

export default messagesInfo.reducer;
