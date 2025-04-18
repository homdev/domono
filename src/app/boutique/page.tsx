import { Metadata } from 'next';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Métadonnées optimisées pour le SEO
export const metadata: Metadata = {
  title: 'Boutique en ligne | Domono - Systèmes de sécurité et domotique à Marseille',
  description: 'Achetez nos produits de domotique, alarme et vidéosurveillance pour sécuriser votre maison. Livraison rapide à Marseille et dans toute la France.',
  keywords: ['boutique domotique', 'acheter alarme', 'vidéosurveillance Marseille', 'matériel domotique', 'caméra surveillance'],
  openGraph: {
    title: 'Boutique en ligne | Domono - Systèmes de sécurité et domotique',
    description: 'Achetez nos produits de domotique, alarme et vidéosurveillance pour sécuriser votre maison.',
    url: 'https://www.domono.fr/boutique',
    siteName: 'Domono Marseille',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boutique en ligne | Domono - Systèmes de sécurité et domotique',
    description: 'Achetez nos produits de domotique, alarme et vidéosurveillance pour sécuriser votre maison.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.domono.fr/boutique"
  }
}

// Données des produits (à remplacer par des données réelles de votre API/base de données)
const products = [
  {
    id: 1,
    name: 'Caméra de surveillance HD',
    description: 'Caméra IP haute définition avec vision nocturne et détection de mouvement',
    price: 129.99,
    image: '/assets/img/products/camera-hd.jpg',
    category: 'videosurveillance'
  },
  {
    id: 2,
    name: 'Kit alarme connectée',
    description: 'Système d\'alarme complet avec centrale, détecteurs et sirène',
    price: 249.99,
    image: '/assets/img/products/kit-alarme.jpg',
    category: 'alarme'
  },
  {
    id: 3,
    name: 'Thermostat intelligent',
    description: 'Contrôlez votre chauffage à distance et économisez de l\'énergie',
    price: 179.99,
    image: '/assets/img/products/thermostat.jpg',
    category: 'domotique'
  },
  {
    id: 4,
    name: 'Serrure connectée',
    description: 'Serrure intelligente avec ouverture par smartphone ou badge',
    price: 199.99,
    image: '/assets/img/products/serrure.jpg',
    category: 'domotique'
  },
  {
    id: 5,
    name: 'Détecteur de fumée connecté',
    description: 'Alerte sur votre smartphone en cas de détection de fumée',
    price: 89.99,
    image: '/assets/img/products/detecteur-fumee.jpg',
    category: 'alarme'
  },
  {
    id: 6,
    name: 'Interrupteur intelligent',
    description: 'Contrôlez vos lumières à distance via votre smartphone',
    price: 49.99,
    image: '/assets/img/products/interrupteur.jpg',
    category: 'domotique'
  },
];

// Catégories de produits
const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'domotique', name: 'Domotique' },
  { id: 'alarme', name: 'Alarme' },
  { id: 'videosurveillance', name: 'Vidéosurveillance' }
];

export default function BoutiquePage() {
  return (
    <main className="min-h-screen py-24 px-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Notre Boutique</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Découvrez notre sélection de produits de haute qualité pour sécuriser et connecter votre maison.
            </p>
          </div>
          
          <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white px-6 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Mon panier</span>
          </Button>
        </div>
        
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <Button 
              key={category.id}
              variant="outline" 
              className="rounded-full border-teal-200 hover:bg-teal-100 hover:text-teal-700"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
                {/* Placeholder pour l'image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-400 dark:text-slate-500">Image du produit</span>
                </div>
                {/* Décommentez cette ligne et fournissez les vraies images */}
                {/* <Image src={product.image} alt={product.name} fill className="object-cover" /> */}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="text-lg font-bold text-teal-600">{product.price} €</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-teal-100 text-teal-800">
                    {product.category === 'domotique' ? 'Domotique' : 
                     product.category === 'alarme' ? 'Alarme' : 
                     'Vidéosurveillance'}
                  </span>
                  <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Section avantages */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <div className="rounded-full bg-teal-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Produits certifiés</h3>
            <p className="text-slate-600 dark:text-slate-400">Tous nos produits sont sélectionnés avec soin et certifiés aux normes européennes.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <div className="rounded-full bg-teal-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
            <p className="text-slate-600 dark:text-slate-400">Livraison en 24-48h sur Marseille et ses environs, 3-5 jours pour la France métropolitaine.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <div className="rounded-full bg-teal-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.88 9.88l.32.32a4.5 4.5 0 016.4 6.4l-.32.32M14.12 14.12l-.32-.32a4.5 4.5 0 00-6.4-6.4l.32.32" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Support technique</h3>
            <p className="text-slate-600 dark:text-slate-400">Notre équipe est disponible 7j/7 pour vous assister dans l'installation et l'utilisation de vos produits.</p>
          </div>
        </div>
        
        {/* Bannière de service personnalisé */}
        <div className="mt-16 mb-2 bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Besoin d'un service personnalisé ?</h2>
              <p className="max-w-lg mb-4">Notre équipe d'experts peut vous conseiller sur les meilleures solutions adaptées à vos besoins spécifiques.</p>
              <Button className="bg-white text-teal-700 hover:bg-slate-100 rounded-full px-6">
                Contactez-nous
              </Button>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="h-64 w-64 bg-white/20 rounded-full flex items-center justify-center">
                <div className="h-48 w-48 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 