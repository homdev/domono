"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CallToAction } from '@/components/shared/call-to-action'
import { HeroSection } from '../home/hero-section'
import EmergencyForm from '@/components/forms/emergency-form'
import ContactForm from '@/components/forms/contact-form'

export function DomotiquePage() {
  return (
    <main className="min-h-screen w-full overflow-hidden">
      {/* Section Hero avec effet parallaxe */}
      <HeroSection />
      <EmergencyForm />   

      {/* Section Avantages avec chiffres */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir la domotique ?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La domotique transforme votre maison en un espace intelligent, sécurisé et économe en énergie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "Sécurité renforcée",
                description: "Contrôlez à distance vos alarmes, caméras et systèmes d'accès pour une protection optimale",
                stat: "98%",
                statText: "des clients notent une amélioration de leur sentiment de sécurité"
              },
              {
                icon: "💰",
                title: "Économies d'énergie",
                description: "Optimisez votre consommation énergétique grâce à des systèmes intelligents et automatisés",
                stat: "30%",
                statText: "d'économies moyennes sur les factures d'énergie"
              },
              {
                icon: "✨",
                title: "Confort quotidien",
                description: "Pilotez l'ensemble de vos équipements depuis une seule interface simple et intuitive",
                stat: "15+",
                statText: "équipements connectés dans une maison moderne moyenne"
              }
            ].map((advantage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground mb-4">{advantage.description}</p>
                <div className="border-t pt-4 mt-4">
                  <p className="text-3xl font-bold text-primary">{advantage.stat}</p>
                  <p className="text-sm text-muted-foreground">{advantage.statText}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services Domotiques */}
      <section id="nos-services" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos solutions domotiques</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos services complets pour transformer votre maison en habitat connecté
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {[
              {
                title: "Contrôle d'éclairage intelligent",
                description: "Programmez, automatisez et contrôlez à distance l'ensemble de vos éclairages pour créer l'ambiance parfaite",
                imageSrc: "/assets/img/optimized/domono-eclairage.webp",
                features: [
                  "Programmation horaire automatique",
                  "Contrôle par smartphone ou assistant vocal",
                  "Détection de présence et réglage de luminosité"
                ]
              },
              {
                title: "Sécurité et vidéosurveillance",
                description: "Protégez votre domicile avec des systèmes d'alarme et de surveillance connectés accessibles à distance",
                imageSrc: "/assets/img/optimized/domono-installation-camera-survellance.webp",
                features: [
                  "Caméras HD avec vision nocturne",
                  "Alertes en temps réel sur smartphone",
                  "Intégration avec portier vidéo et contrôle d'accès"
                ]
              },
              {
                title: "Gestion de température",
                description: "Optimisez votre chauffage et climatisation pour un confort optimal et des économies d'énergie significatives",
                imageSrc: "/assets/img/optimized/domono-temperature.webp",
                features: [
                  "Thermostats intelligents multi-zones",
                  "Programmation adaptative selon vos habitudes",
                  "Contrôle à distance depuis votre smartphone"
                ]
              },
              {
                title: "Automatisation complète",
                description: "Centralisez le contrôle de tous vos équipements pour une maison entièrement connectée et personnalisée",
                imageSrc: "/assets/img/optimized/domono-automatisation.webp",
                features: [
                  "Centralisation de tous vos appareils",
                  "Scénarios automatisés et personnalisables",
                  "Compatible avec les principaux assistants vocaux"
                ]
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 bg-card rounded-xl overflow-hidden shadow-md`}
              >
                <div className="relative w-full md:w-3/5 h-60 md:h-auto">
                  <Image 
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className="w-full md:w-2/5 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Processus en étapes - Design épuré */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre approche personnalisée</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un processus simple et efficace pour créer votre solution domotique sur mesure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Consultation initiale gratuite",
                description: "Nous échangeons sur vos besoins, vos attentes et votre budget pour comprendre votre projet"
              },
              {
                number: "02",
                title: "Étude technique",
                description: "Nos experts conçoivent une solution personnalisée adaptée à votre habitat et vos besoins spécifiques"
              },
              {
                number: "03",
                title: "Installation professionnelle",
                description: "Notre équipe de techniciens qualifiés installe et configure l'ensemble de votre système domotique"
              },
              {
                number: "04",
                title: "Accompagnement",
                description: "Nous vous formons à l'utilisation de votre système et restons disponibles pour tout besoin d'assistance"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-xl shadow-md relative"
              >
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-normal mb-3 mt-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Demande de Devis/Contact */}
      <section id="demande-devis" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Demandez votre devis gratuit</h2>
                <p className="text-muted-foreground mb-8">
                  Complétez le formulaire ci-dessous pour recevoir une étude personnalisée et un devis détaillé pour votre projet domotique
                </p>
                
                <ContactForm />
              </div>
              
              <div className="relative hidden lg:block lg:col-span-3">
                <Image 
                  src="/assets/img/optimized/domono-support.webp"
                  alt="Maison intelligente avec tablette de contrôle"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                  <div className="bg-card p-8 rounded-lg max-w-xs text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Contactez-nous directement</h3>
                    <p className="mb-6">Besoin de réponses rapides ? Notre équipe est à votre disposition.</p>
                    <a href="tel:+33767636848" className="flex items-center justify-center text-lg mb-3">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      07 67 63 68 48
                    </a>
                    <a href="mailto:contact@domono.fr" className="flex items-center justify-center text-lg">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      contact@domono.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits à Marseille et ses environs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                location: "Marseille 8ème",
                rating: 5,
                comment: "Installation impeccable de notre système domotique. Toute la maison est désormais contrôlable depuis notre smartphone. Le service client est réactif et professionnel."
              },
              {
                name: "Thomas Dubois",
                location: "Aix-en-Provence",
                rating: 5,
                comment: "Domono a transformé notre maison avec un système intelligent complet. L'équipe est compétente et à l'écoute. Je recommande vivement leurs services."
              },
              {
                name: "Marie Leroy",
                location: "Cassis",
                rating: 4,
                comment: "Excellent travail pour notre système de sécurité connecté. Installation propre et professionnelle. Formation claire sur l'utilisation du système."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <CallToAction
        title="Prêt à transformer votre maison ?"
        description="Contactez-nous dès aujourd'hui pour une consultation gratuite et commencez votre projet domotique"
        buttonText="Demander un devis"
        buttonHref="#demande-devis"
        secondaryButtonText="Nos services"
        secondaryButtonHref="#nos-services"
      />
    </main>
  )
} 