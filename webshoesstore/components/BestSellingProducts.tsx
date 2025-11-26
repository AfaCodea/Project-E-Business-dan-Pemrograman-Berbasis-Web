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

export default function BestSellingProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { addToCart } = useCart()

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Best Selling Product
        </h2>

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

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeCategory === "All"
              ? products
              : products.filter(p => p.category === activeCategory)
            ).map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
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
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="link" className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}


