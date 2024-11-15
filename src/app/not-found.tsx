/* eslint-disable react/no-unescaped-entities */
'use client'



export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-100 via-white to-teal-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-teal-600">404</h1>
        <h2 className="text-2xl font-semibold">Page non trouvée</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="pt-6">
          {/* <a 
            href="/"
            className="inline-block px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
          >
            Retour à l'accueil
          </a> */}
        </div>
      </div>
    </div>
  )
}
