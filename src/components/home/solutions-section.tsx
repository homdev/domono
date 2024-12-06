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
    <section className="min-h-[800px] py-24 mt-8 bg-white relative overflow-hidden">
      <div className="fixed-size-blur top-0 right-0" />
      <div className="fixed-size-blur bottom-0 left-0" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 h-[60px] flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            Nos <span className="text-orange-400">solutions</span>
          </h2>
        </div>

        <Tabs defaultValue="punaises" className="w-full max-w-lg mx-auto h-[60px] mb-12">
          <TabsList className="flex flex-wrap justify-center gap-2">
            <TabsTrigger value="punaises">Punaises de lit</TabsTrigger>
            <TabsTrigger value="cafard">Cafard</TabsTrigger>
            <TabsTrigger value="pigeon">Pigeon</TabsTrigger>
            <TabsTrigger value="acarien">Acarien</TabsTrigger>
            <TabsTrigger value="rats">Rats et souris</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Spray className="h-12 w-12 text-teal-600" />,
              title: "Traitement chimique",
              description: "Les entreprises de désinsectisation misent principalement sur l'utilisation d'insecticides professionnels pour prévenir et éradiquer les infestations de punaises de lit."
            },
            {
              icon: <Wind className="h-12 w-12 text-teal-600" />,
              title: "Traitement vapeur sèche",
              description: "Avec des produits chimiques professionnels et un traitement thermique, il est possible de supprimer les infestations importantes."
            },
            {
              icon: <Snowflake className="h-12 w-12 text-teal-600" />,
              title: "Traitement cryogénisation",
              description: "Les punaises de lit ne résistent pas au froid, on parle ici de températures en dessous de 0°C."
            },
            {
              icon: <Thermometer className="h-12 w-12 text-teal-600" />,
              title: "Traitement thermique",
              description: "Pour éradiquer la présence de cet insecte, il faut combiner traitements insecticides et traitements thermiques."
            },
            {
              icon: <Dog className="h-12 w-12 text-teal-600" />,
              title: "Détecteur canin",
              description: "La détection canine contre les punaises de lit consiste à faire intervenir un chien renifleur, spécialement entraîné."
            },
            {
              icon: <Search className="h-12 w-12 text-teal-600" />,
              title: "Diagnostic & Expertise",
              description: "Inspection approfondie, identification précise des nuisibles et rapport détaillé. Intervention sur mesure adaptée à votre situation en Île-de-France."
            }
          ].map((card, index) => (
            <Card key={index} className="p-6 h-[280px] flex flex-col">
              <div className="flex-shrink-0">{card.icon}</div>
              <h3 className="text-xl font-bold text-teal-600 mt-4">{card.title}</h3>
              <p className="text-gray-600 flex-grow">{card.description}</p>
              <Button 
                variant="link" 
                className="text-teal-600 mt-auto"
                aria-label={`En savoir plus sur ${card.title.toLowerCase()}`}
              >
                En savoir +
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}