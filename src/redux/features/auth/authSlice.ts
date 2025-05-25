import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    id:string,
    role:string,
    iat:number,
    exp:number,
    email:string,
}

type TInitialState = {
  user: null | TUser;
  token: null | string;
  hasStore:boolean
};

const initialState :TInitialState = {
    user:null,
    token:null,
    hasStore:false
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser : (state,action) =>{
            const {user,token,hasStore} = action.payload;
            state.user = user;
            state.token = token
            state.hasStore = hasStore
        },
        logOut: (state) =>{
            state.user = null;
            state.token = null;
            state.hasStore = false;
        }
    }
});

export const {setUser,logOut} =  authSlice.actions;

export const useCurrentToken = (state:RootState) => state.auth.token;

export const selectCurrentUser = (state:RootState) => state.auth.user;

export default authSlice.reducer;