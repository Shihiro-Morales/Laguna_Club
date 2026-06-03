"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function DayPassPage() {
  const { t } = useLanguage()

  const includes = [
    t.dayPass.arrival,
    t.dayPass.facilities,
    t.dayPass.waterActivities,
    t.dayPass.restaurant,
    t.dayPass.relaxAreas,
  ]

  return (
    <>
      <HeroSection
        title={t.dayPass.title}
        subtitle={t.dayPass.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
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
            {t.dayPass.description}
          </motion.p>
        </div>
      </section>

      {/* Day Pass Details */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Includes Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                {t.dayPass.includes}
              </h3>
              <ul className="space-y-4">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Price & Schedule Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Schedule */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t.dayPass.schedule}</h4>
                    <p className="text-lg font-semibold text-primary">{t.dayPass.scheduleTime}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90">{t.dayPass.price}</h4>
                    <p className="text-3xl font-bold">$25 USD</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-6">
                  Per person. Children under 5 free.
                </p>
                <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                  <Link href="/reservaciones">{t.dayPass.bookDayPass}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
