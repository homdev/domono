'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ShoppingCart, Filter, Search, Star, Heart, Eye, X, ChevronDown, ChevronUp } from 'lucide-react'

// Types pour les produits et catégories
type Category = {
  id: string
  name: string
  icon: string
  count: number
}

type Product = {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  image: string
  rating: number
  isNew?: boolean
  isBestseller?: boolean
}

// Données des catégories
const categories: Category[] = [
  { id: 'alarmes', name: 'Alarmes', icon: '/assets/img/placeholder.svg', count: 12 },
  { id: 'cameras', name: 'Caméras', icon: '/assets/img/placeholder.svg', count: 18 },
  { id: 'capteurs', name: 'Capteurs', icon: '/assets/img/placeholder.svg', count: 24 },
  { id: 'serrures', name: 'Serrures connectées', icon: '/assets/img/placeholder.svg', count: 8 },
  { id: 'eclairage', name: 'Éclairage intelligent', icon: '/assets/img/placeholder.svg', count: 15 },
  { id: 'thermostats', name: 'Thermostats', icon: '/assets/img/placeholder.svg', count: 6 },
]

// Données des produits
const products: Product[] = [
  {
    id: 'cam-ext-360',
    name: 'Caméra extérieure 360° HD',
    category: 'cameras',
    price: 129.99,
    oldPrice: 159.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.8,
    isBestseller: true
  },
  {
    id: 'alarme-pro',
    name: 'Kit alarme pro sans fil',
    category: 'alarmes',
    price: 299.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.9,
    isNew: true
  },
  {
    id: 'capteur-mouv',
    name: 'Capteur de mouvement intelligent',
    category: 'capteurs',
    price: 49.99,
    oldPrice: 59.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.7
  },
  {
    id: 'serrure-bio',
    name: 'Serrure biométrique connectée',
    category: 'serrures',
    price: 199.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.6,
    isNew: true
  },
  {
    id: 'ampoule-connect',
    name: 'Ampoule connectée multicolore',
    category: 'eclairage',
    price: 29.99,
    oldPrice: 39.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.5,
    isBestseller: true
  },
  {
    id: 'thermo-wifi',
    name: 'Thermostat Wi-Fi programmable',
    category: 'thermostats',
    price: 89.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.4
  },
  {
    id: 'cam-int-ptz',
    name: 'Caméra intérieure PTZ 1080p',
    category: 'cameras',
    price: 79.99,
    oldPrice: 99.99,
    image: '/assets/img/placeholder.svg',
    rating: 4.3
  },
  {
    id: 'alarme-basic',
    name: 'Kit alarme sans fil basique',
    category: 'alarmes',
    price: 149.99,
        image: '/assets/img/placeholder.svg',
    rating: 4.2
  }
]

export function BoutiquePage() {
  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [sortOption, setSortOption] = useState<string>('popularity')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  
  // Filtrer les produits selon les critères
  useEffect(() => {
    let result = [...products]
    
    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filtre par catégorie
    if (activeCategory) {
      result = result.filter(product => product.category === activeCategory)
    }
    
    // Filtre par prix
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Tri
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1))
        break
      default: // popularity (bestsellers first)
        result.sort((a, b) => (a.isBestseller ? -1 : 1) - (b.isBestseller ? -1 : 1))
    }
    
    setFilteredProducts(result)
  }, [searchTerm, activeCategory, priceRange, sortOption])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Notre Boutique Domotique
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Découvrez notre sélection de produits innovants pour rendre votre maison plus intelligente, sécurisée et confortable.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="pl-12 pr-4 py-3 text-lg rounded-full bg-white/90 text-gray-900 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white/10"></div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Nos Catégories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 
                  ${activeCategory === category.id 
                    ? 'scale-105 shadow-lg ring-2 ring-orange-500' 
                    : 'hover:scale-105 hover:shadow-md'}`}
                onClick={() => setActiveCategory(
                  activeCategory === category.id ? null : category.id
                )}
              >
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="relative h-40">
                    <Image 
                      src={category.icon} 
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{category.name}</h3>
                      <span className="text-white/80 text-sm">{category.count} produits</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique principale */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtres - Desktop */}
            <div className="hidden lg:block w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Filtres</h3>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setActiveCategory(null)}
                  >
                    Réinitialiser
                    <X size={16} />
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={activeCategory === category.id}
                          onCheckedChange={() => 
                            setActiveCategory(activeCategory === category.id ? null : category.id)
                          }
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm font-medium cursor-pointer"
                        >
                          {category.name} ({category.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3">Prix</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={1}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold mb-3">Tri</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sort-popularity" 
                        name="sort" 
                        value="popularity"
                        checked={sortOption === 'popularity'}
                        onChange={() => setSortOption('popularity')}
                        className="mr-2"
                      />
                      <label htmlFor="sort-popularity" className="text-sm">Popularité</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sort-price-asc" 
                        name="sort" 
                        value="price-asc"
                        checked={sortOption === 'price-asc'}
                        onChange={() => setSortOption('price-asc')}
                        className="mr-2"
                      />
                      <label htmlFor="sort-price-asc" className="text-sm">Prix croissant</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sort-price-desc" 
                        name="sort" 
                        value="price-desc"
                        checked={sortOption === 'price-desc'}
                        onChange={() => setSortOption('price-desc')}
                        className="mr-2"
                      />
                      <label htmlFor="sort-price-desc" className="text-sm">Prix décroissant</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sort-rating" 
                        name="sort" 
                        value="rating"
                        checked={sortOption === 'rating'}
                        onChange={() => setSortOption('rating')}
                        className="mr-2"
                      />
                      <label htmlFor="sort-rating" className="text-sm">Meilleures notes</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sort-newest" 
                        name="sort" 
                        value="newest"
                        checked={sortOption === 'newest'}
                        onChange={() => setSortOption('newest')}
                        className="mr-2"
                      />
                      <label htmlFor="sort-newest" className="text-sm">Nouveautés</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Toggle */}
            <div className="lg:hidden w-full mb-4">
              <Button 
                variant="outline" 
                className="w-full flex justify-between items-center" 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <div className="flex items-center">
                  <Filter className="mr-2" size={18} />
                  Filtres et tri
                </div>
                {isMobileFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
              
              {/* Mobile Filters Panel */}
              {isMobileFilterOpen && (
                <div className="mt-2 p-4 bg-white rounded-xl shadow-md">
                  <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Catégories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category.id}`}
                            checked={activeCategory === category.id}
                            onCheckedChange={() => 
                              setActiveCategory(activeCategory === category.id ? null : category.id)
                            }
                          />
                          <label 
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-2 text-sm font-medium cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Prix</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 500]}
                        max={500}
                        step={1}
                        value={[priceRange[0], priceRange[1]]}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2">Tri</h4>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="popularity">Popularité</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="rating">Meilleures notes</option>
                      <option value="newest">Nouveautés</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Produits */}
            <div className="flex-1">
              {/* En-tête résultats */}
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Nos Produits</h2>
                  <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
                </div>
                
                {/* Tri sur desktop */}
                <div className="hidden lg:block">
                  <select 
                    className="p-2 border rounded-md bg-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="popularity">Trier par popularité</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="newest">Nouveautés</option>
                  </select>
                </div>
              </div>

              {/* Grille de produits */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="relative h-56">
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                              <Heart size={18} className="text-gray-600" />
                            </button>
                            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                              <Eye size={18} className="text-gray-600" />
                            </button>
                          </div>
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-teal-500">Nouveau</Badge>
                          )}
                          {product.isBestseller && (
                            <Badge className="absolute top-2 left-2 bg-orange-500">Bestseller</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-yellow-500 mr-1">
                            <Star size={16} />
                          </div>
                          <span className="text-sm text-gray-700">{product.rating}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-x-2">
                            <span className="font-bold text-lg">{product.price.toFixed(2)}€</span>
                            {product.oldPrice && (
                              <span className="text-gray-500 line-through text-sm">{product.oldPrice.toFixed(2)}€</span>
                            )}
                          </div>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            <ShoppingCart size={16} className="mr-1" />
                            Ajouter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <div className="mb-4">
                    <Image 
                      src="/images/empty-results.svg" 
                      alt="Aucun résultat" 
                      width={200} 
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-4">Essayez de modifier vos filtres ou votre recherche.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      setActiveCategory(null)
                      setPriceRange([0, 500])
                      setSortOption('popularity')
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section clients satisfaits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Nos clients témoignent</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients pensent de nos produits et services de domotique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "L'installation de notre système domotique s'est faite rapidement et sans problème. 
                  L'équipe était professionnelle et a pris le temps de nous expliquer le fonctionnement. 
                  Très satisfait des produits achetés !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <Image 
                      src="/images/testimonial-1.jpg" 
                      alt="Client" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Michel D.</p>
                    <p className="text-sm text-gray-500">Client depuis 2 ans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Les caméras achetées sont d'excellente qualité, avec une image nette même de nuit. 
                  L'application est intuitive et fonctionne parfaitement. Le service client est réactif 
                  et a su répondre à toutes mes questions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <Image 
                      src="/images/testimonial-2.jpg" 
                      alt="Client" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Sophie M.</p>
                    <p className="text-sm text-gray-500">Cliente depuis 6 mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Domono a transformé notre maison en véritable habitat intelligent. 
                  Les thermostats connectés nous ont permis de réaliser des économies d'énergie 
                  et le système d'alarme me donne une tranquillité d'esprit totale."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <Image 
                      src="/images/testimonial-3.jpg" 
                      alt="Client" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Laurent et Julie T.</p>
                    <p className="text-sm text-gray-500">Clients depuis 1 an</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin de conseils avant d'acheter ?
            </h2>
            <p className="text-lg mb-8">
              Nos experts en domotique sont là pour vous aider à choisir les produits adaptés à vos besoins.
              Contactez-nous pour une consultation gratuite et personnalisée.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Prendre rendez-vous
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 