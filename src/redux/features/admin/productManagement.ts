import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";
import { baseApi } from "../../api/baseApi";

const productManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
              url: "/products/add-bicycle",
              method: "POST",
              body: data,
              credentials:"include"
            }),
            invalidatesTags: ["products"],
        }),
        // All products 
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
              credentials:"include"
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
        // delete product
        // delete product - changed to mutation
        deleteProduct: builder.mutation({
          query: (args) => {
           return( 
            {url: `/products/${args.id}`,
            method: "DELETE",
          credentials:"include"
          })
            // If you need a body, you can keep it, but if not, remove this
            // body: args.data,
          },
          invalidatesTags:["products"],
        }),
        updateProduct:builder.mutation({
          query: (args) => {
            
            // return
            return({
              url: `/products/${args.id}`,
              method: "PATCH",
              body: args.data,
              credentials:"include"
            })
          },
          invalidatesTags: ["products"],
        }),
        getAllOrders:builder.query({
          query: (args) => {
            const params = new URLSearchParams();
            if (args) {
              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
            return {
              url: "/admin/all-order",
              method: "GET",
              params: params,
              credentials:"include"
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
        getRevenue:builder.query({
          query: () => {

            return {
              url: "/orders/total/revenue",
              method: "GET",
              credentials:"include"
              // params:params
            };
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          transformResponse: (response: TResponseRedux<any>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
        })

    })
})

export const {useAddProductMutation,useGetAllProductsQuery,useGetRevenueQuery,useDeleteProductMutation,useUpdateProductMutation,useGetAllOrdersQuery} = productManagement 

