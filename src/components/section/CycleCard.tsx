import type React from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

interface CycleCardProps {
  product: any
  onViewDetails: any
}

export const CycleCard: React.FC<CycleCardProps> = ({ product, onViewDetails }) => {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-2">
            <Button onClick={()=>onViewDetails(product)} variant="secondary" className="w-full">
              View Details
            </Button>
            <Button variant="primary" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="font-bold text-lg mb-2">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

