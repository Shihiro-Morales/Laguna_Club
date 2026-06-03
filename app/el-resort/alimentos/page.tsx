"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { UtensilsCrossed, Wine, Coffee, Soup, Salad, IceCream, GlassWater, Citrus } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function AlimentosPage() {
  const { t } = useLanguage()

  const menuCategories = [
    { name: t.food.nationalFood, icon: Soup },
    { name: t.food.internationalFood, icon: Salad },
    { name: t.food.breakfast, icon: Coffee },
    { name: t.food.lunch, icon: UtensilsCrossed },
    { name: t.food.dinner, icon: Wine },
    { name: t.food.snacks, icon: IceCream },
  ]

  const barItems = [
    { name: t.food.cocktails, icon: Wine },
    { name: t.food.drinks, icon: GlassWater },
    { name: t.food.juices, icon: Citrus },
    { name: t.food.sodas, icon: GlassWater },
  ]

  return (
    <>
      <HeroSection
        title={t.food.title}
        subtitle={t.food.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
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
            {t.food.description}
          </motion.p>
        </div>
      </section>

      {/* Restaurant & Bar */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Restaurant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                  alt="Restaurant"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {t.food.restaurantTitle}
                  </h3>
                </div>
                <p className="text-muted-foreground">{t.food.restaurantDesc}</p>
              </div>
            </motion.div>

            {/* Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80"
                  alt="Bar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Wine className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {t.food.barTitle}
                  </h3>
                </div>
                <p className="text-muted-foreground">{t.food.barDesc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.food.menuTitle}
            className="mb-12"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-3">
                  <category.icon className="h-6 w-6" />
                </div>
                <p className="font-medium text-foreground text-sm">{category.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-xl font-semibold text-foreground text-center mb-6">
              {t.food.barTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {barItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-muted rounded-xl p-4 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent mx-auto mb-2">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-foreground text-sm">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
