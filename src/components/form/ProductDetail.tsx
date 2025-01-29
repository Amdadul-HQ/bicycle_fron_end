import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface ProductDetailsProps {
  product: {
    name: string
    image: string
    brand: string
    price: number
    category: string
    description: string
    quantity: number
    inStock: boolean
  }
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-center">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square relative w-full max-w-md mx-auto">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <InfoItem label="Brand" value={product.brand} />
          <InfoItem label="Price" value={`$${product.price.toFixed(2)}`} />
          <InfoItem label="Category" value={product.category} />
          <InfoItem label="Description" value={product.description} />
          <InfoItem label="Quantity" value={product.quantity.toString()} />
          <InfoItem label="In Stock" value={product.inStock ? "Yes" : "No"} />
        </div>
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  label: string
  value: string | number
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between">
    <strong className="text-sm sm:text-base">{label}:</strong>
    <span className="text-sm sm:text-base sm:text-right">{value}</span>
  </div>
)

