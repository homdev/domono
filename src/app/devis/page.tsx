import { Metadata } from 'next';
import React from 'react';
import Stepper from '@/components/devis/stepper';

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: 'Demande de devis | Système de sécurité et domotique à Marseille',
  description: 'Demandez un devis personnalisé pour vos projets de sécurité et domotique à Marseille. Installation professionnelle d\'alarmes, vidéosurveillance, contrôle d\'accès et solutions domotiques.',
  keywords: ['devis domotique', 'devis alarme', 'installation vidéosurveillance Marseille', 'prix domotique', 'contrôle d\'accès Marseille'],
  openGraph: {
    title: 'Demande de devis | Système de sécurité et domotique à Marseille',
    description: 'Demandez un devis personnalisé pour vos projets de sécurité et domotique à Marseille. Installation professionnelle.',
    url: 'https://www.votredomaine.fr/devis',
    siteName: 'Domotic Solutions Marseille',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demande de devis | Système de sécurité et domotique à Marseille',
    description: 'Demandez un devis personnalisé pour vos projets de sécurité et domotique à Marseille. Installation professionnelle.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/devis"
  }
}

export default function DevisPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-4">Demande de devis</h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Obtenez un devis personnalisé pour votre projet de sécurité ou domotique à Marseille. Notre équipe vous accompagnera dans la réalisation de votre projet sur mesure.
        </p>
        
        <Stepper />
      </div>
    </main>
  );
} 