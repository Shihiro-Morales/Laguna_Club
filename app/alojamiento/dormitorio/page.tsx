"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Users, Wifi, Coffee, Lock, ShowerHead } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { useLanguage } from "@/components/providers/language-provider"

export default function DormitorioPage() {
  const { t } = useLanguage()

  const amenities = [
    { name: "WiFi Gratuito", icon: Wifi },
    { name: "Desayuno Incluido", icon: Coffee },
    { name: "Casillero Personal", icon: Lock },
    { name: "Baño Compartido", icon: ShowerHead },
  ]

  return (
    <>
      <HeroSection
        title={t.dormitory.title}
        subtitle={t.dormitory.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&q=80"
        height="large"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
                  alt="Dormitory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
                    alt="Dormitory interior"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80"
                    alt="Common area"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Users className="h-5 w-5" />
                <span>{t.dormitory.capacity}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t.dormitory.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.dormitory.description}
              </p>

              {/* Price */}
              <div className="bg-muted rounded-2xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-1">{t.accommodation.priceFrom}</p>
                <p className="text-3xl font-bold text-foreground">
                  $15 <span className="text-lg font-normal text-muted-foreground">{t.accommodation.perNight}</span>
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">{t.accommodation.amenities}</h3>
                <ul className="space-y-3">
                  {t.dormitory.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenity Icons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <amenity.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{amenity.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 text-lg">
                <Link href="/reservaciones">{t.accommodation.bookNow}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
