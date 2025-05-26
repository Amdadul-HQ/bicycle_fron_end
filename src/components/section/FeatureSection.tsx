import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement";
import { IProduct } from "../../features/dashboard/vendor/ProductManagement";
import { Dialog, DialogContent, DialogTitle,DialogHeader } from "../ui/dialog";
import { CustomerProductDetails } from "../form/CustomerProductDetail";



const FeatureSection = () => {
    const [hoveredBikeId, setHoveredBikeId] = useState<number | null>(null)
    const { data, isLoading, error, isError } = useGetAllProductsQuery(undefined)
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
    const handleViewDetailsClick = (product: IProduct) => {
      setSelectedProduct(product)
      setIsViewDetailsDialogOpen(true)
    }
    if (isLoading) {
      return <div className="w-full h-[400px] flex items-center justify-center">Loading...</div>
    }
  
    if (isError) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-red-500">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </div>
      )
    }
    const products = data?.data || []
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Bicycles */}
          <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Product Details</DialogTitle>
              </DialogHeader>
              {/* @ts-expect-error ignoring this error */}
              {selectedProduct && <CustomerProductDetails product={selectedProduct} />}
            </DialogContent>
          </Dialog>
      <h2 className="text-3xl font-bold mb-8">Featured Bicycles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, 6).map((bike:IProduct,index:number) => (
          <div
            key={bike._id}
            className="relative group"
            onMouseEnter={() => setHoveredBikeId(index)}
            onMouseLeave={() => setHoveredBikeId(null)}
          >
            <img
              src={bike.image || "/placeholder.svg"}
              alt={bike.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div
              className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg transition-opacity duration-300 ${
                hoveredBikeId === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-white text-xl font-semibold mb-2">{bike.name}</h3>
              <p className="text-white text-lg mb-4">${bike.price}</p>
              <Button onClick={()=>handleViewDetailsClick(bike)} variant="secondary">View Details</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/cycles" className="inline-flex items-center">
            View All Bicycles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
    );
};

export default FeatureSection;