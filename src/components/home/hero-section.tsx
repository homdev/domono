'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { QuoteModal } from "@/components/modals/quote-modal"

export const HeroSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // ou un placeholder/skeleton
  }

  return (
    <>
      <section className="relative h-[calc(100vh-64px)] min-h-[600px] max-h-[900px] bg-gradient-to-br from-orange-100 via-white to-teal-50 overflow-hidden pt-24 w-full">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-72 md:w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 left-0 w-72 md:w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 max-w-full md:max-w-7xl h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
            <div className="space-y-6 min-h-[200px]">
              <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
                <span className="text-teal-600">Spécialiste de la lutte contre</span>
                <br />
                <span className="text-orange-400">les punaises de lit</span> et de la
                <br />
                <span className="text-teal-600">dératisation</span> en Île-de-France
              </h1>
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600"
                onClick={() => setIsQuoteModalOpen(true)}
                aria-label="Ouvrir le formulaire de demande de devis"
              >
                Prendre rendez-vous
              </Button>
            </div>

            <div className="relative aspect-[4/3] w-full max-w-[600px] mx-auto">
              <Image 
                src="/assets/img/optimized/idfnuisibles.webp"
                alt="Technicien IDF Nuisibles en intervention"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-contain"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/webp;base64,..."
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[150px]">
          <svg 
            viewBox="0 0 1440 150" 
            className="w-full h-full text-teal-600/10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {isMounted && (
        <QuoteModal 
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}
    </>
  )
} 