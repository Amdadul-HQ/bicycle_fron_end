import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Homepage from "../pages/Homepage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        children:[
            {
                path:'/',
                element:<Homepage/>
            }
        ]
    }
]) 

