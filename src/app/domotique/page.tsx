import { Metadata } from 'next'
import { Suspense } from 'react'
import { DomotiquePage } from '@/components/domotique/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Domotique Marseille - Solutions de Maison Connectée | Domono",
  description: "Expert en domotique et systèmes de maison intelligente à Marseille. Installation professionnelle pour contrôler éclairage, sécurité et confort. Devis gratuit.",
  keywords: "domotique, maison connectée, smart home, système intelligent, Marseille, automatisation maison, contrôle à distance, économie d'énergie",
  openGraph: {
    title: "Domotique Marseille - Transformez votre Habitat avec Domono",
    description: "Solutions professionnelles de domotique pour une maison moderne, sécurisée et économe en énergie à Marseille et environs",
    type: "website",
    locale: "fr_FR",
    siteName: "Domono",
    images: [
      {
        url: "/assets/img/domotique-banner.webp",
        width: 1200,
        height: 630,
        alt: "Domotique moderne par Domono Marseille"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Domotique à Marseille | Domono",
    description: "Installations domotiques professionnelles pour maisons connectées à Marseille",
    images: ["/assets/img/domotique-banner.webp"]
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/domotique"
  }
}

export default function Domotique() {
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
      <DomotiquePage />
    </Suspense>
  )
} 