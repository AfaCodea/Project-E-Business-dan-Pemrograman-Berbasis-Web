"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const allProducts = [
  // Men's Products
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Men",
    price: 129,
    rating: 5,
    image: "/images/men/men1.png",
  },
  {
    id: 2,
    name: "Premium Leather Boots",
    category: "Men",
    price: 199,
    rating: 5,
    image: "/images/men/men2.png",
  },
  {
    id: 5,
    name: "Urban Street Sneakers",
    category: "Men",
    price: 119,
    rating: 5,
    image: "/images/men/men3.png",
  },
  {
    id: 6,
    name: "Elegant Dress Boots",
    category: "Men",
    price: 219,
    rating: 5,
    image: "/images/men/men4.png",
  },
  {
    id: 9,
    name: "Casual Men's Loafers",
    category: "Men",
    price: 149,
    rating: 5,
    image: "/images/men/men5.png",
  },
  {
    id: 10,
    name: "Formal Men's Oxford",
    category: "Men",
    price: 189,
    rating: 5,
    image: "/images/men/men6.png",
  },
  // Women's Products
  {
    id: 3,
    name: "Fashionable Women Shoes",
    category: "Women",
    price: 89,
    rating: 5,
    image: "/images/women/women1.png",
  },
  {
    id: 7,
    name: "Stylish Women Heels",
    category: "Women",
    price: 99,
    rating: 5,
    image: "/images/women/women2.png",
  },
  {
    id: 11,
    name: "Elegant Women Boots",
    category: "Women",
    price: 139,
    rating: 5,
    image: "/images/women/women3.png",
  },
  {
    id: 12,
    name: "Comfort Women Flats",
    category: "Women",
    price: 79,
    rating: 5,
    image: "/images/women/women4.png",
  },
  {
    id: 13,
    name: "Designer Women Sandals",
    category: "Women",
    price: 109,
    rating: 5,
    image: "/images/women/women5.png",
  },
  // Sports Products
  {
    id: 4,
    name: "Running Sport Shoes",
    category: "Sports",
    price: 149,
    rating: 5,
    image: "/images/sports/sports1.png",
  },
  {
    id: 8,
    name: "Professional Athletic Shoes",
    category: "Sports",
    price: 159,
    rating: 5,
    image: "/images/sports/sports2.png",
  },
  {
    id: 14,
    name: "Training Sports Shoes",
    category: "Sports",
    price: 139,
    rating: 5,
    image: "/images/sports/sports3.png",
  },
  {
    id: 15,
    name: "Basketball Sports Shoes",
    category: "Sports",
    price: 169,
    rating: 5,
    image: "/images/sports/sports4.png",
  },
]

const categories = ["All", "Men", "Women", "Sports"]

export default function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Shop Premium Footwear
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Browse our complete collection of high-quality shoes. Find the perfect pair that matches your style and needs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                    <Button className="bg-primary hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

