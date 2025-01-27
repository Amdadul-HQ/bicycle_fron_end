import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const featuredBicycles = [
    { id: 1, name: "Mountain Explorer", price: 799, image: "/placeholder.svg?height=300&width=300" },
    { id: 2, name: "City Cruiser", price: 549, image: "/placeholder.svg?height=300&width=300" },
    { id: 3, name: "Road Master", price: 1299, image: "/placeholder.svg?height=300&width=300" },
    { id: 4, name: "Electric Commuter", price: 1799, image: "/placeholder.svg?height=300&width=300" },
    { id: 5, name: "Kids' Adventure", price: 399, image: "/placeholder.svg?height=300&width=300" },
    { id: 6, name: "Folding Compact", price: 699, image: "/placeholder.svg?height=300&width=300" },
  ]

const FeatureSection = () => {
    const [hoveredBikeId, setHoveredBikeId] = useState<number | null>(null)
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Bicycles */}
      <h2 className="text-3xl font-bold mb-8">Featured Bicycles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredBicycles.slice(0, 6).map((bike) => (
          <div
            key={bike.id}
            className="relative group"
            onMouseEnter={() => setHoveredBikeId(bike.id)}
            onMouseLeave={() => setHoveredBikeId(null)}
          >
            <img
              src={bike.image || "/placeholder.svg"}
              alt={bike.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div
              className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg transition-opacity duration-300 ${
                hoveredBikeId === bike.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-white text-xl font-semibold mb-2">{bike.name}</h3>
              <p className="text-white text-lg mb-4">${bike.price}</p>
              <Button variant="secondary">View Details</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/cycles" className="inline-flex items-center">
            View All Bicycles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
    );
};

export default FeatureSection;