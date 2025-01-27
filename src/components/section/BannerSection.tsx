import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "../../hooks/useCarousel";
import BannerInformativeText from "../ui/BannerInformativeText";
import Carousel from "../ui/Carousel";

const bannerOffers = [
    { id: 1, title: "Summer Sale! 20% off all road bikes", image: "https://staranddaisy.in/wp-content/uploads/2022/11/skillmax20in9123_maingrey.jpg" },
    { id: 2, title: "New Mountain Bikes in stock", image: "/placeholder.svg?height=400&width=800" },
    { id: 3, title: "Free shipping on orders over $500", image: "/placeholder.svg?height=400&width=800" },
  ]
  

  
  const testimonials = [
    { id: 1, name: "Sarah L.", text: "The City Cruiser is perfect for my daily commute. Comfortable and stylish!" },
    { id: 2, name: "Mike T.", text: "I've tackled the toughest trails with my Mountain Explorer. Couldn't be happier!" },
    {
      id: 3,
      name: "Emma R.",
      text: "The customer service at Bicycle Store is top-notch. They helped me find the perfect bike for my needs.",
    },
  ]
const BannerSection = () => {
    {/* Banner Carousel */}
    return (
      <section className="container mx-auto max-w-[1260px] flex items-center justify-between">
        <BannerInformativeText/>
        <Carousel/>
      </section>
    );
};

export default BannerSection;