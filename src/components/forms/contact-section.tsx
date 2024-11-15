'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function ContactSection() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Vous avez des questions ? <span className="text-orange-400">Contactez-nous</span>
        </h2>
        <form className="grid md:grid-cols-3 gap-4">
          <Input type="text" placeholder="Nom & Prénom" className="bg-white" required />
          <Input type="tel" placeholder="Téléphone" className="bg-white" required />
          <Input type="email" placeholder="Email" className="bg-white" required />
          <Input type="text" placeholder="Votre message" className="md:col-span-3 bg-white" required />
          <Button className="md:col-span-3 bg-teal-500 hover:bg-teal-600">
            Envoyer
          </Button>
        </form>
      </div>
    </Card>
  )
}
