"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Main hero image - premium shoes display
const heroImage = "/images/hero-section.jpg"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayText, setDisplayText] = useState("")
  const fullText = "Step Into Style & Comfort"
  const router = useRouter()

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    let timeoutId: NodeJS.Timeout

    const type = () => {
      const currentFullText = fullText

      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, currentIndex - 1))
        currentIndex--
      } else {
        setDisplayText(currentFullText.substring(0, currentIndex + 1))
        currentIndex++
      }

      let typeSpeed = 100

      if (isDeleting) {
        typeSpeed /= 2 // Deleting is faster
      }

      if (!isDeleting && currentIndex === currentFullText.length) {
        typeSpeed = 2000 // Pause at end
        isDeleting = true
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        typeSpeed = 500 // Pause before typing again
      }

      timeoutId = setTimeout(type, typeSpeed)
    }

    timeoutId = setTimeout(type, 1000) // Initial delay

    return () => clearTimeout(timeoutId)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Dark Paneled Wall with Content */}
      <div className="relative w-full lg:w-1/2 bg-gray-900 flex items-center justify-center pt-24 lg:pt-0">
        {/* Paneled Wall Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.05) 48px, rgba(255,255,255,0.05) 50px)`,
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-16 py-20 lg:py-32 max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight min-h-[1.2em]">
            {displayText}
            <span className="animate-pulse text-orange">|</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed">
            Discover premium quality footwear at Shoes Store <span className="text-orange font-bold">X</span> Afa. We offer an extensive collection of stylish and comfortable shoes crafted with excellence. Find your perfect pair that combines elegance, durability, and unmatched comfort.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search shoes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-12 sm:h-14 lg:h-16 pl-5 sm:pl-6 pr-14 sm:pr-16 bg-gray-800/95 border border-gray-700/50 text-white placeholder:text-gray-400 rounded-full text-sm sm:text-base lg:text-lg backdrop-blur-sm focus:border-primary/50"
            />
            <Button
              size="icon"
              onClick={handleSearch}
              className="absolute right-1 sm:right-2 top-1 sm:top-2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-orange hover:bg-orange/90 shadow-lg"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Shoes Display Image */}
      <div className="relative w-full lg:w-1/2 bg-white order-first lg:order-last">
        <div className="relative h-full min-h-[400px] sm:min-h-[500px] lg:min-h-screen">
          <Image
            src={heroImage}
            alt="Premium shoes collection"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

          {/* Hotspot Indicators - White circles with glow */}
          <div className="absolute top-[25%] left-[20%] w-12 h-12 rounded-full border-2 border-white/90 bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all shadow-lg ring-2 ring-white/30">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <div className="absolute bottom-[30%] right-[25%] w-12 h-12 rounded-full border-2 border-white/90 bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all shadow-lg ring-2 ring-white/30">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  )
}


