import type React from "react"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
 const AboutUs: React.FC = () => {
  return (
    <section className="py-16 container mx-auto max-w-7xl ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About CycleMaster</h2>
            <p className="text-lg">
              At CycleMaster, we're passionate about bringing the joy of cycling to everyone. Our mission is to provide
              world-class bicycles at the most affordable prices in town, making the thrill of the ride accessible to
              all.
            </p>
            <p className="text-lg ">
              With years of experience and a deep love for cycling, we've curated a selection of top-quality bikes for
              every type of rider - from casual city cyclists to hardcore mountain bikers and sleek road racers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="">
                  <CardContent className="flex items-center p-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium">{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="/maxresdefault.jpg"
              alt="Cycling enthusiasts"
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary dark:bg-white text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-2xl font-bold dark:text-black">20+ Years</p>
              <p className="dark:text-black">of cycling expertise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  "World-class bicycle brands",
  "Affordable prices",
  "Expert advice",
  "Wide range of accessories",
  "Professional bike fitting",
  "Excellent customer service",
]
export default AboutUs


