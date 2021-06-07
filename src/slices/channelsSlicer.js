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
  },
});

export const { fetchChannels } = channelsInfo.actions;
export default channelsInfo.reducer;
