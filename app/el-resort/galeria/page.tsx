"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { useLanguage } from "@/components/providers/language-provider"

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80", alt: "Lake view", category: "lake" },
  { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", alt: "Resort exterior", category: "resort" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", alt: "Beach resort", category: "resort" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", alt: "Room interior", category: "rooms" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", alt: "Room view", category: "rooms" },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", alt: "Pool area", category: "resort" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", alt: "Resort pool", category: "resort" },
  { src: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&q=80", alt: "Kayaking", category: "activities" },
  { src: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80", alt: "Swimming", category: "activities" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Restaurant", category: "restaurant" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Dining area", category: "restaurant" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Beach", category: "lake" },
]

export default function GaleriaPage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection
        title={t.galleryPage.title}
        subtitle={t.galleryPage.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80"
        height="medium"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery
            images={galleryImages}
            columns={3}
            showCategories
          />
        </div>
      </section>
    </>
  )
}
