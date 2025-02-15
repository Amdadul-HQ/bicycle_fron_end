import type React from "react"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

interface Product {
  id: string
  name: string
  price: number
  image?: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

const PaymentForm: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: "usd",
        }),
      })

      const { clientSecret } = await response.json()

      const cardElement = elements.getElement(CardElement)

      if (cardElement) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        })

        if (error) {
          setPaymentError(error.message ?? "An error occurred")
        } else if (paymentIntent.status === "succeeded") {
          console.log("Payment successful")
          onClose()
        }
      }
    } catch (err) {
      console.error("Error:", err)
      setPaymentError("An error occurred while processing your payment")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
      <Button type="submit" disabled={!stripe || isProcessing} className="mt-4 w-full">
        {isProcessing ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
      </Button>
    </form>
  )
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <PaymentForm product={product} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal

