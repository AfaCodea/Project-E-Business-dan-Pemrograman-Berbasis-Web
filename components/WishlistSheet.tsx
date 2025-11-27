"use client"

import { useState } from "react"
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function WishlistSheet({ children }: { children: React.ReactNode }) {
    const { items, removeFromWishlist, totalItems } = useWishlist()
    const { addToCart } = useCart()
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleAddToCart = (product: any) => {
        addToCart(product)
        removeFromWishlist(product.id)
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">
                        Wishlist ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col h-full">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                            <Heart className="h-24 w-24 text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Your wishlist is empty
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Save items you love for later
                            </p>
                            <SheetTrigger asChild>
                                <Button asChild>
                                    <Link href="/shop">Explore Products</Link>
                                </Button>
                            </SheetTrigger>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto -mx-6 px-6">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 py-4 border-b border-gray-200"
                                    >
                                        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {item.category}
                                                    </p>
                                                    <p className="font-bold text-lg mt-1">
                                                        ${item.price}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>

                                            <div className="mt-auto pt-2">
                                                <Button
                                                    className="w-full gap-2"
                                                    size="sm"
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    <ShoppingBag className="h-4 w-4" />
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
