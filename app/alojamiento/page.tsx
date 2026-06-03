"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { AccommodationCard } from "@/components/cards/accommodation-card"
import { useLanguage } from "@/components/providers/language-provider"

export default function AlojamientoPage() {
  const { t } = useLanguage()

  const accommodations = [
    {
      title: t.nav.dormitory,
      description: t.dormitory.description,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      capacity: t.dormitory.capacity,
      priceFrom: 15,
      features: t.dormitory.features,
      href: "/alojamiento/dormitorio",
      featured: false,
    },
    {
      title: t.nav.privateRooms,
      description: t.privateRooms.description,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      capacity: "2-4 personas",
      priceFrom: 45,
      features: ["Cama privada", "Baño privado/compartido", "Vista al jardín", "WiFi gratuito"],
      href: "/alojamiento/habitaciones",
      featured: true,
    },
    {
      title: t.nav.villas,
      description: t.villas.description,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      capacity: "2-6 personas",
      priceFrom: 120,
      features: t.villas.features,
      href: "/alojamiento/villas",
      featured: false,
    },
  ]

  return (
    <>
      <HeroSection
        title={t.accommodation.title}
        subtitle={t.accommodation.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
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
            {t.accommodation.description}
          </motion.p>
        </div>
      </section>

      {/* Accommodations Grid */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.accommodation.title}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.map((acc, index) => (
              <motion.div
                key={acc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccommodationCard
                  title={acc.title}
                  description={acc.description}
                  image={acc.image}
                  capacity={acc.capacity}
                  priceFrom={acc.priceFrom}
                  features={acc.features}
                  href={acc.href}
                  ctaText={t.accommodation.viewDetails}
                  priceLabel={t.accommodation.priceFrom}
                  perNightLabel={t.accommodation.perNight}
                  featured={acc.featured}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
