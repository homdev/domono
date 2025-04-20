const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Chemins des dossiers
const sourceDir = path.join(__dirname, '../public/assets/img');
const destDir = path.join(__dirname, '../public/assets/img/optimized');

// Assurer que le dossier de destination existe
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Convertir les images en WebP avec plusieurs tailles
async function optimizeImages() {
  console.log('Optimisation des images...');
  
  // Trouver toutes les images
  const imagePaths = glob.sync(`${sourceDir}/**/*.{jpg,jpeg,png,svg}`, { nodir: true });
  
  // Tailles pour les images responsive
  const sizes = [640, 1080, 1920];
  
  // Traiter chaque image
  for (const imagePath of imagePaths) {
    const filename = path.basename(imagePath, path.extname(imagePath));
    console.log(`Optimisation de: ${filename}`);
    
    try {
      // Pour les SVG, création d'une version WebP
      if (path.extname(imagePath).toLowerCase() === '.svg') {
        // Convertir SVG en PNG puis en WebP
        await sharp(imagePath)
          .resize(1920)
          .webp({ quality: 80 })
          .toFile(path.join(destDir, `${filename}.webp`));
      } else {
        // Pour les autres formats, créer des versions responsive
        for (const size of sizes) {
          await sharp(imagePath)
            .resize(size)
            .webp({ quality: 80 })
            .toFile(path.join(destDir, `${filename}-${size}.webp`));
        }
      }
    } catch (err) {
      console.error(`Erreur lors de l'optimisation de ${filename}:`, err);
    }
  }
  
  console.log('Optimisation terminée!');
}

// Exécuter l'optimisation
optimizeImages(); 