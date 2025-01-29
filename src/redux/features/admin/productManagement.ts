import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";
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
        getAllProducts: builder.query({
          query: (args) => {
            const params = new URLSearchParams();
            if (args) {
              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
            return {
              url: "/products",
              method: "GET",
              params: params,
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
    })
})

export const {useAddProductMutation,useGetAllProductsQuery} = productManagement 

