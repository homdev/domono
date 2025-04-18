'use client'

import React from 'react'
import { FormData, ServiceType } from '../page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Shield, Video, Lock } from 'lucide-react'

interface ServiceSelectionProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
}

const services = [
  {
    id: 'domotique' as ServiceType,
    title: 'Domotique',
    description: 'Automatisation et contrôle intelligent de votre maison ou local professionnel.',
    icon: <Home className="h-12 w-12 text-orange-500" />
  },
  {
    id: 'alarme' as ServiceType,
    title: 'Alarme',
    description: 'Systèmes d\'alarme anti-intrusion pour sécuriser vos espaces.',
    icon: <Shield className="h-12 w-12 text-orange-500" />
  },
  {
    id: 'videosurveillance' as ServiceType,
    title: 'Vidéosurveillance',
    description: 'Caméras et solutions de surveillance pour protéger vos biens.',
    icon: <Video className="h-12 w-12 text-orange-500" />
  },
  {
    id: 'controle-acces' as ServiceType,
    title: 'Contrôle d\'Accès',
    description: 'Gestion des accès physiques à vos espaces et zones sensibles.',
    icon: <Lock className="h-12 w-12 text-orange-500" />
  }
]

export function ServiceSelection({ formData, updateFormData, nextStep }: ServiceSelectionProps) {
  const [selectedServices, setSelectedServices] = React.useState<ServiceType[]>(formData.services || [])
  const [error, setError] = React.useState<string>('')

  const toggleService = (serviceId: ServiceType) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId)
      } else {
        return [...prev, serviceId]
      }
    })
    setError('')
  }

  const handleNext = () => {
    if (selectedServices.length === 0) {
      setError('Veuillez sélectionner au moins un service')
      return
    }
    
    updateFormData({ services: selectedServices })
    nextStep()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Nos services</h2>
        <p className="text-gray-600">
          Sélectionnez un ou plusieurs services pour lesquels vous souhaitez obtenir un devis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedServices.includes(service.id) 
                ? 'border-orange-500 shadow-sm' 
                : 'border-gray-200'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                {service.icon}
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-4 pb-2">
              <div className={`w-full p-1 rounded-full ${
                selectedServices.includes(service.id) 
                  ? 'bg-orange-500'
                  : 'bg-gray-100'
              }`}>
                <div className="flex justify-center">
                  <span className={`text-sm font-medium ${
                    selectedServices.includes(service.id)
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}>
                    {selectedServices.includes(service.id) 
                      ? 'Sélectionné'
                      : 'Cliquer pour sélectionner'
                    }
                  </span>
                </div>
              </div>
            </CardFooter>
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