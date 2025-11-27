"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, easeOut } from "framer-motion"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Main hero image - premium shoes display
const heroImage = "/images/hero-section.jpg"

const Hotspot = ({ className, delay, label, isActive, onHover }: { className: string, delay: number, label: string, isActive: boolean, onHover: (isHovering: boolean) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${className} group z-20`}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <div className="relative flex items-center justify-center w-12 h-12 cursor-pointer">
      {/* Pulsing Ring */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-white/30"
      />

      {/* Main Circle */}
      <div className={`relative w-12 h-12 rounded-full border-2 border-white/90 backdrop-blur-md flex items-center justify-center transition-all shadow-lg ring-2 ring-white/30 ${isActive ? 'bg-white/30 scale-110' : 'bg-white/20 hover:bg-white/30 hover:scale-110'}`}>
        <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
      </div>

      {/* Tooltip */}
      <div className={`absolute left-full ml-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white/90 rotate-45"></div>
      </div>
    </div>
  </motion.div>
)

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayText, setDisplayText] = useState("")
  const fullText = "Step Into Style & Comfort"
  const router = useRouter()
  const containerRef = useRef(null)
  const [activeHotspot, setActiveHotspot] = useState(0)
  const [isHoveringHotspot, setIsHoveringHotspot] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"], { ease: easeOut })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1], { ease: easeOut })

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

  // Auto-cycle hotspots
  useEffect(() => {
    if (isHoveringHotspot) return

    const interval = setInterval(() => {
      setActiveHotspot((prev) => (prev + 1) % 5) // 5 is total hotspots
    }, 3000)

    return () => clearInterval(interval)
  }, [isHoveringHotspot])

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
    <section ref={containerRef} className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
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
      <div className="relative w-full lg:w-1/2 bg-white order-first lg:order-last overflow-hidden">
        <motion.div
          className="relative h-full min-h-[400px] sm:min-h-[500px] lg:min-h-screen"
          initial={{ clipPath: "inset(10% 10% 10% 10%)", scale: 1.2 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            y,
            scale,
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
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
          <Hotspot
            className="top-[25%] left-[20%]"
            delay={1}
            label="Premium Leather"
            isActive={activeHotspot === 0}
            onHover={setIsHoveringHotspot}
          />
          <Hotspot
            className="bottom-[30%] right-[25%]"
            delay={1.2}
            label="Air Cushion Sole"
            isActive={activeHotspot === 1}
            onHover={setIsHoveringHotspot}
          />
          <Hotspot
            className="top-[45%] right-[35%]"
            delay={1.4}
            label="Breathable Lining"
            isActive={activeHotspot === 2}
            onHover={setIsHoveringHotspot}
          />
          <Hotspot
            className="bottom-[25%] left-[40%]"
            delay={1.6}
            label="Anti-slip Grip"
            isActive={activeHotspot === 3}
            onHover={setIsHoveringHotspot}
          />
          <Hotspot
            className="top-[60%] left-[55%]"
            delay={1.8}
            label="Memory Foam Insole"
            isActive={activeHotspot === 4}
            onHover={setIsHoveringHotspot}
          />
        </motion.div>
      </div>
    </section>
  )
}


