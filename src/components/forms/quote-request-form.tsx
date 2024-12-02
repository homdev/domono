/* eslint-disable react/no-unescaped-entities */

'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'

export function QuoteRequestFormComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clientType: '',
    sector: '',
    propertyType: '',
    area: '',
    pestType: '',
    urgency: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleNext = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your server or API
    console.log('Form submitted:', formData)
    // Reset form or show success message
    setStep(4) // Move to a "thank you" step
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Demande de devis</CardTitle>
        <CardDescription className="text-center">
          Obtenez un devis personnalisé en quelques étapes simples
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
                </div>
                <span className="text-sm mt-2">{
                  i === 1 ? 'Informations' : i === 2 ? 'Problème' : 'Contact'
                }</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientType">Type de client</Label>
                <RadioGroup
                  name="clientType"
                  onValueChange={(value) => handleSelectChange('clientType', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="particulier" id="particulier" />
                    <Label htmlFor="particulier">Particulier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professionnel" id="professionnel" />
                    <Label htmlFor="professionnel">Professionnel</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.clientType === 'professionnel' && (
                <div>
                  <Label htmlFor="sector">Secteur d'activité</Label>
                  <Select name="sector" onValueChange={(value) => handleSelectChange('sector', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restauration">Restauration</SelectItem>
                      <SelectItem value="hotellerie">Hôtellerie</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                      <SelectItem value="education">Éducation</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="industrie">Industrie</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label htmlFor="propertyType">Type de propriété</Label>
                <Select name="propertyType" onValueChange={(value) => handleSelectChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maison">Maison individuelle</SelectItem>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="bureau">Bureau</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="entrepot">Entrepôt</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="area">Surface approximative (m²)</Label>
                <Input
                  type="number"
                  id="area"
                  name="area"
                  placeholder="Ex: 100"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="pestType">Type de nuisible</Label>
                <Select name="pestType" onValueChange={(value) => handleSelectChange('pestType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de nuisible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rats">Rats</SelectItem>
                    <SelectItem value="souris">Souris</SelectItem>
                    <SelectItem value="cafards">Cafards</SelectItem>
                    <SelectItem value="punaises">Punaises de lit</SelectItem>
                    <SelectItem value="fourmis">Fourmis</SelectItem>
                    <SelectItem value="guepes">Guêpes/Frelons</SelectItem>
                    <SelectItem value="pigeons">Pigeons</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="urgency">Niveau d'urgence</Label>
                <RadioGroup
                  name="urgency"
                  onValueChange={(value) => handleSelectChange('urgency', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faible" id="faible" />
                    <Label htmlFor="faible">Faible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moyen" id="moyen" />
                    <Label htmlFor="moyen">Moyen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eleve" id="eleve" />
                    <Label htmlFor="eleve">Élevé</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="message">Description du problème</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez brièvement votre problème de nuisibles..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="h-32"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="01 23 45 67 89"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Votre adresse complète"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold">Merci pour votre demande !</h3>
              <p>Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les plus brefs délais.</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && step < 4 && (
          <Button type="button" variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
          </Button>
        )}
        {step < 3 && (
          <Button type="button" className="ml-auto" onClick={handleNext}>
            Suivant <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {step === 3 && (
          <Button type="submit" className="ml-auto bg-teal-500 hover:bg-teal-600" onClick={handleSubmit}>
            Envoyer la demande
          </Button>
        )}
        {step === 4 && (
          <Button type="button" className="mx-auto" onClick={() => setStep(1)}>
            Nouvelle demande
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}