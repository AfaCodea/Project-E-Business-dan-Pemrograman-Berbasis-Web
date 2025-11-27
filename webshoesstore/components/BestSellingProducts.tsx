"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { allProducts } from "@/lib/products"

const categories = ["All", "Men", "Women", "Sports"]

// Get first 4 products for homepage display
const products = allProducts.slice(0, 4)

import { FadeIn, StaggerContainer, fadeInItem } from "@/components/ui/motion"
import { motion } from "framer-motion"

// ... imports ...

export default function BestSellingProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { addToCart } = useCart()

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn direction="up" delay={0.1}>
          <p className="text-orange text-sm font-semibold text-center tracking-wider uppercase mb-3">
            CATEGORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Best Selling Product
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 ${activeCategory === category
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </FadeIn>

        <div className="relative">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.1}>
            {(activeCategory === "All"
              ? products
              : products.filter(p => p.category === activeCategory)
            ).map((product) => (
              <motion.div key={product.id} variants={fadeInItem}>
                <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-64 w-full cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">${product.price}</span>
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-blue-900 hover:bg-blue-800"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button variant="link" className="text-orange hover:text-orange/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}


