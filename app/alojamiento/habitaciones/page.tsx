"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Wifi, Bath, Mountain, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/components/providers/language-provider"

export default function HabitacionesPage() {
  const { t } = useLanguage()

  const roomTypes = [
    {
      name: t.privateRooms.types.standard,
      description: t.privateRooms.types.standardDesc,
      price: 45,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      capacity: "2 personas",
      amenities: ["WiFi", "Baño compartido", "Ventilador"],
    },
    {
      name: t.privateRooms.types.superior,
      description: t.privateRooms.types.superiorDesc,
      price: 75,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      capacity: "2-3 personas",
      amenities: ["WiFi", "Baño privado", "A/C", "Vista jardín"],
      featured: true,
    },
    {
      name: t.privateRooms.types.deluxe,
      description: t.privateRooms.types.deluxeDesc,
      price: 95,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      capacity: "2-4 personas",
      amenities: ["WiFi", "Baño privado", "A/C", "Vista al lago", "Desayuno"],
    },
  ]

  return (
    <>
      <HeroSection
        title={t.privateRooms.title}
        subtitle={t.privateRooms.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
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
            {t.privateRooms.description}
          </motion.p>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.privateRooms.title}
            className="mb-12"
          />

          <div className="space-y-12">
            {roomTypes.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden md:[direction:ltr]">
                  {room.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="md:[direction:ltr]">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{room.capacity}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{room.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-full text-sm text-foreground"
                      >
                        {amenity === "WiFi" && <Wifi className="h-3.5 w-3.5" />}
                        {amenity.includes("Baño") && <Bath className="h-3.5 w-3.5" />}
                        {amenity.includes("Vista") && <Mountain className="h-3.5 w-3.5" />}
                        {amenity.includes("Desayuno") && <Coffee className="h-3.5 w-3.5" />}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.accommodation.priceFrom}</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${room.price} <span className="text-base font-normal text-muted-foreground">{t.accommodation.perNight}</span>
                      </p>
                    </div>
                  </div>

                  <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
                    <Link href="/reservaciones">{t.accommodation.bookNow}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
