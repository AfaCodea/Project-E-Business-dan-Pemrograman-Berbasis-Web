"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const materialImages = [
  "/images/na1.png",
  "/images/na2.png",
  "/images/na3.png",
]

export default function Materials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                MATERIALS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Premium Materials For Quality Shoes
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Shoes Store X Afa takes pride in using only the finest materials in our footwear. From genuine leather to advanced synthetic fabrics, breathable mesh to durable rubber soles, every component is carefully selected for its quality and performance. We believe that exceptional materials are the foundation of great shoes, which is why we never compromise on quality while maintaining competitive pricing for our valued customers.
            </p>
            <Button variant="link" className="p-0 text-primary hover:text-primary/80">
              More Info <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {materialImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Shoes collection ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

