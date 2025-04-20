'use client'

import React from 'react'
import { FormData, AlarmeFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Home, Building, Building2, LayoutDashboard, Bell, Smartphone, Shield, AlertTriangle } from 'lucide-react'

interface AlarmeFormProps {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function AlarmeForm({ formData, updateFormData, nextStep, prevStep }: AlarmeFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [formState, setFormState] = React.useState({
    locationType: (formData as Partial<AlarmeFormData>)?.locationType || 'maison',
    needSonicDeterrence: (formData as Partial<AlarmeFormData>)?.needSonicDeterrence || false,
    needConnectedAlarm: (formData as Partial<AlarmeFormData>)?.needConnectedAlarm || false,
    needSmartphoneAlert: (formData as Partial<AlarmeFormData>)?.needSmartphoneAlert || false,
    needSecurityIntervention: (formData as Partial<AlarmeFormData>)?.needSecurityIntervention || false,
    alreadyEquipped: (formData as Partial<AlarmeFormData>)?.alreadyEquipped || false,
    solutionType: (formData as Partial<AlarmeFormData>)?.solutionType || 'economic',
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
    
    if (!formState.locationType) {
      newErrors.locationType = 'Veuillez sélectionner un type de lieu'
    }
    
    if (!formState.solutionType) {
      newErrors.solutionType = 'Veuillez sélectionner un type de solution'
    }

    // Vérifier qu'au moins un objectif est sélectionné
    const hasSelectedObjective = 
      formState.needSonicDeterrence || 
      formState.needConnectedAlarm || 
      formState.needSmartphoneAlert || 
      formState.needSecurityIntervention;
      
    if (!hasSelectedObjective) {
      newErrors.objectives = 'Veuillez sélectionner au moins un objectif'
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
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Système d'alarme</h2>
        <p className="text-gray-600">
          Précisez vos besoins pour une solution d'alarme adaptée.
        </p>
      </div>

      {/* Étape 1: Type de lieu */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Type de lieu</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.locationType}
            onValueChange={(value) => updateField('locationType', value)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.locationType === 'maison' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('locationType', 'maison')}
            >
              <div className="mb-2">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="maison" id="maison" className="sr-only" />
              <Label htmlFor="maison" className="font-medium cursor-pointer text-center">Maison</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.locationType === 'appartement' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('locationType', 'appartement')}
            >
              <div className="mb-2">
                <Building className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="appartement" id="appartement" className="sr-only" />
              <Label htmlFor="appartement" className="font-medium cursor-pointer text-center">Appartement</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.locationType === 'commerce' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('locationType', 'commerce')}
            >
              <div className="mb-2">
                <Building2 className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="commerce" id="commerce" className="sr-only" />
              <Label htmlFor="commerce" className="font-medium cursor-pointer text-center">Commerce</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.locationType === 'bureau' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('locationType', 'bureau')}
            >
              <div className="mb-2">
                <LayoutDashboard className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="bureau" id="bureau" className="sr-only" />
              <Label htmlFor="bureau" className="font-medium cursor-pointer text-center">Bureau</Label>
            </div>
          </RadioGroup>
          
          {errors.locationType && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.locationType}
            </p>
          )}
        </div>
      </div>

      {/* Étape 2: Objectifs */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Objectifs</h3>
        
        <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="sonicDeterrence"
                checked={formState.needSonicDeterrence}
                onCheckedChange={(checked) => updateField('needSonicDeterrence', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <Label htmlFor="sonicDeterrence" className="cursor-pointer">Dissuasion sonore</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="connectedAlarm"
                checked={formState.needConnectedAlarm}
                onCheckedChange={(checked) => updateField('needConnectedAlarm', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                <Label htmlFor="connectedAlarm" className="cursor-pointer">Alarme connectée</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="smartphoneAlert"
                checked={formState.needSmartphoneAlert}
                onCheckedChange={(checked) => updateField('needSmartphoneAlert', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <Label htmlFor="smartphoneAlert" className="cursor-pointer">Alerte smartphone</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="securityIntervention"
                checked={formState.needSecurityIntervention}
                onCheckedChange={(checked) => updateField('needSecurityIntervention', !!checked)}
              />
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <Label htmlFor="securityIntervention" className="cursor-pointer">Intervention sécurité</Label>
              </div>
            </div>
          </div>
          
          {errors.objectives && (
            <p className="text-red-500 text-sm mt-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.objectives}
            </p>
          )}
        </div>
      </div>

      {/* Étape 3: Déjà équipé */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Êtes-vous déjà équipé d'une alarme ?</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.alreadyEquipped ? 'yes' : 'no'}
            onValueChange={(value) => updateField('alreadyEquipped', value === 'yes')}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div 
              className={`
                flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors
                ${formState.alreadyEquipped 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('alreadyEquipped', true)}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formState.alreadyEquipped ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                {formState.alreadyEquipped && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <Label htmlFor="equipped-yes" className="cursor-pointer w-full">Oui</Label>
            </div>
            
            <div 
              className={`
                flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors
                ${!formState.alreadyEquipped 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('alreadyEquipped', false)}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!formState.alreadyEquipped ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                {!formState.alreadyEquipped && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <Label htmlFor="equipped-no" className="cursor-pointer w-full">Non</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Étape 4: Budget ou attente */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Budget ou attente</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.solutionType}
            onValueChange={(value) => updateField('solutionType', value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.solutionType === 'economic' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('solutionType', 'economic')}
            >
              <RadioGroupItem value="economic" id="economic" className="sr-only" />
              <Label htmlFor="economic" className="font-medium cursor-pointer">Solution économique</Label>
              <p className="text-sm text-gray-500 mt-2">
                Système efficace à prix compétitif pour une protection de base.
              </p>
            </div>
            
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.solutionType === 'high-level' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('solutionType', 'high-level')}
            >
              <RadioGroupItem value="high-level" id="high-level" className="sr-only" />
              <Label htmlFor="high-level" className="font-medium cursor-pointer">Solution haut niveau</Label>
              <p className="text-sm text-gray-500 mt-2">
                Protection avancée avec des fonctionnalités premium pour une sécurité maximale.
              </p>
            </div>
          </RadioGroup>
          
          {errors.solutionType && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.solutionType}
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