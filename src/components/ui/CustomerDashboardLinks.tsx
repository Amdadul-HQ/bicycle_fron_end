import { Link } from "react-router-dom";
import { Button } from "./button";
import { ShoppingBag, User } from "lucide-react";

const CustomerDashboardLinks = ({isCollapsed}:{isCollapsed:boolean}) => {
    return (
        <div>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/all-orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {!isCollapsed && "View Orders"}
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

export default CustomerDashboardLinks;