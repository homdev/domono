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
  'name': 'Demande de devis Domono Marseille',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'Domono Marseille',
    'description': 'Expert en domotique et maisons connectées à Marseille et ses environs',
    'areaServed': 'Marseille et ses environs',
    'priceRange': '€€',
  },
  'serviceType': 'Domotique',
  'termsOfService': 'https://domono.fr/conditions-generales',
  'availableChannel': {
    '@type': 'ServiceChannel',
    'serviceUrl': 'https://domono.fr',
    'servicePhone': '07 67 03 68 48',
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
          <div className="absolute -z-10 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4 w-64 h-64 opacity-90">
            <Image
              src="/assets/img/character.svg"
              alt="Domono Marseille Mascotte"
              width={256}
              height={256}
              className="object-contain"
              priority
            />
          </div>

          <DialogHeader>
            <DialogTitle id="quote-form-title" className=" text-2xl font-bold mt-16 text-white">
              {/* Vous avez <span className="text-orange-400">une urgence ?</span> */}
            </DialogTitle>
          </DialogHeader>
          <QuoteRequestFormComponent />
        </DialogContent>
      </Dialog>
    </>
  )
}
