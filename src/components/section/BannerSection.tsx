import BannerInformativeText from "../ui/BannerInformativeText";
import Carousel from "../ui/Carousel";

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