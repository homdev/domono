'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Edit, Building, Home, User, Mail, Phone, MapPin, Calendar, Banknote } from 'lucide-react'

type SummaryProps = {
  formData: any
  handleSubmit: () => void
}

export default function Summary({ formData, handleSubmit }: SummaryProps) {
  // Fonction pour obtenir le nom du service
  const getServiceName = (serviceId: string) => {
    switch (serviceId) {
      case 'domotique': return 'Domotique'
      case 'alarme': return 'Alarme intrusion'
      case 'video': return 'Vidéosurveillance'
      case 'acces': return 'Contrôle d\'accès'
      default: return 'Non spécifié'
    }
  }

  // Fonction pour obtenir le budget en format lisible
  const getBudgetRange = (budget: string) => {
    switch (budget) {
      case '<5000': return 'Moins de 5 000 €'
      case '5000-10000': return 'Entre 5 000 € et 10 000 €'
      case '10000-20000': return 'Entre 10 000 € et 20 000 €'
      case '>20000': return 'Plus de 20 000 €'
      default: return budget || 'Non spécifié'
    }
  }

  // Fonction pour obtenir le délai en format lisible
  const getTimelineText = (timeline: string) => {
    switch (timeline) {
      case 'urgent': return 'Urgent (dès que possible)'
      case 'months1-3': return '1 à 3 mois'
      case 'months3-6': return '3 à 6 mois'
      case 'flexible': return 'Flexible / Pas pressé'
      default: return timeline || 'Non spécifié'
    }
  }

  // Animation des sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-4"
    >
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-semibold">Récapitulatif de votre demandes</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Vérifiez que toutes les informations sont correctes avant d'envoyer votre demande.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8"
      >
        {/* Service sélectionné */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Building className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </span>
            Service sélectionné
          </h3>
          <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">
            {getServiceName(formData.service)}
          </p>
        </motion.div>

        {/* Détails du projet */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </span>
            Détails du projet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Type de propriété</p>
              <p className="font-medium">
                {formData.projectType === 'residential' ? 'Résidentiel' :
                 formData.projectType === 'commercial' ? 'Commercial' :
                 formData.projectType === 'industrial' ? 'Industriel' : 'Non spécifié'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Superficie</p>
              <p className="font-medium">{formData.projectSize || 'Non spécifiée'} m²</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Budget estimé</p>
              <p className="font-medium">{getBudgetRange(formData.projectBudget)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Délai</p>
              <p className="font-medium">{getTimelineText(formData.projectTimeline)}</p>
            </div>
          </div>
          {formData.projectDetails && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Description détaillée</p>
              <p className="font-medium mt-1">{formData.projectDetails}</p>
            </div>
          )}
        </motion.div>

        {/* Informations de contact */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            </span>
            Vos informations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    {formData.isCompany && (
                      <p className="text-sm text-gray-500">{formData.companyName}</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p>{formData.email}</p>
                </li>
                <li className="flex gap-3 items-start">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p>{formData.phone}</p>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p>{formData.address}</p>
                  <p>{formData.zipCode} {formData.city}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900"
      >
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <span className="font-semibold">Information :</span> En cliquant sur "Envoyer ma demande", vous recevrez une 
          confirmation par email et un conseiller vous contactera dans les 24 heures ouvrées pour discuter de votre projet.
        </p>
      </motion.div>
    </motion.div>
  )
} 