/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurations conditionnelles selon l'environnement
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export', // Activé uniquement en production pour Netlify
    distDir: 'out',   // Dossier de sortie pour Netlify
  } : {}),
  
  trailingSlash: true, // Ajout de trailing slash pour la compatibilité avec les hébergeurs statiques
  reactStrictMode: true,
  
  // Ignorer les routes API dynamiques
  skipTrailingSlashRedirect: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Résoudre le problème des ressources statiques
  assetPrefix: '/', // Chemin absolu pour les ressources statiques
  
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'web-vitals', 
      'lucide-react', 
      'framer-motion'
    ],
    // optimizeFonts: true, // Option non reconnue dans experimental - à déplacer hors de experimental
    nextScriptWorkers: true,
    memoryBasedWorkersCount: true,
  },
  
  // Optimisation des polices
  optimizeFonts: true,
  
  // Configuration des images
  images: {
    ...(process.env.NODE_ENV === 'production' ? {
      unoptimized: true,  // Activé uniquement en production pour 'export'
    } : {}),
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configuration de webpack pour ignorer les fichiers API côté client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignorer les fichiers API côté client
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Ignorer les erreurs pour le client Prisma
    config.externals = [
      ...(config.externals || []),
      { encoding: 'encoding' },
    ];
    
    return config;
  },
  // Options additionnelles pour améliorer le build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  eslint: {
    // Ignorez les erreurs ESLint pendant le build de production
    ignoreDuringBuilds: true,
  },
  // Ignorer les routes API qui posent problème en les excluant du build
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build de production
    ignoreBuildErrors: true,
  },
  
  // Redirections pour les ressources statiques
  async redirects() {
    return [
      {
        source: '/public/favicon.ico',
        destination: '/favicon.ico',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
