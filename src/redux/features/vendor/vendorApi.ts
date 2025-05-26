import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";
import { baseApi } from "../../api/baseApi"

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStore: builder.query({
      query: () => {
        return {
          url: "/store/my-store",
          method: "GET",
          credentials: "include",
        }
      },
      providesTags: ["store"],
    }),
    updateStore: builder.mutation({
      query: (data) => ({
        url: `/store/update-store/${data.id}`, // Fixed URL format
        method: "PATCH",
        body: data.data, // This will be FormData
        credentials: "include",
        // Don't set Content-Type header for FormData - let browser set it
      }),
      invalidatesTags: ["store"],
    }),
    getVendorOrders:builder.query({
    query: (args) => {
      const params = new URLSearchParams();
      if (args) {
        args.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
      }
      return {
        url: "/orders/venodor-store",
        method: "GET",
        params: params,
        credentials:"include"
      };
    },
    providesTags: ["orders"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transformResponse: (response: TResponseRedux<any>) => {
      return {
        data: response.data,
        meta: response.meta,
      };
    },
    }),
  }),
})

export const { useGetStoreQuery, useUpdateStoreMutation,useGetVendorOrdersQuery } = vendorApi
