'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog"
import { QuoteRequestFormComponent } from "@/components/forms/quote-request-form"
import Image from "next/image"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

const quoteFormSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Demande de devis IDF Nuisibles',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'IDF Nuisibles',
    'description': 'Expert en dératisation et désinsectisation en Île-de-France',
    'areaServed': 'Île-de-France',
    'priceRange': '€€',
  },
  'serviceType': 'Pest Control',
  'termsOfService': 'https://idfnuisibles.fr/conditions-generales',
  'availableChannel': {
    '@type': 'ServiceChannel',
    'serviceUrl': 'https://idfnuisibles.fr',
    'servicePhone': '01 80 88 23 06',
    'availableLanguage': 'French'
  }
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteFormSchema) }}
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-3xl w-full max-h-[90vh] overflow-y-auto overflow-hidden relative bg-transparent backdrop-blur-sm border-none mt-10"
        >
          <div className="absolute -z-10 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/5 w-64 h-64 opacity-90">
            <Image
              src="/assets/img/idfnuisibles.svg"
              alt="IDF Nuisibles Mascotte"
              width={256}
              height={256}
              className="object-contain"
              priority
            />
          </div>

          <DialogHeader>
            <DialogTitle id="quote-form-title" className=" text-2xl font-bold mt-16 text-white">
              Vous avez <span className="text-orange-400">une urgence ?</span>
            </DialogTitle>
          </DialogHeader>
          <QuoteRequestFormComponent />
        </DialogContent>
      </Dialog>
    </>
  )
}
