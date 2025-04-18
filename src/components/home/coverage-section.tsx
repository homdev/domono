/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin } from 'lucide-react'

// Schema.org markup pour SEO
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Domono",
    "areaServed": {
      "@type": "City",
      "name": "Marseille",
      "containsPlace": [
        {
          "@type": "City",
          "name": "Marseille 1er"
        },
        {
          "@type": "City",
          "name": "Marseille 2ème"
        },
        {
          "@type": "City",
          "name": "Marseille 8ème"
        },
        {
          "@type": "City",
          "name": "Marseille 9ème"
        },
        {
          "@type": "City",
          "name": "Marseille 13ème"
        },
        {
          "@type": "City",
          "name": "Aix-en-Provence"
        },
        {
          "@type": "City",
          "name": "Aubagne"
        },
        {
          "@type": "City",
          "name": "Cassis"
        }
      ]
    }
  }

// Liste des départements de la région PACA et environs
const departements = [
  { id: '13', name: 'Bouches-du-Rhône', population: 'Marseille & environs' },
  { id: '83', name: 'Var', population: 'Toulon & environs' },
  { id: '84', name: 'Vaucluse', population: 'Avignon & environs' },
  { id: '04', name: 'Alpes-de-Haute-Provence', population: 'Digne-les-Bains' },
  { id: '05', name: 'Hautes-Alpes', population: 'Gap & environs' },
  { id: '06', name: 'Alpes-Maritimes', population: 'Nice & Cannes' },
  { id: '30', name: 'Gard', population: 'Nîmes & environs' },
  { id: '34', name: 'Hérault', population: 'Montpellier' }
]

export default function CoverageSection() {
  const [activeZone, setActiveZone] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                Nous intervenons partout à{' '}
                <span className="text-teal-600"> Marseille & Alentours</span>
              </h2>
              <p className="text-gray-600 max-w-lg">
                Notre équipe d'experts intervient rapidement dans tous les départements 
                de la région PACA pour vous offrir des solutions domotiques sur mesure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {departements.map((zone) => (
                <Card
                  key={zone.id}
                  className={`group relative overflow-hidden transition-all duration-300 ${
                    activeZone === zone.id
                      ? 'bg-orange-100 border-orange-200'
                      : 'hover:bg-orange-50'
                  }`}
                  onMouseEnter={() => setActiveZone(zone.id)}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-4 h-auto"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                      <div className="text-left">
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-sm text-gray-500">{zone.population}</div>
                      </div>
                    </div>
                  </Button>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 to-orange-100/20 rounded-3xl" />
            <div className="h-full w-full relative overflow-hidden">
              <svg
                viewBox="345 510 355 220"
                className="w-full h-full"
                role="img"
                aria-label="Carte de Marseille et ses environs"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Mer Méditerranée */}
                <path
                  d="M300,635 L330,635 L345,630 L355,628 L370,625 L385,622 L405,620 L425,615 L450,614 L470,610 L483.004,605.6193 L500.561,605.9881 L504.042,609.598 L503.4445,613.0716 L515.2352,614.0081 L519.4798,609.5735 L527.5949,603.8377 L529.1673,597.9128 L533.6369,599.3982 L536.9691,608.2608 L526.8016,610.1133 L529.0717,614.3115 L540.6687,614.8499 L545.5135,612.0662 L548.88,615.8939 L549.368,624.1813 L554.5738,623.7063 L563.3292,627.4726 L567.025,625.8355 L567.6114,621.3137 L571.6409,617.3901 L567.0594,608.405 L567.791,601.4853 L570.8953,605.4679 L567.1439,614.6379 L571.6409,617.3901 L567.6114,621.3137 L567.025,625.8355 L575.1877,630.7438 L578.1387,635.9042 L582.4352,630.1168 L589.3034,632.9886 L593.6834,632.9138 L597.9332,629.7232 L614.797,626.203 L618.6433,623.0337 L622.2009,624.8201 L624.3658,618.6349 L619.9173,615.5506 L626.7306,610.2948 L627.8671,605.1881 L635.0115,604.2852 L639.0115,598.9438 L639.7648,594.7048 L648.5138,591.3253 L651.1054,584.631 L672.0295,573.0379 L669.7859,566.2279 L673.39,563.608 L680.7382,551.9412 L681.0428,548.3487 L700,548 L700,730 L300,730 Z"
                  fill="#e0f2fe"
                  fillOpacity="1"
                  stroke="#7dd3fc"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                
                {/* Département des Bouches-du-Rhône (13) */}
                <path
                  d="M483.004 605.6193 483.5063 602.5406 493.0158 597.5924 497.3987 586.4829 504.1443 587.3679 506.8093 579.6438 506.2027 575.8651 511.5999 568.3076 518.1418 569.1757 525.2435 572.5347 529.6692 578.6138 537.7091 582.654 545.1132 582.3588 552.2872 586.5061 562.0086 587.9738 570.2491 582.4646 572.9769 587.4384 566.3919 591.6309 569.0454 596.4308 567.791 601.4853 570.8953 605.4679 567.0594 608.405 567.1439 614.6379 571.6409 617.3901 567.6114 621.3137 567.025 625.8355 563.3292 627.4726 554.5738 623.7063 549.368 624.1813 548.88 615.8939 545.5135 612.0662 540.6687 614.8499 529.0717 614.3115 526.8016 610.1133 536.9691 608.2608 533.6369 599.3982 529.1673 597.9128 527.5949 603.8377 519.4798 609.5735 515.2352 614.0081 503.4445 613.0716 504.042 609.598 500.561 605.9881 483.004 605.6193 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '13' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('13')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département du Var (83) */}
                <path
                  d="M570.2491 582.4646 570.4578 582.078 580.9992 581.8683 586.5172 584.3069 592.5038 580.5826 596.4888 575.5578 606.4106 580.2764 608.5244 575.7853 614.2846 574.2259 620.7422 575.3176 622.2982 578.501 627.6538 578.898 628.3665 584.7032 630.9556 587.7038 637.0715 589.6079 635.6384 594.9491 639.0115 598.9438 635.0115 604.2852 627.8671 605.1881 626.7306 610.2948 619.9173 615.5506 624.3658 618.6349 622.2009 624.8201 618.6433 623.0337 614.797 626.203 597.9332 629.7232 593.6834 632.9138 589.3034 632.9886 582.4352 630.1168 578.1387 635.9042 575.1877 630.7438 567.025 625.8355 567.6114 621.3137 571.6409 617.3901 567.1439 614.6379 567.0594 608.405 570.8953 605.4679 567.791 601.4853 569.0454 596.4308 566.3919 591.6309 572.9769 587.4384 570.2491 582.4646 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '83' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('83')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département du Vaucluse (84) */}
                <path
                  d="M519.7542 535.2865 520.9202 529.7435 524.902 528.4142 527.2173 533.1364 524.6455 538.3913 519.7542 535.2865 Z M 554.6342 551.9309 557.4145 558.9906 555.525 564.4861 559.8656 567.7295 559.7043 574.4392 564.2914 574.6915 570.4578 582.078 570.2491 582.4646 562.0086 587.9738 552.2872 586.5061 545.1132 582.3588 537.7091 582.654 529.6692 578.6138 525.2435 572.5347 518.1418 569.1757 511.5999 568.3076 517.426 561.4742 509.486 554.1421 510.1815 547.4676 505.8798 540.9766 505.8472 536.2621 512.2444 536.4633 515.329 543.7942 529.2107 537.4257 534.2647 539.5276 536.2848 544.3135 540.5294 543.3012 547.9106 545.3926 547.8808 548.6217 554.6342 551.9309 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '84' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('84')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département des Alpes-de-Haute-Provence (04) */}
                <path
                  d="M564.5316 545.6219 571.255 543.6284 579.7068 529.0069 588.6794 522.169 595.2682 529.3087 600.5689 522.6627 602.2449 517.9109 610.4975 523.4138 618.1141 523.2178 620.6958 516.4102 625.223 511.73 635.22 505.8988 634.6643 512.4126 630.4429 515.8817 632.9773 524.6566 632.9187 529.3073 628.5505 532.0023 624.0514 538.5737 622.256 545.2305 626.4827 551.9744 626.1138 555.0187 632.2435 561.6514 628.7217 567.4308 624.2649 569.8319 620.7422 575.3176 614.2846 574.2259 608.5244 575.7853 606.4106 580.2764 596.4888 575.5578 592.5038 580.5826 586.5172 584.3069 580.9992 581.8683 570.4578 582.078 564.2914 574.6915 559.7043 574.4392 559.8656 567.7295 555.525 564.4861 557.4145 558.9906 554.6342 551.9309 558.8633 546.0827 564.5316 545.6219 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '04' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('04')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département des Hautes-Alpes (05) */}
                <path
                  d="M594.8016 470.2951 599.1561 470.6042 602.6362 475.1832 612.5169 469.8248 615.566 470.7748 618.3289 477.7665 622.2392 477.8223 622.9164 485.3159 629.6617 490.6396 637.7641 491.0891 639.4937 499.717 635.22 505.8988 625.223 511.73 620.6958 516.4102 618.1141 523.2178 610.4975 523.4138 602.2449 517.9109 600.5689 522.6627 595.2682 529.3087 588.6794 522.169 579.7068 529.0069 571.255 543.6284 564.5316 545.6219 564.2928 538.9364 560.8533 534.5765 553.7185 534.3925 549.2874 527.6018 552.6139 522.2307 559.7008 524.0511 559.124 517.8922 561.9137 508.9317 566.8791 509.9061 570.2456 504.5543 576.7538 500.7772 578.3189 496.5207 588.4698 491.3597 600.9557 491.7211 600.9353 484.7568 597.7753 479.8556 592.0497 479.4798 594.8016 470.2951 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '05' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('05')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département des Alpes-Maritimes (06) */}
                <path
                  d="M632.9187 529.3073 634.9205 529.9744 640.2996 538.9452 649.2196 540.6256 660.6981 547.3113 675.4925 543.8241 681.0428 548.3487 680.7382 551.9412 673.39 563.608 669.7859 566.2279 672.0295 573.0379 651.1054 584.631 648.5138 591.3253 639.7648 594.7048 639.0115 598.9438 635.6384 594.9491 637.0715 589.6079 630.9556 587.7038 628.3665 584.7032 627.6538 578.898 622.2982 578.501 620.7422 575.3176 624.2649 569.8319 628.7217 567.4308 632.2435 561.6514 626.1138 555.0187 626.4827 551.9744 622.256 545.2305 624.0514 538.5737 628.5505 532.0023 632.9187 529.3073 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '06' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('06')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département du Gard (30) */}
                <path
                  d="M433.2739 549.7851 437.6578 553.2755 448.0736 553.6346 448.727 548.9589 461.8341 552.8195 465.9323 543.6947 463.3744 533.249 468.6093 526.592 472.6449 530.8686 474.1267 536.446 478.7568 537.6843 483.5464 541.836 487.3986 535.9212 497.4586 535.6326 505.8798 540.9766 510.1815 547.4676 509.486 554.1421 517.426 561.4742 511.5999 568.3076 506.2027 575.8651 506.8093 579.6438 504.1443 587.3679 497.3987 586.4829 493.0158 597.5924 483.5063 602.5406 483.004 605.6193 478.206 604.329 475.4515 598.2587 480.7038 590.2811 477.6143 583.7375 469.4445 577.9323 464.6699 572.4939 456.0171 565.6383 447.6727 569.8392 444.079 574.69 440.9369 571.4537 432.4652 570.1841 432.0493 568.2337 437.6122 561.4489 428.7377 558.0058 431.0303 550.758 433.2739 549.7851 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '30' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('30')}
                  onMouseLeave={() => setActiveZone(null)}
                />

                {/* Département de l'Hérault (34) - Amélioré */}
                <path
                  d="M432.4652 570.1841 440.9369 571.4537 444.079 574.69 447.6727 569.8392 456.0171 565.6383 464.6699 572.4939 469.4445 577.9323 477.6143 583.7375 480.7038 590.2811 475.4515 598.2587 470.4029 598.443 464.3055 601.3784 458.004 607.4699 450.4203 611.3239 441.9442 620.5565 432.2711 621.0774 425.8616 625.8002 422.8128 622.7697 418.3716 622.6049 405.3709 616.5313 398.7304 622.2359 389.8129 619.8608 385.4938 615.0573 386.8327 609.0987 392.7549 605.3765 389.7734 597.6973 391.9125 591.1762 398.4134 593.8242 407.3154 590.1587 408.2172 587.6081 415.4336 587.7429 414.739 579.2327 416.8971 576.3997 423.8394 578.2518 427.7096 571.4266 432.4652 570.1841 Z"
                  className={`transition-all duration-300 ${
                    activeZone === '34' ? 'fill-orange-100 stroke-orange-500' : 'fill-teal-100/30 stroke-teal-600/40'
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setActiveZone('34')}
                  onMouseLeave={() => setActiveZone(null)}
                />
                
                {/* Contour maritime spécifique pour la zone de Montpellier */}
                <path
                  d="M345,630 L355,628 L370,625 L385,622 L389.8129,619.8608 L398.7304,622.2359 L405.3709,616.5313 L418.3716,622.6049 L422.8128,622.7697 L425.8616,625.8002 L432.2711,621.0774 L441.9442,620.5565 L450.4203,611.3239 L458.004,607.4699 L464.3055,601.3784 L470.4029,598.443"
                  fill="none"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                  className="transition-all duration-300"
                />

                {/* Points repères des villes principales */}
                <g>
                  <circle cx="530" cy="600" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Marseille */}
                  <circle cx="600" cy="605" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Toulon */}
                  <circle cx="530" cy="550" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Avignon */}
                  <circle cx="595" cy="545" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Digne */}
                  <circle cx="650" cy="570" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Nice */}
                  <circle cx="425" cy="585" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" /> {/* Montpellier - position ajustée */}
                </g>
                
                {/* Labels des villes */}
                <g className="text-[8px] font-semibold" fill="#0f172a">
                  <text x="530" y="610" textAnchor="middle">Marseille</text>
                  <text x="600" y="620" textAnchor="middle">Toulon</text>
                  <text x="530" y="540" textAnchor="middle">Avignon</text>
                  <text x="595" y="535" textAnchor="middle">Digne</text>
                  <text x="650" y="560" textAnchor="middle">Nice</text>
                  <text x="425" y="575" textAnchor="middle">Montpellier</text>
                </g>
              </svg>
              
              {/* Légende */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 p-2 rounded-md shadow-sm">
                  <p className="text-xs font-bold mb-1">Région PACA</p>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 bg-orange-100 border border-orange-400"></div>
                    <span className="text-[10px]">Zone d'intervention</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-[10px]">Villes principales</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                {departements.map((zone, index) => (
                  <div
                    key={zone.id}
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      activeZone === zone.id ? 'scale-110 opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      top: `${(Math.sin((index * Math.PI * 2) / departements.length) * 35) + 50}%`,
                      left: `${(Math.cos((index * Math.PI * 2) / departements.length) * 35) + 50}%`,
                    }}
                  >
                    <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-gray-500">Intervention 7j/7</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}