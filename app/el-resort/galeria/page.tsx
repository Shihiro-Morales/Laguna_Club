"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { useLanguage } from "@/components/providers/language-provider"
import { RESORT_IMAGES } from "@/lib/images"

export default function GaleriaPage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection
        title={t.galleryPage.title}
        subtitle={t.galleryPage.subtitle}
        backgroundImage={RESORT_IMAGES.hero.gallery}
        height="medium"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery
            images={RESORT_IMAGES.gallery}
            columns={3}
            showCategories
          />
        </div>
      </section>
    </>
  )
}
