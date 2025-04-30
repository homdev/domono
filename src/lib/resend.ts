import { Resend } from 'resend';

// Initialiser Resend avec la clé API
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email de contact pour recevoir les devis
export const CONTACT_EMAIL = 'contact@domono.fr'; 