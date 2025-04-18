import { Card } from "@/components/ui/card"
import { Clock, Shield, MapPin, Award } from 'lucide-react'

export const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Intervention rapide",
      description: "Nos techniciens interviennent dans les plus brefs délais pour l'installation ou le dépannage de vos systèmes domotiques."
    },
    {
      icon: Shield,
      title: "Expertise certifiée",
      description: "Notre équipe est certifiée et formée aux dernières technologies de domotique et de sécurité pour votre habitat."
    },
    {
      icon: MapPin,
      title: "Couverture Marseille et alentours",
      description: "Nous intervenons à Marseille et dans toute la région PACA pour être au plus proche de vos besoins."
    },
    {
      icon: Award, 
      title: "Garantie satisfaction",
      description: "Nous garantissons la qualité de nos installations avec un service après-vente réactif et un suivi personnalisé."
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir <span className="text-teal-600">Domono Marseille</span> ?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous combinons expertise technique et service personnalisé pour transformer votre habitat en maison intelligente.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-teal-600 mx-auto" />
              <h3 className="text-xl text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 