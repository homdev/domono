'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function EmergencyForm() {
  return (
    <section className="relative -mt-32 z-10">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Vous avez <span className="text-orange-400">une urgence ?</span>
            </h2>
            <form className="grid md:grid-cols-3 gap-4">
              <Input 
                type="text" 
                placeholder="Nom & Prénom" 
                className="bg-white" 
                required 
                aria-label="Votre nom et prénom"
              />
              <Input 
                type="tel" 
                placeholder="Téléphone" 
                className="bg-white" 
                required 
                aria-label="Votre numéro de téléphone"
              />
              <Input 
                type="email" 
                placeholder="Email" 
                className="bg-white" 
                required 
                aria-label="Votre adresse email"
              />
              <Button className="md:col-span-3 bg-teal-500 hover:bg-teal-600">
                Envoyer
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  )
}
