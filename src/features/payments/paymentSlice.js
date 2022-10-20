import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: {},
};

export const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = PaymentSlice.actions;
export const selectPaymentOrder = (state) => state.payment.order;
export const setPaymentOrder =
  (payload = {}) =>
  (dispatch) => {
    if (!payload.message) return;
    console.log('paymentSlice', payload);
    dispatch(setOrder(payload));
  };
export default PaymentSlice.reducer;
