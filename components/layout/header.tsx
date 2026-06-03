"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  const navigation = [
    { name: t.nav.home, href: "/" },
    {
      name: t.nav.resort,
      href: "/el-resort",
      children: [
        { name: t.nav.activities, href: "/el-resort/actividades" },
        { name: t.nav.dayPass, href: "/el-resort/day-pass" },
        { name: t.nav.foodBeverage, href: "/el-resort/alimentos" },
        { name: t.nav.directions, href: "/el-resort/direcciones" },
        { name: t.nav.gallery, href: "/el-resort/galeria" },
      ],
    },
    {
      name: t.nav.accommodation,
      href: "/alojamiento",
      children: [
        { name: t.nav.dormitory, href: "/alojamiento/dormitorio" },
        { name: t.nav.privateRooms, href: "/alojamiento/habitaciones" },
        { name: t.nav.villas, href: "/alojamiento/villas" },
      ],
    },
    { name: t.nav.reservations, href: "/reservaciones" },
    {
      name: t.nav.tourism,
      href: "/turismo",
      children: [
        { name: t.nav.masaya, href: "/turismo/masaya" },
        { name: t.nav.granada, href: "/turismo/granada" },
        { name: t.nav.culture, href: "/turismo/cultura" },
      ],
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="font-serif text-lg font-bold text-primary-foreground">LB</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold text-foreground">Laguna Beach</span>
              <span className="block text-xs text-muted-foreground -mt-1">Club</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-56 rounded-xl bg-card border border-border shadow-lg overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-4 py-3 text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side: Language + CTA */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Book Now Button */}
            <Button asChild className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
              <Link href="/reservaciones">{t.nav.bookNow}</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-lg transition-colors",
                              isActive(child.href)
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/reservaciones" onClick={() => setMobileMenuOpen(false)}>
                      {t.nav.bookNow}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
