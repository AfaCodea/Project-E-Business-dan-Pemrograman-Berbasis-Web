"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import CheckoutDialog from "@/components/CheckoutDialog"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function CartSheet({ children }: { children: React.ReactNode }) {
    const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    // Auto-close checkout dialog when cart becomes empty (after successful payment)
    useEffect(() => {
        if (items.length === 0 && isCheckoutOpen) {
            setIsCheckoutOpen(false)
        }
    }, [items.length, isCheckoutOpen])

    const handleProceedToCheckout = () => {
        setIsSheetOpen(false) // Close the cart sheet
        setIsCheckoutOpen(true) // Open the checkout dialog
    }

    return (
        <>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">
                            Shopping Cart ({totalItems})
                        </SheetTitle>
                    </SheetHeader>

                    <div className="mt-8 flex flex-col h-full">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                                <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Your cart is empty
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Add some products to get started
                                </p>
                                <SheetTrigger asChild>
                                    <Button asChild>
                                        <Link href="/shop">Continue Shopping</Link>
                                    </Button>
                                </SheetTrigger>
                            </div>
                        ) : (
                            <>
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
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                            aria-label="Remove item"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </button>
                                                    </div>

                                                    <div className="mt-auto flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="w-8 text-center font-medium">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                        <p className="font-bold text-lg">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                                    <div className="flex justify-between text-lg">
                                        <span className="font-semibold">Subtotal</span>
                                        <span className="font-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Shipping and taxes calculated at checkout
                                    </p>
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleProceedToCheckout}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="w-full" size="lg" asChild>
                                            <Link href="/shop">
                                                Continue Shopping
                                            </Link>
                                        </Button>
                                    </SheetTrigger>
                                </div>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            <CheckoutDialog
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </>
    )
}
