import { baseApi } from "../../api/baseApi";

const productManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
              url: "/products/add-bicycle",
              method: "POST",
              body: data,
            }),
          }),
    })
})

export const {useAddProductMutation} = productManagement 

