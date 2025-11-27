"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingBag } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-500 mb-8">
                        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-mono font-medium text-gray-900">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>

                    <Link href="/shop">
                        <Button className="w-full h-12 text-lg gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    )
}
