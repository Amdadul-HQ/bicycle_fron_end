import type React from "react"
import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Input } from "../../../components/ui/input"
import { AddProductForm } from "../../../components/form/AddProductForm"
import { useDeleteProductMutation } from "../../../redux/features/admin/productManagement"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../../components/ui/alert-dialog"
import { UpdateProductForm } from "../../../components/form/UpdateProductForm"
import { ProductDetails } from "../../../components/form/ProductDetail"
import { toast } from "sonner"
import { useGetVendorProductQuery } from "../../../redux/features/vendor/vendorApi"

export interface IProduct {
  _id: string
  name: string
  image: string
  brand: string
  price: number
  category: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric"
  description: string
  quantity: number
  inStock: boolean
  isDeleted: boolean
}

export const ProductManagement: React.FC = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [isUpdateProductDialogOpen, setIsUpdateProductDialogOpen] = useState(false)
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState('')
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
  const [searchTerm, setSearchTerm] = useState("")

  const { data: products } = useGetVendorProductQuery(searchTerm)
  const [deleteProduct] = useDeleteProductMutation()

  const handleUpdateClick = (product: IProduct) => {
    setSelectedProduct(product)
    setIsUpdateProductDialogOpen(true)
  }

  const handleViewDetailsClick = (product: IProduct) => {
    setSelectedProduct(product)
    setIsViewDetailsDialogOpen(true)
  }

  const handleDeleteClick = (id:string) => {
    setSelectedProductId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedProduct) {
      const res = await deleteProduct({id:selectedProductId})
      setIsDeleteDialogOpen(false)
      if(res.data.success){
        setIsSuccessDialogOpen(true)
        toast.success("Product Deleted Successfully!!")
      }
    }
  }

  const filteredProducts = useMemo(() => {
    return products?.data?.filter(
      (product: IProduct) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [products?.data, searchTerm])

  console.log(products)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddProductDialogOpen(true)}>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <AddProductForm onSubmit={() => setIsAddProductDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isUpdateProductDialogOpen} onOpenChange={setIsUpdateProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <UpdateProductForm product={selectedProduct} onSubmit={setIsUpdateProductDialogOpen} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <p>The product has been successfully deleted.</p>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product: IProduct) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewDetailsClick(product)}
                    >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateClick(product)}
                    >
                    Update
                  </Button>
                  <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteClick(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

