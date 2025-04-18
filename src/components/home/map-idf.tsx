'use client'

import { useState } from 'react'

const areas = [
  { 
    id: '13001',
    name: 'Marseille 1er',
    population: '39 744 hab.',
    path: `M250,220 L270,210 L290,220 L285,240 L265,250 L245,240 Z`
  },
  { 
    id: '13002',
    name: 'Marseille 2e',
    population: '25 484 hab.',
    path: `M230,210 L250,220 L245,240 L225,245 L215,230 Z`
  },
  { 
    id: '13003',
    name: 'Marseille 3e',
    population: '52 965 hab.',
    path: `M270,210 L290,200 L310,210 L305,230 L285,240 L290,220 Z`
  },
  { 
    id: '13004',
    name: 'Marseille 4e',
    population: '52 271 hab.',
    path: `M265,250 L285,240 L305,250 L300,270 L280,280 L260,270 Z`
  },
  { 
    id: '13005',
    name: 'Marseille 5e',
    population: '47 335 hab.',
    path: `M230,170 L270,160 L290,180 L270,210 L250,220 L230,210 Z`
  },
  { 
    id: '13006',
    name: 'Marseille 6e',
    population: '42 717 hab.',
    path: `M180,200 L230,170 L230,210 L215,230 L195,240 L175,220 Z`
  },
  { 
    id: '13007',
    name: 'Marseille 7e',
    population: '35 845 hab.',
    path: `M225,245 L245,240 L265,250 L260,270 L240,290 L220,280 L210,260 Z`
  },
  { 
    id: '13008',
    name: 'Marseille 8e',
    population: '80 715 hab.',
    path: `M290,180 L330,190 L350,220 L340,260 L300,270 L280,280 L260,270 L265,250 L285,240 L305,230 L310,210 L290,200 Z`
  },
  { 
    id: 'aix',
    name: 'Aix-en-Provence',
    population: '143 006 hab.',
    path: `M320,140 L350,150 L370,130 L390,150 L380,180 L350,190 L320,170 Z`
  },
  { 
    id: 'aubagne',
    name: 'Aubagne',
    population: '46 630 hab.',
    path: `M340,260 L370,250 L390,270 L380,300 L350,310 L330,290 Z`
  },
  {
    id: 'cassis',
    name: 'Cassis',
    population: '7 472 hab.',
    path: `M300,310 L320,300 L340,310 L330,330 L310,340 L290,325 Z`
  },
  {
    id: 'martigues',
    name: 'Martigues',
    population: '49 598 hab.',
    path: `M130,180 L160,170 L180,190 L170,220 L140,230 L120,210 Z`
  }
]

export function MapIDF() {
  const [activeArea, setActiveArea] = useState<string | null>(null)

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <svg
        viewBox="100 100 300 250"
        className="w-full h-full"
        role="img"
        aria-label="Carte de Marseille et ses environs"
      >
        <defs>
          <linearGradient id="hover-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Fond bleu pour représenter la mer Méditerranée */}
        <rect x="100" y="220" width="300" height="130" fill="#bfdbfe" />

        {areas.map((area) => (
          <g key={area.id}>
            <path
              d={area.path}
              className={`
                transition-all duration-300 cursor-pointer
                ${activeArea === area.id 
                  ? 'fill-orange-100 stroke-orange-500' 
                  : 'fill-teal-100/20 stroke-teal-600/40 hover:fill-teal-100/40'}
              `}
              strokeWidth="2"
              onMouseEnter={() => setActiveArea(area.id)}
              onMouseLeave={() => setActiveArea(null)}
            />
            <text
              x={area.id === '13001' ? '267' : area.id === '13002' ? '232' : '290'}
              y={area.id === '13001' ? '230' : area.id === '13002' ? '225' : '220'}
              className={`
                text-xs font-medium pointer-events-none
                ${activeArea === area.id ? 'fill-orange-600' : 'fill-teal-600'}
              `}
            >
              {area.id.length > 3 ? area.id.substring(3) : area.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Info Box */}
      {activeArea && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">
            {areas.find(d => d.id === activeArea)?.name}
          </h3>
          <p className="text-gray-600">
            Population: {areas.find(d => d.id === activeArea)?.population}
          </p>
        </div>
      )}
    </div>
  )
}
