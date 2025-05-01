'use client'

import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { AppRoutes } from '@/types/routes'
import { motion } from "framer-motion"

export default function EmergencyForm() {
  const serviceCards = [
    {
      title: "Domotique",
      image: "/assets/img/optimized/domono-connect.webp",
      link: '/devis' as AppRoutes
    },
    {
      title: "Alarme & Vidéo",
      image: "/assets/img/optimized/domono-alarme.webp",
      link: '/devis' as AppRoutes
    },
    {
      title: "Vidéo Surveillance",
      image: "/assets/img/optimized/domono-video.webp",
      link: '/devis' as AppRoutes
    },
    {
      title: "Contrôle d'accès",
      image: "/assets/img/optimized/domono-access.webp",
      link: '/devis' as AppRoutes
    }
  ]

  return (
    <section className="relative -mt-32 z-10">
      <div className="container mx-auto px-4">
        
        <Card className="w-full max-w-5xl mx-auto backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/80 z-0"></div>
          
          <div className="relative z-10 p-2 sm:p-2">
            
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2">
              {serviceCards.map((card, index) => (
                <Link href={card.link} key={index} className="block group">
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="rounded-xl p-1 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                      <div className="relative aspect-square w-full mx-auto rounded-lg overflow-hidden bg-white">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-teal-600 transition-colors">
                        {card.title}
                      </h3>
                      <span className="block mt-1 text-xs text-teal-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Demander un devis
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
