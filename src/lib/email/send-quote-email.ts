import { resend, CONTACT_EMAIL } from '../resend';
import { renderAsync } from '@react-email/components';
import React from 'react';
import QuoteEmailTemplate from './quote-email-template';

// Type générique pour accepter n'importe quelle structure de données de formulaire
export async function sendQuoteEmail(formData: any, quoteId: string) {
  try {
    // Vérifier la clé API
    if (!process.env.RESEND_API_KEY) {
      console.error('[NETLIFY] ERREUR CRITIQUE: Clé API Resend manquante. Vérifiez le fichier .env');
      return { success: false, error: 'Clé API Resend non configurée' };
    }

    console.log(`[NETLIFY] Préparation du template d'email pour le devis ${quoteId}...`);
    
    try {
      // Générer le HTML de l'email à partir du template React avec un timeout
      const templatePromise = renderAsync(React.createElement(QuoteEmailTemplate, { formData, quoteId }));
      
      // Définir un timeout pour éviter que le rendu du template ne bloque trop longtemps
      const templateTimeout = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout lors du rendu du template d'email")), 5000);
      });
      
      const templateHtml = await Promise.race([templatePromise, templateTimeout]);
      
      console.log(`[NETLIFY] Template généré (${templateHtml.length} caractères). Envoi de l'email à ${CONTACT_EMAIL}...`);
      
      // Utiliser un email de backup si CONTACT_EMAIL n'est pas défini
      const destinationEmail = CONTACT_EMAIL || 'infinitydev4@gmail.com';
      
      // Configuration de l'email
      const emailConfig = {
        from: `Devis Domono <contact@domono.fr>`,
        to: [destinationEmail],
        subject: `Nouveau devis ${getServiceName(formData.service)} - ${formData.lastName} ${formData.firstName}`,
        html: templateHtml,
        replyTo: formData.email,
      };
      
      console.log('[NETLIFY] Configuration de l\'email:', {
        from: emailConfig.from,
        to: emailConfig.to,
        subject: emailConfig.subject,
        replyTo: emailConfig.replyTo,
        htmlLength: templateHtml.length
      });

      // Ajouter un délai pour éviter d'éventuels problèmes de rate-limiting
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Envoyer l'email avec une gestion d'erreur améliorée
      const sendPromise = resend.emails.send(emailConfig);
      
      // Définir un timeout pour l'envoi d'email
      const sendTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout lors de l'envoi de l'email")), 8000);
      });
      
      const result = await Promise.race([sendPromise, sendTimeout]);
      const { data, error } = result as any;

      if (error) {
        console.error('[NETLIFY] Erreur lors de l\'envoi de l\'email:', error);
        return { success: false, error: error.message };
      }

      console.log('[NETLIFY] Email envoyé avec succès:', data);
      return { success: true, data };
    } catch (renderError) {
      console.error('[NETLIFY] Erreur lors du rendu du template:', renderError);
      
      // Tenter d'envoyer un email simple sans le template en cas d'échec du rendu
      const fallbackEmail = {
        from: `Devis Domono <contact@domono.fr>`,
        to: [CONTACT_EMAIL || 'infinitydev4@gmail.com'],
        subject: `Nouveau devis ${getServiceName(formData.service)} - ${formData.lastName} ${formData.firstName} (FALLBACK)`,
        text: `
          Nouveau devis créé (ID: ${quoteId})
          
          Service: ${getServiceName(formData.service)}
          Client: ${formData.firstName} ${formData.lastName}
          Email: ${formData.email}
          Téléphone: ${formData.phone}
          
          Note: Ceci est un email de secours suite à une erreur de génération du template.
        `,
        replyTo: formData.email,
      };
      
      console.log('[NETLIFY] Tentative d\'envoi d\'email de secours...');
      
      try {
        const { data, error } = await resend.emails.send(fallbackEmail);
        
        if (error) {
          console.error('[NETLIFY] Erreur lors de l\'envoi de l\'email de secours:', error);
          return { success: false, error: `Échec du template et de l'email de secours: ${error.message}` };
        }
        
        console.log('[NETLIFY] Email de secours envoyé avec succès:', data);
        return { success: true, data, fallback: true };
      } catch (fallbackError) {
        console.error('[NETLIFY] Échec de l\'envoi de l\'email de secours:', fallbackError);
        return { 
          success: false, 
          error: `Échecs multiples: ${renderError instanceof Error ? renderError.message : 'Erreur de rendu'} et ${fallbackError instanceof Error ? fallbackError.message : 'Erreur d\'envoi de secours'}` 
        };
      }
    }
  } catch (error) {
    console.error('[NETLIFY] Exception lors de l\'envoi de l\'email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue' 
    };
  }
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