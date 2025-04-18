/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ShieldAlert, 
  Camera, 
  Home, 
  Bell, 
  Lock,
  Fingerprint 
} from 'lucide-react'

export const SolutionsSection = () => {
  return (
        <section className="py-24 mt-8 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-50 blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                Nos <span className="text-teal-600">solutions</span>
              </h2>
            </div>

            <Tabs defaultValue="domotique" className="w-full max-w-lg mx-auto">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-12">
                <TabsTrigger value="domotique">Domotique</TabsTrigger>
                <TabsTrigger value="alarme">Alarme</TabsTrigger>
                <TabsTrigger value="video">Vidéosurveillance</TabsTrigger>
                <TabsTrigger value="incendie">Sécurité incendie</TabsTrigger>
                <TabsTrigger value="acces">Contrôle d'accès</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <Home className="h-12 w-12 " />
                <h3 className="text-xl">Maison connectée</h3>
                <p className="text-gray-600">
                  Transformez votre habitat avec nos solutions de maison intelligente. Contrôlez éclairage, chauffage et volets
                  à distance depuis votre smartphone.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Bell className="h-12 w-12 " />
                <h3 className="text-xl">Système d'alarme</h3>
                <p className="text-gray-600">
                  Protégez votre domicile avec nos systèmes d'alarme performants connectés à votre smartphone pour une 
                  tranquillité d'esprit à toute épreuve.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Camera className="h-12 w-12 " />
                <h3 className="text-xl">Vidéosurveillance</h3>
                <p className="text-gray-600">
                  Nos solutions de vidéosurveillance HD vous permettent de garder un œil sur votre propriété où que vous soyez.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <ShieldAlert className="h-12 w-12 " />
                <h3 className="text-xl">Sécurité incendie</h3>
                <p className="text-gray-600">
                  Protection optimale contre les incendies avec nos systèmes de détection et d'alerte connectés aux pompiers.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
                <Lock className="h-12 w-12 " />
                <h3 className="text-xl">Contrôle d'accès</h3>
                <p className="text-gray-600">
                  Sécurisez les accès à votre domicile ou votre entreprise avec nos solutions de contrôle d'accès modernes et fiables.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
              <Fingerprint className="h-12 w-12 " />
              <h3 className="text-xl">Serrures connectées</h3>
              <p className="text-gray-600">
                Oubliez les clés avec nos serrures biométriques et connectées. Contrôlez l'accès à distance et recevez des notifications
                à chaque ouverture.
              </p>
              <Button 
                variant="link" 
                className="text-teal-600"
                aria-label="En savoir plus sur nos services de serrures connectées"
              >
                En savoir +
              </Button>
            </Card>
            </div>
          </div>
        </section>
  )
} 