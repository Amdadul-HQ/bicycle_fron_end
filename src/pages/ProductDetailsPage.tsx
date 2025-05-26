import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
  Phone,
  Clock,
  Shield,
  Truck,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useGetProductDetailsQuery } from "../redux/features/admin/productManagement"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { LoginForm, PaymentForm } from "../components/form/CustomerProductDetail"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentUser } from "../redux/features/auth/authSlice"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const user = useAppSelector(selectCurrentUser);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
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

  // Fetch product details using RTK Query
  const { data: productResponse, isLoading, error, isError } = useGetProductDetailsQuery({ id })

  const product = productResponse?.data

  console.log(product)

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 0)) {
      setQuantity(newQuantity)
    }
  }


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/cycles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error ? "Failed to load product details. Please try again later." : "Product not found."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Prepare images array - handle both single image and array of images
  const productImages = Array.isArray(product.image)
    ? product.image
    : product.image
      ? [product.image]
      : ["/placeholder.svg?height=600&width=600"]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/cycles" className="hover:text-primary">
              Bicycles
            </Link>
            <span>/</span>
            <Link to={`/cycles/${product.category?.toLowerCase()}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cycles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage] || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
            {/* {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=150&width=150"}
                      alt={`${product.name} ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )} */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.brand && <Badge variant="outline">{product.brand}</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">{renderStars(product.rating || 4.5)}</div>
                <span className="text-sm text-muted-foreground">
                  {product.rating || 4.5} ({product.reviewCount || 5} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? `In Stock (${product.quantity} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description || "No description available for this product."}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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

              <div className="flex gap-3">
                <Button onClick={handleBuyNow} className="w-full py-6 text-lg font-semibold" disabled={!product.inStock}>
                              <ShoppingCart className="mr-2 h-6 w-6" />
                              {product.inStock ? "Buy Now" : "Out of Stock"}
                            </Button>
                <Button variant="outline" size="icon" onClick={() => setIsWishlisted(!isWishlisted)}>
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Store Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-orange-600" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>Expert Assembly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{product.store.shopName}</h3>
                  {/* <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">{renderStars(.rating)}</div>
                    <span className="text-sm text-muted-foreground">
                      {storeData.rating} ({storeData.reviewCount} reviews)
                    </span>
                  </div> */}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">{product.store.shopAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{product.store.phone}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{storeData.email}</span>
                  </div> */}
                </div>
              </div>

              {/* <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Store Hours</h4>
                  <div className="space-y-1">
                    {Object.entries(storeData.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span>{day}:</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Services</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {storeData.services.map((service, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        {/* <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount || reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value as string}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-muted-foreground py-8">
                      No specifications available for this product.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.user}</span>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Free shipping on orders over $100</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days (additional cost)</li>
                      <li>• Local pickup available at our store</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 30-day return window</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free returns for defective items</li>
                      <li>• Return shipping costs may apply for non-defective returns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
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