/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Phone, Clock, MapPin, Mail } from 'lucide-react'
import Link from "next/link"
import type { AppRoutes } from '@/types/routes'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-32 pb-8 relative">
      {/* Newsletter Card */}
      <Card className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 w-full max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Restez informé</h3>
          <p className="text-center mb-6">Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et conseils en domotique.</p>
          <form className="flex gap-4">
            <Input type="email" placeholder="Votre adresse e-mail" className="flex-grow" required />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">S'inscrire</Button>
          </form>
        </div>
      </Card>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 justify-items-center text-center md:text-left">
          <div className="w-full max-w-xs">
            <h3 className="font-bold text-xl mb-6 text-orange-400">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 md:justify-start justify-center">
                <Phone className="h-5 w-5 text-orange-400" /> 
                <a href="tel:0767036848" className="hover:text-orange-400 transition-colors">07 67 03 68 48</a>
              </li>
              <li className="flex items-center gap-3 md:justify-start justify-center">
                <Mail className="h-5 w-5 text-orange-400" />
                <a href="mailto:contact@domono.fr" className="hover:text-orange-400 transition-colors">contact@domono.fr</a>
              </li>
              <li className="flex items-center gap-3 md:justify-start justify-center">
                <Clock className="h-5 w-5 text-orange-400" /> 
                <span>7/7 - 8h à 20h</span>
              </li>
              <li className="flex items-center gap-3 md:justify-start justify-center">
                <MapPin className="h-5 w-5 text-orange-400" /> 
                <span>Marseille et environs</span>
              </li>
            </ul>
          </div>
          
          <div className="w-full max-w-xs">
            <h3 className="font-bold text-xl mb-6 text-orange-400">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/domotique" className="hover:text-orange-400 transition-colors">Domotique</Link></li>
              <li><Link href="/alarme" className="hover:text-orange-400 transition-colors">Alarmes</Link></li>
              <li><Link href="/videosurveillance" className="hover:text-orange-400 transition-colors">Vidéosurveillance</Link></li>
              <li><Link href="/controle-acces" className="hover:text-orange-400 transition-colors">Contrôle d'accès</Link></li>
              <li><Link href="/devis" className="hover:text-orange-400 transition-colors">Demande de devis</Link></li>
            </ul>
          </div>
          
          <div className="w-full max-w-xs">
            <h3 className="font-bold text-xl mb-6 text-orange-400">Zone d'intervention</h3>
            <p className="mb-2">Marseille et tous les Bouches-du-Rhône</p>
            <p className="mb-2">Aix-en-Provence, Aubagne, Cassis, La Ciotat</p>
            <p className="mb-2">L'Estaque, Marseille, La Défense</p>
            <p className="mb-2">Nice, Toulon, Fréjus, La Seyne-sur-Mer</p>
            <p className="mb-2">Toulouse, Montpellier, Nîmes, Perpignan</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2025 Domono. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
} 