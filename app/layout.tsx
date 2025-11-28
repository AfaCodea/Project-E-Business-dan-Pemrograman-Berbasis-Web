import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { Toaster } from "@/components/ui/toaster"
import InitialLoader from "@/components/InitialLoader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shoes Store X Afa - Premium Quality Shoes",
  description: "Step Into Style & Comfort - Discover premium quality shoes at Shoes Store X Afa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InitialLoader />
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  )
}

