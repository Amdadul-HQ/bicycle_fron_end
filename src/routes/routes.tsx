import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Homepage from "../pages/Homepage";
import { SignUpPage } from "../pages/SIgnUp";
import { LoginPage } from "../pages/Loging";
import { Dashboard } from "../layout/Dashboard";
import { Analytics } from "../features/dashboard/admin/Analytics";
import { UserManagement } from "../features/dashboard/admin/UserManagement";
import { ProductManagement } from "../features/dashboard/admin/ProductManagement";
import { OrderManagement } from "../features/dashboard/admin/OrderManagement";
import { ViewOrders } from "../features/dashboard/customer/ViewOrders";
import { ManageProfile } from "../features/dashboard/customer/ManageProfile";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        children:[
            {
                path:'/',
                element:<Homepage/>
            }
        ],
    },
    {
        path:'/signup',
        element:<SignUpPage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>,
        children:[
            {
                path:'analytics',
                element:<Analytics/>
            },
            {
                path:'users',
                element:<UserManagement/>
            },
            {
                path:'products',
                element:<ProductManagement/>
            },
            {
                path:'orders',
                element:<OrderManagement/>
            },
            // customer routes
            {
                path:'all-orders',
                element:<ViewOrders/>
            },
            {
                path:'profile',
                element:<ManageProfile/>
            }
        ]
    },
]) 

