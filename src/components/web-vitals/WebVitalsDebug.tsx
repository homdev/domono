'use client';

import React, { useState, useEffect } from 'react';

interface WebVitalsMetric {
  id: string;
  page: string;
  href: string;
  event_name: string;
  value: string;
  speed: string;
  timestamp: number;
}

export default function WebVitalsDebug() {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Récupérer les métriques depuis localStorage
    const loadMetrics = () => {
      try {
        const storedMetrics = localStorage.getItem('web-vitals-metrics');
        if (storedMetrics) {
          setMetrics(JSON.parse(storedMetrics));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des métriques:', error);
      }
    };

    // Charger les métriques au démarrage
    loadMetrics();

    // Ajouter un écouteur pour les mises à jour de localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'web-vitals-metrics') {
        loadMetrics();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Actualiser périodiquement les métriques (toutes les 2 secondes)
    const interval = setInterval(loadMetrics, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Format date pour l'affichage
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Grouper les métriques par page et par type
  const groupedMetrics: Record<string, Record<string, WebVitalsMetric[]>> = {};
  metrics.forEach(metric => {
    const page = metric.page || '/';
    const eventName = metric.event_name;
    
    if (!groupedMetrics[page]) {
      groupedMetrics[page] = {};
    }
    
    if (!groupedMetrics[page][eventName]) {
      groupedMetrics[page][eventName] = [];
    }
    
    groupedMetrics[page][eventName].push(metric);
  });

  // Style du bouton flottant
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: '#0d9488',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  } as const;

  // Style du panneau de débogage
  const debugPanelStyle = {
    position: 'fixed',
    bottom: '70px',
    right: '20px',
    width: '400px',
    maxHeight: '500px',
    overflowY: 'auto',
    zIndex: 999,
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  } as const;

  // Si en mode production, ne pas afficher le composant de débogage
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      <button 
        style={buttonStyle}
        onClick={toggleVisibility}
      >
        {visible ? 'Masquer métriques' : 'Afficher métriques'}
      </button>

      {visible && (
        <div style={debugPanelStyle}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '16px' }}>
            Web Vitals Métriques
          </h3>
          
          {Object.keys(groupedMetrics).length > 0 ? (
            Object.entries(groupedMetrics).map(([page, events]) => (
              <div key={page} style={{ marginBottom: '16px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                  Page: {page}
                </h4>
                
                {Object.entries(events).map(([eventName, eventMetrics]) => {
                  // Trier par timestamp (plus récent en premier)
                  const sortedMetrics = [...eventMetrics].sort((a, b) => b.timestamp - a.timestamp);
                  
                  // Prendre la dernière valeur pour chaque métrique
                  const latestMetric = sortedMetrics[0];
                  
                  return (
                    <div key={eventName} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>{eventName}:</span>
                        <span style={{ color: '#0d9488' }}>{latestMetric.value}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Dernière mesure: {formatDate(latestMetric.timestamp)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <p>Aucune métrique disponible</p>
          )}
          
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => {
                localStorage.removeItem('web-vitals-metrics');
                setMetrics([]);
              }}
              style={{
                backgroundColor: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '12px'
              }}
            >
              Effacer
            </button>
            
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {metrics.length} mesures enregistrées
            </span>
          </div>
        </div>
      )}
    </>
  );
} 