/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Désactivé pour permettre l'utilisation des API routes
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  eslint: {
    // Ignorez les erreurs ESLint pendant le build de production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorez les erreurs TypeScript pendant le build de production
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    
    // Ignorer les erreurs pour le client Prisma
    config.externals = [
      ...config.externals || [],
      { encoding: 'encoding' }
    ];
    
    return config;
  }
};

module.exports = nextConfig;
