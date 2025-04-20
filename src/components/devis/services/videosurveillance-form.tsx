'use client'

import React from 'react'
import { FormData, VideosurveillanceFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Home, DoorOpen, Palmtree, Warehouse, Store, Moon, Cloud, BellRing } from 'lucide-react'

interface VideosurveillanceFormProps {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function VideosurveillanceForm({ formData, updateFormData, nextStep, prevStep }: VideosurveillanceFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  
  // Pour les emplacements multiples, initialiser avec un tableau
  const initialLocations = (formData as Partial<VideosurveillanceFormData>)?.surveillanceLocation || []
  
  const [formState, setFormState] = React.useState({
    surveillanceLocation: initialLocations,
    cameraCount: (formData as Partial<VideosurveillanceFormData>)?.cameraCount || '1',
    needNightVision: (formData as Partial<VideosurveillanceFormData>)?.needNightVision || false,
    needCloudRecording: (formData as Partial<VideosurveillanceFormData>)?.needCloudRecording || false,
    needLiveNotifications: (formData as Partial<VideosurveillanceFormData>)?.needLiveNotifications || false,
    projectTiming: (formData as Partial<VideosurveillanceFormData>)?.projectTiming || 'immediate',
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

  // Gérer la sélection de locations multiples
  const toggleLocation = (location: string) => {
    const locations = formState.surveillanceLocation as string[]
    
    if (locations.includes(location)) {
      updateField('surveillanceLocation', locations.filter(loc => loc !== location))
    } else {
      updateField('surveillanceLocation', [...locations, location])
    }
  }

  // Validation et passage à l'étape suivante
  const handleNext = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.surveillanceLocation || (formState.surveillanceLocation as string[]).length === 0) {
      newErrors.surveillanceLocation = 'Veuillez sélectionner au moins un lieu à surveiller'
    }
    
    if (!formState.cameraCount) {
      newErrors.cameraCount = 'Veuillez sélectionner le nombre de caméras'
    }
    
    if (!formState.projectTiming) {
      newErrors.projectTiming = 'Veuillez sélectionner un délai de projet'
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
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Projet de vidéosurveillance</h2>
        <p className="text-gray-600">
          Précisez vos besoins pour une solution de vidéosurveillance adaptée.
        </p>
      </div>

      {/* Étape 1: Lieux à surveiller */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Lieux à surveiller</h3>
        <p className="text-sm text-gray-500">Sélectionnez un ou plusieurs emplacements</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div 
            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
              ${(formState.surveillanceLocation as string[]).includes('maison') 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => toggleLocation('maison')}
          >
            <div className="mb-2">
              <Home className="h-8 w-8 text-orange-500" />
            </div>
            <Label className="font-medium cursor-pointer text-center">Maison</Label>
          </div>
          
          <div 
            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
              ${(formState.surveillanceLocation as string[]).includes('entree') 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => toggleLocation('entree')}
          >
            <div className="mb-2">
              <DoorOpen className="h-8 w-8 text-orange-500" />
            </div>
            <Label className="font-medium cursor-pointer text-center">Entrée</Label>
          </div>
          
          <div 
            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
              ${(formState.surveillanceLocation as string[]).includes('jardin') 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => toggleLocation('jardin')}
          >
            <div className="mb-2">
              <Palmtree className="h-8 w-8 text-orange-500" />
            </div>
            <Label className="font-medium cursor-pointer text-center">Jardin</Label>
          </div>
          
          <div 
            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
              ${(formState.surveillanceLocation as string[]).includes('garage') 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => toggleLocation('garage')}
          >
            <div className="mb-2">
              <Warehouse className="h-8 w-8 text-orange-500" />
            </div>
            <Label className="font-medium cursor-pointer text-center">Garage</Label>
          </div>
          
          <div 
            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer
              ${(formState.surveillanceLocation as string[]).includes('commerce') 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => toggleLocation('commerce')}
          >
            <div className="mb-2">
              <Store className="h-8 w-8 text-orange-500" />
            </div>
            <Label className="font-medium cursor-pointer text-center">Commerce</Label>
          </div>
        </div>
        
        {errors.surveillanceLocation && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" /> {errors.surveillanceLocation}
          </p>
        )}
      </div>

      {/* Étape 2: Nombre de caméras */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Nombre de caméras souhaitées</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.cameraCount}
            onValueChange={(value) => updateField('cameraCount', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div className="flex items-center justify-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="1" id="camera-1" />
              <Label htmlFor="camera-1" className="cursor-pointer font-medium">1 caméra</Label>
            </div>
            
            <div className="flex items-center justify-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="2-3" id="camera-2-3" />
              <Label htmlFor="camera-2-3" className="cursor-pointer font-medium">2 à 3 caméras</Label>
            </div>
            
            <div className="flex items-center justify-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="4+" id="camera-4plus" />
              <Label htmlFor="camera-4plus" className="cursor-pointer font-medium">4 caméras ou plus</Label>
            </div>
          </RadioGroup>
          
          {errors.cameraCount && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.cameraCount}
            </p>
          )}
        </div>
      </div>

      {/* Étape 3: Besoins spécifiques */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Besoins spécifiques</h3>
        
        <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="nightVision"
                checked={formState.needNightVision}
                onCheckedChange={(checked) => updateField('needNightVision', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-orange-500" />
                <Label htmlFor="nightVision" className="cursor-pointer">Vision nocturne</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="cloudRecording"
                checked={formState.needCloudRecording}
                onCheckedChange={(checked) => updateField('needCloudRecording', !!checked)}
              />
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-orange-500" />
                <Label htmlFor="cloudRecording" className="cursor-pointer">Enregistrement cloud</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
              <Checkbox
                id="liveNotifications"
                checked={formState.needLiveNotifications}
                onCheckedChange={(checked) => updateField('needLiveNotifications', !!checked)}
              />
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-orange-500" />
                <Label htmlFor="liveNotifications" className="cursor-pointer">Notifications en direct</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 4: Projet */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Projet</h3>
        
        <div className="space-y-3">
          <RadioGroup
            value={formState.projectTiming}
            onValueChange={(value) => updateField('projectTiming', value)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.projectTiming === 'immediate' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('projectTiming', 'immediate')}
            >
              <RadioGroupItem value="immediate" id="timing-immediate" className="sr-only" />
              <Label htmlFor="timing-immediate" className="font-medium cursor-pointer">Immédiat</Label>
              <p className="text-xs text-gray-500 mt-1">Installation dès que possible</p>
            </div>
            
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.projectTiming === 'planned' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('projectTiming', 'planned')}
            >
              <RadioGroupItem value="planned" id="timing-planned" className="sr-only" />
              <Label htmlFor="timing-planned" className="font-medium cursor-pointer">À prévoir</Label>
              <p className="text-xs text-gray-500 mt-1">Dans les prochains mois</p>
            </div>
            
            <div 
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${formState.projectTiming === 'advice' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => updateField('projectTiming', 'advice')}
            >
              <RadioGroupItem value="advice" id="timing-advice" className="sr-only" />
              <Label htmlFor="timing-advice" className="font-medium cursor-pointer">Demande de conseil</Label>
              <p className="text-xs text-gray-500 mt-1">Je souhaite des informations</p>
            </div>
          </RadioGroup>
          
          {errors.projectTiming && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.projectTiming}
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