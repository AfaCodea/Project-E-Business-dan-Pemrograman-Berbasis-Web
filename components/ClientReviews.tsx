"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { FadeIn, StaggerContainer, fadeInItem } from "@/components/ui/motion"
import { motion } from "framer-motion"
const reviews = [
  {
    id: 1,
    name: "Muhammad Raihan Firdaus",
    text: "I'm extremely impressed with the quality and craftsmanship of my purchase from Shoes Store X Afa. The shoes are not only stylish and modern but also incredibly comfortable. The attention to detail is remarkable, and I couldn't be happier with my choice. Highly recommended for anyone looking for premium footwear!",
    rating: 5,
    image: "/images/testimonial/thor.jpg",
    background: "/images/na4.png",
  },
  {
    id: 2,
    name: "Alexander Miduk Sitanggang",
    text: "Outstanding shopping experience from start to finish! The shoes arrived exactly as described, with excellent packaging and fast delivery. The quality exceeded my expectations, and the customer service team was professional and helpful throughout the process. Shoes Store X Afa has earned a loyal customer in me.",
    rating: 5,
    image: "/images/testimonial/hulk.jpg",
    background: "/images/na5.png",
  },
  {
    id: 3,
    name: "Adrian Saputra Bawamanewi",
    text: "What sets Shoes Store X Afa apart is their commitment to quality and customer satisfaction. The shoes I purchased are beautifully designed with exceptional build quality. The customer service team was incredibly responsive and went above and beyond to ensure I was completely satisfied. A truly professional shopping experience!",
    rating: 5,
    image: "/images/testimonial/natasha.webp",
    background: "/images/na6.png",
  },
]

export default function ClientReviews() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Animated Neon Orange Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 0% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary moving glow */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.5) 0%, transparent 40%)',
            'radial-gradient(circle at 0% 100%, rgba(249, 115, 22, 0.5) 0%, transparent 40%)',
            'radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.5) 0%, transparent 40%)',
            'radial-gradient(circle at 0% 0%, rgba(249, 115, 22, 0.5) 0%, transparent 40%)',
            'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.5) 0%, transparent 40%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="left" delay={0.2} className="text-right mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-orange uppercase tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Client Reviews
          </h2>
        </FadeIn>

        <div className="relative max-w-6xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerChildren={0.2}>
            {reviews.map((review) => (
              <motion.div key={review.id} variants={fadeInItem}>
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={review.background}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-white">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="pt-8 text-center">
                      <h3 className="font-semibold text-lg mb-2">{review.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{review.text}</p>
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

