// Types pour le système de devis

// Types pour les services
export type ServiceType = 'domotique' | 'alarme' | 'videosurveillance' | 'controle-acces';

// Types des étapes du formulaire
export type FormStepType = 
  | 'service-selection' 
  | 'project-details' 
  | 'additional-info' 
  | 'contact-info' 
  | 'summary';

// Type d'étape pour l'indicateur de progression
export type Step = {
  id: number;
  name: string;
  description: string;
  title?: string; // Ajouté pour compatibilité avec certains composants
}

// Structure commune pour tous les formulaires
export interface BaseFormData {
  // Étape 1: Sélection des services
  service: ServiceType;
  
  // Étape 4: Coordonnées
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  preferredContactMethod: 'email' | 'phone' | 'both';
  preferredContactTime: 'morning' | 'afternoon' | 'evening' | 'anytime';
  
  // Commentaires additionnels
  additionalComments: string;
}

// Interfaces pour chaque type de service
// Domotique
export interface DomotiqueFormData extends BaseFormData {
  propertyType: string;
  surfaceArea: number | string;
  needLighting: boolean;
  needHeating: boolean;
  needShutters: boolean;
  needMultimedia: boolean;
  needRemoteControl: boolean;
  projectType: string;
  budget: string;
  urgency: string;
}

// Alarme intrusion
export interface AlarmeFormData extends BaseFormData {
  // Type de lieu
  locationType: 'maison' | 'appartement' | 'commerce' | 'bureau';
  
  // Objectifs
  needSonicDeterrence: boolean;
  needConnectedAlarm: boolean;
  needSmartphoneAlert: boolean;
  needSecurityIntervention: boolean;
  
  // Déjà équipé
  alreadyEquipped: boolean;
  
  // Budget ou attente
  solutionType: 'economic' | 'high-level';
}

// Vidéosurveillance
export interface VideosurveillanceFormData extends BaseFormData {
  // Lieu à surveiller
  surveillanceLocation: ('maison' | 'entree' | 'jardin' | 'garage' | 'commerce')[];
  
  // Nombre de caméras
  cameraCount: '1' | '2-3' | '4+';
  
  // Besoins spécifiques
  needNightVision: boolean;
  needCloudRecording: boolean;
  needLiveNotifications: boolean;
  
  // Projet
  projectTiming: 'immediate' | 'planned' | 'advice';
}

// Contrôle d'accès
export interface ControleAccesFormData extends BaseFormData {
  // Type de bâtiment
  buildingType: 'residentiel' | 'bureau' | 'copropriete' | 'commerce';
  
  // Nombre de points d'accès
  accessPointCount: '1' | '2-5' | '5+';
  
  // Fonctionnalités souhaitées
  needBadgeCode: boolean;
  needVideoIntercom: boolean;
  needRemoteAccess: boolean;
  needEntryHistory: boolean;
  
  // Système existant
  existingSystem: boolean;
}

// Type union pour tous les types de formulaires
export type FormData = 
  | DomotiqueFormData 
  | AlarmeFormData 
  | VideosurveillanceFormData 
  | ControleAccesFormData;

// Données spécifiques pour chaque service
export interface DomotiqueData {
  propertyType: string; 
  propertySize: number;
  roomCount: number;
  existingSystem: boolean;
  smartDevices: string[];
  budget: string;
  timeline: string;
}

export interface AlarmeData {
  propertyType: string;
  propertySize: number;
  outdoorProtection: boolean;
  existingSystem: boolean;
  remoteMobileAccess: boolean;
  budget: string;
  timeline: string;
}

export interface VideosurveillanceData {
  propertyType: string;
  propertySize: number;
  cameraCount: number;
  isOutdoor: boolean;
  storageNeeds: string;
  remoteMobileAccess: boolean;
  budget: string;
  timeline: string;
}

export interface ControleAccesData {
  propertyType: string;
  buildingType: string;
  entranceCount: number;
  userCount: number;
  accessType: string[];
  budget: string;
  timeline: string;
} 