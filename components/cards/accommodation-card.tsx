"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AccommodationCardProps {
  title: string
  description: string
  image: string
  capacity: string
  priceFrom: number
  currency?: string
  features: string[]
  href: string
  ctaText: string
  priceLabel: string
  perNightLabel: string
  featured?: boolean
  className?: string
}

export function AccommodationCard({
  title,
  description,
  image,
  capacity,
  priceFrom,
  currency = "$",
  features,
  href,
  ctaText,
  priceLabel,
  perNightLabel,
  featured = false,
  className,
}: AccommodationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300",
        featured ? "border-primary" : "border-border",
        className
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Popular
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2">
          <p className="text-xs text-muted-foreground">{priceLabel}</p>
          <p className="text-xl font-bold text-foreground">
            {currency}{priceFrom}
            <span className="text-sm font-normal text-muted-foreground"> {perNightLabel}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Users className="h-4 w-4" />
          <span>{capacity}</span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-secondary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={href}>{ctaText}</Link>
        </Button>
      </div>
    </motion.div>
  )
}
