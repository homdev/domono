/* eslint-disable react/no-unescaped-entities */
'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Zap, Award, ChevronRight, Phone, Clock, MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { AppRoutes } from "@/types/routes"
import { HeroSection } from "./hero-section"
import EmergencyForm from "@/components/forms/emergency-form"

export const metadata = {
  title: "Qui sommes-nous ? | IDF Nuisibles - Expert en dératisation et désinsectisation",
  description: "Découvrez l'histoire, les valeurs et l'équipe d'IDF Nuisibles, votre expert en dératisation et désinsectisation en Île-de-France. Intervention rapide et professionnelle.",
  keywords: "IDF Nuisibles, dératisation, désinsectisation, Île-de-France, punaises de lit, histoire, valeurs, équipe",
}

export default function QuiSommesNous() {
  return (
    <>
      {/* Hero Section with Contact Form */}
      <HeroSection />
      <EmergencyForm />

      <main className="py-16">
        <section id="notre-histoire" className="container mx-auto px-4 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondée en 2010, Domono Marseille est née de la passion de notre fondateur pour l'environnement et la santé publique. 
                Nous avons commencé comme une petite entreprise familiale et avons grandi pour devenir un acteur majeur de la 
                 domotique en Marseille et ses environs.
              </p>
              <p className="text-gray-600 mb-4">
                Au fil des années, nous avons développé des techniques innovantes et écologiques pour combattre efficacement 
                la domotique en Marseille et ses environs.
              </p>
              <Button variant="outline" className="mt-4">
                En savoir plus
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/assets/img/domono-support.svg"
                alt="L'évolution de Domono Marseille au fil des années"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-24 mb-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professionnalisme</h3>
                <p className="text-gray-600">
                  Nous nous engageons à fournir un service de la plus haute qualité, avec une équipe formée et certifiée.
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Réactivité</h3>
                <p className="text-gray-600">
                  Nous intervenons rapidement pour résoudre vos problèmes de domotique, 7j/7 et dans toute Marseille et ses environs.
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Award className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                <p className="text-gray-600">
                  Notre équipe est constamment formée aux dernières techniques pour garantir des résultats optimaux.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((member) => (
              <Card key={member} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?text=Team+Member+${member}`}
                    alt={`Membre de l'équipe ${member}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Nom du Membre {member}</h3>
                  <p className="text-gray-600 mb-2">Poste / Spécialité</p>
                  <p className="text-sm text-gray-500">
                    Expert en domotique avec X années d'expérience.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à travailler avec nous ?</h2>
            <p className="text-xl mb-8">
              Contactez-nous dès aujourd'hui pour une intervention rapide et professionnelle.
            </p>
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
              <Link href={'/contact' as AppRoutes}>Demander un devis gratuit</Link>
            </Button>
          </div>
        </section>
      </main>

    </>
  )
}