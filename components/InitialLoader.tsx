"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Force loading for 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Vector Illustration (Person Climbing Stairs) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-8"
                        >
                            <img
                                src="/images/loader.png"
                                alt="Loading illustration"
                                width={1080}
                                height={720}
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Spinner */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative">
                                {/* Outer Ring */}
                                <div className="w-16 h-16 rounded-full border-4 border-gray-100"></div>
                                {/* Spinning Ring */}
                                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-orange border-t-transparent animate-spin"></div>
                            </div>
                        </motion.div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-4 text-sm text-gray-500 font-medium tracking-wider uppercase"
                        >
                            Loading Sabar Yuk ...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
