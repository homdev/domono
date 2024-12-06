import { Metadata } from 'next'
import { Suspense } from 'react'
import { HomePage } from '@/components/home/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "IDF Nuisibles - Expert en Dératisation et Désinsectisation en Île-de-France",
  description: "Spécialiste de la lutte contre les punaises de lit et de la dératisation en Île-de-France. Intervention rapide 7j/7, devis gratuit. Solutions professionnelles pour tous types de nuisibles.",
  keywords: "dératisation, désinsectisation, punaises de lit, nuisibles, Île-de-France, Paris, traitement thermique, détection canine, intervention rapide",
  openGraph: {
    title: "IDF Nuisibles - Expert en Dératisation",
    description: "Solutions professionnelles pour tous vos problèmes de nuisibles en Île-de-France",
    type: "website",
    locale: "fr_FR",
    siteName: "IDF Nuisibles",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.idfnuisibles.fr"
  }
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grid place-items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  )
}
