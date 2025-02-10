import BannerInformativeText from "../ui/BannerInformativeText";
import Carousel from "../ui/Carousel";

const BannerSection = () => {
    {/* Banner Carousel */}
    return (
      <section className="container mx-auto max-w-[1260px] md:h-[calc(100vh-60px)] flex md:flex-row flex-col-reverse md:items-center md:gap-0 gap-5 md:justify-between">
        <BannerInformativeText/>
        <Carousel/>
      </section>
    );
};

export default BannerSection;