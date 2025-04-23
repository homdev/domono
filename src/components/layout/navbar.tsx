'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Home, Menu, Phone } from 'lucide-react'
import Link from "next/link"
import { AppRoutes } from "@/types/routes"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-2 py-2">
        <nav className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 md:h-8 md:w-8 text-teal-600" />
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-xl">DOMONO <span className="text-teal-600">France</span></span>
              <span className="text-[10px] md:text-xs text-orange-400">7/7 - 8h à 20h • Devis gratuit</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link href={'/' as AppRoutes} className="text-sm hover:text-teal-600">Accueil</Link>
            <Link href={'/domotique' as AppRoutes} className="text-sm hover:text-teal-600">Domotique</Link>
            <Link href={'/alarme' as AppRoutes} className="text-sm hover:text-teal-600">Alarme</Link>
            <Link href={'/videosurveillance' as AppRoutes} className="text-sm hover:text-teal-600">Vidéosurveillance</Link>
            <Link href={'/controle-acces' as AppRoutes} className="text-sm hover:text-teal-600">Contrôle d'accès</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/devis" aria-label="Demander un devis gratuit">
              <Button 
                variant="ghost" 
                className="hidden lg:flex bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full"
              >
                Demander un devis
              </Button>
            </Link>

            <a href="tel:0767036848" aria-label="Appeler au 07 67 03 68 48">
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-xs md:text-sm px-2 md:px-4 rounded-full"
                size="sm"
                aria-label="Appeler au 07 67 03 68 48"
              >
                <Phone className="h-4 w-4 md:mr-2" aria-hidden="true" />
                <span className="hidden md:inline">07 67 03 68 48</span>
              </Button>
            </a>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-white pt-12"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-2xl font-bold text-teal-600">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6">
                  <Link 
                    href={'/' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link 
                    href={'/domotique' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Domotique
                  </Link>
                  <Link 
                    href={'/alarme' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Alarme
                  </Link>
                  <Link 
                    href={'/videosurveillance' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vidéosurveillance
                  </Link>
                  <Link 
                    href={'/tarifs' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tarifs
                  </Link>
                  <Link href="/devis" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-4">
                      Demander un devis gratuit
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
