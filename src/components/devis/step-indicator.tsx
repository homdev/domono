'use client'

import React from 'react'

interface Step {
  id: number
  name: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Version desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id <= currentStep
          const isCompleted = step.id < currentStep
          
          return (
            <React.Fragment key={step.id}>
              {/* Étape */}
              <div className="relative flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${isActive ? 'text-orange-500' : 'text-gray-500'}`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {/* Ligne de connexion entre étapes */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 mx-2 ${
                    step.id < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
      
      {/* Version mobile */}
      <div className="md:hidden text-center">
        <div className="text-sm text-gray-500">
          Étape {currentStep} sur {steps.length}
        </div>
        <div className="text-lg font-medium text-orange-500">
          {steps[currentStep - 1]?.name}
        </div>
        <div className="text-sm text-gray-600">
          {steps[currentStep - 1]?.description}
        </div>
      </div>
    </div>
  )
} 