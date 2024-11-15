/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, SprayCanIcon as Spray, Thermometer, Dog, Wind, Snowflake, Phone, Clock, MapPin, Search } from 'lucide-react'
import { FaqSection } from '@/components/faq-section'
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'
import EmergencyForm from "@/components/forms/emergency-form"
import { QuoteModal } from "@/components/modals/quote-modal"
import type { AppRoutes } from '@/types/routes'

// Import dynamique du composant coverage
const CoverageSectionComponent = dynamic(
  () => import('@/components/home/coverage-section'),
  {
    loading: () => (
      <div className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"/>
            <div className="h-6 bg-gray-100 rounded w-1/2 mb-8"/>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"/>
                ))}
              </div>
              <div className="h-[500px] bg-gray-100 rounded-3xl"/>
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
)

// Import dynamique du composant testimonials
const TestimonialsSectionComponent = dynamic(
  () => import('@/components/home/testimonials-section'),
  {
    loading: () => (
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-lg"/>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
)

const HomePage = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <>

      <main suppressHydrationWarning>
        {/* Hero Section - Hauteur réduite */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-orange-100 via-white to-teal-50 overflow-hidden pt-24">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="pt-8 pb-16"> {/* Padding réduit */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
                    <span className="text-teal-600">Spécialiste de la lutte contre</span>
                    <br />
                    <span className="text-orange-400">les punaises de lit</span> et de la
                    <br />
                    <span className="text-teal-600">dératisation</span> en Île-de-France
                  </h1>
                  <Button 
                    size="lg" 
                    className="bg-teal-500 hover:bg-teal-600"
                    onClick={() => setIsQuoteModalOpen(true)}
                    aria-label="Ouvrir le formulaire de demande de devis"
                  >
                    Prendre rendez-vous
                  </Button>
                </div>

                <div className="relative h-[400px] w-full"> {/* Hauteur réduite */}
                  <Image 
                    src="/assets/img/idfnuisibles.svg" 
                    alt="Technicien IDF Nuisibles en intervention"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* City Silhouette */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 150" className="w-full h-auto text-teal-600/10"> {/* Hauteur réduite */}
              <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Emergency Form Section */}
        <EmergencyForm />

        {/* Solutions Section avec margin ajustée */}
        <section className="py-24 mt-8 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-50 blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                Nos <span className="text-orange-400">solutions</span>
              </h2>
            </div>

            <Tabs defaultValue="punaises" className="w-full max-w-lg mx-auto">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-12">
                <TabsTrigger value="punaises">Punaises de lit</TabsTrigger>
                <TabsTrigger value="cafard">Cafard</TabsTrigger>
                <TabsTrigger value="pigeon">Pigeon</TabsTrigger>
                <TabsTrigger value="acarien">Acarien</TabsTrigger>
                <TabsTrigger value="rats">Rats et souris</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <Spray className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement chimique</h3>
                <p className="text-gray-600">
                  Les entreprises de désinsectisation misent principalement sur l'utilisation d'insecticides
                  professionnels pour prévenir et éradiquer les infestations de punaises de lit.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Wind className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement vapeur sèche</h3>
                <p className="text-gray-600">
                  Avec des produits chimiques professionnels et un traitement thermique, il est possible de supprimer
                  les infestations importantes.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Snowflake className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement cryogénisation</h3>
                <p className="text-gray-600">
                  Les punaises de lit ne résistent pas au froid, on parle ici de températures en dessous de 0°C.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Thermometer className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement thermique</h3>
                <p className="text-gray-600">
                  Pour éradiquer la présence de cet insecte, il faut combiner traitements insecticides et traitements
                  thermiques.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
                <Dog className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Détecteur canin</h3>
                <p className="text-gray-600">
                  La détection canine contre les punaises de lit consiste à faire intervenir un chien renifleur,
                  spécialement entraîné.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
              <Search className="h-12 w-12 text-teal-600" />
              <h3 className="text-xl font-bold text-teal-600">Diagnostic & Expertise</h3>
              <p className="text-gray-600">
                Inspection approfondie, identification précise des nuisibles et rapport détaillé. 
                Intervention sur mesure adaptée à votre situation en Île-de-France.
              </p>
              <Button 
                variant="link" 
                className="text-teal-600"
                aria-label="En savoir plus sur nos services de diagnostic et expertise en dératisation et désinsectisation"
              >
                En savoir +
              </Button>
            </Card>
            </div>
          </div>
        </section>

        {/* New Section with Cards */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir <span className="text-teal-600">IDF Nuisibles</span> ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nous offrons des solutions professionnelles et efficaces pour tous vos problèmes de nuisibles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Clock className="h-12 w-12 text-teal-600 mx-auto" />
                <h3 className="text-xl font-bold text-center">Intervention rapide</h3>
                <p className="text-gray-600 text-center">
                  Nous intervenons dans les plus brefs délais pour traiter votre problème de nuisibles.
                </p>
              </Card>
              <Card className="p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Shield className="h-12 w-12 text-teal-600 mx-auto" />
                <h3 className="text-xl font-bold text-center">Expertise reconnue</h3>
                <p className="text-gray-600 text-center">
                  Notre équipe est formée aux dernières techniques de lutte contre les nuisibles.
                </p>
              </Card>
              <Card className="p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <MapPin className="h-12 w-12 text-teal-600 mx-auto" />
                <h3 className="text-xl font-bold text-center">Couverture Île-de-France</h3>
                <p className="text-gray-600 text-center">
                  Nous intervenons dans toute l'Île-de-France pour être au plus proche de vous.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <CoverageSectionComponent />

        {/* Testimonials Section */}
        <TestimonialsSectionComponent />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Modal du formulaire de devis */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <footer className="bg-gray-900 text-white pt-32 pb-8 mt-8 relative">
        {/* Newsletter Card */}
        <Card className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 w-full max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Restez informé</h3>
            <p className="text-center mb-6">Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et conseils.</p>
            <form className="flex gap-4">
              <Input type="email" placeholder="Votre adresse e-mail" className="flex-grow" required />
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">S'inscrire</Button>
            </form>
          </div>
        </Card>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 01 80 88 23 06</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7/7 - 8h à 20h</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Île-de-France</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>Punaises de lit</li>
                <li>Dératisation</li>
                <li>Désinsectisation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Informations</h3>
              <ul className="space-y-2">
                <li><Link href={'/qui-sommes-nous' as AppRoutes}>Qui sommes-nous ?</Link></li>
                <li><Link href={'/tarifs' as AppRoutes}>Tarifs</Link></li>
                <li><Link href={'/blog' as AppRoutes}>Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Zone d'intervention</h3>
              <p>Paris et toute l'Île-de-France</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 IDF Nuisibles. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
export { HomePage }
