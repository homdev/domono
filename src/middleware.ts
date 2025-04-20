import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Uniquement en production et en mode statique
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_OUTPUT === 'export') {
    // Si c'est une requête API
    if (request.nextUrl.pathname.startsWith('/api/')) {
      // Rediriger vers la fonction Netlify correspondante
      const netlifyFunctionPath = `/.netlify/functions${request.nextUrl.pathname.replace('/api', '')}`;
      return NextResponse.redirect(new URL(netlifyFunctionPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
}; 