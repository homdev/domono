import { Resend } from 'resend';

// S'assurer que la clé API est bien définie
if (!process.env.RESEND_API_KEY) {
  console.error('[NETLIFY] ERREUR: Clé API Resend non définie dans les variables d\'environnement');
}

// Adresse email pour les notifications (destinataire des emails)
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@domono.fr';

// Initialiser Resend avec la clé API
let resendInstance: Resend;

try {
  console.log('[NETLIFY] Initialisation de Resend avec la clé API');
  
  // Créer une instance de Resend
  resendInstance = new Resend(process.env.RESEND_API_KEY || '');
  
  console.log('[NETLIFY] Instance Resend créée avec succès');
} catch (error) {
  console.error('[NETLIFY] Erreur lors de l\'initialisation de Resend:', error);
  
  // Créer une instance de secours même en cas d'erreur (elle échouera à l'exécution si la clé est invalide)
  resendInstance = new Resend('invalid_key');
}

export const resend = resendInstance; 