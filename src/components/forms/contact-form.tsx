import React, { useState } from 'react';
import { toast } from 'sonner';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  project: '',
  message: ''
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Réinitialiser le statut de succès lorsque l'utilisateur modifie le formulaire après un envoi réussi
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique côté client
    const errors: string[] = [];
    
    if (!formData.firstName.trim()) errors.push('Le prénom est requis');
    if (!formData.lastName.trim()) errors.push('Le nom est requis');
    if (!formData.email.trim()) errors.push('L\'email est requis');
    if (!formData.phone.trim()) errors.push('Le numéro de téléphone est requis');
    if (!formData.message.trim()) errors.push('Le message est requis');
    
    if (errors.length > 0) {
      toast.error(
        <div>
          <p className="font-bold mb-2">Veuillez corriger les erreurs suivantes :</p>
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Afficher une notification de loading
      const loadingToast = toast.loading('Envoi de votre message...');
      
      // Appel à l'API pour envoyer l'email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      // Fermer la notification de chargement
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Réinitialiser le formulaire
        setFormData(initialFormData);
        setSubmitSuccess(true);
        
        // Afficher une notification de succès
        toast.success(
          <div>
            <p className="font-bold">Message envoyé avec succès!</p>
            <p>Nous vous contacterons très rapidement.</p>
          </div>,
          {
            duration: 5000,
            icon: '✅'
          }
        );
      } else {
        // Afficher les erreurs de validation de l'API si disponibles
        if (data.details && Object.keys(data.details).length > 0) {
          const apiErrors = Object.values(data.details.fieldErrors).flat() as string[];
          toast.error(
            <div>
              <p className="font-bold mb-2">Erreurs de validation :</p>
              <ul className="list-disc pl-4">
                {apiErrors.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          throw new Error(data.error || 'Une erreur est survenue');
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      toast.error(
        <div>
          <p className="font-bold">Erreur lors de l'envoi !</p>
          <p>Veuillez réessayer ou nous contacter directement par téléphone.</p>
        </div>,
        {
          duration: 5000,
          icon: '❌'
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 mb-6">
          <p className="font-medium">Votre message a été envoyé avec succès!</p>
          <p>Nous vous contacterons très prochainement.</p>
        </div>
      )}
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">Prénom</label>
          <input 
            type="text" 
            id="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary" 
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">Nom</label>
          <input 
            type="text" 
            id="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary" 
            placeholder="Votre nom"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary" 
          placeholder="votre@email.com"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
        <input 
          type="tel" 
          id="phone" 
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary" 
          placeholder="Votre numéro de téléphone"
        />
      </div>
      
      <div>
        <label htmlFor="project" className="block text-sm font-medium mb-2">Votre projet</label>
        <select 
          id="project" 
          value={formData.project}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Sélectionnez un type de projet</option>
          <option value="eclairage">Éclairage intelligent</option>
          <option value="securite">Sécurité & vidéosurveillance</option>
          <option value="temperature">Gestion de température</option>
          <option value="complete">Solution complète</option>
          <option value="autre">Autre projet</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea 
          id="message" 
          rows={4} 
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary" 
          placeholder="Décrivez votre projet et vos attentes..."
        ></textarea>
      </div>
      
      <div>
        <button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-md text-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting || submitSuccess}
        >
          {isSubmitting ? 'Envoi en cours...' : submitSuccess ? 'Message envoyé ✓' : 'Demander mon devis gratuit'}
        </button>
      </div>
    </form>
  );
} 