import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhyChoosingUs from "@/components/WhyChoosingUs"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Shoes Store <span className="text-orange">X</span> Afa
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your trusted partner in finding the perfect footwear that combines style, comfort, and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/about.png"
                alt="About Shoes Store X Afa"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Shoes Store <span className="text-orange font-bold">X</span> Afa was founded with a simple yet powerful mission: to provide premium quality footwear that doesn't compromise on style, comfort, or affordability. We believe that everyone deserves access to well-crafted shoes that enhance their daily lives.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Since our inception, we have been committed to sourcing the finest materials, working with skilled craftsmen, and maintaining the highest standards of quality. Our team carefully curates each collection, ensuring that every pair of shoes meets our rigorous standards for durability, comfort, and aesthetic appeal.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We understand that shoes are more than just footwear—they are an expression of personal style, a foundation for comfort, and a statement of quality. That's why we go above and beyond to ensure that every customer finds their perfect pair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choosing Us */}
      <WhyChoosingUs />

      {/* Our Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
              Our Mission & Values
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional quality footwear that combines style, comfort, and affordability, making premium shoes accessible to everyone while maintaining the highest standards of craftsmanship and customer service.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Quality First: Never compromise on materials or craftsmanship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Customer Satisfaction: Your happiness is our priority</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Integrity: Honest pricing and transparent business practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Innovation: Continuously improving our products and services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

