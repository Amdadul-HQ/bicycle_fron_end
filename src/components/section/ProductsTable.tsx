
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Edit, Eye, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"

interface Product {
  _id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found</p>
        <Button className="mt-4">Add Your First Product</Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <span className="font-medium">{product.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{product.category}</Badge>
            </TableCell>
            <TableCell>${product.price?.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant={product.stock > 0 ? "default" : "destructive"}>{product.stock} in stock</Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
