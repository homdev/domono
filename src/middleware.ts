import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Vérifier si c'est une requête pour une ressource statique
  if (
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.includes('/images/') ||
    request.nextUrl.pathname.includes('.webp') ||
    request.nextUrl.pathname.includes('.svg')
  ) {
    const response = NextResponse.next()
    // Cache long terme pour les ressources statiques
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  const response = NextResponse.next()

  // En-têtes de sécurité et performance
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}

// Configuration du middleware
export const config = {
  matcher: [
    // Appliquer à toutes les routes sauf certains chemins
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 