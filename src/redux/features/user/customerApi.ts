// import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";

import { baseApi } from "../../api/baseApi"

const customerAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        applyForVendor: builder.mutation({
            query:(data) => {
                return (
                    {
                        url:'/store/apply-for-store',
                        method:"POST",
                        credentials:"include",
                        body: data,
                    }
                )
            }
        }),
        getUserInfo :builder.query({
            query:() => {
                return (
                    {
                        url:'/users/me',
                        method:"GET",
                        credentials:"include"
                    }
                )
            }
        })
        // getAllUser: builder.query({
        //     query: (args) => {
        //       const params = new URLSearchParams();
        //       if (args) {
        //         args.forEach((item: TQueryParam) => {
        //           params.append(item.name, item.value as string);
        //         });
        //       }
        //       return {
        //         url: "/users",
        //         method: "GET",
        //         params: params,
        //       };
        //     },
        //     providesTags: ["users"],
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     transformResponse: (response: TResponseRedux<any>) => {
        //       return {
        //         data: response.data,
        //         meta: response.meta,
        //       };
        //     },
        // }),
        // blockUser: builder.mutation({
        //     query: (args) => {
        //      return( 
        //       {url: `/users/${args.id}`,
        //       method: "DELETE",})
        //     },
        //     invalidatesTags:["users"],
        //   }),
    })
})

export const {useApplyForVendorMutation,useGetUserInfoQuery} = customerAPi