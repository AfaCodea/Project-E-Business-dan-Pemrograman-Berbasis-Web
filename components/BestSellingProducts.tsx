"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Star, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { allProducts, Product } from "@/lib/products"

const categories = ["Men", "Women"]



import { FadeIn, StaggerContainer, fadeInItem } from "@/components/ui/motion"
import { motion } from "framer-motion"
import ParticlesBackground from "@/components/ui/ParticlesBackground"
import { formatPrice } from "@/lib/utils"

// ... imports ...

export default function BestSellingProducts() {
  const [activeCategory, setActiveCategory] = useState("Men")
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const products = allProducts
    .filter((product) => product.category === activeCategory)
    .slice(0, 4)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <ParticlesBackground />
      <div className="container mx-auto px-4 relative z-10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id}>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product)
                    }}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </Button>
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
                      <span className="text-xl font-bold">{formatPrice(product.price)}</span>
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
              </div>
            ))}
          </div>
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


