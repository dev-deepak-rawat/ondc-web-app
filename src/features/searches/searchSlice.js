import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasSearched: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setHasSearched: (state, action) => {
      state.hasSearched = action.payload;
    },
  },
});

export const { setHasSearched } = searchSlice.actions;
export const selectHasSearched = (state) => state.search.hasSearched;
export default searchSlice.reducer;
