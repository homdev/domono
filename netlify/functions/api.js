// Cette fonction Netlify servira de proxy pour les routes API dynamiques qui sont 
// désactivées lors de l'export statique
exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions/api', '');
  
  // Extraire la partie dynamique du chemin
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Route non trouvée' })
    };
  }

  // Déterminer quelle API est appelée
  const apiType = segments[0]; // Par exemple: quotes, admin, auth
  
  try {
    let response;
    
    // Simuler la réponse en fonction du type d'API
    switch (apiType) {
      case 'quotes':
        if (segments.length > 1) {
          // Gérer /api/quotes/[id]
          const quoteId = segments[1];
          response = {
            message: 'Site en mode statique',
            info: `Les détails du devis ${quoteId} ne sont pas disponibles en mode statique.`,
            redirect: 'Veuillez vous connecter via l\'application principale.'
          };
        } else {
          // Gérer /api/quotes
          response = {
            message: 'Site en mode statique',
            info: 'La liste des devis n\'est pas disponible en mode statique.',
            redirect: 'Veuillez vous connecter via l\'application principale.'
          };
        }
        break;
        
      case 'admin':
        // Gérer /api/admin/...
        response = {
          message: 'Accès administrateur',
          info: 'Les fonctionnalités d\'administration ne sont pas disponibles en mode statique.',
          redirect: 'Veuillez vous connecter via l\'application principale.'
        };
        break;
        
      case 'auth':
        // Gérer /api/auth/...
        response = {
          message: 'Authentification',
          info: 'L\'authentification n\'est pas disponible en mode statique.',
          redirect: 'Veuillez vous connecter via l\'application principale.'
        };
        break;
        
      default:
        response = {
          message: 'API non disponible',
          info: 'Cette fonctionnalité n\'est pas disponible en mode statique.',
          redirect: 'Veuillez nous contacter pour plus d\'informations.'
        };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erreur lors du traitement de la requête',
        message: error.message
      })
    };
  }
}; 