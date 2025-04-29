'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Quels types de services domotiques proposez-vous ?",
    answer: "Nous proposons une gamme complète de services domotiques incluant : le contrôle d'éclairage intelligent, la gestion de température (chauffage et climatisation), l'automatisation des volets et stores, les systèmes de sécurité connectés, la vidéosurveillance, les assistants vocaux et la centralisation de tous vos appareils. Nos solutions sont personnalisées selon vos besoins et le type de votre logement."
  },
  {
    question: "Comment fonctionne votre service de devis gratuit ?",
    answer: "Notre service de devis gratuit est simple et rapide. Vous pouvez le demander directement en ligne via notre formulaire dédié. Après avoir renseigné vos besoins et coordonnées, un technicien vous contactera sous 24 à 48h pour discuter de votre projet. Si nécessaire, nous organisons une visite technique gratuite pour évaluer précisément vos besoins avant de vous proposer une solution adaptée et chiffrée."
  },
  {
    question: "Dans quelles zones intervenez-vous à Marseille et ses alentours ?",
    answer: "Nous intervenons dans l'ensemble des arrondissements de Marseille ainsi que dans toute la région PACA. Notre équipe se déplace rapidement à Aix-en-Provence, Aubagne, Cassis, Martigues et dans les départements des Bouches-du-Rhône (13), du Var (83), du Vaucluse (84), des Alpes-de-Haute-Provence (04) et des Alpes-Maritimes (06). Quel que soit votre lieu de résidence dans la région, nous vous garantissons un service rapide et professionnel."
  },
  {
    question: "Combien coûte l'installation d'un système domotique ?",
    answer: "Le coût d'un système domotique varie en fonction de plusieurs facteurs : la superficie de votre logement, les fonctionnalités souhaitées, la complexité de l'installation et s'il s'agit d'une construction neuve ou d'une rénovation. Nos solutions débutent à partir de 1500€ pour des installations basiques. Chaque projet étant unique, nous vous proposons un devis personnalisé et gratuit pour vous donner un prix exact correspondant précisément à vos besoins."
  },
  {
    question: "Est-il possible d'installer un système domotique dans un logement ancien ?",
    answer: "Absolument ! Nous proposons des solutions adaptées aussi bien aux logements neufs qu'anciens. Pour les habitations existantes, nous privilégions des technologies sans fil qui minimisent les travaux tout en offrant d'excellentes performances. Des solutions comme les interrupteurs intelligents, les prises connectées et les capteurs sans fil permettent de transformer facilement votre logement ancien en maison intelligente, sans nécessiter de lourds travaux de rénovation."
  },
  {
    question: "Proposez-vous un service après-vente et de maintenance ?",
    answer: "Oui, nous offrons un service après-vente complet et un support technique réactif. Après l'installation, nous restons disponibles pour répondre à vos questions et vous aider à optimiser votre système. Nous proposons également des contrats de maintenance préventive qui incluent des vérifications régulières, des mises à jour et des interventions prioritaires en cas de problème, pour assurer la longévité et les performances optimales de votre installation domotique."
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
      <div className="container mx-auto px-4 md:px-8 pb-12">
        <h2 className="text-4xl font-bold text-center mb-4">
          Questions <span className="text-teal-600">Fréquentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions sur nos services de domotique et d'automatisation de la maison intelligente.
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