"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import CheckoutForm from "@/components/CheckoutForm"
import OrderSummary from "@/components/OrderSummary"
import QRISModal from "@/components/QRISModal"
import { Button } from "@/components/ui/button"
import { CreditCard, QrCode, Truck, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { formatPrice } from "@/lib/utils"

interface CheckoutDialogProps {
    isOpen: boolean
    onClose: () => void
}

export default function CheckoutDialog({ isOpen, onClose }: CheckoutDialogProps) {
    const router = useRouter()
    const { items, subtotal, clearCart } = useCart()

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "zipCode"]
        const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

        if (emptyFields.length > 0) {
            toast({
                title: "Form Incomplete",
                description: "Please fill in all required fields",
            })
            return false
        }
        return true
    }

    const handlePlaceOrder = () => {
        if (!validateForm()) return

        setIsProcessing(true)

        if (paymentMethod === "qris") {
            // Close checkout dialog and open QRIS Modal
            onClose() // Hide the checkout dialog
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

        // Reset form data
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            zipCode: "",
        })

        toast({
            title: "Payment Successful",
            description: "Order placed successfully!",
        })

        // Navigate to success page
        router.push("/order-success")
    }

    const handleCloseQRIS = () => {
        setIsQRISModalOpen(false)
        // Reopen checkout dialog when user cancels QRIS payment
        // The dialog is already closed, so we don't need to do anything
    }

    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.10 // 10% tax
    const total = subtotal + shipping + tax

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl font-bold">Checkout</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {/* Shipping Information */}
                            <section className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                                </div>
                                <CheckoutForm formData={formData} handleInputChange={handleInputChange} />
                            </section>

                            {/* Payment Method */}
                            <section className="bg-gray-50 p-6 rounded-xl">
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
                            <div className="space-y-6">
                                <OrderSummary />

                                <Button
                                    onClick={handlePlaceOrder}
                                    className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
                                </Button>

                                <p className="text-xs text-center text-gray-400">
                                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <QRISModal
                isOpen={isQRISModalOpen}
                onClose={handleCloseQRIS}
                totalAmount={total}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </>
    )
}
