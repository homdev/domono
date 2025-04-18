import { Metadata } from 'next'
import { Suspense } from 'react'
import { VideoSurveillancePage } from '@/components/videosurveillance/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Vidéosurveillance professionnelle Marseille | Domono",
  description: "Installation de systèmes de vidéosurveillance haute définition pour particuliers et professionnels à Marseille. Solutions connectées, surveillance à distance et enregistrement HD.",
  keywords: "vidéosurveillance Marseille, caméras de surveillance, CCTV, caméras IP, système de sécurité vidéo, vidéosurveillance à distance, caméras extérieures, caméras intérieures",
  openGraph: {
    title: "Vidéosurveillance professionnelle Marseille | Domono",
    description: "Solutions de vidéosurveillance haute définition pour sécuriser votre logement ou entreprise à Marseille",
    type: "website",
    locale: "fr_FR",
    siteName: "Domono Marseille",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/videosurveillance"
  }
}

export default function VideoSurveillancePageContainer() {
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
      <VideoSurveillancePage />
    </Suspense>
  )
} 