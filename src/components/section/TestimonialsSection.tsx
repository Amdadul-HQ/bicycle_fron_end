"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function FancyTestimonials() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">What people say</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover what our satisfied customers have to say about their experiences with our products/services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="group bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
                <CardContent className="p-8 relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-300" />
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
                        <Avatar className="h-14 w-14 border-2 border-white/20 relative">
                          <AvatarImage
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NWG4O7cZ41z2jVjnTeuEiOKvTYRTZ6.png"
                            alt={testimonial.name}
                          />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">{testimonial.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Small Business Owner",
    content:
      "Since integrating this solution into our workflow, we've experienced a significant improvement in efficiency and collaboration.",
  },
  {
    name: "David Patel",
    initials: "DP",
    role: "Project Manager",
    content:
      "I've tested numerous options in this category, but one stands out for its intuitive design and comprehensive functionality.",
  },
  {
    name: "Emily Carter",
    initials: "EC",
    role: "Operations Manager",
    content:
      "The tool we've adopted has surpassed our expectations, providing invaluable insights and support as our business continues to grow.",
  },
]

