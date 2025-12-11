"use client"

import { Plus, Star, ArrowRight, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { allProducts, Product } from "@/lib/products"
import { FadeIn } from "@/components/ui/motion"
import ParticlesBackground from "@/components/ui/ParticlesBackground"
import { formatPrice } from "@/lib/utils"

export default function NewProducts() {
    const { addToCart } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    // Filter products that are marked as new
    const newProducts = allProducts.filter((product) => product.isNew).slice(0, 6)

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

    if (newProducts.length === 0) {
        return null
    }

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <ParticlesBackground />
            <div className="container mx-auto px-4 relative z-10">
                <FadeIn direction="up" delay={0.1}>
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-orange" />
                        <p className="text-orange text-sm font-semibold text-center tracking-wider uppercase">
                            NEW ARRIVALS
                        </p>
                        <Sparkles className="h-5 w-5 text-orange" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
                        Fresh Off The Shelf
                    </h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Discover our latest collection of premium footwear, carefully curated for style and comfort
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newProducts.map((product, index) => (
                        <FadeIn key={product.id} direction="up" delay={0.1 + index * 0.1}>
                            <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative">
                                {/* NEW Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        NEW
                                    </div>
                                </div>

                                <Link href={`/product/${product.id}`}>
                                    <div className="relative h-64 w-full cursor-pointer overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Gradient Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </Link>

                                {/* Wishlist Button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleWishlist(product)
                                    }}
                                >
                                    <Heart
                                        className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                                            }`}
                                    />
                                </Button>

                                <CardContent className="p-5">
                                    <p className="text-sm text-orange font-semibold mb-1">{product.category}</p>
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-semibold text-lg mb-2 hover:text-orange transition-colors cursor-pointer line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                                        <Button
                                            size="icon"
                                            className="h-10 w-10 rounded-full bg-orange hover:bg-orange/90 shadow-lg shadow-orange/20"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn direction="up" delay={0.4}>
                    <div className="text-center mt-12">
                        <Link href="/shop">
                            <Button variant="link" className="text-orange hover:text-orange/80 text-lg">
                                View All Products <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
