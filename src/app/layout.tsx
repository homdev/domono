import React from 'react';
import type { Metadata, Viewport } from "next/types";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Changa_One } from 'next/font/google';

// Définition de la police Changa One
const changaOne = Changa_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-changa-one',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#ffffff'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.domono.fr'),
  title: {
    default: "Domono Marseille",
    template: "%s | Domono Marseille"
  },
  description: "Expert en domotique et maisons connectées à Marseille et ses environs",
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
    <html lang="fr" suppressHydrationWarning className={`${changaOne.variable} overflow-x-hidden`}>
      <head>
        <link rel="dns-prefetch" href="https://www.domono.fr" />
        <link rel="preconnect" href="https://www.domono.fr" />
        <link rel="preload" href="/assets/img/optimized/idfnuisibles.webp" as="image" media="(max-width: 768px)" />
        <link rel="preload" href="/assets/img/optimized/idfnuisibles.webp" as="image" media="(min-width: 769px)" />
        <link rel="preload" href="/assets/img/domono-bg-hero.svg" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/img/optimized/domono-bg-hero-1920.webp" as="image" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-[100vw] font-changa-one">
        <Navbar />
        <div className="relative w-full">
          {children}
        </div>
        <Footer />
        {/* Chatbot flottant */}
        <ChatbotProvider />
      </body>
    </html>
  );
}

// Composant pour charger le chatbot côté client
import dynamic from 'next/dynamic';

const ChatbotProvider = dynamic(() => 
  import('@/components/chatbot/ChatbotButton').then(mod => ({ 
    default: mod.default 
  })),
  { ssr: false }
);
