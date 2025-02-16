import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement"
import { Button } from "../../components/ui/button"
import { IProduct } from "../../features/dashboard/admin/ProductManagement"
import { Link } from "react-router-dom"

const Carousel = () => {
  const { data, isLoading, error, isError } = useGetAllProductsQuery(undefined)
  const products = data?.data || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isPaused, setIsPaused] = useState(false)

  const goToNext = useCallback(() => {
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }, [products.length])

  const goToPrevious = useCallback(() => {
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }, [products.length])

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(goToNext, 5000) // Change slide every 5 seconds
      return () => clearInterval(timer)
    }
  }, [goToNext, isPaused])

  if (isLoading) {
    return <div className="w-full h-[400px] flex items-center justify-center">Loading...</div>
  }

  if (isError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-red-500">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    )
  }

  return (
    <div
      className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {products.map((product:IProduct, index:number) => {
        const isActive = index === currentIndex
        const isPrev = index === (currentIndex - 1 + products.length) % products.length
        const isNext = index === (currentIndex + 1) % products.length

        let translateClass = ""
        if (isActive) translateClass = "translate-x-0"
        else if (isPrev) translateClass = "-translate-x-full"
        else if (isNext) translateClass = "translate-x-full"
        else translateClass = direction === "right" ? "translate-x-full" : "-translate-x-full"

        return (
          <div
            key={product._id}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${translateClass}`}
          >
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 animate-fade-in-up">
                {product.name}
              </h2>
              <p className="text-white text-sm sm:text-base md:text-lg mb-4 animate-fade-in-up delay-100">
                {product.description}
              </p>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-4 animate-fade-in-up delay-200">
                Price: ${product.price}
              </p>
              <Link to={'/cycles'}>
              <Button variant="secondary" className="animate-fade-in-up delay-300">
                Shop Now
              </Button>
              </Link>
            </div>
          </div>
        )
      })}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {products.map((_: any, index:number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

