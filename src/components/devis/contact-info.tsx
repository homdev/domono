'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PhoneInput } from '@/components/ui/phone-input'

// Schéma de validation pour les informations de contact
const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'L\'adresse doit comporter au moins 5 caractères'),
  zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  city: z.string().min(2, 'La ville doit comporter au moins 2 caractères'),
  isCompany: z.boolean().default(false),
  companyName: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

type ContactInfoProps = {
  formData: any
  updateFormData: (data: any) => void
}

export default function ContactInfo({ formData, updateFormData }: ContactInfoProps) {
  const [isCompany, setIsCompany] = useState(formData.isCompany || false)

  // Initialiser le formulaire avec les données existantes ou des valeurs par défaut
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema) as any,
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      zipCode: formData.zipCode || '',
      city: formData.city || '',
      isCompany: formData.isCompany || false,
      companyName: formData.companyName || '',
      privacyConsent: formData.privacyConsent || false,
    },
  })

  // Gérer la soumission du formulaire
  function onSubmit(values: z.infer<typeof contactSchema>) {
    updateFormData({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      zipCode: values.zipCode,
      city: values.city,
      isCompany: values.isCompany,
      companyName: values.companyName,
      privacyConsent: values.privacyConsent,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="py-4"
    >
      <h2 className="text-2xl font-semibold mb-2">Vos coordonnées</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Ces informations nous permettront de vous contacter pour discuter de votre projet.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom*</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom*</FormLabel>
                  <FormControl>
                    <Input placeholder="Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="jean.dupont@exemple.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone*</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="06 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isCompany"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      setIsCompany(checked as boolean)
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Je représente une entreprise</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {isCompany && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="Entreprise SAS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse*</FormLabel>
                <FormControl>
                  <Input placeholder="123 rue de la République" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal*</FormLabel>
                  <FormControl>
                    <Input placeholder="13001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville*</FormLabel>
                  <FormControl>
                    <Input placeholder="Marseille" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>J'accepte la politique de confidentialité*</FormLabel>
                  <FormDescription>
                    En soumettant ce formulaire, j'accepte que mes données soient traitées conformément à la 
                    <a href="/politique-confidentialite" className="text-primary hover:underline ml-1">
                      politique de confidentialité
                    </a>.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {form.formState.isValid ? (
            <motion.div 
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-green-800 dark:text-green-300">
                <span className="font-semibold">Parfait !</span> Cliquez sur "Envoyer" pour finaliser votre demande de devis.
              </p>
            </motion.div>
          ) : (
            <p className="text-sm text-gray-500 italic">* Champs obligatoires</p>
          )}
        </form>
      </Form>
    </motion.div>
  )
} 