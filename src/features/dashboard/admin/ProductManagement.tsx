import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { AddProductForm } from "../../../components/form/AddProductForm"
import { useGetAllProductsQuery } from "../../../redux/features/admin/productManagement"

interface IProduct {
  name: string
  image:string
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
  const { data: products } = useGetAllProductsQuery(undefined);


  return (
    <div className="space-y-4">
      {/*Removed h2 tag here*/}
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddProductDialogOpen(true)}>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <AddProductForm onSubmit={setIsAddProductDialogOpen} />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data?.map((product:IProduct, index:number) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}

