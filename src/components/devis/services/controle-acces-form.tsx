'use client'

import React from 'react'
import { FormData, ControleAccesFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Home, Building, Users, Fingerprint, Key, Clock, Smartphone, Video } from 'lucide-react'

interface ControleAccesFormProps {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function ControleAccesForm({ formData, updateFormData, nextStep, prevStep }: ControleAccesFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [formState, setFormState] = React.useState({
    buildingType: (formData as Partial<ControleAccesFormData>)?.buildingType || 'residentiel',
    accessPointCount: (formData as Partial<ControleAccesFormData>)?.accessPointCount || '1',
    needBadgeCode: (formData as Partial<ControleAccesFormData>)?.needBadgeCode || false,
    needVideoIntercom: (formData as Partial<ControleAccesFormData>)?.needVideoIntercom || false,
    needRemoteAccess: (formData as Partial<ControleAccesFormData>)?.needRemoteAccess || false,
    needEntryHistory: (formData as Partial<ControleAccesFormData>)?.needEntryHistory || false,
    existingSystem: (formData as Partial<ControleAccesFormData>)?.existingSystem || false,
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
    
    if (!formState.buildingType) {
      newErrors.buildingType = 'Veuillez sélectionner un type de bâtiment'
    }
    
    if (!formState.accessPointCount) {
      newErrors.accessPointCount = 'Veuillez sélectionner le nombre de points d\'accès'
    }

    // Vérifier qu'au moins une fonctionnalité est sélectionnée
    const hasSelectedFeature = 
      formState.needBadgeCode || 
      formState.needVideoIntercom || 
      formState.needRemoteAccess || 
      formState.needEntryHistory;
      
    if (!hasSelectedFeature) {
      newErrors.features = 'Veuillez sélectionner au moins une fonctionnalité'
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
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Contrôle d'accès</h2>
        <p className="text-gray-600">
          Précisez vos besoins pour une solution de contrôle d'accès personnalisée.
        </p>
      </div>

      {/* Étape 1: Type de bâtiment */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Type de bâtiment</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.buildingType}
            onValueChange={(value) => updateField('buildingType', value)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.buildingType === 'residentiel' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('buildingType', 'residentiel')}
            >
              <div className="mb-2">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="residentiel" id="residentiel" className="sr-only" />
              <Label htmlFor="residentiel" className="font-medium cursor-pointer text-center">Résidentiel</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.buildingType === 'bureau' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('buildingType', 'bureau')}
            >
              <div className="mb-2">
                <Building className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="bureau" id="bureau" className="sr-only" />
              <Label htmlFor="bureau" className="font-medium cursor-pointer text-center">Bureau</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.buildingType === 'copropriete' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('buildingType', 'copropriete')}
            >
              <div className="mb-2">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="copropriete" id="copropriete" className="sr-only" />
              <Label htmlFor="copropriete" className="font-medium cursor-pointer text-center">Copropriété</Label>
            </div>
            
            <div 
              className={`
                flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
                ${formState.buildingType === 'commerce' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('buildingType', 'commerce')}
            >
              <div className="mb-2">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <RadioGroupItem value="commerce" id="commerce" className="sr-only" />
              <Label htmlFor="commerce" className="font-medium cursor-pointer text-center">Commerce</Label>
            </div>
          </RadioGroup>
          
          {errors.buildingType && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.buildingType}
            </p>
          )}
        </div>
      </div>

      {/* Étape 2: Nombre de points d'accès */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Nombre de points d'accès</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.accessPointCount}
            onValueChange={(value) => updateField('accessPointCount', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.accessPointCount === '1' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('accessPointCount', '1')}
            >
              <RadioGroupItem value="1" id="access-1" className="sr-only" />
              <Label htmlFor="access-1" className="font-medium cursor-pointer text-center">1 point d'accès</Label>
              <p className="text-xs text-gray-500 mt-1 text-center">Entrée unique</p>
            </div>
            
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.accessPointCount === '2-5' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('accessPointCount', '2-5')}
            >
              <RadioGroupItem value="2-5" id="access-2-5" className="sr-only" />
              <Label htmlFor="access-2-5" className="font-medium cursor-pointer text-center">2 à 5 points d'accès</Label>
              <p className="text-xs text-gray-500 mt-1 text-center">Multiples entrées</p>
            </div>
            
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.accessPointCount === '5+' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('accessPointCount', '5+')}
            >
              <RadioGroupItem value="5+" id="access-5plus" className="sr-only" />
              <Label htmlFor="access-5plus" className="font-medium cursor-pointer text-center">Plus de 5 points d'accès</Label>
              <p className="text-xs text-gray-500 mt-1 text-center">Grand bâtiment ou site</p>
            </div>
          </RadioGroup>
          
          {errors.accessPointCount && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.accessPointCount}
            </p>
          )}
        </div>
      </div>

      {/* Étape 3: Fonctionnalités souhaitées */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Fonctionnalités souhaitées</h3>
        
        <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="badgeCode"
                checked={formState.needBadgeCode}
                onCheckedChange={(checked) => updateField('needBadgeCode', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-orange-500" />
                <Label htmlFor="badgeCode" className="cursor-pointer">Badge / Code</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="videoIntercom"
                checked={formState.needVideoIntercom}
                onCheckedChange={(checked) => updateField('needVideoIntercom', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-orange-500" />
                <Label htmlFor="videoIntercom" className="cursor-pointer">Interphone vidéo</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="remoteAccess"
                checked={formState.needRemoteAccess}
                onCheckedChange={(checked) => updateField('needRemoteAccess', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <Label htmlFor="remoteAccess" className="cursor-pointer">Accès à distance</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="entryHistory"
                checked={formState.needEntryHistory}
                onCheckedChange={(checked) => updateField('needEntryHistory', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <Label htmlFor="entryHistory" className="cursor-pointer">Historique des entrées</Label>
              </div>
            </div>
          </div>
          
          {errors.features && (
            <p className="text-red-500 text-sm mt-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.features}
            </p>
          )}
        </div>
      </div>

      {/* Étape 4: Système existant */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Système existant ?</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.existingSystem ? 'yes' : 'no'}
            onValueChange={(value) => updateField('existingSystem', value === 'yes')}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('existingSystem', true)}
            >
              <RadioGroupItem value="yes" id="system-yes" />
              <Label htmlFor="system-yes" className="cursor-pointer w-full">Oui</Label>
            </div>
            
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => updateField('existingSystem', false)}
            >
              <RadioGroupItem value="no" id="system-no" />
              <Label htmlFor="system-no" className="cursor-pointer w-full">Non</Label>
            </div>
          </RadioGroup>
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