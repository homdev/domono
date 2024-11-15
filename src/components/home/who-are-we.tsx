import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Users, Zap, Award, ChevronRight, Phone, Clock, MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Qui sommes-nous ? | IDF Nuisibles - Expert en dératisation et désinsectisation",
  description: "Découvrez l'histoire, les valeurs et l'équipe d'IDF Nuisibles, votre expert en dératisation et désinsectisation en Île-de-France. Intervention rapide et professionnelle.",
  keywords: "IDF Nuisibles, dératisation, désinsectisation, Île-de-France, punaises de lit, histoire, valeurs, équipe",
}

export default function QuiSommesNous() {
  return (
    <>
      {/* Hero Section with Contact Form */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-orange-100 via-white to-teal-50 overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 h-full flex flex-col justify-between">
          <div className="pt-12 pb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-teal-600">Qui sommes-nous ?</span>
                  <br />
                  <span className="text-orange-400">Votre partenaire</span> contre les
                  <br />
                  <span className="text-teal-600">nuisibles</span> en Île-de-France
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Découvrez l'histoire et les valeurs qui font d'IDF Nuisibles votre expert de confiance en dératisation et désinsectisation.
                </p>
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                  Découvrir notre histoire
                </Button>
              </div>

              <div className="relative h-[500px] w-full">
                <Image 
                  src="/placeholder.svg" 
                  alt="L'équipe IDF Nuisibles en action"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center">
                Vous avez des questions ? <span className="text-orange-400">Contactez-nous</span>
              </h2>
              <form className="grid md:grid-cols-3 gap-4">
                <Input type="text" placeholder="Nom & Prénom" className="bg-white" required />
                <Input type="tel" placeholder="Téléphone" className="bg-white" required />
                <Input type="email" placeholder="Email" className="bg-white" required />
                <Input type="text" placeholder="Votre message" className="md:col-span-3 bg-white" required />
                <Button className="md:col-span-3 bg-teal-500 hover:bg-teal-600">
                  Envoyer
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto text-white">
            <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <main className="py-16">
        <section id="notre-histoire" className="container mx-auto px-4 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondée en 2010, IDF Nuisibles est née de la passion de notre fondateur pour l'environnement et la santé publique. 
                Nous avons commencé comme une petite entreprise familiale et avons grandi pour devenir un acteur majeur de la 
                lutte contre les nuisibles en Île-de-France.
              </p>
              <p className="text-gray-600 mb-4">
                Au fil des années, nous avons développé des techniques innovantes et écologiques pour combattre efficacement 
                les nuisibles tout en respectant l'environnement.
              </p>
              <Button variant="outline" className="mt-4">
                En savoir plus
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg"
                alt="L'évolution d'IDF Nuisibles au fil des années"
                fill
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
                  Nous intervenons rapidement pour résoudre vos problèmes de nuisibles, 7j/7 et dans toute l'Île-de-France.
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
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Nom du Membre {member}</h3>
                  <p className="text-gray-600 mb-2">Poste / Spécialité</p>
                  <p className="text-sm text-gray-500">
                    Expert en lutte contre les nuisibles avec X années d'expérience.
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
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
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
                <li><Link href="/qui-sommes-nous">Qui sommes-nous ?</Link></li>
                <li><Link href="/tarifs">Tarifs</Link></li>
                <li><Link href="/blog">Blog</Link></li>
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