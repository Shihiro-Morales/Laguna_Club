"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Users, Wifi, Bath, Mountain, UtensilsCrossed, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { useLanguage } from "@/components/providers/language-provider"

export default function VillasPage() {
  const { t } = useLanguage()

  const villaImages = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  ]

  const amenities = [
    { name: "WiFi Premium", icon: Wifi },
    { name: "Baño de Lujo", icon: Bath },
    { name: "Vista al Lago", icon: Mountain },
    { name: "Servicio de Cocina", icon: UtensilsCrossed },
    { name: "Servicio VIP", icon: Sparkles },
  ]

  return (
    <>
      <HeroSection
        title={t.villas.title}
        subtitle={t.villas.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
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
                  src={villaImages[0]}
                  alt="Villa exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {villaImages.slice(1).map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`Villa image ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="17vw"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Premium Experience</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Users className="h-5 w-5" />
                <span>2-6 personas</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t.villas.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.villas.description}
              </p>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-8 text-white">
                <p className="text-sm text-white/90 mb-1">{t.accommodation.priceFrom}</p>
                <p className="text-3xl font-bold">
                  $120 <span className="text-lg font-normal text-white/90">{t.accommodation.perNight}</span>
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">{t.accommodation.amenities}</h3>
                <ul className="space-y-3">
                  {t.villas.features.map((feature, index) => (
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
              <div className="flex flex-wrap gap-3 mb-8">
                {amenities.map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
                    <amenity.icon className="h-4 w-4 text-primary" />
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
