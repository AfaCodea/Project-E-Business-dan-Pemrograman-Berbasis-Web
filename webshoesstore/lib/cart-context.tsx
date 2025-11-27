"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "./products"
import { useToast } from "./toast-context"

export interface CartItem extends Product {
    selectedSize: any
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, size?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "shoes-store-cart"

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)
    const { showToast } = useToast()

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY)
            if (savedCart) {
                setItems(JSON.parse(savedCart))
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error)
        }
        setIsInitialized(true)
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
            } catch (error) {
                console.error("Failed to save cart to localStorage:", error)
            }
        }
    }, [items, isInitialized])

    const addToCart = (product: Product, size?: number) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) =>
                item.id === product.id && item.selectedSize === (size || item.selectedSize)
            )

            if (existingItem) {
                // Increase quantity if item already exists
                showToast(`${product.name} quantity updated`, 'success')
                return currentItems.map((item) =>
                    item.id === product.id && item.selectedSize === (size || item.selectedSize)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                // Add new item with quantity 1
                showToast(`${product.name} added to cart`, 'success')
                return [...currentItems, {
                    ...product,
                    quantity: 1,
                    selectedSize: size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)
                }]
            }
        })
    }

    const removeFromCart = (productId: number) => {
        const item = items.find((item) => item.id === productId)
        if (item) {
            showToast(`${item.name} removed from cart`, 'info')
        }
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        if (items.length > 0) {
            showToast('Cart cleared', 'warning')
        }
        setItems([])
    }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
