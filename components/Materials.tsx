"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const materialImages = [
  "/images/na1.png",
  "/images/na2.png",
  "/images/na3.png",
]

import { FadeIn, StaggerContainer, fadeInItem } from "@/components/ui/motion"
import { motion } from "framer-motion"

// ... imports ...

export default function Materials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right" delay={0.2} className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-orange uppercase tracking-wider">
                MATERIALS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Premium Materials For Quality Shoes
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Shoes Store X Afa takes pride in using only the finest materials in our footwear. From genuine leather to advanced synthetic fabrics, breathable mesh to durable rubber soles, every component is carefully selected for its quality and performance. We believe that exceptional materials are the foundation of great shoes, which is why we never compromise on quality while maintaining competitive pricing for our valued customers.
            </p>
            <Button variant="link" className="p-0 text-orange hover:text-orange/80">
              More Info <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-4" staggerChildren={0.2}>
            {materialImages.map((image, index) => (
              <motion.div key={index} variants={fadeInItem} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Shoes collection ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

