"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  showCategories?: boolean
  className?: string
}

export function ImageGallery({
  images,
  columns = 3,
  showCategories = false,
  className,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = showCategories
    ? Array.from(new Set(images.map((img) => img.category).filter(Boolean)))
    : []

  const filteredImages = activeCategory
    ? images.filter((img) => img.category === activeCategory)
    : images

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  return (
    <div className={className}>
      {/* Category Filter */}
      {showCategories && categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category ?? null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className={cn("grid gap-4", columnClasses[columns])}>
        {filteredImages.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Next Button */}
            <button
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
