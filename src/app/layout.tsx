import React from 'react';
import type { Metadata, Viewport } from "next/types";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#ffffff'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.idfnuisibles.fr'),
  title: {
    default: "IDF Nuisibles",
    template: "%s | IDF Nuisibles"
  },
  description: "Expert en dératisation et désinsectisation en Île-de-France",
  icons: {
    icon: '/favicon.ico',
  },
  formatDetection: {
    telephone: true,
    email: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="dns-prefetch" href="https://www.idfnuisibles.fr" />
        <link rel="preconnect" href="https://www.idfnuisibles.fr" />
        <link rel="preload" href="/assets/img/optimized/idfnuisibles.webp" as="image" media="(max-width: 768px)" />
        <link rel="preload" href="/assets/img/optimized/idfnuisibles.webp" as="image" media="(min-width: 769px)" />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <div className="relative w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
