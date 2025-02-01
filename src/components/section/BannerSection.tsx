import BannerInformativeText from "../ui/BannerInformativeText";
import Carousel from "../ui/Carousel";

const BannerSection = () => {
    {/* Banner Carousel */}
    return (
      <section className="container mx-auto max-w-[1260px] h-[calc(100vh-60px)] flex items-center justify-between">
        <BannerInformativeText/>
        <Carousel/>
      </section>
    );
};

export default BannerSection;