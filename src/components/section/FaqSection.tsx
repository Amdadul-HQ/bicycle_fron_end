"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bike, Search, PenToolIcon as Tool, Shield, Truck, DollarSign } from "lucide-react"
import { Input } from "../ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const faqs = [
  {
    question: "What types of bicycles do you offer?",
    answer:
      "We offer a wide range of bicycles including road bikes, mountain bikes, hybrid bikes, electric bikes, and children's bikes. Our inventory caters to all skill levels, from beginners to professional cyclists.",
    icon: Bike,
  },
  {
    question: "Do you offer bike fitting services?",
    answer:
      "Yes, we provide professional bike fitting services. Our experts will help you find the perfect fit to ensure comfort, efficiency, and prevent injuries during your rides.",
    icon: Tool,
  },
  {
    question: "What is your warranty policy?",
    answer:
      "We offer a standard 1-year warranty on all new bikes for manufacturing defects. Extended warranties are available for purchase. Specific components may have different warranty terms provided by their manufacturers.",
    icon: Shield,
  },
  {
    question: "Do you offer delivery services?",
    answer:
      "Yes, we offer delivery services within a 50-mile radius of our store. Delivery fees may apply based on distance. We also offer free in-store pickup for all online orders.",
    icon: Truck,
  },
  {
    question: "Can I trade in my old bike?",
    answer:
      "We do accept trade-ins for store credit on select bikes. The trade-in value depends on the condition and model of your bike. Please bring your bike to the store for an evaluation by our staff.",
    icon: DollarSign,
  },
]

export default function ZincFAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <section className="py-16 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-zinc-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-zinc-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        </motion.div>

        <AnimatePresence>
          {isVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-zinc-100 hover:text-zinc-300">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <faq.icon className="w-5 h-5 text-zinc-300" />
                          </motion.div>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-300 pl-11">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

