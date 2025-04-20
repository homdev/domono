/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Shield, 
  Key, 
  Fingerprint, 
  Smartphone, 
  Clock, 
  Lock, 
  Building, 
  Users, 
  Calendar,
  Cog, 
  Settings 
} from 'lucide-react'

export function ControleAccesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 to-teal-700 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(300,300)">
              <path d="M144.9,-196.3C188.9,-173.9,226.4,-132.3,239.3,-83.7C252.2,-35.1,240.4,20.4,218.1,66.9C195.8,113.5,162.9,150.9,123.5,178.9C84.1,206.8,38.1,225.1,-13.1,241.9C-64.3,258.6,-120.9,273.7,-161.4,254.2C-201.9,234.7,-226.3,180.6,-247.1,127.2C-267.9,73.8,-285.2,21.1,-278.2,-28C-271.2,-77,-239.8,-122.5,-200,-148.2C-160.3,-173.9,-112.2,-179.7,-69.4,-201.8C-26.6,-223.9,12,-262.3,57.4,-258.3C102.7,-254.4,154.8,-208.2,144.9,-196.3Z" fill="#0694a2" />
            </g>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-orange-500 hover:bg-orange-600 font-normal">Sécurité intelligente</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Contrôle d'accès nouvelle génération pour votre sécurité
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                Solutions innovantes et personnalisées pour sécuriser vos locaux et contrôler précisément qui y a accès.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Demander un devis gratuit
                </Button>
                <Button variant="outline" size="lg" className="border-white text-black hover:bg-teal-700 hover:text-white">
                  Découvrir nos solutions
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-6">
            <Image src="/assets/img/services/domono-access.svg" alt="Contrôle d'accès" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-pulse"></div>
                  <Lock className="w-full h-full text-orange-500 border-4 border-orange-500 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir nos solutions de contrôle d'accès</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Des technologies de pointe pour gérer et sécuriser tous les accès à vos espaces de vie et de travail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Sécurité renforcée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Éliminez les risques liés aux clés perdues ou volées grâce à des systèmes d'authentification avancés.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Fingerprint className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Authentification biométrique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Identification unique et infalsifiable par empreinte digitale, reconnaissance faciale ou badge RFID sécurisé.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Smartphone className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Contrôle à distance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Gérez les accès depuis votre smartphone, où que vous soyez, et recevez des notifications en temps réel.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Users className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Gestion des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Attribuez des droits d'accès personnalisés à chaque utilisateur et modifiez-les instantanément si nécessaire.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Calendar className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Historique complet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Conservez un journal détaillé de tous les accès pour une traçabilité parfaite des entrées et sorties.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <Cog className="h-12 w-12 text-orange-500 mb-2" />
                <CardTitle>Intégration domotique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connectez votre système de contrôle d'accès à votre installation domotique pour une maison totalement intelligente.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos solutions de contrôle d'accès</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Des systèmes adaptés à tous les besoins, des résidences aux grands complexes commerciaux
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-700/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <Image
                  src="/assets/img/services/domono-access.svg"
                  alt="Contrôle d'accès résidentiel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">Solutions résidentielles</h3>
                <p className="text-gray-600 mb-6">
                  Sécurisez votre domicile avec élégance grâce à nos systèmes de contrôle d'accès adaptés aux particuliers.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Serrures connectées avec ouverture par smartphone</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Interphones vidéo avec contrôle à distance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Systèmes biométriques discrets et élégants</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Intégration avec alarme et vidéosurveillance</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 group-hover:bg-orange-500 transition-colors">Découvrir l'offre</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-700/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <Image
                  src="/assets/img/services/domono-access.svg"
                  alt="Contrôle d'accès pour entreprise"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">Solutions professionnelles</h3>
                <p className="text-gray-600 mb-6">
                  Systèmes avancés pour entreprises, commerces et bâtiments collectifs avec gestion centralisée.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Contrôle d'accès multi-zones et multi-sites</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Badges, cartes et lecteurs RFID haute sécurité</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Authentification multi-facteurs (code + badge)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Logiciel de gestion avec rapports d'activité</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 group-hover:bg-orange-500 transition-colors">Découvrir l'offre</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section technologies avancées */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">Technologie de pointe</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Des innovations au service de votre sécurité</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Découvrez nos technologies avancées qui révolutionnent le contrôle d'accès moderne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-6 mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <Fingerprint className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Biométrie avancée</h3>
              <p className="text-gray-600">
                Reconnaissance d'empreintes digitales, faciale et vocale pour une identification unique et infalsifiable.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-6 mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accès mobile</h3>
              <p className="text-gray-600">
                Utilisez votre smartphone comme clé virtuelle sécurisée avec authentification chiffrée.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-6 mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chiffrement avancé</h3>
              <p className="text-gray-600">
                Protocoles de sécurité de niveau bancaire qui protègent contre le piratage et la duplication.
              </p>
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
              Une approche méthodique pour mettre en place votre système de contrôle d'accès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Lignes de connexion - visibles uniquement sur grands écrans */}
            <div className="hidden lg:block absolute top-10 left-[calc(10%+60px)] right-[calc(10%+60px)] h-0.5 bg-orange-500 z-0"></div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Audit sécurité</h3>
              <p className="text-gray-600">
                Analyse complète de vos besoins et des points d'accès à sécuriser pour une solution sur mesure.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Conception</h3>
              <p className="text-gray-600">
                Élaboration d'une solution intégrée qui répond parfaitement à vos exigences de sécurité.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Installation</h3>
              <p className="text-gray-600">
                Mise en place par nos techniciens certifiés avec une attention particulière aux détails.
              </p>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Formation</h3>
              <p className="text-gray-600">
                Formation complète à l'utilisation et à la gestion de votre nouveau système de contrôle d'accès.
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
              Découvrez les expériences de nos clients avec nos solutions de contrôle d'accès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Notre résidence est désormais parfaitement sécurisée grâce au contrôle d'accès par badge. L'application mobile est un vrai plus, nous pouvons voir qui sonne et ouvrir à distance."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full overflow-hidden mr-4 flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold">Syndic Les Calanques</p>
                    <p className="text-sm text-gray-500">Résidence à Marseille</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "L'installation de lecteurs biométriques et de badges RFID a considérablement amélioré la sécurité de nos locaux. Les rapports d'accès nous donnent une visibilité parfaite."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full overflow-hidden mr-4 flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold">Pierre M.</p>
                    <p className="text-sm text-gray-500">Dirigeant d'entreprise à Aix-en-Provence</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Nos serrures connectées ont transformé notre quotidien. Plus besoin de s'inquiéter des clés perdues, et pouvoir donner un accès temporaire aux personnes de confiance est vraiment pratique."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full overflow-hidden mr-4 flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold">Famille Roussel</p>
                    <p className="text-sm text-gray-500">Particuliers à Marseille</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à sécuriser vos accès ?</h2>
            <p className="text-xl mb-8">
              Contactez-nous dès aujourd'hui pour une étude personnalisée et un devis gratuit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Demander un devis
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-800">
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
              Tout ce que vous devez savoir sur nos solutions de contrôle d'accès
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">Quels types de systèmes de contrôle d'accès proposez-vous ?</h3>
                <p className="text-gray-600">
                  Nous proposons une large gamme de solutions : serrures connectées, interphones vidéo, lecteurs de badges, systèmes biométriques (empreintes digitales, reconnaissance faciale), digicode et solutions hybrides. Notre expertise nous permet de vous conseiller la solution la plus adaptée à vos besoins spécifiques.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">Comment fonctionne une serrure connectée ?</h3>
                <p className="text-gray-600">
                  Une serrure connectée remplace ou s'adapte à votre serrure existante pour permettre un déverrouillage par smartphone, badge, code ou empreinte digitale. Elle communique via Bluetooth ou Wi-Fi avec votre réseau domestique, vous permettant de contrôler et surveiller l'accès à distance, de créer des clés virtuelles temporaires, et de recevoir des notifications d'activité.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">Les systèmes sont-ils compatibles avec ma maison intelligente ?</h3>
                <p className="text-gray-600">
                  Oui, nos solutions de contrôle d'accès sont conçues pour s'intégrer parfaitement avec les principales plateformes domotiques comme Google Home, Amazon Alexa, Apple HomeKit, et autres systèmes courants. Cette compatibilité vous permet de créer des scénarios automatisés, comme allumer les lumières lorsque vous déverrouillez la porte.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">Que se passe-t-il en cas de panne électrique ?</h3>
                <p className="text-gray-600">
                  Nos systèmes de contrôle d'accès disposent de batteries de secours intégrées qui prennent automatiquement le relais en cas de coupure de courant. De plus, la plupart de nos serrures connectées conservent également un accès mécanique traditionnel de secours pour une tranquillité d'esprit totale.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3">Ces systèmes sont-ils vraiment sécurisés contre le piratage ?</h3>
                <p className="text-gray-600">
                  Absolument. Nous utilisons des protocoles de chiffrement de niveau bancaire pour toutes les communications, avec authentification multi-facteurs pour les accès critiques. Nos technologies biométriques utilisent des modèles chiffrés impossibles à reproduire, et nos systèmes sont régulièrement mis à jour pour intégrer les dernières protections contre les nouvelles menaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 