/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  SprayCanIcon as Spray, 
  Thermometer, 
  Dog, 
  Wind, 
  Snowflake, 
  Search 
} from 'lucide-react'

export const SolutionsSection = () => {
  return (
        <section className="py-24 mt-8 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-50 blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                Nos <span className="text-orange-400">solutions</span>
              </h2>
            </div>

            <Tabs defaultValue="punaises" className="w-full max-w-lg mx-auto">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-12">
                <TabsTrigger value="punaises">Punaises de lit</TabsTrigger>
                <TabsTrigger value="cafard">Cafard</TabsTrigger>
                <TabsTrigger value="pigeon">Pigeon</TabsTrigger>
                <TabsTrigger value="acarien">Acarien</TabsTrigger>
                <TabsTrigger value="rats">Rats et souris</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <Spray className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement chimique</h3>
                <p className="text-gray-600">
                  Les entreprises de désinsectisation misent principalement sur l'utilisation d'insecticides
                  professionnels pour prévenir et éradiquer les infestations de punaises de lit.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Wind className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement vapeur sèche</h3>
                <p className="text-gray-600">
                  Avec des produits chimiques professionnels et un traitement thermique, il est possible de supprimer
                  les infestations importantes.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Snowflake className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement cryogénisation</h3>
                <p className="text-gray-600">
                  Les punaises de lit ne résistent pas au froid, on parle ici de températures en dessous de 0°C.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <Thermometer className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Traitement thermique</h3>
                <p className="text-gray-600">
                  Pour éradiquer la présence de cet insecte, il faut combiner traitements insecticides et traitements
                  thermiques.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
                <Dog className="h-12 w-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-600">Détecteur canin</h3>
                <p className="text-gray-600">
                  La détection canine contre les punaises de lit consiste à faire intervenir un chien renifleur,
                  spécialement entraîné.
                </p>
                <Button variant="link" className="text-teal-600">
                  En savoir +
                </Button>
              </Card>
              <Card className="p-6 space-y-4">
              <Search className="h-12 w-12 text-teal-600" />
              <h3 className="text-xl font-bold text-teal-600">Diagnostic & Expertise</h3>
              <p className="text-gray-600">
                Inspection approfondie, identification précise des nuisibles et rapport détaillé. 
                Intervention sur mesure adaptée à votre situation en Île-de-France.
              </p>
              <Button 
                variant="link" 
                className="text-teal-600"
                aria-label="En savoir plus sur nos services de diagnostic et expertise en dératisation et désinsectisation"
              >
                En savoir +
              </Button>
            </Card>
            </div>
          </div>
        </section>
  )
} 