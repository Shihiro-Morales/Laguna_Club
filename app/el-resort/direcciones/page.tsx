"use client"

import { motion } from "framer-motion"
import { Car, MapPin, Navigation } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function DireccionesPage() {
  const { t } = useLanguage()

  const routes = [
    {
      title: t.directions.fromManagua,
      description: t.directions.fromManaguaDesc,
      icon: Car,
    },
    {
      title: t.directions.fromMasaya,
      description: t.directions.fromMasayaDesc,
      icon: Car,
    },
    {
      title: t.directions.fromGranada,
      description: t.directions.fromGranaDesc,
      icon: Car,
    },
  ]

  return (
    <>
      <HeroSection
        title={t.directions.title}
        subtitle={t.directions.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
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
            {t.directions.description}
          </motion.p>
        </div>
      </section>

      {/* Routes */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.directions.title}
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <motion.div
                key={route.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <route.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {route.title}
                </h3>
                <p className="text-muted-foreground">{route.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Address */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Address Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{t.directions.address}</h3>
                    <p className="text-muted-foreground">{t.directions.addressText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Navigation className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{t.directions.coordinates}</h3>
                    <p className="text-muted-foreground font-mono">11.9200° N, 86.0600° W</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31152.47087668!2d-86.06!3d11.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f740f8a!2sLaguna%20de%20Apoyo!5e0!3m2!1sen!2sni!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
