"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  title: string
  description: string
  image?: string
  icon?: LucideIcon
  className?: string
}

export function ActivityCard({
  title,
  description,
  image,
  icon: Icon,
  className,
}: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {image ? (
        <>
          {/* Image Background */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-xl font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-white/90">{description}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Icon Variant */}
          <div className="p-6">
            {Icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Icon className="h-6 w-6" />
              </div>
            )}
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </>
      )}
    </motion.div>
  )
}
