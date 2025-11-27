"use client"

import { motion, useInView, UseInViewOptions } from "framer-motion"
import { useRef } from "react"

interface FadeInProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    fullWidth?: boolean
    viewport?: UseInViewOptions
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    direction = "up",
    fullWidth = false,
    viewport = { once: true, margin: "-100px" }
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, viewport)

    const getDirectionVariants = () => {
        switch (direction) {
            case "up":
                return { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }
            case "down":
                return { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } }
            case "left":
                return { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } }
            case "right":
                return { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } }
            case "none":
            default:
                return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        }
    }

    const variants = getDirectionVariants()

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            style={{ width: fullWidth ? "100%" : "auto" }}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({
    children,
    className = "",
    delay = 0,
    staggerChildren = 0.1,
    viewport = { once: true, margin: "-100px" }
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    staggerChildren?: number
    viewport?: UseInViewOptions
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, viewport)

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerChildren
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const fadeInItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    }
}
