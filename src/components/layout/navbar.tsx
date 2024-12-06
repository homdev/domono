'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Shield, Menu, Phone } from 'lucide-react'
import Link from "next/link"
import { QuoteModal } from "@/components/modals/quote-modal"
import { AppRoutes } from "@/types/routes"
export default function Navbar() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-2 py-2">
        <nav className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 md:h-8 md:w-8 text-teal-600" />
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-xl">IDF NUISIBLES</span>
              <span className="text-[10px] md:text-xs text-orange-400">7/7 - 24/24h • Devis gratuit</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link href={'/' as AppRoutes} className="text-sm hover:text-teal-600">Accueil</Link>
            <Link href={'/qui-sommes-nous' as AppRoutes} className="text-sm hover:text-teal-600">Qui sommes-nous ?</Link>
            <Link href={'/nos-exterminons' as AppRoutes} className="text-sm hover:text-teal-600">Nous exterminons</Link>
            <Link href={'/desinsectisation' as AppRoutes} className="text-sm hover:text-teal-600">Désinsectisation</Link>
            <Link href={'/pro' as AppRoutes} className="text-sm hover:text-teal-600">Pro</Link>
            <Link href={'/tarifs' as AppRoutes} className="text-sm hover:text-teal-600">Tarifs</Link>
            <Link href={'/blog' as AppRoutes} className="text-sm hover:text-teal-600">Blog</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              className="hidden lg:flex bg-orange-100 hover:bg-orange-200 text-orange-600"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Prenez RDV
            </Button>

            <a href="tel:0180882306">
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-xs md:text-sm px-2 md:px-4"
                size="sm"
              >
                <Phone className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">01 80 88 23 06</span>
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
                    href={'/accueil' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link 
                    href={'/qui-sommes-nous' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Qui sommes-nous ?
                  </Link>
                  <Link 
                    href={'/nos-exterminons' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nous exterminons
                  </Link>
                  <Link 
                    href={'/desinsectisation' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Désinsectisation
                  </Link>
                  <Link 
                    href={'/pro' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pro
                  </Link>
                  <Link 
                    href={'/tarifs' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tarifs
                  </Link>
                  <Link 
                    href={'/blog' as AppRoutes} 
                    className="text-lg hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsQuoteModalOpen(true)
                    }}
                  >
                    Prendre rendez-vous
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </header>
  )
}