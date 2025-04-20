// Fonction Netlify pour gérer les API routes statiques
exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions', '');
  
  // Réponse par défaut pour les requêtes API dans le contexte de déploiement statique
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Cette API est simulée en mode statique. Pour une fonctionnalité complète, veuillez utiliser le mode serveur.',
      path: path,
      method: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  };
}; 