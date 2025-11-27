"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "./products"
import { toast } from "@/hooks/use-toast"

interface WishlistContextType {
    items: Product[]
    addToWishlist: (product: Product) => void
    removeFromWishlist: (productId: number) => void
    isInWishlist: (productId: number) => boolean
    clearWishlist: () => void
    totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = "shoes-store-wishlist"

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // Load wishlist from localStorage on mount
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
            if (savedWishlist) {
                setItems(JSON.parse(savedWishlist))
            }
        } catch (error) {
            console.error("Failed to load wishlist from localStorage:", error)
        }
        setIsInitialized(true)
    }, [])

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
            } catch (error) {
                console.error("Failed to save wishlist to localStorage:", error)
            }
        }
    }, [items, isInitialized])

    const addToWishlist = (product: Product) => {
        if (items.some((item) => item.id === product.id)) {
            toast({
                title: "Already in Wishlist",
                description: `${product.name} is already in your wishlist`,
            })
            return
        }

        setItems((currentItems) => [...currentItems, product])
        toast({
            title: "Added to Wishlist",
            description: `${product.name} added to wishlist`,
        })
    }

    const removeFromWishlist = (productId: number) => {
        const item = items.find((item) => item.id === productId)
        if (item) {
            toast({
                title: "Removed from Wishlist",
                description: `${item.name} removed from wishlist`,
            })
            setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
        }
    }

    const isInWishlist = (productId: number) => {
        return items.some((item) => item.id === productId)
    }

    const clearWishlist = () => {
        if (items.length > 0) {
            setItems([])
            toast({
                title: "Wishlist Cleared",
                description: "All items removed from wishlist",
            })
        }
    }

    const totalItems = items.length

    return (
        <WishlistContext.Provider
            value={{
                items,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                totalItems,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}
