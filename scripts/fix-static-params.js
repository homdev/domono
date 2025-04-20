const fs = require('fs');
const path = require('path');

// Fonction pour trouver tous les fichiers route.ts dans un répertoire récursivement
function findRoutesFiles(dir, fileList = []) {
  console.log(`Exploration du répertoire: ${dir}`);
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Chercher le fichier route.ts dans tous les répertoires
      const routeFile = path.join(filePath, 'route.ts');
      if (fs.existsSync(routeFile)) {
        console.log(`Trouvé: ${routeFile}`);
        fileList.push(routeFile);
      }
      findRoutesFiles(filePath, fileList);
    }
  });

  return fileList;
}

// Ajouter la fonction generateStaticParams à un fichier
function fixApiRoutes(filePath) {
  console.log(`Vérification du fichier: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remplacer export const dynamic = 'auto' par force-static
  if (content.includes("export const dynamic = 'auto'")) {
    content = content.replace(
      "export const dynamic = 'auto'",
      "export const dynamic = 'force-static'"
    );
    console.log(`  ✅ Remplacé dynamic auto par force-static: ${filePath}`);
  } else if (!content.includes("export const dynamic = 'force-static'")) {
    // Ajouter la configuration si elle n'existe pas
    const lastImportIndex = content.lastIndexOf('import');
    let insertPosition = content.indexOf(';', lastImportIndex) + 1;
    
    if (insertPosition <= 0) {
      insertPosition = 0;
    }

    const codeToInsert = '\n\n// Configuration pour export statique\nexport const dynamic = \'force-static\';\n';
    
    content = content.slice(0, insertPosition) + codeToInsert + content.slice(insertPosition);
    console.log(`  ✅ Ajouté force-static: ${filePath}`);
  } else {
    console.log(`  ✅ Déjà configuré avec force-static: ${filePath}`);
  }

  // S'assurer que la fonction generateStaticParams est correctement implémentée
  const hasGenerateStaticParams = content.includes('export function generateStaticParams') || 
                                 content.includes('export async function generateStaticParams');
  
  if (!hasGenerateStaticParams) {
    // Ajouter après la configuration dynamic
    if (content.includes("export const dynamic = 'force-static'")) {
      content = content.replace(
        "export const dynamic = 'force-static'",
        "export const dynamic = 'force-static';\n\n// Paramètres statiques pour la route dynamique\nexport async function generateStaticParams() {\n  return [];\n}"
      );
    } else {
      // Ajouter après les imports si la configuration dynamic n'a pas été trouvée
      const lastImportIndex = content.lastIndexOf('import');
      let insertPosition = content.indexOf(';', lastImportIndex) + 1;
      
      if (insertPosition <= 0) {
        insertPosition = 0;
      }

      const codeToInsert = '\n\n// Paramètres statiques pour la route dynamique\nexport async function generateStaticParams() {\n  return [];\n}\n';
      
      content = content.slice(0, insertPosition) + codeToInsert + content.slice(insertPosition);
    }
    console.log(`  ✅ Ajouté generateStaticParams: ${filePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// Exécuter le script
const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');
const routeFiles = findRoutesFiles(apiDir);

console.log(`${routeFiles.length} fichiers de route API trouvés.`);

routeFiles.forEach(file => {
  fixApiRoutes(file);
});

console.log('Fin du script.'); 