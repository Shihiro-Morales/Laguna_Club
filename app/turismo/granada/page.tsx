"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Church, Palmtree, Coffee } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function GranadaPage() {
  const { t } = useLanguage()

  const attractions = [
    {
      title: t.granada.cathedral,
      description: t.granada.cathedralDesc,
      icon: Church,
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    },
    {
      title: t.granada.isletas,
      description: t.granada.isletasDesc,
      icon: Palmtree,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      title: t.granada.centralPark,
      description: t.granada.centralParkDesc,
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&q=80",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.granada.title}
        subtitle={t.granada.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=80"
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {t.granada.description}
          </motion.p>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.granada.title}
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <attraction.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {attraction.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {attraction.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
