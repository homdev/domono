'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './step-indicator'
import { ServiceSelection } from './steps/service-selection'
import { ProjectDetails } from './steps/project-details'
import { ContactInfo } from './steps/contact-info'
import { AdditionalInfo } from './steps/additional-info'
import { Summary } from './steps/summary'
import { CornerUpLeft, Check, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Types des services
export type ServiceType = 'domotique' | 'alarme' | 'videosurveillance' | 'controle-acces' | 'null'

// Structure des données du formulaire
export interface FormData {
  // Étape 1: Sélection des services
  services: ServiceType[]
  
  // Étape 2: Détails du projet
  propertyType: string
  propertySize: string
  propertyAge: string
  existingSystem: boolean
  specificNeeds: string
  budget: string
  timeline: string
  
  // Étape 3: Coordonnées
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  preferredContactMethod: string
  preferredContactTime: string
  
  // Étape 4: Infos supplémentaires
  additionalComments: string
}

// Configuration des étapes
const steps = [
  { id: 1, name: 'Services', description: 'Sélection des services' },
  { id: 2, name: 'Projet', description: 'Détails du projet' },
  { id: 3, name: 'Contact', description: 'Vos coordonnées' },
  { id: 4, name: 'Détails', description: 'Informations supplémentaires' },
  { id: 5, name: 'Récapitulatif', description: 'Vérification finale' }
]

// Valeurs par défaut pour le formulaire
const defaultFormData: FormData = {
  services: [],
  propertyType: '',
  propertySize: '',
  propertyAge: '',
  existingSystem: false,
  specificNeeds: '',
  budget: '',
  timeline: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  preferredContactMethod: '',
  preferredContactTime: '',
  additionalComments: ''
}

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Mise à jour des données du formulaire
  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  // Navigation entre les étapes
  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  // Gestion de la soumission du formulaire
  const handleSubmit = useCallback(async () => {
    try {
      // Simulation d'une API call - à remplacer par l'appel réel à l'API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Envoi des données à l'API (à implémenter)
      // const response = await fetch('/api/devis', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })
      
      // if (!response.ok) throw new Error('Erreur lors de l\'envoi du formulaire')
      
      setSubmissionStatus('success')
      // Réinitialisation du formulaire si nécessaire
      // setFormData(initialFormData)
      // setCurrentStep(1)
    } catch (error) {
      console.error('Erreur de soumission:', error)
      setSubmissionStatus('error')
    }
  }, [formData])

  // Rendu des étapes du formulaire
  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
               />
      case 2:
        return <ProjectDetails 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
               />
      case 3:
        return <ContactInfo 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
               />
      case 4:
        return <AdditionalInfo 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
               />
      case 5:
        return <Summary 
                formData={formData} 
                prevStep={prevStep} 
                handleSubmit={handleSubmit} 
               />
      default:
        return null
    }
  }, [currentStep, formData, nextStep, prevStep, updateFormData, handleSubmit])

  const resetForm = useCallback(() => {
    setSubmissionStatus('idle')
    setCurrentStep(1)
    setFormData(defaultFormData)
  }, [])

  // Rendu du message de confirmation après soumission
  const renderSubmissionStatus = useCallback(() => {
    if (submissionStatus === 'success') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700">Demande envoyée avec succès !</h2>
          <p className="text-gray-600 mb-8">
            Merci pour votre demande de devis. Notre équipe l'examinera et vous contactera dans les plus brefs délais.
            Un email de confirmation a été envoyé à l'adresse {formData.email}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/'} variant="outline" className="px-6">
              Retour à l'accueil
            </Button>
            <Button onClick={resetForm} className="px-6 bg-orange-500 hover:bg-orange-600">
              Nouvelle demande
            </Button>
          </div>
        </motion.div>
      )
    }
    
    if (submissionStatus === 'error') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-700">Une erreur est survenue</h2>
          <p className="text-gray-600 mb-8">
            Nous n'avons pas pu envoyer votre demande de devis. Veuillez réessayer ou nous contacter directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setSubmissionStatus('idle')} variant="outline" className="px-6">
              Retour au formulaire
            </Button>
            <Button onClick={() => window.location.href = '/contact'} className="px-6 bg-orange-500 hover:bg-orange-600">
              Nous contacter
            </Button>
          </div>
        </motion.div>
      )
    }
    
    return null
  }, [formData.email, resetForm, submissionStatus])

  return (
    <div className="py-8 md:py-12 px-4 max-w-6xl mx-auto">
      {submissionStatus === 'idle' ? (
        <>
          {/* Indicateur d'étapes */}
          <div className="mb-10">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          
          {/* Container du formulaire avec animation */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        renderSubmissionStatus()
      )}
    </div>
  )
} 