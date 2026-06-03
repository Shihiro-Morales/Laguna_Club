"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function TurismoPage() {
  const { t } = useLanguage()

  const destinations = [
    {
      name: t.masaya.title,
      description: t.masaya.subtitle,
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80",
      href: "/turismo/masaya",
    },
    {
      name: t.granada.title,
      description: t.granada.subtitle,
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
      href: "/turismo/granada",
    },
    {
      name: t.culture.title,
      description: t.culture.subtitle,
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&q=80",
      href: "/turismo/cultura",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.tourism.title}
        subtitle={t.tourism.subtitle}
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
            {t.tourism.description}
          </motion.p>
        </div>
      </section>

      {/* Main Destination */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80"
                alt="Laguna de Apoyo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Destino Principal</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t.tourism.mainDestination}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.tourism.mainDestinationDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.tourism.nearbyTitle}
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={dest.href} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-semibold text-white mb-1">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-white/90">{dest.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>{t.common.learnMore}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
