import React, { useEffect, useState } from 'react'
import { Users, ShoppingBag, ClipboardList, BarChart2, Menu, X, Moon, Sun, LogOut, User } from 'lucide-react'
import { Button } from './button'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { logOut } from '../../redux/features/auth/authSlice'



export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const dispatch = useAppDispatch();
    const handleLogout = () =>{
      dispatch(logOut())
    }
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    }, [])
  
    useEffect(() => {
      document.documentElement.classList.toggle("dark", theme === "dark")
      localStorage.setItem("theme", theme)
    }, [theme])
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

  return (
    <div className={cn(
      "relative pb-12 border-r transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64",
    )}>
      <Button
        variant="ghost"
        className="absolute right-[18px] top-2 p-2 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </Button>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className={cn(
            "mb-2 px-4 text-lg font-semibold tracking-tight transition-all duration-300 ease-in-out",
            isCollapsed && "opacity-0"
          )}>
            Admin Dashboard
          </h2>
          <div className="space-y-1">
            {/* Admin routes */}
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
                <Link to="/dashboard/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {!isCollapsed && "Products"}
                </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start"
            >
                <Link to="/dashboard/orders">
                <ClipboardList className="mr-2 h-4 w-4" />
                {!isCollapsed && "Orders"}
                </Link>
            </Button>
            {/* customer routes */}
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
        </div>
      </div>
      <div className={cn(
        "absolute bottom-4 left-4 transition-all duration-300 ease-in-out",
        isCollapsed && "left-2"
      )}>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        <Button variant="ghost"
              className="w-full"
              onClick={handleLogout}
            >
               <LogOut className="h-4 w-4" />
              {!isCollapsed && "Logout"}
            </Button>
      </div>
    </div>
  )
}
