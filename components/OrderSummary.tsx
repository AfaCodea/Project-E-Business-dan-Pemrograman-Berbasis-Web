"use client"

import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export default function OrderSummary() {
    const { items, subtotal } = useCart()
    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.10 // 10% tax
    const total = subtotal + shipping + tax

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <div className="relative h-16 w-16 bg-white rounded-md border border-gray-200 overflow-hidden flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-gray-500">Size: {item.selectedSize || "N/A"}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
            </div>
        </div>
    )
}
