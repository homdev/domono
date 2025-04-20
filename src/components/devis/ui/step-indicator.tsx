'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Step } from '../types'

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
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {/* Étapes */}
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center"
              onClick={() => {
                // Ne permet de naviguer qu'aux étapes déjà visitées ou l'étape suivante
                if (step.id <= currentStep) {
                  onChange(step.id);
                }
              }}
            >
              {/* Cercle de l'étape */}
              <motion.div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center z-10 
                  transition-colors duration-300 cursor-pointer
                  ${step.id < currentStep 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : step.id === currentStep 
                      ? 'bg-orange-500 ring-4 ring-orange-100 text-white shadow-md' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }
                `}
                whileHover={step.id <= currentStep ? { scale: 1.05 } : {}}
                whileTap={step.id <= currentStep ? { scale: 0.95 } : {}}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
              
              {/* Texte de l'étape */}
              <div className="absolute top-12 whitespace-nowrap text-center pb-4">
                <p 
                  className={`
                    font-semibold text-sm
                    ${step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'}
                  `}
                >
                  {step.title || step.name}
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
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {steps[currentStep - 1]?.title || steps[currentStep - 1]?.name}
            </h2>
            <p className="text-sm text-gray-600">{steps[currentStep - 1]?.description}</p>
          </motion.div>
        </div>
        
        {/* Barre de progression avec étapes */}
        <div className="relative">
          {/* Barre de progression background */}
          <div className="h-2 w-full bg-gray-200 rounded-full mb-3"></div>
          
          {/* Barre de progression active */}
          <motion.div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {/* Points/cercles pour chaque étape */}
          <div className="flex justify-between absolute -top-1.5 left-0 w-full px-0">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center cursor-pointer
                  ${step.id < currentStep ? 'bg-orange-500 text-xs text-white' : 
                    step.id === currentStep ? 'bg-orange-500 ring-2 ring-orange-100 text-xs text-white' : 
                    'bg-white border-2 border-gray-300 text-xs text-gray-400'}
                `}
                whileHover={step.id <= currentStep ? { scale: 1.2 } : {}}
                whileTap={step.id <= currentStep ? { scale: 0.9 } : {}}
                onClick={() => {
                  if (step.id <= currentStep) {
                    onChange(step.id);
                  }
                }}
              >
                {step.id < currentStep ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="text-[10px]">{step.id}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigation mobile */}
        <div className="flex justify-between mt-6 text-xs text-gray-500">
          <div>Étape {currentStep}/{steps.length}</div>
          <div className="flex space-x-4">
            {currentStep > 1 && (
              <button 
                onClick={() => onChange(currentStep - 1)}
                className="text-orange-500 font-medium"
              >
                Précédent
              </button>
            )}
            {currentStep < steps.length && (
              <button
                onClick={() => {
                  // On ne permet d'avancer que si l'utilisateur a déjà visité cette étape
                  if (currentStep + 1 <= steps.length) {
                    onChange(currentStep + 1);
                  }
                }}
                className="text-orange-500 font-medium"
                disabled={currentStep + 1 > steps.length}
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
