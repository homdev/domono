'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { reportWebVitals } from '@/lib/web-vitals';

export default function WebVitalsScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialiser le suivi des Web Vitals uniquement côté client
    if (pathname) {
      reportWebVitals(pathname);
    }
  }, [pathname]);

  // Ce composant ne rend rien visuellement
  return null;
} 