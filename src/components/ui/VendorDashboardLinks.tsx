import { Link } from "react-router-dom";
import { Button } from "./button";
import { ShoppingBag, Store, User } from "lucide-react";

const VendorDashboardLinks = ({isCollapsed}:{isCollapsed:boolean}) => {

    return (
        <div>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/my-shop">
                <Store className="mr-2 h-4 w-4" />
                {!isCollapsed && "My Store"}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {!isCollapsed && "Orders"}
              </Link>
            </Button>
            <Button
               asChild variant="ghost" className="w-full justify-start"
            >
                <Link to="/dashboard/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {!isCollapsed && "Products"}
                </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                {!isCollapsed && "Manage Profile"}
              </Link>
            </Button>
        </div>
    );
};

export default VendorDashboardLinks;