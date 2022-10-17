import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionId: '',
};

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setTransactionId: (state, action) => {
      state.transactionId = action.payload;
    },
  },
});

export const { setTransactionId } = connectionSlice.actions;
export const selectTransactionId = (state) => state.connection.transactionId;
export default connectionSlice.reducer;
