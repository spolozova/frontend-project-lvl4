import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, ...extra } = action.payload;
      return { isOpened: true, type, extra };
    },
    closeModal: () => ({ isOpened: false, type: null, extra: null }),
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
