"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bed, UtensilsCrossed, Waves, Sun, TreePine, Droplets, Leaf, Mountain, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { ServiceCard } from "@/components/cards/service-card"
import { useLanguage } from "@/components/providers/language-provider"

const galleryImages = [
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
]

export default function HomePage() {
  const { t } = useLanguage()

  const services = [
    {
      title: t.home.accommodationTitle,
      description: t.home.accommodationDesc,
      icon: Bed,
      href: "/alojamiento",
    },
    {
      title: t.home.restaurantTitle,
      description: t.home.restaurantDesc,
      icon: UtensilsCrossed,
      href: "/el-resort/alimentos",
    },
    {
      title: t.home.activitiesTitle,
      description: t.home.activitiesDesc,
      icon: Waves,
      href: "/el-resort/actividades",
    },
    {
      title: t.home.dayPassTitle,
      description: t.home.dayPassDesc,
      icon: Sun,
      href: "/el-resort/day-pass",
    },
  ]

  const experiences = [
    {
      title: t.home.experienceNature,
      description: t.home.experienceNatureDesc,
      icon: TreePine,
    },
    {
      title: t.home.experienceRelax,
      description: t.home.experienceRelaxDesc,
      icon: Droplets,
    },
    {
      title: t.home.experienceEco,
      description: t.home.experienceEcoDesc,
      icon: Leaf,
    },
    {
      title: t.home.experienceView,
      description: t.home.experienceViewDesc,
      icon: Mountain,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t.home.heroTitle}
        subtitle={t.home.heroSubtitle}
        description={t.home.heroDescription}
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        primaryCta={{ text: t.home.ctaBook, href: "/reservaciones" }}
        secondaryCta={{ text: t.home.ctaExplore, href: "/el-resort" }}
        showScrollIndicator
        height="full"
      />

      {/* Services Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.home.servicesTitle}
            subtitle={t.home.servicesSubtitle}
            className="mb-12 sm:mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80"
                  alt="Laguna de Apoyo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl max-w-[240px] border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-serif font-semibold text-foreground">Laguna de Apoyo</span>
                </div>
                <p className="text-sm text-muted-foreground">Nicaragua&apos;s deepest volcanic lagoon</p>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <div>
              <SectionHeading
                title={t.home.experienceTitle}
                subtitle={t.home.experienceSubtitle}
                align="left"
                className="mb-10"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <exp.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.home.galleryTitle}
            subtitle={t.home.gallerySubtitle}
            className="mb-12"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/el-resort/galeria" className="flex items-center gap-2">
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={t.home.locationTitle}
                subtitle={t.home.locationSubtitle}
                description={t.home.locationDesc}
                align="left"
                className="mb-8"
              />
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-xl">
                <Link href="/el-resort/direcciones" className="flex items-center gap-2">
                  {t.common.learnMore}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

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

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              {t.home.ctaTitle}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              {t.home.ctaSubtitle}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-xl"
            >
              <Link href="/reservaciones">{t.home.ctaBook}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
