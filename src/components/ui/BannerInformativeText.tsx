import { Link } from "react-router-dom";
import { Button } from "./button";

const BannerInformativeText = () => {
    return (
        <div className="w-full md:w-1/2 flex flex-col justify-center mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Welcome to Bicycle Store
            </h1>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Discover the perfect ride for every journey. From mountain trails to city streets, we offer a wide range
              of high-quality bicycles for all your adventures.
            </p>
            <Button asChild className="self-start">
              <Link to="/cycles">Explore Our Collection</Link>
            </Button>
          </div>
    );
};

export default BannerInformativeText;