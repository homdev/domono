'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import Image from "next/image"
import { useMemo } from 'react'
import type { TestimonialSchema, Testimonial } from '@/types/testimonials'

// Données des témoignages
const testimonials: Testimonial[] = [
  {
    rating: 5,
    author: "Judith Gayo",
    content: "Un 10/10 rapide effectué et très aimable merci"
  },
  {
    rating: 5,
    author: "Naelle mahdi",
    content: "Réactif, très professionnel, ponctuel et rassurant sur la situation qui m'arrivait, nous a guidé avec bienveillance et professionnalisme, afin de rendre le traitement le plus efficace possible un grand merci à l'intervenant de cette société"
  },
  {
    rating: 5,
    author: "Aicha Bahlali",
    content: "Je suis très satisfaite de cette entreprise professionnelle qui a su me débarrasser des punaises de lit."
  }
]

// Composant pour les étoiles
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4 pt-4" aria-label={`${rating} étoiles sur 5`}>
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="h-6 w-6 fill-teal-500 text-teal-500" />
    ))}
  </div>
)

// Composant pour un témoignage
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
  <Card className={`p-8 border-2 ${index % 2 === 0 ? 'border-teal-100/50 bg-teal-50/30' : 'border-orange-100/50 bg-orange-50/30'}`}>
    <RatingStars rating={testimonial.rating} />
    <p className="text-gray-700 mb-4 text-center">
      {testimonial.content}
    </p>
    <p className="font-semibold text-center">{testimonial.author}</p>
  </Card>
)

export const TestimonialsSectionComponent = () => {
  // Création du schema une seule fois
  const testimonialSchema: TestimonialSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "review": testimonials.map(t => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString()
      },
      "author": {
        "@type": "Person",
        "name": t.author
      },
      "reviewBody": t.content
    }))
  }), [])

  return (
    <section className="py-24 bg-white overflow-hidden" aria-labelledby="testimonials-title">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialSchema) }} 
      />
      
      <div className="container mx-auto px-4">
        <h2 id="testimonials-title" className="text-center text-4xl font-bold mb-16">
          Nos <span className="text-orange-400">témoignages</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.author} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>

        {/* Pagination et autres éléments... */}
        <div className="flex justify-center gap-2 mb-16">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-teal-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Section Google Reviews */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/img/google.webp"
              alt="Logo Google"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl">Avis</span>
            <RatingStars rating={5} />
          </div>

          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-2 rounded-full"
          >
            Voir tous les avis de nos clients
          </Button>
        </div>

        {/* Widget Trustpilot */}
        <div className="flex justify-center">
          <Card className="inline-flex items-center gap-2 px-4 py-2 border-2 border-teal-100">
            <span className="text-sm">Évaluez nous sur</span>
            <Image
              src="/assets/img/trustpilot.svg"
              alt="Logo Trustpilot"
              width={120}
              height={50}
              className="h-5 w-auto"
            />
          </Card>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSectionComponent 