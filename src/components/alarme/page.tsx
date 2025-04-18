/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Shield, AlertCircle, BellRing, Smartphone, Clock, Lock, Eye, Settings, HeartHandshake } from 'lucide-react'

export function AlarmePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-teal-600 hover:bg-teal-700">Protection professionnelle</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Systèmes d'alarme haute sécurité pour votre tranquillité
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Solutions de sécurité sur mesure pour particuliers et professionnels à Marseille et ses environs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Demander un devis gratuit
                </Button>
                <Button variant="outline" size="lg" className="border-white text-black hover:bg-orange-500 hover:text-white">
                  Découvrir nos solutions
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/img/domono-bg-hero-night.svg"
                alt="Système d'alarme moderne"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir nos systèmes d'alarme</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Des solutions de sécurité adaptées à vos besoins spécifiques avec des technologies de pointe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Protection 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Surveillance continue de votre domicile ou entreprise, jour et nuit, même lors de vos absences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <AlertCircle className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Détection intelligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Capteurs avancés qui distinguent les vraies intrusions des fausses alertes, limitant les déclenchements inutiles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Smartphone className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Contrôle mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pilotez votre système de sécurité depuis votre smartphone, où que vous soyez.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <BellRing className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Alertes instantanées</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Notifications immédiates sur votre téléphone en cas d'intrusion ou d'événement suspect.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Clock className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Installation rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Mise en place professionnelle de votre système avec un minimum de perturbation de votre quotidien.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Settings className="h-12 w-12 text-teal-600 mb-2" />
                <CardTitle>Maintenance incluse</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Service après-vente et maintenance régulière pour garantir le bon fonctionnement de votre système.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos solutions d'alarme</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de systèmes de sécurité adaptés à tous les besoins
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-[450px]">
                <Image
                  src="/assets/img/services/domono-alarme.svg"
                  alt="Alarme pour résidence"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Alarme résidentielle</h3>
                <p className="text-gray-600 mb-4">
                  Protection optimale pour votre maison ou appartement, avec des capteurs discrets et efficaces.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Détecteurs de mouvement intelligents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Capteurs d'ouverture pour portes et fenêtres</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Sirène intérieure et extérieure</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Application mobile intuitive</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">En savoir plus</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-[450px]">
                <Image
                  src="/assets/img/domono-alarme-entreprise.svg"
                  alt="Alarme pour entreprise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Alarme professionnelle</h3>
                <p className="text-gray-600 mb-4">
                  Solutions avancées pour entreprises, commerces et locaux professionnels avec surveillance renforcée.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Système anti-intrusion périmétrique</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Détection volumétrique haute précision</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Intégration avec vidéosurveillance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <span>Télésurveillance optionnelle 24/7</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">En savoir plus</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus d'installation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre processus d'installation</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Une approche simple et efficace pour sécuriser votre propriété
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Lignes de connexion - visibles uniquement sur grands écrans */}
            <div className="hidden lg:block absolute top-10 left-[calc(10%+60px)] right-[calc(10%+60px)] h-0.5 bg-orange-500 z-0"></div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Consultation</h3>
              <p className="text-gray-600">
                Évaluation de vos besoins spécifiques et visite sur site pour identifier les points vulnérables.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Proposition</h3>
              <p className="text-gray-600">
                Élaboration d'une solution personnalisée et d'un devis détaillé sans engagement.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Installation</h3>
              <p className="text-gray-600">
                Mise en place professionnelle du système par nos techniciens qualifiés.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Formation</h3>
              <p className="text-gray-600">
                Explication complète du fonctionnement et configuration de l'application mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de nos clients satisfaits à Marseille et environs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "L'installation a été rapide et propre. Le système est très intuitif, et l'application mobile est un vrai plus pour contrôler notre alarme à distance. On se sent en sécurité."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/assets/img/services/domono-alarme.svg"
                      alt="Client satisfait"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Sophie M.</p>
                    <p className="text-sm text-gray-500">Propriétaire à Marseille</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Pour notre boutique, nous avions besoin d'une solution fiable. Le système proposé nous offre une tranquillité d'esprit totale, avec des alertes précises et une excellente couverture."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonial-2.jpg"
                      alt="Client satisfait"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Thomas L.</p>
                    <p className="text-sm text-gray-500">Commerçant à Aix-en-Provence</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Service client exceptionnel du début à la fin. Le technicien a pris le temps d'expliquer chaque détail du système et nous a aidés à configurer l'application. Très satisfait !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonial-3.jpg"
                      alt="Client satisfait"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Émilie et Pierre D.</p>
                    <p className="text-sm text-gray-500">Famille à Marseille</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à sécuriser votre propriété ?</h2>
            <p className="text-xl mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et un devis personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Demander un devis
              </Button>
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-orange-500 hover:text-white">
                Nous appeler
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur nos systèmes d'alarme
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Combien coûte l'installation d'un système d'alarme ?</h3>
                <p className="text-gray-600">
                  Le coût varie en fonction de la taille de votre propriété et du niveau de sécurité souhaité. Nous proposons des solutions sur mesure adaptées à différents budgets. Contactez-nous pour un devis personnalisé gratuit.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Est-ce que l'installation nécessite des travaux importants ?</h3>
                <p className="text-gray-600">
                  Non, nos systèmes d'alarme modernes sont conçus pour une installation minimalement invasive. Dans la plupart des cas, aucun câblage important n'est nécessaire, et nous veillons à préserver l'esthétique de votre espace.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Comment fonctionne le contrôle à distance ?</h3>
                <p className="text-gray-600">
                  Grâce à notre application mobile intuitive, vous pouvez armer/désarmer votre système, recevoir des notifications en temps réel, et même vérifier l'état de vos détecteurs, où que vous soyez, tant que vous disposez d'une connexion internet.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Que se passe-t-il en cas de coupure de courant ?</h3>
                <p className="text-gray-600">
                  Nos systèmes disposent de batteries de secours qui prennent automatiquement le relais en cas de coupure de courant, assurant une protection continue de votre propriété.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Proposez-vous des contrats de maintenance ?</h3>
                <p className="text-gray-600">
                  Oui, nous offrons différentes formules de maintenance pour garantir le bon fonctionnement de votre système dans la durée. Nos techniciens effectuent des vérifications régulières et interviennent rapidement en cas de besoin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 