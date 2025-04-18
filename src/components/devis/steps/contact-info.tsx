'use client'

import React from 'react'
import { FormData } from '../page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertCircle } from 'lucide-react'

interface ContactInfoProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function ContactInfo({ formData, updateFormData, nextStep, prevStep }: ContactInfoProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
    
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    updateFormData({ [name]: value })
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Validation des champs obligatoires
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise'
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis'
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Le code postal doit contenir 5 chiffres'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise'
    }
    
    if (!formData.preferredContactMethod) {
      newErrors.preferredContactMethod = 'Veuillez sélectionner un mode de contact préféré'
    }
    
    if (!formData.preferredContactTime) {
      newErrors.preferredContactTime = 'Veuillez sélectionner un horaire de contact préféré'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Vos coordonnées</h2>
        <p className="text-gray-600">
          Veuillez renseigner vos informations de contact pour que nous puissions vous contacter.
        </p>
      </div>

      <div className="space-y-6">
        {/* Nom et prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-base font-medium">
              Prénom*
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-base font-medium">
              Nom*
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        
        {/* Email et téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email*
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              Téléphone*
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        
        {/* Adresse */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-base font-medium">
            Adresse*
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.address}
            </p>
          )}
        </div>
        
        {/* Code postal et ville */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-base font-medium">
              Code postal*
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className={errors.postalCode ? 'border-red-500' : ''}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.postalCode}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city" className="text-base font-medium">
              Ville*
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.city}
              </p>
            )}
          </div>
        </div>
        
        {/* Mode de contact préféré */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Mode de contact préféré*
          </Label>
          <RadioGroup 
            value={formData.preferredContactMethod} 
            onValueChange={(value) => handleRadioChange('preferredContactMethod', value)}
            className={`space-y-3 ${errors.preferredContactMethod ? 'border border-red-500 p-3 rounded-md' : ''}`}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="cursor-pointer">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone" className="cursor-pointer">Téléphone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both" className="cursor-pointer">Les deux</Label>
            </div>
          </RadioGroup>
          {errors.preferredContactMethod && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.preferredContactMethod}
            </p>
          )}
        </div>
        
        {/* Horaire de contact préféré */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Horaire de contact préféré*
          </Label>
          <RadioGroup 
            value={formData.preferredContactTime} 
            onValueChange={(value) => handleRadioChange('preferredContactTime', value)}
            className={`space-y-3 ${errors.preferredContactTime ? 'border border-red-500 p-3 rounded-md' : ''}`}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="morning" id="morning" />
              <Label htmlFor="morning" className="cursor-pointer">Matin (9h-12h)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="afternoon" id="afternoon" />
              <Label htmlFor="afternoon" className="cursor-pointer">Après-midi (14h-17h)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="evening" id="evening" />
              <Label htmlFor="evening" className="cursor-pointer">Soir (17h-19h)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anytime" id="anytime" />
              <Label htmlFor="anytime" className="cursor-pointer">N'importe quand</Label>
            </div>
          </RadioGroup>
          {errors.preferredContactTime && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.preferredContactTime}
            </p>
          )}
        </div>
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
          onClick={handleNext}
        >
          Continuer
        </Button>
      </div>
    </div>
  )
} 