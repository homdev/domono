'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onChange: (step: number) => void
}

export function StepIndicator({ steps, currentStep, onChange }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Version desktop - visible sur md et plus grand */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Ligne de progression background */}
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded-full"></div>
          
          {/* Ligne de progression active */}
          <motion.div 
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {/* Étapes */}
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center"
              onClick={() => onChange(step.id)}
            >
              {/* Cercle de l'étape */}
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center z-10 
                  transition-all duration-300 cursor-pointer
                  ${step.id < currentStep 
                    ? 'bg-orange-500 text-white' 
                    : step.id === currentStep 
                      ? 'bg-orange-500 ring-4 ring-orange-100 text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id + 1}</span>
                )}
              </div>
              
              {/* Texte de l'étape */}
              <div className="absolute top-12 whitespace-nowrap">
                <p 
                  className={`
                    font-semibold text-sm
                    ${step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'}
                  `}
                >
                  {step.title}
                </p>
                <p 
                  className={`
                    text-xs mt-1
                    ${step.id <= currentStep ? 'text-gray-600' : 'text-gray-400'}
                  `}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Version mobile - visible uniquement sur petit écran */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold">
              Étape {currentStep + 1}/{steps.length}: {steps[currentStep].title}
            </h2>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="relative h-2 w-full bg-gray-200 rounded-full">
          <motion.div 
            className="absolute h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Indicateurs de progression en points */}
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`
                w-3 h-3 rounded-full 
                ${step.id <= currentStep ? 'bg-orange-500' : 'bg-gray-300'}
              `}
              onClick={() => {
                if (step.id <= currentStep) {
                  onChange(step.id)
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 
