import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Ce middleware intercepte les requêtes vers des routes API dynamiques
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si c'est une route API dynamique
  if (pathname.startsWith('/api/')) {
    // Routes spécifiques à rediriger vers les fonctions Netlify
    if (
      pathname.startsWith('/api/quotes/') && pathname !== '/api/quotes/' ||
      pathname.startsWith('/api/admin/users/') && pathname !== '/api/admin/users/' ||
      pathname.startsWith('/api/auth/[...nextauth]')
    ) {
      // En production, rediriger vers la fonction Netlify correspondante
      if (process.env.NODE_ENV === 'production') {
        // Extraire le chemin après /api/, par exemple /quotes/123 pour /api/quotes/123
        const path = pathname.substring(5); // Enlever '/api/'
        const url = new URL(`/.netlify/functions/api${path}`, request.url);
        
        // Préserver les paramètres de requête
        request.nextUrl.searchParams.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
        
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

// Configuration du middleware pour s'exécuter uniquement sur certains chemins
export const config = {
  matcher: [
    // Intercepter toutes les requêtes aux routes API dynamiques
    '/api/quotes/:path*',
    '/api/admin/users/:path*',
    '/api/auth/:path*',
  ],
}; 