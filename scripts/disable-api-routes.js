const fs = require('fs');
const path = require('path');

// Fonction pour trouver tous les fichiers route.ts dans les répertoires dynamiques
function findDynamicRouteFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Si c'est un répertoire avec un nom qui contient des crochets "[...]", c'est une route dynamique
      if (file.includes('[') && file.includes(']')) {
        const routeFile = path.join(filePath, 'route.ts');
        if (fs.existsSync(routeFile)) {
          fileList.push(routeFile);
        }
      }
      findDynamicRouteFiles(filePath, fileList);
    }
  });

  return fileList;
}

// Fonction pour trouver tous les fichiers .bak
function findBakFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findBakFiles(filePath, fileList);
      } else if (file.endsWith('route.ts.bak')) {
        fileList.push(filePath);
      }
    } catch (err) {
      // Ignorer les erreurs d'accès aux fichiers
      console.error(`Erreur lors de l'accès à ${filePath}: ${err.message}`);
    }
  });

  return fileList;
}

// Renommer les fichiers pour les exclure du build
function disableRoutes(files) {
  files.forEach(file => {
    console.log(`Désactivation de la route API: ${file}`);
    fs.renameSync(file, `${file}.bak`);
  });
}

// Restaurer les fichiers après le build
function enableRoutes() {
  const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');
  const bakFiles = findBakFiles(apiDir);
  
  console.log(`${bakFiles.length} fichiers .bak trouvés.`);
  
  bakFiles.forEach(bakFile => {
    const originalFile = bakFile.replace('.bak', '');
    console.log(`Réactivation de la route API: ${originalFile}`);
    fs.renameSync(bakFile, originalFile);
  });
}

// Exécution du script
const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');
const action = process.argv[2] || 'disable';

if (action === 'disable') {
  const dynamicRouteFiles = findDynamicRouteFiles(apiDir);
  console.log(`${dynamicRouteFiles.length} fichiers de route API dynamiques trouvés.`);
  disableRoutes(dynamicRouteFiles);
  console.log('Routes API dynamiques désactivées pour le build.');
} else if (action === 'enable') {
  enableRoutes();
  console.log('Routes API dynamiques réactivées après le build.');
} else {
  console.log('Action non reconnue. Utilisez "disable" ou "enable".');
} 