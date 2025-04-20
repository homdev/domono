'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Clock, ArrowRight, Search, User, Tag, Mail, CheckCircle, Send } from 'lucide-react'
import type { Route } from 'next'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Données fictives pour les articles
const blogPosts = [
  {
    id: 1,
    title: "Les meilleures solutions de domotique pour économiser l'énergie",
    excerpt: "Découvrez comment la domotique peut vous aider à réduire votre consommation énergétique tout en améliorant votre confort quotidien.",
    category: "Domotique",
    author: "Thomas Martin",
    date: "12 mai 2023",
    readTime: "7 min",
    image: "/assets/img/placeholder.svg",
    featured: true,
    tags: ["économie d'énergie", "maison intelligente", "confort"]
  },
  {
    id: 2,
    title: "Comment choisir un système d'alarme adapté à vos besoins ?",
    excerpt: "Guide complet pour sélectionner le système d'alarme idéal en fonction de votre logement, budget et besoins spécifiques.",
    category: "Alarme",
    author: "Sarah Dubois",
    date: "28 avril 2023",
    readTime: "5 min",
    image: "/assets/img/placeholder.svg",
    featured: false,
    tags: ["sécurité", "alarme", "protection"]
  },
  {
    id: 3,
    title: "Vidéosurveillance : caméras filaires ou sans fil ?",
    excerpt: "Analyse comparative des avantages et inconvénients des différents types de caméras pour sécuriser votre domicile ou votre entreprise.",
    category: "Vidéosurveillance",
    author: "Marc Leroy",
    date: "15 avril 2023",
    readTime: "6 min",
    image: "/assets/img/placeholder.svg",
    featured: true,
    tags: ["caméras", "sécurité", "technologie"]
  },
  {
    id: 4,
    title: "Les innovations en contrôle d'accès pour entreprises",
    excerpt: "Découvrez les dernières technologies en matière de contrôle d'accès pour sécuriser vos locaux professionnels.",
    category: "Contrôle d'accès",
    author: "Julie Moreau",
    date: "2 avril 2023",
    readTime: "8 min",
    image: "/assets/img/placeholder.svg",
    featured: false,
    tags: ["entreprise", "sécurité", "innovation"]
  },
  {
    id: 5,
    title: "Intégrer la domotique dans une maison ancienne",
    excerpt: "Conseils pratiques pour moderniser votre logement ancien avec des solutions domotiques adaptées et non-invasives.",
    category: "Domotique",
    author: "Pierre Durand",
    date: "22 mars 2023",
    readTime: "9 min",
    image: "/assets/img/placeholder.svg",
    featured: false,
    tags: ["rénovation", "modernisation", "installation"]
  },
  {
    id: 6,
    title: "Les assistants vocaux et la domotique : un duo gagnant",
    excerpt: "Comment les assistants vocaux transforment l'expérience de la maison connectée et simplifient votre quotidien.",
    category: "Domotique",
    author: "Emma Bernard",
    date: "10 mars 2023",
    readTime: "5 min",
    image: "/assets/img/placeholder.svg",
    featured: true,
    tags: ["assistant vocal", "maison connectée", "innovation"]
  }
];

// Catégories disponibles
const categories = [
  { name: "Domotique", count: 12, icon: "🏠" },
  { name: "Alarme", count: 8, icon: "🚨" },
  { name: "Vidéosurveillance", count: 10, icon: "📹" },
  { name: "Contrôle d'accès", count: 7, icon: "🔐" },
  { name: "Maison connectée", count: 15, icon: "📱" },
  { name: "Tutoriels", count: 6, icon: "📝" }
];

export function BlogPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'un abonnement réussi
    if (email) {
      setTimeout(() => {
        setIsSubscribed(true);
      }, 500);
    }
  };

  const featuredPosts = blogPosts.filter(post => post.featured);
  
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <Image 
          src="/assets/img/optimized/domono-bg-hero.webp" 
          alt="Blog sur la domotique et la sécurité" 
          fill 
          priority
          className="object-cover opacity-40"
        />
        
        <div className="container relative z-20 mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-1 text-sm font-medium">
              Ressources et actualités
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Notre <span className="text-orange-500">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Découvrez nos articles, conseils et actualités sur la domotique, la sécurité et les maisons connectées.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="pl-10 py-6 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles récents */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Articles récents</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nos dernières publications sur la domotique et la sécurité
              </p>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0">
              <Link href={"/blog/archives" as Route}>
                Voir tous les articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.slice(0, 6).map((post) => (
              <motion.div key={post.id} variants={fadeIn}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow dark:bg-slate-800 border-none shadow-md">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <CardTitle className="line-clamp-2 hover:text-orange-500 transition-colors">
                      <Link href={`/blog/${post.id}` as Route}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t border-gray-100 dark:border-slate-700 pt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catégories et articles en vedette */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Catégories */}
            <motion.div
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6">Catégories</h3>
                <ul className="space-y-4">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        href={`/blog/categorie/${category.name.toLowerCase().replace(/\s+/g, '-')}` as Route}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-2xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 dark:bg-slate-700">
                          {category.count}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mt-8">
                <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Recevez nos derniers articles et conseils directement dans votre boîte mail.
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe}>
                    <div className="flex flex-col space-y-3">
                      <Input 
                        type="email" 
                        placeholder="Votre adresse email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-5"
                      />
                      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        <Mail className="mr-2 h-4 w-4" />
                        S'abonner à la newsletter
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Merci ! Vous êtes bien inscrit à notre newsletter.</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Articles en vedette */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Articles en vedette</h3>
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col md:flex-row dark:bg-slate-800 border-none shadow-md">
                    <div className="relative h-60 md:h-auto md:w-1/3 flex-shrink-0">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 md:w-2/3">
                      <div>
                        <div className="flex items-center mb-3">
                          <Badge className="bg-orange-500 hover:bg-orange-600 text-white mr-2">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {post.date}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 hover:text-orange-500 transition-colors">
                          <Link href={`/blog/${post.id}` as Route}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 p-0">
                          <Link href={`/blog/${post.id}` as Route} className="flex items-center">
                            Lire l'article
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un conseil personnalisé ?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Nos experts sont disponibles pour répondre à toutes vos questions sur nos solutions de domotique et de sécurité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
                <Link href={"/contact" as Route}>
                  <Send className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href={"/devis" as Route}>Demander un devis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 