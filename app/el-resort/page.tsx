"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Waves, Sun, UtensilsCrossed, MapPin, Images, Sparkles } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { ServiceCard } from "@/components/cards/service-card"
import { ServiceGrid } from "@/components/services/service-grid"
import { useLanguage } from "@/components/providers/language-provider"

export default function ElResortPage() {
  const { t } = useLanguage()

  const sections = [
    {
      title: t.nav.activities,
      description: t.activities.description,
      icon: Waves,
      href: "/el-resort/actividades",
    },
    {
      title: t.nav.dayPass,
      description: t.dayPass.description,
      icon: Sun,
      href: "/el-resort/day-pass",
    },
    {
      title: t.nav.foodBeverage,
      description: t.food.description,
      icon: UtensilsCrossed,
      href: "/el-resort/alimentos",
    },
    {
      title: t.nav.directions,
      description: t.directions.description,
      icon: MapPin,
      href: "/el-resort/direcciones",
    },
    {
      title: t.nav.gallery,
      description: t.galleryPage.subtitle,
      icon: Images,
      href: "/el-resort/galeria",
    },
    {
      title: "Servicios Especiales",
      description: "Day Pass, eventos privados, grupos y uso de instalaciones",
      icon: Sparkles,
      href: "/reservaciones",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.resort.title}
        subtitle={t.resort.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80"
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {t.resort.description}
          </motion.p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.resort.exploreTitle}
            className="mb-12 sm:mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  href={section.href}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actividades del Resort - Desde Backend */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nuestras Actividades"
            subtitle="Descubre todas las experiencias que Laguna Beach Club tiene para ofrecerte"
            className="mb-12 sm:mb-16"
          />
          <ServiceGrid />
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Sobre Laguna Beach Club"
                subtitle="Más de una década de excelencia en hospitalidad"
                className="mb-6 text-left"
              />
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Laguna Beach Club es un resort ecológico ubicado en las orillas de la hermosa Laguna de Apoyo en Nicaragua. Desde nuestra fundación, hemos sido pioneros en ofrecer experiencias auténticas y sostenibles en uno de los destinos más paradisíacos de Centroamérica.
                </p>
                
                <p>
                  Nuestro compromiso es proporcionar un refugio donde la naturaleza, la relajación y la aventura se encuentran en armonía. Cada aspecto de nuestro resort está diseñado para garantizar que disfrutes de la experiencia más memorable.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground">Huéspedes anuales</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-2xl font-bold text-primary">25+</p>
                    <p className="text-sm text-muted-foreground">Años de experiencia</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-2xl font-bold text-primary">15+</p>
                    <p className="text-sm text-muted-foreground">Actividades disponibles</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-2xl font-bold text-primary">4.9★</p>
                    <p className="text-sm text-muted-foreground">Calificación promedio</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-cyan-400 to-blue-600"
            >
              <div className="w-full h-full bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80')",
              }}>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
            {t.home.ctaTitle}
          </h2>
          <Link
            href="/reservaciones"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-colors"
          >
            {t.nav.bookNow}
          </Link>
        </div>
      </section>
    </>
  )
}
