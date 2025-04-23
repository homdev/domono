This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Core Web Vitals

Le site utilise la bibliothèque `web-vitals` pour suivre les métriques de performance essentielles :

- **CLS** (Cumulative Layout Shift) : Mesure la stabilité visuelle
- **FCP** (First Contentful Paint) : Mesure le temps de premier rendu de contenu
- **LCP** (Largest Contentful Paint) : Mesure le temps de rendu de l'élément principal
- **FID** (First Input Delay) : Mesure le délai avant première interaction
- **INP** (Interaction to Next Paint) : Mesure la réactivité globale
- **TTFB** (Time to First Byte) : Mesure le temps de réponse du serveur

### Comment utiliser

En mode développement, un bouton de débogage apparaît en bas à droite pour visualiser les métriques en temps réel.

### Configuration Google Analytics

Pour suivre les Core Web Vitals dans Google Analytics :

1. Ouvrez `src/components/analytics/GoogleAnalytics.tsx`
2. Remplacez `G-XXXXXXXXXX` par votre ID de mesure GA4 
3. Les métriques seront envoyées automatiquement comme événements

### Résolution des problèmes

Si vous voyez une erreur CORS avec `vitals.vercel-analytics.com`, c'est normal. Notre implémentation stocke
les métriques localement et les envoie à Google Analytics si configuré, sans dépendre du service Vercel.
