'use client'

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"

// Style CSS pour la bordure blanche autour du texte
const textOutlineStyle = "text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, -2px 0 0 #fff, 2px 0 0 #fff;"

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef(null)

  // Utilisation d'un useEffect simple pour marquer le montage
  useEffect(() => {
    setIsMounted(true)
    // Préchargement de l'image du character pour réduire le layout shift
    const preloadCharacter = new window.Image();
    preloadCharacter.src = '/assets/img/character.svg';
  }, [])

  // Effectuer des mesures de performance
  useEffect(() => {
    if (imageLoaded && window.performance && window.performance.mark) {
      window.performance.mark('hero-fully-loaded');
      // Mesurer le temps entre quand le JS s'initialise et quand l'image est chargée
      window.performance.measure('hero-load-time', 'navigationStart', 'hero-fully-loaded');
    }
  }, [imageLoaded]);
  
  // Détecter si le composant est dans le viewport
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Précharger l'image du character quand le héro est visible
          const img = new window.Image();
          img.src = '/assets/img/character.svg';
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isMounted) {
    // Affichage d'un placeholder pour éviter le CLS avec les dimensions exactes
    return (
      <section className="relative h-[calc(100vh-64px)] min-h-[600px] max-h-[900px] bg-gradient-to-br from-teal-700 to-teal-900 overflow-hidden pt-24 w-full">
        <div className="absolute inset-0 bg-teal-800" style={{ backgroundImage: 'linear-gradient(to bottom right, #0f766e, #134e4a)' }}>
          {/* Placeholder image à faible résolution immédiatement visible */}
          <div className="absolute inset-0 bg-cover bg-center transform -scale-x-100 opacity-30"
               style={{ backgroundImage: 'url("data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoGAAgABUB8JZwAAp3OVwAA/vz8fsf9f+8lnzN/YPzPmXGmvs/gPwB+AH4AfgHp4/XO/XTFM9WX9CQrAKgBdmNZsAAA")' }}></div>
        </div>
        <div className="container relative mx-auto px-4 max-w-full md:max-w-7xl h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
            <div className="space-y-6 min-h-[200px]">
              <div className="h-24 w-full bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-10 w-48 bg-teal-500/30 rounded-md"></div>
            </div>
            <div className="relative aspect-[4/3] w-full max-w-[600px] h-full mx-auto -ml-6 -mt-12 bg-white/5 animate-pulse">
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section ref={heroRef} className="relative h-[calc(100vh-64px)] min-h-[600px] max-h-[900px] bg-gradient-to-br from-orange-100 via-white to-teal-50 overflow-hidden pt-24 w-full">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 z-0 transform -scale-x-100">
            {/* Image héro avec dimensions fixes pour éviter le CLS */}
            <div 
              className="relative h-full w-full"
              style={{ 
                position: 'relative',
                aspectRatio: '16/9',
                minHeight: '100%',
                contain: 'layout paint'
              }}
            >
              <picture style={{ position: 'relative', display: 'block', height: '100%', width: '100%' }}>
                {/* Version mobile */}
                <source 
                  media="(max-width: 480px)" 
                  srcSet="/assets/img/optimized/domono-bg-hero-480.webp"
                  type="image/webp" 
                />
                {/* Version tablette */}
                <source 
                  media="(max-width: 768px)" 
                  srcSet="/assets/img/optimized/domono-bg-hero-768.webp"
                  type="image/webp" 
                />
                {/* Version desktop moyenne */}
                <source 
                  media="(max-width: 1280px)" 
                  srcSet="/assets/img/optimized/domono-bg-hero-1280.webp"
                  type="image/webp"
                />
                {/* Version desktop grande - compression améliorée */}
                <source 
                  media="(min-width: 1281px)" 
                  srcSet="/assets/img/optimized/domono-bg-hero-1280.webp"
                  type="image/webp"
                />
                {/* Fallback image */}
                <Image 
                  src="/assets/img/optimized/domono-bg-hero-1280.webp" 
                  alt="Fond de maison intelligente"
                  fill 
                  className="object-cover brightness-[0.85]"
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoGAAgABUB8JZwAAp3OVwAA/vz8fsf9f+8lnzN/YPzPmXGmvs/gPwB+AH4AfgHp4/XO/XTFM9WX9CQrAKgBdmNZsAAA"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    backgroundColor: '#20a2b2'
                  }}
                  onLoad={() => {
                    // Marquer l'image comme chargée pour l'optimisation LCP
                    setImageLoaded(true);
                    if (window.performance && window.performance.mark) {
                      window.performance.mark('hero-image-loaded');
                    }
                  }}
                />
              </picture>
            </div>
          </div>
          {/* Éléments décoratifs avec layout containment pour éviter le CLS */}
          <div 
            className="absolute top-20 right-0 w-72 md:w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl"
            style={{ contain: 'layout paint' }} 
          />
          <div 
            className="absolute bottom-20 left-0 w-72 md:w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" 
            style={{ contain: 'layout paint' }}
          />
        </div>

        <div className="container relative mx-auto px-4 max-w-full md:max-w-7xl h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
            <div className="space-y-6 min-h-[200px]">
              <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
                <span className="[text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff,_0_-2px_0_#fff,_0_2px_0_#fff,_-2px_0_0_#fff,_2px_0_0_#fff]">Transformez votre maison</span>
                <br />
                <span className="text-teal-600 [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff,_0_-2px_0_#fff,_0_2px_0_#fff,_-2px_0_0_#fff,_2px_0_0_#fff]">en habitat intelligent</span><span className="text-teal-600 [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff,_0_-2px_0_#fff,_0_2px_0_#fff,_-2px_0_0_#fff,_2px_0_0_#fff]"> avec</span>
                <br />
                <span className="text-orange-500 [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff,_0_-2px_0_#fff,_0_2px_0_#fff,_-2px_0_0_#fff,_2px_0_0_#fff]">nos solutions domotiques</span>
              </h1>
              <a 
                href="https://domono.fr/devis/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal-500 text-primary-foreground hover:bg-teal-600 h-11 px-8"
                aria-label="Ouvrir la page de devis externe"
              >
                Demander un devis gratuit
              </a>
            </div>

            <div 
              className="relative aspect-[4/3] w-full max-w-[600px] h-full mx-auto -ml-6 -mt-12"
              style={{ contain: 'layout paint' }}
            >
              <Image 
                src="/assets/img/character.svg"
                alt="Technicien DomTech installant un système domotique"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain"
                loading={imageLoaded ? "eager" : "lazy"} // Charger après l'image principale
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRmMmY3Ii8+PC9zdmc+"
              />
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-[150px]"
          style={{ contain: 'layout paint' }}
        >
          <svg 
            viewBox="0 0 1440 150" 
            className="w-full h-full text-teal-600/10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
} 