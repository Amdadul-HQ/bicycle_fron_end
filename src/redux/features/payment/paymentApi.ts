import { TResponseRedux } from "../../../utils/type/commonType";
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
    getUserOrder:builder.query({
              query: () => {
                return {
                  url: "/orders/user/order",
                  method: "GET",
                };
              },
              providesTags: ["products"],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              transformResponse: (response: TResponseRedux<any>) => {
                return {
                  data: response.data,
                  meta: response.meta,
                };
              },
        }),
  }),
});

export const { useCreatePaymentIntentMutation,usePlaceOrderMutation,useGetUserOrderQuery } = paymentApi;
