import { useCarousel } from "../../hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";


const bannerOffers = [
    { id: 1, title: "Summer Sale! 20% off all road bikes", image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "New Mountain Bikes in stock", image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Free shipping on orders over $500", image: "/placeholder.svg?height=400&width=400" },
  ]
const Carousel = () => {
    const { currentIndex, direction, goToNext, goToPrevious } = useCarousel(bannerOffers)
    return (
        <div className="w-full md:w-1/2 relative h-[400px] overflow-hidden rounded-lg shadow-lg">
        {bannerOffers.map((offer, index) => {
          const isActive = index === currentIndex
          const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === bannerOffers.length - 1)
          const isNext = index === currentIndex + 1 || (currentIndex === bannerOffers.length - 1 && index === 0)

          let translateClass = ""
          if (isActive) translateClass = "translate-x-0"
          else if (isPrev) translateClass = "-translate-x-full"
          else if (isNext) translateClass = "translate-x-full"
          else translateClass = direction === "right" ? "translate-x-full" : "-translate-x-full"

          return (
            <div
              key={offer.id}
              className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${translateClass}`}
            >
              <img
                src={offer.image || "/placeholder.svg"}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-bold text-center px-4 animate-fade-in-up">
                  {offer.title}
                </h2>
              </div>
            </div>
          )
        })}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
};

export default Carousel;