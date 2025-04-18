'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon, ShieldAlert, Video, KeyRound } from 'lucide-react'

const services = [
  {
    id: 'domotique',
    name: 'Domotique',
    description: 'Solutions pour une maison intelligente et connectée',
    icon: HomeIcon,
    benefits: ['Confort au quotidien', 'Économies d\'énergie', 'Contrôle à distance']
  },
  {
    id: 'alarme',
    name: 'Alarme intrusion',
    description: 'Systèmes d\'alarme professionnels anti-intrusion',
    icon: ShieldAlert,
    benefits: ['Protection 24/7', 'Dissuasion efficace', 'Alertes en temps réel']
  },
  {
    id: 'video',
    name: 'Vidéosurveillance',
    description: 'Caméras de surveillance haute définition',
    icon: Video,
    benefits: ['Vision jour et nuit', 'Accès à distance', 'Enregistrement sécurisé']
  },
  {
    id: 'acces',
    name: 'Contrôle d\'accès',
    description: 'Solutions sécurisées pour contrôler les accès',
    icon: KeyRound,
    benefits: ['Gestion des droits', 'Historique des entrées', 'Multi-technologies']
  }
]

type ServiceSelectionProps = {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function ServiceSelection({ formData, updateFormData }: ServiceSelectionProps) {
  // Sélection d'un service
  const selectService = (serviceId: string) => {
    updateFormData({ service: serviceId })
  }

  // Animation pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-2">Quel type de service recherchez-vous ?</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Sélectionnez le service qui correspond le mieux à votre projet.
      </p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = formData.service === service.id
          
          return (
            <motion.div key={service.id} variants={itemVariants}>
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md h-full ${
                  isSelected 
                    ? 'border-orange-500 dark:border-orange-400 shadow-md border-2' 
                    : 'hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onClick={() => selectService(service.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                    </div>
                    
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-sm mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
      
      {formData.service && (
        <motion.div 
          className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-orange-800 dark:text-orange-300">
            <span className="font-semibold">Excellent choix !</span> Cliquez sur "Suivant" pour continuer à préciser votre projet de {
              services.find(s => s.id === formData.service)?.name.toLowerCase()
            }.
          </p>
        </motion.div>
      )}
    </div>
  )
} 