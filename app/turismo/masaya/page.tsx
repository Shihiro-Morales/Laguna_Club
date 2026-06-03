"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Flame, ShoppingBag, Store } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function MasayaPage() {
  const { t } = useLanguage()

  const attractions = [
    {
      title: t.masaya.volcano,
      description: t.masaya.volcanoDesc,
      icon: Flame,
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80",
    },
    {
      title: t.masaya.market,
      description: t.masaya.marketDesc,
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    },
    {
      title: t.masaya.oldMarket,
      description: t.masaya.oldMarketDesc,
      icon: Store,
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&q=80",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.masaya.title}
        subtitle={t.masaya.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&q=80"
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
            {t.masaya.description}
          </motion.p>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.masaya.title}
            className="mb-12"
          />

          <div className="space-y-16">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden md:[direction:ltr]">
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:[direction:ltr]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 text-accent mb-4">
                    <attraction.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                    {attraction.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
