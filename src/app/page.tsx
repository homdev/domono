import { Metadata } from 'next'
import { Suspense } from 'react'
import { HomePage } from '@/components/home/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Domono Marseille - Expert en Domotique et Maisons Connectées",
  description: "Spécialiste de la domotique et des maisons intelligentes à Marseille et alentours. Installation d'alarmes, vidéosurveillance, système incendie et contrôle d'accès. Devis gratuit.",
  keywords: "domotique, maison connectée, alarme, vidéosurveillance, sécurité incendie, Marseille, contrôle d'accès, IoT, installation",
  openGraph: {
    title: "Domono Marseille - Expert en Domotique",
    description: "Solutions professionnelles pour transformer votre maison en habitat connecté à Marseille",
    type: "website",
    locale: "fr_FR",
    siteName: "Domono Marseille",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr"
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
