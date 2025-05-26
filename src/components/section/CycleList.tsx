
import type React from "react"
import { useState, useMemo } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement"
import { CycleCard } from "./CycleCard"
import { Pagination } from "../ui/Pagination"
import { CustomerProductDetails } from "../form/CustomerProductDetail"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import type { IProduct } from "../../features/dashboard/vendor/ProductManagement"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Badge } from "../ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import { BICYCLE_CATEGORIES } from "../form/AddProductForm"

const ITEMS_PER_PAGE = 8

type SortOption = "price-asc" | "price-desc" | "quantity-asc" | "quantity-desc" | "name-asc" | "name-desc"

// Sidebar Filters Component
const FilterSidebar: React.FC<{
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (brands: string[]) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  showInStockOnly: boolean
  setShowInStockOnly: (show: boolean) => void
  onClearFilters: () => void
  activeFiltersCount: number
  availableCategories: string[]
  maxPrice: number
}> = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  showInStockOnly,
  setShowInStockOnly,
  onClearFilters,
  activeFiltersCount,
  availableCategories,
  maxPrice,
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="w-80 border-r border-gray-200 p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-2 block">Search</Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search cycles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Categories */}
      {availableCategories.length > 0 && (
        <>
          <Collapsible defaultOpen className="mb-6">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
              <Label className="text-sm font-medium">Categories</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <Separator className="mb-6" />
        </>
      )}

      {/* Brands */}
      
      {/* Price Range */}
      {maxPrice > 0 && (
        <>
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>
          <Separator className="mb-6" />
        </>
      )}

      {/* Stock Status */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Availability</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm">
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  )
}

// Mobile Filter Sheet
const MobileFilterSheet: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export const CycleList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("price-asc")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct>({
    _id: "",
    name: "",
    image: "",
    brand: "",
    price: 0,
    category: "Mountain",
    description: "",
    quantity: 0,
    inStock: true,
    isDeleted: false,
  })

  // RTK Query
  const { data, isLoading, error } = useGetAllProductsQuery(undefined)

  const handleViewDetailsClick = (product: IProduct) => {
    setSelectedProduct(product)
    setIsViewDetailsDialogOpen(true)
  }

  // Extract unique categories and brands from data
  const { availableCategories, maxPrice } = useMemo(() => {
    const products = data?.data || []
    const categories = [...new Set(BICYCLE_CATEGORIES.map((category) => category))].filter(Boolean)
    const brands = [...new Set(products.map((product: IProduct) => product.brand))].filter(Boolean)
    const prices = products.map((product: IProduct) => product.price)
    const max = prices.length > 0 ? Math.max(...prices) : 5000

    return {
      availableCategories: categories,
      availableBrands: brands,
      maxPrice: Math.ceil(max / 100) * 100, // Round up to nearest 100
    }
  }, [data])

  // Update price range when max price changes
  useMemo(() => {
    if (maxPrice > 0 && priceRange[1] === 5000) {
      setPriceRange([0, maxPrice])
    }
  }, [maxPrice])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchTerm) count++
    if (selectedCategories.length > 0) count++
    if (selectedBrands.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
    if (showInStockOnly) count++
    return count
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, showInStockOnly, maxPrice])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, maxPrice])
    setShowInStockOnly(false)
    setCurrentPage(1)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let products = data?.data || []

    // Filter by search term (search in name, brand, and description)
    if (searchTerm) {
      products = products.filter(
        (product: IProduct) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      products = products.filter((product: IProduct) => selectedCategories.includes(product.category))
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      products = products.filter((product: IProduct) => selectedBrands.includes(product.brand))
    }

    // Filter by price range
    products = products.filter((product: IProduct) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by stock status
    if (showInStockOnly) {
      products = products.filter((product: IProduct) => product.inStock)
    }

    // Filter out deleted products
    products = products.filter((product: IProduct) => !product.isDeleted)

    // Sort products
    products.sort((a: IProduct, b: IProduct) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "quantity-asc":
          return a.quantity - b.quantity
        case "quantity-desc":
          return b.quantity - a.quantity
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return products
  }, [data, searchTerm, selectedCategories, selectedBrands, priceRange, showInStockOnly, sortOption])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, showInStockOnly, sortOption])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading cycles...</p>
        </div>
      </div>
    )
  }

if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-xl mb-4">Error loading products</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const filterSidebar = (
    <FilterSidebar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedBrands={selectedBrands}
      setSelectedBrands={setSelectedBrands}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      showInStockOnly={showInStockOnly}
      setShowInStockOnly={setShowInStockOnly}
      onClearFilters={clearAllFilters}
      activeFiltersCount={activeFiltersCount}
      availableCategories={availableCategories}
      maxPrice={maxPrice}
    />
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{filterSidebar}</div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Our Cycles</h1>

            {/* Mobile Filter Button and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <MobileFilterSheet>{filterSidebar}</MobileFilterSheet>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="quantity-asc">Quantity: Low to High</SelectItem>
                  <SelectItem value="quantity-desc">Quantity: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {currentProducts.length} of {filteredAndSortedProducts.length} products
              {data?.data && ` (${data.data.length} total)`}
            </p>
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="outline" className="px-3 py-1">
                  Search: {searchTerm}
                  <Button variant="ghost" size="sm" className="ml-2 h-auto p-0" onClick={() => setSearchTerm("")}>
                    ×
                  </Button>
                </Badge>
              )}
              {selectedCategories.map((category) => (
                <Badge key={category} variant="outline" className="px-3 py-1">
                  Category: {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0"
                    onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="outline" className="px-3 py-1">
                  Brand: {brand}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0"
                    onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brand))}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="outline" className="px-3 py-1">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0"
                    onClick={() => setPriceRange([0, maxPrice])}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {showInStockOnly && (
                <Badge variant="outline" className="px-3 py-1">
                  In Stock Only
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0"
                    onClick={() => setShowInStockOnly(false)}
                  >
                    ×
                  </Button>
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No cycles found matching your criteria.</p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product: IProduct) => (
                  <CycleCard
                    key={product._id}
                    //@ts-expect-error ignoring this error
                    product={product}
                    onViewDetails={()=>handleViewDetailsClick(product)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {/*@ts-expect-error ignoring this error */}
          {selectedProduct && <CustomerProductDetails product={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
