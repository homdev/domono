'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ServiceSelection from './service-selection'
import { ProjectDetails } from './project-details'
import ContactInfo from './contact-info'
import Summary from './summary'

// Types pour les services
export type ServiceType = 'domotique' | 'alarme' | 'videoSurveillance' | 'controleAcces' | 'null';

// Type pour les données du formulaire - adapté pour être compatible avec les composants
type FormData = {
  // Étape 1: Choix du service
  service: string;
  
  // Étape 2: Détails du projet
  projectDetails: {
    propertyType: string;
    propertySize: number;
    budget: string;
    timeline: string;
    roomCount?: number;
    existingSystem?: boolean;
    outdoorProtection?: boolean;
    remoteAccess?: boolean;
    cameraCount?: number;
    storageNeeds?: string;
    accessPointCount?: number;
    accessType?: string;
  };
  
  // Étape 3: Contact
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    preferredContactMethod: string;
  };
  
  // Commentaires additionnels
  additionalComments: string;
}

// Configuration des étapes
const steps = [
  { id: 1, name: 'Service', description: 'Choix du service' },
  { id: 2, name: 'Projet', description: 'Détails du projet' },
  { id: 3, name: 'Contact', description: 'Vos coordonnées' },
  { id: 4, name: 'Récapitulatif', description: 'Vérification finale' }
]

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: '',
    projectDetails: {
      propertyType: '',
      propertySize: 0,
      budget: '',
      timeline: '',
    },
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      preferredContactMethod: '',
    },
    additionalComments: ''
  })

  // Mise à jour des données du formulaire
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // Spécifique pour le service de sélection qui a une interface différente
  const updateService = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }))
  }

  // Navigation entre les étapes
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Animation pour la transition entre les étapes
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  // Soumission du formulaire
  const handleSubmit = async () => {
    console.log('Formulaire soumis:', formData)
    // Ici vous ajouteriez la logique pour envoyer les données au serveur
    alert('Votre demande de devis a été envoyée avec succès!')
  }

  return (
    <div className="w-full">
      {/* Indicateur d'étapes */}
      <div className="mb-8 hidden md:block">
        <div className="relative">
          {/* Ligne de progression */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Étapes */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="relative flex flex-col items-center"
              >
                {/* Cercle de l'étape */}
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center z-10 
                    transition-all duration-300
                    ${step.id < currentStep 
                      ? 'bg-orange-500 text-white' 
                      : step.id === currentStep 
                        ? 'bg-orange-500 ring-4 ring-orange-100 text-white' 
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }
                  `}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                
                {/* Texte de l'étape */}
                <div className="absolute top-12 whitespace-nowrap">
                  <p 
                    className={`
                      font-semibold text-sm
                      ${step.id <= currentStep ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}
                    `}
                  >
                    {step.name}
                  </p>
                  <p 
                    className={`
                      text-xs mt-1
                      ${step.id <= currentStep ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}
                    `}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Version mobile - visible uniquement sur petit écran */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center"
          >
            {currentStep}
          </div>
          <div>
            <p className="font-medium text-sm">{steps[currentStep - 1].name}</p>
            <p className="text-xs text-gray-500">{steps[currentStep - 1].description}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{currentStep} / {steps.length}</p>
      </div>
      
      {/* Contenu de l'étape actuelle */}
      <div className="min-h-[400px] bg-white dark:bg-slate-800 shadow-md rounded-xl p-6 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="h-full"
          >
            {currentStep === 1 && (
              <ServiceSelection 
                formData={formData} 
                updateFormData={updateService} 
              />
            )}
            
            {currentStep === 2 && (
              <ProjectDetails 
                serviceType={formData.service as any}
                onSubmit={(data: any) => {
                  // Convertir les données de ProjectDetails vers notre format
                  const newData: Partial<FormData> = {
                    projectDetails: {
                      ...formData.projectDetails,
                      propertyType: data.propertyType || data.roomCount || '',
                      propertySize: data.propertySize ? parseInt(String(data.propertySize)) : 0,
                      budget: data.budget || '',
                      timeline: data.timeframe || '',
                    }
                  };
                  updateFormData(newData);
                  nextStep();
                }}
              />
            )}
            
            {currentStep === 3 && (
              <ContactInfo 
                formData={{
                  ...formData,
                  firstName: formData.contact.firstName,
                  lastName: formData.contact.lastName,
                  email: formData.contact.email,
                  phone: formData.contact.phone,
                  address: formData.contact.address,
                  postalCode: formData.contact.postalCode,
                  city: formData.contact.city
                }}
                updateFormData={(data) => {
                  const newData: Partial<FormData> = {
                    contact: {
                      ...formData.contact,
                      firstName: data.firstName || '',
                      lastName: data.lastName || '',
                      email: data.email || '',
                      phone: data.phone || '',
                      address: data.address || '',
                      postalCode: data.postalCode || '',
                      city: data.city || '',
                      preferredContactMethod: data.preferredContactMethod || ''
                    }
                  };
                  updateFormData(newData);
                }}
              />
            )}
            
            {currentStep === 4 && (
              <Summary 
                formData={formData}
                handleSubmit={handleSubmit} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={currentStep === 1 ? 'opacity-0' : ''}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            onClick={nextStep}
            className="ml-auto"
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="ml-auto bg-green-600 hover:bg-green-700"
          >
            Envoyer ma demande
            <Check className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
} 