import React, { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react'
import { Button } from './button'
import { cn } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logOut, selectCurrentUser } from '../../redux/features/auth/authSlice'
import AdminDashboardLinks from './AdminDashboardLinks'
import CustomerDashboardLinks from './CustomerDashboardLinks'
import { useNavigate } from 'react-router-dom'

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const handleLogout = () =>{
      navigate('/')
      dispatch(logOut())
    }
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    }, [navigate, user])
  
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
            "mb-2 px-4 text-lg font-semibold tracking-tight transition-all duration-300 ease-in-out capitalize",
            isCollapsed && "opacity-0"
          )}>
            {user?.role} Dashboard
          </h2>
          <div className="space-y-1">
            {/* Admin routes */}
            {
              user?.role === "admin" && <AdminDashboardLinks isCollapsed={isCollapsed}/>
            }
            {/* customer routes */}
            {
              user?.role === "customer" && <CustomerDashboardLinks isCollapsed={isCollapsed}/>
            }
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
        <Button 
        variant="ghost" 
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
