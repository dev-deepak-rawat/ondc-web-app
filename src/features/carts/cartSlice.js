import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});

export const { resetCart } = cartSlice.actions;
export const selectCartItem = (state) => state.cart.cartItem;
export const setCartItem =
  (payload = {}) =>
  (dispatch) => {
    const { message = {} } = payload;
    if (!message) return;
    console.log('cartSlice', payload);
    dispatch(resetCart(payload));
  };

export default cartSlice.reducer;
