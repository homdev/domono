'use client'

import { useState } from 'react'

const departments = [
  { 
    id: '75',
    name: 'Paris',
    population: '2.148 million',
    path: `M250,220 L270,210 L290,220 L285,240 L265,250 L245,240 Z`
  },
  { 
    id: '92',
    name: 'Hauts-de-Seine',
    population: '1.624 million',
    path: `M230,210 L250,220 L245,240 L225,245 L215,230 Z`
  },
  { 
    id: '93',
    name: 'Seine-Saint-Denis',
    population: '1.646 million',
    path: `M270,210 L290,200 L310,210 L305,230 L285,240 L290,220 Z`
  },
  { 
    id: '94',
    name: 'Val-de-Marne',
    population: '1.396 million',
    path: `M265,250 L285,240 L305,250 L300,270 L280,280 L260,270 Z`
  },
  { 
    id: '95',
    name: "Val d'Oise",
    population: '1.248 million',
    path: `M230,170 L270,160 L290,180 L270,210 L250,220 L230,210 Z`
  },
  { 
    id: '78',
    name: 'Yvelines',
    population: '1.438 million',
    path: `M180,200 L230,170 L230,210 L215,230 L195,240 L175,220 Z`
  },
  { 
    id: '91',
    name: 'Essonne',
    population: '1.296 million',
    path: `M225,245 L245,240 L265,250 L260,270 L240,290 L220,280 L210,260 Z`
  },
  { 
    id: '77',
    name: 'Seine-et-Marne',
    population: '1.421 million',
    path: `M290,180 L330,190 L350,220 L340,260 L300,270 L280,280 L260,270 L265,250 L285,240 L305,230 L310,210 L290,200 Z`
  }
]

export function MapIDF() {
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null)

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <svg
        viewBox="150 150 250 150"
        className="w-full h-full"
        role="img"
        aria-label="Carte de l'Île-de-France"
      >
        <defs>
          <linearGradient id="hover-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {departments.map((dept) => (
          <g key={dept.id}>
            <path
              d={dept.path}
              className={`
                transition-all duration-300 cursor-pointer
                ${activeDepartment === dept.id 
                  ? 'fill-orange-100 stroke-orange-500' 
                  : 'fill-teal-100/20 stroke-teal-600/40 hover:fill-teal-100/40'}
              `}
              strokeWidth="2"
              onMouseEnter={() => setActiveDepartment(dept.id)}
              onMouseLeave={() => setActiveDepartment(null)}
            />
            <text
              x={dept.id === '75' ? '265' : dept.id === '92' ? '230' : '290'}
              y={dept.id === '75' ? '230' : dept.id === '92' ? '225' : '220'}
              className={`
                text-xs font-medium pointer-events-none
                ${activeDepartment === dept.id ? 'fill-orange-600' : 'fill-teal-600'}
              `}
            >
              {dept.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Info Box */}
      {activeDepartment && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">
            {departments.find(d => d.id === activeDepartment)?.name}
          </h3>
          <p className="text-gray-600">
            Population: {departments.find(d => d.id === activeDepartment)?.population}
          </p>
        </div>
      )}
    </div>
  )
}
