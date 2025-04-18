'use client'

import React from 'react'
import { FormData } from '../page'
import { Button } from '@/components/ui/button'

interface SummaryProps {
  formData: FormData
  prevStep: () => void
  handleSubmit: () => void
}

export function Summary({ formData, prevStep, handleSubmit }: SummaryProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  const onSubmit = async () => {
    setIsSubmitting(true)
    await handleSubmit()
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Récapitulatif de votre demande</h2>
        <p className="text-gray-600">
          Vérifiez vos informations avant de soumettre votre demande de devis.
        </p>
      </div>

      <div className="space-y-6">
        {/* Services sélectionnés */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Services demandés</h3>
          <div className="flex flex-wrap gap-2">
            {formData.services.map(service => (
              <span key={service} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </span>
            ))}
          </div>
        </div>
        
        {/* Détails du projet */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Détails du projet</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-gray-500">Type de propriété</p>
              <p>{formData.propertyType || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taille</p>
              <p>{formData.propertySize || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p>{formData.budget || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Délai</p>
              <p>{formData.timeline || 'Non spécifié'}</p>
            </div>
          </div>
        </div>
        
        {/* Coordonnées */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Vos coordonnées</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Nom:</span> {formData.firstName} {formData.lastName}</p>
            <p><span className="font-medium">Email:</span> {formData.email}</p>
            <p><span className="font-medium">Téléphone:</span> {formData.phone}</p>
            <p><span className="font-medium">Adresse:</span> {formData.address}, {formData.postalCode} {formData.city}</p>
          </div>
        </div>
        
        {/* Commentaires */}
        {formData.additionalComments && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Commentaires supplémentaires</h3>
            <p className="whitespace-pre-wrap">{formData.additionalComments}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Retour
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </Button>
      </div>
    </div>
  )
} 