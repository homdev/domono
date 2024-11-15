'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-100 via-white to-teal-50">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-red-600">Erreur</h1>
            <h2 className="text-2xl font-semibold">Une erreur est survenue</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Nous nous excusons pour la gêne occasionnée.
            </p>
            <div className="pt-6">
              <button
                onClick={() => reset()}
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
