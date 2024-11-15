'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-red-600">Erreur</h1>
        <h2 className="text-2xl font-semibold">Une erreur est survenue</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Nous nous excusons pour la gêne occasionnée.
        </p>
        <div className="pt-6 space-x-4">
          <Button 
            onClick={reset}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Réessayer
          </Button>
        </div>
      </div>
    </div>
  )
}