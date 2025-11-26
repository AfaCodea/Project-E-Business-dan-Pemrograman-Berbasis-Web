import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function ShoesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Shoe Collections
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our extensive range of premium footwear designed for every occasion, style, and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Men */}
            <Link href="/shop?category=Men" className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/men/men1.png"
                  alt="Men's Shoes Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Men</h3>
              <p className="text-gray-600">
                Discover our premium collection of men's footwear. From classic sneakers to elegant boots, find the perfect pair for every occasion.
              </p>
            </Link>

            {/* Women */}
            <Link href="/shop?category=Women" className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/women/women1.png"
                  alt="Women's Shoes Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Women</h3>
              <p className="text-gray-600">
                Explore our stylish collection of women's shoes. Fashionable designs that combine comfort and elegance for the modern woman.
              </p>
            </Link>

            {/* Sports */}
            <Link href="/shop?category=Sports" className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/sports/sports1.png"
                  alt="Sports Shoes Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sports</h3>
              <p className="text-gray-600">
                High-performance athletic footwear designed for running, training, and sports activities. Built for comfort and durability.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Find Your Perfect Pair?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Browse our complete collection and discover shoes that match your style and needs.
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

