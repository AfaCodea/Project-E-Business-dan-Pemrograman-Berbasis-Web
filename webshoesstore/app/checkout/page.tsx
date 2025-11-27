"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CheckoutForm from "@/components/CheckoutForm"
import OrderSummary from "@/components/OrderSummary"
import QRISModal from "@/components/QRISModal"
import { Button } from "@/components/ui/button"
import { CreditCard, QrCode, Truck } from "lucide-react"
import { useToast } from "@/lib/toast-context"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, subtotal, clearCart } = useCart()
    const { showToast } = useToast()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
    })

    const [paymentMethod, setPaymentMethod] = useState<"qris" | "transfer">("qris")
    const [isQRISModalOpen, setIsQRISModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            router.push("/shop")
        }
    }, [items, router])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "zipCode"]
        const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

        if (emptyFields.length > 0) {
            showToast("Please fill in all required fields", "error")
            return false
        }
        return true
    }

    const handlePlaceOrder = () => {
        if (!validateForm()) return

        setIsProcessing(true)

        if (paymentMethod === "qris") {
            // Open QRIS Modal
            setIsQRISModalOpen(true)
            setIsProcessing(false)
        } else {
            // Handle other payment methods (mock)
            setTimeout(() => {
                handlePaymentSuccess()
            }, 2000)
        }
    }

    const handlePaymentSuccess = () => {
        setIsQRISModalOpen(false)
        clearCart()
        showToast("Payment successful! Order placed.", "success")
        router.push("/order-success")
    }

    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    if (items.length === 0) return null

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 pt-32 pb-20">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping Information */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                            </div>
                            <CheckoutForm formData={formData} handleInputChange={handleInputChange} />
                        </section>

                        {/* Payment Method */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* QRIS Option */}
                                <div
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "qris"
                                        ? "border-orange bg-orange/5"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setPaymentMethod("qris")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                                            <QrCode className="h-6 w-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">QRIS</h3>
                                            <p className="text-sm text-gray-500">Scan to pay with any e-wallet</p>
                                        </div>
                                    </div>
                                    {paymentMethod === "qris" && (
                                        <div className="absolute top-4 right-4 w-4 h-4 bg-orange rounded-full border-2 border-white ring-2 ring-orange/20" />
                                    )}
                                </div>

                                {/* Bank Transfer Option (Disabled/Placeholder) */}
                                <div
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all opacity-50 grayscale`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
                                            <p className="text-sm text-gray-500">Coming soon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <OrderSummary />

                            <Button
                                onClick={handlePlaceOrder}
                                className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}`}
                            </Button>

                            <p className="text-xs text-center text-gray-400">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <QRISModal
                isOpen={isQRISModalOpen}
                onClose={() => setIsQRISModalOpen(false)}
                totalAmount={total}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </main>
    )
}
