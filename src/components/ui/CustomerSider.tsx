import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { LogOut, Moon, ShoppingBag, Sun, User } from "lucide-react"
import { useEffect, useState } from "react"

export const CustomerSidebar: React.FC = () => {
//   const { logout } = useAuth()
  const [theme, setTheme] = useState<"light" | "dark">("light")
    
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
    <div className="pb-12 w-64 border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Customer Dashboard</h2>
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Manage Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button variant="ghost" 
        // onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

