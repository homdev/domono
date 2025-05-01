'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Home, Building2, ChevronRight, Shield, Eye, Smartphone, Clock, Star, XCircle, HelpCircle, ZapIcon } from 'lucide-react'
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

// Plans tarifaires pour la domotique
const domotiquePlans = [
  {
    id: "essentiel",
    title: "Essentiel",
    price: "799",
    pricePerMonth: "33",
    popular: false,
    description: "L'entrée idéale dans l'univers de la maison connectée",
    features: [
      { text: "Centrale domotique Smart Home", included: true },
      { text: "Contrôle de 3 points d'éclairage", included: true },
      { text: "1 thermostat intelligent", included: true },
      { text: "Application mobile dédiée", included: true },
      { text: "Contrôle vocal (1 assistant)", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "1 an de maintenance incluse", included: true },
      { text: "Automatisation avancée", included: false },
      { text: "Détection de présence", included: false },
    ]
  },
  {
    id: "confort",
    title: "Confort",
    price: "1499",
    pricePerMonth: "62",
    popular: true,
    description: "Notre solution la plus populaire pour une maison vraiment intelligente",
    features: [
      { text: "Centrale domotique Smart Home Pro", included: true },
      { text: "Contrôle de 8 points d'éclairage", included: true },
      { text: "2 thermostats intelligents", included: true },
      { text: "Application mobile dédiée", included: true },
      { text: "Contrôle vocal (multiples assistants)", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "2 ans de maintenance incluse", included: true },
      { text: "Automatisation avancée", included: true },
      { text: "Détection de présence", included: true },
    ]
  },
  {
    id: "premium",
    title: "Premium",
    price: "2499",
    pricePerMonth: "104",
    popular: false,
    description: "L'expérience complète pour les amateurs de technologie exigeants",
    features: [
      { text: "Centrale domotique Smart Home Elite", included: true },
      { text: "Contrôle illimité des points d'éclairage", included: true },
      { text: "Thermostats intelligents multi-zones", included: true },
      { text: "Application mobile personnalisée", included: true },
      { text: "Contrôle vocal intégral", included: true },
      { text: "Installation sur mesure", included: true },
      { text: "3 ans de maintenance premium", included: true },
      { text: "Automatisation avancée et scénarios", included: true },
      { text: "Système complet de détection", included: true },
    ]
  }
];

// Plans tarifaires pour l'alarme
const alarmePlans = [
  {
    id: "protection",
    title: "Protection",
    price: "599",
    pricePerMonth: "25",
    popular: false,
    description: "Sécurité de base pour appartements et petites maisons",
    features: [
      { text: "Centrale d'alarme connectée", included: true },
      { text: "2 détecteurs de mouvement", included: true },
      { text: "2 capteurs d'ouverture", included: true },
      { text: "1 sirène intérieure", included: true },
      { text: "Application mobile de contrôle", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "Alertes en temps réel", included: true },
      { text: "Sirène extérieure", included: false },
      { text: "Télésurveillance 24/7", included: false },
    ]
  },
  {
    id: "securite",
    title: "Sécurité+",
    price: "999",
    pricePerMonth: "42",
    popular: true,
    description: "Protection renforcée pour une tranquillité d'esprit totale",
    features: [
      { text: "Centrale d'alarme avancée", included: true },
      { text: "4 détecteurs de mouvement", included: true },
      { text: "5 capteurs d'ouverture", included: true },
      { text: "Sirènes intérieure et extérieure", included: true },
      { text: "Application mobile avancée", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "Alertes en temps réel", included: true },
      { text: "Batterie de secours longue durée", included: true },
      { text: "Option télésurveillance", included: false },
    ]
  },
  {
    id: "forteresse",
    title: "Forteresse",
    price: "1799",
    pricePerMonth: "75",
    popular: false,
    description: "La solution ultime pour une sécurité sans compromis",
    features: [
      { text: "Centrale d'alarme professionnelle", included: true },
      { text: "Détecteurs de mouvement avancés (illimités)", included: true },
      { text: "Capteurs d'ouverture (illimités)", included: true },
      { text: "Système de sirènes multiples", included: true },
      { text: "Plateforme de sécurité dédiée", included: true },
      { text: "Installation sur mesure", included: true },
      { text: "Alertes personnalisées", included: true },
      { text: "Système anti-sabotage", included: true },
      { text: "Télésurveillance 24/7 incluse", included: true },
    ]
  }
];

// Plans tarifaires pour la vidéosurveillance
const videoPlans = [
  {
    id: "surveillance",
    title: "Surveillance",
    price: "699",
    pricePerMonth: "29",
    popular: false,
    description: "Solution de base pour sécuriser les points d'entrée",
    features: [
      { text: "2 caméras HD extérieures", included: true },
      { text: "Enregistreur numérique", included: true },
      { text: "Stockage 500 Go", included: true },
      { text: "Vision nocturne", included: true },
      { text: "Application de visionnage", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "Détection de mouvement", included: true },
      { text: "Caméras intérieures", included: false },
      { text: "Reconnaissance faciale", included: false },
    ]
  },
  {
    id: "vigilance",
    title: "Vigilance",
    price: "1299",
    pricePerMonth: "54",
    popular: true,
    description: "Couverture complète pour l'intérieur et l'extérieur",
    features: [
      { text: "2 caméras HD extérieures", included: true },
      { text: "2 caméras HD intérieures", included: true },
      { text: "Enregistreur intelligent", included: true },
      { text: "Stockage 2 To", included: true },
      { text: "Vision nocturne avancée", included: true },
      { text: "Application dédiée et alertes", included: true },
      { text: "Installation professionnelle", included: true },
      { text: "Détection intelligente", included: true },
      { text: "Reconnaissance faciale", included: false },
    ]
  },
  {
    id: "panoptique",
    title: "Panoptique",
    price: "2399",
    pricePerMonth: "100",
    popular: false,
    description: "Surveillance professionnelle avec technologies avancées",
    features: [
      { text: "Système complet de caméras 4K", included: true },
      { text: "Couverture intérieure et extérieure", included: true },
      { text: "NVR professionnel", included: true },
      { text: "Stockage cloud et local", included: true },
      { text: "Vision nocturne ultra HD", included: true },
      { text: "Centre de contrôle dédié", included: true },
      { text: "Installation sur mesure", included: true },
      { text: "IA de détection avancée", included: true },
      { text: "Reconnaissance faciale et analyse", included: true },
    ]
  }
];

// FAQs
const faqs = [
  {
    question: "Les prix incluent-ils l'installation ?",
    answer: "Oui, tous nos forfaits incluent l'installation professionnelle par nos techniciens certifiés. Nos experts s'assurent que votre système est parfaitement configuré et vous forment à son utilisation."
  },
  {
    question: "Puis-je personnaliser les forfaits selon mes besoins ?",
    answer: "Absolument ! Nos forfaits sont des points de départ, mais nous comprenons que chaque client a des besoins uniques. Contactez-nous pour une consultation gratuite et nous créerons une solution sur mesure adaptée à vos exigences spécifiques."
  },
  {
    question: "Quelles sont les options de paiement disponibles ?",
    answer: "Nous proposons un paiement unique ou des options de financement mensuel sans frais (selon éligibilité). Pour les installations professionnelles, nous acceptons également les paiements échelonnés."
  },
  {
    question: "Les systèmes sont-ils compatibles avec mes appareils existants ?",
    answer: "La plupart de nos systèmes sont conçus pour s'intégrer avec les technologies existantes. Lors de notre visite d'évaluation, nous analyserons votre installation actuelle et vous conseillerons sur les meilleures options de compatibilité."
  },
  {
    question: "Quelle est la durée de la garantie ?",
    answer: "Tous nos systèmes sont couverts par une garantie fabricant de 2 ans minimum. Les forfaits Confort et Premium incluent des extensions de garantie et des services de maintenance supplémentaires pour votre tranquillité d'esprit."
  },
  {
    question: "Proposez-vous un service après-vente ?",
    answer: "Oui, notre service client est disponible 6j/7 pour répondre à vos questions. Nous proposons également des contrats de maintenance qui incluent des vérifications périodiques et des interventions prioritaires en cas de besoin."
  }
];

// Témoignages
const testimonials = [
  {
    name: "Marie et Laurent D.",
    location: "Propriétaires, Marseille 8ème",
    quote: "L'installation domotique a complètement transformé notre quotidien. Le forfait Confort répondait parfaitement à nos besoins et l'équipe a été d'un professionnalisme exemplaire.",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    name: "Restaurant La Méditerranée",
    location: "Entreprise, Vieux-Port",
    quote: "Notre système de vidéosurveillance nous apporte une tranquillité d'esprit totale. La qualité d'image est exceptionnelle et le service après-vente toujours réactif.",
    image: "https://images.unsplash.com/photo-1542373285-a85e52a098e2?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    name: "Sophie M.",
    location: "Appartement, Marseille 6ème",
    quote: "J'ai opté pour le forfait Protection pour mon appartement. L'installation a été rapide et le système est très simple à utiliser au quotidien. Je me sens enfin en sécurité.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    rating: 4
  }
];

export function TarifsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState('domotique');
  
  // Déterminer quels plans afficher selon la catégorie
  const getPlans = () => {
    switch(selectedCategory) {
      case 'domotique': return domotiquePlans;
      case 'alarme': return alarmePlans;
      case 'video': return videoPlans;
      default: return domotiquePlans;
    }
  };

  const plans = getPlans();

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <Image 
          src="/assets/img/optimized/domono-bg-hero.webp" 
          alt="Tarifs transparents pour solutions domotiques et de sécurité" 
          fill 
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        
        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-1 text-sm font-medium">
              Tarifs transparents et sans surprise
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Des forfaits adaptés <span className="text-orange-500">à vos besoins</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10">
              Solutions sur mesure pour sécuriser et connecter votre habitat à Marseille.
              Découvrez nos offres claires pour tous les budgets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href={"/devis" as Route}>Demander un devis personnalisé</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-teal-500 hover:text-white">
                <a href="#pricing">Voir les tarifs</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Choix de catégorie et cycle de facturation */}
      <section id="pricing" className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nos forfaits et tarifs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Choisissez la solution qui correspond le mieux à vos besoins. Tous nos forfaits incluent l'installation professionnelle et une garantie complète.
            </p>
            
            {/* Sélection de catégorie */}
            <Tabs 
              defaultValue="domotique" 
              className="max-w-3xl mx-auto" 
              onValueChange={setSelectedCategory}
            >
              <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-2 mb-10">
                <TabsList className="grid grid-cols-3 w-full bg-transparent">
                  <TabsTrigger 
                    value="domotique" 
                    className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
                  >
                    <Smartphone className="mr-2 h-4 w-4" /> Domotique
                  </TabsTrigger>
                  <TabsTrigger 
                    value="alarme" 
                    className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
                  >
                    <Shield className="mr-2 h-4 w-4" /> Alarme
                  </TabsTrigger>
                  <TabsTrigger 
                    value="video" 
                    className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
                  >
                    <Eye className="mr-2 h-4 w-4" /> Vidéosurveillance
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            {/* Toggle mensuel/annuel */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Paiement mensuel
              </span>
              <div className="relative">
                <Switch 
                  checked={billingCycle === 'yearly'}
                  onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                  className="data-[state=checked]:bg-orange-500"
                />
                <span className="absolute -top-6 right-0 text-xs font-medium text-white bg-green-500 px-2 py-0.5 rounded-full animate-pulse">
                  -20%
                </span>
              </div>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Paiement annuel
              </span>
            </div>
          </motion.div>

          {/* Cartes de tarifs */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => (
              <motion.div 
                key={plan.id}
                variants={fadeIn}
                className={`relative rounded-xl overflow-hidden transition-all ${
                  plan.popular ? 'md:-mt-4 md:mb-4 shadow-xl border-orange-500 border-2' : 'shadow-lg border border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-4 text-sm font-semibold">
                    Populaire
                  </div>
                )}
                <div className="bg-white dark:bg-slate-800 p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 h-12">{plan.description}</p>
                  
                  <div className="mb-6">
                    {billingCycle === 'monthly' ? (
                      <>
                        <p className="text-4xl font-bold">
                          <span className="text-orange-500">{plan.pricePerMonth}€</span>
                          <span className="text-sm text-gray-500 font-normal"> /mois</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Engagement 24 mois ou {plan.price}€ en une fois</p>
                      </>
                    ) : (
                      <>
                        <p className="text-4xl font-bold">
                          <span className="text-orange-500">{Math.round(Number(plan.price) * 0.8)}€</span>
                          <span className="text-sm text-gray-500 font-normal"> /an</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Économisez 20% avec l'offre annuelle</p>
                      </>
                    )}
                  </div>
                  
                  <Button 
                    asChild
                    className={`w-full ${
                      plan.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'
                    }`}
                    size="lg"
                  >
                    <Link href={`/devis?forfait=${plan.id}&categorie=${selectedCategory}` as Route}>
                      Obtenir un devis
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900 p-6">
                  <p className="font-medium mb-4">Ce forfait inclut :</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Besoin d'une solution sur mesure ? Nos experts sont là pour vous conseiller.
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href={"/contact" as Route}>Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir nos solutions ?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Nous nous engageons à vous offrir un service exceptionnel et des solutions adaptées à vos besoins.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Shield className="h-12 w-12 text-orange-500" />,
                title: "Expertise reconnue",
                description: "Plus de 10 ans d'expérience et des techniciens certifiés pour des installations irréprochables."
              },
              {
                icon: <Star className="h-12 w-12 text-orange-500" />,
                title: "Produits premium",
                description: "Nous sélectionnons uniquement des équipements de haute qualité des meilleures marques."
              },
              {
                icon: <ZapIcon className="h-12 w-12 text-orange-500" />,
                title: "Service réactif",
                description: "Une équipe dédiée pour répondre à toutes vos questions et intervenir rapidement si besoin."
              },
              {
                icon: <Clock className="h-12 w-12 text-orange-500" />,
                title: "Garantie étendue",
                description: "Tous nos systèmes sont garantis, avec des options d'extension pour votre tranquillité."
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="rounded-full w-20 h-20 bg-orange-100 dark:bg-slate-700 mx-auto flex items-center justify-center mb-6">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Badge className="mb-4 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-1 text-sm font-medium">
              Témoignages clients
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Découvrez les expériences de nos clients satisfaits à Marseille et ses environs.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill={i < testimonial.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Trouvez les réponses à vos interrogations sur nos services et tarifs.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <AccordionItem value={`item-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-slate-800 text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 pb-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à sécuriser et connecter votre espace ?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Nos experts sont disponibles pour vous accompagner dans votre projet sur mesure à Marseille et ses environs.
              Devis gratuit et sans engagement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    <Building2 className="h-10 w-10 mx-auto mb-2" />
                    Professionnels
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">Solutions sur mesure pour sécuriser vos locaux et optimiser vos espaces de travail</p>
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90 w-full">
                    <Link href={"/devis?type=pro" as Route}>Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    <Home className="h-10 w-10 mx-auto mb-2" />
                    Particuliers
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">Protégez votre domicile et profitez du confort d'une maison connectée</p>
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90 w-full">
                    <Link href={"/devis?type=particulier" as Route}>Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <p className="mt-8 text-white/80">
              Vous avez des questions ? Contactez-nous au <span className="font-bold">04 91 XX XX XX</span> ou via notre <Link href={"/contact" as Route} className="underline font-medium">formulaire de contact</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 