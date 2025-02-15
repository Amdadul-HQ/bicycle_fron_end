"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentUser } from "../../redux/features/auth/authSlice"
import { LoginForm, PaymentForm } from "../form/CustomerProductDetail"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

interface Product {
  id: string
  name: string
  price: number
  image?: string
  brand: string
  category: string
  description: string
  quantity: number
  inStock: boolean
}

interface CycleCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export const CycleCard: React.FC<CycleCardProps> = ({ product, onViewDetails }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const user = useAppSelector(selectCurrentUser)
  const [isAuthenticated, setIsAuthenticated] = useState(user?.role === "customer")
  const navigate = useNavigate()

  const handleBuyNow = () => {
    if (user?.role) {
      setIsPaymentModalOpen(true)
      setIsAuthenticated(true)
    } else {
      setIsPaymentModalOpen(true)
    }
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleCreateAccount = () => {
    navigate("/signup")
    setIsPaymentModalOpen(false)
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-2">
            <Button onClick={() => onViewDetails(product)} variant="secondary" className="w-full">
              View Details
            </Button>
            <Button onClick={handleBuyNow} variant="default" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="font-bold text-lg mb-2">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </CardContent>
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAuthenticated ? "Complete Your Purchase" : "Login Required"}</DialogTitle>
          </DialogHeader>
          {isAuthenticated ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                product={product}
                onClose={() => setIsPaymentModalOpen(false)}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </Elements>
          ) : (
            <div className="space-y-4">
              <LoginForm onLoginSuccess={handleLoginSuccess} onClose={() => setIsPaymentModalOpen(false)} />
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Button variant="link" className="p-0" onClick={handleCreateAccount}>
                  Create an account
                </Button>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

