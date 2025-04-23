import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

// Modification: utilisation d'un endpoint compatible avec notre domaine
// ou stockage local des métriques en cas d'erreur
const vitalsUrl = '/api/vitals'; // Endpoint local qui pourra être créé ultérieurement

// Définir un type pour NetworkInformation
interface NetworkInformation {
  effectiveType?: string;
}

function getConnectionSpeed(): string {
  // Vérifier si nous avons accès aux informations de connexion
  if (typeof navigator !== 'undefined' && 
      'connection' in navigator && 
      navigator.connection) {
    const connection = navigator.connection as NetworkInformation;
    return connection.effectiveType || '';
  }
  return '';
}

/**
 * @param {Metric} metric Métrique de Web Vitals
 * @param {Object} options Options supplémentaires
 */
export function sendToAnalytics(metric: Metric, options: { path: string }) {
  const page = Object.entries(options)
    .reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
    }, options.path);

  const body = {
    dsn: 'domono', // Domaine pour identifier le projet
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    timestamp: Date.now()
  };

  // Option 1: Stocker dans localStorage en cas d'environnement statique
  try {
    // Récupérer les métriques existantes ou initialiser un tableau vide
    const storedMetrics = localStorage.getItem('web-vitals-metrics') 
      ? JSON.parse(localStorage.getItem('web-vitals-metrics') || '[]') 
      : [];
    
    // Ajouter la nouvelle métrique
    storedMetrics.push(body);
    
    // Limiter à 100 entrées pour éviter de surcharger le stockage
    if (storedMetrics.length > 100) {
      storedMetrics.shift(); // Supprimer la plus ancienne entrée
    }
    
    // Stocker les métriques mises à jour
    localStorage.setItem('web-vitals-metrics', JSON.stringify(storedMetrics));
    
    // Log dans la console pour le débogage
    console.debug(`[Web Vitals] Métrique ${metric.name}: ${metric.value}`);
  } catch (error) {
    console.error('[Web Vitals] Erreur lors du stockage des métriques:', error);
  }

  // Option 2: Envoi vers Google Analytics
  // Cette option est compatible avec tous les domaines et ne cause pas d'erreurs CORS
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: page,
      value: Math.round(metric.value * 1000) / 1000,
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: metric.value,
    });
  }
}

/**
 * Initialise le suivi des Core Web Vitals
 */
export function reportWebVitals(path: string) {
  try {
    // Mesurer les métriques CLS
    onCLS(metric => {
      sendToAnalytics(metric, { path });
    });

    // Mesurer les métriques FCP
    onFCP(metric => {
      sendToAnalytics(metric, { path });
    });

    // Mesurer les métriques LCP
    onLCP(metric => {
      sendToAnalytics(metric, { path });
    });

    // Mesurer les métriques FID
    onFID(metric => {
      sendToAnalytics(metric, { path });
    });

    // Mesurer les métriques INP (Interaction to Next Paint)
    onINP(metric => {
      sendToAnalytics(metric, { path });
    });

    // Mesurer les métriques TTFB
    onTTFB(metric => {
      sendToAnalytics(metric, { path });
    });
  } catch (err) {
    console.error('[Web Vitals]', err);
  }
} 