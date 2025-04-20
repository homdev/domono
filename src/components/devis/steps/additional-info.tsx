'use client'

import React from 'react'
import { FormData } from '../types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface AdditionalInfoProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function AdditionalInfo({ formData, updateFormData, nextStep, prevStep }: AdditionalInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ additionalComments: e.target.value })
  } 

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Informations supplémentaires</h2>
        <p className="text-gray-600">
          Partagez toute information supplémentaire qui pourrait nous aider à mieux comprendre votre projet.
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="additionalComments" className="text-base font-medium">
          Commentaires ou précisions (optionnel)
        </Label>
        <Textarea
          id="additionalComments"
          value={formData.additionalComments}
          onChange={handleChange}
          placeholder="Partagez toute information complémentaire concernant votre projet..."
          className="min-h-[200px]"
        />
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
          onClick={nextStep}
        >
          Continuer
        </Button>
      </div>
    </div>
  )
} 