import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useLoginMutation } from "../../redux/features/auth/authApi"
import { verifyToken } from "../../utils/function/verifyToken"
import { selectCurrentUser, setUser, TUser } from "../../redux/features/auth/authSlice"
import { useCreatePaymentIntentMutation, usePlaceOrderMutation } from "../../redux/features/payment/paymentApi"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

interface ProductDetailsProps {
  product: {
    [x: string]: string
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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().default(false),
})

export const LoginForm: React.FC<{ onLoginSuccess: () => void,onClose:()=>void }> = ({ onLoginSuccess,onClose }) => {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const toastId = toast.loading("Logging in...")
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.token) as TUser
      dispatch(setUser({ user, token: res.data.token }))
      toast.success("Login Successful", { id: toastId, duration: 2000 })
      onLoginSuccess()
      onClose()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId, duration: 2000 })
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  )
}

export const PaymentForm: React.FC<{
  product: ProductDetailsProps["product"]
  onClose: () => void
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
}> = ({ product, onClose, quantity, setQuantity }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [createPaymentIntent] = useCreatePaymentIntentMutation()
  const[placeOrder] = usePlaceOrderMutation()
  const user = useAppSelector(selectCurrentUser);
  console.log(product);

  const totalAmount = product.price * quantity

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
     
      const response = await createPaymentIntent({totalAmount})

      const clientSecret  = await response?.data?.data?.client_secret

      console.log(clientSecret);
      // console.log(response.data.data);

      const cardElement = elements.getElement(CardElement)

      const orderInfo = {
        email:user?.email,
        product:product._id,
        quantity:quantity,
        totalPrice: product.price * quantity
      }

      if (cardElement) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        })

        if (error) {
          setPaymentError(error.message ?? "An error occurred")
        } else if (paymentIntent.status === "succeeded") {
          await placeOrder(orderInfo)
          toast.success("Payment successful")
          onClose()
          // Here you would typically update your backend about the successful purchase
        }
      }
    } catch (err) {
      console.error("Error:", err)
      setPaymentError("An error occurred while processing your payment")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button type="button" size="icon" variant="outline" onClick={() => handleQuantityChange(quantity - 1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value))}
            className="w-16 text-center"
          />
          <Button type="button" size="icon" variant="outline" onClick={() => handleQuantityChange(quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="font-semibold">Total: ${totalAmount}</p>
      </div>
      <CardElement className="mt-4" />
      {paymentError && <div className="text-red-500">{paymentError}</div>}
      <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
        {isProcessing ? "Processing..." : `Pay $${totalAmount}`}
      </Button>
    </form>
  )
}

const LoginModal: React.FC<{ onClose: () => void; onLoginSuccess: () => void }> = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate()

  const handleCreateAccount = () => {
    navigate("/signup") // Adjust this path as needed
    onClose()
  }

  return (
    <div className="space-y-4">
      <LoginForm onClose={onClose} onLoginSuccess={onLoginSuccess} />
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Button variant="link" className="p-0" onClick={handleCreateAccount}>
          Create an account
        </Button>
      </p>
    </div>
  )
}

export const CustomerProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const user = useAppSelector(selectCurrentUser);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isAuthenticated, setIsAuthenticated] = useState(user?.role === "customer" ? true :false)
  const handleBuyNow = () => {
    if(user?.role){
      setIsPaymentModalOpen(true)
      setIsAuthenticated(true)
    }
    else{
      setIsPaymentModalOpen(true)
    }
  }

  const handleLoginSuccess = () => {
      setIsAuthenticated(true)
  }

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
          <InfoItem label="Price" value={`$${product.price}`} />
          <InfoItem label="Category" value={product.category} />
          <InfoItem label="Description" value={product.description} />
          <InfoItem label="Quantity" value={product.quantity} />
          <InfoItem label="In Stock" value={product.inStock ? "Yes" : "No"} />
          <div className="pt-4">
            <Button onClick={handleBuyNow} className="w-full py-6 text-lg font-semibold" disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-6 w-6" />
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </CardContent>
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAuthenticated ? "Complete Your Purchase" : "Login Required"}</DialogTitle>
          </DialogHeader>
          {isAuthenticated && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                product={product}
                onClose={() => setIsPaymentModalOpen(false)}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </Elements>
          )  
        }
        {
          !isAuthenticated && <LoginModal onClose={() => setIsPaymentModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
        }
            
        </DialogContent>
      </Dialog>
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

