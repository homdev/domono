/* eslint-disable react/no-unescaped-entities */

'use client'

import { FaqSection } from '@/components/faq-section'
import dynamic from 'next/dynamic'
import EmergencyForm from "@/components/forms/emergency-form"
import LoadingSkeletonCoverage from '@/components/loading/coverage-skeleton'
import { HeroSection } from './hero-section'
import { SolutionsSection } from "./solutions-section"
import { WhyChooseUsSection } from "./why-choose-us-section"

// Import dynamique du composant coverage
const CoverageSectionComponent = dynamic(
  () => import('@/components/home/coverage-section'),
  {
    loading: () => <LoadingSkeletonCoverage />,
    ssr: false,
  }
)

// Import dynamique du composant testimonials
const TestimonialsSectionComponent = dynamic(
  () => import('@/components/home/testimonials-section'),
  {
    loading: () => (
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-lg"/>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
)

const HomePage = () => {
  return (
    <>
      <main suppressHydrationWarning className="overflow-x-hidden w-full">
        <HeroSection />
        <EmergencyForm />
        <SolutionsSection />
        <WhyChooseUsSection />
        <CoverageSectionComponent />
        <TestimonialsSectionComponent />
        <FaqSection />
      </main>
    </>
  )
}
export { HomePage }
