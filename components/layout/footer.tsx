"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.resort, href: "/el-resort" },
    { name: t.nav.accommodation, href: "/alojamiento" },
    { name: t.nav.reservations, href: "/reservaciones" },
    { name: t.nav.tourism, href: "/turismo" },
  ]

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">LB</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold">Laguna Beach</span>
                <span className="block text-xs text-background/70 -mt-1">Club</span>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/80">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li>
                <a
                  href="tel:+50512345678"
                  className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+505 1234 5678</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lagunabeachclub.com"
                  className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@lagunabeachclub.com</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">{t.footer.followUs}</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t.footer.newsletter}</h3>
            <p className="text-background/80 text-sm mb-4">{t.footer.newsletterDesc}</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="w-full px-4 py-2.5 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {t.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>
              &copy; {new Date().getFullYear()} Laguna Beach Club. {t.footer.rights}.
            </p>
            <p>
              Laguna de Apoyo, Nicaragua
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
