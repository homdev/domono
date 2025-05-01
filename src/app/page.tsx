import { Metadata } from 'next'
import { Suspense } from 'react'
import { HomePage } from '@/components/home/page'

// Configuration pour le mode statique
export const dynamic = 'auto';
export const dynamicParams = false;
export const revalidate = 3600; // Revalidation toutes les heures

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Domono Marseille - Expert en Domotique et Maisons Connectées",
  description: "Spécialiste de la domotique et des maisons intelligentes à Marseille et alentours. Installation d'alarmes, vidéosurveillance, système incendie et contrôle d'accès. Devis gratuit.",
  keywords: "domotique, maison connectée, alarme, vidéosurveillance, sécurité incendie, Marseille, contrôle d'accès, IoT, installation",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Domono Marseille - Expert en Domotique",
    description: "Solutions professionnelles pour transformer votre maison en habitat intelligent. Alarmes, vidéosurveillance et systèmes de sécurité à Marseille.",
    images: [
      {
        url: '/assets/img/optimized/domono-bg-hero-1280.webp',
        width: 1280,
        height: 720,
        alt: 'Domono Marseille - Expert en domotique',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr"
  },
  // Pour charger en priorité l'image hero pour la page d'accueil
  other: {
    'preload-0': '/assets/img/optimized/domono-bg-hero-1280.webp',
  }
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Hero section skeleton */}
          <div className="h-[80vh] relative rounded-2xl overflow-hidden bg-gray-200 mb-8">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
          
          {/* Services section skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  )
}
