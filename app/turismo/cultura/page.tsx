"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { UtensilsCrossed, PartyPopper, Palette, Music } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function CulturaPage() {
  const { t } = useLanguage()

  const cultureAspects = [
    {
      title: t.culture.gastronomy,
      description: t.culture.gastronomyDesc,
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    },
    {
      title: t.culture.traditions,
      description: t.culture.traditionsDesc,
      icon: PartyPopper,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    },
    {
      title: t.culture.crafts,
      description: t.culture.craftsDesc,
      icon: Palette,
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&q=80",
    },
    {
      title: t.culture.music,
      description: t.culture.musicDesc,
      icon: Music,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.culture.title}
        subtitle={t.culture.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=1920&q=80"
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
            {t.culture.description}
          </motion.p>
        </div>
      </section>

      {/* Culture Aspects */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.culture.title}
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 gap-8">
            {cultureAspects.map((aspect, index) => (
              <motion.div
                key={aspect.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={aspect.image}
                    alt={aspect.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white mb-4">
                    <aspect.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-2">
                    {aspect.title}
                  </h3>
                  <p className="text-white/90">
                    {aspect.description}
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
