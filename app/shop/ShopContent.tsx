"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Search as SearchIcon } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { allProducts } from "@/lib/products"

const categories = ["All", "Men", "Women", "Sports"]

export default function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("search")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { addToCart } = useCart()

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  // Filter by category first
  let filteredProducts = selectedCategory === "All"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory)

  // Then filter by search query if present
  if (searchParam && searchParam.trim()) {
    const searchLower = searchParam.toLowerCase().trim()
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      (p.description && p.description.toLowerCase().includes(searchLower))
    )
  }

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {searchParam ? `Search Results for "${searchParam}"` : "Shop Premium Footwear"}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {searchParam
                ? `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} matching your search`
                : "Browse our complete collection of high-quality shoes. Find the perfect pair that matches your style and needs."
              }
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
                className={`rounded-full px-6 ${selectedCategory === category
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
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SearchIcon className="h-24 w-24 text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                {searchParam
                  ? `We couldn't find any products matching "${searchParam}". Try adjusting your search or browse all products.`
                  : "No products available in this category."
                }
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  window.history.pushState({}, '', '/shop')
                }}
                className="bg-primary hover:bg-primary/90"
              >
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-64 w-full cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
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
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
