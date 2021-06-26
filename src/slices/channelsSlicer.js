/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsInfo = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    fetchChannels: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      return { channels, currentChannelId };
    },
    setCurrentChannel: (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    addChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels.push(channel);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const renamingChannel = state.channels.find((c) => c.id === id);
      renamingChannel.name = name;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = state.channels[0].id;
    },
  },
});

export const {
  fetchChannels,
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsInfo.actions;
export default channelsInfo.reducer;
