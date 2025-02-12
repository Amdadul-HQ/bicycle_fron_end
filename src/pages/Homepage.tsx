import BannerSection from "../components/section/BannerSection";
import FeatureSection from "../components/section/FeatureSection";
import { AnimatedListDemo } from "../components/section/TestimonialsSection";
// import { Testimonials } from "../components/section/TestimonialsSection";

const Homepage = () => {
    return (
        <>
         <BannerSection/>  
         <FeatureSection/>
         {/* <Testimonials/> */}
         <AnimatedListDemo/>
        </>
    );
};

export default Homepage;