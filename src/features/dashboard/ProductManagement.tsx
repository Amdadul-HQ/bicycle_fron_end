import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: 19.99, stock: 100 },
    { id: 2, name: "Product B", price: 29.99, stock: 50 },
    { id: 3, name: "Product C", price: 39.99, stock: 75 },
  ])

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({ name: "", price: 0, stock: 0 })

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setNewProduct({ name: "", price: 0, stock: 0 })
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div className="space-y-4">
      {/*Removed h2 tag here*/}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
            />
            <Button onClick={addProduct}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteProduct(product.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

