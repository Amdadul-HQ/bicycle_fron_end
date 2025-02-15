"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement"
import { CycleCard } from "./CycleCard"
import { Pagination } from "../ui/Pagination"
import { CustomerProductDetails } from "../form/CustomerProductDetail"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import type { IProduct } from "../../features/dashboard/admin/ProductManagement"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const ITEMS_PER_PAGE = 8

type SortOption = "price-asc" | "price-desc" | "quantity-asc" | "quantity-desc"

export const CycleList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("price-asc")
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
  const { data, isLoading, error } = useGetAllProductsQuery(undefined)

  const handleViewDetailsClick = (product: IProduct) => {
    setSelectedProduct(product)
    setIsViewDetailsDialogOpen(true)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let products = data?.data || []

    // Filter by search term
    products = products.filter((product:IProduct) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by inStock
    if (showInStockOnly) {
      products = products.filter((product:IProduct) => product.inStock)
    }

    // Sort products
    products.sort((a:IProduct, b:IProduct) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "quantity-asc":
          return a.quantity - b.quantity
        case "quantity-desc":
          return b.quantity - a.quantity
        default:
          return 0
      }
    })

    return products
  }, [data, searchTerm, sortOption, showInStockOnly])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error loading products</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Cycles</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search cycles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="quantity-asc">Quantity: Low to High</SelectItem>
            <SelectItem value="quantity-desc">Quantity: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={showInStockOnly ? "instock" : "all"}
          onValueChange={(value) => setShowInStockOnly(value === "instock")}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="instock">In Stock Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredAndSortedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No cycles found matching your criteria.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product:IProduct) => (
              //@ts-expect-error ignoring this error
              <CycleCard key={product._id} product={product} onViewDetails={handleViewDetailsClick} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
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

