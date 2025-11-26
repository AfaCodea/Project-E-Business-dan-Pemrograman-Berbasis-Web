import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import WhyChoosingUs from "@/components/WhyChoosingUs"
import BestSellingProducts from "@/components/BestSellingProducts"
import Experiences from "@/components/Experiences"
import Materials from "@/components/Materials"
import ClientReviews from "@/components/ClientReviews"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyChoosingUs />
      <BestSellingProducts />
      <Experiences />
      <Materials />
      <ClientReviews />
      <Footer />
    </main>
  )
}

