import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AlarmePage } from '@/components/alarme/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: 'Systèmes d\'alarme professionnels à Marseille | Domono',
  description: 'Installation de systèmes d\'alarme de haute qualité à Marseille et environs. Protection 24/7, contrôle à distance et service professionnel pour particuliers et entreprises.',
  keywords: ['alarme', 'système de sécurité', 'marseille', 'protection', 'vidéosurveillance', 'détection intrusion', 'alarme connectée'],
  openGraph: {
    title: 'Systèmes d\'alarme professionnels à Marseille | Domono',
    description: 'Installation de systèmes d\'alarme de haute qualité à Marseille et environs. Protection 24/7, contrôle à distance et service professionnel.',
    url: 'https://domono.fr/alarme',
    siteName: 'Domono',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systèmes d\'alarme professionnels à Marseille | Domono',
    description: 'Installation de systèmes d\'alarme de haute qualité à Marseille et environs. Protection 24/7, contrôle à distance et service professionnel.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/alarme"
  }
}

export default function Alarme() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-teal-600 rounded-full"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <AlarmePage />
    </Suspense>
  )
} 