'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Shield, Eye, Smartphone, Clock, BarChart3, Lock, Building, Home, ArrowRight } from 'lucide-react'
import type { Route } from 'next'
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export function VideoSurveillancePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0  z-10"></div>
        <div className="absolute inset-0  z-10"></div>
        <Image 
          src="/assets/img/domono-videosurveillance-bg-hero.svg" 
          alt="Système de vidéosurveillance moderne" 
          fill 
          priority
          sizes="100vw"
          className="object-cover"
        />
        
        <div className="container relative z-20 mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-1 text-sm font-medium">
              Solutions de sécurité avancées
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Vidéosurveillance <span className="text-orange-500">Professionnelle</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Protégez ce qui compte avec nos systèmes de vidéosurveillance haute définition. 
              Solutions sur mesure pour particuliers et professionnels à Marseille.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/devis">Demander un devis gratuit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-teal-500 hover:text-white">
                <Link href="#avantages">Découvrir nos solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avantages Section */}
      <section id="avantages" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir notre vidéosurveillance ?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Une solution complète et professionnelle pour sécuriser vos espaces avec une technologie de pointe adaptée à vos besoins.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Eye className="h-10 w-10 text-orange-500" />,
                title: "Haute définition 4K",
                description: "Images ultra-nettes pour une identification précise des détails, même à distance."
              },
              {
                icon: <Smartphone className="h-10 w-10 text-orange-500" />,
                title: "Contrôle à distance",
                description: "Accédez à vos caméras depuis n'importe où via smartphone, tablette ou ordinateur."
              },
              {
                icon: <Clock className="h-10 w-10 text-orange-500" />,
                title: "Enregistrement 24/7",
                description: "Stockage sécurisé de vos vidéos avec possibilité de consulter l'historique à tout moment."
              },
              {
                icon: <Shield className="h-10 w-10 text-orange-500" />,
                title: "Détection intelligente",
                description: "Algorithmes avancés qui détectent les mouvements suspects et réduisent les fausses alertes."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-orange-500" />,
                title: "Analyses avancées",
                description: "Comptage de personnes, détection de zones, reconnaissance faciale et autres fonctionnalités analytiques."
              },
              {
                icon: <Lock className="h-10 w-10 text-orange-500" />,
                title: "Installation sécurisée",
                description: "Systèmes protégés contre le piratage avec chiffrement des données pour garantir votre confidentialité."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-orange-100 dark:bg-slate-700 p-4 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos solutions de vidéosurveillance</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Des systèmes adaptés à tous types de besoins, que vous soyez un particulier ou une entreprise.
            </p>
          </motion.div>

          <Tabs defaultValue="particuliers" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="particuliers" className="text-lg py-3">
                <Home className="mr-2 h-5 w-5" /> Particuliers
              </TabsTrigger>
              <TabsTrigger value="professionnels" className="text-lg py-3">
                <Building className="mr-2 h-5 w-5" /> Professionnels
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="particuliers">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeIn} className="relative overflow-hidden rounded-xl">
                  <Image 
                    src="/assets/img/domono-installation-camera-survellance.svg" 
                    alt="Vidéosurveillance pour maison" 
                    width={600}
                    height={400}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Protection pour votre domicile</h3>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Surveillance des accès extérieurs (portail, porte d'entrée)",
                      "Protection des zones sensibles de votre jardin ou terrasse",
                      "Caméras discrètes pour l'intérieur de votre habitation",
                      "Vision nocturne avancée pour une sécurité 24h/24",
                      "Notifications en temps réel sur votre smartphone"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="self-start">
                    <Link href="/devis">
                      Obtenir un devis personnalisé
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="professionnels">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeIn} className="flex flex-col justify-center order-2 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Sécurité pour votre entreprise</h3>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Protection périmétrique des locaux professionnels",
                      "Surveillance des zones sensibles (entrepôts, stock, etc.)",
                      "Caméras dômes motorisées pour sites industriels",
                      "Systèmes adaptés aux commerces et grandes surfaces",
                      "Solutions conformes RGPD avec gestion des droits d'accès"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="self-start">
                    <Link href="/devis">
                      Demander une étude personnalisée
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeIn} className="relative overflow-hidden rounded-xl order-1 md:order-2">
                  <Image 
                    src="/assets/img/domono-installation-camera-pro.svg" 
                    alt="Vidéosurveillance pour entreprise" 
                    width={600}
                    height={400}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Processus Section */}
      <section className="py-16 md:py-24 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre processus d'installation</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Une approche méthodique et professionnelle pour vous garantir une installation optimale.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Évaluation de vos besoins spécifiques et audit de votre espace."
              },
              {
                step: "02",
                title: "Conception",
                description: "Élaboration d'une solution personnalisée avec positionnement stratégique des caméras."
              },
              {
                step: "03",
                title: "Installation",
                description: "Mise en place professionnelle par nos techniciens certifiés."
              },
              {
                step: "04",
                title: "Formation",
                description: "Prise en main du système et assistance pour une utilisation optimale."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto pb-12" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à sécuriser votre espace ?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Nos experts sont disponibles pour vous accompagner dans votre projet de vidéosurveillance à Marseille et ses environs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
                <Link href="/devis">Demander un devis gratuit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-teal-500 hover:text-white">
                <Link href={"/contact" as Route}>Nous contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 