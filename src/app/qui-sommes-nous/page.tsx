import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, LightbulbIcon, Award, Target } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'

export const metadata: Metadata = {
  title: 'Notre Histoire | Domono - Experts en domotique et sécurité à Marseille',
  description: 'Découvrez l\'histoire des frères fondateurs de Domono, experts en solutions domotiques et sécurité innovantes à Marseille. Une aventure familiale au service de votre confort et sécurité.',
  keywords: 'Domono, domotique Marseille, histoire entreprise, fondateurs, maison connectée, sécurité intelligente',
  openGraph: {
    title: 'Notre Histoire | Domono - Experts en domotique à Marseille',
    description: 'Découvrez l\'histoire des frères fondateurs de Domono, experts en solutions domotiques et sécurité innovantes à Marseille.',
    url: 'https://domono.fr/qui-sommes-nous',
    siteName: 'Domono Marseille',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre Histoire | Domono Marseille',
    description: 'Experts en domotique et sécurité à Marseille',
  },
  alternates: {
    canonical: 'https://domono.fr/qui-sommes-nous',
  },
  robots: {
    index: true,
    follow: true,
  }
}

// Données structurées pour le SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Domono',
  description: 'Experts en domotique et sécurité à Marseille',
  url: 'https://domono.fr',
  foundingDate: '2020',
  areaServed: {
    '@type': 'City',
    name: 'Marseille',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Provence-Alpes-Côte d\'Azur',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '07 67 03 68 48',
    contactType: 'customer service',
    areaServed: 'Marseille',
    availableLanguage: 'French',
  }
}

export default function QuiSommesNousPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 md:py-24">
        
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre <span className="text-teal-600">Histoire</span></h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
                Découvrez comment deux frères passionnés de technologie ont créé Domono pour révolutionner l'expérience de la maison connectée et sécurisée à Marseille.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6">Une aventure fraternelle</h2>
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                  <p>
                    Tout a commencé en 2020, au cœur de Marseille, lorsque Mohamed (Momo) et Nordine (Nono), deux frères passionnés de technologie, ont décidé de combiner leurs expertises pour créer quelque chose d'unique.
                  </p>
                  <p>
                    <strong className="text-teal-600">Momo</strong>, ingénieur en informatique et électronique, fasciné par l'IoT et les systèmes embarqués, avait déjà transformé sa propre maison en laboratoire de domotique. Il passait ses soirées à concevoir des solutions pour automatiser chaque aspect de son quotidien.
                  </p>
                  <p>
                    <strong className="text-teal-600">Nono</strong>, technicien supérieur en technologies de l'information et communication, expert en réseaux et sécurité, apportait sa vision pragmatique et son souci du détail pour garantir des installations robustes et sécurisées.
                  </p>
                  <p>
                    Un soir d'été, autour d'un pastis sur le Vieux-Port, une discussion animée sur les limites des solutions existantes a fait naître l'idée : <em>"Et si on créait notre propre entreprise pour offrir des solutions vraiment adaptées aux besoins des Marseillais ?"</em>
                  </p>
                </div>
                
                <div className="mt-12 flex items-center space-x-4">
                  <div className="w-16 h-1 bg-teal-500"></div>
                  <p className="text-xl font-bold italic text-teal-600">"La technologie au service du confort et de la sécurité"</p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <p className="text-slate-400 dark:text-slate-500">Image des fondateurs</p>
                  </div>
                  Remplacer par une vraie image avec:
                  <Image 
                    src="/assets/img/domono-fondateurs.svg" 
                    alt="Les frères fondateurs de Domono" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-teal-500 text-white p-6 rounded-xl shadow-lg max-w-[280px]">
                  <p className="font-bold mb-2">2020</p>
                  <p>Année de fondation de Domono à Marseille</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Journey Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Notre parcours</h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-16">De l'idée à l'entreprise de référence en domotique à Marseille</p>
              
              <div className="space-y-16">
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 w-full max-w-[250px] z-10">
                      <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <LightbulbIcon size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">La vision</h3>
                      <p className="text-slate-600 dark:text-slate-400">Rendre la domotique accessible à tous les Marseillais</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-8 absolute left-[calc(33%-4px)] top-1/2 h-full">
                    <div className="h-full w-1 bg-teal-200 dark:bg-teal-900 mx-auto"></div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-12">
                    <p className="text-slate-700 dark:text-slate-300">
                      Au départ, les frères testaient leurs installations chez des amis et de la famille. Leur approche personnalisée et attentive a rapidement fait le tour de Marseille. Ils partageaient une vision claire : la technologie doit s'adapter à l'utilisateur, et non l'inverse. Contrairement aux solutions standardisées du marché, Momo et Nono prenaient le temps de comprendre les besoins spécifiques de chaque client avant de proposer la moindre installation.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 w-full max-w-[250px] z-10">
                      <div className="bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Target size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Le défi</h3>
                      <p className="text-slate-600 dark:text-slate-400">S'imposer dans un marché dominé par les grands groupes</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-8 absolute left-[calc(33%-4px)] top-0 h-full">
                    <div className="h-full w-1 bg-teal-200 dark:bg-teal-900 mx-auto"></div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-12">
                    <p className="text-slate-700 dark:text-slate-300">
                      Le plus grand défi était de convaincre que leur approche locale et personnalisée pouvait rivaliser avec les solutions standardisées des grandes entreprises. Leur premier bureau était un petit local dans le quartier du Panier. Ils jonglaient entre consultations, installations et service après-vente. Les premières années ont exigé des sacrifices, mais leur détermination et l'accent mis sur la qualité du service client ont rapidement porté leurs fruits.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 w-full max-w-[250px] z-10">
                      <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Award size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Aujourd'hui</h3>
                      <p className="text-slate-600 dark:text-slate-400">Reconnus comme experts en solutions connectées</p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-12">
                    <p className="text-slate-700 dark:text-slate-300">
                      Aujourd'hui, Domono est devenu la référence en matière de domotique et sécurité à Marseille. L'entreprise s'est agrandie, mais les frères continuent de superviser personnellement chaque projet important. Leur réussite repose sur un principe simple : traiter chaque maison comme si c'était la leur. Cette philosophie a créé une communauté fidèle de clients qui recommandent Domono à leurs proches, formant ainsi un réseau qui s'étend désormais dans toute la région PACA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Nos valeurs</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Les principes qui guident chacune de nos actions et installations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl text-center">
                <div className="bg-teal-100 dark:bg-teal-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Passion</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Notre enthousiasme pour la technologie nous pousse à rester à la pointe de l'innovation pour vous offrir les meilleures solutions.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Proximité</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Notre connaissance du territoire marseillais nous permet d'adapter nos solutions aux spécificités locales et de garantir un service réactif.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Nous ne nous contentons jamais de la moyenne. Chaque installation est réalisée avec un souci du détail qui fait notre réputation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <div className="container mx-auto px-4  pb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre habitat ?</h2>
              <p className="text-xl mb-10 text-white/90">
                Rencontrons-nous pour discuter de votre projet et voir comment nous pouvons vous aider à créer la maison de vos rêves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-orange-500 text-white hover:bg-orange-400">
                  <Link href={"/devis" as Route}>Demander un devis gratuit</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-black hover:bg-teal-500 hover:text-white">
                  <Link href={"/contact" as Route}>
                    Contacter notre équipe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
