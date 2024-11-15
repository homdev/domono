import { Metadata } from 'next'
import QuiSommesNous from '@/components/home/who-are-we'

export const metadata: Metadata = {
  title: 'Qui sommes-nous ? | IDF Nuisibles - Expert en dératisation et désinsectisation',
  description: 'Découvrez l\'histoire, les valeurs et l\'équipe d\'IDF Nuisibles, votre expert en dératisation et désinsectisation en Île-de-France. Intervention rapide et professionnelle.',
  keywords: 'IDF Nuisibles, dératisation, désinsectisation, Île-de-France, punaises de lit, histoire, valeurs, équipe',
  openGraph: {
    title: 'Qui sommes-nous ? | IDF Nuisibles - Expert en dératisation',
    description: 'Découvrez l\'histoire, les valeurs et l\'équipe d\'IDF Nuisibles, votre expert en dératisation et désinsectisation en Île-de-France.',
    url: 'https://idfnuisibles.fr/who-are-we',
    siteName: 'IDF Nuisibles',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/equipe-idf-nuisibles.jpg', // À remplacer par votre image réelle
        width: 1200,
        height: 630,
        alt: 'L\'équipe IDF Nuisibles - Experts en dératisation et désinsectisation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qui sommes-nous ? | IDF Nuisibles',
    description: 'Expert en dératisation et désinsectisation en Île-de-France',
    images: ['/images/equipe-idf-nuisibles.jpg'], // À remplacer par votre image réelle
  },
  alternates: {
    canonical: 'https://idfnuisibles.fr/who-are-we',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-verification-google', // À remplacer par votre code
  },
  authors: [{ name: 'IDF Nuisibles' }],
  category: 'Entreprise de dératisation',
  other: {
    'revisit-after': '7 days',
    'og:region': 'Île-de-France',
    'og:country-name': 'France',
  },
}

// Données structurées pour le SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'IDF Nuisibles',
  description: 'Expert en dératisation et désinsectisation en Île-de-France',
  url: 'https://idfnuisibles.fr',
  foundingDate: '2010',
  areaServed: {
    '@type': 'State',
    name: 'Île-de-France',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '01 80 88 23 06',
    contactType: 'customer service',
    areaServed: 'Île-de-France',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://www.facebook.com/idfnuisibles', // À remplacer par vos liens réels
    'https://www.instagram.com/idfnuisibles',
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <QuiSommesNous />
    </>
  )
}
