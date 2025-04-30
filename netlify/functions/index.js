// Fonction Netlify pour gérer les API routes statiques
exports.handler = async function(event, context) {
  console.log("[NETLIFY MAIN] Requête reçue:", event.path, event.httpMethod);
  
  const path = event.path.replace('/.netlify/functions', '');
  
  // Si c'est une requête API, rediriger vers le handler api.js
  if (path.startsWith('/api/')) {
    console.log("[NETLIFY MAIN] Redirection vers api.js pour:", path);
    
    // On modifie le chemin pour qu'il soit compatible avec api.js
    event.path = event.path.replace('/api', '');
    
    // Importation dynamique de la fonction api
    try {
      const apiHandler = require('./api');
      return await apiHandler.handler(event, context);
    } catch (error) {
      console.error("[NETLIFY MAIN] Erreur lors de la redirection vers api.js:", error);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: "Erreur lors de la redirection vers l'API",
          message: error.message
        })
      };
    }
  }
  
  // Réponse par défaut pour les requêtes non-API
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