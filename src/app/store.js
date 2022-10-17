import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'app/api';
import connectionReducer from 'features/webSockets/connectionSlice';
import searchReducer from 'features/searches/searchSlice';
import productsReducer from 'features/lists/productsSlice';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    search: searchReducer,
    products: productsReducer,
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
