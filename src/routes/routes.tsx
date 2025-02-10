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
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { ErrorPage } from "../pages/ErrorPage";
import { PrivateRoute } from "./PrivateRoutes";
import AllCycles from "../pages/AllCycles";
import AboutUs from "../pages/AboutUs";
import { Events } from "../pages/Events";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/',
                element:<Homepage/>
            },
            {
                path:'cycles',
                element:<AllCycles/>
            },
            {
                path:'about',
                element:<AboutUs/>
            },
            {
                path:'/event',
                element:<Events/>
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
        path:'/unauthorize',
        element:<UnauthorizedPage/>
    },
    {
        path:'/dashboard',
        element:(
            <PrivateRoute allowedRoles={["admin","customer"]}>
                <Dashboard/>
            </PrivateRoute>
        ),
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'analytics',
                element:(
                    <PrivateRoute allowedRoles={["admin"]}>
                        <Analytics/>
                    </PrivateRoute>
                )
            },
            {
                path:'users',
                element:(
                    <PrivateRoute allowedRoles={["admin"]}>
                        <UserManagement/>
                    </PrivateRoute>)
            },
            {
                path:'products',
                element:(
                    <PrivateRoute allowedRoles={["admin"]}>
                        <ProductManagement/>
                    </PrivateRoute>
                )
            },
            {
                path:'orders',
                element:(
                    <PrivateRoute allowedRoles={["admin"]}>
                        <OrderManagement/>
                    </PrivateRoute>
                )
            },
            // customer routes
            {
                path:'all-orders',
                element:(
                    <PrivateRoute allowedRoles={["customer"]}>
                        <ViewOrders/>
                    </PrivateRoute>
                )
            },
            {
                path:'profile',
                element:(
                    <PrivateRoute allowedRoles={["customer"]}>
                        <ManageProfile/>
                    </PrivateRoute>
                )
            }
        ]
    },
]) 

