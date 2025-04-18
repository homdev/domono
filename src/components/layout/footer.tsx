/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Phone, Clock, MapPin } from 'lucide-react'
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
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">S'inscrire</Button>
          </form>
        </div>
      </Card>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 07 67 03 68 48</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7/7 - 8h à 20h</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Marseille et environs</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Domotique</li>
              <li>Alarmes</li>
              <li>Vidéosurveillance</li>
              <li>Sécurité incendie</li>
              <li>Contrôle d'accès</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              <li><Link href={'/qui-sommes-nous' as AppRoutes}>Qui sommes-nous ?</Link></li>
              <li><Link href={'/tarifs' as AppRoutes}>Tarifs</Link></li>
              <li><Link href={'/blog' as AppRoutes}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Zone d'intervention</h3>
            <p>Marseille et tous les Bouches-du-Rhône</p>
            <p>Aix-en-Provence, Aubagne, Cassis, La Ciotat</p>
            <p>L'Estaque, Marseille, La Défense, Nice, Toulon</p>
            <p>Fréjus, La Seyne-sur-Mer, La Garde</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2024 Domono Marseille. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
} 