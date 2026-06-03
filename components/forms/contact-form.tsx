"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-2xl bg-card border border-border p-8 text-center", className)}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary mx-auto mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          {t.common.success}!
        </h3>
        <p className="text-muted-foreground">
          We have received your reservation request. We will contact you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={cn("rounded-2xl bg-card border border-border p-6 sm:p-8", className)}
    >
      <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
        {t.reservations.formTitle}
      </h3>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-foreground mb-2">
              {t.reservations.checkIn}
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              required
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-foreground mb-2">
              {t.reservations.checkOut}
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              required
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.guests}
          </label>
          <select
            id="guests"
            name="guests"
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Room Type */}
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.roomType}
          </label>
          <select
            id="roomType"
            name="roomType"
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t.reservations.selectRoom}</option>
            <option value="dormitory">{t.nav.dormitory}</option>
            <option value="private">{t.nav.privateRooms}</option>
            <option value="villa">{t.nav.villas}</option>
            <option value="daypass">Day Pass</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            {t.reservations.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl"
        >
          {isSubmitting ? t.common.loading : t.reservations.submit}
        </Button>
      </div>
    </motion.form>
  )
}
