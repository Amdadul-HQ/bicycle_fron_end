import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { TResponse } from "../../utils/type/commonType";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery(
    {
    // baseUrl:"https://assigement-04-back-end.vercel.app/api/v1",
    baseUrl:"http://localhost:3000/api/v1",
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token = (getState() as RootState).auth.token;
        if(token){
            headers.set("authorization",token);
        }
        return headers;
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithRefreshToken : BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> = async (args,api, extraOption) :Promise<any> =>{
    let result = await baseQuery(args,api,extraOption) as TResponse<object>;

    if(result?.error?.status === 404){
        toast.error(result?.error?.data?.message)
    }

    if(result?.error?.status === 401){
        // * send Refresh token
        const res = await fetch(
        //   "https://assigement-04-back-end.vercel.app/api/v1/auth/refresh-token",
        "http://localhost:3000/api/v1/auth/refresh-token",
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await res.json();

        if(data?.data?.token){
            
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(setUser({user,token:data?.data?.token}));

        result = await baseQuery(args,api,extraOption) as TResponse<object>
        
        }
        else{
            api.dispatch(logOut())
        }

    }
    return result;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["products", "orders","users"],
  endpoints: () => ({}),
});