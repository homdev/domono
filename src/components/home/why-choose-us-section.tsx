import { Card } from "@/components/ui/card"
import { Clock, Shield, MapPin } from 'lucide-react'

export const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Intervention rapide",
      description: "Nous intervenons dans les plus brefs délais pour traiter votre problème de nuisibles."
    },
    {
      icon: Shield,
      title: "Expertise reconnue",
      description: "Notre équipe est formée aux dernières techniques de lutte contre les nuisibles."
    },
    {
      icon: MapPin,
      title: "Couverture Île-de-France",
      description: "Nous intervenons dans toute l'Île-de-France pour être au plus proche de vous."
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir <span className="text-teal-600">IDF Nuisibles</span> ?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous offrons des solutions professionnelles et efficaces pour tous vos problèmes de nuisibles.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-teal-600 mx-auto" />
              <h3 className="text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 