'use client'

import React from 'react'
import { FormData } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { AlertCircle, Home, Building2, Building, LayoutGrid, Calendar, Euro } from 'lucide-react'

interface ProjectDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

const propertyTypes = [
  { id: 'apartment', label: 'Appartement', icon: <Building2 className="w-4 h-4" /> },
  { id: 'house', label: 'Maison', icon: <Home className="w-4 h-4" /> },
  { id: 'building', label: 'Immeuble', icon: <Building className="w-4 h-4" /> },
  { id: 'business', label: 'Local professionnel', icon: <LayoutGrid className="w-4 h-4" /> },
]

const propertySizes = [
  { id: 'small', label: 'Petit (< 50m²)' },
  { id: 'medium', label: 'Moyen (50-100m²)' },
  { id: 'large', label: 'Grand (100-200m²)' },
  { id: 'xlarge', label: 'Très grand (> 200m²)' },
]

const propertyAges = [
  { id: 'new', label: 'Neuf (< 5 ans)' },
  { id: 'recent', label: 'Récent (5-15 ans)' },
  { id: 'old', label: 'Ancien (15-30 ans)' },
  { id: 'very-old', label: 'Très ancien (> 30 ans)' },
]

const budgetRanges = [
  { id: 'low', label: '< 1 000€' },
  { id: 'medium', label: '1 000€ - 3 000€' },
  { id: 'high', label: '3 000€ - 5 000€' },
  { id: 'premium', label: '> 5 000€' },
  { id: 'undefined', label: 'Je ne sais pas encore' },
]

const timelineOptions = [
  { id: 'urgent', label: 'Urgent (< 2 semaines)' },
  { id: 'soon', label: 'Prochainement (2-4 semaines)' },
  { id: 'normal', label: 'Dans les 3 mois' },
  { id: 'planning', label: 'Je planifie pour plus tard' },
]

export function ProjectDetails({ formData, updateFormData, nextStep, prevStep }: ProjectDetailsProps) {
  const [formState, setFormState] = React.useState({
    propertyType: formData.propertyType || '',
    propertySize: formData.propertySize || '',
    propertyAge: formData.propertyAge || '',
    existingSystem: formData.existingSystem || false,
    specificNeeds: formData.specificNeeds || '',
    budget: formData.budget || '',
    timeline: formData.timeline || '',
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Mettre à jour le formData parent quand l'état local change
  React.useEffect(() => {
    updateFormData(formState)
  }, [formState, updateFormData])

  // Validation et passage à l'étape suivante
  const handleNext = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.propertyType) {
      newErrors.propertyType = 'Veuillez sélectionner un type de propriété'
    }
    
    if (!formState.propertySize) {
      newErrors.propertySize = 'Veuillez sélectionner une taille de propriété'
    }
    
    if (!formState.budget) {
      newErrors.budget = 'Veuillez sélectionner une fourchette de budget'
    }
    
    if (!formState.timeline) {
      newErrors.timeline = 'Veuillez sélectionner un délai de réalisation'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      nextStep()
    }
  }

  // Mettre à jour un champ spécifique
  const updateField = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Détails de votre projet</h2>
        <p className="text-gray-600">
          Aidez-nous à comprendre vos besoins pour vous proposer les solutions les plus adaptées.
        </p>
      </div>

      {/* Type de propriété */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Type de propriété</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypes.map(type => (
            <div
              key={type.id}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer
                transition-all duration-200
                ${formState.propertyType === type.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateField('propertyType', type.id)}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${formState.propertyType === type.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-500'
                }
              `}>
                {type.icon}
              </div>
              <span className="text-sm text-center">{type.label}</span>
            </div>
          ))}
        </div>
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" /> {errors.propertyType}
          </p>
        )}
      </div>

      {/* Taille de la propriété */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Taille approximative</Label>
        <RadioGroup 
          value={formState.propertySize} 
          onValueChange={(value) => updateField('propertySize', value)}
          className="grid grid-cols-2 gap-3"
        >
          {propertySizes.map(size => (
            <div key={size.id} className="flex items-center space-x-2">
              <RadioGroupItem value={size.id} id={`size-${size.id}`} />
              <Label htmlFor={`size-${size.id}`} className="text-sm cursor-pointer">
                {size.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.propertySize && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" /> {errors.propertySize}
          </p>
        )}
      </div>

      {/* Âge de la propriété */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Âge approximatif</Label>
        <RadioGroup 
          value={formState.propertyAge} 
          onValueChange={(value) => updateField('propertyAge', value)}
          className="grid grid-cols-2 gap-3"
        >
          {propertyAges.map(age => (
            <div key={age.id} className="flex items-center space-x-2">
              <RadioGroupItem value={age.id} id={`age-${age.id}`} />
              <Label htmlFor={`age-${age.id}`} className="text-sm cursor-pointer">
                {age.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Système existant */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
        <div>
          <Label className="text-base font-medium">Système existant</Label>
          <p className="text-sm text-gray-500">Disposez-vous déjà d'un système à remplacer ou à mettre à niveau ?</p>
        </div>
        <Switch 
          checked={formState.existingSystem}
          onCheckedChange={(checked: boolean) => updateField('existingSystem', checked)}
        />
      </div>

      {/* Besoins spécifiques */}
      <div className="space-y-3">
        <Label htmlFor="specificNeeds" className="text-base font-medium">
          Besoins spécifiques (optionnel)
        </Label>
        <Textarea
          id="specificNeeds"
          placeholder="Décrivez vos besoins spécifiques, contraintes particulières ou toute information complémentaire..."
          value={formState.specificNeeds}
          onChange={(e) => updateField('specificNeeds', e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Euro className="w-5 h-5 text-orange-500" />
          <Label className="text-base font-medium">Budget approximatif</Label>
        </div>
        <RadioGroup 
          value={formState.budget} 
          onValueChange={(value) => updateField('budget', value)}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {budgetRanges.map(budget => (
            <div key={budget.id} className="flex items-center space-x-2">
              <RadioGroupItem value={budget.id} id={`budget-${budget.id}`} />
              <Label htmlFor={`budget-${budget.id}`} className="text-sm cursor-pointer">
                {budget.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.budget && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" /> {errors.budget}
          </p>
        )}
      </div>

      {/* Délai de réalisation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          <Label className="text-base font-medium">Délai de réalisation souhaité</Label>
        </div>
        <RadioGroup 
          value={formState.timeline} 
          onValueChange={(value) => updateField('timeline', value)}
          className="grid grid-cols-2 gap-3"
        >
          {timelineOptions.map(timeline => (
            <div key={timeline.id} className="flex items-center space-x-2">
              <RadioGroupItem value={timeline.id} id={`timeline-${timeline.id}`} />
              <Label htmlFor={`timeline-${timeline.id}`} className="text-sm cursor-pointer">
                {timeline.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.timeline && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" /> {errors.timeline}
          </p>
        )}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between pt-4">
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