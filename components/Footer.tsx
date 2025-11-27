"use client"

import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Shoes Store <span className="text-orange">X</span> Afa</h3>
            <p className="text-gray-400">
              Your trusted destination for premium quality footwear. At Shoes Store X Afa, we are dedicated to providing exceptional service, superior quality shoes, and a seamless shopping experience. Discover style, comfort, and excellence in every step.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Free Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/shop?category=Men" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="/shop?category=Women" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="/shop?category=Sports" className="hover:text-white transition-colors">Sports</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Payment Methods</h4>
              <div className="flex gap-3 items-center">
                <div className="bg-white p-2 rounded h-10 w-16 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/payment/visa.png" alt="Visa" className="h-full w-auto object-contain" />
                </div>
                <div className="bg-white p-2 rounded h-10 w-16 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/payment/qris.png" alt="QRIS" className="h-full w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>Copyright © {new Date().getFullYear()} Company Shoes Store X Afa | By Agil Prasunza.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

