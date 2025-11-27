"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/CartSheet"

export default function Header() {
  const [isShoesDropdownOpen, setIsShoesDropdownOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="px-5 py-2.5">
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-white tracking-tight whitespace-nowrap">
                Shoes Store <span className="text-orange font-bold">X</span> Afa
              </h1>
            </Link>
          </div>

          {/* Navigation - Absolutely Centered */}
          <nav className="hidden lg:flex items-center gap-8 text-white absolute left-1/2 -translate-x-1/2">
            {/* Shoes Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShoesDropdownOpen(true)}
              onMouseLeave={() => setIsShoesDropdownOpen(false)}
            >
              <Link
                href="/shoes"
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                <span className="text-sm font-normal tracking-wide hover:text-orange transition-colors duration-200">
                  Shoes
                </span>
                <ChevronDown className={`h-3.5 w-3.5 group-hover:text-orange transition-all duration-200 ${isShoesDropdownOpen ? 'rotate-180' : ''
                  }`} />
              </Link>

              {/* Dropdown Menu */}
              {isShoesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/shoes"
                      className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      All Collections
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/shop?category=Men"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange/5 hover:text-orange transition-colors"
                    >
                      Men
                    </Link>
                    <Link
                      href="/shop?category=Women"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange/5 hover:text-orange transition-colors"
                    >
                      Women
                    </Link>
                    <Link
                      href="/shop?category=Sports"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange/5 hover:text-orange transition-colors"
                    >
                      Sports
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/shop"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange/5 hover:text-orange transition-colors"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/shop"
              className="text-sm font-normal tracking-wide hover:text-orange transition-colors duration-200"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-normal tracking-wide hover:text-orange transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-normal tracking-wide hover:text-orange transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Cart */}
          <div className="flex items-center flex-shrink-0">
            <CartSheet>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-orange hover:bg-white/10 h-10 w-10 rounded-full transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange text-white text-xs font-medium flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Button>
            </CartSheet>
          </div>
        </div>
      </div>
    </header>
  )
}


