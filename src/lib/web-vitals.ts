import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

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
  };

  // Utiliser `navigator.sendBeacon()` si disponible, sinon utiliser `fetch()`
  const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: JSON.stringify(body),
      method: 'POST',
      keepalive: true,
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