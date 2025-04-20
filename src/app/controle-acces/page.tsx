import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ControleAccesPage } from '@/components/controle-acces/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: 'Solutions de contrôle d\'accès à Marseille | Domono',
  description: 'Installation de systèmes de contrôle d\'accès intelligents à Marseille et environs. Sécurité renforcée, authentification biométrique et solutions connectées pour particuliers et entreprises.',
  keywords: ['contrôle d\'accès', 'serrure connectée', 'marseille', 'accès biométrique', 'sécurité', 'badge', 'interphone vidéo'],
  openGraph: {
    title: 'Solutions de contrôle d\'accès à Marseille | Domono',
    description: 'Installation de systèmes de contrôle d\'accès intelligents à Marseille et environs. Sécurité renforcée, authentification biométrique et gestion des accès à distance.',
    url: 'https://domono.fr/controle-acces',
    siteName: 'Domono',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions de contrôle d\'accès à Marseille | Domono',
    description: 'Installation de systèmes de contrôle d\'accès intelligents à Marseille et environs. Sécurité renforcée, authentification biométrique et gestion des accès à distance.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/controle-acces"
  }
}

export default function ControleAcces() {
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
      <ControleAccesPage />
    </Suspense>
  )
} 