import { createSlice } from '@reduxjs/toolkit';
import {
  filterNoiseProducts,
  getProductsFromSearchResponse,
} from 'features/lists/listHelper';

const initialState = {
  products: [],
  filteredProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state, action) => {
      state.products = action.payload ? action.payload : [];
    },
    resetFilterProducts: (state, action) => {
      state.filteredProducts = action.payload ? action.filteredProducts : [];
    },
  },
});

export const { addProducts, resetProducts, filterProducts } =
  productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export const addNewProducts =
  (payload = {}) =>
  (dispatch, getState) => {
    const { message = {} } = payload;
    if (!message) return;
    const newProducts = getProductsFromSearchResponse(payload);
    const currentProducts = selectProducts(getState());
    if (newProducts.length) {
      const filteredNewProducts = filterNoiseProducts(
        currentProducts,
        newProducts,
      );
      dispatch(resetProducts([...currentProducts, ...filteredNewProducts]));
    }
  };

export default productsSlice.reducer;
