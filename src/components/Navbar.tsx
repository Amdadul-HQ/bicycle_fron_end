/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { Menu, Sun, Moon, Search, ChevronDown, X, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Input } from "./ui/input"
import { selectCurrentUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import NavbarProfileDropDown from "./ui/NavbarProfileDropDown"
import { useGetAllProductsQuery } from "../redux/features/admin/productManagement"


type Product = {
  _id: string
  name: string
  price: number
  image: string
  category: string
  brand: string
}

const navItems = [
  { title: "Home", href: "/" },
  {
    title: "Bicycles",
    href: "/cycles",
    hasDropdown: true,
    categories: [
      {
        title: "Mountain Bikes",
        items: [
          { name: "Cross Country", href: "/cycles?category=cross-country" },
          { name: "Trail Bikes", href: "/cycles?category=trail" },
          { name: "Enduro", href: "/cycles?category=enduro" },
          { name: "Downhill", href: "/cycles?category=downhill" },
        ],
      },
      {
        title: "Road Bikes",
        items: [
          { name: "Racing Bikes", href: "/cycles?category=racing" },
          { name: "Touring Bikes", href: "/cycles?category=touring" },
          { name: "Gravel Bikes", href: "/cycles?category=gravel" },
          { name: "Time Trial", href: "/cycles?category=time-trial" },
        ],
      },
      {
        title: "Electric Bikes",
        items: [
          { name: "E-Mountain", href: "/cycles?category=mountain" },
          { name: "E-Road", href: "/cycles?category=road" },
          { name: "E-Commuter", href: "/cycles?category=commuter" },
          { name: "E-Cargo", href: "/cycles?category=cargo" },
        ],
      },
      {
        title: "Specialty",
        items: [
          { name: "BMX", href: "/cycles?category=bmx" },
          { name: "Hybrid", href: "/cycles?category=hybrid" },
          { name: "Kids Bikes", href: "/cycles?category=kids" },
          { name: "Folding Bikes", href: "/cycles?category=folding" },
        ],
      },
    ],
  },
  // {
  //   title: "Accessories",
  //   href: "/accessories",
  //   hasDropdown: true,
  //   categories: [
  //     {
  //       title: "Safety Gear",
  //       items: [
  //         { name: "Helmets", href: "/accessories/safety/helmets" },
  //         { name: "Lights", href: "/accessories/safety/lights" },
  //         { name: "Reflective Gear", href: "/accessories/safety/reflective" },
  //         { name: "Locks", href: "/accessories/safety/locks" },
  //       ],
  //     },
  //     {
  //       title: "Components",
  //       items: [
  //         { name: "Wheels & Tires", href: "/accessories/components/wheels" },
  //         { name: "Brakes", href: "/accessories/components/brakes" },
  //         { name: "Drivetrain", href: "/accessories/components/drivetrain" },
  //         { name: "Handlebars", href: "/accessories/components/handlebars" },
  //       ],
  //     },
  //     {
  //       title: "Apparel",
  //       items: [
  //         { name: "Jerseys", href: "/accessories/apparel/jerseys" },
  //         { name: "Shorts", href: "/accessories/apparel/shorts" },
  //         { name: "Gloves", href: "/accessories/apparel/gloves" },
  //         { name: "Shoes", href: "/accessories/apparel/shoes" },
  //       ],
  //     },
  //   ],
  // },
  { title: "Events", href: "/events" },
  { title: "About Us", href: "/about" },
]

// Custom hook for debounced search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function MegaNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const user = useAppSelector(selectCurrentUser)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // RTK Query for fetching products
  const searchParams = debouncedSearchQuery
    ? 
        { name: "searchTerm", value: debouncedSearchQuery }

    : []

  const {
    data: searchResults,
    isLoading: isSearchLoading,
  } = useGetAllProductsQuery(searchParams)


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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Show search results when there's a query and results
  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 2) {
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }, [debouncedSearchQuery])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
      setShowSearchResults(false)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const handleProductClick = (productId: string) => {
    setShowSearchResults(false)
    // Navigate to product page
    navigate(`/cycles/${productId}`)
  }

  return (
    <>
      <nav
        className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 w-full z-50 transition-shadow duration-200 ${isScrolled ? "shadow-md" : "shadow-sm"}`}
      >
        {/* Top Bar */}
        <div className="border-b border-border/40">
          <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto text-sm">
            <div className="text-muted-foreground">Free shipping on orders over $100</div>
            <div className="hidden md:flex items-center space-x-4 text-muted-foreground">
              <span>📞 1-800-BICYCLE</span>
              <span>📧 support@bicyclestore.com</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            🚴 Bicycle Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center text-sm font-medium transition-colors hover:text-primary py-2"
                >
                  {item.title}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.hasDropdown && activeDropdown === item.title && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-4xl bg-background border border-border rounded-lg shadow-lg mt-1 p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {item.categories?.map((category) => (
                        <div key={category.title}>
                          <h3 className="font-semibold text-sm text-foreground mb-3 border-b border-border pb-2">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  to={subItem.href}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bicycles, accessories..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                  {isSearchLoading && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm text-muted-foreground">Searching...</span>
                    </div>
                  )}

                  {searchResults?.data && searchResults.data.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs text-muted-foreground px-2 py-1 border-b border-border mb-2">
                        Found {searchResults.meta?.total || searchResults.data.length} products
                      </div>
                      {searchResults.data.map((product: Product) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-md transition-colors text-left"
                        >
                          <img
                            src={product.image || "/placeholder.svg?height=40&width=40"}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{product.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {product.brand} • {product.category}
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-primary">${product.price}</div>
                        </button>
                      ))}
                      {searchResults.data.length >= 8 && (
                        <button
                          onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                          className="w-full p-2 text-center text-sm text-primary hover:bg-muted rounded-md transition-colors border-t border-border mt-2"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      )}
                    </div>
                  )}

                  {searchResults?.data && searchResults.data.length === 0 && !isSearchLoading && (
                    <div className="p-4 text-center">
                      <span className="text-sm text-muted-foreground">No products found for "{searchQuery}"</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {!user && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {user && <NavbarProfileDropDown />}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <MobileNav
                theme={theme}
                toggleTheme={toggleTheme}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                user={user}
              />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[120px]" />
    </>
  )
}

function MobileNav({
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  handleSearch,
  user,
}: {
  theme: "light" | "dark"
  toggleTheme: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
  user: any
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-col space-y-4 mt-4">
      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </form>

      <hr className="border-border" />

      {/* Mobile Navigation Items */}
      {navItems.map((item) => (
        <div key={item.title}>
          <div className="flex items-center justify-between">
            <Link to={item.href} className="text-sm font-medium transition-colors hover:text-primary flex-1 py-2">
              {item.title}
            </Link>
            {item.hasDropdown && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedCategory(expandedCategory === item.title ? null : item.title)}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expandedCategory === item.title ? "rotate-180" : ""}`}
                />
              </Button>
            )}
          </div>

          {/* Mobile Dropdown */}
          {item.hasDropdown && expandedCategory === item.title && (
            <div className="ml-4 mt-2 space-y-3">
              {item.categories?.map((category) => (
                <div key={category.title}>
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {category.title}
                  </h4>
                  <div className="space-y-1 ml-2">
                    {category.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary py-1"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <hr className="border-border" />

      {/* Mobile Actions */}
      <Button variant="ghost" size="sm" onClick={toggleTheme} className="justify-start">
        {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
        Toggle theme
      </Button>

      {!user && (
        <>
          <Button variant="ghost" asChild className="justify-start">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="justify-start">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  )
}
