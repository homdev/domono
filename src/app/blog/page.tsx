import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogPage } from '@/components/blog/page'

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: "Blog Domotique et Sécurité | Domono Marseille",
  description: "Conseils, astuces et actualités sur la domotique, les systèmes d'alarme, la vidéosurveillance et les maisons connectées à Marseille. Restez informé des dernières innovations.",
  keywords: "blog domotique, actualités sécurité, conseils maison connectée, innovations domotiques, guide vidéosurveillance, tendances alarmes, nouvelles technologies",
  openGraph: {
    title: "Blog Domotique et Sécurité | Domono Marseille",
    description: "Découvrez nos articles sur les solutions modernes pour sécuriser et connecter votre habitat à Marseille",
    type: "website",
    locale: "fr_FR",
    siteName: "Domono Marseille",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/blog"
  }
}

export default function BlogPageContainer() {
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
      <BlogPage />
    </Suspense>
  )
} 