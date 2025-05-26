// import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";
import { baseApi } from "../../api/baseApi";

const storeManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStores : builder.query({
            query : () => {
                return ({
                    url:"/admin/all-store",
                    method:"GET",
                    credentials:"include"
                })
            },
            providesTags: ["store"],
        }),
    //     addProduct: builder.mutation({
    //         query: (data) => ({
    //           url: "/products/add-bicycle",
    //           method: "POST",
    //           body: data,
    //         }),
    //         invalidatesTags: ["products"],
    //     }),
    //     // All products 
    //     getAllProducts: builder.query({
    //       query: (args) => {
    //         const params = new URLSearchParams();
    //         if (args) {
    //           args.forEach((item: TQueryParam) => {
    //             params.append(item.name, item.value as string);
    //           });
    //         }
    //         return {
    //           url: "/products",
    //           method: "GET",
    //           params: params,
    //         };
    //       },
    //       providesTags: ["products"],
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       transformResponse: (response: TResponseRedux<any>) => {
    //         return {
    //           data: response.data,
    //           meta: response.meta,
    //         };
    //       },
    //     }),
    //     // delete product
    //     // delete product - changed to mutation
       approveStore : builder.mutation({
          query: (args) => {
              return( 
            {
            url: `/admin/store/${args.id}`,
            method: "PATCH",
            credentials:"include",
            body:{status:args.status}
            }
        )
            // If you need a body, you can keep it, but if not, remove this
            // body: args.data,
          },
          invalidatesTags:["store"],
        }),
    //     updateProduct:builder.mutation({
    //       query: (args) => {
            
    //         // return
    //         return({
    //           url: `/products/${args.id}`,
    //           method: "PATCH",
    //           body: args.data,
    //         })
    //       },
    //       invalidatesTags: ["products"],
    //     }),
    //     getAllOrders:builder.query({
    //       query: (args) => {
    //         const params = new URLSearchParams();
    //         if (args) {
    //           args.forEach((item: TQueryParam) => {
    //             params.append(item.name, item.value as string);
    //           });
    //         }
    //         return {
    //           url: "/orders",
    //           method: "GET",
    //           params: params,
    //         };
    //       },
    //       providesTags: ["products"],
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       transformResponse: (response: TResponseRedux<any>) => {
    //         return {
    //           data: response.data,
    //           meta: response.meta,
    //         };
    //       },
    //     }),
    //     getRevenue:builder.query({
    //       query: () => {

    //         return {
    //           url: "/orders/total/revenue",
    //           method: "GET",
    //           // params:params
    //         };
    //       },
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       transformResponse: (response: TResponseRedux<any>) => {
    //         return {
    //           data: response.data,
    //           meta: response.meta,
    //         };
    //       },
    //     })

    })
})

export const {useGetAllStoresQuery,useApproveStoreMutation} = storeManagement 

