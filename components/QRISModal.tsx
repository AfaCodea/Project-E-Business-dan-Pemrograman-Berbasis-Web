"use client"

import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { CheckCircle2, Timer, X } from "lucide-react"

interface QRISModalProps {
    isOpen: boolean
    onClose: () => void
    totalAmount: number
    onPaymentSuccess: () => void
}

export default function QRISModal({ isOpen, onClose, totalAmount, onPaymentSuccess }: QRISModalProps) {
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
    const [isSimulating, setIsSimulating] = useState(false)

    useEffect(() => {
        if (!isOpen) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isOpen])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleSimulatePayment = () => {
        setIsSimulating(true)
        // Simulate network delay
        setTimeout(() => {
            setIsSimulating(false)
            onPaymentSuccess()
        }, 2000)
    }

    if (!isOpen) return null

    // Generate a unique QR string (in real app this would be from payment gateway)
    const qrValue = `QRIS-PAYMENT-${totalAmount}-${Date.now()}`

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">Scan QRIS to Pay</h3>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center">
                    <div className="mb-6 text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-primary">{formatPrice(totalAmount)}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-sm mb-6 relative group">
                        <QRCodeSVG
                            value={qrValue}
                            size={200}
                            level="H"
                            includeMargin={true}
                            className="w-full h-full"
                        />
                        {/* Logo Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white p-1 rounded-full shadow-md">
                                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    QRIS
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-orange mb-6 bg-orange/10 px-4 py-2 rounded-full">
                        <Timer className="h-4 w-4 animate-pulse" />
                        <span className="font-medium font-mono">{formatTime(timeLeft)}</span>
                    </div>

                    <div className="w-full space-y-3">
                        <p className="text-xs text-center text-gray-400">
                            Open your favorite banking app or e-wallet to scan this QR code
                        </p>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Demo Mode</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleSimulatePayment}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={isSimulating}
                        >
                            {isSimulating ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Simulate Payment Success
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">Supported by all major e-wallets and banks</p>
                </div>
            </div>
        </div>
    )
}
