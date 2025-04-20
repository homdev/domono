'use client'

import React from 'react'
import { FormData, DomotiqueFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Home, Building, LampFloor, Thermometer, Blinds, Radio, Smartphone } from 'lucide-react'

interface DomotiqueFormProps {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function DomotiqueForm({ formData, updateFormData, nextStep, prevStep }: DomotiqueFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [formState, setFormState] = React.useState({
    propertyType: (formData as Partial<DomotiqueFormData>)?.propertyType || 'maison',
    surfaceArea: (formData as Partial<DomotiqueFormData>)?.surfaceArea || 0,
    needLighting: (formData as Partial<DomotiqueFormData>)?.needLighting || false,
    needHeating: (formData as Partial<DomotiqueFormData>)?.needHeating || false,
    needShutters: (formData as Partial<DomotiqueFormData>)?.needShutters || false,
    needMultimedia: (formData as Partial<DomotiqueFormData>)?.needMultimedia || false,
    needRemoteControl: (formData as Partial<DomotiqueFormData>)?.needRemoteControl || false,
    projectType: (formData as Partial<DomotiqueFormData>)?.projectType || 'neuf',
    budget: (formData as Partial<DomotiqueFormData>)?.budget || '',
    urgency: (formData as Partial<DomotiqueFormData>)?.urgency || 'immediate',
  })

  // Mettre à jour l'état local du formulaire
  const updateField = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Validation et passage à l'étape suivante
  const handleNext = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.propertyType) {
      newErrors.propertyType = 'Veuillez sélectionner un type de propriété'
    }
    
    if (!formState.surfaceArea || formState.surfaceArea <= 0) {
      newErrors.surfaceArea = 'Veuillez indiquer une surface valide'
    }
    
    if (!formState.projectType) {
      newErrors.projectType = 'Veuillez indiquer s\'il s\'agit d\'un projet neuf ou de rénovation'
    }
    
    if (!formState.urgency) {
      newErrors.urgency = 'Veuillez sélectionner un niveau d\'urgence'
    }

    // Vérifier qu'au moins un besoin est sélectionné
    const hasSelectedNeed = 
      formState.needLighting || 
      formState.needHeating || 
      formState.needShutters || 
      formState.needMultimedia || 
      formState.needRemoteControl;
      
    if (!hasSelectedNeed) {
      newErrors.needs = 'Veuillez sélectionner au moins un besoin'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // Tout est valide, mise à jour du formData parent
      updateFormData(formState)
      nextStep()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Projet de domotique</h2>
        <p className="text-gray-600">
          Précisez vos besoins pour une solution domotique personnalisée.
        </p>
      </div>

      {/* Étape 1: Type de logement */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Type de logement</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.propertyType}
            onValueChange={(value) => updateField('propertyType', value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.propertyType === 'maison' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('propertyType', 'maison')}
            >
              <div className="mb-2">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="maison" id="maison" className="sr-only" />
              <Label htmlFor="maison" className="font-medium cursor-pointer">Maison</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.propertyType === 'appartement' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('propertyType', 'appartement')}
            >
              <div className="mb-2">
                <Building className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="appartement" id="appartement" className="sr-only" />
              <Label htmlFor="appartement" className="font-medium cursor-pointer">Appartement</Label>
            </div>
          </RadioGroup>
          
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.propertyType}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="surfaceArea" className="text-base font-medium">
            Surface en m²
          </Label>
          <Input
            id="surfaceArea"
            type="number"
            min="0"
            value={formState.surfaceArea || ''}
            onChange={(e) => updateField('surfaceArea', parseInt(e.target.value) || 0)}
            className={errors.surfaceArea ? 'border-red-500' : ''}
          />
          {errors.surfaceArea && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.surfaceArea}
            </p>
          )}
        </div>
      </div>

      {/* Étape 2: Besoins */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Besoins</h3>
        
        <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="lighting"
                checked={formState.needLighting}
                onCheckedChange={(checked) => updateField('needLighting', !!checked)}
              />
              <div className="flex items-center gap-2">
                <LampFloor className="w-5 h-5 text-orange-500" />
                <Label htmlFor="lighting" className="cursor-pointer">Éclairage</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="heating"
                checked={formState.needHeating}
                onCheckedChange={(checked) => updateField('needHeating', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-500" />
                <Label htmlFor="heating" className="cursor-pointer">Chauffage/clim</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="shutters"
                checked={formState.needShutters}
                onCheckedChange={(checked) => updateField('needShutters', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Blinds className="w-5 h-5 text-orange-500" />
                <Label htmlFor="shutters" className="cursor-pointer">Volets roulants</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="multimedia"
                checked={formState.needMultimedia}
                onCheckedChange={(checked) => updateField('needMultimedia', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-orange-500" />
                <Label htmlFor="multimedia" className="cursor-pointer">Audio/multimédia</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="remote"
                checked={formState.needRemoteControl}
                onCheckedChange={(checked) => updateField('needRemoteControl', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <Label htmlFor="remote" className="cursor-pointer">Contrôle à distance</Label>
              </div>
            </div>
          </div>
          
          {errors.needs && (
            <p className="text-red-500 text-sm mt-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.needs}
            </p>
          )}
        </div>
      </div>

      {/* Étape 3: Projet */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Projet</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.projectType}
            onValueChange={(value) => updateField('projectType', value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('projectType', 'neuf')}
            >
              <RadioGroupItem value="neuf" id="neuf" />
              <Label htmlFor="neuf" className="cursor-pointer w-full">Projet neuf</Label>
            </div>
            
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('projectType', 'renovation')}
            >
              <RadioGroupItem value="renovation" id="renovation" />
              <Label htmlFor="renovation" className="cursor-pointer w-full">Rénovation</Label>
            </div>
          </RadioGroup>
          
          {errors.projectType && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.projectType}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="budget" className="text-base font-medium">
            Budget approximatif (optionnel)
          </Label>
          <Input
            id="budget"
            placeholder="Ex: 5000€"
            value={formState.budget}
            onChange={(e) => updateField('budget', e.target.value)}
          />
        </div>
      </div>

      {/* Étape 4: Urgence */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Urgence</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.urgency}
            onValueChange={(value) => updateField('urgency', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('urgency', 'immediate')}
            >
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate" className="cursor-pointer w-full">Immédiat</Label>
            </div>
            
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('urgency', '1-3months')}
            >
              <RadioGroupItem value="1-3months" id="1-3months" />
              <Label htmlFor="1-3months" className="cursor-pointer w-full">1 à 3 mois</Label>
            </div>
            
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('urgency', '3+months')}
            >
              <RadioGroupItem value="3+months" id="3+months" />
              <Label htmlFor="3+months" className="cursor-pointer w-full">3+ mois</Label>
            </div>
          </RadioGroup>
          
          {errors.urgency && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.urgency}
            </p>
          )}
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
        >
          Retour
        </Button>
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