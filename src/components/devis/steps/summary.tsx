'use client'

import React from 'react'
import { FormData, DomotiqueFormData, AlarmeFormData, VideosurveillanceFormData, ControleAccesFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Check, User, Mail, Phone, MapPin, Globe, Calendar, Shield, Home, Video, Lock, Clock, CheckCircle, Send, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SummaryProps {
  formData: Partial<FormData>
  prevStep: () => void
  handleSubmit: () => void
}

export function Summary({ formData, prevStep, handleSubmit }: SummaryProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  
  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      await handleSubmit()
      setSubmitSuccess(true)
      // Message de succès avec la notification d'email
      toast.success(
        "Votre demande de devis a été envoyée avec succès ! Un email de confirmation a été envoyé à l'équipe qui vous contactera très rapidement.", 
        { duration: 6000 }
      )
    } catch (error) {
      console.error("Erreur lors de la soumission du devis:", error)
      setSubmitError("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou nous contacter directement.")
      toast.error("Erreur lors de l'envoi du devis. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Obtenir le nom du service
  const getServiceName = (service: string) => {
    switch (service) {
      case 'domotique': return 'Domotique';
      case 'alarme': return 'Alarme';
      case 'videosurveillance': return 'Vidéosurveillance';
      case 'controle-acces': return 'Contrôle d\'accès';
      default: return 'Non spécifié';
    }
  }

  // Badge personnalisé pour les informations importantes
  const InfoBadge = ({ children, color = "orange" }: { children: React.ReactNode, color?: string }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
      {children}
    </span>
  );

  // Rendu spécifique au service
  const renderServiceDetails = () => {
    switch (formData.service) {
      case 'domotique':
        const domotiqueData = formData as Partial<DomotiqueFormData>;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Home className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Type de logement</p>
                  <p className="font-medium">{domotiqueData.propertyType === 'maison' ? 'Maison' : 'Appartement'}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Globe className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Surface</p>
                  <p className="font-medium">{domotiqueData.surfaceArea ? `${domotiqueData.surfaceArea} m²` : 'Non spécifiée'}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Projet</p>
                  <p className="font-medium">{domotiqueData.projectType === 'neuf' ? 'Neuf' : 'Rénovation'}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Urgence</p>
                  <p className="font-medium">
                    {domotiqueData.urgency === 'immediate' ? 'Immédiat' :
                     domotiqueData.urgency === '1-3months' ? '1 à 3 mois' : '3+ mois'}
                  </p>
                </div>
              </div>
              
              {domotiqueData.budget && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">{domotiqueData.budget}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
                Besoins sélectionnés
              </p>
              <div className="flex flex-wrap gap-2">
                {domotiqueData.needLighting && <InfoBadge>Éclairage</InfoBadge>}
                {domotiqueData.needHeating && <InfoBadge>Chauffage/clim</InfoBadge>}
                {domotiqueData.needShutters && <InfoBadge>Volets roulants</InfoBadge>}
                {domotiqueData.needMultimedia && <InfoBadge>Audio/multimédia</InfoBadge>}
                {domotiqueData.needRemoteControl && <InfoBadge>Contrôle à distance</InfoBadge>}
                {!domotiqueData.needLighting && 
                  !domotiqueData.needHeating && 
                  !domotiqueData.needShutters && 
                  !domotiqueData.needMultimedia && 
                  !domotiqueData.needRemoteControl && 
                  <span className="text-gray-500 italic">Aucun besoin spécifié</span>}
              </div>
            </div>
          </div>
        );
      
      case 'alarme':
        const alarmeData = formData as Partial<AlarmeFormData>;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Home className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Type de lieu</p>
                  <p className="font-medium">
                    {alarmeData.locationType === 'maison' ? 'Maison' :
                    alarmeData.locationType === 'appartement' ? 'Appartement' :
                    alarmeData.locationType === 'commerce' ? 'Commerce' : 'Bureau'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Déjà équipé</p>
                  <p className="font-medium">{alarmeData.alreadyEquipped ? 'Oui' : 'Non'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Type de solution</p>
                <p className="font-medium">
                  {alarmeData.solutionType === 'economic' ? 'Solution économique' : 'Solution haut niveau'}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
                Objectifs
              </p>
              <div className="flex flex-wrap gap-2">
                {alarmeData.needSonicDeterrence && <InfoBadge>Dissuasion sonore</InfoBadge>}
                {alarmeData.needConnectedAlarm && <InfoBadge>Alarme connectée</InfoBadge>}
                {alarmeData.needSmartphoneAlert && <InfoBadge>Alerte smartphone</InfoBadge>}
                {alarmeData.needSecurityIntervention && <InfoBadge>Intervention sécurité</InfoBadge>}
              </div>
            </div>
          </div>
        );
      
      case 'videosurveillance':
        const videoData = formData as Partial<VideosurveillanceFormData>;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Video className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nombre de caméras</p>
                  <p className="font-medium">{videoData.cameraCount}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Projet</p>
                  <p className="font-medium">
                    {videoData.projectTiming === 'immediate' ? 'Immédiat' :
                    videoData.projectTiming === 'planned' ? 'À prévoir' : 'Demande de conseil'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
                Lieux à surveiller
              </p>
              <div className="flex flex-wrap gap-2">
                {videoData.surveillanceLocation?.includes('maison') && <InfoBadge>Maison</InfoBadge>}
                {videoData.surveillanceLocation?.includes('entree') && <InfoBadge>Entrée</InfoBadge>}
                {videoData.surveillanceLocation?.includes('jardin') && <InfoBadge>Jardin</InfoBadge>}
                {videoData.surveillanceLocation?.includes('garage') && <InfoBadge>Garage</InfoBadge>}
                {videoData.surveillanceLocation?.includes('commerce') && <InfoBadge>Commerce</InfoBadge>}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
                Besoins spécifiques
              </p>
              <div className="flex flex-wrap gap-2">
                {videoData.needNightVision && <InfoBadge>Vision nocturne</InfoBadge>}
                {videoData.needCloudRecording && <InfoBadge>Enregistrement cloud</InfoBadge>}
                {videoData.needLiveNotifications && <InfoBadge>Notifications en direct</InfoBadge>}
              </div>
            </div>
          </div>
        );
      
      case 'controle-acces':
        const controleData = formData as Partial<ControleAccesFormData>;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Home className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Type de bâtiment</p>
                  <p className="font-medium">
                    {controleData.buildingType === 'residentiel' ? 'Résidentiel' :
                    controleData.buildingType === 'bureau' ? 'Bureau' :
                    controleData.buildingType === 'copropriete' ? 'Copropriété' : 'Commerce'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
                <Lock className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nombre de points d'accès</p>
                  <p className="font-medium">{controleData.accessPointCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Système existant</p>
                <p className="font-medium">{controleData.existingSystem ? 'Oui' : 'Non'}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
                Fonctionnalités souhaitées
              </p>
              <div className="flex flex-wrap gap-2">
                {controleData.needBadgeCode && <InfoBadge>Badge / Code</InfoBadge>}
                {controleData.needVideoIntercom && <InfoBadge>Interphone vidéo</InfoBadge>}
                {controleData.needRemoteAccess && <InfoBadge>Accès à distance</InfoBadge>}
                {controleData.needEntryHistory && <InfoBadge>Historique des entrées</InfoBadge>}
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>Aucun détail disponible</p>;
    }
  }

  // Fonction pour obtenir l'icône du service
  const getServiceIcon = () => {
    switch (formData.service) {
      case 'domotique': return <Home className="h-12 w-12 text-white" />;
      case 'alarme': return <Shield className="h-12 w-12 text-white" />;
      case 'videosurveillance': return <Video className="h-12 w-12 text-white" />;
      case 'controle-acces': return <Lock className="h-12 w-12 text-white" />;
      default: return <Globe className="h-12 w-12 text-white" />;
    }
  }

  const contactItem = (icon: React.ReactNode, label: string, value: React.ReactNode) => (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          {getServiceIcon()}
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Récapitulatif de votre demande</h2>
        <p className="text-gray-600">
          Vérifiez vos informations avant de soumettre votre demande de devis.
        </p>
      </div>

      <div className="space-y-6">
        {/* Service sélectionné */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-orange-100 mb-1">Service demandé</h3>
              <p className="text-2xl font-bold">{getServiceName(formData.service as string)}</p>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <Check className="w-5 h-5 mr-2" />
              <span className="font-medium">Devis gratuit</span>
            </div>
          </div>
        </motion.div>
        
        {/* Détails du service */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200 flex items-center">
            <CheckCircle className="w-5 h-5 text-orange-500 mr-2" />
            Détails du projet
          </h3>
          {renderServiceDetails()}
        </motion.div>
        
        {/* Coordonnées */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200 flex items-center">
            <User className="w-5 h-5 text-orange-500 mr-2" />
            Vos coordonnées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactItem(
              <User className="h-5 w-5 text-orange-500" />,
              "Nom complet",
              <>{formData.firstName} {formData.lastName}</>
            )}
            
            {contactItem(
              <Mail className="h-5 w-5 text-orange-500" />,
              "Email",
              formData.email
            )}
            
            {contactItem(
              <Phone className="h-5 w-5 text-orange-500" />,
              "Téléphone",
              formData.phone
            )}
            
            {contactItem(
              <MapPin className="h-5 w-5 text-orange-500" />,
              "Adresse",
              <div>
                {formData.address}<br />
                {formData.postalCode} {formData.city}
              </div>
            )}
            
            {contactItem(
              <Calendar className="h-5 w-5 text-orange-500" />,
              "Horaire de contact préféré",
              formData.preferredContactTime === 'morning' ? 'Matin (9h-12h)' :
              formData.preferredContactTime === 'afternoon' ? 'Après-midi (14h-17h)' :
              formData.preferredContactTime === 'evening' ? 'Soir (17h-19h)' : 'N\'importe quand'
            )}
            
            {contactItem(
              <MessageCircle className="h-5 w-5 text-orange-500" />,
              "Mode de contact préféré",
              formData.preferredContactMethod === 'email' ? 'Email' :
              formData.preferredContactMethod === 'phone' ? 'Téléphone' : 'Indifférent'
            )}
          </div>
        </motion.div>
        
        {/* Commentaires */}
        {formData.additionalComments && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200 flex items-center">
              <MessageCircle className="w-5 h-5 text-orange-500 mr-2" />
              Commentaires
            </h3>
            <p className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-100">{formData.additionalComments}</p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-6"
      >
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="flex-1 sm:flex-initial"
        >
          Retour
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 flex-1 sm:flex-initial py-6"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div> Envoi en cours...</>
          ) : (
            <><Send className="w-5 h-5 mr-2" /> Recevoir mon devis gratuit</>
          )}
        </Button>
      </motion.div>
    </div>
  )
} 