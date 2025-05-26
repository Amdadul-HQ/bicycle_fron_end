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
  }),
})

export const { useGetStoreQuery, useUpdateStoreMutation } = vendorApi
