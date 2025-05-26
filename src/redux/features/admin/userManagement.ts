import { TQueryParam, TResponseRedux } from "../../../utils/type/commonType";
import { baseApi } from "../../api/baseApi";

const userManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: (args) => {
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item: TQueryParam) => {
                  params.append(item.name, item.value as string);
                });
              }
              return {
                url: "/admin",
                method: "GET",
                params: params,
              };
            },
            providesTags: ["users"],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
              return {
                data: response.data,
                meta: response.meta,
              };
            },
        }),
        blockUser: builder.mutation({
            query: (args) => {
             return( 
              {url: `/admin/${args.id}`,
              method: "DELETE",})
            },
            invalidatesTags:["users"],
          }),
    })
})

export const {useGetAllUserQuery,useBlockUserMutation} = userManagement