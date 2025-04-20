/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { 
  ShieldAlert, 
  Camera, 
  Home, 
  Bell, 
  Lock
} from 'lucide-react'
import Link from "next/link"

export const SolutionsSection = () => {
  return (
    <section 
      className="py-24 mt-8 bg-white relative overflow-hidden"
      style={{ 
        minHeight: '800px',  // Hauteur minimale pour réserver l'espace
        contain: 'content'   // Aide à prévenir les layout shifts
      }}
    >
      {/* Éléments décoratifs avec dimensions fixes */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl" 
        style={{ contain: 'strict', transform: 'translateZ(0)' }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-50 blur-3xl" 
        style={{ contain: 'strict', transform: 'translateZ(0)' }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative">
        <div 
          className="text-center mb-16"
          style={{ 
            height: '60px',   // Hauteur fixe pour le titre
            contain: 'strict' 
          }}
        >
          <h2 className="text-3xl font-bold">
            Nos <span className="text-teal-600">solutions</span>
          </h2>
        </div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ minHeight: '400px' }}  // Hauteur minimale pour éviter les shifts
        >
          {/* Carte Domotique */}
          <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group h-[350px] border border-gray-100 hover:border-orange-400 overflow-hidden">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-6 rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Home className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Domotique</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Transformez votre habitat avec nos solutions de maison intelligente. Contrôlez éclairage, chauffage et volets
                à distance depuis votre smartphone.
              </p>
              <Link href={{ pathname: '/domotique' }} aria-label="En savoir plus sur nos solutions de domotique">
                <Button 
                  variant="link" 
                  className="text-orange-700 hover:text-orange-800 p-2 h-auto font-medium min-h-10 min-w-40"
                  aria-hidden="true"
                >
                  En savoir plus →
                </Button>
              </Link>
            </div>
          </div>

          {/* Carte Alarme */}
          <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group h-[350px] border border-gray-100 hover:border-orange-400 overflow-hidden">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-6 rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Bell className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Alarme intrusion</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Protégez votre domicile avec nos systèmes d'alarme performants connectés à votre smartphone pour une 
                tranquillité d'esprit à toute épreuve.
              </p>
              <Link href={{ pathname: '/alarme' }} aria-label="En savoir plus sur nos systèmes d'alarme intrusion">
                <Button 
                  variant="link" 
                  className="text-orange-700 hover:text-orange-800 p-2 h-auto font-medium min-h-10 min-w-40"
                  aria-hidden="true"
                >
                  En savoir plus →
                </Button>
              </Link>
            </div>
          </div>

          {/* Carte Vidéosurveillance */}
          <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group h-[350px] border border-gray-100 hover:border-orange-400 overflow-hidden">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-6 rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Camera className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Vidéosurveillance</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Nos solutions de vidéosurveillance HD vous permettent de garder un œil sur votre propriété où que vous soyez,
                avec accès à distance et alertes en temps réel.
              </p>
              <Link href={{ pathname: '/videosurveillance' }} aria-label="En savoir plus sur nos solutions de vidéosurveillance">
                <Button 
                  variant="link" 
                  className="text-orange-700 hover:text-orange-800 p-2 h-auto font-medium min-h-10 min-w-40"
                  aria-hidden="true"
                >
                  En savoir plus →
                </Button>
              </Link>
            </div>
          </div>

          {/* Carte Contrôle d'accès */}
          <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group h-[350px] border border-gray-100 hover:border-orange-400 overflow-hidden">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-6 rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Lock className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Contrôle d'accès</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Sécurisez les accès à votre domicile ou votre entreprise avec nos solutions de contrôle d'accès modernes,
                incluant serrures connectées et accès biométrique.
              </p>
              <Link href={{ pathname: '/controle-acces' }} aria-label="En savoir plus sur nos solutions de contrôle d'accès">
                <Button 
                  variant="link" 
                  className="text-orange-700 hover:text-orange-800 p-2 h-auto font-medium min-h-10 min-w-40"
                  aria-hidden="true"
                >
                  En savoir plus →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 