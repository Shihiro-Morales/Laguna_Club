"use client"

import { motion } from "framer-motion"
import { Clock, CreditCard, CalendarX, Phone, Mail, MapPin, Tag } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { ReservationForm } from "@/components/forms/reservation-form"
import { useLanguage } from "@/components/providers/language-provider"

export default function ReservacionesPage() {
  const { t } = useLanguage()

  const policies = [
    { text: t.reservations.checkInTime, icon: Clock },
    { text: t.reservations.checkOutTime, icon: Clock },
    { text: t.reservations.cancellation, icon: CalendarX },
    { text: t.reservations.payment, icon: CreditCard },
  ]

  const promotions = [
    {
      title: "Early Bird",
      description: "20% descuento reservando con 30 días de anticipación",
      discount: "20%",
    },
    {
      title: "Grupos",
      description: "15% descuento para grupos de 6+ personas",
      discount: "15%",
    },
    {
      title: "Larga Estadía",
      description: "10% descuento en estadías de 5+ noches",
      discount: "10%",
    },
  ]

  return (
    <>
      <HeroSection
        title={t.reservations.title}
        subtitle={t.reservations.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
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
            {t.reservations.description}
          </motion.p>
        </div>
      </section>

      {/* Form and Sidebar */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ReservationForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Policies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  {t.reservations.policies}
                </h3>
                <ul className="space-y-3">
                  {policies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <policy.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-muted-foreground pt-1">{policy.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  {t.reservations.contactTitle}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+50512345678" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+505 1234 5678</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:reservas@lagunabeachclub.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>reservas@lagunabeachclub.com</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{t.footer.address}</span>
                  </li>
                </ul>
              </motion.div>

              {/* Promotions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary rounded-2xl p-6 text-primary-foreground"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5" />
                  <h3 className="font-serif text-lg font-semibold">
                    {t.reservations.promotionsTitle}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {promotions.map((promo, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center h-8 w-12 bg-white/20 rounded-lg text-sm font-bold">
                        {promo.discount}
                      </span>
                      <div>
                        <p className="font-medium text-white">{promo.title}</p>
                        <p className="text-sm text-white/80">{promo.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
