import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_DOMAIN } from 'app/constants';

const CreateBaseQuery = {
  baseUrl: API_DOMAIN,
  prepareHeaders: (headers, { getState }) => {
    //const { authToken, guestToken } = getState().app;
    //if (authToken) {
    //  headers.set('x-auth-token', authToken);
    //  headers.set('x-guest-token', guestToken);
    //}
    //headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery(CreateBaseQuery),
  //tagTypes: ['Carts', 'Orders'],
  endpoints: (builder) => ({
    search: builder.mutation({
      query(body) {
        return {
          url: '/search',
          method: 'POST',
          body,
        };
      },
    }),
    select: builder.mutation({
      query(body) {
        return {
          url: '/select',
          method: 'POST',
          body,
        };
      },
    }),
    init: builder.mutation({
      query(body) {
        return {
          url: '/init',
          method: 'POST',
          body,
        };
      },
    }),
    confirm: builder.mutation({
      query(body) {
        return {
          url: '/confirm',
          method: 'POST',
          body,
        };
      },
    }),
    //getCartItems: builder.query({
    //  query: () => '/api/v2/cart_items?source=cart&platform=app&os=android',
    //  providesTags: ['Carts'],
    //}),
    //incrementOrDecrementCartItem: builder.mutation({
    //  query: (body) => ({
    //    url: '/api/v1/cart_items/increment?source=cart&platform=app&os=android',
    //    method: 'POST',
    //    body,
    //  }),
    //  invalidatesTags(result, error) {
    //    if (error) return [];
    //    return ['Carts'];
    //  },
    //  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //    dispatch(incrementOrDecrementProductFetching());
    //    try {
    //      await queryFulfilled;
    //    } catch (err) {
    //      // error handled on the api level
    //    } finally {
    //      dispatch(incrementOrDecrementProductFetched());
    //    }
    //  },
    //}),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchMutation,
  useSelectMutation,
  useInitMutation,
  useConfirmMutation,
} = api;
