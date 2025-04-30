import { resend, CONTACT_EMAIL } from '../resend';
import { renderAsync } from '@react-email/components';
import React from 'react';
import QuoteEmailTemplate from './quote-email-template';

// Type générique pour accepter n'importe quelle structure de données de formulaire
export async function sendQuoteEmail(formData: any, quoteId: string) {
  try {
    // Vérifier la clé API
    if (!process.env.RESEND_API_KEY) {
      console.error('ERREUR CRITIQUE: Clé API Resend manquante. Vérifiez le fichier .env');
      return { success: false, error: 'Clé API Resend non configurée' };
    }

    console.log(`Préparation du template d'email pour le devis ${quoteId}...`);
    
    // Générer le HTML de l'email à partir du template React
    const templateHtml = await renderAsync(React.createElement(QuoteEmailTemplate, { formData, quoteId }));
    
    console.log(`Template généré. Envoi de l'email à ${CONTACT_EMAIL}...`);
    
    // Configuration de l'email
    const emailConfig = {
      from: `Devis Domono <contact@domono.fr>`,
      to: [CONTACT_EMAIL],
      subject: `Nouveau devis ${getServiceName(formData.service)} - ${formData.lastName} ${formData.firstName}`,
      html: templateHtml,
      replyTo: formData.email,
    };
    
    console.log('Configuration de l\'email:', {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: emailConfig.subject,
      replyTo: emailConfig.replyTo
    });
    
    // Envoyer l'email
    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return { success: false, error: error.message };
    }

    console.log('Email envoyé avec succès:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception lors de l\'envoi de l\'email:', error);
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