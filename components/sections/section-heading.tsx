"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("max-w-3xl", alignClasses[align], className)}
    >
      {subtitle && (
        <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
          {subtitle}
        </p>
      )}
      <h2 className={cn("font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  )
}
