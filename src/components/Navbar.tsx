import { Menu, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { selectCurrentUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import NavbarProfileDropDown from "./ui/NavbarProfileDropDown"

const navItems = [
  { title: "Home", href: "/" },
  { title: "All Cycles", href: "/cycles" },
  { title: "Event", href: "/event" },
  { title: "About Us", href: "/about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const user = useAppSelector(selectCurrentUser);
  

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
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold">
          Bicycle Store
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.title} to={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.title}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex space-x-2 items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {
            !user && <>
              <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            </>
          }
          {
            user && <NavbarProfileDropDown/>
          }
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <MobileNav theme={theme} toggleTheme={toggleTheme} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

function MobileNav({ theme, toggleTheme }: { theme: "light" | "dark"; toggleTheme: () => void }) {
  return (
    <div className="flex flex-col space-y-3 mt-4">
      {navItems.map((item) => (
        <Link key={item.title} to={item.href} className="text-sm font-medium transition-colors hover:text-primary">
          {item.title}
        </Link>
      ))}
      <hr className="my-2" />
      <Button variant="ghost" size="sm" onClick={toggleTheme} className="justify-start">
        {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
        Toggle theme
      </Button>
      <Button variant="ghost" asChild className="justify-start">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild className="justify-start">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  )
}

