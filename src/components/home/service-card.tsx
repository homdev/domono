import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  icon: string;
  href: string;
  description?: string;
  className?: string;
}

export function ServiceCard({ title, icon, href, description, className }: ServiceCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Hauteur fixe pour éviter les layout shifts
  return (
    <Link href={href as any} className={cn(
      "group flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 h-full",
      "border border-gray-100 hover:border-orange-500 bg-white shadow-sm hover:shadow-md",
      className
    )}>
      <div className="relative w-16 h-16 mb-4 aspect-square" data-img-container="icon">
        {/* Fond de placeholder pour éviter le layout shift */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-orange-100 flex items-center justify-center",
          !imageLoaded && "animate-pulse"
        )}>
          {!imageLoaded && (
            <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
          )}
        </div>
        
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className={cn(
            "object-contain transition-opacity",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 text-sm mt-2">{description}</p>
      )}
    </Link>
  );
} 