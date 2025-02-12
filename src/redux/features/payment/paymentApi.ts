import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({ totalAmount }) => ({
        url: "/orders/create-payment-intent",
        method: "POST",
        body: {amount:totalAmount,currency:"usd"}
      }),
    }),
    placeOrder: builder.mutation({
        query: (data) => ({
          url: "/orders/place-order",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["products"],
        // providesTags: ["products"],
    }),
  }),
});

export const { useCreatePaymentIntentMutation,usePlaceOrderMutation } = paymentApi;
