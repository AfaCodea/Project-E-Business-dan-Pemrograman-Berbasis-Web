"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Premium Quality",
    description: "At Shoes Store X Afa, we are committed to delivering exceptional quality footwear. Every pair is carefully selected and crafted using premium materials, ensuring durability, comfort, and style that exceeds expectations.",
  },
  {
    title: "Affordable Price",
    description: "Experience luxury footwear without breaking the bank. We offer competitive pricing on all our premium shoe collections, making high-quality fashion accessible to everyone. Quality and affordability go hand in hand at Shoes Store X Afa.",
  },
  {
    title: "Many Choices",
    description: "Browse through our extensive collection featuring diverse styles, sizes, and designs. From casual sneakers to elegant boots, athletic shoes to formal footwear, we provide countless options to match your unique taste and lifestyle.",
  },
]

export default function WhyChoosingUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Heading */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Why Choosing Us
            </h2>
          </div>
          
          {/* Right Column - Three Cards Horizontal */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3 lg:space-y-4">
                <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 text-sm lg:text-base font-medium">
                  More Info <ArrowRight className="ml-1.5 h-3.5 w-3.5 lg:h-4 lg:w-4 inline" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

