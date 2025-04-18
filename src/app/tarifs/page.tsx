import { Metadata } from 'next'
import { Suspense } from 'react'
import { TarifsPage } from '@/components/tarifs/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Tarifs Domotique et Sécurité | Solutions Abordables à Marseille | Domono",
  description: "Découvrez nos offres et tarifs pour l'installation de systèmes domotiques, d'alarmes et de vidéosurveillance à Marseille. Devis personnalisé gratuit et solutions flexibles pour tous les budgets.",
  keywords: "tarifs domotique, prix alarme, coût vidéosurveillance, devis domotique, prix installation sécurité, solutions abordables, forfaits domotique Marseille",
  openGraph: {
    title: "Nos Tarifs | Solutions Domotique & Sécurité | Domono Marseille",
    description: "Offres transparentes et solutions sur mesure pour sécuriser et connecter votre habitat ou entreprise à Marseille",
    type: "website",
    locale: "fr_FR",
    siteName: "Domono Marseille",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/tarifs"
  }
}

export default function TarifsPageContainer() {
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
      <TarifsPage />
    </Suspense>
  )
} 