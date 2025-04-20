import React from 'react'
import Link from 'next/link'
import { AppRoutes } from '@/types/routes'

interface CallToActionProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref
}: CallToActionProps) {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link href={buttonHref as AppRoutes} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium inline-flex items-center justify-center transition-all">
              {buttonText}
            </Link>
            {secondaryButtonText && secondaryButtonHref && (
              <Link href={secondaryButtonHref as AppRoutes} 
                className="border border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium inline-flex items-center justify-center transition-all">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 