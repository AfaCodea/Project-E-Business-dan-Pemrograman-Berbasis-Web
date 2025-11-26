"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Experiences() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/images/about.png"
              alt="Premium shoes collection"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-orange uppercase tracking-wider">
                EXPERIENCES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              We Provide You The Best Experience
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At Shoes Store X Afa, we understand that your footwear is an extension of your personality. Our team of experienced professionals meticulously curates each collection, ensuring every pair meets our high standards of quality, comfort, and style. We source premium materials and work with trusted manufacturers to bring you shoes that are not just fashionable, but built to last.
            </p>
            <Button variant="link" className="p-0 text-orange hover:text-orange/80">
              More Info <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

