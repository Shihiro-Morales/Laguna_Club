"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  variant?: "default" | "featured" | "compact"
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  variant = "default",
  className,
}: ServiceCardProps) {
  const variants = {
    default: "p-6 sm:p-8",
    featured: "p-8 sm:p-10 bg-primary text-primary-foreground",
    compact: "p-5",
  }

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    featured: "bg-white/20 text-white",
    compact: "bg-primary/10 text-primary",
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300",
        variants[variant],
        className
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-xl mb-5",
          iconVariants[variant]
        )}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3
        className={cn(
          "font-serif text-xl font-semibold mb-2",
          variant === "featured" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          variant === "featured" ? "text-white/90" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
      {href && (
        <div
          className={cn(
            "mt-4 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all",
            variant === "featured" ? "text-white" : "text-primary"
          )}
        >
          <span>Learn more</span>
          <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
        </div>
      )}
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
