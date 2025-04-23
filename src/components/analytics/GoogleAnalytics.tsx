'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Remplacer par votre ID de mesure Google Analytics
const GA_MEASUREMENT_ID = 'G-QKBVN8WM62'; // À remplacer par votre ID réel

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string | string[],
      params?: Record<string, any>
    ) => void;
  }
}

// Fonction pour envoyer un pageview à Google Analytics
const pageview = (path: string, title?: string) => {
  if (typeof window.gtag !== 'function') return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-QKBVN8WM62') return;
    
    // Envoyer un pageview lorsque le chemin ou les paramètres de recherche changent
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);
  
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-QKBVN8WM62') {
    return null;
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              transport_type: 'beacon',
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  );
} 