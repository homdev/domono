'use client'

import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { motion } from "framer-motion";

export function VelocityScrollSection() {
  return (
    <section className="absolute bg-white dark:bg-slate-900 overflow-hidden ">
      <div className="container mx-auto px-4 -mt-32">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
        </motion.div>
      </div>
      
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 z-0">
        <div className="my-6"></div>
        
        <VelocityScroll defaultVelocity={4} className="m-0">
          Sécurité garantie <span className="text-teal-500">•</span> Technologie avancée <span className="text-teal-500">•</span> Support 24/7 <span className="text-teal-500">•</span> Garantie satisfaction •
        </VelocityScroll>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-slate-900"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-slate-900"></div>
      </div>
    </section>
  );
} 