import { Button } from './button';
import { Link } from 'react-router-dom';
import { BarChart2, Store, Users } from 'lucide-react';

const AdminDashboardLinks = ({isCollapsed}:{isCollapsed:boolean}) => {
    return (
        <div>
            <Button
               asChild variant="ghost" className="w-full justify-start"
            >
                <Link to='/dashboard/analytics'>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    {!isCollapsed && "Analytics"}
                </Link>
            </Button>
            <Button
               asChild variant="ghost" className="w-full justify-start"
            >
                <Link to="/dashboard/users">
                    <Users className="mr-2 h-4 w-4" />
                    {!isCollapsed && "Users"}
                </Link>
            </Button>
            <Button
               asChild variant="ghost" className="w-full justify-start"
            >
                <Link to="/dashboard/stores">
                    <Store className="mr-2 h-4 w-4" />
                    {!isCollapsed && "Stores"}
                </Link>
            </Button>
        </div>
    );
};

export default AdminDashboardLinks;