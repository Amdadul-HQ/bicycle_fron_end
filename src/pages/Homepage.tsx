import BannerSection from "../components/section/BannerSection";
import ZincFAQSection from "../components/section/FaqSection";
import FeatureSection from "../components/section/FeatureSection";
import FancyTestimonials from "../components/section/TestimonialsSection";
// import { Testimonials } from "../components/section/TestimonialsSection";

const Homepage = () => {
    return (
        <>
         <BannerSection/>  
         <FeatureSection/>
         <FancyTestimonials/>
         <ZincFAQSection/>
        </>
    );
};

export default Homepage;