import * as React from 'react';

// Interface qui regroupe tous les champs possibles pour le devis
interface QuoteFormData {
  // Champs communs
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  preferredContactMethod: string;
  preferredContactTime: string;
  additionalComments?: string;
  
  // Champs Domotique
  propertyType?: string;
  surfaceArea?: number | string;
  needLighting?: boolean;
  needHeating?: boolean;
  needShutters?: boolean;
  needMultimedia?: boolean;
  needRemoteControl?: boolean;
  projectType?: string;
  budget?: string;
  urgency?: string;
  
  // Champs Alarme
  locationType?: string;
  needSonicDeterrence?: boolean;
  needConnectedAlarm?: boolean;
  needSmartphoneAlert?: boolean;
  needSecurityIntervention?: boolean;
  alreadyEquipped?: boolean;
  solutionType?: string;
  
  // Champs Vidéosurveillance
  surveillanceLocation?: string[];
  cameraCount?: string;
  needNightVision?: boolean;
  needCloudRecording?: boolean;
  needLiveNotifications?: boolean;
  projectTiming?: string;
  
  // Champs Contrôle d'accès
  buildingType?: string;
  accessPointCount?: string;
  needBadgeCode?: boolean;
  needVideoIntercom?: boolean;
  needRemoteAccess?: boolean;
  needEntryHistory?: boolean;
  existingSystem?: boolean;
}

interface QuoteEmailTemplateProps {
  formData: QuoteFormData;
  quoteId: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function getServiceName(service: string): string {
  switch (service) {
    case 'domotique':
      return 'Domotique';
    case 'alarme':
      return 'Alarme';
    case 'videosurveillance':
      return 'Vidéosurveillance';
    case 'controle-acces':
      return 'Contrôle d\'Accès';
    default:
      return service;
  }
}

function getContactMethod(method: string): string {
  switch (method) {
    case 'EMAIL':
      return 'Email';
    case 'PHONE':
      return 'Téléphone';
    case 'ANY':
      return 'Email ou téléphone';
    default:
      return method;
  }
}

function getContactTime(time: string): string {
  switch (time) {
    case 'MORNING':
      return 'Matin';
    case 'AFTERNOON':
      return 'Après-midi';
    case 'EVENING':
      return 'Soir';
    case 'ANYTIME':
      return 'À tout moment';
    default:
      return time;
  }
}

// Rendu des détails spécifiques au service
function renderServiceDetails(formData: QuoteFormData) {
  switch (formData.service) {
    case 'domotique':
      return (
        <>
          <tr>
            <td style={styles.fieldName}>Type de logement:</td>
            <td style={styles.fieldValue}>{formData.propertyType === 'maison' ? 'Maison' : 'Appartement'}</td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Surface:</td>
            <td style={styles.fieldValue}>{formData.surfaceArea ? `${formData.surfaceArea} m²` : 'Non spécifiée'}</td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Besoins:</td>
            <td style={styles.fieldValue}>
              {[
                formData.needLighting && 'Éclairage',
                formData.needHeating && 'Chauffage/clim',
                formData.needShutters && 'Volets roulants',
                formData.needMultimedia && 'Audio/multimédia',
                formData.needRemoteControl && 'Contrôle à distance'
              ].filter(Boolean).join(', ') || 'Non spécifiés'}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Type de projet:</td>
            <td style={styles.fieldValue}>{formData.projectType === 'neuf' ? 'Projet neuf' : 'Rénovation'}</td>
          </tr>
          {formData.budget && (
            <tr>
              <td style={styles.fieldName}>Budget:</td>
              <td style={styles.fieldValue}>{formData.budget} €</td>
            </tr>
          )}
          <tr>
            <td style={styles.fieldName}>Urgence:</td>
            <td style={styles.fieldValue}>
              {formData.urgency === 'immediate' ? 'Immédiat' :
               formData.urgency === '1-3months' ? '1 à 3 mois' : '3+ mois'}
            </td>
          </tr>
        </>
      );
    case 'alarme':
      return (
        <>
          <tr>
            <td style={styles.fieldName}>Type de lieu:</td>
            <td style={styles.fieldValue}>
              {formData.locationType === 'maison' ? 'Maison' :
               formData.locationType === 'appartement' ? 'Appartement' :
               formData.locationType === 'commerce' ? 'Commerce' : 'Bureau'}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Objectifs:</td>
            <td style={styles.fieldValue}>
              {[
                formData.needSonicDeterrence && 'Dissuasion sonore',
                formData.needConnectedAlarm && 'Alarme connectée',
                formData.needSmartphoneAlert && 'Alerte smartphone',
                formData.needSecurityIntervention && 'Intervention sécurité'
              ].filter(Boolean).join(', ')}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Déjà équipé:</td>
            <td style={styles.fieldValue}>{formData.alreadyEquipped ? 'Oui' : 'Non'}</td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Type de solution:</td>
            <td style={styles.fieldValue}>
              {formData.solutionType === 'economic' ? 'Solution économique' : 'Solution haut niveau'}
            </td>
          </tr>
        </>
      );
    case 'videosurveillance':
      return (
        <>
          <tr>
            <td style={styles.fieldName}>Lieux à surveiller:</td>
            <td style={styles.fieldValue}>
              {(formData.surveillanceLocation as string[]).map(loc => {
                switch(loc) {
                  case 'maison': return 'Maison';
                  case 'entree': return 'Entrée';
                  case 'jardin': return 'Jardin';
                  case 'garage': return 'Garage';
                  case 'commerce': return 'Commerce';
                  default: return loc;
                }
              }).join(', ')}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Nombre de caméras:</td>
            <td style={styles.fieldValue}>
              {formData.cameraCount === '1' ? '1 caméra' :
               formData.cameraCount === '2-3' ? '2 à 3 caméras' : '4 caméras ou plus'}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Besoins spécifiques:</td>
            <td style={styles.fieldValue}>
              {[
                formData.needNightVision && 'Vision nocturne',
                formData.needCloudRecording && 'Enregistrement cloud',
                formData.needLiveNotifications && 'Notifications en direct'
              ].filter(Boolean).join(', ')}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Timing du projet:</td>
            <td style={styles.fieldValue}>
              {formData.projectTiming === 'immediate' ? 'Immédiat' :
               formData.projectTiming === 'planned' ? 'À prévoir' : 'Demande de conseil'}
            </td>
          </tr>
        </>
      );
    case 'controle-acces':
      return (
        <>
          <tr>
            <td style={styles.fieldName}>Type de bâtiment:</td>
            <td style={styles.fieldValue}>
              {formData.buildingType === 'residentiel' ? 'Résidentiel' :
               formData.buildingType === 'bureau' ? 'Bureau' :
               formData.buildingType === 'copropriete' ? 'Copropriété' : 'Commerce'}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Points d'accès:</td>
            <td style={styles.fieldValue}>
              {formData.accessPointCount === '1' ? '1 point d\'accès' :
               formData.accessPointCount === '2-5' ? '2 à 5 points d\'accès' : 'Plus de 5 points d\'accès'}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Fonctionnalités:</td>
            <td style={styles.fieldValue}>
              {[
                formData.needBadgeCode && 'Badge / Code',
                formData.needVideoIntercom && 'Interphone vidéo',
                formData.needRemoteAccess && 'Accès à distance',
                formData.needEntryHistory && 'Historique des entrées'
              ].filter(Boolean).join(', ')}
            </td>
          </tr>
          <tr>
            <td style={styles.fieldName}>Système existant:</td>
            <td style={styles.fieldValue}>{formData.existingSystem ? 'Oui' : 'Non'}</td>
          </tr>
        </>
      );
    default:
      return null;
  }
}

export const QuoteEmailTemplate: React.FC<QuoteEmailTemplateProps> = ({ formData, quoteId }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img 
          src="https://domono.fr/logo.png" 
          alt="Domono" 
          width="150" 
          height="auto" 
          style={styles.logo} 
        />
        <h1 style={styles.title}>Nouvelle demande de devis</h1>
      </div>
      
      <div style={styles.content}>
        <p style={styles.intro}>
          Un nouveau devis a été soumis sur le site Domono.fr le {formatDate(new Date())}.
        </p>
        
        <div style={styles.quoteId}>
          <span style={styles.quoteIdLabel}>Référence du devis:</span>
          <span style={styles.quoteIdValue}>{quoteId}</span>
        </div>
        
        <h2 style={styles.sectionTitle}>Informations client</h2>
        <table style={styles.detailsTable}>
          <tbody>
            <tr>
              <td style={styles.fieldName}>Nom:</td>
              <td style={styles.fieldValue}>{formData.lastName} {formData.firstName}</td>
            </tr>
            <tr>
              <td style={styles.fieldName}>Email:</td>
              <td style={styles.fieldValue}>{formData.email}</td>
            </tr>
            <tr>
              <td style={styles.fieldName}>Téléphone:</td>
              <td style={styles.fieldValue}>{formData.phone}</td>
            </tr>
            <tr>
              <td style={styles.fieldName}>Adresse:</td>
              <td style={styles.fieldValue}>{formData.address}, {formData.postalCode} {formData.city}</td>
            </tr>
            <tr>
              <td style={styles.fieldName}>Contact préféré:</td>
              <td style={styles.fieldValue}>{getContactMethod(formData.preferredContactMethod)}</td>
            </tr>
            <tr>
              <td style={styles.fieldName}>Horaires préférés:</td>
              <td style={styles.fieldValue}>{getContactTime(formData.preferredContactTime)}</td>
            </tr>
          </tbody>
        </table>
        
        <h2 style={styles.sectionTitle}>Détails du service: {getServiceName(formData.service)}</h2>
        <table style={styles.detailsTable}>
          <tbody>
            {renderServiceDetails(formData)}
          </tbody>
        </table>
        
        {formData.additionalComments && (
          <>
            <h2 style={styles.sectionTitle}>Commentaires additionnels</h2>
            <div style={styles.comments}>
              {formData.additionalComments}
            </div>
          </>
        )}
      </div>
      
      <div style={styles.footer}>
        <p>© {new Date().getFullYear()} Domono • Tous droits réservés</p>
        <p>
          <a href="https://domono.fr" style={styles.link}>domono.fr</a> • 
          <a href="mailto:contact@domono.fr" style={styles.link}>contact@domono.fr</a>
        </p>
      </div>
    </div>
  );
};

// Styles pour l'email
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: '24px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #eaeaea',
  },
  logo: {
    marginBottom: '16px',
  },
  title: {
    color: '#FF6600',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
  },
  content: {
    padding: '24px',
  },
  intro: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333333',
    marginBottom: '24px',
  },
  quoteId: {
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quoteIdLabel: {
    fontWeight: '600',
    color: '#666666',
  },
  quoteIdValue: {
    fontWeight: '700',
    color: '#FF6600',
    fontSize: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333',
    marginTop: '32px',
    marginBottom: '16px',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '8px',
  },
  detailsTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  fieldName: {
    width: '40%',
    padding: '8px 16px 8px 0',
    fontSize: '14px',
    color: '#666666',
    fontWeight: '600',
    verticalAlign: 'top' as const,
    borderBottom: '1px solid #eaeaea',
  },
  fieldValue: {
    width: '60%',
    padding: '8px 0',
    fontSize: '14px',
    color: '#333333',
    verticalAlign: 'top' as const,
    borderBottom: '1px solid #eaeaea',
  },
  comments: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#333333',
    whiteSpace: 'pre-wrap' as const,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '24px',
    borderTop: '1px solid #eaeaea',
    fontSize: '12px',
    color: '#666666',
    textAlign: 'center' as const,
  },
  link: {
    color: '#FF6600',
    textDecoration: 'none',
    marginLeft: '8px',
    marginRight: '8px',
  },
};

export default QuoteEmailTemplate; 