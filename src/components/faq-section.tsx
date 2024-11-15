'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Quels types de nuisibles traitez-vous ?",
    answer: "Nous traitons une large gamme de nuisibles, incluant les punaises de lit, les rats, les souris, les cafards, les fourmis, et bien d'autres. Notre équipe est formée pour gérer efficacement chaque type de nuisible."
  },
  {
    question: "Combien de temps dure une intervention typique ?",
    answer: "La durée d'une intervention varie selon le type et l'étendue de l'infestation. Une intervention simple peut prendre quelques heures, tandis qu'un traitement complet peut nécessiter plusieurs visites sur plusieurs jours ou semaines."
  },
  {
    question: "Vos produits sont-ils sûrs pour les enfants et les animaux domestiques ?",
    answer: "Oui, nous utilisons des produits de qualité professionnelle qui sont sûrs lorsqu'ils sont utilisés correctement. Nous vous fournirons des instructions détaillées sur les précautions à prendre pendant et après le traitement pour assurer la sécurité de tous."
  },
  {
    question: "Offrez-vous une garantie sur vos services ?",
    answer: "Oui, nous offrons une garantie sur nos services. La durée et les conditions varient selon le type de traitement. Nous discuterons des détails spécifiques de la garantie lors de notre évaluation initiale."
  },
  {
    question: "Comment puis-je prévenir une future infestation ?",
    answer: "Après notre intervention, nous vous fournirons des conseils détaillés sur la prévention. Cela peut inclure des mesures d'hygiène, des modifications de l'habitat, et des inspections régulières. Nous proposons également des services de maintenance préventive pour une protection continue."
  }
]

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-teal-50/30' : 'bg-orange-50/30'}`}>
      <button
        className="flex justify-between items-center w-full py-6 px-8 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 pr-8">{question}</span>
        <ChevronDown
          className={`w-6 h-6 text-teal-500 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-8 pb-6 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50" suppressHydrationWarning>
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          Questions <span className="text-orange-400">Fréquentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions sur nos services de dératisation et désinsectisation.
        </p>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}