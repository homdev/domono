/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Réactivé pour le déploiement Netlify
  distDir: 'out', // Dossier de sortie explicitement défini pour Netlify
  trailingSlash: true, // Ajout de trailing slash pour la compatibilité avec les hébergeurs statiques
  reactStrictMode: true,
  
  // Ignorer les routes API dynamiques
  skipTrailingSlashRedirect: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,  // Doit être true pour output: 'export'
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    domains: [],
    remotePatterns: [],
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
};

module.exports = nextConfig;
