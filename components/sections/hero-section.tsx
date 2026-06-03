"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showScrollIndicator?: boolean
  overlay?: "light" | "dark" | "gradient"
  height?: "full" | "large" | "medium"
}

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
  showScrollIndicator = false,
  overlay = "gradient",
  height = "full",
}: HeroSectionProps) {
  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
  }

  const overlayClasses = {
    light: "bg-white/30",
    dark: "bg-black/50",
    gradient: "bg-gradient-to-b from-black/60 via-black/40 to-black/70",
  }

  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg sm:text-xl text-white/90 mb-2"
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              {description}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl"
                >
                  <Link href={primaryCta.href}>{primaryCta.text}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-lg rounded-xl"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/80"
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
