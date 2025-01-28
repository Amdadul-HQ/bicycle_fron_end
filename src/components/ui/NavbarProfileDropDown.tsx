import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const NavbarProfileDropDown = () => {
    const dispatch = useAppDispatch();
      const handleLogout = () =>{
            dispatch(logOut())
        }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg"  />
                  <AvatarFallback>
                    {/* {user?.name.charAt(0)} */}
                    </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {/* {user?.name} */}
                    </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {/* {user?.email} */}
                    </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='/dashboard'>
                 Go to Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={handleLogout}
              >Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    );
};

export default NavbarProfileDropDown;