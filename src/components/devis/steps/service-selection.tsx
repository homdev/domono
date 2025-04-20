'use client'

import React from 'react'
import { FormData, ServiceType } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Shield, Video, Lock } from 'lucide-react'

interface ServiceSelectionProps {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
}

// Services disponibles
const services = [
  {
    id: 'domotique' as ServiceType,
    title: 'Domotique',
    description: 'Automatisation et contrôle intelligent de votre maison ou local professionnel.',
    icon: <Home className="h-12 w-12 text-orange-500" />,
    highlights: [
      'Contrôle centralisé de la maison',
      'Économies d\'énergie',
      'Confort et simplicité au quotidien'
    ]
  },
  {
    id: 'alarme' as ServiceType,
    title: 'Alarme',
    description: 'Systèmes d\'alarme anti-intrusion pour sécuriser vos espaces.',
    icon: <Shield className="h-12 w-12 text-orange-500" />,
    highlights: [
      'Protection 24h/24 et 7j/7',
      'Alertes en temps réel',
      'Dissuasion efficace contre les intrusions'
    ]
  },
  {
    id: 'videosurveillance' as ServiceType,
    title: 'Vidéosurveillance',
    description: 'Caméras et solutions de surveillance pour protéger vos biens.',
    icon: <Video className="h-12 w-12 text-orange-500" />,
    highlights: [
      'Visualisation à distance',
      'Surveillance jour et nuit',
      'Enregistrement des évènements'
    ]
  },
  {
    id: 'controle-acces' as ServiceType,
    title: 'Contrôle d\'Accès',
    description: 'Gestion des accès physiques à vos espaces et zones sensibles.',
    icon: <Lock className="h-12 w-12 text-orange-500" />,
    highlights: [
      'Sécurisation des entrées',
      'Gestion des droits d\'accès',
      'Solutions adaptées aux particuliers et professionnels'
    ]
  }
]

export function ServiceSelection({ formData, updateFormData, nextStep }: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = React.useState<ServiceType | null>(
    formData.service as ServiceType || null
  )
  const [error, setError] = React.useState<string>('')

  const selectService = (serviceId: ServiceType) => {
    setSelectedService(serviceId)
    updateFormData({ service: serviceId })
    setError('')
  }

  const handleNext = () => {
    if (!selectedService) {
      setError('Veuillez sélectionner un service')
      return
    }
    
    nextStep()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Nos services</h2>
        <p className="text-gray-600">
          Sélectionnez le service pour lequel vous souhaitez obtenir un devis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedService === service.id 
                ? 'border-orange-500 shadow-sm' 
                : 'border-gray-200'
            }`}
            onClick={() => selectService(service.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl flex items-center gap-3">
                  <span className={`p-2 rounded-full ${
                    selectedService === service.id 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {service.icon}
                  </span>
                  {service.title}
                </CardTitle>
                {selectedService === service.id && (
                  <span className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <CardDescription className="mt-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {service.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-sm gap-2">
                    <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {error}
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={handleNext}
        >
          Continuer
        </Button>
      </div>
    </div>
  )
} 