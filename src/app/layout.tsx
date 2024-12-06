import React from 'react';
import type { Metadata, Viewport } from "next/types";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.idfnuisibles.fr" />
        <link rel="preconnect" href="https://www.idfnuisibles.fr" />
        <link
          rel="preload"
          href="/assets/img/idfnuisibles.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="./fonts/GeistVF.woff"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
