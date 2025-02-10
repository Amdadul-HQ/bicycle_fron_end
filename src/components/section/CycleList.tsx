import type React from "react"
import { useState } from "react"
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement"
import { CycleCard } from "./CycleCard" // Import CycleCard
import { Pagination } from "../ui/Pagination"
import { CustomerProductDetails } from "../form/CustomerProductDetail"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { IProduct } from "../../features/dashboard/admin/ProductManagement"

const ITEMS_PER_PAGE = 8

export const CycleList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
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
        isDeleted: false
        })
  const { data, isLoading, error } = useGetAllProductsQuery(undefined)
  const handleViewDetailsClick = (product: IProduct) => {
        setSelectedProduct(product)
        setIsViewDetailsDialogOpen(true)
    }

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error loading products</div>

  const products = data?.data || []
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Cycles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <CycleCard key={product._id} product={product} onViewDetails={handleViewDetailsClick} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && <CustomerProductDetails product={selectedProduct} />}
          </DialogContent>
        </Dialog>
    </div>
  )
}

